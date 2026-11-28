// SPDX-License-Identifier: MIT
// Task 2.1 (Requirements 10.1, 10.2, 18.6): Decisao and Subtarefa accept categorias_ferramenta, guias_praticos and sem_ferramenta.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { guideDir, loadGuideDoc } from '../../lib/guide';
import { validateSchema } from '../../lib/guide/validate/schema';
import type { D } from './support/expected';

const root = new URL('../../', import.meta.url).pathname;
const schema = JSON.parse(readFileSync(join(root, 'schema/flows.schema.json'), 'utf8'));
const base = loadGuideDoc(guideDir(`${root}content`));
const clone = (): D => JSON.parse(JSON.stringify(base));

type Obj = Record<string, unknown>;
const tarefaComSubtarefa = (doc: D) => {
  const t = (doc.decisoes as Obj[]).find((d) => d.tipo === 'tarefa' && Array.isArray(d.subtarefas) && d.subtarefas.length) as Obj;
  return { t, st: (t.subtarefas as Obj[])[0] };
};
const erros = (doc: D) => validateSchema(doc, schema);

describe('ferramentas fields in flows.schema.json', () => {
  it('accepts the new fields on a Decisao and on a Subtarefa', () => {
    const doc = clone();
    const { t, st } = tarefaComSubtarefa(doc);
    Object.assign(t, { categorias_ferramenta: ['cat_a'], guias_praticos: ['guia_a'], sem_ferramenta: false });
    Object.assign(st, { categorias_ferramenta: ['cat_b'], guias_praticos: ['guia_b'], sem_ferramenta: true });
    expect(erros(doc)).toEqual([]);
  });

  it('rejects a non-boolean sem_ferramenta and a malformed id list', () => {
    const doc = clone();
    const { t, st } = tarefaComSubtarefa(doc);
    t.sem_ferramenta = 'sim';
    st.categorias_ferramenta = ['Id Invalido'];
    expect(erros(doc).length).toBeGreaterThanOrEqual(2);
  });
});
