---
id: troco_guloso
tipo: algoritmo
nome: Troco guloso
descricao: Escolhe sempre a maior moeda que cabe no valor restante. Dá o menor número de moedas apenas em sistemas monetários canônicos, como o euro ou o real.
fonte_ids:
  - clrs
  - mit6006
exemplo: Caixas e máquinas de troco aplicam a regra de maior moeda primeiro.
quando_usar:
  - Sistemas monetários canônicos
  - Cálculo rápido de troco
quando_evitar:
  - Sistemas de moedas arbitrários (use programação dinâmica)
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
entrada: Denominações em ordem decrescente e valor V
saida: Quantidade de moedas de cada denominação
complexidade:
  tempoMelhor: O(k)
  tempoMedio: O(k)
  tempoPior: O(k)
  memoria: O(1)
  observacao: k é o número de denominações; cada passo usa divisão inteira
preCondicoes:
  - sistema de moedas canônico (o guloso é ótimo)
limitacoes:
  - em sistemas não canônicos (por exemplo 1, 3, 4) pode não dar o mínimo
  - exige verificar a propriedade canônica das moedas
casosDeUso:
  - Sistemas monetários reais com troco imediato
  - Introdução a algoritmos gulosos
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[mochila_fracionaria|Mochila fracionária]]"
  - "[[troco_dp|Troco com menor número de moedas (programação dinâmica)]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Valor zero
    - "Moedas {1, 3, 4} e valor 6: guloso dá 4+1+1 e o ótimo é 3+3"
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Troco guloso
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
função troco_guloso(moedas_decrescente, V):
    resultado = []
    para cada c em moedas_decrescente:
        qtd = V div c
        anexar (c, qtd) em resultado
        V = V - qtd * c
    retorne resultado
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
