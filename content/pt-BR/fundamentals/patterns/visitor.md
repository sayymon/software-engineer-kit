---
id: visitor
tipo: padrao
nome: Visitor
aliases:
  - Visitor
  - Visitante
descricao: Separa um algoritmo da estrutura de objetos sobre a qual opera, permitindo adicionar novas operações sem alterar as classes dos elementos.
fonte_ids:
  - gof_visitor
  - book_gof
exemplo: Um visitor de AST calcula métricas e outro formata o código, ambos sobre a mesma árvore.
quando_usar:
  - Percorrer árvores sintáticas e estruturas compostas
  - Várias operações independentes sobre uma hierarquia estável
  - Compiladores, serializadores e validadores
quando_evitar:
  - Hierarquias que ganham novas classes com frequência (cada uma exige alterar todos os visitors)
  - Linguagens com pattern matching, que resolvem de forma mais direta
status: revisado
publico: false
fontes:
  - id: gof_visitor
    tipo: artigo
    titulo: Visitor (refactoring.guru)
    link: https://refactoring.guru/design-patterns/visitor
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
  - "[[seguranca_codigo|Segurança de código]]"
familia: gof
subfamilia: Comportamental
problema: Uma hierarquia estável de classes precisa receber operações novas com frequência, e inserir cada operação em todas as classes as incha.
tradeoffs:
  - "Ganha: novas operações sem tocar nos elementos; paga: adicionar um novo tipo de elemento obriga a mudar todos os visitors"
  - "Ganha: operação coesa em um lugar; paga: quebra parcial do encapsulamento e dupla despacho"
consequencias:
  - Pattern matching e sealed types substituem o Visitor em linguagens modernas
  - Ferramentas de AST (ESLint, compiladores) usam visitors
padroesRelacionados:
  - "[[composite|Composite (GoF)]]"
  - "[[interpreter|Interpreter (GoF)]]"
  - "[[iterator|Iterator (GoF)]]"
casosDeUso:
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:archunit
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Visitor
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
