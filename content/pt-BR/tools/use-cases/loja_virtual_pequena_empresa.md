---
id: loja_virtual_pequena_empresa
tipo: caso-de-uso
nome: Loja virtual (pequena empresa)
aliases:
  - loja-virtual-pequena-empresa
descricao: Abrir e operar uma loja online com catálogo, pagamentos, e-mails de relacionamento e atendimento ao cliente.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[ecommerce_lojas|E-commerce e lojas]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[automacao_marketing|Automação de marketing]]"
  - "[[suporte_atendimento|Suporte e atendimento]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
ferramentasRecomendadas:
  - "[[shopify|Shopify]]"
  - "[[medusa|Medusa]]"
  - "[[mercado_pago|Mercado Pago]]"
  - "[[mailchimp|Mailchimp]]"
  - "[[chatwoot|Chatwoot]]"
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
nicho: comércio eletrônico de pequeno porte
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
  - id: loja-plataforma-catalogo
    nome: Plataforma e catálogo
    descricao: Loja pronta ou aberta com descrição de produto por IA.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Loja virtual pequena
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de pedidos por mês
        fonte: editorial
  - id: loja-pagamento-pos-venda
    nome: Pagamento e pós-venda
    descricao: Checkout, e-mail de carrinho e atendimento.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Volume típico para centenas de pagamentos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Loja virtual pequena
        fonte: editorial
      - chave: Regulação aplicável
        valor: Regras do Pix e do arranjo de pagamentos do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de pagamentos por mês
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Loja virtual (pequena empresa)
## 📝 Descrição
Abrir e operar uma loja online com catálogo, pagamentos, e-mails de relacionamento e atendimento ao cliente.
## ⏰ Quando aplicar
- Lançar a primeira loja online
- Migrar de marketplace para loja própria
## 🧱 Pilha por categoria
- [[ecommerce_lojas|E-commerce e lojas]] - catálogo e checkout
- [[pagamentos|Pagamentos]] - recebimento por cartão, Pix e boleto
- [[automacao_marketing|Automação de marketing]] - campanhas e carrinho abandonado
- [[suporte_atendimento|Suporte e atendimento]] - atendimento ao cliente
- [[analytics_produto_web|Analytics de produto e web]] - medir visitas e conversão
## ✅ Recomendações
- [[shopify|Shopify]] - plataforma pronta com ecossistema de apps
- [[medusa|Medusa]] - backend de e-commerce open source e customizável
- [[mercado_pago|Mercado Pago]] - meios de pagamento comuns no Brasil
- [[mailchimp|Mailchimp]] - e-mails de relacionamento com plano de entrada
- [[chatwoot|Chatwoot]] - atendimento omnichannel open source
## 🧬 Variações
- **Plataforma e catálogo** (`loja-plataforma-catalogo`): Loja pronta ou aberta com descrição de produto por IA. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Loja virtual pequena; Regulação aplicável: Código de Defesa do Consumidor (não verificado); Volume típico: Centenas de pedidos por mês.
- **Pagamento e pós-venda** (`loja-pagamento-pos-venda`): Checkout, e-mail de carrinho e atendimento. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[mercado_pago|Mercado Pago]], PagBank PagSeguro, Asaas. Custo-benefício: [[stripe|Stripe]], PayPal, Paddle. Qualidade máxima: [[adyen|Adyen]], Braintree, Checkout.com. Por que difere do caso: Muda Volume típico para centenas de pagamentos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Loja virtual pequena; Regulação aplicável: Regras do Pix e do arranjo de pagamentos do Banco Central (não verificado); Volume típico: Centenas de pagamentos por mês.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[medusa|Medusa]], WooCommerce, PrestaShop
- **Custo-benefício:** [[shopify|Shopify]], Nuvemshop, BigCommerce
- **Qualidade máxima:** [[adobe_commerce|Adobe Commerce]], Salesforce Commerce Cloud, VTEX
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Margem pequena exige custo previsível, e a taxa por venda pesa mais que a mensalidade.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
