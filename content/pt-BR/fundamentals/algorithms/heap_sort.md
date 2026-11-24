---
id: heap_sort
tipo: algoritmo
nome: Heap Sort
descricao: Transforma o array em um max-heap e extrai repetidamente o maior elemento para o final. Mantém O(n log n) no pior caso com O(1) de memória auxiliar.
fonte_ids:
  - clrs
  - algs4_sort
  - py_heapq
exemplo: Ordenar em ambientes embarcados com memória mínima e pior caso previsível.
quando_usar:
  - Memória auxiliar mínima com pior caso garantido
  - Fallback quando o Quick Sort degenera (introsort)
quando_evitar:
  - Estabilidade é requisito
  - Entradas grandes em que a localidade de cache decide o tempo
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
  - id: py_heapq
    tipo: artigo
    titulo: "Python: heapq, algoritmo de fila de heap (documentação oficial)"
    link: https://docs.python.org/3/library/heapq.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: ordenacao
subarea: baseada em heap
categoria: ordenação / baseada em heap
entrada: Array de n elementos comparáveis
saida: O mesmo array em ordem crescente (in-place, instável)
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(1)
  observacao: instável; pior localidade de cache que Quick Sort
preCondicoes:
  - nenhuma
limitacoes:
  - instável
  - constante maior na prática por causa dos acessos espalhados à memória
casosDeUso:
  - Pior caso O(n log n) com memória O(1)
  - Base para a fila de prioridade e para fallback do introsort
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[merge_sort|Merge Sort]]"
  - "[[quick_sort|Quick Sort]]"
  - "[[selection_sort|Selection Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Array com um elemento
    - Elementos iguais (a ordem relativa muda)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Heap Sort
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
função heap_sort(a):
    construir_max_heap(a)                 // O(n)
    para fim de n-1 até 1, passo -1:
        trocar(a[0], a[fim])
        afundar(a, 0, fim)                // restaura o heap no trecho [0, fim)
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
