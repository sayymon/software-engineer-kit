---
id: fila
tipo: estrutura-de-dados
nome: Fila
descricao: "Coleção FIFO (primeiro a entrar, primeiro a sair): enfileira no final e desenfileira no início, ambos em O(1)."
fonte_ids:
  - clrs
  - algs4
  - py_collections
exemplo: Uma fila de jobs em segundo plano processa as tarefas na ordem em que chegaram.
quando_usar:
  - Processamento na ordem de chegada (jobs, mensagens, requisições)
  - Busca em largura e simulações de atendimento
  - Desacoplar produtor e consumidor com buffer
quando_evitar:
  - Há prioridades distintas entre os itens (prefira fila de prioridade)
  - É necessário inserir ou remover nas duas pontas (prefira deque)
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
  - id: py_collections
    tipo: artigo
    titulo: "Python: collections, tipos de contêiner (documentação oficial)"
    link: https://docs.python.org/3/library/collections.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: linear
operacoes:
  - nome: enfileirar
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: desenfileirar
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: espiar a frente
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
memoria: O(n)
propriedades:
  - política FIFO
  - implementável com buffer circular ou lista ligada
  - versões limitadas aplicam contrapressão
tradeoffs:
  - "Ganha: justiça na ordem de atendimento e operações O(1); paga: sem acesso ao meio e sem prioridade"
  - "Ganha: desacopla ritmos de produção e consumo; paga: fila ilimitada esconde sobrecarga e consome memória"
casosDeBorda:
  - Desenfileirar de uma fila vazia
  - Buffer circular cheio versus vazio (índices iguais nos dois casos)
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: collections.deque
algoritmosRelacionados:
  - "[[bfs|Busca em largura (BFS)]]"
  - "[[edmonds_karp|Fluxo máximo (Edmonds-Karp)]]"
  - "[[ordenacao_topologica|Ordenação topológica]]"
estruturasRelacionadas:
  - "[[deque|Deque]]"
  - "[[heap|Heap e fila de prioridade]]"
  - "[[lista_ligada|Lista ligada]]"
  - "[[pilha|Pilha]]"
padroes:
  - "[[competing_consumers|Competing Consumers]]"
  - "[[backpressure|Backpressure]]"
ferramentas: []
casosDeUso:
  - Filas de mensagens e jobs
  - Varredura em largura de grafos e árvores
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Fila
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
função enfileirar(q, x):
    q.dados[q.fim] = x
    q.fim = (q.fim + 1) mod q.capacidade
    q.tamanho = q.tamanho + 1

função desenfileirar(q):
    se q.tamanho == 0: erro "fila vazia"
    x = q.dados[q.inicio]
    q.inicio = (q.inicio + 1) mod q.capacidade
    q.tamanho = q.tamanho - 1
    retorne x
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
