// SPDX-License-Identifier: MIT
// npm run guide -- <validar|rastrear|decidir> [opções]
// Exit codes: 0 ok, 1 validation failed / problems found, 2 usage or input error.
// Text output of `validar` mirrors the Python CLI (the former Python CLI, since removed).
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import YAML from 'yaml';
import { configDoGuia, decidir, DecisorError, type ContextoFinanceiro, type Notas } from '../../lib/decisor';
import { GuideLoadError, hasGuide, loadGuideDoc, type GuideDoc } from '../../lib/guide/load';
import { descreverCondicao, lacunasDeDados, rastrearDados, usosEmCondicoes } from '../../lib/guide/rastreio';
import { validateGuide } from '../../lib/guide/validate';

export const EXIT_OK = 0;
export const EXIT_VALIDACAO = 1;
export const EXIT_ENTRADA = 2;

class InputError extends Error {}

const RAIZ = fileURLToPath(new URL('../../', import.meta.url));

const AJUDA = `uso: guide <comando> [opções]

comandos:
  validar   [--yaml <pasta|arquivo>] [--schema <arquivo>] [--estrito | --sem-avisos] [--parcial] [--json]
  rastrear  [<id>] [--yaml <pasta|arquivo>] [--json]
  decidir   --objetivo <id> --notas <arquivo> [--yaml <pasta|arquivo>] [--json]

códigos de saída: 0 sucesso, 1 falha de validação, 2 erro de entrada`;

const OPCOES = {
  yaml: { type: 'string' },
  schema: { type: 'string' },
  estrito: { type: 'boolean' },
  'sem-avisos': { type: 'boolean' },
  parcial: { type: 'boolean' },
  objetivo: { type: 'string' },
  notas: { type: 'string' },
  json: { type: 'boolean' },
  help: { type: 'boolean', short: 'h' },
} as const;

const yamlPadrao = () => process.env.GUIA_DIR || resolve(RAIZ, 'content', 'guide');
const schemaPadrao = () => process.env.GUIA_SCHEMA || resolve(RAIZ, 'schema', 'flows.schema.json');

function carregarGuia(caminho: string): GuideDoc {
  if (!existsSync(caminho)) throw new InputError(`YAML_Fonte não encontrado: ${caminho}`);
  if (statSync(caminho).isFile()) {
    try {
      const data = YAML.parse(readFileSync(caminho, 'utf8'), { schema: 'core', uniqueKeys: false });
      if (data === null || typeof data !== 'object' || Array.isArray(data)) throw new InputError(`${caminho}: o topo do documento deve ser um mapa`);
      return data as GuideDoc;
    } catch (e) {
      if (e instanceof InputError) throw e;
      throw new InputError(`${caminho}: ${(e as Error).message}`);
    }
  }
  if (!hasGuide(caminho)) throw new InputError(`YAML_Fonte não encontrado: ${caminho}`);
  return loadGuideDoc(caminho);
}

function carregarSchema(caminho: string): object {
  if (!existsSync(caminho)) throw new InputError(`Schema não encontrado: ${caminho}`);
  try {
    return JSON.parse(readFileSync(caminho, 'utf8'));
  } catch (e) {
    throw new InputError(`${caminho}: JSON inválido: ${(e as Error).message}`);
  }
}

type Valores = ReturnType<typeof analisar>['values'];

function analisar(args: string[]) {
  try {
    return parseArgs({ args, options: OPCOES, allowPositionals: true, strict: true });
  } catch (e) {
    throw new InputError((e as Error).message);
  }
}

const imprimirJson = (v: unknown) => console.log(JSON.stringify(v, null, 2));

function cmdValidar(v: Valores): number {
  if (v.estrito && v['sem-avisos']) throw new InputError('--estrito e --sem-avisos são mutuamente exclusivos');
  const yamlPath = v.yaml ?? yamlPadrao();
  const schemaPath = v.schema ?? schemaPadrao();
  const doc = carregarGuia(yamlPath);
  const schema = carregarSchema(schemaPath);
  const problemas = validateGuide(doc, schema, { avisos: !v['sem-avisos'], completude: !v.parcial });
  const erros = problemas.filter((p) => p.nivel === 'erro');
  const avisos = problemas.filter((p) => p.nivel !== 'erro');
  const falhou = erros.length > 0 || (avisos.length > 0 && !!v.estrito);
  if (v.json) {
    imprimirJson({ arquivo: yamlPath, valido: !falhou, erros: erros.length, avisos: avisos.length, problemas: [...erros, ...avisos] });
    return falhou ? EXIT_VALIDACAO : EXIT_OK;
  }
  for (const p of [...erros, ...avisos]) {
    const prefixo = p.nivel !== 'erro' ? 'aviso ' : '';
    console.log(`${yamlPath}: ${prefixo}${p.code} ${p.path} id=${p.itemId || '-'}: ${p.message}`);
  }
  if (problemas.length) console.error(`${erros.length} erro(s) e ${avisos.length} aviso(s) encontrado(s).`);
  if (falhou) return EXIT_VALIDACAO;
  console.log(avisos.length ? `${yamlPath}: válido, com ${avisos.length} aviso(s).` : `${yamlPath}: válido.`);
  return EXIT_OK;
}

function cmdRastrear(v: Valores, posicionais: string[]): number {
  if (posicionais.length > 1) throw new InputError('rastrear aceita no máximo um <id>');
  const doc = carregarGuia(v.yaml ?? yamlPadrao());
  const rastro = rastrearDados(doc);
  const usos = usosEmCondicoes(doc);
  const lacunas = lacunasDeDados(doc);
  const alvo = posicionais[0];
  if (alvo !== undefined && !Object.hasOwn(rastro, alvo)) throw new InputError(`id não encontrado no catálogo de variáveis e artefatos: ${alvo}`);
  const ids = alvo !== undefined ? [alvo] : Object.keys(rastro);
  const fichas = ids.map((id) => ({
    id,
    ...rastro[id],
    usos_em_condicoes: (usos[id] ?? []).map((u) => ({ ...u, descricao: u.quando })),
    lacunas: lacunas[id] ?? [],
  }));
  if (v.json) {
    imprimirJson(alvo !== undefined ? fichas[0] : fichas);
  } else {
    for (const f of fichas) {
      console.log(`${f.id} (${f.tipo}) ${String(f.nome)}`);
      console.log(`  produzido por: ${f.produzido_por.join(', ') || '-'}`);
      console.log(`  consumido por: ${f.consumido_por.join(', ') || '-'}`);
      for (const u of f.usos_em_condicoes) console.log(`  condição em ${u.origem} (${u.dono}${u.tecnica ? `, ${u.tecnica}` : ''}): ${u.quando}`);
      if (f.lacunas.length) console.log(`  lacunas: ${f.lacunas.join(', ')}`);
    }
  }
  // Gaps are problems found: the tracing of one id or of the whole catalog exits 1 when any listed id has a gap.
  return fichas.some((f) => f.lacunas.length > 0) ? EXIT_VALIDACAO : EXIT_OK;
}

function cmdDecidir(v: Valores): number {
  if (!v.objetivo) throw new InputError('decidir exige --objetivo');
  if (!v.notas) throw new InputError('decidir exige --notas');
  const doc = carregarGuia(v.yaml ?? yamlPadrao());
  if (!existsSync(v.notas) || !statSync(v.notas).isFile()) throw new InputError(`arquivo de notas não encontrado: ${v.notas}`);
  let dados: unknown;
  try {
    dados = YAML.parse(readFileSync(v.notas, 'utf8'), { schema: 'core' }) ?? {};
  } catch (e) {
    throw new InputError(`${v.notas}: YAML inválido: ${(e as Error).message}`);
  }
  const mapa = dados as { notas?: unknown; contexto?: ContextoFinanceiro | null };
  if (typeof dados !== 'object' || dados === null || Array.isArray(dados) || typeof mapa.notas !== 'object' || mapa.notas === null || Array.isArray(mapa.notas)) {
    throw new InputError(`${v.notas}: esperado um mapa com \`notas: {opcao: {criterio: nota}}\``);
  }
  const r = decidir(configDoGuia(doc), v.objetivo, mapa.notas as Notas, mapa.contexto);
  if (v.json) imprimirJson(r);
  else console.log(r.justificativa);
  return EXIT_OK;
}

export function main(argv: string[]): number {
  try {
    const [comando, ...resto] = argv;
    if (!comando || comando === '--help' || comando === '-h') {
      (comando ? console.log : console.error)(AJUDA);
      return comando ? EXIT_OK : EXIT_ENTRADA;
    }
    const { values, positionals } = analisar(resto);
    if (values.help) {
      console.log(AJUDA);
      return EXIT_OK;
    }
    switch (comando) {
      case 'validar':
        if (positionals.length) throw new InputError(`argumento inesperado: ${positionals[0]}`);
        return cmdValidar(values);
      case 'rastrear':
        return cmdRastrear(values, positionals);
      case 'decidir':
        if (positionals.length) throw new InputError(`argumento inesperado: ${positionals[0]}`);
        return cmdDecidir(values);
      default:
        throw new InputError(`comando desconhecido: ${comando}`);
    }
  } catch (e) {
    if (e instanceof InputError || e instanceof GuideLoadError || e instanceof DecisorError) {
      console.error(`erro: ${e.message}`);
      return EXIT_ENTRADA;
    }
    throw e;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
