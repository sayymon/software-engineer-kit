---
id: mediator
tipo: padrao
nome: Mediator
aliases:
  - Mediator
  - Mediador
descricao: Centraliza a comunicação entre objetos em um mediador, que evita referências diretas entre eles e reduz o acoplamento.
fonte_ids:
  - gof_mediator
  - book_gof
exemplo: Em um formulário, o mediador habilita o botão Enviar quando todos os campos ficam válidos, e os campos não se referenciam.
quando_usar:
  - Interações complexas entre muitos componentes (formulários, chat, controle de tráfego)
  - Reduzir dependências diretas entre classes
  - Centralizar regras de coordenação
quando_evitar:
  - Poucos objetos com interações simples
  - Quando o mediador vira um deus-objeto
status: revisado
publico: false
fontes:
  - id: gof_mediator
    tipo: artigo
    titulo: Mediator (refactoring.guru)
    link: https://refactoring.guru/design-patterns/mediator
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[estado_dados_cliente|Estado e dados no cliente]]"
familia: gof
subfamilia: Comportamental
problema: Objetos que se referenciam entre si formam uma malha de dependências difícil de entender e de alterar.
tradeoffs:
  - "Ganha: componentes independentes e reutilizáveis; paga: o mediador concentra lógica e pode ficar grande"
  - "Ganha: coordenação em um único lugar; paga: ponto único de acoplamento do fluxo"
consequencias:
  - Bibliotecas de mediator em CQRS despacham comandos a handlers
  - Controladores e barramentos de eventos têm esse papel
padroesRelacionados:
  - "[[chain_of_responsibility|Chain of Responsibility (GoF)]]"
  - "[[command|Command (GoF)]]"
  - "[[facade|Facade (GoF)]]"
  - "[[observer|Observer (GoF)]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - tabela:redux-toolkit
  - "[[zustand|Zustand]]"
  - "[[angular|Angular]]"
  - tabela:masstransit
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Mediator
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
