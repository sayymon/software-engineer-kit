---
id: command
tipo: padrao
nome: Command
aliases:
  - Command
  - Comando
descricao: Encapsula um pedido como um objeto, permitindo parametrizar clientes, enfileirar, registrar e desfazer operações.
fonte_ids:
  - gof_command
  - book_gof
exemplo: Cada ação do Redux é um objeto {type, payload} que o reducer executa, o que permite registrar e reproduzir o histórico.
quando_usar:
  - Desfazer e refazer, filas de tarefas e macros
  - Registro e reprodução de ações (event log)
  - Desacoplar a interface do executor
quando_evitar:
  - Chamadas simples sem necessidade de histórico ou fila
  - Quando funções de primeira classe resolvem sem objetos de comando
status: revisado
publico: false
fontes:
  - id: gof_command
    tipo: artigo
    titulo: Command (refactoring.guru)
    link: https://refactoring.guru/design-patterns/command
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[estado_dados_cliente|Estado e dados no cliente]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
familia: gof
subfamilia: Comportamental
problema: Quem dispara uma ação não deve conhecer quem a executa, e ações precisam ser filas, histórico ou desfazer.
tradeoffs:
  - "Ganha: ações como dados, com fila, log e undo; paga: uma classe ou estrutura por comando"
  - "Ganha: desacoplamento entre emissor e executor; paga: aumenta o número de objetos pequenos"
consequencias:
  - Actions do Redux e comandos do CQRS são Commands
  - Job queues serializam comandos para execução assíncrona
padroesRelacionados:
  - "[[chain_of_responsibility|Chain of Responsibility (GoF)]]"
  - "[[cqrs|CQRS]]"
  - "[[mediator|Mediator (GoF)]]"
  - "[[memento|Memento (GoF)]]"
  - "[[observer|Observer (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - tabela:redux-toolkit
  - "[[bullmq|BullMQ]]"
  - tabela:celery
  - "[[temporal|Temporal]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Command
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
