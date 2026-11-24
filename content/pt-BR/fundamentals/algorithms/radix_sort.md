---
id: radix_sort
tipo: algoritmo
nome: Radix Sort
descricao: Ordena números ou strings dígito a dígito, do menos significativo ao mais significativo (LSD), usando uma ordenação estável como Counting Sort em cada passo.
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Ordenar milhões de CEPs ou chaves de tamanho fixo em O(d * (n + b)).
quando_usar:
  - Chaves de tamanho fixo e grande volume
  - Strings de mesmo comprimento (LSD)
quando_evitar:
  - Chaves longas e variáveis em pequeno volume (prefira ordenação por comparação)
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
area: ordenacao
subarea: sem comparação
categoria: ordenação / sem comparação
entrada: Array de n chaves com d dígitos em base b
saida: Array ordenado (estável)
complexidade:
  tempoMelhor: O(d * (n + b))
  tempoMedio: O(d * (n + b))
  tempoPior: O(d * (n + b))
  memoria: O(n + b)
  observacao: d dígitos por chave e base b
preCondicoes:
  - chaves de comprimento fixo (ou preenchidas) e ordenação estável por dígito
limitacoes:
  - eficiente apenas para chaves curtas e discretas
  - usa memória auxiliar proporcional a n
casosDeUso:
  - Chaves inteiras ou strings de tamanho fixo em grande volume
  - Ordenar IPs, CEPs, datas e identificadores
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[trie|Trie]]"
algoritmosRelacionados:
  - "[[counting_sort|Counting Sort]]"
  - "[[quick_sort|Quick Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Chaves com tamanhos variados (preencher ou usar MSD)
    - Números negativos exigem tratamento do sinal
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Radix Sort
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
função radix_sort(a, d, base):
    para posicao de 0 até d-1:                // do dígito menos significativo ao mais
        counting_sort_por_digito(a, posicao, base)    // passo estável
    retorne a
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
