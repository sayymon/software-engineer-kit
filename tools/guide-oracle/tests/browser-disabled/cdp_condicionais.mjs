// Percorre, no Chrome headless (CDP), subtarefas condicionais, variantes e tipos de artefato da fixture `tests/fixtures/condicionais.yaml`.
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
const excecoes = [];
ws.addEventListener("message", (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
  if (d.method === "Runtime.exceptionThrown") { excecoes.push(JSON.stringify(d.params.exceptionDetails.text)); }
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

await enviar("Runtime.enable");
const VISIVEIS = `Array.prototype.filter.call(document.querySelectorAll(".visao.ativa tbody tr"), function (t) { return !t.hidden; }).map(function (t) { return t.getAttribute("data-item"); })`;
const CONTADOR = `document.querySelector(".visao.ativa [id^='contador-catalogo']").textContent`;
const TXT = (sel) => `Array.prototype.map.call(document.querySelectorAll(${J(sel)}), function (x) { return x.textContent; })`;
async function irAba(v) {
  await clicar(`button[data-visao='${v}']`);
  await esperar(`document.querySelector("button.ativa[data-visao]").dataset.visao === ${J(v)} && !!document.querySelector(".visao.ativa svg, .visao.ativa table")`);
}
const abrirLinha = async (id) => {
  await clicar(`.visao.ativa tr[data-item='${id}']`);
  await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === ${J(id)}`);
};
const fechar = () => avalia(`document.getElementById("m-fechar").click()`);
const trocarDemanda = async (id) => {
  await avalia(`(function(){var s=document.getElementById("demanda");s.value=${J(id)};s.dispatchEvent(new Event("change",{bubbles:true}));})()`);
  await esperar(`document.getElementById("demanda").value === ${J(id)}`);
};
const R = {};
await esperar(`!!document.querySelector(".visao.ativa svg")`);

// 1) diagrama da orquestradora de alfa, subtarefas expandidas: sem "chama:", subtarefa condicional com ◆ e borda tracejada
await clicar("#alt-sub");
await esperar(`!!document.querySelector(".visao.ativa g.node[data-id='alf_orq_t1_st2']")`);
const NO = (id) => `document.querySelector(".visao.ativa g.node[data-id='${id}']")`;
const BORDA = (id) => `(function(){var f=${NO(id)}.querySelector("rect, path, polygon");return f ? getComputedStyle(f).strokeDasharray : null;})()`;
R.diagrama = {
  texto_chamada: await avalia(`${NO("alf_orq_c1")}.textContent`),
  texto_sub_condicional: await avalia(`${NO("alf_orq_t1_st2")}.textContent`),
  texto_sub_normal: await avalia(`${NO("alf_orq_t1_st1")}.textContent`),
  borda_condicional: await avalia(BORDA("alf_orq_t1_st2")),
  borda_normal: await avalia(BORDA("alf_orq_t1_st1")),
  legenda_condicional: await avalia(`document.getElementById("legenda").textContent.indexOf("subtarefa condicional") >= 0`),
};

// 2) modal da tarefa: subtarefas com selo condicional e a condição
await clicar(".visao.ativa g.node[data-id='alf_orq_t1']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "alf_orq_t1"`);
R.modal_tarefa = {
  itens_condicionais: await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo ol.subs li.condicional"), function (l) { return l.getAttribute("data-sub"); })`),
  selo: await avalia(`document.querySelector("#m-corpo ol.subs li.condicional .selo.sub-cond").textContent`),
  quando: await avalia(`document.querySelector("#m-corpo ol.subs li.condicional .quando-sub").textContent`),
  total_itens: await avalia(`document.querySelectorAll("#m-corpo ol.subs > li").length`),
};
await fechar();

// 3) modal da subtarefa condicional e da normal
await clicar(".visao.ativa g.node[data-id='alf_orq_t1_st2']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "alf_orq_t1_st2"`);
R.modal_sub = {
  executar_quando: await avalia(`(document.querySelector("#m-corpo .executar-quando") || {}).textContent || null`),
  porque: await avalia(`(document.querySelector("#m-corpo .porque") || {}).textContent || null`),
};
await fechar();
await clicar(".visao.ativa g.node[data-id='alf_orq_t1_st1']");
await esperar(`!document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "alf_orq_t1_st1"`);
R.modal_sub_normal = { executar_quando: await avalia(`(document.querySelector("#m-corpo .executar-quando") || {}).textContent || null`) };
await fechar();

// 4) Catálogo de alfa: filtro por tipo de artefato
await irAba("catalogo");
const todos = await avalia(VISIVEIS);
const chips = TXT(".visao.ativa .filtro-tipo-artefato");
R.filtro_tipo = { todos, chips_alfa: await avalia(chips) };
await clicar(".visao.ativa .filtro-tipo-artefato[data-tipo-artefato='documento']");
R.filtro_tipo.so_documento = await avalia(VISIVEIS);
R.filtro_tipo.so_documento_contador = await avalia(CONTADOR);
await clicar(".visao.ativa .filtro-tipo-artefato[data-tipo-artefato='acao']");
R.filtro_tipo.documento_e_acao = await avalia(VISIVEIS);
await clicar(".visao.ativa [id^='limpar-filtros']");
R.filtro_tipo.limpo = await avalia(VISIVEIS);
R.filtro_tipo.linha_tipo = await avalia(`document.querySelector(".visao.ativa tr[data-item='art_necessidade'] .tipo-linha").textContent`);
R.compartilhado = {
  alfa_tem_parecer: await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_parecer']")`),
  alfa_tem_teste: await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_teste_contrato']")`),
  sem_orfaos_alfa: await avalia(`!document.querySelector(".visao.ativa tr[data-item='art_sem_uso']") && !document.querySelector(".visao.ativa tr[data-item='var_sem_uso']")`),
};

// 4b) coluna Exemplo do Catálogo, busca por texto de exemplo e bloco de exemplo nos modais
R.exemplo = {
  cabecalho: await avalia(`Array.prototype.map.call(document.querySelectorAll(".visao.ativa thead th"), function (t) { return t.textContent; })`),
  celula_subtarefa: await avalia(`document.querySelector(".visao.ativa tr[data-item='alf_orq_t1_st1'] td.exemplo").textContent`),
  celula_tarefa: await avalia(`document.querySelector(".visao.ativa tr[data-item='alf_orq_t1'] td.exemplo").textContent`),
};
await avalia(`(function(){var i=document.querySelector(".visao.ativa input[type=search]");i.value="cupom no checkout";i.dispatchEvent(new Event("input",{bubbles:true}));})()`);
R.exemplo.busca = await avalia(VISIVEIS);
await avalia(`(function(){var i=document.querySelector(".visao.ativa input[type=search]");i.value="";i.dispatchEvent(new Event("input",{bubbles:true}));})()`);
await abrirLinha("alf_orq_t1_st1");
R.exemplo.modal_subtarefa = await avalia(`(document.querySelector("#m-corpo .exemplo-bloco") || {}).textContent || null`);
await fechar();
await abrirLinha("alf_orq_t1");
R.exemplo.modal_tarefa = await avalia(`(document.querySelector("#m-corpo .exemplo-bloco") || {}).textContent || null`);
await fechar();

// 5) modal do artefato com variantes
await abrirLinha("art_necessidade");
R.modal_artefato = {
  variantes: await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo .variantes li"), function (l) { return l.getAttribute("data-variante"); })`),
  condicoes_variantes: await avalia(TXT("#m-corpo .variantes li .quando")),
  meta: await avalia(`document.querySelector("#m-corpo .meta").textContent`),
};

// 6) item compartilhado: "Também usado em" troca para beta
R.compartilhado.tambem_usado = await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo .tambem-usado button"), function (b) { return b.getAttribute("data-demanda") + ":" + b.textContent; })`);
await avalia(`document.querySelector("#m-corpo .tambem-usado button[data-demanda='beta']").click()`);
await esperar(`document.getElementById("demanda").value === "beta" && !document.getElementById("modal").hidden && document.getElementById("m-titulo").textContent === "art_necessidade"`);
R.compartilhado.demanda_apos_clique = await avalia(`document.getElementById("demanda").value`);
R.compartilhado.modal_apos_clique = await avalia(`document.getElementById("m-titulo").textContent`);
R.compartilhado.refs_beta = await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo button[data-ref]"), function (b) { return b.getAttribute("data-ref"); })`);
await fechar();
R.compartilhado.beta_tem_parecer = await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_parecer']")`);
R.compartilhado.beta_tem_teste = await avalia(`!!document.querySelector(".visao.ativa tr[data-item='art_teste_contrato']")`);
R.compartilhado.sem_orfaos = R.compartilhado.sem_orfaos_alfa && await avalia(`!document.querySelector(".visao.ativa tr[data-item='art_sem_uso']") && !document.querySelector(".visao.ativa tr[data-item='var_sem_uso']")`);
R.filtro_tipo.chips_beta = await avalia(chips);
await abrirLinha("art_teste_contrato");
R.compartilhado.exclusivo_sem_tambem = await avalia(`!document.querySelector("#m-corpo .tambem-usado")`);
await fechar();

// 7) variáveis: condições de subtarefa e de variante
await trocarDemanda("alfa");
await irAba("catalogo");
await abrirLinha("tem_dado_pessoal");
R.modal_variavel = {
  origens: await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo ul.tecnicas li"), function (l) { return l.getAttribute("data-origem"); })`),
  titulos: await avalia(TXT("#m-corpo h3")),
};
await fechar();
await abrirLinha("modelo_trabalho");
R.modal_variavel_modelo = {
  origens: await avalia(`Array.prototype.map.call(document.querySelectorAll("#m-corpo ul.tecnicas li"), function (l) { return l.getAttribute("data-origem"); })`),
  botao_artefato: await avalia(`document.querySelector("#m-corpo ul.tecnicas li button").textContent`),
};
await fechar();

R.erros_js = [...excecoes, ...(await avalia(TXT(".erro")))];
console.log("RESULTADO " + JSON.stringify(R));
ws.close();
process.exit(0);
