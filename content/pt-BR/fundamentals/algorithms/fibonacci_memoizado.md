---
id: fibonacci_memoizado
tipo: algoritmo
nome: Fibonacci com memoização
descricao: Calcula F(n) guardando em cache os resultados já obtidos, transformando a recursão exponencial O(2^n) em tempo linear.
fonte_ids:
  - clrs
  - mit6006
exemplo: "Exemplo canônico de subproblemas sobrepostos: cache de resultados intermediários reduz o custo drasticamente."
quando_usar:
  - Subproblemas repetidos em recursões
  - Ensino de programação dinâmica
quando_evitar:
  - Cálculo isolado de um valor grande (use exponenciação de matrizes ou fórmula rápida)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: programacao-dinamica
subarea: memoização
categoria: programação dinâmica / memoização
entrada: Inteiro n
saida: F(n)
complexidade:
  tempoMelhor: O(n)
  tempoMedio: O(n)
  tempoPior: O(n)
  memoria: O(n)
  observacao: a versão iterativa guarda apenas os dois últimos valores e usa O(1)
preCondicoes:
  - n inteiro não negativo
limitacoes:
  - recursão profunda para n grande (prefira a versão iterativa)
  - números crescem rápido e exigem inteiros grandes
casosDeUso:
  - Introdução à programação dinâmica e à memoização
  - Qualquer recursão com subproblemas repetidos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[tabela_hash|Tabela hash]]"
algoritmosRelacionados:
  - "[[exponenciacao_rapida|Exponenciação rápida]]"
  - "[[multiplicacao_cadeia_matrizes|Multiplicação de cadeia de matrizes]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: functools.lru_cache
  casosDeBorda:
    - n igual a 0 ou 1 (casos base)
    - Overflow de inteiro para n grande
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Fibonacci com memoização
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
função fib(n, memo):
    se n <= 1: retorne n
    se n em memo: retorne memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    retorne memo[n]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
