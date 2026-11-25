"""Testes do YAML real para o piloto de subtarefas, artefatos, variáveis e técnicas (Requisito 16).

Piloto em três raias: `inc_cls` (classificação de severidade), `feat_alo` (decomposição e alocação) e `bug_tri` (triagem do bug).
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import pytest

from guia_decisao.loader import load_yaml
from guia_decisao.rastreio import descrever_condicao, rastrear_dados
from guia_decisao.validator import validate
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
YAML_REAL = GUIA_DIR
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))

RAIAS_PILOTO = ("inc_cls", "feat_alo", "bug_tri")
USOS = {"obrigatoria", "recomendada", "opcional", "condicional"}
# Raias que alimentam o piloto: só os `fim` declaram saídas, e as chamadas da orquestradora declaram entradas e saídas.
RAIAS_ALIMENTADORAS = ("inc_tri", "feat_cls", "com_pro", "feat_spc", "bug_rep")
# Artefatos do piloto sem produtor ou sem consumidor aceitos de forma explícita (vazio: não há lacuna aceita hoje).
# Consumidos pela raia feat_lev, detalhada na segunda parte da tarefa 2.24.
LACUNAS_ACEITAS: set[str] = {"mapa_de_impacto", "caso_de_negocio"}
# Artefatos que são o efeito final de uma tarefa (aviso enviado, aprovação registrada) não precisam de consumidor.
TIPOS_TERMINAIS = {"acao", "comunicacao"}
PADRAO_SUB = re.compile(r"^(?P<no>.+)_st(?P<n>[1-9][0-9]*)$")
TRAVESSOES = ("\u2014", "\u2013")


@pytest.fixture(scope="module")
def doc() -> dict[str, Any]:
    return load_yaml(YAML_REAL)


@pytest.fixture(scope="module")
def nos_piloto(doc: dict[str, Any]) -> list[dict[str, Any]]:
    return [d for d in doc["decisoes"] if d["raia"] in RAIAS_PILOTO]


def _usos(doc: dict[str, Any], raias: tuple[str, ...] = RAIAS_PILOTO) -> list[dict[str, Any]]:
    """Todos os UsoTecnica do piloto, no nó e na subtarefa."""
    saida: list[dict[str, Any]] = []
    for d in doc["decisoes"]:
        if d["raia"] not in raias:
            continue
        saida += d.get("tecnicas", [])
        for sub in d.get("subtarefas", []):
            saida += sub.get("tecnicas", [])
    return saida


# Avisos novos que o YAML real ainda pode ter enquanto o conteúdo é preenchido. A frente de conteúdo esvazia este conjunto.
AVISOS_EM_ADOCAO: set[str] = set()  # guia real sem avisos: nenhum código tolerado


def test_yaml_real_valida_estrito_sem_erros_nem_avisos(doc: dict[str, Any]) -> None:
    assert [i for i in validate(doc, SCHEMA, avisos=True, completude=True) if i.code not in AVISOS_EM_ADOCAO] == []


def test_catalogo_cobre_todas_as_chaves_de_estado(doc: dict[str, Any]) -> None:
    catalogo = {v["id"] for v in doc["variaveis"]}
    usadas = {chave for d in doc["decisoes"] for chave in d["estado"]}
    assert usadas <= catalogo
    avisos = [i for i in validate(doc, SCHEMA, avisos=True) if i.code == "VAR_NAO_DECLARADA"]
    assert avisos == []


def test_variaveis_tem_tipo_e_descricao(doc: dict[str, Any]) -> None:
    for v in doc["variaveis"]:
        assert v.get("descricao"), v["id"]
        assert v["status"] == "rascunho", v["id"]
        if v["tipo"] == "enum":
            assert v["valores"], v["id"]
        if v["tipo"] == "inteiro":
            assert v["inicial"] == 0, v["id"]
    por_id = {v["id"]: v for v in doc["variaveis"]}
    assert por_id["tentativas_mitigacao"]["tipo"] == "inteiro"
    assert por_id["tentativas_iteracao"]["tipo"] == "inteiro"
    assert por_id["severidade"]["valores"] == ["sev1", "sev2", "sev3"]
    assert por_id["tem_slo"]["tipo"] == "booleano"


@pytest.mark.parametrize("raia", RAIAS_PILOTO)
def test_tarefas_do_piloto_tem_subtarefas_com_id_no_padrao(doc: dict[str, Any], raia: str) -> None:
    tarefas = [d for d in doc["decisoes"] if d["raia"] == raia and d["tipo"] == "tarefa"]
    assert tarefas
    for t in tarefas:
        subs = t.get("subtarefas", [])
        assert 2 <= len(subs) <= 5, t["id"]
        numeros = []
        for sub in subs:
            m = PADRAO_SUB.match(sub["id"])
            assert m and m["no"] == t["id"], sub["id"]
            numeros.append(int(m["n"]))
            papeis = {p["id"] for p in doc["papeis"]}
            assert sub.get("papel") in papeis and set(sub.get("apoio", [])) <= papeis, sub["id"]
            assert "responsavel" not in sub, sub["id"]  # o papel substitui o genérico agente, pessoa ou ambos
            assert sub["status"] == "rascunho"
            assert len(sub["rotulo"]) <= 60, sub["rotulo"]
        assert numeros == sorted(numeros) == list(range(1, len(subs) + 1)), t["id"]


@pytest.mark.parametrize("raia", RAIAS_PILOTO)
def test_nos_do_piloto_declaram_entradas_e_saidas(nos_piloto: list[dict[str, Any]], raia: str) -> None:
    for d in (n for n in nos_piloto if n["raia"] == raia):
        if d["tipo"] == "inicio":
            assert d.get("entradas"), d["id"]
        elif d["tipo"] == "fim":
            assert d.get("saidas"), d["id"]
        elif d["tipo"] == "bifurcacao":
            assert d.get("entradas") and d.get("saidas"), d["id"]
        elif d["tipo"] == "tarefa":
            assert d.get("entradas") and d.get("saidas"), d["id"]
            produzidas = {s for sub in d["subtarefas"] for s in sub.get("saidas", [])}
            assert set(d["saidas"]) <= produzidas, d["id"]


def test_raias_do_piloto_declaram_entradas(doc: dict[str, Any]) -> None:
    por_id = {r["id"]: r for r in doc["raias"]}
    for raia in (*RAIAS_PILOTO, "inc_tri", "bug_rep"):
        assert por_id[raia].get("entradas"), raia


def test_gateways_declaram_a_variavel_que_decidem(doc: dict[str, Any]) -> None:
    por_id = {d["id"]: d for d in doc["decisoes"]}
    assert "severidade" in por_id["inc_cls_g2"]["saidas"]
    assert "usa_ia" in por_id["feat_spc_g1"]["saidas"]
    assert "tipo_defeito" in por_id["bug_tri_g1"]["saidas"]
    assert "prioridade" in por_id["bug_tri_g5"]["saidas"]


def test_alimentadoras_declaram_saidas_nos_fim_e_orquestradoras_nas_chamadas(doc: dict[str, Any]) -> None:
    for d in doc["decisoes"]:
        if d["raia"] in RAIAS_ALIMENTADORAS and d["tipo"] == "fim" and d["raia"] != "inc_tri":
            assert d.get("saidas"), d["id"]
    por_id = {d["id"]: d for d in doc["decisoes"]}
    for cid in ("inc_orq_c1", "inc_orq_c2", "feat_orq_c3", "feat_orq_c4", "feat_orq_c4", "feat_orq_c5", "bug_orq_c1", "bug_orq_c2"):
        assert por_id[cid]["tipo"] == "chamada"
        assert por_id[cid].get("saidas"), cid
    for cid in ("inc_orq_c1", "inc_orq_c2", "feat_orq_c5", "bug_orq_c1", "bug_orq_c2"):
        assert por_id[cid].get("entradas"), cid


def test_quatro_usos_de_tecnica_aparecem_no_piloto(doc: dict[str, Any]) -> None:
    usos = _usos(doc)
    assert {u["uso"] for u in usos} == USOS
    por_uso = {u: sum(1 for x in usos if x["uso"] == u) for u in USOS}
    assert all(n >= 1 for n in por_uso.values()), por_uso


def test_tecnicas_do_piloto_existem_no_catalogo_e_condicional_tem_condicao_e_porque(doc: dict[str, Any]) -> None:
    catalogo = {t["id"] for t in doc["tecnicas"]}
    for u in _usos(doc):
        assert u["tecnica"] in catalogo, u["tecnica"]
        assert u["uso"] in USOS
        assert u.get("porque"), u
        if u["uso"] == "condicional":
            assert u.get("quando"), u


def test_tecnicas_novas_sao_rascunho_com_descricao(doc: dict[str, Any]) -> None:
    por_id = {t["id"]: t for t in doc["tecnicas"]}
    for tid in ("tec_evals", "tec_matriz_de_alocacao"):
        t = por_id[tid]
        assert t["id"].startswith("tec_") and t["status"] == "rascunho"
        assert t["descricao"] and t["quando_usar"] and t["quando_evitar"]


def test_toda_condicao_referencia_variavel_do_catalogo_com_valores_validos(doc: dict[str, Any]) -> None:
    variaveis = {v["id"]: v for v in doc["variaveis"]}
    condicoes = [u["quando"] for u in _usos(doc) if "quando" in u]
    assert condicoes
    for cond in condicoes:
        assert len(cond) == 1 and next(iter(cond)) in {"todos", "algum"}
        for termo in next(iter(cond.values())):
            var = variaveis[termo["var"]]
            valores = [x for k, v in termo.items() if k != "var" for x in (v if isinstance(v, list) else [v])]
            permitidos = {"sim", "nao"} if var["tipo"] == "booleano" else set(var.get("valores", []))
            assert set(valores) <= permitidos, (termo, permitidos)
        texto = descrever_condicao(cond)
        assert texto.startswith("quando ") and not any(t in texto for t in TRAVESSOES)


def test_condicoes_pedidas_pelo_piloto_estao_presentes(doc: dict[str, Any]) -> None:
    textos = {(u["tecnica"], descrever_condicao(u["quando"])) for u in _usos(doc) if "quando" in u}
    assert ("tec_error_budget", "quando tem_slo = sim") in textos
    assert ("tec_contract_testing", "quando usa_ia = nao e tem_integracao = sim") in textos
    assert ("tec_evals", "quando usa_ia = sim") in textos
    assert any(t == "tec_blameless_postmortem" for t, _ in textos)
    assert any(t == "tec_canary_release" for t, _ in textos)


def test_nenhuma_entrada_do_piloto_fica_sem_produtor(doc: dict[str, Any]) -> None:
    rastro = rastrear_dados(doc)
    raias = {r["id"]: r for r in doc["raias"]}
    for r in RAIAS_PILOTO:
        for item in raias[r].get("entradas", []):
            assert rastro[item]["produzido_por"], f"{r} recebe {item} sem produtor"
    for d in doc["decisoes"]:
        if d["raia"] not in RAIAS_PILOTO:
            continue
        for item in d.get("entradas", []):
            assert rastro[item]["produzido_por"] or item in raias[d["raia"]].get("entradas", []), (d["id"], item)
        for sub in d.get("subtarefas", []):
            for item in sub.get("entradas", []):
                assert rastro[item]["produzido_por"], (sub["id"], item)
    avisos = [i for i in validate(doc, SCHEMA, avisos=True) if i.code in {"ENTRADA_SEM_PRODUTOR", "SAIDA_NAO_ENTREGUE"}]
    assert avisos == []


def test_artefato_do_piloto_tem_produtor_e_consumidor(doc: dict[str, Any]) -> None:
    rastro = rastrear_dados(doc)
    artefatos = {a["id"] for a in doc["artefatos"]}
    assert artefatos
    for a in doc["artefatos"]:
        assert a["status"] == "rascunho" and a.get("descricao") and a.get("tipo"), a["id"]
    sem_produtor = {a for a in artefatos if not rastro[a]["produzido_por"]} - LACUNAS_ACEITAS
    terminais = {a["id"] for a in doc["artefatos"] if a.get("tipo") in TIPOS_TERMINAIS}
    sem_consumidor = {a for a in artefatos if not rastro[a]["consumido_por"]} - LACUNAS_ACEITAS - terminais
    assert sem_produtor == set(), f"artefatos sem produtor: {sorted(sem_produtor)}"
    assert sem_consumidor == set(), f"artefatos sem consumidor: {sorted(sem_consumidor)}"


def test_playbook_de_alocacao_explica_hibrida_por_papel(doc: dict[str, Any]) -> None:
    pb = next(p for p in doc["playbooks"] if p["id"] == "pb_com_set_t3")  # quem exerce cada papel é decidido no setup
    texto = " ".join(pb["fazer"])
    assert "hibrida" in texto and "papel" in texto
    papeis = {p["id"] for p in doc["papeis"]}
    assert {s["papel"] for s in next(d for d in doc["decisoes"] if d["id"] == "com_set_t3")["subtarefas"]} <= papeis


def test_textos_novos_do_piloto_sem_travessoes(doc: dict[str, Any]) -> None:
    textos: list[str] = []
    for a in doc["artefatos"]:
        textos += [a["nome"], a.get("descricao", "")]
    for v in doc["variaveis"]:
        textos += [v["nome"], v.get("descricao", "")]
    for d in doc["decisoes"]:
        for sub in d.get("subtarefas", []):
            textos += [sub["rotulo"], sub.get("descricao", "")]
        for u in d.get("tecnicas", []) + [x for s in d.get("subtarefas", []) for x in s.get("tecnicas", [])]:
            textos.append(u.get("porque", ""))
    for t in doc["tecnicas"]:
        if t["id"] in {"tec_evals", "tec_matriz_de_alocacao"}:
            textos += [t["nome"], t["descricao"], *t["quando_usar"], *t["quando_evitar"]]
    for pb in doc["playbooks"]:
        if pb["id"].startswith(("pb_inc_cls_", "pb_feat_alo_", "pb_bug_tri_")):
            textos += pb.get("fazer", [])
    ruins = [t for t in textos if any(c in t for c in TRAVESSOES)]
    assert ruins == []
    assert ("Hot" + "mart") not in " ".join(textos)


def test_toda_subtarefa_do_piloto_tem_exemplo_em_texto_sem_travessao(nos_piloto: list[dict[str, Any]]) -> None:
    subs = [sub for n in nos_piloto for sub in n.get("subtarefas", [])]
    assert len(subs) == 34  # + o cronograma (Gantt) em feat_alo_t3
    for sub in subs:
        ex = sub.get("exemplo")
        assert isinstance(ex, str) and ex.strip(), sub["id"]
        assert not any(t in ex for t in TRAVESSOES) and "\u2212" not in ex, sub["id"]


def test_tarefas_e_gateways_do_piloto_e_das_raias_que_o_alimentam_tem_exemplo_no_playbook(doc: dict[str, Any]) -> None:
    pbs = {p["id"]: p for p in doc["playbooks"]}
    nos = [d for d in doc["decisoes"]
           if d["raia"] in (*RAIAS_PILOTO, *RAIAS_ALIMENTADORAS) and d["tipo"] in ("tarefa", "bifurcacao")]
    assert nos
    for n in nos:
        ex = pbs[n["playbook"]].get("exemplo")
        assert isinstance(ex, str) and ex.strip() and not any(t in ex for t in TRAVESSOES), n["id"]
