---
id: fluxo_dev_assistido_ia
tipo: stack
nome: Fluxo de desenvolvimento assistido por IA
descricao: Fluxo de trabalho em que a pessoa engenheira combina IDE com IA, agentes de código, skills, servidores MCP e revisão automatizada, mantendo testes, revisão humana, controle de versão e segurança como portões de qualidade.
fonte_ids: []
exemplo: Uma equipe que abre issues, delega a implementação a um agente em branch própria, revisa o pull request com apoio de IA e só funde com testes e varreduras verdes.
quando_usar:
  - O time quer acelerar implementação, testes e revisão sem perder controle de qualidade.
  - Há convenções de projeto que podem ser descritas para agentes e skills.
quando_evitar:
  - Código com restrições regulatórias severas pede políticas explícitas de uso de IA antes de qualquer adoção.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[ide_ia|IDE com IA]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[revisao_codigo_pr|Revisão de código e PR]]"
  - "[[skills_codigo_revisao|Skills de código e revisão]]"
  - "[[mcp_codigo_repositorio|MCP de código e repositório]]"
  - "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Desenvolvimento com IA
  - Engenharia assistida por agentes
dominio: ia
subdominio: Aplicações e agentes
linguagens:
  - agnostica
slots:
  - id: ide
    papel: IDE com IA
    categoria: "[[ide_ia|IDE com IA]]"
    obrigatorio: true
    maisBarata:
      - tabela:zed
      - "[[visual_studio_code|Visual Studio Code]]"
    custoBeneficio:
      - "[[cursor|Cursor]]"
      - "[[github_copilot|GitHub Copilot]]"
    qualidadeMaxima:
      - "[[kiro_ide|Kiro-IDE]]"
      - tabela:jetbrains-junie
    lacuna: ""
  - id: agente
    papel: Agente de código
    categoria: "[[agente_codigo|Agente de código]]"
    obrigatorio: true
    maisBarata:
      - tabela:opencode
      - tabela:aider
    custoBeneficio:
      - "[[github_copilot|GitHub Copilot]]"
    qualidadeMaxima:
      - "[[claude_code|Claude-Code]]"
      - tabela:openai-codex
    lacuna: ""
  - id: revisao
    papel: Revisão automatizada de PR
    categoria: "[[revisao_codigo_pr|Revisão de código e PR]]"
    obrigatorio: true
    maisBarata:
      - "[[qodo_pr_agent|Qodo PR-Agent]]"
    custoBeneficio:
      - tabela:coderabbit
    qualidadeMaxima:
      - "[[greptile|Greptile]]"
    lacuna: ""
  - id: skills
    papel: Skills e instruções reutilizáveis
    categoria: "[[skills_codigo_revisao|Skills de código e revisão]]"
    obrigatorio: true
    maisBarata:
      - "[[superpowers|Superpowers]]"
    custoBeneficio:
      - "[[awesome_copilot|Awesome Copilot]]"
    qualidadeMaxima:
      - "[[anthropic_skills|Anthropic Skills]]"
    lacuna: ""
  - id: mcp
    papel: Contexto por MCP
    categoria: "[[mcp_codigo_repositorio|MCP de código e repositório]]"
    obrigatorio: true
    maisBarata:
      - "[[mcp_filesystem|MCP Filesystem]]"
    custoBeneficio:
      - "[[github_mcp_server|GitHub MCP Server]]"
      - tabela:context7
    qualidadeMaxima:
      - "[[sourcegraph_mcp|Sourcegraph MCP]]"
    lacuna: ""
  - id: vcs
    papel: Controle de versão e colaboração
    categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
    obrigatorio: true
    maisBarata:
      - "[[forgejo|Forgejo]]"
    custoBeneficio:
      - "[[github|GitHub (ferramenta)]]"
    qualidadeMaxima:
      - "[[github_enterprise|GitHub Enterprise]]"
    lacuna: ""
  - id: seguranca
    papel: Segurança de código
    categoria: "[[seguranca_codigo|Segurança de código]]"
    obrigatorio: true
    maisBarata:
      - "[[gitleaks|Gitleaks (ferramenta)]]"
      - tabela:semgrep-oss
    custoBeneficio:
      - "[[sonarqube|SonarQube]]"
    qualidadeMaxima:
      - "[[veracode|Veracode]]"
    lacuna: ""
  - id: cicd
    papel: Pipeline de qualidade
    categoria: "[[ci_cd_deploy|CI-CD e deploy]]"
    obrigatorio: true
    maisBarata:
      - "[[woodpecker_ci|Woodpecker CI]]"
    custoBeneficio:
      - "[[github_actions|GitHub Actions]]"
    qualidadeMaxima:
      - "[[harness|Harness]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time com testes automatizados e hábito de revisão.
    contra:
      - Time sem testes, em que o código gerado não tem como ser validado.
    preferir:
      - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  escala_volume:
    favorece:
      - Vários repositórios com convenções compartilhadas por skills.
    contra:
      - Monorepos enormes sem indexação e contexto adequados.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  orcamento:
    favorece:
      - Ferramentas abertas e planos individuais mantêm o custo previsível.
    contra:
      - Agentes autônomos que consomem tokens sem teto por tarefa.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  latencia:
    favorece:
      - Tarefas assíncronas em que o agente trabalha enquanto a pessoa revisa.
    contra:
      - Alterações urgentes em produção, que pedem controle manual.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  compliance_dados:
    favorece:
      - Política de dados que define o que pode ir a cada ferramenta.
    contra:
      - Código proprietário enviado a serviços sem contrato adequado.
    preferir:
      - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  prazo_entrega:
    favorece:
      - Ganho imediato de produtividade em tarefas repetitivas.
    contra:
      - Prazo que ignora treinar o time em revisão de código gerado.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  lock_in:
    favorece:
      - Skills e protocolos abertos funcionam em vários agentes.
    contra:
      - Fluxos presos a um único assistente e ao seu formato de instruções.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
    quando: O objetivo é construir um agente como produto, e não melhorar o fluxo do time.
  - stack: "[[servidor_mcp|Servidor MCP]]"
    quando: A equipe quer expor ferramentas internas aos agentes de código.
checklist:
  - id: amb.ambiente_reproduzivel
    dominio: ambiente local
    titulo: Reproduzir o ambiente local com um comando
    verificacao: Uma pessoa nova no projeto consegue rodar a aplicação e os testes a partir de um clone limpo, seguindo apenas o que está no repositório.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.dependencias_travadas
    dominio: ambiente local
    titulo: Travar as dependências
    verificacao: As dependências diretas e transitivas ficam registradas em arquivo versionado, e o build usa exatamente esse conjunto.
    nivel: essencial
    slots: []
    depende: []
  - id: amb.config_por_ambiente
    dominio: ambiente local
    titulo: Separar configuração por ambiente
    verificacao: Valores que mudam entre ambientes chegam por configuração externa ao código, e o mesmo artefato roda em todos os ambientes.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.protecao_branch_principal
    dominio: repositório
    titulo: Proteger a branch principal
    verificacao: Merge na branch principal só acontece por pull request com revisão e CI verde.
    nivel: essencial
    slots: []
    depende: []
  - id: repo.convencao_commits
    dominio: repositório
    titulo: Combinar uma convenção de commits e de branches
    verificacao: Existe um padrão escrito de mensagens de commit e de nomes de branch, e a revisão aponta desvios.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.codeowners
    dominio: repositório
    titulo: Definir responsáveis por área do código
    verificacao: Cada área crítica do repositório tem responsáveis nomeados que entram automaticamente na revisão.
    nivel: recomendado
    slots: []
    depende: []
  - id: repo.revisao_humana_de_codigo_gerado
    dominio: repositório
    titulo: Revisar por uma pessoa todo código gerado
    verificacao: Nenhum código gerado por agente entra na branch principal sem revisão humana e CI verde.
    nivel: essencial
    slots:
      - agente
      - vcs
    depende: []
  - id: cicd.pipeline_ci
    dominio: CI/CD
    titulo: Rodar build, testes e análise a cada mudança
    verificacao: Todo pull request dispara um pipeline que compila, executa os testes e roda a análise estática, e o resultado bloqueia o merge.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.artefato_imutavel
    dominio: CI/CD
    titulo: Publicar um artefato imutável por mudança
    verificacao: Cada build gera um artefato identificado por um hash ou tag que nunca é sobrescrito, e o deploy promove esse mesmo artefato entre ambientes.
    nivel: essencial
    slots: []
    depende: []
  - id: cicd.deploy_automatizado
    dominio: CI/CD
    titulo: Automatizar o deploy
    verificacao: Colocar uma mudança em produção é uma ação de pipeline repetível, sem passos manuais fora do registro.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.infra_versionada
    dominio: infraestrutura como código
    titulo: Descrever a infraestrutura em código
    verificacao: Toda infraestrutura de produção é criada a partir de arquivos versionados, e uma mudança manual no console é revertida ou incorporada ao código.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.logs_estruturados
    dominio: observabilidade
    titulo: Emitir logs estruturados com correlação
    verificacao: Os logs saem em formato estruturado e carregam um identificador de requisição que liga os eventos de uma mesma chamada.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.metricas_sinais_ouro
    dominio: observabilidade
    titulo: Medir latência, tráfego, erros e saturação
    verificacao: Cada serviço expõe métricas de latência, volume de requisições, taxa de erro e uso de recursos, com painel acessível ao time.
    nivel: essencial
    slots: []
    depende: []
  - id: obs.alertas_acionaveis
    dominio: observabilidade
    titulo: Criar alertas acionáveis ligados a objetivos de nível de serviço
    verificacao: Cada alerta aponta para um objetivo de nível de serviço e para um procedimento de resposta, e alertas sem ação são removidos.
    nivel: recomendado
    slots: []
    depende: []
  - id: seg.segredos_fora_do_codigo
    dominio: segurança
    titulo: Guardar segredos fora do repositório
    verificacao: Nenhum segredo vive no código ou no histórico do repositório, e uma varredura automática bloqueia o commit ou o merge quando encontra um.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.menor_privilegio
    dominio: segurança
    titulo: Aplicar o menor privilégio
    verificacao: Cada pessoa, serviço e pipeline tem apenas as permissões de que precisa, e as permissões são revisadas em ciclos definidos.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.varredura_dependencias
    dominio: segurança
    titulo: Varrer dependências e imagens em busca de vulnerabilidades
    verificacao: O pipeline lista vulnerabilidades conhecidas em dependências e imagens e bloqueia a publicação acima de um limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: seg.agente_sem_segredos
    dominio: segurança
    titulo: Manter segredos fora do alcance dos agentes
    verificacao: Agentes executam em ambiente sem credenciais de produção, e uma varredura bloqueia segredos em diffs.
    nivel: essencial
    slots:
      - agente
      - seguranca
    depende: []
  - id: custo.orcamento_alertas
    dominio: custos
    titulo: Definir orçamento e alertas de gasto
    verificacao: Existe um orçamento por ambiente com alerta automático quando o gasto previsto passa do limite combinado.
    nivel: essencial
    slots: []
    depende: []
  - id: custo.etiquetas_de_custo
    dominio: custos
    titulo: Etiquetar recursos por dono e finalidade
    verificacao: Todo recurso pago carrega etiquetas de dono e de finalidade, o que permite atribuir cada custo a um responsável.
    nivel: recomendado
    slots: []
    depende: []
  - id: dados.migracoes_versionadas
    dominio: dados e migrações
    titulo: Versionar as migrações de dados
    verificacao: Mudanças de esquema entram por migrações versionadas, aplicadas por pipeline e compatíveis com a versão anterior da aplicação.
    nivel: essencial
    slots: []
    depende: []
  - id: teste.piramide_de_testes
    dominio: testes e qualidade
    titulo: Cobrir o comportamento com testes automatizados em camadas
    verificacao: O comportamento crítico tem testes unitários, de integração e de ponta a ponta, e o pipeline executa todos antes do merge.
    nivel: essencial
    slots: []
    depende: []
  - id: teste.dados_de_teste_isolados
    dominio: testes e qualidade
    titulo: Isolar os dados de teste
    verificacao: Os testes criam e descartam seus próprios dados e rodam em qualquer ordem sem depender de estado compartilhado.
    nivel: recomendado
    slots: []
    depende: []
  - id: teste.testes_como_portao
    dominio: testes e qualidade
    titulo: Usar os testes como portão do código gerado
    verificacao: Mudanças de agente só avançam com testes novos ou existentes cobrindo o comportamento alterado.
    nivel: essencial
    slots:
      - cicd
    depende: []
  - id: rel.rollback_ensaiado
    dominio: release e rollback
    titulo: Ensaiar o rollback
    verificacao: Voltar para a versão anterior é um procedimento documentado e ensaiado, e a equipe sabe o tempo que ele leva.
    nivel: essencial
    slots: []
    depende: []
  - id: rel.liberacao_gradual
    dominio: release e rollback
    titulo: Liberar mudanças de forma gradual
    verificacao: Mudanças de risco chegam a uma parcela do tráfego ou atrás de uma chave de funcionalidade antes de atingir todo mundo.
    nivel: recomendado
    slots: []
    depende: []
  - id: doc.readme_operacional
    dominio: documentação e decisões
    titulo: Manter um README operacional
    verificacao: O README explica o propósito do sistema, como rodar, testar e implantar, e quem procurar em caso de dúvida.
    nivel: essencial
    slots: []
    depende: []
  - id: doc.registro_decisoes
    dominio: documentação e decisões
    titulo: Registrar decisões de arquitetura
    verificacao: Cada decisão com impacto duradouro vira um registro curto com contexto, alternativas consideradas e consequência.
    nivel: recomendado
    slots: []
    depende: []
  - id: doc.regras_do_projeto_para_agentes
    dominio: documentação e decisões
    titulo: Documentar as regras do projeto para agentes
    verificacao: O repositório traz instruções versionadas com comandos de teste, convenções e limites, e o agente as segue.
    nivel: recomendado
    slots:
      - skills
    depende: []
  - id: ops.runbooks_incidente
    dominio: operação e incidentes
    titulo: Escrever runbooks para os incidentes previstos
    verificacao: Os cenários de falha mais prováveis têm um procedimento passo a passo que uma pessoa de plantão consegue seguir.
    nivel: essencial
    slots: []
    depende: []
  - id: ops.revisao_pos_incidente
    dominio: operação e incidentes
    titulo: Fazer revisão pós-incidente sem culpados
    verificacao: Todo incidente relevante gera uma revisão escrita com causas, linha do tempo e ações de melhoria acompanhadas até o fim.
    nivel: recomendado
    slots: []
    depende: []
  - id: ia.avaliacao_automatizada
    dominio: IA
    titulo: Avaliar o comportamento do modelo com um conjunto de casos
    verificacao: Existe um conjunto versionado de casos de avaliação com critérios de aprovação, executado a cada mudança de prompt, modelo ou dados.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.guardrails_entrada_saida
    dominio: IA
    titulo: Validar entradas e saídas do modelo
    verificacao: Entradas e saídas passam por validações de formato, segurança e conteúdo, e as violações ficam registradas.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.prompts_modelos_versionados
    dominio: IA
    titulo: Versionar prompts e referências de modelo
    verificacao: Prompts, parâmetros e identificadores de modelo ficam no repositório, e cada resposta registra a versão usada.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.custo_tokens_monitorado
    dominio: IA
    titulo: Monitorar custo e uso de tokens
    verificacao: O consumo de tokens e o custo por requisição aparecem em painel, com limite e alerta por ambiente.
    nivel: essencial
    slots: []
    depende: []
  - id: ia.rastreio_de_chamadas
    dominio: IA
    titulo: Rastrear as chamadas ao modelo e às ferramentas
    verificacao: Cada execução registra entradas, saídas, ferramentas chamadas, latência e custo, com o mesmo identificador de correlação do restante do sistema.
    nivel: recomendado
    slots: []
    depende: []
  - id: ia.dados_sensiveis_protegidos
    dominio: IA
    titulo: Proteger dados sensíveis enviados ao modelo
    verificacao: Dados pessoais e confidenciais são identificados e removidos ou mascarados antes de sair do ambiente controlado.
    nivel: recomendado
    slots: []
    depende: []
padroes:
  - "[[evaluator_optimizer|Evaluator-Optimizer]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[prompt_chaining|Prompt Chaining]]"
  - "[[orchestrator_workers|Orchestrator-Workers]]"
  - "[[reflection|Reflection]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
variacoes:
  - par-agente-terminal
  - revisao-pull-request
  - auto-dev-issues-para-pr
ferramentas:
  - tabela:zed
  - "[[visual_studio_code|Visual Studio Code]]"
  - "[[cursor|Cursor]]"
  - "[[github_copilot|GitHub Copilot]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - tabela:jetbrains-junie
  - tabela:opencode
  - tabela:aider
  - "[[claude_code|Claude-Code]]"
  - tabela:openai-codex
  - "[[qodo_pr_agent|Qodo PR-Agent]]"
  - tabela:coderabbit
  - "[[greptile|Greptile]]"
  - "[[superpowers|Superpowers]]"
  - "[[awesome_copilot|Awesome Copilot]]"
  - "[[anthropic_skills|Anthropic Skills]]"
  - "[[mcp_filesystem|MCP Filesystem]]"
  - "[[github_mcp_server|GitHub MCP Server]]"
  - tabela:context7
  - "[[sourcegraph_mcp|Sourcegraph MCP]]"
  - "[[forgejo|Forgejo]]"
  - "[[github|GitHub (ferramenta)]]"
  - "[[github_enterprise|GitHub Enterprise]]"
  - "[[gitleaks|Gitleaks (ferramenta)]]"
  - tabela:semgrep-oss
  - "[[sonarqube|SonarQube]]"
  - "[[veracode|Veracode]]"
  - "[[woodpecker_ci|Woodpecker CI]]"
  - "[[github_actions|GitHub Actions]]"
  - "[[harness|Harness]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Fluxo de desenvolvimento assistido por IA
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
