---
id: lis
tipo: algoritmo
nome: Subsequência crescente mais longa (LIS)
descricao: Encontra a maior subsequência estritamente crescente de uma sequência. A versão clássica custa O(n^2); com busca binária sobre as caudas mínimas chega a O(n log n).
fonte_ids:
  - clrs
  - mit6006
  - algs4_search
exemplo: Achar a maior sequência de entregas com prazos crescentes sem reordenar a lista original.
quando_usar:
  - Maior ordenação crescente preservando a ordem original
  - Problemas de empilhamento e encadeamento
quando_evitar:
  - Subsequência contígua (use varredura simples)
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
  - id: algs4_search
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 3: Searching (Princeton)"
    link: https://algs4.cs.princeton.edu/30searching/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: programacao-dinamica
subarea: sequências
categoria: programação dinâmica / sequências
entrada: Sequência de n números
saida: Comprimento da LIS e uma subsequência que a realiza
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(n)
  observacao: versão O(n^2) usa dp[i]; a de O(n log n) mantém o vetor de caudas
preCondicoes:
  - elementos comparáveis
limitacoes:
  - a versão O(n log n) exige reconstrução adicional para recuperar a subsequência
casosDeUso:
  - Empilhamento de caixas, envelopes e tarefas ordenadas
  - Análise de tendências em séries
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
  - "[[lcs|Subsequência comum mais longa (LCS)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Sequência vazia (LIS 0) ou toda decrescente (LIS 1)
    - Elementos repetidos (decida entre crescente estrita ou não)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Subsequência crescente mais longa (LIS)
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
função lis(a):
    caudas = []                                // caudas[k] = menor final de uma subsequência de tamanho k+1
    para cada x em a:
        pos = primeira posição em caudas com valor >= x       // busca binária
        se pos == tamanho(caudas): anexar x em caudas
        senão: caudas[pos] = x
    retorne tamanho(caudas)
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
