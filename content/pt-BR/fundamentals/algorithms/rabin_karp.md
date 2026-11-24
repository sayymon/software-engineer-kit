---
id: rabin_karp
tipo: algoritmo
nome: Rabin-Karp
descricao: Compara o hash do padrão com o hash rolante de cada janela do texto e confere os caracteres apenas quando os hashes coincidem.
fonte_ids:
  - clrs
  - algs4_strings
  - mit6006
exemplo: Detectar trechos plagiados comparando hashes rolantes de janelas de um documento.
quando_usar:
  - Busca de vários padrões de mesmo tamanho
  - Comparação rápida de trechos por hash
quando_evitar:
  - Pior caso garantido é exigido (prefira KMP)
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
entrada: Texto de tamanho n e um ou mais padrões de tamanho m
saida: Posições das ocorrências
complexidade:
  tempoMelhor: O(n + m)
  tempoMedio: O(n + m)
  tempoPior: O(n * m)
  memoria: O(1)
  observacao: pior caso com muitas colisões de hash
preCondicoes:
  - função de hash rolante e módulo primo grande
limitacoes:
  - colisões forçam conferência caractere a caractere
  - o pior caso é quadrático
casosDeUso:
  - Vários padrões do mesmo tamanho (um hash por padrão em um conjunto)
  - Detecção de duplicatas e plágio por janelas
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[tabela_hash|Tabela hash]]"
algoritmosRelacionados:
  - "[[kmp|Algoritmo KMP]]"
  - "[[boyer_moore_horspool|Boyer-Moore-Horspool]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Colisão de hash com texto diferente (conferência final evita falso positivo)
    - Overflow no cálculo do hash (use aritmética modular)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Rabin-Karp
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
função rabin_karp(texto, p):
    hp = hash(p) ; h = hash(texto[0..m-1])
    para i de 0 até n-m:
        se h == hp e texto[i..i+m-1] == p: registrar ocorrência em i
        se i < n-m: h = atualizar_hash_rolante(h, texto[i], texto[i+m])
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
