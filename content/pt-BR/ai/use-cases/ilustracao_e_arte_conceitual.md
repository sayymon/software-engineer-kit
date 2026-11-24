---
id: ilustracao_e_arte_conceitual
tipo: caso-de-uso
nome: Ilustração e arte conceitual
aliases: []
descricao: Criar ilustrações, personagens, cenários e arte conceitual com modelos de imagem.
funcionalidadesNecessarias:
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[multimodal|Multimodal]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
  - "[[edicao_imagem|Edição de imagem]]"
ferramentasRecomendadas:
  - "[[midjourney|Midjourney]]"
  - "[[canva|Canva]]"
  - "[[adobe_photoshop|Adobe Photoshop]]"
  - "[[stable_diffusion|Stable Diffusion]]"
  - "[[gimp|GIMP]]"
modelosRecomendados:
  - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
  - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
segmentos:
  - design-criativo
  - midia-criadores
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
  - id: ilustracao-editorial
    nome: Ilustração editorial
    descricao: Imagens para artigos, capas e livros com estilo único.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Uso final
        valor: Artigos, capas e livros
        fonte: editorial
      - chave: Entregável
        valor: Imagem editorial com estilo único
        fonte: editorial
  - id: personagem-consistente
    nome: Personagem consistente
    descricao: Mesmo personagem em várias cenas e poses.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:comfyui
      - "[[stable_diffusion|Stable Diffusion]]"
      - tabela:flux
    custoBeneficio:
      - "[[midjourney|Midjourney]]"
      - tabela:recraft
      - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
    qualidadeMaxima:
      - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
      - tabela:ideogram
      - tabela:adobe-firefly
    justificativaFerramentas: "Muda o Entregável para o mesmo personagem em várias cenas: o critério é consistência de identidade entre imagens."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Série de cenas e quadrinhos
        fonte: editorial
      - chave: Entregável
        valor: Mesmo personagem em várias poses e cenas
        fonte: editorial
      - chave: Requisitos específicos
        valor: Referência visual fixa do personagem
        fonte: editorial
  - id: cenario-conceito
    nome: Cenário e conceito
    descricao: Ambientes e mundos para jogo, filme ou pitch.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Uso final
        valor: Jogo, filme ou pitch
        fonte: editorial
      - chave: Entregável
        valor: Ambientes e mundos conceituais
        fonte: editorial
  - id: arte-final-pintura
    nome: Arte final e pintura digital
    descricao: Acabamento manual sobre a base gerada.
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
    justificativaFerramentas: "Muda o Uso final para peça final de portfólio: o acabamento manual exige editor de pintura e imagem."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Peça final de portfólio
        fonte: editorial
      - chave: Entregável
        valor: Pintura digital com acabamento manual
        fonte: editorial
  - id: storyboard
    nome: Storyboard
    descricao: Sequência de quadros para vídeo ou quadrinho.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:krita
      - "[[stable_diffusion|Stable Diffusion]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
    custoBeneficio:
      - "[[midjourney|Midjourney]]"
      - "[[canva|Canva]]"
      - "[[figma|Figma]]"
    qualidadeMaxima:
      - "[[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]]"
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - "[[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]"
    justificativaFerramentas: "Muda o Entregável para sequência numerada de quadros: pede esboço rápido e organização por cena."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Vídeo ou quadrinho
        fonte: editorial
      - chave: Entregável
        valor: Sequência de quadros numerada
        fonte: editorial
      - chave: Proporção
        valor: 16:9 para vídeo
        fonte: não verificado
    verificadoEm: 2026-11-22
tags:
  - caso-de-uso
  - ia
---
# Ilustração e arte conceitual
## 📝 Descrição
Criar ilustrações, personagens, cenários e arte conceitual com modelos de imagem.
## ⏰ Quando aplicar
- Livro, jogo ou campanha
- Arte conceitual de produto
## 🧩 Funcionalidades necessárias
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[midjourney|Midjourney]] - Faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[canva|Canva]] - Faixa custo-benefício em [[edicao_imagem|Edição de imagem]].
- [[adobe_photoshop|Adobe Photoshop]] - Faixa qualidade máxima em [[edicao_imagem|Edição de imagem]].
- [[stable_diffusion|Stable Diffusion]] - Faixa mais barata em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[gimp|GIMP]] - Faixa mais barata em [[edicao_imagem|Edição de imagem]].
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]] - Modelo da faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]] - Modelo da faixa qualidade máxima em [[geracao_imagem|Ferramentas de geração de imagem]].
## 🧬 Variações
- **Ilustração editorial** (`ilustracao-editorial`): Imagens para artigos, capas e livros com estilo único. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Uso final: Artigos, capas e livros; Entregável: Imagem editorial com estilo único.
- **Personagem consistente** (`personagem-consistente`): Mesmo personagem em várias cenas e poses. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: ComfyUI, [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos). Custo-benefício: [[midjourney|Midjourney]], Recraft, [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]. Qualidade máxima: [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Ideogram, Adobe Firefly. Por que difere do caso: Muda o Entregável para o mesmo personagem em várias cenas: o critério é consistência de identidade entre imagens. Parâmetros: Uso final: Série de cenas e quadrinhos; Entregável: Mesmo personagem em várias poses e cenas; Requisitos específicos: Referência visual fixa do personagem.
- **Cenário e conceito** (`cenario-conceito`): Ambientes e mundos para jogo, filme ou pitch. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Uso final: Jogo, filme ou pitch; Entregável: Ambientes e mundos conceituais.
- **Arte final e pintura digital** (`arte-final-pintura`): Acabamento manual sobre a base gerada. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: [[gimp|GIMP]], Krita, Photopea. Custo-benefício: [[canva|Canva]], Adobe Firefly, remove.bg. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], Topaz Photo, Magnific. Por que difere do caso: Muda o Uso final para peça final de portfólio: o acabamento manual exige editor de pintura e imagem. Parâmetros: Uso final: Peça final de portfólio; Entregável: Pintura digital com acabamento manual.
- **Storyboard** (`storyboard`): Sequência de quadros para vídeo ou quadrinho. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: Krita, [[stable_diffusion|Stable Diffusion]], [[excalidraw|Excalidraw (ferramenta)]]. Custo-benefício: [[midjourney|Midjourney]], [[canva|Canva]], [[figma|Figma]]. Qualidade máxima: [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], [[adobe_photoshop|Adobe Photoshop]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]]. Por que difere do caso: Muda o Entregável para sequência numerada de quadros: pede esboço rápido e organização por cena. Parâmetros: Uso final: Vídeo ou quadrinho; Entregável: Sequência de quadros numerada; Proporção: 16:9 para vídeo (não verificado).
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), ComfyUI
- **Custo-benefício:** [[midjourney|Midjourney]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], Ideogram
- **Qualidade máxima:** [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Adobe Firefly, Recraft
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Direitos de uso e consistência de estilo dependem do fornecedor, então a troca futura pesa.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
