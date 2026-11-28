---
id: configurar_node_typescript
tipo: guia-pratico
nome: Como configurar a stack Node.js e TypeScript
sigla: nod
descricao: "Caminho para montar a base de um projeto JavaScript e TypeScript: escolher o gerenciador de pacotes, instalar o Node.js na versão de suporte longo, iniciar o projeto com TypeScript, configurar testes com Vitest, lint com ESLint e formatação, e automatizar tudo em integração contínua com dependências travadas."
exemplo: "Um time cria um serviço TypeScript: escolhe pnpm, instala o Node.js em LTS, inicia o projeto com tsc, adiciona Vitest e ESLint e confirma em um clone limpo que instalar, testar e lintar funcionam com um comando cada."
quando_usar:
  - Um projeto JavaScript ou TypeScript novo precisa de uma base reproduzível com tipos, testes e lint.
  - Um projeto antigo vai receber TypeScript, testes e lint de forma incremental e precisa de uma configuração de referência.
quando_evitar:
  - "Quando o projeto já tem a base e falta apenas uma regra de lint: ajuste o arquivo de configuração existente."
fonte_ids:
  - nodejs_download
  - pnpm_installation
  - typescript_download
  - vitest_guide
  - eslint_getting_started
fontes:
  - id: nodejs_download
    tipo: artigo
    titulo: Download Node.js (nodejs.org)
    link: https://nodejs.org/en/download
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: pnpm_installation
    tipo: artigo
    titulo: Installation (pnpm Docs)
    link: https://pnpm.io/installation
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: typescript_download
    tipo: artigo
    titulo: How to set up TypeScript (typescriptlang.org)
    link: https://www.typescriptlang.org/download/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: vitest_guide
    tipo: artigo
    titulo: Getting Started (Vitest Docs)
    link: https://vitest.dev/guide/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: eslint_getting_started
    tipo: artigo
    titulo: Getting Started with ESLint (ESLint Docs)
    link: https://eslint.org/docs/latest/use/getting-started
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: nod_orq
    nome: Orquestração da stack Node.js e TypeScript
    responsabilidade: Encadear contexto, escolha do gerenciador e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: nod_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: nod_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: nod_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: nod_orq_s0
    raia: nod_orq
    tipo: inicio
    rotulo: Necessidade de uma base Node.js e TypeScript
    proximo:
      - para: nod_orq_c1
        condicao: ""
  - id: nod_orq_c1
    raia: nod_orq
    tipo: chamada
    rotulo: Definir tipo de projeto e estrutura do repositório
    proximo:
      - para: nod_orq_c2
        condicao: projeto_definido
    raia_chamada: nod_ctx
  - id: nod_orq_c2
    raia: nod_orq
    tipo: chamada
    rotulo: Escolher gerenciador de pacotes e runtime
    proximo:
      - para: nod_orq_c3
        condicao: pnpm_workspaces
      - para: nod_orq_c4
        condicao: bun_runtime
      - para: nod_orq_c5
        condicao: npm_minimo
      - para: nod_orq_c6
        condicao: pnpm_projeto_unico
    raia_chamada: nod_stk
  - id: nod_orq_c3
    raia: nod_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e automatizar
    proximo:
      - para: nod_orq_e1
        condicao: pronta
    raia_chamada: nod_ent
  - id: nod_orq_c4
    raia: nod_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e automatizar
    proximo:
      - para: nod_orq_e2
        condicao: pronta
    raia_chamada: nod_ent
  - id: nod_orq_c5
    raia: nod_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e automatizar
    proximo:
      - para: nod_orq_e3
        condicao: pronta
    raia_chamada: nod_ent
  - id: nod_orq_c6
    raia: nod_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e automatizar
    proximo:
      - para: nod_orq_e4
        condicao: pronta
    raia_chamada: nod_ent
  - id: nod_orq_e1
    raia: nod_orq
    tipo: fim
    rotulo: Monorepo com pnpm workspaces configurado
    proximo: []
    retorno: pnpm_workspaces
    saida:
      tipo: stack
      justificativa: Vários pacotes que compartilham dependências e scripts ganham com workspaces do pnpm, que deduplica dependências e executa tarefas por pacote na mesma estrutura.
      eixos:
        - escala_volume
        - time_maturidade
        - prazo_entrega
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 4
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - id: nod_orq_e2
    raia: nod_orq
    tipo: fim
    rotulo: Bun configurado como runtime e gerenciador
    proximo: []
    retorno: bun_runtime
    saida:
      tipo: construir
      justificativa: Um runtime único com executor, gerenciador de pacotes e testes reduz o número de peças e acelera o arranque, e serve a equipes que priorizam simplicidade de ferramentas.
      eixos:
        - latencia
        - time_maturidade
        - orcamento
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 5
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
      ferramentas:
        - tabela:bun
        - "[[vitest|Vitest]]"
  - id: nod_orq_e3
    raia: nod_orq
    tipo: fim
    rotulo: npm com o mínimo de ferramentas configurado
    proximo: []
    retorno: npm_minimo
    saida:
      tipo: construir
      justificativa: Um time pequeno que quer apenas o que acompanha o Node.js ganha previsibilidade com npm, arquivo de lock versionado e poucas dependências de desenvolvimento.
      eixos:
        - time_maturidade
        - orcamento
        - prazo_entrega
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 5
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
      ferramentas:
        - tabela:nvm
        - "[[eslint|ESLint]]"
  - id: nod_orq_e4
    raia: nod_orq
    tipo: fim
    rotulo: pnpm em projeto único configurado
    proximo: []
    retorno: pnpm_projeto_unico
    saida:
      tipo: construir
      justificativa: Para um projeto único, o pnpm entrega instalação rápida, armazenamento compartilhado e lock determinístico, com Vitest e ESLint como base de qualidade.
      eixos:
        - prazo_entrega
        - time_maturidade
        - escala_volume
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 4
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
      ferramentas:
        - tabela:pnpm
        - "[[vitest|Vitest]]"
        - "[[eslint|ESLint]]"
  - id: nod_ctx_s0
    raia: nod_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: nod_ctx_t1
        condicao: ""
  - id: nod_ctx_t1
    raia: nod_ctx
    tipo: tarefa
    rotulo: Mapear tipo de projeto e estrutura
    proximo:
      - para: nod_ctx_t2
        condicao: ""
    passos:
      - ctx.necessidades_e_restricoes
      - ctx.premissas_nao_funcionais
  - id: nod_ctx_t2
    raia: nod_ctx
    tipo: tarefa
    rotulo: Escolher gerenciador e runtime
    proximo:
      - para: nod_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_gerenciador_e_versao
  - id: nod_ctx_e1
    raia: nod_ctx
    tipo: fim
    rotulo: Tipo de projeto e estrutura registrados
    proximo: []
    retorno: projeto_definido
  - id: nod_stk_s0
    raia: nod_stk
    tipo: inicio
    rotulo: Início da escolha do gerenciador
    proximo:
      - para: nod_stk_g1
        condicao: ""
  - id: nod_stk_g1
    raia: nod_stk
    tipo: bifurcacao
    rotulo: Vários pacotes no repositório?
    proximo:
      - para: nod_stk_e1
        condicao: sim
      - para: nod_stk_g2
        condicao: não
    eixo: escala_volume
    pergunta: q.repositorio_com_varios_pacotes
  - id: nod_stk_g2
    raia: nod_stk
    tipo: bifurcacao
    rotulo: Runtime único com arranque rápido?
    proximo:
      - para: nod_stk_e2
        condicao: sim
      - para: nod_stk_g3
        condicao: não
    eixo: latencia
    pergunta: q.runtime_unico_com_arranque_rapido
  - id: nod_stk_g3
    raia: nod_stk
    tipo: bifurcacao
    rotulo: Mínimo de ferramentas?
    proximo:
      - para: nod_stk_e3
        condicao: sim
      - para: nod_stk_e4
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_pequeno_com_o_minimo_de_ferramentas
  - id: nod_stk_e1
    raia: nod_stk
    tipo: fim
    rotulo: pnpm com workspaces
    proximo: []
    retorno: pnpm_workspaces
  - id: nod_stk_e2
    raia: nod_stk
    tipo: fim
    rotulo: Bun como runtime e gerenciador
    proximo: []
    retorno: bun_runtime
  - id: nod_stk_e3
    raia: nod_stk
    tipo: fim
    rotulo: npm com o mínimo de ferramentas
    proximo: []
    retorno: npm_minimo
  - id: nod_stk_e4
    raia: nod_stk
    tipo: fim
    rotulo: pnpm em projeto único
    proximo: []
    retorno: pnpm_projeto_unico
  - id: nod_ent_s0
    raia: nod_ent
    tipo: inicio
    rotulo: Início da configuração
    proximo:
      - para: nod_ent_t1
        condicao: ""
  - id: nod_ent_t1
    raia: nod_ent
    tipo: tarefa
    rotulo: Instalar e configurar a base
    proximo:
      - para: nod_ent_t2
        condicao: ""
    passos:
      - exec.instalar_node_e_gerenciador
      - exec.iniciar_projeto_e_typescript
      - exec.configurar_testes_com_vitest
      - exec.configurar_lint_e_formatacao
  - id: nod_ent_t2
    raia: nod_ent
    tipo: tarefa
    rotulo: Validar em clone limpo
    proximo:
      - para: nod_ent_t3
        condicao: ""
    passos:
      - val.rodar_pipeline_local_completo
  - id: nod_ent_t3
    raia: nod_ent
    tipo: tarefa
    rotulo: Automatizar e manter
    proximo:
      - para: nod_ent_e1
        condicao: ""
    passos:
      - ent.automatizar_no_ci
      - ops.atualizar_dependencias_e_runtime
  - id: nod_ent_e1
    raia: nod_ent
    tipo: fim
    rotulo: Base Node.js e TypeScript configurada e automatizada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.repositorio_com_varios_pacotes
    pergunta: O repositório terá vários pacotes que compartilham dependências e scripts?
    eixo: escala_volume
  - id: q.runtime_unico_com_arranque_rapido
    pergunta: O time prefere um runtime único que reúne executor, gerenciador de pacotes e testes, com arranque rápido?
    eixo: latencia
  - id: q.time_pequeno_com_o_minimo_de_ferramentas
    pergunta: O time é pequeno e quer apenas as ferramentas que acompanham o Node.js?
    eixo: time_maturidade
objetivo: Ter Node.js, gerenciador de pacotes, TypeScript, testes e lint configurados, com dependências travadas e a mesma sequência de comandos funcionando localmente e na integração contínua.
preRequisitos:
  - O tipo de projeto (serviço, biblioteca, aplicação web) e se há mais de um pacote no repositório.
  - A versão de suporte longo do Node.js aceita pela organização.
  - Acesso ao registro de pacotes e à rede.
  - Um repositório vazio ou um projeto existente a migrar.
passos:
  - id: ctx.necessidades_e_restricoes
    titulo: Definir necessidades e restrições de a stack Node.js e TypeScript
    descricao: Registrar o que a pessoa ou o time precisa fazer, os sistemas envolvidos, as regras de segurança e de dados da organização e o orçamento disponível.
    verificacao: A lista de necessidades, restrições e orçamento está escrita e foi aceita por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.necessidades_e_restricoes
  - id: prep.escolher_gerenciador_e_versao
    titulo: Escolher o gerenciador de pacotes e a versão do Node.js
    descricao: Percorrer o diagrama de decisão e registrar o gerenciador, a linha de versão de suporte longo do Node.js e o gerenciador de versões, se houver.
    verificacao: O gerenciador, a linha de versão e a forma de fixá-la estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.instalar_node_e_gerenciador
    titulo: Instalar o Node.js e o gerenciador de pacotes
    descricao: Instalar o Node.js na linha de suporte longo escolhida e o gerenciador de pacotes definido, e fixar a versão no projeto.
    verificacao: O terminal informa as versões do Node.js e do gerenciador e a versão fixada no projeto coincide com elas.
    depende:
      - prep.escolher_gerenciador_e_versao
  - id: exec.iniciar_projeto_e_typescript
    titulo: Iniciar o projeto e adicionar o TypeScript
    descricao: Criar o arquivo de manifesto do projeto, adicionar o TypeScript como dependência de desenvolvimento e gerar a configuração do compilador com checagem estrita.
    verificacao: O compilador do TypeScript valida o projeto sem erros e o arquivo de lock está versionado.
    depende:
      - exec.instalar_node_e_gerenciador
  - id: exec.configurar_testes_com_vitest
    titulo: Configurar os testes com Vitest
    descricao: Adicionar o Vitest, escrever um teste simples e criar o script de teste que roda uma vez e termina.
    verificacao: O script de teste executa o teste simples com sucesso e termina sem ficar observando arquivos.
    depende:
      - exec.iniciar_projeto_e_typescript
  - id: exec.configurar_lint_e_formatacao
    titulo: Configurar lint e formatação
    descricao: Gerar a configuração do ESLint com as regras recomendadas, adicionar o script de lint e definir a formatação do projeto.
    verificacao: O comando de lint termina sem erros no código do projeto e a formatação é verificada por um script.
    depende:
      - exec.configurar_testes_com_vitest
  - id: val.rodar_pipeline_local_completo
    titulo: Rodar a sequência completa em um clone limpo
    descricao: Em um clone novo, instalar as dependências, checar tipos, rodar lint e testes usando apenas os scripts do projeto.
    verificacao: A sequência completa passa em um clone limpo com a versão do Node.js fixada.
    depende:
      - exec.configurar_lint_e_formatacao
  - id: ent.automatizar_no_ci
    titulo: Automatizar a sequência na integração contínua
    descricao: Executar a mesma sequência em cada pull request, com cache de dependências e a versão do Node.js lida do projeto.
    verificacao: A integração contínua falha quando tipos, lint ou testes falham e passa quando todos estão verdes.
    depende:
      - val.rodar_pipeline_local_completo
  - id: ops.atualizar_dependencias_e_runtime
    titulo: Atualizar dependências e runtime com cadência
    descricao: Definir a rotina de atualização de dependências e a troca de linha de suporte longo do Node.js, com responsável e critério de aceite.
    verificacao: Existe uma rotina agendada de atualização e uma data de fim de suporte registrada para a versão em uso.
    depende:
      - ent.automatizar_no_ci
comoFazerHoje:
  - passo: exec.instalar_node_e_gerenciador
    variante: npm
    comandos:
      - node --version
      - npm --version
    versaoTestada: Node.js 26 LTS, segundo a página de download
    dataVerificacao: 2026-11-23
    fonteUrl: https://nodejs.org/en/download
  - passo: exec.instalar_node_e_gerenciador
    variante: pnpm
    comandos:
      - curl -fsSL https://get.pnpm.io/install.sh | sh -
      - pnpm --version
    versaoTestada: pnpm 12, segundo a documentação de instalação
    dataVerificacao: 2026-11-23
    fonteUrl: https://pnpm.io/installation
  - passo: exec.iniciar_projeto_e_typescript
    variante: npm
    comandos:
      - npm init -y
      - npm install typescript --save-dev
      - npx tsc --init
    versaoTestada: TypeScript 7.0, segundo a página de download
    dataVerificacao: 2026-11-23
    fonteUrl: https://www.typescriptlang.org/download/
  - passo: exec.iniciar_projeto_e_typescript
    variante: pnpm
    comandos:
      - pnpm init
      - pnpm add -D typescript
      - pnpm exec tsc --init
    versaoTestada: TypeScript 7.0, segundo a página de download
    dataVerificacao: 2026-11-23
    fonteUrl: https://www.typescriptlang.org/download/
  - passo: exec.configurar_testes_com_vitest
    variante: npm
    comandos:
      - npm install -D vitest
      - npm run test
      - npx vitest run
    versaoTestada: Vitest exige Node.js 22.12 ou superior, segundo o guia
    dataVerificacao: 2026-11-23
    fonteUrl: https://vitest.dev/guide/
  - passo: exec.configurar_testes_com_vitest
    variante: pnpm
    comandos:
      - pnpm add -D vitest
      - pnpm test
      - pnpm exec vitest run
    versaoTestada: Vitest exige Node.js 22.12 ou superior, segundo o guia
    dataVerificacao: 2026-11-23
    fonteUrl: https://vitest.dev/guide/
  - passo: exec.configurar_lint_e_formatacao
    variante: npm
    comandos:
      - npm init @eslint/config@latest
      - npx eslint .
    versaoTestada: ESLint exige Node.js 20.19, 22.13 ou 24 em diante, segundo a documentação
    dataVerificacao: 2026-11-23
    fonteUrl: https://eslint.org/docs/latest/use/getting-started
  - passo: exec.configurar_lint_e_formatacao
    variante: pnpm
    comandos:
      - pnpm create @eslint/config@latest
      - pnpm dlx eslint .
    versaoTestada: ESLint exige Node.js 20.19, 22.13 ou 24 em diante, segundo a documentação
    dataVerificacao: 2026-11-23
    fonteUrl: https://eslint.org/docs/latest/use/getting-started
checklistRefs:
  exec.instalar_node_e_gerenciador: amb.ambiente_reproduzivel
  exec.iniciar_projeto_e_typescript: amb.dependencias_travadas
  exec.configurar_testes_com_vitest: teste.piramide_de_testes
  val.rodar_pipeline_local_completo: amb.ambiente_reproduzivel
  ent.automatizar_no_ci: cicd.pipeline_ci
  ops.atualizar_dependencias_e_runtime: seg.varredura_dependencias
armadilhas:
  - Instalar pacotes globais para uso do projeto, o que cria diferenças entre máquinas e quebra a reprodutibilidade.
  - Deixar o arquivo de lock fora do controle de versão, o que permite que dependências mudem entre execuções sem aviso.
  - Usar uma versão do Node.js fora do suporte longo em produção, o que acumula risco de segurança e de compatibilidade.
  - Configurar o TypeScript sem checagem estrita, o que adia a descoberta de erros de tipo para a execução.
validacao:
  - O terminal informa as versões do Node.js e do gerenciador e a versão fixada no projeto coincide.
  - O compilador do TypeScript valida o projeto sem erros e o arquivo de lock está versionado.
  - Os testes executam uma vez e terminam com sucesso.
  - O lint termina sem erros e a formatação é verificada por script.
  - A integração contínua executa tipos, lint e testes em cada pull request.
padroes:
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[monolito_modular|Monolito Modular]]"
  - "[[backend_for_frontend|Backend for Frontend]]"
categorias:
  - "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[validacao_schemas|Validação e schemas]]"
  - "[[frameworks_backend|Frameworks de backend]]"
aliases:
  - Configurar Node.js e JavaScript
  - Novo projeto TypeScript com testes e lint
grupo: Configurar o ambiente
stacks:
  - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - "[[site_conteudo_estatico|Site de conteúdo estático]]"
ferramentas:
  - tabela:bun
  - "[[vitest|Vitest]]"
  - tabela:nvm
  - "[[eslint|ESLint]]"
  - tabela:pnpm
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes:
  - proto-framework-web
  - teste-unitario
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar a stack Node.js e TypeScript
## 🎯 Objetivo
`= this.objetivo`

Resumo: `= this.descricao`

Exemplo: `= this.exemplo`

Grupo: `= this.grupo`
## 🔀 Diagrama de decisão
## 🎯 Casos de uso e variações

Variações: `= this.variacoes`
## 🔗 Relacionamentos
- **Hub:** [[hub_guides|Mapa de Guias Práticos]], [[hub_stacks|Mapa de Stacks de Engenharia]], [[hub_tools|Mapa de Ferramentas de Engenharia]] e [[hub_patterns|Mapa de Padrões de Engenharia]]
