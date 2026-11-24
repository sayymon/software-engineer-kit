---
id: saude_e_hospitais_media_empresa
tipo: caso-de-uso
nome: Saúde e hospitais (média empresa)
aliases:
  - saude-e-hospitais-media-empresa
descricao: Hospedar sistemas de saúde com segurança, identidade centralizada, segredos protegidos e indicadores para a gestão.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[nuvem_publica_generalista|Nuvem pública generalista]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[autenticacao_identidade|Autenticação e identidade]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[assinatura_eletronica|Assinatura eletrônica]]"
ferramentasRecomendadas:
  - "[[aws|AWS (ferramenta)]]"
  - "[[postgresql|PostgreSQL]]"
  - "[[keycloak|Keycloak]]"
  - "[[hashicorp_vault|HashiCorp Vault]]"
  - "[[metabase|Metabase]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - media
segmentos:
  - saude
nicho: hospitais, laboratórios e operadoras regionais
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[ovhcloud|OVHcloud]]"
    - tabela:scaleway
    - tabela:ibm-cloud
  custoBeneficio:
    - "[[oracle_cloud_infrastructure|Oracle Cloud Infrastructure]]"
    - tabela:alibaba-cloud
    - tabela:tencent-cloud
  qualidadeMaxima:
    - "[[aws|AWS (ferramenta)]]"
    - tabela:microsoft-azure
    - "[[google_cloud|Google Cloud (ferramenta)]]"
variacoes:
  - id: hospital-nuvem-dados
    nome: Nuvem e dados clínicos
    descricao: Banco relacional, identidade e auditoria.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Hospital de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de saúde
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de internações por ano
        fonte: editorial
  - id: hospital-assinatura-indicadores
    nome: Assinatura e indicadores
    descricao: Termos assinados e painéis de ocupação.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[docuseal|DocuSeal]]"
      - tabela:documenso
      - tabela:opensign
    custoBeneficio:
      - "[[zapsign|ZapSign]]"
      - tabela:d4sign
      - tabela:autentique
    qualidadeMaxima:
      - "[[docusign|DocuSign]]"
      - tabela:adobe-sign
      - tabela:clicksign
    justificativaFerramentas: "Muda Volume típico para centenas de documentos assinados por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Hospital de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resolução do CFM sobre prontuário e LGPD
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de documentos assinados por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Saúde e hospitais (média empresa)
## 📝 Descrição
Hospedar sistemas de saúde com segurança, identidade centralizada, segredos protegidos e indicadores para a gestão.
## ⏰ Quando aplicar
- Proteger prontuários e exames
- Dar visão gerencial dos atendimentos
## 🧱 Pilha por categoria
- [[nuvem_publica_generalista|Nuvem pública generalista]] - hospedagem com conformidade
- [[banco_relacional|Banco relacional]] - prontuário e agendas
- [[autenticacao_identidade|Autenticação e identidade]] - acesso por perfil
- [[senhas_segredos|Gerenciador de senhas e segredos]] - segredos de aplicações
- [[bi_dashboards|BI e dashboards]] - indicadores assistenciais
- [[assinatura_eletronica|Assinatura eletrônica]] - laudos e termos
## ✅ Recomendações
- [[aws|AWS (ferramenta)]] - nuvem ampla com programas de conformidade
- [[postgresql|PostgreSQL]] - banco relacional gratuito e consolidado
- [[keycloak|Keycloak]] - identidade centralizada e aberta
- [[hashicorp_vault|HashiCorp Vault]] - gestão de segredos
- [[metabase|Metabase]] - painéis simples para a gestão
## 🧬 Variações
- **Nuvem e dados clínicos** (`hospital-nuvem-dados`): Banco relacional, identidade e auditoria. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Hospital de médio porte; Regulação aplicável: LGPD para dados de saúde (não verificado); Volume típico: Milhares de internações por ano.
- **Assinatura e indicadores** (`hospital-assinatura-indicadores`): Termos assinados e painéis de ocupação. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[docuseal|DocuSeal]], Documenso, OpenSign. Custo-benefício: [[zapsign|ZapSign]], D4Sign, Autentique. Qualidade máxima: [[docusign|DocuSign]], Adobe Acrobat Sign, Clicksign. Por que difere do caso: Muda Volume típico para centenas de documentos assinados por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Hospital de médio porte; Regulação aplicável: Resolução do CFM sobre prontuário e LGPD (não verificado); Volume típico: Centenas de documentos assinados por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[ovhcloud|OVHcloud]], Scaleway, IBM Cloud
- **Custo-benefício:** [[oracle_cloud_infrastructure|Oracle Cloud Infrastructure]], Alibaba Cloud, Tencent Cloud
- **Qualidade máxima:** [[aws|AWS (ferramenta)]], Microsoft Azure, [[google_cloud|Google Cloud (ferramenta)]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados de saúde exigem LGPD e controle de acesso rigoroso, o que orienta a escolha acima de custo.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
