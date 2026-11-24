---
id: infograficos_e_diagramas
tipo: caso-de-uso
nome: Infográficos e diagramas
aliases: []
descricao: Transformar dados, processos e ideias em infográficos, fluxogramas e diagramas.
funcionalidadesNecessarias:
  - "[[geracao_de_infografico|Geração de infográfico]]"
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
categoriasRelacionadas:
  - "[[infograficos_diagramas|Infográficos e diagramas visuais]]"
  - "[[documentacao_diagramas|Documentação e diagramas]]"
  - "[[visualizacao_ia|Visualização com IA]]"
  - "[[estudo_base_conhecimento|Estudo e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[napkin|Napkin]]"
  - "[[canva|Canva]]"
  - "[[obsidian|Obsidian (ferramenta)]]"
  - "[[excalidraw|Excalidraw (ferramenta)]]"
  - "[[notebooklm|NotebookLM]]"
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
  - design-criativo
  - escritorio-produtividade
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[design_e_imagem|Design e imagem]]"
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
  - id: diagrama-fluxograma
    nome: Fluxograma de processo
    descricao: Mapa de etapas e decisões de um processo de negócio.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Uso final
        valor: Processo de negócio
        fonte: editorial
      - chave: Entregável
        valor: Mapa de etapas e decisões
        fonte: editorial
      - chave: Notação
        valor: Fluxograma ou BPMN simplificado
        fonte: editorial
  - id: diagrama-arquitetura
    nome: Diagrama de arquitetura
    descricao: Componentes, fronteiras e fluxos de um sistema.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_codigo|Geração de código]]"
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
    justificativaFerramentas: "Muda o Uso final para documentação técnica: diagramas como código e versionados em repositório."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Documentação técnica
        fonte: editorial
      - chave: Entregável
        valor: Componentes, fronteiras e fluxos do sistema
        fonte: editorial
      - chave: Notação
        valor: C4 ou diagrama como código com Mermaid
        fonte: editorial
  - id: infografico-dados
    nome: Infográfico de dados
    descricao: Números e comparações em peça visual para publicação.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mermaid|Mermaid]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
      - tabela:drawio
    custoBeneficio:
      - "[[napkin|Napkin]]"
      - tabela:miro
      - "[[lucidchart|Lucidchart]]"
    qualidadeMaxima:
      - "[[figma|Figma]]"
      - tabela:microsoft-visio
      - tabela:whimsical
    justificativaFerramentas: "Muda o Entregável para peça visual com números: o critério é design de apresentação de dados."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Publicação
        fonte: editorial
      - chave: Entregável
        valor: Peça visual com números e comparações
        fonte: editorial
      - chave: Proporção
        valor: Vertical 4:5 ou horizontal 16:9
        fonte: não verificado
  - id: mapa-mental
    nome: Mapa mental
    descricao: Estrutura de ideias para estudo ou planejamento.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - tabela:logseq
      - tabela:anki
    custoBeneficio:
      - "[[notebooklm|NotebookLM]]"
      - "[[notion|Notion]]"
      - tabela:remnote
    qualidadeMaxima:
      - "[[perplexity|Perplexity]]"
      - tabela:readwise
      - tabela:mem-ai
    justificativaFerramentas: "Muda a Notação para mapa mental: pede ferramentas de anotação e estudo conectadas."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Estudo e planejamento
        fonte: editorial
      - chave: Entregável
        valor: Estrutura radial de ideias
        fonte: editorial
      - chave: Notação
        valor: Mapa mental
        fonte: editorial
  - id: diagrama-colaborativo
    nome: Quadro colaborativo
    descricao: Sessão de equipe em quadro branco com diagramas.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[excalidraw|Excalidraw (ferramenta)]]"
      - tabela:excalidraw-mcp
      - tabela:drawio
    custoBeneficio:
      - tabela:miro
      - tabela:whimsical
      - "[[figma|Figma]]"
    qualidadeMaxima:
      - "[[lucidchart|Lucidchart]]"
      - tabela:microsoft-visio
      - "[[napkin|Napkin]]"
    justificativaFerramentas: "Muda o Uso final para workshop em tempo real: o critério é colaboração simultânea no quadro."
    excecao: ""
    parametros:
      - chave: Uso final
        valor: Workshop de equipe
        fonte: editorial
      - chave: Entregável
        valor: Quadro compartilhado em tempo real
        fonte: editorial
      - chave: Escala típica
        valor: Equipe de 3 a 15 pessoas
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Infográficos e diagramas
## 📝 Descrição
Transformar dados, processos e ideias em infográficos, fluxogramas e diagramas.
## ⏰ Quando aplicar
- Apresentação de processo ou arquitetura
- Infográfico para publicação
## 🧩 Funcionalidades necessárias
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
## ✅ Recomendações
- [[napkin|Napkin]] - Faixa custo-benefício em [[infograficos_diagramas|Infográficos e diagramas visuais]].
- [[canva|Canva]] - Faixa custo-benefício em [[infograficos_diagramas|Infográficos e diagramas visuais]].
- [[obsidian|Obsidian (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[excalidraw|Excalidraw (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[notebooklm|NotebookLM]] - Faixa custo-benefício em [[estudo_base_conhecimento|Estudo e base de conhecimento]].
## 🧬 Variações
- **Fluxograma de processo** (`diagrama-fluxograma`): Mapa de etapas e decisões de um processo de negócio. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Uso final: Processo de negócio; Entregável: Mapa de etapas e decisões; Notação: Fluxograma ou BPMN simplificado.
- **Diagrama de arquitetura** (`diagrama-arquitetura`): Componentes, fronteiras e fluxos de um sistema. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_codigo|Geração de código]]. Mais barata: [[mermaid|Mermaid]], Docusaurus, MkDocs. Custo-benefício: [[obsidian|Obsidian (ferramenta)]], [[excalidraw|Excalidraw (ferramenta)]], draw.io. Qualidade máxima: [[lucidchart|Lucidchart]], Miro, Whimsical. Por que difere do caso: Muda o Uso final para documentação técnica: diagramas como código e versionados em repositório. Parâmetros: Uso final: Documentação técnica; Entregável: Componentes, fronteiras e fluxos do sistema; Notação: C4 ou diagrama como código com Mermaid.
- **Infográfico de dados** (`infografico-dados`): Números e comparações em peça visual para publicação. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[mermaid|Mermaid]], [[excalidraw|Excalidraw (ferramenta)]], draw.io. Custo-benefício: [[napkin|Napkin]], Miro, [[lucidchart|Lucidchart]]. Qualidade máxima: [[figma|Figma]], Microsoft Visio, Whimsical. Por que difere do caso: Muda o Entregável para peça visual com números: o critério é design de apresentação de dados. Parâmetros: Uso final: Publicação; Entregável: Peça visual com números e comparações; Proporção: Vertical 4:5 ou horizontal 16:9 (não verificado).
- **Mapa mental** (`mapa-mental`): Estrutura de ideias para estudo ou planejamento. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[obsidian|Obsidian (ferramenta)]], Logseq, Anki. Custo-benefício: [[notebooklm|NotebookLM]], [[notion|Notion]], RemNote. Qualidade máxima: [[perplexity|Perplexity]], Readwise, Mem. Por que difere do caso: Muda a Notação para mapa mental: pede ferramentas de anotação e estudo conectadas. Parâmetros: Uso final: Estudo e planejamento; Entregável: Estrutura radial de ideias; Notação: Mapa mental.
- **Quadro colaborativo** (`diagrama-colaborativo`): Sessão de equipe em quadro branco com diagramas. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[excalidraw|Excalidraw (ferramenta)]], Excalidraw MCP, draw.io. Custo-benefício: Miro, Whimsical, [[figma|Figma]]. Qualidade máxima: [[lucidchart|Lucidchart]], Microsoft Visio, [[napkin|Napkin]]. Por que difere do caso: Muda o Uso final para workshop em tempo real: o critério é colaboração simultânea no quadro. Parâmetros: Uso final: Workshop de equipe; Entregável: Quadro compartilhado em tempo real; Escala típica: Equipe de 3 a 15 pessoas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[excalidraw|Excalidraw (ferramenta)]], [[mermaid|Mermaid]], draw.io
- **Custo-benefício:** [[napkin|Napkin]], [[canva|Canva]], Whimsical
- **Qualidade máxima:** [[figma|Figma]], [[lucidchart|Lucidchart]], Miro
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Ferramentas gratuitas e de código cobrem a maior parte dos diagramas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[design_e_imagem|Design e imagem]]
