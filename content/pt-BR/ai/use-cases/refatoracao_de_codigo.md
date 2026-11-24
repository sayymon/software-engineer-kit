---
id: refatoracao_de_codigo
tipo: caso-de-uso
nome: Refatoração de código
aliases:
  - refatoracao-codigo
descricao: Reestruturar código existente preservando o comportamento.
funcionalidadesNecessarias:
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[contexto_longo|Contexto longo]]"
categoriasRelacionadas:
  - "[[agente_codigo|Agente de código]]"
  - "[[ide_ia|IDE com IA]]"
ferramentasRecomendadas:
  - "[[claude_code|Claude-Code]]"
  - "[[cursor|Cursor]]"
  - "[[github_copilot|GitHub Copilot]]"
modelosRecomendados:
  - "[[claude_sonnet_5_5|Claude Sonnet 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
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
  - id: refator-renomear-extrair
    nome: Renomear e extrair em larga escala
    descricao: Mudanças mecânicas em muitos arquivos com compilação como verificação.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Qualquer linguagem com compilador ou analisador
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de arquivos
        fonte: editorial
      - chave: Verificação principal
        valor: Compilação e testes existentes
        fonte: editorial
  - id: refator-legado-testes
    nome: Legado sem testes
    descricao: Testes de caracterização antes de alterar o código antigo.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[contexto_longo|Contexto longo]]"
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
    justificativaFerramentas: "Muda Verificação principal para testes de caracterização antes da mudança: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem do sistema legado
        fonte: editorial
      - chave: Escala típica
        valor: Um módulo de cada vez
        fonte: editorial
      - chave: Verificação principal
        valor: Testes de caracterização antes da mudança
        fonte: editorial
  - id: refator-migrar-linguagem-framework
    nome: Migrar linguagem ou framework
    descricao: Conversão incremental com paridade de comportamento.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[contexto_longo|Contexto longo]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:aider
      - tabela:opencode
      - tabela:gemini-cli
    custoBeneficio:
      - "[[cursor|Cursor]]"
      - "[[kiro_ide|Kiro-IDE]]"
      - "[[github_copilot|GitHub Copilot]]"
    qualidadeMaxima:
      - "[[claude_code|Claude-Code]]"
      - tabela:openai-codex
      - tabela:google-antigravity
    justificativaFerramentas: "Muda Verificação principal para paridade de comportamento entre as versões: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem ou framework de origem e destino
        fonte: editorial
      - chave: Escala típica
        valor: Migração incremental por módulo
        fonte: editorial
      - chave: Verificação principal
        valor: Paridade de comportamento entre as versões
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Refatoração de código
## 📝 Descrição
Reestruturar código existente preservando o comportamento.
## ⏰ Quando aplicar
- Limpeza de dívida técnica
- Migração de padrões e bibliotecas
## 🧩 Funcionalidades necessárias
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
## ✅ Recomendações
- [[claude_code|Claude-Code]] - Edições em muitos arquivos com verificação por testes
- [[cursor|Cursor]] - Refatoração guiada dentro do editor
- [[github_copilot|GitHub Copilot]] - Sugestões e edições integradas ao fluxo de revisão
- [[claude_sonnet_5_5|Claude Sonnet 5.5]] - Qualidade alta em mudanças amplas com custo moderado
- [[gpt_5_5|GPT-5.5]] - Boa capacidade de edição estruturada
## 🧬 Variações
- **Renomear e extrair em larga escala** (`refator-renomear-extrair`): Mudanças mecânicas em muitos arquivos com compilação como verificação. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[geracao_de_codigo|Geração de código]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Qualquer linguagem com compilador ou analisador; Escala típica: Centenas de arquivos; Verificação principal: Compilação e testes existentes.
- **Legado sem testes** (`refator-legado-testes`): Testes de caracterização antes de alterar o código antigo. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[contexto_longo|Contexto longo]]. Mais barata: Zed, Continue, [[visual_studio_code|Visual Studio Code]]. Custo-benefício: [[cursor|Cursor]], [[github_copilot|GitHub Copilot]], Windsurf. Qualidade máxima: [[kiro_ide|Kiro-IDE]], JetBrains Junie, Google Antigravity. Por que difere do caso: Muda Verificação principal para testes de caracterização antes da mudança: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem do sistema legado; Escala típica: Um módulo de cada vez; Verificação principal: Testes de caracterização antes da mudança.
- **Migrar linguagem ou framework** (`refator-migrar-linguagem-framework`): Conversão incremental com paridade de comportamento. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[contexto_longo|Contexto longo]], [[raciocinio|Raciocínio]]. Mais barata: Aider, OpenCode, Gemini CLI. Custo-benefício: [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]], [[github_copilot|GitHub Copilot]]. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, Google Antigravity. Por que difere do caso: Muda Verificação principal para paridade de comportamento entre as versões: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem ou framework de origem e destino; Escala típica: Migração incremental por módulo; Verificação principal: Paridade de comportamento entre as versões.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** OpenCode, Aider, Cline
- **Custo-benefício:** [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]
- **Qualidade máxima:** [[claude_code|Claude-Code]], Codex CLI, Gemini CLI
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Refatorações geram muitas chamadas, então o gasto total de tokens e tempo conduz o desempate.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
