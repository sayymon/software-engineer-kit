---
id: quick_sort
tipo: algoritmo
nome: Quick Sort
descricao: Escolhe um pivô, particiona o array entre menores e maiores que o pivô e ordena as duas partes recursivamente. É muito rápido na prática, com O(n log n) médio.
fonte_ids:
  - clrs
  - algs4_sort
  - taocp
exemplo: "Ordenar registros em memória com poucas cópias: o particionamento troca elementos no próprio array."
quando_usar:
  - Ordenação in-place rápida em média
  - Dados com pivô aleatório para evitar entradas adversárias
quando_evitar:
  - Estabilidade ou pior caso garantido (prefira Merge Sort ou Timsort)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_sort
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 2: Sorting (Princeton)"
    link: https://algs4.cs.princeton.edu/20sorting/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: ordenacao
subarea: divisão e conquista
categoria: ordenação / divisão e conquista
entrada: Array de n elementos comparáveis
saida: O mesmo array em ordem crescente (in-place, instável)
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n^2)
  memoria: O(log n)
  observacao: pior caso com pivôs ruins; pivô aleatório ou mediana de três torna o pior caso improvável
preCondicoes:
  - nenhuma
limitacoes:
  - pior caso O(n^2) com pivô mal escolhido
  - instável
casosDeUso:
  - Ordenação in-place de uso geral com excelente desempenho prático
  - Dados de tipos primitivos em que a estabilidade é irrelevante
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[array_dinamico|Array dinâmico]]"
algoritmosRelacionados:
  - "[[counting_sort|Counting Sort]]"
  - "[[heap_sort|Heap Sort]]"
  - "[[insertion_sort|Insertion Sort]]"
  - "[[merge_sort|Merge Sort]]"
  - "[[quickselect|Quickselect]]"
  - "[[radix_sort|Radix Sort]]"
padroes:
  - "[[strategy|Strategy (GoF)]]"
ferramentas: []
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.Arrays
  casosDeBorda:
    - Muitos elementos iguais (use partição em três vias)
    - Array já ordenado com pivô fixo no primeiro elemento (pior caso)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Quick Sort
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
função quick_sort(a, lo, hi):
    se lo >= hi: retorne
    p = particionar(a, lo, hi)
    quick_sort(a, lo, p - 1) ; quick_sort(a, p + 1, hi)

função particionar(a, lo, hi):
    escolher pivô aleatório e trocar com a[hi]
    pivo = a[hi] ; i = lo
    para j de lo até hi-1:
        se a[j] < pivo: trocar(a[i], a[j]) ; i = i + 1
    trocar(a[i], a[hi])
    retorne i
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
