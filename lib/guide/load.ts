// SPDX-License-Identifier: MIT
// Loads the guide YAML folder (content/guide) with the semantics of loader.py of the guide: comum.yaml,
// raias-comuns.yaml, ritos.yaml, then demandas/<id>.yaml in `ordem_das_demandas` order (files outside the list go
// last, alphabetically). Lists are concatenated, maps and scalars may appear once. YAML 1.2 core schema.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';

export type GuideDoc = Record<string, any>;
export type GuideFile = { name: string; file: string; data: GuideDoc };

export const ARQUIVO_COMUM = 'comum.yaml';
export const ARQUIVO_RAIAS_COMUNS = 'raias-comuns.yaml';
export const ARQUIVO_RITOS = 'ritos.yaml';
export const PASTA_DEMANDAS = 'demandas';
export const CHAVE_ORDEM = 'ordem_das_demandas';

export class GuideLoadError extends Error {
  constructor(
    readonly file: string,
    message: string,
  ) {
    super(`${file}: ${message}`);
  }
}

function readOne(file: string): GuideDoc {
  let data: unknown;
  try {
    data = YAML.parse(readFileSync(file, 'utf8'), { schema: 'core', uniqueKeys: false });
  } catch (error) {
    throw new GuideLoadError(file, (error as Error).message);
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) throw new GuideLoadError(file, 'the top of the document must be a mapping');
  return data as GuideDoc;
}

/** True when the folder holds a guide (a comum.yaml). */
export const hasGuide = (dir: string) => existsSync(join(dir, ARQUIVO_COMUM));

/** Guide files in merge order, each parsed. */
export function loadGuideFiles(dir: string): GuideFile[] {
  const comum = join(dir, ARQUIVO_COMUM);
  if (!existsSync(comum)) throw new GuideLoadError(comum, 'the guide folder needs comum.yaml');
  const first = readOne(comum);
  const order: string[] = Array.isArray(first[CHAVE_ORDEM]) ? first[CHAVE_ORDEM] : [];
  const files: GuideFile[] = [{ name: ARQUIVO_COMUM, file: comum, data: first }];
  for (const extra of [ARQUIVO_RAIAS_COMUNS, ARQUIVO_RITOS]) {
    const file = join(dir, extra);
    if (existsSync(file)) files.push({ name: extra, file, data: readOne(file) });
  }
  const demandsDir = join(dir, PASTA_DEMANDAS);
  const present = new Map<string, string>();
  if (existsSync(demandsDir)) for (const f of readdirSync(demandsDir).filter((x) => x.endsWith('.yaml')).sort()) present.set(f.slice(0, -'.yaml'.length), join(demandsDir, f));
  for (const id of order) {
    const file = present.get(id);
    if (!file) throw new GuideLoadError(comum, `${CHAVE_ORDEM} lists '${id}', but demandas/${id}.yaml does not exist`);
    present.delete(id);
    files.push({ name: `${PASTA_DEMANDAS}/${id}.yaml`, file, data: readOne(file) });
  }
  for (const id of [...present.keys()].sort()) files.push({ name: `${PASTA_DEMANDAS}/${id}.yaml`, file: present.get(id) as string, data: readOne(present.get(id) as string) });
  return files;
}

/** One document: lists concatenated in file order, maps and scalars set once. */
export function mergeGuideFiles(files: GuideFile[]): GuideDoc {
  const doc: GuideDoc = {};
  const origin = new Map<string, string>();
  for (const f of files) {
    for (const [key, value] of Object.entries(f.data)) {
      if (key === CHAVE_ORDEM) continue;
      if (Array.isArray(value)) {
        if (key in doc && !Array.isArray(doc[key])) throw new GuideLoadError(f.file, `'${key}' is a list here and not in ${origin.get(key)}`);
        doc[key] ??= [];
        (doc[key] as unknown[]).push(...value);
        if (!origin.has(key)) origin.set(key, f.name);
      } else if (key in doc) {
        throw new GuideLoadError(f.file, `'${key}' is already defined in ${origin.get(key)}; maps and scalars live in one file`);
      } else {
        doc[key] = value;
        origin.set(key, f.name);
      }
    }
  }
  return doc;
}

export const loadGuideDoc = (dir: string): GuideDoc => mergeGuideFiles(loadGuideFiles(dir));
