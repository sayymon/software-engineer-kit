---
id: comercio_local_pequena_empresa
tipo: caso-de-uso
nome: Comércio local (pequena empresa)
aliases:
  - comercio-local-pequena-empresa
descricao: Organizar vendas, estoque, nota fiscal e indicadores de uma loja de bairro ou MEI com ferramentas acessíveis.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[erp|ERP]]"
  - "[[fiscal_contabilidade_brasil|Fiscal e contabilidade (Brasil)]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[bi_dashboards|BI e dashboards]]"
ferramentasRecomendadas:
  - "[[omie|Omie]]"
  - "[[portal_do_empreendedor_mei|Portal do Empreendedor MEI]]"
  - "[[enotas|eNotas (ferramenta)]]"
  - "[[mercado_pago|Mercado Pago]]"
  - "[[looker_studio|Looker Studio]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pequena
segmentos:
  - varejo-ecommerce
nicho: lojas físicas e MEI
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
  - id: comercio-gestao-fiscal
    nome: Gestão e nota fiscal
    descricao: ERP simples, MEI e emissão de notas.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Comércio de bairro
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação de NF-e e NFS-e
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de notas por mês
        fonte: editorial
  - id: comercio-pagamentos-vendas
    nome: Pagamentos e relatório de vendas
    descricao: Maquininha, Pix e painel de vendas.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Volume típico para centenas de vendas por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Comércio de bairro
        fonte: editorial
      - chave: Regulação aplicável
        valor: Regras do Pix e do arranjo de pagamentos do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de vendas por mês
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Comércio local (pequena empresa)
## 📝 Descrição
Organizar vendas, estoque, nota fiscal e indicadores de uma loja de bairro ou MEI com ferramentas acessíveis.
## ⏰ Quando aplicar
- Formalizar como MEI e emitir notas
- Controlar estoque e caixa da loja
## 🧱 Pilha por categoria
- [[erp|ERP]] - estoque e caixa
- [[fiscal_contabilidade_brasil|Fiscal e contabilidade (Brasil)]] - formalização e notas
- [[pagamentos|Pagamentos]] - recebimento no balcão
- [[bi_dashboards|BI e dashboards]] - indicadores de vendas
## ✅ Recomendações
- [[omie|Omie]] - ERP simples para pequenas empresas
- [[portal_do_empreendedor_mei|Portal do Empreendedor MEI]] - formalização gratuita pelo governo
- [[enotas|eNotas (ferramenta)]] - emissão de nota fiscal por API
- [[mercado_pago|Mercado Pago]] - maquininha e Pix
- [[looker_studio|Looker Studio]] - painéis gratuitos sobre planilhas
## 🧬 Variações
- **Gestão e nota fiscal** (`comercio-gestao-fiscal`): ERP simples, MEI e emissão de notas. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Comércio de bairro; Regulação aplicável: Legislação de NF-e e NFS-e (não verificado); Volume típico: Centenas de notas por mês.
- **Pagamentos e relatório de vendas** (`comercio-pagamentos-vendas`): Maquininha, Pix e painel de vendas. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[mercado_pago|Mercado Pago]], PagBank PagSeguro, Asaas. Custo-benefício: [[stripe|Stripe]], PayPal, Paddle. Qualidade máxima: [[adyen|Adyen]], Braintree, Checkout.com. Por que difere do caso: Muda Volume típico para centenas de vendas por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Comércio de bairro; Regulação aplicável: Regras do Pix e do arranjo de pagamentos do Banco Central (não verificado); Volume típico: Centenas de vendas por mês.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[odoo_community|Odoo Community]], ERPNext, Dolibarr
- **Custo-benefício:** [[omie|Omie]], Bling, Conta Azul
- **Qualidade máxima:** [[sap_s_4hana|SAP S-4HANA]], Oracle NetSuite, TOTVS Protheus
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Comércio local opera com margem baixa, e cada mensalidade precisa se pagar em vendas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
