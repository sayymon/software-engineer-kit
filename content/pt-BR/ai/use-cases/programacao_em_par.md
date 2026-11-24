---
id: programacao_em_par
tipo: caso-de-uso
nome: Programação em par
aliases:
  - programacao-par
descricao: Trabalhar com uma IA como par de programação durante o desenvolvimento.
funcionalidadesNecessarias:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[agente_codigo|Agente de código]]"
  - "[[ide_ia|IDE com IA]]"
ferramentasRecomendadas:
  - "[[claude_code|Claude-Code]]"
  - "[[cursor|Cursor]]"
  - "[[github_copilot|GitHub Copilot]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
faixasPadrao:
  maisBarata:
    - tabela:opencode
    - tabela:aider
    - tabela:cline
  custoBeneficio:
    - "[[github_copilot|GitHub Copilot]]"
    - "[[cursor|Cursor]]"
    - "[[kiro_ide|Kiro-IDE]]"
  qualidadeMaxima:
    - "[[claude_code|Claude-Code]]"
    - tabela:openai-codex
    - tabela:gemini-cli
variacoes:
  - id: par-ide-autocomplete
    nome: IDE com autocomplete
    descricao: Sugestões em linha e chat dentro do editor durante a escrita.
    funcionalidades:
      - "[[autocomplete_de_codigo|Autocomplete de código]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:zed
      - tabela:continue-dev
      - "[[visual_studio_code|Visual Studio Code]]"
    custoBeneficio:
      - "[[cursor|Cursor]]"
      - "[[github_copilot|GitHub Copilot]]"
      - tabela:windsurf
    qualidadeMaxima:
      - "[[kiro_ide|Kiro-IDE]]"
      - tabela:jetbrains-junie
      - tabela:google-antigravity
    justificativaFerramentas: "Muda Modo de interação para sugestão em linha durante a digitação: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Editor com extensão ou IDE com IA
        fonte: editorial
      - chave: Escala típica
        valor: Uma pessoa por sessão
        fonte: editorial
      - chave: Modo de interação
        valor: Sugestão em linha durante a digitação
        fonte: editorial
  - id: par-agente-terminal
    nome: Agente no terminal
    descricao: Agente que lê o repositório, edita arquivos e roda comandos com revisão humana.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Terminal no repositório local
        fonte: editorial
      - chave: Escala típica
        valor: Uma pessoa por tarefa
        fonte: editorial
      - chave: Modo de interação
        valor: Agente com revisão humana de cada edição
        fonte: editorial
  - id: par-feature-do-zero
    nome: Feature nova do zero
    descricao: Da especificação ao teste, com plano, código e verificação.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:opencode
      - tabela:aider
      - tabela:continue-dev
    custoBeneficio:
      - "[[kiro_ide|Kiro-IDE]]"
      - "[[github_copilot|GitHub Copilot]]"
      - tabela:windsurf
    qualidadeMaxima:
      - "[[claude_code|Claude-Code]]"
      - tabela:google-antigravity
      - tabela:jetbrains-junie
    justificativaFerramentas: "Muda Modo de interação para especificação, plano, código e teste em sequência: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Terminal ou IDE com agente e modo de planejamento
        fonte: editorial
      - chave: Escala típica
        valor: Uma feature por sessão
        fonte: editorial
      - chave: Modo de interação
        valor: Especificação, plano, código e teste em sequência
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Programação em par
## 📝 Descrição
Trabalhar com uma IA como par de programação durante o desenvolvimento.
## ⏰ Quando aplicar
- Implementação de funcionalidades
- Depuração e explicação de código
## 🧩 Funcionalidades necessárias
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[claude_code|Claude-Code]] - Agente de terminal que edita o repositório e roda testes
- [[cursor|Cursor]] - IDE com edição em múltiplos arquivos e modelos selecionáveis
- [[github_copilot|GitHub Copilot]] - Integração nativa com GitHub e editores
- [[claude_opus_5_5|Claude Opus 5.5]] - Raciocínio forte para mudanças complexas
- [[gpt_5_5|GPT-5.5]] - Alternativa sólida para código com custo menor
## 🧬 Variações
- **IDE com autocomplete** (`par-ide-autocomplete`): Sugestões em linha e chat dentro do editor durante a escrita. Funcionalidades: [[autocomplete_de_codigo|Autocomplete de código]], [[geracao_de_codigo|Geração de código]]. Mais barata: Zed, Continue, [[visual_studio_code|Visual Studio Code]]. Custo-benefício: [[cursor|Cursor]], [[github_copilot|GitHub Copilot]], Windsurf. Qualidade máxima: [[kiro_ide|Kiro-IDE]], JetBrains Junie, Google Antigravity. Por que difere do caso: Muda Modo de interação para sugestão em linha durante a digitação: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Editor com extensão ou IDE com IA; Escala típica: Uma pessoa por sessão; Modo de interação: Sugestão em linha durante a digitação.
- **Agente no terminal** (`par-agente-terminal`): Agente que lê o repositório, edita arquivos e roda comandos com revisão humana. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[tool_use_funcionalidade|Tool use]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Terminal no repositório local; Escala típica: Uma pessoa por tarefa; Modo de interação: Agente com revisão humana de cada edição.
- **Feature nova do zero** (`par-feature-do-zero`): Da especificação ao teste, com plano, código e verificação. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]], [[contexto_longo|Contexto longo]]. Mais barata: OpenCode, Aider, Continue. Custo-benefício: [[kiro_ide|Kiro-IDE]], [[github_copilot|GitHub Copilot]], Windsurf. Qualidade máxima: [[claude_code|Claude-Code]], Google Antigravity, JetBrains Junie. Por que difere do caso: Muda Modo de interação para especificação, plano, código e teste em sequência: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Terminal ou IDE com agente e modo de planejamento; Escala típica: Uma feature por sessão; Modo de interação: Especificação, plano, código e teste em sequência.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** OpenCode, Aider, Cline
- **Custo-benefício:** [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]
- **Qualidade máxima:** [[claude_code|Claude-Code]], Codex CLI, Gemini CLI
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Ferramentas de código mudam rápido, e manter regras e contexto portáveis facilita trocar de agente.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
