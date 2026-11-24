---
id: builder
tipo: padrao
nome: Builder
aliases:
  - Builder
descricao: Separa a construção de um objeto complexo da sua representação, permitindo montá-lo passo a passo com parâmetros opcionais legíveis.
fonte_ids:
  - gof_builder
  - book_gof
exemplo: Pizza.builder().tamanho(GRANDE).borda(CATUPIRY).extra("azeitona").build().
quando_usar:
  - Objetos com muitos parâmetros opcionais
  - Construção em etapas com validação ao final
  - Criar objetos imutáveis
quando_evitar:
  - Objetos simples com poucos parâmetros
  - Linguagens com argumentos nomeados e valores padrão, que já resolvem o problema
status: revisado
publico: false
fontes:
  - id: gof_builder
    tipo: artigo
    titulo: Builder (refactoring.guru)
    link: https://refactoring.guru/design-patterns/builder
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
  - "[[validacao_schemas|Validação e schemas]]"
familia: gof
subfamilia: Criacional
problema: Construtores com muitos parâmetros opcionais ficam ilegíveis e propensos a erros de ordem.
tradeoffs:
  - "Ganha: construção legível e objeto imutável; paga: classe builder extra para manter"
  - "Ganha: validação centralizada no build(); paga: erros de campo obrigatório só aparecem em tempo de execução, se não houver builder tipado"
consequencias:
  - Anotações ou geradores (como Lombok no Java) eliminam o boilerplate do builder
  - Builders encadeados formam DSLs fluentes
padroesRelacionados:
  - "[[abstract_factory|Abstract Factory (GoF)]]"
  - "[[factory_method|Factory Method (GoF)]]"
  - "[[prototype|Prototype (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[zod|Zod]]"
  - "[[pydantic|Pydantic]]"
  - tabela:lombok
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Builder
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
