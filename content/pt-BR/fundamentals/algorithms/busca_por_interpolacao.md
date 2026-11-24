---
id: busca_por_interpolacao
tipo: algoritmo
nome: Busca por interpolação
descricao: Variação da busca binária que estima a posição do alvo pela proporção do valor no intervalo, como quem procura uma palavra no dicionário.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Procurar um registro por data em um arquivo de log uniformemente distribuído no tempo.
quando_usar:
  - Dados numéricos ordenados e uniformes em grande volume
  - Dados em memória externa onde cada acesso é caro
quando_evitar:
  - Distribuição enviesada ou chaves não numéricas (prefira busca binária)
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
area: busca
subarea: em sequência ordenada
categoria: busca / em sequência ordenada
entrada: Vetor ordenado de números distribuídos de forma aproximadamente uniforme e um alvo
saida: Posição do valor ou ausente
complexidade:
  tempoMelhor: O(1)
  tempoMedio: O(log log n)
  tempoPior: O(n)
  memoria: O(1)
  observacao: O(log log n) em média com distribuição uniforme; O(n) em distribuições muito enviesadas
preCondicoes:
  - vetor ordenado
  - valores numéricos com distribuição aproximadamente uniforme
limitacoes:
  - degrada para O(n) em distribuições enviesadas
  - restrita a chaves numéricas
casosDeUso:
  - Grandes tabelas ordenadas de números uniformes
  - Índices de séries temporais regulares
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
  - "[[busca_exponencial|Busca exponencial]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Todos os valores iguais (divisão por zero na estimativa)
    - Alvo fora do intervalo [a[lo], a[hi]]
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca por interpolação
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
função busca_interpolacao(a, alvo):
    lo = 0 ; hi = n - 1
    enquanto lo <= hi e a[lo] <= alvo e alvo <= a[hi]:
        se a[hi] == a[lo]: sair do laço
        pos = lo + (alvo - a[lo]) * (hi - lo) / (a[hi] - a[lo])
        se a[pos] == alvo: retorne pos
        se a[pos] < alvo: lo = pos + 1
        senão: hi = pos - 1
    retorne (a[lo] == alvo) ? lo : ausente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
