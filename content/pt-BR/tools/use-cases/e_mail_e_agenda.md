---
id: e_mail_e_agenda
tipo: caso-de-uso
nome: E-mail e agenda
aliases: []
descricao: Triar e-mails, responder, agendar e proteger tempo de foco.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[tool_use_funcionalidade|Tool use]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
categoriasRelacionadas:
  - "[[escrita_documentos|Escrita e documentos]]"
  - "[[assistente_chat|Assistente de chat]]"
  - "[[comunicacao_equipe|Comunicação de equipe]]"
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[email_transacional_marketing|E-mail transacional e marketing]]"
ferramentasRecomendadas:
  - "[[grammarly|Grammarly]]"
  - "[[notion|Notion]]"
  - "[[gemini|Gemini]]"
  - "[[grok|Grok]]"
  - "[[perplexity|Perplexity]]"
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
    - "[[deepseek|DeepSeek]]"
    - "[[qwen|Qwen]]"
    - "[[mistral|Mistral]]"
  custoBeneficio:
    - "[[gemini|Gemini]]"
    - "[[grok|Grok]]"
    - "[[perplexity|Perplexity]]"
  qualidadeMaxima:
    - "[[claude|Claude AI]]"
    - "[[chatgpt|ChatGPT]]"
    - tabela:microsoft-copilot
variacoes:
  - id: email-triagem
    nome: Triagem da caixa de entrada
    descricao: Prioridade, resumo e rótulos automáticos.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[gemma_4|Gemma 4]]"
      - "[[claude_haiku_5_5|Claude Haiku 5.5]]"
      - "[[qwen3_8_flash|Qwen3.8-Flash]]"
    custoBeneficio:
      - "[[gemini|Gemini]]"
      - tabela:google-workspace
      - "[[claude|Claude AI]]"
    qualidadeMaxima:
      - tabela:microsoft-365-copilot
      - "[[chatgpt|ChatGPT]]"
      - "[[mistral|Mistral]]"
    justificativaFerramentas: "Muda Tipo de rotina para prioridade e resumo: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Profissional com caixa cheia
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de mensagens por dia
        fonte: editorial
      - chave: Tipo de rotina
        valor: Prioridade e resumo
        fonte: editorial
  - id: email-respostas
    nome: Rascunhos de resposta
    descricao: Respostas no tom certo para revisar e enviar.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Profissional ou time de atendimento
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de respostas por dia
        fonte: editorial
      - chave: Tipo de rotina
        valor: Rascunho para revisar
        fonte: editorial
  - id: agenda-agendamento
    nome: Agendamento de compromissos
    descricao: Encontrar horários e confirmar sem troca de mensagens.
    funcionalidades:
      - "[[tool_use_funcionalidade|Tool use]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:google-workspace
      - "[[gemini|Gemini]]"
      - "[[mistral|Mistral]]"
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:microsoft-365-copilot
      - tabela:zoom
    qualidadeMaxima:
      - "[[claude|Claude AI]]"
      - tabela:webex
      - "[[chatgpt|ChatGPT]]"
    justificativaFerramentas: "Muda Tipo de rotina para marcação sem troca de mensagens: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Profissional autônomo ou time
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de compromissos por semana
        fonte: editorial
      - chave: Tipo de rotina
        valor: Marcação sem troca de mensagens
        fonte: editorial
  - id: email-automacao-regras
    nome: Regras e automações
    descricao: Encaminhar, arquivar e criar tarefas por regra.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
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
    justificativaFerramentas: "Muda Tipo de rotina para encaminhar e criar tarefas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Profissional técnico
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de regras ativas
        fonte: editorial
      - chave: Tipo de rotina
        valor: Encaminhar e criar tarefas
        fonte: editorial
  - id: email-campanhas
    nome: Envio em massa e campanhas
    descricao: Listas, modelos e métricas de entrega.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[amazon_ses|Amazon SES]]"
      - tabela:resend
      - tabela:listmonk
    custoBeneficio:
      - "[[postmark|Postmark]]"
      - tabela:brevo
      - tabela:mailersend
    qualidadeMaxima:
      - "[[twilio_sendgrid|Twilio SendGrid]]"
      - tabela:mailgun
      - tabela:customer-io
    justificativaFerramentas: "Muda Tipo de rotina para listas e métricas de entrega: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pequena e média empresa
        fonte: editorial
      - chave: Volume típico
        valor: Milhares de envios por campanha
        fonte: editorial
      - chave: Tipo de rotina
        valor: Listas e métricas de entrega
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# E-mail e agenda
## 📝 Descrição
Triar e-mails, responder, agendar e proteger tempo de foco.
## ⏰ Quando aplicar
- Caixa de entrada cheia
- Agenda com muitos compromissos
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[tool_use_funcionalidade|Tool use]] - Capacidade do modelo de chamar funções e ferramentas externas com argumentos estruturados.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
## ✅ Recomendações
- [[grammarly|Grammarly]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[notion|Notion]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[gemini|Gemini]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[grok|Grok]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[assistente_chat|Assistente de chat]].
## 🧬 Variações
- **Triagem da caixa de entrada** (`email-triagem`): Prioridade, resumo e rótulos automáticos. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[gemma_4|Gemma 4]], [[claude_haiku_5_5|Claude Haiku 5.5]], [[qwen3_8_flash|Qwen3.8-Flash]]. Custo-benefício: [[gemini|Gemini]], Google Workspace, [[claude|Claude AI]]. Qualidade máxima: Microsoft 365 Copilot, [[chatgpt|ChatGPT]], [[mistral|Mistral]]. Por que difere do caso: Muda Tipo de rotina para prioridade e resumo: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Profissional com caixa cheia; Volume típico: Centenas de mensagens por dia; Tipo de rotina: Prioridade e resumo.
- **Rascunhos de resposta** (`email-respostas`): Respostas no tom certo para revisar e enviar. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Profissional ou time de atendimento; Volume típico: Dezenas de respostas por dia; Tipo de rotina: Rascunho para revisar.
- **Agendamento de compromissos** (`agenda-agendamento`): Encontrar horários e confirmar sem troca de mensagens. Funcionalidades: [[tool_use_funcionalidade|Tool use]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Google Workspace, [[gemini|Gemini]], [[mistral|Mistral]]. Custo-benefício: [[notion|Notion]], Microsoft 365 Copilot, Zoom Workplace. Qualidade máxima: [[claude|Claude AI]], Cisco Webex, [[chatgpt|ChatGPT]]. Por que difere do caso: Muda Tipo de rotina para marcação sem troca de mensagens: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Profissional autônomo ou time; Volume típico: Dezenas de compromissos por semana; Tipo de rotina: Marcação sem troca de mensagens.
- **Regras e automações** (`email-automacao-regras`): Encaminhar, arquivar e criar tarefas por regra. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: Activepieces, Node-RED, Windmill. Custo-benefício: [[n8n|n8n]], Make, Pipedream. Qualidade máxima: Zapier, Power Automate, Workato. Por que difere do caso: Muda Tipo de rotina para encaminhar e criar tarefas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Profissional técnico; Volume típico: Dezenas de regras ativas; Tipo de rotina: Encaminhar e criar tarefas.
- **Envio em massa e campanhas** (`email-campanhas`): Listas, modelos e métricas de entrega. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[amazon_ses|Amazon SES]], Resend, listmonk. Custo-benefício: [[postmark|Postmark]], Brevo, MailerSend. Qualidade máxima: [[twilio_sendgrid|Twilio SendGrid]], Mailgun, Customer.io. Por que difere do caso: Muda Tipo de rotina para listas e métricas de entrega: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pequena e média empresa; Volume típico: Milhares de envios por campanha; Tipo de rotina: Listas e métricas de entrega.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[deepseek|DeepSeek]], [[qwen|Qwen]], [[mistral|Mistral]]
- **Custo-benefício:** [[gemini|Gemini]], [[grok|Grok]], [[perplexity|Perplexity]]
- **Qualidade máxima:** [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft Copilot
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. E-mail e agenda guardam conversas e dados de terceiros e pedem controle sobre o tratamento.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[produtividade_e_trabalho|Produtividade e trabalho]]
