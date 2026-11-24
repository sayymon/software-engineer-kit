---
id: arvore_de_fenwick
tipo: estrutura-de-dados
nome: Árvore de Fenwick
descricao: "Também chamada de Binary Indexed Tree: array compacto que guarda somas parciais e permite soma de prefixo e atualização pontual em O(log n) com poucas linhas de código."
fonte_ids:
  - clrs
  - mit6006
  - taocp
exemplo: Contar quantos eventos ocorreram até o instante t e registrar novos eventos, ambos em O(log n).
quando_usar:
  - Somas de prefixo com atualizações pontuais
  - Contagem de inversões e ranking dinâmico
  - Substituir a árvore de segmentos quando só há soma
quando_evitar:
  - A operação não é invertível (mínimo e máximo pedem árvore de segmentos)
  - Atualizações de intervalo complexas
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
    pior: O(n log n)
    observacao: O(n) com construção linear
  - nome: soma de prefixo
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: atualização pontual
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: soma de intervalo
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: diferença de dois prefixos
memoria: O(n)
propriedades:
  - índice com base 1
  - cada posição cobre um bloco definido pelo bit menos significativo
  - só operações com inverso, como a soma
tradeoffs:
  - "Ganha: código curto e memória O(n) enxuta; paga: restrito a operações invertíveis como soma"
  - "Ganha: constante pequena; paga: lógica de bits menos intuitiva que a árvore de segmentos"
casosDeBorda:
  - Índice zero (a estrutura usa base 1)
  - Atualizações que estouram o tipo inteiro acumulado
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[arvore_de_segmentos|Árvore de segmentos]]"
padroes: []
ferramentas: []
casosDeUso:
  - Contadores acumulados por posição
  - Contagem de inversões em sequências
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Árvore de Fenwick
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
função atualizar(i, delta):
    enquanto i <= n:
        fen[i] = fen[i] + delta
        i = i + (i AND -i)          // soma o bit menos significativo

função prefixo(i):
    s = 0
    enquanto i > 0:
        s = s + fen[i]
        i = i - (i AND -i)
    retorne s
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
