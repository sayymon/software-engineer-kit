---
id: busca_binaria
tipo: algoritmo
nome: Busca binária
descricao: Compara o alvo com o elemento do meio de um vetor ordenado e descarta metade do intervalo a cada passo.
fonte_ids:
  - clrs
  - algs4_search
  - py_bisect
exemplo: Achar a primeira versão com defeito entre milhares de commits, testando o ponto médio (git bisect).
quando_usar:
  - Dados ordenados e estáticos com muitas consultas
  - Busca pela resposta em um espaço monotônico
quando_evitar:
  - Dados desordenados ou que mudam sem parar (use tabela hash ou árvore balanceada)
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
  - id: py_bisect
    tipo: artigo
    titulo: "Python: bisect, bisseção de arrays (documentação oficial)"
    link: https://docs.python.org/3/library/bisect.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: busca
subarea: em sequência ordenada
categoria: busca / em sequência ordenada
entrada: Vetor ordenado de n elementos e um valor alvo
saida: Posição do valor, ou o ponto de inserção que preserva a ordem
complexidade:
  tempoMelhor: O(1)
  tempoMedio: O(log n)
  tempoPior: O(log n)
  memoria: O(1)
  observacao: memória auxiliar O(1) na versão iterativa; a recursiva usa O(log n) de pilha
preCondicoes:
  - vetor ordenado
limitacoes:
  - exige acesso aleatório e dados ordenados
  - o custo de ordenar compensa apenas com muitas buscas
casosDeUso:
  - Buscas repetidas em dados estáticos ordenados
  - Achar limites (primeiro e último) e pontos de inserção, e busca pela resposta em problemas de otimização
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[array_dinamico|Array dinâmico]]"
  - "[[arvore_binaria_de_busca|Árvore binária de busca]]"
algoritmosRelacionados:
  - "[[busca_exponencial|Busca exponencial]]"
  - "[[busca_linear|Busca linear]]"
  - "[[busca_por_interpolacao|Busca por interpolação]]"
  - "[[lis|Subsequência crescente mais longa (LIS)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: bisect
  casosDeBorda:
    - Vetor vazio e vetor com um elemento
    - Overflow no cálculo do meio (use lo + (hi - lo) / 2) e valores repetidos
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Busca binária
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
função busca_binaria(a, alvo):
    lo = 0 ; hi = n - 1
    enquanto lo <= hi:
        meio = lo + (hi - lo) / 2
        se a[meio] == alvo: retorne meio
        se a[meio] < alvo: lo = meio + 1
        senão: hi = meio - 1
    retorne ausente
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
