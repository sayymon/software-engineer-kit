---
id: kmp
tipo: algoritmo
nome: Algoritmo KMP
descricao: Knuth-Morris-Pratt pré-processa o padrão em uma tabela de prefixos (falha) para nunca retroceder no texto, buscando em O(n + m).
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Achar uma assinatura de 20 bytes em um arquivo de log de gigabytes, lendo cada byte uma única vez.
quando_usar:
  - Texto lido como fluxo, sem retroceder
  - Pior caso linear garantido
quando_evitar:
  - Vários padrões ao mesmo tempo (use Aho-Corasick)
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
saida: Posições das ocorrências do padrão no texto
complexidade:
  tempoMelhor: O(n + m)
  tempoMedio: O(n + m)
  tempoPior: O(n + m)
  memoria: O(m)
  observacao: a tabela de falha custa O(m) para construir
preCondicoes:
  - nenhuma
limitacoes:
  - foco em um único padrão por execução
  - na prática, Boyer-Moore costuma ser mais rápido em textos naturais
casosDeUso:
  - Busca de um padrão em fluxos lidos uma só vez
  - Garantia de pior caso linear
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[aho_corasick|Aho-Corasick]]"
  - "[[algoritmo_z|Algoritmo Z]]"
  - "[[boyer_moore_horspool|Boyer-Moore-Horspool]]"
  - "[[rabin_karp|Rabin-Karp]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Padrão vazio
    - Padrão com prefixos repetidos (aaaa) que exercitam a tabela de falha
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo KMP
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
função tabela_falha(p):
    f[0] = 0 ; k = 0
    para i de 1 até m-1:
        enquanto k > 0 e p[i] != p[k]: k = f[k-1]
        se p[i] == p[k]: k = k + 1
        f[i] = k
    retorne f

função kmp(texto, p):
    f = tabela_falha(p) ; k = 0
    para i de 0 até n-1:
        enquanto k > 0 e texto[i] != p[k]: k = f[k-1]
        se texto[i] == p[k]: k = k + 1
        se k == m: registrar ocorrência em i-m+1 ; k = f[k-1]
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
