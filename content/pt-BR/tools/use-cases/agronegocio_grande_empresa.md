---
id: agronegocio_grande_empresa
tipo: caso-de-uso
nome: Agronegócio (grande empresa)
aliases:
  - agronegocio-grande-empresa
descricao: Coletar dados de campo e máquinas, armazenar grandes volumes, analisar safras e integrar operação ao ERP.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[serie_temporal|Série temporal]]"
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
  - "[[erp|ERP]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[frameworks_mobile|Frameworks de mobile]]"
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
ferramentasRecomendadas:
  - "[[timescaledb|TimescaleDB]]"
  - "[[amazon_s3|Amazon S3 (ferramenta)]]"
  - "[[odoo_community|Odoo Community]]"
  - "[[metabase|Metabase]]"
  - "[[flutter|Flutter]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - grande
segmentos:
  - agro
nicho: cooperativas, tradings e grandes produtores
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[timescaledb|TimescaleDB]]"
    - tabela:victoriametrics
    - tabela:questdb
  custoBeneficio:
    - "[[influxdb_cloud|InfluxDB Cloud]]"
    - tabela:timescale-cloud
    - "[[amazon_timestream|Amazon Timestream (ferramenta)]]"
  qualidadeMaxima:
    - "[[azure_data_explorer|Azure Data Explorer]]"
    - tabela:google-cloud-bigtable
    - tabela:kdb-insights
variacoes:
  - id: agro-telemetria-campo
    nome: Telemetria de campo e frota
    descricao: Sensores, séries temporais e aplicativo de campo.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Grande produtor ou cooperativa
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de produtores
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de leituras de sensores por dia
        fonte: editorial
  - id: agro-imagens-erp
    nome: Imagens de satélite e ERP
    descricao: Armazenamento de objetos, ERP e indicadores de safra.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:minio
      - tabela:backblaze-b2
      - "[[cloudflare_r2|Cloudflare R2]]"
    custoBeneficio:
      - "[[amazon_s3|Amazon S3 (ferramenta)]]"
      - tabela:wasabi
      - "[[odoo_community|Odoo Community]]"
    qualidadeMaxima:
      - "[[sap_s_4hana|SAP S-4HANA]]"
      - tabela:oracle-netsuite
      - "[[tableau|Tableau]]"
    justificativaFerramentas: "Muda Volume típico para terabytes de imagens por safra: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Grande produtor ou cooperativa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação ambiental e rastreabilidade de produção
        fonte: não verificado
      - chave: Volume típico
        valor: Terabytes de imagens por safra
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Agronegócio (grande empresa)
## 📝 Descrição
Coletar dados de campo e máquinas, armazenar grandes volumes, analisar safras e integrar operação ao ERP.
## ⏰ Quando aplicar
- Monitorar sensores de campo e frota
- Planejar safra e logística com dados
## 🧱 Pilha por categoria
- [[serie_temporal|Série temporal]] - dados de sensores e telemetria
- [[objetos_cdn|Armazenamento de objetos e CDN]] - imagens de satélite e drones
- [[erp|ERP]] - gestão da operação
- [[bi_dashboards|BI e dashboards]] - indicadores de safra
- [[frameworks_mobile|Frameworks de mobile]] - aplicativo de campo
- [[aplicativos_self_hosted|Aplicativos self-hosted]] - serviços na fazenda sem internet estável
## ✅ Recomendações
- [[timescaledb|TimescaleDB]] - séries temporais com SQL
- [[amazon_s3|Amazon S3 (ferramenta)]] - armazenamento de objetos para imagens e dados
- [[odoo_community|Odoo Community]] - ERP modular com núcleo aberto
- [[metabase|Metabase]] - painéis simples sobre os dados
- [[flutter|Flutter]] - aplicativo de campo para Android e iOS
## 🧬 Variações
- **Telemetria de campo e frota** (`agro-telemetria-campo`): Sensores, séries temporais e aplicativo de campo. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Grande produtor ou cooperativa; Regulação aplicável: LGPD para dados de produtores (não verificado); Volume típico: Milhões de leituras de sensores por dia.
- **Imagens de satélite e ERP** (`agro-imagens-erp`): Armazenamento de objetos, ERP e indicadores de safra. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: MinIO, Backblaze B2, [[cloudflare_r2|Cloudflare R2]]. Custo-benefício: [[amazon_s3|Amazon S3 (ferramenta)]], Wasabi, [[odoo_community|Odoo Community]]. Qualidade máxima: [[sap_s_4hana|SAP S-4HANA]], Oracle NetSuite, [[tableau|Tableau]]. Por que difere do caso: Muda Volume típico para terabytes de imagens por safra: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Grande produtor ou cooperativa; Regulação aplicável: Legislação ambiental e rastreabilidade de produção (não verificado); Volume típico: Terabytes de imagens por safra.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[timescaledb|TimescaleDB]], VictoriaMetrics, QuestDB
- **Custo-benefício:** [[influxdb_cloud|InfluxDB Cloud]], Timescale Cloud, [[amazon_timestream|Amazon Timestream (ferramenta)]]
- **Qualidade máxima:** [[azure_data_explorer|Azure Data Explorer]], Google Cloud Bigtable, KX kdb Insights
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Dados de campo crescem rápido, e o custo de armazenamento e de transferência decide a viabilidade.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
