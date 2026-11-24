---
id: facade
tipo: padrao
nome: Facade
aliases:
  - Facade
descricao: Oferece uma interface simples para um subsistema complexo, escondendo suas partes e dependências.
fonte_ids:
  - gof_facade
  - book_gof
exemplo: Um PedidoFacade.finalizar() coordena estoque, pagamento e notificação por trás de uma única chamada.
quando_usar:
  - Simplificar o uso de bibliotecas ou subsistemas complexos
  - Definir uma fronteira clara entre camadas
  - Reduzir dependências do cliente
quando_evitar:
  - Quando o cliente precisa de acesso fino às partes
  - Quando a fachada vira um deus-objeto com toda a lógica
status: revisado
publico: false
fontes:
  - id: gof_facade
    tipo: artigo
    titulo: Facade (refactoring.guru)
    link: https://refactoring.guru/design-patterns/facade
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
  - "[[clientes_http_api|Clientes HTTP e API]]"
familia: gof
subfamilia: Estrutural
problema: O cliente precisa orquestrar muitas classes de um subsistema para tarefas comuns, e fica acoplado aos detalhes internos.
tradeoffs:
  - "Ganha: API simples e menos acoplamento; paga: risco de a fachada inchar e centralizar demais"
  - "Ganha: o subsistema evolui por trás da fachada; paga: funcionalidades avançadas podem ficar inacessíveis"
consequencias:
  - Serviços de aplicação em camadas e SDKs de alto nível são fachadas
  - Facades do Laravel dão acesso estático a serviços do contêiner
padroesRelacionados:
  - "[[adapter|Adapter (GoF)]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[mediator|Mediator (GoF)]]"
  - "[[singleton|Singleton (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[documentacao_de_software|Documentação de software]]"
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes: []
ferramentas:
  - "[[laravel|Laravel]]"
  - "[[spring_boot|Spring Boot]]"
  - tabela:retrofit
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Facade
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
