---
id: dijkstra
tipo: algoritmo
nome: Algoritmo de Dijkstra
descricao: Calcula as menores distâncias de uma origem a todos os vértices de um grafo com pesos não negativos, expandindo sempre o vértice de menor distância conhecida com uma fila de prioridade.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: "Rotas de entrega: menor tempo de viagem entre um depósito e cada endereço de uma malha viária."
quando_usar:
  - Pesos não negativos e uma origem
  - Roteamento e custo mínimo
quando_evitar:
  - Pesos negativos (use Bellman-Ford)
  - Pesos todos iguais (BFS é mais simples)
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
entrada: Grafo ponderado com pesos não negativos e vértice de origem
saida: Menor distância da origem a cada vértice e o pai de cada vértice no caminho
complexidade:
  tempoMelhor: O(V + E)
  tempoMedio: O(V + E log V)
  tempoPior: O(V + E log V)
  memoria: O(V)
  observacao: com heap binário; com heap de Fibonacci chega a O(E + V log V)
preCondicoes:
  - pesos não negativos
  - grafo representado por lista de adjacência
limitacoes:
  - não aceita arestas de peso negativo (use Bellman-Ford)
  - calcula a partir de uma única origem (para todos os pares use Floyd-Warshall)
casosDeUso:
  - Roteamento em mapas, logística e redes (OSPF)
  - Menor custo em grafos de tarefas ou estados com custos positivos
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[a_estrela|Algoritmo A estrela]]"
  - "[[bellman_ford|Algoritmo de Bellman-Ford]]"
  - "[[floyd_warshall|Algoritmo de Floyd-Warshall]]"
  - "[[prim|Algoritmo de Prim]]"
  - "[[bfs|Busca em largura (BFS)]]"
padroes:
  - "[[strategy|Strategy (GoF)]]"
ferramentas:
  - "[[neo4j|Neo4j]]"
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.PriorityQueue
  casosDeBorda:
    - Vértice inalcançável (distância infinita)
    - Arestas paralelas e laços, e empates de distância
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Dijkstra
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
função dijkstra(g, origem):
    dist[v] = infinito para todo v ; dist[origem] = 0
    fila_prioridade = [(0, origem)]
    enquanto fila_prioridade não está vazia:
        (d, u) = extrair_minimo(fila_prioridade)
        se d > dist[u]: continuar                  // entrada obsoleta
        para cada (v, peso) em g.adj[u]:
            se dist[u] + peso < dist[v]:
                dist[v] = dist[u] + peso ; pai[v] = u
                inserir(fila_prioridade, (dist[v], v))
    retorne dist, pai
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
