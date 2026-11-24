---
id: state
tipo: padrao
nome: State
aliases:
  - State
  - Estado
descricao: Permite que um objeto altere seu comportamento quando seu estado interno muda, delegando o comportamento a objetos que representam cada estado.
fonte_ids:
  - gof_state
  - book_gof
exemplo: Um Pedido muda de Criado para Pago, Enviado e Entregue, e cada estado aceita apenas as transições válidas.
quando_usar:
  - Objetos com ciclo de vida e transições (pedido, pagamento, conexão)
  - Máquinas de estados finitos
  - Substituir ifs e switches repetidos por estado
quando_evitar:
  - Poucos estados com transições triviais
  - Quando uma tabela de transições declarativa expressa melhor
status: revisado
publico: false
fontes:
  - id: gof_state
    tipo: artigo
    titulo: State (refactoring.guru)
    link: https://refactoring.guru/design-patterns/state
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
  - "[[estado_dados_cliente|Estado e dados no cliente]]"
familia: gof
subfamilia: Comportamental
problema: Condicionais gigantes sobre o estado de um objeto espalham a mesma lógica por vários métodos e dificultam novos estados.
tradeoffs:
  - "Ganha: cada estado em uma classe e transições explícitas; paga: mais classes para fluxos pequenos"
  - "Ganha: novos estados sem alterar os existentes; paga: transições espalhadas podem ficar difíceis de ver em conjunto"
consequencias:
  - Orquestradores de workflow aplicam máquinas de estado em escala de serviços
  - Sagas são máquinas de estado distribuídas
padroesRelacionados:
  - "[[memento|Memento (GoF)]]"
  - "[[saga_orquestrada|SAGA Orquestrada]]"
  - "[[strategy|Strategy (GoF)]]"
casosDeUso:
  - "[[automacao_de_processos|Automação de processos]]"
  - "[[pagamentos_e_cobranca|Pagamentos e cobrança]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - tabela:aws-step-functions
  - "[[temporal|Temporal]]"
  - tabela:camunda
  - tabela:redux-toolkit
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# State
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
