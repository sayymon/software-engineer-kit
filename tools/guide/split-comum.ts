// SPDX-License-Identifier: MIT
// One-off, deterministic and text-based cut of content/guide/comum.yaml into content/guide/catalogos/ (task 0.1 of the
// experiencia-fluxos-catalogo spec, Requirement 15.7). No YAML is re-serialized: each top-level key moves as the exact
// lines it has today, together with the comment block that sits right above it (no blank line between).
// Ownership of a column-0 comment block that sits right above a top-level key (rule applied by `cortar`, deterministic):
//   - the block is preceded by a blank line (or by the start of the file) -> it belongs to the key below it;
//   - the block is preceded by a non-blank line (body line of the previous collection, or its one-line key) -> it continues
//     the previous collection's block and stays with it. Example: a comment that opens at column 0 in the middle of the
//     variaveis items and goes on, without a blank line, right above the next key is not split from it.
// A column-0 comment in the middle of a body never starts a new piece: only top-level keys do.
//   run it with: npx tsx tools/guide/split-comum.ts [opções] (no npm script on purpose: it is a one-off)
//   --src <pasta>   guide folder with comum.yaml (default: content/guide)
//   --out <pasta>   where to write comum.yaml and catalogos/ (default: the --src folder)
//   --dry-run       list each top-level key with its destination file and write nothing
// Exit codes: 0 ok, 2 usage or input error (nothing is written).
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import YAML from 'yaml';
import { ARQUIVOS_DE_CATALOGO, GuideLoadError, loadGuideDoc } from '../../lib/guide/load';

const RAIZ = fileURLToPath(new URL('../../', import.meta.url));

export const ARQUIVO_COMUM = 'comum.yaml';
export const PASTA_CATALOGOS = 'catalogos';

/** Keys that stay in comum.yaml. */
export const CHAVES_DO_COMUM: readonly string[] = ['versao', 'ordem_das_demandas'];

/** Destination catalog file (inside catalogos/) of each top-level key that leaves comum.yaml. */
export const DESTINO_POR_CHAVE: Readonly<Record<string, string>> = {
  artefatos: 'artefatos.yaml',
  variaveis: 'variaveis.yaml',
  papeis: 'papeis.yaml',
  requisitos: 'requisitos.yaml',
  abordagens: 'tecnicas.yaml',
  tecnicas: 'tecnicas.yaml',
  padroes: 'tecnicas.yaml',
  estrategias: 'tecnicas.yaml',
  categorias_ferramenta: 'ferramentas.yaml',
  fontes: 'fontes.yaml',
  decisor_construir_comprar_assinar: 'decisor.yaml',
};

/** Catalog files in the order that keeps the merged key order equal to the one comum.yaml has today. */
export const ORDEM_DOS_CATALOGOS: readonly string[] = ARQUIVOS_DE_CATALOGO;

class ErroDeEntrada extends Error {}

export type Trecho = { chave: string; destino: string; de: number; ate: number; texto: string };
export type Corte = { cabecalho: string; trechos: Trecho[] };

const RE_CHAVE = /^([A-Za-z_][A-Za-z0-9_]*):(?:\s|$)/;
const semFimBranco = (linhas: string[]): string[] => {
  const copia = [...linhas];
  while (copia.length && copia[copia.length - 1].trim() === '') copia.pop();
  return copia;
};

const destinoDe = (chave: string): string => {
  if (CHAVES_DO_COMUM.includes(chave)) return ARQUIVO_COMUM;
  const arquivo = DESTINO_POR_CHAVE[chave];
  if (!arquivo) throw new ErroDeEntrada(`a chave de topo '${chave}' não tem arquivo de destino; declare-a em DESTINO_POR_CHAVE`);
  return `${PASTA_CATALOGOS}/${arquivo}`;
};

/** Splits the text into the header and one piece per top-level key (leading comment block included). */
export function cortar(texto: string): Corte {
  const linhas = texto.split('\n');
  if (linhas[linhas.length - 1] === '') linhas.pop();
  const indices = linhas.flatMap((l, i) => (RE_CHAVE.test(l) ? [i] : []));
  if (!indices.length) throw new ErroDeEntrada(`${ARQUIVO_COMUM} não tem chave de topo`);
  const inicios = indices.map((i, k) => {
    let inicio = i;
    while (inicio > 0 && linhas[inicio - 1].startsWith('#')) inicio--;
    // Not separated from the previous collection by a blank line: the comment block continues that collection (see header).
    if (k > 0 && inicio > 0 && inicio < i && linhas[inicio - 1].trim() !== '') inicio = i;
    return inicio;
  });
  const trechos = indices.map((i, k) => {
    const fim = k + 1 < inicios.length ? inicios[k + 1] : linhas.length;
    const corpo = semFimBranco(linhas.slice(inicios[k], fim));
    const chave = (RE_CHAVE.exec(linhas[i]) as RegExpExecArray)[1];
    return { chave, destino: destinoDe(chave), de: inicios[k] + 1, ate: inicios[k] + corpo.length, texto: corpo.join('\n') };
  });
  return { cabecalho: semFimBranco(linhas.slice(0, inicios[0])).join('\n'), trechos };
}

/** Text of each output file (comum.yaml and the catalogs), keys in source order. */
export function montarArquivos(corte: Corte): Map<string, string> {
  const porArquivo = new Map<string, string[]>();
  for (const t of corte.trechos) porArquivo.set(t.destino, [...(porArquivo.get(t.destino) ?? []), t.texto]);
  const arquivos = new Map<string, string>();
  const comum = [...(corte.cabecalho ? [corte.cabecalho] : []), ...(porArquivo.get(ARQUIVO_COMUM) ?? [])];
  arquivos.set(ARQUIVO_COMUM, `${comum.join('\n\n')}\n`);
  for (const nome of ORDEM_DOS_CATALOGOS) {
    const partes = porArquivo.get(`${PASTA_CATALOGOS}/${nome}`);
    if (partes) arquivos.set(`${PASTA_CATALOGOS}/${nome}`, `${partes.join('\n\n')}\n`);
  }
  return arquivos;
}

const ler = (texto: string): Record<string, unknown> => YAML.parse(texto, { schema: 'core', uniqueKeys: false }) as Record<string, unknown>;

/** SHA-256 of the canonical (sorted keys) JSON of each top-level collection, as tests/guide/cases/parity.ts does. */
export function hashesPorColecao(doc: Record<string, unknown>): Record<string, string> {
  const ordenar = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(ordenar);
    if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map((k) => [k, ordenar((v as Record<string, unknown>)[k])]));
    return v;
  };
  return Object.fromEntries(
    Object.keys(doc)
      .sort()
      .map((k) => [k, createHash('sha256').update(JSON.stringify(ordenar(doc[k]))).digest('hex')]),
  );
}

/** Proves, before anything is written, that merging the output files in the loader order gives the source back. */
function conferirEquivalencia(original: string, arquivos: Map<string, string>): void {
  const antes = ler(original);
  const mesclado: Record<string, unknown> = {};
  for (const [nome, texto] of arquivos) {
    for (const [chave, valor] of Object.entries(ler(texto))) {
      if (chave in mesclado) throw new ErroDeEntrada(`a chave '${chave}' aparece em mais de um arquivo (${nome})`);
      mesclado[chave] = valor;
    }
  }
  const ordemAntes = Object.keys(antes);
  const ordemDepois = Object.keys(mesclado);
  if (ordemAntes.join(',') !== ordemDepois.join(',')) {
    throw new ErroDeEntrada(`o corte mudaria a ordem das chaves.\n  antes:  ${ordemAntes.join(', ')}\n  depois: ${ordemDepois.join(', ')}`);
  }
  const hAntes = hashesPorColecao(antes);
  const hDepois = hashesPorColecao(mesclado);
  const diferentes = ordemAntes.filter((k) => hAntes[k] !== hDepois[k]);
  if (diferentes.length) throw new ErroDeEntrada(`o corte mudaria o conteúdo de: ${diferentes.join(', ')}`);
}

export type Resultado = { code: number; out: string; err: string };

/** Entry point with injectable argv; returns the output instead of printing it. */
export function run(argv: string[]): Resultado {
  try {
    const { values } = parseArgs({ args: argv, options: { src: { type: 'string' }, out: { type: 'string' }, 'dry-run': { type: 'boolean' } }, strict: true, allowPositionals: false });
    const src = resolve(values.src ?? join(RAIZ, 'content/guide'));
    const destino = resolve(values.out ?? src);
    const arquivoComum = join(src, ARQUIVO_COMUM);
    if (!existsSync(arquivoComum)) throw new ErroDeEntrada(`${ARQUIVO_COMUM} não encontrado em ${src}`);
    const original = readFileSync(arquivoComum, 'utf8');
    const corte = cortar(original);
    const arquivos = montarArquivos(corte);
    conferirEquivalencia(original, arquivos);

    const saida: string[] = ['plano:', ...corte.trechos.map((t) => `${t.chave} -> ${t.destino} (linhas ${t.de}-${t.ate})`)];
    if (!values['dry-run']) {
      if (existsSync(join(destino, PASTA_CATALOGOS))) throw new ErroDeEntrada(`${PASTA_CATALOGOS}/ já existe em ${destino}; um segundo corte esvaziaria os catálogos`);
      // The baseline is read from the merged guide before anything is written.
      const baseline = linhaDeBase(src);
      mkdirSync(join(destino, PASTA_CATALOGOS), { recursive: true });
      for (const [nome, texto] of arquivos) writeFileSync(join(destino, nome), texto, 'utf8');
      saida.push('gravado:', ...arquivos.keys());
      saida.push('linha de base:', baseline);
    } else {
      saida.push('linha de base:', linhaDeBase(src));
    }
    return { code: 0, out: `${saida.join('\n')}\n`, err: '' };
  } catch (e) {
    if (e instanceof ErroDeEntrada || e instanceof GuideLoadError || (e as NodeJS.ErrnoException).code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION' || (e as NodeJS.ErrnoException).code === 'ERR_PARSE_ARGS_INVALID_OPTION_VALUE') {
      return { code: 2, out: '', err: `erro: ${(e as Error).message}\n` };
    }
    throw e;
  }
}

/** Baseline: the top-level key order and the hash per collection of the merged guide, as JSON. */
function linhaDeBase(src: string): string {
  const doc = loadGuideDoc(src);
  return JSON.stringify({ ordem_das_chaves: Object.keys(doc), hashes: hashesPorColecao(doc) }, null, 2);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = run(process.argv.slice(2));
  process.stdout.write(r.out);
  process.stderr.write(r.err);
  process.exitCode = r.code;
}
