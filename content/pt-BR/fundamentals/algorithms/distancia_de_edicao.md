---
id: distancia_de_edicao
tipo: algoritmo
nome: Distância de edição
descricao: Número mínimo de inserções, remoções e substituições para transformar uma string em outra (distância de Levenshtein), calculado por programação dinâmica.
fonte_ids:
  - clrs
  - mit6006
  - algs4_strings
exemplo: Sugerir correções ortográficas e achar nomes parecidos em cadastros com erros de digitação.
quando_usar:
  - Busca aproximada e correção de digitação
  - Deduplicação de registros
quando_evitar:
  - Textos muito longos sem aproximações ou índices (n-gramas)
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
entrada: Duas strings A (tamanho n) e B (tamanho m)
saida: Número mínimo de operações e a sequência de edições
complexidade:
  tempoMelhor: O(n * m)
  tempoMedio: O(n * m)
  tempoPior: O(n * m)
  memoria: O(n * m)
  observacao: O(min(n, m)) para apenas a distância, guardando duas linhas
preCondicoes:
  - custos de operação definidos (padrão 1 para cada)
limitacoes:
  - "quadrático: lento para textos longos"
  - mede similaridade de caracteres, sem semântica
casosDeUso:
  - Correção ortográfica e busca aproximada
  - Deduplicação de cadastros e alinhamento de textos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[trie|Trie]]"
algoritmosRelacionados:
  - "[[lcs|Subsequência comum mais longa (LCS)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Uma string vazia (distância igual ao tamanho da outra)
    - Strings idênticas (distância zero)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Distância de edição
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
função edicao(A, B):
    para i de 0 até n: dp[i][0] = i
    para j de 0 até m: dp[0][j] = j
    para i de 1 até n:
        para j de 1 até m:
            custo = (A[i-1] == B[j-1]) ? 0 : 1
            dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + custo)
    retorne dp[n][m]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
