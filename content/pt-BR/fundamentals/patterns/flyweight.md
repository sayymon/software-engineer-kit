---
id: flyweight
tipo: padrao
nome: Flyweight
aliases:
  - Flyweight
descricao: Compartilha partes comuns do estado entre muitos objetos para reduzir o uso de memória, separando estado intrínseco (compartilhado) de extrínseco (por contexto).
fonte_ids:
  - gof_flyweight
  - book_gof
exemplo: Um editor de texto guarda um objeto Glifo por caractere e o reutiliza em todas as posições, sem copiar a fonte.
quando_usar:
  - Grandes quantidades de objetos com estado repetido (caracteres, partículas, tiles)
  - Memória é o gargalo medido
  - Interning de strings e pools de objetos imutáveis
quando_evitar:
  - Quando o volume de objetos é pequeno
  - Quando o estado extrínseco é tão grande que anula o ganho
status: revisado
publico: false
fontes:
  - id: gof_flyweight
    tipo: artigo
    titulo: Flyweight (refactoring.guru)
    link: https://refactoring.guru/design-patterns/flyweight
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
subfamilia: Estrutural
problema: Milhares ou milhões de objetos similares consomem memória demais por duplicar dados idênticos.
tradeoffs:
  - "Ganha: economia de memória; paga: complexidade para separar estados e custo de lookup"
  - "Ganha: menos pressão no GC; paga: objetos compartilhados precisam ser imutáveis"
consequencias:
  - Pools de strings e de conexões são aplicações comuns
  - Só vale medir e aplicar quando o perfil de memória justificar
padroesRelacionados:
  - "[[composite|Composite (GoF)]]"
  - "[[prototype|Prototype (GoF)]]"
  - "[[singleton|Singleton (GoF)]]"
casosDeUso:
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
variacoes: []
ferramentas:
  - "[[react|React]]"
  - "[[svelte|Svelte]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Flyweight
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
