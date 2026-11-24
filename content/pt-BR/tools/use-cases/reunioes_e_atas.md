---
id: reunioes_e_atas
tipo: caso-de-uso
nome: Reuniões e atas
aliases: []
descricao: Preparar, conduzir e registrar reuniões com pauta, transcrição, ata e encaminhamentos.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[busca_semantica|Busca semântica]]"
categoriasRelacionadas:
  - "[[comunicacao_equipe|Comunicação de equipe]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[slack|Slack]]"
  - "[[otter_ai|Otter.ai]]"
  - "[[notion|Notion]]"
  - "[[microsoft_teams|Microsoft Teams]]"
  - "[[granola|Granola]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - escritorio-produtividade
nicho: ""
nivel: caso
eixo: tarefa
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
  - id: reuniao-pauta
    nome: Pauta e preparação
    descricao: Pauta, contexto e perguntas antes da reunião.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[libreoffice|LibreOffice]]"
      - tabela:google-docs
      - "[[obsidian|Obsidian (ferramenta)]]"
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:slite
      - tabela:google-workspace
    qualidadeMaxima:
      - "[[claude|Claude AI]]"
      - tabela:microsoft-365-copilot
      - "[[confluence|Confluence (ferramenta)]]"
    justificativaFerramentas: "Muda Etapa da reunião para antes da reunião: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de qualquer porte
        fonte: editorial
      - chave: Volume típico
        valor: Várias reuniões por semana
        fonte: editorial
      - chave: Etapa da reunião
        valor: Antes da reunião
        fonte: editorial
  - id: reuniao-transcricao
    nome: Transcrição em tempo real
    descricao: Texto da fala com identificação de participantes.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Time de qualquer porte
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de reuniões por mês
        fonte: editorial
      - chave: Etapa da reunião
        valor: Durante a reunião
        fonte: editorial
  - id: reuniao-ata-encaminhamentos
    nome: Ata e encaminhamentos
    descricao: Decisões, responsáveis e prazos extraídos.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Time de qualquer porte
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de atas por mês
        fonte: editorial
      - chave: Etapa da reunião
        valor: Depois da reunião
        fonte: editorial
  - id: reuniao-videoconferencia
    nome: Videoconferência
    descricao: Chamadas com gravação e compartilhamento de tela.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mattermost|Mattermost]]"
      - tabela:zulip
      - tabela:rocket-chat
    custoBeneficio:
      - "[[slack|Slack]]"
      - tabela:discord
      - tabela:zoom
    qualidadeMaxima:
      - "[[microsoft_teams|Microsoft Teams]]"
      - tabela:google-workspace
      - tabela:webex
    justificativaFerramentas: "Muda Etapa da reunião para chamada com gravação: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time distribuído
        fonte: editorial
      - chave: Volume típico
        valor: Reuniões diárias
        fonte: editorial
      - chave: Etapa da reunião
        valor: Chamada com gravação
        fonte: editorial
  - id: reuniao-registro-wiki
    nome: Registro na base de conhecimento
    descricao: Ata publicada e pesquisável no wiki da equipe.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[busca_semantica|Busca semântica]]"
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
    justificativaFerramentas: "Muda Etapa da reunião para publicação e busca: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa em crescimento
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de atas arquivadas
        fonte: editorial
      - chave: Etapa da reunião
        valor: Publicação e busca
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Reuniões e atas
## 📝 Descrição
Preparar, conduzir e registrar reuniões com pauta, transcrição, ata e encaminhamentos.
## ⏰ Quando aplicar
- Reuniões recorrentes de equipe
- Entrevistas e reuniões com clientes
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
## ✅ Recomendações
- [[slack|Slack]] - Faixa custo-benefício em [[comunicacao_equipe|Comunicação de equipe]].
- [[otter_ai|Otter.ai]] - Faixa custo-benefício em [[reunioes_transcricao|Reuniões e transcrição]].
- [[notion|Notion]] - Faixa custo-benefício em [[wiki_base_conhecimento|Wiki e base de conhecimento]].
- [[microsoft_teams|Microsoft Teams]] - Faixa qualidade máxima em [[comunicacao_equipe|Comunicação de equipe]].
- [[granola|Granola]] - Faixa qualidade máxima em [[reunioes_transcricao|Reuniões e transcrição]].
## 🧬 Variações
- **Pauta e preparação** (`reuniao-pauta`): Pauta, contexto e perguntas antes da reunião. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Mais barata: [[libreoffice|LibreOffice]], Google Docs, [[obsidian|Obsidian (ferramenta)]]. Custo-benefício: [[notion|Notion]], Slite, Google Workspace. Qualidade máxima: [[claude|Claude AI]], Microsoft 365 Copilot, [[confluence|Confluence (ferramenta)]]. Por que difere do caso: Muda Etapa da reunião para antes da reunião: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de qualquer porte; Volume típico: Várias reuniões por semana; Etapa da reunião: Antes da reunião.
- **Transcrição em tempo real** (`reuniao-transcricao`): Texto da fala com identificação de participantes. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Time de qualquer porte; Volume típico: Dezenas de reuniões por mês; Etapa da reunião: Durante a reunião.
- **Ata e encaminhamentos** (`reuniao-ata-encaminhamentos`): Decisões, responsáveis e prazos extraídos. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Time de qualquer porte; Volume típico: Dezenas de atas por mês; Etapa da reunião: Depois da reunião.
- **Videoconferência** (`reuniao-videoconferencia`): Chamadas com gravação e compartilhamento de tela. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[mattermost|Mattermost]], Zulip, Rocket.Chat. Custo-benefício: [[slack|Slack]], Discord, Zoom Workplace. Qualidade máxima: [[microsoft_teams|Microsoft Teams]], Google Workspace, Cisco Webex. Por que difere do caso: Muda Etapa da reunião para chamada com gravação: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time distribuído; Volume típico: Reuniões diárias; Etapa da reunião: Chamada com gravação.
- **Registro na base de conhecimento** (`reuniao-registro-wiki`): Ata publicada e pesquisável no wiki da equipe. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[busca_semantica|Busca semântica]]. Mais barata: [[bookstack|BookStack]], Outline, Docmost. Custo-benefício: [[notion|Notion]], Slite, Coda. Qualidade máxima: [[confluence|Confluence (ferramenta)]], Guru, Microsoft SharePoint. Por que difere do caso: Muda Etapa da reunião para publicação e busca: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa em crescimento; Volume típico: Centenas de atas arquivadas; Etapa da reunião: Publicação e busca.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[whisper|Whisper]], Fathom (reuniões), tl;dv
- **Custo-benefício:** [[otter_ai|Otter.ai]], Fireflies.ai, Read AI
- **Qualidade máxima:** [[granola|Granola]], Avoma, Rev
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Reunião traz dados de clientes e de pessoas, então onde o áudio é processado decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[produtividade_e_trabalho|Produtividade e trabalho]]
