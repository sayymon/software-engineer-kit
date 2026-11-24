---
id: logo_e_identidade_visual
tipo: caso-de-uso
nome: Logo e identidade visual
aliases: []
descricao: Criar logotipo, paleta, tipografia e manual de marca com IA e editores.
funcionalidadesNecessarias:
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
  - "[[edicao_imagem|Edição de imagem]]"
  - "[[apresentacoes_slides|Apresentações e slides]]"
  - "[[skills_design_criatividade|Skills de design e criatividade]]"
  - "[[visualizacao_ia|Visualização com IA]]"
ferramentasRecomendadas:
  - "[[midjourney|Midjourney]]"
  - "[[canva|Canva]]"
  - "[[impeccable|Impeccable]]"
  - "[[napkin|Napkin]]"
  - "[[adobe_photoshop|Adobe Photoshop]]"
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
  - design-criativo
  - marketing-agencias
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[design_e_imagem|Design e imagem]]"
faixasPadrao:
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
variacoes:
  - id: logo-gerado
    nome: Logotipo gerado
    descricao: Conceitos de logo por prompt e seleção de rotas visuais.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Fase da identidade
        valor: Exploração de rotas
        fonte: editorial
      - chave: Entregável
        valor: Conceitos de logo por prompt
        fonte: editorial
  - id: logo-refino-vetorial
    nome: Refino e versão vetorial
    descricao: Ajuste fino, vetorização e versões para fundo claro e escuro.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:photopea
      - "[[gimp|GIMP]]"
      - tabela:krita
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:recraft
      - tabela:adobe-express
    qualidadeMaxima:
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - tabela:magnific-ai
      - tabela:ideogram
    justificativaFerramentas: "Muda a Fase da identidade para acabamento vetorial: pede ajuste fino e exportação em versões claro e escuro."
    excecao: ""
    parametros:
      - chave: Fase da identidade
        valor: Acabamento
        fonte: editorial
      - chave: Entregável
        valor: Logo vetorial em versões claro e escuro
        fonte: editorial
      - chave: Formato de arquivo
        valor: SVG e PNG
        fonte: não verificado
  - id: manual-de-marca
    nome: Manual de marca
    descricao: Documento com uso de logo, cores, tipografia e tom de voz.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_slides|Google Slides]]"
      - tabela:marp
      - tabela:slidev
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:gamma
      - tabela:beautiful-ai
    qualidadeMaxima:
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
      - tabela:pitch
      - tabela:adobe-express
    justificativaFerramentas: "Muda a Fase da identidade para documentação: o manual é um documento de apresentação com regras de uso."
    excecao: ""
    parametros:
      - chave: Fase da identidade
        valor: Documentação
        fonte: editorial
      - chave: Entregável
        valor: Manual com logo, cores, tipografia e tom de voz
        fonte: editorial
      - chave: Formato de arquivo
        valor: PDF ou apresentação
        fonte: não verificado
  - id: kit-redes-sociais
    nome: Kit para redes sociais
    descricao: Avatares, capas e modelos de post alinhados à marca.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:photopea
      - "[[gimp|GIMP]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:adobe-express
      - tabela:adobe-firefly
    qualidadeMaxima:
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - "[[figma|Figma]]"
      - tabela:recraft
    justificativaFerramentas: "Muda a Fase da identidade para aplicação digital: avatares, capas e modelos de post pedem templates editáveis."
    excecao: ""
    parametros:
      - chave: Fase da identidade
        valor: Aplicação digital
        fonte: editorial
      - chave: Entregável
        valor: Avatares, capas e modelos de post
        fonte: editorial
      - chave: Plataforma de distribuição
        valor: Instagram, LinkedIn e YouTube
        fonte: editorial
  - id: mockups-aplicacao
    nome: Mockups de aplicação
    descricao: Simular a marca em embalagem, camiseta e fachada.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:photopea
      - "[[gimp|GIMP]]"
      - "[[stable_diffusion|Stable Diffusion]]"
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:adobe-firefly
      - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
    qualidadeMaxima:
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
      - "[[midjourney|Midjourney]]"
    justificativaFerramentas: "Muda a Fase da identidade para validação em contexto: simula a marca em embalagem, camiseta e fachada."
    excecao: ""
    parametros:
      - chave: Fase da identidade
        valor: Validação em contexto
        fonte: editorial
      - chave: Entregável
        valor: Simulações em embalagem, camiseta e fachada
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Logo e identidade visual
## 📝 Descrição
Criar logotipo, paleta, tipografia e manual de marca com IA e editores.
## ⏰ Quando aplicar
- Marca nova de pequeno negócio
- Atualização de identidade existente
## 🧩 Funcionalidades necessárias
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[midjourney|Midjourney]] - Faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[canva|Canva]] - Faixa custo-benefício em [[edicao_imagem|Edição de imagem]].
- [[impeccable|Impeccable]] - Faixa custo-benefício em [[skills_design_criatividade|Skills de design e criatividade]].
- [[napkin|Napkin]] - Faixa custo-benefício em [[visualizacao_ia|Visualização com IA]].
- [[adobe_photoshop|Adobe Photoshop]] - Faixa qualidade máxima em [[edicao_imagem|Edição de imagem]].
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]] - Modelo da faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]] - Modelo da faixa qualidade máxima em [[geracao_imagem|Ferramentas de geração de imagem]].
## 🧬 Variações
- **Logotipo gerado** (`logo-gerado`): Conceitos de logo por prompt e seleção de rotas visuais. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Fase da identidade: Exploração de rotas; Entregável: Conceitos de logo por prompt.
- **Refino e versão vetorial** (`logo-refino-vetorial`): Ajuste fino, vetorização e versões para fundo claro e escuro. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: Photopea, [[gimp|GIMP]], Krita. Custo-benefício: [[canva|Canva]], Recraft, Adobe Express. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], Magnific, Ideogram. Por que difere do caso: Muda a Fase da identidade para acabamento vetorial: pede ajuste fino e exportação em versões claro e escuro. Parâmetros: Fase da identidade: Acabamento; Entregável: Logo vetorial em versões claro e escuro; Formato de arquivo: SVG e PNG (não verificado).
- **Manual de marca** (`manual-de-marca`): Documento com uso de logo, cores, tipografia e tom de voz. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[google_slides|Google Slides]], Marp, Slidev. Custo-benefício: [[canva|Canva]], Gamma, Beautiful.ai. Qualidade máxima: [[microsoft_powerpoint|Microsoft PowerPoint]], Pitch, Adobe Express. Por que difere do caso: Muda a Fase da identidade para documentação: o manual é um documento de apresentação com regras de uso. Parâmetros: Fase da identidade: Documentação; Entregável: Manual com logo, cores, tipografia e tom de voz; Formato de arquivo: PDF ou apresentação (não verificado).
- **Kit para redes sociais** (`kit-redes-sociais`): Avatares, capas e modelos de post alinhados à marca. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: Photopea, [[gimp|GIMP]], [[excalidraw|Excalidraw (ferramenta)]]. Custo-benefício: [[canva|Canva]], Adobe Express, Adobe Firefly. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], [[figma|Figma]], Recraft. Por que difere do caso: Muda a Fase da identidade para aplicação digital: avatares, capas e modelos de post pedem templates editáveis. Parâmetros: Fase da identidade: Aplicação digital; Entregável: Avatares, capas e modelos de post; Plataforma de distribuição: Instagram, LinkedIn e YouTube.
- **Mockups de aplicação** (`mockups-aplicacao`): Simular a marca em embalagem, camiseta e fachada. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: Photopea, [[gimp|GIMP]], [[stable_diffusion|Stable Diffusion]]. Custo-benefício: [[canva|Canva]], Adobe Firefly, [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], [[midjourney|Midjourney]]. Por que difere do caso: Muda a Fase da identidade para validação em contexto: simula a marca em embalagem, camiseta e fachada. Parâmetros: Fase da identidade: Validação em contexto; Entregável: Simulações em embalagem, camiseta e fachada.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), ComfyUI
- **Custo-benefício:** [[midjourney|Midjourney]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], Ideogram
- **Qualidade máxima:** [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Adobe Firefly, Recraft
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Identidade é projeto pontual e o orçamento inicial costuma ser pequeno.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
