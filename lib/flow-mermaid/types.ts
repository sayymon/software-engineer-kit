// SPDX-License-Identifier: MIT
/** Loose shape of guide documents (demandas, raias, decisoes) as parsed from YAML or JSON. */
export type Item = Record<string, any>;

export type Diagrama = { texto: string; mapaIds: Record<string, string> };
