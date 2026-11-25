// Dirige o Chrome headless por CDP com entrada REAL (Input.dispatchMouseEvent/KeyEvent).
// Uso: node cdp_arraste.mjs <porta>. Imprime uma linha JSON com o resultado.
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
const mouse = (type, x, y, extra = {}) =>
  enviar("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1, ...extra });

async function esperar(expr, ms = 30000) {
  for (let t = 0; t < ms; t += 100) { if (await avalia(expr)) return true; await dorme(100); }
  throw new Error("timeout: " + expr);
}
const centro = (id) => avalia(`(function(){var g=document.querySelector(".visao.ativa g[data-id='${id}']");
  g.scrollIntoView({block:"center",inline:"center"});var r=g.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
const modalAberto = () => avalia(`!document.getElementById("modal").hidden`);
const fechar = () => avalia(`document.getElementById("m-fechar").click()`);
const rol = () => avalia(`(function(){var a=document.getElementById("rolagem");return [a.scrollLeft,a.scrollTop]})()`);

const R = {};
const NO = process.argv[3];
await esperar(`!!document.querySelector(".visao.ativa g[data-id='${NO}']")`);
await enviar("Emulation.setDeviceMetricsOverride", { width: 1200, height: 800, deviceScaleFactor: 1, mobile: false });
// Zoom para garantir rolagem nos dois eixos.
for (let i = 0; i < 4; i++) await avalia(`document.getElementById("zmais").click()`);
await dorme(300);
R.rolavel = await avalia(`(function(){var a=document.getElementById("rolagem");return [a.scrollWidth>a.clientWidth,a.scrollHeight>a.clientHeight]})()`);
R.rect = await avalia(`JSON.stringify(document.getElementById("rolagem").getBoundingClientRect())`);
R.cursor_repouso = await avalia(`getComputedStyle(document.getElementById("rolagem")).cursor`);
R.user_select = await avalia(`getComputedStyle(document.getElementById("rolagem")).userSelect`);

// 1) Clique simples abre o modal.
let c = await centro(NO);
await mouse("mouseMoved", c.x, c.y, { button: "none", buttons: 0 });
await mouse("mousePressed", c.x, c.y);
await mouse("mouseReleased", c.x, c.y);
await dorme(100);
R.clique_abre = await modalAberto();
await fechar();

// 2) Movimento de 3 px (abaixo do limiar) ainda é clique.
c = await centro(NO);
await mouse("mousePressed", c.x, c.y);
await mouse("mouseMoved", c.x + 2, c.y + 2);
await mouse("mouseReleased", c.x + 2, c.y + 2);
await dorme(100);
R.tremor_abre = await modalAberto();
await fechar();

// 3) Arraste de ~150 px começando SOBRE o nó: rola e NÃO abre o modal.
c = await centro(NO);
await dorme(100);
c = await centro(NO);
const area = await avalia(`(function(){var r=document.getElementById("rolagem").getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,l:r.left,t:r.top,r:r.right,b:r.bottom};})()`);
R.area = area;
R.alvo_do_arraste = await avalia(`(function(){var e=document.elementFromPoint(${c.x},${c.y});var g=e&&e.closest("g[data-id]");return g?g.getAttribute("data-id"):null})()`);
const antes = await rol();
await mouse("mousePressed", c.x, c.y);
let dx = 0;
for (let i = 1; i <= 15; i++) { dx = i * 10; await mouse("mouseMoved", c.x - dx * 1.0, c.y - dx * 0.5); }
R.cursor_arrastando = await avalia(`getComputedStyle(document.getElementById("rolagem")).cursor`);
R.classe_arrastando = await avalia(`document.getElementById("rolagem").classList.contains("arrastando")`);
await mouse("mouseReleased", c.x - dx, c.y - dx * 0.5);
await dorme(150);
const depois = await rol();
R.rolagem_antes = antes; R.rolagem_depois = depois;
R.arraste_modal_aberto = await modalAberto();
R.cursor_apos = await avalia(`getComputedStyle(document.getElementById("rolagem")).cursor`);
if (R.arraste_modal_aberto) await fechar();

// 4) Depois do arraste, um clique simples volta a abrir o modal.
c = await centro(NO);
await mouse("mousePressed", c.x, c.y);
await mouse("mouseReleased", c.x, c.y);
await dorme(100);
R.clique_apos_arraste_abre = await modalAberto();
await fechar();

// 5) Teclado: setas rolam o contêiner focado.
await avalia(`(function(){var a=document.getElementById("rolagem");a.scrollLeft=0;a.scrollTop=0;a.focus();})()`);
const k0 = await rol();
for (const key of ["ArrowRight", "ArrowDown"]) {
  await enviar("Input.dispatchKeyEvent", { type: "rawKeyDown", key, code: key, windowsVirtualKeyCode: key === "ArrowRight" ? 39 : 40 });
  await enviar("Input.dispatchKeyEvent", { type: "keyUp", key, code: key, windowsVirtualKeyCode: key === "ArrowRight" ? 39 : 40 });
}
await dorme(150);
R.teclado = [k0, await rol()];

// 6) Ctrl + roda dá zoom centrado; roda comum não muda o zoom.
const larg = () => avalia(`document.querySelector(".visao.ativa svg").getBoundingClientRect().width`);
const w0 = await larg();
await enviar("Input.dispatchMouseEvent", { type: "mouseWheel", x: area.x, y: area.y, deltaX: 0, deltaY: 100 });
await dorme(100);
R.roda_comum_zoom = (await larg()) !== w0;
await enviar("Input.dispatchMouseEvent", { type: "mouseWheel", x: area.x, y: area.y, deltaX: 0, deltaY: -100, modifiers: 2 });
await dorme(150);
R.ctrl_roda_zoom_in = (await larg()) > w0;

R.erros = await avalia(`window.__erros || []`);
console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
