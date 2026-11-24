---
id: exponenciacao_rapida
tipo: algoritmo
nome: Exponenciação rápida
descricao: Calcula a^n com O(log n) multiplicações elevando ao quadrado e usando os bits do expoente (exponenciação binária), inclusive com módulo.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Criptografia RSA calcula potências modulares enormes (a^e mod m) em milissegundos.
quando_usar:
  - Potências grandes e potências modulares
  - Recorrências lineares via matrizes
quando_evitar:
  - Expoentes minúsculos (multiplicação direta)
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
subarea: aritmética
categoria: divisão e conquista / aritmética
entrada: Base a, expoente inteiro n e, opcionalmente, módulo m
saida: a^n (ou a^n mod m)
complexidade:
  tempoMelhor: O(log n)
  tempoMedio: O(log n)
  tempoPior: O(log n)
  memoria: O(1)
  observacao: versão iterativa; a recursiva usa O(log n) de pilha
preCondicoes:
  - expoente inteiro não negativo (expoentes negativos usam o inverso)
limitacoes:
  - o tamanho dos números pode crescer sem módulo
  - overflow em inteiros de largura fixa
casosDeUso:
  - Criptografia e potências modulares
  - Fibonacci por matrizes e recorrências lineares
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[karatsuba|Algoritmo de Karatsuba]]"
  - "[[fibonacci_memoizado|Fibonacci com memoização]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: pow(a, n, m)
  casosDeBorda:
    - Expoente zero (resultado 1)
    - Módulo 1 ou base zero
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Exponenciação rápida
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
função potencia(a, n, m):
    resultado = 1 ; a = a mod m
    enquanto n > 0:
        se n é ímpar: resultado = (resultado * a) mod m
        a = (a * a) mod m
        n = n div 2
    retorne resultado
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
