// SPDX-License-Identifier: MIT
// Byte-for-byte parity between lib/flow-mermaid and the Python reference (guias_diagrama.py, which equals
// the guide mermaid_gen.py on all 138 diagrams of the guide). Goldens in tests/fixtures/mermaid:
// - golden/: every view of bug and incidente (legend on) plus visao and completo with subtasks expanded.
// - guide-saida/: guide `saida/*.mmd` files that still equal the current generator (the others are stale in the guide).
// - notes/: three guide notes, the generated block of the note (completo, no legend) is the golden.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GeracaoError,
  gerarDiagrama,
  gerarTodos,
  guiaParaDoc,
  nomeArquivo,
  sanitizarId,
  visoesDaDemanda,
  visoesDoGuia,
  type Item,
} from '@lib/flow-mermaid';

const FIX = join(__dirname, '../fixtures/mermaid');
const read = (rel: string) => readFileSync(join(FIX, rel), 'utf8');
const doc = (name: string): Item => JSON.parse(read(`${name}.doc.json`));

describe.each(['bug', 'incidente'])('demand %s', (demanda) => {
  const d = doc(demanda);
  const views = visoesDaDemanda(d, demanda);

  it('lists views in stable order', () => {
    expect(views[0]).toBe('visao');
    expect(views[views.length - 1]).toBe('completo');
    expect(views.length).toBeGreaterThan(3);
  });

  it.each(views)('view %s equals the golden byte for byte', (view) => {
    const golden = read(`golden/${nomeArquivo(demanda, view)}`);
    expect(gerarDiagrama(d, demanda, view).texto).toBe(golden);
  });

  it.each(['visao', 'completo'])('view %s with expanded subtasks and no legend equals the golden', (view) => {
    const golden = read(`golden/${nomeArquivo(demanda, view).replace('.mmd', '.subtarefas.mmd')}`);
    expect(gerarDiagrama(d, demanda, view, false, true).texto).toBe(golden);
  });

  it('gerarTodos covers every non library demand view', () => {
    const all = gerarTodos(d);
    for (const view of views) expect(all.has(nomeArquivo(demanda, view))).toBe(true);
  });
});

describe('guide saida files that are still current', () => {
  const files = readdirSync(join(FIX, 'guide-saida')).filter((f) => f.endsWith('.mmd'));
  it('has at least the incidente files', () => {
    expect(files).toContain('incidente.visao.mmd');
  });
  it.each(files)('%s equals the file in the guide worktree', (file) => {
    const [demanda, ...rest] = file.replace(/\.mmd$/, '').split('.');
    const view = rest.join('.');
    const d = doc(demanda);
    const wanted = ['visao', 'completo'].includes(view) ? view : `raia:${view}`;
    expect(gerarDiagrama(d, demanda, wanted).texto).toBe(read(`guide-saida/${file}`));
  });
});

describe('generated blocks of guide notes', () => {
  it.each(['criar_api', 'criar_agente', 'configurar_git_github'])('%s: completo view equals the note block', (slug) => {
    const fm: Item = JSON.parse(read(`notes/${slug}.guia.json`));
    const completo = visoesDoGuia(fm).find((v) => v.visao === 'completo');
    expect(completo?.mmd).toBe(read(`notes/${slug}.completo.mmd`));
    expect(visoesDoGuia(fm)[0].visao).toBe('visao');
  });

  it('guiaParaDoc keeps the guide document shape', () => {
    const fm: Item = JSON.parse(read('notes/criar_api.guia.json'));
    const converted = guiaParaDoc(fm);
    expect(converted.demandas[0].id).toBe('criar_api');
    expect(converted.raias.length).toBe(fm.raias.length);
  });
});

describe('helpers', () => {
  it('sanitizarId is injective and keeps safe ids', () => {
    expect(sanitizarId('api_orq_s0')).toBe('api_orq_s0');
    expect(sanitizarId('end')).toBe('x_end');
    expect(sanitizarId('a-b')).toBe('x_a_2d_b');
    expect(sanitizarId('x_a')).not.toBe(sanitizarId('a'));
  });

  it('reports unknown demands and views with GeracaoError', () => {
    const d = doc('bug');
    expect(() => gerarDiagrama(d, 'nao_existe', 'visao')).toThrow(GeracaoError);
    expect(() => gerarDiagrama(d, 'bug', 'raia:nao_existe')).toThrow(GeracaoError);
    expect(() => gerarDiagrama(d, 'bug', 'outra')).toThrow(GeracaoError);
  });
});
