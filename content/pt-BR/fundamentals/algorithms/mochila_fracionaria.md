---
id: mochila_fracionaria
tipo: algoritmo
nome: Mochila fracionária
descricao: "Variante da mochila em que os itens podem ser divididos: ordena por razão valor por peso e leva os melhores até encher a capacidade, fracionando o último."
fonte_ids:
  - clrs
  - mit6006
exemplo: Preencher um contêiner com cargas divisíveis (grãos, líquidos) de maior valor por quilo.
quando_usar:
  - Itens divisíveis com capacidade limitada
  - Limites superiores em otimização
quando_evitar:
  - Itens indivisíveis (use a mochila 0/1)
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
area: guloso
subarea: otimização com capacidade
categoria: algoritmos gulosos / otimização com capacidade
entrada: n itens com peso e valor, e capacidade W
saida: Valor máximo e a fração de cada item levada
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(1)
  observacao: dominado pela ordenação por razão valor/peso
preCondicoes:
  - itens divisíveis em frações
limitacoes:
  - a versão com itens indivisíveis (0/1) pede programação dinâmica
  - peso zero exige tratamento da razão
casosDeUso:
  - Alocação de recursos divisíveis
  - Limite superior para mochila 0/1 em branch and bound
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[mochila_0_1|Problema da mochila 0-1]]"
  - "[[selecao_de_atividades|Seleção de atividades]]"
  - "[[troco_guloso|Troco guloso]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Capacidade zero
    - Item com peso maior que a capacidade (leva fração)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Mochila fracionária
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
função mochila_fracionaria(itens, W):
    ordenar itens por valor/peso decrescente
    total = 0
    para cada item em itens:
        se W == 0: sair
        fracao = min(1, W / item.peso)
        total = total + fracao * item.valor ; W = W - fracao * item.peso
    retorne total
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
