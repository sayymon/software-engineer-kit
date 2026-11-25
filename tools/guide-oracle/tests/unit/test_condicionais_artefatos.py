"""Subtarefa condicionada, artefatos com tipo, subtipo e variantes, entregável obrigatório e diagrama sem "chama:".

Cobre: schema (campos novos e rejeições), validador (um caso válido e um inválido por regra, adoção progressiva),
rastreio, geradores (Mermaid e HTML) e, marcados `integration`, o JS real no Chrome headless (`cdp_condicionais.mjs`).
A fixture é `tests/fixtures/condicionais.yaml`: duas demandas, itens exclusivos e compartilhados, e dois itens sem uso.
"""

from __future__ import annotations

import copy
import json
import re
import shutil
import socket
import subprocess
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft202012Validator

from guia_decisao.html_gen import _JS, gerar_html, legenda_html, montar_dados
from guia_decisao.loader import load_yaml
from guia_decisao.mermaid_gen import gerar_diagrama, gerar_todos
from guia_decisao.rastreio import rastrear_dados, usos_em_condicoes
from guia_decisao.validator import validate
from tests.unit.test_html_navegacao import CHROME
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "condicionais.yaml"
OUTRAS = [RAIZ / "tests" / "fixtures" / n for n in ("subtarefas.yaml", "raias_minimo.yaml")]
REAL = GUIA_DIR
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))
HELPER = Path(__file__).with_name("cdp_condicionais.mjs")

TIPOS_NOVOS = ["codigo", "commit", "pull_request", "adr", "teste", "biblioteca", "agente", "skill", "script", "diagrama",
               "card", "comunicacao", "acao", "configuracao"]
TIPOS_ANTIGOS = ["documento", "dado", "decisao", "sinal"]
ST2 = "alf_orq_t1_st2"


@pytest.fixture()
def doc() -> dict[str, Any]:
    return copy.deepcopy(load_yaml(FIXTURE))


@pytest.fixture(scope="module")
def dados() -> dict[str, Any]:
    return montar_dados(load_yaml(FIXTURE))


def _no(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(d for d in doc["decisoes"] if d["id"] == id_)


def _sub(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(s for d in doc["decisoes"] for s in d.get("subtarefas", []) if s["id"] == id_)


def _art(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(a for a in doc["artefatos"] if a["id"] == id_)


def _issues(doc: dict[str, Any]) -> list[Any]:
    return validate(doc, SCHEMA, avisos=True)


def _por(doc: dict[str, Any], code: str) -> list[Any]:
    return [i for i in _issues(doc) if i.code == code]


def _def(nome: str) -> Draft202012Validator:
    return Draft202012Validator({"$ref": f"#/$defs/{nome}", "$defs": SCHEMA["$defs"]})


# ------------------------------------------------------------------ fixture


def test_fixture_so_tem_os_dois_avisos_de_itens_sem_uso(doc):
    assert [(i.code, i.item_id, i.nivel) for i in _issues(doc)] == [
        ("ITEM_SEM_USO", "art_sem_uso", "aviso"),
        ("ITEM_SEM_USO", "var_sem_uso", "aviso"),
    ]


# ------------------------------------------------------------------ schema


def test_schema_subtarefa_aceita_quando_e_porque_e_rejeita_o_resto():
    v = _def("Subtarefa")
    base = {"id": "t_st1", "rotulo": "R"}
    cond = {"todos": [{"var": "x", "igual": "sim"}]}
    assert not list(v.iter_errors({**base, "quando": cond, "porque": "p"}))
    assert not list(v.iter_errors(base))  # sem `quando` a subtarefa sempre executa
    assert list(v.iter_errors({**base, "quando": {}}))
    assert list(v.iter_errors({**base, "quando": {"todos": [], "algum": []}}))
    assert list(v.iter_errors({**base, "quando": {"todos": [{"var": "x", "igual": "sim"}], "algum": [{"var": "x", "igual": "sim"}]}}))
    assert list(v.iter_errors({**base, "porque": 3}))
    assert list(v.iter_errors({**base, "condicional": True}))  # estrutura fechada


@pytest.mark.parametrize("tipo", TIPOS_ANTIGOS + TIPOS_NOVOS)
def test_schema_artefato_aceita_todos_os_tipos(tipo):
    assert not list(_def("Artefato").iter_errors({"id": "a", "nome": "A", "tipo": tipo}))


def test_schema_artefato_rejeita_tipo_desconhecido_e_subtipo_nao_texto():
    v = _def("Artefato")
    assert list(v.iter_errors({"id": "a", "nome": "A", "tipo": "runbook"}))
    assert not list(v.iter_errors({"id": "a", "nome": "A", "subtipo": "UML de sequência"}))  # texto livre
    assert list(v.iter_errors({"id": "a", "nome": "A", "subtipo": 3}))


def test_schema_variante_fechada_com_nome_e_quando_obrigatorios():
    v = _def("Artefato")
    cond = {"todos": [{"var": "x", "igual": "sim"}]}
    ok = {"id": "a", "nome": "A", "variantes": [{"nome": "PRD", "quando": cond, "descricao": "d", "exemplo": "e"}]}
    assert not list(v.iter_errors(ok))
    assert list(v.iter_errors({"id": "a", "nome": "A", "variantes": [{"quando": cond}]}))  # sem nome
    assert list(v.iter_errors({"id": "a", "nome": "A", "variantes": [{"nome": "PRD"}]}))  # sem quando
    assert list(v.iter_errors({"id": "a", "nome": "A", "variantes": [{"nome": "PRD", "quando": cond, "extra": 1}]}))
    assert list(v.iter_errors({"id": "a", "nome": "A", "variantes": "PRD"}))


# ------------------------------------------------------------------ validador: quando da subtarefa


def test_quando_da_subtarefa_valido_nao_gera_issue(doc):
    assert [i for i in _issues(doc) if i.nivel == "erro"] == []


def test_quando_da_subtarefa_com_variavel_inexistente_e_ref_quebrada(doc):
    _sub(doc, ST2)["quando"] = {"todos": [{"var": "nao_existe", "igual": "sim"}]}
    achados = _por(doc, "REF_QUEBRADA")
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [
        ("decisoes[1].subtarefas[1].quando.todos[0].var", ST2, "erro")
    ]


def test_quando_da_subtarefa_com_valor_fora_do_dominio_e_condicao_invalida(doc):
    _sub(doc, ST2)["quando"] = {"todos": [{"var": "tem_dado_pessoal", "igual": "talvez"}]}
    achados = _por(doc, "CONDICAO_INVALIDA")
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1].subtarefas[1].quando.todos[0].igual", ST2)]
    _sub(doc, ST2)["quando"] = {"todos": [{"var": "modelo_trabalho", "maior_que": 3}]}
    assert _por(doc, "CONDICAO_INVALIDA")  # operador numérico em variável enum


# ------------------------------------------------------------------ validador: variantes


def test_variante_com_variavel_inexistente_e_ref_quebrada(doc):
    _art(doc, "art_necessidade")["variantes"][0]["quando"] = {"todos": [{"var": "nao_existe", "igual": "x"}]}
    achados = _por(doc, "REF_QUEBRADA")
    assert [(i.path, i.item_id) for i in achados] == [("artefatos[1].variantes[0].quando.todos[0].var", "art_necessidade")]


def test_variante_com_valor_fora_do_dominio_e_condicao_invalida(doc):
    _art(doc, "art_necessidade")["variantes"][1]["quando"] = {"todos": [{"var": "modelo_trabalho", "igual": "caos"}]}
    achados = _por(doc, "CONDICAO_INVALIDA")
    assert [i.path for i in achados] == ["artefatos[1].variantes[1].quando.todos[0].igual"]


def test_nome_de_variante_repetido_no_artefato_e_erro_mas_em_outro_artefato_nao(doc):
    art = _art(doc, "art_necessidade")
    art["variantes"][1]["nome"] = art["variantes"][0]["nome"]
    achados = _por(doc, "VARIANTE_DUPLICADA")
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [("artefatos[1].variantes[1].nome", "art_necessidade", "erro")]
    # o mesmo nome em artefatos diferentes é permitido
    doc2 = copy.deepcopy(load_yaml(FIXTURE))
    _art(doc2, "art_parecer")["variantes"] = [copy.deepcopy(_art(doc2, "art_necessidade")["variantes"][0])]
    assert _por(doc2, "VARIANTE_DUPLICADA") == []


# ------------------------------------------------------------------ validador: entregável


def test_tarefa_com_artefato_em_saidas_nao_avisa(doc):
    assert _por(doc, "TAREFA_SEM_ENTREGAVEL") == [] and _por(doc, "SUBTAREFA_SEM_ENTREGAVEL") == []


def test_tarefa_so_com_variavel_em_saidas_avisa_porque_variavel_nao_conta(doc):
    no = _no(doc, "alf_impl_t1")
    no["saidas"] = ["modelo_trabalho"]
    achados = _por(doc, "TAREFA_SEM_ENTREGAVEL")
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [("decisoes[5]", "alf_impl_t1", "aviso")]
    no["saidas"] = ["art_codigo"]
    assert _por(doc, "TAREFA_SEM_ENTREGAVEL") == []


def test_tarefa_sem_saidas_proprias_vale_pelo_artefato_das_subtarefas(doc):
    no = _no(doc, "bet_orq_t1")
    no["saidas"] = []
    assert _por(doc, "TAREFA_SEM_ENTREGAVEL") == []  # as subtarefas entregam artefatos
    for sub in no["subtarefas"]:
        sub["saidas"] = []
    assert [i.item_id for i in _por(doc, "TAREFA_SEM_ENTREGAVEL")] == ["bet_orq_t1"]


def test_subtarefa_sem_artefato_em_saidas_avisa(doc):
    sub = _sub(doc, "bet_orq_t1_st2")
    sub["saidas"] = ["modelo_trabalho"]  # variável não conta
    achados = _por(doc, "SUBTAREFA_SEM_ENTREGAVEL")
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [("decisoes[8].subtarefas[1]", "bet_orq_t1_st2", "aviso")]
    del sub["saidas"]
    assert [i.item_id for i in _por(doc, "SUBTAREFA_SEM_ENTREGAVEL")] == ["bet_orq_t1_st2"]
    sub["saidas"] = ["art_teste_contrato"]
    assert _por(doc, "SUBTAREFA_SEM_ENTREGAVEL") == []


def test_adocao_progressiva_so_verifica_raias_em_adocao(doc):
    # raia nova sem entradas, saídas nem subtarefas: a tarefa sem entregável não avisa
    doc["raias"].append({"id": "alf_nova", "nome": "Nova", "demanda": "alfa", "responsabilidade": "x", "cor": "#123456",
                         "orquestradora": False})
    doc["decisoes"] += [
        {"id": "alf_nova_s1", "raia": "alf_nova", "tipo": "inicio", "condicao": "",
         "proximo": [{"para": "alf_nova_t1", "condicao": ""}], "estado": {}},
        {"id": "alf_nova_t1", "raia": "alf_nova", "tipo": "tarefa", "rotulo": "Sem entregável", "condicao": "",
         "proximo": [{"para": "alf_nova_e1", "condicao": ""}], "estado": {}},
        {"id": "alf_nova_e1", "raia": "alf_nova", "tipo": "fim", "retorno": "ok", "condicao": "", "proximo": [], "estado": {}},
    ]
    assert [i.item_id for i in _por(doc, "TAREFA_SEM_ENTREGAVEL")] == []
    # um nó da raia declara `entradas`: a raia entra em adoção e a tarefa passa a avisar
    _no(doc, "alf_nova_s1")["entradas"] = ["art_pedido"]
    assert [i.item_id for i in _por(doc, "TAREFA_SEM_ENTREGAVEL")] == ["alf_nova_t1"]
    # a própria raia declarando `entradas` também a coloca em adoção (e então o fim, a chamada e o início não avisam)
    del _no(doc, "alf_nova_s1")["entradas"]
    doc["raias"][-1]["entradas"] = ["art_pedido"]
    assert [i.item_id for i in _por(doc, "TAREFA_SEM_ENTREGAVEL")] == ["alf_nova_t1"]
    assert {i.item_id for i in _por(doc, "SUBTAREFA_SEM_ENTREGAVEL")} == set()


def test_so_tarefas_sao_verificadas_nao_inicio_gateway_chamada_nem_fim(doc):
    # alf_orq_e1 (fim), alf_orq_s1 (início) e alf_orq_c1 (chamada, sem `saidas` aqui) não geram aviso de entregável
    _no(doc, "alf_orq_c1")["saidas"] = []
    avisos = [i for i in _issues(doc) if i.code in ("TAREFA_SEM_ENTREGAVEL", "SUBTAREFA_SEM_ENTREGAVEL")]
    assert avisos == []


# ------------------------------------------------------------------ ITEM_SEM_USO com as condições novas


def test_variavel_so_na_condicao_da_subtarefa_conta_como_usada(doc):
    doc["variaveis"].append({"id": "so_na_subtarefa", "nome": "S", "tipo": "booleano"})
    assert "so_na_subtarefa" in {i.item_id for i in _por(doc, "ITEM_SEM_USO")}
    _sub(doc, ST2)["quando"]["todos"].append({"var": "so_na_subtarefa", "igual": "sim"})
    assert "so_na_subtarefa" not in {i.item_id for i in _por(doc, "ITEM_SEM_USO")}


def test_variavel_so_na_condicao_de_variante_conta_como_usada(doc):
    doc["variaveis"].append({"id": "so_na_variante", "nome": "V", "tipo": "booleano"})
    assert "so_na_variante" in {i.item_id for i in _por(doc, "ITEM_SEM_USO")}
    _art(doc, "art_necessidade")["variantes"][0]["quando"]["todos"].append({"var": "so_na_variante", "igual": "sim"})
    assert "so_na_variante" not in {i.item_id for i in _por(doc, "ITEM_SEM_USO")}


# ------------------------------------------------------------------ rastreio


def test_usos_em_condicoes_conta_subtarefa_e_variantes(doc):
    r = usos_em_condicoes(doc)
    assert [(u["origem"], u["dono"]) for u in r["tem_dado_pessoal"]] == [("subtarefa", ST2)]
    assert r["tem_dado_pessoal"][0]["quando"] == "quando tem_dado_pessoal = sim"
    variantes = [(u["origem"], u["dono"], u["variante"], u["quando"]) for u in r["modelo_trabalho"]]
    assert variantes == [
        ("variante", "art_necessidade", "PRD", "quando modelo_trabalho = produto"),
        ("variante", "art_necessidade", "Documento de visão", "quando modelo_trabalho = projeto"),
        ("variante", "art_necessidade", "Card", "quando modelo_trabalho = fluxo_continuo"),
    ]


def test_usos_em_condicoes_marca_a_origem_tecnica(doc):
    _sub(doc, "bet_orq_t1_st1")["tecnicas"] = [
        {"tecnica": "tec_entrevista", "uso": "condicional", "quando": {"todos": [{"var": "tem_dado_pessoal", "igual": "nao"}]}}
    ]
    u = [x for x in usos_em_condicoes(doc)["tem_dado_pessoal"] if x["origem"] == "tecnica"]
    assert [(x["dono"], x["tecnica"], x["uso"]) for x in u] == [("bet_orq_t1_st1", "tec_entrevista", "condicional")]


def test_rastrear_dados_continua_so_com_entradas_e_saidas(doc):
    r = rastrear_dados(doc)
    assert r["tem_dado_pessoal"]["produzido_por"] == [] and r["tem_dado_pessoal"]["consumido_por"] == []
    assert r["art_parecer"]["produzido_por"] == ["alf_orq_t1", "alf_orq_t1_st2"]


# ------------------------------------------------------------------ diagrama: sem "chama:", condicional


def _todos_os_docs() -> list[dict[str, Any]]:
    return [load_yaml(p) for p in [FIXTURE, *OUTRAS, REAL]]


def test_nenhum_diagrama_tem_chama_no_rotulo_do_no():
    for doc in _todos_os_docs():
        for sub in (False, True):
            for legenda in (False, True):
                for nome, d in gerar_todos(doc, legenda=legenda, subtarefas=sub).items():
                    assert "chama:" not in d.texto, nome
                    assert "<i>chama" not in d.texto, nome


def test_no_de_chamada_mostra_so_o_id_e_o_rotulo(doc):
    texto = gerar_diagrama(doc, "alfa", "visao", legenda=False).texto
    linha = next(x for x in texto.splitlines() if x.strip().startswith("alf_orq_c1[["))
    assert "alf_orq_c1" in linha and "Implementar a necessidade" in linha and "chama" not in linha


def test_aresta_tracejada_do_completo_continua_rotulada_chama(doc):
    texto = gerar_diagrama(doc, "alfa", "completo", legenda=False).texto
    assert 'alf_orq_c1 -.->|"chama"| alf_impl_s1' in texto  # é rótulo de aresta, não do nó


def test_subtarefa_condicional_tem_prefixo_e_borda_tracejada_so_no_expandido(doc):
    expandido = gerar_diagrama(doc, "alfa", "visao", legenda=False, subtarefas=True).texto
    linha2 = next(x for x in expandido.splitlines() if x.strip().startswith("alf_orq_t1_st2("))
    linha1 = next(x for x in expandido.splitlines() if x.strip().startswith("alf_orq_t1_st1("))
    assert "◆ Avaliar o impacto na privacidade" in linha2 and "◆" not in linha1
    classe = re.search(r"class alf_orq_t1_st2 (\S+)", expandido).group(1)
    assert classe.startswith("z_SC_")
    definicao = next(x for x in expandido.splitlines() if f"classDef {classe} " in x)
    assert "stroke-dasharray" in definicao
    classe_normal = re.search(r"class [^\n]*alf_orq_t1_st1[^\n]* (z_S_\d+)", expandido).group(1)
    assert "stroke-dasharray" not in next(x for x in expandido.splitlines() if f"classDef {classe_normal} " in x)
    assert "◆" not in gerar_diagrama(doc, "alfa", "visao", legenda=False).texto  # recolhido: sem subtarefas


def test_legenda_standalone_explica_a_subtarefa_condicional(doc):
    com = gerar_diagrama(doc, "alfa", "visao", legenda=True, subtarefas=True).texto
    assert "subtarefa condicional" in com and "borda tracejada" in com
    assert "subtarefa condicional" not in gerar_diagrama(doc, "beta", "visao", legenda=True, subtarefas=True).texto


def test_diagramas_sao_deterministicos(doc):
    a = gerar_diagrama(doc, "alfa", "completo", subtarefas=True).texto
    assert a == gerar_diagrama(copy.deepcopy(doc), "alfa", "completo", subtarefas=True).texto


# ------------------------------------------------------------------ dados do HTML


def test_dados_da_subtarefa_condicional(dados):
    st2 = dados["subtarefas"][ST2]
    assert st2["condicional"] is True and st2["quando"] == "quando tem_dado_pessoal = sim"
    assert st2["porque"].startswith("Dado pessoal exige")
    st1 = dados["subtarefas"]["alf_orq_t1_st1"]
    assert st1["condicional"] is False and st1["quando"] == "" and st1["porque"] == ""


def test_dados_do_artefato_levam_tipo_subtipo_e_variantes(dados):
    nec = dados["dados"]["art_necessidade"]
    assert (nec["tipo"], nec["subtipo"]) == ("documento", "PRD")
    assert [(v["nome"], v["quando"]) for v in nec["variantes"]] == [
        ("PRD", "quando modelo_trabalho = produto"),
        ("Documento de visão", "quando modelo_trabalho = projeto"),
        ("Card", "quando modelo_trabalho = fluxo_continuo"),
    ]
    assert nec["variantes"][0]["exemplo"] == "PRD com problema, público e métrica." and nec["variantes"][1]["exemplo"] == ""
    assert dados["dados"]["art_card_atualizado"]["tipo"] == "acao"
    assert dados["dados"]["art_pull_request"]["subtipo"] == "" and dados["dados"]["art_pull_request"]["variantes"] == []


def _ids(dados: dict[str, Any], dem: str) -> list[str]:
    d = next(x for x in dados["demandas"] if x["id"] == dem)
    return [li["id"] for li in d["catalogo"] if li["categoria"] in ("artefato", "variavel")]


def test_catalogo_por_demanda_sem_orfaos_com_itens_exclusivos_e_compartilhados(dados):
    alfa, beta = _ids(dados, "alfa"), _ids(dados, "beta")
    assert "art_sem_uso" not in alfa + beta and "var_sem_uso" not in alfa + beta  # sem uso: em nenhuma demanda
    assert {"art_parecer", "tem_dado_pessoal", "art_codigo", "art_pull_request"} <= set(alfa)
    assert not {"art_parecer", "tem_dado_pessoal", "art_codigo"} & set(beta)
    assert "art_teste_contrato" in beta and "art_teste_contrato" not in alfa
    assert {"art_necessidade", "art_pedido", "modelo_trabalho"} <= set(alfa) & set(beta)  # compartilhados
    assert dados["dados"]["modelo_trabalho"]["demandas"] == ["alfa", "beta"]  # beta pela condição da variante do artefato
    assert dados["dados"]["tem_dado_pessoal"]["demandas"] == ["alfa"]


def test_modal_do_item_compartilhado_separa_por_demanda(dados):
    por = dados["dados"]["art_necessidade"]["por_demanda"]
    assert {r["id"] for r in por["alfa"]["produzido_por"]} == {"alf_orq_t1", "alf_orq_t1_st1"}
    assert {r["id"] for r in por["beta"]["produzido_por"]} == {"bet_orq_t1", "bet_orq_t1_st1"}
    assert all(r["demanda"] == "beta" for r in por["beta"]["consumido_por"]) or por["beta"]["consumido_por"] == []


def test_condicoes_da_variavel_carregam_origem_subtarefa_e_variante(dados):
    tem = dados["dados"]["tem_dado_pessoal"]["por_demanda"]["alfa"]["condicoes"]
    assert [(c["origem"], c["dono"]["id"], c["dono"]["sub"]) for c in tem] == [("subtarefa", ST2, True)]
    modelo = dados["dados"]["modelo_trabalho"]["por_demanda"]
    assert {c["origem"] for c in modelo["beta"]["condicoes"]} == {"variante"}
    assert [c["variante"] for c in modelo["alfa"]["condicoes"]] == ["PRD", "Documento de visão", "Card"]
    assert all(c["dono"]["id"] == "art_necessidade" for c in modelo["alfa"]["condicoes"])


def test_linhas_do_catalogo_levam_tipo_subtipo_e_condicional(dados):
    alfa = next(d for d in dados["demandas"] if d["id"] == "alfa")
    linhas = {li["id"]: li for li in alfa["catalogo"]}
    assert (linhas["art_codigo"]["tipo"], linhas["art_codigo"]["subtipo"]) == ("codigo", "código-fonte")
    assert linhas[ST2]["condicional"] is True and linhas[ST2]["quando"] == "quando tem_dado_pessoal = sim"
    assert linhas["alf_orq_t1_st1"]["condicional"] is False


def test_exemplo_da_subtarefa_e_do_playbook_continua_no_catalogo(dados):
    alfa = next(d for d in dados["demandas"] if d["id"] == "alfa")
    linhas = {li["id"]: li for li in alfa["catalogo"]}
    assert linhas["alf_orq_t1_st1"]["exemplo"].startswith("PRD com problema")
    assert linhas["alf_orq_t1"]["exemplo"].startswith("No time de produto")


# ------------------------------------------------------------------ HTML estático


def test_js_tem_os_elementos_novos_sem_innerhtml():
    for trecho in ("Executar quando: ", "\\u25c6 condicional", "Variantes ", "filtro-tipo-artefato", "Tipo de artefato",
                   "ORDEM_TIPO_ART", "data-variante"):
        assert trecho in _JS, trecho
    assert "innerHTML" not in _JS


def test_legenda_do_html_explica_condicional_e_chamada(dados):
    leg = legenda_html(dados)
    assert "subtarefa condicional" in leg and "Executar quando" in leg
    assert "o nó mostra só o rótulo" in leg


def test_html_gerado_nao_tem_chama_nos_diagramas_embutidos(doc):
    h = gerar_html(doc, mermaid_js="/* mermaid */")
    d = json.loads(re.search(r'id="dados">(.*?)</script>', h, re.S).group(1))
    for dem in d["demandas"]:
        for v in dem["visoes"]:
            assert "chama:" not in v["mmd"] and "chama:" not in v["mmd_sub"]
    assert not re.search(r"[\u2012-\u2015\u2212]", h.replace("/* mermaid */", ""))


def test_json_embutido_escapa_texto_hostil_de_variante_e_subtarefa(doc):
    _art(doc, "art_necessidade")["variantes"][0]["descricao"] = "</script><img src=x onerror=alert(1)>"
    _sub(doc, ST2)["porque"] = "</script><b>x</b>"
    h = gerar_html(doc, mermaid_js="/* mermaid */")
    assert h.count("<script") == 3 and "<img src=x" not in h and "<b>x</b>" not in h


# ------------------------------------------------------------------ YAML real


def test_yaml_real_continua_valido_sem_erros():
    erros = [i for i in validate(load_yaml(REAL), SCHEMA, avisos=True) if i.nivel == "erro"]
    assert erros == []


def test_yaml_real_gera_html_sem_chama_nos_nos():
    d = montar_dados(load_yaml(REAL))
    for dem in d["demandas"]:
        for v in dem["visoes"]:
            assert "chama:" not in v["mmd"] and "chama:" not in v["mmd_sub"]


# ------------------------------------------------------------------ integração (Chrome)


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


@pytest.fixture(scope="module")
def navegador(tmp_path_factory: pytest.TempPathFactory) -> dict[str, Any]:
    tmp = tmp_path_factory.mktemp("cond")
    arquivo = tmp / "guia.html"
    arquivo.write_text(gerar_html(load_yaml(FIXTURE)), encoding="utf-8")
    porta = _porta_livre()
    chrome = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files",
         f"--user-data-dir={tmp / 'perfil'}", f"--remote-debugging-port={porta}", "--window-size=1400,900", arquivo.as_uri()],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        proc = subprocess.run(["node", str(HELPER), str(porta)], capture_output=True, text=True, timeout=600, check=False)
    finally:
        chrome.terminate()
        try:
            chrome.wait(timeout=10)
        except subprocess.TimeoutExpired:
            chrome.kill()
    m = re.search(r"RESULTADO (.*)", proc.stdout)
    assert m, f"sem resultado: {proc.stdout[-500:]} {proc.stderr[-800:]}"
    return json.loads(m.group(1))


def _integracao(f):
    for m in (
        pytest.mark.integration,
        pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado"),
        pytest.mark.skipif(shutil.which("node") is None, reason="node não encontrado"),
    ):
        f = m(f)
    return f


@_integracao
def test_chrome_diagrama_sem_chama_e_com_subtarefa_condicional_tracejada(navegador):
    d = navegador["diagrama"]
    assert d["texto_chamada"] and "chama" not in d["texto_chamada"].lower() and "alf_orq_c1" in d["texto_chamada"]
    assert d["texto_sub_condicional"].startswith("alf_orq_t1_st2") and "◆" in d["texto_sub_condicional"]
    assert "◆" not in d["texto_sub_normal"]
    assert d["borda_condicional"] != "none" and d["borda_condicional"] != "" and d["borda_normal"] in ("", "none")
    assert d["legenda_condicional"] is True


@_integracao
def test_chrome_modal_da_tarefa_lista_subtarefa_condicional_com_selo_e_condicao(navegador):
    t = navegador["modal_tarefa"]
    assert t["itens_condicionais"] == [ST2]
    assert t["selo"] == "◆ condicional" and t["quando"] == "Executar quando tem_dado_pessoal = sim"


@_integracao
def test_chrome_modal_da_subtarefa_mostra_executar_quando_e_porque(navegador):
    s = navegador["modal_sub"]
    assert s["executar_quando"].endswith("Executar quando: tem_dado_pessoal = sim")
    assert s["porque"] == "Porque: Dado pessoal exige base legal registrada antes de implementar."
    assert navegador["modal_sub_normal"]["executar_quando"] is None


@_integracao
def test_chrome_modal_de_artefato_lista_variantes_com_condicao_legivel(navegador):
    v = navegador["modal_artefato"]
    assert v["variantes"] == ["PRD", "Documento de visão", "Card"]
    assert v["condicoes_variantes"] == ["Vale quando modelo_trabalho = produto", "Vale quando modelo_trabalho = projeto",
                                        "Vale quando modelo_trabalho = fluxo_continuo"]
    assert "Subtipo: PRD" in v["meta"] and "Tipo: documento" in v["meta"]


@_integracao
def test_chrome_filtro_por_tipo_de_artefato_em_ordem_estavel(navegador):
    f = navegador["filtro_tipo"]
    # ordem da taxonomia: categorias novas primeiro, legados (como comunicação) no fim
    assert f["chips_alfa"] == ["documento", "ação", "código", "pull request", "comunicação"]
    assert f["chips_beta"] == ["documento", "teste", "comunicação"]
    assert f["so_documento"] == ["art_necessidade", "art_parecer"]
    assert f["documento_e_acao"] == ["art_card_atualizado", "art_necessidade", "art_parecer"]
    assert f["so_documento_contador"].startswith("2 de ")
    assert f["limpo"] == f["todos"]
    assert f["linha_tipo"] == "documento · PRD"


@_integracao
def test_chrome_item_compartilhado_e_troca_de_demanda(navegador):
    c = navegador["compartilhado"]
    assert c["alfa_tem_parecer"] is True and c["beta_tem_parecer"] is False
    assert c["beta_tem_teste"] is True and c["alfa_tem_teste"] is False
    assert c["tambem_usado"] == ["beta:Beta"]
    assert c["demanda_apos_clique"] == "beta" and c["modal_apos_clique"] == "art_necessidade"
    assert c["refs_beta"] == ["bet_orq_t1", "bet_orq_t1_st1"] and c["sem_orfaos"] is True
    assert c["exclusivo_sem_tambem"] is True


@_integracao
def test_chrome_variavel_mostra_condicoes_de_subtarefa_e_de_variante(navegador):
    v = navegador["modal_variavel"]
    assert v["origens"] == ["subtarefa"] and "Usada em condições (1)" in v["titulos"]
    m = navegador["modal_variavel_modelo"]
    assert m["origens"] == ["variante", "variante", "variante"] and m["botao_artefato"] == "Abrir o artefato: Registro da necessidade"


@_integracao
def test_chrome_coluna_exemplo_busca_e_blocos_de_exemplo_nos_modais(navegador):
    e = navegador["exemplo"]
    assert e["cabecalho"] == ["Item", "Categoria", "Raia", "Descrição", "Exemplo"]
    assert e["celula_subtarefa"].startswith("PRD com problema")
    assert e["celula_tarefa"].startswith("No time de produto")
    assert e["busca"] == ["art_pedido"]
    assert e["modal_subtarefa"].startswith("PRD com problema")
    assert e["modal_tarefa"].startswith("No time de produto")


@_integracao
def test_chrome_sem_erros_de_js(navegador):
    assert navegador["erros_js"] == []
