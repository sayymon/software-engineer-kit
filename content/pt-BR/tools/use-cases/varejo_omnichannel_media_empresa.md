---
id: varejo_omnichannel_media_empresa
tipo: caso-de-uso
nome: Varejo omnichannel (média empresa)
aliases:
  - varejo-omnichannel-media-empresa
descricao: Integrar loja física e online com catálogo único, estoque, pagamentos, CRM e busca eficiente no site.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[ecommerce_lojas|E-commerce e lojas]]"
  - "[[erp|ERP]]"
  - "[[crm|CRM]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[bi_dashboards|BI e dashboards]]"
ferramentasRecomendadas:
  - "[[shopify|Shopify]]"
  - "[[odoo_community|Odoo Community]]"
  - "[[hubspot_crm|HubSpot CRM]]"
  - "[[adyen|Adyen]]"
  - "[[algolia|Algolia]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - media
segmentos:
  - varejo-ecommerce
nicho: varejo com lojas físicas e online
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[medusa|Medusa]]"
    - tabela:woocommerce
    - tabela:prestashop
  custoBeneficio:
    - "[[shopify|Shopify]]"
    - tabela:nuvemshop
    - tabela:bigcommerce
  qualidadeMaxima:
    - "[[adobe_commerce|Adobe Commerce]]"
    - tabela:salesforce-commerce-cloud
    - tabela:vtex
variacoes:
  - id: omni-loja-estoque-crm
    nome: Loja, estoque e CRM
    descricao: Plataforma de e-commerce integrada a ERP e CRM.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Rede de varejo de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código de Defesa do Consumidor e legislação fiscal
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de pedidos por dia
        fonte: editorial
  - id: omni-busca-pagamento
    nome: Busca e pagamento
    descricao: Busca de produto, pagamento e painel de vendas.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[opensearch|OpenSearch]]"
      - tabela:meilisearch
      - tabela:typesense
    custoBeneficio:
      - "[[algolia|Algolia]]"
      - tabela:elastic-cloud
      - tabela:clickhouse-cloud
    qualidadeMaxima:
      - "[[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]]"
      - tabela:azure-ai-search
      - tabela:google-vertex-ai-search
    justificativaFerramentas: "Muda Volume típico para milhares de buscas por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Rede de varejo de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Regras do Pix e do arranjo de pagamentos do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de buscas por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Varejo omnichannel (média empresa)
## 📝 Descrição
Integrar loja física e online com catálogo único, estoque, pagamentos, CRM e busca eficiente no site.
## ⏰ Quando aplicar
- Unificar estoque entre lojas e e-commerce
- Personalizar a oferta com dados de clientes
## 🧱 Pilha por categoria
- [[ecommerce_lojas|E-commerce e lojas]] - vitrine e checkout
- [[erp|ERP]] - estoque e financeiro integrados
- [[crm|CRM]] - histórico do cliente
- [[pagamentos|Pagamentos]] - adquirência e meios locais
- [[busca_analitico|Busca e analítico]] - busca no catálogo
- [[bi_dashboards|BI e dashboards]] - indicadores por canal
## ✅ Recomendações
- [[shopify|Shopify]] - e-commerce escalável com ecossistema de apps
- [[odoo_community|Odoo Community]] - ERP modular com núcleo open source
- [[hubspot_crm|HubSpot CRM]] - CRM com camada gratuita para começar
- [[adyen|Adyen]] - pagamentos unificados online e presenciais
- [[algolia|Algolia]] - busca rápida no catálogo
## 🧬 Variações
- **Loja, estoque e CRM** (`omni-loja-estoque-crm`): Plataforma de e-commerce integrada a ERP e CRM. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Rede de varejo de médio porte; Regulação aplicável: Código de Defesa do Consumidor e legislação fiscal (não verificado); Volume típico: Milhares de pedidos por dia.
- **Busca e pagamento** (`omni-busca-pagamento`): Busca de produto, pagamento e painel de vendas. Funcionalidades: [[busca_semantica|Busca semântica]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[opensearch|OpenSearch]], Meilisearch, Typesense. Custo-benefício: [[algolia|Algolia]], Elastic Cloud, ClickHouse Cloud. Qualidade máxima: [[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]], Azure AI Search, Google Vertex AI Search. Por que difere do caso: Muda Volume típico para milhares de buscas por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Rede de varejo de médio porte; Regulação aplicável: Regras do Pix e do arranjo de pagamentos do Banco Central (não verificado); Volume típico: Milhares de buscas por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[medusa|Medusa]], WooCommerce, PrestaShop
- **Custo-benefício:** [[shopify|Shopify]], Nuvemshop, BigCommerce
- **Qualidade máxima:** [[adobe_commerce|Adobe Commerce]], Salesforce Commerce Cloud, VTEX
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Integração entre canais cria dependências, e escolher peças com APIs abertas mantém a troca possível.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
