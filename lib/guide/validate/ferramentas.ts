// SPDX-License-Identifier: MIT
// Tool/guide link rules of the guide validator (nivel "aviso"). New rules of the spec experiencia-fluxos-catalogo
// (no Python oracle): CATEGORIA_FERRAMENTA_DUPLICADA and GUIA_PRATICO_DUPLICADO (Requirement 10.4, run with `avisos`)
// and SEM_FERRAMENTA_OU_GUIA (Requirements 10.16, 18.3, 18.6, run with `avisos` and `completude`).
import type { GuideDoc } from '../index';

type Doc = GuideDoc;
type Aviso = (code: string, path: string, message: string, itemId: string) => void;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const strs = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);

/**
 * Demands whose tasks must declare a tool category, a practical guide or the explicit `sem_ferramenta` marker.
 * Only `feature` is listed (its data is linked). Other demands stay valid without the fields.
 */
export const DEMANDAS_COM_LIGACAO_OBRIGATORIA: readonly string[] = ['feature'];

const CAMPOS_REPETIDOS = [
  ['categorias_ferramenta', 'CATEGORIA_FERRAMENTA_DUPLICADA', 'a categoria de ferramenta'],
  ['guias_praticos', 'GUIA_PRATICO_DUPLICADO', 'o guia prático'],
] as const;

/** Warns once per extra occurrence of an id inside one task or subtask (the second and later uses). */
export function checarLigacaoDuplicada(doc: Doc, aviso: Aviso): void {
  const checa = (dono: Doc, base: string): void => {
    for (const [campo, code, rotulo] of CAMPOS_REPETIDOS) {
      const vistos = new Set<string>();
      strs(dono[campo]).forEach((id, j) => {
        if (vistos.has(id)) aviso(code, `${base}.${campo}[${j}]`, `${rotulo} '${id}' repete em \`${campo}\` de '${dono.id}'`, dono.id);
        vistos.add(id);
      });
    }
  };
  list(doc.decisoes).forEach((d, i) => {
    checa(d, `decisoes[${i}]`);
    list(d.subtarefas).forEach((sub, k) => checa(sub, `decisoes[${i}].subtarefas[${k}]`));
  });
}

/** SEM_FERRAMENTA_OU_GUIA: a task of a listed demand with no category, no guide and no `sem_ferramenta: true`. */
export function checarLigacaoObrigatoria(doc: Doc, aviso: Aviso, demandas: readonly string[] = DEMANDAS_COM_LIGACAO_OBRIGATORIA): void {
  if (!demandas.length) return;
  const demandaDaRaia = new Map<string, string>();
  for (const r of list(doc.raias)) if (!demandaDaRaia.has(r.id)) demandaDaRaia.set(r.id, r.demanda);
  list(doc.decisoes).forEach((d, i) => {
    if (d.tipo !== 'tarefa') return;
    const demanda = demandaDaRaia.get(d.raia);
    if (demanda === undefined || !demandas.includes(demanda)) return;
    if (strs(d.categorias_ferramenta).length || strs(d.guias_praticos).length || d.sem_ferramenta === true) return;
    aviso('SEM_FERRAMENTA_OU_GUIA', `decisoes[${i}]`,
      `a tarefa '${d.id}' da demanda '${demanda}' não declara \`categorias_ferramenta\` nem \`guias_praticos\`; declare ao menos um ou marque \`sem_ferramenta: true\``, d.id);
  });
}
