---
id: analise_de_dados_e_bi
tipo: caso-de-uso
nome: Análise de dados e BI
aliases: []
descricao: Explorar dados, criar indicadores e painéis e responder perguntas de negócio.
funcionalidadesNecessarias:
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[geracao_de_infografico|Geração de infográfico]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
categoriasRelacionadas:
  - "[[bi_dashboards|BI e dashboards]]"
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
  - "[[playgrounds_utilitarios_online|Playgrounds e utilitários online]]"
  - "[[frameworks_analise_dados|Frameworks de análise de dados]]"
  - "[[warehouse_lakehouse|Data warehouse e lakehouse]]"
ferramentasRecomendadas:
  - "[[looker_studio|Looker Studio]]"
  - "[[microsoft_excel|Microsoft Excel]]"
  - "[[airtable|Airtable]]"
  - "[[codesandbox|CodeSandbox]]"
  - "[[polars|Polars]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - dados-analytics
  - servicos-profissionais
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dados_e_analytics|Dados e analytics]]"
faixasPadrao:
  maisBarata:
    - "[[metabase|Metabase]]"
    - tabela:apache-superset
    - tabela:evidence
  custoBeneficio:
    - "[[looker_studio|Looker Studio]]"
    - tabela:power-bi
    - tabela:sigma-computing
  qualidadeMaxima:
    - "[[tableau|Tableau]]"
    - tabela:looker
    - "[[amazon_quicksight|Amazon QuickSight (ferramenta)]]"
variacoes:
  - id: bi-painel-executivo
    nome: Painel executivo
    descricao: Indicadores centrais com atualização periódica.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL e ferramenta de painel
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de indicadores atualizados todo dia
        fonte: editorial
      - chave: Público do resultado
        valor: Diretoria e gestores
        fonte: editorial
  - id: bi-exploracao-linguagem-natural
    nome: Exploração em linguagem natural
    descricao: Perguntas em português sobre as tabelas.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[libreoffice|LibreOffice]]"
      - tabela:google-sheets
      - "[[google_colab|Google Colab (ferramenta)]]"
    custoBeneficio:
      - "[[microsoft_excel|Microsoft Excel]]"
      - tabela:julius-ai
      - "[[airtable|Airtable]]"
    qualidadeMaxima:
      - "[[chatgpt|ChatGPT]]"
      - "[[claude|Claude AI]]"
      - tabela:hex
    justificativaFerramentas: "Muda Público do resultado para analista de negócio sem SQL: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Pergunta em português traduzida para SQL
        fonte: editorial
      - chave: Escala típica
        valor: Poucas tabelas bem descritas
        fonte: editorial
      - chave: Público do resultado
        valor: Analista de negócio sem SQL
        fonte: editorial
  - id: bi-notebook-analise
    nome: Notebook de análise
    descricao: Código, gráficos e narrativa no mesmo documento.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[geracao_de_infografico|Geração de infográfico]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_colab|Google Colab (ferramenta)]]"
      - tabela:kaggle-notebooks
      - tabela:observable
    custoBeneficio:
      - tabela:hex
      - tabela:replit
      - tabela:stackblitz
    qualidadeMaxima:
      - tabela:databricks
      - tabela:aws-sagemaker
      - tabela:google-vertex-ai
    justificativaFerramentas: "Muda Público do resultado para time de dados e quem revisa a análise: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python ou R em células
        fonte: editorial
      - chave: Escala típica
        valor: Um estudo por notebook
        fonte: editorial
      - chave: Público do resultado
        valor: Time de dados e quem revisa a análise
        fonte: editorial
  - id: bi-dataframes
    nome: Análise com dataframes
    descricao: Transformações e estatística em código.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pandas|pandas]]"
      - tabela:numpy
      - tabela:matplotlib
    custoBeneficio:
      - "[[polars|Polars]]"
      - tabela:duckdb
      - tabela:plotly
    qualidadeMaxima:
      - "[[dask|Dask]]"
      - tabela:pyspark
      - tabela:ray
    justificativaFerramentas: "Muda Público do resultado para cientista e engenheiro de dados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Python com dataframes
        fonte: editorial
      - chave: Escala típica
        valor: Dados que cabem em memória ou em cluster
        fonte: editorial
      - chave: Público do resultado
        valor: Cientista e engenheiro de dados
        fonte: editorial
  - id: bi-warehouse-consulta
    nome: Consulta em data warehouse
    descricao: SQL sobre grandes volumes.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_codigo|Geração de código]]"
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
    justificativaFerramentas: "Muda Público do resultado para toda a empresa por consulta e painel: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: SQL analítico no warehouse
        fonte: editorial
      - chave: Escala típica
        valor: Bilhões de linhas
        fonte: editorial
      - chave: Público do resultado
        valor: Toda a empresa por consulta e painel
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Análise de dados e BI
## 📝 Descrição
Explorar dados, criar indicadores e painéis e responder perguntas de negócio.
## ⏰ Quando aplicar
- Painel de resultados da empresa
- Análise exploratória com perguntas em linguagem natural
## 🧩 Funcionalidades necessárias
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
## ✅ Recomendações
- [[looker_studio|Looker Studio]] - Faixa custo-benefício em [[bi_dashboards|BI e dashboards]].
- [[microsoft_excel|Microsoft Excel]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[airtable|Airtable]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[codesandbox|CodeSandbox]] - Faixa custo-benefício em [[playgrounds_utilitarios_online|Playgrounds e utilitários online]].
- [[polars|Polars]] - Faixa custo-benefício em [[frameworks_analise_dados|Frameworks de análise de dados]].
## 🧬 Variações
- **Painel executivo** (`bi-painel-executivo`): Indicadores centrais com atualização periódica. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: SQL e ferramenta de painel; Escala típica: Dezenas de indicadores atualizados todo dia; Público do resultado: Diretoria e gestores.
- **Exploração em linguagem natural** (`bi-exploracao-linguagem-natural`): Perguntas em português sobre as tabelas. Funcionalidades: [[raciocinio|Raciocínio]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[libreoffice|LibreOffice]], Google Sheets, [[google_colab|Google Colab (ferramenta)]]. Custo-benefício: [[microsoft_excel|Microsoft Excel]], Julius AI, [[airtable|Airtable]]. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], Hex. Por que difere do caso: Muda Público do resultado para analista de negócio sem SQL: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Pergunta em português traduzida para SQL; Escala típica: Poucas tabelas bem descritas; Público do resultado: Analista de negócio sem SQL.
- **Notebook de análise** (`bi-notebook-analise`): Código, gráficos e narrativa no mesmo documento. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[geracao_de_infografico|Geração de infográfico]]. Mais barata: [[google_colab|Google Colab (ferramenta)]], Kaggle Notebooks, Observable. Custo-benefício: Hex, Replit, StackBlitz. Qualidade máxima: Databricks, Amazon SageMaker, Vertex AI. Por que difere do caso: Muda Público do resultado para time de dados e quem revisa a análise: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python ou R em células; Escala típica: Um estudo por notebook; Público do resultado: Time de dados e quem revisa a análise.
- **Análise com dataframes** (`bi-dataframes`): Transformações e estatística em código. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[pandas|pandas]], NumPy, Matplotlib. Custo-benefício: [[polars|Polars]], DuckDB, Plotly. Qualidade máxima: [[dask|Dask]], Apache Spark, Ray. Por que difere do caso: Muda Público do resultado para cientista e engenheiro de dados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Python com dataframes; Escala típica: Dados que cabem em memória ou em cluster; Público do resultado: Cientista e engenheiro de dados.
- **Consulta em data warehouse** (`bi-warehouse-consulta`): SQL sobre grandes volumes. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_codigo|Geração de código]]. Mais barata: [[clickhouse|ClickHouse]], DuckDB, Trino. Custo-benefício: [[motherduck|MotherDuck]], [[google_bigquery|Google BigQuery]], [[amazon_athena|Amazon Athena]]. Qualidade máxima: [[snowflake|Snowflake]], Databricks, [[amazon_redshift|Amazon Redshift (ferramenta)]]. Por que difere do caso: Muda Público do resultado para toda a empresa por consulta e painel: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: SQL analítico no warehouse; Escala típica: Bilhões de linhas; Público do resultado: Toda a empresa por consulta e painel.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[metabase|Metabase]], Apache Superset, Evidence
- **Custo-benefício:** [[looker_studio|Looker Studio]], Power BI, Sigma Computing
- **Qualidade máxima:** [[tableau|Tableau]], Looker, [[amazon_quicksight|Amazon QuickSight (ferramenta)]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. BI cobra por usuário e consulta, então o custo por analista decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[dados_e_analytics|Dados e analytics]]
