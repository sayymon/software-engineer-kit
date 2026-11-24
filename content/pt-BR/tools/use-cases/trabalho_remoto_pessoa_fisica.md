---
id: trabalho_remoto_pessoa_fisica
tipo: caso-de-uso
nome: Trabalho remoto (pessoa física)
aliases:
  - trabalho-remoto-pessoa-fisica
descricao: Organizar tarefas, reuniões e conhecimento de quem trabalha de casa, com comunicação assíncrona e registro das decisões.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[comunicacao_equipe|Comunicação de equipe]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
  - "[[gestao_projetos|Gestão de projetos]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[slack|Slack]]"
  - "[[otter_ai|Otter.ai]]"
  - "[[plane|Plane]]"
  - "[[notion|Notion]]"
  - "[[bitwarden|Bitwarden]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
segmentos:
  - servicos-profissionais
nicho: profissional autônomo ou remoto
nivel: caso
eixo: cenario
macro: "[[produtividade_e_trabalho|Produtividade e trabalho]]"
faixasPadrao:
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
variacoes:
  - id: remoto-reunioes-assincrono
    nome: Reuniões e comunicação assíncrona
    descricao: Ata automática e canais de equipe para quem trabalha em fusos diferentes.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Profissional remoto
        fonte: editorial
      - chave: Volume típico
        valor: Reuniões em vários fusos
        fonte: editorial
      - chave: Tipo de rotina
        valor: Comunicação assíncrona
        fonte: editorial
  - id: remoto-gestao-tarefas
    nome: Gestão de tarefas e projetos
    descricao: Quadro de tarefas e documentação central para equipe distribuída.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[plane|Plane]]"
      - tabela:taiga
      - tabela:openproject
    custoBeneficio:
      - "[[linear|Linear]]"
      - tabela:clickup
      - tabela:trello
    qualidadeMaxima:
      - "[[jira|Jira (ferramenta)]]"
      - tabela:asana
      - tabela:monday
    justificativaFerramentas: "Muda Tipo de rotina para quadro e documentação central: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Equipe distribuída
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de tarefas por semana
        fonte: editorial
      - chave: Tipo de rotina
        valor: Quadro e documentação central
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Trabalho remoto (pessoa física)
## 📝 Descrição
Organizar tarefas, reuniões e conhecimento de quem trabalha de casa, com comunicação assíncrona e registro das decisões.
## ⏰ Quando aplicar
- Trabalho em equipe distribuída
- Autônomo que precisa de rotina organizada
## 🧱 Pilha por categoria
- [[comunicacao_equipe|Comunicação de equipe]] - conversa com o time
- [[reunioes_transcricao|Reuniões e transcrição]] - atas e decisões registradas
- [[gestao_projetos|Gestão de projetos]] - tarefas e prazos
- [[wiki_base_conhecimento|Wiki e base de conhecimento]] - documentação do trabalho
## ✅ Recomendações
- [[slack|Slack]] - comunicação padrão de mercado em equipes
- [[otter_ai|Otter.ai]] - transcrição de reuniões
- [[plane|Plane]] - gestão de projetos open source
- [[notion|Notion]] - documentos e tarefas em um só lugar
- [[bitwarden|Bitwarden]] - senhas do trabalho em um cofre
## 🧬 Variações
- **Reuniões e comunicação assíncrona** (`remoto-reunioes-assincrono`): Ata automática e canais de equipe para quem trabalha em fusos diferentes. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Profissional remoto; Volume típico: Reuniões em vários fusos; Tipo de rotina: Comunicação assíncrona.
- **Gestão de tarefas e projetos** (`remoto-gestao-tarefas`): Quadro de tarefas e documentação central para equipe distribuída. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[plane|Plane]], Taiga, OpenProject. Custo-benefício: [[linear|Linear]], ClickUp, Trello. Qualidade máxima: [[jira|Jira (ferramenta)]], Asana, monday.com. Por que difere do caso: Muda Tipo de rotina para quadro e documentação central: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Equipe distribuída; Volume típico: Dezenas de tarefas por semana; Tipo de rotina: Quadro e documentação central.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[whisper|Whisper]], Fathom (reuniões), tl;dv
- **Custo-benefício:** [[otter_ai|Otter.ai]], Fireflies.ai, Read AI
- **Qualidade máxima:** [[granola|Granola]], Avoma, Rev
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Quem trabalha por conta própria paga a ferramenta do próprio bolso, e a camada gratuita costuma bastar.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[produtividade_e_trabalho|Produtividade e trabalho]]
