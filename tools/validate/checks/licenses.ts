// SPDX-License-Identifier: MIT
import type { LoadedEntity } from '../../../lib/content';
import { UNVERIFIED } from '../../../lib/schema/licenca';
import { fail, na, ok, type Check } from '../types';

/** The license notes the kit must carry: note id to the exact SPDX identifier from spdx.org. */
export const EXPECTED_LICENSES: Record<string, string> = {
  mit: 'MIT',
  apache_2_0: 'Apache-2.0',
  bsd_2_clause: 'BSD-2-Clause',
  bsd_3_clause: 'BSD-3-Clause',
  gpl_3_0: 'GPL-3.0-only',
  agpl_3_0: 'AGPL-3.0-only',
  lgpl_3_0: 'LGPL-3.0-only',
  mpl_2_0: 'MPL-2.0',
  unlicense: 'Unlicense',
  cc0_1_0: 'CC0-1.0',
  cc_by_4_0: 'CC-BY-4.0',
  cc_by_sa_4_0: 'CC-BY-SA-4.0',
  cc_by_nc_4_0: 'CC-BY-NC-4.0',
  cc_by_nd_4_0: 'CC-BY-ND-4.0',
  busl_1_1: 'BUSL-1.1',
  sspl_1_0: 'SSPL-1.0',
  fsl_1_1_mit: 'FSL-1.1-MIT',
  fsl_1_1_alv2: 'FSL-1.1-ALv2',
  elastic_2_0: 'Elastic-2.0',
  epl_2_0: 'EPL-2.0',
  gpl_2_0: 'GPL-2.0-only',
  lgpl_2_1: 'LGPL-2.1-only',
  python_2_0: 'Python-2.0',
};
export const LICENSES_DIR = 'fundamentals/licenses/';
export const DECISION_GUIDE_ID = 'guia_de_escolha_de_licenca';
export const NOTICE_RE = /não é aconselhamento jurídico/i;
/** Hosts that publish the official text or the official description of a license. */
export const OFFICIAL_HOSTS = [
  'opensource.org',
  'www.apache.org',
  'www.gnu.org',
  'www.mozilla.org',
  'unlicense.org',
  'creativecommons.org',
  'mariadb.com',
  'www.mongodb.com',
  'fsl.software',
  'www.elastic.co',
  'spdx.org',
  'www.eclipse.org',
];
/** Words that signal a guess. A text that guesses must also carry the "não verificado" marker. */
const HEDGES = /\b(provavelmente|talvez|possivelmente|aparentemente|acredito|parece que)\b/i;
const REQUIRED_LISTS = ['permissoes', 'condicoes', 'limitacoes', 'compatibilidade', 'quandoUsar', 'quandoEvitar'] as const;
const REQUIRED_TEXT = ['nome', 'descricao', 'spdx', 'tipoLicenca', 'clausulaPatentes', 'urlOficial', 'dataVerificacao'] as const;

const isFilled = (v: unknown): boolean => typeof v === 'string' && v.trim().length > 0;

function strings(entity: LoadedEntity): string[] {
  const out: string[] = [String(entity.data.descricao ?? ''), String(entity.data.clausulaPatentes ?? '')];
  for (const k of REQUIRED_LISTS) for (const v of (entity.data[k] as unknown[] | undefined) ?? []) out.push(String(v));
  return out;
}

/** Pure check over loaded entities, shared by the CLI check and the tests. */
export function checkLicenses(entities: LoadedEntity[]): string[] {
  const problems: string[] = [];
  const notes = entities.filter((e) => e.tipo === 'licenca');
  const byId = new Map(notes.map((e) => [e.id, e]));
  for (const [id, spdx] of Object.entries(EXPECTED_LICENSES)) {
    const note = byId.get(id);
    if (!note) {
      problems.push(`license note missing: ${id} (${spdx})`);
      continue;
    }
    if (note.data.spdx !== spdx) problems.push(`${id}: spdx is "${String(note.data.spdx)}", expected "${spdx}"`);
  }
  for (const note of notes) {
    const where = `license ${note.id}`;
    if (!(note.id in EXPECTED_LICENSES)) problems.push(`${where}: not in the expected list of 18 notes`);
    if (!note.relPath.startsWith(LICENSES_DIR)) problems.push(`${where}: lives outside ${LICENSES_DIR}, so the license hub would not list it`);
    for (const k of REQUIRED_TEXT) if (!isFilled(note.data[k])) problems.push(`${where}: ${k} is empty`);
    for (const k of REQUIRED_LISTS) {
      const list = note.data[k];
      if (!Array.isArray(list) || list.length === 0 || list.some((v) => !isFilled(v))) problems.push(`${where}: ${k} must be a list of filled items`);
    }
    for (const k of ['aprovacaoOSI', 'aprovacaoFSF'] as const) {
      const v = note.data[k];
      if (typeof v !== 'boolean' && v !== UNVERIFIED) problems.push(`${where}: ${k} must be true, false or "${UNVERIFIED}"`);
    }
    const url = String(note.data.urlOficial ?? '');
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:') problems.push(`${where}: urlOficial must use https`);
      else if (!OFFICIAL_HOSTS.includes(u.hostname)) problems.push(`${where}: urlOficial host ${u.hostname} is not an official license host`);
    } catch {
      problems.push(`${where}: urlOficial is not a valid url`);
    }
    const fontes = (note.data.fontes as Array<{ id: string; link: string }> | undefined) ?? [];
    if (fontes.length === 0) problems.push(`${where}: at least one source (fontes) is required`);
    for (const f of fontes) if (!/^https:\/\//.test(f.link)) problems.push(`${where}: source ${f.id} must link with https`);
    const ids = (note.data.fonte_ids as string[] | undefined) ?? [];
    for (const f of fontes) if (!ids.includes(f.id)) problems.push(`${where}: source ${f.id} is missing from fonte_ids`);
    for (const t of strings(note)) if (HEDGES.test(t) && !t.includes(UNVERIFIED)) problems.push(`${where}: a guess without the "${UNVERIFIED}" marker: "${t.slice(0, 80)}"`);
  }
  // Decision guide with the visible legal notice, and the kit's own license choice.
  const guide = entities.find((e) => e.id === DECISION_GUIDE_ID);
  if (!guide) problems.push(`decision guide missing: ${DECISION_GUIDE_ID}`);
  else {
    if (!guide.relPath.startsWith(LICENSES_DIR)) problems.push(`${DECISION_GUIDE_ID}: must live under ${LICENSES_DIR}`);
    if (!NOTICE_RE.test(guide.body)) problems.push(`${DECISION_GUIDE_ID}: the visible "Não é aconselhamento jurídico" notice is missing from the body`);
    if (!/\[\[mit\b/.test(guide.body) || !/\[\[cc_by_4_0\b/.test(guide.body)) problems.push(`${DECISION_GUIDE_ID}: must state that the kit uses MIT for code and CC BY 4.0 for content`);
  }
  // Tools that declare a license must use a known SPDX id.
  const known = new Set(notes.map((n) => String(n.data.spdx)));
  for (const e of entities) {
    if (e.tipo !== 'ferramenta') continue;
    for (const s of (e.data.licenca as string[] | undefined) ?? []) if (!known.has(s)) problems.push(`tool ${e.id}: licenca "${s}" has no license note`);
  }
  return problems;
}

export const licenses: Check = {
  name: 'licenses',
  description: 'license notes are complete: 18 notes, required fields filled, official https url, unverified facts marked, decision guide with the legal notice',
  run(ctx) {
    const { entities } = ctx.source();
    const notes = entities.filter((e) => e.tipo === 'licenca');
    if (notes.length === 0) return na('no license notes in this content root');
    const problems = checkLicenses(entities);
    return problems.length ? fail(problems) : ok(`${notes.length} license notes, 0 failures`);
  },
};
