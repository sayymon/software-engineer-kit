---
id: pilha
tipo: estrutura-de-dados
nome: Pilha
descricao: Coleção LIFO (último a entrar, primeiro a sair) com operações empilhar, desempilhar e espiar o topo, todas em O(1).
fonte_ids:
  - clrs
  - algs4
  - java_util
exemplo: O botão voltar de um navegador desempilha a última página visitada; o compilador usa pilha para avaliar parênteses.
quando_usar:
  - Desfazer e refazer, retrocesso de navegação
  - Avaliação de expressões e verificação de delimitadores balanceados
  - Percurso em profundidade e backtracking iterativos
quando_evitar:
  - A ordem de atendimento precisa ser FIFO (prefira fila)
  - É necessário acessar elementos que não estão no topo
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4
    tipo: livro
    titulo: Algorithms, 4th Edition (Sedgewick e Wayne), booksite de Princeton
    link: https://algs4.cs.princeton.edu/home/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: java_util
    tipo: artigo
    titulo: "Java SE 21 API: pacote java.util (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: linear
operacoes:
  - nome: empilhar
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: amortizado se baseada em array dinâmico
  - nome: desempilhar
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: espiar o topo
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
memoria: O(n)
propriedades:
  - política LIFO
  - implementável com array dinâmico ou lista ligada
  - pilha de chamadas dos programas segue o mesmo princípio
tradeoffs:
  - "Ganha: operações O(1) e semântica simples; paga: acesso restrito ao topo"
  - "Ganha: ideal para recursão explícita; paga: pilha limitada causa estouro (stack overflow) em recursões profundas"
casosDeBorda:
  - Desempilhar de uma pilha vazia
  - Capacidade máxima atingida em pilha de tamanho fixo
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.ArrayDeque
algoritmosRelacionados:
  - "[[dfs|Busca em profundidade (DFS)]]"
  - "[[tarjan_scc|Componentes fortemente conexos (Tarjan)]]"
  - "[[n_rainhas|N-rainhas]]"
  - "[[ordenacao_topologica|Ordenação topológica]]"
  - "[[permutacoes_e_subconjuntos|Permutações e subconjuntos]]"
estruturasRelacionadas:
  - "[[array_dinamico|Array dinâmico]]"
  - "[[deque|Deque]]"
  - "[[fila|Fila]]"
  - "[[lista_ligada|Lista ligada]]"
padroes:
  - "[[command|Command (GoF)]]"
  - "[[memento|Memento (GoF)]]"
ferramentas: []
casosDeUso:
  - Desfazer e refazer em editores
  - Avaliação de expressões e análise sintática
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Pilha
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
função empilhar(p, x): p.dados[p.topo] = x ; p.topo = p.topo + 1

função desempilhar(p):
    se p.topo == 0: erro "pilha vazia"
    p.topo = p.topo - 1
    retorne p.dados[p.topo]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
