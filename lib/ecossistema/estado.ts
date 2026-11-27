// SPDX-License-Identifier: MIT
// Page state in the URL fragment. Canonical order, tolerant parsing, round-trips for every valid state.
import { CAMADAS, type Camada } from './camadas';

export interface EstadoEcossistema {
  modo: 'lista' | 'ecossistema';
  foco: string | null;
  profundidade: 1 | 2;
  camadas: ReadonlySet<Camada>;
  hubs: boolean;
  texto: string;
  facetas: Readonly<Record<string, ReadonlySet<string>>>;
}

export const ESTADO_PADRAO: EstadoEcossistema = {
  modo: 'lista',
  foco: null,
  profundidade: 1,
  camadas: new Set<Camada>(['nucleo', 'fluxo']),
  hubs: false,
  texto: '',
  facetas: {},
};

const RESERVADOS = new Set(['m', 'f', 'd', 'l', 'h', 'q']);
const mesmasCamadas = (a: ReadonlySet<Camada>, b: ReadonlySet<Camada>) => a.size === b.size && [...a].every((c) => b.has(c));

export function serializar(e: EstadoEcossistema): string {
  const p: string[] = [];
  const add = (k: string, v: string) => p.push(`${k}=${encodeURIComponent(v)}`);
  // Lists keep a literal comma between values and encode each value on its own.
  const addLista = (k: string, vs: string[]) => p.push(`${k}=${vs.map(encodeURIComponent).join(',')}`);
  if (e.modo === 'ecossistema') add('m', 'eco');
  if (e.foco) add('f', e.foco);
  if (e.profundidade === 2) add('d', '2');
  if (!mesmasCamadas(e.camadas, ESTADO_PADRAO.camadas)) addLista('l', CAMADAS.filter((c) => e.camadas.has(c)));
  if (e.hubs) add('h', '1');
  if (e.texto) add('q', e.texto);
  for (const nome of Object.keys(e.facetas).sort()) {
    const valores = [...e.facetas[nome]].sort();
    if (valores.length && !RESERVADOS.has(nome) && /^[a-zA-Z][\w-]*$/.test(nome)) addLista(nome, valores);
  }
  return p.length ? `#${p.join('&')}` : '';
}

const dec = (s: string): string | null => {
  try {
    return decodeURIComponent(s);
  } catch {
    return null;
  }
};

export function ler(hash: string): EstadoEcossistema {
  const bruto = hash.startsWith('#') ? hash.slice(1) : hash;
  const mapa = new Map<string, string>();
  for (const parte of bruto.split('&')) {
    const i = parte.indexOf('=');
    if (i <= 0) continue;
    const chave = dec(parte.slice(0, i));
    if (chave) mapa.set(chave, parte.slice(i + 1));
  }
  const unico = (k: string): string => dec(mapa.get(k) ?? '') ?? '';
  const lista = (k: string): string[] =>
    (mapa.get(k) ?? '')
      .split(',')
      .map((v) => dec(v) ?? '')
      .map((v) => v.trim())
      .filter(Boolean);
  const camadas = new Set<Camada>();
  for (const c of lista('l')) if ((CAMADAS as readonly string[]).includes(c)) camadas.add(c as Camada);
  const facetas: Record<string, Set<string>> = {};
  for (const k of mapa.keys()) {
    if (RESERVADOS.has(k) || !/^[a-zA-Z][\w-]*$/.test(k)) continue;
    const valores = lista(k);
    if (valores.length) facetas[k] = new Set(valores);
  }
  return {
    modo: unico('m') === 'eco' ? 'ecossistema' : 'lista',
    foco: unico('f') || null,
    profundidade: unico('d') === '2' ? 2 : 1,
    camadas: camadas.size ? camadas : new Set(ESTADO_PADRAO.camadas),
    hubs: unico('h') === '1',
    texto: unico('q'),
    facetas,
  };
}
