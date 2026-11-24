---
id: algoritmo_z
tipo: algoritmo
nome: Algoritmo Z
descricao: Calcula, para cada posição de uma string, o comprimento do maior prefixo da string que começa ali (o vetor Z), em O(n). Concatenando padrão, separador e texto, o vetor Z revela as ocorrências.
fonte_ids:
  - clrs
  - algs4_strings
  - mit6006
exemplo: Achar todas as ocorrências de um padrão e medir periodicidade de strings.
quando_usar:
  - Cálculo de períodos, bordas e ocorrências em O(n)
  - Alternativa ao KMP com lógica mais direta
quando_evitar:
  - Vários padrões simultâneos (use Aho-Corasick)
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
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: strings
subarea: busca de padrão
categoria: strings / busca de padrão
entrada: String (ou padrão + separador + texto)
saida: Vetor Z com o comprimento do prefixo comum em cada posição
complexidade:
  tempoMelhor: O(n)
  tempoMedio: O(n)
  tempoPior: O(n)
  memoria: O(n)
  observacao: linear em tempo e memória
preCondicoes:
  - separador que não ocorre no alfabeto ao concatenar padrão e texto
limitacoes:
  - usa memória O(n) para o vetor Z
  - foco em um padrão por vez
casosDeUso:
  - Busca de padrão e detecção de períodos e bordas
  - Problemas de strings em programação competitiva e análise de sequências
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[aho_corasick|Aho-Corasick]]"
  - "[[kmp|Algoritmo KMP]]"
  - "[[boyer_moore_horspool|Boyer-Moore-Horspool]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - String vazia
    - Padrão que contém o separador
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Algoritmo Z
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
função vetor_z(s):
    z[0] = n ; l = 0 ; r = 0
    para i de 1 até n-1:
        se i < r: z[i] = min(r - i, z[i - l])
        enquanto i + z[i] < n e s[z[i]] == s[i + z[i]]: z[i] = z[i] + 1
        se i + z[i] > r: l = i ; r = i + z[i]
    retorne z
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
