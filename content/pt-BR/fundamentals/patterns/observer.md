---
id: observer
tipo: padrao
nome: Observer
aliases:
  - Observer
  - Observador
  - Publish-Subscribe local
descricao: "Define uma dependência um-para-muitos: quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente."
fonte_ids:
  - gof_observer
  - book_gof
exemplo: Um RxJS Observable emite valores e cada subscriber atualiza sua parte da tela.
quando_usar:
  - Interfaces reativas e atualização de views
  - Eventos de domínio dentro de um processo
  - Programação reativa com fluxos de dados
quando_evitar:
  - Dependências simples e diretas
  - Cascatas de notificações difíceis de rastrear e de controlar ordem
status: revisado
publico: false
fontes:
  - id: gof_observer
    tipo: artigo
    titulo: Observer (refactoring.guru)
    link: https://refactoring.guru/design-patterns/observer
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
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
familia: gof
subfamilia: Comportamental
problema: Vários objetos precisam reagir às mudanças de outro sem que ele os conheça de forma fixa.
tradeoffs:
  - "Ganha: baixo acoplamento entre fonte e observadores; paga: ordem de notificação e vazamentos de assinatura exigem cuidado"
  - "Ganha: extensibilidade; paga: atualizações em cascata podem gerar loops difíceis de depurar"
consequencias:
  - Sempre cancele a assinatura para evitar vazamento de memória
  - É a versão em processo do Publish-Subscribe
padroesRelacionados:
  - "[[arquitetura_orientada_a_eventos|Arquitetura Orientada a Eventos]]"
  - "[[chain_of_responsibility|Chain of Responsibility (GoF)]]"
  - "[[command|Command (GoF)]]"
  - "[[iterator|Iterator (GoF)]]"
  - "[[mediator|Mediator (GoF)]]"
  - "[[publish_subscribe|Publish-Subscribe]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - "[[rxjs|RxJS]]"
  - tabela:mobx
  - "[[zustand|Zustand]]"
  - "[[angular|Angular]]"
  - "[[svelte|Svelte]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Observer
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
