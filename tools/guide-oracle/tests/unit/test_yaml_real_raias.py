"""Testes do YAML real contra o padrão de raias (Requisito 15): vale para as três demandas (feature, bug e incidente)."""

from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path
from typing import Any

import pytest

from guia_decisao.loader import load_yaml, texto_do_guia
from guia_decisao.validator import validate
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
YAML_REAL = GUIA_DIR
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))
ORDEM_DEMANDAS = [
    "feature", "bug", "incidente",
    "chore", "seguranca", "spike", "divida_tecnica", "infraestrutura", "teste_qa", "documentacao", "migracao", "descontinuacao",  # onda 2 (esqueletos)
]
DEMANDAS_ESPERADAS = set(ORDEM_DEMANDAS)


@pytest.fixture(scope="module")
def doc() -> dict[str, Any]:
    return load_yaml(YAML_REAL)


def test_yaml_real_valida(doc: dict[str, Any]) -> None:
    assert validate(doc, SCHEMA) == []


def test_tres_demandas_na_ordem_feature_bug_incidente(doc: dict[str, Any]) -> None:
    # A biblioteca de raias comuns (`comum`) vem antes, mas não é demanda do seletor nem da matriz.
    assert [d["id"] for d in doc["demandas"] if not d.get("biblioteca")] == ORDEM_DEMANDAS
    assert [d["id"] for d in doc["demandas"] if d.get("biblioteca")] == ["comum"]
    assert {r["demanda"] for r in doc["raias"]} == DEMANDAS_ESPERADAS | {"comum"}
    assert len(doc["celulas"]) == len(ORDEM_DEMANDAS) * len(doc["requisitos"]) == 48


def test_feature_ia_foi_unificada_em_feature(doc: dict[str, Any]) -> None:
    texto = json.dumps(doc, ensure_ascii=False)
    assert "feature_ia" not in texto and "featia_" not in texto
    assert {r["id"] for r in doc["raias"] if r["demanda"] == "feature"} == {
        "feat_orq", "feat_ent", "feat_lev", "feat_cls", "feat_spc", "feat_alo", "feat_ite",
    }
    # Raias reutilizáveis vivem na biblioteca `comum` e entram no diagrama da feature por chamada.
    assert {r["id"] for r in doc["raias"] if r["demanda"] == "comum"} == {
        "com_pro", "com_set", "com_exe", "com_dea", "com_exp", "com_mel",
        "com_pub", "com_val", "com_e2e", "com_evl", "com_prf", "com_seg", "com_rev", "com_hml",
        "com_etg", "com_lib", "com_mon", "com_dcs", "com_frn",
    }


def test_cada_demanda_tem_exatamente_uma_orquestradora(doc: dict[str, Any]) -> None:
    orq: dict[str, int] = defaultdict(int)
    for r in doc["raias"]:
        if r.get("orquestradora"):
            orq[r["demanda"]] += 1
    for demanda in DEMANDAS_ESPERADAS:
        assert orq[demanda] == 1, demanda


def test_cada_raia_tem_um_inicio_e_ao_menos_um_retorno(doc: dict[str, Any]) -> None:
    inicios: dict[str, int] = defaultdict(int)
    retornos: dict[str, list[str]] = defaultdict(list)
    for d in doc["decisoes"]:
        if d["tipo"] == "inicio":
            inicios[d["raia"]] += 1
        elif d["tipo"] == "fim":
            retornos[d["raia"]].append(d["retorno"])
    for r in doc["raias"]:
        assert inicios[r["id"]] == 1, r["id"]
        assert retornos[r["id"]], r["id"]
        assert len(retornos[r["id"]]) == len(set(retornos[r["id"]])), r["id"]


def test_orquestradora_so_tem_inicio_chamada_bifurcacao_e_fim(doc: dict[str, Any]) -> None:
    orqs = {r["id"] for r in doc["raias"] if r.get("orquestradora")}
    for d in doc["decisoes"]:
        if d["raia"] in orqs:
            assert d["tipo"] in {"inicio", "chamada", "bifurcacao", "fim"}, d["id"]


def test_nenhuma_raia_usa_a_cor_de_outra_na_mesma_demanda(doc: dict[str, Any]) -> None:
    cores: dict[str, dict[str, str]] = defaultdict(dict)
    for r in doc["raias"]:
        cor = r["cor"].lower()
        assert cor not in cores[r["demanda"]], f"{r['id']} repete a cor de {cores[r['demanda']].get(cor)}"
        cores[r["demanda"]][cor] = r["id"]


def test_toda_decisao_tem_playbook_existente(doc: dict[str, Any]) -> None:
    playbooks = {p["id"] for p in doc["playbooks"]}
    for d in doc["decisoes"]:
        assert d.get("playbook") == f"pb_{d['id']}", d["id"]
        assert d["playbook"] in playbooks, d["id"]


def test_nos_antigos_j1_e_j6_foram_removidos(doc: dict[str, Any]) -> None:
    assert not [d["id"] for d in doc["decisoes"] if d["id"].startswith(("j1_", "j6_"))]
    assert not [p["id"] for p in doc["playbooks"] if p["id"].startswith(("pb_j1_", "pb_j6_"))]


def test_rotulos_curtos(doc: dict[str, Any]) -> None:
    longos = [d["id"] for d in doc["decisoes"] if len(d["rotulo"]) > 60]
    assert not longos, longos


def test_sem_travessoes_no_arquivo() -> None:
    texto = texto_do_guia(YAML_REAL)
    assert "\u2014" not in texto and "\u2013" not in texto


def test_laco_de_iteracao_da_feature_limitado_a_tres_tentativas(doc: dict[str, Any]) -> None:
    por_id = {d["id"]: d for d in doc["decisoes"]}
    assert por_id["feat_orq_s0"]["estado"]["tentativas_iteracao"] == 0
    g1 = por_id["com_val_g1"]
    assert "tentativas_iteracao" in g1["estado"]
    assert len(g1["proximo"]) == 3
    assert sum("tentativas" in p["condicao"] for p in g1["proximo"]) == 2


def test_gate_de_janela_critica_da_feature_antes_do_ship(doc: dict[str, Any]) -> None:
    por_id = {d["id"]: d for d in doc["decisoes"]}
    g = por_id["com_etg_g1"]
    assert g["tipo"] == "bifurcacao"
    assert "janela crítica" in g["condicao"]
    assert {"janela_critica", "tipo_janela"} <= set(g["estado"])
    assert "com_etg_t2" in {p["para"] for p in g["proximo"]}


def _fins(doc: dict[str, Any], raia: str) -> set[str]:
    return {d["retorno"] for d in doc["decisoes"] if d["raia"] == raia and d["tipo"] == "fim"}


def test_decomposicao_so_mapeia_tarefas_papeis_e_dependencias(doc: dict[str, Any]) -> None:
    assert _fins(doc, "feat_alo") == {"tarefas_mapeadas"}
    saidas = {x for d in doc["decisoes"] if d["raia"] == "feat_alo" for x in d.get("saidas", [])}
    assert {"lista_de_tarefas", "mapa_de_dependencias", "matriz_de_papeis", "ordem_execucao"} <= saidas


def test_testes_da_feature_limitam_tentativas_dentro_da_raia(doc: dict[str, Any]) -> None:
    assert _fins(doc, "com_val") == {"testes_aprovados", "testes_reprovados"}
    g = next(d for d in doc["decisoes"] if d["id"] == "com_val_g1")
    assert "tentativas_iteracao" in g["estado"] and any(">= 3" in p["condicao"] for p in g["proximo"])
    assert not [d for d in doc["decisoes"] if d["raia"] == "feat_orq" and d.get("retorno") == "tentativas_esgotadas"]


def test_raias_de_teste_separadas_e_aplicaveis(doc: dict[str, Any]) -> None:
    for raia in ("com_e2e", "com_evl", "com_prf"):
        assert _fins(doc, raia) == {"aprovado", "reprovado", "nao_aplicavel"}, raia
    assert _fins(doc, "com_seg") == {"aprovado", "reprovado"}  # segurança sempre se aplica
    g = next(d for d in doc["decisoes"] if d["id"] == "com_evl_g1")
    assert g["entradas"] == ["usa_ia"]  # evals só para features com IA
    assert _fins(doc, "com_hml") == {"testes_integrados_aprovados", "reprovado"}
    g = next(d for d in doc["decisoes"] if d["id"] == "com_hml_g1")
    assert {p["condicao"] for p in g["proximo"]} == {"staging", "homologação", "produção controlada"}


def test_entrega_publica_implanta_libera_e_valida_em_producao(doc: dict[str, Any]) -> None:
    por_id = {d["id"]: d for d in doc["decisoes"]}
    chamadas = [por_id[f"feat_orq_c{n}"]["raia_chamada"] for n in (7, 8, 9, 15, 16, 17, 18)]
    assert chamadas == ["com_exe", "com_pub", "com_val", "com_hml", "com_etg", "com_lib", "com_mon"]
    assert _fins(doc, "com_mon") == {"feature_validada", "incidente_acionado"}
    lig = por_id["com_mon_t2"]["ligacoes"][0]
    assert (lig["demanda_destino"], lig["para"], lig["tipo"]) == ("incidente", "inc_orq_s0", "aciona")
    lig = por_id["feat_ite_t3"]["ligacoes"][0]
    assert (lig["demanda_destino"], lig["para"], lig["tipo"]) == ("bug", "bug_orq_s0", "aciona")


def test_levantamento_condiciona_cada_tecnica(doc: dict[str, Any]) -> None:
    t1 = next(d for d in doc["decisoes"] if d["id"] == "feat_lev_t1")
    tecnicas = {u["tecnica"]: sub.get("quando") for sub in t1["subtarefas"] for u in sub.get("tecnicas", [])}
    for tec in ("tec_x5_whys", "tec_impact_mapping", "tec_event_storming", "tec_jobs_to_be_done", "tec_gemba_observa_o", "tec_an_lise_de_dados"):
        assert tecnicas[tec], tec  # toda técnica de elicitação é subtarefa condicionada
    assert _fins(doc, "feat_ite") == {"spec_ajustada", "correcao_na_implementacao", "incidente_acionado"}
    por_id = {d["id"]: d for d in doc["decisoes"]}
    destinos = {p["condicao"]: p["para"] for p in por_id["feat_ite_g2"]["proximo"]}
    assert por_id[destinos["não, só na feature"]]["ligacoes"][0]["para"] == "bug_orq_s0"
    assert por_id[destinos["sim, impacto em vários usuários"]]["ligacoes"][0]["para"] == "inc_orq_s0"


def test_execucao_por_papeis_trata_dependencia_humana_e_desvio_do_agente(doc: dict[str, Any]) -> None:
    por_id = {d["id"]: d for d in doc["decisoes"]}
    decomp = next(d for d in doc["decisoes"] if d["tipo"] == "chamada" and d.get("raia_chamada") == "feat_alo")
    assert [(p["condicao"], por_id[p["para"]]["raia_chamada"]) for p in decomp["proximo"]] == [("tarefas_mapeadas", "com_set")]
    # a orquestradora não coordena agentes e pessoas: isso fica dentro de com_exe
    assert not [d for d in doc["decisoes"] if d["raia"] == "feat_orq" and d.get("raia_chamada") in {"com_dea", "com_exp"}]
    g = por_id["com_exe_g1"]
    assert g["tipo"] == "bifurcacao" and "bloqueia" in g["rotulo"]
    sim = next(p["para"] for p in g["proximo"] if p["condicao"] == "sim")
    assert por_id[sim]["raia_chamada"] == "com_exp"  # com dependência, as pessoas decidem antes dos agentes
    desvio = next(p["para"] for p in por_id["com_exe_c2"]["proximo"] if p["condicao"] == "desvio_do_agente")
    assert por_id[desvio]["raia_chamada"] == "com_mel"  # desvio do agente vai à melhoria contínua


def test_requisito_probabilistico_ativado_por_usa_ia_na_spec(doc: dict[str, Any]) -> None:
    g = next(d for d in doc["decisoes"] if d["id"] == "feat_spc_g1")
    assert g["tipo"] == "bifurcacao" and "usa_ia" in g["estado"]
    playbooks = {p["id"]: p for p in doc["playbooks"]}
    texto = json.dumps(playbooks["pb_feat_spc_t1"], ensure_ascii=False).lower()
    for termo in ("evals", "custo por chamada", "alucina", "fornecedor"):
        assert termo in json.dumps([p for p in playbooks.values() if p["id"].startswith("pb_feat_")], ensure_ascii=False).lower()
    assert "evals" in texto


def test_ordem_de_declaracao_das_demandas_vale_no_html_e_nos_arquivos(doc: dict[str, Any]) -> None:
    from guia_decisao.html_gen import montar_dados
    from guia_decisao.mermaid_gen import gerar_todos

    dados = montar_dados(doc)
    assert [d["id"] for d in dados["demandas"]] == ORDEM_DEMANDAS
    prefixos: list[str] = []
    for nome in gerar_todos(doc):
        demanda = nome.split(".")[0]
        if not prefixos or prefixos[-1] != demanda:
            prefixos.append(demanda)
    assert prefixos == ORDEM_DEMANDAS
    for d in dados["demandas"]:
        assert set(d["subgraphs"].values()) == {r["id"] for r in d["raias"]}
