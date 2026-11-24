---
id: criacao_de_apresentacoes
tipo: caso-de-uso
nome: Criação de apresentações
aliases: []
descricao: Montar apresentações a partir de roteiro, dados e identidade visual.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[geracao_de_infografico|Geração de infográfico]]"
categoriasRelacionadas:
  - "[[apresentacoes_slides|Apresentações e slides]]"
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
ferramentasRecomendadas:
  - "[[canva|Canva]]"
  - "[[microsoft_excel|Microsoft Excel]]"
  - "[[airtable|Airtable]]"
  - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
  - "[[chatgpt|ChatGPT]]"
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
  - escritorio-produtividade
  - educacao
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[escrita_e_documentos_macro|Escrita e documentos (macro)]]"
faixasPadrao:
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
variacoes:
  - id: slides-deck-rapido
    nome: Deck rápido por prompt
    descricao: Apresentação completa gerada do tema à última lâmina.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa ou time pequeno
        fonte: editorial
      - chave: Volume típico
        valor: Uma apresentação por tema
        fonte: editorial
      - chave: Público do resultado
        valor: Reunião interna
        fonte: editorial
  - id: slides-pitch
    nome: Pitch para investidores
    descricao: Narrativa, números e design de lâminas de captação.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_slides|Google Slides]]"
      - "[[canva|Canva]]"
      - tabela:gamma
    custoBeneficio:
      - tabela:pitch
      - tabela:beautiful-ai
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
    qualidadeMaxima:
      - tabela:adobe-express
      - "[[figma|Figma]]"
      - "[[napkin|Napkin]]"
    justificativaFerramentas: "Muda Público do resultado para investidores: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Startup em captação
        fonte: editorial
      - chave: Volume típico
        valor: Um deck por rodada
        fonte: editorial
      - chave: Público do resultado
        valor: Investidores
        fonte: editorial
  - id: slides-codigo
    nome: Slides como código
    descricao: Apresentações em Markdown versionadas em Git.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:marp
      - tabela:slidev
      - "[[google_slides|Google Slides]]"
    custoBeneficio:
      - tabela:gamma
      - tabela:beautiful-ai
      - tabela:pitch
    qualidadeMaxima:
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
      - tabela:adobe-express
      - "[[canva|Canva]]"
    justificativaFerramentas: "Muda Público do resultado para comunidade e eventos de tecnologia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time técnico
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de decks versionados
        fonte: editorial
      - chave: Público do resultado
        valor: Comunidade e eventos de tecnologia
        fonte: editorial
  - id: slides-relatorio-dados
    nome: Relatório com dados
    descricao: Gráficos e tabelas atualizados para reunião de resultados.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_infografico|Geração de infográfico]]"
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
    justificativaFerramentas: "Muda Público do resultado para diretoria em reunião de resultados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de operações ou financeiro
        fonte: editorial
      - chave: Volume típico
        valor: Um relatório por mês
        fonte: editorial
      - chave: Público do resultado
        valor: Diretoria em reunião de resultados
        fonte: editorial
  - id: slides-aula-palestra
    nome: Aula e palestra
    descricao: Roteiro, notas do apresentador e exercícios.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_slides|Google Slides]]"
      - tabela:marp
      - tabela:slidev
    custoBeneficio:
      - "[[notebooklm|NotebookLM]]"
      - "[[canva|Canva]]"
      - tabela:gamma
    qualidadeMaxima:
      - "[[claude|Claude AI]]"
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
      - tabela:beautiful-ai
    justificativaFerramentas: "Muda Público do resultado para alunos e plateia de evento: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Professor ou palestrante independente
        fonte: editorial
      - chave: Volume típico
        valor: Uma aula ou palestra por semana
        fonte: editorial
      - chave: Público do resultado
        valor: Alunos e plateia de evento
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Criação de apresentações
## 📝 Descrição
Montar apresentações a partir de roteiro, dados e identidade visual.
## ⏰ Quando aplicar
- Pitch e reunião de resultados
- Aula e palestra
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
## ✅ Recomendações
- [[canva|Canva]] - Faixa custo-benefício em [[apresentacoes_slides|Apresentações e slides]].
- [[microsoft_excel|Microsoft Excel]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[airtable|Airtable]] - Faixa custo-benefício em [[planilhas_analise_dados|Planilhas e análise de dados]].
- [[microsoft_powerpoint|Microsoft PowerPoint]] - Faixa qualidade máxima em [[apresentacoes_slides|Apresentações e slides]].
- [[chatgpt|ChatGPT]] - Faixa qualidade máxima em [[planilhas_analise_dados|Planilhas e análise de dados]].
## 🧬 Variações
- **Deck rápido por prompt** (`slides-deck-rapido`): Apresentação completa gerada do tema à última lâmina. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa ou time pequeno; Volume típico: Uma apresentação por tema; Público do resultado: Reunião interna.
- **Pitch para investidores** (`slides-pitch`): Narrativa, números e design de lâminas de captação. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[google_slides|Google Slides]], [[canva|Canva]], Gamma. Custo-benefício: Pitch, Beautiful.ai, [[microsoft_powerpoint|Microsoft PowerPoint]]. Qualidade máxima: Adobe Express, [[figma|Figma]], [[napkin|Napkin]]. Por que difere do caso: Muda Público do resultado para investidores: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Startup em captação; Volume típico: Um deck por rodada; Público do resultado: Investidores.
- **Slides como código** (`slides-codigo`): Apresentações em Markdown versionadas em Git. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_codigo|Geração de código]]. Mais barata: Marp, Slidev, [[google_slides|Google Slides]]. Custo-benefício: Gamma, Beautiful.ai, Pitch. Qualidade máxima: [[microsoft_powerpoint|Microsoft PowerPoint]], Adobe Express, [[canva|Canva]]. Por que difere do caso: Muda Público do resultado para comunidade e eventos de tecnologia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time técnico; Volume típico: Dezenas de decks versionados; Público do resultado: Comunidade e eventos de tecnologia.
- **Relatório com dados** (`slides-relatorio-dados`): Gráficos e tabelas atualizados para reunião de resultados. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_infografico|Geração de infográfico]]. Mais barata: [[libreoffice|LibreOffice]], Google Sheets, [[google_colab|Google Colab (ferramenta)]]. Custo-benefício: [[microsoft_excel|Microsoft Excel]], Julius AI, [[airtable|Airtable]]. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], Hex. Por que difere do caso: Muda Público do resultado para diretoria em reunião de resultados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de operações ou financeiro; Volume típico: Um relatório por mês; Público do resultado: Diretoria em reunião de resultados.
- **Aula e palestra** (`slides-aula-palestra`): Roteiro, notas do apresentador e exercícios. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[google_slides|Google Slides]], Marp, Slidev. Custo-benefício: [[notebooklm|NotebookLM]], [[canva|Canva]], Gamma. Qualidade máxima: [[claude|Claude AI]], [[microsoft_powerpoint|Microsoft PowerPoint]], Beautiful.ai. Por que difere do caso: Muda Público do resultado para alunos e plateia de evento: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Professor ou palestrante independente; Volume típico: Uma aula ou palestra por semana; Público do resultado: Alunos e plateia de evento.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[google_slides|Google Slides]], Marp, Slidev
- **Custo-benefício:** [[canva|Canva]], Gamma, Beautiful.ai
- **Qualidade máxima:** [[microsoft_powerpoint|Microsoft PowerPoint]], Pitch, Adobe Express
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Editores gratuitos e de código resolvem a maioria dos decks.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[escrita_e_documentos_macro|Escrita e documentos (macro)]]
