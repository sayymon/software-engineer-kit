---
id: estudos_e_carreira_pessoa_fisica
tipo: caso-de-uso
nome: Estudos e carreira (pessoa física)
aliases:
  - estudos-e-carreira-pessoa-fisica
descricao: Montar uma trilha de estudos em tecnologia com cursos, roadmaps, comunidade e uma base de notas própria.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[aprendizado_cursos|Aprendizado e cursos]]"
  - "[[roadmaps_aprendizado|Roadmaps e aprendizado]]"
  - "[[comunidade_perguntas_respostas|Comunidade e perguntas e respostas]]"
  - "[[estudo_base_conhecimento|Estudo e base de conhecimento]]"
  - "[[playgrounds_utilitarios_online|Playgrounds e utilitários online]]"
ferramentasRecomendadas:
  - "[[freecodecamp|freeCodeCamp]]"
  - "[[developer_roadmap|Developer Roadmap]]"
  - "[[stack_overflow|Stack Overflow]]"
  - "[[notebooklm|NotebookLM]]"
  - "[[obsidian|Obsidian (ferramenta)]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
segmentos:
  - educacao
nicho: aprendizado contínuo e transição de carreira
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
faixasPadrao:
  maisBarata:
    - "[[freecodecamp|freeCodeCamp]]"
    - tabela:the-odin-project
    - tabela:cs50
  custoBeneficio:
    - "[[udemy|Udemy (ferramenta)]]"
    - tabela:scrimba
    - tabela:exercism
  qualidadeMaxima:
    - "[[frontend_masters|Frontend Masters]]"
    - tabela:oreilly
    - tabela:deeplearning-ai
variacoes:
  - id: estudo-aprender-programar
    nome: Aprender a programar
    descricao: Trilhas gratuitas e roteiros para quem começa.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa física estudando
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Algumas horas de estudo por semana
        fonte: editorial
  - id: estudo-transicao-carreira
    nome: Transição de carreira
    descricao: Mapa de habilidades, comunidade e base de notas de estudo.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
    herdaFerramentas: false
    maisBarata:
      - "[[developer_roadmap|Developer Roadmap]]"
      - tabela:coding-interview-university
      - tabela:the-algorithms
    custoBeneficio:
      - "[[project_based_learning|Project Based Learning]]"
      - tabela:build-your-own-x
      - tabela:30-seconds-of-code
    qualidadeMaxima:
      - "[[javascript_algorithms|JavaScript Algorithms]]"
      - tabela:you-dont-know-js
      - tabela:33-js-concepts
    justificativaFerramentas: "Muda Volume típico para dezenas de projetos e vagas no ano: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pessoa física estudando
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de projetos e vagas no ano
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Estudos e carreira (pessoa física)
## 📝 Descrição
Montar uma trilha de estudos em tecnologia com cursos, roadmaps, comunidade e uma base de notas própria.
## ⏰ Quando aplicar
- Aprender uma linguagem ou área nova
- Preparar entrevistas e portfólio
## 🧱 Pilha por categoria
- [[aprendizado_cursos|Aprendizado e cursos]] - conteúdo estruturado
- [[roadmaps_aprendizado|Roadmaps e aprendizado]] - mapa do que estudar e em que ordem
- [[comunidade_perguntas_respostas|Comunidade e perguntas e respostas]] - tirar dúvidas e ver soluções
- [[estudo_base_conhecimento|Estudo e base de conhecimento]] - notas e resumos conectados
- [[playgrounds_utilitarios_online|Playgrounds e utilitários online]] - praticar sem instalar nada
## ✅ Recomendações
- [[freecodecamp|freeCodeCamp]] - currículo gratuito e prático
- [[developer_roadmap|Developer Roadmap]] - roadmaps visuais por carreira
- [[stack_overflow|Stack Overflow]] - perguntas e respostas técnicas
- [[notebooklm|NotebookLM]] - resumos e perguntas sobre o material estudado
- [[obsidian|Obsidian (ferramenta)]] - base de notas local em Markdown
## 🧬 Variações
- **Aprender a programar** (`estudo-aprender-programar`): Trilhas gratuitas e roteiros para quem começa. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa física estudando; Regulação aplicável: Nenhuma específica; Volume típico: Algumas horas de estudo por semana.
- **Transição de carreira** (`estudo-transicao-carreira`): Mapa de habilidades, comunidade e base de notas de estudo. Funcionalidades: [[busca_na_web|Busca na web]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]. Mais barata: [[developer_roadmap|Developer Roadmap]], Coding Interview University, The Algorithms (Python). Custo-benefício: [[project_based_learning|Project Based Learning]], Build Your Own X, 30 Seconds of Code. Qualidade máxima: [[javascript_algorithms|JavaScript Algorithms]], You Don't Know JS, 33 JS Concepts. Por que difere do caso: Muda Volume típico para dezenas de projetos e vagas no ano: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pessoa física estudando; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de projetos e vagas no ano.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[freecodecamp|freeCodeCamp]], The Odin Project, CS50
- **Custo-benefício:** [[udemy|Udemy (ferramenta)]], Scrimba, Exercism
- **Qualidade máxima:** [[frontend_masters|Frontend Masters]], O'Reilly Learning, DeepLearning.AI
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Quem estuda por conta própria tem orçamento curto, e a opção gratuita de boa qualidade vence.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
