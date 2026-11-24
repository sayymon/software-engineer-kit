---
id: selecao_de_atividades
tipo: algoritmo
nome: Seleção de atividades
descricao: Escolhe o maior número de atividades compatíveis (sem sobreposição) ordenando por horário de término e pegando sempre a próxima que começa depois do término da última escolhida.
fonte_ids:
  - clrs
  - mit6006
  - taocp
exemplo: Reservar o maior número de reuniões em uma única sala sem conflito de horário.
quando_usar:
  - Maximizar a quantidade de itens compatíveis
  - Escalonamento de intervalos
quando_evitar:
  - Atividades com pesos ou valores diferentes (use programação dinâmica)
status: rascunho
publico: false
fontes:
  - id: clrs
    tipo: livro
    titulo: Introduction to Algorithms, 4th edition (Cormen, Leiserson, Rivest, Stein), MIT Press
    link: https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mit6006
    tipo: curso
    titulo: MIT 6.006 Introduction to Algorithms (OpenCourseWare)
    link: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: guloso
subarea: escalonamento
categoria: algoritmos gulosos / escalonamento
entrada: Lista de n atividades com início e fim
saida: Maior conjunto de atividades mutuamente compatíveis
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(1)
  observacao: dominado pela ordenação por horário de término
preCondicoes:
  - nenhuma
limitacoes:
  - maximiza a quantidade de atividades, e não o valor ou a duração total
  - pesos nas atividades exigem programação dinâmica
casosDeUso:
  - Agendamento de salas, janelas de manutenção e tarefas
  - Escalonamento de intervalos sem sobreposição
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[huffman|Codificação de Huffman]]"
  - "[[mochila_fracionaria|Mochila fracionária]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Atividades que terminam e começam no mesmo instante
    - Atividades idênticas
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Seleção de atividades
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
função selecionar(atividades):
    ordenar atividades por fim crescente
    escolhidas = [] ; ultimo_fim = -infinito
    para cada a em atividades:
        se a.inicio >= ultimo_fim: anexar a em escolhidas ; ultimo_fim = a.fim
    retorne escolhidas
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
