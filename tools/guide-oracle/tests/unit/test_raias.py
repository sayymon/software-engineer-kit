"""Testes do modelo de raias (responsabilidade única por raia): um exemplo válido e um inválido por regra.

Cobre os códigos RAIA_SEM_INICIO, RAIA_INICIO_MULTIPLO, RAIA_SEM_FIM, TRANSICAO_ENTRE_RAIAS,
CHAMADA_INVALIDA, CHAMADA_CICLO, RETORNOS_INCOMPATIVEIS, ORQUESTRADORA, RAIA_ORFA,
DEMANDA_INCONSISTENTE, COR_DUPLICADA e ID_PADRAO, além de REF_QUEBRADA e ORFA por raia.
Inclui property tests (Properties 35 a 38) sobre os documentos de `valid_docs()`.
"""

from __future__ import annotations

import copy
import json
import re
from pathlib import Path
from typing import Any, Callable

import pytest
from hypothesis import HealthCheck, assume, given, settings
from hypothesis import strategies as st

from guia_decisao.validator import Issue, validate
from tests.properties.strategies import valid_docs
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))

CFG = settings(max_examples=100, deadline=None, suppress_health_check=list(HealthCheck))


# ------------------------------------------------------------------ documento mínimo válido


def _no(id_: str, raia: str, tipo: str, prox: list[tuple[str, str]] | None = None, **extra: Any) -> dict[str, Any]:
    d: dict[str, Any] = {
        "id": id_, "raia": raia, "tipo": tipo, "condicao": "",
        "proximo": [{"para": p, "condicao": c} for p, c in (prox or [])], "estado": {},
    }
    d.update(extra)
    return d


def _raia(id_: str, demanda: str, cor: str, orquestradora: bool = False) -> dict[str, Any]:
    return {"id": id_, "nome": id_, "demanda": demanda, "responsabilidade": f"responsabilidade de {id_}",
            "cor": cor, "orquestradora": orquestradora}


def _doc() -> dict[str, Any]:
    """Demanda `inc` (sigla `inc`) com a orquestradora `inc_orq`, que chama a raia `inc_tri` (retornos sev1 e alarme_falso)."""
    return {
        "versao": 1,
        "demandas": [{"id": "inc", "nome": "Incidente", "sigla": "inc"}, {"id": "bug", "nome": "Bug", "sigla": "bug"}],
        "raias": [
            _raia("inc_orq", "inc", "#1f77b4", True),
            _raia("inc_tri", "inc", "#d62728"),
            _raia("bug_main", "bug", "#1f77b4", True),
        ],
        "requisitos": [{"id": "r1", "nome": "R"}],
        "decisoes": [
            _no("inc_orq_s0", "inc_orq", "inicio", [("inc_orq_c1", "")]),
            _no("inc_orq_c1", "inc_orq", "chamada", [("inc_orq_e2", "sev1"), ("inc_orq_e3", "alarme_falso")],
                raia_chamada="inc_tri"),
            _no("inc_orq_e2", "inc_orq", "fim", retorno="resolvido"),
            _no("inc_orq_e3", "inc_orq", "fim", retorno="descartado"),
            _no("inc_tri_s0", "inc_tri", "inicio", [("inc_tri_g1", "")]),
            _no("inc_tri_g1", "inc_tri", "bifurcacao", [("inc_tri_e2", "grave"), ("inc_tri_e3", "ruído")]),
            _no("inc_tri_e2", "inc_tri", "fim", retorno="sev1"),
            _no("inc_tri_e3", "inc_tri", "fim", retorno="alarme_falso"),
            _no("bug_main_s0", "bug_main", "inicio", [("bug_main_e1", "")]),
            _no("bug_main_e1", "bug_main", "fim", retorno="corrigido"),
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


def _n(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(d for d in doc["decisoes"] if d["id"] == id_)


def _r(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(r for r in doc["raias"] if r["id"] == id_)


def _codigos(doc: dict[str, Any]) -> list[str]:
    return [i.code for i in validate(doc, SCHEMA)]


def _achados(doc: dict[str, Any], codigo: str) -> list[Issue]:
    return [i for i in validate(doc, SCHEMA) if i.code == codigo]


def test_doc_minimo_valido() -> None:
    assert validate(_doc(), SCHEMA) == []


# ------------------------------------------------------------------ schema


def test_raias_e_obrigatoria_no_topo() -> None:
    doc = _doc()
    del doc["raias"]
    assert any(i.code == "SCHEMA" for i in validate(doc, SCHEMA))


def test_raias_pode_ser_lista_vazia_sem_decisoes() -> None:
    doc = _doc()
    doc["raias"], doc["decisoes"] = [], []
    assert validate(doc, SCHEMA) == []


@pytest.mark.parametrize("campo", ["id", "nome", "demanda", "responsabilidade", "cor"])
def test_campo_obrigatorio_da_raia(campo: str) -> None:
    doc = _doc()
    del doc["raias"][0][campo]
    assert any(i.code == "SCHEMA" and i.path == "raias[0]" for i in validate(doc, SCHEMA))


@pytest.mark.parametrize("cor", ["azul", "#fff", "1f77b4", "#1f77b4ff", "#gggggg"])
def test_cor_invalida_e_rejeitada(cor: str) -> None:
    doc = _doc()
    doc["raias"][0]["cor"] = cor
    assert any(i.code == "SCHEMA" and i.path == "raias[0].cor" for i in validate(doc, SCHEMA))


def test_raia_e_estrutura_fechada() -> None:
    doc = _doc()
    doc["raias"][0]["extra"] = 1
    assert "SCHEMA" in _codigos(doc)


def test_decisao_exige_raia() -> None:
    doc = _doc()
    del doc["decisoes"][0]["raia"]
    assert any(i.code == "SCHEMA" and i.path == "decisoes[0]" for i in validate(doc, SCHEMA))


def test_fim_exige_retorno() -> None:
    doc = _doc()
    del _n(doc, "inc_tri_e2")["retorno"]
    assert any(i.code == "SCHEMA" for i in validate(doc, SCHEMA))


def test_layout_aceita_so_coluna() -> None:
    doc = _doc()
    _n(doc, "inc_orq_s0")["layout"] = {"coluna": 2}
    assert validate(doc, SCHEMA) == []
    _n(doc, "inc_orq_s0")["layout"] = {"coluna": 2, "raia": 1}
    assert any(i.code == "SCHEMA" for i in validate(doc, SCHEMA))


def test_sigla_da_demanda_e_um_id() -> None:
    doc = _doc()
    doc["demandas"][0]["sigla"] = "Inc Ident"
    assert any(i.code == "SCHEMA" and i.path.startswith("demandas[0]") for i in validate(doc, SCHEMA))


def test_demanda_sem_sigla_e_valida() -> None:
    doc = _doc()
    del doc["demandas"][0]["sigla"]
    assert validate(doc, SCHEMA) == []


# ------------------------------------------------------------------ REF_QUEBRADA


def test_ref_quebrada_raia_do_no() -> None:
    doc = _doc()
    _n(doc, "inc_tri_e2")["raia"] = "fantasma"
    achados = [i for i in _achados(doc, "REF_QUEBRADA") if i.path == "decisoes[6].raia"]
    assert achados and achados[0].item_id == "inc_tri_e2"


def test_ref_quebrada_raia_chamada() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["raia_chamada"] = "fantasma"
    assert [i.path for i in _achados(doc, "REF_QUEBRADA")] == ["decisoes[1].raia_chamada"]


def test_ref_quebrada_demanda_da_raia() -> None:
    doc = _doc()
    _r(doc, "inc_tri")["demanda"] = "fantasma"
    achados = _achados(doc, "REF_QUEBRADA")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1].demanda", "inc_tri")]


# ------------------------------------------------------------------ início e fim


def test_raia_sem_inicio() -> None:
    doc = _doc()
    _n(doc, "inc_tri_s0")["tipo"] = "tarefa"
    achados = _achados(doc, "RAIA_SEM_INICIO")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1]", "inc_tri")]


def test_raia_inicio_multiplo() -> None:
    doc = _doc()
    _n(doc, "inc_tri_g1")["tipo"] = "inicio"
    achados = _achados(doc, "RAIA_INICIO_MULTIPLO")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1]", "inc_tri")]


def test_raia_sem_fim() -> None:
    doc = _doc()
    for id_ in ("inc_tri_e2", "inc_tri_e3"):
        n = _n(doc, id_)
        n["tipo"] = "tarefa"
        n.pop("retorno")
        n["proximo"] = [{"para": "inc_tri_s0", "condicao": ""}]
    achados = _achados(doc, "RAIA_SEM_FIM")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1]", "inc_tri")]


def test_retorno_repetido_na_raia() -> None:
    doc = _doc()
    _n(doc, "inc_tri_e3")["retorno"] = "sev1"
    achados = _achados(doc, "RAIA_SEM_FIM")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[7].retorno", "inc_tri_e3")]


def test_mesmo_retorno_em_raias_diferentes_e_valido() -> None:
    doc = _doc()
    _n(doc, "inc_orq_e2")["retorno"] = "sev1"
    assert validate(doc, SCHEMA) == []


# ------------------------------------------------------------------ transição entre raias


def test_transicao_entre_raias() -> None:
    doc = _doc()
    _n(doc, "inc_orq_s0")["proximo"][0]["para"] = "inc_tri_e2"
    achados = _achados(doc, "TRANSICAO_ENTRE_RAIAS")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[0].proximo[0].para", "inc_orq_s0")]


# ------------------------------------------------------------------ chamadas


def test_chamada_sem_raia_chamada() -> None:
    doc = _doc()
    del _n(doc, "inc_orq_c1")["raia_chamada"]
    achados = _achados(doc, "CHAMADA_INVALIDA")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1]", "inc_orq_c1")]


def test_chamada_da_propria_raia() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["raia_chamada"] = "inc_orq"
    achados = _achados(doc, "CHAMADA_INVALIDA")
    assert [i.path for i in achados] == ["decisoes[1].raia_chamada"]


def test_chamada_de_raia_de_outra_demanda() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["raia_chamada"] = "bug_main"
    achados = _achados(doc, "CHAMADA_INVALIDA")
    assert [i.path for i in achados] == ["decisoes[1].raia_chamada"]
    assert "ligacoes" in achados[0].message


def test_raia_chamada_em_no_que_nao_e_chamada() -> None:
    doc = _doc()
    _n(doc, "inc_tri_g1")["raia_chamada"] = "inc_orq"
    assert [i.path for i in _achados(doc, "CHAMADA_INVALIDA")] == ["decisoes[5].raia_chamada"]


def _com_chamada_de_volta(doc: dict[str, Any]) -> dict[str, Any]:
    """`inc_tri` passa a chamar `inc_orq` (retornos resolvido e descartado): forma o ciclo orq -> tri -> orq."""
    doc["decisoes"].append(_no("inc_tri_c4", "inc_tri", "chamada",
                               [("inc_tri_e2", "resolvido"), ("inc_tri_e3", "descartado")], raia_chamada="inc_orq"))
    _n(doc, "inc_tri_g1")["proximo"].append({"para": "inc_tri_c4", "condicao": "volta"})
    return doc


def test_chamada_ciclo() -> None:
    doc = _com_chamada_de_volta(_doc())
    achados = _achados(doc, "CHAMADA_CICLO")
    assert sorted(i.item_id for i in achados) == ["inc_orq", "inc_tri"]


def test_chamada_sem_ciclo_nao_reporta() -> None:
    assert _achados(_doc(), "CHAMADA_CICLO") == []


def test_retornos_incompativeis_condicao_diferente() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["proximo"][1]["condicao"] = "outro"
    achados = _achados(doc, "RETORNOS_INCOMPATIVEIS")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1].proximo", "inc_orq_c1")]
    assert "faltam" in achados[0].message and "sobram" in achados[0].message


def test_retornos_incompativeis_saida_faltando() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["proximo"].pop()
    assert [i.item_id for i in _achados(doc, "RETORNOS_INCOMPATIVEIS")] == ["inc_orq_c1"]


def test_retornos_incompativeis_saida_sobrando() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["proximo"].append({"para": "inc_orq_e2", "condicao": "extra"})
    assert [i.item_id for i in _achados(doc, "RETORNOS_INCOMPATIVEIS")] == ["inc_orq_c1"]


def test_retornos_incompativeis_saida_repetida() -> None:
    doc = _doc()
    _n(doc, "inc_orq_c1")["proximo"].append({"para": "inc_orq_e3", "condicao": "sev1"})
    assert [i.item_id for i in _achados(doc, "RETORNOS_INCOMPATIVEIS")] == ["inc_orq_c1"]


# ------------------------------------------------------------------ orquestradora


def test_demanda_sem_orquestradora() -> None:
    doc = _doc()
    _r(doc, "inc_orq")["orquestradora"] = False
    achados = _achados(doc, "ORQUESTRADORA")
    assert [(i.path, i.item_id) for i in achados] == [("raias[0]", "inc")]


def test_demanda_com_duas_orquestradoras() -> None:
    doc = _doc()
    _r(doc, "inc_tri")["orquestradora"] = True
    achados = _achados(doc, "ORQUESTRADORA")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1].orquestradora", "inc_tri")]


def test_raia_orfa() -> None:
    doc = _doc()
    doc["raias"].append(_raia("inc_extra", "inc", "#2ca02c"))
    doc["decisoes"] += [_no("inc_extra_s0", "inc_extra", "inicio", [("inc_extra_e1", "")]),
                        _no("inc_extra_e1", "inc_extra", "fim", retorno="ok")]
    achados = _achados(doc, "RAIA_ORFA")
    assert [(i.path, i.item_id) for i in achados] == [("raias[3]", "inc_extra")]


def test_orquestradora_nao_precisa_ser_chamada() -> None:
    assert _achados(_doc(), "RAIA_ORFA") == []


# ------------------------------------------------------------------ demanda e cor


def test_demanda_inconsistente() -> None:
    doc = _doc()
    _n(doc, "inc_tri_g1")["demanda"] = "bug"
    achados = _achados(doc, "DEMANDA_INCONSISTENTE")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[5].demanda", "inc_tri_g1")]


def test_demanda_igual_a_da_raia_e_valida() -> None:
    doc = _doc()
    _n(doc, "inc_tri_g1")["demanda"] = "inc"
    assert validate(doc, SCHEMA) == []


def test_cor_duplicada_ignora_caixa() -> None:
    doc = _doc()
    _r(doc, "inc_tri")["cor"] = "#1F77B4"  # igual a inc_orq, em maiúsculas
    achados = _achados(doc, "COR_DUPLICADA")
    assert [(i.path, i.item_id) for i in achados] == [("raias[1].cor", "inc_tri")]


def test_mesma_cor_em_demandas_diferentes_e_valida() -> None:
    # inc_orq e bug_main usam #1f77b4 no documento mínimo
    assert _achados(_doc(), "COR_DUPLICADA") == []


# ------------------------------------------------------------------ ids


@pytest.mark.parametrize(
    ("antigo", "novo"),
    [
        ("inc_tri_g1", "inc_tri_t1"),  # letra de outro tipo
        ("inc_tri_g1", "inc_tri_g"),  # sem número
        ("inc_tri_g1", "inc_tri_gx"),  # número inválido
        ("inc_tri_g1", "inc_orq_g1"),  # prefixo de outra raia
        ("inc_tri_g1", "g1"),  # sem prefixo da raia
    ],
)
def test_id_fora_do_padrao(antigo: str, novo: str) -> None:
    doc = _renomear(_doc(), antigo, novo)
    achados = _achados(doc, "ID_PADRAO")
    assert [i.item_id for i in achados] == [novo]


def test_raia_sem_prefixo_da_sigla() -> None:
    doc = _doc()
    doc["demandas"][0]["sigla"] = "feat"
    achados = [i for i in _achados(doc, "ID_PADRAO") if i.path.startswith("raias[")]
    assert sorted(i.item_id for i in achados) == ["inc_orq", "inc_tri"]


def test_raia_sem_sigla_nao_exige_prefixo() -> None:
    doc = _doc()
    del doc["demandas"][0]["sigla"]
    assert validate(doc, SCHEMA) == []


# ------------------------------------------------------------------ alcançabilidade por raia


def test_orfa_por_raia() -> None:
    doc = _doc()
    doc["decisoes"].append(_no("inc_tri_t9", "inc_tri", "tarefa", [("inc_tri_e2", "")]))
    achados = _achados(doc, "ORFA")
    assert [i.item_id for i in achados] == ["inc_tri_t9"]


def test_chamada_nao_torna_no_da_outra_raia_alcancavel() -> None:
    doc = _doc()
    # sem o início de inc_tri, seus nós seguem órfãos mesmo havendo chamada vinda de inc_orq
    _n(doc, "inc_tri_s0")["tipo"] = "tarefa"
    assert {i.item_id for i in _achados(doc, "ORFA")} == {"inc_tri_s0", "inc_tri_g1", "inc_tri_e2", "inc_tri_e3"}


def test_bifurcacao_saidas_continua_valendo() -> None:
    doc = _doc()
    _n(doc, "inc_tri_g1")["proximo"].pop()
    assert [i.item_id for i in _achados(doc, "BIFURCACAO_SAIDAS")] == ["inc_tri_g1"]


# ------------------------------------------------------------------ propriedades sobre valid_docs


def _renomear(doc: dict[str, Any], antigo: str, novo: str) -> dict[str, Any]:
    out = copy.deepcopy(doc)
    for d in out["decisoes"]:
        if d["id"] == antigo:
            d["id"] = novo
        for t in d["proximo"]:
            if t["para"] == antigo:
                t["para"] = novo
        for lig in d.get("ligacoes", []):
            if lig["para"] == antigo:
                lig["para"] = novo
    return out


def _chamadas(doc: dict[str, Any]) -> list[dict[str, Any]]:
    return [d for d in doc["decisoes"] if d["tipo"] == "chamada"]


def _retornos(doc: dict[str, Any], raia: str) -> list[str]:
    return [d["retorno"] for d in doc["decisoes"] if d["raia"] == raia and d["tipo"] == "fim"]


_ID_NO = {"inicio": "s", "tarefa": "t", "bifurcacao": "g", "chamada": "c", "fim": "e"}


# Property 35: toda raia tem exatamente 1 início, ao menos 1 fim e retornos únicos
# Validates: Requirements 15.2, 15.3
@CFG
@given(doc=valid_docs(), pick=st.integers(0, 10_000))
def test_property_35_raia_tem_um_inicio_e_retornos_unicos(doc: dict[str, Any], pick: int) -> None:
    assert validate(doc, SCHEMA) == []
    for r in doc["raias"]:
        nos = [d for d in doc["decisoes"] if d["raia"] == r["id"]]
        assert sum(d["tipo"] == "inicio" for d in nos) == 1
        rets = _retornos(doc, r["id"])
        assert rets and len(rets) == len(set(rets))

    mutado = copy.deepcopy(doc)
    alvo = mutado["raias"][pick % len(mutado["raias"])]["id"]
    inicio = next(d for d in mutado["decisoes"] if d["raia"] == alvo and d["tipo"] == "inicio")
    inicio["tipo"] = "tarefa"
    assert any(i.code == "RAIA_SEM_INICIO" and i.item_id == alvo for i in validate(mutado, SCHEMA))

    mutado = copy.deepcopy(doc)
    outro = next((d for d in mutado["decisoes"] if d["raia"] == alvo and d["tipo"] == "tarefa"), None)
    if outro is not None:
        outro["tipo"] = "inicio"
        assert any(i.code == "RAIA_INICIO_MULTIPLO" and i.item_id == alvo for i in validate(mutado, SCHEMA))

    mutado = copy.deepcopy(doc)
    fins = [d for d in mutado["decisoes"] if d["raia"] == alvo and d["tipo"] == "fim"]
    if len(fins) >= 2:
        fins[1]["retorno"] = fins[0]["retorno"]
        assert any(i.code == "RAIA_SEM_FIM" and i.item_id == fins[1]["id"] for i in validate(mutado, SCHEMA))


# Property 36: o grafo de chamadas é acíclico; um ciclo introduzido é reportado
# Validates: Requirements 15.7
@CFG
@given(doc=valid_docs(), pick=st.integers(0, 10_000))
def test_property_36_chamadas_aciclicas(doc: dict[str, Any], pick: int) -> None:
    chamadas = _chamadas(doc)
    assume(chamadas)
    assert not [i for i in validate(doc, SCHEMA) if i.code in ("CHAMADA_CICLO", "CHAMADA_INVALIDA")]

    c = chamadas[pick % len(chamadas)]
    a, b = c["raia"], c["raia_chamada"]
    mutado = copy.deepcopy(doc)
    inicio_b = next(d for d in mutado["decisoes"] if d["raia"] == b and d["tipo"] == "inicio")
    destino = inicio_b["id"]
    # `b` passa a chamar `a`, fechando o ciclo a -> b -> a (saídas = retornos de `a`).
    volta = _no(f"{b}_c900", b, "chamada", [(destino, r) for r in _retornos(mutado, a)], raia_chamada=a)
    mutado["decisoes"].append(volta)
    inicio_b["proximo"].append({"para": volta["id"], "condicao": ""})
    ciclo = {i.item_id for i in validate(mutado, SCHEMA) if i.code == "CHAMADA_CICLO"}
    assert {a, b} <= ciclo


# Property 37: as saídas de uma chamada casam com os retornos da raia chamada
# Validates: Requirements 15.6
@CFG
@given(doc=valid_docs(), pick=st.integers(0, 10_000), modo=st.sampled_from(["remover", "trocar", "acrescentar"]))
def test_property_37_retornos_compativeis(doc: dict[str, Any], pick: int, modo: str) -> None:
    chamadas = _chamadas(doc)
    assume(chamadas)
    for c in chamadas:
        assert {t["condicao"] for t in c["proximo"]} == set(_retornos(doc, c["raia_chamada"]))
    assert not [i for i in validate(doc, SCHEMA) if i.code == "RETORNOS_INCOMPATIVEIS"]

    mutado = copy.deepcopy(doc)
    c = _n(mutado, chamadas[pick % len(chamadas)]["id"])
    if modo == "remover":
        assume(len(c["proximo"]) > 1)  # o Schema exige ao menos uma saída fora de `fim`
        c["proximo"].pop()
    elif modo == "trocar":
        c["proximo"][0]["condicao"] += "_x"
    else:
        c["proximo"].append({"para": c["proximo"][0]["para"], "condicao": "retorno_inexistente"})
    achados = [i for i in validate(mutado, SCHEMA) if i.code == "RETORNOS_INCOMPATIVEIS"]
    assert [i.item_id for i in achados] == [c["id"]]


# Property 38: ids de nós seguem `<raia>_<s|t|g|c|e><n>` coerente com o tipo
# Validates: Requirements 15.9
@CFG
@given(doc=valid_docs(), pick=st.integers(0, 10_000))
def test_property_38_ids_padronizados(doc: dict[str, Any], pick: int) -> None:
    for d in doc["decisoes"]:
        assert re.fullmatch(rf"{re.escape(d['raia'])}_{_ID_NO[d['tipo']]}\d+", d["id"]), d["id"]
    assert not [i for i in validate(doc, SCHEMA) if i.code == "ID_PADRAO"]

    alvo = doc["decisoes"][pick % len(doc["decisoes"])]
    errada = next(letra for letra in "stgce" if letra != _ID_NO[alvo["tipo"]])
    novo = f"{alvo['raia']}_{errada}77"
    assume(all(d["id"] != novo for d in doc["decisoes"]))
    mutado = _renomear(doc, alvo["id"], novo)
    assert [i.item_id for i in validate(mutado, SCHEMA) if i.code == "ID_PADRAO"] == [novo]
