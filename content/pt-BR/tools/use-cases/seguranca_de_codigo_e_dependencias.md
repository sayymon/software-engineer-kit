---
id: seguranca_de_codigo_e_dependencias
tipo: caso-de-uso
nome: Segurança de código e dependências
aliases: []
descricao: Encontrar vulnerabilidades, segredos expostos e dependências arriscadas no código.
funcionalidadesNecessarias:
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_codigo|Geração de código]]"
categoriasRelacionadas:
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[skills_seguranca|Skills de segurança]]"
  - "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
ferramentasRecomendadas:
  - "[[github_advanced_security|GitHub Advanced Security]]"
  - "[[semgrep_skills|Semgrep Skills]]"
  - "[[casbin|Casbin]]"
  - "[[veracode|Veracode]]"
  - "[[trail_of_bits_skills|Trail of Bits Skills]]"
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
  - desenvolvimento-software
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]"
faixasPadrao:
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
variacoes:
  - id: sec-analise-estatica
    nome: Análise estática
    descricao: Padrões inseguros e falhas lógicas no código.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Etapa do pipeline com análise estática
        fonte: editorial
      - chave: Escala típica
        valor: Todo pull request
        fonte: editorial
      - chave: Tipo de achado
        valor: Padrões inseguros e falhas lógicas
        fonte: editorial
  - id: sec-dependencias-sbom
    nome: Dependências e SBOM
    descricao: Vulnerabilidades conhecidas e licenças.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[trivy|Trivy]]"
      - tabela:grype
      - tabela:osv-scanner
    custoBeneficio:
      - "[[snyk|Snyk]]"
      - "[[github_advanced_security|GitHub Advanced Security]]"
      - tabela:dependency-track
    qualidadeMaxima:
      - "[[veracode|Veracode]]"
      - tabela:checkmarx
      - tabela:sonatype
    justificativaFerramentas: "Muda Tipo de achado para vulnerabilidades conhecidas e licenças: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Etapa do pipeline com leitura de manifestos
        fonte: editorial
      - chave: Escala típica
        valor: Dependências diretas e transitivas
        fonte: editorial
      - chave: Tipo de achado
        valor: Vulnerabilidades conhecidas e licenças
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: sec-segredos-vazados
    nome: Segredos vazados
    descricao: Chaves e tokens no histórico do repositório.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gitleaks|Gitleaks (ferramenta)]]"
      - "[[trufflehog|TruffleHog]]"
      - tabela:detect-secrets
    custoBeneficio:
      - "[[github_advanced_security|GitHub Advanced Security]]"
      - "[[snyk|Snyk]]"
      - "[[sonarqube|SonarQube]]"
    qualidadeMaxima:
      - "[[gitguardian|GitGuardian]]"
      - tabela:checkmarx
      - "[[veracode|Veracode]]"
    justificativaFerramentas: "Muda Tipo de achado para chaves e tokens expostos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Hook de pré-commit e varredura do histórico
        fonte: editorial
      - chave: Escala típica
        valor: Histórico completo do repositório
        fonte: editorial
      - chave: Tipo de achado
        valor: Chaves e tokens expostos
        fonte: editorial
    verificadoEm: 2026-11-23
  - id: sec-revisao-agente
    nome: Revisão de segurança por agente
    descricao: Skills e agentes que revisam mudanças.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ctf_skills|CTF Skills]]"
      - tabela:snyk-studio-recipes
      - tabela:openqodex
    custoBeneficio:
      - "[[semgrep_skills|Semgrep Skills]]"
      - tabela:claude-code-security-review
      - tabela:nvidia-skillspector
    qualidadeMaxima:
      - "[[trail_of_bits_skills|Trail of Bits Skills]]"
      - tabela:openai-codex-security
      - tabela:cisco-skill-scanner
    justificativaFerramentas: "Muda Tipo de achado para falhas de lógica e de configuração: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Agente de código com skills de segurança
        fonte: editorial
      - chave: Escala típica
        valor: Cada mudança relevante
        fonte: editorial
      - chave: Tipo de achado
        valor: Falhas de lógica e de configuração
        fonte: editorial
  - id: sec-autenticacao
    nome: Autenticação e autorização
    descricao: Login, sessão e controle de acesso corretos.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[auth_js|Auth.js]]"
      - tabela:passport
      - tabela:better-auth
    custoBeneficio:
      - "[[casbin|Casbin]]"
      - tabela:supertokens
      - tabela:openfga
    qualidadeMaxima:
      - "[[spring_security|Spring Security]]"
      - tabela:openiddict
      - tabela:ory-kratos
    justificativaFerramentas: "Muda Tipo de achado para login, sessão e controle de acesso: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Biblioteca de autenticação na aplicação
        fonte: editorial
      - chave: Escala típica
        valor: Todas as rotas protegidas
        fonte: editorial
      - chave: Tipo de achado
        valor: Login, sessão e controle de acesso
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Segurança de código e dependências
## 📝 Descrição
Encontrar vulnerabilidades, segredos expostos e dependências arriscadas no código.
## ⏰ Quando aplicar
- Repositório com dependências de terceiros
- Auditoria antes de release
## 🧩 Funcionalidades necessárias
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
## ✅ Recomendações
- [[github_advanced_security|GitHub Advanced Security]] - Faixa custo-benefício em [[seguranca_codigo|Segurança de código]].
- [[semgrep_skills|Semgrep Skills]] - Faixa custo-benefício em [[skills_seguranca|Skills de segurança]].
- [[casbin|Casbin]] - Faixa custo-benefício em [[autenticacao_autorizacao_libs|Autenticação e autorização]].
- [[veracode|Veracode]] - Faixa qualidade máxima em [[seguranca_codigo|Segurança de código]].
- [[trail_of_bits_skills|Trail of Bits Skills]] - Faixa qualidade máxima em [[skills_seguranca|Skills de segurança]].
## 🧬 Variações
- **Análise estática** (`sec-analise-estatica`): Padrões inseguros e falhas lógicas no código. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[edicao_de_codebase|Edição de codebase]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Etapa do pipeline com análise estática; Escala típica: Todo pull request; Tipo de achado: Padrões inseguros e falhas lógicas.
- **Dependências e SBOM** (`sec-dependencias-sbom`): Vulnerabilidades conhecidas e licenças. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: Trivy, Grype, OSV-Scanner. Custo-benefício: Snyk, [[github_advanced_security|GitHub Advanced Security]], Dependency-Track. Qualidade máxima: [[veracode|Veracode]], Checkmarx, Sonatype. Por que difere do caso: Muda Tipo de achado para vulnerabilidades conhecidas e licenças: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Etapa do pipeline com leitura de manifestos; Escala típica: Dependências diretas e transitivas; Tipo de achado: Vulnerabilidades conhecidas e licenças.
- **Segredos vazados** (`sec-segredos-vazados`): Chaves e tokens no histórico do repositório. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: [[gitleaks|Gitleaks (ferramenta)]], [[trufflehog|TruffleHog]], detect-secrets. Custo-benefício: [[github_advanced_security|GitHub Advanced Security]], Snyk, SonarQube. Qualidade máxima: [[gitguardian|GitGuardian]], Checkmarx, [[veracode|Veracode]]. Por que difere do caso: Muda Tipo de achado para chaves e tokens expostos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Hook de pré-commit e varredura do histórico; Escala típica: Histórico completo do repositório; Tipo de achado: Chaves e tokens expostos.
- **Revisão de segurança por agente** (`sec-revisao-agente`): Skills e agentes que revisam mudanças. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[raciocinio|Raciocínio]]. Mais barata: [[ctf_skills|CTF Skills]], Snyk Studio Recipes, OpenQodex. Custo-benefício: [[semgrep_skills|Semgrep Skills]], Claude Code Security Review, NVIDIA SkillSpector. Qualidade máxima: [[trail_of_bits_skills|Trail of Bits Skills]], OpenAI Codex Security, Cisco Skill Scanner. Por que difere do caso: Muda Tipo de achado para falhas de lógica e de configuração: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Agente de código com skills de segurança; Escala típica: Cada mudança relevante; Tipo de achado: Falhas de lógica e de configuração.
- **Autenticação e autorização** (`sec-autenticacao`): Login, sessão e controle de acesso corretos. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[auth_js|Auth.js]], Passport, Better Auth. Custo-benefício: [[casbin|Casbin]], SuperTokens, OpenFGA. Qualidade máxima: [[spring_security|Spring Security]], OpenIddict, Ory Kratos. Por que difere do caso: Muda Tipo de achado para login, sessão e controle de acesso: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Biblioteca de autenticação na aplicação; Escala típica: Todas as rotas protegidas; Tipo de achado: Login, sessão e controle de acesso.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gitleaks|Gitleaks (ferramenta)]], Trivy, Semgrep OSS
- **Custo-benefício:** [[github_advanced_security|GitHub Advanced Security]], Snyk, SonarQube
- **Qualidade máxima:** [[veracode|Veracode]], Checkmarx, Sonatype
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Código-fonte é ativo sensível e o envio a scanners externos exige cuidado.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[infraestrutura_devops_e_seguranca|Infraestrutura, DevOps e segurança]]
