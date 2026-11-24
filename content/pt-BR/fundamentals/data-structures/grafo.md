---
id: grafo
tipo: estrutura-de-dados
nome: Grafo
descricao: "Conjunto de vértices ligados por arestas (dirigidas ou não, com ou sem peso). Duas representações clássicas: lista de adjacência, com espaço O(V + E), e matriz de adjacência, com espaço O(V^2) e teste de aresta em O(1)."
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Uma rede social modela pessoas como vértices e amizades como arestas para sugerir conexões por vizinhos em comum.
quando_usar:
  - Modelar redes, rotas, dependências e relações
  - Problemas de caminho, conectividade, fluxo e ordenação por dependência
  - Bases de dados orientadas a grafos
quando_evitar:
  - Os dados são tabulares e as consultas por chave bastam
  - Grafo denso e pequeno com muitos testes de aresta (a matriz tende a servir melhor que a lista)
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
familia: grafo
operacoes:
  - nome: adicionar aresta (lista)
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: testar aresta (lista)
    melhor: O(1)
    medio: O(d)
    pior: O(V)
    observacao: d é o grau do vértice
  - nome: testar aresta (matriz)
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: percorrer vizinhos (lista)
    melhor: O(d)
    medio: O(d)
    pior: O(V)
    observacao: d é o grau do vértice
memoria: O(V + E)
propriedades:
  - vértices e arestas, direcionadas ou não
  - esparso favorece lista; denso favorece matriz
  - pesos nas arestas habilitam caminhos mínimos
tradeoffs:
  - "Ganha: modelo expressivo para relações; paga: algoritmos mais caros e visualização difícil em escala"
  - "Ganha: lista de adjacência economiza espaço em grafos esparsos; paga: teste de aresta mais lento que na matriz"
casosDeBorda:
  - Grafo desconexo (várias componentes)
  - Laços (aresta de um vértice para ele mesmo) e arestas paralelas
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados:
  - "[[a_estrela|Algoritmo A estrela]]"
  - "[[bellman_ford|Algoritmo de Bellman-Ford]]"
  - "[[dijkstra|Algoritmo de Dijkstra]]"
  - "[[floyd_warshall|Algoritmo de Floyd-Warshall]]"
  - "[[kruskal|Algoritmo de Kruskal]]"
  - "[[prim|Algoritmo de Prim]]"
  - "[[bfs|Busca em largura (BFS)]]"
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[tarjan_scc|Componentes fortemente conexos (Tarjan)]]"
  - "[[edmonds_karp|Fluxo máximo (Edmonds-Karp)]]"
  - "[[ordenacao_topologica|Ordenação topológica]]"
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[lista_ligada|Lista ligada]]"
  - "[[union_find|Union-Find]]"
padroes:
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[graphrag|GraphRAG]]"
ferramentas:
  - "[[neo4j|Neo4j]]"
casosDeUso:
  - Redes sociais e recomendação
  - Roteamento e logística
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Grafo
<!-- fundamento:gen -->
## 📋 Resumo
`= this.descricao`

Família: `= this.familia`

Exemplo: `= this.exemplo`
## ⏱ Operações e complexidade

Memória: `= this.memoria`
## 🧪 Implementação e testes
- **Linguagem de referência:** `= this.implementacao.linguagemReferencia`
- **Versão:** `= this.implementacao.versao`
- **Biblioteca padrão:** `= this.implementacao.bibliotecaPadrao`
## 🧾 Pseudocódigo das operações-chave
```text
estrutura Grafo: n vértices, adj[0..n-1] listas de (destino, peso)

função adicionar_aresta(g, u, v, w):
    anexar (v, w) em g.adj[u]
    se não dirigido: anexar (u, w) em g.adj[v]

função vizinhos(g, u): retorne g.adj[u]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
