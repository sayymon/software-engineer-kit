---
id: rh_e_recrutamento
tipo: caso-de-uso
nome: RH e recrutamento
aliases: []
descricao: Recrutar, integrar e administrar pessoas com triagem e folha.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
categoriasRelacionadas:
  - "[[rh_folha|RH e folha]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
  - "[[wiki_base_conhecimento|Wiki e base de conhecimento]]"
  - "[[comunicacao_equipe|Comunicação de equipe]]"
ferramentasRecomendadas:
  - "[[gusto|Gusto]]"
  - "[[otter_ai|Otter.ai]]"
  - "[[notion|Notion]]"
  - "[[slack|Slack]]"
  - "[[workday_hcm|Workday HCM]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pequena
  - media
  - grande
segmentos:
  - servicos-profissionais
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[negocio_e_operacao|Negócio e operação]]"
faixasPadrao:
  maisBarata:
    - "[[orangehrm|OrangeHRM]]"
    - tabela:frappe-hr
    - tabela:jorani
  custoBeneficio:
    - "[[gusto|Gusto]]"
    - tabela:factorial
    - tabela:deel
  qualidadeMaxima:
    - "[[workday_hcm|Workday HCM]]"
    - tabela:sap-successfactors
    - tabela:adp
variacoes:
  - id: rh-triagem-curriculos
    nome: Triagem de currículos
    descricao: Resumo e aderência à vaga com revisão humana.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Empresa em crescimento
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e legislação antidiscriminatória
        fonte: não verificado
      - chave: Volume típico
        valor: Centenas de currículos por vaga
        fonte: editorial
  - id: rh-entrevistas-transcricao
    nome: Entrevistas e transcrição
    descricao: Registro e síntese de entrevistas.
    funcionalidades:
      - "[[transcricao_de_audio|Transcrição de áudio]]"
      - "[[geracao_de_texto|Geração de texto]]"
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
    justificativaFerramentas: "Muda Volume típico para dezenas de entrevistas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de recrutamento
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para gravações
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de entrevistas por semana
        fonte: editorial
  - id: rh-folha-ponto
    nome: Folha e ponto
    descricao: Cálculo, benefícios e obrigações.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pequena e média empresa
        fonte: editorial
      - chave: Regulação aplicável
        valor: CLT e obrigações trabalhistas
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas a centenas de colaboradores
        fonte: editorial
  - id: rh-onboarding
    nome: Integração de novos colaboradores
    descricao: Trilhas e documentos de entrada.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
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
    justificativaFerramentas: "Muda Volume típico para dezenas de admissões por trimestre: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa com muitas admissões
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de admissões por trimestre
        fonte: editorial
  - id: rh-comunicacao-interna
    nome: Comunicação interna
    descricao: Comunicados e canais de equipe.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
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
    justificativaFerramentas: "Muda Volume típico para centenas de mensagens por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Empresa de qualquer porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de mensagens por dia
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# RH e recrutamento
## 📝 Descrição
Recrutar, integrar e administrar pessoas com triagem e folha.
## ⏰ Quando aplicar
- Contratação em volume
- Gestão de pessoas em PME
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[human_in_the_loop_funcionalidade|Human in the loop]] - Pontos de aprovação ou correção humana dentro de um fluxo automatizado.
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
## ✅ Recomendações
- [[gusto|Gusto]] - Faixa custo-benefício em [[rh_folha|RH e folha]].
- [[otter_ai|Otter.ai]] - Faixa custo-benefício em [[reunioes_transcricao|Reuniões e transcrição]].
- [[notion|Notion]] - Faixa custo-benefício em [[wiki_base_conhecimento|Wiki e base de conhecimento]].
- [[slack|Slack]] - Faixa custo-benefício em [[comunicacao_equipe|Comunicação de equipe]].
- [[workday_hcm|Workday HCM]] - Faixa qualidade máxima em [[rh_folha|RH e folha]].
## 🧬 Variações
- **Triagem de currículos** (`rh-triagem-curriculos`): Resumo e aderência à vaga com revisão humana. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Empresa em crescimento; Regulação aplicável: LGPD e legislação antidiscriminatória (não verificado); Volume típico: Centenas de currículos por vaga.
- **Entrevistas e transcrição** (`rh-entrevistas-transcricao`): Registro e síntese de entrevistas. Funcionalidades: [[transcricao_de_audio|Transcrição de áudio]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[whisper|Whisper]], Fathom (reuniões), tl;dv. Custo-benefício: [[otter_ai|Otter.ai]], Fireflies.ai, Read AI. Qualidade máxima: [[granola|Granola]], Avoma, Rev. Por que difere do caso: Muda Volume típico para dezenas de entrevistas por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de recrutamento; Regulação aplicável: LGPD para gravações (não verificado); Volume típico: Dezenas de entrevistas por semana.
- **Folha e ponto** (`rh-folha-ponto`): Cálculo, benefícios e obrigações. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pequena e média empresa; Regulação aplicável: CLT e obrigações trabalhistas (não verificado); Volume típico: Dezenas a centenas de colaboradores.
- **Integração de novos colaboradores** (`rh-onboarding`): Trilhas e documentos de entrada. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[bookstack|BookStack]], Outline, Docmost. Custo-benefício: [[notion|Notion]], Slite, Coda. Qualidade máxima: [[confluence|Confluence (ferramenta)]], Guru, Microsoft SharePoint. Por que difere do caso: Muda Volume típico para dezenas de admissões por trimestre: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa com muitas admissões; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de admissões por trimestre.
- **Comunicação interna** (`rh-comunicacao-interna`): Comunicados e canais de equipe. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[mattermost|Mattermost]], Zulip, Rocket.Chat. Custo-benefício: [[slack|Slack]], Discord, Zoom Workplace. Qualidade máxima: [[microsoft_teams|Microsoft Teams]], Google Workspace, Cisco Webex. Por que difere do caso: Muda Volume típico para centenas de mensagens por dia: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Empresa de qualquer porte; Regulação aplicável: Nenhuma específica; Volume típico: Centenas de mensagens por dia.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[orangehrm|OrangeHRM]], Frappe HR, Jorani
- **Custo-benefício:** [[gusto|Gusto]], Factorial, Deel
- **Qualidade máxima:** [[workday_hcm|Workday HCM]], SAP SuccessFactors, ADP
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados de candidatos e funcionários são pessoais e a LGPD pede cuidado no tratamento.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[negocio_e_operacao|Negócio e operação]]
