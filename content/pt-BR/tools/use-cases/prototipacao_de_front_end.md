---
id: prototipacao_de_front_end
tipo: caso-de-uso
nome: Prototipação de front-end
aliases: []
descricao: Chegar a uma interface funcional rápido, do esboço ao deploy.
funcionalidadesNecessarias:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[deploy_gerenciado|Deploy gerenciado]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[multimodal|Multimodal]]"
categoriasRelacionadas:
  - "[[design_para_codigo|Design para código]]"
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[ui_componentes_web|UI e componentes web]]"
  - "[[paas_aplicacoes|PaaS de aplicações]]"
  - "[[baas_backend_pronto|BaaS e backend pronto]]"
ferramentasRecomendadas:
  - "[[v0|v0]]"
  - "[[react|React]]"
  - "[[tailwind_css|Tailwind CSS]]"
  - "[[render|Render]]"
  - "[[firebase|Firebase]]"
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
  - desenvolvimento-software
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
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
  - id: proto-gerador-ui
    nome: Gerador de interface
    descricao: Tela funcional a partir de descrição ou imagem.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[multimodal|Multimodal]]"
    herdaFerramentas: true
    parametros:
      - chave: Linguagem ou runtime
        valor: TypeScript com React gerado
        fonte: editorial
      - chave: Ambiente de execução
        valor: Navegador e ambiente de prévia
        fonte: editorial
      - chave: Escala típica
        valor: Protótipo de uma tela
        fonte: editorial
  - id: proto-framework-web
    nome: Aplicação com framework
    descricao: Componentes, rotas e estado reais.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[svelte|Svelte]]"
      - tabela:solidjs
      - tabela:astro
    custoBeneficio:
      - "[[react|React]]"
      - "[[vue|Vue.js]]"
      - "[[nextjs|Next.js]]"
    qualidadeMaxima:
      - "[[angular|Angular]]"
      - tabela:nuxt
      - tabela:sveltekit
    justificativaFerramentas: "Muda Escala típica para protótipo com várias rotas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: TypeScript com framework web
        fonte: editorial
      - chave: Ambiente de execução
        valor: Máquina local com servidor de desenvolvimento
        fonte: editorial
      - chave: Escala típica
        valor: Protótipo com várias rotas
        fonte: editorial
  - id: proto-componentes
    nome: Biblioteca de componentes
    descricao: Interface consistente com pouco CSS.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[shadcn_ui|shadcn-ui]]"
      - tabela:daisyui
      - tabela:headless-ui
    custoBeneficio:
      - "[[tailwind_css|Tailwind CSS]]"
      - tabela:radix-ui
      - tabela:mantine
    qualidadeMaxima:
      - "[[mui|MUI]]"
      - tabela:ant-design
      - tabela:chakra-ui
    justificativaFerramentas: "Muda Escala típica para dezenas de componentes reutilizáveis: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: TypeScript com React e CSS utilitário
        fonte: editorial
      - chave: Ambiente de execução
        valor: Navegador
        fonte: editorial
      - chave: Escala típica
        valor: Dezenas de componentes reutilizáveis
        fonte: editorial
  - id: proto-deploy-rapido
    nome: Publicação rápida
    descricao: URL pública para teste com usuários.
    funcionalidades:
      - "[[deploy_gerenciado|Deploy gerenciado]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[coolify|Coolify]]"
      - tabela:dokku
      - tabela:caprover
    custoBeneficio:
      - "[[render|Render]]"
      - tabela:railway
      - tabela:flyio
    qualidadeMaxima:
      - "[[vercel|Vercel]]"
      - tabela:heroku
      - tabela:platform-sh
    justificativaFerramentas: "Muda Escala típica para teste com poucos usuários: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: Qualquer linguagem suportada pela plataforma
        fonte: editorial
      - chave: Ambiente de execução
        valor: Plataforma gerenciada com URL pública
        fonte: editorial
      - chave: Escala típica
        valor: Teste com poucos usuários
        fonte: editorial
  - id: proto-backend-pronto
    nome: Backend pronto
    descricao: Autenticação e banco sem servidor próprio.
    funcionalidades:
      - "[[deploy_gerenciado|Deploy gerenciado]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pocketbase|PocketBase]]"
      - tabela:appwrite
      - tabela:nhost
    custoBeneficio:
      - "[[firebase|Firebase]]"
      - tabela:supabase-repo
      - tabela:convex
    qualidadeMaxima:
      - "[[aws_amplify|AWS Amplify]]"
      - tabela:hasura-cloud
      - tabela:xano
    justificativaFerramentas: "Muda Escala típica para protótipo com dados reais: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Linguagem ou runtime
        valor: JavaScript ou SDK mobile no cliente
        fonte: editorial
      - chave: Ambiente de execução
        valor: Backend gerenciado com autenticação e banco
        fonte: editorial
      - chave: Escala típica
        valor: Protótipo com dados reais
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Prototipação de front-end
## 📝 Descrição
Chegar a uma interface funcional rápido, do esboço ao deploy.
## ⏰ Quando aplicar
- Ideia a validar em dias
- Landing page e MVP
## 🧩 Funcionalidades necessárias
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[deploy_gerenciado|Deploy gerenciado]] - Hospedagem de modelos e agentes em serviço gerenciado, com escala e monitoramento.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[multimodal|Multimodal]] - Entendimento de mais de um tipo de entrada, como texto, imagem, áudio, vídeo e PDF.
## ✅ Recomendações
- [[v0|v0]] - Faixa custo-benefício em [[design_para_codigo|Design para código]].
- [[react|React]] - Faixa custo-benefício em [[frameworks_frontend_web|Frameworks de frontend web]].
- [[tailwind_css|Tailwind CSS]] - Faixa custo-benefício em [[ui_componentes_web|UI e componentes web]].
- [[render|Render]] - Faixa custo-benefício em [[paas_aplicacoes|PaaS de aplicações]].
- [[firebase|Firebase]] - Faixa custo-benefício em [[baas_backend_pronto|BaaS e backend pronto]].
## 🧬 Variações
- **Gerador de interface** (`proto-gerador-ui`): Tela funcional a partir de descrição ou imagem. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[multimodal|Multimodal]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Linguagem ou runtime: TypeScript com React gerado; Ambiente de execução: Navegador e ambiente de prévia; Escala típica: Protótipo de uma tela.
- **Aplicação com framework** (`proto-framework-web`): Componentes, rotas e estado reais. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[svelte|Svelte]], SolidJS, Astro. Custo-benefício: [[react|React]], Vue.js, Next.js. Qualidade máxima: [[angular|Angular]], Nuxt, SvelteKit. Por que difere do caso: Muda Escala típica para protótipo com várias rotas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: TypeScript com framework web; Ambiente de execução: Máquina local com servidor de desenvolvimento; Escala típica: Protótipo com várias rotas.
- **Biblioteca de componentes** (`proto-componentes`): Interface consistente com pouco CSS. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[shadcn_ui|shadcn-ui]], daisyUI, Headless UI. Custo-benefício: [[tailwind_css|Tailwind CSS]], Radix UI, Mantine. Qualidade máxima: [[mui|MUI]], Ant Design, Chakra UI. Por que difere do caso: Muda Escala típica para dezenas de componentes reutilizáveis: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: TypeScript com React e CSS utilitário; Ambiente de execução: Navegador; Escala típica: Dezenas de componentes reutilizáveis.
- **Publicação rápida** (`proto-deploy-rapido`): URL pública para teste com usuários. Funcionalidades: [[deploy_gerenciado|Deploy gerenciado]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[coolify|Coolify]], Dokku, CapRover. Custo-benefício: [[render|Render]], Railway, Fly.io. Qualidade máxima: [[vercel|Vercel]], Heroku, Platform.sh. Por que difere do caso: Muda Escala típica para teste com poucos usuários: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: Qualquer linguagem suportada pela plataforma; Ambiente de execução: Plataforma gerenciada com URL pública; Escala típica: Teste com poucos usuários.
- **Backend pronto** (`proto-backend-pronto`): Autenticação e banco sem servidor próprio. Funcionalidades: [[deploy_gerenciado|Deploy gerenciado]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[pocketbase|PocketBase]], Appwrite, Nhost. Custo-benefício: [[firebase|Firebase]], Supabase, Convex. Qualidade máxima: [[aws_amplify|AWS Amplify]], Hasura Cloud, Xano. Por que difere do caso: Muda Escala típica para protótipo com dados reais: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Linguagem ou runtime: JavaScript ou SDK mobile no cliente; Ambiente de execução: Backend gerenciado com autenticação e banco; Escala típica: Protótipo com dados reais.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[penpot|Penpot]], Onlook, Storybook
- **Custo-benefício:** [[v0|v0]], Lovable, Bolt
- **Qualidade máxima:** [[figma|Figma]], Framer, Builder.io
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Protótipo é descartável e o custo por iteração decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
