---
id: bloom_filter
tipo: estrutura-de-dados
nome: Bloom filter
descricao: Estrutura probabilística que responde se um elemento está presente com a garantia de zero falso negativo e uma taxa controlável de falsos positivos, usando um vetor de bits e k funções de hash.
fonte_ids:
  - clrs
  - algs4
  - taocp
exemplo: Bancos de dados consultam um Bloom filter antes de ir ao disco para descartar chaves ausentes sem ler a página.
quando_usar:
  - Descartar rapidamente chaves que certamente estão ausentes antes de uma consulta cara
  - Deduplicação aproximada em fluxos grandes
  - Caches e crawlers que testam pertencimento a conjuntos enormes
quando_evitar:
  - Falso positivo é inaceitável (o teste de pertencimento exato é necessário)
  - Remoção de elementos é necessária (prefira Counting Bloom filter ou cuckoo filter)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4
    tipo: livro
    titulo: Algorithms, 4th Edition (Sedgewick e Wayne), booksite de Princeton
    link: https://algs4.cs.princeton.edu/home/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: especializada
operacoes:
  - nome: inserir
    melhor: O(k)
    medio: O(k)
    pior: O(k)
    observacao: k é o número de funções de hash
  - nome: testar pertencimento
    melhor: O(k)
    medio: O(k)
    pior: O(k)
    observacao: pode errar apenas para mais
  - nome: remover
    melhor: O(k)
    medio: O(k)
    pior: O(k)
    observacao: exige variante com contadores
memoria: O(m)
propriedades:
  - m bits e k funções de hash
  - sem falso negativo
  - taxa de falso positivo cresce com a ocupação
tradeoffs:
  - "Ganha: espaço muito menor que um conjunto exato; paga: falsos positivos e impossibilidade de remover na versão básica"
  - "Ganha: teste em O(k) independente de n; paga: dimensionar m e k exige estimar o volume final"
casosDeBorda:
  - Filtro saturado (quase todos os bits em 1)
  - Funções de hash correlacionadas
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[tabela_hash|Tabela hash]]"
padroes:
  - "[[cache_aside|Cache-aside]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
ferramentas:
  - "[[redis|Redis (ferramenta)]]"
casosDeUso:
  - Filtro de chaves ausentes antes de consultas em disco
  - Deduplicação aproximada de eventos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Bloom filter
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
função inserir(bf, x):
    para i de 1 até k: bf.bits[hash_i(x) mod m] = 1

função pode_conter(bf, x):
    para i de 1 até k:
        se bf.bits[hash_i(x) mod m] == 0: retorne falso     // certamente ausente
    retorne verdadeiro                                      // possivelmente presente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
