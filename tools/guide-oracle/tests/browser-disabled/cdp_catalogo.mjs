// Percorre, no Chrome headless (CDP), a aba Catálogo da fixture `tests/fixtures/subtarefas.yaml`.
// Uso: node cdp_catalogo.mjs <porta>. Imprime uma linha "RESULTADO <json>".
const porta = process.argv[2];
const dorme = (ms) => new Promise((r) => setTimeout(r, ms));

async function paginaWs() {
  for (let i = 0; i < 100; i++) {
    try {
      const lista = await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json();
      const p = lista.find((x) => x.type === "page" && x.url.startsWith("file:"));
      if (p) return p.webSocketDebuggerUrl;
    } catch (e) { /* Chrome ainda subindo */ }
    await dorme(100);
  }
  throw new Error("sem página");
}
const ws = new WebSocket(await paginaWs());
await new Promise((r) => ws.addEventListener("open", r));
let seq = 0;
const pend = new Map();
ws.addEventListener("message", (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
});
const enviar = (method, params = {}) =>
  new Promise((res) => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
const avalia = async (expr) => {
  const r = await enviar("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
  return r.result.result.value;
};
async function esperar(expr, ms = 60000) {
  for (let t = 0; t < ms; t += 50) { if (await avalia(expr)) return true; await dorme(50); }
  throw new Error("timeout: " + expr);
}
const J = JSON.stringify;
const clicar = (seletor) =>
  avalia(`document.querySelector(${J(seletor)}).dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))`);
const botaoPorTexto = (texto, raiz = "#m-corpo") =>
  `Array.prototype.filter.call(document.querySelectorAll(${J(raiz)} + " button"), function (b) { return b.textContent.indexOf(${J(texto)}) === 0; })[0]`;
const clicarTexto = (texto, raiz) => avalia(`(${botaoPorTexto(texto, raiz)}).click()`);

const ESTADO = `(function () {
  var a = document.querySelector("button.ativa[data-visao]");
  var d = document.querySelector(".visao.ativa g.node.destaque");
  var area = document.getElementById("rolagem").getBoundingClientRect();
  var rn = d ? d.getBoundingClientRect() : null;
  return {
    aba: a ? a.dataset.visao : null,
    expandido: document.getElementById("alt-sub").getAttribute("aria-pressed") === "true",
    destaque: d ? d.getAttribute("data-id") : null,
    destaque_visivel: !!rn && rn.left >= area.left - 1 && rn.right <= area.right + 1 && rn.top >= area.top - 1 && rn.bottom <= area.bottom + 1,
    modal_aberto: !document.getElementById("modal").hidden,
    voltar_ativo: !document.getElementById("voltar").disabled
  };
})()`;
const LINHAS = `Array.prototype.filter.call(document.querySelectorAll(".visao.ativa tbody tr"), function (t) { return !t.hidden; })`;
const VISIVEIS = `${LINHAS}.map(function (t) { return t.getAttribute("data-item"); })`;
const CONTADOR = `document.querySelector(".visao.ativa [id^='contador-catalogo']").textContent`;
const LER_MODAL = `(function () {
  var c = document.getElementById("m-corpo");
  function txt(sel) { return Array.prototype.map.call(c.querySelectorAll(sel), function (x) { return x.textContent; }); }
  return {
    titulo: document.getElementById("m-titulo").textContent,
    texto: c.textContent,
    titulos: txt("h3"),
    botoes: txt("button"),
    refs: Array.prototype.map.call(c.querySelectorAll("button[data-ref]"), function (b) { return b.getAttribute("data-ref"); }),
    exemplo: txt(".exemplo-bloco"),
    chips: txt(".chip-dado"),
    lacunas: txt(".lacuna-msg"),
    foco: document.activeElement ? document.activeElement.id : ""
  };
})()`;
async function irAba(v) {
  await clicar(`button[data-visao='${v}']`);
  await esperar(`document.querySelector("button.ativa[data-visao]").dataset.visao === ${J(v)} && !!document.querySelector(".visao.ativa svg, .visao.ativa table")`);
}
const abrirLinha = async (id) => {
  await clicar(`.visao.ativa tr[data-item='${id}']`);
  await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === ${J(id)}`);
};

const R = {};
await esperar(`!!document.querySelector(".visao.ativa svg")`);
await irAba("catalogo");

// 1) estrutura da tabela
R.cabecalhos = await avalia(`Array.prototype.map.call(document.querySelectorAll(".visao.ativa thead th"), function (t) { return t.textContent; })`);
R.todas = await avalia(VISIVEIS);
R.categorias = await avalia(`Array.from(new Set(Array.prototype.map.call(document.querySelectorAll(".visao.ativa tbody tr"), function (t) { return t.getAttribute("data-categoria"); })))`);
R.contador_inicial = await avalia(CONTADOR);
R.botoes_raia = await avalia(`Array.prototype.map.call(document.querySelectorAll(".visao.ativa .filtro-raia"), function (b) { return b.textContent; })`);
R.cor_botao_raia = await avalia(`document.querySelector(".visao.ativa .filtro-raia[data-raia='bug_diag']").style.background`);
R.botoes_tipo = await avalia(`Array.prototype.map.call(document.querySelectorAll(".visao.ativa .filtro-tipo"), function (b) { return b.textContent; })`);
R.linha_art = await avalia(`(function () { var t = document.querySelector(".visao.ativa tr[data-item='art_repro']"); return Array.prototype.map.call(t.children, function (c) { return c.textContent; }); })()`);
R.linha_sub = await avalia(`(function () { var t = document.querySelector(".visao.ativa tr[data-item='bug_diag_t1_st2']"); return Array.prototype.map.call(t.children, function (c) { return c.textContent; }); })()`);
R.icone_lacuna = await avalia(`(function () { var t = document.querySelector(".visao.ativa tr[data-item='art_alerta'] .icone-lacuna"); return t ? t.title : null; })()`);
R.orfao_na_tela = await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_orfao']")`);
R.postmortem_no_bug = await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_postmortem']")`);
R.sem_icone = await avalia(`!document.querySelector(".visao.ativa tr[data-item='art_repro'] .icone-lacuna")`);

// 1b) filtro de texto busca no exemplo (palavra que só existe no exemplo da subtarefa e do playbook)
await avalia(`(function(){var i=document.querySelector(".visao.ativa [id^='filtro-catalogo']");i.value="simulador";i.dispatchEvent(new Event("input"));})()`);
R.busca_exemplo_sub = await avalia(VISIVEIS);
await avalia(`(function(){var i=document.querySelector(".visao.ativa [id^='filtro-catalogo']");i.value="tela branca no iphone: a equipe";i.dispatchEvent(new Event("input"));})()`);
R.busca_exemplo_playbook = await avalia(VISIVEIS);
await clicar(".visao.ativa [id^='limpar-filtros']");

// 2) filtro por raia
await clicar(".visao.ativa .filtro-raia[data-raia='bug_diag']");
R.raia_diag = await avalia(VISIVEIS);
R.raia_diag_pressionado = await avalia(`document.querySelector(".visao.ativa .filtro-raia[data-raia='bug_diag']").getAttribute("aria-pressed")`);
R.contador_raia = await avalia(CONTADOR);

// 3) raia E categoria (multisseleção)
await clicar(".visao.ativa .filtro-tipo[data-tipo='tarefa']");
R.raia_tarefa = await avalia(VISIVEIS);
await clicar(".visao.ativa .filtro-tipo[data-tipo='subtarefa']");
R.raia_tarefa_sub = await avalia(VISIVEIS);
R.contador_combinado = await avalia(CONTADOR);

// 4) combinação com texto
await avalia(`(function(){var i=document.querySelector(".visao.ativa [id^='filtro-catalogo']");i.value="reproduzir";i.dispatchEvent(new Event("input"));})()`);
R.combinado_texto = await avalia(VISIVEIS);
await avalia(`(function(){var i=document.querySelector(".visao.ativa [id^='filtro-catalogo']");i.value="zzz_nada";i.dispatchEvent(new Event("input"));})()`);
R.sem_resultados = { itens: await avalia(VISIVEIS), contador: await avalia(CONTADOR), aviso: await avalia(`!document.querySelector(".visao.ativa .sem-resultados").hidden`) };

// 5) limpar, Sem raia, só lacunas
await clicar(".visao.ativa [id^='limpar-filtros']");
R.apos_limpar = await avalia(VISIVEIS);
await clicar(".visao.ativa .filtro-raia[data-raia='-']");
R.sem_raia = await avalia(VISIVEIS);
await clicar(".visao.ativa .filtro-tipo[data-tipo='variavel']");
R.sem_raia_variavel = await avalia(VISIVEIS);
await clicar(".visao.ativa [id^='limpar-filtros']");
R.so_lacunas = null;
await clicar(".visao.ativa [id^='limpar-filtros']");

// 6) modal de artefato: exemplo, produtor e consumidor; ir à subtarefa e voltar (o filtro de categoria permanece)
await clicar(".visao.ativa .filtro-tipo[data-tipo='artefato']");
await abrirLinha("art_repro");
R.modal_artefato = await avalia(LER_MODAL);
await avalia(`document.querySelector("#m-corpo button[data-ref='bug_diag_t1_st2']").click()`);
await esperar(`document.getElementById("modal").hidden && !!document.querySelector(".visao.ativa g.node.destaque")`);
R.apos_ref = await avalia(ESTADO);
await dorme(2300);
await clicar("#voltar");
await esperar(`document.querySelector("button.ativa[data-visao]").dataset.visao === "catalogo"`);
R.voltou_ao_catalogo = await avalia(ESTADO);
R.filtros_preservados = await avalia(VISIVEIS);
await clicar(".visao.ativa [id^='limpar-filtros']");

// 7) modal de variável: valores, inicial, condições e lacuna
await abrirLinha("severidade");
R.modal_variavel = await avalia(LER_MODAL);
await avalia(`(function () { var bs = document.querySelectorAll("#m-corpo .quando"); return bs.length; })()`);
R.condicao_botoes = await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo ul.tecnicas button[data-ref]"), function (b) { return b.getAttribute("data-ref"); })`);
await avalia(`document.getElementById("m-fechar").click()`);
R.apos_fechar = await avalia(`document.getElementById("modal").hidden`);

// 8) Esc e foco
await abrirLinha("art_alerta");
R.modal_orfao = await avalia(LER_MODAL);
await avalia(`document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))`);
R.apos_esc = await avalia(`document.getElementById("modal").hidden`);

// 9) modal de tarefa: Ver no diagrama e Voltar
await abrirLinha("bug_diag_t1");
R.modal_tarefa = await avalia(LER_MODAL);
await avalia(`(function () { var b = Array.prototype.filter.call(document.querySelectorAll("#m-corpo button"), function (x) { return x.textContent === "Ver no diagrama"; })[0]; b.click(); })()`);
await esperar(`document.getElementById("modal").hidden && !!document.querySelector(".visao.ativa g.node.destaque")`);
R.ver_no_diagrama = await avalia(ESTADO);
await dorme(2300);
await clicar("#voltar");
await esperar(`document.querySelector("button.ativa[data-visao]").dataset.visao === "catalogo"`);
R.voltar_do_no = await avalia(ESTADO);

// 10) modal de subtarefa: Ver no diagrama expande as subtarefas
await abrirLinha("bug_diag_t1_st2");
R.modal_subtarefa = await avalia(LER_MODAL);
await avalia(`(function () { var b = Array.prototype.filter.call(document.querySelectorAll("#m-corpo button"), function (x) { return x.textContent === "Ver no diagrama"; })[0]; b.click(); })()`);
await esperar(`document.getElementById("modal").hidden && !!document.querySelector(".visao.ativa g.node.destaque")`);
R.ver_subtarefa = await avalia(ESTADO);
await dorme(2300);

// 11) nó clicado no diagrama também leva "Ver no diagrama"
await clicar(".visao.ativa g.node[data-id='bug_diag_t2']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "bug_diag_t2"`);
R.modal_do_diagrama = await avalia(LER_MODAL);
await avalia(`document.getElementById("m-fechar").click()`);

// 12) bloco Exemplo nos modais de tarefa e subtarefa (via .exemplo-bloco, só textContent)
await irAba("catalogo");
await clicar(".visao.ativa [id^='limpar-filtros']");
await abrirLinha("bug_diag_t1");
R.exemplo_tarefa = { titulos: (await avalia(LER_MODAL)).titulos, exemplo: (await avalia(LER_MODAL)).exemplo };
await avalia(`document.getElementById("m-fechar").click()`);
await abrirLinha("bug_diag_t1_st2");
R.exemplo_subtarefa = { titulos: (await avalia(LER_MODAL)).titulos, exemplo: (await avalia(LER_MODAL)).exemplo };
await avalia(`document.getElementById("m-fechar").click()`);
await abrirLinha("bug_diag_t1_st1");
R.sem_exemplo_subtarefa = (await avalia(LER_MODAL)).titulos.indexOf("Exemplo") >= 0;
await avalia(`document.getElementById("m-fechar").click()`);

// 13) catálogo por demanda: trocar para o incidente muda as linhas
await avalia(`(function(){var s=document.getElementById("demanda");s.value="incidente";s.dispatchEvent(new Event("change",{bubbles:true}));})()`);
await esperar(`document.getElementById("demanda").value === "incidente"`);
await irAba("catalogo");
R.inc_itens = await avalia(VISIVEIS);
R.inc_contador = await avalia(CONTADOR);
R.inc_globais = await avalia(`Array.prototype.filter.call(document.querySelectorAll(".visao.ativa tbody tr"), function (t) { return t.getAttribute("data-raia") === "-"; }).map(function (t) { return t.getAttribute("data-item"); })`);

// 14) item compartilhado: blocos só da demanda atual e "Também usado em" troca de demanda
await abrirLinha("severidade");
R.inc_severidade = await avalia(LER_MODAL);
R.inc_tambem = await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo .tambem-usado button"), function (b) { return b.getAttribute("data-demanda") + ":" + b.textContent; })`);
R.inc_tambem_texto = await avalia(`(document.querySelector("#m-corpo .tambem-usado") || {}).textContent || ""`);
await avalia(`document.querySelector("#m-corpo .tambem-usado button[data-demanda='bug']").click()`);
await esperar(`document.getElementById("demanda").value === "bug" && !document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "severidade"`);
R.bug_severidade = await avalia(LER_MODAL);
R.bug_tambem = await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo .tambem-usado button"), function (b) { return b.getAttribute("data-demanda"); })`);
R.apos_tambem = await avalia(ESTADO);
await avalia(`document.getElementById("m-fechar").click()`);
// item exclusivo não oferece "Também usado em"
await abrirLinha("art_repro");
R.exclusivo_sem_tambem = await avalia(`!document.querySelector("#m-corpo .tambem-usado")`);
await avalia(`document.getElementById("m-fechar").click()`);
R.bug_itens_depois = await avalia(VISIVEIS);

console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
