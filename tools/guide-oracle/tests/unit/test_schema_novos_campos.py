"""Testes dos campos opcionais do schema: status, fonte_ids, exemplo, quando_usar, quando_evitar e Estrategia."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

import pytest
from hypothesis import HealthCheck, given, settings

from guia_decisao.validator import validate
from tests.properties.strategies import valid_docs
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))


def _base() -> dict[str, Any]:
    return {
        "versao": 1,
        "demandas": [{"id": "d1", "nome": "D"}],
        "raias": [{"id": "d1_main", "nome": "Principal", "demanda": "d1", "responsabilidade": "conduzir o fluxo",
                   "cor": "#1f77b4", "orquestradora": True}],
        "requisitos": [{"id": "r1", "nome": "R"}],
        "decisoes": [
            {"id": "d1_main_s0", "raia": "d1_main", "tipo": "inicio", "condicao": "",
             "proximo": [{"para": "d1_main_e1", "condicao": ""}], "estado": {}},
            {"id": "d1_main_e1", "raia": "d1_main", "tipo": "fim", "retorno": "ok", "condicao": "", "proximo": [],
             "estado": {}},
        ],
        "celulas": [{"demanda": "d1", "requisito": "r1"}],
        "playbooks": [{"id": "pb", "resumo": "x"}],
        "abordagens": [{"id": "ab", "nome": "A"}],
        "tecnicas": [{"id": "te", "nome": "T"}],
        "padroes": [{"id": "pa", "nome": "P"}],
        "estrategias": [{"id": "es", "nome": "E"}],
        "categorias_ferramenta": [
            {"id": "cf", "nome": "C", "custo": "baixo", "beneficio": "alto", "dependencia_fornecedor": "medio"}
        ],
        "fontes": [
            {"id": "f1", "tipo": "livro", "titulo": "L", "link": "https://x.com", "status_revisao": "pendente",
             "proxima_revisao": "2026-07-01"}
        ],
        "decisor_construir_comprar_assinar": {
            "criterios": ["diferenciacao", "tempo_ate_valor", "custo_total", "dependencia_fornecedor", "risco"],
            "escala": {"min": 1, "max": 5},
            "opcoes": ["construir", "comprar", "assinar"],
            "ordem_desempate": ["assinar", "comprar", "construir"],
            "pesos": {"o": {"diferenciacao": 0.2, "tempo_ate_valor": 0.2, "custo_total": 0.2,
                            "dependencia_fornecedor": 0.2, "risco": 0.2}},
        },
    }


def _com(caminho: tuple[Any, ...], valor: Any) -> dict[str, Any]:
    doc = copy.deepcopy(_base())
    pai: Any = doc
    for p in caminho[:-1]:
        pai = pai[p]
    pai[caminho[-1]] = valor
    return doc


def test_base_valida() -> None:
    assert validate(_base(), SCHEMA) == []


@pytest.mark.parametrize(
    "colecao", ["decisoes", "raias", "celulas", "playbooks", "abordagens", "tecnicas", "padroes", "estrategias", "categorias_ferramenta"]
)
def test_status_valido_aceito_e_invalido_rejeitado(colecao: str) -> None:
    for ok in ("rascunho", "revisado", "publicado"):
        assert validate(_com((colecao, 0, "status"), ok), SCHEMA) == []
    issues = validate(_com((colecao, 0, "status"), "aprovado"), SCHEMA)
    assert any(i.code == "SCHEMA" and i.path == f"{colecao}[0].status" for i in issues)


def test_status_nao_vale_em_fonte_nem_decisor() -> None:
    assert validate(_com(("fontes", 0, "status"), "rascunho"), SCHEMA)
    assert validate(_com(("decisor_construir_comprar_assinar", "status"), "rascunho"), SCHEMA)


def test_fonte_ids_quebrado_reporta_ref_quebrada() -> None:
    for colecao in ("abordagens", "tecnicas", "padroes", "estrategias"):
        assert validate(_com((colecao, 0, "fonte_ids"), ["f1"]), SCHEMA) == []
        issues = validate(_com((colecao, 0, "fonte_ids"), ["f1", "inexistente"]), SCHEMA)
        assert len(issues) == 1
        i = issues[0]
        assert i.code == "REF_QUEBRADA"
        assert i.path == f"{colecao}[0].fonte_ids[1]"
        assert i.item_id == _base()[colecao][0]["id"]


def test_campos_de_conhecimento_aceitos_e_tipos_validados() -> None:
    doc = _com(("tecnicas", 0, "exemplo"), "caso real")
    doc["tecnicas"][0]["quando_usar"] = ["a"]
    doc["tecnicas"][0]["quando_evitar"] = ["b"]
    assert validate(doc, SCHEMA) == []
    assert validate(_com(("tecnicas", 0, "quando_usar"), "texto"), SCHEMA)
    assert validate(_com(("tecnicas", 0, "exemplo"), 3), SCHEMA)


def test_extra_em_estrutura_fechada_rejeitado() -> None:
    for caminho in (("decisoes", 0, "extra"), ("raias", 0, "extra"), ("celulas", 0, "extra"), ("playbooks", 0, "extra"),
                    ("fontes", 0, "extra"), ("extra",)):
        assert any(i.code == "SCHEMA" for i in validate(_com(caminho, 1), SCHEMA)), caminho


def test_extra_em_estrutura_aberta_aceito() -> None:
    for caminho in (("demandas", 0, "extra"), ("requisitos", 0, "extra"), ("tecnicas", 0, "extra"),
                    ("estrategias", 0, "extra"), ("categorias_ferramenta", 0, "extra")):
        assert validate(_com(caminho, 1), SCHEMA) == [], caminho


def test_estrategia_aceita_custo_beneficio_dependencia() -> None:
    doc = _com(("estrategias", 0, "custo"), "alto")
    doc["estrategias"][0]["beneficio"] = "medio"
    doc["estrategias"][0]["dependencia_fornecedor"] = "baixo"
    assert validate(doc, SCHEMA) == []


@pytest.mark.parametrize("campo", ["custo", "beneficio", "dependencia_fornecedor"])
def test_estrategia_rejeita_valor_fora_do_enum(campo: str) -> None:
    issues = validate(_com(("estrategias", 0, campo), "enorme"), SCHEMA)
    assert any(i.code == "SCHEMA" and i.path == f"estrategias[0].{campo}" for i in issues)


@settings(max_examples=60, suppress_health_check=[HealthCheck.too_slow])
@given(valid_docs())
def test_valid_docs_com_novos_campos_passam(doc: dict[str, Any]) -> None:
    assert validate(doc, SCHEMA) == []


# ------------------------------------------------- `exemplo` em Playbook e Subtarefa


@pytest.mark.parametrize("def_", ["Playbook", "Subtarefa"])
def test_exemplo_e_texto_opcional_em_playbook_e_subtarefa(def_: str) -> None:
    from jsonschema import Draft202012Validator

    minimo = {"Playbook": {"id": "pb", "resumo": "x"}, "Subtarefa": {"id": "n_st1", "rotulo": "R"}}[def_]
    v = Draft202012Validator({"$ref": f"#/$defs/{def_}", "$defs": SCHEMA["$defs"]})
    assert not list(v.iter_errors(minimo))  # opcional
    assert not list(v.iter_errors({**minimo, "exemplo": "Compras afetadas: 8 mil em 15 minutos."}))
    for errado in (3, True, ["a"], {"a": 1}, None):
        assert list(v.iter_errors({**minimo, "exemplo": errado})), errado
    assert list(v.iter_errors({**minimo, "exemplos": "x"}))  # estrutura fechada: só `exemplo` está declarado


def test_documento_completo_aceita_exemplo_no_playbook_e_rejeita_tipo_errado() -> None:
    doc = _base()
    doc["playbooks"][0]["exemplo"] = "Checkout com 12% de erros: sev1."
    assert validate(doc, SCHEMA) == []
    doc["playbooks"][0]["exemplo"] = 12
    assert [i.code for i in validate(doc, SCHEMA)] == ["SCHEMA"]
