"""Aba Catálogo: filtros por raia e categoria, linhas de todos os nós e subtarefas, exemplos e modal de detalhes.

Os testes sem Chrome usam `tests/fixtures/subtarefas.yaml` e o YAML real. A parte de integração (marcada
`integration`) roda o JS real no Chrome headless com `cdp_catalogo.mjs` e é ignorada sem Chrome ou sem node.
"""

from __future__ import annotations

import json
import re
import shutil
import socket
import subprocess
from pathlib import Path
from typing import Any

import pytest

from guia_decisao.html_gen import _JS, gerar_html, montar_dados
from guia_decisao.loader import load_yaml
from guia_decisao.ordem import ordem_fluxo
from guia_decisao.rastreio import usos_em_condicoes
from tests.unit.test_html_navegacao import CHROME
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "subtarefas.yaml"
REAL = GUIA_DIR
HELPER = Path(__file__).with_name("cdp_catalogo.mjs")
CATEGORIAS_NO = {"inicio", "tarefa", "gateway", "chamada", "fim", "subtarefa"}


@pytest.fixture(scope="module")
def doc() -> dict[str, Any]:
    return load_yaml(FIXTURE)


@pytest.fixture(scope="module")
def dados(doc: dict[str, Any]) -> dict[str, Any]:
    return montar_dados(doc)


@pytest.fixture(scope="module")
def bug(dados: dict[str, Any]) -> dict[str, Any]:
    return next(d for d in dados["demandas"] if d["id"] == "bug")


# ------------------------------------------------------------------ linhas


def test_catalogo_tem_linhas_das_nove_categorias(bug):
    # as perguntas-chave da fixture viram linhas da categoria `pergunta`
    assert {li["categoria"] for li in bug["catalogo"]} == CATEGORIAS_NO | {"artefato", "variavel", "tecnica", "pergunta"}


def test_tecnicas_do_catalogo_sao_as_usadas_na_demanda(dados, bug):
    tecnicas = [li for li in bug["catalogo"] if li["categoria"] == "tecnica"]
    assert tecnicas
    for li in tecnicas:
        usos = [r for r in dados["tecnicas"][li["id"]]["usada_em"] if r["demanda"] == "bug"]
        assert usos and li["usos"] == len(usos)
        assert set(li["raias"]) == {r["raia"] for r in usos if r["raia"]}
        assert li["raia"] == ""  # técnica é global; o filtro por raia usa `raias`


def test_toda_categoria_de_no_tem_linha_com_rotulo_raia_e_resumo(doc, dados, bug):
    por_id = {li["id"]: li for li in bug["catalogo"]}
    nos_bug = [n for n in doc["decisoes"] if dados["nos"][n["id"]]["demanda"] == "bug"]
    assert nos_bug and all(n["id"] in por_id for n in nos_bug)
    esperado = {"inicio": "inicio", "tarefa": "tarefa", "chamada": "chamada", "fim": "fim", "bifurcacao": "gateway"}
    for n in nos_bug:
        li = por_id[n["id"]]
        assert li["categoria"] == esperado[n["tipo"]]
        assert li["nome"] == n["rotulo"] and li["raia"] == n["raia"]
    com_resumo = por_id["bug_orq_s1"]
    assert com_resumo["descricao"].startswith("Todo bug nasce de um relato")
    # cada subtarefa vira uma linha própria, com a raia e a tarefa pai
    sub = por_id["bug_diag_t1_st2"]
    assert (sub["categoria"], sub["raia"], sub["pai"], sub["pai_rotulo"]) == ("subtarefa", "bug_diag", "bug_diag_t1", "Reproduzir o defeito")
    assert sub["nome"] == "Tentar reproduzir" and sub["descricao"].startswith("Execute os passos")
    assert por_id["bug_orq_c2"]["descricao"] == "Chama a raia Correção"  # chamada sem playbook ganha um resumo


def test_ordem_das_linhas_raias_em_ordem_de_fluxo_e_globais_no_fim(doc, dados, bug):
    ids = [li["id"] for li in bug["catalogo"]]
    nomes_raias = [r["id"] for r in bug["raias"]]
    raias_das_linhas = [li["raia"] for li in bug["catalogo"] if li["raia"]]
    assert [r for i, r in enumerate(raias_das_linhas) if i == 0 or r != raias_das_linhas[i - 1]] == nomes_raias
    brutos = {n["id"]: n for n in doc["decisoes"]}
    for r in nomes_raias:
        da_raia = [n for n, b in brutos.items() if b["raia"] == r]
        fluxo = ordem_fluxo(brutos, da_raia)
        assert [i for i in ids if i in set(da_raia)] == fluxo
    globais = [li for li in bug["catalogo"] if not li["raia"]]
    assert bug["catalogo"][-len(globais):] == globais
    cats = [li["categoria"] for li in globais]
    # artefatos, variáveis e depois as linhas globais (papéis, ritos, perguntas e técnicas)
    assert cats[:9] == ["artefato"] * 6 + ["variavel"] * 3 and set(cats[9:]) <= {"papel", "rito", "pergunta", "tecnica"}
    assert [li["id"] for li in globais if li["categoria"] == "artefato"] == sorted(
        (li["id"] for li in globais if li["categoria"] == "artefato")
    )
    # a subtarefa vem logo depois da tarefa pai, na ordem de execução
    assert ids.index("bug_diag_t1") + 1 == ids.index("bug_diag_t1_st1") and ids.index("bug_diag_t1_st2") + 1 == ids.index("bug_diag_t1_st3")


def test_catalogo_e_deterministico(doc):
    assert json.dumps(montar_dados(doc)["demandas"], sort_keys=True) == json.dumps(montar_dados(doc)["demandas"], sort_keys=True)


# ----------------------------------------------------------------- exemplos


def test_exemplo_nas_linhas_e_no_catalogo_de_dados(dados, bug):
    linhas = {li["id"]: li for li in bug["catalogo"]}
    assert linhas["art_repro"]["exemplo"].startswith("1. Abrir o checkout")
    assert linhas["tentativas"]["exemplo"] == "2 (a terceira falha escala)"
    assert linhas["art_causa"]["exemplo"] == ""  # sem exemplo declarado, a coluna fica vazia
    assert dados["dados"]["severidade"]["exemplo"] == "sev1"
    assert linhas["bug_diag_t1"]["exemplo"].startswith("Relato de tela branca")  # exemplo do Playbook do nó
    assert linhas["bug_diag_t1_st2"]["exemplo"].startswith("Rodar o passo a passo")  # exemplo da subtarefa
    assert linhas["bug_diag_t1_st1"]["exemplo"] == "" and linhas["bug_orq_s1"]["exemplo"] == ""  # sem exemplo, a coluna fica vazia


def test_exemplo_de_no_e_subtarefa_vai_para_o_modal_e_o_json(dados):
    assert dados["nos"]["bug_diag_t1"]["exemplo"].startswith("Relato de tela branca")
    assert dados["playbooks"]["pb_bug_diag_t1"]["exemplo"] == dados["nos"]["bug_diag_t1"]["exemplo"]
    assert dados["subtarefas"]["bug_diag_t1_st2"]["exemplo"].startswith("Rodar o passo a passo")
    assert dados["subtarefas"]["bug_diag_t1_st1"]["exemplo"] == "" and dados["nos"]["bug_orq_s1"]["exemplo"] == ""


def test_js_mostra_bloco_exemplo_nos_modais_so_com_textcontent():
    assert 'pb.exemplo' in _JS and 'st.exemplo' in _JS and '"exemplo-bloco"' in _JS
    assert "innerHTML" not in _JS


# ------------------------------------------------- catálogo por demanda, sem órfãos


def _ids_dados(dem: dict[str, Any]) -> list[str]:
    return [li["id"] for li in dem["catalogo"] if li["categoria"] in ("artefato", "variavel")]


def test_catalogo_de_cada_demanda_so_tem_os_dados_que_ela_usa(dados):
    por = {d["id"]: d for d in dados["demandas"]}
    bug, inc = _ids_dados(por["bug"]), _ids_dados(por["incidente"])
    assert "art_postmortem" not in bug and "mitigado" not in bug  # exclusivos do incidente
    assert not {"art_repro", "art_relato", "art_causa", "tentativas", "reproduzido"} & set(inc)  # exclusivos do bug
    assert "severidade" in bug and "severidade" in inc  # compartilhado aparece nas duas
    assert "art_orfao" not in bug + inc  # sem nenhum uso, não aparece em demanda nenhuma
    assert inc == ["art_postmortem", "mitigado", "severidade"]


def test_item_sem_uso_fica_fora_de_todas_as_demandas_mas_segue_no_catalogo_de_dados(dados):
    assert dados["dados"]["art_orfao"]["demandas"] == []
    assert dados["dados"]["severidade"]["demandas"] == ["bug", "incidente"]
    assert dados["dados"]["mitigado"]["demandas"] == ["incidente"]  # entra pela chave `estado` do nó


def test_produtores_e_consumidores_do_modal_ficam_por_demanda(dados):
    sev = dados["dados"]["severidade"]["por_demanda"]
    assert set(sev) == {"bug", "incidente"}
    assert {r["id"] for r in sev["incidente"]["consumido_por"]} == {"inc_orq", "inc_orq_t1"}
    assert sev["bug"]["consumido_por"] and all(r["demanda"] == "bug" for r in sev["bug"]["consumido_por"])
    assert not {r["id"] for r in sev["bug"]["consumido_por"]} & {"inc_orq", "inc_orq_t1"}
    assert {c["dono"]["id"] for c in sev["bug"]["condicoes"]} >= {"bug_diag_t1"} and sev["incidente"]["condicoes"] == []
    assert dados["dados"]["art_postmortem"]["por_demanda"]["incidente"]["produzido_por"][0]["id"] == "inc_orq_t1"


def test_item_so_em_condicao_pertence_a_demanda_da_condicao():
    doc = json.loads(json.dumps(load_yaml(FIXTURE), default=str))
    doc["variaveis"].append({"id": "so_condicao", "nome": "Só em condição", "tipo": "booleano"})
    no = next(n for n in doc["decisoes"] if n["id"] == "inc_orq_t1")
    no["tecnicas"] = [{"tecnica": doc["tecnicas"][0]["id"], "uso": "condicional",
                       "quando": {"todos": [{"var": "so_condicao", "igual": "sim"}]}}]
    d = montar_dados(doc)
    por = {x["id"]: x for x in d["demandas"]}
    assert d["dados"]["so_condicao"]["demandas"] == ["incidente"]
    assert "so_condicao" in _ids_dados(por["incidente"]) and "so_condicao" not in _ids_dados(por["bug"])
    assert d["dados"]["so_condicao"]["por_demanda"]["incidente"]["condicoes"][0]["dono"]["id"] == "inc_orq_t1"


def test_yaml_real_cada_demanda_lista_so_o_que_usa_e_nada_fica_sem_demanda():
    real = load_yaml(REAL)
    d = montar_dados(real)
    todos = {*(a["id"] for a in real["artefatos"]), *(v["id"] for v in real["variaveis"])}
    visto: set[str] = set()
    for dem in d["demandas"]:
        ids = set(_ids_dados(dem))
        assert ids == {i for i in todos if dem["id"] in d["dados"][i]["demandas"]}
        visto |= ids
    assert visto == todos  # o YAML real não tem item sem uso (ITEM_SEM_USO)


def test_yaml_real_todo_artefato_e_variavel_tem_exemplo_sem_travessao():
    real = load_yaml(REAL)
    itens = [*real["artefatos"], *real["variaveis"]]
    assert itens and all(isinstance(i.get("exemplo"), str) and i["exemplo"].strip() for i in itens)
    assert not any(re.search(r"[\u2012-\u2015\u2212]", i["exemplo"]) for i in itens)
    d = montar_dados(real)["dados"]
    assert all(d[i["id"]]["exemplo"] == i["exemplo"] for i in itens)


def test_yaml_real_catalogo_cobre_nos_e_subtarefas_de_cada_demanda():
    real = load_yaml(REAL)
    d = montar_dados(real)
    for dem in d["demandas"]:
        ids = {li["id"] for li in dem["catalogo"]}
        esperados = {nid for nid, n in d["nos"].items() if n["demanda"] == dem["id"]} | {
            sid for sid, s in d["subtarefas"].items() if s["demanda"] == dem["id"]
        }
        assert esperados <= ids
        assert {li["categoria"] for li in dem["catalogo"]} >= {"inicio", "tarefa", "gateway", "chamada", "fim"}


def test_schema_aceita_exemplo_so_como_texto_em_artefato_e_variavel():
    from jsonschema import Draft202012Validator

    esquema = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))
    for nome, obrigatorios in (("Artefato", {"id": "a1", "nome": "A"}), ("Variavel", {"id": "v1", "nome": "V", "tipo": "texto"})):
        sub = {"$ref": f"#/$defs/{nome}", "$defs": esquema["$defs"]}
        v = Draft202012Validator(sub)
        assert not list(v.iter_errors({**obrigatorios, "exemplo": "um exemplo"}))
        assert list(v.iter_errors({**obrigatorios, "exemplo": 3}))
        assert list(v.iter_errors({**obrigatorios, "exemplo_errado": "x"}))  # estrutura fechada


# ------------------------------------------------------------ dados do modal


def test_variavel_leva_valores_inicial_tipo_e_condicoes(dados):
    v = dados["dados"]["severidade"]
    assert (v["classe"], v["tipo"], v["valores"], v["inicial"]) == ("variavel", "enum", ["sev1", "sev2", "sev3"], "sev3")
    donos = [(c["dono"]["id"], c["dono"]["sub"], c["tecnica"], c["uso"]) for c in v["condicoes"]]
    assert ("bug_diag_t1", False, "tec_pareamento", "condicional") in donos
    assert any(c["dono"]["id"] == "bug_diag_t1_st2" and c["dono"]["sub"] and c["quando"].startswith("quando ") for c in v["condicoes"])
    assert dados["dados"]["art_repro"]["condicoes"] == []
    assert dados["dados"]["tentativas"]["condicoes"] and dados["dados"]["tentativas"]["inicial"] == 0


def test_produtor_e_consumidor_levam_ao_no_subtarefa_ou_raia(dados):
    a = dados["dados"]["art_relato"]
    assert a["lacunas"] == ["produtor"] and a["produzido_por"] == []
    tipos = {r["id"]: (r["tipo"], r["aba"], r["sub"]) for r in dados["dados"]["art_repro"]["produzido_por"]}
    assert tipos["bug_diag_t1_st2"] == ("subtarefa", "raia:bug_diag", True)
    assert {r["id"]: r["tipo"] for r in a["consumido_por"]}["bug_diag"] == "raia"


def test_usos_em_condicoes_e_puro_e_ordenado(doc):
    antes = json.dumps(doc, sort_keys=True, default=str)
    r = usos_em_condicoes(doc)
    assert json.dumps(doc, sort_keys=True, default=str) == antes
    assert list(r) == sorted(r) and set(r) >= {"severidade", "tentativas"}
    assert all(u["quando"].startswith("quando ") for lista in r.values() for u in lista)
    assert usos_em_condicoes({}) == {}


# ------------------------------------------------------------- HTML estático


def test_html_tem_filtros_e_nao_tem_colunas_produzido_consumido():
    cabecalho = re.search(r'\["Item", "Categoria", "Raia", "Descrição", "Exemplo"\]', _JS)
    assert cabecalho
    assert '"Produzido por", "Consumido por"' not in _JS and '["Item", "Tipo"' not in _JS
    assert "so-lacunas" not in _JS and "icone-lacuna" not in _JS  # lacuna é aviso do validador, não filtro da tela
    for trecho in ("filtro-raia", "filtro-tipo", "Sem raia", "Todas", "contador-catalogo", "mostrarDado", "Ver no diagrama"):
        assert trecho in _JS
    assert 'textContent' in _JS and "innerHTML" not in _JS


def test_html_sem_url_externa_nem_travessao(doc):
    h = gerar_html(doc, mermaid_js="/* mermaid */")
    corpo = h.replace("/* mermaid */", "")
    assert not re.search(r"[\u2012-\u2015\u2212]", corpo)
    assert not re.search(r"(?:src|href)=[\"']https?:", corpo) and "fetch(" not in corpo and "XMLHttpRequest" not in corpo
    assert "Catálogo" in h


def test_json_embutido_escapa_exemplo_hostil(doc):
    hostil = json.loads(json.dumps(doc))
    hostil["artefatos"][0]["exemplo"] = "</script><img src=x onerror=alert(1)> \u2014 x"
    h = gerar_html(hostil, mermaid_js="/* mermaid */")
    assert h.count("<script") == 3 and "<img src=x" not in h
    d = json.loads(re.search(r'id="dados">(.*?)</script>', h, re.S).group(1))
    assert d["dados"]["art_relato"]["exemplo"] == "</script><img src=x onerror=alert(1)>, x"


# -------------------------------------------------------------- integração


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


@pytest.fixture(scope="module")
def navegador(tmp_path_factory: pytest.TempPathFactory) -> dict[str, Any]:
    tmp = tmp_path_factory.mktemp("cat")
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
def test_chrome_tabela_sem_produzido_consumido_e_com_exemplo(navegador):
    assert navegador["cabecalhos"] == ["Item", "Categoria", "Raia", "Descrição", "Exemplo"]
    assert set(navegador["categorias"]) == CATEGORIAS_NO | {"artefato", "variavel", "tecnica", "pergunta"}
    assert navegador["contador_inicial"] == "38 de 38 itens"
    assert navegador["linha_art"][1:3] == ["Artefato", "global"] and navegador["linha_art"][4].startswith("1. Abrir")
    assert navegador["linha_sub"][1:3] == ["Subtarefa", "Diagnóstico"] and "Reproduzir o defeito" in navegador["linha_sub"][0]
    assert navegador["icone_lacuna"] is None and navegador["sem_icone"]  # a tabela não marca lacunas
    assert navegador["orfao_na_tela"] is False  # sem nenhum uso, o item some do Catálogo (o validador avisa ITEM_SEM_USO)
    assert navegador["botoes_raia"] == ["Todas", "Orquestração do bug", "Diagnóstico", "Correção", "Sem raia"]
    assert navegador["cor_botao_raia"].startswith("rgb(")
    assert navegador["botoes_tipo"] == ["Artefato", "Variável", "Início", "Tarefa", "Gateway", "Chamada", "Fim", "Subtarefa", "Técnica", "Papel", "Rito", "Pergunta"]


@_integracao
def test_chrome_filtros_por_raia_e_categoria_combinam(navegador):
    assert navegador["raia_diag"] == ["bug_diag_s1", "bug_diag_t1", "bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3",
                                      "bug_diag_g1", "bug_diag_e2", "bug_diag_t2", "bug_diag_e1",  # ordem de fluxo
                                      "tec_x5_whys", "tec_bisect", "tec_logs", "tec_pareamento"]  # técnicas usadas na raia, no fim
    assert navegador["raia_diag_pressionado"] == "true" and navegador["contador_raia"] == "13 de 38 itens"
    assert navegador["raia_tarefa"] == ["bug_diag_t1", "bug_diag_t2"]
    assert navegador["raia_tarefa_sub"] == ["bug_diag_t1", "bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3", "bug_diag_t2"]
    assert navegador["contador_combinado"] == "5 de 38 itens"
    assert navegador["combinado_texto"] == ["bug_diag_t1", "bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3"]
    sr = navegador["sem_resultados"]
    assert sr["itens"] == [] and sr["contador"] == "0 de 38 itens" and sr["aviso"]
    assert len(navegador["apos_limpar"]) == 38


@_integracao
def test_chrome_sem_raia_e_so_lacunas(navegador):
    assert navegador["sem_raia"] == ["art_alerta", "art_causa", "art_patch", "art_politica", "art_relato", "art_repro",
                                     "reproduzido", "severidade", "tentativas", "pq_bug_orq_s1_1", "pq_bug_orq_g1_1", "tec_x5_whys", "tec_bisect", "tec_logs", "tec_pareamento"]
    assert navegador["sem_raia_variavel"] == ["reproduzido", "severidade", "tentativas"]
    assert navegador["so_lacunas"] is None  # o filtro "Só lacunas" saiu da tela


@_integracao
def test_chrome_modal_de_artefato_com_produtor_consumidor_e_navegacao(navegador):
    m = navegador["modal_artefato"]
    assert m["titulo"] == "art_repro" and m["exemplo"] == ["1. Abrir o checkout. 2. Aplicar cupom. 3. Tocar em pagar."]
    assert m["titulos"] == ["Descrição", "Exemplo", "Produzido por (2)", "Consumido por (2)"]
    assert m["refs"] == ["bug_diag_t1", "bug_diag_t1_st2", "bug_diag_t1_st3", "bug_diag_t2"]
    ref = navegador["apos_ref"]
    assert ref["aba"] == "raia:bug_diag" and ref["expandido"] and ref["destaque"] == "bug_diag_t1_st2" and ref["destaque_visivel"]
    assert not ref["modal_aberto"] and ref["voltar_ativo"]
    volta = navegador["voltou_ao_catalogo"]
    assert volta["aba"] == "catalogo" and not volta["expandido"]
    assert navegador["filtros_preservados"] == ["art_alerta", "art_causa", "art_patch", "art_politica", "art_relato", "art_repro"]


@_integracao
def test_chrome_modal_de_variavel_e_de_item_orfao(navegador):
    v = navegador["modal_variavel"]
    assert v["titulo"] == "severidade" and v["exemplo"] == ["sev1"]
    assert v["titulos"][:4] == ["Descrição", "Exemplo", "Valores permitidos", "Valor inicial"]
    assert v["chips"] == ["sev1", "sev2", "sev3"] and v["lacunas"] == []  # o valor inicial conta como produtor
    assert "Usada em condições (2)" in v["titulos"]
    assert navegador["condicao_botoes"] == ["bug_diag_t1", "bug_diag_t1_st2"]
    assert navegador["apos_fechar"] is True
    o = navegador["modal_orfao"]
    assert o["lacunas"] == ["⚠ sem consumidor"] and o["foco"] == "m-fechar"
    assert navegador["apos_esc"] is True


@_integracao
def test_chrome_ver_no_diagrama_de_tarefa_e_subtarefa_e_voltar(navegador):
    assert "Ver no diagrama" in navegador["modal_tarefa"]["botoes"] and "Subtarefas" in " ".join(navegador["modal_tarefa"]["titulos"])
    d = navegador["ver_no_diagrama"]
    assert d["aba"] == "raia:bug_diag" and d["destaque"] == "bug_diag_t1" and d["destaque_visivel"] and d["voltar_ativo"]
    assert navegador["voltar_do_no"]["aba"] == "catalogo"
    assert "Ver no diagrama" in navegador["modal_subtarefa"]["botoes"]
    s = navegador["ver_subtarefa"]
    assert s["aba"] == "raia:bug_diag" and s["expandido"] and s["destaque"] == "bug_diag_t1_st2" and s["destaque_visivel"]
    assert "Ver no diagrama" in navegador["modal_do_diagrama"]["botoes"]


@_integracao
def test_chrome_coluna_exemplo_e_busca_por_exemplo(navegador):
    assert navegador["linha_sub"][4].startswith("Rodar o passo a passo")
    assert navegador["busca_exemplo_sub"] == ["bug_diag_t1_st2"]  # "simulador" só existe no exemplo
    assert navegador["busca_exemplo_playbook"] == ["bug_diag_t1"]  # texto só do exemplo do Playbook


@_integracao
def test_chrome_bloco_exemplo_nos_modais_de_tarefa_e_subtarefa(navegador):
    t = navegador["exemplo_tarefa"]
    assert "Exemplo" in t["titulos"] and len(t["exemplo"]) == 1 and t["exemplo"][0].startswith("Relato de tela branca")
    s = navegador["exemplo_subtarefa"]
    assert "Exemplo" in s["titulos"] and s["exemplo"] == [
        "Rodar o passo a passo no simulador com o cupom QUINZE: a tela fica branca no terceiro toque."]
    assert navegador["sem_exemplo_subtarefa"] is False  # sem `exemplo`, o bloco não aparece


@_integracao
def test_chrome_trocar_de_demanda_muda_o_catalogo(navegador):
    assert navegador["postmortem_no_bug"] is False
    assert navegador["inc_itens"] == ["inc_orq_s1", "inc_orq_t1", "inc_orq_e1", "art_postmortem", "mitigado", "severidade"]
    assert navegador["inc_contador"] == "6 de 6 itens"
    assert navegador["inc_globais"] == ["art_postmortem", "mitigado", "severidade"]
    assert "art_repro" not in navegador["inc_itens"] and "art_orfao" not in navegador["inc_itens"]
    assert len(navegador["bug_itens_depois"]) == 38 and "art_postmortem" not in navegador["bug_itens_depois"]


@_integracao
def test_chrome_item_compartilhado_lista_so_a_demanda_atual_e_tambem_usado_em_troca_de_demanda(navegador):
    inc = navegador["inc_severidade"]
    assert inc["titulo"] == "severidade"
    assert inc["refs"] == ["inc_orq", "inc_orq_t1"]  # só os do incidente (os do bug ficam de fora)
    assert "Também usado em: Bug" in navegador["inc_tambem_texto"] and navegador["inc_tambem"] == ["bug:Bug"]
    bug = navegador["bug_severidade"]  # depois do clique: demanda trocada e modal aberto no item
    assert bug["titulo"] == "severidade" and "inc_orq" not in bug["refs"] and "bug_diag" in bug["refs"]
    assert navegador["bug_tambem"] == ["incidente"] and navegador["apos_tambem"]["aba"] == "catalogo"
    assert navegador["apos_tambem"]["voltar_ativo"]
    assert navegador["exclusivo_sem_tambem"] is True
