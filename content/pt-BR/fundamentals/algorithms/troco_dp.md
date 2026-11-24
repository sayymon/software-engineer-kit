---
id: troco_dp
tipo: algoritmo
nome: Troco com menor número de moedas (programação dinâmica)
descricao: Calcula o menor número de moedas que soma um valor, para qualquer conjunto de moedas, com dp[v] igual ao mínimo de moedas para o valor v.
fonte_ids:
  - clrs
  - mit6006
exemplo: Calcular o menor número de cédulas e moedas para um pagamento em qualquer sistema monetário.
quando_usar:
  - Denominações arbitrárias
  - Garantir o ótimo quando o guloso não é seguro
quando_evitar:
  - Sistema canônico em que o guloso basta e é mais simples
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
area: programacao-dinamica
subarea: otimização com capacidade
categoria: programação dinâmica / otimização com capacidade
entrada: Lista de denominações e valor alvo V
saida: Menor número de moedas (ou impossível) e as moedas usadas
complexidade:
  tempoMelhor: O(V * k)
  tempoMedio: O(V * k)
  tempoPior: O(V * k)
  memoria: O(V)
  observacao: k é o número de denominações
preCondicoes:
  - denominações inteiras positivas
limitacoes:
  - tempo pseudo-polinomial em V
  - valores muito grandes pedem outras abordagens
casosDeUso:
  - Sistemas de moedas arbitrários, em que o guloso pode falhar
  - Pagamentos e preços com troco mínimo
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
algoritmosRelacionados:
  - "[[mochila_0_1|Problema da mochila 0-1]]"
  - "[[troco_guloso|Troco guloso]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Valor zero (zero moedas)
    - Valor impossível com as denominações dadas
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Troco com menor número de moedas (programação dinâmica)
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
função troco(moedas, V):
    dp[0] = 0 ; dp[1..V] = infinito
    para v de 1 até V:
        para cada c em moedas:
            se c <= v e dp[v - c] + 1 < dp[v]: dp[v] = dp[v - c] + 1
    retorne dp[V] (ou "impossível" se infinito)
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
