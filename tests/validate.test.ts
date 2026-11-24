// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { selfTest } from '../tools/validate/selftest';

describe('validate framework', () => {
  it('self-test passes every scenario', async () => {
    const { passed, failures } = await selfTest();
    expect(failures).toEqual([]);
    expect(passed).toBeGreaterThan(20);
  });
});
