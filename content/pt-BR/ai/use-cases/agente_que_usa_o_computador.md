---
id: agente_que_usa_o_computador
tipo: caso-de-uso
nome: Agente que usa o computador
aliases: []
descricao: Delegar tarefas a um agente que opera aplicativos, arquivos e a tela do computador.
funcionalidadesNecessarias:
  - "[[uso_de_computador|Uso de computador]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[busca_na_web|Busca na web]]"
categoriasRelacionadas:
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[pesquisa_busca|Pesquisa e busca]]"
ferramentasRecomendadas:
  - "[[manus|Manus]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[cursor|Cursor]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[docker_desktop|Docker Desktop]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
  - media
segmentos:
  - escritorio-produtividade
  - desenvolvimento-software
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[automacao_e_integracoes|Automação e integrações]]"
faixasPadrao:
  maisBarata:
    - "[[browser_use|Browser Use]]"
    - tabela:skyvern
    - tabela:stagehand
  custoBeneficio:
    - "[[manus|Manus]]"
    - tabela:perplexity-comet
    - tabela:genspark
  qualidadeMaxima:
    - "[[chatgpt|ChatGPT]]"
    - "[[claude|Claude AI]]"
    - "[[gemini|Gemini]]"
variacoes:
  - id: computador-agente-geral
    nome: Agente geral de tela
    descricao: Opera apps e navegador a partir de instruções.
    funcionalidades:
      - "[[uso_de_computador|Uso de computador]]"
      - "[[tool_use_funcionalidade|Tool use]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Navegador e aplicativos da máquina
        fonte: editorial
      - chave: Escala típica
        valor: Uma tarefa por sessão
        fonte: editorial
      - chave: Nível de autonomia
        valor: Executa a partir de instruções com revisão
        fonte: editorial
  - id: computador-agente-codigo
    nome: Agente no terminal
    descricao: Executa comandos e edita arquivos do projeto.
    funcionalidades:
      - "[[uso_de_computador|Uso de computador]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Nível de autonomia para edita arquivos e roda comandos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Terminal no repositório
        fonte: editorial
      - chave: Escala típica
        valor: Uma tarefa de código por sessão
        fonte: editorial
      - chave: Nível de autonomia
        valor: Edita arquivos e roda comandos
        fonte: editorial
  - id: computador-ambiente-isolado
    nome: Ambiente isolado
    descricao: Máquina virtual ou contêiner com permissões mínimas.
    funcionalidades:
      - "[[uso_de_computador|Uso de computador]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: false
    maisBarata:
      - "[[podman|Podman]]"
      - tabela:k3s
      - tabela:rancher-desktop
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
      - tabela:orbstack
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    qualidadeMaxima:
      - "[[amazon_eks|Amazon EKS]]"
      - tabela:google-gke
      - tabela:red-hat-openshift
    justificativaFerramentas: "Muda Nível de autonomia para permissões mínimas e descartável: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Máquina virtual ou contêiner
        fonte: editorial
      - chave: Escala típica
        valor: Um ambiente por tarefa
        fonte: editorial
      - chave: Nível de autonomia
        valor: Permissões mínimas e descartável
        fonte: editorial
  - id: computador-pesquisa-autonoma
    nome: Pesquisa autônoma
    descricao: Busca em várias fontes e relatório final.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[uso_de_computador|Uso de computador]]"
    herdaFerramentas: false
    maisBarata:
      - "[[notebooklm|NotebookLM]]"
      - tabela:searxng
      - tabela:duckduckgo
    custoBeneficio:
      - "[[perplexity|Perplexity]]"
      - "[[firecrawl|Firecrawl]]"
      - tabela:tavily
    qualidadeMaxima:
      - tabela:exa
      - tabela:serpapi
      - tabela:brave-search-api
    justificativaFerramentas: "Muda Nível de autonomia para relatório final com citações: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Navegador e busca na web
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de fontes por pergunta
        fonte: editorial
      - chave: Nível de autonomia
        valor: Relatório final com citações
        fonte: editorial
  - id: computador-aprovacao-passos
    nome: Aprovação por passo
    descricao: Pausa antes de ações sensíveis.
    funcionalidades:
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
      - "[[uso_de_computador|Uso de computador]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Navegador e aplicativos da máquina
        fonte: editorial
      - chave: Escala típica
        valor: Ações sensíveis em cada tarefa
        fonte: editorial
      - chave: Nível de autonomia
        valor: Pausa e pede aprovação antes de agir
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Agente que usa o computador
## 📝 Descrição
Delegar tarefas a um agente que opera aplicativos, arquivos e a tela do computador.
## ⏰ Quando aplicar
- Tarefas de escritório repetitivas
- Pesquisa e preenchimento entre vários apps
## 🧩 Funcionalidades necessárias
- [[uso_de_computador|Uso de computador]] - Operação de interfaces gráficas por captura de tela, cliques e digitação.
- [[human_in_the_loop_funcionalidade|Human in the loop]] - Pontos de aprovação ou correção humana dentro de um fluxo automatizado.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[busca_na_web|Busca na web]] - Consulta à web em tempo real, com resposta fundamentada em fontes.
## ✅ Recomendações
- [[manus|Manus]] - Faixa custo-benefício em [[agentes_computador_navegador|Agentes que usam computador e navegador]].
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[cursor|Cursor]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[kiro_ide|Kiro-IDE]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[docker_desktop|Docker Desktop]] - Faixa custo-benefício em [[containers_orquestracao|Containers e orquestração]].
## 🧬 Variações
- **Agente geral de tela** (`computador-agente-geral`): Opera apps e navegador a partir de instruções. Funcionalidades: [[uso_de_computador|Uso de computador]], [[tool_use_funcionalidade|Tool use]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Navegador e aplicativos da máquina; Escala típica: Uma tarefa por sessão; Nível de autonomia: Executa a partir de instruções com revisão.
- **Agente no terminal** (`computador-agente-codigo`): Executa comandos e edita arquivos do projeto. Funcionalidades: [[uso_de_computador|Uso de computador]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: OpenCode, Aider, Cline. Custo-benefício: [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, Gemini CLI. Por que difere do caso: Muda Nível de autonomia para edita arquivos e roda comandos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Terminal no repositório; Escala típica: Uma tarefa de código por sessão; Nível de autonomia: Edita arquivos e roda comandos.
- **Ambiente isolado** (`computador-ambiente-isolado`): Máquina virtual ou contêiner com permissões mínimas. Funcionalidades: [[uso_de_computador|Uso de computador]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Mais barata: [[podman|Podman]], K3s, Rancher Desktop. Custo-benefício: [[docker_desktop|Docker Desktop]], OrbStack, [[kubernetes|Kubernetes (ferramenta)]]. Qualidade máxima: [[amazon_eks|Amazon EKS]], Google Kubernetes Engine, Red Hat OpenShift. Por que difere do caso: Muda Nível de autonomia para permissões mínimas e descartável: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Máquina virtual ou contêiner; Escala típica: Um ambiente por tarefa; Nível de autonomia: Permissões mínimas e descartável.
- **Pesquisa autônoma** (`computador-pesquisa-autonoma`): Busca em várias fontes e relatório final. Funcionalidades: [[busca_na_web|Busca na web]], [[uso_de_computador|Uso de computador]]. Mais barata: [[notebooklm|NotebookLM]], SearXNG, DuckDuckGo. Custo-benefício: [[perplexity|Perplexity]], [[firecrawl|Firecrawl]], Tavily. Qualidade máxima: Exa, SerpApi, Brave Search API. Por que difere do caso: Muda Nível de autonomia para relatório final com citações: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Navegador e busca na web; Escala típica: Dezenas de fontes por pergunta; Nível de autonomia: Relatório final com citações.
- **Aprovação por passo** (`computador-aprovacao-passos`): Pausa antes de ações sensíveis. Funcionalidades: [[human_in_the_loop_funcionalidade|Human in the loop]], [[uso_de_computador|Uso de computador]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Navegador e aplicativos da máquina; Escala típica: Ações sensíveis em cada tarefa; Nível de autonomia: Pausa e pede aprovação antes de agir.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[browser_use|Browser Use]], Skyvern, Stagehand
- **Custo-benefício:** [[manus|Manus]], Comet, Genspark
- **Qualidade máxima:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], [[gemini|Gemini]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. O agente enxerga a tela e os arquivos, então o isolamento e as permissões decidem.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[automacao_e_integracoes|Automação e integrações]]
