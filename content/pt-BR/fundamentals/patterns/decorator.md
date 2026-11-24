---
id: decorator
tipo: padrao
nome: Decorator
aliases:
  - Decorator
descricao: Acrescenta responsabilidades a um objeto dinamicamente, envolvendo-o em wrappers que mantêm a mesma interface.
fonte_ids:
  - gof_decorator
  - book_gof
exemplo: Resilience4j decora uma função com CircuitBreaker, Retry e TimeLimiter em sequência.
quando_usar:
  - Adicionar comportamentos opcionais combináveis (cache, log, retry, métricas)
  - Estender sem alterar a classe original
  - Compor preocupações transversais em tempo de execução
quando_evitar:
  - Quando a ordem dos wrappers causa efeitos difíceis de prever
  - Quando uma configuração simples basta
status: revisado
publico: false
fontes:
  - id: gof_decorator
    tipo: artigo
    titulo: Decorator (refactoring.guru)
    link: https://refactoring.guru/design-patterns/decorator
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
subfamilia: Estrutural
problema: Estender comportamento por herança é rígido e gera combinatória de subclasses, e nem toda combinação é necessária em todo objeto.
tradeoffs:
  - "Ganha: composição flexível em vez de herança; paga: muitos objetos pequenos e pilhas de wrappers difíceis de depurar"
  - "Ganha: responsabilidade única por decorador; paga: ordem de empilhamento é significativa"
consequencias:
  - Decoradores de linguagem (TypeScript, Python) e anotações de AOP aplicam a ideia
  - Bibliotecas de resiliência encadeiam retry, circuit breaker e timeout como decoradores
padroesRelacionados:
  - "[[chain_of_responsibility|Chain of Responsibility (GoF)]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[composite|Composite (GoF)]]"
  - "[[proxy|Proxy (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
  - "[[template_method|Template Method (GoF)]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[revisao_de_codigo|Revisão de código]]"
variacoes: []
ferramentas:
  - tabela:resilience4j
  - tabela:nestjs
  - "[[spring_boot|Spring Boot]]"
  - "[[angular|Angular]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Decorator
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
