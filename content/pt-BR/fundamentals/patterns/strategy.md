---
id: strategy
tipo: padrao
nome: Strategy
aliases:
  - Strategy
  - Estratégia
descricao: Define uma família de algoritmos intercambiáveis, encapsulados em classes ou funções, e permite escolher qual usar em tempo de execução.
fonte_ids:
  - gof_strategy
  - book_gof
exemplo: O checkout recebe uma EstrategiaDeFrete (Correios, Transportadora, Retirada) e calcula o valor sem condicionais.
quando_usar:
  - Algoritmos alternativos escolhidos por contexto
  - Eliminar condicionais longos sobre tipo ou configuração
  - Injetar políticas (preço, retry, autenticação) via DI
quando_evitar:
  - Poucas variantes estáveis, em que um if simples basta
  - Linguagens em que passar uma função resolve sem classes
status: revisado
publico: false
fontes:
  - id: gof_strategy
    tipo: artigo
    titulo: Strategy (refactoring.guru)
    link: https://refactoring.guru/design-patterns/strategy
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
  - "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
familia: gof
subfamilia: Comportamental
problema: Um comportamento com várias variantes (cálculo de frete, ordenação, autenticação) vira uma cadeia de condicionais difícil de estender.
tradeoffs:
  - "Ganha: algoritmos trocáveis e testáveis isoladamente; paga: o cliente precisa conhecer as estratégias disponíveis"
  - "Ganha: abre-fecha sem alterar o contexto; paga: mais objetos ou funções para manter"
consequencias:
  - Providers de autenticação do Passport e do Spring Security são estratégias
  - Funções de primeira classe reduzem o padrão a passar uma função
padroesRelacionados:
  - "[[bridge|Bridge (GoF)]]"
  - "[[command|Command (GoF)]]"
  - "[[decorator|Decorator (GoF)]]"
  - "[[interpreter|Interpreter (GoF)]]"
  - "[[state|State (GoF)]]"
  - "[[template_method|Template Method (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[operacao_de_loja_virtual|Operação de loja virtual]]"
variacoes: []
ferramentas:
  - "[[spring_security|Spring Security]]"
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - "[[express|Express]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Strategy
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
