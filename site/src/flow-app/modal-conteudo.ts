// SPDX-License-Identifier: MIT
// Content of the Modal_de_Playbook per Nó type (Requirements 6.1, 6.2, 6.3, 6.4, 4.1, 4.2, 8.1, 8.5, 8.6, 8.7, 6.12).
//  - tarefa: name, type, Raia, summary, Fazer, Evitar, key questions (guide order), inputs, outputs, techniques, roles with the RACI letter;
//  - bifurcacao (gateway): decision question, exits with their condition, the role that decides;
//  - Subtarefa: the same items of the task, plus "Executar quando" when it is conditional;
//  - chamada: the called Raia, its possible returns and a button that opens the View of that Raia.
// The text comes from `api/flows/<id>.json`, fetched on the first opening (loader.ts); the shell shows a loading state meanwhile.
// Every guide string reaches the DOM through `textContent`, never `innerHTML`.
// Related items (role, technique, artefact, variable, rito, key question) are buttons wired to `ctx.abrirItem`; their detail (modal-itens.ts)
// is pushed on the Historico_do_Modal. Each Nó also offers "Destacar no Diagrama" (Requirement 8.3).
import type { NoDoGrafo, SubtarefaGrafo } from '../../../lib/schema/grafo';
import type { LetrasRaci, NoApi, RefDado, RefTecnica, SubtarefaApi } from '../render/api';
import type { DecisaoJson, FatosDaPagina, FluxoJson, PlaybookJson } from './loader';
import { resolverNo, TIPO_NO, type ContextoDoModal, type RenderizarConteudo } from './modal';
import { botaoItem, el, juntar, limpar, lista, meta, secao, semWikilinks } from './modal-dom';
import { botaoDestacar, detalheDoItem, secaoDeRitos } from './modal-itens';

export { semWikilinks };

export interface OpcoesDoConteudo {
  /** Resolves the content of the Demanda (cached by the loader). Called on every opening, so a failure can be retried. */
  carregar(): Promise<FluxoJson>;
  /** Facts of a Pagina_Canonica, read when an artefact or variable opens (loader.ts `carregarFatos`). Absent: the detail skips them. */
  carregarFatos?(url: string): Promise<FatosDaPagina>;
}

const LETRAS = ['R', 'A', 'C', 'I'] as const;

function textos(doc: Document, valores: string[] | undefined, chave: string, titulo: string): HTMLElement | undefined {
  const itens = (valores ?? []).filter((v) => typeof v === 'string' && v !== '');
  if (itens.length === 0) return undefined;
  return secao(doc, titulo, chave, lista(doc, itens.map((v) => doc.createTextNode(limpar(v)))));
}

const nomeDoPapel = (f: FluxoJson, id: string): string => f.papeis.find((p) => p.id === id)?.nome ?? id;

function papeisComLetra(doc: Document, ctx: ContextoDoModal, f: FluxoJson, raci: LetrasRaci): HTMLElement | undefined {
  const porPapel = new Map<string, string[]>();
  for (const letra of LETRAS) for (const id of raci[letra]) porPapel.set(id, [...(porPapel.get(id) ?? []), letra]);
  if (porPapel.size === 0) return undefined;
  const itens = [...porPapel].map(([id, letras]) => {
    const linha = el(doc, 'span', 'flow-modal__papel');
    for (const letra of letras) {
      const marca = el(doc, 'abbr', 'flow-modal__raci', letra);
      marca.dataset.raci = letra;
      marca.title = ctx.t(`flow.modal.raci.${letra}`);
      linha.append(marca, ' ');
    }
    linha.appendChild(botaoItem(doc, ctx, 'papel', id, nomeDoPapel(f, id)));
    return linha;
  });
  return secao(doc, ctx.t('flow.modal.papeis'), 'papeis', lista(doc, itens));
}

function dados(doc: Document, ctx: ContextoDoModal, f: FluxoJson, refs: RefDado[], chave: string, titulo: string, avisarSemProdutor: boolean): HTMLElement | undefined {
  if (refs.length === 0) return undefined;
  const itens = refs.map((r) => {
    const d = f.dados[r.id];
    const linha = el(doc, 'span', 'flow-modal__dado');
    linha.dataset.tipoDado = r.tipo;
    linha.appendChild(botaoItem(doc, ctx, r.tipo, r.id, d?.nome ?? r.id));
    const detalhe = [ctx.t(`flow.modal.${r.tipo}`), d?.tipoArtefato, d?.subtipo].filter((x): x is string => !!x).join(' · ');
    linha.append(' ', el(doc, 'span', 'muted', `(${detalhe})`));
    if (avisarSemProdutor && d?.semProdutor) {
      const aviso = el(doc, 'span', 'flow-modal__aviso', ctx.t('flow.modal.sem_produtor'));
      aviso.dataset.semProdutor = '';
      linha.append(' ', aviso);
    }
    return linha;
  });
  return secao(doc, titulo, chave, lista(doc, itens));
}

function tecnicas(doc: Document, ctx: ContextoDoModal, refs: RefTecnica[]): HTMLElement | undefined {
  if (refs.length === 0) return undefined;
  const itens = refs.map((t) => {
    const linha = el(doc, 'span', 'flow-modal__tecnica');
    linha.appendChild(botaoItem(doc, ctx, 'tecnica', t.id, t.nome));
    if (t.uso) linha.append(' ', el(doc, 'span', 'muted', `(${t.uso})`));
    return linha;
  });
  return secao(doc, ctx.t('flow.modal.tecnicas'), 'tecnicas', lista(doc, itens));
}

function perguntas(doc: Document, ctx: ContextoDoModal, f: FluxoJson, pb: PlaybookJson | undefined): HTMLElement | undefined {
  const ids = pb?.perguntas_chave ?? [];
  if (ids.length === 0) return undefined;
  const itens = ids.map((id) => botaoItem(doc, ctx, 'pergunta', id, limpar(f.perguntas?.[id]?.texto ?? id)));
  return secao(doc, ctx.t('flow.modal.perguntas'), 'perguntas', lista(doc, itens, true)); // guide order
}

function nomeDaRaia(ctx: ContextoDoModal, id: string): string {
  return ctx.grafo.raias.find((r) => r.id === id)?.nome ?? id;
}

function conteudoDaChamada(doc: Document, ctx: ContextoDoModal, no: NoDoGrafo): HTMLElement | undefined {
  if (no.tipo !== 'chamada' || !no.raiaChamada) return undefined;
  const alvo = no.raiaChamada;
  const corpo: Node[] = [el(doc, 'p', 'flow-modal__raia-chamada', nomeDaRaia(ctx, alvo))];
  if (ctx.abrirRaia) {
    const b = el(doc, 'button', 'flow-modal__abrir-raia', ctx.t('flow.modal.abrir_raia'));
    b.type = 'button';
    b.dataset.flowAbrirRaia = alvo;
    b.setAttribute('aria-label', ctx.t('flow.modal.abrir_raia.rotulo', { nome: nomeDaRaia(ctx, alvo) }));
    b.addEventListener('click', () => ctx.abrirRaia?.(alvo));
    corpo.push(b);
  }
  const retornos = ctx.grafo.nos.filter((n) => n.raia === alvo && n.tipo === 'fim').map((n) => limpar(n.retorno ?? n.rotulo));
  const unicos = [...new Set(retornos)];
  const s = secao(doc, ctx.t('flow.modal.raia_chamada'), 'raia-chamada', ...corpo);
  if (unicos.length) s.appendChild(secao(doc, ctx.t('flow.modal.retornos'), 'retornos', lista(doc, unicos.map((r) => doc.createTextNode(r)))));
  return s;
}

function conteudoDoGateway(doc: Document, ctx: ContextoDoModal, f: FluxoJson, no: NoDoGrafo, decisao: DecisaoJson | undefined): Node[] {
  const pergunta = el(doc, 'p', 'flow-modal__pergunta', limpar(decisao?.condicao || no.rotulo));
  const saidas = (decisao?.proximo ?? []).map((p) => {
    const destino = ctx.grafo.nos.find((n) => n.id === p.para);
    const linha = el(doc, 'span', 'flow-modal__saida');
    linha.append(el(doc, 'strong', 'flow-modal__condicao', limpar(p.condicao || ctx.t('flow.modal.sem_condicao'))), ' → ', destino?.rotulo ?? p.para);
    return linha;
  });
  const decide = decisao?.papel ? el(doc, 'p', 'flow-modal__decide') : undefined;
  decide?.appendChild(botaoItem(doc, ctx, 'papel', decisao?.papel as string, nomeDoPapel(f, decisao?.papel as string)));
  return juntar(
    secao(doc, ctx.t('flow.modal.pergunta_decisao'), 'pergunta', pergunta),
    saidas.length ? secao(doc, ctx.t('flow.modal.saidas_condicao'), 'saidas-condicao', lista(doc, saidas)) : undefined,
    decide ? secao(doc, ctx.t('flow.modal.decide'), 'decide', decide) : undefined,
  );
}

function acaoDestacar(doc: Document, ctx: ContextoDoModal, id: string, nome: string): HTMLElement | undefined {
  const b = botaoDestacar(doc, ctx, id, nome);
  if (!b) return undefined;
  const p = el(doc, 'p', 'flow-modal__acoes');
  p.appendChild(b);
  return p;
}

function conteudoDoNo(doc: Document, ctx: ContextoDoModal, f: FluxoJson, no: NoDoGrafo): Node[] {
  const decisao = f.decisoes.find((d) => d.id === no.id);
  const pb = decisao?.playbook ? f.playbooks.find((p) => p.id === decisao.playbook) : undefined;
  const api: NoApi | undefined = f.nos.find((n) => n.id === no.id);
  const gateway = no.tipo === 'bifurcacao';
  return juntar(
    meta(doc, [
      [ctx.t('flow.modal.tipo'), ctx.t(`flow.legend.${no.tipo}`)],
      [ctx.t('flow.modal.raia'), nomeDaRaia(ctx, no.raia)],
    ]),
    acaoDestacar(doc, ctx, no.id, no.rotulo),
    ...(gateway ? conteudoDoGateway(doc, ctx, f, no, decisao) : []),
    conteudoDaChamada(doc, ctx, no),
    pb?.resumo ? secao(doc, ctx.t('flow.modal.resumo'), 'resumo', el(doc, 'p', undefined, limpar(pb.resumo))) : undefined,
    textos(doc, pb?.fazer, 'fazer', ctx.t('flow.modal.fazer')),
    textos(doc, pb?.evitar, 'evitar', ctx.t('flow.modal.evitar')),
    perguntas(doc, ctx, f, pb),
    dados(doc, ctx, f, api?.entradas ?? [], 'entradas', ctx.t('flow.modal.entradas'), true),
    dados(doc, ctx, f, api?.saidas ?? [], 'saidas', ctx.t('flow.modal.saidas'), false),
    tecnicas(doc, ctx, api?.tecnicas ?? []),
    secaoDeRitos(doc, ctx, f, [no.id, ...no.subtarefas.map((s) => s.id)]),
    gateway ? undefined : api ? papeisComLetra(doc, ctx, f, api.raci) : undefined,
  );
}

function conteudoDaSubtarefa(doc: Document, ctx: ContextoDoModal, f: FluxoJson, no: NoDoGrafo, sub: SubtarefaGrafo): Node[] {
  const api: SubtarefaApi | undefined = f.nos.find((n) => n.id === no.id)?.subtarefas.find((s) => s.id === sub.id);
  const tarefa = botaoItem(doc, ctx, TIPO_NO, no.id, no.rotulo);
  return juntar(
    meta(doc, [
      [ctx.t('flow.modal.tipo'), ctx.t(sub.condicional ? 'flow.legend.subtarefa.cond' : 'flow.legend.subtarefa')],
      [ctx.t('flow.modal.raia'), nomeDaRaia(ctx, no.raia)],
      [ctx.t('flow.modal.subtarefa_de'), tarefa],
    ]),
    acaoDestacar(doc, ctx, sub.id, sub.rotulo),
    sub.condicional
      ? secao(doc, ctx.t('flow.modal.executar_quando'), 'executar-quando', el(doc, 'p', 'flow-modal__quando', sub.quando ? limpar(sub.quando) : ctx.t('flow.modal.nao_informado')))
      : undefined,
    dados(doc, ctx, f, api?.entradas ?? [], 'entradas', ctx.t('flow.modal.entradas'), true),
    dados(doc, ctx, f, api?.saidas ?? [], 'saidas', ctx.t('flow.modal.saidas'), false),
    tecnicas(doc, ctx, api?.tecnicas ?? []),
    secaoDeRitos(doc, ctx, f, [sub.id]),
    api ? papeisComLetra(doc, ctx, f, api.raci) : undefined,
  );
}

/**
 * Builds the content renderer for the modal. The returned function is synchronous (the shell's contract): it hands back a container
 * with a loading state and fills it when `carregar` resolves.
 */
export function criarRenderizadorDeConteudo(opcoes: OpcoesDoConteudo): RenderizarConteudo {
  return (item, ctx) => {
    const doc = ctx.doc;
    const container = el(doc, 'div', 'flow-modal__conteudo');
    container.dataset.flowConteudo = item.tipo;
    container.tabIndex = -1;

    const preencher = (nos: Node[]): void => {
      const tinhaFoco = container.contains(doc.activeElement) && doc.activeElement !== container;
      container.replaceChildren(...nos);
      container.removeAttribute('aria-busy');
      if (tinhaFoco) container.focus();
    };

    const iniciar = (): void => {
      container.setAttribute('aria-busy', 'true');
      const carregando = el(doc, 'p', 'muted', ctx.t('flow.modal.carregando'));
      carregando.setAttribute('role', 'status');
      container.replaceChildren(carregando);
      opcoes
        .carregar()
        .then((f) => {
          const nos: Node[] = [];
          if (f.fallback) {
            const aviso = el(doc, 'p', 'flow-modal__fallback', ctx.t('flow.modal.fallback'));
            aviso.dataset.fallback = 'true';
            nos.push(aviso);
          }
          if (item.tipo === TIPO_NO) {
            const achado = resolverNo(ctx.grafo, item.id);
            if (achado) nos.push(...(achado.subtarefa ? conteudoDaSubtarefa(doc, ctx, f, achado.no, achado.subtarefa) : conteudoDoNo(doc, ctx, f, achado.no)));
          } else {
            nos.push(...detalheDoItem(doc, ctx, f, item, { carregarFatos: opcoes.carregarFatos }));
          }
          preencher(nos);
        })
        .catch(() => {
          const erro = el(doc, 'div', 'flow-erro');
          erro.setAttribute('role', 'alert');
          const tentar = el(doc, 'button', undefined, ctx.t('flow.modal.erro.tentar'));
          tentar.type = 'button';
          tentar.dataset.flowModalTentar = '';
          tentar.addEventListener('click', iniciar);
          erro.append(el(doc, 'p', undefined, ctx.t('flow.modal.erro')), tentar);
          preencher([erro]);
        });
    };
    iniciar();
    return container;
  };
}
