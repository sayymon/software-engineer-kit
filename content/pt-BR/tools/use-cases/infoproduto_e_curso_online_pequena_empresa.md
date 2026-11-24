---
id: infoproduto_e_curso_online_pequena_empresa
tipo: caso-de-uso
nome: Infoproduto e curso online (pequena empresa)
aliases:
  - infoproduto-e-curso-online-pequena-empresa
descricao: Produzir, vender e entregar um curso online com página de vendas, cobrança recorrente, e-mails e vídeos bem editados.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[cms|CMS]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[cobranca_assinaturas_billing|Cobrança e assinaturas (billing)]]"
  - "[[email_transacional_marketing|E-mail transacional e marketing]]"
  - "[[edicao_video|Edição de vídeo]]"
ferramentasRecomendadas:
  - "[[wordpress|WordPress]]"
  - "[[mercado_pago|Mercado Pago]]"
  - "[[stripe_billing|Stripe Billing]]"
  - "[[mailchimp|Mailchimp]]"
  - "[[davinci_resolve|DaVinci Resolve]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pequena
segmentos:
  - educacao
  - midia-criadores
nicho: criadores que vendem cursos e conteúdo digital
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[wordpress|WordPress]]"
    - tabela:ghost
    - tabela:strapi
  custoBeneficio:
    - "[[webflow|Webflow]]"
    - tabela:sanity
    - tabela:directus-cloud
  qualidadeMaxima:
    - "[[contentful|Contentful]]"
    - tabela:adobe-experience-manager
    - tabela:contentstack
variacoes:
  - id: infoproduto-pagina-vendas
    nome: Página de vendas e checkout
    descricao: Site, cobrança e e-mail de lançamento.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Criador independente ou pequena empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de vendas por dia
        fonte: editorial
  - id: infoproduto-producao-aulas
    nome: Produção de aulas em vídeo
    descricao: Gravação, edição e legendas das aulas.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - "[[capcut|CapCut]]"
      - tabela:descript
      - tabela:veed
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - "[[runway|Runway]]"
      - tabela:final-cut-pro
    justificativaFerramentas: "Muda Volume típico para dezenas de horas de aula por curso: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Criador independente ou pequena empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de horas de aula por curso
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Infoproduto e curso online (pequena empresa)
## 📝 Descrição
Produzir, vender e entregar um curso online com página de vendas, cobrança recorrente, e-mails e vídeos bem editados.
## ⏰ Quando aplicar
- Lançar um curso ou mentoria
- Vender assinatura de comunidade
## 🧱 Pilha por categoria
- [[cms|CMS]] - página de vendas e área de conteúdo
- [[pagamentos|Pagamentos]] - cobrança no checkout
- [[cobranca_assinaturas_billing|Cobrança e assinaturas (billing)]] - recorrência e planos
- [[email_transacional_marketing|E-mail transacional e marketing]] - sequência de e-mails
- [[edicao_video|Edição de vídeo]] - aulas bem acabadas
## ✅ Recomendações
- [[wordpress|WordPress]] - CMS aberto com grande ecossistema de plugins
- [[mercado_pago|Mercado Pago]] - pagamentos com meios locais
- [[stripe_billing|Stripe Billing]] - assinaturas e cobrança recorrente
- [[mailchimp|Mailchimp]] - automação de e-mails para a base de alunos
- [[davinci_resolve|DaVinci Resolve]] - edição de aulas com versão gratuita
## 🧬 Variações
- **Página de vendas e checkout** (`infoproduto-pagina-vendas`): Site, cobrança e e-mail de lançamento. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Criador independente ou pequena empresa; Regulação aplicável: Código de Defesa do Consumidor (não verificado); Volume típico: Dezenas de vendas por dia.
- **Produção de aulas em vídeo** (`infoproduto-producao-aulas`): Gravação, edição e legendas das aulas. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut. Custo-benefício: [[capcut|CapCut]], Descript, VEED. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], [[runway|Runway]], Final Cut Pro. Por que difere do caso: Muda Volume típico para dezenas de horas de aula por curso: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Criador independente ou pequena empresa; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de horas de aula por curso.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[wordpress|WordPress]], Ghost, Strapi
- **Custo-benefício:** [[webflow|Webflow]], Sanity, Directus Cloud
- **Qualidade máxima:** [[contentful|Contentful]], Adobe Experience Manager, Contentstack
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Antes de validar a oferta, o custo fixo baixo permite testar o produto com menos risco.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
