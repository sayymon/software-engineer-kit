---
id: arvore_de_segmentos
tipo: estrutura-de-dados
nome: Árvore de segmentos
descricao: Árvore binária em que cada nó resume um intervalo do array (soma, mínimo, máximo). Consultas e atualizações por intervalo custam O(log n).
fonte_ids:
  - clrs
  - mit6006
  - taocp
exemplo: Responder a soma de um intervalo e atualizar posições do array em O(log n) em um painel de métricas.
quando_usar:
  - Consultas de intervalo com atualizações intercaladas
  - Mínimo, máximo, soma ou MDC em subintervalos
  - Atualização preguiçosa (lazy) de intervalos inteiros
quando_evitar:
  - Não há atualizações (somas de prefixo ou sparse table respondem mais rápido)
  - Só soma com atualização pontual (a árvore de Fenwick usa menos memória e código)
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
familia: especializada
operacoes:
  - nome: construir
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: ""
  - nome: consulta de intervalo
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: atualização pontual
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: atualização de intervalo (lazy)
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
memoria: O(n)
propriedades:
  - operação associativa sobre o intervalo
  - 4n posições em array na forma recursiva
  - propagação preguiçosa opcional
tradeoffs:
  - "Ganha: consultas e atualizações O(log n) para operações associativas; paga: memória de cerca de 4n e código mais longo"
  - "Ganha: flexível (soma, mínimo, máximo); paga: a operação precisa ser associativa"
casosDeBorda:
  - Consulta com intervalo vazio ou invertido
  - Tamanho do array que não é potência de dois
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[arvore_de_fenwick|Árvore de Fenwick]]"
padroes: []
ferramentas: []
casosDeUso:
  - Métricas por intervalo de tempo
  - Consultas de mínimo e soma em séries
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Árvore de segmentos
<!-- fundamento:gen -->
## 📋 Resumo
`= this.descricao`

Família: `= this.familia`

Exemplo: `= this.exemplo`
## ⏱ Operações e complexidade

Memória: `= this.memoria`
## 🧪 Implementação e testes
- **Linguagem de referência:** `= this.implementacao.linguagemReferencia`
- **Versão:** `= this.implementacao.versao`
- **Biblioteca padrão:** `= this.implementacao.bibliotecaPadrao`
## 🧾 Pseudocódigo das operações-chave
```text
função consultar(no, l, r, ql, qr):
    se qr < l ou r < ql: retorne identidade
    se ql <= l e r <= qr: retorne arvore[no]
    m = (l + r) / 2
    retorne combinar(consultar(2*no, l, m, ql, qr), consultar(2*no+1, m+1, r, ql, qr))
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
