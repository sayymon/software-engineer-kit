---
id: edmonds_karp
tipo: algoritmo
nome: Fluxo máximo (Edmonds-Karp)
descricao: Implementação do método de Ford-Fulkerson que busca o caminho de aumento mais curto com BFS no grafo residual, garantindo O(V * E^2).
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Calcular quantos pedidos por minuto uma rede de entregas com capacidades limitadas consegue escoar da origem ao destino.
quando_usar:
  - Fluxo e corte mínimo em redes de tamanho moderado
  - Emparelhamento bipartido
quando_evitar:
  - Redes muito grandes (use Dinic ou push-relabel)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_graphs
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 4: Graphs (Princeton)"
    link: https://algs4.cs.princeton.edu/40graphs/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: grafos
subarea: fluxo em redes
categoria: grafos / fluxo em redes
entrada: Rede de fluxo com capacidades, origem s e destino t
saida: Valor do fluxo máximo e o fluxo em cada aresta
complexidade:
  tempoMelhor: O(V * E)
  tempoMedio: O(V * E^2)
  tempoPior: O(V * E^2)
  memoria: O(V + E)
  observacao: o limite O(V * E^2) vale para capacidades quaisquer
preCondicoes:
  - capacidades não negativas
  - uma origem e um destino
limitacoes:
  - mais lento que Dinic ou push-relabel em redes grandes
  - grafo residual duplica as arestas na memória
casosDeUso:
  - Alocação de capacidade em redes e logística
  - Emparelhamento máximo em grafos bipartidos e corte mínimo
casosDeUsoKit: []
estruturasDeDados:
  - "[[fila|Fila]]"
  - "[[grafo|Grafo]]"
algoritmosRelacionados:
  - "[[bfs|Busca em largura (BFS)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Origem igual ao destino
    - Arestas antiparalelas (use arestas reversas no grafo residual)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Fluxo máximo (Edmonds-Karp)
<!-- fundamento:gen -->
## 📋 Resumo
`= this.descricao`

Categoria: `= this.categoria`

Exemplo: `= this.exemplo`
## 🔁 Entrada e saída
- **Entrada:** `= this.entrada`
- **Saída:** `= this.saida`
## ⏱ Complexidade
- **Tempo (melhor, médio, pior):** `= this.complexidade.tempoMelhor` · `= this.complexidade.tempoMedio` · `= this.complexidade.tempoPior`
- **Memória extra:** `= this.complexidade.memoria`
- **Observação:** `= this.complexidade.observacao`
## 🧪 Implementação e testes
- **Linguagem de referência:** `= this.implementacao.linguagemReferencia`
- **Versão:** `= this.implementacao.versao`
- **Biblioteca padrão:** `= this.implementacao.bibliotecaPadrao`
## 🧾 Pseudocódigo
```text
função edmonds_karp(g, s, t):
    fluxo = 0
    repetir:
        caminho = bfs_residual(g, s, t)             // caminho com capacidade residual positiva
        se caminho não existe: retorne fluxo
        gargalo = menor capacidade residual em caminho
        para cada aresta (u, v) em caminho: residual[u][v] -= gargalo ; residual[v][u] += gargalo
        fluxo = fluxo + gargalo
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
