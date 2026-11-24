---
id: prim
tipo: algoritmo
nome: Algoritmo de Prim
descricao: Cresce a árvore a partir de um vértice, escolhendo sempre a aresta de menor peso que liga a árvore a um vértice novo, com uma fila de prioridade.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Planejar a malha de menor custo que conecta cidades a partir de uma central.
quando_usar:
  - Grafos densos
  - Crescimento incremental a partir de uma origem
quando_evitar:
  - Lista de arestas já ordenada (Kruskal)
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
subarea: árvore geradora mínima
categoria: grafos / árvore geradora mínima
entrada: Grafo não dirigido, conexo e ponderado
saida: Árvore geradora de menor peso total
complexidade:
  tempoMelhor: O(E log V)
  tempoMedio: O(E log V)
  tempoPior: O(E log V)
  memoria: O(V)
  observacao: com heap binário; O(E + V log V) com heap de Fibonacci
preCondicoes:
  - grafo não dirigido e conexo
limitacoes:
  - somente grafos não dirigidos
  - em grafos esparsos Kruskal costuma ser mais simples
casosDeUso:
  - Grafos densos representados por lista de adjacência
  - Construção incremental de uma rede a partir de um nó
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[dijkstra|Algoritmo de Dijkstra]]"
  - "[[kruskal|Algoritmo de Kruskal]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Grafo desconexo (cobre apenas a componente inicial)
    - Pesos iguais (qualquer MST válida)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Prim
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
função prim(g, inicio):
    na_arvore[inicio] = verdadeiro ; fila = arestas de inicio
    enquanto fila não está vazia:
        (w, u, v) = extrair_minimo(fila)
        se na_arvore[v]: continuar
        na_arvore[v] = verdadeiro ; anexar (u, v, w) em arvore
        inserir em fila as arestas de v para vértices fora da árvore
    retorne arvore
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
