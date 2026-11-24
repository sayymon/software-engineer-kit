---
id: prototype
tipo: padrao
nome: Prototype
aliases:
  - Prototype
descricao: Cria novos objetos copiando (clonando) uma instância existente, sem depender da classe concreta.
fonte_ids:
  - gof_prototype
  - book_gof
exemplo: Um editor gráfico duplica uma forma configurada com cor e estilo clonando-a em vez de montá-la de novo.
quando_usar:
  - Objetos caros de inicializar, copiados a partir de um modelo
  - Variações de uma configuração-base
  - Quando o tipo concreto só é conhecido em tempo de execução
quando_evitar:
  - Objetos com referências circulares ou recursos externos difíceis de clonar
  - Objetos baratos de criar
status: revisado
publico: false
fontes:
  - id: gof_prototype
    tipo: artigo
    titulo: Prototype (refactoring.guru)
    link: https://refactoring.guru/design-patterns/prototype
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
familia: gof
subfamilia: Criacional
problema: Criar um objeto do zero é caro ou exige conhecer detalhes internos, e o cliente só tem uma referência à interface.
tradeoffs:
  - "Ganha: cópia sem acoplar à classe concreta; paga: clonagem profunda correta pode ser complexa"
  - "Ganha: evita inicializações caras; paga: exige cuidado com estado compartilhado"
consequencias:
  - Linguagens como JavaScript têm o mecanismo de protótipo nativo
  - Copy-on-write e structuredClone cobrem casos comuns
padroesRelacionados:
  - "[[abstract_factory|Abstract Factory (GoF)]]"
  - "[[builder|Builder (GoF)]]"
  - "[[factory_method|Factory Method (GoF)]]"
  - "[[flyweight|Flyweight (GoF)]]"
  - "[[memento|Memento (GoF)]]"
  - "[[singleton|Singleton (GoF)]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes: []
ferramentas:
  - "[[react|React]]"
  - "[[svelte|Svelte]]"
  - "[[zustand|Zustand]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Prototype
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
