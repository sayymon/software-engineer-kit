---
id: boyer_moore_horspool
tipo: algoritmo
nome: Boyer-Moore-Horspool
descricao: "Simplificação do Boyer-Moore: compara o padrão da direita para a esquerda e usa uma tabela de deslocamento pelo último caractere da janela para saltar vários caracteres."
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Busca de texto em editores e em ferramentas como grep, com saltos grandes em alfabetos amplos.
quando_usar:
  - Textos naturais e padrões longos
  - Busca simples com bom desempenho prático
quando_evitar:
  - Garantia de pior caso linear (prefira KMP)
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
subarea: busca de padrão
categoria: strings / busca de padrão
entrada: Texto de tamanho n e padrão de tamanho m
saida: Posições das ocorrências
complexidade:
  tempoMelhor: O(n / m)
  tempoMedio: O(n)
  tempoPior: O(n * m)
  memoria: O(k)
  observacao: k é o tamanho do alfabeto; muito rápido em textos naturais
preCondicoes:
  - alfabeto conhecido para montar a tabela de deslocamento
limitacoes:
  - pior caso quadrático em padrões repetitivos
  - tabela cresce com o alfabeto
casosDeUso:
  - Texto natural com padrões longos, com saltos grandes
  - Ferramentas de busca em arquivos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[kmp|Algoritmo KMP]]"
  - "[[algoritmo_z|Algoritmo Z]]"
  - "[[rabin_karp|Rabin-Karp]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Padrão maior que o texto
    - Alfabeto grande (Unicode) exige tabela esparsa
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Boyer-Moore-Horspool
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
função horspool(texto, p):
    desloc[c] = m para todo c ; para i de 0 até m-2: desloc[p[i]] = m - 1 - i
    i = 0
    enquanto i <= n - m:
        j = m - 1
        enquanto j >= 0 e texto[i+j] == p[j]: j = j - 1
        se j < 0: registrar ocorrência em i
        i = i + desloc[texto[i + m - 1]]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
