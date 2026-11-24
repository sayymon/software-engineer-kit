---
id: soma_de_subconjuntos
tipo: algoritmo
nome: Soma de subconjuntos
descricao: Decide se existe um subconjunto de números cuja soma é o alvo, explorando incluir ou excluir cada elemento e podando ramos cuja soma já passou do alvo.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Verificar se algum conjunto de notas fiscais fecha exatamente um valor de pagamento.
quando_usar:
  - Poucos números e alvo exato
  - Introdução a problemas NP-completos
quando_evitar:
  - Alvos grandes com muitos números (use programação dinâmica)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: backtracking
subarea: enumeração
categoria: backtracking / enumeração
entrada: Conjunto de n inteiros positivos e um alvo S
saida: Subconjunto com soma S ou ausente
complexidade:
  tempoMelhor: O(2^n)
  tempoMedio: O(2^n)
  tempoPior: O(2^n)
  memoria: O(n)
  observacao: a poda por soma parcial e a ordenação reduzem a prática; DP resolve em O(n * S)
preCondicoes:
  - números não negativos para a poda por soma parcial
limitacoes:
  - exponencial no pior caso
  - alvos grandes com poucos números favorecem DP pseudo-polinomial
casosDeUso:
  - Conciliação de valores e problemas de partição
  - Base do estudo de problemas NP-completos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[permutacoes_e_subconjuntos|Permutações e subconjuntos]]"
  - "[[mochila_0_1|Problema da mochila 0-1]]"
  - "[[sudoku|Resolvedor de Sudoku]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Alvo zero (subconjunto vazio)
    - Alvo maior que a soma de todos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Soma de subconjuntos
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
função existe(i, restante, a):
    se restante == 0: retorne verdadeiro
    se i == n ou restante < 0: retorne falso
    se existe(i + 1, restante - a[i], a): retorne verdadeiro     // inclui a[i]
    retorne existe(i + 1, restante, a)                           // exclui a[i]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
