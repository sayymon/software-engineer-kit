---
id: clinica_e_consultorio_pequena_empresa
tipo: caso-de-uso
nome: Clínica e consultório (pequena empresa)
aliases:
  - clinica-e-consultorio-pequena-empresa
descricao: Organizar agenda, prontuário, termos assinados e atendimento de pacientes protegendo dados sensíveis conforme a LGPD.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[assinatura_eletronica|Assinatura eletrônica]]"
  - "[[crm|CRM]]"
  - "[[suporte_atendimento|Suporte e atendimento]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[inferencia_local|Inferência local]]"
ferramentasRecomendadas:
  - "[[zapsign|ZapSign]]"
  - "[[twenty|Twenty]]"
  - "[[chatwoot|Chatwoot]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[whisper|Whisper]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pequena
segmentos:
  - saude
nicho: clínicas, consultórios e profissionais de saúde
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[twenty|Twenty]]"
    - tabela:suitecrm
    - tabela:espocrm
  custoBeneficio:
    - "[[hubspot_crm|HubSpot CRM]]"
    - tabela:pipedrive
    - tabela:rd-station-crm
  qualidadeMaxima:
    - "[[salesforce_sales_cloud|Salesforce Sales Cloud]]"
    - tabela:dynamics-365-sales
    - tabela:sap-sales-cloud
variacoes:
  - id: clinica-atendimento-pacientes
    nome: Atendimento e agenda de pacientes
    descricao: Contato, CRM e suporte por chat.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Clínica ou consultório pequeno
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de saúde
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de pacientes por dia
        fonte: editorial
  - id: clinica-documentos-assinatura
    nome: Prontuário e termos assinados
    descricao: Documentos assinados e dados protegidos.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[docuseal|DocuSeal]]"
      - tabela:documenso
      - tabela:opensign
    custoBeneficio:
      - "[[zapsign|ZapSign]]"
      - tabela:d4sign
      - tabela:autentique
    qualidadeMaxima:
      - "[[docusign|DocuSign]]"
      - tabela:adobe-sign
      - tabela:clicksign
    justificativaFerramentas: "Muda Volume típico para dezenas de termos assinados por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Clínica ou consultório pequeno
        fonte: editorial
      - chave: Regulação aplicável
        valor: Resolução do CFM sobre prontuário e LGPD
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de termos assinados por semana
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Clínica e consultório (pequena empresa)
## 📝 Descrição
Organizar agenda, prontuário, termos assinados e atendimento de pacientes protegendo dados sensíveis conforme a LGPD.
## ⏰ Quando aplicar
- Colher consentimento e termos digitais
- Transcrever consultas sem enviar dados a terceiros
## 🧱 Pilha por categoria
- [[assinatura_eletronica|Assinatura eletrônica]] - termos e consentimentos
- [[crm|CRM]] - cadastro e relacionamento com pacientes
- [[suporte_atendimento|Suporte e atendimento]] - confirmação e dúvidas por mensagem
- [[senhas_segredos|Gerenciador de senhas e segredos]] - acesso seguro aos sistemas
- [[inferencia_local|Inferência local]] - processar áudio e texto sem sair da máquina
## ✅ Recomendações
- [[zapsign|ZapSign]] - termos de consentimento assinados online
- [[twenty|Twenty]] - cadastro de pacientes em CRM open source
- [[chatwoot|Chatwoot]] - atendimento e lembretes de consulta
- [[bitwarden|Bitwarden]] - cofre para acessos da equipe
- [[whisper|Whisper]] - transcrição local de áudio
## 🧬 Variações
- **Atendimento e agenda de pacientes** (`clinica-atendimento-pacientes`): Contato, CRM e suporte por chat. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Clínica ou consultório pequeno; Regulação aplicável: LGPD para dados de saúde (não verificado); Volume típico: Dezenas de pacientes por dia.
- **Prontuário e termos assinados** (`clinica-documentos-assinatura`): Documentos assinados e dados protegidos. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[docuseal|DocuSeal]], Documenso, OpenSign. Custo-benefício: [[zapsign|ZapSign]], D4Sign, Autentique. Qualidade máxima: [[docusign|DocuSign]], Adobe Acrobat Sign, Clicksign. Por que difere do caso: Muda Volume típico para dezenas de termos assinados por semana: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Clínica ou consultório pequeno; Regulação aplicável: Resolução do CFM sobre prontuário e LGPD (não verificado); Volume típico: Dezenas de termos assinados por semana.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[twenty|Twenty]], SuiteCRM, EspoCRM
- **Custo-benefício:** [[hubspot_crm|HubSpot CRM]], Pipedrive, RD Station CRM
- **Qualidade máxima:** [[salesforce_sales_cloud|Salesforce Sales Cloud]], Dynamics 365 Sales, SAP Sales Cloud
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Dados de pacientes são sensíveis pela LGPD, e o processamento local ou controlado decide a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
