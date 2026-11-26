// SPDX-License-Identifier: MIT
// Facts shown in the side panel, per tipo. Loaded on demand, so the main payload stays small.
// Every volatile value (price, cost) carries its source and date, or the "não verificado" marker.
import { z } from 'zod';
import { linkTarget } from '../wikilinks';
import type { Page, SiteIndex } from '../content/site';

export const NAO_VERIFICADO = 'não verificado';

export const FatoSchema = z.object({
  rotulo: z.string(),
  valor: z.string().optional(),
  /** Entities the fact points to; the client turns them into links. */
  ids: z.array(z.string()).optional(),
  fonte: z.string().optional(),
  data: z.string().optional(),
  naoVerificado: z.boolean().optional(),
});
export type Fato = z.infer<typeof FatoSchema>;

export const FatosSchema = z.object({
  versao: z.literal(1),
  tipo: z.string(),
  itens: z.record(z.string(), z.array(FatoSchema)),
});
export type FatosPorTipo = z.infer<typeof FatosSchema>;

/** Tipos that have a facts file. The list grows by data, without touching the client. */
export const TIPOS_COM_FATOS = ['ferramenta', 'modelo', 'certificacao', 'tarefa', 'raia', 'demanda'] as const;

const idsDe = (index: SiteIndex, valor: unknown): string[] => {
  const lista = Array.isArray(valor) ? valor : valor === undefined || valor === null ? [] : [valor];
  const saida: string[] = [];
  for (const v of lista) {
    const alvo = typeof v === 'string' ? linkTarget(v) ?? v : null;
    const page = alvo ? index.resolve(alvo) : undefined;
    if (page) saida.push(page.id);
  }
  return [...new Set(saida)];
};

function dinheiro(rotulo: string, valor: unknown, fonte: unknown, data: unknown): Fato | null {
  if (valor === undefined) return null;
  const f = typeof fonte === 'string' && fonte && typeof data === 'string' && data ? { fonte, data } : null;
  if (typeof valor === 'number' && f) return { rotulo, valor: `US$ ${valor}`, ...f };
  return { rotulo, naoVerificado: true, valor: NAO_VERIFICADO };
}

function fatosDe(page: Page, index: SiteIndex): Fato[] {
  const d = page.entity.data;
  const fatos: Array<Fato | null> = [];
  const lista = (rotulo: string, valor: unknown) => {
    const ids = idsDe(index, valor);
    if (ids.length) fatos.push({ rotulo, ids });
  };
  switch (page.tipo) {
    case 'ferramenta':
      lista('Categorias', d.categorias);
      lista('Empresa', d.empresa);
      if (Array.isArray(d.licenca) && d.licenca.length) fatos.push({ rotulo: 'Licença', valor: d.licenca.join(', ') });
      fatos.push(dinheiro('Preço', d.precoUSD, d.fontePreco, d.dataVerificacao));
      break;
    case 'modelo':
      lista('Empresa', d.empresa);
      lista('Ferramentas', d.ferramentas);
      fatos.push(dinheiro('Preço de entrada (por milhão de tokens)', d.precoEntradaUSD, d.fontePreco, d.dataVerificacao));
      fatos.push(dinheiro('Preço de saída (por milhão de tokens)', d.precoSaidaUSD, d.fontePreco, d.dataVerificacao));
      break;
    case 'certificacao':
      if (typeof d.emissor === 'string') fatos.push({ rotulo: 'Emissor', valor: d.emissor });
      if (typeof d.nivel === 'string') fatos.push({ rotulo: 'Nível', valor: d.nivel });
      if (typeof d.validade === 'string') fatos.push({ rotulo: 'Validade', valor: d.validade });
      fatos.push(dinheiro('Custo', d.custoUSD, d.urlOficial, d.dataVerificacao));
      break;
    case 'tarefa':
      lista('Raia', d.raia);
      lista('Demanda', d.demanda);
      lista('Responsável', d.papel);
      lista('Apoio', d.apoio);
      lista('Aprova', d.aprova);
      break;
    case 'raia':
      lista('Demanda', d.demanda);
      if (typeof d.responsabilidade === 'string') fatos.push({ rotulo: 'Responsabilidade', valor: d.responsabilidade });
      break;
    case 'demanda':
      if (typeof d.sigla === 'string') fatos.push({ rotulo: 'Sigla', valor: d.sigla });
      if (Array.isArray(d.raias) && d.raias.length) fatos.push({ rotulo: 'Raias', valor: String(d.raias.length) });
      break;
  }
  return fatos.filter((f): f is Fato => f !== null);
}

export function construirFatos(index: SiteIndex): Map<string, FatosPorTipo> {
  const saida = new Map<string, FatosPorTipo>();
  for (const tipo of TIPOS_COM_FATOS) {
    const itens: Record<string, Fato[]> = {};
    for (const p of index.ofTipo(tipo)) {
      const f = fatosDe(p, index);
      if (f.length) itens[p.id] = f;
    }
    saida.set(tipo, FatosSchema.parse({ versao: 1, tipo, itens }));
  }
  return saida;
}
