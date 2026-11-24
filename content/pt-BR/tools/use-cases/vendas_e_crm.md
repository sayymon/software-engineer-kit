---
id: vendas_e_crm
tipo: caso-de-uso
nome: Vendas e CRM
aliases: []
descricao: Gerir funil, contatos, propostas e previsão de vendas com CRM e automação.
funcionalidadesNecessarias:
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[geracao_de_infografico|Geração de infográfico]]"
categoriasRelacionadas:
  - "[[crm|CRM]]"
  - "[[assinatura_eletronica|Assinatura eletrônica]]"
  - "[[pesquisa_busca|Pesquisa e busca]]"
  - "[[automacao_marketing|Automação de marketing]]"
  - "[[bi_dashboards|BI e dashboards]]"
ferramentasRecomendadas:
  - "[[hubspot_crm|HubSpot CRM]]"
  - "[[zapsign|ZapSign]]"
  - "[[perplexity|Perplexity]]"
  - "[[firecrawl|Firecrawl]]"
  - "[[mailchimp|Mailchimp]]"
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
  - servicos-profissionais
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[negocio_e_operacao|Negócio e operação]]"
faixasPadrao:
  maisBarata:
    - "[[twenty|Twenty]]"
    - tabela:suitecrm
    - tabela:espocrm
  custoBeneficio:
    - "[[hubspot_crm|HubSpot CRM]]"
    - tabela:pipedrive
    - tabela:rd-station-crm
  qualidadeMaxima:
    - "[[salesforce_sales_cloud|Salesforce Sales Cloud]]"
    - tabela:dynamics-365-sales
    - tabela:sap-sales-cloud
variacoes:
  - id: vendas-crm-funil
    nome: Funil e contatos
    descricao: Etapas, histórico e próximas ações.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pequena e média empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de contatos
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de oportunidades abertas
        fonte: editorial
  - id: vendas-propostas-contratos
    nome: Propostas e contratos
    descricao: Proposta personalizada e assinatura.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[integracao_de_apis|Integração de APIs]]"
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
    justificativaFerramentas: "Muda Volume típico para dezenas de propostas por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa B2B de serviços
        fonte: editorial
      - chave: Regulação aplicável
        valor: Lei 14.063/2020 sobre assinaturas eletrônicas
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de propostas por mês
        fonte: editorial
  - id: vendas-prospeccao-ia
    nome: Prospecção com IA
    descricao: Pesquisa de contas e mensagens iniciais.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[notebooklm|NotebookLM]]"
      - tabela:searxng
      - tabela:duckduckgo
    custoBeneficio:
      - "[[perplexity|Perplexity]]"
      - "[[firecrawl|Firecrawl]]"
      - tabela:tavily
    qualidadeMaxima:
      - tabela:exa
      - tabela:serpapi
      - tabela:brave-search-api
    justificativaFerramentas: "Muda Volume típico para centenas de contas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de vendas outbound
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e consentimento de contato
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de contas por semana
        fonte: editorial
  - id: vendas-automacao-marketing
    nome: Automação de marketing
    descricao: Nutrição de leads e pontuação.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Volume típico para milhares de leads em nutrição: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa B2B com base de leads
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e consentimento do destinatário
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de leads em nutrição
        fonte: editorial
  - id: vendas-previsao-dados
    nome: Previsão e indicadores
    descricao: Painel de conversão e previsão de receita.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Volume típico para milhares de oportunidades históricas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Média e grande empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhares de oportunidades históricas
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Vendas e CRM
## 📝 Descrição
Gerir funil, contatos, propostas e previsão de vendas com CRM e automação.
## ⏰ Quando aplicar
- Equipe comercial pequena
- Operação B2B com ciclo longo
## 🧩 Funcionalidades necessárias
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[busca_na_web|Busca na web]] - Consulta à web em tempo real, com resposta fundamentada em fontes.
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
## ✅ Recomendações
- [[hubspot_crm|HubSpot CRM]] - Faixa custo-benefício em [[crm|CRM]].
- [[zapsign|ZapSign]] - Faixa custo-benefício em [[assinatura_eletronica|Assinatura eletrônica]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[pesquisa_busca|Pesquisa e busca]].
- [[firecrawl|Firecrawl]] - Faixa custo-benefício em [[pesquisa_busca|Pesquisa e busca]].
- [[mailchimp|Mailchimp]] - Faixa custo-benefício em [[automacao_marketing|Automação de marketing]].
## 🧬 Variações
- **Funil e contatos** (`vendas-crm-funil`): Etapas, histórico e próximas ações. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pequena e média empresa; Regulação aplicável: LGPD para dados de contatos (não verificado); Volume típico: Centenas de oportunidades abertas.
- **Propostas e contratos** (`vendas-propostas-contratos`): Proposta personalizada e assinatura. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[docuseal|DocuSeal]], Documenso, OpenSign. Custo-benefício: [[zapsign|ZapSign]], D4Sign, Autentique. Qualidade máxima: [[docusign|DocuSign]], Adobe Acrobat Sign, Clicksign. Por que difere do caso: Muda Volume típico para dezenas de propostas por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa B2B de serviços; Regulação aplicável: Lei 14.063/2020 sobre assinaturas eletrônicas (não verificado); Volume típico: Dezenas de propostas por mês.
- **Prospecção com IA** (`vendas-prospeccao-ia`): Pesquisa de contas e mensagens iniciais. Funcionalidades: [[busca_na_web|Busca na web]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[notebooklm|NotebookLM]], SearXNG, DuckDuckGo. Custo-benefício: [[perplexity|Perplexity]], [[firecrawl|Firecrawl]], Tavily. Qualidade máxima: Exa, SerpApi, Brave Search API. Por que difere do caso: Muda Volume típico para centenas de contas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de vendas outbound; Regulação aplicável: LGPD e consentimento de contato (não verificado); Volume típico: Centenas de contas por semana.
- **Automação de marketing** (`vendas-automacao-marketing`): Nutrição de leads e pontuação. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[mautic|Mautic]], Mailtrain, [[keila|Keila (ferramenta)]]. Custo-benefício: [[mailchimp|Mailchimp]], ActiveCampaign, RD Station Marketing. Qualidade máxima: [[hubspot_marketing_hub|HubSpot Marketing Hub]], Adobe Marketo Engage, Salesforce Marketing Cloud. Por que difere do caso: Muda Volume típico para milhares de leads em nutrição: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa B2B com base de leads; Regulação aplicável: LGPD e consentimento do destinatário (não verificado); Volume típico: Milhares de leads em nutrição.
- **Previsão e indicadores** (`vendas-previsao-dados`): Painel de conversão e previsão de receita. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[metabase|Metabase]], Apache Superset, Evidence. Custo-benefício: [[looker_studio|Looker Studio]], Power BI, Sigma Computing. Qualidade máxima: [[tableau|Tableau]], Looker, [[amazon_quicksight|Amazon QuickSight (ferramenta)]]. Por que difere do caso: Muda Volume típico para milhares de oportunidades históricas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Média e grande empresa; Regulação aplicável: Nenhuma específica; Volume típico: Milhares de oportunidades históricas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[twenty|Twenty]], SuiteCRM, EspoCRM
- **Custo-benefício:** [[hubspot_crm|HubSpot CRM]], Pipedrive, RD Station CRM
- **Qualidade máxima:** [[salesforce_sales_cloud|Salesforce Sales Cloud]], Dynamics 365 Sales, SAP Sales Cloud
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. CRM cobra por usuário e o custo por vendedor decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[negocio_e_operacao|Negócio e operação]]
