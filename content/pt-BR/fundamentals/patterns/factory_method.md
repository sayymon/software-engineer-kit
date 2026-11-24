---
id: factory_method
tipo: padrao
nome: Factory Method
aliases:
  - Factory Method
descricao: Define um método para criar objetos e deixa as subclasses (ou a configuração) decidirem qual classe concreta instanciar.
fonte_ids:
  - gof_factory_method
  - book_gof
exemplo: Uma classe Logística implementa criarTransporte() devolvendo Caminhão e outra devolve Navio.
quando_usar:
  - Frameworks que permitem estender a criação de componentes
  - Escolha do tipo concreto por configuração ou contexto
  - Isolar a criação para facilitar testes
quando_evitar:
  - Quando há um único tipo concreto estável
  - Quando uma função fábrica simples resolve sem hierarquia de classes
status: revisado
publico: false
fontes:
  - id: gof_factory_method
    tipo: artigo
    titulo: Factory Method (refactoring.guru)
    link: https://refactoring.guru/design-patterns/factory-method
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
problema: O código precisa criar objetos cujo tipo concreto só se conhece em contexto, e instanciar com new espalha esse acoplamento.
tradeoffs:
  - "Ganha: desacoplamento do tipo concreto; paga: uma hierarquia extra de criadores"
  - "Ganha: extensão sem alterar o código existente; paga: mais classes para casos simples"
consequencias:
  - Em injeção de dependência, o contêiner assume o papel da fábrica
  - A variação com parâmetro (simple factory) é comum e mais enxuta
padroesRelacionados:
  - "[[abstract_factory|Abstract Factory (GoF)]]"
  - "[[builder|Builder (GoF)]]"
  - "[[prototype|Prototype (GoF)]]"
  - "[[template_method|Template Method (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - "[[django|Django]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Factory Method
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
