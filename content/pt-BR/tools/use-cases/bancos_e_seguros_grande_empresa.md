---
id: bancos_e_seguros_grande_empresa
tipo: caso-de-uso
nome: Bancos e seguros (grande empresa)
aliases:
  - bancos-e-seguros-grande-empresa
descricao: Sustentar sistemas financeiros em escala com análise de dados, identidade corporativa, segredos, streaming e segurança de código.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[containers_orquestracao|Containers e orquestração]]"
ferramentasRecomendadas:
  - "[[snowflake|Snowflake]]"
  - "[[confluent_cloud|Confluent Cloud]]"
  - "[[okta_workforce_identity|Okta Workforce Identity]]"
  - "[[hashicorp_vault|HashiCorp Vault]]"
  - "[[veracode|Veracode]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - grande
segmentos:
  - financeiro-fintech
nicho: instituições financeiras e seguradoras
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[clickhouse|ClickHouse]]"
    - tabela:duckdb
    - tabela:trino
  custoBeneficio:
    - "[[motherduck|MotherDuck]]"
    - "[[google_bigquery|Google BigQuery]]"
    - "[[amazon_athena|Amazon Athena]]"
  qualidadeMaxima:
    - "[[snowflake|Snowflake]]"
    - tabela:databricks
    - "[[amazon_redshift|Amazon Redshift (ferramenta)]]"
variacoes:
  - id: banco-dados-streaming
    nome: Dados e streaming
    descricao: Data warehouse e mensageria em volume.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Banco ou seguradora de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resoluções do Banco Central e LGPD
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de eventos por hora
        fonte: editorial
  - id: banco-identidade-conformidade
    nome: Identidade e conformidade
    descricao: Identidade corporativa, segredos e segurança de código.
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
    justificativaFerramentas: "Muda Volume típico para milhares de acessos privilegiados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Banco ou seguradora de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resoluções do Banco Central e normas da SUSEP
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de acessos privilegiados
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Bancos e seguros (grande empresa)
## 📝 Descrição
Sustentar sistemas financeiros em escala com análise de dados, identidade corporativa, segredos, streaming e segurança de código.
## ⏰ Quando aplicar
- Consolidar dados de risco e clientes
- Atender requisitos regulatórios e de auditoria
## 🧱 Pilha por categoria
- [[warehouse_lakehouse|Data warehouse e lakehouse]] - análise de risco e clientes
- [[mensageria_streaming|Mensageria e streaming]] - eventos entre sistemas
- [[autenticacao_identidade|Autenticação e identidade]] - identidade corporativa
- [[senhas_segredos|Gerenciador de senhas e segredos]] - segredos auditáveis
- [[seguranca_codigo|Segurança de código]] - conformidade no desenvolvimento
- [[observabilidade_apm|Observabilidade e APM]] - continuidade dos serviços
- [[containers_orquestracao|Containers e orquestração]] - plataforma de execução
## ✅ Recomendações
- [[snowflake|Snowflake]] - data warehouse gerenciado em nuvem
- [[confluent_cloud|Confluent Cloud]] - Kafka gerenciado para eventos
- [[okta_workforce_identity|Okta Workforce Identity]] - identidade corporativa
- [[hashicorp_vault|HashiCorp Vault]] - segredos com trilha de auditoria
- [[veracode|Veracode]] - análise de segurança de código
## 🧬 Variações
- **Dados e streaming** (`banco-dados-streaming`): Data warehouse e mensageria em volume. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Banco ou seguradora de grande porte; Regulação aplicável: Resoluções do Banco Central e LGPD (não verificado); Volume típico: Milhões de eventos por hora.
- **Identidade e conformidade** (`banco-identidade-conformidade`): Identidade corporativa, segredos e segurança de código. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[keycloak|Keycloak]], SuperTokens, authentik. Custo-benefício: [[clerk|Clerk]], Auth0, Firebase Authentication. Qualidade máxima: [[okta_workforce_identity|Okta Workforce Identity]], Microsoft Entra ID, PingOne. Por que difere do caso: Muda Volume típico para milhares de acessos privilegiados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Banco ou seguradora de grande porte; Regulação aplicável: Resoluções do Banco Central e normas da SUSEP (não verificado); Volume típico: Milhares de acessos privilegiados.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[clickhouse|ClickHouse]], DuckDB, Trino
- **Custo-benefício:** [[motherduck|MotherDuck]], [[google_bigquery|Google BigQuery]], [[amazon_athena|Amazon Athena]]
- **Qualidade máxima:** [[snowflake|Snowflake]], Databricks, [[amazon_redshift|Amazon Redshift (ferramenta)]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Regulação financeira e proteção de dados de clientes têm prioridade sobre custo e velocidade.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
