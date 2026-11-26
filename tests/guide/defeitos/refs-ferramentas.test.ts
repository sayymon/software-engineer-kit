// SPDX-License-Identifier: MIT
// Task 2.2 (Requirements 10.3, 13.5): planted REF_QUEBRADA defects for `categorias_ferramenta` and `guias_praticos`,
// on a task and on a subtask. The problem names the item id, the field and the unresolved id.
// `guias_praticos` resolves only to notes of tipo `guia-pratico`; `categorias_ferramenta` only to categories.
import { describe, expect, it } from 'vitest';
import { loadContent } from '../../../lib/content';
import { deriveGuideEntities, guideDir, loadGuideFiles, type KitRef } from '../../../lib/guide';
import type { GuideFile } from '../../../lib/guide/load';

type D = any; // eslint-disable-line @typescript-eslint/no-explicit-any
const root = new URL('../../../', import.meta.url).pathname;
const contentRoot = `${root}content`;
const kit: KitRef[] = loadContent(contentRoot, 'pt-BR').entities.filter((e) => !e.derived).map((e) => ({ id: e.id, tipo: e.tipo, data: e.data }));
const GUIA = kit.find((k) => k.tipo === 'guia-pratico')!.id;
const NAO_GUIA = kit.find((k) => k.tipo !== 'guia-pratico')!.id;
const BAD = 'id_inexistente_xyz';
const CATEGORIA = 'categoria_plantada';

const fresh = (): GuideFile[] => loadGuideFiles(guideDir(contentRoot)).map((f) => ({ ...f, data: structuredClone(f.data) }));
/** Plants a category in the catalog and returns the first task with a subtask (and that subtask). */
function planta(files: GuideFile[]) {
  const ferramentas = files.find((f) => f.name.endsWith('ferramentas.yaml'))!;
  (ferramentas.data.categorias_ferramenta ??= []).push({ id: CATEGORIA, nome: 'Categoria plantada', custo: 'baixo', beneficio: 'alto', dependencia_fornecedor: 'baixa' });
  for (const f of files) for (const d of (f.data.decisoes as D[] | undefined) ?? []) if (d.tipo === 'tarefa' && d.subtarefas?.length) return { tarefa: d, sub: d.subtarefas[0] as D };
  throw new Error('no task with subtasks in the real guide');
}
const problemas = (files: GuideFile[]) => deriveGuideEntities(files, kit, contentRoot).problems;

describe('REF_QUEBRADA for categorias_ferramenta and guias_praticos', () => {
  it('accepts resolvable ids on a task and on a subtask', () => {
    const files = fresh();
    const { tarefa, sub } = planta(files);
    for (const o of [tarefa, sub]) Object.assign(o, { categorias_ferramenta: [CATEGORIA], guias_praticos: [GUIA] });
    expect(problemas(files)).toEqual([]);
  });

  describe.each([
    ['tarefa', (x: { tarefa: D; sub: D }) => x.tarefa],
    ['subtarefa', (x: { tarefa: D; sub: D }) => x.sub],
  ])('em %s', (_nome, alvo) => {
    it.each(['categorias_ferramenta', 'guias_praticos'])('reports an unknown id in %s with item id, field and id', (campo) => {
      const files = fresh();
      const dono = alvo(planta(files));
      dono[campo] = [BAD];
      const achados = problemas(files).filter((p) => p.startsWith('REF_QUEBRADA'));
      expect(achados).toEqual([`REF_QUEBRADA ${dono.id}: ${campo} referencia id não resolvido '${BAD}'`]);
    });

    it('rejects a guide note in categorias_ferramenta and a category in guias_praticos', () => {
      const files = fresh();
      const dono = alvo(planta(files));
      dono.categorias_ferramenta = [GUIA, NAO_GUIA];
      dono.guias_praticos = [CATEGORIA, NAO_GUIA];
      const achados = problemas(files).filter((p) => p.startsWith('REF_QUEBRADA'));
      expect(achados).toEqual([
        `REF_QUEBRADA ${dono.id}: categorias_ferramenta referencia id não resolvido '${GUIA}'`,
        `REF_QUEBRADA ${dono.id}: categorias_ferramenta referencia id não resolvido '${NAO_GUIA}'`,
        `REF_QUEBRADA ${dono.id}: guias_praticos referencia id não resolvido '${CATEGORIA}'`,
        `REF_QUEBRADA ${dono.id}: guias_praticos referencia id não resolvido '${NAO_GUIA}'`,
      ]);
    });
  });
});
