---
id: iterator
tipo: padrao
nome: Iterator
aliases:
  - Iterator
  - Iterador
descricao: Fornece uma forma de percorrer os elementos de uma coleção sequencialmente, sem expor sua representação interna.
fonte_ids:
  - gof_iterator
  - book_gof
exemplo: Um iterador percorre uma árvore em profundidade e devolve um nó por vez, sem expor a estrutura.
quando_usar:
  - Percorrer coleções com estrutura interna oculta
  - Fluxos preguiçosos ou infinitos
  - Padronizar a iteração entre estruturas diferentes
quando_evitar:
  - Coleções simples já cobertas por laços da linguagem
  - Quando a iteração precisa de acesso aleatório
status: revisado
publico: false
fontes:
  - id: gof_iterator
    tipo: artigo
    titulo: Iterator (refactoring.guru)
    link: https://refactoring.guru/design-patterns/iterator
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[estado_dados_cliente|Estado e dados no cliente]]"
familia: gof
subfamilia: Comportamental
problema: O cliente precisa percorrer coleções de estruturas diferentes (listas, árvores, fluxos) sem conhecer sua organização.
tradeoffs:
  - "Ganha: acesso uniforme e várias iterações simultâneas; paga: iteradores podem invalidar-se com modificações concorrentes"
  - "Ganha: avaliação preguiçosa; paga: estado do cursor a ser gerenciado"
consequencias:
  - Quase toda linguagem moderna oferece iteradores e geradores nativos
  - Streams reativos generalizam o conceito para fluxos assíncronos
padroesRelacionados:
  - "[[composite|Composite (GoF)]]"
  - "[[observer|Observer (GoF)]]"
  - "[[visitor|Visitor (GoF)]]"
casosDeUso:
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
variacoes: []
ferramentas:
  - "[[rxjs|RxJS]]"
  - "[[spring_boot|Spring Boot]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Iterator
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
