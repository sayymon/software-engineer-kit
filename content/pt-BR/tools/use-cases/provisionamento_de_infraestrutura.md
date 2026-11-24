---
id: provisionamento_de_infraestrutura
tipo: caso-de-uso
nome: Provisionamento de infraestrutura
aliases: []
descricao: Definir e versionar infraestrutura com código, módulos e políticas.
funcionalidadesNecessarias:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
  - "[[raciocinio|Raciocínio]]"
categoriasRelacionadas:
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
  - "[[precos_custos_nuvem_ia|Preços e custos de nuvem e IA]]"
ferramentasRecomendadas:
  - "[[terraform|Terraform]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[kubernetes|Kubernetes (ferramenta)]]"
  - "[[instances_vantage|Instances (Vantage)]]"
  - "[[hcp_terraform|HCP Terraform]]"
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
  - devops-infra
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
  maisBarata:
    - "[[opentofu|OpenTofu]]"
    - tabela:ansible
    - tabela:terragrunt
  custoBeneficio:
    - "[[terraform|Terraform]]"
    - tabela:pulumi
    - tabela:aws-cdk
  qualidadeMaxima:
    - "[[hcp_terraform|HCP Terraform]]"
    - tabela:spacelift
    - tabela:env0
variacoes:
  - id: iac-declarativo
    nome: Provisionamento declarativo
    descricao: Recursos em arquivos versionados com plano e aplicação.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: HCL, linguagem declarativa de recursos
        fonte: editorial
      - chave: Ambiente de execução
        valor: CLI local e pipeline
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de recursos
        fonte: editorial
  - id: iac-linguagem-geral
    nome: Infraestrutura em linguagem geral
    descricao: Código em linguagem de programação com testes.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:aws-cdk
      - "[[opentofu|OpenTofu]]"
      - "[[terraform|Terraform]]"
    custoBeneficio:
      - tabela:pulumi
      - tabela:terragrunt
      - tabela:sst
    qualidadeMaxima:
      - "[[hcp_terraform|HCP Terraform]]"
      - tabela:spacelift
      - tabela:env0
    justificativaFerramentas: "Muda Escala típica para centenas de recursos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: TypeScript, Python, Go ou C#
        fonte: editorial
      - chave: Ambiente de execução
        valor: CLI e SDK com testes unitários
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de recursos
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: iac-configuracao-servidores
    nome: Configuração de servidores
    descricao: Pacotes e serviços por playbook.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:ansible
      - tabela:salt
      - tabela:chef
    custoBeneficio:
      - tabela:puppet
      - tabela:packer
      - "[[terraform|Terraform]]"
    qualidadeMaxima:
      - tabela:spacelift
      - tabela:env0
      - "[[hcp_terraform|HCP Terraform]]"
    justificativaFerramentas: "Muda Escala típica para dezenas de servidores: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: YAML em playbooks
        fonte: editorial
      - chave: Ambiente de execução
        valor: Conexão SSH nos servidores
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de servidores
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: iac-containers
    nome: Contêineres e orquestração
    descricao: Imagens, manifestos e clusters.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[deploy_gerenciado|Deploy gerenciado]]"
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
    justificativaFerramentas: "Muda Escala típica para dezenas de serviços em contêineres: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Dockerfile e manifestos YAML
        fonte: editorial
      - chave: Ambiente de execução
        valor: Docker local e cluster Kubernetes
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de serviços em contêineres
        fonte: editorial
  - id: iac-custo-previsto
    nome: Custo previsto no plano
    descricao: Estimar custo antes de aplicar.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[models_dev|models.dev]]"
      - tabela:openrouter-models
      - tabela:pricepertoken
    custoBeneficio:
      - "[[instances_vantage|Instances (Vantage)]]"
      - tabela:infracost
      - tabela:opencost
    qualidadeMaxima:
      - "[[aws_pricing_calculator|AWS Pricing Calculator]]"
      - tabela:azure-pricing-calculator
      - tabela:gcp-pricing-calculator
    justificativaFerramentas: "Muda Escala típica para custo mensal previsto por mudança: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Saída do plano de infraestrutura como código
        fonte: editorial
      - chave: Ambiente de execução
        valor: Etapa do pipeline antes do apply
        fonte: editorial
      - chave: Escala típica
        valor: Custo mensal previsto por mudança
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Provisionamento de infraestrutura
## 📝 Descrição
Definir e versionar infraestrutura com código, módulos e políticas.
## ⏰ Quando aplicar
- Ambiente reproduzível
- Multicloud com módulos
## 🧩 Funcionalidades necessárias
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[deploy_gerenciado|Deploy gerenciado]] - Hospedagem de modelos e agentes em serviço gerenciado, com escala e monitoramento.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
## ✅ Recomendações
- [[terraform|Terraform]] - Faixa custo-benefício em [[infraestrutura_como_codigo|Infraestrutura como código]].
- [[docker_desktop|Docker Desktop]] - Faixa custo-benefício em [[containers_orquestracao|Containers e orquestração]].
- [[kubernetes|Kubernetes (ferramenta)]] - Faixa custo-benefício em [[containers_orquestracao|Containers e orquestração]].
- [[instances_vantage|Instances (Vantage)]] - Faixa custo-benefício em [[precos_custos_nuvem_ia|Preços e custos de nuvem e IA]].
- [[hcp_terraform|HCP Terraform]] - Faixa qualidade máxima em [[infraestrutura_como_codigo|Infraestrutura como código]].
## 🧬 Variações
- **Provisionamento declarativo** (`iac-declarativo`): Recursos em arquivos versionados com plano e aplicação. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: HCL, linguagem declarativa de recursos; Ambiente de execução: CLI local e pipeline; Escala típica: Dezenas de recursos.
- **Infraestrutura em linguagem geral** (`iac-linguagem-geral`): Código em linguagem de programação com testes. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: AWS CDK, [[opentofu|OpenTofu]], [[terraform|Terraform]]. Custo-benefício: Pulumi, Terragrunt, SST. Qualidade máxima: [[hcp_terraform|HCP Terraform]], Spacelift, env0. Por que difere do caso: Muda Escala típica para centenas de recursos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: TypeScript, Python, Go ou C#; Ambiente de execução: CLI e SDK com testes unitários; Escala típica: Centenas de recursos.
- **Configuração de servidores** (`iac-configuracao-servidores`): Pacotes e serviços por playbook. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: Ansible, Salt, Chef. Custo-benefício: Puppet, Packer, [[terraform|Terraform]]. Qualidade máxima: Spacelift, env0, [[hcp_terraform|HCP Terraform]]. Por que difere do caso: Muda Escala típica para dezenas de servidores: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: YAML em playbooks; Ambiente de execução: Conexão SSH nos servidores; Escala típica: Dezenas de servidores.
- **Contêineres e orquestração** (`iac-containers`): Imagens, manifestos e clusters. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[deploy_gerenciado|Deploy gerenciado]]. Mais barata: [[podman|Podman]], K3s, Rancher Desktop. Custo-benefício: [[docker_desktop|Docker Desktop]], OrbStack, [[kubernetes|Kubernetes (ferramenta)]]. Qualidade máxima: [[amazon_eks|Amazon EKS]], Google Kubernetes Engine, Red Hat OpenShift. Por que difere do caso: Muda Escala típica para dezenas de serviços em contêineres: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Dockerfile e manifestos YAML; Ambiente de execução: Docker local e cluster Kubernetes; Escala típica: Dezenas de serviços em contêineres.
- **Custo previsto no plano** (`iac-custo-previsto`): Estimar custo antes de aplicar. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[models_dev|models.dev]], OpenRouter Models, Price Per Token. Custo-benefício: [[instances_vantage|Instances (Vantage)]], Infracost, OpenCost. Qualidade máxima: [[aws_pricing_calculator|AWS Pricing Calculator]], Azure Pricing Calculator, Google Cloud Pricing Calculator. Por que difere do caso: Muda Escala típica para custo mensal previsto por mudança: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Saída do plano de infraestrutura como código; Ambiente de execução: Etapa do pipeline antes do apply; Escala típica: Custo mensal previsto por mudança.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[opentofu|OpenTofu]], Ansible, Terragrunt
- **Custo-benefício:** [[terraform|Terraform]], Pulumi, AWS CDK
- **Qualidade máxima:** [[hcp_terraform|HCP Terraform]], Spacelift, env0
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. A linguagem de infraestrutura escolhida amarra módulos e estado por anos.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
