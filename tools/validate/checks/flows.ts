// SPDX-License-Identifier: MIT
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { guideDir, hasGuide, loadGuideDoc, type GuideDoc } from '../../../lib/guide';
import { validateGuide } from '../../../lib/guide/validate';
import { fail, na, ok, type Check } from '../types';

/** Strict: schema, rules, warnings (`avisos`) and completeness (`completude`) all count as problems. */
export function guideProblems(doc: GuideDoc, schema: object): string[] {
  return validateGuide(doc, schema, { avisos: true, completude: true }).map((p) => `${p.code} (${p.nivel}) ${p.path}: ${p.message}`);
}

const LETTER: Record<string, string> = { inicio: 's', tarefa: 't', bifurcacao: 'g', chamada: 'c', fim: 'e' };

export const flows: Check = {
  name: 'flows',
  description: 'the guide YAML (content/guide) validates against the vendored JSON Schema and the guide cross-reference rules; practical guides keep their lane and node structure',
  run(ctx) {
    const { entities } = ctx.source();
    const demands = entities.filter((e) => e.tipo === 'demanda');
    if (!hasGuide(guideDir(ctx.contentRoot))) return na('no guide yet');
    const problems: string[] = [];
    const doc = loadGuideDoc(guideDir(ctx.contentRoot));
    const schemaFile = join(ctx.root, 'schema/flows.schema.json');
    const schema = JSON.parse(readFileSync(schemaFile, 'utf8')) as object;
    problems.push(...guideProblems(doc, schema));
    const order = (demands.find((d) => d.id === 'comum')?.data.ordem_das_demandas as string[] | undefined) ?? [];
    for (const id of order) if (!demands.some((d) => d.id === id)) problems.push(`demand "${id}" listed in ordem_das_demandas has no flow`);
    // Practical guides (kit shape): lanes, nodes, orchestrator, calls.
    const guides = entities.filter((e) => e.tipo === 'guia-pratico');
    for (const g of guides) {
      const raias = (g.data.raias as Array<Record<string, any>>) ?? [];
      const nos = (g.data.nos as Array<Record<string, any>>) ?? [];
      const lane = new Set(raias.map((r) => r.id));
      const node = new Set(nos.map((n) => n.id));
      const where = `guide ${g.id}`;
      if (lane.size !== raias.length) problems.push(`${where}: lane ids repeat`);
      if (node.size !== nos.length) problems.push(`${where}: node ids repeat`);
      if (raias.filter((r) => r.orquestradora === true).length !== 1) problems.push(`${where}: expected exactly one orchestrator lane`);
      for (const n of nos) {
        if (!lane.has(n.raia)) problems.push(`${where}: node ${n.id} points to missing lane ${n.raia}`);
        if (n.raia_chamada !== undefined && !lane.has(n.raia_chamada)) problems.push(`${where}: node ${n.id} calls missing lane ${n.raia_chamada}`);
        for (const p of (n.proximo as Array<{ para: string }> | undefined) ?? []) if (!node.has(p.para)) problems.push(`${where}: node ${n.id} points to missing node ${p.para}`);
        if (!new RegExp(`^${String(n.raia).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_${LETTER[n.tipo]}\\d+$`).test(n.id)) problems.push(`${where}: node id ${n.id} does not follow <lane>_<${LETTER[n.tipo]}><n>`);
      }
      const sigla = String(g.data.sigla ?? '');
      for (const r of raias) if (!String(r.id).startsWith(`${sigla}_`)) problems.push(`${where}: lane ${r.id} does not start with ${sigla}_`);
    }
    return problems.length ? fail(problems) : ok(`${demands.length} flows, ${guides.length} guides`);
  },
};
export const hasFlowsSchema = (root: string) => existsSync(join(root, 'schema/flows.schema.json'));
