---
id: trie
tipo: estrutura-de-dados
nome: Trie
descricao: Árvore em que cada aresta representa um caractere e cada caminho da raiz forma um prefixo. Busca e inserção custam O(m), com m igual ao tamanho da chave, independente do número de chaves.
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Autocompletar de buscas lista as palavras que começam com o prefixo digitado percorrendo apenas o subtrecho da trie.
quando_usar:
  - Autocompletar, correção ortográfica e busca por prefixo
  - Tabelas de roteamento por prefixo mais longo
  - Dicionários de strings com muitas chaves compartilhando prefixos
quando_evitar:
  - Poucas chaves longas e sem prefixos em comum (a hash costuma bastar)
  - Alfabetos enormes sem compressão (memória por nó cresce)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_strings
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 5: Strings (Princeton)"
    link: https://algs4.cs.princeton.edu/50strings/
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
  - nome: inserção
    melhor: O(m)
    medio: O(m)
    pior: O(m)
    observacao: m é o tamanho da chave
  - nome: busca exata
    melhor: O(m)
    medio: O(m)
    pior: O(m)
    observacao: ""
  - nome: busca por prefixo
    melhor: O(m)
    medio: O(m + k)
    pior: O(m + k)
    observacao: k é o tamanho da saída listada
  - nome: remoção
    melhor: O(m)
    medio: O(m)
    pior: O(m)
    observacao: ""
memoria: O(n)
propriedades:
  - caminho da raiz representa o prefixo
  - nós marcam fim de palavra
  - versões compactas (radix tree) comprimem cadeias
tradeoffs:
  - "Ganha: buscas por prefixo em O(m) sem depender de n; paga: muita memória por nó em alfabetos grandes"
  - "Ganha: ordenação lexicográfica natural; paga: baixa localidade de cache"
casosDeBorda:
  - Chave vazia e chave que é prefixo de outra
  - Alfabeto com caracteres fora do esperado (Unicode)
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados:
  - "[[aho_corasick|Aho-Corasick]]"
  - "[[distancia_de_edicao|Distância de edição]]"
  - "[[radix_sort|Radix Sort]]"
estruturasRelacionadas:
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[tabela_hash|Tabela hash]]"
padroes:
  - "[[flyweight|Flyweight (GoF)]]"
ferramentas:
  - "[[opensearch|OpenSearch]]"
casosDeUso:
  - Autocompletar e busca por prefixo
  - Roteamento por prefixo mais longo
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Trie
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
função inserir(raiz, palavra):
    no = raiz
    para cada caractere c em palavra:
        se no.filhos[c] é nulo: no.filhos[c] = Nó()
        no = no.filhos[c]
    no.fim_de_palavra = verdadeiro

função tem_prefixo(raiz, prefixo):
    no = raiz
    para cada caractere c em prefixo:
        se no.filhos[c] é nulo: retorne falso
        no = no.filhos[c]
    retorne verdadeiro
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
