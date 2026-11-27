---
id: revisao_de_codigo
tipo: caso-de-uso
nome: Revisão de código
aliases:
  - revisao-codigo
descricao: Revisar mudanças em busca de erros, riscos de segurança e melhorias.
funcionalidadesNecessarias:
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[geracao_de_codigo|Geração de código]]"
categoriasRelacionadas:
  - "[[agente_codigo|Agente de código]]"
  - "[[ide_ia|IDE com IA]]"
ferramentasRecomendadas:
  - "[[github_copilot|GitHub Copilot]]"
  - "[[claude_code|Claude-Code]]"
  - "[[cursor|Cursor]]"
modelosRecomendados:
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gpt_5_5|GPT-5.5]]"
criteriosDesempate:
  - privacidade-de-dados
  - custo
  - lock-in
criterioPadrao: privacidade-de-dados
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
    - "[[qodo_pr_agent|Qodo PR-Agent]]"
    - tabela:reviewdog
    - tabela:danger-js
  custoBeneficio:
    - "[[github_copilot|GitHub Copilot]]"
    - tabela:coderabbit
    - tabela:sourcery
  qualidadeMaxima:
    - "[[greptile|Greptile]]"
    - tabela:graphite
    - tabela:qodo-merge
variacoes:
  - id: revisao-pull-request
    nome: Revisão de pull request
    descricao: Comentários automáticos sobre bugs, estilo e riscos antes da revisão humana.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: App no repositório ou etapa do pipeline
        fonte: editorial
      - chave: Escala típica
        valor: Todo pull request
        fonte: editorial
      - chave: Foco da revisão
        valor: Bugs, estilo e riscos
        fonte: editorial
  - id: revisao-seguranca-codigo
    nome: Revisão de segurança
    descricao: Busca de vulnerabilidades e segredos expostos no diff.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gitleaks|Gitleaks (ferramenta)]]"
      - "[[trivy|Trivy]]"
      - tabela:semgrep-oss
    custoBeneficio:
      - "[[github_advanced_security|GitHub Advanced Security]]"
      - "[[snyk|Snyk]]"
      - "[[sonarqube|SonarQube]]"
    qualidadeMaxima:
      - "[[veracode|Veracode]]"
      - tabela:checkmarx
      - tabela:sonatype
    justificativaFerramentas: "Muda Foco da revisão para vulnerabilidades e segredos expostos no diff: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Etapa do pipeline com scanner
        fonte: editorial
      - chave: Escala típica
        valor: Todo pull request e varredura noturna
        fonte: editorial
      - chave: Foco da revisão
        valor: Vulnerabilidades e segredos expostos no diff
        fonte: editorial
  - id: revisao-qualidade-padroes
    nome: Qualidade e padrões do projeto
    descricao: Aderência a convenções, cobertura de testes e complexidade.
    funcionalidades:
      - "[[contexto_longo|Contexto longo]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:reviewdog
      - tabela:danger-js
      - tabela:semgrep-oss
    custoBeneficio:
      - "[[sonarqube|SonarQube]]"
      - tabela:coderabbit
      - tabela:sourcery
    qualidadeMaxima:
      - tabela:qodo-merge
      - "[[greptile|Greptile]]"
      - "[[snyk|Snyk]]"
    justificativaFerramentas: "Muda Foco da revisão para convenções, cobertura de testes e complexidade: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Etapa do pipeline com regras do projeto
        fonte: editorial
      - chave: Escala típica
        valor: Todo pull request
        fonte: editorial
      - chave: Foco da revisão
        valor: Convenções, cobertura de testes e complexidade
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Revisão de código
## 📝 Descrição
Revisar mudanças em busca de erros, riscos de segurança e melhorias.
## ⏰ Quando aplicar
- Pull requests
- Auditoria de trechos críticos
## 🧩 Funcionalidades necessárias
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
## ✅ Recomendações
- [[github_copilot|GitHub Copilot]] - Revisão integrada aos pull requests do GitHub
- [[claude_code|Claude-Code]] - Revisão com acesso ao repositório e execução de testes
- [[cursor|Cursor]] - Revisão assistida dentro do editor
- [[claude_opus_5_5|Claude Opus 5.5]] - Raciocínio profundo para achar falhas sutis
- [[gpt_5_5|GPT-5.5]] - Segunda opinião com perfil diferente
## 🧬 Variações
- **Revisão de pull request** (`revisao-pull-request`): Comentários automáticos sobre bugs, estilo e riscos antes da revisão humana. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: App no repositório ou etapa do pipeline; Escala típica: Todo pull request; Foco da revisão: Bugs, estilo e riscos.
- **Revisão de segurança** (`revisao-seguranca-codigo`): Busca de vulnerabilidades e segredos expostos no diff. Funcionalidades: [[raciocinio|Raciocínio]], [[geracao_de_codigo|Geração de código]]. Mais barata: [[gitleaks|Gitleaks (ferramenta)]], Trivy, Semgrep OSS. Custo-benefício: [[github_advanced_security|GitHub Advanced Security]], Snyk, SonarQube. Qualidade máxima: [[veracode|Veracode]], Checkmarx, Sonatype. Por que difere do caso: Muda Foco da revisão para vulnerabilidades e segredos expostos no diff: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Etapa do pipeline com scanner; Escala típica: Todo pull request e varredura noturna; Foco da revisão: Vulnerabilidades e segredos expostos no diff.
- **Qualidade e padrões do projeto** (`revisao-qualidade-padroes`): Aderência a convenções, cobertura de testes e complexidade. Funcionalidades: [[contexto_longo|Contexto longo]], [[geracao_de_codigo|Geração de código]]. Mais barata: reviewdog, Danger JS, Semgrep OSS. Custo-benefício: SonarQube, CodeRabbit, Sourcery. Qualidade máxima: Qodo Merge, [[greptile|Greptile]], Snyk. Por que difere do caso: Muda Foco da revisão para convenções, cobertura de testes e complexidade: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Etapa do pipeline com regras do projeto; Escala típica: Todo pull request; Foco da revisão: Convenções, cobertura de testes e complexidade.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[qodo_pr_agent|Qodo PR-Agent]], reviewdog, Danger JS
- **Custo-benefício:** [[github_copilot|GitHub Copilot]], CodeRabbit, Sourcery
- **Qualidade máxima:** [[greptile|Greptile]], Graphite, Qodo Merge
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. O código é ativo sensível, então importa onde ele é processado e se alimenta treino.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
