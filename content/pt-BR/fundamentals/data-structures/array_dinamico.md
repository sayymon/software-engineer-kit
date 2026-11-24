---
id: array_dinamico
tipo: estrutura-de-dados
nome: Array dinâmico
descricao: "Array que cresce sob demanda: quando a capacidade acaba, aloca um bloco maior (em geral o dobro) e copia os elementos. O custo de anexar ao final é O(1) amortizado."
fonte_ids:
  - clrs
  - algs4
  - java_util
exemplo: ArrayList em Java e list em Python anexam ao final em O(1) amortizado e leem por índice em O(1).
quando_usar:
  - Coleção de tamanho variável com leitura por índice frequente
  - Anexar ao final é o padrão de escrita
  - Substituto geral de listas quando não há inserção frequente no meio
quando_evitar:
  - Latência máxima por operação precisa ser limitada (a realocação gera picos de O(n))
  - Inserções e remoções no início ou no meio são frequentes
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
    medio: O(1)
    pior: O(1)
    observacao: ""
  - nome: anexar ao final
    melhor: O(1)
    medio: O(1)
    pior: O(n)
    observacao: amortizado O(1); O(n) no instante da realocação
  - nome: inserção no meio
    melhor: O(1)
    medio: O(n)
    pior: O(n)
    observacao: ""
  - nome: remoção do final
    melhor: O(1)
    medio: O(1)
    pior: O(1)
    observacao: ""
memoria: O(n)
propriedades:
  - capacidade maior ou igual ao tamanho
  - fator de crescimento geométrico (por exemplo 2x ou 1,5x)
  - ponteiros e iteradores podem invalidar após realocar
tradeoffs:
  - "Ganha: anexar em O(1) amortizado e acesso O(1); paga: pico de O(n) na realocação e memória ociosa até 50% ou mais"
  - "Ganha: simplicidade de uso; paga: referências guardadas deixam de valer após crescer"
casosDeBorda:
  - Crescer a partir de capacidade zero
  - Encolher (shrink) sem oscilar entre crescer e encolher repetidamente
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.ArrayList
algoritmosRelacionados:
  - "[[busca_binaria|Busca binária]]"
  - "[[quick_sort|Quick Sort]]"
  - "[[timsort|Timsort]]"
estruturasRelacionadas:
  - "[[array|Array]]"
  - "[[pilha|Pilha]]"
  - "[[tabela_hash|Tabela hash]]"
padroes: []
ferramentas: []
casosDeUso:
  - Acúmulo de resultados de consultas
  - Buffers de leitura de tamanho desconhecido
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Array dinâmico
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
função anexar(v, x):
    se v.tamanho == v.capacidade:
        nova = alocar(2 * v.capacidade)
        copiar(v.dados, nova)
        v.dados = nova
        v.capacidade = 2 * v.capacidade
    v.dados[v.tamanho] = x
    v.tamanho = v.tamanho + 1
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
