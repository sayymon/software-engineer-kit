---
id: visualizacao_de_dados
tipo: caso-de-uso
nome: Visualização de dados
aliases:
  - visualizacao-dados
descricao: Transformar dados e ideias em gráficos, diagramas e infográficos.
funcionalidadesNecessarias:
  - "[[geracao_de_infografico|Geração de infográfico]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[visualizacao_ia|Visualização com IA]]"
  - "[[assistente_chat|Assistente de chat]]"
ferramentasRecomendadas:
  - "[[napkin|Napkin]]"
  - "[[chatgpt|ChatGPT]]"
  - "[[claude|Claude AI]]"
modelosRecomendados:
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[gpt_5_5|GPT-5.5]]"
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
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dados_e_analytics|Dados e analytics]]"
faixasPadrao:
  maisBarata:
    - "[[excalidraw|Excalidraw (ferramenta)]]"
    - "[[mermaid|Mermaid]]"
    - tabela:drawio
  custoBeneficio:
    - "[[napkin|Napkin]]"
    - "[[canva|Canva]]"
    - tabela:whimsical
  qualidadeMaxima:
    - "[[figma|Figma]]"
    - "[[lucidchart|Lucidchart]]"
    - tabela:miro
variacoes:
  - id: viz-infografico
    nome: Infográfico e explicação visual
    descricao: Dados transformados em infográficos para apresentação.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Editor visual no navegador
        fonte: editorial
      - chave: Escala típica
        valor: Um infográfico por peça
        fonte: editorial
      - chave: Público do resultado
        valor: Audiência de apresentação
        fonte: editorial
  - id: viz-diagrama-arquitetura
    nome: Diagrama de arquitetura e fluxo
    descricao: Diagramas como código gerados a partir de texto.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mermaid|Mermaid]]"
      - tabela:docusaurus
      - tabela:mkdocs
    custoBeneficio:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
      - tabela:drawio
    qualidadeMaxima:
      - "[[lucidchart|Lucidchart]]"
      - tabela:miro
      - tabela:whimsical
    justificativaFerramentas: "Muda Público do resultado para time de engenharia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Texto versionado no repositório
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de diagramas por sistema
        fonte: editorial
      - chave: Público do resultado
        valor: Time de engenharia
        fonte: editorial
  - id: viz-painel-bi
    nome: Painel de BI
    descricao: Dashboards com indicadores e filtros para o negócio.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[metabase|Metabase]]"
      - tabela:apache-superset
      - tabela:evidence
    custoBeneficio:
      - "[[looker_studio|Looker Studio]]"
      - tabela:power-bi
      - tabela:sigma-computing
    qualidadeMaxima:
      - "[[tableau|Tableau]]"
      - tabela:looker
      - "[[amazon_quicksight|Amazon QuickSight (ferramenta)]]"
    justificativaFerramentas: "Muda Público do resultado para gestores do negócio: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Ferramenta de BI conectada ao banco
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de painéis com filtros
        fonte: editorial
      - chave: Público do resultado
        valor: Gestores do negócio
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Visualização de dados
## 📝 Descrição
Transformar dados e ideias em gráficos, diagramas e infográficos.
## ⏰ Quando aplicar
- Apresentações e relatórios
- Explicação visual de conceitos
## 🧩 Funcionalidades necessárias
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[napkin|Napkin]] - Converte texto em diagramas e infográficos editáveis
- [[chatgpt|ChatGPT]] - Gera gráficos a partir de dados enviados
- [[claude|Claude AI]] - Cria visualizações e artefatos interativos
- [[gemini_3_8_flash|Gemini 3.8 Flash]] - Geração rápida de código de gráficos
- [[gpt_5_5|GPT-5.5]] - Boa precisão ao transformar tabelas em gráficos
## 🧬 Variações
- **Infográfico e explicação visual** (`viz-infografico`): Dados transformados em infográficos para apresentação. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Editor visual no navegador; Escala típica: Um infográfico por peça; Público do resultado: Audiência de apresentação.
- **Diagrama de arquitetura e fluxo** (`viz-diagrama-arquitetura`): Diagramas como código gerados a partir de texto. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[mermaid|Mermaid]], Docusaurus, MkDocs. Custo-benefício: [[obsidian|Obsidian (ferramenta)]], [[excalidraw|Excalidraw (ferramenta)]], draw.io. Qualidade máxima: [[lucidchart|Lucidchart]], Miro, Whimsical. Por que difere do caso: Muda Público do resultado para time de engenharia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Texto versionado no repositório; Escala típica: Dezenas de diagramas por sistema; Público do resultado: Time de engenharia.
- **Painel de BI** (`viz-painel-bi`): Dashboards com indicadores e filtros para o negócio. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[metabase|Metabase]], Apache Superset, Evidence. Custo-benefício: [[looker_studio|Looker Studio]], Power BI, Sigma Computing. Qualidade máxima: [[tableau|Tableau]], Looker, [[amazon_quicksight|Amazon QuickSight (ferramenta)]]. Por que difere do caso: Muda Público do resultado para gestores do negócio: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Ferramenta de BI conectada ao banco; Escala típica: Dezenas de painéis com filtros; Público do resultado: Gestores do negócio.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[excalidraw|Excalidraw (ferramenta)]], [[mermaid|Mermaid]], draw.io
- **Custo-benefício:** [[napkin|Napkin]], [[canva|Canva]], Whimsical
- **Qualidade máxima:** [[figma|Figma]], [[lucidchart|Lucidchart]], Miro
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Visuais são refeitos várias vezes, então o custo por iteração conduz a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[dados_e_analytics|Dados e analytics]]
