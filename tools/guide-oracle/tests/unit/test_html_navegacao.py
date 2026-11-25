"""Navegação do HTML no navegador headless (integração).

Roda o JS real da prévia no Chrome headless, sem Playwright: injeta um roteiro que clica nos
elementos e grava o resultado em `<pre id="resultado">`, lido com `--dump-dom`. Marcado como
`integration` (rode com `pytest --integration`) e ignorado se o Chrome não existir.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path

import pytest

from guia_decisao.html_gen import gerar_html
from guia_decisao.loader import load_yaml
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

RAIZ = Path(__file__).resolve().parents[2]
FIXTURE = RAIZ / "tests" / "fixtures" / "raias_minimo.yaml"

_CANDIDATOS = (
    os.environ.get("CHROME_BIN", ""),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
    shutil.which("chromium-browser") or "",
)
CHROME = next((c for c in _CANDIDATOS if c and Path(c).exists()), None)

pytestmark = [
    pytest.mark.integration,
    pytest.mark.skipif(CHROME is None, reason="Chrome não encontrado"),
]

# Coleta erros de JS antes de a página rodar.
_ESPIAO = (
    "<script>window.__erros=[];"
    "window.addEventListener('error',function(e){window.__erros.push(String(e.message))});"
    "window.addEventListener('unhandledrejection',function(e){window.__erros.push('rejeicao: '+String(e.reason))});"
    "var __ce=console.error;console.error=function(){window.__erros.push('console: '+Array.prototype.join.call(arguments,' '));"
    "__ce.apply(console,arguments)};</script>\n"
)

# Roteiro padrão: usa só o DOM, como um usuário.
ROTEIRO_PADRAO = r"""
(function () {
  var R = { passos: {} };
  function q(s, r) { return (r || document).querySelector(s); }
  function esperar(cond, fn, falha) {
    var n = 0;
    (function t() {
      var v = cond();
      if (v) { fn(v); } else if (++n > 400) { R.timeout = falha; fim(); } else { setTimeout(t, 50); }
    })();
  }
  function fim() {
    R.erros = window.__erros;
    var pre = document.createElement("pre");
    pre.id = "resultado";
    pre.textContent = JSON.stringify(R);
    document.body.appendChild(pre);
  }
  function no(id) { return q(".visao.ativa g[data-id='" + id + "']"); }
  function clicar(e) { e.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
  function botoes() { return Array.prototype.slice.call(document.querySelectorAll("#m-corpo .acoes button")); }
  function abaAtiva() { return q("#abas button.ativa").dataset.visao; }
  var CHAMADA = "__CHAMADA__", INICIO = "__INICIO__", FIM = "__FIM__", ABA = "__ABA__";

  esperar(function () { return no(CHAMADA); }, function (g) {
    clicar(g);
    var modal = q("#modal");
    R.passos.modal_aberto = !modal.hidden;
    R.passos.role = q("#caixa").getAttribute("role") + "/" + q("#caixa").getAttribute("aria-modal");
    R.passos.titulo = q("#m-titulo").textContent;
    R.passos.cabecalho_cor = q("#m-cab").style.background;
    R.passos.sem_painel = !q("#painel");
    var b = botoes()[0];
    R.passos.botao_texto = b.textContent;
    R.passos.botao_cor = b.style.background;
    clicar(b);
    R.passos.modal_fechou_ao_navegar = q("#modal").hidden;
    esperar(function () { return abaAtiva() === ABA && no(INICIO); }, function (ini) {
      R.passos.aba_destino = abaAtiva();
      R.passos.inicio_destacado = ini.classList.contains("destaque");
      R.passos.voltar_habilitado = !q("#voltar").disabled;
      setTimeout(function () {
        R.passos.destaque_removido_em_2s = !no(INICIO).classList.contains("destaque");
        clicar(no(FIM));
        var chamadores = botoes();
        R.passos.chamadores = chamadores.map(function (x) { return x.textContent; });
        clicar(chamadores[0]);
        esperar(function () { return abaAtiva() === "visao" && no(CHAMADA); }, function () {
          R.passos.voltou_ao_chamador = no(CHAMADA).classList.contains("destaque");
          // Voltar: do orquestrador para a raia chamada
          clicar(q("#voltar"));
          esperar(function () { return abaAtiva() === ABA && no(INICIO); }, function () {
            R.passos.voltar_historico = abaAtiva();
            // Esc, clique fora e botão X
            clicar(no(INICIO));
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
            R.passos.esc = q("#modal").hidden;
            clicar(no(INICIO));
            clicar(q("#modal"));
            R.passos.clique_fora = q("#modal").hidden;
            clicar(no(INICIO));
            clicar(q("#m-fechar"));
            R.passos.botao_x = q("#modal").hidden;
            // Ligação entre demandas (gateway da orquestradora)
            clicar(q("#abas button[data-visao='visao']"));
            esperar(function () { return abaAtiva() === "visao" && no("bug_orq_g1"); }, function () {
              clicar(no("bug_orq_g1"));
              var bd = botoes().filter(function (x) { return x.textContent.indexOf("Ir para a demanda") === 0; })[0];
              R.passos.botao_demanda = bd ? bd.textContent : null;
              if (bd) { clicar(bd); }
              esperar(function () { return q("#demanda").value === "incidente" && no("inc_orq_s1"); }, function () {
                R.passos.demanda_destino = q("#demanda").value;
                R.passos.inicio_incidente_destacado = no("inc_orq_s1").classList.contains("destaque");
                fim();
              }, "demanda");
            }, "visao");
          }, "voltar");
        }, "retorno");
      }, 2300);
    }, "destino");
  }, "no inicial");
})();
"""


def _executar(roteiro: str, tmp_path: Path, doc: dict | None = None) -> dict:
    html = gerar_html(doc if doc is not None else load_yaml(FIXTURE))
    html = html.replace("<script>", _ESPIAO + "<script>", 1)
    antes, _, depois = html.rpartition("</body>")  # só o último: o Mermaid contém "</body>" em strings
    rede = (  # se o roteiro quebrar, devolve os erros em vez de ficar sem resultado
        "setTimeout(function(){if(!document.getElementById('resultado')){var p=document.createElement('pre');"
        "p.id='resultado';p.textContent=JSON.stringify({falha:'roteiro nao terminou',erros:window.__erros});"
        "document.body.appendChild(p)}},100000);"
    )
    html = f"{antes}<script>{rede}{roteiro}</script>\n</body>{depois}"
    arquivo = tmp_path / "guia_teste.html"
    arquivo.write_text(html, encoding="utf-8")
    proc = subprocess.run(
        [
            CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--allow-file-access-from-files",
            f"--user-data-dir={tmp_path / 'perfil'}", "--window-size=1400,900", "--virtual-time-budget=120000",
            "--dump-dom", arquivo.as_uri(),
        ],
        capture_output=True, text=True, timeout=180, check=False,
    )
    m = re.search(r'<pre id="resultado">(.*?)</pre>', proc.stdout, re.S)
    assert m, f"sem resultado do roteiro; stderr: {proc.stderr[-500:]}"
    import html as h

    return json.loads(h.unescape(m.group(1)))


def test_navegacao_por_chamada_no_navegador(tmp_path):
    roteiro = (
        ROTEIRO_PADRAO.replace("__CHAMADA__", "bug_orq_c1")
        .replace("__INICIO__", "bug_diag_s1")
        .replace("__FIM__", "bug_diag_e1")
        .replace("__ABA__", "raia:bug_diag")
    )
    r = _executar(roteiro, tmp_path)
    assert not r.get("timeout") and not r.get("falha"), r
    assert r["erros"] == [], r["erros"]
    p = r["passos"]
    assert p["modal_aberto"] is True and p["role"] == "dialog/true" and p["sem_painel"] is True
    assert p["titulo"] == "bug_orq_c1"
    assert p["botao_texto"] == "Ir para a raia: Diagnóstico"
    assert "242, 193, 78" in p["botao_cor"] or "f2c14e" in p["botao_cor"].lower()  # cor da raia chamada
    assert "79, 129, 189" in p["cabecalho_cor"]  # cor da raia da chamada (orquestradora)
    assert p["modal_fechou_ao_navegar"] is True
    assert p["aba_destino"] == "raia:bug_diag" and p["inicio_destacado"] is True and p["voltar_habilitado"] is True
    assert p["destaque_removido_em_2s"] is True
    assert p["chamadores"] and p["chamadores"][0].startswith("Voltar para bug_orq_c1")
    assert p["voltou_ao_chamador"] is True and p["voltar_historico"] == "raia:bug_diag"
    assert p["esc"] and p["clique_fora"] and p["botao_x"]
    assert p["botao_demanda"] == "Ir para a demanda: Incidente"
    assert p["demanda_destino"] == "incidente" and p["inicio_incidente_destacado"] is True


def test_yaml_real_sem_erro_de_js(tmp_path):
    """A prévia do YAML real abre sem erro no console e desenha todas as abas da primeira demanda."""
    roteiro = r"""
(function () {
  var R = { passos: {} };
  function fim() {
    R.erros = window.__erros;
    var pre = document.createElement("pre"); pre.id = "resultado"; pre.textContent = JSON.stringify(R);
    document.body.appendChild(pre);
  }
  var abas = Array.prototype.slice.call(document.querySelectorAll("#abas button"));
  var i = 0;
  R.passos.abas = abas.length;
  R.passos.erros_de_desenho = [];
  R.passos.nos_clicaveis = {};
  function proxima() {
    if (i >= abas.length) { fim(); return; }
    var b = abas[i++];
    b.click();
    var n = 0;
    (function t() {
      var v = document.querySelector(".visao.ativa");
      var pronto = v && (v.querySelector("g[data-id]") || v.querySelector(".erro"));  // nós já ligados ao clique
      if (pronto || ++n > 2000) {
        if (v && v.querySelector(".erro")) { R.passos.erros_de_desenho.push(v.querySelector(".erro").textContent); }
        R.passos.nos_clicaveis[b.textContent] = v ? v.querySelectorAll("g[data-id]").length : 0;
        proxima();
      } else { setTimeout(t, 50); }
    })();
  }
  setTimeout(proxima, 500);
})();
"""
    yaml_real = GUIA_DIR
    r = _executar(roteiro, tmp_path, load_yaml(yaml_real))
    assert r["erros"] == [], r["erros"]
    assert r["passos"]["erros_de_desenho"] == []
    assert all(n > 0 for n in r["passos"]["nos_clicaveis"].values()), r["passos"]
