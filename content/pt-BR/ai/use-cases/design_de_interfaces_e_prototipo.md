---
id: design_de_interfaces_e_prototipo
tipo: caso-de-uso
nome: Design de interfaces e protótipo
aliases: []
descricao: Desenhar interfaces, protótipos navegáveis e design systems com apoio de IA.
funcionalidadesNecessarias:
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[multimodal|Multimodal]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
categoriasRelacionadas:
  - "[[design_para_codigo|Design para código]]"
  - "[[ui_componentes_web|UI e componentes web]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
ferramentasRecomendadas:
  - "[[v0|v0]]"
  - "[[tailwind_css|Tailwind CSS]]"
  - "[[otter_ai|Otter.ai]]"
  - "[[figma|Figma]]"
  - "[[mui|MUI]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - design-criativo
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[design_e_imagem|Design e imagem]]"
faixasPadrao:
  maisBarata:
    - "[[penpot|Penpot]]"
    - tabela:onlook
    - tabela:storybook
  custoBeneficio:
    - "[[v0|v0]]"
    - tabela:lovable
    - tabela:bolt
  qualidadeMaxima:
    - "[[figma|Figma]]"
    - tabela:framer
    - tabela:builder-io
variacoes:
  - id: ui-wireframe
    nome: Wireframe rápido
    descricao: Esboço de telas por prompt ou desenho à mão.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Etapa do design
        valor: Exploração
        fonte: editorial
      - chave: Entregável
        valor: Esboço de telas por prompt ou desenho à mão
        fonte: editorial
      - chave: Fidelidade
        valor: Baixa
        fonte: editorial
  - id: ui-prototipo-navegavel
    nome: Protótipo navegável
    descricao: Fluxos clicáveis para teste com usuários.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Etapa do design
        valor: Validação
        fonte: editorial
      - chave: Entregável
        valor: Fluxo clicável para teste com usuários
        fonte: editorial
      - chave: Fidelidade
        valor: Média a alta
        fonte: editorial
  - id: ui-design-system
    nome: Design system
    descricao: Tokens, componentes e documentação de uso.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[shadcn_ui|shadcn-ui]]"
      - tabela:daisyui
      - tabela:headless-ui
    custoBeneficio:
      - "[[tailwind_css|Tailwind CSS]]"
      - tabela:radix-ui
      - tabela:mantine
    qualidadeMaxima:
      - "[[mui|MUI]]"
      - tabela:ant-design
      - tabela:chakra-ui
    justificativaFerramentas: "Muda a Etapa do design para sistematização: a escolha vem de bibliotecas de componentes e tokens."
    excecao: ""
    parametros:
      - chave: Etapa do design
        valor: Sistematização
        fonte: editorial
      - chave: Entregável
        valor: Tokens, componentes e documentação de uso
        fonte: editorial
      - chave: Linguagem ou runtime
        valor: TypeScript com React
        fonte: editorial
  - id: ui-handoff-codigo
    nome: Entrega para desenvolvimento
    descricao: Do arquivo de design ao código de componentes.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:storybook
      - "[[figma_context_mcp|Figma Context MCP]]"
      - tabela:shadcn-mcp
    custoBeneficio:
      - "[[figma_dev_mode_mcp|Figma Dev Mode MCP]]"
      - tabela:builder-io
      - "[[v0|v0]]"
    qualidadeMaxima:
      - "[[figma|Figma]]"
      - tabela:framer-mcp
      - tabela:storybook-mcp
    justificativaFerramentas: "Muda a Etapa do design para implementação: o critério é ler o arquivo de design e gerar componentes via MCP."
    excecao: ""
    parametros:
      - chave: Etapa do design
        valor: Implementação
        fonte: editorial
      - chave: Entregável
        valor: Componentes de código gerados do arquivo de design
        fonte: editorial
      - chave: Linguagem ou runtime
        valor: TypeScript com React
        fonte: editorial
  - id: ui-pesquisa-usuario
    nome: Pesquisa com usuários
    descricao: Roteiro, síntese de entrevistas e achados priorizados.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[whisper|Whisper]]"
      - tabela:fathom-video
      - tabela:tldv
    custoBeneficio:
      - "[[otter_ai|Otter.ai]]"
      - tabela:fireflies-ai
      - tabela:read-ai
    qualidadeMaxima:
      - "[[granola|Granola]]"
      - tabela:avoma
      - tabela:rev
    justificativaFerramentas: "Muda a Etapa do design para pesquisa: entrevistas pedem transcrição e síntese, não ferramenta de desenho."
    excecao: ""
    parametros:
      - chave: Etapa do design
        valor: Pesquisa
        fonte: editorial
      - chave: Entregável
        valor: Roteiro, síntese de entrevistas e achados priorizados
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Design de interfaces e protótipo
## 📝 Descrição
Desenhar interfaces, protótipos navegáveis e design systems com apoio de IA.
## ⏰ Quando aplicar
- Produto digital em descoberta
- Design system de uma squad
## 🧩 Funcionalidades necessárias
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
## ✅ Recomendações
- [[v0|v0]] - Faixa custo-benefício em [[design_para_codigo|Design para código]].
- [[tailwind_css|Tailwind CSS]] - Faixa custo-benefício em [[ui_componentes_web|UI e componentes web]].
- [[otter_ai|Otter.ai]] - Faixa custo-benefício em [[reunioes_transcricao|Reuniões e transcrição]].
- [[figma|Figma]] - Faixa qualidade máxima em [[design_para_codigo|Design para código]].
- [[mui|MUI]] - Faixa qualidade máxima em [[ui_componentes_web|UI e componentes web]].
## 🧬 Variações
- **Wireframe rápido** (`ui-wireframe`): Esboço de telas por prompt ou desenho à mão. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Etapa do design: Exploração; Entregável: Esboço de telas por prompt ou desenho à mão; Fidelidade: Baixa.
- **Protótipo navegável** (`ui-prototipo-navegavel`): Fluxos clicáveis para teste com usuários. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Etapa do design: Validação; Entregável: Fluxo clicável para teste com usuários; Fidelidade: Média a alta.
- **Design system** (`ui-design-system`): Tokens, componentes e documentação de uso. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[shadcn_ui|shadcn-ui]], daisyUI, Headless UI. Custo-benefício: [[tailwind_css|Tailwind CSS]], Radix UI, Mantine. Qualidade máxima: [[mui|MUI]], Ant Design, Chakra UI. Por que difere do caso: Muda a Etapa do design para sistematização: a escolha vem de bibliotecas de componentes e tokens. Parâmetros: Etapa do design: Sistematização; Entregável: Tokens, componentes e documentação de uso; Linguagem ou runtime: TypeScript com React.
- **Entrega para desenvolvimento** (`ui-handoff-codigo`): Do arquivo de design ao código de componentes. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]]. Mais barata: Storybook, [[figma_context_mcp|Figma Context MCP]], shadcn MCP. Custo-benefício: [[figma_dev_mode_mcp|Figma Dev Mode MCP]], Builder.io, [[v0|v0]]. Qualidade máxima: [[figma|Figma]], Framer MCP, Storybook MCP. Por que difere do caso: Muda a Etapa do design para implementação: o critério é ler o arquivo de design e gerar componentes via MCP. Parâmetros: Etapa do design: Implementação; Entregável: Componentes de código gerados do arquivo de design; Linguagem ou runtime: TypeScript com React.
- **Pesquisa com usuários** (`ui-pesquisa-usuario`): Roteiro, síntese de entrevistas e achados priorizados. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[whisper|Whisper]], Fathom (reuniões), tl;dv. Custo-benefício: [[otter_ai|Otter.ai]], Fireflies.ai, Read AI. Qualidade máxima: [[granola|Granola]], Avoma, Rev. Por que difere do caso: Muda a Etapa do design para pesquisa: entrevistas pedem transcrição e síntese, não ferramenta de desenho. Parâmetros: Etapa do design: Pesquisa; Entregável: Roteiro, síntese de entrevistas e achados priorizados.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[penpot|Penpot]], Onlook, Storybook
- **Custo-benefício:** [[v0|v0]], Lovable, Bolt
- **Qualidade máxima:** [[figma|Figma]], Framer, Builder.io
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Arquivos de design e componentes ficam presos ao editor, então a saída dos dados pesa.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
