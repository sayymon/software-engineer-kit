# Home imersiva: medidas de desempenho

Linha de base registrada durante a implementação (branch `feat/ecossistema-3d`).

## Tamanho (gzip, build de produção)

| Medida | Valor | Limite proposto |
|---|---|---|
| JavaScript inicial da Home | cerca de 4 kB | 60 kB |
| Palco, circuito e cenas (carga adiada) | cerca de 15 kB | |
| Three.js (módulo compartilhado, carga adiada) | cerca de 145 kB | |
| Total adiado | cerca de 160 kB | 450 kB |
| `api/home/jornadas.json` | menos de 10 kB | 10 kB |

## Quadros por segundo

| Hardware | Nível | Partículas | Quadros por segundo | Observação |
|---|---|---|---|---|
| Mac do mantenedor (GPU real) | alto | 2.400 | cerca de 50 | Relato do dono, com `?fps`. O modelo do equipamento não foi registrado |
| Chromium sem GPU (SwiftShader, CI) | desce para baixo | 900 | 10 a 30 | Esperado: o avaliador desce de nível sozinho |

O nível pode ser fixado com `?nivel=alto|medio|baixo` e o contador aparece com `?fps`.
