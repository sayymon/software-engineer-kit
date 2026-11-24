---
id: permutacoes_e_subconjuntos
tipo: algoritmo
nome: Permutações e subconjuntos
descricao: Gera todas as permutações (n!) ou todos os subconjuntos (2^n) de um conjunto escolhendo, para cada posição ou elemento, uma opção e desfazendo a escolha.
fonte_ids:
  - clrs
  - taocp
  - mit6006
exemplo: Testar todas as combinações de parâmetros de uma configuração para achar a melhor (grid search) em espaços pequenos.
quando_usar:
  - Enumeração completa em espaços pequenos
  - Base para backtracking com poda
quando_evitar:
  - Espaços grandes sem poda
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
subarea: enumeração
categoria: backtracking / enumeração
entrada: Conjunto de n elementos
saida: Todas as permutações ou todos os subconjuntos
complexidade:
  tempoMelhor: O(2^n)
  tempoMedio: O(2^n)
  tempoPior: O(2^n)
  memoria: O(n)
  observacao: "subconjuntos: O(2^n); permutações: O(n!) para n! resultados"
preCondicoes:
  - n pequeno (a saída cresce exponencialmente ou fatorialmente)
limitacoes:
  - inviável para n acima de cerca de 20 em subconjuntos e 10 em permutações
casosDeUso:
  - Testes combinatórios e enumeração de configurações
  - Base de soluções de busca exaustiva com poda
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[pilha|Pilha]]"
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
    - "Conjunto vazio (um subconjunto: o vazio)"
    - Elementos repetidos produzem resultados duplicados (use ordenação e pulo)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Permutações e subconjuntos
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
função subconjuntos(i, atual, a):
    se i == n: registrar copia(atual) ; retorne
    subconjuntos(i + 1, atual, a)                 // sem o elemento i
    anexar a[i] em atual
    subconjuntos(i + 1, atual, a)                 // com o elemento i
    remover último de atual                      // volta atrás
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
