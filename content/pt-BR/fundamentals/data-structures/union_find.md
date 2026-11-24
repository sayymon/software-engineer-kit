---
id: union_find
tipo: estrutura-de-dados
nome: Union-Find
descricao: Estrutura de conjuntos disjuntos com as operações find (representante do conjunto) e union (fundir dois conjuntos). Com união por tamanho e compressão de caminho, o custo amortizado é quase constante, O(alfa(n)).
fonte_ids:
  - clrs
  - algs4_uf
  - mit6006
exemplo: O algoritmo de Kruskal usa union-find para detectar se uma aresta fecha ciclo.
quando_usar:
  - Conectividade dinâmica e componentes conexos incrementais
  - Detectar ciclos em grafos não dirigidos
  - Agrupar itens equivalentes (por exemplo, deduplicação)
quando_evitar:
  - Remoção de arestas ou divisão de conjuntos é necessária (a estrutura só funde)
  - A consulta exige listar os membros de cada conjunto com frequência
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_uf
    tipo: artigo
    titulo: "Algorithms 4e, seção 1.5: Union-Find (Princeton)"
    link: https://algs4.cs.princeton.edu/15uf/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: especializada
operacoes:
  - nome: find
    melhor: O(1)
    medio: O(1)
    pior: O(log n)
    observacao: amortizado quase constante com compressão de caminho e união por tamanho
  - nome: union
    melhor: O(1)
    medio: O(1)
    pior: O(log n)
    observacao: amortizado quase constante
  - nome: criar n conjuntos
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - floresta de árvores com pai por elemento
  - união por tamanho ou posto
  - compressão de caminho achata as árvores
tradeoffs:
  - "Ganha: operações em tempo quase constante; paga: só funde conjuntos e remoção de elementos exige reconstrução"
  - "Ganha: espaço O(n) mínimo; paga: listar membros do conjunto requer estrutura extra"
casosDeBorda:
  - Union de elementos que já estão no mesmo conjunto
  - Conjunto unitário (elemento é o próprio representante)
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados:
  - "[[kruskal|Algoritmo de Kruskal]]"
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[grafo|Grafo]]"
padroes: []
ferramentas: []
casosDeUso:
  - Componentes conexos incrementais
  - Detecção de ciclos em grafos não dirigidos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Union-Find
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
função find(x):
    se pai[x] != x: pai[x] = find(pai[x])      // compressão de caminho
    retorne pai[x]

função union(a, b):
    ra = find(a) ; rb = find(b)
    se ra == rb: retorne
    se tamanho[ra] < tamanho[rb]: trocar(ra, rb)
    pai[rb] = ra ; tamanho[ra] = tamanho[ra] + tamanho[rb]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
