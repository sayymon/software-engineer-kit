---
id: arvore_avl
tipo: estrutura-de-dados
nome: Árvore AVL
descricao: Árvore binária de busca que mantém a diferença de altura entre as subárvores de cada nó em no máximo 1, corrigindo com rotações após inserções e remoções.
fonte_ids:
  - clrs
  - algs4_search
  - taocp
exemplo: Um índice em memória com muitas leituras ordenadas usa AVL para manter altura próxima de 1,44 log n.
quando_usar:
  - Cargas de leitura intensa em que a busca rápida compensa rotações extras
  - Mapas ordenados com garantia de O(log n) no pior caso
  - Ensino de balanceamento por rotações
quando_evitar:
  - Escrita pesada (a rubro-negra faz menos rotações por atualização)
  - Dados em disco (prefira B-tree)
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
    melhor: O(1)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: inserção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: até 2 rotações
  - nome: remoção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: até O(log n) rotações
  - nome: percurso em ordem
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - fator de balanceamento em {-1, 0, 1}
  - altura máxima próxima de 1,44 log n
  - rotações simples e duplas
tradeoffs:
  - "Ganha: altura mínima e buscas rápidas; paga: mais rotações nas escritas que a rubro-negra"
  - "Ganha: pior caso O(log n); paga: guarda altura ou fator por nó e implementação mais trabalhosa"
casosDeBorda:
  - Rotação dupla (esquerda-direita) em nó com filho pesado ao lado oposto
  - Remoção que desbalanceia ancestrais em cascata
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[arvore_rubro_negra|Árvore rubro-negra]]"
  - "[[b_tree|B-tree]]"
padroes: []
ferramentas: []
casosDeUso:
  - Índices ordenados em memória com leitura intensa
  - Mapas ordenados com pior caso garantido
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Árvore AVL
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
função rebalancear(no):
    atualizar_altura(no)
    fb = altura(no.esquerda) - altura(no.direita)
    se fb > 1:
        se fator(no.esquerda) < 0: no.esquerda = rotacionar_esquerda(no.esquerda)
        retorne rotacionar_direita(no)
    se fb < -1:
        se fator(no.direita) > 0: no.direita = rotacionar_direita(no.direita)
        retorne rotacionar_esquerda(no)
    retorne no
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
