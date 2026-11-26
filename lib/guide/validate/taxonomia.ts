// SPDX-License-Identifier: MIT
// Taxonomy warnings of the guide validator (nivel "aviso"), run with `avisos` and `completude`.
// Ported from the Python oracle (validator.py: _checar_completude): COMUNICACAO_SEM_DESTINATARIO, TIPO_LEGADO,
// SUBTIPO_AUSENTE and SUBTIPO_INVALIDO.
import type { GuideDoc } from '../index';
import { SUBTIPOS, TIPOS, eComunicacao } from '../taxonomia';
type Doc = GuideDoc;
type Aviso = (code: string, path: string, message: string, itemId: string) => void;
const list = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);
const has = (o: object, k: string): boolean => Object.hasOwn(o, k);
/** Python truthiness for the values a schema-valid artifact can hold. */
const truthy = (v: unknown): boolean => !(v === undefined || v === null || v === '' || v === 0 || v === false || (Array.isArray(v) && v.length === 0));
export function checarTaxonomia(doc: Doc, aviso: Aviso): void {
  list(doc.artefatos).forEach((art, i) => {
    if (eComunicacao(art) && !truthy(art.destinatarios)) {
      aviso('COMUNICACAO_SEM_DESTINATARIO', `artefatos[${i}]`, `a comunicação '${art.id}' não declara \`destinatarios\` (papéis que a recebem)`, art.id);
    }
    const tipo = art.tipo as string | undefined;
    const subtipo = art.subtipo as string | undefined;
    const tipoNovo = truthy(tipo) && (TIPOS as readonly string[]).includes(tipo as string);
    const comSubtipos = truthy(tipo) && has(SUBTIPOS, tipo as string);
    if (truthy(tipo) && !tipoNovo) {
      aviso('TIPO_LEGADO', `artefatos[${i}].tipo`,
        `'${art.id}' usa o tipo legado '${tipo}'; use a taxonomia nova (card, comunicação e configuração são subtipos de ação; dado é documento)`, art.id);
    } else if (comSubtipos && !truthy(subtipo)) {
      aviso('SUBTIPO_AUSENTE', `artefatos[${i}]`, `'${art.id}' é do tipo '${tipo}' e não declara \`subtipo\` (${Object.keys(SUBTIPOS[tipo as string]).join(', ')})`, art.id);
    } else if (comSubtipos && !has(SUBTIPOS[tipo as string], String(subtipo))) {
      aviso('SUBTIPO_INVALIDO', `artefatos[${i}].subtipo`,
        `o subtipo '${subtipo}' de '${art.id}' não existe no tipo '${tipo}' (${Object.keys(SUBTIPOS[tipo as string]).join(', ')})`, art.id);
    } else if (truthy(tipo) && !comSubtipos && truthy(subtipo)) {
      aviso('SUBTIPO_INVALIDO', `artefatos[${i}].subtipo`, `o tipo '${tipo}' de '${art.id}' não tem subtipos`, art.id);
    }
  });
}
