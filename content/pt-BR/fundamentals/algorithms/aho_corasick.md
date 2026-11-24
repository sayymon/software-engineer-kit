---
id: aho_corasick
tipo: algoritmo
nome: Aho-Corasick
descricao: Constrói uma trie dos padrões e acrescenta links de falha, formando um autômato que encontra todos os padrões em uma única passada pelo texto.
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Filtrar milhares de palavras proibidas em um fluxo de mensagens com uma só leitura do texto.
quando_usar:
  - Muitos padrões em um único texto
  - Filtros de conteúdo e detecção de assinaturas
quando_evitar:
  - Um único padrão (KMP ou Horspool bastam)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_strings
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 5: Strings (Princeton)"
    link: https://algs4.cs.princeton.edu/50strings/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: strings
subarea: busca de múltiplos padrões
categoria: strings / busca de múltiplos padrões
entrada: Conjunto de padrões e um texto de tamanho n
saida: Todas as ocorrências de todos os padrões
complexidade:
  tempoMelhor: O(n + m + z)
  tempoMedio: O(n + m + z)
  tempoPior: O(n + m + z)
  memoria: O(m)
  observacao: m é a soma dos tamanhos dos padrões e z o número de ocorrências
preCondicoes:
  - conjunto de padrões conhecido antes da busca
limitacoes:
  - memória proporcional ao tamanho total dos padrões
  - reconstruir o autômato ao mudar o conjunto
casosDeUso:
  - Muitos padrões ao mesmo tempo (listas de bloqueio, detecção de assinaturas)
  - Busca de dicionários em textos grandes
casosDeUsoKit: []
estruturasDeDados:
  - "[[trie|Trie]]"
algoritmosRelacionados:
  - "[[kmp|Algoritmo KMP]]"
  - "[[algoritmo_z|Algoritmo Z]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Padrões que são sufixos uns dos outros (saídas encadeadas)
    - Padrões repetidos no conjunto
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Aho-Corasick
<!-- fundamento:gen -->
## 📋 Resumo
`= this.descricao`

Categoria: `= this.categoria`

Exemplo: `= this.exemplo`
## 🔁 Entrada e saída
- **Entrada:** `= this.entrada`
- **Saída:** `= this.saida`
## ⏱ Complexidade
- **Tempo (melhor, médio, pior):** `= this.complexidade.tempoMelhor` · `= this.complexidade.tempoMedio` · `= this.complexidade.tempoPior`
- **Memória extra:** `= this.complexidade.memoria`
- **Observação:** `= this.complexidade.observacao`
## 🧪 Implementação e testes
- **Linguagem de referência:** `= this.implementacao.linguagemReferencia`
- **Versão:** `= this.implementacao.versao`
- **Biblioteca padrão:** `= this.implementacao.bibliotecaPadrao`
## 🧾 Pseudocódigo
```text
função construir(padroes):
    montar trie com todos os padrões
    para cada nó em ordem de largura: falha[nó] = maior sufixo próprio que é prefixo na trie
    saida[nó] = padrões que terminam em nó, unidos aos de falha[nó]

função buscar(texto):
    estado = raiz
    para cada caractere c em texto:
        enquanto estado não tem transição c e estado != raiz: estado = falha[estado]
        estado = transição(estado, c) ou raiz
        registrar saida[estado]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
