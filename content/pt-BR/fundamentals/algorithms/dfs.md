---
id: dfs
tipo: algoritmo
nome: Busca em profundidade (DFS)
descricao: Explora cada ramo do grafo até o fim antes de voltar (backtracking natural), usando recursão ou uma pilha explícita.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Detectar ciclos em um grafo de dependências de pacotes.
quando_usar:
  - Ciclos, componentes e dependências
  - Exploração exaustiva de caminhos
quando_evitar:
  - Menor caminho (use BFS ou Dijkstra)
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
entrada: Grafo e vértice de origem
saida: Ordem de descoberta e de término, pais e classificação das arestas
complexidade:
  tempoMelhor: O(V + E)
  tempoMedio: O(V + E)
  tempoPior: O(V + E)
  memoria: O(V)
  observacao: pilha de recursão pode chegar a O(V)
preCondicoes:
  - grafo representado por lista de adjacência
limitacoes:
  - recursão profunda pode estourar a pilha (use pilha explícita)
  - não entrega menores caminhos
casosDeUso:
  - Detecção de ciclos, componentes conexos e ordenação topológica
  - Resolver labirintos e explorar espaços de estados
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[pilha|Pilha]]"
algoritmosRelacionados:
  - "[[bfs|Busca em largura (BFS)]]"
  - "[[tarjan_scc|Componentes fortemente conexos (Tarjan)]]"
  - "[[n_rainhas|N-rainhas]]"
  - "[[ordenacao_topologica|Ordenação topológica]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Grafo com milhões de vértices em cadeia (estouro de pilha na versão recursiva)
    - Grafo desconexo exige iniciar de cada vértice não visitado
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca em profundidade (DFS)
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
função dfs(g, u):
    visitado[u] = verdadeiro ; entrada[u] = relógio++
    para cada v em g.adj[u]:
        se não visitado[v]: pai[v] = u ; dfs(g, v)
    saida[u] = relógio++
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
