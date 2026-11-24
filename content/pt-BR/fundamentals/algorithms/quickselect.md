---
id: quickselect
tipo: algoritmo
nome: Quickselect
descricao: Encontra o k-ésimo menor elemento particionando como o Quick Sort, mas recursando só no lado que contém a posição k. Custa O(n) em média.
fonte_ids:
  - clrs
  - algs4_sort
  - taocp
exemplo: Calcular a mediana ou o percentil 95 de latências sem ordenar o conjunto inteiro.
quando_usar:
  - Mediana, percentis e top-k
  - Quando a ordenação completa é desnecessária
quando_evitar:
  - Várias consultas de posição sobre os mesmos dados (ordene uma vez)
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
area: divisao-e-conquista
subarea: seleção
categoria: divisão e conquista / seleção
entrada: Array de n elementos e um índice k
saida: O k-ésimo menor elemento
complexidade:
  tempoMelhor: O(n)
  tempoMedio: O(n)
  tempoPior: O(n^2)
  memoria: O(1)
  observacao: pior caso com pivôs ruins; mediana das medianas dá O(n) garantido
preCondicoes:
  - 0 <= k < n
limitacoes:
  - pior caso quadrático com pivôs ruins
  - reordena o array de entrada
casosDeUso:
  - Medianas, percentis e top-k sem ordenação completa
  - Estatísticas rápidas em grandes volumes
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[par_de_pontos_mais_proximo|Par de pontos mais próximo]]"
  - "[[quick_sort|Quick Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - k igual ao primeiro ou último índice
    - Muitos elementos repetidos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Quickselect
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
função quickselect(a, lo, hi, k):
    se lo == hi: retorne a[lo]
    p = particionar(a, lo, hi)
    se k == p: retorne a[p]
    se k < p: retorne quickselect(a, lo, p - 1, k)
    retorne quickselect(a, p + 1, hi, k)
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
