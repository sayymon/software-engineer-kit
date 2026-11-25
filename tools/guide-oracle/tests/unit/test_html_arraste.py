"""Arraste (pan) do diagrama: presença do código e integração com Chrome headless e entrada real (CDP)."""

from __future__ import annotations

import json
import re
import shutil
import socket
import subprocess
import time
from pathlib import Path

import pytest

from guia_decisao.html_gen import _CSS, _JS, gerar_html
from guia_decisao.loader import load_yaml
from tests.unit.test_html_navegacao import CHROME, FIXTURE

HELPER = Path(__file__).with_name("cdp_arraste.mjs")


# ---------------------------------------------------------------- unitários


def test_css_cursor_grab_e_grabbing_e_sem_selecao():
    assert re.search(r"#rolagem\{[^}]*cursor:grab[;}]", _CSS)
    assert re.search(r"#rolagem\.arrastando[^{]*\{[^}]*cursor:grabbing", _CSS)
    assert "user-select:none" in _CSS
    assert "touch-action:none" in _CSS


def test_js_usa_pointer_events_com_captura():
    for trecho in ("pointerdown", "pointermove", "pointerup", "pointercancel", "setPointerCapture", "releasePointerCapture"):
        assert trecho in _JS, trecho
    assert "scrollLeft" in _JS and "scrollTop" in _JS


def test_js_limiar_de_arraste_de_4px():
    assert "LIMIAR_ARRASTE = 4" in _JS
    assert "<= LIMIAR_ARRASTE" in _JS  # até 4 px ainda é clique


def test_js_suprime_clique_apos_arraste():
    m = re.search(r'addEventListener\("click", function \(e\) \{\s*if \(suprimir\) \{ e\.stopPropagation\(\)', _JS)
    assert m, "o clique após o arraste precisa ser suprimido"
    assert '}, true);' in _JS  # fase de captura: chega antes do clique do nó


def test_js_zoom_com_ctrl_ou_cmd_e_teclado():
    assert "e.ctrlKey || e.metaKey" in _JS and "passive: false" in _JS
    assert "ArrowLeft" in _JS and "ArrowDown" in _JS


def test_contentor_acessivel_no_html():
    html = gerar_html(load_yaml(FIXTURE), mermaid_js="/* mermaid */")
    assert re.search(r'<div id="rolagem" tabindex="0" role="region" aria-label="[^"]+">', html)


def test_config_compacta_do_mermaid():
    assert "padding: 8" in _JS and "nodeSpacing" in _JS and "rankSpacing" in _JS


# --------------------------------------------------------------- integração


def _porta_livre() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@pytest.mark.integration
@pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado")
@pytest.mark.skipif(shutil.which("node") is None, reason="node não encontrado")
def test_arraste_rola_sem_abrir_modal_e_clique_abre(tmp_path):
    html = gerar_html(load_yaml(FIXTURE))
    espiao = "<script>window.__erros=[];window.addEventListener('error',function(e){window.__erros.push(String(e.message))});</script>\n"
    html = html.replace("<script>", espiao + "<script>", 1)
    arquivo = tmp_path / "guia.html"
    arquivo.write_text(html, encoding="utf-8")
    porta = _porta_livre()
    chrome = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files",
         f"--user-data-dir={tmp_path / 'perfil'}", f"--remote-debugging-port={porta}", "--window-size=900,500", arquivo.as_uri()],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        # O nó `bug_orq_c1` fica na aba inicial (Visão) da primeira demanda.
        proc = subprocess.run(["node", str(HELPER), str(porta), "bug_orq_c1"], capture_output=True, text=True, timeout=120, check=False)
    finally:
        chrome.terminate()
        try:
            chrome.wait(timeout=10)
        except subprocess.TimeoutExpired:
            chrome.kill()
    m = re.search(r"RESULTADO (.*)", proc.stdout)
    assert m, f"sem resultado: {proc.stdout[-500:]} {proc.stderr[-500:]}"
    r = json.loads(m.group(1))
    assert r["erros"] == [], r
    assert r["cursor_repouso"] == "grab" and r["cursor_arrastando"] == "grabbing" and r["cursor_apos"] == "grab", r
    assert r["classe_arrastando"] is True and r["user_select"] == "none", r
    assert r["rolavel"][0], r
    assert r["clique_abre"] is True and r["tremor_abre"] is True and r["clique_apos_arraste_abre"] is True, r
    assert r["alvo_do_arraste"] == "bug_orq_c1", r  # o arraste começou sobre o nó
    assert r["arraste_modal_aberto"] is False, r
    antes, depois = r["rolagem_antes"], r["rolagem_depois"]
    assert depois[0] != antes[0], r  # rolou em X
    if r["rolavel"][1]:
        assert depois[1] != antes[1], r  # e em Y quando há rolagem vertical
    assert r["teclado"][1][0] > r["teclado"][0][0], r
    assert r["roda_comum_zoom"] is False and r["ctrl_roda_zoom_in"] is True, r
