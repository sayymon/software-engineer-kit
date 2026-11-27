// SPDX-License-Identifier: MIT
// Static data of the Home journeys scene: journeys, competencies and certifications, plus the links the content declares.
import { z } from 'zod';
import { relationTargets, type SiteIndex } from '../content/site';

export const NAO_VERIFICADO = 'não verificado';

export const JornadasHomeSchema = z.object({
  versao: z.literal(1),
  locale: z.enum(['pt-BR', 'en']),
  jornadas: z.array(z.object({ id: z.string(), nome: z.string(), perfil: z.string().optional(), etapas: z.number().int().nonnegative(), url: z.string() })),
  competencias: z.array(z.object({ id: z.string(), nome: z.string(), meiaVida: z.string().optional(), url: z.string() })),
  certificacoes: z.array(
    z.object({
      id: z.string(),
      nome: z.string(),
      emissor: z.string(),
      area: z.enum(['tecnica', 'soft-skill', 'ia']),
      nivel: z.enum(['fundamental', 'associado', 'profissional', 'especialista']),
      custoUSD: z.union([z.number(), z.literal(NAO_VERIFICADO)]),
      fonte: z.string().optional(),
      data: z.string().optional(),
      url: z.string(),
    }),
  ),
  /** Links declared in the content between journeys, competencies and certifications. */
  ligacoes: z.array(z.object({ de: z.string(), para: z.string() })),
});
export type JornadasHome = z.infer<typeof JornadasHomeSchema>;

export function construirJornadas(index: SiteIndex, href: (route: string) => string): JornadasHome {
  const ordenar = <T extends { nome: string }>(l: T[]) => l.sort((a, b) => a.nome.localeCompare(b.nome, index.locale));
  const dentro = new Set<string>();
  const jornadas = ordenar(
    index.ofTipo('jornada').map((p) => {
      dentro.add(p.id);
      return { id: p.id, nome: p.nome, perfil: typeof p.entity.data.perfil === 'string' ? p.entity.data.perfil : undefined, etapas: Array.isArray(p.entity.data.etapas) ? p.entity.data.etapas.length : 0, url: href(p.route) };
    }),
  );
  const competencias = ordenar(
    index.ofTipo('competencia').map((p) => {
      dentro.add(p.id);
      return { id: p.id, nome: p.nome, meiaVida: typeof p.entity.data.meiaVida === 'string' ? p.entity.data.meiaVida : undefined, url: href(p.route) };
    }),
  );
  const certificacoes = ordenar(
    index.ofTipo('certificacao').map((p) => {
      dentro.add(p.id);
      const d = p.entity.data;
      const custo = typeof d.custoUSD === 'number' ? d.custoUSD : NAO_VERIFICADO;
      const data = typeof d.dataVerificacao === 'string' ? d.dataVerificacao : undefined;
      const fonte = typeof d.urlOficial === 'string' ? d.urlOficial : undefined;
      return {
        id: p.id,
        nome: p.nome,
        emissor: String(d.emissor ?? ''),
        area: d.area as 'tecnica' | 'soft-skill' | 'ia',
        nivel: d.nivel as 'fundamental' | 'associado' | 'profissional' | 'especialista',
        // A price is shown only with source and date; otherwise it is "não verificado".
        custoUSD: custo === NAO_VERIFICADO || !fonte || !data ? NAO_VERIFICADO : custo,
        fonte: custo !== NAO_VERIFICADO && fonte && data ? fonte : undefined,
        data: custo !== NAO_VERIFICADO && fonte && data ? data : undefined,
        url: href(p.route),
      };
    }),
  );
  const ligacoes: Array<{ de: string; para: string }> = [];
  const vistos = new Set<string>();
  for (const p of [...index.ofTipo('jornada'), ...index.ofTipo('competencia'), ...index.ofTipo('certificacao')]) {
    for (const r of relationTargets(p.entity.data)) {
      const alvo = index.resolve(r.id);
      if (!alvo || alvo.id === p.id || !dentro.has(alvo.id)) continue;
      const chave = `${p.id}>${alvo.id}`;
      if (vistos.has(chave)) continue;
      vistos.add(chave);
      ligacoes.push({ de: p.id, para: alvo.id });
    }
  }
  return JornadasHomeSchema.parse({ versao: 1, locale: index.locale, jornadas, competencias, certificacoes, ligacoes });
}
