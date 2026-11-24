---
id: servidor_mcp
tipo: stack
nome: Servidor MCP
descricao: Serviço que expõe ferramentas, recursos e prompts a agentes pelo Model Context Protocol, com esquemas validados, autenticação, escopos mínimos, registro de uso e testes com clientes de referência.
fonte_ids: []
exemplo: Um servidor MCP que oferece consulta e criação de tickets, com autenticação por OAuth e escopos separados para leitura e escrita.
quando_usar:
  - Várias aplicações de IA precisam usar a mesma capacidade de forma padronizada.
  - Uma API existente ganha valor quando agentes conseguem usá-la com segurança.
quando_evitar:
  - Uma integração usada por um único agente simples pode ser uma função local dentro dele.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[registro_gateway_mcp|Registro e gateway de MCP]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[testes_documentacao_apis|Testes e documentação de APIs]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
aliases:
  - MCP server
  - Servidor de ferramentas para agentes
dominio: ia
subdominio: Aplicações e agentes
linguagens:
  - typescript
  - python
  - java
slots:
  - id: mcp
    papel: SDK e servidores de referência
    categoria: "[[mcp_integracoes|MCP e integrações]]"
    obrigatorio: true
    maisBarata:
      - tabela:fastmcp
      - tabela:mcp-reference-servers
    custoBeneficio:
      - "[[composio|Composio]]"
      - tabela:docker-mcp-toolkit
    qualidadeMaxima:
      - "[[aws_mcp_servers|AWS MCP Servers]]"
    lacuna: ""
  - id: registro
    papel: Registro e gateway
    categoria: "[[registro_gateway_mcp|Registro e gateway de MCP]]"
    obrigatorio: true
    maisBarata:
      - "[[metamcp|MetaMCP]]"
      - tabela:mcp-proxy
    custoBeneficio:
      - "[[composio|Composio]]"
    qualidadeMaxima:
      - "[[kong_ai_gateway|Kong AI Gateway]]"
    lacuna: ""
  - id: auth
    papel: Autenticação e autorização
    categoria: "[[autenticacao_identidade|Autenticação e identidade]]"
    obrigatorio: true
    maisBarata:
      - "[[keycloak|Keycloak]]"
    custoBeneficio:
      - tabela:auth0
    qualidadeMaxima:
      - "[[okta_workforce_identity|Okta Workforce Identity]]"
    lacuna: ""
  - id: validacao
    papel: Validação de esquemas
    categoria: "[[validacao_schemas|Validação e schemas]]"
    obrigatorio: true
    maisBarata:
      - "[[zod|Zod]]"
    custoBeneficio:
      - "[[pydantic|Pydantic]]"
    qualidadeMaxima:
      - "[[typebox|TypeBox]]"
    lacuna: ""
  - id: backend
    papel: Servidor HTTP
    categoria: "[[frameworks_backend|Frameworks de backend]]"
    obrigatorio: true
    maisBarata:
      - tabela:hono
    custoBeneficio:
      - "[[fastapi|FastAPI]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: a escolha do framework HTTP tem pouco impacto na qualidade do servidor, e o peso está na validação, na autenticação e nos testes."
  - id: teste
    papel: Testes com clientes
    categoria: "[[testes_documentacao_apis|Testes e documentação de APIs]]"
    obrigatorio: true
    maisBarata:
      - tabela:httpie
    custoBeneficio:
      - "[[insomnia|Insomnia]]"
    qualidadeMaxima:
      - "[[postman|Postman]]"
    lacuna: ""
  - id: containers
    papel: Empacotamento
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata:
      - "[[podman|Podman]]"
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
    qualidadeMaxima:
      - "[[amazon_eks|Amazon EKS]]"
    lacuna: ""
  - id: segredos
    papel: Segredos e credenciais
    categoria: "[[senhas_segredos|Gerenciador de senhas e segredos]]"
    obrigatorio: true
    maisBarata:
      - tabela:infisical
    custoBeneficio:
      - tabela:doppler
    qualidadeMaxima:
      - "[[hashicorp_vault|HashiCorp Vault]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time que já mantém APIs bem documentadas e testadas.
    contra:
      - Time sem experiência em autenticação OAuth.
    preferir:
      - "[[api_serverless_edge|API serverless e edge]]"
  escala_volume:
    favorece:
      - Muitos agentes e clientes consumindo as mesmas ferramentas.
    contra:
      - Um consumidor único, em que uma biblioteca interna resolve.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  orcamento:
    favorece:
      - SDKs abertos e servidores de referência reduzem o custo inicial.
    contra:
      - Gateways comerciais acrescentam custo por requisição.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  latencia:
    favorece:
      - Chamadas curtas e síncronas atendem a maior parte das ferramentas.
    contra:
      - Operações longas que pedem execução assíncrona e notificação.
    preferir:
      - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  compliance_dados:
    favorece:
      - Escopos por ferramenta e trilha de auditoria por chamada.
    contra:
      - Ferramentas que expõem dados sensíveis sem filtro por usuário.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Um servidor mínimo funciona em horas com um SDK.
    contra:
      - Prazo que ignora autenticação e limites de uso.
    preferir:
      - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
  lock_in:
    favorece:
      - O protocolo aberto torna o servidor utilizável por vários clientes.
    contra:
      - Extensões proprietárias de um cliente reduzem a portabilidade.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
    quando: O objetivo é construir o agente que consome as ferramentas.
  - stack: "[[api_serverless_edge|API serverless e edge]]"
    quando: A API serve apenas clientes tradicionais, sem agentes.
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
  - id: iac.estado_remoto_protegido
    dominio: infraestrutura como código
    titulo: Guardar o estado da infraestrutura em local compartilhado e protegido
    verificacao: O estado da infraestrutura fica em armazenamento remoto com controle de acesso, histórico e bloqueio contra aplicações simultâneas.
    nivel: essencial
    slots: []
    depende: []
  - id: iac.plano_revisado
    dominio: infraestrutura como código
    titulo: Revisar o plano antes de aplicar
    verificacao: Cada mudança de infraestrutura mostra o plano de alterações no pull request, e uma pessoa revisora o aprova antes da aplicação.
    nivel: recomendado
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
  - id: seg.autenticacao_do_servidor
    dominio: segurança
    titulo: Autenticar cada cliente do servidor
    verificacao: Toda chamada carrega identidade verificável, e clientes sem credencial válida recebem recusa registrada.
    nivel: essencial
    slots:
      - auth
    depende: []
  - id: seg.escopo_minimo_por_ferramenta
    dominio: segurança
    titulo: Dar a cada ferramenta o escopo mínimo
    verificacao: Ferramentas de leitura e de escrita têm escopos separados, e o escopo concedido ao cliente é o menor possível.
    nivel: essencial
    slots:
      - auth
      - mcp
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
  - id: dados.backup_restauracao_testada
    dominio: dados e migrações
    titulo: Testar a restauração de backups
    verificacao: Existe backup automático dos dados críticos, e a restauração é exercitada com resultado registrado em ciclos definidos.
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
  - id: teste.cliente_de_referencia
    dominio: testes e qualidade
    titulo: Testar com um cliente de referência
    verificacao: Uma suíte automatizada chama cada ferramenta com um cliente MCP e valida as respostas e os erros.
    nivel: recomendado
    slots:
      - teste
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
  - id: doc.descricao_de_ferramentas
    dominio: documentação e decisões
    titulo: Descrever cada ferramenta de forma clara
    verificacao: Cada ferramenta tem nome, propósito, parâmetros e exemplos que um agente consegue interpretar sem ambiguidade.
    nivel: recomendado
    slots:
      - mcp
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
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[adapter|Adapter (GoF)]]"
  - "[[facade|Facade (GoF)]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
variacoes:
  - api-ferramentas-mcp
  - auto-dev-pipeline-ia
ferramentas:
  - tabela:fastmcp
  - tabela:mcp-reference-servers
  - "[[composio|Composio]]"
  - tabela:docker-mcp-toolkit
  - "[[aws_mcp_servers|AWS MCP Servers]]"
  - "[[metamcp|MetaMCP]]"
  - tabela:mcp-proxy
  - "[[kong_ai_gateway|Kong AI Gateway]]"
  - "[[keycloak|Keycloak]]"
  - tabela:auth0
  - "[[okta_workforce_identity|Okta Workforce Identity]]"
  - "[[zod|Zod]]"
  - "[[pydantic|Pydantic]]"
  - "[[typebox|TypeBox]]"
  - tabela:hono
  - "[[fastapi|FastAPI]]"
  - tabela:httpie
  - "[[insomnia|Insomnia]]"
  - "[[postman|Postman]]"
  - "[[podman|Podman]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[amazon_eks|Amazon EKS]]"
  - tabela:infisical
  - tabela:doppler
  - "[[hashicorp_vault|HashiCorp Vault]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Servidor MCP
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
