// Percorre, no Chrome headless (CDP), o fluxo de subtarefas da fixture `tests/fixtures/subtarefas.yaml`.
// Uso: node cdp_subtarefas.mjs <porta>. Imprime uma linha "RESULTADO <json>".
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

const MEDIR = `(function () {
  var box = document.querySelector(".visao.ativa");
  var svg = box && box.querySelector("svg");
  if (!svg) { return null; }
  function ret(e) { var r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; }
  function inter(a, b) { var w = Math.min(a.r, b.r) - Math.max(a.l, b.l), h = Math.min(a.b, b.b) - Math.max(a.t, b.t); return w > 1 && h > 1 ? w * h : 0; }
  var rotulos = Array.prototype.map.call(svg.querySelectorAll("g.cluster"), function (c) {
    var lab = c.querySelector(".cluster-label") || c.querySelector("foreignObject") || c.querySelector("text");
    return { texto: ((lab && lab.textContent) || "").trim().slice(0, 60), rect: lab ? ret(lab) : null };
  });
  var nos = Array.prototype.map.call(svg.querySelectorAll("g.node"), function (g) { return { id: g.getAttribute("data-id") || g.id, rect: ret(g) }; });
  var cob = [];
  rotulos.forEach(function (rt) {
    if (!rt.rect) { return; }
    nos.forEach(function (n) { var a = inter(rt.rect, n.rect); if (a > 0) { cob.push({ no: n.id, rotulo: rt.texto, area: Math.round(a) }); } });
  });
  return { clusters: rotulos.length, nos: nos.length, sobreposicoes: cob };
})()`;

const ESTADO = `(function () {
  var b = document.getElementById("alt-sub");
  var a = document.querySelector("button.ativa[data-visao]");
  var d = document.querySelector(".visao.ativa g.node.destaque");
  var no = d ? d.getAttribute("data-id") : null;
  var area = document.getElementById("rolagem").getBoundingClientRect();
  var rn = d ? d.getBoundingClientRect() : null;
  return {
    aba: a ? a.dataset.visao : null,
    alternador_visivel: !b.hidden,
    alternador_texto: b.textContent,
    expandido: b.getAttribute("aria-pressed") === "true",
    destaque: no,
    destaque_visivel: !!rn && rn.left >= area.left - 1 && rn.right <= area.right + 1 && rn.top >= area.top - 1 && rn.bottom <= area.bottom + 1,
    modal_aberto: !document.getElementById("modal").hidden,
    titulo_modal: document.getElementById("m-titulo").textContent,
    voltar_ativo: !document.getElementById("voltar").disabled,
    nos_st: document.querySelectorAll(".visao.ativa g.node[data-id*='_st']").length,
    clusters: document.querySelectorAll(".visao.ativa g.cluster").length
  };
})()`;

const LER_MODAL = `(function () {
  var c = document.getElementById("m-corpo");
  function txt(sel, raiz) { return Array.prototype.map.call((raiz || c).querySelectorAll(sel), function (x) { return x.textContent; }); }
  return {
    titulo: document.getElementById("m-titulo").textContent,
    texto: c.textContent,
    chips: txt(".chip-dado"),
    chips_title: Array.prototype.map.call(c.querySelectorAll(".chip-dado"), function (x) { return x.title; }),
    selos: Array.prototype.map.call(c.querySelectorAll(".selo"), function (x) { return { classe: x.className, texto: x.textContent }; }),
    quando: txt(".quando"),
    porque: txt(".porque"),
    subtarefas: Array.prototype.map.call(c.querySelectorAll("ol.subs > li"), function (li) {
      return { id: li.getAttribute("data-sub"), texto: li.textContent, botoes: txt("button", li), resp: txt(".resp", li) };
    }),
    botoes: txt(".acoes button"),
    monoespacados: txt("code.mono")
  };
})()`;

async function modo(sub) {
  const atual = await avalia(`document.getElementById("alt-sub").getAttribute("aria-pressed") === "true"`);
  if (atual !== sub) {
    await clicar("#alt-sub");
    await esperar(`document.getElementById("alt-sub").getAttribute("aria-pressed") === ${J(String(sub))} && !!document.querySelector(".visao.ativa svg")`);
  }
}
async function irAba(v) {
  await clicar(`button[data-visao='${v}']`);
  await esperar(`document.querySelector("button.ativa[data-visao]").dataset.visao === ${J(v)} && !!document.querySelector(".visao.ativa svg, .visao.ativa table")`);
}

const R = {};
await esperar(`!!document.querySelector(".visao.ativa svg")`);
R.estado_inicial = await avalia(ESTADO);
R.abas = await avalia(`Array.prototype.map.call(document.querySelectorAll("#abas button"), function (b) { return b.dataset.visao + "=" + b.textContent; })`);

// 1) modo oculto: a tarefa mostra o indicador e o alternador existe
await irAba("raia:bug_diag");
R.oculto = await avalia(ESTADO);
R.indicador = await avalia(`(document.querySelector(".visao.ativa g.node[data-id='bug_diag_t1']") || {textContent: ""}).textContent`);

// 2) clicar na tarefa: modal com entradas, saídas, técnicas e subtarefas
await clicar(".visao.ativa g.node[data-id='bug_diag_t1']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "bug_diag_t1"`);
R.modal_tarefa = await avalia(LER_MODAL);

// 3) Ir para a subtarefa: fecha o modal, expande, rola e destaca por 2 s
await avalia(`document.querySelector("ol.subs li[data-sub='bug_diag_t1_st2'] button[data-acao='ir-subtarefa']").click()`);
await esperar(`document.getElementById("modal").hidden && !!document.querySelector(".visao.ativa g.node.destaque")`);
R.apos_ir_subtarefa = await avalia(ESTADO);
await dorme(2300);
R.destaque_depois_de_2s = await avalia(`document.querySelectorAll(".visao.ativa g.node.destaque").length`);

// 4) modal da subtarefa: id, responsável, técnicas, botões Anterior/Próxima e Ir para a tarefa
await clicar(".visao.ativa g.node[data-id='bug_diag_t1_st2']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "bug_diag_t1_st2"`);
R.modal_sub = await avalia(LER_MODAL);
await clicarTexto("Próxima");
await esperar(`document.getElementById("m-titulo").textContent === "bug_diag_t1_st3"`);
R.modal_st3 = await avalia(LER_MODAL);
await clicarTexto("Anterior");
await esperar(`document.getElementById("m-titulo").textContent === "bug_diag_t1_st2"`);
await clicarTexto("Anterior");
await esperar(`document.getElementById("m-titulo").textContent === "bug_diag_t1_st1"`);
R.modal_st1 = await avalia(LER_MODAL);
await clicarTexto("Ir para a tarefa");
await esperar(`document.getElementById("modal").hidden && !!document.querySelector(".visao.ativa g.node.destaque")`);
R.apos_ir_tarefa = await avalia(ESTADO);
await dorme(2300);

// 5) Voltar desfaz tarefa -> subtarefa -> tarefa
await clicar("#voltar");
await esperar(`!!document.querySelector(".visao.ativa g.node.destaque")`);
R.voltar_1 = await avalia(ESTADO);
await dorme(2300);
await clicar("#voltar");
await esperar(`document.getElementById("alt-sub").getAttribute("aria-pressed") === "false" && !!document.querySelector(".visao.ativa svg")`);
R.voltar_2 = await avalia(ESTADO);

// 6) alternador por aba: expandir e ocultar de novo
await modo(true);
R.expandido = await avalia(ESTADO);
await modo(false);
R.recolhido = await avalia(ESTADO);
await irAba("raia:bug_corr");
R.outra_aba = await avalia(ESTADO);

// 8) zero sobreposições de título de subgraph com nós, nos dois modos, em todas as abas com diagrama
R.sobreposicao = [];
const visoes = await avalia(`Array.prototype.map.call(document.querySelectorAll("#abas button"), function (b) { return b.dataset.visao; })`);
async function raias(visiveis) {
  const b = await avalia(`!document.getElementById("alt-raias").hidden`);
  if (!b) return;
  const atual = await avalia(`document.getElementById("alt-raias").getAttribute("aria-pressed") === "true"`);
  if (atual !== visiveis) {
    await clicar("#alt-raias");
    await esperar(`document.getElementById("alt-raias").getAttribute("aria-pressed") === ${J(String(visiveis))} && !!document.querySelector(".visao.ativa svg")`);
  }
}
for (const v of visoes) {
  if (v === "catalogo") continue;
  // a Visão completa é medida com as raias visíveis (o antigo Completo) e ocultas (só a orquestradora)
  for (const comRaias of v === "visao" ? [true, false] : [null]) {
    for (const sub of [false, true]) {
      await irAba(v);
      if (comRaias !== null) await raias(comRaias);
      const tem = await avalia(`!document.getElementById("alt-sub").hidden`);
      if (sub && !tem) continue;
      await modo(sub);
      await dorme(200);
      R.sobreposicao.push({ visao: comRaias === false ? "visao_sem_raias" : v, sub, ...(await avalia(MEDIR)) });
    }
  }
}
console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
