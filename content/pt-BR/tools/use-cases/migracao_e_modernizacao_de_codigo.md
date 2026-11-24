---
id: migracao_e_modernizacao_de_codigo
tipo: caso-de-uso
nome: Migração e modernização de código
aliases: []
descricao: Atualizar frameworks, trocar linguagens e quebrar monólitos com segurança.
funcionalidadesNecessarias:
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[agente_codigo|Agente de código]]"
  - "[[migracao_administracao_banco|Migração e administração de banco]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[nuvem_publica_generalista|Nuvem pública generalista]]"
ferramentasRecomendadas:
  - "[[github_copilot|GitHub Copilot]]"
  - "[[cursor|Cursor]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - "[[tableplus|TablePlus]]"
  - "[[docker_desktop|Docker Desktop]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
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
  - id: migra-atualizacao-versao
    nome: Atualização de versão
    descricao: Subir framework ou runtime com testes de regressão.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: Mesma linguagem, versão nova
        fonte: editorial
      - chave: Escala típica
        valor: Um serviço por vez
        fonte: editorial
      - chave: Garantia de segurança
        valor: Testes de regressão
        fonte: editorial
  - id: migra-troca-linguagem
    nome: Troca de linguagem
    descricao: Reescrita incremental com equivalência de comportamento.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:aider
      - tabela:cline
      - tabela:gemini-cli
    custoBeneficio:
      - "[[github_copilot|GitHub Copilot]]"
      - "[[kiro_ide|Kiro-IDE]]"
      - tabela:windsurf
    qualidadeMaxima:
      - "[[claude_code|Claude-Code]]"
      - tabela:openai-codex
      - tabela:jetbrains-junie
    justificativaFerramentas: "Muda Garantia de segurança para equivalência de comportamento: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagens de origem e destino diferentes
        fonte: editorial
      - chave: Escala típica
        valor: Reescrita módulo a módulo
        fonte: editorial
      - chave: Garantia de segurança
        valor: Equivalência de comportamento
        fonte: editorial
  - id: migra-banco-schema
    nome: Migração de banco
    descricao: Mudança de schema e dados com reversão.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[dbeaver_community|DBeaver Community]]"
      - "[[liquibase|Liquibase (ferramenta)]]"
      - tabela:flyway
    custoBeneficio:
      - "[[tableplus|TablePlus]]"
      - tabela:datagrip
      - tabela:beekeeper-studio
    qualidadeMaxima:
      - "[[navicat_premium|Navicat Premium]]"
      - tabela:dbvisualizer
      - tabela:redgate-sql-toolbelt
    justificativaFerramentas: "Muda Garantia de segurança para reversão planejada do schema: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL do banco em uso
        fonte: editorial
      - chave: Escala típica
        valor: Tabelas de produção
        fonte: editorial
      - chave: Garantia de segurança
        valor: Reversão planejada do schema
        fonte: editorial
  - id: migra-monolito-servicos
    nome: Monólito para serviços
    descricao: Fronteiras, contratos e extração gradual.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
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
    justificativaFerramentas: "Muda Garantia de segurança para contratos entre serviços: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Linguagem do monólito mantida
        fonte: editorial
      - chave: Escala típica
        valor: Vários serviços extraídos aos poucos
        fonte: editorial
      - chave: Garantia de segurança
        valor: Contratos entre serviços
        fonte: editorial
  - id: migra-nuvem
    nome: Migração para a nuvem
    descricao: Lift-and-shift ou refatoração por provedor.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ovhcloud|OVHcloud]]"
      - tabela:scaleway
      - tabela:ibm-cloud
    custoBeneficio:
      - "[[oracle_cloud_infrastructure|Oracle Cloud Infrastructure]]"
      - tabela:alibaba-cloud
      - tabela:tencent-cloud
    qualidadeMaxima:
      - "[[aws|AWS (ferramenta)]]"
      - tabela:microsoft-azure
      - "[[google_cloud|Google Cloud (ferramenta)]]"
    justificativaFerramentas: "Muda Garantia de segurança para plano de retorno e custo previsto: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Infraestrutura de origem e provedor de destino
        fonte: editorial
      - chave: Escala típica
        valor: Cargas inteiras migradas em ondas
        fonte: editorial
      - chave: Garantia de segurança
        valor: Plano de retorno e custo previsto
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Migração e modernização de código
## 📝 Descrição
Atualizar frameworks, trocar linguagens e quebrar monólitos com segurança.
## ⏰ Quando aplicar
- Atualização de versão major
- Troca de linguagem ou plataforma
## 🧩 Funcionalidades necessárias
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[github_copilot|GitHub Copilot]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[cursor|Cursor]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[kiro_ide|Kiro-IDE]] - Faixa custo-benefício em [[agente_codigo|Agente de código]].
- [[tableplus|TablePlus]] - Faixa custo-benefício em [[migracao_administracao_banco|Migração e administração de banco]].
- [[docker_desktop|Docker Desktop]] - Faixa custo-benefício em [[containers_orquestracao|Containers e orquestração]].
## 🧬 Variações
- **Atualização de versão** (`migra-atualizacao-versao`): Subir framework ou runtime com testes de regressão. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[geracao_de_codigo|Geração de código]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: Mesma linguagem, versão nova; Escala típica: Um serviço por vez; Garantia de segurança: Testes de regressão.
- **Troca de linguagem** (`migra-troca-linguagem`): Reescrita incremental com equivalência de comportamento. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: Aider, Cline, Gemini CLI. Custo-benefício: [[github_copilot|GitHub Copilot]], [[kiro_ide|Kiro-IDE]], Windsurf. Qualidade máxima: [[claude_code|Claude-Code]], Codex CLI, JetBrains Junie. Por que difere do caso: Muda Garantia de segurança para equivalência de comportamento: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagens de origem e destino diferentes; Escala típica: Reescrita módulo a módulo; Garantia de segurança: Equivalência de comportamento.
- **Migração de banco** (`migra-banco-schema`): Mudança de schema e dados com reversão. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[dbeaver_community|DBeaver Community]], [[liquibase|Liquibase (ferramenta)]], Flyway. Custo-benefício: [[tableplus|TablePlus]], DataGrip, Beekeeper Studio. Qualidade máxima: [[navicat_premium|Navicat Premium]], DbVisualizer, Redgate SQL Toolbelt. Por que difere do caso: Muda Garantia de segurança para reversão planejada do schema: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: SQL do banco em uso; Escala típica: Tabelas de produção; Garantia de segurança: Reversão planejada do schema.
- **Monólito para serviços** (`migra-monolito-servicos`): Fronteiras, contratos e extração gradual. Funcionalidades: [[raciocinio|Raciocínio]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[podman|Podman]], K3s, Rancher Desktop. Custo-benefício: [[docker_desktop|Docker Desktop]], OrbStack, [[kubernetes|Kubernetes (ferramenta)]]. Qualidade máxima: [[amazon_eks|Amazon EKS]], Google Kubernetes Engine, Red Hat OpenShift. Por que difere do caso: Muda Garantia de segurança para contratos entre serviços: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Linguagem do monólito mantida; Escala típica: Vários serviços extraídos aos poucos; Garantia de segurança: Contratos entre serviços.
- **Migração para a nuvem** (`migra-nuvem`): Lift-and-shift ou refatoração por provedor. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[ovhcloud|OVHcloud]], Scaleway, IBM Cloud. Custo-benefício: [[oracle_cloud_infrastructure|Oracle Cloud Infrastructure]], Alibaba Cloud, Tencent Cloud. Qualidade máxima: [[aws|AWS (ferramenta)]], Microsoft Azure, [[google_cloud|Google Cloud (ferramenta)]]. Por que difere do caso: Muda Garantia de segurança para plano de retorno e custo previsto: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Infraestrutura de origem e provedor de destino; Escala típica: Cargas inteiras migradas em ondas; Garantia de segurança: Plano de retorno e custo previsto.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** OpenCode, Aider, Cline
- **Custo-benefício:** [[github_copilot|GitHub Copilot]], [[cursor|Cursor]], [[kiro_ide|Kiro-IDE]]
- **Qualidade máxima:** [[claude_code|Claude-Code]], Codex CLI, Gemini CLI
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. A migração define a próxima dependência e o custo de sair dela depois.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
