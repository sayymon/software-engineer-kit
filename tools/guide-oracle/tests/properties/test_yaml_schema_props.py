"""Testes de propriedade do YAML_Fonte e do Schema (Properties 1 a 5)."""

from __future__ import annotations

import copy
import datetime as dt
import json
import re
import tempfile
from pathlib import Path
from typing import Any

from hypothesis import given, settings
from hypothesis import strategies as st

from guia_decisao.cli import main
from guia_decisao.loader import dump_yaml, load_yaml
from guia_decisao.validator import validate
from tests.properties import strategies as S
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

SCHEMA_PATH = GUIA_SCHEMA
SCHEMA: dict[str, Any] = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))

_CAMPOS = {
    "decisoes": ["id", "raia", "tipo", "condicao", "proximo", "estado"],
    "raias": ["id", "nome", "demanda", "responsabilidade", "cor"],
    "categorias_ferramenta": ["custo", "beneficio", "dependencia_fornecedor"],
    "fontes": ["tipo", "titulo", "link", "status_revisao", "proxima_revisao"],
}


def _rodar_cli(doc: dict[str, Any]) -> int:
    """Grava `doc` em arquivo temporário e executa `engenharia validar`."""
    with tempfile.TemporaryDirectory() as tmp:
        y = Path(tmp) / "doc.yaml"
        y.write_text(dump_yaml(doc), encoding="utf-8")
        return main(["validar", "--yaml", str(y), "--schema", str(SCHEMA_PATH)])


def _schema_issues_em(doc: dict[str, Any], prefixo: str) -> list[Any]:
    return [i for i in validate(doc, SCHEMA) if i.code == "SCHEMA" and i.path.startswith(prefixo)]


# ------------------------------------------------------------------ Property 1


@settings(max_examples=100, deadline=None)
@given(doc=S.valid_docs())
def test_property_1_ida_e_volta_do_yaml_fonte(doc: dict[str, Any]) -> None:
    """**Property 1: Ida e volta do YAML_Fonte**

    **Validates: Requirements 2.7**
    """
    original = copy.deepcopy(doc)
    with tempfile.TemporaryDirectory() as tmp:
        y = Path(tmp) / "doc.yaml"
        y.write_text(dump_yaml(doc), encoding="utf-8")
        carregado = load_yaml(y)
    assert carregado == original
    assert doc == original  # dump_yaml não altera a entrada


# ------------------------------------------------------------------ Property 2


@settings(max_examples=100, deadline=None)
@given(doc=S.valid_docs())
def test_property_2_documento_valido_nao_produz_erros(doc: dict[str, Any]) -> None:
    """**Property 2: Documento válido não produz erros**

    **Validates: Requirements 2.5, 3.7**
    """
    assert validate(doc, SCHEMA) == []
    assert _rodar_cli(doc) == 0


# ------------------------------------------------------------------ Property 3


@st.composite
def _remocoes(draw: st.DrawFn) -> tuple[dict[str, Any], str, int, str]:
    doc = draw(S.valid_docs().filter(lambda d: d["categorias_ferramenta"] or d["fontes"] or d["decisoes"]))
    candidatos = [
        (col, i, campo)
        for col, campos in _CAMPOS.items()
        for i in range(len(doc[col]))
        for campo in campos
    ]
    col, i, campo = draw(st.sampled_from(candidatos))
    return doc, col, i, campo


@settings(max_examples=100, deadline=None)
@given(caso=_remocoes())
def test_property_3_campos_obrigatorios_ausentes_rejeitados_com_caminho(
    caso: tuple[dict[str, Any], str, int, str],
) -> None:
    """**Property 3: Campos obrigatórios ausentes são rejeitados com caminho**

    **Validates: Requirements 2.2, 2.4, 3.1, 3.2, 10.1, 13.1**
    """
    doc, col, i, campo = caso
    mutado = copy.deepcopy(doc)
    del mutado[col][i][campo]
    alvo = f"{col}[{i}]"
    assert _schema_issues_em(mutado, alvo), f"sem Issue SCHEMA em {alvo} ao remover {campo}"
    assert _rodar_cli(mutado) != 0


# ------------------------------------------------------------------ Property 4

_ENUM_TIPO = ["inicio", "tarefa", "bifurcacao", "chamada", "fim"]
_ENUM_STATUS = ["pendente", "em_revisao", "revisada"]
_ENUM_NIVEL = ["baixo", "medio", "alto"]

_ALVOS_ENUM = {
    "decisoes": [("tipo", _ENUM_TIPO)],
    "fontes": [("status_revisao", _ENUM_STATUS)],
    "categorias_ferramenta": [(c, _ENUM_NIVEL) for c in ("custo", "beneficio", "dependencia_fornecedor")],
}


def _valor_enum(validos: list[str]) -> st.SearchStrategy[str]:
    quase = [v.upper() for v in validos] + [v + " " for v in validos] + [v[:-1] for v in validos] + [""]
    return st.one_of(st.sampled_from(validos), st.sampled_from(quase), st.text(max_size=12))


@st.composite
def _casos_enum(draw: st.DrawFn) -> tuple[dict[str, Any], str, int, str, list[str], str]:
    doc = draw(S.valid_docs().filter(lambda d: d["categorias_ferramenta"] or d["fontes"]))
    candidatos = [
        (col, i, campo, validos)
        for col, alvos in _ALVOS_ENUM.items()
        for i in range(len(doc[col]))
        for campo, validos in alvos
    ]
    col, i, campo, validos = draw(st.sampled_from(candidatos))
    return doc, col, i, campo, validos, draw(_valor_enum(validos))


@settings(max_examples=100, deadline=None)
@given(caso=_casos_enum())
def test_property_4_enum_aceito_se_e_somente_se_pertence(
    caso: tuple[dict[str, Any], str, int, str, list[str], str],
) -> None:
    """**Property 4: Valores de enumeração são aceitos se e somente se pertencem ao enum**

    **Validates: Requirements 2.3, 8.3, 10.2**
    """
    doc, col, i, campo, validos, s = caso
    mutado = copy.deepcopy(doc)
    mutado[col][i][campo] = s
    rejeitado = bool(_schema_issues_em(mutado, f"{col}[{i}].{campo}"))
    assert rejeitado == (s not in validos), f"{col}[{i}].{campo}={s!r}"


# ------------------------------------------------------------------ Property 5

_DATA_ASCII = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}")


def _eh_data_aaaa_mm_dd(s: str) -> bool:
    if not _DATA_ASCII.fullmatch(s):
        return False
    try:
        dt.date(int(s[:4]), int(s[5:7]), int(s[8:10]))
    except ValueError:
        return False
    return True


_datas_quase = st.one_of(
    st.dates(min_value=dt.date(1, 1, 1), max_value=dt.date(9999, 12, 31)).map(lambda d: d.isoformat()),
    st.builds(
        lambda y, m, d: f"{y:04d}-{m:02d}-{d:02d}",
        st.integers(0, 9999),
        st.integers(0, 14),
        st.integers(0, 33),
    ),
    st.dates().map(lambda d: d.strftime("%Y/%m/%d")),
    st.dates().map(lambda d: d.strftime("%d-%m-%Y")),
    st.dates().map(lambda d: d.strftime("%Y%m%d")),
    st.dates().map(lambda d: d.isoformat() + "\n"),
    st.dates().map(lambda d: " " + d.isoformat()),
    st.dates().map(lambda d: d.isoformat() + "T00:00:00"),
    st.dates().map(lambda d: d.isoformat().replace("0", "\u0660").replace("1", "\u0661")),
    st.just(""),
    st.text(max_size=14),
)


@settings(max_examples=100, deadline=None)
@given(doc=S.valid_docs().filter(lambda d: bool(d["fontes"])), s=_datas_quase, data=st.data())
def test_property_5_proxima_revisao_aceita_apenas_data_valida(
    doc: dict[str, Any], s: str, data: st.DataObject
) -> None:
    """**Property 5: Data da próxima revisão aceita apenas AAAA-MM-DD válido**

    **Validates: Requirements 10.3**
    """
    i = data.draw(st.integers(0, len(doc["fontes"]) - 1))
    mutado = copy.deepcopy(doc)
    mutado["fontes"][i]["proxima_revisao"] = s
    rejeitado = bool(_schema_issues_em(mutado, f"fontes[{i}].proxima_revisao"))
    assert rejeitado == (not _eh_data_aaaa_mm_dd(s)), f"proxima_revisao={s!r}"
