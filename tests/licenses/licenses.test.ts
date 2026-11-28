// SPDX-License-Identifier: MIT
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { loadContent, type LoadedEntity } from '../../lib/content';
import { validateEntity } from '../../lib/schema';
import { EXPECTED_LICENSES, checkLicenses } from '../../tools/validate/checks/licenses';

const root = fileURLToPath(new URL('../../', import.meta.url));
const { entities } = loadContent(join(root, 'content'), 'pt-BR');
const notes = entities.filter((e) => e.tipo === 'licenca');
const clone = (e: LoadedEntity, data: Record<string, unknown>): LoadedEntity => ({ ...e, data: { ...e.data, ...data } });
const withNote = (id: string, data: Record<string, unknown>): LoadedEntity[] => entities.map((e) => (e.id === id ? clone(e, data) : e));

describe('license notes', () => {
  it('ships the expected notes with the exact SPDX ids', () => {
    expect(notes.map((n) => n.id).sort()).toEqual(Object.keys(EXPECTED_LICENSES).sort());
    for (const [id, spdx] of Object.entries(EXPECTED_LICENSES)) expect(notes.find((n) => n.id === id)?.data.spdx).toBe(spdx);
  });
  it('passes the completeness check with 0 failures', () => {
    expect(checkLicenses(entities)).toEqual([]);
  });
  it('validates every note against the schema', () => {
    for (const n of notes) expect(validateEntity({ ...n.data, id: n.id }).ok, n.id).toBe(true);
  });
  it('names FSL with an SPDX id that exists in the list', () => {
    expect(notes.find((n) => n.id === 'fsl_1_1_mit')?.data.spdx).toBe('FSL-1.1-MIT');
  });
  it('flags an empty required field', () => {
    expect(checkLicenses(withNote('mit', { condicoes: [] })).join('\n')).toMatch(/mit: condicoes/);
  });
  it('flags an official url that is not https', () => {
    expect(checkLicenses(withNote('mit', { urlOficial: 'http://opensource.org/license/mit' })).join('\n')).toMatch(/urlOficial/);
  });
  it('flags a host that is not an official license host', () => {
    expect(checkLicenses(withNote('mit', { urlOficial: 'https://example.org/mit' })).join('\n')).toMatch(/not an official license host/);
  });
  it('flags a guess without the unverified marker and accepts it with the marker', () => {
    expect(checkLicenses(withNote('mit', { clausulaPatentes: 'Provavelmente cobre patentes.' })).join('\n')).toMatch(/guess/);
    expect(checkLicenses(withNote('mit', { clausulaPatentes: 'Provavelmente cobre patentes (não verificado).' }))).toEqual([]);
  });
  it('flags an approval flag that is neither boolean nor the marker', () => {
    expect(checkLicenses(withNote('mit', { aprovacaoOSI: 'talvez' })).join('\n')).toMatch(/aprovacaoOSI/);
  });
  it('flags a missing note and a missing legal notice', () => {
    expect(checkLicenses(entities.filter((e) => e.id !== 'sspl_1_0')).join('\n')).toMatch(/missing: sspl_1_0/);
    const guide = entities.find((e) => e.id === 'guia_de_escolha_de_licenca') as LoadedEntity;
    const noNotice = entities.map((e) => (e.id === guide.id ? { ...e, body: 'Sem aviso.' } : e));
    expect(checkLicenses(noNotice).join('\n')).toMatch(/notice is missing/);
  });
  it('flags a tool that declares an unknown license', () => {
    const tool = entities.find((e) => e.tipo === 'ferramenta') as LoadedEntity;
    const changed = entities.map((e) => (e.id === tool.id ? clone(e, { licenca: ['Nao-Existe-1.0'] }) : e));
    expect(checkLicenses(changed).join('\n')).toMatch(/Nao-Existe-1.0/);
  });
  it('keeps the legal notice and the kit own choice in the decision guide', () => {
    const guide = entities.find((e) => e.id === 'guia_de_escolha_de_licenca') as LoadedEntity;
    expect(guide.body).toMatch(/Não é aconselhamento jurídico/);
    expect(guide.body).toMatch(/\[\[mit\|MIT\]\]/);
    expect(guide.body).toMatch(/CC BY 4\.0/);
  });
});
