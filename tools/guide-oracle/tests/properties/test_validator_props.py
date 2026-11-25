"""Testes de propriedade do validador (Properties 6, 7, 8, 21 e 32).

O modelo é de raias (SRP): os documentos válidos têm `raias`, nós com `raia` e alcançabilidade por raia.

Rode a partir de tools/guide-oracle: `pytest tests/properties/test_validator_props.py`.
"""

from __future__ import annotations

import copy
import json
import math
from collections import deque
from pathlib import Path
from typing import Any

import pytest
from hypothesis import HealthCheck, assume, given, settings
from hypothesis import strategies as st

from guia_decisao.loader import load_yaml
from guia_decisao.model import Doc
from guia_decisao.validator import TOLERANCIA_PESOS, validate
from tests.properties import strategies as S
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))
YAML_REAL = GUIA_DIR

CFG = settings(max_examples=100, deadline=None, suppress_health_check=list(HealthCheck))

FAKE_ID = "zz_inexistente"  # os ids gerados têm no máximo 5 caracteres por grupo, logo nunca colidem

_LISTAS_REF = ("tecnicas", "abordagens", "padroes", "estrategias", "categorias_ferramenta")


def _por_codigo(issues: list[Any], codigo: str) -> list[Any]:
    return [i for i in issues if i.code == codigo]


# ------------------------------------------------------------------ Property 6


def _alvos_de_referencia(doc: dict[str, Any]) -> list[tuple[Any, ...]]:
    """Caminhos (como tuplas) de todo campo que guarda um id de outro item, com o código esperado."""
    alvos: list[tuple[Any, ...]] = [("REF_QUEBRADA", "raias", i, "demanda") for i in range(len(doc["raias"]))]
    for i, d in enumerate(doc["decisoes"]):
        alvos.append(("REF_QUEBRADA", "decisoes", i, "raia"))
        if "raia_chamada" in d:
            alvos.append(("REF_QUEBRADA", "decisoes", i, "raia_chamada"))
        alvos += [("TRANSICAO_INVALIDA", "decisoes", i, "proximo", j, "para") for j in range(len(d["proximo"]))]
        alvos += [("REF_QUEBRADA", "decisoes", i, campo) for campo in ("demanda", "playbook") if campo in d]
    for colecao in ("celulas", "playbooks"):
        for i, item in enumerate(doc[colecao]):
            if colecao == "celulas":
                alvos += [("REF_QUEBRADA", colecao, i, campo) for campo in ("demanda", "requisito")]
            for campo in _LISTAS_REF:
                alvos += [("REF_QUEBRADA", colecao, i, campo, j) for j in range(len(item.get(campo, [])))]
    for i, f in enumerate(doc["fontes"]):
        alvos += [("REF_QUEBRADA", "fontes", i, "itens", j) for j in range(len(f.get("itens", [])))]
    return alvos


def _origem_esperada(doc: dict[str, Any], colecao: str, i: int) -> str:
    item = doc[colecao][i]
    if colecao == "celulas":
        return f"{item['demanda']}:{item['requisito']}"
    return item["id"]


def _caminho_texto(partes: tuple[Any, ...]) -> str:
    out = ""
    for p in partes:
        out += f"[{p}]" if isinstance(p, int) else (f".{p}" if out else str(p))
    return out


# Property 6: Referências quebradas e destinos inexistentes são reportados
# Validates: Requirements 3.3, 8.5, 10.6
@CFG
@given(doc=S.valid_docs(), pick=st.integers(0, 10_000))
def test_property_6_referencias_quebradas_sao_reportadas(doc: dict[str, Any], pick: int) -> None:
    alvos = _alvos_de_referencia(doc)
    assert alvos, "todo documento válido tem ao menos uma transição"
    codigo, *caminho = alvos[pick % len(alvos)]
    mutado = copy.deepcopy(doc)
    pai: Any = mutado
    for parte in caminho[:-1]:
        pai = pai[parte]
    pai[caminho[-1]] = FAKE_ID

    issues = validate(mutado, SCHEMA)

    origem = _origem_esperada(mutado, caminho[0], caminho[1])
    path = _caminho_texto(tuple(caminho))
    achados = [i for i in _por_codigo(issues, codigo) if i.path == path]
    assert achados, f"nenhum {codigo} em {path}; issues: {issues}"
    for issue in achados:
        assert FAKE_ID in issue.message, "o Issue deve conter o id inválido"
        assert issue.item_id == origem, "o Issue deve identificar o item de origem"
    # Nenhum issue de outra natureza aponta para o id inválido além dos esperados.
    assert not _por_codigo(issues, "SCHEMA")


# ------------------------------------------------------------------ Property 7

_COLECOES_DUPLICAVEIS = (
    "demandas", "requisitos", "decisoes", "playbooks", "abordagens", "tecnicas", "padroes",
    "estrategias", "categorias_ferramenta", "fontes",
)


# Property 7: Ids duplicados são reportados
# Validates: Requirements 3.4
@CFG
@given(doc=S.valid_docs(), pick=st.integers(0, 10_000))
def test_property_7_ids_duplicados_sao_reportados(doc: dict[str, Any], pick: int) -> None:
    candidatos = [(c, i) for c in _COLECOES_DUPLICAVEIS for i in range(len(doc[c]))]
    colecao, i = candidatos[pick % len(candidatos)]
    mutado = copy.deepcopy(doc)
    id_ = mutado[colecao][i]["id"]
    mutado[colecao].append(copy.deepcopy(mutado[colecao][i]))
    n = len(mutado[colecao]) - 1

    issues = validate(mutado, SCHEMA)

    duplicados = [x for x in _por_codigo(issues, "ID_DUPLICADO") if x.path == f"{colecao}[{n}].id"]
    assert duplicados, f"ID_DUPLICADO ausente para {colecao}[{n}]; issues: {issues}"
    msg = duplicados[0].message
    assert f"{colecao}[{i}]" in msg and f"{colecao}[{n}]" in msg, "o Issue deve citar os dois itens"
    assert id_ in msg and duplicados[0].item_id == id_


# ------------------------------------------------------------------ Property 8


@st.composite
def _grafos(draw: st.DrawFn) -> dict[str, Any]:
    """Documento válido em que o grafo de cada raia é reescrito livremente (sem quebrar o Schema).

    Os destinos ficam dentro da própria raia (cruzar raia é outra regra); os tipos podem ser
    qualquer um entre inicio, tarefa, bifurcacao e fim (inclusive vários ou nenhum `inicio`).
    """
    doc = copy.deepcopy(draw(S.valid_docs()))
    ids_por_raia: dict[str, list[str]] = {}
    for d in doc["decisoes"]:
        ids_por_raia.setdefault(d["raia"], []).append(d["id"])
    for d in doc["decisoes"]:
        ids = ids_por_raia[d["raia"]]
        tipo = draw(st.sampled_from(["inicio", "tarefa", "bifurcacao", "fim"]))
        alvos = draw(st.lists(st.sampled_from(ids), max_size=3))
        if tipo != "fim" and not alvos:
            alvos = [draw(st.sampled_from(ids))]  # o Schema exige ao menos uma saída fora de `fim`
        d["tipo"] = tipo
        d.pop("raia_chamada", None)
        d.pop("retorno", None)
        if tipo == "fim":
            d["retorno"] = "r"
        d["proximo"] = [{"para": a, "condicao": ""} for a in alvos]
    return doc


def _alcancaveis(decisoes: list[dict[str, Any]]) -> set[str]:
    """Alcançáveis a partir dos `inicio` de cada raia, sem sair da raia."""
    por_id = {d["id"]: d for d in decisoes}
    fila = deque(d["id"] for d in decisoes if d["tipo"] == "inicio")
    vistos = set(fila)
    while fila:
        no = por_id[fila.popleft()]
        for t in no["proximo"]:
            if t["para"] not in vistos and por_id[t["para"]]["raia"] == no["raia"]:
                vistos.add(t["para"])
                fila.append(t["para"])
    return vistos


# Property 8: Estrutura do grafo de decisões (alcançabilidade por raia)
# Validates: Requirements 3.5, 3.6
@CFG
@given(doc=_grafos())
def test_property_8_estrutura_do_grafo(doc: dict[str, Any]) -> None:
    issues = validate(doc, SCHEMA)
    assert not _por_codigo(issues, "SCHEMA"), issues

    esperado_bif = {d["id"] for d in doc["decisoes"] if d["tipo"] == "bifurcacao" and len(d["proximo"]) < 2}
    vistos = _alcancaveis(doc["decisoes"])
    esperado_orfa = {d["id"] for d in doc["decisoes"] if d["id"] not in vistos}

    assert {i.item_id for i in _por_codigo(issues, "BIFURCACAO_SAIDAS")} == esperado_bif
    assert {i.item_id for i in _por_codigo(issues, "ORFA")} == esperado_orfa
    if not esperado_bif and not esperado_orfa:
        assert not _por_codigo(issues, "BIFURCACAO_SAIDAS") and not _por_codigo(issues, "ORFA")


# Property 8 (parte final): em documento válido todo `proximo[].para` aponta para uma Decisao existente
# Validates: Requirements 3.5, 3.6
@CFG
@given(doc=S.valid_docs())
def test_property_8_documento_valido_tem_destinos_existentes(doc: dict[str, Any]) -> None:
    assert validate(doc, SCHEMA) == []
    ids = {d["id"] for d in doc["decisoes"]}
    assert all(t["para"] in ids for d in doc["decisoes"] for t in d["proximo"])


# ------------------------------------------------------------------ Property 21


def _com_pesos(doc: dict[str, Any], pesos: dict[str, float]) -> tuple[dict[str, Any], str]:
    novo = copy.deepcopy(doc)
    objetivo = sorted(novo["decisor_construir_comprar_assinar"]["pesos"])[0]
    novo["decisor_construir_comprar_assinar"]["pesos"][objetivo] = pesos
    return novo, objetivo


@st.composite
def _tabelas_de_pesos(draw: st.DrawFn) -> dict[str, float]:
    """Cinco pesos em [0,1]: livres, normalizados ou normalizados com um desvio (inclusive minúsculo)."""
    brutos = draw(st.lists(st.floats(0, 1, allow_nan=False), min_size=5, max_size=5))
    modo = draw(st.sampled_from(["livre", "normalizado", "desvio"]))
    if modo != "livre":
        total = sum(brutos)
        assume(total > 0)
        brutos = [x / total for x in brutos]
    if modo == "desvio":
        delta = draw(st.sampled_from([1e-12, -1e-12, 1e-10, -1e-10, 1e-8, -1e-8, 1e-3, -1e-3]))
        k = draw(st.integers(0, 4))
        brutos[k] += delta
        assume(0 <= brutos[k] <= 1)
    return dict(zip(S.CRITERIOS, brutos, strict=True))


# Property 21: Pesos somam 1
# Validates: Requirements 7.9
@CFG
@given(doc=S.valid_docs(), pesos=_tabelas_de_pesos())
def test_property_21_pesos_somam_um(doc: dict[str, Any], pesos: dict[str, float]) -> None:
    desvio = abs(math.fsum(pesos.values()) - 1.0)
    assume(abs(desvio - TOLERANCIA_PESOS) > 1e-12)  # evita o limite exato da tolerância
    mutado, objetivo = _com_pesos(doc, pesos)

    issues = validate(mutado, SCHEMA)

    assert not _por_codigo(issues, "SCHEMA"), issues
    reportado = [i for i in _por_codigo(issues, "PESOS") if i.item_id == objetivo]
    if desvio <= TOLERANCIA_PESOS:
        assert not reportado, "soma dentro da tolerância deve ser aceita"
    else:
        assert reportado, "soma fora da tolerância deve ser rejeitada"


# Property 21 (parte real): a soma de cada objetivo do YAML real é 1
# Validates: Requirements 7.9
@pytest.mark.skipif(not YAML_REAL.exists(), reason="engenharia_de_software.yaml ainda não existe")
def test_property_21_yaml_real_pesos_somam_um() -> None:
    doc = load_yaml(YAML_REAL)
    for objetivo, pesos in doc["decisor_construir_comprar_assinar"]["pesos"].items():
        assert abs(math.fsum(pesos.values()) - 1.0) <= TOLERANCIA_PESOS, objetivo


# ------------------------------------------------------------------ Property 32


def _percorrer(decisoes: list[dict[str, Any]]) -> set[str]:
    """Percorredor mínimo: lê só `id`, `condicao`, `proximo` e `estado` (e `tipo` para achar o início)."""
    por_id = {d["id"]: d for d in decisoes}
    fila = deque(d["id"] for d in decisoes if d["tipo"] == "inicio")
    vistos = set(fila)
    while fila:
        no = por_id[fila.popleft()]
        assert isinstance(no["condicao"], str) and isinstance(no["estado"], dict)
        for t in no["proximo"]:
            assert isinstance(t["condicao"], str)
            if t["para"] not in vistos:
                vistos.add(t["para"])
                fila.append(t["para"])
    return vistos


# Property 32: Fluxo percorrível apenas com id, condição, próximo e estado
# Validates: Requirements 13.2, 13.3, 13.5
@CFG
@given(doc=S.valid_docs())
def test_property_32_fluxo_percorrivel_com_campos_minimos(doc: dict[str, Any]) -> None:
    reduzido = [
        {k: d[k] for k in ("id", "tipo", "condicao", "proximo", "estado")} for d in doc["decisoes"]
    ]
    assert _percorrer(reduzido) == {d["id"] for d in doc["decisoes"]}


# Property 32 (parte do Schema): rejeita `proximo` sem `para` ou `condicao` e `estado` que não é objeto
# Validates: Requirements 13.2, 13.3, 13.5
@CFG
@given(
    doc=S.valid_docs(),
    pick=st.integers(0, 10_000),
    defeito=st.sampled_from(["sem_para", "sem_condicao", "estado_invalido"]),
    estado_ruim=st.one_of(st.none(), st.integers(), st.text(max_size=5), st.lists(st.integers(), max_size=3), st.booleans()),
)
def test_property_32_schema_rejeita_fluxo_malformado(
    doc: dict[str, Any], pick: int, defeito: str, estado_ruim: Any
) -> None:
    mutado = copy.deepcopy(doc)
    if defeito == "estado_invalido":
        i = pick % len(mutado["decisoes"])
        mutado["decisoes"][i]["estado"] = estado_ruim
        esperado = f"decisoes[{i}].estado"
    else:
        pares = [(i, j) for i, d in enumerate(mutado["decisoes"]) for j in range(len(d["proximo"]))]
        i, j = pares[pick % len(pares)]
        del mutado["decisoes"][i]["proximo"][j]["para" if defeito == "sem_para" else "condicao"]
        esperado = f"decisoes[{i}].proximo[{j}]"

    issues = validate(mutado, SCHEMA)

    assert any(x.code == "SCHEMA" and x.path == esperado for x in issues), (esperado, issues)
