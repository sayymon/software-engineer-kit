---
id: sudoku
tipo: algoritmo
nome: Resolvedor de Sudoku
descricao: Preenche as células vazias testando dígitos de 1 a 9 que respeitem linha, coluna e bloco, voltando atrás ao encontrar um beco sem saída. Escolher a célula com menos candidatos acelera muito.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Resolver grades de Sudoku e problemas parecidos de alocação com restrições.
quando_usar:
  - Quebra-cabeças com restrições
  - Ensino de poda e heurística de escolha
quando_evitar:
  - Problemas grandes de restrições (use solvers SAT ou CP)
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
entrada: Grade 9 x 9 parcialmente preenchida
saida: Grade completa válida ou indicação de que não há solução
complexidade:
  tempoMelhor: O(9^m)
  tempoMedio: O(9^m)
  tempoPior: O(9^m)
  memoria: O(m)
  observacao: m é o número de células vazias; poda e heurística de menor candidato reduzem o custo real
preCondicoes:
  - grade inicial consistente
limitacoes:
  - pior caso exponencial
  - grades inválidas exigem validação prévia
casosDeUso:
  - Quebra-cabeças e alocações com restrições
  - Introdução a solvers de satisfação de restrições
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[n_rainhas|N-rainhas]]"
  - "[[soma_de_subconjuntos|Soma de subconjuntos]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Grade já completa
    - Grade sem solução ou com mais de uma solução
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Resolvedor de Sudoku
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
função resolver(grade):
    celula = célula vazia com menos candidatos
    se celula não existe: retorne verdadeiro
    para cada d em candidatos(celula):
        grade[celula] = d
        se resolver(grade): retorne verdadeiro
        grade[celula] = vazio                      // volta atrás
    retorne falso
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
