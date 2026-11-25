// SPDX-License-Identifier: MIT
/** Helpers shared by guide validation rules. */

import type { GuideDoc } from '../index';

/**
 * Formats a JSON-schema path using the guide validator convention.
 * Collection indexes use brackets, while object keys use dot notation.
 */
export function caminho(partes: Iterable<unknown>): string {
  let out = '';
  for (const parte of partes) {
    if (typeof parte === 'number' && Number.isInteger(parte)) out += `[${parte}]`;
    else out += out ? `.${String(parte)}` : String(parte);
  }
  return out;
}

/** Returns the id of the top-level collection item addressed by a path. */
export function itemIdDoCaminho(doc: GuideDoc, partes: readonly unknown[]): string | null {
  if (partes.length < 2 || typeof partes[1] !== 'number' || !Number.isInteger(partes[1])) return null;
  const colecao = doc[String(partes[0])];
  if (!Array.isArray(colecao) || partes[1] < 0 || partes[1] >= colecao.length) return null;
  const item = colecao[partes[1]];
  return item && typeof item === 'object' && !Array.isArray(item) && typeof item.id === 'string' ? item.id : null;
}

/** Deep-copies a document while converting Date values to ISO strings. */
export function normalizarDatas(valor: unknown): unknown {
  if (valor instanceof Date) {
    const iso = valor.toISOString();
    return iso.endsWith('T00:00:00.000Z') ? iso.slice(0, 10) : iso;
  }
  if (Array.isArray(valor)) return valor.map(normalizarDatas);
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(Object.entries(valor).map(([chave, item]) => [chave, normalizarDatas(item)]));
  }
  return valor;
}

// Aliases retain the terminology used by the Python oracle and make the helpers
// convenient to import while the remaining rule groups are ported.
export const _caminho = caminho;
export const _itemIdDoCaminho = itemIdDoCaminho;
export const _item_id_do_caminho = itemIdDoCaminho;
export const _normalizarDatas = normalizarDatas;
export const _normalizar_datas = normalizarDatas;
