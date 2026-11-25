"""Testes das ligações entre demandas (campo opcional `ligacoes` em Decisao)."""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

from hypothesis import HealthCheck, given, settings

from guia_decisao.validator import validate
from tests.properties.strategies import valid_docs
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))


def _doc() -> dict[str, Any]:
    def dec(id_: str, demanda: str, tipo: str, prox: list[str], **extra: Any) -> dict[str, Any]:
        d = {"id": id_, "raia": f"{demanda}_main", "demanda": demanda, "tipo": tipo, "condicao": "",
             "proximo": [{"para": p, "condicao": ""} for p in prox], "estado": {}, **extra}
        if tipo == "fim":
            d["retorno"] = "ok"
        return d

    def raia(demanda: str, cor: str) -> dict[str, Any]:
        return {"id": f"{demanda}_main", "nome": demanda, "demanda": demanda,
                "responsabilidade": "conduzir o fluxo", "cor": cor, "orquestradora": True}

    return {
        "versao": 1,
        "demandas": [{"id": "bug", "nome": "Bug"}, {"id": "incidente", "nome": "Incidente"}],
        "raias": [raia("bug", "#1f77b4"), raia("incidente", "#d62728")],
        "requisitos": [{"id": "r1", "nome": "R"}],
        "decisoes": [
            dec("bug_main_s0", "bug", "inicio", ["bug_main_e1"], ligacoes=[
                {"demanda_destino": "incidente", "para": "incidente_main_s0", "condicao": "impacto alto"}]),
            dec("bug_main_e1", "bug", "fim", []),
            dec("incidente_main_s0", "incidente", "inicio", ["incidente_main_e1"]),
            dec("incidente_main_e1", "incidente", "fim", []),
        ],
        "celulas": [], "playbooks": [], "abordagens": [], "tecnicas": [], "padroes": [],
        "estrategias": [], "categorias_ferramenta": [], "fontes": [],
        "decisor_construir_comprar_assinar": {
            "criterios": ["diferenciacao", "tempo_ate_valor", "custo_total", "dependencia_fornecedor", "risco"],
            "escala": {"min": 1, "max": 5},
            "opcoes": ["construir", "comprar", "assinar"],
            "ordem_desempate": ["assinar", "comprar", "construir"],
            "pesos": {"o": {"diferenciacao": 0.2, "tempo_ate_valor": 0.2, "custo_total": 0.2,
                            "dependencia_fornecedor": 0.2, "risco": 0.2}},
        },
    }


def _lig(doc: dict[str, Any]) -> dict[str, Any]:
    return doc["decisoes"][0]["ligacoes"][0]


def _codigos(doc: dict[str, Any]) -> list[str]:
    return [i.code for i in validate(doc, SCHEMA)]


def test_ligacao_valida_sem_issues() -> None:
    assert validate(_doc(), SCHEMA) == []


def test_tipo_alimenta_e_rotulo_sao_aceitos() -> None:
    doc = _doc()
    _lig(doc).update(tipo="alimenta", rotulo="vira incidente")
    assert validate(doc, SCHEMA) == []


def test_tipo_invalido_e_campo_extra_sao_rejeitados() -> None:
    doc = _doc()
    _lig(doc)["tipo"] = "dispara"
    assert "SCHEMA" in _codigos(doc)
    doc = _doc()
    _lig(doc)["extra"] = 1
    assert "SCHEMA" in _codigos(doc)


def test_campo_obrigatorio_ausente_na_ligacao() -> None:
    for campo in ("demanda_destino", "para", "condicao"):
        doc = _doc()
        del _lig(doc)[campo]
        assert "SCHEMA" in _codigos(doc), campo


def test_para_inexistente_gera_ref_quebrada() -> None:
    doc = _doc()
    _lig(doc)["para"] = "nao_existe"
    issues = validate(doc, SCHEMA)
    assert [(i.code, i.path, i.item_id) for i in issues] == [
        ("REF_QUEBRADA", "decisoes[0].ligacoes[0].para", "bug_main_s0")]


def test_demanda_destino_inexistente_gera_ref_quebrada() -> None:
    doc = _doc()
    _lig(doc)["demanda_destino"] = "fantasma"
    issues = validate(doc, SCHEMA)
    assert [(i.code, i.path) for i in issues] == [("REF_QUEBRADA", "decisoes[0].ligacoes[0].demanda_destino")]


def test_destino_de_outra_demanda_gera_ligacao_inconsistente() -> None:
    doc = _doc()
    _lig(doc)["para"] = "bug_main_e1"  # pertence a bug, mas demanda_destino é incidente
    issues = validate(doc, SCHEMA)
    assert [(i.code, i.path) for i in issues] == [("LIGACAO_INCONSISTENTE", "decisoes[0].ligacoes[0].para")]


def test_ligacao_para_a_propria_demanda_gera_ligacao_inconsistente() -> None:
    doc = _doc()
    _lig(doc).update(demanda_destino="bug", para="bug_main_e1")
    issues = validate(doc, SCHEMA)
    assert [i.code for i in issues] == ["LIGACAO_INCONSISTENTE"]
    assert issues[0].path == "decisoes[0].ligacoes[0].demanda_destino"


def test_destino_sem_campo_demanda_nao_gera_inconsistencia() -> None:
    doc = _doc()
    del doc["decisoes"][2]["demanda"]
    assert validate(doc, SCHEMA) == []


def test_ligacao_nao_conta_na_alcancabilidade() -> None:
    doc = _doc()
    # i_ini deixa de ser início e só seria alcançado pela ligação: continua órfão.
    doc["decisoes"][2]["tipo"] = "tarefa"  # incidente_main_s0 deixa de ser início
    issues = validate(doc, SCHEMA)
    assert [(i.code, i.item_id) for i in issues if i.code == "ORFA"] == [("ORFA", "incidente_main_s0"), ("ORFA", "incidente_main_e1")]


def test_validate_nao_muta_o_documento() -> None:
    doc = _doc()
    antes = copy.deepcopy(doc)
    validate(doc, SCHEMA)
    assert doc == antes


@settings(max_examples=60, suppress_health_check=[HealthCheck.too_slow, HealthCheck.data_too_large])
@given(valid_docs())
def test_docs_validos_com_ligacoes_geradas_passam(doc: dict[str, Any]) -> None:
    assert validate(doc, SCHEMA) == []
