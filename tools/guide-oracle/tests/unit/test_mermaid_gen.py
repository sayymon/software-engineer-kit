"""Testes do gerador Mermaid (padrão de raias) com a fixture mínima escrita à mão."""

from __future__ import annotations

import copy
import json
import random
import re
from pathlib import Path

import pytest

from guia_decisao.loader import load_yaml
from guia_decisao.mermaid_gen import (
    GeracaoError,
    cor_texto,
    escapar_rotulo,
    gerar_diagrama,
    gerar_todos,
    nome_arquivo,
    quebrar_rotulo,
    sanitizar_id,
    visoes_da_demanda,
)
from guia_decisao.validator import validate
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "raias_minimo.yaml"
SCHEMA = GUIA_SCHEMA
TRAVESSOES = "\u2012\u2013\u2014\u2015\u2212"


@pytest.fixture(scope="module")
def doc() -> dict:
    return load_yaml(FIXTURE)


def _classdef(texto: str, nome: str) -> dict[str, str]:
    m = re.search(rf"^\s*classDef {re.escape(nome)} (.+)$", texto, re.M)
    assert m, nome
    return dict(p.split(":", 1) for p in m.group(1).split(","))


def _classe_do_no(texto: str, no: str) -> str:
    for m in re.finditer(r"^\s*class ([\w,]+) (\w+)$", texto, re.M):
        if no in m.group(1).split(","):
            return m.group(2)
    raise AssertionError(no)


def test_fixture_valida_no_schema(doc):
    assert validate(doc, json.loads(SCHEMA.read_text(encoding="utf-8"))) == []


@pytest.mark.parametrize("visao", ["visao", "completo", "raia:bug_diag"])
def test_orientacao_horizontal(doc, visao):
    linhas = gerar_diagrama(doc, "bug", visao).texto.splitlines()
    assert linhas[0] == "flowchart LR"
    for i, ln in enumerate(linhas):
        if ln.strip().startswith("subgraph "):
            assert linhas[i + 1].strip() == "direction LR"


@pytest.mark.parametrize("visao", ["visao", "completo", "raia:bug_corr"])
def test_legenda_enxuta_no_mmd_standalone(doc, visao):
    t = gerar_diagrama(doc, "bug", visao).texto
    assert t.count('subgraph z_LEG["Legenda"]') == 1
    for trecho in ("<b>s</b>: início", "<b>t</b>: tarefa", "<b>g</b>: gateway", "<b>c</b>: chamada", "<b>e</b>: fim"):
        assert trecho in t
    # formas: estádio, retângulo, losango, subrotina
    assert 'z_LEG_s(["' in t and 'z_LEG_t["' in t and 'z_LEG_g{"' in t and 'z_LEG_c[["' in t
    # sem prefixo de demanda nem lista de responsabilidades na legenda
    legenda = re.search(r'subgraph z_LEG.*?\n  end\n', t, re.S).group(0)
    assert "prefixo" not in legenda and "Reproduzir o defeito" not in legenda


def _chips_da_legenda(texto: str) -> list[str]:
    legenda = re.search(r'subgraph z_LEG.*?\n  end\n', texto, re.S).group(0)
    return re.findall(r'z_LEG_r\d\["<b>(.+?)</b>', legenda)


def test_completo_nao_repete_raias_na_legenda(doc):
    # as raias já aparecem como subgraphs coloridos
    assert _chips_da_legenda(gerar_diagrama(doc, "bug", "completo").texto) == []


def test_visao_lista_raias_chamadas_uma_vez_com_cor(doc):
    t = gerar_diagrama(doc, "bug", "visao").texto
    chips = _chips_da_legenda(t)
    assert sorted(chips) == ["Correção", "Diagnóstico"] and len(chips) == len(set(chips))
    # o chip usa a classe de cor da raia
    for i, nome in enumerate(_chips_da_legenda(t)):
        classe = re.search(rf"class z_LEG_r{i} (z_R_\d+)", t).group(1)
        cor = {"Correção": "#2B2B2B", "Diagnóstico": "#F2C14E"}[nome]
        assert f"classDef {classe} fill:{cor}" in t
    # a raia da visão não é repetida (já é subgraph)
    assert "Orquestração do bug" not in chips


def test_raia_sem_chamadas_nao_tem_chips(doc):
    assert _chips_da_legenda(gerar_diagrama(doc, "bug", "raia:bug_corr").texto) == []


@pytest.mark.parametrize("visao", ["visao", "completo", "raia:bug_corr"])
def test_sem_legenda_para_o_html(doc, visao):
    t = gerar_diagrama(doc, "bug", visao, legenda=False).texto
    assert "z_LEG" not in t and "Legenda" not in t and t.startswith("flowchart LR\n")
    assert all("z_LEG" not in d.texto for d in gerar_todos(doc, legenda=False).values())
    # a cor das raias continua nos subgraphs
    assert "stroke-width:3px" in t


def test_uma_subgraph_por_raia(doc):
    t = gerar_diagrama(doc, "bug", "completo").texto
    titulos = re.findall(r'^\s*subgraph z_SG_\w+\["(.+)"\]$', t, re.M)
    assert len(titulos) == 3
    # o título leva só o NOME da raia: a responsabilidade vai para o tooltip, o modal e a legenda do HTML
    for nome, resp in (
        ("Orquestração do bug", "Conduzir o bug"),
        ("Diagnóstico", "Reproduzir o defeito"),
        ("Correção", "Corrigir e verificar"),
    ):
        assert any(nome in x for x in titulos)
        assert not any(resp in x for x in titulos)
    assert not any("<br/>" in x for x in titulos)
    assert len(re.findall(r"^\s*subgraph z_SG_", gerar_diagrama(doc, "bug", "visao").texto, re.M)) == 1
    assert len(re.findall(r"^\s*subgraph z_SG_", gerar_diagrama(doc, "bug", "raia:bug_diag").texto, re.M)) == 1
    assert len(re.findall(r"^\s*end$", t, re.M)) == 4  # legenda + 3 raias
    assert len(re.findall(r"^\s*end$", gerar_diagrama(doc, "bug", "completo", legenda=False).texto, re.M)) == 3


def test_borda_e_fundo_da_raia(doc):
    t = gerar_diagrama(doc, "bug", "completo").texto
    m = re.search(r"^\s*style z_SG_bug_diag (.+)$", t, re.M)
    assert m and "stroke:#F2C14E" in m.group(1) and "fill:#FDF6E4" in m.group(1)  # 85% de branco sobre a cor


def test_cor_de_interseccao_da_chamada(doc):
    t = gerar_diagrama(doc, "bug", "visao").texto
    cd = _classdef(t, _classe_do_no(t, "bug_orq_c1"))
    assert cd["fill"] == "#F2C14E"  # cor da raia chamada (diagnóstico)
    assert cd["stroke"] == "#4F81BD"  # borda na cor da raia chamadora
    assert cd["stroke-width"] == "4px"
    cd2 = _classdef(t, _classe_do_no(t, "bug_orq_c2"))
    assert cd2["fill"] == "#2B2B2B" and cd2["color"] == "#FFFFFF"
    # nó comum usa a cor da própria raia
    assert _classdef(t, _classe_do_no(t, "bug_orq_t1"))["fill"] == "#4F81BD"
    # o nó de chamada mostra só o rótulo e o id: o "chama: <raia>" repetia o rótulo da tarefa
    assert "chama:" not in t


def test_saidas_da_chamada_rotuladas_com_retorno(doc):
    t = gerar_diagrama(doc, "bug", "visao").texto
    assert 'bug_orq_c1 -->|"causa encontrada"| bug_orq_c2' in t
    assert 'bug_orq_c1 -->|"não reproduzível"| bug_orq_e2' in t
    assert 'bug_orq_g1 -->|"sim"| bug_orq_t1' in t  # gateway rotulado com a condição


def test_visao_so_tem_a_orquestradora(doc):
    t = gerar_diagrama(doc, "bug", "visao").texto
    assert "bug_diag_t1" not in t and "bug_corr_t1" not in t and "bug_orq_s1" in t


def test_visao_de_raia_mostra_retornos_dos_fins(doc):
    t = gerar_diagrama(doc, "bug", "raia:bug_diag").texto
    assert "retorno: causa encontrada" in t and "retorno: não reproduzível" in t
    assert "bug_orq_s1" not in t


def test_completo_tem_chamadas_e_retornos_tracejados(doc):
    t = gerar_diagrama(doc, "bug", "completo").texto
    assert 'bug_orq_c1 -.->|"chama"| bug_diag_s1' in t
    assert 'bug_diag_e1 -.->|"retorno: causa encontrada"| bug_orq_c2' in t
    assert 'bug_diag_e2 -.->|"retorno: não reproduzível"| bug_orq_e2' in t
    assert 'bug_corr_e1 -.->|"retorno: corrigido"| bug_orq_g1' in t
    assert 'bug_orq_c1 -->|' not in t  # substituídas pelas tracejadas


def test_ligacao_entre_demandas_vira_ponte(doc):
    for visao in ("visao", "completo"):
        t = gerar_diagrama(doc, "bug", visao).texto
        assert "z_LIG_bug_orq_g1_0" in t and "demanda: Incidente" in t and "nó: inc_orq_s1" in t
        assert 'bug_orq_g1 -.->|"aciona"| z_LIG_bug_orq_g1_0' in t
        assert "class z_LIG_bug_orq_g1_0 ponte" in t
    assert "z_LIG_" not in gerar_diagrama(doc, "bug", "raia:bug_orq").texto


def test_determinismo_independe_da_ordem_de_entrada(doc):
    base = gerar_todos(doc)
    for semente in range(5):
        outro = copy.deepcopy(doc)
        rnd = random.Random(semente)
        for col in ("decisoes", "raias", "demandas"):
            rnd.shuffle(outro[col])
        # A ordem do campo `proximo` é do autor (define a ordem das arestas de cada nó): fica como está.
        assert {k: v.texto for k, v in gerar_todos(outro).items()} == {k: v.texto for k, v in base.items()}


def test_embaralhar_proximo_muda_so_a_ordem_das_arestas(doc):
    base = gerar_todos(doc)
    outro = copy.deepcopy(doc)
    rnd = random.Random(7)
    for d in outro["decisoes"]:
        rnd.shuffle(d["proximo"])
    for k, v in gerar_todos(outro).items():
        assert sorted(v.texto.splitlines()) == sorted(base[k].texto.splitlines())


def test_nomes_de_arquivo(doc):
    assert sorted(gerar_todos(doc)) == [
        "bug.bug_corr.mmd",
        "bug.bug_diag.mmd",
        "bug.bug_orq.mmd",
        "bug.completo.mmd",
        "bug.visao.mmd",
        "incidente.completo.mmd",
        "incidente.inc_orq.mmd",
        "incidente.visao.mmd",
    ]
    assert nome_arquivo("bug", "visao") == "bug.visao.mmd"
    assert nome_arquivo("bug", "raia:bug_orq") == "bug.bug_orq.mmd"
    assert visoes_da_demanda(doc, "incidente") == ["visao", "raia:inc_orq", "completo"]
    with pytest.raises(GeracaoError):
        nome_arquivo("../x", "visao")


def test_escape_de_caracteres_perigosos(doc):
    hostil = copy.deepcopy(doc)
    no = next(d for d in hostil["decisoes"] if d["id"] == "bug_orq_t1")
    no["rotulo"] = 'Rótulo "perigoso" <script>alert(1)</script> & [x] {y} (z) `k` %% #fim'
    t = gerar_diagrama(hostil, "bug", "visao").texto
    linha = next(ln for ln in t.splitlines() if ln.strip().startswith("bug_orq_t1["))
    corpo = linha.strip()[len('bug_orq_t1["'):-2]
    assert '"' not in corpo and "<script" not in corpo and "`" not in corpo and "%" not in corpo
    for esc in ("#quot;", "#lt;", "#gt;", "#amp;", "#96;", "#37;", "#35;fim"):
        assert esc in corpo
    assert "Rótulo" in corpo and "perigoso" in corpo


def test_escapar_rotulo_nao_trunca():
    longo = "palavra " * 200
    assert escapar_rotulo(longo).strip() == longo.strip() and "..." not in escapar_rotulo(longo) and "…" not in escapar_rotulo(longo)


def test_sem_travessoes_na_saida(doc):
    sujo = copy.deepcopy(doc)
    sujo["decisoes"][0]["rotulo"] = "um \u2014 dois \u2013 3\u20135"
    sujo["raias"][0]["responsabilidade"] = "conduzir \u2014 fechar"
    for d in gerar_todos(sujo).values():
        assert not any(c in d.texto for c in TRAVESSOES)
    assert "um, dois, 3-5" in gerar_diagrama(sujo, "bug", "completo").texto


def test_sanitizar_id_injetivo_e_valido():
    amostra = ["a", "a_b", "x_a", "z_a", "x_x_5f_a", "end", "End", "a-b", "a b", "1a", "a.b", "é", "raia:a", "_", ""]
    saidas = [sanitizar_id(i) for i in amostra]
    assert len(set(saidas)) == len(amostra)
    assert all(re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", s) for s in saidas if s)
    assert sanitizar_id("bug_orq_s1") == "bug_orq_s1"
    assert sanitizar_id("end") != "end"


@pytest.mark.parametrize(
    "fundo,esperado",
    [("#000000", "#FFFFFF"), ("#FFFFFF", "#000000"), ("#F2C14E", "#000000"), ("#2B2B2B", "#FFFFFF"), ("#C0504D", "#FFFFFF")],
)
def test_texto_conforme_luminancia(fundo, esperado):
    assert cor_texto(fundo) == esperado


def test_erros_claros(doc):
    sem = copy.deepcopy(doc)
    del sem["raias"]
    with pytest.raises(GeracaoError, match="raias"):
        gerar_diagrama(sem, "bug", "visao")
    with pytest.raises(GeracaoError):
        gerar_diagrama(doc, "inexistente", "visao")
    with pytest.raises(GeracaoError):
        gerar_diagrama(doc, "bug", "raia:nao_existe")
    with pytest.raises(GeracaoError):
        gerar_diagrama(doc, "bug", "outra")
    quebrado = copy.deepcopy(doc)
    next(d for d in quebrado["decisoes"] if d["id"] == "bug_orq_c1")["raia_chamada"] = "nada"
    with pytest.raises(GeracaoError):
        gerar_diagrama(quebrado, "bug", "visao")


# ----------------------------------------------------- rótulo do gateway


def test_quebrar_rotulo_respeita_limite_e_palavras():
    texto = "Afetado por janela crítica ou sazonalidade do negócio no período?"
    linhas = quebrar_rotulo(texto)
    assert all(len(x) <= 22 for x in linhas), linhas
    assert " ".join(linhas) == texto  # nenhuma palavra cortada ou perdida
    assert len(linhas) > 1


def test_quebrar_rotulo_palavra_longa_fica_inteira():
    assert quebrar_rotulo("Supercalifragilisticoespialidoso ok") == ["Supercalifragilisticoespialidoso", "ok"]


def test_quebrar_rotulo_deterministico_e_sem_travessoes():
    texto = "Severidade \u2014 é SEV3 \u2013 ou menor?"
    a, b = quebrar_rotulo(texto), quebrar_rotulo(texto)
    assert a == b
    assert not any(c in "".join(a) for c in TRAVESSOES)
    assert quebrar_rotulo("") == [""]


def test_gateway_no_diagrama_quebra_em_linhas_curtas_e_preserva_escape(doc):
    d = copy.deepcopy(doc)
    alvo = next(n for n in d["decisoes"] if n["tipo"] == "bifurcacao")
    alvo["rotulo"] = 'Cobertura "mínima" #1 acima de 80% e <estável> no ambiente de produção?'
    demanda = next(r["demanda"] for r in d["raias"] if r["id"] == alvo["raia"])
    t = gerar_diagrama(d, demanda, "completo").texto
    linha = next(x for x in t.splitlines() if x.strip().startswith(alvo["id"] + '{"'))
    interno = linha.split('{"', 1)[1].rsplit('"}', 1)[0]
    partes = interno.split("<br/>")
    assert partes[0] == f"<small><b>{alvo['id']}</b></small>"
    esperado = [escapar_rotulo(x) for x in quebrar_rotulo(alvo["rotulo"])]
    assert partes[1:] == esperado and len(esperado) >= 3
    for cru in quebrar_rotulo(alvo["rotulo"]):
        assert len(cru) <= 22, cru
    for entidade in ("#quot;", "#35;", "#lt;", "#gt;", "#37;"):
        assert entidade in interno, entidade  # o escape existente continua valendo
    assert '"' not in interno and "<" not in interno.replace("<br/>", "").replace("<small>", "").replace("</small>", "").replace("<b>", "").replace("</b>", "")


def test_gateway_recebe_classe_de_fonte_menor_sem_mudar_cores(doc):
    t = gerar_diagrama(doc, "bug", "completo").texto
    assert _classdef(t, "gw") == {"font-size": "11px"}
    gws = [n["id"] for n in doc["decisoes"] if n["tipo"] == "bifurcacao" and n["raia"] in ("bug_diag", "bug_orq", "bug_cor", "bug_ent", "bug_pre")]
    for g in gws:
        assert _classe_do_no(t, g).startswith("z_R_")  # a cor continua a da raia
