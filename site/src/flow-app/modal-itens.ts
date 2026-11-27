// SPDX-License-Identifier: MIT
// Detail of the items a Nó cites, shown inside the Modal_de_Playbook on top of the Historico_do_Modal (Requirements 6.5, 6.8, 8.1 to 8.5, 8.7, 13.2):
//  - papel: where the role acts, with the RACI letters;      - tecnica: the Nós that use it;
//  - artefato / variavel: type, subtype, description, example, producers and consumers, the "sem produtor" warning and, on each
//    Nó, the "Destacar no Diagrama" action;                  - rito: where it happens;      - pergunta: where it is asked.
// Every item that is an Entidade ends with a link to its Pagina_Canonica (a plain anchor). The text of the Entidade is not copied
// into the API: the API carries names and references, and the description and the example of an artefact or variable are read from
// its canonical page when the item opens (loader.ts `carregarFatos`).
import type { LetrasRaci } from '../render/api';
import type { FatosDaPagina, FluxoJson } from './loader';
import { botaoItem, el, juntar, limpar, linkCanonico, lista, meta, secao } from './modal-dom';
import { resolverNo, TIPO_NO, type ContextoDoModal, type ItemDoModal } from './modal';

export interface FontesDoItem {
  /** Facts of a Pagina_Canonica (description, example, variable type). Absent: the detail shows what the API has. */
  carregarFatos?(url: string): Promise<FatosDaPagina>;
}

const LETRAS = ['R', 'A', 'C', 'I'] as const;

/** The "Destacar no Diagrama" button of one Nó (Requirement 8.3). Absent when the host gave no way to highlight. */
export function botaoDestacar(doc: Document, ctx: ContextoDoModal, id: string, nome: string): HTMLButtonElement | undefined {
  const destacar = ctx.destacarNo;
  if (!destacar) return undefined;
  const b = el(doc, 'button', 'flow-modal__destacar', ctx.t('flow.modal.destacar'));
  b.type = 'button';
  b.dataset.flowDestacar = id;
  b.setAttribute('aria-label', ctx.t('flow.modal.destacar.rotulo', { nome }));
  b.addEventListener('click', () => destacar(id));
  return b;
}

const nomeDoNo = (ctx: ContextoDoModal, id: string): string => {
  const achado = resolverNo(ctx.grafo, id);
  return achado?.subtarefa?.rotulo ?? achado?.no.rotulo ?? id;
};
const nomeDaRaia = (ctx: ContextoDoModal, id: string): string => ctx.grafo.raias.find((r) => r.id === id)?.nome ?? id;

/** A Nó of this Demanda as a list line: opens its content on the stack, with the Raia beside it and optionally the highlight action. */
function linhaDeNo(doc: Document, ctx: ContextoDoModal, id: string, acoes: { destacar: boolean; extra?: Node }): HTMLElement {
  const achado = resolverNo(ctx.grafo, id);
  const linha = el(doc, 'span', 'flow-modal__no');
  linha.dataset.noId = id;
  if (acoes.extra) linha.append(acoes.extra, ' ');
  linha.appendChild(botaoItem(doc, ctx, TIPO_NO, id, nomeDoNo(ctx, id)));
  if (achado) linha.append(' ', el(doc, 'span', 'muted', `(${nomeDaRaia(ctx, achado.no.raia)})`));
  if (acoes.destacar) {
    const b = botaoDestacar(doc, ctx, id, nomeDoNo(ctx, id));
    if (b) linha.append(' ', b);
  }
  return linha;
}

/**
 * One producer or consumer id of an artefact or variable. It can be a Nó or Subtarefa of this Demanda (opens on the stack and can be
 * highlighted), a rito, a Raia of this Demanda (opens its View), or something that lives in another Demanda: that one is never
 * drawn here, so it shows its name and a link to its page, with no highlight action.
 */
function linhaDeReferencia(doc: Document, ctx: ContextoDoModal, f: FluxoJson, id: string): HTMLElement {
  if (resolverNo(ctx.grafo, id)) return linhaDeNo(doc, ctx, id, { destacar: true });
  const rito = f.ritos?.[id];
  const linha = el(doc, 'span', 'flow-modal__referencia');
  linha.dataset.noId = id;
  if (rito) {
    linha.appendChild(botaoItem(doc, ctx, 'rito', id, rito.nome));
    linha.append(' ', el(doc, 'span', 'muted', `(${ctx.t('flow.modal.rito')})`));
    return linha;
  }
  const raia = ctx.grafo.raias.find((r) => r.id === id);
  if (raia) {
    linha.append(raia.nome, ' ', el(doc, 'span', 'muted', `(${ctx.t('flow.modal.raia')})`));
    const abrirRaia = ctx.abrirRaia;
    if (abrirRaia) {
      const b = el(doc, 'button', 'flow-modal__abrir-raia', ctx.t('flow.modal.abrir_raia'));
      b.type = 'button';
      b.dataset.flowAbrirRaia = id;
      b.setAttribute('aria-label', ctx.t('flow.modal.abrir_raia.rotulo', { nome: raia.nome }));
      b.addEventListener('click', () => abrirRaia(id));
      linha.append(' ', b);
    }
    return linha;
  }
  const externo = f.externos?.[id];
  linha.dataset.externo = '';
  linha.append(externo?.nome ?? id, ' ', el(doc, 'span', 'muted', `(${ctx.t('flow.modal.outra_demanda')})`));
  const link = linkCanonico(doc, ctx, externo?.url);
  if (link) linha.append(' ', link);
  return linha;
}

function secaoDeNos(doc: Document, ctx: ContextoDoModal, titulo: string, chave: string, ids: string[], extra?: (id: string) => Node | undefined): HTMLElement | undefined {
  const validos = ids.filter((id) => resolverNo(ctx.grafo, id));
  if (validos.length === 0) return undefined;
  return secao(doc, titulo, chave, lista(doc, validos.map((id) => linhaDeNo(doc, ctx, id, { destacar: false, extra: extra?.(id) }))));
}

/** Letters (R, A, C, I) that `papel` has in a RACI. */
const letrasDe = (raci: LetrasRaci, papel: string): string[] => LETRAS.filter((l) => raci[l].includes(papel));

function detalheDoPapel(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal): Node[] {
  const papel = f.papeis.find((p) => p.id === item.id);
  ctx.titular(papel?.nome ?? item.id);
  const nos = f.nos.filter((n) => letrasDe(n.raci, item.id).length > 0);
  const letras = new Map(nos.map((n) => [n.id, letrasDe(n.raci, item.id)]));
  const marcas = (id: string): Node => {
    const grupo = el(doc, 'span', 'flow-modal__papel');
    for (const l of letras.get(id) ?? []) {
      const marca = el(doc, 'abbr', 'flow-modal__raci', l);
      marca.dataset.raci = l;
      marca.title = ctx.t(`flow.modal.raci.${l}`);
      grupo.append(marca, ' ');
    }
    return grupo;
  };
  return juntar(
    meta(doc, [[ctx.t('flow.modal.tipo'), ctx.t('flow.modal.papel')]]),
    secaoDeNos(doc, ctx, ctx.t('flow.modal.atua_em'), 'atua-em', nos.map((n) => n.id), marcas),
    linkCanonico(doc, ctx, papel?.url),
  );
}

function detalheDaTecnica(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal): Node[] {
  const todas = f.nos.flatMap((n) => n.tecnicas.map((t) => ({ no: n.id, ...t })));
  const tecnica = todas.find((t) => t.id === item.id);
  ctx.titular(tecnica?.nome ?? item.id);
  const nos = [...new Set(todas.filter((t) => t.id === item.id).map((t) => t.no))];
  return juntar(
    meta(doc, [[ctx.t('flow.modal.tipo'), ctx.t('flow.modal.tecnica')]]),
    secaoDeNos(doc, ctx, ctx.t('flow.modal.usada_em'), 'usada-em', nos),
    linkCanonico(doc, ctx, tecnica?.url),
  );
}

function detalheDoRito(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal): Node[] {
  const rito = f.ritos?.[item.id];
  ctx.titular(rito?.nome ?? item.id);
  return juntar(
    meta(doc, [[ctx.t('flow.modal.tipo'), ctx.t('flow.modal.rito')]]),
    secaoDeNos(doc, ctx, ctx.t('flow.modal.acontece_em'), 'acontece-em', rito?.nos ?? []),
    linkCanonico(doc, ctx, rito?.url),
  );
}

/** Ids of the Nós whose playbook cites the key question, in the order of the Demanda. */
function nosQueCitam(f: FluxoJson, id: string): string[] {
  const playbooks = new Set(f.playbooks.filter((p) => (p.perguntas_chave ?? []).includes(id)).map((p) => p.id));
  return f.decisoes.filter((d) => d.playbook && playbooks.has(d.playbook)).map((d) => d.id);
}

function detalheDaPergunta(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal): Node[] {
  // A key question is an anchor of the guide with no page of its own: there is no canonical link to offer.
  ctx.titular(limpar(f.perguntas?.[item.id]?.texto ?? item.id));
  return juntar(meta(doc, [[ctx.t('flow.modal.tipo'), ctx.t('flow.modal.pergunta')]]), secaoDeNos(doc, ctx, ctx.t('flow.modal.citada_em'), 'citada-em', nosQueCitam(f, item.id)));
}

function listaDeReferencias(doc: Document, ctx: ContextoDoModal, f: FluxoJson, ids: string[]): Node {
  if (ids.length === 0) return el(doc, 'p', 'muted', ctx.t('flow.modal.nenhum'));
  return lista(doc, ids.map((id) => linhaDeReferencia(doc, ctx, f, id)));
}

/** Fills the description, the variable type and the example once the canonical page answers. A failure leaves the rest of the detail as is. */
function preencherFatos(doc: Document, ctx: ContextoDoModal, alvo: HTMLElement, fatos: FatosDaPagina, tipoDado: 'artefato' | 'variavel'): void {
  const nos: Node[] = [];
  if (fatos.descricao) nos.push(el(doc, 'p', 'flow-modal__descricao', limpar(fatos.descricao)));
  const tipoVariavel = tipoDado === 'variavel' ? fatos.fatos[ctx.t('f.variavel_tipo')] : undefined;
  if (tipoVariavel) nos.push(meta(doc, [[ctx.t('f.variavel_tipo'), tipoVariavel]]));
  const exemplo = fatos.fatos[ctx.t('f.exemplo')];
  if (exemplo) nos.push(secao(doc, ctx.t('f.exemplo'), 'exemplo', el(doc, 'p', 'flow-modal__exemplo', limpar(exemplo))));
  alvo.replaceChildren(...nos);
  alvo.dataset.fatos = 'ok';
}

function detalheDoDado(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal, fontes: FontesDoItem): Node[] {
  const d = f.dados[item.id];
  const tipoDado = item.tipo === 'variavel' ? 'variavel' : 'artefato';
  ctx.titular(d?.nome ?? item.id);
  const pares: Array<[string, string]> = [[ctx.t('flow.modal.tipo'), ctx.t(`flow.modal.${tipoDado}`)]];
  if (d?.tipoArtefato) pares.push([ctx.t('f.artefato_tipo'), d.tipoArtefato]); // Requirement 8.7
  if (d?.subtipo) pares.push([ctx.t('f.subtipo'), d.subtipo]);
  const fatos = el(doc, 'div', 'flow-modal__fatos');
  fatos.dataset.fatos = 'carregando';
  if (d?.url && fontes.carregarFatos) {
    fontes
      .carregarFatos(d.url)
      .then((r) => preencherFatos(doc, ctx, fatos, r, tipoDado))
      .catch(() => {
        fatos.dataset.fatos = 'erro'; // the page is a bonus: the detail stands without it
      });
  } else {
    fatos.dataset.fatos = 'indisponivel';
  }
  let aviso: HTMLElement | undefined;
  if (d?.semProdutor) {
    aviso = el(doc, 'p', 'flow-modal__aviso', ctx.t('flow.modal.sem_produtor')); // Requirement 8.5
    aviso.dataset.semProdutor = '';
    aviso.setAttribute('role', 'note');
  }
  return juntar(
    meta(doc, pares),
    fatos,
    aviso,
    secao(doc, ctx.t('flow.modal.produtores'), 'produtores', listaDeReferencias(doc, ctx, f, d?.produzidoPor ?? [])),
    secao(doc, ctx.t('flow.modal.consumidores'), 'consumidores', listaDeReferencias(doc, ctx, f, d?.consumidoPor ?? [])),
    linkCanonico(doc, ctx, d?.url),
  );
}

/** Detail of an item that is not a Nó, with the link to its Pagina_Canonica when it has one. */
export function detalheDoItem(doc: Document, ctx: ContextoDoModal, f: FluxoJson, item: ItemDoModal, fontes: FontesDoItem = {}): Node[] {
  switch (item.tipo) {
    case 'papel':
      return detalheDoPapel(doc, ctx, f, item);
    case 'tecnica':
      return detalheDaTecnica(doc, ctx, f, item);
    case 'artefato':
    case 'variavel':
      return detalheDoDado(doc, ctx, f, item, fontes);
    case 'rito':
      return detalheDoRito(doc, ctx, f, item);
    case 'pergunta':
      return detalheDaPergunta(doc, ctx, f, item);
    default:
      ctx.titular(item.id);
      return [meta(doc, [[ctx.t('flow.modal.tipo'), item.tipo]])];
  }
}

/** Ritos that happen in a Nó (or in one of its Subtarefas), as buttons: where the guide cites a rito (Requirement 6.5). */
export function secaoDeRitos(doc: Document, ctx: ContextoDoModal, f: FluxoJson, ids: string[]): HTMLElement | undefined {
  const alvo = new Set(ids);
  const ritos = Object.entries(f.ritos ?? {}).filter(([, r]) => r.nos.some((n) => alvo.has(n)));
  if (ritos.length === 0) return undefined;
  return secao(doc, ctx.t('flow.modal.ritos'), 'ritos', lista(doc, ritos.map(([id, r]) => botaoItem(doc, ctx, 'rito', id, r.nome))));
}
