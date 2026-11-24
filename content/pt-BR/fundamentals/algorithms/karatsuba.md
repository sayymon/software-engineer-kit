---
id: karatsuba
tipo: algoritmo
nome: Algoritmo de Karatsuba
descricao: Multiplica inteiros grandes com três multiplicações recursivas de metade do tamanho em vez de quatro, chegando a O(n^1.585) em vez de O(n^2).
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Bibliotecas de inteiros grandes (criptografia, aritmética de precisão arbitrária) usam Karatsuba acima de um limiar de tamanho.
quando_usar:
  - Inteiros grandes acima de um limiar
  - Multiplicação de polinômios
quando_evitar:
  - Operandos pequenos (multiplicação direta)
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
area: divisao-e-conquista
subarea: multiplicação
categoria: divisão e conquista / multiplicação
entrada: Dois inteiros de n dígitos
saida: O produto dos inteiros
complexidade:
  tempoMelhor: O(n^1.585)
  tempoMedio: O(n^1.585)
  tempoPior: O(n^1.585)
  memoria: O(n)
  observacao: a recursão usa memória proporcional ao tamanho dos operandos
preCondicoes:
  - operandos grandes (acima de um limiar prático)
limitacoes:
  - para operandos pequenos o método escolar é mais rápido
  - FFT supera Karatsuba em tamanhos enormes
casosDeUso:
  - Aritmética de inteiros grandes (BigInteger)
  - Multiplicação de polinômios de grau moderado
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[exponenciacao_rapida|Exponenciação rápida]]"
  - "[[merge_sort|Merge Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.math.BigInteger
  casosDeBorda:
    - Operandos de tamanhos diferentes (complete com zeros)
    - Operando zero
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo de Karatsuba
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
função karatsuba(x, y):
    se x e y são pequenos: retorne x * y
    m = metade do número de dígitos
    (a, b) = dividir(x, m) ; (c, d) = dividir(y, m)
    ac = karatsuba(a, c) ; bd = karatsuba(b, d)
    abcd = karatsuba(a + b, c + d) - ac - bd
    retorne ac * base^(2m) + abcd * base^m + bd
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
