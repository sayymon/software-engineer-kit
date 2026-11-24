---
id: arvore_rubro_negra
tipo: estrutura-de-dados
nome: Árvore rubro-negra
descricao: Árvore binária de busca balanceada por coloração dos nós (vermelho e preto) com regras que limitam a altura a 2 log(n+1). Faz poucas rotações por atualização.
fonte_ids:
  - clrs
  - algs4_search
  - java_util
exemplo: TreeMap em Java e std::map em C++ usam árvores rubro-negras para mapas ordenados com O(log n) garantido.
quando_usar:
  - Mapas e conjuntos ordenados de uso geral com escrita frequente
  - Bibliotecas padrão que precisam de pior caso garantido
  - Agendadores e estruturas de intervalo em memória
quando_evitar:
  - Dados em disco com acesso por página (prefira B-tree)
  - Cargas somente de leitura (AVL tem altura menor)
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
familia: arvore
operacoes:
  - nome: busca
    melhor: O(1)
    medio: O(log n)
    pior: O(log n)
    observacao: ""
  - nome: inserção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: até 2 rotações
  - nome: remoção
    melhor: O(log n)
    medio: O(log n)
    pior: O(log n)
    observacao: até 3 rotações
  - nome: percurso em ordem
    melhor: O(n)
    medio: O(n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - raiz preta e folhas nulas pretas
  - nó vermelho tem filhos pretos
  - todo caminho tem o mesmo número de nós pretos
tradeoffs:
  - "Ganha: poucas rotações por escrita e pior caso O(log n); paga: altura até 2x a ótima e regras de cor intrincadas"
  - "Ganha: base de TreeMap e std::map; paga: remoção complexa de implementar corretamente"
casosDeBorda:
  - Inserção com tio vermelho (recoloração em cascata)
  - Remoção que deixa um nó duplamente preto
implementacao:
  linguagemReferencia: Java
  versao: Java SE 21
  bibliotecaPadrao: java.util.TreeMap
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[arvore_avl|Árvore AVL]]"
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[b_tree|B-tree]]"
  - "[[skip_list|Skip list]]"
  - "[[tabela_hash|Tabela hash]]"
padroes:
  - "[[iterator|Iterator (GoF)]]"
ferramentas: []
casosDeUso:
  - Mapas ordenados de uso geral em bibliotecas padrão
  - Agendamento por chave de tempo em memória
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Árvore rubro-negra
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
função inserir_fixup(z):
    enquanto cor(pai(z)) == vermelho:
        t = tio(z)
        se cor(t) == vermelho:
            pintar pai(z) e t de preto ; pintar avô(z) de vermelho ; z = avô(z)
        senão:
            rotacionar para alinhar z, pai(z) e avô(z)
            pintar pai(z) de preto ; pintar avô(z) de vermelho
            rotacionar avô(z) no sentido oposto
    cor(raiz) = preto
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
