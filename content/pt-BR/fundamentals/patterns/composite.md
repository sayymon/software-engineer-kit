---
id: composite
tipo: padrao
nome: Composite
aliases:
  - Composite
descricao: Compõe objetos em estruturas de árvore e permite tratar objetos individuais e composições da mesma forma, por uma interface comum.
fonte_ids:
  - gof_composite
  - book_gof
exemplo: Em uma árvore de componentes React, um componente contém outros componentes e o render é chamado recursivamente.
quando_usar:
  - Estruturas hierárquicas como árvores de UI, menus e arquivos
  - Operações recursivas sobre o todo e as partes
  - Quando o cliente deve ignorar a diferença entre folha e composição
quando_evitar:
  - Estruturas planas sem hierarquia
  - Quando as folhas e os compostos têm interfaces muito diferentes
status: revisado
publico: false
fontes:
  - id: gof_composite
    tipo: artigo
    titulo: Composite (refactoring.guru)
    link: https://refactoring.guru/design-patterns/composite
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
  - "[[ui_componentes_web|UI e componentes web]]"
familia: gof
subfamilia: Estrutural
problema: O cliente precisa operar sobre hierarquias parte-todo (pastas e arquivos, menus, componentes de UI) sem distinguir folha de composto.
tradeoffs:
  - "Ganha: código cliente uniforme e recursivo; paga: interface comum pode ficar genérica demais"
  - "Ganha: fácil adicionar novos tipos de nós; paga: restringir tipos de filhos exige verificações adicionais"
consequencias:
  - Árvores de componentes em React, Angular e Svelte seguem esse padrão
  - Combina com Visitor e Iterator para percorrer a estrutura
padroesRelacionados:
  - "[[decorator|Decorator (GoF)]]"
  - "[[flyweight|Flyweight (GoF)]]"
  - "[[interpreter|Interpreter (GoF)]]"
  - "[[iterator|Iterator (GoF)]]"
  - "[[visitor|Visitor (GoF)]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[design_de_interfaces_e_prototipo|Design de interfaces e protótipo]]"
variacoes: []
ferramentas:
  - "[[react|React]]"
  - "[[angular|Angular]]"
  - "[[svelte|Svelte]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Composite
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
