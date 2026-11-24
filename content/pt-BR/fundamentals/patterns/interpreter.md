---
id: interpreter
tipo: padrao
nome: Interpreter
aliases:
  - Interpreter
  - Interpretador
descricao: Define uma representação para a gramática de uma linguagem simples e um interpretador que avalia sentenças nessa linguagem.
fonte_ids:
  - gof_interpreter
  - book_gof
exemplo: Um filtro de busca como idade > 30 E cidade = "SP" vira uma árvore de expressões avaliada sobre cada registro.
quando_usar:
  - Linguagens de regras, filtros e expressões simples
  - DSLs internas de pequena gramática
  - Avaliação de consultas ou expressões configuráveis
quando_evitar:
  - Gramáticas complexas, em que geradores de parser são mais adequados
  - Quando regras simples cabem em configuração declarativa
status: revisado
publico: false
fontes:
  - id: gof_interpreter
    tipo: artigo
    titulo: Interpreter pattern (Wikipedia)
    link: https://en.wikipedia.org/wiki/Interpreter_pattern
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[validacao_schemas|Validação e schemas]]"
familia: gof
subfamilia: Comportamental
problema: Problemas recorrentes que podem ser descritos por uma pequena linguagem (regras, filtros, expressões) ficam rígidos se codificados à mão.
tradeoffs:
  - "Ganha: gramática extensível por classes; paga: cada regra vira uma classe e gramáticas grandes ficam difíceis de manter"
  - "Ganha: avaliação desacoplada da sintaxe; paga: desempenho inferior a soluções compiladas"
consequencias:
  - Expressões regulares e motores de regras são variantes do padrão
  - Composite costuma representar a árvore sintática
padroesRelacionados:
  - "[[composite|Composite (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
  - "[[visitor|Visitor (GoF)]]"
casosDeUso:
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[analise_de_dados_e_bi|Análise de dados e BI]]"
variacoes: []
ferramentas:
  - "[[zod|Zod]]"
  - "[[pydantic|Pydantic]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Interpreter
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
