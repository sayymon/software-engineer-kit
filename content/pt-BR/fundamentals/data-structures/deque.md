---
id: deque
tipo: estrutura-de-dados
nome: Deque
descricao: "Fila de duas pontas: permite inserir e remover em ambas as extremidades em O(1). Generaliza pilha e fila."
fonte_ids:
  - clrs
  - py_collections
  - java_util
exemplo: Uma janela deslizante de máximos mantém índices em um deque, descartando pelas pontas em O(1) amortizado.
quando_usar:
  - Janelas deslizantes e algoritmos que consomem pelas duas pontas
  - Buffer com histórico limitado (maxlen) dos eventos mais recentes
  - Implementar pilha e fila com uma única estrutura
quando_evitar:
  - Acesso aleatório pelo meio é frequente
  - Apenas uma ponta é usada (pilha ou fila bastam)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: py_collections
    tipo: artigo
    titulo: "Python: collections, tipos de contêiner (documentação oficial)"
    link: https://docs.python.org/3/library/collections.html
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
  - nome: inserir nas pontas
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: remover nas pontas
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: acesso ao meio
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: O(1) apenas nas pontas
memoria: O(n)
propriedades:
  - duas pontas ativas
  - buffer circular ou blocos encadeados
  - versão limitada descarta o elemento da ponta oposta
tradeoffs:
  - "Ganha: flexibilidade com custo O(1) nas pontas; paga: acesso ao meio lento em implementações por blocos"
  - "Ganha: janelas e históricos simples; paga: semântica mais ampla exige disciplina para não misturar usos"
casosDeBorda:
  - Deque vazio ao remover por qualquer ponta
  - Deque limitado cheio descarta pela ponta oposta
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: collections.deque
algoritmosRelacionados:
  - "[[bfs|Busca em largura (BFS)]]"
estruturasRelacionadas:
  - "[[fila|Fila]]"
  - "[[pilha|Pilha]]"
padroes: []
ferramentas: []
casosDeUso:
  - Janela deslizante em fluxos de eventos
  - Histórico recente com tamanho limitado
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Deque
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
função inserir_frente(d, x):
    d.inicio = (d.inicio - 1) mod d.capacidade
    d.dados[d.inicio] = x
    d.tamanho = d.tamanho + 1

função remover_fim(d):
    se d.tamanho == 0: erro "deque vazio"
    d.fim = (d.fim - 1) mod d.capacidade
    d.tamanho = d.tamanho - 1
    retorne d.dados[d.fim]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
