// SPDX-License-Identifier: MIT
// Orchestrates the Ecossistema page: data, filters, focus, side panel, legend and URL state.
// The renderer is loaded last, by dynamic import, so the page shell stays small.
import { GRUPOS, COR_DO_GRUPO, corDe, formaDe, grupoDe } from '@lib/ecossistema/camadas';
import { icone } from './icones';
import { ESTADO_PADRAO, ler, serializar, type EstadoEcossistema } from '@lib/ecossistema/estado';
import type { Fato } from '@lib/ecossistema/fatos';
import { contarFaceta, filtrarNos, normalizar, type CriterioFiltro } from '@lib/ecossistema/filtro';
import { arranjoEmCasca, calcularFoco, raioDaCasca, type EstadoDeFoco } from '@lib/ecossistema/foco';
import type { ShardDetalhe } from '@lib/ecossistema/payload';
import { carregarFatos, carregarIndice, carregarModelo, carregarShard, type ItemIndice, type Modelo } from './dados';
import type { CameraSalva, EcossistemaRenderer } from './renderer';

const raiz = document.querySelector<HTMLElement>('[data-island="ecossistema"]');
if (raiz) void iniciar(raiz);

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`ecossistema: elemento #${id} ausente`);
  return el as T;
}

function webglDisponivel(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

async function iniciar(host: HTMLElement): Promise<void> {
  const base = host.dataset.base ?? '';
  const locale = (host.dataset.locale ?? 'pt-BR') as 'pt-BR' | 'en';
  const textos = JSON.parse(document.getElementById('eco-i18n')?.textContent ?? '{}') as Record<string, string>;
  const tr = (k: string, vars: Record<string, string | number> = {}) => (textos[k] ?? k).replace(/\{(\w+)\}/g, (_m, n: string) => String(vars[n] ?? `{${n}}`));
  const tipoRotulo = (tipo: string) => textos[`tipo.${tipo}`] ?? tipo;
  const carregando = $('eco-loading');
  const falha = $('eco-fail');
  const ao = $<HTMLElement>('eco-live');

  if (!webglDisponivel()) {
    carregando.hidden = true;
    $('eco-nowebgl').hidden = false;
    return;
  }

  let modelo: Modelo;
  let renderer: EcossistemaRenderer;
  try {
    modelo = await carregarModelo(base, locale);
    const { Renderer3D } = await import('./renderer-3d');
    renderer = new Renderer3D();
    await renderer.montar($('eco-stage'), modelo);
  } catch (e) {
    console.error(e);
    carregando.hidden = true;
    falha.hidden = false;
    $('eco-retry').onclick = () => location.reload();
    return;
  }
  carregando.hidden = true;
  host.dataset.pronto = 'true';

  // ---- state ----
  let estado: EstadoEcossistema = { ...ler(location.hash), modo: 'ecossistema' };
  let visivel: Uint8Array = new Uint8Array(modelo.n);
  let emFoco: EstadoDeFoco | null = null;
  const expandidos = new Set<string>();
  const historico: string[] = [];
  let indice: Map<string, ItemIndice> | null = null;
  const fatosCache = new Map<string, Record<string, Fato[]> | null>();

  const criterio = (): CriterioFiltro => ({ camadas: estado.camadas, hubs: estado.hubs, texto: estado.texto, facetas: estado.facetas });
  const total = modelo.n;

  function gravarHash(modo: 'push' | 'replace'): void {
    const h = serializar({ ...estado, modo: 'lista' }) || '#';
    const url = h === '#' ? location.pathname + location.search : h;
    const st = { camera: renderer.lerCamera() };
    if (modo === 'push') history.pushState(st, '', url);
    else history.replaceState(st, '', url);
  }

  // ---- filters ----
  function aplicarFiltros(): void {
    visivel = filtrarNos(modelo.filtro, criterio());
    renderer.definirVisiveis(visivel);
    let quantos = 0;
    for (let i = 0; i < total; i++) quantos += visivel[i];
    let ligacoes = 0;
    const { pares } = modelo;
    for (let k = 0; k < pares.length; k += 2) if (visivel[pares[k]] && visivel[pares[k + 1]]) ligacoes++;
    $('eco-count').textContent = tr('eco.count', { visible: quantos, total, edges: ligacoes });
    $('eco-empty').hidden = quantos > 0;
    atualizarLegenda();
    if (estado.foco !== null) {
      const i = modelo.porId.get(estado.foco);
      if (i !== undefined && !visivel[i]) sairDoFoco(false);
    }
  }

  // ---- focus ----
  function focarNo(i: number, opcoes: { empilhar: boolean; animar?: boolean; camera?: CameraSalva }): void {
    if (opcoes.empilhar && estado.foco) historico.push(estado.foco);
    const trocouDeNo = estado.foco !== modelo.ids[i];
    if (trocouDeNo) expandidos.clear();
    estado = { ...estado, foco: modelo.ids[i] };
    const f = calcularFoco(modelo.adj, i, estado.profundidade, {
      tipoDe: (k) => modelo.tipos[modelo.tipoDoNo[k]],
      hub: (k) => modelo.hubDoNo[k],
      visivel: (k) => visivel[k] === 1,
      expandidos,
    });
    emFoco = f;
    const ordenados = [...f.vizinhos].sort((a, b) => modelo.tipoDoNo[a] - modelo.tipoDoNo[b] || modelo.nomes[a].localeCompare(modelo.nomes[b], locale));
    const centro: [number, number, number] = [modelo.x[i], modelo.y[i], modelo.z[i]];
    const pontos = arranjoEmCasca(centro, ordenados.length, raioDaCasca(ordenados.length));
    const rotulados = [...ordenados].sort((a, b) => modelo.grau[b] - modelo.grau[a]).slice(0, 22);
    renderer.focar({ no: i, vizinhos: ordenados.map((k, n) => ({ i: k, pos: pontos[n] })), rotulados }, { animar: opcoes.animar ?? true });
    if (opcoes.camera) renderer.restaurarCamera(opcoes.camera);
    else renderer.enquadrar(i, { animar: opcoes.animar ?? true });
    host.dataset.foco = modelo.ids[i];
    abrirPainel(i, f);
    $('eco-back').hidden = historico.length === 0;
    $('eco-exit').hidden = false;
    ao.textContent = tr('eco.focusLive', { name: modelo.nomes[i], type: tipoRotulo(modelo.tipos[modelo.tipoDoNo[i]]), n: f.totalDiretos });
  }

  function sairDoFoco(gravar = true): void {
    if (estado.foco === null && !emFoco) return;
    estado = { ...estado, foco: null };
    emFoco = null;
    historico.length = 0;
    renderer.focar(null, { animar: true });
    renderer.enquadrar('tudo', { animar: true });
    delete host.dataset.foco;
    $<HTMLElement>('eco-panel').hidden = true;
    $('eco-exit').hidden = true;
    $('eco-back').hidden = true;
    if (gravar) gravarHash('push');
  }

  function irPara(i: number): void {
    focarNo(i, { empilhar: true });
    gravarHash('push');
  }

  // ---- side panel ----
  const painel = $<HTMLElement>('eco-panel');
  const corpo = $('eco-panel-body');
  function linkBotao(i: number, rotulo?: string): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'eco-chip';
    b.dataset.idx = String(i);
    const t = modelo.tipos[modelo.tipoDoNo[i]];
    b.append(icone(formaDe(t), corDe(t), 14), document.createTextNode(rotulo ?? modelo.nomes[i]));
    b.onclick = () => irPara(i);
    return b;
  }

  function abrirPainel(i: number, f: EstadoDeFoco): void {
    const tipo = modelo.tipos[modelo.tipoDoNo[i]];
    const grupo = GRUPOS[modelo.grupoDoNo[i]];
    painel.hidden = false;
    painel.style.setProperty('--eco-accent', corDe(tipo));
    corpo.replaceChildren();
    const h = document.createElement('h2');
    h.textContent = modelo.nomes[i];
    h.id = 'eco-panel-title';
    const selo = document.createElement('p');
    selo.className = 'eco-kind';
    selo.append(icone(formaDe(tipo), corDe(tipo), 16), document.createTextNode(` ${tipoRotulo(tipo)} · ${tr(`eco.group.${grupo}`)}`));
    const desc = document.createElement('p');
    desc.className = 'eco-desc';
    desc.textContent = '…';
    const acoes = document.createElement('p');
    acoes.className = 'eco-actions';
    corpo.append(selo, h, desc, acoes);
    void (async () => {
      indice ??= await carregarIndice(base, locale).catch(() => new Map<string, ItemIndice>());
      if (modelo.ids[i] !== estado.foco) return;
      const item = indice.get(modelo.ids[i]);
      desc.textContent = item?.descricao || tr('eco.noDescription');
      if (item?.fallback) {
        const m = document.createElement('span');
        m.className = 'eco-fallback-mark';
        m.textContent = ` ${tr('eco.fallbackMark')}`;
        desc.append(m);
      }
      if (item) {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'eco-btn eco-btn-primary';
        a.textContent = tr('eco.open');
        acoes.append(a);
      }
      const demanda = await demandaDoNo(i);
      if (demanda && (tipo === 'tarefa' || tipo === 'raia')) {
        const alvo = indice.get(demanda);
        if (alvo && modelo.ids[i] === estado.foco) {
          const a = document.createElement('a');
          a.href = alvo.url;
          a.className = 'eco-btn';
          a.textContent = tr('eco.openFlow');
          acoes.append(a);
        }
      }
    })();
    const vizTitulo = document.createElement('h3');
    vizTitulo.textContent = `${tr('eco.neighbors')} · ${tr('eco.neighborsCount', { n: f.totalDiretos })}`;
    void (async () => {
      const mapa = await fatosDoTipo(tipo);
      const fatos = mapa?.[modelo.ids[i]];
      if (!fatos?.length || modelo.ids[i] !== estado.foco) return;
      const dl = document.createElement('dl');
      dl.className = 'eco-facts';
      for (const fato of fatos) {
        const dt = document.createElement('dt');
        dt.textContent = fato.rotulo;
        const dd = document.createElement('dd');
        if (fato.valor) dd.textContent = fato.valor;
        if (fato.fonte) {
          const s = document.createElement('small');
          s.textContent = ` (${fato.fonte}${fato.data ? `, ${fato.data}` : ''})`;
          dd.append(s);
        }
        for (const id of fato.ids ?? []) {
          const idx = modelo.porId.get(id);
          if (idx !== undefined) dd.append(linkBotao(idx));
        }
        dl.append(dt, dd);
      }
      const titulo = document.createElement('h3');
      titulo.textContent = tr('eco.facts');
      corpo.insertBefore(titulo, vizTitulo);
      corpo.insertBefore(dl, vizTitulo);
    })();
    corpo.append(vizTitulo);
    if (f.grupos.length) {
      for (const g of f.grupos) {
        const bloco = document.createElement('div');
        bloco.className = 'eco-group';
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'eco-btn';
        b.setAttribute('aria-expanded', String(g.expandido));
        b.textContent = g.expandido ? tr('eco.hideGroup', { type: tipoRotulo(g.tipo) }) : tr('eco.showGroup', { n: g.membros.length, type: tipoRotulo(g.tipo) });
        b.onclick = () => {
          if (g.expandido) expandidos.delete(g.tipo);
          else expandidos.add(g.tipo);
          focarNo(i, { empilhar: false, animar: false });
        };
        bloco.append(b);
        if (g.expandido) {
          const ul = document.createElement('ul');
          ul.className = 'eco-list';
          for (const k of g.membros.slice(0, 80)) {
            const li = document.createElement('li');
            li.append(linkBotao(k));
            ul.append(li);
          }
          bloco.append(ul);
        }
        corpo.append(bloco);
      }
    } else {
      const porTipo = new Map<string, number[]>();
      for (const k of f.vizinhos) (porTipo.get(modelo.tipos[modelo.tipoDoNo[k]]) ?? porTipo.set(modelo.tipos[modelo.tipoDoNo[k]], []).get(modelo.tipos[modelo.tipoDoNo[k]])!).push(k);
      for (const [t, lista] of [...porTipo.entries()].sort((a, b) => b[1].length - a[1].length)) {
        const det = document.createElement('details');
        det.open = lista.length <= 12;
        const sum = document.createElement('summary');
        sum.textContent = `${tipoRotulo(t)} (${lista.length})`;
        const ul = document.createElement('ul');
        ul.className = 'eco-list';
        for (const k of lista) {
          const li = document.createElement('li');
          li.append(linkBotao(k));
          ul.append(li);
        }
        det.append(sum, ul);
        corpo.append(det);
      }
    }
    if (f.omitidos > 0) {
      const p = document.createElement('p');
      p.className = 'muted';
      p.textContent = tr('eco.omitted', { n: f.omitidos });
      corpo.append(p);
    }
    corpo.append(detalhesBloco(i));
    painel.scrollTop = 0;
    (h as HTMLElement).tabIndex = -1;
  }

  async function demandaDoNo(i: number): Promise<string | null> {
    const tipo = modelo.tipos[modelo.tipoDoNo[i]];
    if (tipo === 'demanda') return modelo.ids[i];
    const mapa = await fatosDoTipo(tipo);
    const dem = mapa?.[modelo.ids[i]]?.find((f) => f.rotulo === 'Demanda')?.ids?.[0];
    return dem ?? null;
  }

  async function fatosDoTipo(tipo: string): Promise<Record<string, Fato[]> | null> {
    if (!fatosCache.has(tipo)) fatosCache.set(tipo, await carregarFatos(base, locale, tipo));
    return fatosCache.get(tipo) ?? null;
  }

  function detalhesBloco(i: number): HTMLElement {
    const bloco = document.createElement('div');
    bloco.className = 'eco-detail';
    const tipo = modelo.tipos[modelo.tipoDoNo[i]];
    if (!['demanda', 'raia', 'tarefa'].includes(tipo)) return bloco;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'eco-btn';
    b.textContent = tr('eco.details');
    const saida = document.createElement('div');
    saida.setAttribute('aria-live', 'polite');
    b.onclick = async () => {
      b.disabled = true;
      saida.textContent = tr('eco.detailsLoading');
      try {
        const dem = (await demandaDoNo(i)) ?? 'comum';
        const shard: ShardDetalhe = await carregarShard(base, locale, dem);
        const id = modelo.ids[i];
        const ligados = new Set<string>();
        for (const n of shard.nos) if (n[3] === id) ligados.add(n[0]);
        for (const [s, t] of shard.arestas) {
          if (s === id) ligados.add(t);
          if (t === id) ligados.add(s);
        }
        const nos = shard.nos.filter((n) => ligados.has(n[0]));
        saida.replaceChildren();
        if (!nos.length) {
          saida.textContent = tr('eco.detailsNone');
          return;
        }
        const porTipo = new Map<string, string[]>();
        for (const n of nos) (porTipo.get(shard.tipos[n[1]]) ?? porTipo.set(shard.tipos[n[1]], []).get(shard.tipos[n[1]])!).push(n[2]);
        for (const [t, nomes] of porTipo) {
          const det = document.createElement('details');
          const sum = document.createElement('summary');
          sum.textContent = `${tipoRotulo(t)} (${nomes.length})`;
          const ul = document.createElement('ul');
          ul.className = 'eco-plain';
          for (const nome of nomes) {
            const li = document.createElement('li');
            li.textContent = nome;
            ul.append(li);
          }
          det.append(sum, ul);
          saida.append(det);
        }
      } catch {
        saida.textContent = tr('eco.detailsFail');
        b.disabled = false;
      }
    };
    bloco.append(b, saida);
    return bloco;
  }

  // ---- legend: groups with their tipos, each with its own icon, color, count and filter ----
  const legenda = $('eco-legend-list');
  const alternar = (faceta: 'grupo' | 'tipo', valor: string) => {
    const atual = new Set(estado.facetas[faceta] ?? []);
    if (atual.has(valor)) atual.delete(valor);
    else atual.add(valor);
    const facetas = { ...estado.facetas, [faceta]: atual } as Record<string, ReadonlySet<string>>;
    if (!atual.size) delete facetas[faceta];
    estado = { ...estado, facetas };
    aplicarFiltros();
    gravarHash('replace');
  };
  function montarLegenda(): void {
    legenda.replaceChildren();
    const presentes = [...new Set(modelo.tipos)];
    for (const g of GRUPOS) {
      if (g === 'hubs') continue;
      const tipos = presentes.filter((t) => grupoDe(t) === g).sort((a, b) => tipoRotulo(a).localeCompare(tipoRotulo(b), locale));
      if (!tipos.length) continue;
      const det = document.createElement('details');
      det.className = 'eco-legend-group';
      det.open = true;
      const sum = document.createElement('summary');
      const seta = document.createElement('span');
      seta.className = 'eco-chevron';
      seta.setAttribute('aria-hidden', 'true');
      sum.title = tr('eco.toggleGroup');
      const cabeca = document.createElement('button');
      cabeca.type = 'button';
      cabeca.className = 'eco-legend-item eco-legend-head';
      cabeca.dataset.grupo = g;
      cabeca.setAttribute('aria-pressed', 'false');
      const nome = document.createElement('span');
      nome.textContent = tr(`eco.group.${g}`);
      nome.style.color = COR_DO_GRUPO[g];
      const cont = document.createElement('span');
      cont.className = 'eco-legend-count';
      cont.dataset.cont = g;
      cabeca.append(nome, cont);
      cabeca.onclick = (e) => {
        e.preventDefault();
        alternar('grupo', g);
      };
      sum.append(seta, cabeca);
      const ul = document.createElement('ul');
      for (const t of tipos) {
        const li = document.createElement('li');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'eco-legend-item';
        b.dataset.tipo = t;
        b.setAttribute('aria-pressed', 'false');
        const n = document.createElement('span');
        n.textContent = tipoRotulo(t);
        const c = document.createElement('span');
        c.className = 'eco-legend-count';
        c.dataset.contTipo = t;
        b.append(icone(formaDe(t), corDe(t), 16), n, c);
        b.onclick = () => alternar('tipo', t);
        li.append(b);
        ul.append(li);
      }
      det.append(sum, ul);
      legenda.append(det);
    }
  }
  const grupos = () => [...legenda.querySelectorAll<HTMLDetailsElement>('details.eco-legend-group')];
  const alternarTodos = $<HTMLButtonElement>('eco-legend-toggle');
  alternarTodos.onclick = () => {
    const abrir = grupos().some((d) => !d.open);
    for (const d of grupos()) d.open = abrir;
    alternarTodos.textContent = abrir ? tr('eco.collapseAll') : tr('eco.expandAll');
  };
  legenda.addEventListener('toggle', () => (alternarTodos.textContent = grupos().every((d) => d.open) ? tr('eco.collapseAll') : tr('eco.expandAll')), true);
  function atualizarLegenda(): void {
    const porGrupo = contarFaceta(modelo.filtro, criterio(), 'grupo');
    const porTipo = contarFaceta(modelo.filtro, criterio(), 'tipo');
    for (const el of legenda.querySelectorAll<HTMLElement>('[data-cont]')) el.textContent = String(porGrupo.get(el.dataset.cont ?? '') ?? 0);
    for (const el of legenda.querySelectorAll<HTMLElement>('[data-cont-tipo]')) el.textContent = String(porTipo.get(el.dataset.contTipo ?? '') ?? 0);
    for (const b of legenda.querySelectorAll<HTMLButtonElement>('[data-grupo]')) b.setAttribute('aria-pressed', String(estado.facetas.grupo?.has(b.dataset.grupo ?? '') ?? false));
    for (const b of legenda.querySelectorAll<HTMLButtonElement>('[data-tipo]')) b.setAttribute('aria-pressed', String(estado.facetas.tipo?.has(b.dataset.tipo ?? '') ?? false));
  }

  // ---- toolbar ----
  const maisBtn = $<HTMLButtonElement>('eco-more');
  maisBtn.onclick = () => {
    const aberto = host.dataset.controles === 'aberto';
    if (aberto) delete host.dataset.controles;
    else host.dataset.controles = 'aberto';
    maisBtn.setAttribute('aria-expanded', String(!aberto));
  };
  const hubsBox = $<HTMLInputElement>('eco-hubs');
  hubsBox.checked = estado.hubs;
  hubsBox.onchange = () => {
    estado = { ...estado, hubs: hubsBox.checked };
    aplicarFiltros();
    gravarHash('replace');
  };
  const prof = $<HTMLSelectElement>('eco-depth');
  prof.value = String(estado.profundidade);
  prof.onchange = () => {
    estado = { ...estado, profundidade: prof.value === '2' ? 2 : 1 };
    if (estado.foco !== null) {
      const i = modelo.porId.get(estado.foco);
      if (i !== undefined) focarNo(i, { empilhar: false, animar: false });
    }
    gravarHash('replace');
  };
  const giro = $<HTMLInputElement>('eco-rotate');
  giro.onchange = () => renderer.definirRotacaoAutomatica(giro.checked);
  renderer.definirRotacaoAutomatica(giro.checked);
  $('eco-recenter').onclick = () => renderer.enquadrar(emFoco ? modelo.porId.get(estado.foco ?? '') ?? 'tudo' : 'tudo', { animar: true });
  $('eco-back').onclick = () => {
    const anterior = historico.pop();
    const i = anterior ? modelo.porId.get(anterior) : undefined;
    if (i !== undefined) {
      focarNo(i, { empilhar: false });
      gravarHash('push');
    }
  };
  $('eco-exit').onclick = () => sairDoFoco();
  $('eco-close').onclick = () => sairDoFoco();
  $('eco-clear').onclick = () => {
    estado = { ...estado, texto: '', facetas: {}, hubs: false, camadas: new Set(ESTADO_PADRAO.camadas) };
    busca.value = '';
    hubsBox.checked = false;
    aplicarFiltros();
    gravarHash('replace');
  };

  // ---- search ----
  const busca = $<HTMLInputElement>('eco-q');
  const resultados = $('eco-results');
  busca.value = estado.texto;
  function resultadosDaBusca(termo: string): number[] {
    const t = normalizar(termo);
    if (!t) return [];
    const achados: Array<{ i: number; r: number }> = [];
    for (let i = 0; i < total; i++) {
      if (modelo.hubDoNo[i] && !estado.hubs) continue;
      const n = modelo.filtro.texto[i];
      const p = n.indexOf(t);
      if (p < 0) continue;
      achados.push({ i, r: (p === 0 ? 0 : 1000) - modelo.grau[i] });
    }
    return achados.sort((a, b) => a.r - b.r).slice(0, 8).map((a) => a.i);
  }
  function mostrarResultados(): void {
    const lista = resultadosDaBusca(busca.value);
    resultados.replaceChildren();
    resultados.hidden = !busca.value.trim();
    if (!lista.length && busca.value.trim()) {
      const li = document.createElement('li');
      li.className = 'muted';
      li.textContent = tr('eco.search.none');
      resultados.append(li);
      return;
    }
    for (const i of lista) {
      const li = document.createElement('li');
      li.append(linkBotao(i, `${modelo.nomes[i]} · ${tipoRotulo(modelo.tipos[modelo.tipoDoNo[i]])}`));
      const b = li.querySelector('button')!;
      b.onclick = () => {
        resultados.hidden = true;
        busca.value = '';
        estado = { ...estado, texto: '' };
        aplicarFiltros();
        irPara(i);
      };
      resultados.append(li);
    }
  }
  resultados.onmousedown = (e) => e.preventDefault();
  busca.oninput = mostrarResultados;
  busca.onkeydown = (e) => {
    if (e.key === 'Enter') {
      const primeiro = resultados.querySelector<HTMLButtonElement>('button');
      if (primeiro) {
        e.preventDefault();
        primeiro.click();
      }
    } else if (e.key === 'ArrowDown') {
      resultados.querySelector<HTMLButtonElement>('button')?.focus();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      busca.value = '';
      mostrarResultados();
    }
  };

  // ---- keyboard ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && estado.foco !== null && document.activeElement !== busca) sairDoFoco();
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && (painel.contains(document.activeElement) || resultados.contains(document.activeElement))) {
      const escopo = resultados.contains(document.activeElement) ? resultados : painel;
      const botoes = [...escopo.querySelectorAll<HTMLButtonElement>('button.eco-chip')];
      const k = botoes.indexOf(document.activeElement as HTMLButtonElement);
      if (k >= 0) {
        botoes[(k + (e.key === 'ArrowDown' ? 1 : -1) + botoes.length) % botoes.length].focus();
        e.preventDefault();
      }
    }
  });

  // ---- hover tooltip ----
  const dica = $('eco-tip');
  renderer.aoPassarNo((i, tela) => {
    if (i === null) {
      dica.hidden = true;
      host.style.cursor = '';
      return;
    }
    dica.textContent = `${modelo.nomes[i]} · ${tipoRotulo(modelo.tipos[modelo.tipoDoNo[i]])}`;
    dica.style.transform = `translate(${tela.x + 14}px, ${tela.y + 14}px)`;
    dica.hidden = false;
    host.style.cursor = 'pointer';
  });
  renderer.aoClicarNo((i) => irPara(i));
  renderer.aoClicarFundo(() => {
    if (estado.foco !== null) sairDoFoco();
  });

  // ---- history (browser back restores focus, filters and camera) ----
  window.addEventListener('popstate', (e) => {
    const novo = ler(location.hash);
    estado = { ...novo, modo: 'ecossistema' };
    hubsBox.checked = estado.hubs;
    prof.value = String(estado.profundidade);
    busca.value = estado.texto;
    aplicarFiltros();
    const cam = (e.state as { camera?: CameraSalva } | null)?.camera;
    if (estado.foco) {
      const i = modelo.porId.get(estado.foco);
      if (i !== undefined) focarNo(i, { empilhar: false, animar: false, camera: cam });
    } else {
      emFoco = null;
      renderer.focar(null, { animar: false });
      $<HTMLElement>('eco-panel').hidden = true;
      $('eco-exit').hidden = true;
      if (cam) renderer.restaurarCamera(cam);
      else renderer.enquadrar('tudo', { animar: false });
    }
  });

  // ---- boot ----
  montarLegenda();
  alternarTodos.textContent = tr('eco.collapseAll');
  aplicarFiltros();
  if (estado.foco) {
    const i = modelo.porId.get(estado.foco);
    if (i !== undefined && visivel[i]) focarNo(i, { empilhar: false, animar: false });
    else {
      $('eco-notice').textContent = tr('eco.notFound', { id: estado.foco });
      $('eco-notice').hidden = false;
      estado = { ...estado, foco: null };
    }
  }
  $('eco-q').addEventListener('blur', () => setTimeout(() => (resultados.hidden = true), 150));
  void giro;
}
