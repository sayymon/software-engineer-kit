// Mede, no Chrome headless (CDP), a posição x (getBoundingClientRect) dos nós em cada aba.
// Uso: node cdp_ordem.mjs <porta>. Imprime "RESULTADO <json>" com, por demanda: a ordem das abas e,
// na aba Visão, o x de cada nó (por data-id) e as ordens de raias no modo Completo.
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

const NOS = `(function () {
  var svg = document.querySelector(".visao.ativa svg");
  if (!svg) { return null; }
  var nos = {};
  Array.prototype.forEach.call(svg.querySelectorAll("g.node"), function (g) {
    var r = g.getBoundingClientRect();
    nos[g.getAttribute("data-id") || g.id] = { x: Math.round(r.left * 10) / 10, y: Math.round(r.top * 10) / 10 };
  });
  var clusters = Array.prototype.map.call(svg.querySelectorAll("g.cluster"), function (c) {
    var r = c.getBoundingClientRect();
    return { titulo: ((c.querySelector(".cluster-label") || c).textContent || "").trim().slice(0, 40), x: Math.round(r.left * 10) / 10 };
  });
  return { nos: nos, clusters: clusters };
})()`;

await esperar(`document.querySelectorAll("#demanda option").length > 0 && !!document.querySelector(".visao.ativa svg")`);
const demandas = await avalia(`Array.prototype.map.call(document.querySelectorAll("#demanda option"), function (o) { return o.value; })`);
const R = { demandas, por_demanda: {} };
for (const dem of demandas) {
  await avalia(`(function(){var s=document.getElementById("demanda");s.value=${JSON.stringify(dem)};s.dispatchEvent(new Event("change"));})()`);
  await esperar(`document.getElementById("demanda").value === ${JSON.stringify(dem)} && !!document.querySelector("#abas button")`);
  const abas = await avalia(`Array.prototype.map.call(document.querySelectorAll("#abas button"), function (b) { return b.dataset.visao; })`);
  const medidas = {};
  // "Completo" é a Visão completa com as raias visíveis; "visao" é a mesma aba com as raias ocultas.
  for (const v of ["visao", "completo"]) {
    const querRaias = v === "completo";
    await avalia(`document.querySelector("button[data-visao='visao']").click()`);
    await esperar(`(function(){var b=document.querySelector("button.ativa[data-visao]");return !!b && b.dataset.visao==="visao" && !!document.querySelector(".visao.ativa svg");})()`);
    await avalia(`(function(){var b=document.getElementById("alt-raias");if((b.getAttribute("aria-pressed")==="true")!==${querRaias}){b.click();}})()`);
    await esperar(`(function(){var b=document.getElementById("alt-raias");return b.getAttribute("aria-pressed")===${JSON.stringify(String(querRaias))} && !!document.querySelector(".visao.ativa svg");})()`);
    await dorme(200);
    medidas[v] = await avalia(NOS);
  }
  R.por_demanda[dem] = { abas, ...medidas };
}
console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
