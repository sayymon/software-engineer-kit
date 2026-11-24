---
id: bridge
tipo: padrao
nome: Bridge
aliases:
  - Bridge
descricao: Separa uma abstração da sua implementação em duas hierarquias independentes, que podem variar separadamente.
fonte_ids:
  - gof_bridge
  - book_gof
exemplo: Controle remoto (abstração) delega a TV ou Rádio (implementação) por uma interface comum de dispositivo.
quando_usar:
  - Duas dimensões independentes de variação
  - Trocar a implementação em tempo de execução
  - Evitar acoplamento permanente entre abstração e plataforma
quando_evitar:
  - Uma única dimensão de variação
  - Sistemas pequenos em que a indireção só complica
status: revisado
publico: false
fontes:
  - id: gof_bridge
    tipo: artigo
    titulo: Bridge (refactoring.guru)
    link: https://refactoring.guru/design-patterns/bridge
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_desktop|Frameworks de desktop]]"
  - "[[frameworks_mobile|Frameworks de mobile]]"
familia: gof
subfamilia: Estrutural
problema: Combinar duas dimensões de variação por herança (por exemplo, forma e renderizador) multiplica classes de forma explosiva.
tradeoffs:
  - "Ganha: hierarquias que evoluem separadamente; paga: desenho inicial mais abstrato"
  - "Ganha: menos classes que a herança combinatória; paga: mais indireção entre os objetos"
consequencias:
  - Em geral, o desenho com interfaces e composição já produz um Bridge naturalmente
  - Drivers de banco e de renderização são exemplos clássicos
padroesRelacionados:
  - "[[abstract_factory|Abstract Factory (GoF)]]"
  - "[[adapter|Adapter (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[angular|Angular]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Bridge
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
