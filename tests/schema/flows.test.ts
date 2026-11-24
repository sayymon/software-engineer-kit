// SPDX-License-Identifier: MIT
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';

const ROOT = join(__dirname, '../..');

describe('vendored guide schema (schema/flows.schema.json)', () => {
  const schema = JSON.parse(readFileSync(join(ROOT, 'schema/flows.schema.json'), 'utf8'));
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  const validate = ajv.compile(schema);

  it('compiles with Ajv 2020-12', () => {
    expect(typeof validate).toBe('function');
  });

  it('rejects a document without the required collections', () => {
    expect(validate({})).toBe(false);
    expect(validate.errors?.length).toBeGreaterThan(0);
  });

  it('has the frozen ids copy with the 34 guides', () => {
    const frozen = JSON.parse(readFileSync(join(ROOT, 'schema/ids-frozen.json'), 'utf8'));
    expect(Object.keys(frozen)).toHaveLength(34);
    expect(frozen.criar_api).toContain('ctx.consumidores_e_casos');
  });
});
