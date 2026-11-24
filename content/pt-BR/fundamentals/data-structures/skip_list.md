---
id: skip_list
tipo: estrutura-de-dados
nome: Skip list
descricao: Lista ligada ordenada com níveis extras de atalhos sorteados aleatoriamente, que dão busca, inserção e remoção em O(log n) esperado sem rotações.
fonte_ids:
  - clrs
  - algs4_search
  - taocp
exemplo: O Redis usa skip lists para conjuntos ordenados (sorted sets), com consultas por pontuação e posição.
quando_usar:
  - Mapas ordenados concorrentes, pois são mais simples de tornar lock-free que árvores
  - Conjuntos ordenados com consulta por intervalo
  - Implementação simples de busca ordenada em O(log n) esperado
quando_evitar:
  - Pior caso determinístico é exigido (a garantia é probabilística)
  - Memória é muito restrita (ponteiros extras por nível)
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
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
familia: especializada
operacoes:
  - nome: busca
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: pior caso improvável, probabilístico
  - nome: inserção
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: ""
  - nome: remoção
    melhor: O(1)
    medio: O(log n)
    pior: O(n)
    observacao: ""
memoria: O(n)
propriedades:
  - níveis com atalhos escolhidos por moeda
  - altura esperada O(log n)
  - mesma ordem de uma lista ligada ordenada
tradeoffs:
  - "Ganha: código mais simples que árvores balanceadas e boa concorrência; paga: garantia apenas probabilística e mais ponteiros por nó"
  - "Ganha: percurso ordenado barato; paga: localidade de cache inferior à de arrays"
casosDeBorda:
  - Sorteio de nível sempre máximo ou sempre mínimo (degeneração rara)
  - Chaves duplicadas, conforme a política do mapa
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
algoritmosRelacionados: []
estruturasRelacionadas:
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
  - "[[arvore_rubro_negra|Árvore rubro-negra]]"
  - "[[lista_ligada|Lista ligada]]"
padroes:
  - "[[sharding|Sharding]]"
ferramentas:
  - "[[redis|Redis (ferramenta)]]"
casosDeUso:
  - Conjuntos ordenados em armazenamentos chave-valor
  - Mapas ordenados concorrentes
aliases: []
dataVerificacao: 2026-11-23
tags:
  - estrutura-de-dados
---
# Skip list
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
função buscar(sl, chave):
    no = sl.cabeca
    para nivel de sl.altura-1 até 0, passo -1:
        enquanto no.proximo[nivel] existe e no.proximo[nivel].chave < chave:
            no = no.proximo[nivel]
    no = no.proximo[0]
    se no existe e no.chave == chave: retorne no
    retorne ausente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
