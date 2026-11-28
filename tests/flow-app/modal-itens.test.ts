// SPDX-License-Identifier: MIT
// @vitest-environment jsdom
// Detail of the items a Nó cites (Requirements 6.5, 6.6, 6.8, 8.1 to 8.5, 8.7, 13.2) and the "Destacar no Diagrama" action (8.3, 8.4).
// jsdom has no layout: the tests read the DOM, the history and what the island hands to the Perspectiva.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ModeloDeGrafo } from '../../lib/schema/grafo';
import { planejarDestaque } from '../../site/src/flow-app/destaque';
import { EVENTO_ABRIR_NO } from '../../site/src/flow-app/interaction';
import { criarControlador, type ControladorDaIlha } from '../../site/src/flow-app/island';
import { carregarFatos, esquecerFatos, lerFatosDaPagina, type FatosDaPagina, type FluxoJson } from '../../site/src/flow-app/loader';
import { montarModal } from '../../site/src/flow-app/modal';
import { criarRenderizadorDeConteudo } from '../../site/src/flow-app/modal-conteudo';
import { PERSPECTIVAS, type EstadoDiagrama, type Renderizador } from '../../site/src/flow-app/renderer';
import { estadoVazio, lerEstado } from '../../site/src/flow-app/state';
import { CHAVES_DO_CLIENTE } from '../../site/src/render/flow';
import en from '../../site/src/i18n/en.json';
import pt from '../../site/src/i18n/pt-BR.json';

const sub = (id: string, rotulo: string, ordem: number) => ({ id, rotulo, ordem, condicional: false });
const no = (id: string, raia: string, ordem: number, extra: Record<string, unknown> = {}) => ({ id, tipo: 'tarefa', rotulo: `Nó ${id}`, raia, ordem, temPlaybook: true, subtarefas: [], ...extra });
const grafo = {
  versaoContrato: 1 as const,
  demanda: 'd',
  nomeDemanda: 'D',
  raias: [
    { id: 'a', nome: 'Raia A', cor: '#336699', ordem: 0, orquestradora: true },
    { id: 'b', nome: 'Raia B', cor: '#993366', ordem: 1, orquestradora: false },
    { id: 'c', nome: 'Raia C', cor: '#669933', ordem: 2, orquestradora: false },
  ],
  nos: [
    no('a_t1', 'a', 0, { subtarefas: [sub('a_t1_s1', 'Subtarefa 1', 0)] }),
    no('b_t1', 'b', 0, { subtarefas: [sub('b_t1_s1', 'Subtarefa de B', 0)] }),
    no('c_t1', 'c', 0),
  ],
  arestas: [],
} as unknown as ModeloDeGrafo;

const vazio = { R: [], A: [], C: [], I: [] };
const dado = (extra: Record<string, unknown>) => ({ tipo: 'artefato', nome: 'x', url: null, produzidoPor: [], consumidoPor: [], semProdutor: false, ...extra });
const fluxo = (extra: Partial<FluxoJson> = {}): FluxoJson =>
  ({
    id: 'd',
    locale: 'pt-BR',
    decisoes: [{ id: 'a_t1', tipo: 'tarefa', rotulo: 'Nó a_t1', raia: 'a', playbook: 'pb1' }],
    playbooks: [{ id: 'pb1', resumo: 'r', perguntas_chave: ['pq1'] }],
    papeis: [{ id: 'pm', nome: 'PM', url: '/p/pm/' }],
    nos: [
      { id: 'a_t1', tipo: 'tarefa', raia: 'a', raci: { ...vazio, R: ['pm'] }, entradas: [{ id: 'doc', tipo: 'artefato', url: '/a/doc/' }, { id: 'orfao', tipo: 'artefato', url: null }, { id: 'nivel', tipo: 'variavel', url: '/v/nivel/' }],
        saidas: [], tecnicas: [{ id: 'tec_x', nome: 'Técnica X', url: '/t/x/' }],
        subtarefas: [{ id: 'a_t1_s1', raci: vazio, entradas: [], saidas: [], tecnicas: [] }] },
      { id: 'b_t1', tipo: 'tarefa', raia: 'b', raci: { ...vazio, C: ['pm'] }, entradas: [], saidas: [], tecnicas: [{ id: 'tec_x', nome: 'Técnica X', url: '/t/x/' }],
        subtarefas: [{ id: 'b_t1_s1', raci: vazio, entradas: [], saidas: [], tecnicas: [] }] },
      { id: 'c_t1', tipo: 'tarefa', raia: 'c', raci: vazio, entradas: [], saidas: [], tecnicas: [], subtarefas: [] },
    ],
    dados: {
      doc: dado({ nome: 'Documento', url: '/a/doc/', tipoArtefato: 'documento', subtipo: 'prd', produzidoPor: ['b_t1_s1', 'rito_x', 'c', 'bug_t9', 'sumido'], consumidoPor: ['a_t1', 'b_t1'] }),
      orfao: dado({ nome: 'Órfão', url: null, produzidoPor: [], consumidoPor: ['a_t1'], semProdutor: true }),
      nivel: dado({ tipo: 'variavel', nome: 'Nível', url: '/v/nivel/', produzidoPor: ['b_t1'], consumidoPor: ['a_t1'] }),
    },
    perguntas: { pq1: { texto: 'Qual a pergunta?' } },
    ritos: { rito_x: { nome: 'Rito X', url: '/r/x/', nos: ['a_t1', 'a_t1_s1'] } },
    externos: { bug_t9: { nome: 'Tarefa do bug', url: '/b/t9/', tipo: 'tarefa' } },
    ...extra,
  }) as unknown as FluxoJson;

const t = (k: string, v: Record<string, string | number> = {}): string =>
  ((pt as Record<string, string>)[k] ?? k).replace(/\{(\w+)\}/g, (_m, n: string) => String(v[n]));
const tick = async (): Promise<void> => {
  for (let i = 0; i < 8; i++) await new Promise((r) => setTimeout(r, 0));
};
const dialogo = (): HTMLDialogElement => document.querySelector('dialog[data-flow-modal]') as HTMLDialogElement;
const secao = (chave: string): HTMLElement | null => dialogo().querySelector(`[data-flow-secao="${chave}"]`);
const botao = (texto: string, dentro: ParentNode = dialogo()): HTMLButtonElement =>
  [...dentro.querySelectorAll('button')].find((b) => b.textContent === texto) as HTMLButtonElement;

const PAGINA_ARTEFATO =
  '<html><body><article><header class="entity-head"><h1>Documento</h1><p class="lede">Registro <a href="/x/">escrito</a> da necessidade</p></header>' +
  '<dl class="facts"><dt>Tipo de artefato</dt><dd>documento</dd><dt>Exemplo</dt><dd>PRD do cupom de recompra</dd><dt>Tipo da variável</dt><dd>enum</dd></dl></article></body></html>';

let modal: ReturnType<typeof montarModal>;
const destacados: string[] = [];
const raiasAbertas: string[] = [];

async function montar(opcoes: { f?: FluxoJson; fatos?: (url: string) => Promise<FatosDaPagina>; semDestaque?: boolean } = {}): Promise<void> {
  document.body.innerHTML = '<main><div data-island="flow" data-flow-id="d"><div data-flow-stage tabindex="0"></div></div></main>';
  modal = montarModal({
    raiz: document.querySelector('[data-island="flow"]') as HTMLElement,
    grafo,
    t,
    gravar: () => {},
    recuar: () => {},
    renderizar: criarRenderizadorDeConteudo({
      carregar: () => Promise.resolve(opcoes.f ?? fluxo()),
      carregarFatos: opcoes.fatos ?? (async () => lerFatosDaPagina(PAGINA_ARTEFATO)),
    }),
    abrirRaia: (id) => raiasAbertas.push(id),
    destacarNo: opcoes.semDestaque ? undefined : (id) => destacados.push(id),
  });
}
const abrir = async (id: string): Promise<void> => {
  modal.abrir(id);
  await tick();
};
const pilha = (): string[] => modal.pilha().map((i) => `${i.tipo}:${i.id}`);

afterEach(() => {
  modal?.destruir();
  document.body.innerHTML = '';
  destacados.length = 0;
  raiasAbertas.length = 0;
  esquecerFatos();
});

describe('artefato e variável (Requirements 8.2, 8.5, 8.7, 13.2)', () => {
  beforeEach(() => montar());

  it('shows type, subtype, description, example, the canonical link and the title of the item', async () => {
    await abrir('a_t1');
    botao('Documento').click();
    await tick();
    expect(pilha()).toEqual(['no:a_t1', 'artefato:doc']);
    expect(dialogo().querySelector('h2')?.textContent).toBe('Documento');
    const meta = dialogo().querySelector('.flow-modal__meta')?.textContent ?? '';
    expect(meta).toContain('artefato');
    expect(meta).toContain('Tipo de artefatodocumento');
    expect(meta).toContain('Subtipoprd');
    expect(dialogo().querySelector('.flow-modal__descricao')?.textContent).toBe('Registro escrito da necessidade');
    expect(secao('exemplo')?.textContent).toContain('PRD do cupom de recompra');
    expect(dialogo().querySelector('[data-flow-conteudo] > a.flow-modal__pagina')?.getAttribute('href')).toBe('/a/doc/');
    expect(dialogo().querySelector('[data-sem-produtor]')).toBeNull();
  });

  it('shows the variable type read from its page, and no artefact type', async () => {
    await abrir('a_t1');
    botao('Nível').click();
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('Nível');
    expect(dialogo().querySelector('.flow-modal__fatos')?.textContent).toContain('enum');
    expect(dialogo().querySelector('.flow-modal__meta')?.textContent).not.toContain('Tipo de artefato');
  });

  it('lists producers and consumers, each one clickable by kind: Nó and Subtarefa (stack), rito (stack), Raia (opens the View), other Demanda (text and link)', async () => {
    await abrir('a_t1');
    botao('Documento').click();
    await tick();
    const prod = [...(secao('produtores')?.querySelectorAll('li') ?? [])];
    expect(prod).toHaveLength(5);
    expect(prod[0]?.querySelector('button[data-flow-item="no"]')?.textContent).toBe('Subtarefa de B');
    expect(prod[0]?.textContent).toContain('(Raia B)');
    expect(prod[1]?.querySelector('button[data-flow-item="rito"]')?.textContent).toBe('Rito X');
    expect(prod[2]?.textContent).toContain('Raia C');
    expect(prod[3]?.textContent).toContain('Tarefa do bug');
    expect(prod[3]?.querySelector('a')?.getAttribute('href')).toBe('/b/t9/');
    expect(prod[3]?.querySelector('button')).toBeNull(); // another Demanda: never offered for highlight
    expect(prod[4]?.textContent).toContain('sumido'); // unknown id: shown as text, never a button
    expect(prod[4]?.querySelector('button')).toBeNull();
    const cons = [...(secao('consumidores')?.querySelectorAll('li') ?? [])];
    expect(cons.map((l) => l.querySelector('button[data-flow-item]')?.textContent)).toEqual(['Nó a_t1', 'Nó b_t1']);
    // The lane producer opens its View through the host.
    (prod[2]?.querySelector('button[data-flow-abrir-raia]') as HTMLButtonElement).click();
    expect(raiasAbertas).toEqual(['c']);
  });

  it('pushes a producer on the stack, then Back returns to the artefact and to the Nó', async () => {
    await abrir('a_t1');
    botao('Documento').click();
    await tick();
    (secao('produtores')?.querySelector('button[data-flow-item="no"]') as HTMLButtonElement).click();
    await tick();
    expect(pilha()).toEqual(['no:a_t1', 'artefato:doc', 'no:b_t1_s1']);
    expect(dialogo().querySelector('h2')?.textContent).toBe('Subtarefa de B');
    const voltar = dialogo().querySelector('[data-flow-modal-voltar]') as HTMLButtonElement;
    voltar.click();
    await tick();
    expect(pilha()).toEqual(['no:a_t1', 'artefato:doc']);
    expect(dialogo().querySelector('h2')?.textContent).toBe('Documento');
    voltar.click();
    await tick();
    expect(pilha()).toEqual(['no:a_t1']);
    expect(voltar.hidden).toBe(true);
  });

  it('offers "Destacar no Diagrama" on each Nó listed and on the Nó content, with an accessible name', async () => {
    await abrir('a_t1');
    expect(secao('entradas')?.querySelector('[data-flow-destacar]')).toBeNull(); // entries are artefacts, not Nós
    expect(dialogo().querySelector('.flow-modal__acoes button[data-flow-destacar="a_t1"]')).not.toBeNull();
    botao('Documento').click();
    await tick();
    const d = secao('produtores')?.querySelector('button[data-flow-destacar]') as HTMLButtonElement;
    expect(d.dataset.flowDestacar).toBe('b_t1_s1');
    expect(d.getAttribute('aria-label')).toBe('Destacar Subtarefa de B no Diagrama e fechar o playbook');
    d.click();
    expect(destacados).toEqual(['b_t1_s1']);
  });

  it('shows the "sem produtor" warning and an empty producers list for an artefact nobody produces', async () => {
    await abrir('a_t1');
    botao('Órfão').click();
    await tick();
    expect(dialogo().querySelector('[data-sem-produtor]')?.textContent).toBe('sem produtor');
    expect(secao('produtores')?.querySelector('.muted')?.textContent).toBe('nenhum');
    expect(dialogo().querySelector('a.flow-modal__pagina')).toBeNull(); // no page: no link
  });

  it('keeps the detail when the canonical page cannot be read', async () => {
    await montar({ fatos: () => Promise.reject(new Error('offline')) });
    await abrir('a_t1');
    botao('Documento').click();
    await tick();
    expect(dialogo().querySelector('.flow-modal__fatos')?.getAttribute('data-fatos')).toBe('erro');
    expect(secao('produtores')).not.toBeNull();
    expect(dialogo().querySelector('.flow-modal__descricao')).toBeNull();
  });

  it('puts the text of the page in the DOM as text', async () => {
    await montar({ fatos: async () => ({ descricao: '<img src=x onerror="window.__x=1">', fatos: { Exemplo: '<script>1</script>' } }) });
    await abrir('a_t1');
    botao('Documento').click();
    await tick();
    expect(dialogo().querySelector('img, script')).toBeNull();
    expect(dialogo().querySelector('.flow-modal__descricao')?.textContent).toContain('<img');
  });

  it('omits the highlight action when the host gave no way to highlight', async () => {
    await montar({ semDestaque: true });
    await abrir('a_t1');
    expect(dialogo().querySelector('[data-flow-destacar]')).toBeNull();
  });
});

describe('papel, técnica, rito e pergunta (Requirements 6.5, 6.8)', () => {
  beforeEach(() => montar());

  it('papel: name as the title, where it acts with the RACI letters, and the canonical link', async () => {
    await abrir('a_t1');
    dialogo().querySelector<HTMLButtonElement>('button[data-flow-item="papel"]')?.click();
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('PM');
    const linhas = [...(secao('atua-em')?.querySelectorAll('li') ?? [])].map((l) => `${l.querySelector('abbr')?.textContent}:${l.querySelector('button')?.textContent}`);
    expect(linhas).toEqual(['R:Nó a_t1', 'C:Nó b_t1']);
    expect(dialogo().querySelector('a.flow-modal__pagina')?.getAttribute('href')).toBe('/p/pm/');
  });

  it('técnica: the Nós that use it and the canonical link', async () => {
    await abrir('a_t1');
    dialogo().querySelector<HTMLButtonElement>('button[data-flow-item="tecnica"]')?.click();
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('Técnica X');
    expect([...(secao('usada-em')?.querySelectorAll('button[data-flow-item]') ?? [])].map((b) => b.textContent)).toEqual(['Nó a_t1', 'Nó b_t1']);
    expect(dialogo().querySelector('a.flow-modal__pagina')?.getAttribute('href')).toBe('/t/x/');
  });

  it('rito: listed on the Nó that hosts it, opens with where it happens and the canonical link', async () => {
    await abrir('a_t1');
    expect(secao('ritos')?.textContent).toContain('Rito X');
    (secao('ritos')?.querySelector('button') as HTMLButtonElement).click();
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('Rito X');
    expect([...(secao('acontece-em')?.querySelectorAll<HTMLElement>('button[data-flow-item]') ?? [])].map((b) => b.dataset.id)).toEqual(['a_t1', 'a_t1_s1']);
    expect(dialogo().querySelector('a.flow-modal__pagina')?.getAttribute('href')).toBe('/r/x/');
    modal.fechar();
    await abrir('b_t1');
    expect(secao('ritos')).toBeNull();
    modal.fechar();
    await abrir('a_t1_s1');
    expect(secao('ritos')?.textContent).toContain('Rito X'); // a rito that happens in a Subtarefa shows on that Subtarefa
  });

  it('pergunta: the text as the title and the Nós whose playbook asks it; no canonical link (an anchor of the guide)', async () => {
    await abrir('a_t1');
    dialogo().querySelector<HTMLButtonElement>('button[data-flow-item="pergunta"]')?.click();
    await tick();
    expect(dialogo().querySelector('h2')?.textContent).toBe('Qual a pergunta?');
    expect([...(secao('citada-em')?.querySelectorAll<HTMLElement>('button[data-flow-item]') ?? [])].map((b) => b.dataset.id)).toEqual(['a_t1']);
    expect(dialogo().querySelector('a.flow-modal__pagina')).toBeNull();
  });

  it('a late answer does not rename the item the user has moved on from', async () => {
    const pendentes: Array<(f: FluxoJson) => void> = [];
    document.body.innerHTML = '<main><div data-island="flow" data-flow-id="d"><div data-flow-stage tabindex="0"></div></div></main>';
    let primeira = true;
    modal = montarModal({
      raiz: document.querySelector('[data-island="flow"]') as HTMLElement,
      grafo,
      t,
      gravar: () => {},
      recuar: () => {},
      renderizar: criarRenderizadorDeConteudo({ carregar: () => (primeira ? ((primeira = false), Promise.resolve(fluxo())) : new Promise<FluxoJson>((r) => pendentes.push(r))) }),
    });
    await abrir('a_t1');
    dialogo().querySelector<HTMLButtonElement>('button[data-flow-item="papel"]')?.click();
    modal.voltar();
    for (const r of pendentes) r(fluxo()); // the answer of the role arrives after the user is back on the Nó
    await tick();
    expect(pendentes.length).toBeGreaterThan(1);
    expect(dialogo().querySelector('h2')?.textContent).toBe('Nó a_t1');
  });
});

describe('loader das páginas canônicas', () => {
  it('reads the lede and the fact table, and fetches each page once', async () => {
    const fatos = lerFatosDaPagina(PAGINA_ARTEFATO);
    expect(fatos.descricao).toBe('Registro escrito da necessidade');
    expect(fatos.fatos).toMatchObject({ Exemplo: 'PRD do cupom de recompra', 'Tipo da variável': 'enum' });
    let chamadas = 0;
    const buscar = async () => ({ ok: true, status: 200, text: async () => (chamadas++, PAGINA_ARTEFATO) });
    const [a, b] = await Promise.all([carregarFatos('/a/doc/', buscar), carregarFatos('/a/doc/', buscar)]);
    expect(a).toBe(b);
    expect(chamadas).toBe(1);
    esquecerFatos();
    await expect(carregarFatos('/x/', async () => ({ ok: false, status: 404, text: async () => '' }))).rejects.toThrow('404');
    await expect(carregarFatos('/x/', buscar)).resolves.toBeTruthy(); // a failure is forgotten
  });
});

describe('planejarDestaque (Requirement 8.4)', () => {
  const estado = (hash: string) => lerEstado(hash, grafo);

  it('changes nothing when the View already draws the Nó', () => {
    expect(planejarDestaque(grafo, estado('#view=completo'), 'b_t1')).toEqual({ alvo: 'b_t1' });
    expect(planejarDestaque(grafo, estado('#exp=b'), 'b_t1')).toEqual({ alvo: 'b_t1' });
    expect(planejarDestaque(grafo, estado('#view=raia:b'), 'b_t1')).toEqual({ alvo: 'b_t1' });
  });

  it('expands the collapsed lane of the Nó in the Visão geral and keeps the others', () => {
    const plano = planejarDestaque(grafo, estado('#exp=a'), 'b_t1');
    expect(plano?.alvo).toBe('b_t1');
    expect([...(plano?.mudanca?.exp?.raias ?? [])].sort()).toEqual(['a', 'b']);
    expect(plano?.mudanca?.view).toBeUndefined();
  });

  it('switches to the View of the lane when the current lane View does not draw the Nó', () => {
    const plano = planejarDestaque(grafo, estado('#view=raia:a'), 'b_t1');
    expect(plano?.mudanca?.view).toBe('raia:b');
    expect(plano?.mudanca?.exp?.raias.size).toBe(0);
  });

  it('turns on the subtasks of the task for a Subtarefa, and falls back to the task in a lane View', () => {
    const geral = planejarDestaque(grafo, estadoVazio(), 'b_t1_s1');
    expect([...(geral?.mudanca?.exp?.raias ?? [])]).toEqual(['b']);
    expect([...(geral?.mudanca?.exp?.subtarefas ?? [])]).toEqual(['b_t1']);
    expect(geral?.alvo).toBe('b_t1_s1');
    expect(planejarDestaque(grafo, estado('#exp=b&sub=1'), 'b_t1_s1')).toEqual({ alvo: 'b_t1_s1' });
    const raia = planejarDestaque(grafo, estado('#view=raia:b'), 'b_t1_s1');
    expect(raia).toEqual({ alvo: 'b_t1' }); // a lane View has only the global subtasks toggle
  });

  it('ignores an id that is not in the graph', () => {
    expect(planejarDestaque(grafo, estadoVazio(), 'bug_t9')).toBeUndefined();
  });
});

describe('ilha: destacar no Diagrama (Requirements 8.3, 8.4)', () => {
  const original = PERSPECTIVAS.mermaid as Renderizador;
  let controlador: ControladorDaIlha;
  let estados: EstadoDiagrama[];
  let focos: string[];
  let rolagens: Element[];

  afterEach(() => {
    controlador?.destruir();
    PERSPECTIVAS.mermaid = original;
  });

  async function montarIlha(hash: string): Promise<void> {
    estados = [];
    focos = [];
    rolagens = [];
    window.history.replaceState(null, '', `/pt-BR/flows/d/${hash}`);
    Element.prototype.scrollIntoView = function (this: Element) {
      rolagens.push(this);
    };
    PERSPECTIVAS.mermaid = {
      perspectiva: 'mermaid',
      async montar(container, _g, estado) {
        const svg = document.createElement('div');
        container.appendChild(svg);
        const desenhar = (e: EstadoDiagrama) => {
          estados.push(e);
          svg.replaceChildren();
          if (e.noDestacado) {
            const alvo = document.createElement('div');
            alvo.setAttribute('data-id', e.noDestacado);
            alvo.setAttribute('data-destacado', 'true');
            svg.appendChild(alvo);
          }
        };
        desenhar(estado);
        return { async atualizar(e) { desenhar(e); }, focarNo(id) { focos.push(id); }, destruir() {} };
      },
    };
    document.body.innerHTML =
      '<main><article><div data-island="flow" data-flow-id="d" data-flow-base="" data-flow-locale="" data-flow-i18n="">' +
      '<div data-flow-controls hidden><select data-flow-select></select>' +
      '<div data-flow-tabs role="tablist"><button role="tab" id="t0" data-view="geral"></button><button role="tab" id="t1" data-view="raia:b"></button></div>' +
      '<div id="flow-panel" role="tabpanel" data-flow-stage tabindex="0"></div></div></div></article></main>';
    controlador = criarControlador(
      { carregarGrafo: async () => grafo, carregarFluxo: async () => fluxo(), carregarFatos: async () => lerFatosDaPagina(PAGINA_ARTEFATO), buscarPagina: async () => '', navegar: () => {} },
      window,
    );
    await controlador.montar(document.querySelector('[data-island="flow"]') as HTMLElement);
  }

  const abrirNo = async (id: string): Promise<void> => {
    document.querySelector('[data-flow-stage]')?.dispatchEvent(new CustomEvent(EVENTO_ABRIR_NO, { detail: { id }, bubbles: true }));
    await tick();
  };

  it('closes the modal, expands the lane of a producer in another lane, highlights, scrolls and focuses it, with one history step', async () => {
    await montarIlha('#exp=a');
    const entradas = window.history.length;
    await abrirNo('a_t1');
    botao('Documento').click();
    await tick();
    const d = secao('produtores')?.querySelector('button[data-flow-destacar="b_t1_s1"]') as HTMLButtonElement;
    expect(d).not.toBeNull();
    d.click();
    await tick();
    expect(dialogo().open).toBe(false);
    expect(document.querySelector('main')?.hasAttribute('inert')).toBe(false);
    const ultimo = estados[estados.length - 1] as EstadoDiagrama;
    expect([...ultimo.expandidas.raias].sort()).toEqual(['a', 'b']);
    expect([...ultimo.expandidas.subtarefas]).toEqual(['b_t1']);
    expect(ultimo.noDestacado).toBe('b_t1_s1');
    expect(ultimo.noSelecionado).toBeUndefined();
    expect(focos[focos.length - 1]).toBe('b_t1_s1');
    expect(rolagens.some((e) => e.getAttribute('data-destacado') === 'true')).toBe(true);
    expect(window.location.hash).not.toContain('no=');
    expect(window.location.hash).toContain('exp=');
    expect(window.history.length).toBe(entradas + 1); // the push of `no=` became the entry of the new state
  });

  it('highlights in place and undoes the `no=` entry when the View already draws the Nó', async () => {
    await montarIlha('#view=completo');
    const antes = window.location.hash;
    await abrirNo('a_t1');
    expect(window.location.hash).toContain('no=a_t1');
    (dialogo().querySelector('button[data-flow-destacar="a_t1"]') as HTMLButtonElement).click();
    await tick();
    await tick();
    expect(dialogo().open).toBe(false);
    expect(window.location.hash).toBe(antes);
    const ultimo = estados[estados.length - 1] as EstadoDiagrama;
    expect(ultimo.noDestacado).toBe('a_t1');
    expect(focos[focos.length - 1]).toBe('a_t1');
  });

  it('drops the highlight on the next redraw', async () => {
    await montarIlha('#view=completo');
    await abrirNo('a_t1');
    (dialogo().querySelector('button[data-flow-destacar="a_t1"]') as HTMLButtonElement).click();
    await tick();
    await tick();
    document.querySelector<HTMLElement>('[role="tab"][data-view="raia:b"]')?.click();
    await tick();
    expect((estados[estados.length - 1] as EstadoDiagrama).noDestacado).toBeUndefined();
  });
});

describe('textos da interface', () => {
  it('has every modal string, and the page strings the detail reads, in pt-BR and en, and the client receives them', () => {
    const usadas = CHAVES_DO_CLIENTE.filter((k) => k.startsWith('flow.modal.') || k.startsWith('f.'));
    for (const k of ['flow.modal.destacar', 'flow.modal.produtores', 'flow.modal.consumidores', 'flow.modal.ritos', 'f.exemplo', 'f.variavel_tipo']) expect(usadas).toContain(k);
    for (const k of usadas) {
      expect((pt as Record<string, string>)[k], `pt-BR ${k}`).toBeTruthy();
      expect((en as Record<string, string>)[k], `en ${k}`).toBeTruthy();
    }
  });
});
