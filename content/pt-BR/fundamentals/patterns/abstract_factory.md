---
id: abstract_factory
tipo: padrao
nome: Abstract Factory
aliases:
  - Abstract Factory
descricao: Fornece uma interface para criar famílias de objetos relacionados sem especificar suas classes concretas. Trocar a fábrica troca a família inteira de produtos.
fonte_ids:
  - gof_abstract_factory
  - book_gof
exemplo: Uma fábrica de UI cria Botão e Checkbox do tema escuro ou do claro, e o cliente só depende das interfaces.
quando_usar:
  - Famílias de produtos que devem ser usadas em conjunto
  - Suporte a vários temas, plataformas ou provedores trocáveis
  - Quando o cliente não deve conhecer as implementações
quando_evitar:
  - Quando existe um único produto, e Factory Method basta
  - Quando a família de produtos muda com frequência (cada novo produto altera todas as fábricas)
status: revisado
publico: false
fontes:
  - id: gof_abstract_factory
    tipo: artigo
    titulo: Abstract Factory (refactoring.guru)
    link: https://refactoring.guru/design-patterns/abstract-factory
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
  - "[[frameworks_backend|Frameworks de backend]]"
familia: gof
subfamilia: Criacional
problema: O código cliente precisa criar conjuntos de objetos que combinam entre si (por exemplo, widgets de um tema) sem acoplar-se às classes concretas.
tradeoffs:
  - "Ganha: consistência entre produtos de uma família; paga: muitas interfaces e classes"
  - "Ganha: troca de família em um ponto; paga: acrescentar um novo tipo de produto exige alterar todas as fábricas"
consequencias:
  - Em frameworks, a fábrica costuma ser configurada por injeção de dependência
  - Muitas vezes é substituída por funções fábrica em linguagens com funções de primeira classe
padroesRelacionados:
  - "[[bridge|Bridge (GoF)]]"
  - "[[builder|Builder (GoF)]]"
  - "[[factory_method|Factory Method (GoF)]]"
  - "[[prototype|Prototype (GoF)]]"
  - "[[singleton|Singleton (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[angular|Angular]]"
  - "[[react|React]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Abstract Factory
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
