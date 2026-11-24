---
id: industria_e_supply_chain_grande_empresa
tipo: caso-de-uso
nome: Indústria e supply chain (grande empresa)
aliases:
  - industria-e-supply-chain-grande-empresa
descricao: Conectar planta, fornecedores e finanças com ERP corporativo, dados de sensores, data warehouse e RH global.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[erp|ERP]]"
  - "[[serie_temporal|Série temporal]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[rh_folha|RH e folha]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
ferramentasRecomendadas:
  - "[[sap_s_4hana|SAP S-4HANA]]"
  - "[[azure_data_explorer|Azure Data Explorer]]"
  - "[[snowflake|Snowflake]]"
  - "[[tableau|Tableau]]"
  - "[[workday_hcm|Workday HCM]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - grande
segmentos:
  - industria
  - logistica
nicho: grandes indústrias e cadeias de suprimento
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
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
variacoes:
  - id: supply-erp-global
    nome: ERP global e RH
    descricao: ERP, folha e integração entre unidades.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Indústria global de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação fiscal de cada país e LGPD
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de colaboradores no ERP
        fonte: editorial
  - id: supply-analitica-telemetria
    nome: Analítica e telemetria
    descricao: Séries temporais, data warehouse e BI.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Volume típico para milhões de eventos de telemetria por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Indústria global de grande porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhões de eventos de telemetria por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Indústria e supply chain (grande empresa)
## 📝 Descrição
Conectar planta, fornecedores e finanças com ERP corporativo, dados de sensores, data warehouse e RH global.
## ⏰ Quando aplicar
- Planejar produção e compras em escala
- Analisar dados de várias plantas
## 🧱 Pilha por categoria
- [[erp|ERP]] - processos corporativos integrados
- [[serie_temporal|Série temporal]] - dados de sensores das plantas
- [[warehouse_lakehouse|Data warehouse e lakehouse]] - análise consolidada
- [[bi_dashboards|BI e dashboards]] - visão executiva
- [[rh_folha|RH e folha]] - gestão de pessoas global
- [[mensageria_streaming|Mensageria e streaming]] - integração entre sistemas
## ✅ Recomendações
- [[sap_s_4hana|SAP S-4HANA]] - ERP corporativo para manufatura
- [[azure_data_explorer|Azure Data Explorer]] - análise de séries temporais em escala
- [[snowflake|Snowflake]] - data warehouse corporativo
- [[tableau|Tableau]] - visualização para a diretoria
- [[workday_hcm|Workday HCM]] - RH corporativo global
## 🧬 Variações
- **ERP global e RH** (`supply-erp-global`): ERP, folha e integração entre unidades. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Indústria global de grande porte; Regulação aplicável: Legislação fiscal de cada país e LGPD (não verificado); Volume típico: Milhares de colaboradores no ERP.
- **Analítica e telemetria** (`supply-analitica-telemetria`): Séries temporais, data warehouse e BI. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[clickhouse|ClickHouse]], DuckDB, Trino. Custo-benefício: [[motherduck|MotherDuck]], [[google_bigquery|Google BigQuery]], [[amazon_athena|Amazon Athena]]. Qualidade máxima: [[snowflake|Snowflake]], Databricks, [[amazon_redshift|Amazon Redshift (ferramenta)]]. Por que difere do caso: Muda Volume típico para milhões de eventos de telemetria por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Indústria global de grande porte; Regulação aplicável: Nenhuma específica; Volume típico: Milhões de eventos de telemetria por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[odoo_community|Odoo Community]], ERPNext, Dolibarr
- **Custo-benefício:** [[omie|Omie]], Bling, Conta Azul
- **Qualidade máxima:** [[sap_s_4hana|SAP S-4HANA]], Oracle NetSuite, TOTVS Protheus
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Sistemas centrais duram muito e custam caro para migrar, então o custo de saída pesa na decisão.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** grande empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
