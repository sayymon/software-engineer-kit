---
id: documentacao_de_software
tipo: caso-de-uso
nome: Documentação de software
aliases: []
descricao: Escrever e manter README, guias, referência de API e decisões de arquitetura.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[geracao_de_infografico|Geração de infográfico]]"
  - "[[raciocinio|Raciocínio]]"
categoriasRelacionadas:
  - "[[documentacao_diagramas|Documentação e diagramas]]"
  - "[[testes_documentacao_apis|Testes e documentação de APIs]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[obsidian|Obsidian (ferramenta)]]"
  - "[[excalidraw|Excalidraw (ferramenta)]]"
  - "[[insomnia|Insomnia]]"
  - "[[notion|Notion]]"
  - "[[lucidchart|Lucidchart]]"
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
  - desenvolvimento-software
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
faixasPadrao:
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
variacoes:
  - id: doc-readme-guias
    nome: README e guias
    descricao: Instalação, uso e contribuição.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Repositório do projeto
        fonte: editorial
      - chave: Escala típica
        valor: Um README por repositório
        fonte: editorial
      - chave: Público do documento
        valor: Quem instala e contribui
        fonte: editorial
  - id: doc-referencia-api
    nome: Referência de API
    descricao: Contrato, exemplos e ambiente de teste.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[bruno|Bruno]]"
      - tabela:hoppscotch
      - tabela:httpie
    custoBeneficio:
      - "[[insomnia|Insomnia]]"
      - tabela:stoplight
      - tabela:redocly
    qualidadeMaxima:
      - "[[postman|Postman]]"
      - tabela:swaggerhub
      - "[[readme|ReadMe (ferramenta)]]"
    justificativaFerramentas: "Muda Público do documento para quem integra a API: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Portal ou cliente de API
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de endpoints
        fonte: editorial
      - chave: Público do documento
        valor: Quem integra a API
        fonte: editorial
  - id: doc-diagramas-codigo
    nome: Diagramas como código
    descricao: Fluxos e arquiteturas versionados.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mermaid|Mermaid]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
      - tabela:c4-plantuml
    custoBeneficio:
      - tabela:drawio
      - "[[obsidian|Obsidian (ferramenta)]]"
      - tabela:whimsical
    qualidadeMaxima:
      - "[[lucidchart|Lucidchart]]"
      - tabela:miro
      - tabela:microsoft-visio
    justificativaFerramentas: "Muda Público do documento para quem mantém a arquitetura: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Repositório com diagramas versionados
        fonte: editorial
      - chave: Escala típica
        valor: Diagramas revisados em pull request
        fonte: editorial
      - chave: Público do documento
        valor: Quem mantém a arquitetura
        fonte: editorial
  - id: doc-adr
    nome: Decisões de arquitetura
    descricao: Registro de contexto, opções e consequências.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[bookstack|BookStack]]"
      - tabela:outline
      - tabela:docmost
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:slite
      - tabela:coda
    qualidadeMaxima:
      - "[[confluence|Confluence (ferramenta)]]"
      - tabela:guru
      - tabela:microsoft-sharepoint
    justificativaFerramentas: "Muda Público do documento para time atual e futuros mantenedores: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Wiki ou pasta de decisões no repositório
        fonte: editorial
      - chave: Escala típica
        valor: Um registro por decisão
        fonte: editorial
      - chave: Público do documento
        valor: Time atual e futuros mantenedores
        fonte: editorial
  - id: doc-site-publico
    nome: Site de documentação
    descricao: Portal pesquisável com versões.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:mkdocs
      - tabela:docusaurus
      - "[[bookstack|BookStack]]"
    custoBeneficio:
      - tabela:redocly
      - tabela:stoplight
      - "[[readme|ReadMe (ferramenta)]]"
    qualidadeMaxima:
      - "[[confluence|Confluence (ferramenta)]]"
      - "[[mintlify|Mintlify]]"
      - tabela:microsoft-sharepoint
    justificativaFerramentas: "Muda Público do documento para usuários finais e comunidade: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Site estático publicado com busca
        fonte: editorial
      - chave: Escala típica
        valor: Centenas de páginas com versões
        fonte: editorial
      - chave: Público do documento
        valor: Usuários finais e comunidade
        fonte: editorial
    verificadoEm: 2026-11-23
tags:
  - caso-de-uso
  - ferramenta
---
# Documentação de software
## 📝 Descrição
Escrever e manter README, guias, referência de API e decisões de arquitetura.
## ⏰ Quando aplicar
- Biblioteca ou serviço interno
- API pública
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
## ✅ Recomendações
- [[obsidian|Obsidian (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[excalidraw|Excalidraw (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[insomnia|Insomnia]] - Faixa custo-benefício em [[testes_documentacao_apis|Testes e documentação de APIs]].
- [[notion|Notion]] - Faixa custo-benefício em [[wiki_base_conhecimento|Wiki e base de conhecimento]].
- [[lucidchart|Lucidchart]] - Faixa qualidade máxima em [[documentacao_diagramas|Documentação e diagramas]].
## 🧬 Variações
- **README e guias** (`doc-readme-guias`): Instalação, uso e contribuição. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_codigo|Geração de código]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Repositório do projeto; Escala típica: Um README por repositório; Público do documento: Quem instala e contribui.
- **Referência de API** (`doc-referencia-api`): Contrato, exemplos e ambiente de teste. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[bruno|Bruno]], Hoppscotch, HTTPie. Custo-benefício: [[insomnia|Insomnia]], Stoplight, Redocly. Qualidade máxima: [[postman|Postman]], SwaggerHub, [[readme|ReadMe (ferramenta)]]. Por que difere do caso: Muda Público do documento para quem integra a API: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Portal ou cliente de API; Escala típica: Dezenas de endpoints; Público do documento: Quem integra a API.
- **Diagramas como código** (`doc-diagramas-codigo`): Fluxos e arquiteturas versionados. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_codigo|Geração de código]]. Mais barata: [[mermaid|Mermaid]], [[excalidraw|Excalidraw (ferramenta)]], C4-PlantUML. Custo-benefício: draw.io, [[obsidian|Obsidian (ferramenta)]], Whimsical. Qualidade máxima: [[lucidchart|Lucidchart]], Miro, Microsoft Visio. Por que difere do caso: Muda Público do documento para quem mantém a arquitetura: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Repositório com diagramas versionados; Escala típica: Diagramas revisados em pull request; Público do documento: Quem mantém a arquitetura.
- **Decisões de arquitetura** (`doc-adr`): Registro de contexto, opções e consequências. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Mais barata: [[bookstack|BookStack]], Outline, Docmost. Custo-benefício: [[notion|Notion]], Slite, Coda. Qualidade máxima: [[confluence|Confluence (ferramenta)]], Guru, Microsoft SharePoint. Por que difere do caso: Muda Público do documento para time atual e futuros mantenedores: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Wiki ou pasta de decisões no repositório; Escala típica: Um registro por decisão; Público do documento: Time atual e futuros mantenedores.
- **Site de documentação** (`doc-site-publico`): Portal pesquisável com versões. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_codigo|Geração de código]]. Mais barata: MkDocs, Docusaurus, [[bookstack|BookStack]]. Custo-benefício: Redocly, Stoplight, [[readme|ReadMe (ferramenta)]]. Qualidade máxima: [[confluence|Confluence (ferramenta)]], [[mintlify|Mintlify]], Microsoft SharePoint. Por que difere do caso: Muda Público do documento para usuários finais e comunidade: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Site estático publicado com busca; Escala típica: Centenas de páginas com versões; Público do documento: Usuários finais e comunidade.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[mermaid|Mermaid]], Docusaurus, MkDocs
- **Custo-benefício:** [[obsidian|Obsidian (ferramenta)]], [[excalidraw|Excalidraw (ferramenta)]], draw.io
- **Qualidade máxima:** [[lucidchart|Lucidchart]], Miro, Whimsical
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Documentação é ativo de longa vida e formatos abertos evitam retrabalho.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
