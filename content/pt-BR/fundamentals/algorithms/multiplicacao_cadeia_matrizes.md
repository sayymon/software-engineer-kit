---
id: multiplicacao_cadeia_matrizes
tipo: algoritmo
nome: Multiplicação de cadeia de matrizes
descricao: Encontra a ordem de parentização que minimiza o número de multiplicações escalares para multiplicar uma cadeia de matrizes. A tabela dp[i][j] guarda o custo mínimo da subcadeia i..j.
fonte_ids:
  - clrs
  - mit6006
exemplo: Escolher a ordem de junção de tabelas em um otimizador de consultas para minimizar o custo.
quando_usar:
  - Ordem ótima de produtos encadeados
  - Otimizadores de junção em bancos de dados
quando_evitar:
  - Cadeias muito longas (use heurísticas)
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
subarea: parentização ótima
categoria: programação dinâmica / parentização ótima
entrada: Dimensões p[0..n] de n matrizes (matriz i tem p[i-1] x p[i])
saida: Custo mínimo e a parentização ótima
complexidade:
  tempoMelhor: O(n^3)
  tempoMedio: O(n^3)
  tempoPior: O(n^3)
  memoria: O(n^2)
  observacao: tabelas de custo e de pontos de divisão
preCondicoes:
  - dimensões compatíveis entre matrizes vizinhas
limitacoes:
  - cúbico em n
  - resolve a ordem da multiplicação, sem reduzir o custo de cada produto
casosDeUso:
  - Otimização da ordem de multiplicações e junções
  - Exemplo clássico de DP por intervalos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[fibonacci_memoizado|Fibonacci com memoização]]"
  - "[[mochila_0_1|Problema da mochila 0-1]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Uma única matriz (custo zero)
    - Cadeia com duas matrizes (uma única ordem)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Multiplicação de cadeia de matrizes
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
função cadeia(p, n):
    para i de 1 até n: custo[i][i] = 0
    para tamanho de 2 até n:
        para i de 1 até n - tamanho + 1:
            j = i + tamanho - 1 ; custo[i][j] = infinito
            para k de i até j-1:
                c = custo[i][k] + custo[k+1][j] + p[i-1] * p[k] * p[j]
                se c < custo[i][j]: custo[i][j] = c ; corte[i][j] = k
    retorne custo[1][n]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
