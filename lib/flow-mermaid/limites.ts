// SPDX-License-Identifier: MIT
// Limits the kit passes to `mermaid.initialize` (`maxTextSize`, `maxEdges`). No dependencies: shared by the client
// initialization and by tests/flow-graph/limites-mermaid.test.ts.
// Criterion (design.md fixes no numbers; the final decision comes from spike 1.6): at least 2x margin over the largest
// Expandir_tudo text and edge count measured on the 12 real demands with subtasks (feature + subtasks: 97,878 characters and 443 edges by the test's count; design.md reports 98,526 bytes and 449 edges).
// Rounded up: 200,000 (>= 2 x 98,526) and 1,000 (>= 2 x 449). Mermaid defaults are 50,000 and 500.
export const MERMAID_MAX_TEXT_SIZE = 200_000;
export const MERMAID_MAX_EDGES = 1_000;
