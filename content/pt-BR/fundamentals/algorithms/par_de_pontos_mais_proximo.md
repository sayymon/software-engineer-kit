---
id: par_de_pontos_mais_proximo
tipo: algoritmo
nome: Par de pontos mais próximo
descricao: "Encontra o par de pontos do plano com a menor distância em O(n log n): divide os pontos ao meio, resolve cada lado e examina a faixa central."
fonte_ids:
  - clrs
  - mit6006
  - taocp
exemplo: Detectar dois veículos em risco de colisão entre milhares de posições em um mapa.
quando_usar:
  - Muitos pontos no plano
  - Geometria computacional
quando_evitar:
  - Poucos pontos (força bruta basta)
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
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: divisao-e-conquista
subarea: geometria computacional
categoria: divisão e conquista / geometria computacional
entrada: n pontos no plano
saida: Par de pontos com a menor distância euclidiana
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(n)
  observacao: ordenação prévia por x e intercalação por y
preCondicoes:
  - pelo menos dois pontos
limitacoes:
  - a faixa central exige cuidado com a ordenação por y
  - força bruta O(n^2) vence em poucos pontos
casosDeUso:
  - Geometria computacional, GIS e detecção de colisões
  - Agrupamento de pontos próximos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[merge_sort|Merge Sort]]"
  - "[[quickselect|Quickselect]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Pontos duplicados (distância zero)
    - Pontos colineares ou na mesma abscissa
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Par de pontos mais próximo
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
função mais_proximo(P):                         // P ordenado por x
    se tamanho(P) <= 3: retorne força_bruta(P)
    meio = tamanho(P) / 2 ; xm = P[meio].x
    d = min(mais_proximo(P[0..meio)), mais_proximo(P[meio..]))
    faixa = pontos com |x - xm| < d, ordenados por y
    para cada ponto na faixa: comparar com os próximos 7 pontos da faixa e atualizar d
    retorne d
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
