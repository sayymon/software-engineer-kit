---
id: configurar_ide
tipo: guia-pratico
nome: Como configurar a IDE
sigla: ide
descricao: "Caminho para deixar a IDE pronta para o time: escolher entre VS Code (com ou sem assistente de IA) e Kiro, instalar, abrir o projeto, adicionar as extensões essenciais, configurar formatação e depuração, ligar o agente com instruções de projeto e compartilhar a configuração no repositório."
exemplo: "Um time padroniza o VS Code: instala as extensões essenciais da linguagem, versiona as recomendações e a configuração de depuração no repositório e confirma que uma pessoa nova abre o projeto, depura e roda os testes sem passos extras."
quando_usar:
  - Uma pessoa nova entra no time ou uma máquina nova precisa do ambiente de edição configurado.
  - O time quer padronizar extensões, formatação e depuração para reduzir diferenças entre máquinas.
quando_evitar:
  - "Quando a IDE já está padronizada e falta apenas uma extensão: edite o arquivo de recomendações do repositório."
fonte_ids:
  - vscode_setup_overview
  - kiro_installation
  - kiro_steering
  - kiro_mcp
fontes:
  - id: vscode_setup_overview
    tipo: artigo
    titulo: Download and install Visual Studio Code (VS Code Docs)
    link: https://code.visualstudio.com/docs/setup/setup-overview
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: kiro_installation
    tipo: artigo
    titulo: Installation (Kiro Docs)
    link: https://kiro.dev/docs/getting-started/installation/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: kiro_steering
    tipo: artigo
    titulo: Steering (Kiro Docs)
    link: https://kiro.dev/docs/steering/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: kiro_mcp
    tipo: artigo
    titulo: Model Context Protocol (Kiro Docs)
    link: https://kiro.dev/docs/mcp/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: ide_orq
    nome: Orquestração da IDE
    responsabilidade: Encadear contexto, escolha da IDE e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: ide_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: ide_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: ide_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: ide_orq_s0
    raia: ide_orq
    tipo: inicio
    rotulo: Necessidade de configurar a IDE do time
    proximo:
      - para: ide_orq_c1
        condicao: ""
  - id: ide_orq_c1
    raia: ide_orq
    tipo: chamada
    rotulo: Definir linguagem, política e uso de IA
    proximo:
      - para: ide_orq_c2
        condicao: politica_definida
    raia_chamada: ide_ctx
  - id: ide_orq_c2
    raia: ide_orq
    tipo: chamada
    rotulo: Escolher a IDE por contexto
    proximo:
      - para: ide_orq_c3
        condicao: kiro_ide
      - para: ide_orq_c4
        condicao: vscode_copilot
      - para: ide_orq_c5
        condicao: vscode_ia_local
      - para: ide_orq_c6
        condicao: vscode_essencial
    raia_chamada: ide_stk
  - id: ide_orq_c3
    raia: ide_orq
    tipo: chamada
    rotulo: Instalar, configurar e compartilhar a IDE
    proximo:
      - para: ide_orq_e1
        condicao: pronta
    raia_chamada: ide_ent
  - id: ide_orq_c4
    raia: ide_orq
    tipo: chamada
    rotulo: Instalar, configurar e compartilhar a IDE
    proximo:
      - para: ide_orq_e2
        condicao: pronta
    raia_chamada: ide_ent
  - id: ide_orq_c5
    raia: ide_orq
    tipo: chamada
    rotulo: Instalar, configurar e compartilhar a IDE
    proximo:
      - para: ide_orq_e3
        condicao: pronta
    raia_chamada: ide_ent
  - id: ide_orq_c6
    raia: ide_orq
    tipo: chamada
    rotulo: Instalar, configurar e compartilhar a IDE
    proximo:
      - para: ide_orq_e4
        condicao: pronta
    raia_chamada: ide_ent
  - id: ide_orq_e1
    raia: ide_orq
    tipo: fim
    rotulo: Kiro IDE configurado com steering e MCP
    proximo: []
    retorno: kiro_ide
    saida:
      tipo: stack
      justificativa: O fluxo por especificações da Kiro IDE junta requisitos, tarefas e agente, e as regras de projeto ficam em arquivos de steering que o time versiona com o código.
      eixos:
        - time_maturidade
        - prazo_entrega
        - lock_in
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
      stack: "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - id: ide_orq_e2
    raia: ide_orq
    tipo: fim
    rotulo: VS Code com GitHub Copilot ativo
    proximo: []
    retorno: vscode_copilot
    saida:
      tipo: assinar
      justificativa: Com o Copilot já licenciado, o VS Code ativa o assistente com a conta da organização em minutos, e as políticas centrais de conteúdo e de dados já se aplicam.
      eixos:
        - lock_in
        - orcamento
        - prazo_entrega
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 2
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[ide_ia|IDE com IA]]"
      ferramentas:
        - "[[visual_studio_code|Visual Studio Code]]"
        - "[[github_copilot|GitHub Copilot]]"
  - id: ide_orq_e3
    raia: ide_orq
    tipo: fim
    rotulo: VS Code com assistente de IA local
    proximo: []
    retorno: vscode_ia_local
    saida:
      tipo: construir
      justificativa: Quando o código não pode sair da máquina, um assistente conectado a um modelo local mantém os dados no ambiente e preserva o fluxo de edição do VS Code.
      eixos:
        - compliance_dados
        - latencia
        - orcamento
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 4
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[ide_ia|IDE com IA]]"
      ferramentas:
        - "[[visual_studio_code|Visual Studio Code]]"
        - tabela:continue-dev
        - tabela:llama-cpp
  - id: ide_orq_e4
    raia: ide_orq
    tipo: fim
    rotulo: VS Code com extensões essenciais
    proximo: []
    retorno: vscode_essencial
    saida:
      tipo: construir
      justificativa: Sem exigência de assistente de IA, o VS Code com as extensões essenciais da linguagem, formatação e depuração entrega o ambiente padronizado com custo e risco mínimos.
      eixos:
        - orcamento
        - time_maturidade
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
      categoria: "[[ide_ia|IDE com IA]]"
      ferramentas:
        - "[[visual_studio_code|Visual Studio Code]]"
        - tabela:eslint
  - id: ide_ctx_s0
    raia: ide_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: ide_ctx_t1
        condicao: ""
  - id: ide_ctx_t1
    raia: ide_ctx
    tipo: tarefa
    rotulo: Mapear linguagem, política e uso de IA
    proximo:
      - para: ide_ctx_t2
        condicao: ""
    passos:
      - ctx.necessidades_e_restricoes
      - ctx.premissas_nao_funcionais
  - id: ide_ctx_t2
    raia: ide_ctx
    tipo: tarefa
    rotulo: Escolher a IDE
    proximo:
      - para: ide_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_ide
  - id: ide_ctx_e1
    raia: ide_ctx
    tipo: fim
    rotulo: Linguagem e política registradas
    proximo: []
    retorno: politica_definida
  - id: ide_stk_s0
    raia: ide_stk
    tipo: inicio
    rotulo: Início da escolha da IDE
    proximo:
      - para: ide_stk_g1
        condicao: ""
  - id: ide_stk_g1
    raia: ide_stk
    tipo: bifurcacao
    rotulo: Agente com especificações na IDE?
    proximo:
      - para: ide_stk_e1
        condicao: sim
      - para: ide_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.agente_com_especificacoes_na_ide
  - id: ide_stk_g2
    raia: ide_stk
    tipo: bifurcacao
    rotulo: Copilot já licenciado?
    proximo:
      - para: ide_stk_e2
        condicao: sim
      - para: ide_stk_g3
        condicao: não
    eixo: lock_in
    pergunta: q.copilot_ja_licenciado_na_organizacao
  - id: ide_stk_g3
    raia: ide_stk
    tipo: bifurcacao
    rotulo: Código sem sair da máquina?
    proximo:
      - para: ide_stk_e3
        condicao: sim
      - para: ide_stk_e4
        condicao: não
    eixo: compliance_dados
    pergunta: q.codigo_nao_pode_sair_da_maquina
  - id: ide_stk_e1
    raia: ide_stk
    tipo: fim
    rotulo: Kiro IDE com agente integrado
    proximo: []
    retorno: kiro_ide
  - id: ide_stk_e2
    raia: ide_stk
    tipo: fim
    rotulo: VS Code com Copilot
    proximo: []
    retorno: vscode_copilot
  - id: ide_stk_e3
    raia: ide_stk
    tipo: fim
    rotulo: VS Code com assistente local
    proximo: []
    retorno: vscode_ia_local
  - id: ide_stk_e4
    raia: ide_stk
    tipo: fim
    rotulo: VS Code com extensões essenciais
    proximo: []
    retorno: vscode_essencial
  - id: ide_ent_s0
    raia: ide_ent
    tipo: inicio
    rotulo: Início da configuração
    proximo:
      - para: ide_ent_t1
        condicao: ""
  - id: ide_ent_t1
    raia: ide_ent
    tipo: tarefa
    rotulo: Instalar e configurar a IDE
    proximo:
      - para: ide_ent_t2
        condicao: ""
    passos:
      - exec.instalar_ide_e_abrir_projeto
      - exec.instalar_extensoes_essenciais
      - exec.configurar_editor_e_depuracao
      - exec.ligar_agente_e_instrucoes
  - id: ide_ent_t2
    raia: ide_ent
    tipo: tarefa
    rotulo: Validar o fluxo completo
    proximo:
      - para: ide_ent_t3
        condicao: ""
    passos:
      - val.verificar_fluxo_completo
  - id: ide_ent_t3
    raia: ide_ent
    tipo: tarefa
    rotulo: Compartilhar e manter
    proximo:
      - para: ide_ent_e1
        condicao: ""
    passos:
      - ent.compartilhar_configuracao_no_repositorio
      - ops.revisar_extensoes_periodicamente
  - id: ide_ent_e1
    raia: ide_ent
    tipo: fim
    rotulo: IDE configurada e compartilhada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.agente_com_especificacoes_na_ide
    pergunta: O time quer um agente com fluxo por especificações e instruções de projeto integrados à IDE?
    eixo: contexto
  - id: q.copilot_ja_licenciado_na_organizacao
    pergunta: A organização já licencia o GitHub Copilot para o time?
    eixo: lock_in
  - id: q.codigo_nao_pode_sair_da_maquina
    pergunta: O código não pode ser enviado a serviços externos de IA?
    eixo: compliance_dados
objetivo: Ter a IDE instalada, com o projeto aberto, extensões essenciais, formatação e depuração configuradas e a configuração compartilhada no repositório, com o agente integrado quando o time adotar.
preRequisitos:
  - A linguagem e o framework do projeto e as extensões que o time já usa.
  - A política da organização para extensões e para assistentes de IA.
  - Um repositório com um projeto que compila e tem testes.
  - Permissão para instalar software na máquina.
passos:
  - id: ctx.necessidades_e_restricoes
    titulo: Definir necessidades e restrições de a IDE
    descricao: Registrar o que a pessoa ou o time precisa fazer, os sistemas envolvidos, as regras de segurança e de dados da organização e o orçamento disponível.
    verificacao: A lista de necessidades, restrições e orçamento está escrita e foi aceita por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.necessidades_e_restricoes
  - id: prep.escolher_ide
    titulo: Escolher a IDE e o nível de integração com IA
    descricao: Percorrer o diagrama de decisão e registrar a IDE, o assistente de IA (quando houver) e a política de dados.
    verificacao: A IDE, o assistente e a política de dados estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.instalar_ide_e_abrir_projeto
    titulo: Instalar a IDE e abrir o projeto
    descricao: Instalar a IDE pelo método oficial, abrir a pasta do projeto e confiar apenas em projetos de origem conhecida.
    verificacao: A IDE abre o projeto, exibe a estrutura de pastas e informa a versão instalada.
    depende:
      - prep.escolher_ide
  - id: exec.instalar_extensoes_essenciais
    titulo: Instalar as extensões essenciais
    descricao: Instalar as extensões da linguagem, do formatador, do linter e do executor de testes que o time adotou.
    verificacao: A lista de extensões instaladas corresponde à lista recomendada pelo projeto.
    depende:
      - exec.instalar_ide_e_abrir_projeto
  - id: exec.configurar_editor_e_depuracao
    titulo: Configurar formatação e depuração
    descricao: Definir formatar ao salvar, a configuração do formatador do projeto e uma configuração de depuração para a aplicação e para os testes.
    verificacao: Salvar um arquivo aplica a formatação do projeto e um ponto de interrupção pausa a execução de um teste.
    depende:
      - exec.instalar_extensoes_essenciais
  - id: exec.ligar_agente_e_instrucoes
    titulo: Ligar o agente e as instruções do projeto
    descricao: Habilitar o agente da IDE (quando adotado), criar o arquivo de instruções do projeto e conectar apenas os servidores MCP necessários.
    verificacao: O agente cita as instruções do projeto e cada servidor MCP tem escopo mínimo e uma chamada de teste.
    depende:
      - exec.configurar_editor_e_depuracao
  - id: val.verificar_fluxo_completo
    titulo: Verificar o fluxo completo
    descricao: Abrir o projeto a partir de um clone limpo, formatar, depurar e executar os testes sem passos manuais além do README.
    verificacao: Uma pessoa nova repete o fluxo completo seguindo apenas o README.
    depende:
      - exec.ligar_agente_e_instrucoes
  - id: ent.compartilhar_configuracao_no_repositorio
    titulo: Compartilhar a configuração no repositório
    descricao: Versionar as recomendações de extensões, a configuração de depuração e as instruções do projeto, sem dados pessoais nem segredos.
    verificacao: A configuração compartilhada está no repositório e não contém caminhos pessoais nem credenciais.
    depende:
      - val.verificar_fluxo_completo
  - id: ops.revisar_extensoes_periodicamente
    titulo: Revisar extensões periodicamente
    descricao: Agendar a revisão das extensões e dos servidores MCP, removendo o que não tem uso e atualizando o que mudou de segurança ou de política.
    verificacao: Existe uma revisão agendada com responsável e uma lista de extensões aprovadas.
    depende:
      - ent.compartilhar_configuracao_no_repositorio
comoFazerHoje:
  - passo: exec.instalar_ide_e_abrir_projeto
    variante: vscode
    comandos:
      - code --version
      - code .
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.visualstudio.com/docs/setup/setup-overview
  - passo: exec.instalar_ide_e_abrir_projeto
    variante: kiro-ide
    comandos:
      - Baixar o instalador em kiro.dev e executá-lo
      - Entrar com um provedor de login (Google, GitHub, AWS Builder ID ou identidade da organização)
      - Abrir uma pasta pela página de boas-vindas
    versaoTestada: não verificado (a documentação de 2026-11-20 lista a instalação pelo instalador)
    dataVerificacao: 2026-11-23
    fonteUrl: https://kiro.dev/docs/getting-started/installation/
  - passo: exec.instalar_extensoes_essenciais
    variante: vscode
    comandos:
      - code --install-extension <ID_DA_EXTENSAO>
      - code --list-extensions
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.visualstudio.com/docs/setup/setup-overview
  - passo: exec.configurar_editor_e_depuracao
    variante: vscode
    comandos:
      - mkdir -p .vscode
      - touch .vscode/settings.json .vscode/launch.json
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.visualstudio.com/docs/setup/setup-overview
  - passo: exec.ligar_agente_e_instrucoes
    variante: kiro-ide
    comandos:
      - mkdir -p .kiro/steering
      - touch .kiro/steering/tech.md
      - "Paleta de comandos: Kiro: Open workspace MCP config (JSON)"
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://kiro.dev/docs/steering/
checklistRefs:
  exec.instalar_ide_e_abrir_projeto: amb.ambiente_reproduzivel
  exec.ligar_agente_e_instrucoes: doc.readme_operacional
  ent.compartilhar_configuracao_no_repositorio: amb.ambiente_reproduzivel
armadilhas:
  - Instalar muitas extensões sem critério, o que deixa a IDE lenta e amplia a superfície de risco de cada extensão.
  - Guardar caminhos pessoais ou credenciais na configuração compartilhada do repositório, o que quebra o ambiente das outras pessoas e expõe dados.
  - Habilitar um assistente de IA sem alinhar a política de dados, o que pode enviar código sensível a serviços externos.
  - Configurar formatação apenas na IDE e não no projeto, o que gera diferenças de estilo entre pessoas e a integração contínua.
validacao:
  - A IDE abre o projeto e informa a versão instalada.
  - As extensões instaladas correspondem à lista recomendada do projeto.
  - Salvar aplica a formatação do projeto e um ponto de interrupção pausa um teste.
  - O agente, quando adotado, cita as instruções do projeto e cada servidor MCP tem escopo mínimo.
  - A configuração compartilhada está no repositório sem caminhos pessoais nem credenciais.
padroes:
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[agent_memory|Agent Memory]]"
categorias:
  - "[[ide_ia|IDE com IA]]"
  - "[[agente_codigo|Agente de código]]"
  - "[[terminal_produtividade_local|Terminal e produtividade local]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[mcp_integracoes|MCP e integrações]]"
aliases:
  - Configurar o VS Code
  - Configurar o Kiro
grupo: Configurar o ambiente
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
ferramentas:
  - "[[visual_studio_code|Visual Studio Code]]"
  - "[[github_copilot|GitHub Copilot]]"
  - tabela:continue-dev
  - tabela:llama-cpp
  - tabela:eslint
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
variacoes:
  - par-ide-autocomplete
  - bug-depurador-ide
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar a IDE
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
