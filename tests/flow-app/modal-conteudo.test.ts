// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Content of the Modal_de_Playbook per Nó type (Requirements 6.1 to 6.4, 4.1, 4.2, 8.5, 8.6, 8.7, 6.12). jsdom has no layout: the tests read the DOM.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { EVENTO_ABRIR_NO } from '../../site/src/flow-app/interaction';
import { esquecerFluxos, carregarFluxo, type FluxoJson } from '../../site/src/flow-app/loader';
import { semWikilinks, criarRenderizadorDeConteudo } from '../../site/src/flow-app/modal-conteudo';
import { montarModal } from '../../site/src/flow-app/modal';
import { PERSPECTIVAS, type Renderizador } from '../../site/src/flow-app/renderer';
import { CHAVES_DO_CLIENTE } from '../../site/src/render/flow';
import pt from '../../site/src/i18n/pt-BR.json';
import en from '../../site/src/i18n/en.json';

const base = { versaoContrato: 1 as const, demanda: 'd', nomeDemanda: 'D' };
const grafo = {
  ...base,
  raias: [
    { id: 'a', nome: 'Raia A', cor: '#336699', ordem: 0, orquestradora: true },
    { id: 'b', nome: 'Raia B', cor: '#993366', ordem: 1, orquestradora: false },
  ],
  nos: [
    { id: 'a_t1', tipo: 'tarefa', rotulo: 'Registrar', raia: 'a', ordem: 0, temPlaybook: true,
      subtarefas: [
        { id: 'a_t1_s1', rotulo: 'Abrir o registro', ordem: 0, condicional: false, papel: 'pm' },
        { id: 'a_t1_s2', rotulo: 'Escolher o formato', ordem: 1, condicional: true, quando: 'o time é de [[plataforma|plataforma]]', papel: 'pm' },
        { id: 'a_t1_s3', rotulo: 'Sem condição escrita', ordem: 2, condicional: true },
      ] },
    { id: 'a_g1', tipo: 'bifurcacao', rotulo: 'Já existe?', raia: 'a', ordem: 1, temPlaybook: true, subtarefas: [] },
    { id: 'a_c1', tipo: 'chamada', rotulo: 'Entender', raia: 'a', ordem: 2, raiaChamada: 'b', temPlaybook: true, subtarefas: [] },
    { id: 'b_t1', tipo: 'tarefa', rotulo: 'Tarefa B', raia: 'b', ordem: 0, temPlaybook: false, subtarefas: [] },
    { id: 'b_f1', tipo: 'fim', rotulo: 'Fim B', raia: 'b', ordem: 1, retorno: 'Entendimento validado', temPlaybook: false, subtarefas: [] },
    { id: 'b_f2', tipo: 'fim', rotulo: 'Fim B2', raia: 'b', ordem: 2, retorno: 'Fora de escopo', temPlaybook: false, subtarefas: [] },
  ],
  arestas: [],
} as unknown as ModeloDeGrafo;

const vazio = { R: [], A: [], C: [], I: [] };
const fluxo = (extra: Partial<FluxoJson> = {}): FluxoJson =>
  ({
    id: 'd',
    locale: 'pt-BR',
    fallback: false,
    decisoes: [
      { id: 'a_t1', tipo: 'tarefa', rotulo: 'Registrar', raia: 'a', playbook: 'pb_t1' },
      { id: 'a_g1', tipo: 'bifurcacao', rotulo: 'Já existe?', raia: 'a', condicao: 'Já existe solução que atende?', papel: 'arquiteto',
        proximo: [{ para: 'b_t1', condicao: 'atende por completo' }, { para: 'b_f1', condicao: 'atende em parte' }], playbook: 'pb_g1' },
      { id: 'a_c1', tipo: 'chamada', rotulo: 'Entender', raia: 'a', playbook: 'pb_c1', proximo: [] },
    ],
    playbooks: [
      { id: 'pb_t1', resumo: 'Registre a [[necessidade|necessidade]] <b>agora</b>', fazer: ['Registre a origem', 'Classifique'], evitar: ['Escrever um documento longo'], perguntas_chave: ['pq_2', 'pq_1'] },
      { id: 'pb_g1', resumo: 'Se atende por completo, termina.', perguntas_chave: ['pq_1'] },
      { id: 'pb_c1', resumo: 'Chama a raia B.' },
    ],
    papeis: [{ id: 'pm', nome: 'PM', url: '/p/pm/' }, { id: 'arquiteto', nome: 'Arquiteto', url: '/p/arq/' }, { id: 'tech_lead', nome: 'Tech Lead', url: null }],
    nos: [
      { id: 'a_t1', tipo: 'tarefa', raia: 'a', raci: { R: ['pm'], A: ['arquiteto'], C: ['tech_lead', 'pm'], I: [] },
        entradas: [{ id: 'registro', tipo: 'artefato', url: '/a/registro/' }, { id: 'nivel', tipo: 'variavel', url: null }],
        saidas: [{ id: 'mapa', tipo: 'artefato', url: null }],
        tecnicas: [{ id: 'tec_adrs', nome: 'ADRs', url: '/t/adrs/', uso: 'recomendada' }],
        subtarefas: [
          { id: 'a_t1_s1', raci: { ...vazio, R: ['pm'] }, entradas: [], saidas: [{ id: 'mapa', tipo: 'artefato', url: null }], tecnicas: [] },
          { id: 'a_t1_s2', raci: { ...vazio, R: ['pm'], C: ['tech_lead'] }, entradas: [{ id: 'registro', tipo: 'artefato', url: null }], saidas: [], tecnicas: [{ id: 'tec_adrs', nome: 'ADRs', url: null }] },
        ] },
      { id: 'a_g1', tipo: 'bifurcacao', raia: 'a', raci: { R: ['arquiteto'], A: [], C: [], I: [] }, entradas: [{ id: 'registro', tipo: 'artefato', url: null }], saidas: [], tecnicas: [], subtarefas: [] },
      { id: 'a_c1', tipo: 'chamada', raia: 'a', raci: vazio, entradas: [], saidas: [], tecnicas: [], subtarefas: [] },
    ],
    dados: {
      registro: { tipo: 'artefato', nome: 'Registro da necessidade', url: '/a/registro/', tipoArtefato: 'documento', subtipo: 'prd', produzidoPor: [], consumidoPor: ['a_t1'], semProdutor: true },
      nivel: { tipo: 'variavel', nome: 'Nível de incerteza', url: null, produzidoPor: ['x'], consumidoPor: [], semProdutor: false },
      mapa: { tipo: 'artefato', nome: 'Mapa', url: null, produzidoPor: ['a_t1'], consumidoPor: [], semProdutor: false },
    },
    perguntas: { pq_1: { texto: '"Segunda no guia?"' }, pq_2: { texto: 'Primeira no guia?' } },
    ...extra,
  }) as unknown as FluxoJson;

const t = (k: string, v: Record<string, string | number> = {}): string => (pt as Record<string, string>)[k]?.replace(/\{(\w+)\}/g, (_m, n: string) => String(v[n])) ?? k;
const tick = async (): Promise<void> => {
  for (let i = 0; i < 6; i++) await new Promise((r) => setTimeout(r, 0));
};
const dialogo = (): HTMLDialogElement => document.querySelector('dialog[data-flow-modal]') as HTMLDialogElement;
const secao = (chave: string): HTMLElement | null => dialogo().querySelector(`[data-flow-secao="${chave}"]`);
const itens = (chave: string): string[] => [...(secao(chave)?.querySelectorAll('li') ?? [])].map((l) => l.textContent ?? '');
const botoes = (chave: string): string[] => [...(secao(chave)?.querySelectorAll('button[data-flow-item]') ?? [])].map((b) => b.textContent ?? '');

let modal: ReturnType<typeof montarModal>;
const abrirRaias: string[] = [];

async function montar(f: FluxoJson | Promise<FluxoJson> = fluxo(), comAbrirRaia = true): Promise<void> {
  document.body.innerHTML = '<main><div data-island="flow" data-flow-id="d"><div data-flow-stage tabindex="0"></div></div></main>';
  modal = montarModal({
    raiz: document.querySelector('[data-island="flow"]') as HTMLElement,
    grafo,
    t,
    gravar: () => {},
    recuar: () => {},
    renderizar: criarRenderizadorDeConteudo({ carregar: () => Promise.resolve(f) }),
    abrirRaia: comAbrirRaia ? (id) => abrirRaias.push(id) : undefined,
  });
}
const abrir = async (id: string): Promise<void> => {
  modal.abrir(id);
  await tick();
};

afterEach(() => {
  modal?.destruir();
  document.body.innerHTML = '';
  abrirRaias.length = 0;
  esquecerFluxos();
});

describe('tarefa (Requirement 6.1)', () => {
  beforeEach(() => montar());

  it('shows name, type, Raia, summary, Fazer, Evitar, key questions in guide order, inputs, outputs, techniques and roles with the RACI letter', async () => {
    await abrir('a_t1');
    expect(dialogo().querySelector('h2')?.textContent).toBe('Registrar');
    const meta = dialogo().querySelector('.flow-modal__meta')?.textContent ?? '';
    expect(meta).toContain('tarefa');
    expect(meta).toContain('Raia A');
    expect(secao('resumo')?.textContent).toContain('Registre a necessidade <b>agora</b>'); // wikilink reduced to its label, markup kept as text
    expect(secao('resumo')?.querySelector('b')).toBeNull();
    expect(itens('fazer')).toEqual(['Registre a origem', 'Classifique']);
    expect(itens('evitar')).toEqual(['Escrever um documento longo']);
    expect(botoes('perguntas')).toEqual(['Primeira no guia?', 'Segunda no guia?']); // pq_2 then pq_1, as the playbook lists them
    expect(botoes('entradas')).toEqual(['Registro da necessidade', 'Nível de incerteza']);
    expect(botoes('saidas')).toEqual(['Mapa']);
    expect(botoes('tecnicas')).toEqual(['ADRs']);
    const papeis = [...(secao('papeis')?.querySelectorAll('li') ?? [])].map((li) => [[...li.querySelectorAll('abbr')].map((a) => a.textContent).join(''), li.querySelector('button')?.textContent]);
    expect(papeis).toEqual([['RC', 'PM'], ['A', 'Arquiteto'], ['C', 'Tech Lead']]); // one line per role, letters in R A C I order
  });

  it('distinguishes artefact from variable, shows type and subtype, and warns "sem produtor" only on inputs without a producer', async () => {
    await abrir('a_t1');
    const entradas = secao('entradas') as HTMLElement;
    const [registro, nivel] = [...entradas.querySelectorAll('li')];
    expect(registro?.textContent).toContain('artefato · documento · prd');
    expect(registro?.querySelector('[data-sem-produtor]')?.textContent).toBe('sem produtor');
    expect(nivel?.textContent).toContain('variável');
    expect(nivel?.querySelector('[data-sem-produtor]')).toBeNull();
    expect(secao('saidas')?.querySelector('[data-sem-produtor]')).toBeNull();
  });

  it('puts guide text in the DOM as text, never as markup', async () => {
    await montar(fluxo({ playbooks: [{ id: 'pb_t1', resumo: '<img src=x onerror="window.__x=1">', fazer: ['<script>1</script>'] }] as never }));
    await abrir('a_t1');
    expect(dialogo().querySelector('img, script')).toBeNull();
    expect(secao('resumo')?.textContent).toContain('<img');
  });

  it('turns a related item into a button that pushes it on the history', async () => {
    await abrir('a_t1');
    (secao('papeis')?.querySelector('button') as HTMLButtonElement).click();
    expect(modal.pilha().map((i) => `${i.tipo}:${i.id}`)).toEqual(['no:a_t1', 'papel:pm']);
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('PM'); // the heading takes the name of the item once the content loads
    expect(dialogo().querySelector('a.flow-modal__pagina')?.getAttribute('href')).toBe('/p/pm/');
  });
});

describe('gateway (Requirement 6.2)', () => {
  beforeEach(() => montar());

  it('shows the decision question, the outcomes with their condition and the deciding role', async () => {
    await abrir('a_g1');
    expect(dialogo().querySelector('h2')?.textContent).toBe('Já existe?');
    expect(dialogo().querySelector('.flow-modal__meta')?.textContent).toContain('gateway');
    expect(secao('pergunta')?.textContent).toContain('Já existe solução que atende?');
    expect(itens('saidas-condicao')).toEqual(['atende por completo → Tarefa B', 'atende em parte → Fim B']);
    expect(secao('decide')?.textContent).toBe('Quem decideArquiteto');
    expect(secao('papeis')).toBeNull(); // the gateway shows who decides, not the task RACI list
  });
});

describe('Subtarefa (Requirement 6.3)', () => {
  beforeEach(() => montar());

  it('shows "Executar quando" for a conditional Subtarefa and the task it belongs to', async () => {
    await abrir('a_t1_s2');
    expect(dialogo().querySelector('h2')?.textContent).toBe('Escolher o formato');
    expect(dialogo().querySelector('.flow-modal__meta')?.textContent).toContain('subtarefa condicional');
    expect(dialogo().querySelector('.flow-modal__meta button')?.textContent).toBe('Registrar');
    expect(secao('executar-quando')?.querySelector('h3')?.textContent).toBe('Executar quando');
    expect(secao('executar-quando')?.querySelector('p')?.textContent).toBe('o time é de plataforma');
    expect(botoes('tecnicas')).toEqual(['ADRs']);
    expect(secao('papeis')?.textContent).toContain('Tech Lead');
  });

  it('omits "Executar quando" on a plain Subtarefa and says so when the condition is missing', async () => {
    await abrir('a_t1_s1');
    expect(secao('executar-quando')).toBeNull();
    expect(dialogo().querySelector('.flow-modal__meta')?.textContent).not.toContain('condicional');
    modal.fechar();
    await abrir('a_t1_s3');
    expect(secao('executar-quando')?.querySelector('p')?.textContent).toBe('condição não informada');
  });
});

describe('chamada de Raia (Requirements 6.4, 4.1)', () => {
  it('shows the called Raia, its returns and a button that opens the View', async () => {
    await montar();
    await abrir('a_c1');
    expect(secao('raia-chamada')?.querySelector('.flow-modal__raia-chamada')?.textContent).toBe('Raia B');
    expect(itens('retornos')).toEqual(['Entendimento validado', 'Fora de escopo']);
    const b = dialogo().querySelector('button[data-flow-abrir-raia]') as HTMLButtonElement;
    expect(b.dataset.flowAbrirRaia).toBe('b');
    expect(b.getAttribute('aria-label')).toBe('Abrir a raia Raia B e fechar o playbook');
    b.click();
    expect(abrirRaias).toEqual(['b']);
  });

  it('shows no button when the host gave no way to open a View', async () => {
    await montar(fluxo(), false);
    await abrir('a_c1');
    expect(dialogo().querySelector('button[data-flow-abrir-raia]')).toBeNull();
    expect(secao('raia-chamada')).not.toBeNull();
  });
});

describe('carga e idioma (Requirement 6.12)', () => {
  it('shows a loading state, then the content', async () => {
    let liberar: (f: FluxoJson) => void = () => {};
    await montar(new Promise<FluxoJson>((r) => (liberar = r)));
    modal.abrir('a_t1');
    expect(dialogo().querySelector('[role="status"]')?.textContent).toBe('Carregando o playbook…');
    expect(dialogo().querySelector('[data-flow-conteudo]')?.getAttribute('aria-busy')).toBe('true');
    liberar(fluxo());
    await tick();
    expect(dialogo().querySelector('[role="status"]')).toBeNull();
    expect(secao('resumo')).not.toBeNull();
  });

  it('shows the visible fallback marker only when the locale serves the pt-BR text', async () => {
    await montar(fluxo({ fallback: true }));
    await abrir('a_t1');
    expect(dialogo().querySelector('[data-fallback="true"]')?.textContent).toBe(t('flow.modal.fallback'));
    modal.destruir();
    await montar(fluxo({ fallback: false }));
    await abrir('a_t1');
    expect(dialogo().querySelector('[data-fallback]')).toBeNull();
  });

  it('reports a failed load and retries with the button', async () => {
    let falhar = true;
    document.body.innerHTML = '<main><div data-island="flow" data-flow-id="d"><div data-flow-stage tabindex="0"></div></div></main>';
    modal = montarModal({
      raiz: document.querySelector('[data-island="flow"]') as HTMLElement,
      grafo,
      t,
      gravar: () => {},
      recuar: () => {},
      renderizar: criarRenderizadorDeConteudo({ carregar: () => (falhar ? Promise.reject(new Error('x')) : Promise.resolve(fluxo())) }),
    });
    await abrir('a_t1');
    expect(dialogo().querySelector('[role="alert"]')?.textContent).toContain('Não foi possível carregar');
    falhar = false;
    (dialogo().querySelector('[data-flow-modal-tentar]') as HTMLButtonElement).click();
    await tick();
    expect(secao('resumo')).not.toBeNull();
    expect(dialogo().contains(document.activeElement)).toBe(true);
  });

  it('has every UI string in pt-BR and en, and the client receives them', () => {
    const usadas = CHAVES_DO_CLIENTE.filter((k) => k.startsWith('flow.modal.') || k.startsWith('flow.legend.subtarefa'));
    expect(usadas.length).toBeGreaterThan(30);
    for (const k of usadas) {
      expect((pt as Record<string, string>)[k], `pt-BR ${k}`).toBeTruthy();
      expect((en as Record<string, string>)[k], `en ${k}`).toBeTruthy();
    }
  });
});

describe('semWikilinks', () => {
  it('keeps the label, or the id, and drops anchors', () => {
    expect(semWikilinks('a [[x|rótulo]] b [[y]] c [[z#ancora|outro]]')).toBe('a rótulo b y c outro');
  });
});

describe('loader do conteúdo', () => {
  it('fetches api/flows/<id>.json once and forgets a failure', async () => {
    let chamadas = 0;
    const buscar = async () => ({ ok: true, status: 200, json: async () => (chamadas++, fluxo()) });
    const [a, b] = await Promise.all([carregarFluxo('d', '/kit/pt-BR', buscar), carregarFluxo('d', '/kit/pt-BR', buscar)]);
    expect(a).toBe(b);
    expect(chamadas).toBe(1);
    esquecerFluxos();
    await expect(carregarFluxo('d', '', async () => ({ ok: false, status: 404, json: async () => ({}) }))).rejects.toThrow('404');
    await expect(carregarFluxo('d', '', async () => ({ ok: true, status: 200, json: async () => fluxo() }))).resolves.toBeTruthy();
  });
});

describe('ilha: botão de abrir a raia chamada (Requirement 4.2)', () => {
  const original = PERSPECTIVAS.mermaid as Renderizador;
  let controlador: ControladorDaIlha;
  afterEach(() => {
    controlador?.destruir();
    PERSPECTIVAS.mermaid = original;
  });

  it('closes the modal, replaces the no= entry by the View of the called Raia and selects its tab', async () => {
    window.history.replaceState(null, '', '/pt-BR/flows/d/');
    PERSPECTIVAS.mermaid = {
      perspectiva: 'mermaid',
      async montar(container) {
        container.innerHTML = '<svg width="400" viewBox="0 0 400 200"></svg>';
        return { async atualizar() {}, focarNo() {}, destruir() {} };
      },
    };
    document.body.innerHTML =
      '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="" data-flow-i18n="">' +
      '<div data-flow-controls hidden><select data-flow-select></select>' +
      '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t2" data-view="raia:b"></button></div>' +
      '<div id="flow-panel" role="tabpanel" data-flow-stage tabindex="0"></div></div></div></article></main>';
    controlador = criarControlador({ carregarGrafo: async () => grafo, carregarFluxo: async () => fluxo(), buscarPagina: async () => '', navegar: () => {} }, window);
    await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
    const entradas = window.history.length;
    document.querySelector('[data-flow-stage]')?.dispatchEvent(new CustomEvent(EVENTO_ABRIR_NO, { detail: { id: 'a_c1' }, bubbles: true }));
    expect(window.location.hash).toBe('#no=a_c1');
    await tick();
    const b = dialogo().querySelector('button[data-flow-abrir-raia]') as HTMLButtonElement;
    expect(b).not.toBeNull();
    b.click();
    await tick();
    expect(dialogo().open).toBe(false);
    expect(window.location.hash).toBe('#view=raia:b');
    expect(window.history.length).toBe(entradas + 1); // the push of `no=` is the only entry added: no duplicate step
    expect(document.getElementById('t2')?.getAttribute('aria-selected')).toBe('true');
    expect(document.querySelector('main')?.hasAttribute('inert')).toBe(false);
  });
});
