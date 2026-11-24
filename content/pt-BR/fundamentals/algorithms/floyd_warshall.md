---
id: floyd_warshall
tipo: algoritmo
nome: Algoritmo de Floyd-Warshall
descricao: Programação dinâmica sobre vértices intermediários que calcula a menor distância entre todos os pares de vértices em O(V^3).
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Tabela de distâncias entre todas as cidades de uma rede para consulta instantânea.
quando_usar:
  - Todos os pares em grafos pequenos ou densos
  - Fecho transitivo
quando_evitar:
  - Grafos grandes e esparsos (rode Dijkstra a partir de cada origem)
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
subarea: caminho mínimo entre todos os pares
categoria: grafos / caminho mínimo entre todos os pares
entrada: Matriz de pesos de um grafo com V vértices
saida: Matriz com as menores distâncias entre todos os pares
complexidade:
  tempoMelhor: O(V^3)
  tempoMedio: O(V^3)
  tempoPior: O(V^3)
  memoria: O(V^2)
  observacao: pode armazenar a matriz de predecessores para reconstruir caminhos
preCondicoes:
  - sem ciclos de peso negativo
limitacoes:
  - "cúbico: inviável para V muito grande"
  - ciclos negativos corrompem os resultados
casosDeUso:
  - Grafos pequenos e densos em que todos os pares importam
  - Fecho transitivo (alcançabilidade entre todos os pares)
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[grafo|Grafo]]"
algoritmosRelacionados:
  - "[[bellman_ford|Algoritmo de Bellman-Ford]]"
  - "[[dijkstra|Algoritmo de Dijkstra]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Diagonal inicial zero e ausência de aresta como infinito
    - Detecção de ciclo negativo (dist[i][i] < 0)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Floyd-Warshall
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
função floyd_warshall(dist):          // dist[i][j] inicial: peso da aresta, infinito, ou 0 se i == j
    para k de 0 até V-1:
        para i de 0 até V-1:
            para j de 0 até V-1:
                se dist[i][k] + dist[k][j] < dist[i][j]: dist[i][j] = dist[i][k] + dist[k][j]
    retorne dist
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
