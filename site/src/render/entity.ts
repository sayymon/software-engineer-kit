// SPDX-License-Identifier: MIT
// Entity pages: one renderer per tipo, built from the front matter (structure) and the Markdown body (prose).
import type { Page } from '@lib/content/site';
import { visoesDoGuia } from '@lib/flow-mermaid';
import {
  type Ctx,
  anchor,
  cardList,
  dl,
  diagram,
  esc,
  ext,
  groupBy,
  inline,
  label,
  linkList,
  section,
  table,
  val,
} from './util';
import { renderDemand } from './flow';

export type Rendered = { html: string; diagrams: number; flow?: boolean };

type Spec = { facts: string[]; rels: string[] };

/** Fields shown in the fact table and relation lists, per tipo. Every key needs a `f.<key>` UI string. */
export const SPEC: Record<string, Spec> = {
  ferramenta: {
    facts: ['empresa', 'tipos', 'modeloContratacao', 'precoUSD', 'precoMedio', 'plataformas', 'linguagens', 'porte', 'segmentos', 'restricoes', 'fontePreco', 'licenca', 'dataVerificacao'],
    rels: ['categorias', 'funcionalidades', 'casosDeUso', 'modelos'],
  },
  categoria: { facts: ['grupo', 'excecao', 'guia'], rels: ['maisBarata', 'custoBeneficio', 'qualidadeMaxima', 'essenciais'] },
  'caso-de-uso': {
    facts: ['nivel', 'eixo', 'macro', 'nicho', 'criterioPadrao', 'criteriosDesempate', 'porte', 'segmentos'],
    rels: ['funcionalidadesNecessarias', 'categoriasRelacionadas', 'ferramentasRecomendadas', 'modelosRecomendados'],
  },
  empresa: { facts: ['setor', 'website', 'sede'], rels: ['ferramentas', 'modelos'] },
  modelo: {
    facts: ['familia', 'empresa', 'lancamento', 'status', 'idModeloApi', 'contextoTokens', 'saidaMaxTokens', 'modalidadesEntrada', 'modalidadesSaida', 'precoEntradaUSD', 'precoSaidaUSD', 'precoCacheUSD', 'licenca', 'disponibilidade', 'fontePreco', 'dataVerificacao'],
    rels: ['ferramentas', 'categorias', 'funcionalidades', 'casosDeUso', 'benchmarks'],
  },
  benchmark: {
    facts: ['area', 'avalia', 'metodo', 'metrica', 'escala', 'limitacoes', 'saturacao', 'contaminacao', 'mantenedor', 'urlOficial'],
    rels: ['funcionalidadesMedidas', 'casosDeUsoRelacionados', 'modelosAvaliados'],
  },
  funcionalidade: { facts: [], rels: [] },
  padrao: { facts: ['familia', 'subfamilia', 'problema'], rels: ['categorias', 'padroesRelacionados', 'casosDeUso', 'ferramentas', 'notaCompleta'] },
  algoritmo: {
    facts: ['area', 'subarea', 'categoria', 'entrada', 'saida'],
    rels: ['estruturasDeDados', 'algoritmosRelacionados', 'padroes', 'casosDeUsoKit', 'ferramentas'],
  },
  'estrutura-de-dados': {
    facts: ['familia', 'memoria'],
    rels: ['estruturasRelacionadas', 'algoritmosRelacionados', 'padroes', 'ferramentas'],
  },
  stack: { facts: ['dominio', 'subdominio', 'linguagens'], rels: ['categorias', 'padroes', 'casosDeUso', 'ferramentas'] },
  'guia-pratico': {
    facts: ['sigla', 'grupo', 'objetivo'],
    rels: ['stacks', 'padroes', 'categorias', 'ferramentas', 'casosDeUso', 'certificacoes'],
  },
  certificacao: {
    facts: ['emissor', 'emissorEmpresa', 'area', 'nivel', 'formato', 'custoUSD', 'validade', 'renovacao', 'preRequisitos', 'oQueComprova', 'paraQuem', 'urlOficial', 'status', 'observacoes'],
    rels: ['ferramentasRelacionadas', 'categoriasRelacionadas', 'habilidadesRelacionadas'],
  },
  licenca: { facts: ['spdx', 'tipoLicenca', 'aprovacaoOSI', 'aprovacaoFSF', 'clausulaPatentes', 'urlOficial', 'dataVerificacao'], rels: ['ferramentasRelacionadas'] },
  hub: { facts: [], rels: [] },
  jornada: { facts: ['perfil'], rels: ['certificacoes', 'competencias'] },
  competencia: { facts: ['area', 'meiaVida', 'estudo'], rels: ['habilidades', 'certificacoes'] },
  tecnica: { facts: [], rels: ['relacoes'] },
  abordagem: { facts: [], rels: [] },
  estrategia: { facts: [], rels: [] },
  requisito: { facts: ['categoria'], rels: ['relacoes'] },
  raia: { facts: ['responsabilidade', 'orquestradora'], rels: ['relacoes'] },
  tarefa: { facts: ['rotulo', 'condicao'], rels: ['relacoes'] },
  decisao: { facts: ['rotulo', 'condicao'], rels: ['relacoes'] },
  no: { facts: ['no_tipo', 'rotulo', 'condicao', 'retorno'], rels: [] },
  subtarefa: { facts: ['rotulo', 'descricao', 'exemplo', 'responsavel', 'porque'], rels: [] },
  playbook: { facts: ['resumo', 'exemplo', 'fazer', 'evitar'], rels: [] },
  pergunta: { facts: ['texto'], rels: [] },
  celula: { facts: ['perguntas_chave'], rels: [] },
  artefato: { facts: ['artefato_tipo', 'subtipo', 'exemplo'], rels: ['relacoes'] },
  variavel: { facts: ['variavel_tipo', 'exemplo', 'inicial'], rels: ['relacoes'] },
  papel: { facts: ['atuacao_de_agente', 'exemplo', 'responsabilidades'], rels: ['relacoes'] },
  rito: { facts: ['nivel', 'ordem', 'cadencia', 'duracao', 'objetivo', 'premissas', 'comportamentos_esperados', 'evitar', 'exemplo'], rels: ['relacoes'] },
  'tipo-de-artefato': { facts: ['artefato_tipo', 'legado', 'subtipos'], rels: ['relacoes'] },
  'categoria-ferramenta': { facts: ['custo', 'beneficio', 'dependencia_fornecedor'], rels: ['relacoes'] },
  'fonte-guia': { facts: ['fonte_tipo', 'titulo', 'link', 'status_revisao', 'proxima_revisao'], rels: ['relacoes'] },
  'padrao-guia': { facts: [], rels: ['relacoes'] },
};

/** Extra keys rendered by dedicated blocks. Listed so the UI string test covers them. */
export const EXTRA_FIELD_KEYS = [
  'exemplo', 'quando_usar', 'quando_evitar', 'tradeoffs', 'consequencias', 'variacoes', 'preCondicoes', 'limitacoes', 'casosDeUso',
  'tempoMelhor', 'tempoMedio', 'tempoPior', 'observacao', 'memoria', 'operacoes', 'propriedades', 'casosDeBorda', 'implementacao',
  'linguagemReferencia', 'versao', 'bibliotecaPadrao', 'papel', 'categoria', 'obrigatorio', 'lacuna', 'instancias', 'nome', 'descricao',
  'ferramentas', 'linguagens', 'favorece', 'contra', 'preferir', 'semAlternativa', 'outrosArquetipos', 'quando', 'perguntasDecisao',
  'passos', 'comoFazerHoje', 'armadilhas', 'validacao', 'preRequisitos', 'verificacao', 'depende', 'comandos', 'versaoTestada',
  'fonteUrl', 'como_aplicar', 'resultado_esperado', 'etapas', 'itens', 'niveis', 'faixasPadrao', 'resultados', 'valor', 'origem', 'fonte',
  'data', 'modelo', 'unidade', 'nota', 'permissoes', 'quandoUsar', 'quandoEvitar', 'compatibilidade', 'fontes', 'tags', 'aliases',
  'slots', 'condicoes', 'checklist', 'titulo', 'dominio', 'nivelItem', 'maisBarata', 'custoBeneficio', 'qualidadeMaxima', 'essenciais',
  'evidencias', 'detalhe', 'raias', 'responsabilidade', 'orquestradora', 'playbooks', 'perguntas_chave', 'resumo',
];

function head(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const tags = Array.isArray(d.tags) ? (d.tags as string[]) : [];
  const aliases = Array.isArray(d.aliases) ? (d.aliases as string[]) : [];
  /** Hubs have no layer page of their own: link to the layer they map. */
  const parent = page.layer === 'hubs' ? String(d.camada ?? 'tools') : page.layer;
  return (
    `<header class="entity-head">` +
    `<p class="eyebrow"><a href="${esc(ctx.href(parent))}">${esc(ctx.t(`layer.${parent}`))}</a> / ${esc(ctx.t(`tipo.${page.tipo}`))}</p>` +
    `<h1>${esc(page.nome)}</h1>` +
    (d.descricao ? `<p class="lede">${inline(ctx, String(d.descricao))}</p>` : '') +
    (aliases.length ? `<p class="muted">${esc(ctx.t('aliases'))}: ${esc(aliases.join(', '))}</p>` : '') +
    (tags.length ? `<ul class="chips">${tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>` : '') +
    `</header>`
  );
}

function facts(ctx: Ctx, d: Record<string, unknown>, keys: string[]): string {
  return dl(keys.map((k) => [label(ctx, k), val(ctx, d[k], k)] as [string, string]));
}

function relations(ctx: Ctx, d: Record<string, unknown>, keys: string[]): string {
  return keys.map((k) => section(label(ctx, k), linkList(ctx, d[k]), 'rel')).join('');
}

function conceitual(ctx: Ctx, d: Record<string, unknown>): string {
  const list = (key: string) => section(label(ctx, key), val(ctx, d[key], key));
  return (
    (d.exemplo ? section(label(ctx, 'exemplo'), `<p>${inline(ctx, String(d.exemplo))}</p>`) : '') + list('quando_usar') + list('quando_evitar')
  );
}

function body(ctx: Ctx, page: Page): string {
  const text = page.entity.body.trim();
  if (!text) return '';
  return `<div class="prose">${ctx.index.render(text, { href: ctx.href, where: page.entity.relPath })}</div>`;
}

/** Anchor-only guide items (no, subtarefa, playbook, pergunta, celula) rendered on the page that hosts them. */
function anchored(ctx: Ctx, page: Page): string {
  const items = ctx.index.anchorsOf(page.id);
  if (items.length === 0) return '';
  const groups = groupBy(items, (e) => e.tipo, ctx.locale);
  const inner = groups
    .map(([tipo, list]) => {
      const lis = list
        .map((e) => {
          const spec = SPEC[e.tipo] ?? { facts: [], rels: [] };
          return (
            `<li id="${esc(e.id)}"><strong>${esc(String(e.data.nome ?? e.id))}</strong>` +
            facts(ctx, e.data, spec.facts) +
            (Array.isArray(e.data.relacoes) && e.data.relacoes.length ? linkList(ctx, e.data.relacoes) : '') +
            `</li>`
          );
        })
        .join('');
      return `<h3>${esc(ctx.t(`tipo.${tipo}`))} <span class="count">${list.length}</span></h3><ul class="anchored">${lis}</ul>`;
    })
    .join('');
  return section(ctx.t('s.anchored'), inner, 'anchored');
}
function inbound(ctx: Ctx, page: Page): string {
  const items = ctx.index.inbound(page.id);
  if (items.length === 0) return '';
  const groups = groupBy(items, (i) => ctx.t(`tipo.${i.page.tipo}`), ctx.locale);
  const inner = groups
    .map(([tipo, list]) => `<h3>${esc(tipo)} <span class="count">${list.length}</span></h3><ul class="links">${list.map((i) => `<li>${anchor(ctx, i.page)}</li>`).join('')}</ul>`)
    .join('');
  return section(ctx.t('s.inbound'), `<p class="muted">${esc(ctx.t('s.inbound.hint'))}</p>${inner}`, 'inbound');
}

function fontes(ctx: Ctx, d: Record<string, unknown>): string {
  const list = Array.isArray(d.fontes) ? (d.fontes as Array<Record<string, string>>) : [];
  if (list.length === 0) return '';
  return section(
    ctx.t('s.sources'),
    `<ul class="links">${list.map((f) => `<li>${ext(f.link, f.titulo)} <span class="muted">(${esc(f.tipo)})</span></li>`).join('')}</ul>`,
  );
}

/** Other tools that share at least one category, most overlap first. */
function alternatives(ctx: Ctx, page: Page): Page[] {
  const cats = new Set(relationIds(page.entity.data.categorias));
  if (cats.size === 0) return [];
  const scored: Array<[number, Page]> = [];
  for (const other of ctx.index.ofTipo('ferramenta')) {
    if (other.id === page.id) continue;
    const overlap = relationIds(other.entity.data.categorias).filter((c) => cats.has(c)).length;
    if (overlap > 0) scored.push([overlap, other]);
  }
  scored.sort((a, b) => b[0] - a[0] || a[1].nome.localeCompare(b[1].nome, ctx.locale));
  return scored.slice(0, 12).map(([, p]) => p);
}

function relationIds(value: unknown): string[] {
  const out: string[] = [];
  for (const v of Array.isArray(value) ? value : []) {
    const m = typeof v === 'string' ? /^\[\[([^\[\]|#]+)/.exec(v) : null;
    if (m) out.push(m[1].trim());
  }
  return out;
}

function rowsTable(ctx: Ctx, names: string[]): string {
  const seen = new Set<string>();
  const rows: string[][] = [];
  for (const name of names) {
    for (const r of ctx.rowsByCategory.get(name) ?? []) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      const price = r.preco.status === 'verificado' ? `US$ ${esc(r.preco.usd)} (${esc(r.preco.unidade)})` : esc(ctx.t('unverified'));
      rows.push([r.url ? ext(r.url, r.nome) : esc(r.nome), esc(r.empresa ?? ''), price, esc(r.plataformas.join(', '))]);
    }
  }
  rows.sort((a, b) => a[0].localeCompare(b[0], ctx.locale));
  return table([ctx.t('col.name'), ctx.t('col.company'), ctx.t('col.price'), ctx.t('col.platforms')], rows, 'rows');
}

function ferramenta(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const alt = alternatives(ctx, page);
  return (
    facts(ctx, d, SPEC.ferramenta.facts) +
    relations(ctx, d, SPEC.ferramenta.rels) +
    section(ctx.t('s.alternatives'), alt.length ? `<p class="muted">${esc(ctx.t('s.alternatives.hint'))}</p>${cardList(ctx, alt, false)}` : '')
  );
}

function categoria(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const tiers = ['maisBarata', 'custoBeneficio', 'qualidadeMaxima', 'essenciais'].map((k) => section(label(ctx, k), linkList(ctx, d[k]), 'rel')).join('');
  const names = [page.nome, ...(Array.isArray(d.aliases) ? (d.aliases as string[]) : [])];
  const rows = rowsTable(ctx, names);
  return facts(ctx, d, SPEC.categoria.facts) + tiers + section(ctx.t('s.tableRows'), rows ? `<p class="muted">${esc(ctx.t('s.tableRows.hint'))}</p>${rows}` : '');
}

function casoDeUso(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const faixas = (d.faixasPadrao ?? {}) as Record<string, unknown>;
  const variacoes = Array.isArray(d.variacoes) ? (d.variacoes as Array<Record<string, unknown>>) : [];
  const v = variacoes
    .map(
      (x) =>
        `<article class="variant"><h3>${esc(x.nome)}</h3>${x.descricao ? `<p>${inline(ctx, String(x.descricao))}</p>` : ''}` +
        ['maisBarata', 'custoBeneficio', 'qualidadeMaxima'].map((k) => (Array.isArray(x[k]) && (x[k] as unknown[]).length ? `<h4>${esc(label(ctx, k))}</h4>${linkList(ctx, x[k])}` : '')).join('') +
        `</article>`,
    )
    .join('');
  return (
    facts(ctx, d, SPEC['caso-de-uso'].facts) +
    relations(ctx, d, SPEC['caso-de-uso'].rels) +
    ['maisBarata', 'custoBeneficio', 'qualidadeMaxima'].map((k) => section(label(ctx, k), linkList(ctx, faixas[k]), 'rel')).join('') +
    section(label(ctx, 'variacoes'), v)
  );
}

function benchmark(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const results = Array.isArray(d.resultados) ? (d.resultados as Array<Record<string, string | number>>) : [];
  const rows = results.map((r) => [
    inline(ctx, String(r.modelo)),
    val(ctx, r.valor, 'valor') + (r.unidade ? ` ${esc(r.unidade)}` : ''),
    esc(r.origem === 'não verificado' ? ctx.t('unverified') : r.origem),
    inline(ctx, String(r.fonte)),
    esc(r.data),
  ]);
  return (
    facts(ctx, d, SPEC.benchmark.facts) +
    relations(ctx, d, SPEC.benchmark.rels) +
    section(label(ctx, 'resultados'), table([label(ctx, 'modelo'), label(ctx, 'valor'), label(ctx, 'origem'), label(ctx, 'fonte'), label(ctx, 'data')], rows))
  );
}

function padrao(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  return (
    facts(ctx, d, SPEC.padrao.facts) +
    conceitual(ctx, d) +
    section(label(ctx, 'tradeoffs'), val(ctx, d.tradeoffs)) +
    section(label(ctx, 'consequencias'), val(ctx, d.consequencias)) +
    section(label(ctx, 'variacoes'), val(ctx, d.variacoes)) +
    relations(ctx, d, SPEC.padrao.rels)
  );
}

function implementacao(ctx: Ctx, d: Record<string, unknown>): string {
  const impl = d.implementacao as Record<string, unknown> | undefined;
  if (!impl) return '';
  return section(label(ctx, 'implementacao'), dl(['linguagemReferencia', 'versao', 'bibliotecaPadrao', 'casosDeBorda'].map((k) => [label(ctx, k), val(ctx, impl[k], k)] as [string, string])));
}

function algoritmo(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const c = (d.complexidade ?? {}) as Record<string, string>;
  const cx = table(
    [ctx.t('col.measure'), ctx.t('col.value')],
    [
      [esc(label(ctx, 'tempoMelhor')), esc(c.tempoMelhor)],
      [esc(label(ctx, 'tempoMedio')), esc(c.tempoMedio)],
      [esc(label(ctx, 'tempoPior')), esc(c.tempoPior)],
      [esc(label(ctx, 'memoria')), esc(c.memoria)],
    ].map((r) => r.map((cell) => (cell === 'não se aplica' ? esc(ctx.t('notApplicable')) : cell))),
    'complexity',
  );
  return (
    facts(ctx, d, SPEC.algoritmo.facts) +
    section(ctx.t('s.complexity'), cx + (c.observacao ? `<p class="muted">${inline(ctx, c.observacao)}</p>` : '')) +
    section(label(ctx, 'preCondicoes'), val(ctx, d.preCondicoes)) +
    section(label(ctx, 'limitacoes'), val(ctx, d.limitacoes)) +
    section(label(ctx, 'casosDeUso'), val(ctx, d.casosDeUso)) +
    conceitual(ctx, d) +
    implementacao(ctx, d) +
    relations(ctx, d, SPEC.algoritmo.rels)
  );
}

function estrutura(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const ops = Array.isArray(d.operacoes) ? (d.operacoes as Array<Record<string, string>>) : [];
  const cell = (v: string | undefined) => (v === 'não se aplica' ? esc(ctx.t('notApplicable')) : esc(v ?? ''));
  const opsTable = table(
    [ctx.t('col.operation'), ctx.t('col.best'), ctx.t('col.average'), ctx.t('col.worst'), label(ctx, 'observacao')],
    ops.map((o) => [esc(o.nome), cell(o.melhor), cell(o.medio), cell(o.pior), o.observacao ? inline(ctx, o.observacao) : '']),
    'complexity',
  );
  return (
    facts(ctx, d, SPEC['estrutura-de-dados'].facts) +
    section(label(ctx, 'operacoes'), opsTable) +
    section(label(ctx, 'propriedades'), val(ctx, d.propriedades)) +
    section(label(ctx, 'tradeoffs'), val(ctx, d.tradeoffs)) +
    section(label(ctx, 'casosDeBorda'), val(ctx, d.casosDeBorda)) +
    section(label(ctx, 'casosDeUso'), val(ctx, d.casosDeUso)) +
    conceitual(ctx, d) +
    implementacao(ctx, d) +
    relations(ctx, d, SPEC['estrutura-de-dados'].rels)
  );
}

type ChecklistItem = { id: string; dominio: string; titulo: string; verificacao: string; nivel: string };

function checklistHtml(ctx: Ctx, items: ChecklistItem[]): string {
  const groups = groupBy(items, (i) => i.dominio, ctx.locale);
  return groups
    .map(
      ([dominio, list]) =>
        `<h3>${esc(dominio)}</h3><ul class="checklist">${list
          .map(
            (i) =>
              `<li><label><input type="checkbox" aria-describedby="chk-${esc(i.id)}"> <strong>${esc(i.titulo)}</strong></label>` +
              `<span class="badge ${i.nivel === 'essencial' ? 'badge-strong' : ''}">${esc(ctx.t(`level.${i.nivel}`))}</span>` +
              `<p id="chk-${esc(i.id)}" class="muted">${esc(i.verificacao)}</p></li>`,
          )
          .join('')}</ul>`,
    )
    .join('');
}

function stack(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const slots = Array.isArray(d.slots) ? (d.slots as Array<Record<string, unknown>>) : [];
  const tier = (v: unknown) => (Array.isArray(v) && v.length ? `<ul>${(v as string[]).map((x) => `<li>${inline(ctx, x)}</li>`).join('')}</ul>` : '');
  const slotTable = table(
    [label(ctx, 'papel'), label(ctx, 'categoria'), label(ctx, 'obrigatorio'), label(ctx, 'maisBarata'), label(ctx, 'custoBeneficio'), label(ctx, 'qualidadeMaxima'), label(ctx, 'lacuna')],
    slots.map((s) => [esc(s.papel), inline(ctx, String(s.categoria)), val(ctx, s.obrigatorio), tier(s.maisBarata), tier(s.custoBeneficio), tier(s.qualidadeMaxima), s.lacuna ? inline(ctx, String(s.lacuna)) : '']),
  );
  const cond = (d.condicoes ?? {}) as Record<string, Record<string, unknown>>;
  const condHtml = Object.entries(cond)
    .map(
      ([axis, e]) =>
        `<article class="axis"><h3>${esc(ctx.t(`axis.${axis}`))}</h3>` +
        `<h4>${esc(label(ctx, 'favorece'))}</h4>${val(ctx, e.favorece)}` +
        `<h4>${esc(label(ctx, 'contra'))}</h4>${val(ctx, e.contra)}` +
        (Array.isArray(e.preferir) && e.preferir.length ? `<h4>${esc(label(ctx, 'preferir'))}</h4>${linkList(ctx, e.preferir)}` : '') +
        (e.semAlternativa ? `<p class="muted">${inline(ctx, String(e.semAlternativa))}</p>` : '') +
        `</article>`,
    )
    .join('');
  const inst = Array.isArray(d.instancias) ? (d.instancias as Array<Record<string, unknown>>) : [];
  const instHtml = inst
    .map(
      (i) =>
        `<article class="variant"><h3>${esc(i.nome)}</h3>${i.descricao ? `<p>${inline(ctx, String(i.descricao))}</p>` : ''}` +
        (Array.isArray(i.linguagens) ? `<p class="muted">${esc(label(ctx, 'linguagens'))}: ${esc((i.linguagens as string[]).join(', '))}</p>` : '') +
        (Array.isArray(i.ferramentas) && i.ferramentas.length ? linkList(ctx, i.ferramentas) : '') +
        `</article>`,
    )
    .join('');
  const others = Array.isArray(d.outrosArquetipos) ? (d.outrosArquetipos as Array<Record<string, string>>) : [];
  const othersHtml = others.length ? `<ul class="links">${others.map((o) => `<li>${inline(ctx, o.stack)}: ${inline(ctx, o.quando)}</li>`).join('')}</ul>` : '';
  const base = ctx.data<{ itens: ChecklistItem[]; base_ia: ChecklistItem[] }>('checklist-base.json');
  const own = Array.isArray(d.checklist) ? (d.checklist as ChecklistItem[]) : [];
  const baseItems = d.dominio === 'ia' ? [...base.itens, ...base.base_ia] : base.itens;
  return (
    facts(ctx, d, SPEC.stack.facts) +
    conceitual(ctx, d) +
    section(ctx.t('s.slots'), `<p class="muted">${esc(ctx.t('s.slots.hint'))}</p>${slotTable}`) +
    section(ctx.t('s.conditions'), `<p class="muted">${esc(ctx.t('s.conditions.hint'))}</p>${condHtml}`) +
    section(label(ctx, 'instancias'), instHtml) +
    section(label(ctx, 'outrosArquetipos'), othersHtml) +
    section(ctx.t('s.setup'), `<p class="muted">${esc(ctx.t('s.setup.hint'))}</p>${own.length ? `<h3>${esc(ctx.t('s.setup.own'))}</h3>${checklistHtml(ctx, own)}` : ''}<h3>${esc(ctx.t('s.setup.base'))}</h3>${checklistHtml(ctx, baseItems)}`, 'setup') +
    relations(ctx, d, SPEC.stack.rels)
  );
}

function guia(ctx: Ctx, page: Page): { html: string; diagrams: number } {
  const d = page.entity.data;
  const views = visoesDoGuia(d).filter((v) => v.visao === 'visao' || v.visao === 'completo');
  const diagrams = views.map((v) => diagram(ctx, `${page.id}.${v.visao}`, ctx.t(`view.${v.visao}`), v.mmd)).join('');
  const perguntas = Array.isArray(d.perguntasDecisao) ? (d.perguntasDecisao as Array<Record<string, string>>) : [];
  const passos = Array.isArray(d.passos) ? (d.passos as Array<Record<string, unknown>>) : [];
  const como = Array.isArray(d.comoFazerHoje) ? (d.comoFazerHoje as Array<Record<string, unknown>>) : [];
  const comoHtml = como
    .map(
      (b) =>
        `<article class="variant"><h3>${esc(b.passo)}${b.variante ? ` <span class="muted">(${esc(b.variante)})</span>` : ''}</h3>` +
        `<pre><code>${esc((b.comandos as string[]).join('\n'))}</code></pre>` +
        `<p class="muted">${esc(label(ctx, 'versaoTestada'))}: ${esc(b.versaoTestada)}; ${esc(label(ctx, 'dataVerificacao'))}: ${esc(b.dataVerificacao)}; ${ext(String(b.fonteUrl), ctx.t('source'))}</p></article>`,
    )
    .join('');
  const html =
    facts(ctx, d, SPEC['guia-pratico'].facts) +
    section(label(ctx, 'preRequisitos'), val(ctx, d.preRequisitos)) +
    section(ctx.t('s.diagrams'), `<p class="muted">${esc(ctx.t('s.diagrams.hint'))}</p>${diagrams}`, 'diagrams') +
    section(label(ctx, 'perguntasDecisao'), perguntas.length ? `<ol>${perguntas.map((q) => `<li>${esc(q.pergunta)}</li>`).join('')}</ol>` : '') +
    section(
      label(ctx, 'passos'),
      passos.length
        ? `<ol class="steps">${passos.map((p) => `<li><strong>${esc(p.titulo)}</strong><p>${esc(p.descricao)}</p><p class="muted">${esc(label(ctx, 'verificacao'))}: ${esc(p.verificacao)}</p></li>`).join('')}</ol>`
        : '',
    ) +
    section(label(ctx, 'comoFazerHoje'), comoHtml) +
    section(label(ctx, 'armadilhas'), val(ctx, d.armadilhas)) +
    section(label(ctx, 'validacao'), val(ctx, d.validacao)) +
    conceitual(ctx, d) +
    relations(ctx, d, SPEC['guia-pratico'].rels);
  return { html, diagrams: views.length };
}

function certificacao(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  return facts(ctx, d, SPEC.certificacao.facts) + relations(ctx, d, SPEC.certificacao.rels);
}

export function licenseNotice(ctx: Ctx): string {
  return `<aside class="notice" role="note"><strong>${esc(ctx.t('license.notice'))}</strong> ${esc(ctx.t('license.notice.text'))}</aside>`;
}

function licenca(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const list = (k: string) => section(label(ctx, k), val(ctx, d[k], k));
  const spdx = String(d.spdx ?? '');
  const tools = ctx.index
    .ofTipo('ferramenta')
    .filter((p) => Array.isArray(p.entity.data.licenca) && (p.entity.data.licenca as string[]).includes(spdx))
    .sort((x, y) => x.nome.localeCompare(y.nome, ctx.locale));
  return (
    licenseNotice(ctx) +
    facts(ctx, d, SPEC.licenca.facts) +
    list('permissoes') +
    list('condicoes') +
    list('limitacoes') +
    list('compatibilidade') +
    list('quandoUsar') +
    list('quandoEvitar') +
    (tools.length ? section(label(ctx, 'ferramentas'), `<ul class="links">${tools.map((p) => `<li>${anchor(ctx, p)}</li>`).join('')}</ul>`, 'rel') : '') +
    relations(ctx, d, SPEC.licenca.rels)
  );
}
function jornada(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const etapas = Array.isArray(d.etapas) ? (d.etapas as Array<Record<string, unknown>>) : [];
  const html = etapas
    .map(
      (e) =>
        `<li><strong>${esc(e.titulo)}</strong>${e.descricao ? `<p>${inline(ctx, String(e.descricao))}</p>` : ''}${Array.isArray(e.itens) && e.itens.length ? linkList(ctx, e.itens) : ''}</li>`,
    )
    .join('');
  return facts(ctx, d, SPEC.jornada.facts) + section(label(ctx, 'etapas'), html ? `<ol class="steps">${html}</ol>` : '') + relations(ctx, d, SPEC.jornada.rels);
}

function competencia(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  const itens = Array.isArray(d.itens) ? (d.itens as Array<Record<string, string>>) : [];
  const niveis = Array.isArray(d.niveis) ? (d.niveis as Array<Record<string, unknown>>) : [];
  return (
    facts(ctx, d, SPEC.competencia.facts) +
    section(label(ctx, 'itens'), itens.length ? `<ul class="links">${itens.map((i) => `<li><strong>${esc(i.nome)}</strong>${i.detalhe ? `: ${esc(i.detalhe)}` : ''}</li>`).join('')}</ul>` : '') +
    section(label(ctx, 'niveis'), niveis.length ? `<ul class="links">${niveis.map((n) => `<li><strong>${esc(n.nivel)}</strong>: ${esc(n.descricao)}</li>`).join('')}</ul>` : '') +
    relations(ctx, d, SPEC.competencia.rels)
  );
}

function conceptual(ctx: Ctx, page: Page): string {
  const d = page.entity.data;
  return (
    facts(ctx, d, SPEC[page.tipo]?.facts ?? []) +
    conceitual(ctx, d) +
    section(label(ctx, 'como_aplicar'), val(ctx, d.como_aplicar)) +
    (d.resultado_esperado ? section(label(ctx, 'resultado_esperado'), `<p>${inline(ctx, String(d.resultado_esperado))}</p>`) : '')
  );
}

function generic(ctx: Ctx, page: Page): string {
  const spec = SPEC[page.tipo];
  return facts(ctx, page.entity.data, spec?.facts ?? []) + relations(ctx, page.entity.data, spec?.rels ?? []);
}

export function renderEntity(ctx: Ctx, page: Page): Rendered {
  let diagrams = 0;
  let flow = false;
  let middle: string;
  switch (page.tipo) {
    case 'ferramenta':
      middle = ferramenta(ctx, page);
      break;
    case 'categoria':
      middle = categoria(ctx, page);
      break;
    case 'caso-de-uso':
      middle = casoDeUso(ctx, page);
      break;
    case 'benchmark':
      middle = benchmark(ctx, page);
      break;
    case 'padrao':
      middle = padrao(ctx, page);
      break;
    case 'algoritmo':
      middle = algoritmo(ctx, page);
      break;
    case 'estrutura-de-dados':
      middle = estrutura(ctx, page);
      break;
    case 'stack':
      middle = stack(ctx, page);
      break;
    case 'guia-pratico': {
      const g = guia(ctx, page);
      middle = g.html;
      diagrams = g.diagrams;
      break;
    }
    case 'certificacao':
      middle = certificacao(ctx, page);
      break;
    case 'licenca':
      middle = licenca(ctx, page);
      break;
    case 'jornada':
      middle = jornada(ctx, page);
      break;
    case 'competencia':
      middle = competencia(ctx, page);
      break;
    case 'demanda': {
      const f = renderDemand(ctx, page);
      middle = f.html;
      diagrams = f.diagrams;
      flow = f.flow;
      break;
    }
    case 'tecnica':
    case 'abordagem':
    case 'estrategia':
    case 'requisito':
      middle = conceptual(ctx, page);
      break;
    default:
      middle = generic(ctx, page);
  }
  const html =
    head(ctx, page) +
    `<div class="entity-body">` +
    middle +
    anchored(ctx, page) +
    body(ctx, page) +
    fontes(ctx, page.entity.data) +
    inbound(ctx, page) +
    `</div>`;
  return { html, diagrams, flow };
}
