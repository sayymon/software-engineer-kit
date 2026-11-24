---
id: singleton
tipo: padrao
nome: Singleton
aliases:
  - Singleton
descricao: Garante que uma classe tenha uma única instância e fornece um ponto de acesso global a ela.
fonte_ids:
  - gof_singleton
  - book_gof
exemplo: Em Spring, os beans têm escopo singleton por padrão e uma única instância atende a aplicação.
quando_usar:
  - Recursos compartilhados únicos por processo
  - Objetos caros de criar que todos reutilizam
  - Contêineres de injeção de dependência gerenciam o escopo singleton
quando_evitar:
  - Quando o estado global dificulta testes e paralelismo
  - Quando uma instância injetada resolve sem acesso global
status: revisado
publico: false
fontes:
  - id: gof_singleton
    tipo: artigo
    titulo: Singleton (refactoring.guru)
    link: https://refactoring.guru/design-patterns/singleton
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
familia: gof
subfamilia: Criacional
problema: Certos recursos, como configuração, pool de conexões ou cache, precisam existir uma única vez no processo.
tradeoffs:
  - "Ganha: instância e acesso controlados; paga: estado global oculto que complica testes"
  - "Ganha: economia de recursos; paga: acoplamento e dificuldade em ambientes concorrentes ou com vários processos"
consequencias:
  - Prefira o escopo singleton do contêiner de DI ao Singleton clássico
  - Em ambientes distribuídos, singleton vale por processo, não por cluster
padroesRelacionados:
  - "[[abstract_factory|Abstract Factory (GoF)]]"
  - "[[facade|Facade (GoF)]]"
  - "[[flyweight|Flyweight (GoF)]]"
  - "[[prototype|Prototype (GoF)]]"
casosDeUso:
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - "[[asp_net_core|ASP.NET Core]]"
  - tabela:google-guice
  - tabela:dagger
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Singleton
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
