---
id: kruskal
tipo: algoritmo
nome: Algoritmo de Kruskal
descricao: Ordena as arestas por peso e as adiciona uma a uma se não formarem ciclo, verificando com Union-Find, até conectar todos os vértices.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: Projetar a rede de cabos de menor custo total que conecta todos os escritórios.
quando_usar:
  - Grafos esparsos com lista de arestas
  - Quando a ordenação das arestas já existe
quando_evitar:
  - Grafos densos (Prim com heap pode ser melhor)
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
saida: Conjunto de V-1 arestas de menor peso total que conecta todos os vértices
complexidade:
  tempoMelhor: O(E log E)
  tempoMedio: O(E log E)
  tempoPior: O(E log E)
  memoria: O(V)
  observacao: dominado pela ordenação das arestas; O(E log V) equivalente
preCondicoes:
  - grafo não dirigido
  - grafo conexo para obter uma única árvore (senão resulta uma floresta)
limitacoes:
  - não se aplica a grafos dirigidos (árvore geradora mínima é conceito não dirigido)
  - ordenar todas as arestas pesa em grafos densos
casosDeUso:
  - Projeto de redes (energia, fibra, dutos)
  - Agrupamento hierárquico (clustering de linkage simples)
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[union_find|Union-Find]]"
algoritmosRelacionados:
  - "[[prim|Algoritmo de Prim]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Grafo desconexo (devolve floresta geradora)
    - Arestas com pesos iguais (várias árvores mínimas válidas)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Kruskal
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
função kruskal(vertices, arestas):
    ordenar arestas por peso crescente
    uf = Union-Find(vertices) ; arvore = []
    para cada (u, v, w) em arestas:
        se uf.find(u) != uf.find(v):
            uf.union(u, v) ; anexar (u, v, w) em arvore
    retorne arvore
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
