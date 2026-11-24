---
id: heap
tipo: estrutura-de-dados
nome: Heap e fila de prioridade
descricao: "Árvore binária completa guardada em array em que cada pai respeita a ordem em relação aos filhos (min-heap ou max-heap). Implementa a fila de prioridade: o menor (ou maior) elemento sai em O(log n)."
fonte_ids:
  - clrs
  - algs4_sort
  - py_heapq
  - java_pq
exemplo: PriorityQueue em Java e heapq em Python entregam sempre a tarefa de maior prioridade em O(log n).
quando_usar:
  - Escalonamento por prioridade e agendamento por tempo
  - Extrair os k maiores ou menores de um fluxo
  - Algoritmos em grafos como Dijkstra e Prim
quando_evitar:
  - É necessário buscar um elemento arbitrário ou percorrer em ordem
  - Atualizações frequentes de prioridade sem suporte a decrease-key
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_sort
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 2: Sorting (Princeton)"
    link: https://algs4.cs.princeton.edu/20sorting/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: py_heapq
    tipo: artigo
    titulo: "Python: heapq, algoritmo de fila de heap (documentação oficial)"
    link: https://docs.python.org/3/library/heapq.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: java_pq
    tipo: artigo
    titulo: "Java SE 21 API: PriorityQueue (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: arvore
operacoes:
  - nome: espiar o mínimo
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: inserir
    melhor: O(1)
    medio: O(1)
    pior: O(log n)
    observacao: média constante em inserções aleatórias
  - nome: extrair o mínimo
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: construir a partir de n itens
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: heapify de baixo para cima
memoria: O(n)
propriedades:
  - "árvore completa em array: filhos de i em 2i+1 e 2i+2"
  - invariante do heap entre pai e filhos
  - sem ordem total entre irmãos
tradeoffs:
  - "Ganha: extração do melhor em O(log n) com memória compacta; paga: busca arbitrária O(n) e sem iteração ordenada"
  - "Ganha: construção em O(n); paga: prioridade mutável exige índice auxiliar ou reinserção"
casosDeBorda:
  - Extrair de heap vazio
  - Elementos com prioridades iguais (a ordem de saída não é estável)
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: heapq
algoritmosRelacionados:
  - "[[a_estrela|Algoritmo A estrela]]"
  - "[[dijkstra|Algoritmo de Dijkstra]]"
  - "[[prim|Algoritmo de Prim]]"
  - "[[huffman|Codificação de Huffman]]"
  - "[[heap_sort|Heap Sort]]"
  - "[[quickselect|Quickselect]]"
  - "[[selecao_de_atividades|Seleção de atividades]]"
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[fila|Fila]]"
padroes:
  - "[[competing_consumers|Competing Consumers]]"
  - "[[load_shedding|Load Shedding]]"
ferramentas: []
casosDeUso:
  - Agendadores de tarefas por prioridade
  - Top-k em fluxos de dados
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Heap e fila de prioridade
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
função inserir(h, x):
    h.dados[h.n] = x ; i = h.n ; h.n = h.n + 1
    enquanto i > 0 e h.dados[pai(i)] > h.dados[i]:
        trocar(h.dados, i, pai(i)) ; i = pai(i)

função extrair_minimo(h):
    min = h.dados[0] ; h.n = h.n - 1
    h.dados[0] = h.dados[h.n] ; afundar(h, 0)
    retorne min
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
