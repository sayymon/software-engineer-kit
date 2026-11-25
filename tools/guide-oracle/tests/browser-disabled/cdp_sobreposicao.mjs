// Mede, no Chrome headless (CDP), se algum nó cobre o rótulo (título) de algum subgraph.
// Uso: node cdp_sobreposicao.mjs <porta>. Imprime uma linha "RESULTADO <json>".
// Percorre TODAS as demandas e, em cada uma, TODAS as abas (Visão, uma por Raia, Completo).
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
  for (let t = 0; t < ms; t += 100) { if (await avalia(expr)) return true; await dorme(100); }
  throw new Error("timeout: " + expr);
}

// Mede a aba ativa: retângulo de cada rótulo de subgraph contra o retângulo de cada nó.
const MEDIR = `(function () {
  var box = document.querySelector(".visao.ativa");
  var svg = box && box.querySelector("svg");
  if (!svg) { return null; }
  function ret(e) { var r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; }
  function inter(a, b) { var w = Math.min(a.r, b.r) - Math.max(a.l, b.l), h = Math.min(a.b, b.b) - Math.max(a.t, b.t); return w > 1 && h > 1 ? w * h : 0; }
  var rotulos = Array.prototype.map.call(svg.querySelectorAll("g.cluster"), function (c) {
    var lab = c.querySelector(".cluster-label") || c.querySelector("foreignObject") || c.querySelector("text");
    var texto = ((lab && lab.textContent) || "").trim();
    return { id: c.id, texto: texto.slice(0, 60), rect: lab ? ret(lab) : null };
  });
  var nos = Array.prototype.map.call(svg.querySelectorAll("g.node"), function (g) {
    return { id: g.getAttribute("data-id") || g.id, rect: ret(g) };
  });
  var cob = [];
  rotulos.forEach(function (rt) {
    if (!rt.rect) { return; }
    nos.forEach(function (n) {
      var a = inter(rt.rect, n.rect);
      if (a > 0) { cob.push({ no: n.id, rotulo: rt.texto, area: Math.round(a) }); }
    });
  });
  var comTitle = Array.prototype.filter.call(svg.querySelectorAll("g.cluster"), function (c) { return (c.getAttribute("title") || "").indexOf(": ") > 0 && !!c.querySelector(":scope > title"); }).length;
  return { clusters: rotulos.length, com_tooltip: comTitle, rotulos: rotulos.map(function (x) { return x.texto; }), nos: nos.length, sobreposicoes: cob };
})()`;

await esperar(`document.querySelectorAll("#demanda option").length > 0 && !!document.querySelector(".visao.ativa svg")`);
const demandas = await avalia(`Array.prototype.map.call(document.querySelectorAll("#demanda option"), function (o) { return o.value; })`);
const R = { demandas, abas: [] };
for (const dem of demandas) {
  await avalia(`(function(){var s=document.getElementById("demanda");s.value=${JSON.stringify(dem)};s.dispatchEvent(new Event("change"));})()`);
  await esperar(`document.getElementById("demanda").value === ${JSON.stringify(dem)} && !!document.querySelector("#abas button")`);
  const visoes = await avalia(`Array.prototype.map.call(document.querySelectorAll("#abas button"), function (b) { return b.dataset.visao; })`);
  // a Visão completa é medida com as raias visíveis (padrão) e ocultas
  await avalia(`document.querySelector("button[data-visao='visao']").click()`);
  await esperar(`!!document.querySelector(".visao.ativa svg")`);
  for (const v of visoes) {
    if (v === "catalogo") continue;  // a aba Catálogo é uma tabela, sem diagrama
    await avalia(`document.querySelector("button[data-visao='" + ${JSON.stringify(v)} + "']").click()`);
    await esperar(`(function(){var b=document.querySelector("button.ativa[data-visao]");return !!b && b.dataset.visao===${JSON.stringify(v)} && !!document.querySelector(".visao.ativa svg");})()`);
    await dorme(150);
    const m = await avalia(MEDIR);
    R.abas.push({ demanda: dem, visao: v, ...m });
  }
}
console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
