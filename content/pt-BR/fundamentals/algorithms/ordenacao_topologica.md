---
id: ordenacao_topologica
tipo: algoritmo
nome: Ordenação topológica
descricao: Ordena os vértices de um grafo dirigido acíclico (DAG) de modo que toda aresta u -> v tenha u antes de v. Pode ser feita com DFS ou com o algoritmo de Kahn.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Definir a ordem de compilação de módulos ou de execução de tarefas em um pipeline de build.
quando_usar:
  - Dependências entre tarefas, módulos ou pacotes
  - Verificar se um grafo dirigido é acíclico
quando_evitar:
  - Grafo com ciclos (resolva os ciclos primeiro com componentes fortemente conexos)
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
subarea: ordenação por dependência
categoria: grafos / ordenação por dependência
entrada: Grafo dirigido acíclico
saida: Sequência de vértices respeitando as dependências (ou aviso de ciclo)
complexidade:
  tempoMelhor: O(V + E)
  tempoMedio: O(V + E)
  tempoPior: O(V + E)
  memoria: O(V)
  observacao: Kahn usa grau de entrada e fila; DFS usa pilha de recursão
preCondicoes:
  - grafo dirigido sem ciclos
limitacoes:
  - só existe ordem em DAGs
  - a ordem resultante raramente é única
casosDeUso:
  - Resolução de dependências (pacotes, builds, migrações)
  - Agendamento de tarefas com precedência
casosDeUsoKit: []
estruturasDeDados:
  - "[[fila|Fila]]"
  - "[[grafo|Grafo]]"
  - "[[pilha|Pilha]]"
algoritmosRelacionados:
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[tarjan_scc|Componentes fortemente conexos (Tarjan)]]"
padroes:
  - "[[prompt_chaining|Prompt Chaining]]"
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Ciclo de dependência (deve sinalizar erro)
    - Vários vértices sem dependência (ordem livre entre eles)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Ordenação topológica
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
função kahn(g):
    grau[v] = número de arestas entrando em v
    fila = vértices com grau 0 ; ordem = []
    enquanto fila não está vazia:
        u = desenfileirar(fila) ; anexar u em ordem
        para cada v em g.adj[u]:
            grau[v] = grau[v] - 1
            se grau[v] == 0: enfileirar(fila, v)
    se tamanho(ordem) < V: retorne "ciclo detectado"
    retorne ordem
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
