"""Nenhum nó pode cobrir o rótulo (título) de um subgraph, em nenhuma aba de nenhuma demanda (integração).

Gera o HTML do YAML REAL, abre no Chrome headless, percorre cada demanda e cada aba (Visão, uma por
Raia e Completo) e mede por getBoundingClientRect se o retângulo de algum nó intersecta o retângulo do
rótulo de algum subgraph. Rode com `pytest --integration`; é ignorado sem Chrome ou sem node.
"""

from __future__ import annotations

import json
import re
import shutil
import socket
import subprocess
from pathlib import Path

import pytest

from guia_decisao.html_gen import gerar_html
from guia_decisao.loader import load_yaml
from tests.unit.test_html_navegacao import CHROME
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
YAML_REAL = GUIA_DIR
HELPER = Path(__file__).with_name("cdp_sobreposicao.mjs")


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


def medir_sobreposicoes(yaml_path: Path, tmp_path: Path) -> dict:
    html = gerar_html(load_yaml(yaml_path))
    arquivo = tmp_path / "guia.html"
    arquivo.write_text(html, encoding="utf-8")
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
def test_nenhum_no_cobre_o_rotulo_de_subgraph_no_yaml_real(tmp_path: Path) -> None:
    r = medir_sobreposicoes(YAML_REAL, tmp_path)
    demandas = load_yaml(YAML_REAL)["demandas"]
    # ordem de declaração no seletor, sem as bibliotecas de raias comuns
    assert r["demandas"] == [d["id"] for d in demandas if not d.get("biblioteca")]
    assert len(r["abas"]) > 3 * 3
    medidas_com_subgraph = [a for a in r["abas"] if a["clusters"] > 0]
    assert medidas_com_subgraph, "nenhuma aba com subgraph foi medida"
    com_problema = [
        (a["demanda"], a["visao"], a["sobreposicoes"]) for a in r["abas"] if a["sobreposicoes"]
    ]
    assert com_problema == [], f"nós cobrindo rótulo de subgraph: {com_problema[:5]} (total de abas afetadas: {len(com_problema)})"


@pytest.mark.integration
@pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado")
@pytest.mark.skipif(shutil.which("node") is None, reason="node não encontrado")
def test_titulo_do_subgraph_leva_so_o_nome_e_a_responsabilidade_vai_no_tooltip(tmp_path: Path) -> None:
    doc = load_yaml(YAML_REAL)
    nomes = {r["nome"] for r in doc["raias"]}
    r = medir_sobreposicoes(YAML_REAL, tmp_path)
    for a in r["abas"]:
        assert a["com_tooltip"] == a["clusters"], (a["demanda"], a["visao"])  # todo subgraph tem title e <title> SVG
        for texto in a["rotulos"]:
            assert texto in nomes, (a["demanda"], a["visao"], texto)  # o título é só o nome da raia
