---
id: chain_of_responsibility
tipo: padrao
nome: Chain of Responsibility
aliases:
  - Chain of Responsibility
  - Cadeia de Responsabilidade
descricao: Passa um pedido por uma cadeia de handlers, e cada um decide processá-lo ou repassá-lo ao próximo.
fonte_ids:
  - gof_chain_of_responsibility
  - book_gof
exemplo: Uma requisição passa por middlewares de log, autenticação e validação antes de chegar ao controller.
quando_usar:
  - Pipelines de middleware HTTP e filtros de segurança
  - Validações e autorizações em etapas
  - Vários tratadores possíveis para o mesmo pedido
quando_evitar:
  - Quando um único tratador conhecido existe
  - Quando a ordem confusa dos handlers dificulta o rastreio de falhas
status: revisado
publico: false
fontes:
  - id: gof_chain_of_responsibility
    tipo: artigo
    titulo: Chain of Responsibility (refactoring.guru)
    link: https://refactoring.guru/design-patterns/chain-of-responsibility
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
problema: O remetente não deve conhecer qual objeto trata o pedido, e a sequência de tratadores precisa ser configurável.
tradeoffs:
  - "Ganha: desacoplamento entre emissor e tratadores; paga: sem garantia de que o pedido seja tratado"
  - "Ganha: cadeia reconfigurável; paga: depurar o caminho percorrido é mais difícil"
consequencias:
  - Middlewares do Express, filtros do Spring Security e pipelines do ASP.NET Core implementam o padrão
  - A ordem dos elos faz parte do contrato
padroesRelacionados:
  - "[[command|Command (GoF)]]"
  - "[[decorator|Decorator (GoF)]]"
  - "[[mediator|Mediator (GoF)]]"
  - "[[observer|Observer (GoF)]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
variacoes: []
ferramentas:
  - "[[express|Express]]"
  - "[[spring_security|Spring Security]]"
  - "[[asp_net_core|ASP.NET Core]]"
  - tabela:nestjs
  - "[[django|Django]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Chain of Responsibility
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
