---
id: b_tree
tipo: estrutura-de-dados
nome: B-tree
descricao: "Árvore de busca balanceada com muitos filhos por nó, desenhada para minimizar leituras de disco: cada nó ocupa uma página e a altura fica em poucos níveis."
fonte_ids:
  - clrs
  - algs4_search
  - taocp
exemplo: Índices de bancos relacionais como o PostgreSQL usam B-trees (variante B+tree) para achar linhas com poucas leituras de página.
quando_usar:
  - Índices em bancos de dados e sistemas de arquivos
  - Dados maiores que a memória com acesso por blocos
  - Consultas por igualdade e por intervalo ordenado
quando_evitar:
  - Tudo cabe em memória e o acesso é por ponteiro (rubro-negra costuma bastar)
  - Cargas de escrita muito intensa e sequencial (LSM-tree pode servir melhor)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_search
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 3: Searching (Princeton)"
    link: https://algs4.cs.princeton.edu/30searching/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: arvore
operacoes:
  - nome: busca
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: "base alta: poucos níveis"
  - nome: inserção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: divide nós cheios
  - nome: remoção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: funde ou redistribui nós
  - nome: consulta por intervalo
    melhor: O(log n)
    medio: O(log n + k)
    pior: O(log n + k)
    observacao: k é o número de resultados
memoria: O(n)
propriedades:
  - cada nó guarda entre t-1 e 2t-1 chaves (grau mínimo t)
  - todas as folhas na mesma profundidade
  - nó dimensionado para uma página de disco
tradeoffs:
  - "Ganha: poucas leituras de página por busca; paga: divisões e fusões de nós complicam a implementação"
  - "Ganha: consultas por intervalo eficientes; paga: espaço parcialmente ocupado nos nós"
casosDeBorda:
  - Divisão da raiz (aumenta a altura)
  - Fusão de nós com subocupação após remoções
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[arvore_avl|Árvore AVL]]"
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[arvore_rubro_negra|Árvore rubro-negra]]"
padroes:
  - "[[sharding|Sharding]]"
ferramentas:
  - "[[postgresql|PostgreSQL]]"
casosDeUso:
  - Índices de bancos de dados relacionais
  - Metadados de sistemas de arquivos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# B-tree
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
função buscar(no, chave):
    i = primeira posição em no.chaves com chave <= no.chaves[i]
    se i < no.n e no.chaves[i] == chave: retorne (no, i)
    se no é folha: retorne ausente
    ler_pagina(no.filhos[i])
    retorne buscar(no.filhos[i], chave)
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
