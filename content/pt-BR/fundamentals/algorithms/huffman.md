---
id: huffman
tipo: algoritmo
nome: Codificação de Huffman
descricao: Constrói um código de prefixo ótimo juntando repetidamente os dois símbolos de menor frequência com uma fila de prioridade. Símbolos frequentes recebem códigos curtos.
fonte_ids:
  - clrs
  - algs4_strings
  - taocp
exemplo: Compressão de arquivos (base do DEFLATE usado em ZIP e PNG) atribui menos bits aos caracteres mais comuns.
quando_usar:
  - Compressão sem perda por símbolo
  - Códigos de comprimento variável
quando_evitar:
  - Dados com forte correlação entre símbolos (use LZ77 ou LZW)
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
  - id: taocp
    tipo: livro
    titulo: The Art of Computer Programming (Donald E. Knuth)
    link: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
area: guloso
subarea: compressão
categoria: algoritmos gulosos / compressão
entrada: Símbolos com suas frequências
saida: Árvore de Huffman e tabela de códigos binários
complexidade:
  tempoMelhor: O(n log n)
  tempoMedio: O(n log n)
  tempoPior: O(n log n)
  memoria: O(n)
  observacao: n é o número de símbolos distintos
preCondicoes:
  - frequências conhecidas (ou medidas em uma primeira passada)
limitacoes:
  - ótimo entre códigos de prefixo por símbolo, mas não capta padrões entre símbolos (LZ e outros)
  - a tabela de códigos precisa acompanhar os dados
casosDeUso:
  - Compressão de dados sem perda (arquivos, imagens)
  - Codificações de comprimento variável
casosDeUsoKit: []
estruturasDeDados:
  - "[[array|Array]]"
  - "[[heap|Heap e fila de prioridade]]"
algoritmosRelacionados:
  - "[[selecao_de_atividades|Seleção de atividades]]"
padroes: []
ferramentas: []
implementacao:
  linguagemReferencia: Python
  versao: não verificado
  bibliotecaPadrao: implementação própria
  casosDeBorda:
    - Um único símbolo distinto (código de 1 bit por convenção)
    - Frequências iguais (várias árvores ótimas)
aliases: []
dataVerificacao: 2026-11-23
tags:
  - algoritmo
---
# Codificação de Huffman
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
função huffman(frequencias):
    fila = nós folha ordenados por frequência (heap mínimo)
    enquanto tamanho(fila) > 1:
        a = extrair_minimo(fila) ; b = extrair_minimo(fila)
        inserir(fila, Nó(freq = a.freq + b.freq, esquerda = a, direita = b))
    retorne extrair_minimo(fila)           // raiz; esquerda = 0, direita = 1
```
## 🔗 Relacionamentos
- **Hub:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
