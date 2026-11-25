"""Ordem natural e de fluxo (ids, nós, arestas e raias) nos geradores, na prévia e no layout (integração)."""

from __future__ import annotations

import copy
import json
import random
import re
import shutil
import socket
import subprocess
from pathlib import Path
from typing import Any

import pytest
from hypothesis import given, settings
from hypothesis import strategies as st

from guia_decisao.html_gen import gerar_html, montar_dados
from guia_decisao.loader import load_yaml
from guia_decisao.mermaid_gen import gerar_diagrama, gerar_todos, raias_ordenadas, sanitizar_id, visoes_da_demanda
from guia_decisao.ordem import chave_natural, ordem_fluxo, ordem_raias, ordenar_natural, raias_do_contexto
from tests.unit.test_html_navegacao import CHROME
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
YAML_REAL = GUIA_DIR
FIXTURE = RAIZ / "tests" / "fixtures" / "raias_minimo.yaml"
HELPER = Path(__file__).with_name("cdp_ordem.mjs")


@pytest.fixture(scope="module")
def real() -> dict[str, Any]:
    return load_yaml(YAML_REAL)


# ------------------------------------------------------------ chave_natural


def test_numeros_valem_pelo_valor() -> None:
    assert chave_natural("feat_orq_c2") < chave_natural("feat_orq_c9")
    assert ordenar_natural(["c10", "c2", "c1", "c11"]) == ["c1", "c2", "c10", "c11"]
    assert ordenar_natural(["a", "a0", "a_1", "a10", "a2"]) == ["a", "a0", "a2", "a10", "a_1"]


def test_mesmo_valor_tem_ordem_fixa() -> None:
    assert ordenar_natural(["c1", "c01"]) == ordenar_natural(["c01", "c1"])


@settings(max_examples=200, deadline=None)
@given(st.lists(st.text(alphabet="abc_019", max_size=8), max_size=25), st.integers(0, 1000))
def test_ordem_natural_e_idempotente_estavel_e_total(ids: list[str], semente: int) -> None:
    ordenados = ordenar_natural(ids)
    assert ordenar_natural(ordenados) == ordenados  # idempotente
    embaralhado = list(ids)
    random.Random(semente).shuffle(embaralhado)
    assert ordenar_natural(embaralhado) == ordenados  # independe da ordem de entrada
    assert sorted(ordenados) == sorted(ids)  # é permutação
    for a, b in zip(ordenados, ordenados[1:]):
        assert chave_natural(a) <= chave_natural(b)


@settings(max_examples=100, deadline=None)
@given(st.lists(st.integers(0, 500), min_size=1, max_size=30, unique=True))
def test_sufixo_numerico_ordena_por_valor(numeros: list[int]) -> None:
    ids = [f"x_c{n}" for n in numeros]
    assert ordenar_natural(ids) == [f"x_c{n}" for n in sorted(numeros)]


# --------------------------------------------------------------- ordem_fluxo


def _no(tipo: str, *para: str, raia: str = "r", **extra: Any) -> dict[str, Any]:
    return {"tipo": tipo, "raia": raia, "proximo": [{"para": p, "condicao": ""} for p in para], **extra}


def test_fluxo_busca_em_largura_com_desempate_natural() -> None:
    nos = {
        "s": _no("inicio", "c10", "c2"),
        "c2": _no("tarefa", "e"),
        "c10": _no("tarefa", "e"),
        "e": _no("fim"),
        "orfao2": _no("tarefa"),
        "orfao10": _no("tarefa"),
    }
    assert ordem_fluxo(nos, list(nos)) == ["s", "c2", "c10", "e", "orfao2", "orfao10"]


def test_fluxo_ignora_destinos_fora_do_conjunto_e_laços() -> None:
    nos = {"s": _no("inicio", "a"), "a": _no("tarefa", "s", "fora", "b"), "b": _no("fim"), "fora": _no("fim", raia="o")}
    assert ordem_fluxo(nos, ["s", "a", "b"]) == ["s", "a", "b"]


@settings(max_examples=100, deadline=None)
@given(st.integers(2, 12), st.data())
def test_fluxo_e_permutacao_deterministica_com_inicio_primeiro(n: int, data: st.DataObject) -> None:
    ids = [f"n{i}" for i in range(n)]
    nos = {
        i: _no("inicio" if k == 0 else "tarefa", *data.draw(st.lists(st.sampled_from(ids), max_size=3)))
        for k, i in enumerate(ids)
    }
    base = ordem_fluxo(nos, ids)
    assert sorted(base) == sorted(ids) and base[0] == "n0"
    embaralhado = dict(random.Random(1).sample(sorted(nos.items()), len(nos)))
    assert ordem_fluxo(embaralhado, list(embaralhado)) == base


def test_ordem_das_raias_orquestradora_chamadas_e_nao_alcancadas() -> None:
    raias = {"z": {"orquestradora": True}, "b": {}, "a": {}, "orfa2": {}, "orfa10": {}}
    nos = {
        "z_s": _no("inicio", "z_c1", raia="z"),
        "z_c1": _no("chamada", "z_c2", raia="z", raia_chamada="b"),
        "z_c2": _no("chamada", raia="z", raia_chamada="a"),
        "b_s": _no("inicio", "b_c1", raia="b"),
        "b_c1": _no("chamada", raia="b", raia_chamada="orfa10"),
        "a_s": _no("inicio", raia="a"),
    }
    assert ordem_raias(raias, nos) == ["z", "b", "a", "orfa10", "orfa2"]


# ------------------------------------------- YAML real: nós, arestas e raias


def _declaracao_de_nos(mmd: str) -> list[str]:
    return [m.group(1) for m in re.finditer(r"^\s{4}(\w+)(?:\(\[|\[\[|\[|\{\")", mmd, re.M)]


def _ordem_declarada(real: dict[str, Any], demanda: str, visao: str = "visao") -> list[str]:
    return _declaracao_de_nos(gerar_diagrama(real, demanda, visao, legenda=False).texto)


@pytest.mark.parametrize("demanda,orq", [("feature", "feat_orq"), ("incidente", "inc_orq"), ("bug", "bug_orq")])
def test_orquestradora_declara_nos_na_ordem_do_fluxo(real: dict[str, Any], demanda: str, orq: str) -> None:
    declarados = _ordem_declarada(real, demanda)
    nos = {n["id"]: n for n in real["decisoes"] if n["raia"] == orq}
    assert declarados == ordem_fluxo(nos, nos)
    assert declarados[0] == f"{orq}_s0"
    # Ordem de fluxo coerente com as arestas: todo nó (menos o início) tem um antecessor declarado antes.
    antecessores: dict[str, set[str]] = {i: set() for i in nos}
    for i, n in nos.items():
        for p in n["proximo"]:
            antecessores[p["para"]].add(i)
    pos = {i: k for k, i in enumerate(declarados)}
    for i in declarados[1:]:
        assert any(pos[a] < pos[i] for a in antecessores[i]), i


def test_feature_declara_c1_a_c6_em_sequencia_e_c2_antes_de_c10(real: dict[str, Any]) -> None:
    declarados = _ordem_declarada(real, "feature")
    seq = [f"feat_orq_c{n}" for n in range(1, 13)]  # c7 a c12 abstraídos: agentes (c7) e execução por papéis (c8)
    chamadas = [i for i in declarados if "_c" in i]  # fins de retorno antecipado (e3, e4) entram no mesmo nível de c2
    assert chamadas[:6] == seq[:6]
    assert declarados.index("feat_orq_c2") < declarados.index("feat_orq_c9")
    assert set(seq) <= set(declarados)


def test_arestas_saem_na_ordem_do_fluxo(real: dict[str, Any]) -> None:
    texto = gerar_diagrama(real, "feature", "visao", legenda=False).texto
    declarados = _declaracao_de_nos(texto)
    origens = []
    for linha in texto.splitlines():
        m = re.match(r"^\s{2}(feat_orq_\w+) -->", linha)
        if m:
            origens.append(m.group(1))
    pos = {i: k for k, i in enumerate(declarados)}
    assert origens and [pos[o] for o in origens] == sorted(pos[o] for o in origens)
    mapa = {sanitizar_id(i): i for i in declarados}
    assert all(o in mapa for o in origens)


def test_no_completo_c2_vem_antes_de_c10_em_toda_raia(real: dict[str, Any]) -> None:
    for demanda in ("feature", "incidente", "bug"):
        ids = _ordem_declarada(real, demanda, "completo")
        prefixos = {i.rsplit("_", 1)[0] for i in ids}
        for pref in prefixos:
            mesmos = [i for i in ids if i.startswith(pref + "_")]
            nat = [i for i in mesmos if re.search(r"_c\d+$", i)]
            assert nat.index(f"{pref}_c2") < nat.index(f"{pref}_c10") if f"{pref}_c10" in nat else True


ORDEM_FEATURE = [
    "feat_orq", "feat_ent", "feat_lev", "feat_cls", "feat_spc",
    "feat_alo", "com_set", "com_exe", "com_pub", "com_val", "feat_ite", "com_e2e", "com_evl", "com_prf",
    "com_seg", "com_rev", "com_hml", "com_etg", "com_lib", "com_mon",
    "com_dcs", "com_pro", "com_frn",  # chamadas por feat_cls, depois da orquestradora
    "com_exp", "com_dea", "com_mel",  # chamadas por com_exe
]


def test_raias_orquestradora_primeiro_depois_ordem_de_chamada(real: dict[str, Any]) -> None:
    assert raias_ordenadas(real, "feature") == ORDEM_FEATURE
    for demanda, orq in (("feature", "feat_orq"), ("bug", "bug_orq"), ("incidente", "inc_orq")):
        ordem = raias_ordenadas(real, demanda)
        assert ordem[0] == orq
        # raias da demanda mais as da biblioteca que ela chama
        assert sorted(ordem) == sorted(raias_do_contexto(real, demanda))
        assert {r["id"] for r in real["raias"] if r["demanda"] == demanda} <= set(ordem)


def test_abas_do_html_seguem_a_ordem_das_raias(real: dict[str, Any]) -> None:
    dados = montar_dados(real)
    for dem in dados["demandas"]:
        ordem = raias_ordenadas(real, dem["id"])
        # A aba "Catálogo" (Requisito 16) fecha a lista e existe em toda demanda com nós.
        ids_visoes = [v["id"] for v in dem["visoes"]]
        assert dem.get("catalogo") and ids_visoes[-1] == "catalogo"
        ids_visoes = ids_visoes[:-1]
        assert ids_visoes == ["visao", *("raia:" + r for r in ordem), "completo"]
        assert [r["id"] for r in dem["raias"]] == ordem
        assert dem["visoes"][0]["id"] == "visao" and dem["raias"][0]["orquestradora"] is True
        assert visoes_da_demanda(real, dem["id"]) == ids_visoes
    # ordem das demandas do YAML (`ordem_das_demandas` em comum.yaml), sem a biblioteca de raias comuns
    assert [d["id"] for d in dados["demandas"]][:3] == ["feature", "bug", "incidente"]
    assert [d["id"] for d in dados["demandas"]] == [d["id"] for d in real["demandas"] if not d.get("biblioteca")]


def test_completo_declara_as_raias_na_ordem_das_abas(real: dict[str, Any]) -> None:
    texto = gerar_diagrama(real, "feature", "completo").texto
    sgs = re.findall(r"^\s{2}subgraph z_SG_(\w+)\[", texto, re.M)
    assert sgs == ORDEM_FEATURE


def test_modal_usa_ordem_natural_e_de_fluxo(real: dict[str, Any]) -> None:
    dados = montar_dados(real)
    assert dados["ids"] == ordenar_natural(dados["ids"])
    feature = next(d for d in dados["demandas"] if d["id"] == "feature")
    for lista in feature["navegacao"]["chamadores"].values():
        assert lista == ordenar_natural(lista)  # "Chamada por:" em ordem natural (c9 antes de c11)
    assert feature["navegacao"]["chamadores"]["com_exp"] == ["com_exe_c1", "com_exe_c4"]
    saidas = [s["para"] for s in dados["nos"]["feat_orq_c9"]["transicoes"]]
    assert saidas == ["feat_orq_c10", "feat_orq_c19"]  # ordem de `proximo` (do autor)
    assert list(dados["nos"]) == ordenar_natural(dados["nos"])


def test_saida_deterministica_e_independe_da_ordem_das_colecoes(real: dict[str, Any]) -> None:
    base = {k: v.texto for k, v in gerar_todos(real).items()}
    assert {k: v.texto for k, v in gerar_todos(real).items()} == base
    html = gerar_html(real, mermaid_js="/*stub*/")
    assert gerar_html(real, mermaid_js="/*stub*/") == html
    for semente in range(3):
        outro = copy.deepcopy(real)
        rnd = random.Random(semente)
        for col in ("decisoes", "raias"):
            rnd.shuffle(outro[col])
        assert {k: v.texto for k, v in gerar_todos(outro).items()} == base
        assert json.dumps(montar_dados(outro)["demandas"][0]["visoes"][1:3], sort_keys=True) == json.dumps(
            montar_dados(real)["demandas"][0]["visoes"][1:3], sort_keys=True
        )


def test_fixture_minima_orquestradora_primeiro() -> None:
    d = load_yaml(FIXTURE)
    assert raias_ordenadas(d, "bug") == ["bug_orq", "bug_diag", "bug_corr"]


# ------------------------------------------------- Chrome: posições x no layout


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


def medir_posicoes(doc: dict[str, Any], tmp_path: Path) -> dict[str, Any]:
    arquivo = tmp_path / "guia.html"
    arquivo.write_text(gerar_html(doc), encoding="utf-8")
    porta = _porta_livre()
    chrome = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files",
         f"--user-data-dir={tmp_path / 'perfil'}", f"--remote-debugging-port={porta}", "--window-size=1400,900", arquivo.as_uri()],
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


@pytest.mark.integration
@pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado")
@pytest.mark.skipif(shutil.which("node") is None, reason="node não encontrado")
def test_posicoes_x_dos_nos_seguem_o_fluxo_na_visao(tmp_path: Path, real: dict[str, Any]) -> None:
    r = medir_posicoes(real, tmp_path)
    for demanda, orq, ate in (("feature", "feat_orq", 6), ("incidente", "inc_orq", 6), ("bug", "bug_orq", 5)):
        medidas = r["por_demanda"][demanda]
        assert medidas["abas"][:3] == ["visao", f"raia:{orq}", f"raia:{raias_ordenadas(real, demanda)[1]}"]
        assert "completo" not in medidas["abas"] and "catalogo" not in medidas["abas"]  # Completo é modo da Visão; Catálogo fica no cabeçalho
        x = {k: v["x"] for k, v in medidas["visao"]["nos"].items()}
        for n in range(1, ate):  # trecho linear, sem laços: cada chamada fica à direita da anterior
            assert x[f"{orq}_c{n}"] < x[f"{orq}_c{n + 1}"], (demanda, n, x)
        if demanda != "bug":
            assert x[f"{orq}_c2"] < x[f"{orq}_c10"], (demanda, x)
