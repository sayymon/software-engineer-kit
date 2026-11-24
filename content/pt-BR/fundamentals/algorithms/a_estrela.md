---
id: a_estrela
tipo: algoritmo
nome: Algoritmo A estrela
descricao: Variante do Dijkstra que prioriza vértices por custo acumulado mais uma heurística da distância restante até o destino, explorando menos vértices.
fonte_ids:
  - clrs
  - algs4_graphs
  - mit6006
exemplo: "Navegação em jogos e mapas: encontrar o caminho mais curto até um destino guiado pela distância em linha reta."
quando_usar:
  - Destino único com heurística confiável
  - Pathfinding em mapas e jogos
quando_evitar:
  - Várias origens ou destinos sem heurística útil (use Dijkstra)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_graphs
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 4: Graphs (Princeton)"
    link: https://algs4.cs.princeton.edu/40graphs/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: grafos
subarea: caminho mínimo com heurística
categoria: grafos / caminho mínimo com heurística
entrada: Grafo ponderado, origem, destino e função heurística
saida: Caminho de menor custo da origem ao destino
complexidade:
  tempoMelhor: O(E)
  tempoMedio: O(b^d)
  tempoPior: O(b^d)
  memoria: O(b^d)
  observacao: depende da qualidade da heurística; b é o fator de ramificação e d a profundidade da solução
preCondicoes:
  - pesos não negativos
  - heurística admissível (nunca superestima o custo restante)
limitacoes:
  - "memória elevada: guarda a fronteira inteira"
  - heurística ruim reduz A* a Dijkstra
casosDeUso:
  - Pathfinding em jogos, robótica e mapas
  - Busca de soluções em espaços de estados com heurística
casosDeUsoKit: []
estruturasDeDados:
  - "[[grafo|Grafo]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[dijkstra|Algoritmo de Dijkstra]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Destino inalcançável (fronteira esvazia)
    - Heurística inadmissível pode devolver caminho não ótimo
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo A estrela
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
função a_estrela(g, origem, destino, h):
    custo[origem] = 0 ; fronteira = [(h(origem), origem)]
    enquanto fronteira não está vazia:
        (_, u) = extrair_minimo(fronteira)
        se u == destino: retorne reconstruir_caminho(pai, u)
        para cada (v, peso) em g.adj[u]:
            novo = custo[u] + peso
            se novo < custo[v]: custo[v] = novo ; pai[v] = u ; inserir(fronteira, (novo + h(v), v))
    retorne "sem caminho"
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
