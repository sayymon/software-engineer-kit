// SPDX-License-Identifier: MIT
// Writes schema/json/<tipo>.json from the Zod schemas in lib/schema (npm run schema:gen).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TIPOS, jsonSchemaFor } from '../../lib/schema';
import { jsonSchemaGrafo } from '../../lib/schema/grafo';

const outDir = join(fileURLToPath(new URL('../../', import.meta.url)), 'schema/json');
mkdirSync(outDir, { recursive: true });
for (const tipo of TIPOS) {
  writeFileSync(join(outDir, `${tipo}.json`), JSON.stringify(jsonSchemaFor(tipo), null, 2) + '\n');
}
// Modelo_de_Grafo (contrato dos Renderizadores), não é uma entidade do kit.
writeFileSync(join(outDir, 'grafo-fluxo.json'), JSON.stringify(jsonSchemaGrafo(), null, 2) + '\n');
console.log(`schema:gen wrote ${TIPOS.length + 1} files to schema/json`);
