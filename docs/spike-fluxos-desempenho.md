# Spike de desempenho do Diagrama de fluxos (S1 a S6)

Relatório da Fase 1 da spec `experiencia-fluxos-catalogo` (tarefa 1.6). Reúne as medições de S1 a S6, as limitações e a decisão. O dono aprovou a proposta na tarefa 1.7 (Requisitos 15.8 e 20.13). Onde o texto diz "proposta", leia "aprovada".

**Aviso geral: todos os números abaixo são locais, medidos com a máquina carregada. São indicativos e não validam o orçamento.** O orçamento só se valida no CI, com `tests/browser/performance.spec.ts` (Fase 8 da spec).

## Fontes e convenções

| Spike | Arquivo de dados | Harness |
|---|---|---|
| Linha de base | `docs/spike-fluxos/baseline.json` | build atual do site, página `/pt-BR/flows/feature/` |
| S1 e S2 | `docs/spike-fluxos/s1-s2.json` | `tests/browser/spike/s1-s2.spec.ts` |
| S3 e S4 | `docs/spike-fluxos/s3-s4.json` | `tests/browser/spike/s3-s4.spec.ts` |
| S5 | `docs/spike-fluxos/s5.json` | `tests/browser/spike/s5.spec.ts` (protótipo em `tests/browser/spike/s5/`, fora do build) |
| S6 | `docs/spike-fluxos/s6.json` | `tests/browser/spike/s6.spec.ts` |

- Demanda medida: `feature` (Demanda_Piloto). Mermaid 11.17.2, tema `default`, `securityLevel: strict`, `flowchart.useMaxWidth: false`.
- CPU limitada a 4x por `Emulation.setCPUThrottlingRate` (CDP). O throttling vale para a thread principal. O Worker do S5 não sofre o 4x (a calibragem do próprio JSON mede razão 1,03 no Worker contra 4,13 na thread principal).
- Tempos em ms, **p95 por nearest-rank**. Com 10 execuções o p95 é o maior valor das 10 amostras. Com 3 execuções o p95 é o maior das 3.
- Tamanhos: gzip nível 9. **Os campos "kB" dos JSONs são KiB (1024 bytes)**: 983.687 bytes gzip aparecem como 960,63. Onde a conversão importa para um teto, a tabela mostra também o valor em kB decimal.
- Cada execução usa um contexto novo do navegador, com uma renderização de aquecimento fora da medida.

### Máquina e carga de cada medição

Todas as medições rodaram no mesmo equipamento: Apple M3 (8 CPUs), 16 GB, darwin arm64, SO 25.6.0, Node v22.23.5, Chromium 159.0.8154.6. O load average vem de `os.loadavg()` (1, 5 e 15 minutos). Com 8 CPUs, um load de 1 minuto acima de 4 indica a máquina ocupada.

| Medição | Janela (UTC) | Load average no início | Load average no fim | Memória livre no fim |
|---|---|---|---|---|
| Linha de base | 2026-11-26 16:28 | não registrado | não registrado | não registrada |
| S1 e S2 | 16:52 a 17:01 | 4,85 / 5,81 / 25,21 | 2,62 / 4,14 / 14,87 | 0,1 GB |
| S3 e S4 | 17:10 a 17:17 | 3,16 / 3,98 / 9,97 | 3,50 / 3,52 / 7,29 | 0,1 GB |
| S5 | 18:53 a 18:57 | 4,39 / 12,32 / 34,82 | 6,97 / 11,91 / 30,68 | 0,1 GB |
| S6 | 19:06 | 4,90 / 10,67 / 23,81 | 4,41 / 9,99 / 23,11 | não registrada |

Sinal da carga: a mesma configuração (a padrão do Mermaid, `curve: basis`) mediu p95 de 1115,7 ms em S1 e 1400,0 ms em S2 para `cinco_raias` (diferença de 25%), e 3597,9 ms contra 3829,5 ms para `completo` (6%). Diferenças de até cerca de 25% entre configurações ficam dentro do ruído desta máquina.

## S1: linha de base (um `mermaid.render` por conjunto, bundle vendorizado, dagre)

Limites do kit (`maxTextSize` 200.000, `maxEdges` 1.000). 10 execuções por conjunto (load average de S1 e S2 na tabela acima). Indicativo, não valida orçamento.

| Conjunto | Nós visíveis | Caracteres | Arestas (texto) | p95 (ms) | Mediana (ms) | SVG (bytes) | Sobreposições de rótulo |
|---|---|---|---|---|---|---|---|
| Visão geral (26 clusters) | 26 | 8.405 | 50 | 509,2 | 475,1 | 149.485 | 0 |
| 1 raia (`feat_orq`, a maior) | 50 | 14.364 | 67 | 714,6 | 679,3 | 484.904 | 0 |
| 5 raias | 80 | 20.578 | 99 | 1.115,7 | 1.076,5 | 1.066.497 | 0 |
| `completo` | 215 | 47.345 | 257 | 3.597,9 | 3.548,0 | 4.283.526 | 0 |
| 5 raias com Subtarefas | 130 | 33.391 | 149 | 1.956,6 | 1.745,6 | 1.189.185 | 0 |
| `completo` com Subtarefas | 401 | 97.878 | 443 | 10.303,8 | 9.971,7 | 4.942.000 | 0 |

Previsão linear do design ("0,2 s fixos mais 15 a 17 ms por nó") contra o medido:

| Conjunto | Previsto (ms) | Medido p95 (ms) | Medido sobre o máximo previsto |
|---|---|---|---|
| Visão geral | 590 a 642 | 509,2 | 0,79 |
| 1 raia | 950 a 1.050 | 714,6 | 0,68 |
| 5 raias | 1.400 a 1.560 | 1.115,7 | 0,72 |
| `completo` | 3.425 a 3.855 | 3.597,9 | 0,93 |
| 5 raias com Subtarefas | 2.150 a 2.410 | 1.956,6 | 0,81 |
| `completo` com Subtarefas | 6.215 a 7.017 | 10.303,8 | **1,47** |

Leitura: o modelo linear acerta ou superestima até `completo` e **subestima em 47%** o `completo` com Subtarefas. O custo marginal por nó adicional cresce com o tamanho: 8,56 ms (Visão geral para 1 raia), 13,37, 18,39, 19,31 e 30,80 ms (5 raias com Subtarefas para `completo` com Subtarefas). O ajuste linear por nós tem R² de 0,9612 e o ajuste por caracteres tem R² de 0,9782. Nenhum dos dois serve de previsão para conjuntos maiores que os medidos. O custo cresce de forma supralinear.

## S2: configuração do Mermaid

### Limites padrão contra os do kit

| Conjunto | Limites padrão (50.000 / 500) | Limites do kit (200.000 / 1.000) |
|---|---|---|
| `completo` (47.345 caracteres, 257 arestas) | renderiza, p95 3.744,8 ms (2 execuções) | renderiza, p95 3.597,9 ms (10 execuções) |
| `completo` com Subtarefas (97.878 caracteres, 443 arestas) | **falha em silêncio**: o Mermaid não lança erro e devolve um SVG de 9.743 bytes com 1 nó de aviso ("Maximum Text size in diagram exceeded") | renderiza, p95 10.303,8 ms |

Conclusão: com o limite de texto padrão, o `completo` com Subtarefas não tem resultado utilizável e o `mermaid.render` **não rejeita**. O kit precisa verificar o tamanho antes do render e inspecionar o SVG devolvido (Requisito 20.10). A margem do `completo` sem Subtarefas contra o padrão é de 5,3% (47.345 de 50.000).

### Opções de configuração (dagre, bundle vendorizado, 10 execuções)

| Configuração | `cinco_raias` p95 / mediana (ms) | `completo` p95 / mediana (ms) | Efeito no SVG |
|---|---|---|---|
| Controle (padrão do Mermaid, S1) | 1.115,7 / 1.076,5 | 3.597,9 / 3.548,0 | referência |
| `curve: basis` (controle repetido em S2) | 1.400,0 / 1.225,7 | 3.829,5 / 3.536,7 | igual ao controle |
| `curve: linear` | 1.404,7 / 1.243,5 | 3.757,2 / 3.522,8 | SVG 2% menor, sem ganho de tempo |
| `curve: step` | 1.289,9 / 1.223,1 | 3.638,9 / 3.552,9 | SVG 1% menor, sem ganho de tempo |
| `htmlLabels: false` | 1.371,4 / 1.352,5 | 4.319,2 / 3.967,8 | **+12% de mediana em `completo`**, 0 `foreignObject` e **583 tags literais** no texto dos rótulos |

Nenhuma opção entre `curve` e `htmlLabels` reduz o tempo além do ruído. `htmlLabels: false` torna o render mais lento e deixa tags HTML literais nos rótulos. Sobreposição de rótulo ficou em 0 em todos os casos.

### Layout ELK contra dagre (Mermaid ESM, 10 execuções; subtarefas com 3)

| Conjunto | dagre ESM p95 (ms) | ELK p95 (ms) | Diferença |
|---|---|---|---|
| Visão geral | 488,4 | 616,4 | +26% |
| 5 raias | 1.149,1 | 1.185,8 | +3% |
| `completo` | 3.589,6 | 2.921,1 | -19% |
| `completo` com Subtarefas (3 execuções) | 10.127,4 | 4.844,9 | -52% |

| Custo de carga (gzip, KiB) | Valor |
|---|---|
| Mermaid ESM carregado com dagre | 229,6 |
| Mermaid ESM carregado com ELK | 215,6 |
| `@mermaid-js/layout-elk` 0.2.3 (21 arquivos) | **687,2** (703,7 kB decimal) |
| ESM mais ELK | 902,8 (924,5 kB decimal) |

O ELK reduz o tempo só em conjuntos grandes, custa 687,2 KiB a mais e piora a Visão geral em 26%. O SVG do ELK difere do SVG do dagre (menos `foreignObject`: 175 contra 199 em 5 raias), então a paridade visual com os goldens não está provada. Sobreposição de rótulo: 0.

## S3: fora da thread principal (alvo: resposta do mouse abaixo de 100 ms durante um render de cerca de 3 s)

A "resposta do mouse" é o pior momento por execução, entre o atraso do handler de `mousemove` e a ida e volta de `page.mouse.move`. O p95 é tomado entre execuções. CPU 4x. Indicativo, não valida orçamento.

| Caso | Execuções | Render p95 (ms) | Resposta do mouse p95 (ms) | Atende 100 ms |
|---|---|---|---|---|
| Controle sem render | 3 | n/a | 26,9 | sim |
| Thread principal, `completo` | 10 | 3.905,4 | 3.857,8 | não |
| iframe com `sandbox` (sem `allow-same-origin`), `completo` | 10 | 3.984,8 | 3.906,6 | não |
| iframe com isolamento pedido (`IsolateSandboxedIframes`), `completo` | 10 | 3.925,1 | 3.857,5 | não |
| Thread principal, `completo` com Subtarefas | 3 | 10.269,1 | 10.220,8 | não |
| iframe com `sandbox`, `completo` com Subtarefas | 3 | 10.246,5 | 10.172,9 | não |
| iframe com isolamento pedido, `completo` com Subtarefas | 3 | 10.182,7 | 10.107,7 | não |

- O iframe **não ganhou processo próprio** em nenhuma variante (`processo_proprio: false`, mesmo com o recurso do Chromium ligado). Cada render vira uma long task única do tamanho do render (3.906 ms para `completo`, 10.270 ms para `completo` com Subtarefas).
- **Worker não é viável**: o bundle carrega e inicializa, e `render` lança `ReferenceError: document is not defined`. O Mermaid precisa do DOM.
- Para a medição o bundle de cerca de 3 MB foi embutido no `srcdoc` do iframe, porque o Chromium bloqueou o `<script src>` de loopback para origem opaca. A carga do iframe ficou fora da medida.

## S4: cache e antecipação

### Cache de SVG por conjunto (miss contra hit; CPU 4x; 10 execuções, subtarefas com 3)

| Conjunto | Miss: render p95 (ms) | Miss até o quadro p95 (ms) | Hit até o quadro p95 (ms) | SVG em memória (KB, UTF-16) | Nós de DOM com o SVG |
|---|---|---|---|---|---|
| Visão geral | 560,4 | 579,0 | 34,8 | 288,9 | 1.785 |
| 1 raia | 734,0 | 763,0 | 40,9 | 942,8 | 2.779 |
| 5 raias | 1.192,3 | 1.231,5 | 58,3 | 2.077,5 | 4.293 |
| `completo` | 3.702,6 | 3.810,8 | 115,9 | 8.356,9 | 11.399 |
| `completo` com Subtarefas (3 execuções) | 10.166,7 | 10.372,1 | **198,4** | 9.635,6 | 20.411 |

Soma dos SVGs dos quatro primeiros conjuntos: 11.666 KB (cerca de 11,4 MiB como texto). Somando o `completo` com Subtarefas: 21.302 KB (cerca de 20,8 MiB). A medição de heap com coleta forçada (`heap_cumulativo` de 2.061,3 KB para os quatro primeiros) **não concilia** com o tamanho do texto do SVG. Trate o tamanho do texto como o limite superior e o heap como não conclusivo.

### Antecipação (renderizar em tempo ocioso 3 raias: `feat_orq`, `feat_ent`, `feat_lev`; 10 execuções)

| Medida | Valor |
|---|---|
| Render de cada raia antecipada, p95 (ms) | 734,3 / 540,7 / 461,7 |
| Duração total da antecipação, p95 (ms) | 1.724,9 |
| CPU gasta à toa (tarefa), mediana (ms) | 1.717,3 |
| Clique na raia antecipada: com cache, p95 (ms) | 39,5 (mediana 27,9) |
| Clique na raia: sem cache, p95 (ms) | 823,0 (mediana 727,2) |
| Resposta do mouse, controle ocioso, p95 (ms) | 26,5 |
| Resposta do mouse **durante a antecipação**, p95 (ms) | **718,7** |
| Resposta do mouse no render da Visão geral, p95 (ms) | 501,3 |

O ganho por acerto é de 699 ms na mediana. O custo é uma long task de 460 a 734 ms por raia antecipada, durante a qual o `requestIdleCallback` não protege a entrada. A probabilidade de a pessoa abrir cada raia antecipada **não foi medida**.

## S5: Renderizador próprio (protótipo descartável: layout `@dagrejs/dagre` em Web Worker, SVG gerado como texto pelo kit)

CPU 4x na thread principal. O Worker mediu sem o 4x. Por isso a tabela traz o tempo do Worker e, como teto conservador, o controle com o layout na thread principal sob 4x. 10 execuções (controle: 5). S5 teve load average de 1 minuto entre 4,39 e 6,97 (tabela acima).

| Conjunto | Mermaid S1 p95 (ms) | Protótipo, Worker p95 (ms) | Protótipo, layout na thread principal sob 4x, p95 (ms) | Ganho conservador |
|---|---|---|---|---|
| Visão geral | 509,2 | 11,9 | 30,2 | 16,9x |
| 5 raias | 1.115,7 | 119,2 | 208,5 | 5,4x |
| `completo` | 3.597,9 | 227,8 | 810,8 | 4,4x |
| `completo` com Subtarefas | 10.303,8 | 679,1 | 2.296,4 | 4,5x |

| Medida | Valor |
|---|---|
| Tamanho (protótipo e dagre) | 21,45 KiB gzip (2,2% dos 960,63 KiB do bundle do Mermaid) |
| Boot do Worker, p95 | 26,6 ms |
| Resposta do mouse durante o render, p95: Worker, `completo` / com Subtarefas | 153,4 ms / 160,3 ms (não atende 100 ms) |
| Resposta do mouse, layout na thread principal: `completo` / com Subtarefas | 749,0 ms / 2.329,4 ms |

Fidelidade visual (sobre o golden `feature.completo`, avaliação grosseira por grade de pixels): 219 nós contra 224 do Mermaid, `label-overlap` 0, **4 pares de clusters de raia não aninhados sobrepostos**, **2 nós com texto maior que a forma** (de 219) e IoU de tinta de 0,313. O dagre não reserva espaço para o título do cluster, e o texto é medido por contagem de caracteres, porque o Worker não tem DOM. Ficaram fora do protótipo: legenda, clique, foco por teclado, playbook, reuso de layout entre expansões, medição real de texto e desvio de cluster nas arestas. O `innerHTML` e a geração do SVG continuam na thread principal, e é por isso que a resposta do mouse fica em 150 a 160 ms.

## S6: build ESM dividida (O2) contra o bundle único

Servidor estático próprio do spec, resposta com gzip nível 9 e `Cache-Control: no-store` (carga fria), loopback, CPU 4x, 10 execuções. Configuração do Mermaid com **`handDrawnSeed: 1`** nos dois motores. S6 teve load average de 1 minuto de 4,9 no início e 4,41 no fim.

| Medida | ESM dividida | Bundle único |
|---|---|---|
| Transferido até o primeiro diagrama (Visão geral) | **235,44 KiB** (241,1 kB decimal), 27 requisições | **960,85 KiB** (983,9 kB decimal), 1 requisição |
| Do total, núcleo (19 requisições) | 198,38 KiB | n/a |
| Do total, sob demanda (flowchart, dagre, renderizador; 8 requisições) | 37,06 KiB | n/a |
| Economia | 725,41 KiB (75,5%) | n/a |
| Tempo até o primeiro diagrama, mediana / p95 (ms) | 591,0 / 687,9 | 947,9 / 1.062,7 |
| Dentro disso: import do núcleo / carga do script, p95 (ms) | 74,2 | 481,2 |
| Dentro disso: primeiro render da Visão geral, p95 (ms) | 613,7 | 581,5 |

| Conjunto | SVG byte a byte idêntico (com semente) | `label-overlap` ESM / bundle |
|---|---|---|
| `completo` | sim (4.294.070 bytes) | 0 / 0 |
| `feat_orq` | sim (494.317 bytes) | 0 / 0 |
| Visão geral | sim (152.405 bytes) | 0 / 0 |

- **Sem `handDrawnSeed` o SVG não é determinístico**: nos três conjuntos o bundle difere dele mesmo e o ESM difere do bundle. A causa é o `rough.js`, que sorteia a semente dos contornos dos nós. Com a semente fixa, o SVG é idêntico e estável entre execuções (ESM contra ESM, 3 de 3).
- O texto Mermaid gerado igualou o golden nos três conjuntos.
- O tempo vem de loopback (latência quase zero): mostra o custo de parse e execução. Para a rede real, use a coluna de kB.
- Uma página sem Diagrama carrega 0 KiB de Mermaid se a importação só ocorrer quando há Diagrama (Requisito 15.3).

## Linha de base (página atual, antes de qualquer código da spec)

`docs/spike-fluxos/baseline.json`, 10 execuções, CPU 4x. **Sem load average nem dados da máquina no arquivo.**

| Medida | Valor |
|---|---|
| `DOMContentLoaded` p95 | 911,3 ms (as outras 9 amostras ficam entre 67,6 e 441,7 ms) |
| Diagrama pronto p95 | 31.441,8 ms (amostras entre 10.980,1 e 31.441,8 ms) |
| Carga inicial (gzip) | 21,9 KiB |
| Carga do Diagrama (gzip) | 960,6 KiB |
| `du -sk site/dist` / `site/dist/pt-BR` | 75.308 kB / 24.224 kB |

Duas divergências sem explicação confirmada: (1) o "diagrama pronto" de 31,4 s contra os 5,0 a 5,1 s que o design mediu para a mesma página, o que aponta ruído de carga da máquina e **invalida esse número como referência**; (2) `site/dist` de 75.308 kB contra os 38.928 kB do design (`site/dist/pt-BR` bate, 24.224 contra 23.456). Antes de aplicar o teto de 25% de crescimento (15.8), a base de `site/dist` precisa ser medida de novo, com um comando único e registrado.

## Limitações

1. **Máquina carregada.** Load average de 1 minuto entre 2,6 e 7,0 em 8 CPUs, 15 minutos chegando a 34,8, e 0,1 GB de memória livre no fim de S1, S2, S3, S4 e S5. A mesma configuração variou até 25% entre rodadas.
2. **Uma máquina, um navegador.** Apple M3 e Chromium 159. Não há medida em outro hardware, Firefox ou Safari.
3. **CPU 4x só na thread principal.** O Worker do S5 não sofreu o throttling, e por isso o S5 traz o controle da thread principal como teto.
4. **Poucas amostras nos casos pesados.** `completo` com Subtarefas teve 3 execuções em S2 (ELK), S3 e S4. O p95 de 3 amostras é o máximo, sem estimativa de dispersão.
5. **Rede em loopback.** S6 não mede latência real, HTTP/2 nem cache.
6. **Só a Demanda_Piloto.** As outras 11 Demandas não foram renderizadas nos spikes.
7. **O harness do iframe** embutiu o bundle no `srcdoc`. O resultado "sem processo próprio" vale para o Chromium 159 do harness.
8. **Contagens de arestas e caracteres** diferem entre fontes: o design cita 98.526 bytes e 449 arestas para `completo` com Subtarefas, e os JSONs registram 97.878 caracteres e 443 arestas (contagem do teste).

## Não verificado

- Carga inicial da página nova (HTML, CSS, JavaScript do kit e Modelo_de_Grafo): nenhum desses módulos existe ainda. O único número é a carga da página atual (21,9 KiB).
- Indicador de progresso visível em até 100 ms (Requisito 15.8 e 20.9).
- Filtro do Catalogo em 100 ms (fora do escopo do spike).
- Comparação byte a byte ESM contra bundle para `completo` com Subtarefas e para as demais raias e Demandas (só 3 conjuntos da `feature`).
- Paridade visual do ELK contra os goldens (o SVG do ELK difere do SVG do dagre).
- Efeito isolado de `maxEdges` (nenhum caso falhou por arestas) e efeito de elevar os limites sobre conteúdo hostil (o texto vem do YAML do repositório, no build).
- Memória real do cache em dispositivo (o heap medido não concilia com o tamanho do SVG).
- Probabilidade de a pessoa abrir cada raia depois da Visão geral (nenhuma telemetria no kit, que é estático).
- Cópia da pasta de chunks do ESM no build, com nomes com hash (tarefa 6.2) e comportamento com cache imutável.
- Crescimento de `site/dist`: a base está em divergência (ver a linha de base).
- Medidas sem carga na máquina e em CI.

## Decisão (aprovada pelo dono na tarefa 1.7)

**Decisão do dono (tarefa 1.7): proposta APROVADA.**

- Mermaid em ESM dividida (flowchart e dagre) com `handDrawnSeed` fixo na configuração do kit. O bundle único vendorizado fica como fallback.
- Um `mermaid.render` por Conjunto_Expandido, com cache de SVG por conjunto e fila de um pedido que descarta o resultado obsoleto.
- Fora desta entrega: ELK, antecipação de render, Worker e iframe.
- Limites `maxTextSize` 200.000 e `maxEdges` 1.000, com verificação antes e depois do render.
- Tetos de 15.8 mantidos, com os ajustes de redação propostos.
- Renderizador próprio fica fora desta entrega e pode vir depois como Perspectiva.
- O dono aceitou que o `completo` (3 a 10 s na primeira exibição) trave a aba durante o render, porque a página não abre em `completo` e as demais Views são rápidas.

**Requisito de UX para a tarefa 6.4:** ao expandir o `completo`, mostrar indicador ou animação de progresso (sugestão do dono), com `role="status"`, pintado antes de o render começar (dois `requestAnimationFrame`, Requisito 20.9).

As propostas abaixo foram aprovadas como estão. Cada uma traz o número que a sustenta e o critério de go/no-go. "Go" significa seguir com a opção. "No-go" significa não adotar nesta entrega.

### (a) Mermaid: ESM dividida, bundle único ou Renderizador próprio

**Proposta: ESM dividida de flowchart e dagre como alvo (go). Bundle único vendorizado como fallback. Renderizador próprio fora desta entrega (no-go).**

| Opção | Critério numérico de go | Medido | Veredito proposto |
|---|---|---|---|
| ESM dividida (S6) | SVG idêntico byte a byte nos conjuntos comparados com `handDrawnSeed` fixo, `label-overlap` igual a 0, transferido até o primeiro diagrama de no máximo 300 kB e tempo até o primeiro diagrama de no máximo o do bundle | 3 de 3 conjuntos idênticos, 0 sobreposição, 241,1 kB decimal (235,44 KiB), p95 687,9 ms contra 1.062,7 ms | **go** |
| Bundle único (fallback) | Aciona se algum SVG divergir com a semente fixa, se a pasta de chunks não puder ser copiada ao build, ou se a carga do Diagrama passar de 300 kB e a causa estiver nos chunks | 983,9 kB decimal, abaixo do teto de 1,1 MB (margem de 10,6%). Visão geral interativa em 1.974 ms somando `DOMContentLoaded` p95 (911,3) e total até o primeiro diagrama p95 (1.062,7), margem de 1,3% contra 2,0 s | **fallback válido, sem folga de tempo** |
| Renderizador próprio (S5) | Go somente se o Mermaid exceder, em medida do CI, 5,0 s no `completo` ou 12 s no `completo` com Subtarefas com dagre e com ELK, ou se a resposta do mouse abaixo de 100 ms virar requisito | `completo` 3.597,9 ms e 3.905,4 ms (S1, S3), com Subtarefas 10.303,8 ms. O protótipo atinge 153,4 ms de resposta do mouse e ainda não cumpre 100 ms | **no-go agora**. Fica para a Perspectiva 3D ou uma spec própria |

Condição do go da ESM: **fixar `handDrawnSeed` na configuração do kit** e copiar a pasta de chunks da versão fixada ao `site/dist` (tarefa 6.2). Sem a semente, nem o bundle é estável contra ele mesmo.

### (b) Estratégia de expansão

**Proposta: um `mermaid.render` por Conjunto_Expandido, com cache de SVG por conjunto e fila de um pedido (o resultado obsoleto é descartado). Sem antecipação automática. Sem ELK. Sem iframe nem Worker.**

| Item | Critério numérico | Medido | Veredito proposto |
|---|---|---|---|
| Um render por conjunto com cache e fila | Primeira expansão de 1 raia em até 1,0 s e volta a estado em cache em até 200 ms (15.8) | 1 raia: 763 ms (até o quadro); hit até o quadro: 34,8 a 115,9 ms até `completo`, 198,4 ms com Subtarefas (3 execuções) | **go** |
| Limite de memória do cache | O cache guarda no máximo 6 conjuntos e no máximo 24 MiB de texto de SVG (ordem LRU, o que vier primeiro) | os 5 conjuntos pesados somam 20,8 MiB como texto. Limite escolhido com folga de 15% sobre esse total. **Número proposto, sem medida de memória em dispositivo** | **go, valor a confirmar** |
| Render antecipado em tempo ocioso | Go somente se a resposta do mouse p95 durante a antecipação for de no máximo 100 ms | 718,7 ms, contra 26,5 ms em repouso | **no-go**. Reabrir se uma raia concentrar a maior parte dos primeiros cliques (sem dados) e o render dela ficar abaixo de 100 ms |
| ELK | Go somente se o `completo` com Subtarefas com dagre passar de 12 s em medida do CI e o ELK ficar abaixo, com a carga do Diagrama dentro do teto de 1,1 MB | dagre 10.127,4 a 10.303,8 ms (abaixo de 12 s). ELK custa 687,2 KiB e piora a Visão geral em 26%. Ganho de 52% só em `completo` com Subtarefas (3 execuções) | **no-go**. Reabrir se a medição de CI cruzar 12 s |
| `htmlLabels: false`, `curve: linear` ou `step` | Ganho de tempo de pelo menos 15% na mediana de `completo`, sem tags literais | `curve`: mediana de `completo` entre -0,7% e +0,1% (ruído). `htmlLabels: false`: +12% e 583 tags literais | **no-go** |
| iframe com `sandbox`, Worker para o Mermaid | Resposta do mouse abaixo de 100 ms durante render de 3 s | iframe 3.906,6 ms (mesmo processo), Worker lança `ReferenceError` | **no-go** |

Contrato de interface que o resultado implica: o render bloqueia a thread principal pelo tempo inteiro do render (3,9 s em `completo`, 10,3 s com Subtarefas). Por isso o indicador de progresso precisa pintar **antes** de o render começar (dois `requestAnimationFrame`, Requisito 20.9) e o botão de `completo` com Subtarefas precisa avisar do tempo.

### (c) Limites `maxTextSize` e `maxEdges`

Arquivo atual: `lib/flow-mermaid/limites.ts`, com `MERMAID_MAX_TEXT_SIZE = 200_000` e `MERMAID_MAX_EDGES = 1_000`. Critério registrado nele: pelo menos 2x o maior Expandir_tudo medido nas 12 Demandas com Subtarefas.

**Proposta: manter 200.000 e 1.000, e transformar o critério em verificação.**

| Verificação | Critério numérico | Medido |
|---|---|---|
| Margem do texto | `maxTextSize` de no mínimo 2 vezes o maior texto das 12 Demandas com Subtarefas | 200.000 contra 97.878 caracteres: 2,04x (o design cita 98.526 bytes: 2,03x) |
| Margem das arestas | `maxEdges` de no mínimo 2 vezes a maior contagem de arestas | 1.000 contra 443: 2,26x (design: 449, 2,23x) |
| Gatilho de revisão | Quando o maior texto passar de 50% do limite, o PR sobe o limite ao próximo valor redondo (400.000 e 2.000) | hoje em 48,9% do texto e 44,3% das arestas, **margem de 1,1 ponto percentual até o gatilho de texto** |
| Falha silenciosa | Antes do render, comparar `texto.length` e a contagem de arestas com os limites. Depois do render, rejeitar o SVG que traga a mensagem de limite do Mermaid ("Maximum Text size in diagram exceeded"). Nos dois casos, mostrar a alternativa textual e a mensagem de limite (20.10) | S2: nos limites padrão o `completo` com Subtarefas devolve um SVG de 9.743 bytes com 1 nó, sem exceção |

Observações: o custo de tempo de elevar os limites não aparece nos dados (o `completo` passa nos dois e a diferença cabe no ruído). O ganho de segurança dos limites padrão não foi medido. O texto vem do YAML do repositório, gerado no build, com `securityLevel: strict`. Manter os limites e a verificação em `tests/flow-graph/limites-mermaid.test.ts` cobre as 12 Demandas.

### (d) Tetos de 15.8: confirmação ou ajuste

Tempos com CPU 4x, p95, nesta máquina carregada, indicativos. A coluna "Margem" é (teto menos medido) sobre o teto.

| Item de 15.8 | Teto | Maior medida (fonte) | Margem | Proposta |
|---|---|---|---|---|
| Carga inicial (sem Mermaid) | 300 kB | **não verificado** | n/a | manter |
| Modelo_de_Grafo por Demanda | 200 kB | **não verificado** (hoje `api/flows/feature.json` com 33.604 bytes gzip, segundo o design) | n/a | manter |
| Carga do Diagrama | 1,1 MB (meta 300 kB) | ESM 241,1 kB decimal; bundle 983,9 kB decimal (S6) | ESM abaixo da meta com 58,9 kB de folga para o Renderizador; bundle com 10,6% sob o teto | manter, meta de 300 kB confirmada com a ESM |
| Total por página | 1,4 MB (meta 600 kB) | **não verificado** (depende da carga inicial) | n/a | manter |
| Visão geral interativa | 2,0 s | 1.599 ms (`DOMContentLoaded` p95 de 911,3 ms da página atual mais 687,9 ms ESM). Soma de p95s, portanto conservadora | 20% | manter. O bundle chegaria a 1.974 ms |
| Expandir 1 raia a partir da Visão geral | 1,0 s | 763 ms (S4, até o quadro) | 24% | manter, **esclarecer que vale para a primeira raia a partir da Visão geral**. Com 5 raias abertas o render sobe a 1.115,7 ms (1.231,5 ms até o quadro) |
| Troca para estado em cache | 200 ms | 115,9 ms até `completo`; 198,4 ms com Subtarefas (3 execuções) | 42% e 0,8% | manter até `completo`. **Ajuste: para `completo` com Subtarefas o 200 ms vira aviso** |
| Expandir tudo (`completo`) | 5,0 s | 3.905,4 ms (S3); 3.810,8 ms (S4 até o quadro) | 22% | manter |
| Indicador de progresso | 100 ms | **não verificado** | n/a | manter, medir na Fase 8 |
| `completo` com Subtarefas | 12 s, aviso | 10.372,1 ms (S4 até o quadro, 3 execuções); 10.303,8 ms (S1, 10 execuções) | 14% | manter como aviso, nunca como falha |
| Filtro do Catalogo | 100 ms | **não verificado** | n/a | manter |
| Crescimento de `site/dist` | 25% | base divergente (75.308 kB contra 38.928 kB) | n/a | manter o teto, **registrar de novo a base** |

Ajustes propostos ao design: (1) o modelo linear da tabela "Tempos por passo" ("0,2 s fixos mais 15 a 17 ms por nó") dá lugar à faixa marginal medida, de 8,6 a 30,8 ms por nó adicional, crescente com o tamanho; (2) a previsão do render da Visão geral passa de 0,26 a 0,32 s para 0,5 s (p95 509,2 ms nesta máquina carregada). Resposta do mouse durante o render **não entra como teto**: nenhum caminho com Mermaid atinge 100 ms (3.857,8 ms no `completo`) e o próprio protótipo do Renderizador próprio mede 153,4 ms. O contrato passa a ser "indicador pintado antes do render, Diagrama anterior visível, resultado obsoleto descartado".

### (e) Go/no-go resumido

| Decisão                 | Critério de go                                                                 | Medido                                                            | Proposta                                     |
| ----------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------- |
| ESM dividida            | SVG idêntico, sobreposição 0, no máximo 300 kB, tempo menor ou igual ao bundle | 3/3, 0, 241,1 kB, 687,9 ms contra 1.062,7 ms                      | go                                           |
| Bundle único            | só se a ESM falhar                                                             | 983,9 kB, margem de 1,3% na Visão geral                           | fallback                                     |
| Renderizador próprio    | Mermaid acima de 5,0 s (`completo`) ou 12 s (com Subtarefas)                   | 3.905,4 ms e 10.372,1 ms                                          | no-go                                        |
| Cache de SVG com fila   | hit no máximo 200 ms                                                           | 115,9 ms (198,4 ms com Subtarefas)                                | go                                           |
| Antecipação             | resposta do mouse no máximo 100 ms                                             | 718,7 ms                                                          | no-go                                        |
| ELK                     | dagre acima de 12 s em CI                                                      | 10.303,8 ms                                                       | no-go                                        |
| Limites 200.000 e 1.000 | pelo menos 2x o maior da `feature`                                             | 2,04x e 2,26x                                                     | go, com verificação antes e depois do render |
| Tetos de 15.8           | cada item conforme a tabela (d)                                                | 6 itens com medida e dentro; 5 não verificados; 1 base divergente | confirmar, com 2 ajustes de redação          |

## Reprodução

Os dados de cada spike estão em `docs/spike-fluxos/`. Os specs estão em `tests/browser/spike/`. As bibliotecas externas dos spikes (`mermaid@11.17.2` em ESM, `@mermaid-js/layout-elk` 0.2.3 e `@dagrejs/dagre` 3.1.4) foram instaladas fora do repositório, e o `package.json` do kit ficou intocado.
