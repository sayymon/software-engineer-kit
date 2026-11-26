// SPDX-License-Identifier: MIT
// Spike S5. Modelo_de_Grafo + Conjunto_Expandido -> dagre input (nodes with estimated sizes, clusters, edges).
// Text is measured by a character-count estimate: a Worker has no DOM to measure text, and measuring in the main thread
// would add a layout pass per node. The estimate is one of the fidelity gaps recorded in docs/spike-fluxos/s5.json.
import { projetar } from '../../../../lib/flow-graph/expansao';
import type { ConjuntoExpandido } from '../../../../lib/flow-graph/expansao';
import type { ModeloDeGrafo } from '../../../../lib/schema/grafo';
import { clarear, corTexto, escurecer } from './cor';
import type { ArestaLayout, ClusterLayout, EntradaLayout, Forma, Linha, NoLayout } from './tipos';

const PX_POR_CHAR: Record<Linha['k'], number> = { id: 6.4, txt: 7.4, it: 7.2, neg: 8 };
const ALTURA: Record<Linha['k'], number> = { id: 13, txt: 17, it: 16, neg: 18 };
const LIMITE_LINHA = 30;
const LIMITE_GATEWAY = 20;

/** Breaks text into lines of at most `limite` characters without splitting words. */
function quebrar(texto: string, limite: number): string[] {
  const linhas: string[] = [];
  let atual = '';
  for (const p of texto.split(/\s+/).filter(Boolean)) {
    if (atual && atual.length + 1 + p.length > limite) {
      linhas.push(atual);
      atual = p;
    } else atual = atual ? `${atual} ${p}` : p;
  }
  if (atual) linhas.push(atual);
  return linhas.length ? linhas : [''];
}

function medir(linhas: Linha[]): { w: number; h: number } {
  let w = 0;
  let h = 0;
  for (const l of linhas) {
    w = Math.max(w, l.t.length * PX_POR_CHAR[l.k]);
    h += ALTURA[l.k];
  }
  return { w, h };
}

const plural = (n: number, s: string, p: string) => `${n} ${n === 1 ? s : p}`;

export function montarEntrada(grafo: ModeloDeGrafo, conj: ConjuntoExpandido): EntradaLayout {
  const v = projetar(grafo, conj);
  const corDaRaia = new Map(grafo.raias.map((r) => [r.id, r.cor]));
  const nomeDaRaia = new Map(grafo.raias.map((r) => [r.id, r.nome]));
  const subtarefasOriginais = new Map(grafo.nos.map((n) => [n.id, n.subtarefas.length]));
  const nos: NoLayout[] = [];
  const clusters: ClusterLayout[] = [];
  const arestas: ArestaLayout[] = [];

  const raiasComNos = new Set(v.nos.map((n) => n.raia));
  for (const r of grafo.raias) {
    if (!conj.raias.has(r.id) || !raiasComNos.has(r.id)) continue;
    clusters.push({ id: `raia:${r.id}`, titulo: r.nome, fundo: clarear(r.cor, 0.85), borda: r.cor, larg: 3, tracejado: false });
  }

  const caixa = (id: string, forma: Forma, linhas: Linha[], fundo: string, borda: string, larg: number, pai?: string, tracejado = false): NoLayout => {
    const { w, h } = medir(linhas);
    let largura = w + 24;
    let altura = h + 16;
    if (forma === 'gateway') {
      largura = w * 1.7 + 24;
      altura = h * 1.7 + 16;
    } else if (forma === 'inicio' || forma === 'fim') largura += altura / 2;
    else if (forma === 'ponte') largura += 20;
    return { id, forma, linhas, w: Math.round(largura), h: Math.round(altura), fundo, borda, larg, tracejado, texto: corTexto(fundo), pai };
  };

  const saidaDe = new Map<string, string>();
  for (const n of v.nos) {
    const raiaCor = corDaRaia.get(n.raia) ?? '#CCCCCC';
    const paiRaia = `raia:${n.raia}`;
    const temSub = n.subtarefas.length > 0;
    const forma: Forma = n.tipo === 'inicio' ? 'inicio' : n.tipo === 'fim' ? 'fim' : n.tipo === 'bifurcacao' ? 'gateway' : n.tipo === 'chamada' ? 'chamada' : 'tarefa';
    const corpo = quebrar(n.rotulo, forma === 'gateway' ? LIMITE_GATEWAY : LIMITE_LINHA);
    const linhas: Linha[] = [{ t: n.id, k: 'id' }, ...corpo.map((t) => ({ t, k: 'txt' as const }))];
    const nSub = temSub ? 0 : (subtarefasOriginais.get(n.id) ?? 0);
    if (nSub) linhas.push({ t: `▸ ${plural(nSub, 'subtarefa', 'subtarefas')}`, k: 'it' });
    if (n.tipo === 'fim' && n.retorno) linhas.push({ t: `retorno: ${n.retorno}`, k: 'it' });
    let pai = paiRaia;
    if (temSub) {
      pai = `ts:${n.id}`;
      clusters.push({ id: pai, titulo: n.rotulo, fundo: clarear(raiaCor, 0.94), borda: escurecer(raiaCor, 0.3), larg: 1.5, tracejado: true, pai: paiRaia });
    }
    const chamadora = n.tipo === 'chamada' && n.raiaChamada ? corDaRaia.get(n.raiaChamada) : undefined;
    nos.push(
      chamadora
        ? caixa(n.id, forma, linhas, chamadora, raiaCor, 4, pai)
        : caixa(n.id, forma, linhas, raiaCor, escurecer(raiaCor, 0.4), 1, pai),
    );
    if (temSub) {
      let ultima = n.id;
      for (const s of n.subtarefas) {
        const selo = s.papelNome ?? s.papel ?? s.responsavel ?? '';
        const sl: Linha[] = [{ t: s.id, k: 'id' }, ...quebrar((s.condicional ? '◆ ' : '') + s.rotulo, LIMITE_LINHA).map((t) => ({ t, k: 'txt' as const }))];
        if (selo) sl.push({ t: String(selo), k: 'it' });
        nos.push(caixa(s.id, 'sub', sl, clarear(raiaCor, 0.55), escurecer(raiaCor, 0.4), s.condicional ? 2 : 1, pai, s.condicional));
        arestas.push({ id: arestas.length, v: ultima, w: s.id, rotulo: '', tracejada: false, lw: 0, lh: 0 });
        ultima = s.id;
      }
      saidaDe.set(n.id, ultima);
    }
    (grafo.nos.find((g) => g.id === n.id)?.ligacoes ?? []).forEach((lig, i) => {
      const pid = `lig:${n.id}:${i}`;
      const linhasPonte: Linha[] = [
        { t: lig.rotulo, k: 'neg' },
        { t: `demanda: ${lig.demandaDestino}`, k: 'txt' },
        { t: `nó: ${lig.para}`, k: 'txt' },
      ];
      nos.push(caixa(pid, 'ponte', linhasPonte, '#FFFFFF', '#555555', 2, undefined, true));
      arestas.push({ id: arestas.length, v: saidaDe.get(n.id) ?? n.id, w: pid, rotulo: lig.tipo, tracejada: true, lw: lig.tipo.length * 6.5 + 8, lh: 16 });
    });
  }

  for (const c of v.clusters) {
    const cor = corDaRaia.get(c.raia) ?? '#CCCCCC';
    const t = c.totais;
    const linhas: Linha[] = [
      { t: nomeDaRaia.get(c.raia) ?? c.raia, k: 'neg' },
      { t: `${plural(t.tarefas, 'tarefa', 'tarefas')}, ${plural(t.gateways, 'gateway', 'gateways')}, ${plural(t.subtarefas, 'subtarefa', 'subtarefas')}`, k: 'txt' },
    ];
    nos.push(caixa(`cluster:${c.raia}`, 'raia', linhas, cor, escurecer(cor, 0.4), 1));
  }

  for (const a of v.arestas) {
    const rot = a.rotulo.trim();
    arestas.push({
      id: arestas.length,
      v: saidaDe.get(a.origem) ?? a.origem,
      w: a.destino,
      rotulo: rot,
      tracejada: a.tracejada,
      lw: rot ? Math.round(rot.length * 6.5 + 8) : 0,
      lh: rot ? 16 : 0,
    });
  }
  // Order matters to dagre only through insertion: parents (clusters) are declared before their children by the worker.
  return { nos, clusters, arestas };
}
