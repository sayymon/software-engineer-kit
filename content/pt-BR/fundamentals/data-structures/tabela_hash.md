---
id: tabela_hash
tipo: estrutura-de-dados
nome: Tabela hash
descricao: Mapeia chaves para valores usando uma função de hash que escolhe o balde. Com boa função e fator de carga controlado, busca, inserção e remoção custam O(1) em média.
fonte_ids:
  - clrs
  - algs4_search
  - java_util
exemplo: HashMap em Java e dict em Python guardam sessões por id de usuário com busca em O(1) médio.
quando_usar:
  - Busca por chave exata em grandes volumes
  - Contagem de frequências, deduplicação e caches
  - Índices em memória e junções por hash
quando_evitar:
  - É necessário percorrer as chaves em ordem (prefira árvore balanceada)
  - Chaves com hash fraco ou adversarial podem degradar para O(n)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_search
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 3: Searching (Princeton)"
    link: https://algs4.cs.princeton.edu/30searching/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: java_util
    tipo: artigo
    titulo: "Java SE 21 API: pacote java.util (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: associativa
operacoes:
  - nome: busca
    melhor: O(1)
    medio: O(1)
    pior: O(n)
    observacao: pior caso com colisões em massa
  - nome: inserção
    melhor: O(1)
    medio: O(1)
    pior: O(n)
    observacao: inclui redimensionamento amortizado
  - nome: remoção
    melhor: O(1)
    medio: O(1)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - função de hash determinística
  - tratamento de colisões por encadeamento ou endereçamento aberto
  - redimensiona quando o fator de carga passa do limite
tradeoffs:
  - "Ganha: acesso O(1) médio por chave; paga: sem ordenação e com picos no redimensionamento"
  - "Ganha: simplicidade e velocidade na prática; paga: sensível à qualidade do hash e a ataques de colisão"
casosDeBorda:
  - Colisões em massa (chaves com o mesmo hash)
  - Chave nula ou mutável alterada depois de inserida
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.HashMap
algoritmosRelacionados:
  - "[[fibonacci_memoizado|Fibonacci com memoização]]"
  - "[[mochila_0_1|Problema da mochila 0-1]]"
  - "[[rabin_karp|Rabin-Karp]]"
estruturasRelacionadas:
  - "[[array_dinamico|Array dinâmico]]"
  - "[[arvore_rubro_negra|Árvore rubro-negra]]"
  - "[[bloom_filter|Bloom filter]]"
  - "[[lista_ligada|Lista ligada]]"
  - "[[trie|Trie]]"
padroes:
  - "[[cache_aside|Cache-aside]]"
  - "[[sharding|Sharding]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
ferramentas:
  - "[[redis|Redis (ferramenta)]]"
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
casosDeUso:
  - Caches e armazenamento chave-valor
  - Deduplicação e contagem de eventos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Tabela hash
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
função buscar(t, chave):
    i = hash(chave) mod t.capacidade
    para cada (k, v) em t.baldes[i]:
        se k == chave: retorne v
    retorne ausente

função inserir(t, chave, valor):
    se t.tamanho / t.capacidade > limite: redimensionar(t)
    i = hash(chave) mod t.capacidade
    atualizar ou anexar (chave, valor) em t.baldes[i]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
