---
id: educacao_e_edtech_media_empresa
tipo: caso-de-uso
nome: Educação e EdTech (média empresa)
aliases:
  - educacao-e-edtech-media-empresa
descricao: Construir produto educacional com aplicativo móvel, backend pronto, métricas de aprendizagem e atendimento a alunos.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[frameworks_mobile|Frameworks de mobile]]"
  - "[[baas_backend_pronto|BaaS e backend pronto]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[suporte_atendimento|Suporte e atendimento]]"
  - "[[estudo_base_conhecimento|Estudo e base de conhecimento]]"
ferramentasRecomendadas:
  - "[[flutter|Flutter]]"
  - "[[firebase|Firebase]]"
  - "[[posthog|PostHog]]"
  - "[[chatwoot|Chatwoot]]"
  - "[[notebooklm|NotebookLM]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - media
segmentos:
  - educacao
nicho: plataformas educacionais e redes de ensino
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[capacitor|Capacitor]]"
    - tabela:expo
    - tabela:nativescript
  custoBeneficio:
    - "[[flutter|Flutter]]"
    - tabela:react-native
    - "[[swiftui|SwiftUI]]"
  qualidadeMaxima:
    - "[[kotlin_multiplatform|Kotlin Multiplatform]]"
    - tabela:jetpack-compose
    - "[[dotnet_maui|dotNET MAUI]]"
variacoes:
  - id: edtech-app-aluno
    nome: Aplicativo do aluno
    descricao: Aplicativo móvel com backend pronto e métricas de uso.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Escola ou EdTech de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados de menores de idade
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de alunos ativos
        fonte: editorial
  - id: edtech-suporte-conhecimento
    nome: Suporte e base de conhecimento
    descricao: Atendimento ao aluno com FAQ e assistente de estudo.
    funcionalidades:
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: false
    maisBarata:
      - "[[chatwoot|Chatwoot]]"
      - tabela:zammad
      - tabela:freescout
    custoBeneficio:
      - "[[freshdesk|Freshdesk]]"
      - tabela:help-scout
      - tabela:crisp
    qualidadeMaxima:
      - "[[zendesk|Zendesk]]"
      - tabela:intercom
      - tabela:servicenow
    justificativaFerramentas: "Muda Volume típico para milhares de chamados por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Escola ou EdTech de médio porte
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e Código de Defesa do Consumidor
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de chamados por mês
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Educação e EdTech (média empresa)
## 📝 Descrição
Construir produto educacional com aplicativo móvel, backend pronto, métricas de aprendizagem e atendimento a alunos.
## ⏰ Quando aplicar
- Lançar aplicativo para alunos
- Medir engajamento e evasão
## 🧱 Pilha por categoria
- [[frameworks_mobile|Frameworks de mobile]] - aplicativo para Android e iOS
- [[baas_backend_pronto|BaaS e backend pronto]] - autenticação e dados prontos
- [[analytics_produto_web|Analytics de produto e web]] - engajamento dos alunos
- [[suporte_atendimento|Suporte e atendimento]] - atendimento aos alunos
- [[estudo_base_conhecimento|Estudo e base de conhecimento]] - apoio de IA ao estudo
## ✅ Recomendações
- [[flutter|Flutter]] - um só código para Android e iOS
- [[firebase|Firebase]] - backend pronto para começar rápido
- [[posthog|PostHog]] - analytics de produto com funis e experimentos
- [[chatwoot|Chatwoot]] - atendimento a alunos e responsáveis
- [[notebooklm|NotebookLM]] - resumos e perguntas sobre material didático
## 🧬 Variações
- **Aplicativo do aluno** (`edtech-app-aluno`): Aplicativo móvel com backend pronto e métricas de uso. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Escola ou EdTech de médio porte; Regulação aplicável: LGPD para dados de menores de idade (não verificado); Volume típico: Milhares de alunos ativos.
- **Suporte e base de conhecimento** (`edtech-suporte-conhecimento`): Atendimento ao aluno com FAQ e assistente de estudo. Funcionalidades: [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]], [[busca_semantica|Busca semântica]]. Mais barata: [[chatwoot|Chatwoot]], Zammad, FreeScout. Custo-benefício: [[freshdesk|Freshdesk]], Help Scout, Crisp. Qualidade máxima: [[zendesk|Zendesk]], Intercom, ServiceNow. Por que difere do caso: Muda Volume típico para milhares de chamados por mês: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Escola ou EdTech de médio porte; Regulação aplicável: LGPD e Código de Defesa do Consumidor (não verificado); Volume típico: Milhares de chamados por mês.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[capacitor|Capacitor]], Expo, NativeScript
- **Custo-benefício:** [[flutter|Flutter]], React Native, [[swiftui|SwiftUI]]
- **Qualidade máxima:** [[kotlin_multiplatform|Kotlin Multiplatform]], Jetpack Compose, dotNET MAUI
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Instituições medem o custo por aluno, e ferramentas com camada gratuita ou preço por uso se encaixam melhor.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** média empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
