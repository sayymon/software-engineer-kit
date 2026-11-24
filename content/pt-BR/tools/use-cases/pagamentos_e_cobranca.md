---
id: pagamentos_e_cobranca
tipo: caso-de-uso
nome: Pagamentos e cobrança
aliases: []
descricao: Receber, conciliar e cobrar de clientes com meios de pagamento e assinaturas.
funcionalidadesNecessarias:
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
categoriasRelacionadas:
  - "[[pagamentos|Pagamentos]]"
  - "[[cobranca_assinaturas_billing|Cobrança e assinaturas (billing)]]"
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[fiscal_contabilidade_brasil|Fiscal e contabilidade (Brasil)]]"
ferramentasRecomendadas:
  - "[[stripe|Stripe]]"
  - "[[stripe_billing|Stripe Billing]]"
  - "[[microsoft_excel|Microsoft Excel]]"
  - "[[airtable|Airtable]]"
  - "[[github_advanced_security|GitHub Advanced Security]]"
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
  - financeiro-fintech
  - varejo-ecommerce
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[negocio_e_operacao|Negócio e operação]]"
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
  - id: pag-gateway-cartao-pix
    nome: Gateway de cartão e Pix
    descricao: Aceite de pagamentos online.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Empresa que vende online
        fonte: editorial
      - chave: Regulação aplicável
        valor: Regras do Pix e do arranjo de pagamentos do Banco Central
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de transações por dia
        fonte: editorial
  - id: pag-assinaturas-recorrencia
    nome: Assinaturas e recorrência
    descricao: Planos, trial e cancelamento.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[lago|Lago]]"
      - tabela:killbill
      - tabela:openmeter
    custoBeneficio:
      - "[[stripe_billing|Stripe Billing]]"
      - tabela:chargebee
      - tabela:recurly
    qualidadeMaxima:
      - "[[zuora|Zuora]]"
      - tabela:maxio
      - tabela:metronome
    justificativaFerramentas: "Muda Volume típico para milhares de renovações por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa de assinaturas
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de renovações por mês
        fonte: editorial
  - id: pag-conciliacao
    nome: Conciliação financeira
    descricao: Cruzar recebíveis e extratos.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Volume típico para milhares de recebíveis por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Financeiro de média empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Milhares de recebíveis por mês
        fonte: editorial
  - id: pag-antifraude-seguranca
    nome: Antifraude e segurança
    descricao: Riscos e disputas.
    funcionalidades:
      - "[[avaliacao_de_qualidade|Avaliação de qualidade]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mercado_pago|Mercado Pago]]"
      - tabela:asaas
      - tabela:pagbank
    custoBeneficio:
      - "[[stripe|Stripe]]"
      - tabela:braintree
      - tabela:paypal
    qualidadeMaxima:
      - "[[adyen|Adyen]]"
      - tabela:checkout-com
      - tabela:paddle
    justificativaFerramentas: "Muda Volume típico para dezenas de disputas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Operação com risco de chargeback
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e regras das bandeiras
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de disputas por semana
        fonte: editorial
  - id: pag-notas-fiscais
    nome: Notas fiscais da venda
    descricao: Emissão automática por pedido.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[portal_do_empreendedor_mei|Portal do Empreendedor MEI]]"
      - tabela:emissor-nacional-nfse
      - tabela:receita-federal-ecac
    custoBeneficio:
      - "[[contabilizei|Contabilizei]]"
      - tabela:nibo
      - "[[enotas|eNotas (ferramenta)]]"
    qualidadeMaxima:
      - "[[focus_nfe|Focus NFe]]"
      - tabela:arquivei
      - tabela:sovos-brasil
    justificativaFerramentas: "Muda Volume típico para uma nota por pedido: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: MEI e pequena empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Legislação de NF-e e NFS-e
        fonte: não verificado
      - chave: Volume típico
        valor: Uma nota por pedido
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Pagamentos e cobrança
## 📝 Descrição
Receber, conciliar e cobrar de clientes com meios de pagamento e assinaturas.
## ⏰ Quando aplicar
- Venda única e assinatura
- Marketplace com repasse
## 🧩 Funcionalidades necessárias
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[avaliacao_de_qualidade|Avaliação de qualidade]] - Medição da qualidade das respostas com testes, métricas e juízes automáticos.
## ✅ Recomendações
- [[stripe|Stripe]] - Faixa custo-benefício em [[pagamentos|Pagamentos]].
- [[stripe_billing|Stripe Billing]] - Faixa custo-benefício em [[cobranca_assinaturas_billing|Cobrança e assinaturas (billing)]].
- [[microsoft_excel|Microsoft Excel]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[airtable|Airtable]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[github_advanced_security|GitHub Advanced Security]] - Faixa custo-benefício em [[seguranca_codigo|Segurança de código]].
## 🧬 Variações
- **Gateway de cartão e Pix** (`pag-gateway-cartao-pix`): Aceite de pagamentos online. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Empresa que vende online; Regulação aplicável: Regras do Pix e do arranjo de pagamentos do Banco Central (não verificado); Volume típico: Milhares de transações por dia.
- **Assinaturas e recorrência** (`pag-assinaturas-recorrencia`): Planos, trial e cancelamento. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[lago|Lago]], Kill Bill, OpenMeter. Custo-benefício: [[stripe_billing|Stripe Billing]], Chargebee, Recurly. Qualidade máxima: [[zuora|Zuora]], Maxio, Metronome. Por que difere do caso: Muda Volume típico para milhares de renovações por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa de assinaturas; Regulação aplicável: Código de Defesa do Consumidor (não verificado); Volume típico: Milhares de renovações por mês.
- **Conciliação financeira** (`pag-conciliacao`): Cruzar recebíveis e extratos. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[libreoffice|LibreOffice]], Google Sheets, [[google_colab|Google Colab (ferramenta)]]. Custo-benefício: [[microsoft_excel|Microsoft Excel]], Julius AI, [[airtable|Airtable]]. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], Hex. Por que difere do caso: Muda Volume típico para milhares de recebíveis por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Financeiro de média empresa; Regulação aplicável: Nenhuma específica; Volume típico: Milhares de recebíveis por mês.
- **Antifraude e segurança** (`pag-antifraude-seguranca`): Riscos e disputas. Funcionalidades: [[avaliacao_de_qualidade|Avaliação de qualidade]], [[raciocinio|Raciocínio]]. Mais barata: [[mercado_pago|Mercado Pago]], Asaas, PagBank PagSeguro. Custo-benefício: [[stripe|Stripe]], Braintree, PayPal. Qualidade máxima: [[adyen|Adyen]], Checkout.com, Paddle. Por que difere do caso: Muda Volume típico para dezenas de disputas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Operação com risco de chargeback; Regulação aplicável: LGPD e regras das bandeiras (não verificado); Volume típico: Dezenas de disputas por semana.
- **Notas fiscais da venda** (`pag-notas-fiscais`): Emissão automática por pedido. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[portal_do_empreendedor_mei|Portal do Empreendedor MEI]], Emissor Nacional de NFS-e, Centro Virtual de Atendimento e-CAC. Custo-benefício: [[contabilizei|Contabilizei]], Nibo, [[enotas|eNotas (ferramenta)]]. Qualidade máxima: [[focus_nfe|Focus NFe]], Arquivei, Sovos Brasil. Por que difere do caso: Muda Volume típico para uma nota por pedido: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: MEI e pequena empresa; Regulação aplicável: Legislação de NF-e e NFS-e (não verificado); Volume típico: Uma nota por pedido.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[mercado_pago|Mercado Pago]], PagBank PagSeguro, Asaas
- **Custo-benefício:** [[stripe|Stripe]], PayPal, Paddle
- **Qualidade máxima:** [[adyen|Adyen]], Braintree, Checkout.com
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Taxa por transação é o principal custo e decide a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[negocio_e_operacao|Negócio e operação]]
