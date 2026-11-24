---
id: array
tipo: estrutura-de-dados
nome: Array
descricao: Bloco contíguo de memória com elementos do mesmo tipo, acessados por índice em tempo constante. É a base sobre a qual quase todas as outras estruturas lineares são construídas.
fonte_ids:
  - clrs
  - algs4
  - java_util
exemplo: Um vetor de 1 milhão de inteiros lido por índice em O(1), com boa localidade de cache ao percorrer em ordem.
quando_usar:
  - Acesso por posição é a operação dominante
  - O tamanho é conhecido ou limitado de antemão
  - Percursos sequenciais em grandes volumes aproveitam a cache da CPU
quando_evitar:
  - Inserções e remoções frequentes no meio, que deslocam elementos
  - O tamanho varia muito e imprevisivelmente (prefira array dinâmico)
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
  - id: java_util
    tipo: artigo
    titulo: "Java SE 21 API: pacote java.util (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: linear
operacoes:
  - nome: acesso por índice
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: busca por valor
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: O(log n) quando ordenado, com busca binária
  - nome: inserção no meio
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: desloca os elementos à direita
  - nome: remoção no meio
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: desloca os elementos à direita
memoria: O(n)
propriedades:
  - tamanho fixo na criação
  - memória contígua
  - acesso aleatório em tempo constante
tradeoffs:
  - "Ganha: acesso O(1) e localidade de cache; paga: tamanho fixo e deslocamentos nas inserções no meio"
  - "Ganha: sobrecarga mínima por elemento; paga: realocar exige copiar tudo para um novo bloco"
casosDeBorda:
  - Índice fora do intervalo [0, n)
  - Array vazio e array com um único elemento
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.Arrays
algoritmosRelacionados:
  - "[[floyd_warshall|Algoritmo de Floyd-Warshall]]"
  - "[[karatsuba|Algoritmo de Karatsuba]]"
  - "[[kmp|Algoritmo KMP]]"
  - "[[algoritmo_z|Algoritmo Z]]"
  - "[[boyer_moore_horspool|Boyer-Moore-Horspool]]"
  - "[[busca_binaria|Busca binária]]"
  - "[[busca_exponencial|Busca exponencial]]"
  - "[[busca_linear|Busca linear]]"
  - "[[busca_por_interpolacao|Busca por interpolação]]"
  - "[[huffman|Codificação de Huffman]]"
  - "[[counting_sort|Counting Sort]]"
  - "[[distancia_de_edicao|Distância de edição]]"
  - "[[exponenciacao_rapida|Exponenciação rápida]]"
  - "[[fibonacci_memoizado|Fibonacci com memoização]]"
  - "[[heap_sort|Heap Sort]]"
  - "[[insertion_sort|Insertion Sort]]"
  - "[[merge_sort|Merge Sort]]"
  - "[[mochila_fracionaria|Mochila fracionária]]"
  - "[[multiplicacao_cadeia_matrizes|Multiplicação de cadeia de matrizes]]"
  - "[[n_rainhas|N-rainhas]]"
  - "[[par_de_pontos_mais_proximo|Par de pontos mais próximo]]"
  - "[[permutacoes_e_subconjuntos|Permutações e subconjuntos]]"
  - "[[mochila_0_1|Problema da mochila 0-1]]"
  - "[[quick_sort|Quick Sort]]"
  - "[[quickselect|Quickselect]]"
  - "[[rabin_karp|Rabin-Karp]]"
  - "[[radix_sort|Radix Sort]]"
  - "[[sudoku|Resolvedor de Sudoku]]"
  - "[[selecao_de_atividades|Seleção de atividades]]"
  - "[[selection_sort|Selection Sort]]"
  - "[[soma_de_subconjuntos|Soma de subconjuntos]]"
  - "[[lcs|Subsequência comum mais longa (LCS)]]"
  - "[[lis|Subsequência crescente mais longa (LIS)]]"
  - "[[timsort|Timsort]]"
  - "[[troco_dp|Troco com menor número de moedas (programação dinâmica)]]"
  - "[[troco_guloso|Troco guloso]]"
estruturasRelacionadas:
  - "[[array_dinamico|Array dinâmico]]"
  - "[[arvore_de_fenwick|Árvore de Fenwick]]"
  - "[[arvore_de_segmentos|Árvore de segmentos]]"
  - "[[bloom_filter|Bloom filter]]"
  - "[[grafo|Grafo]]"
  - "[[heap|Heap e fila de prioridade]]"
  - "[[lista_ligada|Lista ligada]]"
  - "[[union_find|Union-Find]]"
padroes:
  - "[[iterator|Iterator (GoF)]]"
ferramentas: []
casosDeUso:
  - Buffers de bytes e imagens
  - Tabelas de lookup e matrizes numéricas
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Array
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
função obter(a, i):
    se i < 0 ou i >= tamanho(a): erro "índice fora do intervalo"
    retorne a[i]

função inserir_em(a, i, valor):          // exige espaço livre no final
    para j de n-1 até i, passo -1: a[j+1] = a[j]
    a[i] = valor
    n = n + 1
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
