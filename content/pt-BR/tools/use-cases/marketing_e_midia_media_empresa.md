---
id: marketing_e_midia_media_empresa
tipo: caso-de-uso
nome: Marketing e mídia (média empresa)
aliases:
  - marketing-e-midia-media-empresa
descricao: Produzir e distribuir conteúdo em escala com automação de marketing, CMS, análise de audiência e produção audiovisual.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[automacao_marketing|Automação de marketing]]"
  - "[[cms|CMS]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[edicao_video|Edição de vídeo]]"
  - "[[edicao_imagem|Edição de imagem]]"
ferramentasRecomendadas:
  - "[[hubspot_marketing_hub|HubSpot Marketing Hub]]"
  - "[[wordpress|WordPress]]"
  - "[[posthog|PostHog]]"
  - "[[looker_studio|Looker Studio]]"
  - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - media
segmentos:
  - marketing-agencias
nicho: agências de porte médio e produtoras de conteúdo
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[mautic|Mautic]]"
    - tabela:mailtrain
    - "[[keila|Keila (ferramenta)]]"
  custoBeneficio:
    - "[[mailchimp|Mailchimp]]"
    - tabela:activecampaign
    - tabela:rd-station-marketing
  qualidadeMaxima:
    - "[[hubspot_marketing_hub|HubSpot Marketing Hub]]"
    - tabela:marketo
    - tabela:salesforce-marketing-cloud
variacoes:
  - id: marketing-campanhas-automacao
    nome: Campanhas e automação
    descricao: Jornadas, e-mail e segmentação de público.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Agência ou área de marketing de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e consentimento do destinatário
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de envios por semana
        fonte: editorial
  - id: marketing-producao-criativa
    nome: Produção criativa
    descricao: Vídeo, imagem e site de campanha.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - "[[capcut|CapCut]]"
      - tabela:descript
      - tabela:veed
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - "[[runway|Runway]]"
      - tabela:final-cut-pro
    justificativaFerramentas: "Muda Volume típico para dezenas de vídeos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Agência ou área de marketing de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: CONAR e regras de publicidade das plataformas
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de vídeos por mês
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Marketing e mídia (média empresa)
## 📝 Descrição
Produzir e distribuir conteúdo em escala com automação de marketing, CMS, análise de audiência e produção audiovisual.
## ⏰ Quando aplicar
- Gerir campanhas de vários canais
- Produzir vídeo e conteúdo em escala
## 🧱 Pilha por categoria
- [[automacao_marketing|Automação de marketing]] - campanhas e jornadas
- [[cms|CMS]] - sites e blogs
- [[analytics_produto_web|Analytics de produto e web]] - audiência e conversão
- [[bi_dashboards|BI e dashboards]] - relatórios para clientes
- [[edicao_video|Edição de vídeo]] - produção audiovisual
- [[edicao_imagem|Edição de imagem]] - peças gráficas
## ✅ Recomendações
- [[hubspot_marketing_hub|HubSpot Marketing Hub]] - automação e CRM integrados
- [[wordpress|WordPress]] - CMS com ecossistema amplo
- [[posthog|PostHog]] - analytics com funis e gravações
- [[looker_studio|Looker Studio]] - relatórios gratuitos para clientes
- [[adobe_premiere_pro|Adobe Premiere Pro]] - edição profissional de vídeo
## 🧬 Variações
- **Campanhas e automação** (`marketing-campanhas-automacao`): Jornadas, e-mail e segmentação de público. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Agência ou área de marketing de médio porte; Regulação aplicável: LGPD e consentimento do destinatário (não verificado); Volume típico: Milhares de envios por semana.
- **Produção criativa** (`marketing-producao-criativa`): Vídeo, imagem e site de campanha. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut. Custo-benefício: [[capcut|CapCut]], Descript, VEED. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], [[runway|Runway]], Final Cut Pro. Por que difere do caso: Muda Volume típico para dezenas de vídeos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Agência ou área de marketing de médio porte; Regulação aplicável: CONAR e regras de publicidade das plataformas (não verificado); Volume típico: Dezenas de vídeos por mês.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[mautic|Mautic]], Mailtrain, [[keila|Keila (ferramenta)]]
- **Custo-benefício:** [[mailchimp|Mailchimp]], ActiveCampaign, RD Station Marketing
- **Qualidade máxima:** [[hubspot_marketing_hub|HubSpot Marketing Hub]], Adobe Marketo Engage, Salesforce Marketing Cloud
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Agências repassam custos a vários clientes, e o preço por usuário define a margem de cada contrato.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
