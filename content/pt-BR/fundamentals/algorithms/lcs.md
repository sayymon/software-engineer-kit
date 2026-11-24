---
id: lcs
tipo: algoritmo
nome: Subsequência comum mais longa (LCS)
descricao: Encontra a maior subsequência (não necessariamente contígua) comum a duas sequências, com dp[i][j] igual ao LCS dos prefixos de tamanho i e j.
fonte_ids:
  - clrs
  - mit6006
  - algs4_strings
exemplo: Ferramentas de diff comparam duas versões de um arquivo a partir do LCS de suas linhas.
quando_usar:
  - Comparar sequências tolerando lacunas
  - Ferramentas de diff
quando_evitar:
  - Sequências enormes sem otimização de espaço
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
  - id: algs4_strings
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 5: Strings (Princeton)"
    link: https://algs4.cs.princeton.edu/50strings/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: programacao-dinamica
subarea: sequências
categoria: programação dinâmica / sequências
entrada: Duas sequências A (tamanho n) e B (tamanho m)
saida: Comprimento do LCS e uma das subsequências
complexidade:
  tempoMelhor: O(n * m)
  tempoMedio: O(n * m)
  tempoPior: O(n * m)
  memoria: O(n * m)
  observacao: O(min(n, m)) basta para obter apenas o comprimento
preCondicoes:
  - nenhuma
limitacoes:
  - quadrático em tempo e memória para sequências muito longas
  - reconstrução exige guardar a tabela inteira
casosDeUso:
  - Diff de textos e controle de versão
  - Comparação de sequências biológicas e detecção de similaridade
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[distancia_de_edicao|Distância de edição]]"
  - "[[lis|Subsequência crescente mais longa (LIS)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Uma das sequências vazia
    - Sequências idênticas ou sem nenhum elemento em comum
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Subsequência comum mais longa (LCS)
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
função lcs(A, B):
    para i de 0 até n: dp[i][0] = 0
    para j de 0 até m: dp[0][j] = 0
    para i de 1 até n:
        para j de 1 até m:
            se A[i-1] == B[j-1]: dp[i][j] = dp[i-1][j-1] + 1
            senão: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    retorne dp[n][m]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
