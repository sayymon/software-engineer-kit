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
