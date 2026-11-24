---
id: treino_finetuning_modelo
tipo: stack
nome: Treino e fine-tuning de modelo
descricao: Ciclo repetível de preparar dados versionados, treinar ou ajustar um modelo, rastrear experimentos, avaliar contra linhas de base, registrar o modelo aprovado e promovê-lo com monitoramento.
fonte_ids:
  - google_mlops
exemplo: Um time que ajusta um modelo aberto com dados da empresa, compara com a linha de base e só promove versões que superam os critérios de avaliação.
quando_usar:
  - Um modelo geral não atinge a qualidade necessária em uma tarefa específica com dados próprios.
  - O time precisa repetir o treino de forma auditável quando os dados mudam.
quando_evitar:
  - Prompts, RAG e modelos prontos resolvem muitos casos com menor custo e manutenção.
status: rascunho
publico: false
fontes:
  - id: google_mlops
    tipo: artigo
    titulo: "MLOps: Continuous delivery and automation pipelines in machine learning (Google Cloud)"
    link: https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning
    status_revisao: revisada
    proxima_revisao: 2027-11-23
categorias:
  - "[[frameworks_ml|Frameworks de ML e deep learning]]"
  - "[[ml_framework|Framework de ML]]"
  - "[[repositorio_modelos|Repositório de modelos]]"
  - "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
  - "[[frameworks_analise_dados|Frameworks de análise de dados]]"
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
aliases:
  - MLOps de treino
  - Ajuste fino de modelos
dominio: ia
subdominio: Modelos e infraestrutura de IA
linguagens:
  - python
slots:
  - id: ml
    papel: Framework de treino
    categoria: "[[frameworks_ml|Frameworks de ML e deep learning]]"
    obrigatorio: true
    maisBarata:
      - "[[scikit_learn|scikit-learn]]"
      - tabela:xgboost
    custoBeneficio:
      - "[[pytorch|PyTorch]]"
      - tabela:keras
    qualidadeMaxima:
      - "[[jax|JAX]]"
      - tabela:deepspeed
    lacuna: ""
  - id: experimentos
    papel: Experimentos e registro de modelos
    categoria: "[[ml_framework|Framework de ML]]"
    obrigatorio: true
    maisBarata:
      - tabela:mlflow
    custoBeneficio:
      - tabela:unsloth
    qualidadeMaxima:
      - tabela:aws-sagemaker
    lacuna: ""
  - id: modelos
    papel: Modelos e datasets abertos
    categoria: "[[repositorio_modelos|Repositório de modelos]]"
    obrigatorio: true
    maisBarata:
      - "[[hugging_face|Hugging Face]]"
      - tabela:modelscope
    custoBeneficio:
      - tabela:kaggle-models
      - tabela:replicate
    qualidadeMaxima:
      - tabela:google-vertex-model-garden
    lacuna: ""
  - id: pipeline
    papel: Pipeline de dados e treino
    categoria: "[[pipelines_orquestracao_dados|Pipelines e orquestração de dados]]"
    obrigatorio: true
    maisBarata:
      - tabela:dagster
      - tabela:apache-airflow
    custoBeneficio:
      - tabela:prefect
    qualidadeMaxima:
      - tabela:databricks
    lacuna: ""
  - id: dados
    papel: Preparação de dados
    categoria: "[[frameworks_analise_dados|Frameworks de análise de dados]]"
    obrigatorio: true
    maisBarata:
      - "[[pandas|pandas]]"
    custoBeneficio:
      - "[[polars|Polars]]"
    qualidadeMaxima:
      - tabela:ray
    lacuna: ""
  - id: storage
    papel: Armazenamento de dados e artefatos
    categoria: "[[objetos_cdn|Armazenamento de objetos e CDN]]"
    obrigatorio: true
    maisBarata:
      - "[[cloudflare_r2|Cloudflare R2]]"
      - tabela:minio
    custoBeneficio:
      - "[[amazon_s3|Amazon S3 (ferramenta)]]"
    qualidadeMaxima: []
    lacuna: "qualidadeMaxima: a camada de CDN não se aplica a datasets e checkpoints, e o armazenamento de objetos já atende."
  - id: evals
    papel: Avaliação de modelos
    categoria: "[[evals_observabilidade|Evals e observabilidade]]"
    obrigatorio: true
    maisBarata:
      - "[[promptfoo|Promptfoo]]"
      - tabela:deepeval
    custoBeneficio:
      - "[[langfuse|LangFuse]]"
      - tabela:braintrust
    qualidadeMaxima:
      - tabela:langsmith
    lacuna: ""
  - id: containers
    papel: Execução em contêineres
    categoria: "[[containers_orquestracao|Containers e orquestração]]"
    obrigatorio: true
    maisBarata:
      - "[[podman|Podman]]"
    custoBeneficio:
      - "[[docker_desktop|Docker Desktop]]"
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    qualidadeMaxima:
      - "[[amazon_eks|Amazon EKS]]"
    lacuna: ""
instancias:
  - nome: MLOps
    descricao: Prática de engenharia que une o desenvolvimento e a operação de sistemas de ML, com automação e monitoramento em integração, testes, entrega e infraestrutura.
    linguagens:
      - python
    ferramentas:
      - tabela:mlflow
    fonte_ids:
      - google_mlops
condicoes:
  time_maturidade:
    favorece:
      - Time com engenheiros de ML e de plataforma trabalhando juntos.
    contra:
      - Cientistas de dados sem apoio de engenharia para produção.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  escala_volume:
    favorece:
      - Conjuntos de dados grandes e treinos distribuídos.
    contra:
      - Dados pequenos, em que modelos clássicos resolvem em uma máquina.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  orcamento:
    favorece:
      - Ajuste leve de modelos abertos limita o custo de GPU.
    contra:
      - Treino completo de modelos grandes exige orçamento elevado.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  latencia:
    favorece:
      - Modelos menores ajustados atendem com baixa latência de inferência.
    contra:
      - Modelos que só funcionam em hardware de ponta.
    preferir:
      - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  compliance_dados:
    favorece:
      - Linhagem de dados e versionamento sustentam auditoria do modelo.
    contra:
      - Dados pessoais no conjunto de treino, que exigem base legal e anonimização.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
  prazo_entrega:
    favorece:
      - Ajuste de um modelo aberto leva dias com bons dados.
    contra:
      - Prazo que exclui construir o conjunto de avaliação.
    preferir:
      - "[[app_rag_producao|App RAG de produção]]"
  lock_in:
    favorece:
      - Formatos abertos de modelo e registros neutros evitam a dependência.
    contra:
      - Serviços de treino proprietários que não exportam o modelo.
    preferir: []
    semAlternativa: "Este eixo não aponta para outro arquétipo: a stack cobre o cenário sozinha."
outrosArquetipos:
  - stack: "[[app_rag_producao|App RAG de produção]]"
    quando: Contexto recuperado e prompts bem desenhados resolvem sem treinar.
  - stack: "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
    quando: O foco é servir o modelo e não adaptá-lo.
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
  - id: dados.dataset_versionado
    dominio: dados e migrações
    titulo: Versionar os dados de treino e de avaliação
    verificacao: Cada modelo registrado aponta a versão exata dos dados de treino e de avaliação usados.
    nivel: essencial
    slots:
      - pipeline
      - storage
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
  - id: teste.treino_reproduzivel
    dominio: testes e qualidade
    titulo: Reproduzir o treino a partir do código e dos dados
    verificacao: Reexecutar o treino com a mesma configuração produz métricas dentro da tolerância combinada.
    nivel: essencial
    slots:
      - ml
      - experimentos
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
  - id: rel.registro_e_promocao_de_modelos
    dominio: release e rollback
    titulo: Registrar e promover modelos por critérios
    verificacao: Um modelo só passa de candidato a produção ao superar a linha de base nos critérios de avaliação, com aprovação registrada.
    nivel: essencial
    slots:
      - experimentos
      - evals
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
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[model_cascade|Model Cascade]]"
  - "[[guardrails_llm|Guardrails]]"
casosDeUso:
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[aprendizado_de_ml|Aprendizado de ML]]"
variacoes:
  - decisao-fine-tuning
  - decisao-avaliacao
  - ml-modelos-abertos-hub
ferramentas:
  - "[[scikit_learn|scikit-learn]]"
  - tabela:xgboost
  - "[[pytorch|PyTorch]]"
  - tabela:keras
  - "[[jax|JAX]]"
  - tabela:deepspeed
  - tabela:mlflow
  - tabela:unsloth
  - tabela:aws-sagemaker
  - "[[hugging_face|Hugging Face]]"
  - tabela:modelscope
  - tabela:kaggle-models
  - tabela:replicate
  - tabela:google-vertex-model-garden
  - tabela:dagster
  - tabela:apache-airflow
  - tabela:prefect
  - tabela:databricks
  - "[[pandas|pandas]]"
  - "[[polars|Polars]]"
  - tabela:ray
  - "[[cloudflare_r2|Cloudflare R2]]"
  - tabela:minio
  - "[[amazon_s3|Amazon S3 (ferramenta)]]"
  - "[[promptfoo|Promptfoo]]"
  - tabela:deepeval
  - "[[langfuse|LangFuse]]"
  - tabela:braintrust
  - tabela:langsmith
  - "[[podman|Podman]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[amazon_eks|Amazon EKS]]"
dataVerificacao: 2026-11-23
tags:
  - stack
---
# Treino e fine-tuning de modelo
<!-- stack:gen -->
## 📋 Resumo
`= this.descricao`
Exemplo: `= this.exemplo`
Domínio: `= this.dominio` / `= this.subdominio`
## 🔗 Relacionamentos
- **Hub:** [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
