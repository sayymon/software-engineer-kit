"""Testes da prévia HTML offline e dos subcomandos `gerar` e `previa`."""

from __future__ import annotations

import copy
import hashlib
import html as html_lib
import json
import re
import shutil
from pathlib import Path

import pytest

from guia_decisao import cli
from guia_decisao.html_gen import CAMINHO_MERMAID, gerar_html, json_seguro, montar_dados
from guia_decisao.loader import load_yaml
from guia_decisao.mermaid_gen import GeracaoError
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA, MERMAID_README

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "raias_minimo.yaml"
SCHEMA = GUIA_SCHEMA
STUB = "/* mermaid de teste */ window.mermaid = {};"
TRAVESSOES = "\u2012\u2013\u2014\u2015\u2212"


@pytest.fixture(scope="module")
def doc() -> dict:
    return load_yaml(FIXTURE)


@pytest.fixture(scope="module")
def html(doc) -> str:
    return gerar_html(doc, mermaid_js=STUB)


def _todos_ids(doc: dict) -> set[str]:
    return {str(x["id"]) for v in doc.values() if isinstance(v, list) for x in v if isinstance(x, dict) and "id" in x}


def test_sem_rede_em_runtime(html):
    assert not re.search(r"https?://", html)
    assert not re.search(r"<script[^>]+src\s*=", html, re.I)
    assert not re.search(r"<link\b", html, re.I)
    for proibido in ("@import", "fetch(", "XMLHttpRequest", "WebSocket", "sendBeacon", "url(", "innerHTML", "eval(", "document.write"):
        assert proibido not in html, proibido


def test_todos_os_ids_aparecem(doc, html):
    faltando = {i for i in _todos_ids(doc) if i not in html}
    assert not faltando


def test_json_embutido_e_seguro(doc, html):
    m = re.search(r'<script type="application/json" id="dados">(.*?)</script>', html, re.S)
    assert m
    corpo = m.group(1)
    assert corpo.isascii() and "<" not in corpo and ">" not in corpo and "&" not in corpo
    dados = json.loads(corpo)
    assert [d["id"] for d in dados["demandas"]] == ["bug", "incidente"]
    assert "pb_bug_orq_s1" in dados["playbooks"]


def test_json_seguro_escapa():
    assert json_seguro({"a": "</script><b>&é"}) == '{"a":"\\u003c/script\\u003e\\u003cb\\u003e\\u0026\\u00e9"}'


def test_conteudo_hostil_nao_vira_marcacao(doc):
    hostil = copy.deepcopy(doc)
    hostil["playbooks"][0]["resumo"] = "</script><img src=x onerror=alert(1)>"
    out = gerar_html(hostil, mermaid_js=STUB)
    assert "<img" not in out and out.count("</script>") == 3


def test_playbook_ausente_e_referencias(doc):
    dados = montar_dados(doc)
    assert dados["nos"]["bug_orq_c2"]["playbook"] == ""  # sem playbook: a página mostra a mensagem
    assert any(r["nome"] == "5 porquês" for r in dados["playbooks"]["pb_bug_orq_s1"]["referencias"])
    assert "Playbook ainda não escrito" in gerar_html(doc, mermaid_js=STUB)


def _dados(html: str) -> dict:
    return json.loads(re.search(r'id="dados">(.*?)</script>', html, re.S).group(1))


def _regiao_legenda(html: str) -> str:
    m = re.search(r'<details id="legenda".*?</details>', html, re.S)
    assert m
    return m.group(0)


def test_interface_presente(html):
    for trecho in ('id="demanda"', 'id="abas"', 'id="voltar"', 'id="legenda"', 'id="zmais"', "overflow:auto", "textContent"):
        assert trecho in html
    assert [v["titulo"] for v in _dados(html)["demandas"][0]["visoes"]] == [
        "Visão", "Orquestração do bug", "Diagnóstico", "Correção", "Completo", "Catálogo",  # orquestradora, depois ordem de chamada
    ]


def test_modal_central_e_sem_painel_lateral(html):
    assert 'role="dialog"' in html and 'aria-modal="true"' in html and 'aria-labelledby="m-titulo"' in html
    assert 'id="m-fechar"' in html and "Escape" in html
    assert "<aside" not in html and 'id="painel"' not in html and "#painel" not in html
    assert "monospace" in html  # id do nó em fonte monoespaçada


def test_legenda_unica_sem_lista_de_raias(doc, html):
    assert html.count('id="legenda"') == 1 and html.count("<summary>Legenda</summary>") == 1
    assert re.search(r'<details id="legenda" open>', html)  # colapsável, aberta por padrão
    legenda = _regiao_legenda(html)
    for letra in ("s", "t", "g", "c", "e"):
        assert f"<b>{letra}</b>:" in legenda
    assert "&lt;raia&gt;_&lt;s|t|g|c|e&gt;&lt;n&gt;" in legenda
    blocos = re.findall(r'<div class="leg-dem" data-demanda="(\w+)"[^>]*>(.*?)</div></div>', legenda, re.S)
    assert [b[0] for b in blocos] == ["bug", "incidente"]
    siglas = {d["id"]: d["sigla"] for d in doc["demandas"]}
    for demanda, corpo in blocos:
        assert f"<code>{siglas[demanda]}</code>" in corpo  # prefixo da demanda atual
    # a legenda não lista raias: nem chips, nem nomes, nem responsabilidades
    assert 'class="chip"' not in legenda and 'class="raias"' not in legenda and "Raias" not in legenda
    for r in doc["raias"]:
        assert html_lib.escape(r["nome"]) not in legenda
        assert r["responsabilidade"] not in legenda


def test_diagramas_embutidos_sem_subgraph_de_legenda(html):
    for dem in _dados(html)["demandas"]:
        for v in dem["visoes"]:
            if v["id"] == "catalogo":
                continue  # aba de tabela, sem diagrama
            assert "z_LEG" not in v["mmd"] and 'subgraph z_LEG' not in v["mmd"] and "Legenda" not in v["mmd"]
            assert v["mmd"].startswith("flowchart LR\n")


def test_cor_da_raia_nas_abas_e_no_diagrama(doc, html):
    dados = _dados(html)
    cores = {r["id"]: r["cor"].upper() for r in doc["raias"]}
    for dem in dados["demandas"]:
        for r in dem["raias"]:
            assert r["cor"] == cores[r["id"]] and r["texto_cor"] in ("#000000", "#FFFFFF")
            tab = next(v for v in dem["visoes"] if v["id"] == f"raia:{r['id']}")
            assert tab["titulo"] == r["nome"] and not tab["titulo"].startswith("Raia")  # aba só com o nome
            assert r["responsabilidade"] in tab["dica"]  # tooltip da aba
            assert f"stroke:{r['cor']}" in tab["mmd"]  # borda do subgraph na cor da raia
    # as abas e o título do modal recebem a cor pelo JS
    for trecho in ('setProperty("--cor"', "button[data-raia]", "cab.style.background", "dataset.raia"):
        assert trecho in html


def test_dados_de_navegacao_por_chamada(html):
    dem = next(d for d in _dados(html)["demandas"] if d["id"] == "bug")
    nav = dem["navegacao"]
    assert nav["chamadas"]["bug_orq_c1"] == {"raia_chamada": "bug_diag", "inicio": "bug_diag_s1", "aba": "raia:bug_diag"}
    assert nav["chamadas"]["bug_orq_c2"]["inicio"] == "bug_corr_s1"
    assert nav["chamadores"] == {"bug_diag": ["bug_orq_c1"], "bug_corr": ["bug_orq_c2"]}
    nos = _dados(html)["nos"]
    assert nos["bug_orq_c1"]["aba"] == "visao" and nos["bug_diag_e1"]["aba"] == "raia:bug_diag"
    assert nos["bug_diag_e1"]["tipo"] == "fim" and nos["bug_diag_e1"]["raia"] == "bug_diag"


def test_modal_traz_saidas_e_ligacoes(html):
    nos = _dados(html)["nos"]
    assert [s["para"] for s in nos["bug_orq_c1"]["transicoes"]] == ["bug_orq_c2", "bug_orq_e2"]
    assert nos["bug_orq_c1"]["transicoes"][0]["rotulo_destino"] == "Corrigir o bug"
    lig = nos["bug_orq_g1"]["ligacoes"][0]
    assert lig["demanda_destino"] == "incidente" and lig["para"] == "inc_orq_s1" and lig["demanda_nome"] == "Incidente"
    for texto in ("Ir para a raia: ", "Ir para a demanda: ", "Chamada por:"):
        assert texto in html


def test_playbook_agrupado_do_mais_abstrato_ao_mais_concreto(html):
    cols = [r["colecao"] for p in _dados(html)["playbooks"].values() for r in p["referencias"]]
    ordem = ["abordagens", "tecnicas", "padroes", "estrategias", "categorias_ferramenta"]
    for p in _dados(html)["playbooks"].values():
        idx = [ordem.index(r["colecao"]) for r in p["referencias"]]
        assert idx == sorted(idx)
    assert cols  # a fixture tem referências


def test_sem_travessoes_no_html(html):
    assert not any(c in html for c in TRAVESSOES)


def test_deterministico(doc):
    assert gerar_html(doc, mermaid_js=STUB) == gerar_html(doc, mermaid_js=STUB)


def test_sem_raias_falha_com_mensagem(doc):
    sem = copy.deepcopy(doc)
    del sem["raias"]
    with pytest.raises(GeracaoError, match="raias"):
        gerar_html(sem, mermaid_js=STUB)


def test_mermaid_fixado_confere_com_readme():
    conteudo = CAMINHO_MERMAID.read_bytes()
    readme = MERMAID_README.read_text(encoding="utf-8")
    assert hashlib.sha256(conteudo).hexdigest() in readme
    assert re.search(r"versão (10|11)\.\d+\.\d+", readme)
    html = gerar_html(load_yaml(FIXTURE))
    assert "globalThis[\"mermaid\"]" in html and html.count("</script>") == 3


# ---------------------------------------------------------------------- CLI


@pytest.fixture
def worktree(tmp_path, monkeypatch):
    (tmp_path / ".git").mkdir()
    monkeypatch.chdir(tmp_path)
    yml = tmp_path / "raias.yaml"
    shutil.copy(FIXTURE, yml)
    return tmp_path, yml


def test_cli_gerar_mermaid(worktree, capsys):
    raiz, yml = worktree
    assert cli.main(["gerar", "mermaid", "--yaml", str(yml), "--schema", str(SCHEMA)]) == 0
    saida = raiz / "tools" / "guide-oracle" / "saida"
    assert (saida / "bug.visao.mmd").read_text(encoding="utf-8").startswith("flowchart LR")
    assert len(list(saida.glob("*.mmd"))) == 8


def test_cli_gerar_mermaid_uma_demanda(worktree):
    raiz, yml = worktree
    assert cli.main(["gerar", "mermaid", "--yaml", str(yml), "--schema", str(SCHEMA), "--demanda", "incidente", "--saida", "out"]) == 0
    assert sorted(p.name for p in (raiz / "out").glob("*.mmd")) == [
        "incidente.completo.mmd", "incidente.inc_orq.mmd", "incidente.visao.mmd",
    ]


@pytest.mark.parametrize("comando", [["gerar", "html"], ["previa", "--nao-abrir"]])
def test_cli_html_e_previa(worktree, comando):
    raiz, yml = worktree
    assert cli.main([*comando, "--yaml", str(yml), "--schema", str(SCHEMA)]) == 0
    arq = raiz / "tools" / "guide-oracle" / "saida" / "guia.html"
    assert arq.is_file() and "bug_orq_c1" in arq.read_text(encoding="utf-8")


def test_cli_recusa_documento_invalido(worktree, capsys):
    raiz, yml = worktree
    doc = load_yaml(yml)
    doc["decisoes"][1]["proximo"][0]["para"] = "inexistente"
    yml.write_text(json.dumps(doc, ensure_ascii=False), encoding="utf-8")  # JSON é YAML válido
    assert cli.main(["gerar", "mermaid", "--yaml", str(yml), "--schema", str(SCHEMA)]) == 1
    cap = capsys.readouterr()
    assert "inexistente" in cap.out and "nada foi gerado" in cap.err
    assert not (raiz / "tools").exists()
    assert cli.main(["previa", "--nao-abrir", "--yaml", str(yml), "--schema", str(SCHEMA)]) == 1


def test_cli_recusa_saida_fora_da_worktree(worktree, tmp_path_factory):
    _, yml = worktree
    fora = tmp_path_factory.mktemp("fora")
    assert cli.main(["gerar", "html", "--yaml", str(yml), "--schema", str(SCHEMA), "--saida", str(fora)]) == 2
    assert not list(fora.iterdir())


def test_cli_yaml_sem_raias(worktree, capsys):
    _, yml = worktree
    doc = load_yaml(yml)
    del doc["raias"]
    yml.write_text(json.dumps(doc), encoding="utf-8")
    # sem raias o validador (schema novo) já recusa; o código é de validação
    assert cli.main(["previa", "--nao-abrir", "--yaml", str(yml), "--schema", str(SCHEMA)]) in (1, 2)


def test_cli_comandos_antigos_seguem_funcionando(worktree, capsys):
    _, yml = worktree
    assert cli.main(["validar", "--yaml", str(yml), "--schema", str(SCHEMA)]) == 0


def test_titulo_de_aba_conflitante_e_desambiguado_pelo_id(doc):
    d = copy.deepcopy(doc)
    alvo = next(r for r in d["raias"] if r["demanda"] == "bug")
    alvo["nome"] = "Completo"
    titulos = [v["titulo"] for v in montar_dados(d)["demandas"][0]["visoes"]]
    assert titulos.count("Completo") == 1 and f"Completo ({alvo['id']})" in titulos
    assert titulos == [v["titulo"] for v in montar_dados(d)["demandas"][0]["visoes"]]  # determinístico


def test_proximos_passos_e_ligacoes_sao_links_no_modal(html):
    """Itens de "Próximos passos" e "Ligações entre demandas" abrem o item no próprio modal, com Voltar do modal."""
    assert 'id="m-voltar"' in html and "hidden" in html.split('id="m-voltar"')[1][:40]
    for trecho in ('listaLinks("Próximos passos"', 'listaLinks("Ligações entre demandas"', "item-link",
                   "function irNoModal", "function voltarNoModal", "pilhaModal = []"):
        assert trecho in html, trecho
    # os destinos dos links existem nos dados embutidos
    dados = _dados(html)
    for no in dados["nos"].values():
        for s in no.get("transicoes", []):
            assert s["para"] in dados["nos"], s["para"]


def test_entradas_saidas_e_tecnicas_abrem_no_modal(html):
    """Chips de entradas e saídas abrem o artefato ou a variável; técnicas abrem o modal da técnica."""
    for trecho in ('el(d ? "button" : "span", "chip-dado "', "irPara(mostrarDado, id)", "function mostrarTecnica",
                   "function linkTecnica", "irPara(mostrarTecnica, id)"):
        assert trecho in html, trecho
    dados = _dados(html)
    assert "tecnicas" in dados
    for tid, tc in dados["tecnicas"].items():
        assert tc["id"] == tid and tc["nome"]
        for r in tc["usada_em"]:
            assert r["id"] in dados["nos"] or r["id"] in dados.get("subtarefas", {}), r["id"]
