---
id: edicao_e_retoque_de_foto
tipo: caso-de-uso
nome: Edição e retoque de foto
aliases: []
descricao: Corrigir, restaurar, ampliar e transformar fotos com edição manual e generativa.
funcionalidadesNecessarias:
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[multimodal|Multimodal]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
categoriasRelacionadas:
  - "[[edicao_imagem|Edição de imagem]]"
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
  - "[[automacao_nocode|Automação e no-code]]"
ferramentasRecomendadas:
  - "[[canva|Canva]]"
  - "[[midjourney|Midjourney]]"
  - "[[n8n|n8n]]"
  - "[[adobe_photoshop|Adobe Photoshop]]"
  - "[[gimp|GIMP]]"
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
  - varejo-ecommerce
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[design_e_imagem|Design e imagem]]"
faixasPadrao:
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
variacoes:
  - id: retoque-retrato
    nome: Retoque de retrato
    descricao: Pele, luz e cor em retratos com ajustes locais.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Etapa do fluxo
        valor: Retoque local
        fonte: editorial
      - chave: Entregável
        valor: Retrato com pele, luz e cor ajustadas
        fonte: editorial
  - id: remocao-fundo
    nome: Remoção e troca de fundo
    descricao: Recorte de objeto e fundo novo para fotos de produto.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:photopea
      - "[[gimp|GIMP]]"
      - tabela:krita
    custoBeneficio:
      - tabela:remove-bg
      - "[[canva|Canva]]"
      - tabela:adobe-express
    qualidadeMaxima:
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - tabela:adobe-firefly
      - tabela:topaz-photo-ai
    justificativaFerramentas: "Muda a Etapa do fluxo para recorte: ferramentas de remoção de fundo cortam o tempo de máscara manual."
    excecao: ""
    parametros:
      - chave: Etapa do fluxo
        valor: Recorte
        fonte: editorial
      - chave: Entregável
        valor: Imagem de produto com fundo novo
        fonte: editorial
      - chave: Formato de arquivo
        valor: PNG com transparência
        fonte: não verificado
  - id: restauracao-ampliacao
    nome: Restauração e ampliação
    descricao: Recuperar fotos antigas e ampliar resolução sem perder detalhe.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:krita
      - "[[gimp|GIMP]]"
      - "[[stable_diffusion|Stable Diffusion]]"
    custoBeneficio:
      - tabela:topaz-photo-ai
      - tabela:adobe-firefly
      - tabela:photopea
    qualidadeMaxima:
      - tabela:magnific-ai
      - "[[adobe_photoshop|Adobe Photoshop]]"
      - tabela:recraft
    justificativaFerramentas: "Muda a Etapa do fluxo para restauração: ampliação e recuperação de detalhe pedem modelos de upscaling."
    excecao: ""
    parametros:
      - chave: Etapa do fluxo
        valor: Restauração
        fonte: editorial
      - chave: Entregável
        valor: Foto antiga recuperada e ampliada
        fonte: editorial
      - chave: Resolução
        valor: Ampliação de 2x a 4x
        fonte: não verificado
  - id: preenchimento-generativo
    nome: Preenchimento generativo
    descricao: Estender, remover ou substituir elementos com IA generativa.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
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
    justificativaFerramentas: "Muda a Etapa do fluxo para edição generativa: o critério é qualidade de inpainting e coerência de luz."
    excecao: ""
    parametros:
      - chave: Etapa do fluxo
        valor: Edição generativa
        fonte: editorial
      - chave: Entregável
        valor: Elemento removido, estendido ou substituído
        fonte: editorial
  - id: edicao-em-lote
    nome: Edição em lote
    descricao: Aplicar o mesmo ajuste a centenas de fotos por fluxo automatizado.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:activepieces
      - tabela:node-red
      - tabela:windmill
    custoBeneficio:
      - "[[n8n|n8n]]"
      - tabela:make
      - tabela:pipedream
    qualidadeMaxima:
      - tabela:zapier
      - tabela:power-automate
      - tabela:workato
    justificativaFerramentas: "Muda a Etapa do fluxo para automação: o mesmo ajuste em centenas de fotos pede fluxo automatizado."
    excecao: ""
    parametros:
      - chave: Etapa do fluxo
        valor: Automação
        fonte: editorial
      - chave: Entregável
        valor: Mesmo ajuste aplicado a centenas de fotos
        fonte: editorial
      - chave: Ambiente de execução
        valor: Fluxo automatizado com n8n, Make ou script
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Edição e retoque de foto
## 📝 Descrição
Corrigir, restaurar, ampliar e transformar fotos com edição manual e generativa.
## ⏰ Quando aplicar
- Foto de retrato, produto ou paisagem
- Lote de imagens para catálogo
## 🧩 Funcionalidades necessárias
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
## ✅ Recomendações
- [[canva|Canva]] - Faixa custo-benefício em [[edicao_imagem|Edição de imagem]].
- [[midjourney|Midjourney]] - Faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[n8n|n8n]] - Faixa custo-benefício em [[automacao_nocode|Automação e no-code]].
- [[adobe_photoshop|Adobe Photoshop]] - Faixa qualidade máxima em [[edicao_imagem|Edição de imagem]].
- [[gimp|GIMP]] - Faixa mais barata em [[edicao_imagem|Edição de imagem]].
- [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]] - Modelo da faixa custo-benefício em [[geracao_imagem|Ferramentas de geração de imagem]].
- [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]] - Modelo da faixa qualidade máxima em [[geracao_imagem|Ferramentas de geração de imagem]].
## 🧬 Variações
- **Retoque de retrato** (`retoque-retrato`): Pele, luz e cor em retratos com ajustes locais. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Etapa do fluxo: Retoque local; Entregável: Retrato com pele, luz e cor ajustadas.
- **Remoção e troca de fundo** (`remocao-fundo`): Recorte de objeto e fundo novo para fotos de produto. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: Photopea, [[gimp|GIMP]], Krita. Custo-benefício: remove.bg, [[canva|Canva]], Adobe Express. Qualidade máxima: [[adobe_photoshop|Adobe Photoshop]], Adobe Firefly, Topaz Photo. Por que difere do caso: Muda a Etapa do fluxo para recorte: ferramentas de remoção de fundo cortam o tempo de máscara manual. Parâmetros: Etapa do fluxo: Recorte; Entregável: Imagem de produto com fundo novo; Formato de arquivo: PNG com transparência (não verificado).
- **Restauração e ampliação** (`restauracao-ampliacao`): Recuperar fotos antigas e ampliar resolução sem perder detalhe. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: Krita, [[gimp|GIMP]], [[stable_diffusion|Stable Diffusion]]. Custo-benefício: Topaz Photo, Adobe Firefly, Photopea. Qualidade máxima: Magnific, [[adobe_photoshop|Adobe Photoshop]], Recraft. Por que difere do caso: Muda a Etapa do fluxo para restauração: ampliação e recuperação de detalhe pedem modelos de upscaling. Parâmetros: Etapa do fluxo: Restauração; Entregável: Foto antiga recuperada e ampliada; Resolução: Ampliação de 2x a 4x (não verificado).
- **Preenchimento generativo** (`preenchimento-generativo`): Estender, remover ou substituir elementos com IA generativa. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Mais barata: [[stable_diffusion|Stable Diffusion]], FLUX.1 (pesos abertos), ComfyUI. Custo-benefício: [[midjourney|Midjourney]], [[gemini_nano_banana_2_1|Gemini Nano Banana 2.1]], Ideogram. Qualidade máxima: [[gpt_image_2_6_sunburst|GPT-Image-2.6 Sunburst]], Adobe Firefly, Recraft. Por que difere do caso: Muda a Etapa do fluxo para edição generativa: o critério é qualidade de inpainting e coerência de luz. Parâmetros: Etapa do fluxo: Edição generativa; Entregável: Elemento removido, estendido ou substituído.
- **Edição em lote** (`edicao-em-lote`): Aplicar o mesmo ajuste a centenas de fotos por fluxo automatizado. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: Activepieces, Node-RED, Windmill. Custo-benefício: [[n8n|n8n]], Make, Pipedream. Qualidade máxima: Zapier, Power Automate, Workato. Por que difere do caso: Muda a Etapa do fluxo para automação: o mesmo ajuste em centenas de fotos pede fluxo automatizado. Parâmetros: Etapa do fluxo: Automação; Entregável: Mesmo ajuste aplicado a centenas de fotos; Ambiente de execução: Fluxo automatizado com n8n, Make ou script.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gimp|GIMP]], Krita, Photopea
- **Custo-benefício:** [[canva|Canva]], Adobe Firefly, remove.bg
- **Qualidade máxima:** [[adobe_photoshop|Adobe Photoshop]], Topaz Photo, Magnific
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Editores gratuitos resolvem a maioria dos ajustes e o custo define a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
