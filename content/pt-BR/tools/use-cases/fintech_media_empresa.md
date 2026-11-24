---
id: fintech_media_empresa
tipo: caso-de-uso
nome: Fintech (média empresa)
aliases:
  - fintech-media-empresa
descricao: Operar produto financeiro com consistência de dados, identidade segura, observabilidade e infraestrutura reproduzível.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[banco_relacional|Banco relacional]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
ferramentasRecomendadas:
  - "[[postgresql|PostgreSQL]]"
  - "[[keycloak|Keycloak]]"
  - "[[adyen|Adyen]]"
  - "[[datadog|Datadog]]"
  - "[[terraform|Terraform]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - media
segmentos:
  - financeiro-fintech
nicho: serviços financeiros digitais
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[postgresql|PostgreSQL]]"
    - tabela:mariadb
    - tabela:sqlite
  custoBeneficio:
    - "[[neon|Neon]]"
    - tabela:planetscale
    - tabela:cockroachdb
  qualidadeMaxima:
    - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
    - tabela:google-cloud-spanner
    - tabela:azure-sql-database
variacoes:
  - id: fintech-core-pagamentos
    nome: Núcleo transacional e pagamentos
    descricao: Banco relacional, mensageria e processamento de pagamento.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Fintech de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resoluções do Banco Central para instituições de pagamento
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de transações por mês
        fonte: editorial
  - id: fintech-identidade-seguranca
    nome: Identidade e segurança
    descricao: Login, segredos e varredura de código.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Volume típico para milhares de acessos por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Fintech de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e regras de autenticação do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de acessos por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Fintech (média empresa)
## 📝 Descrição
Operar produto financeiro com consistência de dados, identidade segura, observabilidade e infraestrutura reproduzível.
## ⏰ Quando aplicar
- Processar pagamentos e saldos com consistência
- Passar por auditorias de segurança
## 🧱 Pilha por categoria
- [[banco_relacional|Banco relacional]] - consistência transacional
- [[mensageria_streaming|Mensageria e streaming]] - eventos entre serviços
- [[autenticacao_identidade|Autenticação e identidade]] - login e autorização
- [[observabilidade_apm|Observabilidade e APM]] - detecção rápida de falhas
- [[pagamentos|Pagamentos]] - movimentação de valores
- [[seguranca_codigo|Segurança de código]] - reduzir vulnerabilidades
- [[infraestrutura_como_codigo|Infraestrutura como código]] - ambientes auditáveis
## ✅ Recomendações
- [[postgresql|PostgreSQL]] - banco transacional robusto e portável
- [[keycloak|Keycloak]] - identidade open source e auditável
- [[adyen|Adyen]] - processamento de pagamentos global
- [[datadog|Datadog]] - observabilidade completa para serviços críticos
- [[terraform|Terraform]] - infraestrutura versionada e reproduzível
## 🧬 Variações
- **Núcleo transacional e pagamentos** (`fintech-core-pagamentos`): Banco relacional, mensageria e processamento de pagamento. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Fintech de médio porte; Regulação aplicável: Resoluções do Banco Central para instituições de pagamento (não verificado); Volume típico: Milhões de transações por mês.
- **Identidade e segurança** (`fintech-identidade-seguranca`): Login, segredos e varredura de código. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[keycloak|Keycloak]], SuperTokens, authentik. Custo-benefício: [[clerk|Clerk]], Auth0, Firebase Authentication. Qualidade máxima: [[okta_workforce_identity|Okta Workforce Identity]], Microsoft Entra ID, PingOne. Por que difere do caso: Muda Volume típico para milhares de acessos por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Fintech de médio porte; Regulação aplicável: LGPD e regras de autenticação do Banco Central (não verificado); Volume típico: Milhares de acessos por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[postgresql|PostgreSQL]], MariaDB, SQLite
- **Custo-benefício:** [[neon|Neon]], PlanetScale, CockroachDB
- **Qualidade máxima:** [[amazon_aurora|Amazon Aurora (ferramenta)]], Google Cloud Spanner, Azure SQL Database
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados financeiros e requisitos regulatórios pedem controle sobre onde os dados ficam e quem os acessa.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
