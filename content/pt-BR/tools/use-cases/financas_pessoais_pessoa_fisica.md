---
id: financas_pessoais_pessoa_fisica
tipo: caso-de-uso
nome: Finanças pessoais (pessoa física)
aliases:
  - financas-pessoais-pessoa-fisica
descricao: Controlar receitas, despesas e metas financeiras com planilhas, bancos de dados simples e apoio de IA, mantendo os dados sob controle.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[planilhas_analise_dados|Planilhas e análise de dados]]"
  - "[[formularios_bancos_no_code|Formulários e bancos no-code]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[assistente_chat|Assistente de chat]]"
ferramentasRecomendadas:
  - "[[microsoft_excel|Microsoft Excel]]"
  - "[[nocodb|NocoDB]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[chatgpt|ChatGPT]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
segmentos:
  - geral
nicho: organização financeira pessoal
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
faixasPadrao:
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
variacoes:
  - id: fin-pessoais-planilha
    nome: Controle em planilha
    descricao: Orçamento mensal e metas com fórmulas e gráficos.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de lançamentos por mês
        fonte: editorial
  - id: fin-pessoais-banco-no-code
    nome: Banco de dados pessoal no-code
    descricao: Lançamentos e recibos em tabela com formulário.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[nocodb|NocoDB]]"
      - tabela:baserow
      - tabela:formbricks
    custoBeneficio:
      - "[[airtable|Airtable]]"
      - tabela:tally
      - tabela:typeform
    qualidadeMaxima:
      - "[[retool|Retool]]"
      - tabela:microsoft-power-apps
      - tabela:outsystems
    justificativaFerramentas: "Muda Volume típico para dezenas de contas e categorias: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de contas e categorias
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Finanças pessoais (pessoa física)
## 📝 Descrição
Controlar receitas, despesas e metas financeiras com planilhas, bancos de dados simples e apoio de IA, mantendo os dados sob controle.
## ⏰ Quando aplicar
- Controle mensal de gastos e metas
- Declaração de imposto e organização de comprovantes
## 🧱 Pilha por categoria
- [[planilhas_analise_dados|Planilhas e análise de dados]] - registro e análise dos lançamentos
- [[formularios_bancos_no_code|Formulários e bancos no-code]] - base própria com visões e formulários
- [[senhas_segredos|Gerenciador de senhas e segredos]] - proteção das credenciais bancárias
- [[assistente_chat|Assistente de chat]] - explicar relatórios e simular cenários
## ✅ Recomendações
- [[microsoft_excel|Microsoft Excel]] - planilha de referência para orçamento e fórmulas
- [[nocodb|NocoDB]] - banco no-code self-hosted, sem custo de licença
- [[bitwarden|Bitwarden]] - cofre de senhas com plano gratuito
- [[chatgpt|ChatGPT]] - apoio para simular cenários e entender extratos
## 🧬 Variações
- **Controle em planilha** (`fin-pessoais-planilha`): Orçamento mensal e metas com fórmulas e gráficos. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa física; Regulação aplicável: Nenhuma específica; Volume típico: Centenas de lançamentos por mês.
- **Banco de dados pessoal no-code** (`fin-pessoais-banco-no-code`): Lançamentos e recibos em tabela com formulário. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[nocodb|NocoDB]], Baserow, Formbricks. Custo-benefício: [[airtable|Airtable]], Tally, Typeform. Qualidade máxima: [[retool|Retool]], Microsoft Power Apps, OutSystems. Por que difere do caso: Muda Volume típico para dezenas de contas e categorias: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pessoa física; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de contas e categorias.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[libreoffice|LibreOffice]], Google Sheets, [[google_colab|Google Colab (ferramenta)]]
- **Custo-benefício:** [[microsoft_excel|Microsoft Excel]], Julius AI, [[airtable|Airtable]]
- **Qualidade máxima:** [[chatgpt|ChatGPT]], [[claude|Claude AI]], Hex
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. Extratos e senhas bancárias são dados sensíveis, e a ferramenta que os processa decide a escolha.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
