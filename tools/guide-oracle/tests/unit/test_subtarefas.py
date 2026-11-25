"""Subtarefas, artefatos, variáveis e técnicas nos geradores: Mermaid (duas variantes), dados do modal, legenda e aba Catálogo.

Os testes sem Chrome usam a fixture `tests/fixtures/subtarefas.yaml`. A parte de integração (marcada
`integration`) roda o JS real no Chrome headless e é ignorada sem Chrome ou sem node.
"""

from __future__ import annotations

import html as html_lib
import json
import re
import shutil
import socket
import subprocess
from pathlib import Path
from typing import Any

import pytest

from guia_decisao.html_gen import gerar_html, legenda_html, montar_dados
from guia_decisao.loader import load_yaml
from guia_decisao.mermaid_gen import gerar_diagrama, gerar_todos, sanitizar_id
from tests.unit.test_html_navegacao import CHROME
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "subtarefas.yaml"
BASE = RAIZ / "tests" / "fixtures" / "raias_minimo.yaml"
HELPER = Path(__file__).with_name("cdp_subtarefas.mjs")
SAIDA = RAIZ / "saida"


@pytest.fixture(scope="module")
def doc() -> dict[str, Any]:
    return load_yaml(FIXTURE)


@pytest.fixture(scope="module")
def dados(doc: dict[str, Any]) -> dict[str, Any]:
    return montar_dados(doc)


# --------------------------------------------------------------- mermaid


def test_modo_oculto_e_o_padrao_e_marca_a_tarefa_com_subtarefas(doc):
    padrao = gerar_diagrama(doc, "bug", "raia:bug_diag", legenda=False).texto
    oculto = gerar_diagrama(doc, "bug", "raia:bug_diag", legenda=False, subtarefas=False).texto
    assert padrao == oculto
    assert "▸ 3 subtarefas" in oculto
    assert "bug_diag_t1_st1" not in oculto and "z_TS_" not in oculto
    assert "▸" not in re.search(r'bug_diag_t2\[.*', oculto).group(0)  # tarefa sem subtarefas não leva o indicador


def test_indicador_no_singular(doc):
    um = json.loads(json.dumps(doc))
    for n in um["decisoes"]:
        if n["id"] == "bug_corr_t1":
            n["subtarefas"] = n["subtarefas"][:1]
    assert "▸ 1 subtarefa<" in gerar_diagrama(um, "bug", "raia:bug_corr", legenda=False).texto


def test_modo_expandido_tem_subgraph_aninhado_e_cadeia(doc):
    d = gerar_diagrama(doc, "bug", "raia:bug_diag", legenda=False, subtarefas=True)
    t = d.texto
    assert re.search(r'subgraph z_TS_bug_diag_t1\["<b>Reproduzir o defeito</b>"\]\n\s+direction LR', t)
    assert t.index("subgraph z_SG_bug_diag") < t.index("subgraph z_TS_bug_diag_t1")  # aninhado na raia
    cadeia = ["bug_diag_t1", "bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3"]
    for a, b in zip(cadeia, cadeia[1:]):
        assert f"  {a} --> {b}\n" in t
    assert "bug_diag_s1 --> bug_diag_t1\n" in t  # entrada na tarefa (cabeçalho)
    assert "bug_diag_t1_st3 --> bug_diag_g1\n" in t  # saída a partir da última subtarefa
    assert "bug_diag_t1 --> bug_diag_g1" not in t
    assert "🤖 agente" in t and "🤝 ambos" in t and "👤 pessoa" in t
    assert d.mapa_ids["bug_diag_t1_st2"] == "bug_diag_t1_st2" and d.mapa_ids["bug_diag_t1"] == "bug_diag_t1"
    assert "▸" not in t


def test_subtarefa_tem_estilo_proprio_na_cor_da_raia_mais_clara(doc):
    t = gerar_diagrama(doc, "bug", "raia:bug_diag", legenda=False, subtarefas=True).texto
    assert re.search(r"classDef z_S_\d+ fill:#[0-9A-F]{6},.*font-size:12px", t)
    assert re.search(r"class bug_diag_t1_st1,bug_diag_t1_st2,bug_diag_t1_st3 z_S_\d+", t)
    assert re.search(r"style z_TS_bug_diag_t1 .*stroke-dasharray", t)


def test_ordem_das_subtarefas_e_a_da_lista(doc):
    t = gerar_diagrama(doc, "bug", "completo", legenda=False, subtarefas=True).texto
    pos = [t.index(f"      bug_diag_t1_st{n}(") for n in (1, 2, 3)]
    assert pos == sorted(pos)


def test_visao_com_ligacao_sai_da_ultima_subtarefa(doc):
    t = gerar_diagrama(doc, "bug", "visao", legenda=False, subtarefas=True).texto
    assert "bug_orq_g1 -->|\"sim\"| bug_orq_t1\n" in t
    assert "bug_orq_t1_st2 --> bug_orq_e1\n" in t


def test_determinismo_das_duas_variantes(doc):
    for sub in (False, True):
        a = gerar_todos(doc, legenda=False, subtarefas=sub)
        b = gerar_todos(load_yaml(FIXTURE), legenda=False, subtarefas=sub)
        assert {k: v.texto for k, v in a.items()} == {k: v.texto for k, v in b.items()}


def test_sem_subtarefas_as_duas_variantes_sao_iguais():
    base = load_yaml(BASE)
    for v in ("visao", "completo", "raia:bug_diag"):
        assert gerar_diagrama(base, "bug", v, subtarefas=True).texto == gerar_diagrama(base, "bug", v).texto


def test_legenda_standalone_tem_st_so_no_modo_expandido(doc):
    com = gerar_diagrama(doc, "bug", "visao", legenda=True, subtarefas=True).texto
    sem = gerar_diagrama(doc, "bug", "visao", legenda=True).texto
    assert "<b>st</b>: subtarefa" in com and "st</b>" not in sem
    assert "travess" not in com and not re.search(r"[\u2012-\u2015\u2212]", com)


def test_ids_de_subtarefa_sao_sanitizados_sem_colisao(doc):
    ids = [s["id"] for n in doc["decisoes"] for s in n.get("subtarefas", [])]
    assert len({sanitizar_id(i) for i in ids}) == len(ids)


# ------------------------------------------------------------ dados / modal


def test_no_traz_entradas_saidas_tecnicas_e_subtarefas(dados):
    n = dados["nos"]["bug_diag_t1"]
    assert n["entradas"] == ["art_relato", "severidade"] and n["saidas"] == ["art_repro", "reproduzido"]
    assert [u["uso"] for u in n["tecnicas"]] == ["obrigatoria", "recomendada", "opcional", "condicional"]
    assert n["tecnicas"][0]["nome"] == "5 porquês" and n["tecnicas"][0]["porque"] == "Evita parar no sintoma."
    assert n["tecnicas"][3]["quando"] == "quando severidade em [sev1, sev2]"
    assert n["subtarefas"] == ["bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3"]
    assert dados["nos"]["bug_orq_g1"]["subtarefas"] == []


def test_transicoes_continuam_nos_nos(dados):
    assert [s["para"] for s in dados["nos"]["bug_orq_c1"]["transicoes"]] == ["bug_orq_c2", "bug_orq_e2"]


def test_fim_entrega_saidas(dados):
    assert dados["nos"]["bug_diag_e1"]["saidas"] == ["art_causa"]


def test_subtarefa_tem_dados_completos(dados):
    st = dados["subtarefas"]["bug_diag_t1_st2"]
    assert st["tarefa"] == "bug_diag_t1" and st["indice"] == 2 and st["total"] == 3
    assert st["responsavel"] == "ambos" and st["entradas"] == ["art_relato", "severidade"]
    assert st["anterior"] == "bug_diag_t1_st1" and st["proxima"] == "bug_diag_t1_st3"
    assert st["aba"] == "raia:bug_diag" and st["demanda"] == "bug"
    assert st["tecnicas"][1]["uso"] == "condicional"
    assert st["tecnicas"][1]["quando"] == "quando severidade = sev1 ou tentativas > 2"
    assert dados["subtarefas"]["bug_diag_t1_st1"]["anterior"] == ""
    assert dados["subtarefas"]["bug_diag_t1_st3"]["proxima"] == ""


def test_mapas_de_navegacao_tarefa_subtarefa(dados):
    bug = next(d for d in dados["demandas"] if d["id"] == "bug")
    nav = bug["navegacao"]
    assert nav["subtarefas"]["bug_diag_t1"] == ["bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3"]
    assert nav["tarefa_da_subtarefa"]["bug_corr_t1_st2"] == "bug_corr_t1"
    for tarefa, subs in nav["subtarefas"].items():
        assert all(nav["tarefa_da_subtarefa"][s] == tarefa for s in subs)
    assert nav["subtarefas"].get("bug_diag_t2") is None
    inc = next(d for d in dados["demandas"] if d["id"] == "incidente")
    assert inc["navegacao"]["subtarefas"] == {} and inc["navegacao"]["tarefa_da_subtarefa"] == {}


def test_catalogo_de_dados_para_chips(dados):
    c = dados["dados"]
    assert c["art_relato"]["classe"] == "artefato" and c["art_relato"]["tipo"] == "documento"
    assert c["art_relato"]["descricao"].startswith("Texto do relato")
    assert c["severidade"]["classe"] == "variavel" and c["severidade"]["valores"] == ["sev1", "sev2", "sev3"]
    assert c["tentativas"]["inicial"] == 0


def test_duas_variantes_do_mmd_por_visao(dados):
    bug = next(d for d in dados["demandas"] if d["id"] == "bug")
    por_id = {v["id"]: v for v in bug["visoes"]}
    for vid in ("visao", "raia:bug_orq", "raia:bug_diag", "raia:bug_corr", "completo"):
        v = por_id[vid]
        assert v["mmd"] and v["mmd_sub"] and v["mmd"] != v["mmd_sub"], vid
        assert "z_TS_" in v["mmd_sub"] and "z_TS_" not in v["mmd"]
        assert "bug_diag_t1_st1" in v["mapa_sub"].values() or vid in ("visao", "raia:bug_orq", "raia:bug_corr")
    assert por_id["raia:bug_diag"]["mapa_sub"]["bug_diag_t1_st1"] == "bug_diag_t1_st1"
    assert "bug_diag_t1_st1" not in por_id["raia:bug_diag"]["mapa"]
    inc = next(d for d in dados["demandas"] if d["id"] == "incidente")
    assert all(v["mmd_sub"] == "" for v in inc["visoes"])  # sem subtarefas, sem variante nem alternador


def test_todo_id_de_subtarefa_e_artefato_aparece_nos_ids(dados):
    for i in ("bug_diag_t1_st1", "art_relato", "severidade", "tec_bisect"):
        assert i in dados["ids"]


def test_html_sem_travessoes_nem_url_externa(doc):
    h = gerar_html(doc, mermaid_js="/* mermaid */")
    corpo = h.replace("/* mermaid */", "")
    assert not re.search(r"[\u2012-\u2015\u2212]", corpo)
    assert not re.search(r"(?:src|href)=[\"']https?:", corpo) and "fetch(" not in corpo and "XMLHttpRequest" not in corpo


def test_html_escapa_dados_de_artefato_e_subtarefa(doc):
    hostil = json.loads(json.dumps(doc))
    hostil["artefatos"][0]["nome"] = "</script><img src=x onerror=alert(1)>"
    hostil["artefatos"][0]["descricao"] = "<b>&</b>"
    for n in hostil["decisoes"]:
        for s in n.get("subtarefas", []):
            s["rotulo"] = "</script><script>alert(2)</script>"
    h = gerar_html(hostil, mermaid_js="/* mermaid */")
    assert h.count("<script") == 3 and "<img src=x" not in h and "alert(2)</script>" not in h
    m = re.search(r'<script type="application/json" id="dados">(.*?)</script>', h, re.S)
    d = json.loads(m.group(1))
    assert d["dados"]["art_relato"]["nome"] == "</script><img src=x onerror=alert(1)>"


def test_html_nao_usa_innerhtml_para_os_dados():
    from guia_decisao.html_gen import _JS

    assert "innerHTML" not in _JS and "insertAdjacentHTML" not in _JS and "document.write" not in _JS


# ----------------------------------------------------------------- legenda


def test_legenda_html_tem_st_e_o_padrao_de_id_da_subtarefa(dados):
    leg = legenda_html(dados)
    assert "<b>st</b>: subtarefa" in leg
    assert "&lt;raia&gt;_&lt;s|t|g|c|e&gt;&lt;n&gt;" in leg and "&lt;nó&gt;_st&lt;n&gt;" in leg
    assert "Raias" not in leg and 'class="chip"' not in leg  # nada de lista de raias
    assert leg.count("<summary>Legenda</summary>") == 1


# ---------------------------------------------------------------- Catálogo


def test_aba_catalogo_existe_sempre_que_ha_nos(dados):
    bug = next(d for d in dados["demandas"] if d["id"] == "bug")
    assert [v["id"] for v in bug["visoes"]][-2:] == ["completo", "catalogo"]
    assert next(v for v in bug["visoes"] if v["id"] == "catalogo")["titulo"] == "Catálogo"
    base = montar_dados(load_yaml(BASE))
    for d in base["demandas"]:  # sem artefatos nem variáveis, a aba lista os nós e as subtarefas
        assert d["visoes"][-1]["id"] == "catalogo" and d["catalogo"]
        assert all(li["categoria"] not in ("artefato", "variavel") for li in d["catalogo"])
    assert base["dados"] == {}


def test_linhas_de_artefatos_e_variaveis_com_lacunas(dados):
    bug = next(d for d in dados["demandas"] if d["id"] == "bug")
    linhas = {li["id"]: li for li in bug["catalogo"] if li["categoria"] in ("artefato", "variavel")}
    assert set(linhas) == {"art_alerta", "art_causa", "art_patch", "art_politica", "art_relato", "art_repro",
                           "reproduzido", "severidade", "tentativas"}
    assert linhas["art_alerta"]["lacunas"] == ["consumidor"]
    assert linhas["art_politica"]["lacunas"] == ["produtor"]
    assert linhas["art_repro"]["lacunas"] == []
    assert linhas["art_causa"]["categoria"] == "artefato" and linhas["severidade"]["categoria"] == "variavel"
    assert all(li["raia"] == "" for li in linhas.values())  # artefatos e variáveis são globais


def test_produtores_e_consumidores_ficam_no_catalogo_de_dados(dados):
    d = dados["dados"]
    prod = d["art_repro"]["produzido_por"]
    assert [r["id"] for r in prod] == ["bug_diag_t1", "bug_diag_t1_st2"]
    assert prod[1]["sub"] is True and prod[1]["tipo"] == "subtarefa" and prod[1]["aba"] == "raia:bug_diag"
    assert prod[0]["sub"] is False and prod[0]["demanda"] == "bug"
    cons = {r["id"]: r for r in d["art_relato"]["consumido_por"]}
    assert cons["bug_diag"]["tipo"] == "raia" and cons["bug_diag"]["aba"] == "raia:bug_diag"  # a raia consome o que recebe
    assert cons["bug_orq"]["aba"] == "visao"  # raia orquestradora fica na aba Visão
    assert d["art_orfao"]["lacunas"] == ["produtor", "consumidor"] and d["art_orfao"]["demandas"] == []


def test_demanda_do_incidente_so_mostra_os_dados_que_usa(dados):
    inc = next(d for d in dados["demandas"] if d["id"] == "incidente")
    assert [li["id"] for li in inc["catalogo"] if li["categoria"] in ("artefato", "variavel")] == [
        "art_postmortem", "mitigado", "severidade"]
    assert inc["visoes"][-1]["id"] == "catalogo"


def test_html_tem_alternador_e_catalogo_no_template(doc):
    h = gerar_html(doc, mermaid_js="/* mermaid */")
    assert 'id="alt-sub"' in h and "Subtarefas: ocultas" in h and "Ir para a subtarefa" in h
    assert "Ir para a tarefa: " in h and "filtro-catalogo" in h and "so-lacunas" not in h and "Ver no diagrama" in h


def test_html_do_yaml_real_tem_catalogo_em_toda_demanda():
    real = load_yaml(GUIA_DIR)
    d = montar_dados(real)
    assert all(dem["visoes"][-1]["id"] == "catalogo" for dem in d["demandas"])
    assert all(v["mmd_sub"] == "" for dem in d["demandas"] for v in dem["visoes"]) or any(
        n.get("subtarefas") for n in real["decisoes"]
    )


# -------------------------------------------------------------- integração


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


@pytest.fixture(scope="module")
def navegador(tmp_path_factory: pytest.TempPathFactory) -> dict[str, Any]:
    """Roda o roteiro CDP uma vez e devolve o resultado (JSON)."""
    tmp = tmp_path_factory.mktemp("sub")
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


marca_chrome = [
    pytest.mark.integration,
    pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado"),
    pytest.mark.skipif(shutil.which("node") is None, reason="node não encontrado"),
]


def _integracao(f):
    for m in reversed(marca_chrome):
        f = m(f)
    return f


@_integracao
def test_chrome_modal_da_tarefa(navegador):
    m = navegador["modal_tarefa"]
    assert m["titulo"] == "bug_diag_t1"
    assert "Relato do bug" in m["chips"][0] and "art_relato" in m["monoespacados"]
    assert any("Texto do relato com data" in t for t in m["chips_title"])  # descrição no tooltip
    classes = {s["classe"].split()[1] for s in m["selos"]}
    assert classes == {"obrigatoria", "recomendada", "opcional", "condicional"}
    assert "quando severidade em [sev1, sev2]" in m["quando"]
    assert "Porque: Bug grave pede segunda opinião." in m["porque"]
    assert [s["id"] for s in m["subtarefas"]] == ["bug_diag_t1_st1", "bug_diag_t1_st2", "bug_diag_t1_st3"]
    assert [s["resp"] for s in m["subtarefas"]] == [["🤖 agente"], ["🤝 ambos"], ["👤 pessoa"]]
    assert all("Ir para a subtarefa" in s["botoes"] for s in m["subtarefas"])
    assert "Reproduza o defeito com os passos do relato." in m["texto"]  # o playbook continua


@_integracao
def test_chrome_indicador_no_modo_oculto(navegador):
    assert "▸ 3 subtarefas" in navegador["indicador"]
    assert navegador["oculto"]["alternador_texto"] == "Subtarefas: ocultas" and navegador["oculto"]["nos_st"] == 0


@_integracao
def test_chrome_ir_para_a_subtarefa_expande_rola_e_destaca_por_2s(navegador):
    r = navegador["apos_ir_subtarefa"]
    assert r["expandido"] and r["nos_st"] == 3 and r["destaque"] == "bug_diag_t1_st2" and r["destaque_visivel"]
    assert not r["modal_aberto"] or r["titulo_modal"]  # o modal fechou (o título é do modal anterior)
    assert navegador["destaque_depois_de_2s"] == 0


@_integracao
def test_chrome_modal_da_subtarefa_e_navegacao(navegador):
    m = navegador["modal_sub"]
    assert m["titulo"] == "bug_diag_t1_st2"
    assert m["botoes"] == ["Ir para a tarefa: Reproduzir o defeito", "Anterior", "Próxima"]
    assert {s["classe"].split()[1] for s in m["selos"]} == {"opcional", "condicional"}
    assert "quando severidade = sev1 ou tentativas > 2" in m["quando"]
    assert navegador["modal_st3"]["botoes"] == ["Ir para a tarefa: Reproduzir o defeito", "Anterior"]
    assert navegador["modal_st1"]["botoes"] == ["Ir para a tarefa: Reproduzir o defeito", "Próxima"]
    t = navegador["apos_ir_tarefa"]
    assert t["destaque"] == "bug_diag_t1" and t["destaque_visivel"] and t["expandido"]


@_integracao
def test_chrome_voltar_percorre_as_navegacoes(navegador):
    assert navegador["voltar_1"]["destaque"] == "bug_diag_t1_st2" and navegador["voltar_1"]["expandido"]
    assert not navegador["voltar_2"]["expandido"] and navegador["voltar_2"]["aba"] == "raia:bug_diag"


@_integracao
def test_chrome_alternador_por_aba(navegador):
    assert navegador["expandido"]["nos_st"] == 3 and navegador["expandido"]["clusters"] == 2
    assert navegador["recolhido"]["nos_st"] == 0 and navegador["recolhido"]["clusters"] == 1
    assert navegador["outra_aba"]["alternador_texto"] == "Subtarefas: ocultas"
    assert navegador["estado_inicial"]["alternador_visivel"]  # a Visão tem tarefa com subtarefas


@_integracao
def test_chrome_zero_sobreposicoes_nos_dois_modos(navegador):
    medidas = navegador["sobreposicao"]
    assert {m["sub"] for m in medidas} == {False, True}
    assert len(medidas) >= 10 and all(m["clusters"] > 0 for m in medidas)
    assert [(m["visao"], m["sub"], m["sobreposicoes"]) for m in medidas if m["sobreposicoes"]] == []
    assert any(m["sub"] and m["clusters"] > 1 for m in medidas)  # há subgraph aninhado medido


@_integracao
def test_gera_previa_da_fixture():
    SAIDA.mkdir(exist_ok=True)
    destino = SAIDA / "exemplo_subtarefas.html"
    destino.write_text(gerar_html(load_yaml(FIXTURE)), encoding="utf-8")
    assert destino.stat().st_size > 100000 and html_lib.escape("x") == "x"
