// SPDX-License-Identifier: MIT
import Ajv2020 from 'ajv/dist/2020.js';
import type { GuideDoc } from '../index';
import { caminho, itemIdDoCaminho } from './caminho';
import type { Problema } from './types';

const validators = new WeakMap<object, ReturnType<Ajv2020['compile']>>();

function pathParts(instancePath: string): Array<string | number> {
  if (!instancePath) return [];
  return instancePath
    .split('/')
    .slice(1)
    .map((part) => {
      const decoded = part.replace(/~1/g, '/').replace(/~0/g, '~');
      return /^\d+$/.test(decoded) ? Number(decoded) : decoded;
    });
}

function validatorFor(schema: object): ReturnType<Ajv2020['compile']> {
  const current = validators.get(schema);
  if (current) return current;
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  ajv.addFormat('date', {
    validate: (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value)
      && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
      && new Date(`${value}T00:00:00Z`).toISOString().startsWith(value),
  });
  const compiled = ajv.compile(schema);
  validators.set(schema, compiled);
  return compiled;
}

/**
 * SCHEMA issues. Known difference from the Python oracle: its messages come from `jsonschema`
 * (e.g. "'x' is a required property") and ours from Ajv ("must have required property 'x' {...}"). Ajv also emits
 * extra errors for `if/then`, `anyOf` and `oneOf`, and one `additionalProperties` error per key, so the text and
 * even the count cannot be matched exactly. Tests therefore compare SCHEMA issues by (code, nivel, path, itemId)
 * only; every other rule message is byte for byte the oracle's.
 */
export function validateSchema(doc: GuideDoc, schema: object): Problema[] {
  const validator = validatorFor(schema);
  if (validator(doc)) return [];
  return [...(validator.errors ?? [])]
    .map((error) => {
      const partes = pathParts(error.instancePath);
      const path = caminho(partes);
      return {
        code: 'SCHEMA',
        nivel: 'erro' as const,
        path: path || '(root)',
        itemId: itemIdDoCaminho(doc, partes),
        message: `${error.message ?? 'invalid'}${error.params ? ` ${JSON.stringify(error.params)}` : ''}`,
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path) || a.message.localeCompare(b.message));
}
