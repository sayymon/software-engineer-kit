---
id: marketplace_e_plataformas_grande_empresa
tipo: caso-de-uso
nome: Marketplace e plataformas (grande empresa)
aliases:
  - marketplace-e-plataformas-grande-empresa
descricao: Conectar vendedores e compradores em escala com pagamentos divididos, busca, eventos, jobs duráveis e observabilidade.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[pagamentos|Pagamentos]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[busca_analitico|Busca e analítico]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[filas_jobs_background|Filas e jobs em background]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[serverless_edge|Serverless e edge]]"
ferramentasRecomendadas:
  - "[[adyen|Adyen]]"
  - "[[confluent_cloud|Confluent Cloud]]"
  - "[[algolia|Algolia]]"
  - "[[datadog|Datadog]]"
  - "[[temporal|Temporal]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - grande
segmentos:
  - varejo-ecommerce
  - software-saas
nicho: plataformas de dois lados e marketplaces
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[mercado_pago|Mercado Pago]]"
    - tabela:pagbank
    - tabela:asaas
  custoBeneficio:
    - "[[stripe|Stripe]]"
    - tabela:paypal
    - tabela:paddle
  qualidadeMaxima:
    - "[[adyen|Adyen]]"
    - tabela:braintree
    - tabela:checkout-com
variacoes:
  - id: marketplace-pagamentos-eventos
    nome: Pagamentos e eventos
    descricao: Pagamento split, mensageria e jobs.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Marketplace de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Regras do Pix e do arranjo de pagamentos do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de transações por mês
        fonte: editorial
  - id: marketplace-busca-escala
    nome: Busca e escala
    descricao: Busca de catálogo, banco relacional e edge.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
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
    justificativaFerramentas: "Muda Volume típico para milhões de buscas por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Marketplace de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhões de buscas por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Marketplace e plataformas (grande empresa)
## 📝 Descrição
Conectar vendedores e compradores em escala com pagamentos divididos, busca, eventos, jobs duráveis e observabilidade.
## ⏰ Quando aplicar
- Repassar valores entre várias partes
- Manter busca e eventos em alta escala
## 🧱 Pilha por categoria
- [[pagamentos|Pagamentos]] - split e repasse
- [[mensageria_streaming|Mensageria e streaming]] - eventos da plataforma
- [[busca_analitico|Busca e analítico]] - busca de ofertas
- [[observabilidade_apm|Observabilidade e APM]] - estabilidade da plataforma
- [[filas_jobs_background|Filas e jobs em background]] - processos duráveis
- [[banco_relacional|Banco relacional]] - dados transacionais
- [[serverless_edge|Serverless e edge]] - picos e latência global
## ✅ Recomendações
- [[adyen|Adyen]] - pagamentos com suporte a marketplaces
- [[confluent_cloud|Confluent Cloud]] - eventos de alto volume
- [[algolia|Algolia]] - busca de baixa latência
- [[datadog|Datadog]] - observabilidade de ponta a ponta
- [[temporal|Temporal]] - fluxos duráveis para processos longos
## 🧬 Variações
- **Pagamentos e eventos** (`marketplace-pagamentos-eventos`): Pagamento split, mensageria e jobs. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Marketplace de grande porte; Regulação aplicável: Regras do Pix e do arranjo de pagamentos do Banco Central (não verificado); Volume típico: Milhões de transações por mês.
- **Busca e escala** (`marketplace-busca-escala`): Busca de catálogo, banco relacional e edge. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_embeddings|Geração de embeddings]]. Mais barata: [[opensearch|OpenSearch]], Meilisearch, Typesense. Custo-benefício: [[algolia|Algolia]], Elastic Cloud, ClickHouse Cloud. Qualidade máxima: [[amazon_opensearch_service|Amazon OpenSearch Service (ferramenta)]], Azure AI Search, Google Vertex AI Search. Por que difere do caso: Muda Volume típico para milhões de buscas por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Marketplace de grande porte; Regulação aplicável: Nenhuma específica; Volume típico: Milhões de buscas por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[mercado_pago|Mercado Pago]], PagBank PagSeguro, Asaas
- **Custo-benefício:** [[stripe|Stripe]], PayPal, Paddle
- **Qualidade máxima:** [[adyen|Adyen]], Braintree, Checkout.com
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Plataformas crescem por anos, e componentes de dados e eventos portáveis facilitam evoluir a arquitetura.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
