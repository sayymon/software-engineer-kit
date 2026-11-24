---
id: counting_sort
tipo: algoritmo
nome: Counting Sort
descricao: Conta quantas vezes cada chave inteira aparece e calcula as posições finais por soma acumulada, sem comparar elementos entre si.
fonte_ids:
  - clrs
  - algs4_strings
  - mit6006
exemplo: Ordenar notas de 0 a 100 de milhões de alunos contando ocorrências de cada valor.
quando_usar:
  - Chaves inteiras com intervalo pequeno
  - Etapa estável de outros algoritmos (Radix Sort)
quando_evitar:
  - Intervalo de chaves muito grande
  - Chaves não inteiras sem mapeamento para inteiros
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
area: ordenacao
subarea: sem comparação
categoria: ordenação / sem comparação
entrada: Array de n inteiros em um intervalo [0, k]
saida: Array ordenado (estável quando a contagem é percorrida de trás para frente)
complexidade:
  tempoMelhor: O(n + k)
  tempoMedio: O(n + k)
  tempoPior: O(n + k)
  memoria: O(n + k)
  observacao: k é o tamanho do intervalo das chaves
preCondicoes:
  - chaves inteiras em intervalo pequeno e conhecido [0, k]
limitacoes:
  - memória e tempo crescem com k
  - restrito a chaves discretas
casosDeUso:
  - Chaves inteiras com intervalo pequeno em relação a n
  - Passo interno do Radix Sort
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[quick_sort|Quick Sort]]"
  - "[[radix_sort|Radix Sort]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - k muito maior que n (o custo domina)
    - Chaves negativas exigem deslocar o intervalo
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Counting Sort
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
função counting_sort(a, k):
    cont[0..k] = 0
    para cada x em a: cont[x] = cont[x] + 1
    para v de 1 até k: cont[v] = cont[v] + cont[v-1]          // posições finais
    para i de n-1 até 0, passo -1:                            // estável
        cont[a[i]] = cont[a[i]] - 1
        saida[cont[a[i]]] = a[i]
    retorne saida
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
