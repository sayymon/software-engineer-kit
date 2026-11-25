// SPDX-License-Identifier: MIT
// Content loader. `content/pt-BR/**` is the source of truth. `content/en/**` mirrors the same relative
// paths and holds overlays with translatable fields only. A missing overlay means fallback to pt-BR.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import matter from 'gray-matter';
import YAML from 'yaml';
import { TYPES, sourceHash, translatableFields, type Tipo } from '../schema';
import { deriveGuideEntities, guideDir, hasGuide, loadGuideFiles } from '../guide';

export const SOURCE_LOCALE = 'pt-BR';
export const LOCALES = ['pt-BR', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Folders under content/<locale>/ that are not entities. */
const NON_ENTITY_TOP = new Set(['data']);
const NON_ENTITY_FILES = new Set(['ids.lock.json', 'README.md']);

export type LoadedEntity = {
  id: string;
  tipo: string;
  locale: Locale;
  /** Path relative to content/<locale>/, identical in every locale. */
  relPath: string;
  /** Absolute path of the pt-BR source file. */
  file: string;
  data: Record<string, unknown>;
  body: string;
  /** True when the locale has no overlay and the pt-BR text is shown. */
  fallback: boolean;
  /** True when the overlay was written for an older pt-BR text (source_hash differs). */
  stale: boolean;
  /** True for entities derived from the guide YAML (content/guide). They have no file of their own. */
  derived?: boolean;
};

export type LoadProblem = { file: string; message: string };

/** YAML 1.2 core schema keeps dates as strings, which is what the schema expects. */
export const yamlEngine = {
  parse: (input: string) => (YAML.parse(input, { schema: 'core' }) ?? {}) as Record<string, unknown>,
  stringify: (data: object) => YAML.stringify(data),
};

export type Parsed = { data: Record<string, unknown>; body: string };

export function parseFile(path: string): Parsed {
  const raw = readFileSync(path, 'utf8');
  const ext = extname(path);
  if (ext === '.yaml' || ext === '.yml') {
    return { data: (YAML.parse(raw, { schema: 'core' }) ?? {}) as Record<string, unknown>, body: '' };
  }
  const parsed = matter(raw, { engines: { yaml: yamlEngine } });
  return { data: parsed.data as Record<string, unknown>, body: parsed.content };
}

export function walkContent(dir: string, top = true, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('.')) continue;
    if (top && NON_ENTITY_TOP.has(name)) continue;
    if (NON_ENTITY_FILES.has(name)) continue;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walkContent(abs, false, out);
    else if (['.md', '.yaml', '.yml'].includes(extname(name))) out.push(abs);
  }
  return out;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Overlay over source. Objects merge by key. Arrays of objects merge by index so structural keys survive. */
export function deepMerge(source: unknown, overlay: unknown): unknown {
  if (overlay === undefined) return source;
  if (isPlainObject(source) && isPlainObject(overlay)) {
    const out: Record<string, unknown> = { ...source };
    for (const [k, v] of Object.entries(overlay)) out[k] = deepMerge(source[k], v);
    return out;
  }
  if (Array.isArray(source) && Array.isArray(overlay) && source.some(isPlainObject)) {
    return source.map((item, i) => (i < overlay.length ? deepMerge(item, overlay[i]) : item));
  }
  return overlay;
}

/** Applies a locale overlay to a pt-BR entity. Only translatable fields are taken from the overlay. */
export function applyOverlay(tipo: Tipo, source: Parsed, overlay: Parsed): { data: Record<string, unknown>; body: string; stale: boolean } {
  const allowed = new Set(translatableFields(tipo));
  const merged: Record<string, unknown> = { ...source.data };
  for (const key of Object.keys(overlay.data)) {
    if (allowed.has(key)) merged[key] = deepMerge(source.data[key], overlay.data[key]);
  }
  const stale = overlay.data.source_hash !== sourceHash(tipo, source.data, source.body);
  const body = overlay.body.trim() ? overlay.body : source.body;
  return { data: merged, body, stale };
}

export type LoadResult = { entities: LoadedEntity[]; problems: LoadProblem[] };

/** Loads every entity of a locale: pt-BR source, then the overlay when the locale is not pt-BR. */
export function loadContent(contentRoot: string, locale: Locale = SOURCE_LOCALE): LoadResult {
  const entities: LoadedEntity[] = [];
  const problems: LoadProblem[] = [];
  const sourceDir = join(contentRoot, SOURCE_LOCALE);
  for (const file of walkContent(sourceDir)) {
    const relPath = relative(sourceDir, file);
    let parsed: Parsed;
    try {
      parsed = parseFile(file);
    } catch (error) {
      problems.push({ file, message: `cannot parse: ${(error as Error).message}` });
      continue;
    }
    const tipo = String(parsed.data.tipo ?? '');
    if (!(tipo in TYPES)) {
      problems.push({ file, message: `unknown or missing tipo: ${JSON.stringify(parsed.data.tipo)}` });
      continue;
    }
    const id = String(parsed.data.id ?? '');
    if (id !== basename(file, extname(file))) {
      problems.push({ file, message: `file name must equal the id (id: ${id || 'missing'})` });
    }
    let data = parsed.data;
    let body = parsed.body;
    let fallback = false;
    let stale = false;
    if (locale !== SOURCE_LOCALE) {
      const overlayFile = join(contentRoot, locale, relPath);
      if (existsSync(overlayFile)) {
        try {
          const applied = applyOverlay(tipo as Tipo, parsed, parseFile(overlayFile));
          data = applied.data;
          body = applied.body;
          stale = applied.stale;
        } catch (error) {
          problems.push({ file: overlayFile, message: `cannot parse overlay: ${(error as Error).message}` });
          fallback = true;
        }
      } else {
        fallback = true;
      }
    }
    entities.push({ id, tipo, locale, relPath, file, data, body, fallback, stale });
  }
  if (hasGuide(guideDir(contentRoot))) deriveGuide(contentRoot, locale, entities, problems);
  return { entities, problems };
}

/** Appends the entities derived from content/guide. A broken guide folder is reported as a problem. */
function deriveGuide(contentRoot: string, locale: Locale, entities: LoadedEntity[], problems: LoadProblem[]): void {
  const dir = guideDir(contentRoot);
  try {
    const derived = deriveGuideEntities(loadGuideFiles(dir), entities.map((e) => ({ id: e.id, tipo: e.tipo, data: e.data })), contentRoot);
    for (const message of derived.problems) problems.push({ file: dir, message });
    for (const d of derived.entities) {
      entities.push({ id: d.id, tipo: d.tipo, locale, relPath: d.relPath, file: d.file, data: d.data, body: '', fallback: locale !== SOURCE_LOCALE, stale: false, derived: true });
    }
  } catch (error) {
    problems.push({ file: dir, message: `cannot load the guide: ${(error as Error).message}` });
  }
}

/** Content access used by the site and the tools. A backend can replace the filesystem later. */
export interface ContentRepository {
  list(locale: Locale): LoadedEntity[];
  get(locale: Locale, id: string): LoadedEntity | undefined;
}

export class FsContentRepository implements ContentRepository {
  private cache = new Map<Locale, LoadResult>();
  constructor(private readonly contentRoot: string) {}
  private load(locale: Locale): LoadResult {
    if (!this.cache.has(locale)) this.cache.set(locale, loadContent(this.contentRoot, locale));
    return this.cache.get(locale) as LoadResult;
  }
  list(locale: Locale): LoadedEntity[] {
    return this.load(locale).entities;
  }
  get(locale: Locale, id: string): LoadedEntity | undefined {
    return this.load(locale).entities.find((e) => e.id === id);
  }
  problems(locale: Locale): LoadProblem[] {
    return this.load(locale).problems;
  }
}
