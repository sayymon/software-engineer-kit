---
id: agencia_e_freelancer_pequena_empresa
tipo: caso-de-uso
nome: Agência e freelancer (pequena empresa)
aliases:
  - agencia-e-freelancer-pequena-empresa
descricao: Entregar projetos de design e sites para clientes com gestão de tarefas, contratos e produção visual eficientes.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[gestao_projetos|Gestão de projetos]]"
  - "[[design_para_codigo|Design para código]]"
  - "[[cms|CMS]]"
  - "[[edicao_imagem|Edição de imagem]]"
  - "[[assinatura_eletronica|Assinatura eletrônica]]"
ferramentasRecomendadas:
  - "[[plane|Plane]]"
  - "[[figma|Figma]]"
  - "[[webflow|Webflow]]"
  - "[[canva|Canva]]"
  - "[[docuseal|DocuSeal]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pequena
segmentos:
  - marketing-agencias
nicho: agências, estúdios e freelancers
nivel: caso
eixo: cenario
macro: "[[negocios_por_porte_e_segmento|Negócios por porte e segmento]]"
faixasPadrao:
  maisBarata:
    - "[[penpot|Penpot]]"
    - tabela:onlook
    - tabela:storybook
  custoBeneficio:
    - "[[v0|v0]]"
    - tabela:lovable
    - tabela:bolt
  qualidadeMaxima:
    - "[[figma|Figma]]"
    - tabela:framer
    - tabela:builder-io
variacoes:
  - id: agencia-design-entrega
    nome: Design e entrega ao cliente
    descricao: Protótipo, edição de imagem e site para clientes.
    funcionalidades:
      - "[[geracao_de_imagem|Geração de imagem]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Agência pequena ou freelancer
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de entregas de design por mês
        fonte: editorial
  - id: agencia-projetos-contratos
    nome: Projetos e contratos
    descricao: Gestão de entregas e assinatura de propostas.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
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
    justificativaFerramentas: "Muda Volume típico para dezenas de contratos por ano: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Agência pequena ou freelancer
        fonte: editorial
      - chave: Regulação aplicável
        valor: Código Civil e Lei 14.063/2020 sobre assinaturas eletrônicas
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de contratos por ano
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Agência e freelancer (pequena empresa)
## 📝 Descrição
Entregar projetos de design e sites para clientes com gestão de tarefas, contratos e produção visual eficientes.
## ⏰ Quando aplicar
- Gerir vários clientes em paralelo
- Entregar site e identidade visual
## 🧱 Pilha por categoria
- [[gestao_projetos|Gestão de projetos]] - tarefas e prazos por cliente
- [[design_para_codigo|Design para código]] - do protótipo ao site
- [[cms|CMS]] - sites entregues ao cliente
- [[edicao_imagem|Edição de imagem]] - peças e retoques
- [[assinatura_eletronica|Assinatura eletrônica]] - contratos e aprovações
## ✅ Recomendações
- [[plane|Plane]] - gestão de projetos open source
- [[figma|Figma]] - padrão de mercado para design colaborativo
- [[webflow|Webflow]] - sites visuais com CMS embutido
- [[canva|Canva]] - peças rápidas para redes sociais
- [[docuseal|DocuSeal]] - contratos assinados sem custo de licença por usuário
## 🧬 Variações
- **Design e entrega ao cliente** (`agencia-design-entrega`): Protótipo, edição de imagem e site para clientes. Funcionalidades: [[geracao_de_imagem|Geração de imagem]], [[geracao_de_codigo|Geração de código]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Agência pequena ou freelancer; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de entregas de design por mês.
- **Projetos e contratos** (`agencia-projetos-contratos`): Gestão de entregas e assinatura de propostas. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[plane|Plane]], Taiga, OpenProject. Custo-benefício: [[linear|Linear]], ClickUp, Trello. Qualidade máxima: [[jira|Jira (ferramenta)]], Asana, monday.com. Por que difere do caso: Muda Volume típico para dezenas de contratos por ano: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Agência pequena ou freelancer; Regulação aplicável: Código Civil e Lei 14.063/2020 sobre assinaturas eletrônicas (não verificado); Volume típico: Dezenas de contratos por ano.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[penpot|Penpot]], Onlook, Storybook
- **Custo-benefício:** [[v0|v0]], Lovable, Bolt
- **Qualidade máxima:** [[figma|Figma]], Framer, Builder.io
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Agências pequenas têm margem curta e várias contas de cliente, então a ferramenta barata e flexível vence.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pequena empresa
- **Macro:** [[negocios_por_porte_e_segmento|Negócios por porte e segmento]]
