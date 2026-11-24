---
id: memento
tipo: padrao
nome: Memento
aliases:
  - Memento
  - Lembrança
descricao: Captura e externaliza o estado interno de um objeto, sem violar o encapsulamento, para restaurá-lo depois.
fonte_ids:
  - gof_memento
  - book_gof
exemplo: Um editor guarda um snapshot do documento a cada edição e o restaura ao desfazer.
quando_usar:
  - Desfazer e refazer em editores
  - Checkpoints e snapshots de estado
  - Transações com rollback local
quando_evitar:
  - Estados muito grandes que tornam os snapshots caros
  - Quando o histórico de eventos permite reconstrução (Event Sourcing)
status: revisado
publico: false
fontes:
  - id: gof_memento
    tipo: artigo
    titulo: Memento (refactoring.guru)
    link: https://refactoring.guru/design-patterns/memento
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[estado_dados_cliente|Estado e dados no cliente]]"
familia: gof
subfamilia: Comportamental
problema: É preciso desfazer ou voltar a um estado anterior sem expor os detalhes internos do objeto.
tradeoffs:
  - "Ganha: undo sem quebrar o encapsulamento; paga: consumo de memória proporcional ao histórico"
  - "Ganha: restauração simples; paga: snapshots frequentes têm custo de armazenamento"
consequencias:
  - Time travel debugging do Redux é uma aplicação
  - Snapshots de Event Sourcing seguem a mesma ideia
padroesRelacionados:
  - "[[command|Command (GoF)]]"
  - "[[event_sourcing|Event Sourcing]]"
  - "[[prototype|Prototype (GoF)]]"
  - "[[state|State (GoF)]]"
casosDeUso:
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes: []
ferramentas:
  - tabela:redux-toolkit
  - "[[zustand|Zustand]]"
  - tabela:mobx
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Memento
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
