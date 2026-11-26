// SPDX-License-Identifier: MIT
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { construirAdjacencia } from '../../lib/ecossistema/adjacencia';
import { CAMADAS, type Camada } from '../../lib/ecossistema/camadas';
import { ESTADO_PADRAO, ler, serializar, type EstadoEcossistema } from '../../lib/ecossistema/estado';
import { CRITERIO_PADRAO, arestasVisiveis, contarFaceta, filtrarNos, normalizar, type CriterioFiltro, type DadosFiltro } from '../../lib/ecossistema/filtro';
import { arranjoEmCasca, calcularFoco, raioDaCasca } from '../../lib/ecossistema/foco';

const TIPOS = ['ferramenta', 'categoria', 'tecnica', 'tarefa'];
const dadosAleatorios = fc.integer({ min: 1, max: 30 }).chain((n) =>
  fc.record({
    n: fc.constant(n),
    texto: fc.array(fc.constantFrom('git', 'docker', 'react', 'kafka', 'ci'), { minLength: n, maxLength: n }),
    camada: fc.array(fc.constantFrom<Camada>(...CAMADAS), { minLength: n, maxLength: n }),
    hub: fc.array(fc.boolean(), { minLength: n, maxLength: n }),
    tipo: fc.array(fc.constantFrom(...TIPOS), { minLength: n, maxLength: n }),
    cat: fc.array(fc.array(fc.constantFrom('a', 'b', 'c'), { maxLength: 2 }), { minLength: n, maxLength: n }),
  }),
);
const montar = (d: { n: number; texto: string[]; camada: Camada[]; hub: boolean[]; tipo: string[]; cat: string[][] }): DadosFiltro => ({
  n: d.n,
  texto: d.texto,
  camada: d.camada,
  hub: d.hub,
  facetas: { tipo: d.tipo.map((t) => [t]), cat: d.cat },
});
const criterio = fc.record({
  camadas: fc.subarray([...CAMADAS]).map((a) => new Set(a)),
  hubs: fc.boolean(),
  texto: fc.constantFrom('', 'git', 'do'),
  facetas: fc.record({ tipo: fc.subarray(TIPOS).map((a) => new Set(a)), cat: fc.subarray(['a', 'b', 'c']).map((a) => new Set(a)) }),
});

describe('filtros', () => {
  it('não dependem da ordem em que as facetas são aplicadas', () => {
    fc.assert(
      fc.property(dadosAleatorios, criterio, (d, c) => {
        const dados = montar(d);
        const ab = filtrarNos(dados, c as CriterioFiltro);
        const ba = filtrarNos(dados, { ...c, facetas: { cat: c.facetas.cat, tipo: c.facetas.tipo } } as CriterioFiltro);
        expect([...ab]).toEqual([...ba]);
      }),
    );
  });
  it('batem com a filtragem direta, escrita de outra forma', () => {
    fc.assert(
      fc.property(dadosAleatorios, criterio, (d, c) => {
        const dados = montar(d);
        const got = filtrarNos(dados, c as CriterioFiltro);
        for (let i = 0; i < d.n; i++) {
          const esperado =
            c.camadas.has(d.camada[i]) &&
            (c.hubs || !d.hub[i]) &&
            (!c.texto || d.texto[i].includes(c.texto)) &&
            (c.facetas.tipo.size === 0 || c.facetas.tipo.has(d.tipo[i])) &&
            (c.facetas.cat.size === 0 || d.cat[i].some((v) => c.facetas.cat.has(v)));
          expect(got[i] === 1).toBe(esperado);
        }
      }),
    );
  });
  it('aresta visível só quando as duas pontas estão visíveis', () => {
    const vis = Uint8Array.from([1, 0, 1]);
    expect(arestasVisiveis([[0, 1, 0], [0, 2, 0], [1, 2, 0]], vis)).toEqual([1]);
  });
  it('contagem de faceta ignora a própria faceta', () => {
    const dados: DadosFiltro = { n: 3, texto: ['a', 'b', 'c'], camada: ['nucleo', 'nucleo', 'nucleo'], hub: [false, false, false], facetas: { tipo: [['x'], ['y'], ['y']] } };
    const c: CriterioFiltro = { ...CRITERIO_PADRAO, facetas: { tipo: new Set(['x']) } };
    expect(Object.fromEntries(contarFaceta(dados, c, 'tipo'))).toEqual({ x: 1, y: 2 });
  });
  it('normaliza acentos e caixa na busca', () => {
    expect(normalizar('  Técnica ')).toBe('tecnica');
  });
});

describe('foco', () => {
  const estrela = (k: number) => construirAdjacencia(k + 1, Array.from({ length: k }, (_, i) => [0, i + 1, 0] as const));
  const op = (extra = {}) => ({ tipoDe: (i: number) => (i % 2 ? 'a' : 'b'), hub: () => false, visivel: () => true, ...extra });
  it('mostra todos os vizinhos até o limite', () => {
    const f = calcularFoco(estrela(100), 0, 1, op());
    expect(f.vizinhos).toHaveLength(100);
    expect(f.grupos).toHaveLength(0);
  });
  it('agrupa por tipo acima de 150 e só mostra os grupos expandidos', () => {
    const adj = estrela(300);
    const f = calcularFoco(adj, 0, 1, op());
    expect(f.vizinhos).toHaveLength(0);
    expect(f.grupos.map((g) => g.tipo).sort()).toEqual(['a', 'b']);
    const g = calcularFoco(adj, 0, 1, op({ expandidos: new Set(['a']) }));
    expect(g.vizinhos).toHaveLength(150);
  });
  it('profundidade 2 respeita o teto e não inclui hubs', () => {
    const arestas: Array<readonly [number, number, number]> = [];
    for (let i = 1; i <= 50; i++) arestas.push([0, i, 0]);
    for (let i = 1; i <= 50; i++) for (let j = 0; j < 20; j++) arestas.push([i, 100 + i * 20 + j, 0]);
    const adj = construirAdjacencia(1200, arestas);
    const hubs = new Set([101 + 20]);
    const f = calcularFoco(adj, 0, 2, op({ hub: (i: number) => hubs.has(i) }));
    expect(f.vizinhos.length).toBeLessThanOrEqual(400);
    for (const h of hubs) expect(f.vizinhos).not.toContain(h);
    expect(f.omitidos).toBeGreaterThan(0);
  });
  it('casca: pontos à mesma distância do centro e sem repetir', () => {
    const pts = arranjoEmCasca([10, 20, 30], 40, 50);
    for (const p of pts) expect(Math.hypot(p[0] - 10, p[1] - 20, p[2] - 30)).toBeCloseTo(50, 5);
    expect(new Set(pts.map((p) => p.join(','))).size).toBe(40);
    expect(raioDaCasca(1000)).toBeGreaterThan(raioDaCasca(10));
  });
});

describe('estado no hash', () => {
  const estado = fc.record({
    modo: fc.constantFrom<'lista' | 'ecossistema'>('lista', 'ecossistema'),
    foco: fc.option(fc.stringMatching(/^[a-z][a-z0-9_]{0,12}$/), { nil: null }),
    profundidade: fc.constantFrom<1 | 2>(1, 2),
    camadas: fc.subarray([...CAMADAS], { minLength: 1 }).map((a) => new Set(a)),
    hubs: fc.boolean(),
    texto: fc.string({ maxLength: 12 }).map((s) => s.trim()),
    facetas: fc.dictionary(fc.stringMatching(/^[a-z][a-z0-9]{1,6}$/).filter((k) => !['m', 'f', 'd', 'l', 'h', 'q'].includes(k)), fc.array(fc.string({ minLength: 1, maxLength: 6 }).map((s) => s.trim()).filter(Boolean), { minLength: 1, maxLength: 3 }).map((a) => new Set(a))),
  });
  it('round-trip para qualquer estado válido', () => {
    fc.assert(
      fc.property(estado, (e) => {
        const volta = ler(serializar(e as EstadoEcossistema));
        const norm = (x: EstadoEcossistema) => ({ ...x, camadas: [...x.camadas].sort(), facetas: Object.fromEntries(Object.entries(x.facetas).map(([k, v]) => [k, [...v].sort()])) });
        expect(norm(volta)).toEqual(norm(e as EstadoEcossistema));
      }),
    );
  });
  it('estado padrão gera hash vazio e hash inválido cai no padrão', () => {
    expect(serializar(ESTADO_PADRAO)).toBe('');
    expect(ler('#%E0%A4%A&&=x&m')).toEqual(ESTADO_PADRAO);
    expect(ler('#l=inventado').camadas).toEqual(ESTADO_PADRAO.camadas);
  });
});
