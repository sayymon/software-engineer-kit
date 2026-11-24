---
id: criacao_de_imagens
tipo: caso-de-uso
nome: Criação de imagens
aliases:
  - geracao-imagem
descricao: Gerar ilustrações, fotos e peças visuais a partir de descrições.
funcionalidadesNecessarias:
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
ferramentasRecomendadas:
  - "[[midjourney|Midjourney]]"
  - "[[stable_diffusion|Stable Diffusion]]"
modelosRecomendados:
  - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
  - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
criteriosDesempate:
  - lock-in
  - custo
  - privacidade-de-dados
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
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
  - id: imagem-arte-conceitual
    nome: Arte conceitual e ilustração
    descricao: Cenas e personagens com estilo próprio para jogos, livros e campanhas.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Uso final
        valor: Jogos, livros e campanhas
        fonte: editorial
      - chave: Estilo
        valor: Próprio, com direção de arte consistente
        fonte: editorial
  - id: imagem-produto-ecommerce
    nome: Imagem de produto para loja
    descricao: Fotos de produto com fundo limpo, cenários e variações para catálogo.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gimp|GIMP]]"
      - tabela:krita
      - tabela:photopea
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:adobe-firefly
      - tabela:remove-bg
    qualidadeMaxima:
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - tabela:topaz-photo-ai
      - tabela:magnific-ai
    justificativaFerramentas: "Muda o Uso final para catálogo de loja: o foco é recorte, fundo limpo e retoque fiel ao produto real."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Catálogo de loja
        fonte: editorial
      - chave: Estilo
        valor: Fundo limpo e cenários realistas
        fonte: editorial
      - chave: Proporção
        valor: 1:1
        fonte: não verificado
  - id: imagem-marketing-social
    nome: Imagem para marketing e redes
    descricao: Capas, banners e posts com texto legível dentro da imagem.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[stable_diffusion|Stable Diffusion]]"
      - tabela:flux
      - tabela:photopea
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:ideogram
      - tabela:adobe-express
    qualidadeMaxima:
      - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
      - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
      - tabela:recraft
    justificativaFerramentas: "Muda o Estilo para texto legível dentro da imagem: o critério é renderização de texto e templates de marca."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Capas, banners e posts
        fonte: editorial
      - chave: Estilo
        valor: Marca com texto legível dentro da imagem
        fonte: editorial
      - chave: Proporção
        valor: 1:1, 4:5 e 9:16 conforme a rede
        fonte: não verificado
tags:
  - caso-de-uso
  - ia
---
# Criação de imagens
## 📝 Descrição
Gerar ilustrações, fotos e peças visuais a partir de descrições.
## ⏰ Quando aplicar
- Peças de marketing e protótipos visuais
- Variações de estilo
## 🧩 Funcionalidades necessárias
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[midjourney|Midjourney]] - Estética marcante e controle de estilo
- [[stable_diffusion|Stable Diffusion]] - Pesos abertos e execução local com controle total
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]] - Boa aderência ao prompt e texto legível na imagem
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]] - Edição de imagem por conversa
## 🧬 Variações
- **Arte conceitual e ilustração** (`imagem-arte-conceitual`): Cenas e personagens com estilo próprio para jogos, livros e campanhas. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Uso final: Jogos, livros e campanhas; Estilo: Próprio, com direção de arte consistente.
- **Imagem de produto para loja** (`imagem-produto-ecommerce`): Fotos de produto com fundo limpo, cenários e variações para catálogo. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: [[gimp|GIMP]], Krita, Photopea. Custo-benefício: [[canva|Canva]], Adobe Firefly, remove.bg. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], Topaz Photo, Magnific. Por que difere do caso: Muda o Uso final para catálogo de loja: o foco é recorte, fundo limpo e retoque fiel ao produto real. Parâmetros: Uso final: Catálogo de loja; Estilo: Fundo limpo e cenários realistas; Proporção: 1:1 (não verificado).
- **Imagem para marketing e redes** (`imagem-marketing-social`): Capas, banners e posts com texto legível dentro da imagem. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), Photopea. Custo-benefício: [[canva|Canva]], Ideogram, Adobe Express. Qualidade máxima: [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Recraft. Por que difere do caso: Muda o Estilo para texto legível dentro da imagem: o critério é renderização de texto e templates de marca. Parâmetros: Uso final: Capas, banners e posts; Estilo: Marca com texto legível dentro da imagem; Proporção: 1:1, 4:5 e 9:16 conforme a rede (não verificado).
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), ComfyUI
- **Custo-benefício:** [[midjourney|Midjourney]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], Ideogram
- **Qualidade máxima:** [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Adobe Firefly, Recraft
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Estilos e fluxos se acumulam em cada ferramenta, e pesos abertos preservam a liberdade de mudar.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
