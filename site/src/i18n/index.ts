// SPDX-License-Identifier: MIT
// UI strings. Flat dotted keys, identical key sets in every locale (enforced by tests/i18n).
import en from './en.json';
import ptBR from './pt-BR.json';

export type Locale = 'pt-BR' | 'en';
export const messages: Record<Locale, Record<string, string>> = { 'pt-BR': ptBR, en };
export type T = (key: string, vars?: Record<string, string | number>) => string;

export function makeT(locale: Locale): T & { has: (key: string) => boolean } {
  const table = messages[locale];
  const t = (key: string, vars: Record<string, string | number> = {}): string => {
    const raw = table[key];
    if (raw === undefined) throw new Error(`missing UI string "${key}" for locale ${locale}`);
    return raw.replace(/\{(\w+)\}/g, (_m, name: string) => String(vars[name] ?? `{${name}}`));
  };
  return Object.assign(t, { has: (key: string) => key in table });
}
