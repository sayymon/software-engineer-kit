---
id: setor_publico_grande_empresa
tipo: caso-de-uso
nome: Setor público (grande empresa)
aliases:
  - setor-publico-grande-empresa
descricao: Prover serviços digitais com software aberto, identidade centralizada, repositórios próprios e infraestrutura declarada em código.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[keycloak|Keycloak]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[forgejo|Forgejo]]"
  - "[[opentofu|OpenTofu]]"
  - "[[bookstack|BookStack]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - grande
segmentos:
  - setor-publico
nicho: órgãos e empresas públicas
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[uptime_kuma|Uptime Kuma]]"
    - tabela:vaultwarden
    - tabela:portainer
  custoBeneficio:
    - "[[immich|Immich]]"
    - tabela:nextcloud
    - tabela:paperless-ngx
  qualidadeMaxima:
    - "[[coolify|Coolify]]"
    - tabela:supabase-repo
    - "[[n8n|n8n]]"
variacoes:
  - id: publico-self-hosted-aberto
    nome: Software aberto e self-hosted
    descricao: Aplicativos hospedados pelo próprio órgão e código em repositório próprio.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Órgão público de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Lei de Acesso à Informação e LGPD
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de servidores atendidos
        fonte: editorial
  - id: publico-identidade-iac
    nome: Identidade e infraestrutura como código
    descricao: Identidade, banco relacional e provisionamento.
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
    justificativaFerramentas: "Muda Volume típico para milhares de contas de servidores: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Órgão público de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Normas de segurança da informação do governo federal
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de contas de servidores
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Setor público (grande empresa)
## 📝 Descrição
Prover serviços digitais com software aberto, identidade centralizada, repositórios próprios e infraestrutura declarada em código.
## ⏰ Quando aplicar
- Reduzir dependência de fornecedores
- Documentar e auditar infraestrutura
## 🧱 Pilha por categoria
- [[aplicativos_self_hosted|Aplicativos self-hosted]] - serviços sob controle do órgão
- [[banco_relacional|Banco relacional]] - dados dos serviços
- [[autenticacao_identidade|Autenticação e identidade]] - identidade do servidor e do cidadão
- [[controle_versao_colaboracao|Controle de versão e colaboração]] - código próprio
- [[infraestrutura_como_codigo|Infraestrutura como código]] - ambiente documentado
- [[wiki_base_conhecimento|Wiki e base de conhecimento]] - documentação interna
## ✅ Recomendações
- [[keycloak|Keycloak]] - identidade open source auditável
- [[postgresql|PostgreSQL]] - banco gratuito e padrão aberto
- [[forgejo|Forgejo]] - forja de código self-hosted
- [[opentofu|OpenTofu]] - infraestrutura como código open source
- [[bookstack|BookStack]] - wiki self-hosted
## 🧬 Variações
- **Software aberto e self-hosted** (`publico-self-hosted-aberto`): Aplicativos hospedados pelo próprio órgão e código em repositório próprio. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Órgão público de grande porte; Regulação aplicável: Lei de Acesso à Informação e LGPD (não verificado); Volume típico: Milhares de servidores atendidos.
- **Identidade e infraestrutura como código** (`publico-identidade-iac`): Identidade, banco relacional e provisionamento. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[keycloak|Keycloak]], SuperTokens, authentik. Custo-benefício: [[clerk|Clerk]], Auth0, Firebase Authentication. Qualidade máxima: [[okta_workforce_identity|Okta Workforce Identity]], Microsoft Entra ID, PingOne. Por que difere do caso: Muda Volume típico para milhares de contas de servidores: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Órgão público de grande porte; Regulação aplicável: Normas de segurança da informação do governo federal (não verificado); Volume típico: Milhares de contas de servidores.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[uptime_kuma|Uptime Kuma]], Vaultwarden, Portainer
- **Custo-benefício:** [[immich|Immich]], Nextcloud, Paperless-ngx
- **Qualidade máxima:** [[coolify|Coolify]], Supabase, [[n8n|n8n]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Contratações públicas valorizam software aberto e portabilidade para evitar dependência de um único fornecedor.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
