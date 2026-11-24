---
id: restaurante_e_delivery_pequena_empresa
tipo: caso-de-uso
nome: Restaurante e delivery (pequena empresa)
aliases:
  - restaurante-e-delivery-pequena-empresa
descricao: Gerir pedidos, estoque, pagamentos, nota fiscal e relacionamento com clientes de um restaurante ou operação de delivery.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[erp|ERP]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[fiscal_contabilidade_brasil|Fiscal e contabilidade (Brasil)]]"
  - "[[suporte_atendimento|Suporte e atendimento]]"
  - "[[automacao_marketing|Automação de marketing]]"
ferramentasRecomendadas:
  - "[[omie|Omie]]"
  - "[[mercado_pago|Mercado Pago]]"
  - "[[focus_nfe|Focus NFe]]"
  - "[[chatwoot|Chatwoot]]"
  - "[[mailchimp|Mailchimp]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pequena
segmentos:
  - alimentacao
nicho: restaurantes, lanchonetes e delivery
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
  - id: restaurante-gestao-fiscal
    nome: Gestão e fiscal
    descricao: ERP de salão, estoque e nota fiscal.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Restaurante ou delivery pequeno
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação de NF-e e NFS-e
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de pedidos por semana
        fonte: editorial
  - id: restaurante-pedidos-atendimento
    nome: Pedidos e atendimento
    descricao: Pagamento, chat com cliente e promoções.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[chatwoot|Chatwoot]]"
      - tabela:zammad
      - tabela:freescout
    custoBeneficio:
      - "[[freshdesk|Freshdesk]]"
      - tabela:help-scout
      - tabela:crisp
    qualidadeMaxima:
      - "[[zendesk|Zendesk]]"
      - tabela:intercom
      - tabela:servicenow
    justificativaFerramentas: "Muda Volume típico para centenas de conversas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Restaurante ou delivery pequeno
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de conversas por semana
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Restaurante e delivery (pequena empresa)
## 📝 Descrição
Gerir pedidos, estoque, pagamentos, nota fiscal e relacionamento com clientes de um restaurante ou operação de delivery.
## ⏰ Quando aplicar
- Controlar estoque e fichas técnicas
- Emitir nota fiscal e receber por vários meios
## 🧱 Pilha por categoria
- [[erp|ERP]] - estoque, financeiro e vendas
- [[pagamentos|Pagamentos]] - maquininha e pagamentos online
- [[fiscal_contabilidade_brasil|Fiscal e contabilidade (Brasil)]] - emissão de nota fiscal
- [[suporte_atendimento|Suporte e atendimento]] - atendimento por WhatsApp e redes
- [[automacao_marketing|Automação de marketing]] - promoções e fidelidade
## ✅ Recomendações
- [[omie|Omie]] - ERP brasileiro para pequenas empresas
- [[mercado_pago|Mercado Pago]] - recebimento com meios populares no Brasil
- [[focus_nfe|Focus NFe]] - API de emissão de nota fiscal
- [[chatwoot|Chatwoot]] - central de mensagens com custo baixo
- [[mailchimp|Mailchimp]] - campanhas de fidelização
## 🧬 Variações
- **Gestão e fiscal** (`restaurante-gestao-fiscal`): ERP de salão, estoque e nota fiscal. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Restaurante ou delivery pequeno; Regulação aplicável: Legislação de NF-e e NFS-e (não verificado); Volume típico: Centenas de pedidos por semana.
- **Pedidos e atendimento** (`restaurante-pedidos-atendimento`): Pagamento, chat com cliente e promoções. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[chatwoot|Chatwoot]], Zammad, FreeScout. Custo-benefício: [[freshdesk|Freshdesk]], Help Scout, Crisp. Qualidade máxima: [[zendesk|Zendesk]], Intercom, ServiceNow. Por que difere do caso: Muda Volume típico para centenas de conversas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Restaurante ou delivery pequeno; Regulação aplicável: Código de Defesa do Consumidor (não verificado); Volume típico: Centenas de conversas por semana.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[odoo_community|Odoo Community]], ERPNext, Dolibarr
- **Custo-benefício:** [[omie|Omie]], Bling, Conta Azul
- **Qualidade máxima:** [[sap_s_4hana|SAP S-4HANA]], Oracle NetSuite, TOTVS Protheus
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Operação com margem apertada pede ferramentas com mensalidade baixa e sem taxas escondidas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
