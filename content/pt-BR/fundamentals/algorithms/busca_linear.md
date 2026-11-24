---
id: busca_linear
tipo: algoritmo
nome: Busca linear
descricao: Percorre os elementos em ordem até encontrar o valor procurado ou chegar ao fim.
fonte_ids:
  - clrs
  - algs4_search
  - mit6006
exemplo: Procurar um e-mail em uma lista curta e desordenada de contatos.
quando_usar:
  - Sequências pequenas ou desordenadas
  - Uma única busca sobre dados que mudam a todo instante
quando_evitar:
  - Muitas buscas sobre dados grandes (ordene e use busca binária, ou use tabela hash)
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
subarea: sequencial
categoria: busca / sequencial
entrada: Sequência de n elementos e um valor alvo
saida: Posição do valor ou ausente
complexidade:
  tempoMelhor: O(1)
  tempoMedio: O(n)
  tempoPior: O(n)
  memoria: O(1)
  observacao: no melhor caso o alvo é o primeiro elemento
preCondicoes:
  - nenhuma
limitacoes:
  - tempo linear em entradas grandes
casosDeUso:
  - Dados pequenos ou sem ordem
  - Busca única em sequência que não vale ordenar
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[lista_ligada|Lista ligada]]"
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Sequência vazia
    - Valor ausente (percorre tudo) e valores repetidos (retorna a primeira ocorrência)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca linear
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
função busca_linear(a, alvo):
    para i de 0 até n-1:
        se a[i] == alvo: retorne i
    retorne ausente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
