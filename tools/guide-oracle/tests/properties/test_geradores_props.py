"""Propriedades dos geradores (Mermaid e HTML) sobre documentos de raias gerados.

As strategies da frente A (`valid_docs`) ainda não produzem raias; por isso este
módulo traz sua própria estratégia de documentos conformes ao contrato de raias,
com textos hostis (aspas, `<`, `&`, `#`, travessões).
"""

from __future__ import annotations

import json
import re
from typing import Any

from hypothesis import given, settings
from hypothesis import strategies as st

from guia_decisao.html_gen import gerar_html
from guia_decisao.mermaid_gen import cor_texto, gerar_diagrama, gerar_todos, sanitizar_id

TRAVESSOES = "\u2012\u2013\u2014\u2015\u2212"
_textos = st.text(
    alphabet=st.sampled_from(list('abcXYZ 019"<>&#`%\\[](){}|;:,.!?\u2014\u2013-_éç')), min_size=0, max_size=25
).filter(lambda s: "..." not in s)
_cores = st.from_regex(r"#[0-9A-Fa-f]{6}", fullmatch=True)


@st.composite
def docs_raias(draw: st.DrawFn) -> dict[str, Any]:
    n = draw(st.integers(min_value=2, max_value=4))
    raias, decisoes = [], []
    for i in range(n):
        rid = f"r{i}"
        raias.append(
            {
                "id": rid, "nome": draw(_textos) or "r", "demanda": "d1", "responsabilidade": draw(_textos),
                "cor": draw(_cores), "orquestradora": i == 0, "status": "rascunho", "publico": False,
            }
        )
    for i in range(1, n):
        r = f"r{i}"
        decisoes += [
            {"id": f"{r}_s1", "raia": r, "tipo": "inicio", "rotulo": draw(_textos), "condicao": "",
             "proximo": [{"para": f"{r}_t1", "condicao": ""}], "estado": {}},
            {"id": f"{r}_t1", "raia": r, "tipo": "tarefa", "rotulo": draw(_textos), "condicao": "",
             "proximo": [{"para": f"{r}_e1", "condicao": ""}], "estado": {}},
            {"id": f"{r}_e1", "raia": r, "tipo": "fim", "retorno": "ok", "rotulo": draw(_textos), "condicao": "",
             "proximo": [], "estado": {}},
        ]
    destinos = [f"r0_c{i}" for i in range(1, n)] + ["r0_e1"]
    decisoes.append(
        {"id": "r0_s1", "raia": "r0", "tipo": "inicio", "rotulo": draw(_textos), "condicao": "",
         "proximo": [{"para": destinos[0], "condicao": ""}], "estado": {}}
    )
    for i in range(1, n):
        decisoes.append(
            {"id": f"r0_c{i}", "raia": "r0", "tipo": "chamada", "raia_chamada": f"r{i}", "rotulo": draw(_textos),
             "condicao": "", "proximo": [{"para": destinos[i], "condicao": "ok"}], "estado": {}}
        )
    decisoes.append(
        {"id": "r0_e1", "raia": "r0", "tipo": "fim", "retorno": "pronto", "rotulo": draw(_textos), "condicao": "",
         "proximo": [], "estado": {}}
    )
    return {
        "versao": 1,
        "demandas": [{"id": "d1", "nome": draw(_textos) or "d", "sigla": "d1", "publico": False}],
        "raias": raias,
        "decisoes": decisoes,
        "playbooks": [],
    }


@settings(max_examples=60, deadline=None)
@given(docs_raias())
def test_estrutura_do_diagrama(doc):
    for nome, diag in gerar_todos(doc).items():
        t = diag.texto
        linhas = t.splitlines()
        assert linhas[0] == "flowchart LR"
        assert 'subgraph z_LEG["Legenda"]' in t
        subs = [i for i, ln in enumerate(linhas) if ln.strip().startswith("subgraph ")]
        assert all(linhas[i + 1].strip() == "direction LR" for i in subs)
        assert len(subs) == len([ln for ln in linhas if ln.strip() == "end"])
        if nome.endswith(".completo.mmd"):
            assert len(subs) == 1 + len(doc["raias"])
        assert not any(c in t for c in TRAVESSOES)
        assert "…" not in t and "..." not in t
        # todo nó da visão aparece com o id sanitizado
        for sid in diag.mapa_ids:
            assert re.search(rf"^\s*{re.escape(sid)}[\[\(\{{]", t, re.M)


@settings(max_examples=60, deadline=None)
@given(docs_raias())
def test_rotulos_nao_quebram_a_sintaxe(doc):
    t = gerar_diagrama(doc, "d1", "completo").texto
    pedacos = [p for ln in t.splitlines() for p in ln.split(" ~~~ ")]
    for ln in pedacos:
        if re.match(r'^\s*\w+(\(\[|\[\[|\[|\{)"', ln):
            interno = ln.strip().split('"', 1)[1].rsplit('"', 1)[0]
            assert '"' not in interno and "<script" not in interno
            assert not re.search(r"<(?!/?(b|i|small|br/?)>)", interno)


@settings(max_examples=40, deadline=None)
@given(docs_raias())
def test_cor_da_chamada_e_da_raia_chamada(doc):
    t = gerar_diagrama(doc, "d1", "visao").texto
    cores = {r["id"]: r["cor"].upper() for r in doc["raias"]}
    for d in doc["decisoes"]:
        if d["tipo"] != "chamada":
            continue
        classe = next(m.group(2) for m in re.finditer(r"^\s*class ([\w,]+) (\w+)$", t, re.M) if d["id"] in m.group(1).split(","))
        definicao = re.search(rf"^\s*classDef {classe} (.+)$", t, re.M).group(1)
        atrs = dict(p.split(":", 1) for p in definicao.split(","))
        assert atrs["fill"] == cores[d["raia_chamada"]]
        assert atrs["stroke"] == cores[d["raia"]]
        assert atrs["color"] == cor_texto(atrs["fill"])


@settings(max_examples=40, deadline=None)
@given(docs_raias())
def test_determinismo(doc):
    a = {k: v.texto for k, v in gerar_todos(doc).items()}
    inv = dict(doc, decisoes=list(reversed(doc["decisoes"])), raias=list(reversed(doc["raias"])))
    assert {k: v.texto for k, v in gerar_todos(inv).items()} == a


@settings(max_examples=20, deadline=None)
@given(docs_raias())
def test_html_com_todos_os_ids_e_sem_rede(doc):
    html = gerar_html(doc, mermaid_js="/*stub*/")
    for i in [x["id"] for k in ("demandas", "raias", "decisoes") for x in doc[k]]:
        assert i in html
    assert not re.search(r"https?://|<script[^>]+src|@import|fetch\(|XMLHttpRequest|innerHTML", html)
    assert not any(c in html for c in TRAVESSOES)


@settings(max_examples=30, deadline=None)
@given(docs_raias())
def test_html_legenda_unica_cor_e_navegacao(doc):
    html = gerar_html(doc, mermaid_js="/*stub*/")
    dados = json.loads(re.search(r'id="dados">(.*?)</script>', html, re.S).group(1))
    assert html.count('id="legenda"') == 1 and 'role="dialog"' in html and "<aside" not in html
    assert 'id="painel"' not in html
    legenda = re.search(r'<details id="legenda".*?</details>', html, re.S).group(0)
    # a legenda não lista raias (sem chips) e traz o prefixo de cada demanda
    assert 'class="chip"' not in legenda
    for d in doc["demandas"]:
        assert f"<code>{d['sigla']}</code>" in legenda
    # diagramas embutidos sem legenda própria
    for dem in dados["demandas"]:
        assert all("z_LEG" not in v["mmd"] for v in dem["visoes"])
        nav = dem["navegacao"]
        for cid, info in nav["chamadas"].items():
            assert dados["nos"][cid]["raia_chamada"] == info["raia_chamada"]
            assert info["inicio"] == f"{info['raia_chamada']}_s1"
            assert cid in nav["chamadores"][info["raia_chamada"]]
        for chamadores in nav["chamadores"].values():
            assert all(dados["nos"][c]["tipo"] == "chamada" for c in chamadores)


@settings(max_examples=300, deadline=None)
@given(st.lists(st.text(max_size=12), min_size=2, max_size=8, unique=True))
def test_sanitizar_id_injetivo(ids):
    saidas = [sanitizar_id(i) for i in ids]
    assert len(set(saidas)) == len(ids)
    assert all(re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", s) for s in saidas if ids)


# ----------------------------------------------- documentos válidos da frente A

from tests.properties.strategies import valid_docs  # noqa: E402


@settings(max_examples=40, deadline=None)
@given(valid_docs())
def test_documentos_validos_geram_diagramas_e_html(doc):
    diagramas = gerar_todos(doc)
    assert diagramas  # ao menos uma demanda com raias
    assert gerar_todos(doc).keys() == diagramas.keys()
    for d in diagramas.values():
        assert d.texto.startswith("flowchart LR\n") and not any(c in d.texto for c in TRAVESSOES)
    html = gerar_html(doc, mermaid_js="/*stub*/")
    ids = {str(x["id"]) for v in doc.values() if isinstance(v, list) for x in v if isinstance(x, dict) and "id" in x}
    assert all(i in html for i in ids)
