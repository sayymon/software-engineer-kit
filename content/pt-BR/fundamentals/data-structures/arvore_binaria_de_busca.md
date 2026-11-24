---
id: arvore_binaria_de_busca
tipo: estrutura-de-dados
nome: Árvore binária de busca
descricao: "Árvore em que cada nó tem no máximo dois filhos e mantém a ordem: chaves menores à esquerda, maiores à direita. Sem balanceamento, a altura depende da ordem de inserção."
fonte_ids:
  - clrs
  - algs4_search
  - java_util
exemplo: Um dicionário ordenado em memória permite achar a menor chave maior ou igual a x em O(h), onde h é a altura.
quando_usar:
  - Mapa ordenado com buscas por intervalo, predecessor e sucessor
  - Base didática para árvores balanceadas
  - Conjuntos ordenados de tamanho moderado com inserções aleatórias
quando_evitar:
  - Chaves chegam ordenadas (a árvore degenera em lista de altura n)
  - Latência no pior caso é crítica (prefira AVL ou rubro-negra)
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
  - id: java_util
    tipo: artigo
    titulo: "Java SE 21 API: pacote java.util (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: arvore
operacoes:
  - nome: busca
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: O(h) em função da altura
  - nome: inserção
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: ""
  - nome: remoção
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: ""
  - nome: percurso em ordem
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - ordem esquerda < nó < direita
  - percurso em ordem entrega as chaves ordenadas
  - altura depende da sequência de inserção
tradeoffs:
  - "Ganha: busca ordenada e consultas por intervalo; paga: pior caso O(n) sem balanceamento"
  - "Ganha: implementação simples; paga: ponteiros por nó e localidade de cache fraca"
casosDeBorda:
  - Chaves em ordem crescente (degeneração)
  - Remoção de nó com dois filhos
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.TreeMap
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
estruturasRelacionadas:
  - "[[arvore_avl|Árvore AVL]]"
  - "[[arvore_rubro_negra|Árvore rubro-negra]]"
  - "[[b_tree|B-tree]]"
  - "[[heap|Heap e fila de prioridade]]"
  - "[[skip_list|Skip list]]"
  - "[[trie|Trie]]"
padroes:
  - "[[composite|Composite (GoF)]]"
  - "[[iterator|Iterator (GoF)]]"
ferramentas: []
casosDeUso:
  - Mapas ordenados em memória
  - Consultas de predecessor e sucessor
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Árvore binária de busca
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
    enquanto no não é nulo:
        se chave == no.chave: retorne no
        se chave < no.chave: no = no.esquerda
        senão: no = no.direita
    retorne nulo

função inserir(no, chave):
    se no é nulo: retorne Nó(chave)
    se chave < no.chave: no.esquerda = inserir(no.esquerda, chave)
    senão se chave > no.chave: no.direita = inserir(no.direita, chave)
    retorne no
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
