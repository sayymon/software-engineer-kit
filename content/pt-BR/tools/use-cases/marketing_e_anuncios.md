---
id: marketing_e_anuncios
tipo: caso-de-uso
nome: Marketing e anúncios
aliases: []
descricao: Planejar, anunciar e medir campanhas digitais com IA e analytics.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[geracao_de_video|Geração de vídeo]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
categoriasRelacionadas:
  - "[[assistente_chat|Assistente de chat]]"
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
  - "[[automacao_marketing|Automação de marketing]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[cms|CMS]]"
ferramentasRecomendadas:
  - "[[gemini|Gemini]]"
  - "[[grok|Grok]]"
  - "[[perplexity|Perplexity]]"
  - "[[midjourney|Midjourney]]"
  - "[[mailchimp|Mailchimp]]"
modelosRecomendados:
  - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
  - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
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
  - marketing-agencias
  - varejo-ecommerce
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[negocio_e_operacao|Negócio e operação]]"
faixasPadrao:
  maisBarata:
    - "[[deepseek|DeepSeek]]"
    - "[[qwen|Qwen]]"
    - "[[mistral|Mistral]]"
  custoBeneficio:
    - "[[gemini|Gemini]]"
    - "[[grok|Grok]]"
    - "[[perplexity|Perplexity]]"
  qualidadeMaxima:
    - "[[claude|Claude AI]]"
    - "[[chatgpt|ChatGPT]]"
    - tabela:microsoft-copilot
variacoes:
  - id: mkt-planejamento-campanha
    nome: Planejamento de campanha
    descricao: Público, mensagem e canais.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pequena e média empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Algumas campanhas por trimestre
        fonte: editorial
  - id: mkt-criativos
    nome: Criativos de anúncio
    descricao: Imagens e vídeos curtos para teste.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_video|Geração de vídeo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[stable_diffusion|Stable Diffusion]]"
      - tabela:flux
      - tabela:comfyui
    custoBeneficio:
      - "[[midjourney|Midjourney]]"
      - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
      - tabela:ideogram
    qualidadeMaxima:
      - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
      - tabela:adobe-firefly
      - tabela:recraft
    justificativaFerramentas: "Muda Volume típico para dezenas de criativos por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de marketing enxuto
        fonte: editorial
      - chave: Regulação aplicável
        valor: CONAR e regras de publicidade das plataformas
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de criativos por semana
        fonte: editorial
  - id: mkt-e-mail-automacao
    nome: E-mail e automação
    descricao: Réguas de relacionamento.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Volume típico para milhares de envios por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa com base de contatos
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e consentimento do destinatário
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de envios por semana
        fonte: editorial
  - id: mkt-analytics-atribuicao
    nome: Analytics e atribuição
    descricao: Origem de conversões e funil.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[umami|Umami]]"
      - tabela:plausible
      - tabela:matomo
    custoBeneficio:
      - "[[posthog|PostHog]]"
      - tabela:google-analytics
      - tabela:fathom
    qualidadeMaxima:
      - "[[amplitude|Amplitude]]"
      - tabela:mixpanel
      - tabela:heap
    justificativaFerramentas: "Muda Volume típico para milhões de eventos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa com site ou aplicativo
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e consentimento de cookies
        fonte: não verificado
      - chave: Volume típico
        valor: Milhões de eventos por mês
        fonte: editorial
  - id: mkt-seo-conteudo
    nome: SEO e conteúdo
    descricao: Palavras-chave, pauta e páginas.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
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
    justificativaFerramentas: "Muda Volume típico para centenas de páginas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa com site de conteúdo
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de páginas
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Marketing e anúncios
## 📝 Descrição
Planejar, anunciar e medir campanhas digitais com IA e analytics.
## ⏰ Quando aplicar
- Campanha de captação
- Marca com presença contínua
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[geracao_de_video|Geração de vídeo]] - Criação e edição de vídeo a partir de texto, imagem ou clipes.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
## ✅ Recomendações
- [[gemini|Gemini]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[grok|Grok]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[midjourney|Midjourney]] - Faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[mailchimp|Mailchimp]] - Faixa custo-benefício em [[automacao_marketing|Automação de marketing]].
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]] - Modelo da faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]] - Modelo da faixa qualidade máxima em [[geracao_imagem|Ferramentas de geração de imagem]].
## 🧬 Variações
- **Planejamento de campanha** (`mkt-planejamento-campanha`): Público, mensagem e canais. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pequena e média empresa; Regulação aplicável: Nenhuma específica; Volume típico: Algumas campanhas por trimestre.
- **Criativos de anúncio** (`mkt-criativos`): Imagens e vídeos curtos para teste. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_video|Geração de vídeo]]. Mais barata: [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), ComfyUI. Custo-benefício: [[midjourney|Midjourney]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], Ideogram. Qualidade máxima: [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Adobe Firefly, Recraft. Por que difere do caso: Muda Volume típico para dezenas de criativos por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de marketing enxuto; Regulação aplicável: CONAR e regras de publicidade das plataformas (não verificado); Volume típico: Dezenas de criativos por semana.
- **E-mail e automação** (`mkt-e-mail-automacao`): Réguas de relacionamento. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[mautic|Mautic]], Mailtrain, [[keila|Keila (ferramenta)]]. Custo-benefício: [[mailchimp|Mailchimp]], ActiveCampaign, RD Station Marketing. Qualidade máxima: [[hubspot_marketing_hub|HubSpot Marketing Hub]], Adobe Marketo Engage, Salesforce Marketing Cloud. Por que difere do caso: Muda Volume típico para milhares de envios por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa com base de contatos; Regulação aplicável: LGPD e consentimento do destinatário (não verificado); Volume típico: Milhares de envios por semana.
- **Analytics e atribuição** (`mkt-analytics-atribuicao`): Origem de conversões e funil. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[umami|Umami]], Plausible, Matomo. Custo-benefício: [[posthog|PostHog]], Google Analytics, Fathom Analytics. Qualidade máxima: [[amplitude|Amplitude]], Mixpanel, Heap. Por que difere do caso: Muda Volume típico para milhões de eventos por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa com site ou aplicativo; Regulação aplicável: LGPD e consentimento de cookies (não verificado); Volume típico: Milhões de eventos por mês.
- **SEO e conteúdo** (`mkt-seo-conteudo`): Palavras-chave, pauta e páginas. Funcionalidades: [[busca_na_web|Busca na web]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[wordpress|WordPress]], Ghost, Strapi. Custo-benefício: [[webflow|Webflow]], Sanity, Directus Cloud. Qualidade máxima: [[contentful|Contentful]], Adobe Experience Manager, Contentstack. Por que difere do caso: Muda Volume típico para centenas de páginas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa com site de conteúdo; Regulação aplicável: Nenhuma específica; Volume típico: Centenas de páginas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]
- **Custo-benefício:** [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]
- **Qualidade máxima:** [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Mídia paga já consome orçamento e o custo das ferramentas deve ser baixo.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[negocio_e_operacao|Negócio e operação]]
