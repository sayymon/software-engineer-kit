---
id: configurar_code_agents
tipo: guia-pratico
nome: Como configurar code agents
sigla: cag
descricao: "Caminho para deixar um agente de código pronto para uso diário: escolher o agente conforme o trabalho e a conta disponível, instalar e autenticar, escrever as instruções do projeto, conectar ferramentas por MCP com escopo mínimo, definir permissões e acompanhar o custo. Os passos são os mesmos para qualquer agente e só o comando muda por variante."
exemplo: "Um time pequeno quer um agente no terminal para escrever testes: escolhe o agente que a assinatura já cobre, instala, escreve o arquivo de instruções com os comandos de build e teste, libera só leitura e execução de testes, e valida com uma alteração pequena revisada por uma pessoa."
quando_usar:
  - Uma pessoa ou um time começa a usar um agente de código e precisa de um ponto de partida seguro e repetível.
  - Um agente novo entra no fluxo e as instruções, as permissões e as conexões precisam ser reconstruídas com a mesma disciplina.
quando_evitar:
  - "Quando o agente já está configurado e só falta uma regra nova nas instruções do projeto: edite o arquivo de instruções existente."
fonte_ids:
  - claude_code_quickstart
  - claude_code_memory
  - claude_code_mcp
  - claude_code_permissions
  - gemini_cli_repo
  - gemini_cli_context
  - codex_cli_repo
  - codex_agents_md
  - kiro_installation
  - kiro_steering
  - kiro_mcp
fontes:
  - id: claude_code_quickstart
    tipo: artigo
    titulo: Quickstart (Claude Code Docs)
    link: https://code.claude.com/docs/en/quickstart
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: claude_code_memory
    tipo: artigo
    titulo: How Claude remembers your project (Claude Code Docs)
    link: https://code.claude.com/docs/en/memory
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: claude_code_mcp
    tipo: artigo
    titulo: Connect Claude Code to tools via MCP (Claude Code Docs)
    link: https://code.claude.com/docs/en/mcp
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: claude_code_permissions
    tipo: artigo
    titulo: Configure permissions (Claude Code Docs)
    link: https://code.claude.com/docs/en/permissions
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: gemini_cli_repo
    tipo: artigo
    titulo: Gemini CLI (repositório oficial google-gemini/gemini-cli)
    link: https://github.com/google-gemini/gemini-cli
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: gemini_cli_context
    tipo: artigo
    titulo: Provide context with GEMINI.md files (Gemini CLI Docs)
    link: https://geminicli.com/docs/cli/gemini-md/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: codex_cli_repo
    tipo: artigo
    titulo: Codex CLI (repositório oficial openai/codex)
    link: https://github.com/openai/codex
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: codex_agents_md
    tipo: artigo
    titulo: Custom instructions with AGENTS.md (Codex Docs)
    link: https://learn.chatgpt.com/docs/agent-configuration/agents-md
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
  - id: cag_orq
    nome: Orquestração de code agents
    responsabilidade: Encadear contexto, escolha do agente e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: cag_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: cag_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: cag_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: cag_orq_s0
    raia: cag_orq
    tipo: inicio
    rotulo: Necessidade de configurar um agente de código
    proximo:
      - para: cag_orq_c1
        condicao: ""
  - id: cag_orq_c1
    raia: cag_orq
    tipo: chamada
    rotulo: Definir tarefas, restrições e conta disponível
    proximo:
      - para: cag_orq_c2
        condicao: necessidades_definidas
    raia_chamada: cag_ctx
  - id: cag_orq_c2
    raia: cag_orq
    tipo: chamada
    rotulo: Escolher o agente por contexto
    proximo:
      - para: cag_orq_c3
        condicao: kiro_ide
      - para: cag_orq_c4
        condicao: kiro_cli
      - para: cag_orq_c5
        condicao: codex
      - para: cag_orq_c6
        condicao: gemini_cli
      - para: cag_orq_c7
        condicao: claude_code
    raia_chamada: cag_stk
  - id: cag_orq_c3
    raia: cag_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e operar o agente
    proximo:
      - para: cag_orq_e1
        condicao: pronta
    raia_chamada: cag_ent
  - id: cag_orq_c4
    raia: cag_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e operar o agente
    proximo:
      - para: cag_orq_e2
        condicao: pronta
    raia_chamada: cag_ent
  - id: cag_orq_c5
    raia: cag_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e operar o agente
    proximo:
      - para: cag_orq_e3
        condicao: pronta
    raia_chamada: cag_ent
  - id: cag_orq_c6
    raia: cag_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e operar o agente
    proximo:
      - para: cag_orq_e4
        condicao: pronta
    raia_chamada: cag_ent
  - id: cag_orq_c7
    raia: cag_orq
    tipo: chamada
    rotulo: Instalar, configurar, validar e operar o agente
    proximo:
      - para: cag_orq_e5
        condicao: pronta
    raia_chamada: cag_ent
  - id: cag_orq_e1
    raia: cag_orq
    tipo: fim
    rotulo: Kiro IDE configurado para o fluxo por especificações
    proximo: []
    retorno: kiro_ide
    saida:
      tipo: stack
      justificativa: Um fluxo guiado por especificações dentro da IDE junta requisitos, tarefas e agente no mesmo lugar, e as regras de projeto ficam em arquivos de steering versionados com o repositório.
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
  - id: cag_orq_e2
    raia: cag_orq
    tipo: fim
    rotulo: Kiro CLI assinado para o terminal
    proximo: []
    retorno: kiro_cli
    saida:
      tipo: assinar
      justificativa: Para trabalho em terminal e em servidores remotos com a conta de nuvem já na AWS, o Kiro CLI entrega o agente sem montar infraestrutura e reaproveita a configuração .kiro da IDE.
      eixos:
        - compliance_dados
        - prazo_entrega
        - orcamento
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
      categoria: "[[agente_codigo|Agente de código]]"
      ferramentas:
        - "[[kiro_cli|Kiro CLI]]"
        - "[[kiro_ide|Kiro-IDE]]"
  - id: cag_orq_e3
    raia: cag_orq
    tipo: fim
    rotulo: Codex CLI ativo com a assinatura existente
    proximo: []
    retorno: codex
    saida:
      tipo: assinar
      justificativa: Quando a assinatura do ChatGPT já inclui o agente de terminal, entrar com a conta existente evita um novo contrato e valida o ganho antes de qualquer investimento adicional.
      eixos:
        - orcamento
        - prazo_entrega
        - lock_in
      objetivo: validar_hipotese
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 4
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 4
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[agente_codigo|Agente de código]]"
      ferramentas:
        - tabela:openai-codex
  - id: cag_orq_e4
    raia: cag_orq
    tipo: fim
    rotulo: Gemini CLI com licença da organização
    proximo: []
    retorno: gemini_cli
    saida:
      tipo: comprar
      justificativa: A licença Gemini Code Assist em Google Cloud já cobre administração central, faturamento e controle de acesso, e o Gemini CLI roda sobre ela com a conta da organização.
      eixos:
        - lock_in
        - compliance_dados
        - orcamento
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        comprar:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 4
          risco: 4
        assinar:
          diferenciacao: 3
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[agente_codigo|Agente de código]]"
      ferramentas:
        - tabela:gemini-cli
  - id: cag_orq_e5
    raia: cag_orq
    tipo: fim
    rotulo: Claude Code ativo por assinatura ou chave de API
    proximo: []
    retorno: claude_code
    saida:
      tipo: assinar
      justificativa: Sem restrição de conta ou de nuvem, o Claude Code entra por assinatura ou chave de API em minutos, com instruções em arquivo de projeto e permissões por regra, e permite medir o valor antes de padronizar.
      eixos:
        - prazo_entrega
        - orcamento
        - time_maturidade
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
      categoria: "[[agente_codigo|Agente de código]]"
      ferramentas:
        - "[[claude_code|Claude-Code]]"
  - id: cag_ctx_s0
    raia: cag_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: cag_ctx_t1
        condicao: ""
  - id: cag_ctx_t1
    raia: cag_ctx
    tipo: tarefa
    rotulo: Mapear tarefas, restrições e conta
    proximo:
      - para: cag_ctx_t2
        condicao: ""
    passos:
      - ctx.necessidades_e_restricoes
      - ctx.premissas_nao_funcionais
  - id: cag_ctx_t2
    raia: cag_ctx
    tipo: tarefa
    rotulo: Escolher o agente
    proximo:
      - para: cag_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_agente_e_conta
  - id: cag_ctx_e1
    raia: cag_ctx
    tipo: fim
    rotulo: Necessidades e restrições acordadas
    proximo: []
    retorno: necessidades_definidas
  - id: cag_stk_s0
    raia: cag_stk
    tipo: inicio
    rotulo: Início da escolha do agente
    proximo:
      - para: cag_stk_g1
        condicao: ""
  - id: cag_stk_g1
    raia: cag_stk
    tipo: bifurcacao
    rotulo: Fluxo por especificações em IDE?
    proximo:
      - para: cag_stk_e1
        condicao: sim
      - para: cag_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.fluxo_por_especificacoes_na_ide
  - id: cag_stk_g2
    raia: cag_stk
    tipo: bifurcacao
    rotulo: Terminal e conta AWS?
    proximo:
      - para: cag_stk_e2
        condicao: sim
      - para: cag_stk_g3
        condicao: não
    eixo: compliance_dados
    pergunta: q.terminal_e_servidores_remotos_com_nuvem_aws
  - id: cag_stk_g3
    raia: cag_stk
    tipo: bifurcacao
    rotulo: Assinatura do ChatGPT existente?
    proximo:
      - para: cag_stk_e3
        condicao: sim
      - para: cag_stk_g4
        condicao: não
    eixo: orcamento
    pergunta: q.assinatura_com_agente_de_terminal_do_chatgpt
  - id: cag_stk_g4
    raia: cag_stk
    tipo: bifurcacao
    rotulo: Licença Code Assist na organização?
    proximo:
      - para: cag_stk_e4
        condicao: sim
      - para: cag_stk_e5
        condicao: não
    eixo: lock_in
    pergunta: q.licenca_code_assist_na_organizacao
  - id: cag_stk_e1
    raia: cag_stk
    tipo: fim
    rotulo: Kiro IDE com fluxo por especificações
    proximo: []
    retorno: kiro_ide
  - id: cag_stk_e2
    raia: cag_stk
    tipo: fim
    rotulo: Kiro CLI no terminal
    proximo: []
    retorno: kiro_cli
  - id: cag_stk_e3
    raia: cag_stk
    tipo: fim
    rotulo: Codex CLI com a assinatura existente
    proximo: []
    retorno: codex
  - id: cag_stk_e4
    raia: cag_stk
    tipo: fim
    rotulo: Gemini CLI com a licença da organização
    proximo: []
    retorno: gemini_cli
  - id: cag_stk_e5
    raia: cag_stk
    tipo: fim
    rotulo: Claude Code com assinatura ou chave de API
    proximo: []
    retorno: claude_code
  - id: cag_ent_s0
    raia: cag_ent
    tipo: inicio
    rotulo: Início da configuração
    proximo:
      - para: cag_ent_t1
        condicao: ""
  - id: cag_ent_t1
    raia: cag_ent
    tipo: tarefa
    rotulo: Instalar e configurar o agente
    proximo:
      - para: cag_ent_t2
        condicao: ""
    passos:
      - exec.instalar_e_autenticar
      - exec.instrucoes_de_projeto
      - exec.conectar_ferramentas_mcp
      - exec.definir_permissoes
  - id: cag_ent_t2
    raia: cag_ent
    tipo: tarefa
    rotulo: Validar em tarefa real
    proximo:
      - para: cag_ent_t3
        condicao: ""
    passos:
      - val.testar_em_tarefa_real
  - id: cag_ent_t3
    raia: cag_ent
    tipo: tarefa
    rotulo: Acompanhar custo e uso
    proximo:
      - para: cag_ent_e1
        condicao: ""
    passos:
      - ops.acompanhar_custo_e_uso
  - id: cag_ent_e1
    raia: cag_ent
    tipo: fim
    rotulo: Agente configurado, validado e acompanhado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.fluxo_por_especificacoes_na_ide
    pergunta: O time quer um fluxo guiado por especificações dentro de uma IDE com agente integrado?
    eixo: contexto
  - id: q.terminal_e_servidores_remotos_com_nuvem_aws
    pergunta: O trabalho acontece no terminal ou em servidores remotos, com a conta de nuvem já na AWS?
    eixo: compliance_dados
  - id: q.assinatura_com_agente_de_terminal_do_chatgpt
    pergunta: O time já tem uma assinatura do ChatGPT que inclui um agente de terminal?
    eixo: orcamento
  - id: q.licenca_code_assist_na_organizacao
    pergunta: A organização já tem licença Gemini Code Assist em Google Cloud com administração central?
    eixo: lock_in
objetivo: Deixar um agente de código instalado, autenticado, com instruções de projeto, ferramentas conectadas com escopo mínimo, permissões definidas e custo acompanhado, validado em uma tarefa real pequena.
preRequisitos:
  - Uma tarefa típica que o agente vai executar e o repositório de teste onde ela acontece.
  - "Conta ou licença disponível: assinatura, chave de API ou licença da organização."
  - Regras de dados da organização que limitam o que o agente pode ler e enviar.
  - Um responsável por administrar acessos e acompanhar o consumo.
passos:
  - id: ctx.necessidades_e_restricoes
    titulo: Definir necessidades e restrições de code agents
    descricao: Registrar o que a pessoa ou o time precisa fazer, os sistemas envolvidos, as regras de segurança e de dados da organização e o orçamento disponível.
    verificacao: A lista de necessidades, restrições e orçamento está escrita e foi aceita por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.necessidades_e_restricoes
  - id: prep.escolher_agente_e_conta
    titulo: Escolher o agente e a forma de acesso
    descricao: Percorrer o diagrama de decisão e registrar o agente escolhido, a conta (assinatura, chave de API ou licença da organização) e quem administra o acesso.
    verificacao: O agente, o tipo de conta e o administrador do acesso estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.instalar_e_autenticar
    titulo: Instalar o agente e autenticar
    descricao: Instalar pelo método oficial do agente escolhido, abrir uma sessão em um repositório de teste e entrar com a conta definida.
    verificacao: O agente informa a versão instalada e responde a um pedido simples no repositório de teste.
    depende:
      - prep.escolher_agente_e_conta
  - id: exec.instrucoes_de_projeto
    titulo: Escrever as instruções do projeto
    descricao: Criar o arquivo de instruções que o agente lê em toda sessão, com comandos de build e teste, convenções de código e estrutura do repositório.
    verificacao: Uma sessão nova cita corretamente os comandos de teste e as convenções do arquivo.
    depende:
      - exec.instalar_e_autenticar
  - id: exec.conectar_ferramentas_mcp
    titulo: Conectar apenas os servidores MCP necessários
    descricao: Adicionar os servidores MCP que o trabalho exige, com credenciais por placeholder e escopo mínimo, e testar uma chamada de leitura.
    verificacao: Uma chamada de leitura por servidor funciona e nenhuma credencial aparece em arquivo versionado.
    depende:
      - exec.instrucoes_de_projeto
  - id: exec.definir_permissoes
    titulo: Definir permissões e modo de aprovação
    descricao: Configurar quais comandos o agente executa sozinho, quais pedem aprovação e quais ficam bloqueados, começando pelo conjunto mais restritivo.
    verificacao: Uma ação fora da lista de permitidas pede aprovação e uma ação bloqueada é recusada.
    depende:
      - exec.conectar_ferramentas_mcp
  - id: val.testar_em_tarefa_real
    titulo: Validar com uma tarefa real e pequena
    descricao: Pedir uma alteração pequena com teste, revisar o diff e registrar o que o agente acertou e errou para ajustar as instruções.
    verificacao: A alteração passa nos testes, foi revisada por uma pessoa e as falhas viraram ajustes nas instruções.
    depende:
      - exec.definir_permissoes
  - id: ops.acompanhar_custo_e_uso
    titulo: Acompanhar custo e uso
    descricao: Definir um limite de gasto ou de uso, acompanhar o consumo por pessoa e revisar as instruções quando o custo sobe.
    verificacao: Existe limite configurado e um relatório periódico de consumo.
    depende:
      - val.testar_em_tarefa_real
comoFazerHoje:
  - passo: exec.instalar_e_autenticar
    variante: claude-code
    comandos:
      - curl -fsSL https://claude.ai/install.sh | bash
      - claude --version
      - claude
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.claude.com/docs/en/quickstart
  - passo: exec.instalar_e_autenticar
    variante: gemini-cli
    comandos:
      - npm install -g @google/gemini-cli
      - export GOOGLE_CLOUD_PROJECT="<ID_DO_PROJETO>"
      - gemini
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://github.com/google-gemini/gemini-cli
  - passo: exec.instalar_e_autenticar
    variante: codex
    comandos:
      - npm install -g @openai/codex
      - codex
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://github.com/openai/codex
  - passo: exec.instalar_e_autenticar
    variante: kiro-cli
    comandos:
      - curl -fsSL https://cli.kiro.dev/install | bash
      - kiro-cli --version
    versaoTestada: Kiro CLI 3.0.0 ou superior, segundo a documentação de instalação
    dataVerificacao: 2026-11-23
    fonteUrl: https://kiro.dev/docs/getting-started/installation/
  - passo: exec.instrucoes_de_projeto
    variante: claude-code
    comandos:
      - claude
      - /init
      - /context all
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.claude.com/docs/en/memory
  - passo: exec.instrucoes_de_projeto
    variante: gemini-cli
    comandos:
      - touch GEMINI.md
      - gemini
      - /memory show
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://geminicli.com/docs/cli/gemini-md/
  - passo: exec.instrucoes_de_projeto
    variante: codex
    comandos:
      - touch AGENTS.md
      - codex --ask-for-approval never "Summarize the current instructions."
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://learn.chatgpt.com/docs/agent-configuration/agents-md
  - passo: exec.instrucoes_de_projeto
    variante: kiro-ide-e-cli
    comandos:
      - mkdir -p .kiro/steering
      - touch .kiro/steering/tech.md
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://kiro.dev/docs/steering/
  - passo: exec.conectar_ferramentas_mcp
    variante: claude-code
    comandos:
      - claude mcp add --transport http <NOME_DO_SERVIDOR> <URL_DO_SERVIDOR>
      - claude mcp add --env <NOME_DA_VARIAVEL>=<VALOR_SECRETO> --transport stdio <NOME_DO_SERVIDOR> -- <COMANDO> <ARGUMENTOS>
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.claude.com/docs/en/mcp
  - passo: exec.conectar_ferramentas_mcp
    variante: kiro-ide-e-cli
    comandos:
      - "Paleta de comandos: Kiro: Open workspace MCP config (JSON)"
      - Salvar o arquivo e conferir a aba MCP servers do painel do Kiro
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://kiro.dev/docs/mcp/
  - passo: exec.definir_permissoes
    variante: claude-code
    comandos:
      - claude
      - /permissions
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://code.claude.com/docs/en/permissions
checklistRefs:
  exec.instalar_e_autenticar: amb.ambiente_reproduzivel
  exec.instrucoes_de_projeto: doc.readme_operacional
  exec.conectar_ferramentas_mcp: seg.segredos_fora_do_codigo
  exec.definir_permissoes: seg.menor_privilegio
  ops.acompanhar_custo_e_uso: custo.orcamento_alertas
armadilhas:
  - Liberar todos os comandos desde o início, o que amplia o dano de um erro ou de uma instrução maliciosa vinda de texto externo.
  - Deixar o arquivo de instruções longo e genérico, o que dilui as regras que realmente importam ao projeto.
  - Conectar muitos servidores MCP sem revisar a confiança de cada um, o que aumenta a superfície de injeção de prompt e o custo de contexto.
  - Guardar chaves de API em arquivos do repositório, o que expõe credenciais no histórico do controle de versão.
validacao:
  - O agente instalado responde em um repositório de teste e a conta usada está registrada com um administrador.
  - O arquivo de instruções do projeto é lido na sessão e o agente cita os comandos de build e teste corretamente.
  - Cada servidor MCP conectado tem escopo mínimo, uma chamada de leitura de teste e nenhuma credencial em arquivo versionado.
  - As permissões pedem aprovação para ações de escrita e bloqueiam as ações proibidas.
  - Existe limite de gasto e um relatório periódico do consumo por pessoa.
padroes:
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[agent_memory|Agent Memory]]"
categorias:
  - "[[agente_codigo|Agente de código]]"
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[prompts_agentes_repos|Prompts e agentes]]"
  - "[[registro_gateway_mcp|Registro e gateway de MCP]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
aliases:
  - Configurar agentes de código
  - Instalar Claude Code, Gemini CLI, Codex e Kiro
grupo: Configurar o ambiente
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - "[[agente_ferramentas_memoria|Agente com ferramentas e memória]]"
ferramentas:
  - "[[kiro_cli|Kiro CLI]]"
  - "[[kiro_ide|Kiro-IDE]]"
  - tabela:openai-codex
  - tabela:gemini-cli
  - "[[claude_code|Claude-Code]]"
casosDeUso:
  - "[[programacao_em_par|Programação em par]]"
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
variacoes:
  - par-agente-terminal
  - auto-dev-issues-para-pr
certificacoes:
  - "[[claude_academy_cursos_da_anthropic|Claude Academy (cursos da Anthropic)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar code agents
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
