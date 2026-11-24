---
id: lista_ligada
tipo: estrutura-de-dados
nome: Lista ligada
descricao: Sequência de nós em que cada nó guarda o valor e uma referência para o próximo (e para o anterior, na versão dupla). Inserir ou remover em uma posição já localizada custa O(1).
fonte_ids:
  - clrs
  - algs4
  - java_util
exemplo: Uma fila de tarefas em que o escalonador remove o primeiro nó e anexa novos nós ao final em O(1).
quando_usar:
  - Inserções e remoções frequentes com o nó já em mãos (por exemplo, via iterador)
  - Estruturas que compõem outras, como listas de colisão e listas de adjacência
  - Tamanho muito variável sem custo de realocação
quando_evitar:
  - Acesso por índice é frequente
  - Percursos longos em memória com localidade de cache importante
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
  - nome: acesso por índice
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: ""
  - nome: inserção no início
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: inserção após nó conhecido
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: busca por valor
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - alocação nó a nó
  - ponteiros por elemento
  - versão dupla permite percurso nos dois sentidos
tradeoffs:
  - "Ganha: inserção e remoção O(1) em posição conhecida; paga: acesso por índice O(n) e overhead de ponteiros por nó"
  - "Ganha: crescimento sem realocar em bloco; paga: baixa localidade de cache e mais alocações"
casosDeBorda:
  - Lista vazia (cabeça nula)
  - Remoção do único nó e remoção da cauda
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.LinkedList
algoritmosRelacionados:
  - "[[busca_linear|Busca linear]]"
  - "[[insertion_sort|Insertion Sort]]"
  - "[[merge_sort|Merge Sort]]"
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[fila|Fila]]"
  - "[[grafo|Grafo]]"
  - "[[pilha|Pilha]]"
  - "[[skip_list|Skip list]]"
  - "[[tabela_hash|Tabela hash]]"
padroes:
  - "[[iterator|Iterator (GoF)]]"
  - "[[composite|Composite (GoF)]]"
ferramentas: []
casosDeUso:
  - Cadeias de colisão em tabelas hash
  - Listas de adjacência de grafos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Lista ligada
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
função inserir_apos(no, valor):
    novo = Nó(valor)
    novo.proximo = no.proximo
    no.proximo = novo

função remover_apos(no):
    alvo = no.proximo
    se alvo é nulo: retorne
    no.proximo = alvo.proximo
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
