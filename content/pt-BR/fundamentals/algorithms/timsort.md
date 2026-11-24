---
id: timsort
tipo: algoritmo
nome: Timsort
descricao: Algoritmo híbrido de Merge Sort e Insertion Sort que identifica sequências já ordenadas (runs) e as intercala. É a ordenação padrão de Python (sorted e list.sort) e de objetos em Java.
fonte_ids:
  - clrs
  - py_sorting
  - java_util
exemplo: sorted(registros, key=...) em Python ordena em O(n) quando os dados já chegam quase ordenados.
quando_usar:
  - Ordenação estável adaptativa de uso geral
  - Dados que já chegam em trechos ordenados
quando_evitar:
  - Memória auxiliar proibida (prefira Heap Sort)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: py_sorting
    tipo: artigo
    titulo: "Python: Sorting Techniques (HOWTO oficial)"
    link: https://docs.python.org/3/howto/sorting.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: java_util
    tipo: artigo
    titulo: "Java SE 21 API: pacote java.util (docs.oracle.com)"
    link: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: ordenacao
subarea: híbrido
categoria: ordenação / híbrido
entrada: Sequência de n elementos comparáveis
saida: Sequência ordenada (estável)
complexidade:
  tempoMelhor: O(n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(n)
  observacao: "adaptativo: explora trechos já ordenados; estável"
preCondicoes:
  - nenhuma
limitacoes:
  - memória auxiliar O(n)
  - a implementação completa é longa e cheia de casos especiais
casosDeUso:
  - Ordenação estável de uso geral, em especial de dados parcialmente ordenados
  - Ordenar por várias chaves em passos sucessivos aproveitando a estabilidade
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[array_dinamico|Array dinâmico]]"
algoritmosRelacionados:
  - "[[insertion_sort|Insertion Sort]]"
  - "[[merge_sort|Merge Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: Python 3.10+
  bibliotecaPadrao: sorted e list.sort
  casosDeBorda:
    - Entrada com poucos elementos (usa Insertion Sort direto)
    - Comparador inconsistente (viola a ordem total e pode falhar)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Timsort
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
função timsort(a):
    runs = detectar_sequências_ordenadas(a, tamanho_minimo)   // estende runs curtas com insertion sort
    pilha = vazia
    para cada run em runs:
        empilhar(pilha, run)
        enquanto invariantes de tamanho das runs são violadas:
            intercalar as duas runs do topo (merge com galope)
    intercalar o que sobrar na pilha
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
