---
id: testes_de_software_e_qa
tipo: caso-de-uso
nome: Testes de software e QA
aliases: []
descricao: Garantir qualidade com testes unitários, de integração, de ponta a ponta e de carga.
funcionalidadesNecessarias:
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[uso_de_computador|Uso de computador]]"
  - "[[tracing|Tracing]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
categoriasRelacionadas:
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[testes_carga_desempenho|Testes de carga e desempenho]]"
ferramentasRecomendadas:
  - "[[jest|Jest]]"
  - "[[cypress|Cypress (ferramenta)]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[cursor|Cursor]]"
  - "[[kiro_ide|Kiro-IDE]]"
modelosRecomendados: []
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
  - desenvolvimento-software
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
faixasPadrao:
  maisBarata:
    - "[[playwright|Playwright]]"
    - tabela:selenium
    - "[[k6|Grafana k6]]"
  custoBeneficio:
    - "[[cypress|Cypress (ferramenta)]]"
    - "[[testcontainers|Testcontainers]]"
    - "[[locust|Locust]]"
  qualidadeMaxima:
    - "[[browserstack|BrowserStack]]"
    - tabela:applitools
    - tabela:mabl
variacoes:
  - id: teste-unitario
    nome: Testes unitários
    descricao: Casos rápidos por função e módulo.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pytest|pytest]]"
      - "[[vitest|Vitest]]"
      - "[[junit5|JUnit 5]]"
    custoBeneficio:
      - "[[jest|Jest]]"
      - "[[rspec|RSpec]]"
      - "[[phpunit|PHPUnit]]"
    qualidadeMaxima:
      - "[[xunit_net|xUnit.net]]"
      - "[[kotest|Kotest]]"
      - tabela:hypothesis
    justificativaFerramentas: "Muda Escala típica para milhares de casos em segundos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem do projeto
        fonte: editorial
      - chave: Ambiente de execução
        valor: Processo local rápido
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de casos em segundos
        fonte: editorial
  - id: teste-integracao
    nome: Testes de integração
    descricao: Serviço com banco e filas reais em contêiner.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: false
    maisBarata:
      - "[[testcontainers|Testcontainers]]"
      - "[[podman|Podman]]"
      - "[[pytest|pytest]]"
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
      - "[[junit5|JUnit 5]]"
      - "[[jest|Jest]]"
    qualidadeMaxima:
      - "[[xunit_net|xUnit.net]]"
      - "[[kotest|Kotest]]"
      - tabela:k3s
    justificativaFerramentas: "Muda Escala típica para centenas de cenários: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem do projeto com biblioteca de contêineres
        fonte: editorial
      - chave: Ambiente de execução
        valor: Contêineres com banco e fila reais
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de cenários
        fonte: editorial
  - id: teste-e2e-navegador
    nome: Testes de ponta a ponta
    descricao: Fluxos de usuário no navegador.
    funcionalidades:
      - "[[uso_de_computador|Uso de computador]]"
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: JavaScript ou TypeScript no teste
        fonte: editorial
      - chave: Ambiente de execução
        valor: Navegador real, local ou no CI
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de fluxos críticos
        fonte: editorial
      - chave: Navegadores suportados
        valor: Chromium, Firefox e WebKit, além de Chrome e Edge, no Playwright
        fonte: https://playwright.dev/docs/browsers
    verificadoEm: 2026-11-22
  - id: teste-carga
    nome: Testes de carga
    descricao: Capacidade e gargalos sob tráfego.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[tracing|Tracing]]"
    herdaFerramentas: false
    maisBarata:
      - "[[locust|Locust]]"
      - "[[k6|Grafana k6]]"
      - "[[opentelemetry|OpenTelemetry]]"
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
      - tabela:signoz
      - "[[prometheus|Prometheus]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
      - "[[new_relic|New Relic (ferramenta)]]"
      - tabela:dynatrace
    justificativaFerramentas: "Muda Escala típica para milhares de usuários virtuais: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Scripts em JavaScript no k6
        fonte: https://grafana.com/docs/k6/latest/
      - chave: Ambiente de execução
        valor: Gerador de carga local ou na nuvem
        fonte: editorial
      - chave: Escala típica
        valor: Milhares de usuários virtuais
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: teste-gerado-ia
    nome: Testes gerados por IA
    descricao: Casos de teste e dados sintéticos sugeridos por agente.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
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
    justificativaFerramentas: "Muda Escala típica para cobertura ampliada em módulos sem teste: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem do projeto
        fonte: editorial
      - chave: Ambiente de execução
        valor: Agente no terminal com execução dos testes
        fonte: editorial
      - chave: Escala típica
        valor: Cobertura ampliada em módulos sem teste
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Testes de software e QA
## 📝 Descrição
Garantir qualidade com testes unitários, de integração, de ponta a ponta e de carga.
## ⏰ Quando aplicar
- Serviço com pipeline de CI
- Aplicação web com fluxos críticos
## 🧩 Funcionalidades necessárias
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[uso_de_computador|Uso de computador]] - Operação de interfaces gráficas por captura de tela, cliques e digitação.
- [[tracing|Tracing]] - Registro detalhado de cada chamada de modelo e ferramenta, com tempo, custo e entrada e saída.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
## ✅ Recomendações
- [[jest|Jest]] - Faixa custo-benefício em [[frameworks_testes|Frameworks de testes]].
- [[cypress|Cypress (ferramenta)]] - Faixa custo-benefício em [[testes_qa|Testes e QA]].
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[cursor|Cursor]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[kiro_ide|Kiro-IDE]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
## 🧬 Variações
- **Testes unitários** (`teste-unitario`): Casos rápidos por função e módulo. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: [[pytest|pytest]], Vitest, JUnit 5. Custo-benefício: [[jest|Jest]], RSpec, PHPUnit. Qualidade máxima: [[xunit_net|xUnit.net]], Kotest, Hypothesis. Por que difere do caso: Muda Escala típica para milhares de casos em segundos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem do projeto; Ambiente de execução: Processo local rápido; Escala típica: Milhares de casos em segundos.
- **Testes de integração** (`teste-integracao`): Serviço com banco e filas reais em contêiner. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Mais barata: Testcontainers, [[podman|Podman]], [[pytest|pytest]]. Custo-benefício: [[docker_desktop|Docker Desktop]], JUnit 5, [[jest|Jest]]. Qualidade máxima: [[xunit_net|xUnit.net]], Kotest, K3s. Por que difere do caso: Muda Escala típica para centenas de cenários: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem do projeto com biblioteca de contêineres; Ambiente de execução: Contêineres com banco e fila reais; Escala típica: Centenas de cenários.
- **Testes de ponta a ponta** (`teste-e2e-navegador`): Fluxos de usuário no navegador. Funcionalidades: [[uso_de_computador|Uso de computador]], [[avaliacao_de_qualidade|Avaliação de qualidade]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: JavaScript ou TypeScript no teste; Ambiente de execução: Navegador real, local ou no CI; Escala típica: Dezenas de fluxos críticos; Navegadores suportados: Chromium, Firefox e WebKit, além de Chrome e Edge, no Playwright.
- **Testes de carga** (`teste-carga`): Capacidade e gargalos sob tráfego. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[tracing|Tracing]]. Mais barata: Locust, Grafana k6, [[opentelemetry|OpenTelemetry]]. Custo-benefício: [[grafana_cloud|Grafana Cloud]], SigNoz, Prometheus. Qualidade máxima: [[datadog|Datadog]], [[new_relic|New Relic (ferramenta)]], Dynatrace. Por que difere do caso: Muda Escala típica para milhares de usuários virtuais: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Scripts em JavaScript no k6; Ambiente de execução: Gerador de carga local ou na nuvem; Escala típica: Milhares de usuários virtuais.
- **Testes gerados por IA** (`teste-gerado-ia`): Casos de teste e dados sintéticos sugeridos por agente. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: OpenCode, Aider, Cline. Custo-benefício: [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, Gemini CLI. Por que difere do caso: Muda Escala típica para cobertura ampliada em módulos sem teste: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem do projeto; Ambiente de execução: Agente no terminal com execução dos testes; Escala típica: Cobertura ampliada em módulos sem teste.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[playwright|Playwright]], Selenium, Grafana k6
- **Custo-benefício:** [[cypress|Cypress (ferramenta)]], Testcontainers, Locust
- **Qualidade máxima:** [[browserstack|BrowserStack]], Applitools, mabl
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Ferramentas de teste de código aberto cobrem a maior parte dos cenários.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
