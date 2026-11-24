---
id: gestao_de_segredos_e_credenciais
tipo: caso-de-uso
nome: Gestão de segredos e credenciais
aliases: []
descricao: Guardar, rotacionar e entregar segredos a pessoas e aplicações com segurança.
funcionalidadesNecessarias:
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
categoriasRelacionadas:
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[seguranca_codigo|Segurança de código]]"
ferramentasRecomendadas:
  - "[[n_1password|1Password]]"
  - "[[clerk|Clerk]]"
  - "[[github_advanced_security|GitHub Advanced Security]]"
  - "[[hashicorp_vault|HashiCorp Vault]]"
  - "[[aws_secrets_manager|AWS Secrets Manager]]"
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
  - grande
segmentos:
  - seguranca
  - devops-infra
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
  maisBarata:
    - "[[bitwarden|Bitwarden]]"
    - tabela:keepassxc
    - tabela:infisical
  custoBeneficio:
    - "[[n_1password|1Password]]"
    - tabela:proton-pass
    - tabela:doppler
  qualidadeMaxima:
    - "[[hashicorp_vault|HashiCorp Vault]]"
    - tabela:cyberark
    - "[[aws_secrets_manager|AWS Secrets Manager]]"
variacoes:
  - id: segredos-gestor-pessoal
    nome: Gerenciador de senhas pessoal
    descricao: Cofre com autenticação forte e compartilhamento.
    funcionalidades:
      - "[[memoria_persistente|Memória persistente]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Aplicativo e extensão de navegador
        fonte: editorial
      - chave: Escala típica
        valor: Uma pessoa ou uma família
        fonte: editorial
      - chave: Objetivo de segurança
        valor: Senhas fortes e compartilhamento
        fonte: editorial
  - id: segredos-cofre-aplicacao
    nome: Cofre para aplicações
    descricao: Segredos injetados em tempo de execução.
    funcionalidades:
      - "[[deploy_gerenciado|Deploy gerenciado]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:infisical
      - tabela:doppler
      - tabela:keepassxc
    custoBeneficio:
      - "[[aws_secrets_manager|AWS Secrets Manager]]"
      - "[[bitwarden|Bitwarden]]"
      - tabela:sops
    qualidadeMaxima:
      - "[[hashicorp_vault|HashiCorp Vault]]"
      - tabela:cyberark
      - "[[n_1password|1Password]]"
    justificativaFerramentas: "Muda Objetivo de segurança para segredos injetados em tempo de execução: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Serviço de cofre integrado ao deploy
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de serviços
        fonte: editorial
      - chave: Objetivo de segurança
        valor: Segredos injetados em tempo de execução
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: segredos-rotacao
    nome: Rotação de credenciais
    descricao: Troca periódica e revogação rápida.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:infisical
      - tabela:doppler
      - tabela:sops
    custoBeneficio:
      - "[[aws_secrets_manager|AWS Secrets Manager]]"
      - "[[bitwarden|Bitwarden]]"
      - tabela:external-secrets-operator
    qualidadeMaxima:
      - "[[hashicorp_vault|HashiCorp Vault]]"
      - tabela:cyberark
      - tabela:aws-kms
    justificativaFerramentas: "Muda Objetivo de segurança para troca periódica e revogação rápida: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Cofre com rotação automática
        fonte: editorial
      - chave: Escala típica
        valor: Credenciais de banco e de API
        fonte: editorial
      - chave: Objetivo de segurança
        valor: Troca periódica e revogação rápida
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: segredos-identidade
    nome: Identidade e acesso
    descricao: Login único e MFA para a equipe.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[keycloak|Keycloak]]"
      - tabela:supertokens
      - tabela:authentik
    custoBeneficio:
      - "[[clerk|Clerk]]"
      - tabela:auth0
      - tabela:firebase-auth
    qualidadeMaxima:
      - "[[okta_workforce_identity|Okta Workforce Identity]]"
      - tabela:microsoft-entra-id
      - tabela:ping-identity
    justificativaFerramentas: "Muda Objetivo de segurança para login único e MFA: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Provedor de identidade da empresa
        fonte: editorial
      - chave: Escala típica
        valor: Toda a equipe
        fonte: editorial
      - chave: Objetivo de segurança
        valor: Login único e MFA
        fonte: editorial
  - id: segredos-auditoria-leaks
    nome: Detecção de vazamento
    descricao: Busca de segredos em commits e logs.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gitleaks|Gitleaks (ferramenta)]]"
      - tabela:trivy
      - tabela:semgrep-oss
    custoBeneficio:
      - "[[github_advanced_security|GitHub Advanced Security]]"
      - tabela:snyk
      - tabela:sonarqube
    qualidadeMaxima:
      - "[[veracode|Veracode]]"
      - tabela:checkmarx
      - tabela:sonatype
    justificativaFerramentas: "Muda Objetivo de segurança para chaves e tokens expostos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Hook de commit e etapa do pipeline
        fonte: editorial
      - chave: Escala típica
        valor: Histórico completo do repositório
        fonte: editorial
      - chave: Objetivo de segurança
        valor: Chaves e tokens expostos
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Gestão de segredos e credenciais
## 📝 Descrição
Guardar, rotacionar e entregar segredos a pessoas e aplicações com segurança.
## ⏰ Quando aplicar
- Equipe com chaves de API e senhas
- Aplicação em produção com credenciais
## 🧩 Funcionalidades necessárias
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
- [[deploy_gerenciado|Deploy gerenciado]] - Hospedagem de modelos e agentes em serviço gerenciado, com escala e monitoramento.
## ✅ Recomendações
- [[n_1password|1Password]] - Faixa custo-benefício em [[senhas_segredos|Gerenciador de senhas e segredos]].
- [[clerk|Clerk]] - Faixa custo-benefício em [[autenticacao_identidade|Autenticação e identidade]].
- [[github_advanced_security|GitHub Advanced Security]] - Faixa custo-benefício em [[seguranca_codigo|Segurança de código]].
- [[hashicorp_vault|HashiCorp Vault]] - Faixa qualidade máxima em [[senhas_segredos|Gerenciador de senhas e segredos]].
- [[aws_secrets_manager|AWS Secrets Manager]] - Faixa qualidade máxima em [[senhas_segredos|Gerenciador de senhas e segredos]].
## 🧬 Variações
- **Gerenciador de senhas pessoal** (`segredos-gestor-pessoal`): Cofre com autenticação forte e compartilhamento. Funcionalidades: [[memoria_persistente|Memória persistente]], [[busca_semantica|Busca semântica]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Aplicativo e extensão de navegador; Escala típica: Uma pessoa ou uma família; Objetivo de segurança: Senhas fortes e compartilhamento.
- **Cofre para aplicações** (`segredos-cofre-aplicacao`): Segredos injetados em tempo de execução. Funcionalidades: [[deploy_gerenciado|Deploy gerenciado]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Infisical, Doppler, KeePassXC. Custo-benefício: [[aws_secrets_manager|AWS Secrets Manager]], [[bitwarden|Bitwarden]], SOPS. Qualidade máxima: [[hashicorp_vault|HashiCorp Vault]], CyberArk Secrets Manager, [[n_1password|1Password]]. Por que difere do caso: Muda Objetivo de segurança para segredos injetados em tempo de execução: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Serviço de cofre integrado ao deploy; Escala típica: Dezenas de serviços; Objetivo de segurança: Segredos injetados em tempo de execução.
- **Rotação de credenciais** (`segredos-rotacao`): Troca periódica e revogação rápida. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Infisical, Doppler, SOPS. Custo-benefício: [[aws_secrets_manager|AWS Secrets Manager]], [[bitwarden|Bitwarden]], External Secrets Operator. Qualidade máxima: [[hashicorp_vault|HashiCorp Vault]], CyberArk Secrets Manager, AWS KMS. Por que difere do caso: Muda Objetivo de segurança para troca periódica e revogação rápida: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Cofre com rotação automática; Escala típica: Credenciais de banco e de API; Objetivo de segurança: Troca periódica e revogação rápida.
- **Identidade e acesso** (`segredos-identidade`): Login único e MFA para a equipe. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[keycloak|Keycloak]], SuperTokens, authentik. Custo-benefício: [[clerk|Clerk]], Auth0, Firebase Authentication. Qualidade máxima: [[okta_workforce_identity|Okta Workforce Identity]], Microsoft Entra ID, PingOne. Por que difere do caso: Muda Objetivo de segurança para login único e MFA: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Provedor de identidade da empresa; Escala típica: Toda a equipe; Objetivo de segurança: Login único e MFA.
- **Detecção de vazamento** (`segredos-auditoria-leaks`): Busca de segredos em commits e logs. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: [[gitleaks|Gitleaks (ferramenta)]], Trivy, Semgrep OSS. Custo-benefício: [[github_advanced_security|GitHub Advanced Security]], Snyk, SonarQube. Qualidade máxima: [[veracode|Veracode]], Checkmarx, Sonatype. Por que difere do caso: Muda Objetivo de segurança para chaves e tokens expostos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Hook de commit e etapa do pipeline; Escala típica: Histórico completo do repositório; Objetivo de segurança: Chaves e tokens expostos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[bitwarden|Bitwarden]], KeePassXC, Infisical
- **Custo-benefício:** [[n_1password|1Password]], Proton Pass, Doppler
- **Qualidade máxima:** [[hashicorp_vault|HashiCorp Vault]], CyberArk Secrets Manager, [[aws_secrets_manager|AWS Secrets Manager]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Segredos são o dado mais sensível e o local de guarda decide o risco.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
