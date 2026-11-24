---
id: template_method
tipo: padrao
nome: Template Method
aliases:
  - Template Method
  - Método Template
descricao: Define o esqueleto de um algoritmo em uma classe base e deixa as subclasses sobrescreverem passos específicos sem mudar a estrutura geral.
fonte_ids:
  - gof_template_method
  - book_gof
exemplo: Uma classe ImportadorBase define ler, validar e gravar, e cada subclasse implementa o formato (CSV, JSON).
quando_usar:
  - Fluxos com passos fixos e pontos de extensão
  - Frameworks que chamam o código do usuário (Hollywood Principle)
  - Remover duplicação entre variantes de um processo
quando_evitar:
  - Quando a composição (Strategy) entrega a mesma flexibilidade com menos acoplamento
  - Hierarquias profundas que ficam frágeis
status: revisado
publico: false
fontes:
  - id: gof_template_method
    tipo: artigo
    titulo: Template Method (refactoring.guru)
    link: https://refactoring.guru/design-patterns/template-method
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
  - "[[frameworks_testes|Frameworks de testes]]"
familia: gof
subfamilia: Comportamental
problema: Vários algoritmos compartilham a mesma estrutura e diferem em alguns passos, e copiar o esqueleto espalha duplicação.
tradeoffs:
  - "Ganha: reuso do esqueleto e consistência do fluxo; paga: herança acopla subclasses à classe base"
  - "Ganha: pontos de extensão claros; paga: dificuldade de entender o fluxo quando há muitos ganchos"
consequencias:
  - Hooks de ciclo de vida de frameworks seguem o padrão
  - Prefira composição quando a hierarquia crescer
padroesRelacionados:
  - "[[decorator|Decorator (GoF)]]"
  - "[[factory_method|Factory Method (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[engenharia_de_dados_e_etl|Engenharia de dados e ETL]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[django|Django]]"
  - "[[laravel|Laravel]]"
  - "[[asp_net_core|ASP.NET Core]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Template Method
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
