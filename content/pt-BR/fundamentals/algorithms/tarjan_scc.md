---
id: tarjan_scc
tipo: algoritmo
nome: Componentes fortemente conexos (Tarjan)
descricao: Encontra os componentes fortemente conexos de um grafo dirigido (conjuntos em que todo vértice alcança todos os outros) em uma única DFS, com índices de descoberta e low-link.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Achar grupos de serviços que dependem circularmente uns dos outros em um grafo de chamadas.
quando_usar:
  - Ciclos de dependência em grafos dirigidos
  - Pré-processar para ordenação topológica
quando_evitar:
  - Grafos não dirigidos (componentes conexos simples bastam)
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
subarea: conectividade
categoria: grafos / conectividade
entrada: Grafo dirigido
saida: Partição dos vértices em componentes fortemente conexos
complexidade:
  tempoMelhor: O(V + E)
  tempoMedio: O(V + E)
  tempoPior: O(V + E)
  memoria: O(V)
  observacao: pilha de componentes e vetores de índice e low-link
preCondicoes:
  - grafo dirigido
limitacoes:
  - a recursão pode ficar profunda (use versão iterativa em grafos enormes)
  - resultado em ordem topológica reversa dos componentes
casosDeUso:
  - Detecção de dependências circulares entre módulos ou serviços
  - Condensar o grafo em um DAG para ordenação topológica
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[pilha|Pilha]]"
algoritmosRelacionados:
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[ordenacao_topologica|Ordenação topológica]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Vértice isolado forma um componente próprio
    - Laço (aresta para si mesmo)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Componentes fortemente conexos (Tarjan)
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
função tarjan(g):
    indice = 0 ; pilha = []
    para cada v sem índice: conectar(v)

função conectar(v):
    idx[v] = low[v] = indice++ ; empilhar(pilha, v) ; na_pilha[v] = verdadeiro
    para cada w em g.adj[v]:
        se idx[w] indefinido: conectar(w) ; low[v] = min(low[v], low[w])
        senão se na_pilha[w]: low[v] = min(low[v], idx[w])
    se low[v] == idx[v]: desempilhar até v e formar um componente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
