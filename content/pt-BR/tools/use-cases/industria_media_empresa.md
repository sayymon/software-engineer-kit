---
id: industria_media_empresa
tipo: caso-de-uso
nome: Indústria (média empresa)
aliases:
  - industria-media-empresa
descricao: Coletar dados de máquinas, acompanhar produção e integrar o chão de fábrica ao ERP com painéis simples.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[serie_temporal|Série temporal]]"
  - "[[erp|ERP]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
ferramentasRecomendadas:
  - "[[influxdb_cloud|InfluxDB Cloud]]"
  - "[[timescaledb|TimescaleDB]]"
  - "[[odoo_community|Odoo Community]]"
  - "[[grafana_cloud|Grafana Cloud]]"
  - "[[metabase|Metabase]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - media
segmentos:
  - industria
nicho: manufatura e automação industrial
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
  - id: industria-telemetria-chao-fabrica
    nome: Telemetria do chão de fábrica
    descricao: Séries temporais de máquinas e alertas.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Indústria de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhares de sensores no chão de fábrica
        fonte: editorial
  - id: industria-erp-indicadores
    nome: ERP e indicadores
    descricao: Produção integrada ao ERP e painéis de OEE.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[odoo_community|Odoo Community]]"
      - tabela:erpnext
      - tabela:dolibarr
    custoBeneficio:
      - "[[omie|Omie]]"
      - tabela:bling
      - tabela:conta-azul
    qualidadeMaxima:
      - "[[sap_s_4hana|SAP S-4HANA]]"
      - tabela:oracle-netsuite
      - tabela:totvs-protheus
    justificativaFerramentas: "Muda Volume típico para dezenas de indicadores por turno: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Indústria de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação fiscal e contábil brasileira
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de indicadores por turno
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Indústria (média empresa)
## 📝 Descrição
Coletar dados de máquinas, acompanhar produção e integrar o chão de fábrica ao ERP com painéis simples.
## ⏰ Quando aplicar
- Monitorar sensores e paradas de máquina
- Integrar produção, estoque e financeiro
## 🧱 Pilha por categoria
- [[serie_temporal|Série temporal]] - dados de sensores
- [[erp|ERP]] - produção, estoque e custos
- [[bi_dashboards|BI e dashboards]] - indicadores de produção
- [[observabilidade_apm|Observabilidade e APM]] - alertas de falhas
- [[aplicativos_self_hosted|Aplicativos self-hosted]] - serviços próprios na rede da fábrica
## ✅ Recomendações
- [[influxdb_cloud|InfluxDB Cloud]] - série temporal gerenciada
- [[timescaledb|TimescaleDB]] - série temporal sobre SQL
- [[odoo_community|Odoo Community]] - ERP modular para manufatura
- [[grafana_cloud|Grafana Cloud]] - painéis e alertas de operação
- [[metabase|Metabase]] - relatórios gerenciais simples
## 🧬 Variações
- **Telemetria do chão de fábrica** (`industria-telemetria-chao-fabrica`): Séries temporais de máquinas e alertas. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Indústria de médio porte; Regulação aplicável: Nenhuma específica; Volume típico: Milhares de sensores no chão de fábrica.
- **ERP e indicadores** (`industria-erp-indicadores`): Produção integrada ao ERP e painéis de OEE. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[odoo_community|Odoo Community]], ERPNext, Dolibarr. Custo-benefício: [[omie|Omie]], Bling, Conta Azul. Qualidade máxima: [[sap_s_4hana|SAP S-4HANA]], Oracle NetSuite, TOTVS Protheus. Por que difere do caso: Muda Volume típico para dezenas de indicadores por turno: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Indústria de médio porte; Regulação aplicável: Legislação fiscal e contábil brasileira (não verificado); Volume típico: Dezenas de indicadores por turno.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[timescaledb|TimescaleDB]], VictoriaMetrics, QuestDB
- **Custo-benefício:** [[influxdb_cloud|InfluxDB Cloud]], Timescale Cloud, [[amazon_timestream|Amazon Timestream (ferramenta)]]
- **Qualidade máxima:** [[azure_data_explorer|Azure Data Explorer]], Google Cloud Bigtable, KX kdb Insights
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Sistemas industriais duram décadas, então formatos abertos e software portável evitam dependência do fornecedor.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
