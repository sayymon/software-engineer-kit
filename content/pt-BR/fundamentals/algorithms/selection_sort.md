---
id: selection_sort
tipo: algoritmo
nome: Selection Sort
descricao: Em cada passo seleciona o menor elemento do trecho restante e o troca com a primeira posição desse trecho.
fonte_ids:
  - clrs
  - algs4_sort
  - taocp
exemplo: Escolher repetidamente a menor tarefa pendente e colocá-la no início da fila de execução.
quando_usar:
  - Poucas trocas permitidas (memória de escrita cara)
  - Conjuntos muito pequenos e ensino
quando_evitar:
  - Entradas médias e grandes
  - Estabilidade é requisito
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: algs4_sort
    tipo: artigo
    titulo: "Algorithms 4e, capítulo 2: Sorting (Princeton)"
    link: https://algs4.cs.princeton.edu/20sorting/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: ordenacao
subarea: comparação simples
categoria: ordenação / comparação simples
entrada: Array de n elementos comparáveis
saida: O mesmo array em ordem crescente (in-place)
complexidade:
  tempoMelhor: O(n^2)
  tempoMedio: O(n^2)
  tempoPior: O(n^2)
  memoria: O(1)
  observacao: faz no máximo n-1 trocas; instável na forma clássica
preCondicoes:
  - nenhuma
limitacoes:
  - sempre quadrático, mesmo com a entrada ordenada
casosDeUso:
  - Escrita em memória é muito cara e o número de trocas precisa ser mínimo (no máximo n-1)
  - Ensino de ordenação e conjuntos muito pequenos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[heap_sort|Heap Sort]]"
  - "[[insertion_sort|Insertion Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Array vazio ou com um elemento
    - Elementos repetidos (a troca pode alterar a ordem relativa)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Selection Sort
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
função selection_sort(a):
    para i de 0 até n-2:
        menor = i
        para j de i+1 até n-1:
            se a[j] < a[menor]: menor = j
        trocar(a[i], a[menor])
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
