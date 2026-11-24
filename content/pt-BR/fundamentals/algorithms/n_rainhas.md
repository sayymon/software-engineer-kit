---
id: n_rainhas
tipo: algoritmo
nome: N-rainhas
descricao: Posiciona n rainhas em um tabuleiro n x n sem ataques mútuos, colocando uma rainha por linha e voltando atrás quando uma coluna ou diagonal está em conflito.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: "Problema clássico para ensinar poda: abandona um ramo assim que uma restrição é violada."
quando_usar:
  - Problemas com restrições e poda
  - Ensino de backtracking
quando_evitar:
  - Tamanhos grandes (use heurísticas ou solvers de restrições)
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
area: backtracking
subarea: satisfação de restrições
categoria: backtracking / satisfação de restrições
entrada: Inteiro n (tamanho do tabuleiro)
saida: Uma ou todas as configurações válidas
complexidade:
  tempoMelhor: O(n!)
  tempoMedio: O(n!)
  tempoPior: O(n!)
  memoria: O(n)
  observacao: a poda reduz muito o espaço explorado na prática
preCondicoes:
  - nenhuma (n >= 4 tem solução, exceto n = 2 e n = 3)
limitacoes:
  - crescimento fatorial no pior caso
  - n grande pede heurísticas
casosDeUso:
  - Satisfação de restrições e ensino de backtracking
  - Base de solvers de quebra-cabeças
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[pilha|Pilha]]"
algoritmosRelacionados:
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[permutacoes_e_subconjuntos|Permutações e subconjuntos]]"
  - "[[sudoku|Resolvedor de Sudoku]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - n igual a 1 (uma solução) e n igual a 2 ou 3 (sem solução)
    - Contagem de soluções que são simétricas
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# N-rainhas
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
função resolver(linha, n):
    se linha == n: registrar solução ; retorne
    para col de 0 até n-1:
        se seguro(linha, col):                 // coluna e diagonais livres
            colocar rainha em (linha, col)
            resolver(linha + 1, n)
            remover rainha de (linha, col)     // volta atrás
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
