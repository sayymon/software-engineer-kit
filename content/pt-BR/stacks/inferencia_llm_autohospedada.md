---
id: inferencia_llm_autohospedada
tipo: stack
nome: Inferência de LLM auto-hospedada
descricao: Serviço que roda modelos abertos em infraestrutura própria, com servidor de inferência, repositório de modelos, gateway com limites e autenticação, observabilidade de latência e custo e proteções de entrada e saída.
fonte_ids: []
exemplo: Um serviço interno com um modelo aberto servido por vLLM atrás de um gateway, usado por vários times com cotas por equipe.
quando_usar:
  - Dados não podem sair da infraestrutura própria ou do país.
  - O volume de tokens torna o custo de uma infraestrutura dedicada menor do que o de APIs.
quando_evitar:
  - Volume baixo e irregular costuma custar menos em APIs gerenciadas.
status: rascunho
publico: false
fontes: []
categorias:
  - "[[inferencia_local|Inferência local]]"
  - "[[repositorio_modelos|Repositório de modelos]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
aliases:
  - LLM self-hosted
  - Inferência privada
dominio: ia
subdominio: Modelos e infraestrutura de IA
linguagens:
  - python
slots:
  - id: runtime
    papel: Servidor de inferência
    categoria: "[[inferencia_local|Inferência local]]"
    obrigatorio: true
    maisBarata:
      - "[[ollama|Ollama]]"
      - tabela:llama-cpp
    custoBeneficio:
      - tabela:open-webui
      - tabela:jan
    qualidadeMaxima:
      - tabela:vllm
      - tabela:sglang
    lacuna: ""
  - id: modelos
    papel: Origem dos modelos
    categoria: "[[repositorio_modelos|Repositório de modelos]]"
    obrigatorio: true
    maisBarata:
      - "[[hugging_face|Hugging Face]]"
      - tabela:modelscope
    custoBeneficio:
      - tabela:kaggle-models
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: os catálogos desta faixa são de nuvens que hospedam a inferência, o que contraria o objetivo de manter tudo na infraestrutura própria."
  - id: containers
    papel: Orquestração de execução
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata:
      - "[[podman|Podman]]"
      - tabela:k3s
    custoBeneficio:
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    qualidadeMaxima:
      - tabela:red-hat-openshift
    lacuna: ""
  - id: gateway
    papel: Gateway de acesso ao modelo
    categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
    obrigatorio: true
    maisBarata:
      - tabela:nginx
    custoBeneficio:
      - "[[kong_gateway|Kong Gateway]]"
      - tabela:envoy
    qualidadeMaxima:
      - tabela:istio
    lacuna: ""
  - id: obs
    papel: Observabilidade e custo
    categoria: "[[observabilidade_apm|Observabilidade e APM]]"
    obrigatorio: true
    maisBarata:
      - "[[opentelemetry|OpenTelemetry]]"
      - tabela:prometheus
    custoBeneficio:
      - "[[grafana_cloud|Grafana Cloud]]"
    qualidadeMaxima:
      - "[[datadog|Datadog]]"
    lacuna: ""
  - id: guardrails
    papel: Proteções de entrada e saída
    categoria: "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
    obrigatorio: true
    maisBarata:
      - tabela:llm-guard
    custoBeneficio:
      - tabela:llama-guard
    qualidadeMaxima:
      - tabela:lakera-guard
    lacuna: ""
  - id: evals
    papel: Avaliação de qualidade
    categoria: "[[evals_observabilidade|Evals e observabilidade]]"
    obrigatorio: true
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
    qualidadeMaxima:
      - tabela:langsmith
    lacuna: ""
  - id: iac
    papel: Infraestrutura como código
    categoria: "[[infraestrutura_como_codigo|Infraestrutura como código]]"
    obrigatorio: true
    maisBarata:
      - "[[opentofu|OpenTofu]]"
      - tabela:ansible
    custoBeneficio:
      - "[[terraform|Terraform]]"
    qualidadeMaxima:
      - "[[hcp_terraform|HCP Terraform]]"
    lacuna: ""
instancias: []
condicoes:
  time_maturidade:
    favorece:
      - Time com experiência em GPUs, contêineres e operação de serviços.
    contra:
      - Time sem quem opere a infraestrutura e acompanhe novas versões de modelos.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  escala_volume:
    favorece:
      - Milhões de tokens por dia com batching contínuo.
    contra:
      - Poucas requisições por dia, que não ocupam as GPUs.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  orcamento:
    favorece:
      - Custo por token cai com alta utilização das GPUs.
    contra:
      - GPUs ociosas pagas por hora.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  latencia:
    favorece:
      - Servidores próximos dos usuários eliminam a ida a APIs externas.
    contra:
      - Modelos grandes que não cabem na memória disponível.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  compliance_dados:
    favorece:
      - Dados e prompts ficam dentro da fronteira da organização.
    contra:
      - Controles de acesso, retenção e auditoria passam a ser responsabilidade do time.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Um servidor local funciona em horas para uma prova de conceito.
    contra:
      - Prazo que inclui dimensionar capacidade e alta disponibilidade.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  lock_in:
    favorece:
      - Pesos e servidores abertos permitem trocar de modelo sem mudar de fornecedor.
    contra:
      - Configurações presas a um hardware específico.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[app_rag_producao|App RAG de produção]]"
    quando: A aplicação pode usar APIs de modelos e o foco está na recuperação sobre documentos.
  - stack: "[[treino_finetuning_modelo|Treino e fine-tuning de modelo]]"
    quando: O objetivo é adaptar o modelo aos dados próprios antes de servi-lo.
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
  - id: seg.pesos_de_origem_verificada
    dominio: segurança
    titulo: Baixar pesos apenas de origem verificada
    verificacao: Cada modelo usado tem origem, licença e verificação de integridade registradas antes de entrar em produção.
    nivel: essencial
    slots:
      - modelos
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
  - id: ops.capacidade_dimensionada
    dominio: operação e incidentes
    titulo: Dimensionar a capacidade de GPU pela carga real
    verificacao: A capacidade é calculada com base em tokens por segundo medidos, e há alerta quando a utilização passa do limite combinado.
    nivel: essencial
    slots:
      - runtime
      - containers
    depende: []
  - id: ops.limites_por_cliente
    dominio: operação e incidentes
    titulo: Aplicar cotas e limites por cliente
    verificacao: Cada cliente do gateway tem cota de requisições e de tokens, e o excedente recebe resposta controlada.
    nivel: essencial
    slots:
      - gateway
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
  - "[[load_shedding|Load Shedding]]"
  - "[[backpressure|Backpressure]]"
  - "[[model_cascade|Model Cascade]]"
  - "[[semantic_caching|Semantic Caching]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
casosDeUso:
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
variacoes:
  - local-servidor-equipe
  - decisao-self-hosted
ferramentas:
  - "[[ollama|Ollama]]"
  - tabela:llama-cpp
  - tabela:open-webui
  - tabela:jan
  - tabela:vllm
  - tabela:sglang
  - "[[hugging_face|Hugging Face]]"
  - tabela:modelscope
  - tabela:kaggle-models
  - "[[podman|Podman]]"
  - tabela:k3s
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - tabela:red-hat-openshift
  - tabela:nginx
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:envoy
  - tabela:istio
  - "[[opentelemetry|OpenTelemetry]]"
  - tabela:prometheus
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[datadog|Datadog]]"
  - tabela:llm-guard
  - tabela:llama-guard
  - tabela:lakera-guard
  - "[[promptfoo|Promptfoo]]"
  - "[[langfuse|LangFuse]]"
  - tabela:langsmith
  - "[[opentofu|OpenTofu]]"
  - tabela:ansible
  - "[[terraform|Terraform]]"
  - "[[hcp_terraform|HCP Terraform]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Inferência de LLM auto-hospedada
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
