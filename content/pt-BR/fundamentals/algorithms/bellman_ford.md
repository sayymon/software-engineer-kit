---
id: bellman_ford
tipo: algoritmo
nome: Algoritmo de Bellman-Ford
descricao: Relaxa todas as arestas V-1 vezes para achar menores distâncias, inclusive com pesos negativos, e detecta ciclos de peso negativo com uma passada extra.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: "Arbitragem em câmbio: um ciclo de peso negativo nos logaritmos das taxas revela oportunidade de ganho."
quando_usar:
  - Pesos negativos
  - Detectar ciclo negativo
quando_evitar:
  - Pesos não negativos e desempenho importante (use Dijkstra)
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
subarea: caminho mínimo
categoria: grafos / caminho mínimo
entrada: Grafo ponderado (pesos podem ser negativos) e origem
saida: Menores distâncias a partir da origem ou a indicação de ciclo negativo alcançável
complexidade:
  tempoMelhor: O(E)
  tempoMedio: O(V * E)
  tempoPior: O(V * E)
  memoria: O(V)
  observacao: a parada antecipada, quando nenhuma distância muda, reduz o custo médio
preCondicoes:
  - grafo dirigido (ou não dirigido sem arestas negativas)
limitacoes:
  - mais lento que Dijkstra em grafos sem pesos negativos
  - ciclo negativo alcançável invalida as menores distâncias
casosDeUso:
  - Grafos com pesos negativos
  - Detecção de ciclos negativos, como em roteamento por vetor de distância (RIP)
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
algoritmosRelacionados:
  - "[[dijkstra|Algoritmo de Dijkstra]]"
  - "[[floyd_warshall|Algoritmo de Floyd-Warshall]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Ciclo negativo alcançável da origem
    - Grafo sem arestas
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Bellman-Ford
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
função bellman_ford(g, origem):
    dist[v] = infinito ; dist[origem] = 0
    repetir V-1 vezes:
        para cada aresta (u, v, w): se dist[u] + w < dist[v]: dist[v] = dist[u] + w
    para cada aresta (u, v, w):
        se dist[u] + w < dist[v]: retorne "ciclo negativo"
    retorne dist
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
