---
id: busca_exponencial
tipo: algoritmo
nome: Busca exponencial
descricao: Dobra o limite superior (1, 2, 4, 8, ...) até ultrapassar o alvo e então aplica busca binária no último intervalo. Atende vetores de tamanho desconhecido ou ilimitado.
fonte_ids:
  - clrs
  - algs4_search
  - mit6006
exemplo: Procurar o ponto de virada em uma sequência ilimitada, como achar o primeiro mês em que o custo ultrapassa um orçamento.
quando_usar:
  - Tamanho da sequência desconhecido
  - Alvo provável perto do início
quando_evitar:
  - Tamanho conhecido e alvo uniformemente espalhado (busca binária direta basta)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_search
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 3: Searching (Princeton)"
    link: https://algs4.cs.princeton.edu/30searching/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: busca
subarea: em sequência ordenada
categoria: busca / em sequência ordenada
entrada: Sequência ordenada (possivelmente de tamanho desconhecido) e um alvo
saida: Posição do valor ou ausente
complexidade:
  tempoMelhor: O(1)
  tempoMedio: O(log p)
  tempoPior: O(log p)
  memoria: O(1)
  observacao: p é a posição do alvo; vence a busca binária quando o alvo está perto do início
preCondicoes:
  - sequência ordenada com acesso por índice
limitacoes:
  - precisa de acesso aleatório
  - equivale à busca binária quando o alvo está longe do início
casosDeUso:
  - Sequências sem tamanho conhecido ou infinitas
  - Alvos concentrados no início da sequência
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
  - "[[busca_por_interpolacao|Busca por interpolação]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Alvo na posição 0
    - Limite que ultrapassa o tamanho real (limitar a n-1)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca exponencial
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
função busca_exponencial(a, alvo):
    se a[0] == alvo: retorne 0
    limite = 1
    enquanto limite < n e a[limite] < alvo: limite = limite * 2
    retorne busca_binaria(a, alvo, limite / 2, min(limite, n - 1))
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
