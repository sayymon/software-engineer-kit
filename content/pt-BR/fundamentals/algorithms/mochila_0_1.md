---
id: mochila_0_1
tipo: algoritmo
nome: Problema da mochila 0-1
descricao: Escolhe um subconjunto de itens, cada um usado no máximo uma vez, que maximiza o valor total sem passar da capacidade da mochila. A tabela dp[i][w] guarda o melhor valor com os i primeiros itens e capacidade w.
fonte_ids:
  - clrs
  - mit6006
  - taocp
exemplo: Selecionar quais funcionalidades entram em uma sprint para maximizar valor dentro da capacidade da equipe.
quando_usar:
  - Itens indivisíveis com capacidade inteira moderada
  - Otimização de escolhas sujeitas a um orçamento
quando_evitar:
  - Itens divisíveis (use a mochila fracionária gulosa)
  - Capacidade enorme
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
area: programacao-dinamica
subarea: otimização com capacidade
categoria: programação dinâmica / otimização com capacidade
entrada: n itens com peso e valor inteiros, e capacidade W
saida: Valor máximo e o subconjunto de itens escolhido
complexidade:
  tempoMelhor: O(n * W)
  tempoMedio: O(n * W)
  tempoPior: O(n * W)
  memoria: O(W)
  observacao: "pseudo-polinomial: depende do valor numérico de W; a tabela completa usa O(n * W) para reconstruir a escolha"
preCondicoes:
  - pesos e capacidade inteiros
limitacoes:
  - "pseudo-polinomial: W muito grande inviabiliza a tabela"
  - NP-difícil no caso geral
casosDeUso:
  - Orçamento e alocação de recursos com itens indivisíveis
  - Seleção de investimentos, cargas e funcionalidades
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[tabela_hash|Tabela hash]]"
algoritmosRelacionados:
  - "[[mochila_fracionaria|Mochila fracionária]]"
  - "[[multiplicacao_cadeia_matrizes|Multiplicação de cadeia de matrizes]]"
  - "[[soma_de_subconjuntos|Soma de subconjuntos]]"
  - "[[troco_dp|Troco com menor número de moedas (programação dinâmica)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Capacidade zero ou item mais pesado que a capacidade
    - Itens com peso zero
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Problema da mochila 0-1
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
função mochila(peso, valor, n, W):
    dp[0..W] = 0
    para i de 0 até n-1:
        para w de W até peso[i], passo -1:          // do maior para o menor: cada item entra uma vez
            dp[w] = max(dp[w], dp[w - peso[i]] + valor[i])
    retorne dp[W]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
