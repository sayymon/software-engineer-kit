---
id: bfs
tipo: algoritmo
nome: Busca em largura (BFS)
descricao: Visita os vértices por camadas de distância (em número de arestas) a partir de uma origem, usando uma fila.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Achar o menor número de conexões entre duas pessoas em uma rede social.
quando_usar:
  - Menor caminho sem pesos
  - Varredura por níveis
quando_evitar:
  - Arestas com pesos diferentes (use Dijkstra)
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
subarea: travessia
categoria: grafos / travessia
entrada: Grafo (lista de adjacência) e vértice de origem
saida: Distância em arestas e pai de cada vértice alcançável
complexidade:
  tempoMelhor: O(V + E)
  tempoMedio: O(V + E)
  tempoPior: O(V + E)
  memoria: O(V)
  observacao: usa fila e vetor de visitados de tamanho V
preCondicoes:
  - grafo representado por lista de adjacência
limitacoes:
  - entrega o menor caminho apenas em grafos sem pesos (ou com pesos iguais)
casosDeUso:
  - Menor caminho em número de arestas, como no jogo dos graus de separação
  - Rastreadores web e propagação em camadas
casosDeUsoKit: []
estruturasDeDados:
  - "[[deque|Deque]]"
  - "[[fila|Fila]]"
  - "[[grafo|Grafo]]"
algoritmosRelacionados:
  - "[[dijkstra|Algoritmo de Dijkstra]]"
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[edmonds_karp|Fluxo máximo (Edmonds-Karp)]]"
padroes:
  - "[[iterator|Iterator (GoF)]]"
ferramentas:
  - "[[neo4j|Neo4j]]"
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Grafo desconexo (só a componente da origem é visitada)
    - Ciclos (visitados evitam repetição)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca em largura (BFS)
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
função bfs(g, origem):
    dist[v] = infinito para todo v ; dist[origem] = 0
    fila = [origem]
    enquanto fila não está vazia:
        u = desenfileirar(fila)
        para cada v em g.adj[u]:
            se dist[v] == infinito:
                dist[v] = dist[u] + 1 ; pai[v] = u
                enfileirar(fila, v)
    retorne dist, pai
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
