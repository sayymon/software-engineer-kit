// SPDX-License-Identifier: MIT
import type { GuideDoc } from '../index';

export type Nivel = 'erro' | 'aviso';

export type Problema = {
  code: string;
  nivel: Nivel;
  path: string;
  itemId: string | null;
  message: string;
};

export type OpcoesValidacao = {
  avisos?: boolean;
  completude?: boolean;
};

export type ValidatorDoc = GuideDoc;
