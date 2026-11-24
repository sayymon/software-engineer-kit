---
id: merge_sort
tipo: algoritmo
nome: Merge Sort
descricao: Divide o array ao meio, ordena cada metade recursivamente e intercala as duas metades ordenadas. Garante O(n log n) em todos os casos.
fonte_ids:
  - clrs
  - algs4_sort
  - taocp
exemplo: Ordenar um arquivo gigante em blocos que cabem na memória e intercalar os blocos ordenados (ordenação externa).
quando_usar:
  - Estabilidade e pior caso garantido
  - Dados em disco ou listas ligadas
quando_evitar:
  - Memória muito limitada em arrays (prefira Heap Sort)
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
saida: Array ordenado (estável)
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(n)
  observacao: estável; a intercalação usa buffer auxiliar de tamanho n
preCondicoes:
  - nenhuma
limitacoes:
  - memória auxiliar O(n) em arrays
  - constante maior que a do Quick Sort em memória
casosDeUso:
  - Ordenação estável com pior caso garantido
  - Ordenação externa e listas ligadas (a intercalação é O(1) de espaço em listas)
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[lista_ligada|Lista ligada]]"
algoritmosRelacionados:
  - "[[karatsuba|Algoritmo de Karatsuba]]"
  - "[[heap_sort|Heap Sort]]"
  - "[[par_de_pontos_mais_proximo|Par de pontos mais próximo]]"
  - "[[quick_sort|Quick Sort]]"
  - "[[timsort|Timsort]]"
padroes:
  - "[[competing_consumers|Competing Consumers]]"
ferramentas: []
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.Arrays
  casosDeBorda:
    - Array com número ímpar de elementos
    - Elementos iguais (a intercalação preserva a ordem original)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Merge Sort
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
função merge_sort(a, lo, hi):
    se hi - lo <= 1: retorne
    meio = (lo + hi) / 2
    merge_sort(a, lo, meio) ; merge_sort(a, meio, hi)
    intercalar(a, lo, meio, hi)

função intercalar(a, lo, meio, hi):
    copiar a[lo..hi) para aux
    i = lo ; j = meio
    para k de lo até hi-1:
        se i == meio: a[k] = aux[j] ; j = j + 1
        senão se j == hi ou aux[i] <= aux[j]: a[k] = aux[i] ; i = i + 1
        senão: a[k] = aux[j] ; j = j + 1
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
