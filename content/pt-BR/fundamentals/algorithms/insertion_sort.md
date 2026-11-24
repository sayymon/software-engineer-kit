---
id: insertion_sort
tipo: algoritmo
nome: Insertion Sort
descricao: Constrói a sequência ordenada um elemento por vez, inserindo cada novo elemento na posição correta entre os já ordenados.
fonte_ids:
  - clrs
  - algs4_sort
  - taocp
exemplo: "Ordenar a mão de cartas: cada carta nova entra no ponto certo entre as que já estão ordenadas."
quando_usar:
  - Entradas pequenas (dezenas de elementos)
  - Dados quase ordenados
quando_evitar:
  - Entradas grandes e desordenadas (prefira Merge Sort, Quick Sort ou Timsort)
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
subarea: comparação simples
categoria: ordenação / comparação simples
entrada: Array de n elementos comparáveis
saida: O mesmo array em ordem crescente (ordenação in-place)
complexidade:
  tempoMelhor: O(n)
  tempoMedio: O(n^2)
  tempoPior: O(n^2)
  memoria: O(1)
  observacao: O(n) no melhor caso (já ordenado); estável e adaptativo
preCondicoes:
  - nenhuma
limitacoes:
  - custo quadrático em entradas grandes e desordenadas
casosDeUso:
  - Ordenar partes pequenas dentro de Quick Sort e Timsort
  - Dados quase ordenados com inserções ocasionais
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[lista_ligada|Lista ligada]]"
algoritmosRelacionados:
  - "[[quick_sort|Quick Sort]]"
  - "[[selection_sort|Selection Sort]]"
  - "[[timsort|Timsort]]"
padroes:
  - "[[strategy|Strategy (GoF)]]"
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Array vazio ou com um elemento
    - Array já ordenado e array em ordem inversa (pior caso)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Insertion Sort
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
função insertion_sort(a):
    para i de 1 até n-1:
        chave = a[i]
        j = i - 1
        enquanto j >= 0 e a[j] > chave:
            a[j+1] = a[j]
            j = j - 1
        a[j+1] = chave
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
