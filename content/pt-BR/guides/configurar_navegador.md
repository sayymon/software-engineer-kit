---
id: configurar_navegador
tipo: guia-pratico
nome: Como configurar o navegador com plugins úteis
sigla: nav
descricao: "Caminho para montar um navegador de trabalho: separar perfis por contexto, ajustar privacidade, dominar as ferramentas de desenvolvedor, instalar um conjunto mínimo de extensões de desenvolvimento, segurança, produtividade, IA e acessibilidade, revisar permissões e documentar o conjunto para o time."
exemplo: Uma pessoa de engenharia cria um perfil de trabalho no Chrome, instala um bloqueador de rastreio, o gerenciador de senhas e as extensões de depuração do framework do projeto, revisa o acesso a sites de cada extensão e registra o conjunto no guia do time.
quando_usar:
  - Uma máquina nova ou uma pessoa nova precisa de um navegador pronto para depurar, pesquisar e usar ferramentas de IA com segurança.
  - O navegador acumulou extensões sem critério e precisa de uma limpeza com revisão de permissões.
quando_evitar:
  - "Quando o navegador é gerenciado pela organização e a lista de extensões é central: siga a política e peça inclusões ao administrador."
fonte_ids:
  - chrome_devtools_docs
  - firefox_devtools_docs
  - chrome_webstore_extensions
fontes:
  - id: chrome_devtools_docs
    tipo: artigo
    titulo: Chrome DevTools (Chrome for Developers)
    link: https://developer.chrome.com/docs/devtools
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: firefox_devtools_docs
    tipo: artigo
    titulo: Firefox DevTools User Docs (Firefox Source Docs)
    link: https://firefox-source-docs.mozilla.org/devtools-user/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: chrome_webstore_extensions
    tipo: artigo
    titulo: Install and manage extensions (Chrome Web Store Help)
    link: https://support.google.com/chrome_webstore/answer/2664769
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: nav_orq
    nome: Orquestração do navegador
    responsabilidade: Encadear contexto, escolha do navegador e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: nav_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: nav_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: nav_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: nav_orq_s0
    raia: nav_orq
    tipo: inicio
    rotulo: Necessidade de um navegador de trabalho configurado
    proximo:
      - para: nav_orq_c1
        condicao: ""
  - id: nav_orq_c1
    raia: nav_orq
    tipo: chamada
    rotulo: Definir tarefas, política e perfis
    proximo:
      - para: nav_orq_c2
        condicao: tarefas_definidas
    raia_chamada: nav_ctx
  - id: nav_orq_c2
    raia: nav_orq
    tipo: chamada
    rotulo: Escolher o navegador e o conjunto de extensões
    proximo:
      - para: nav_orq_c3
        condicao: chrome_devtools
      - para: nav_orq_c4
        condicao: firefox_privacidade
      - para: nav_orq_c5
        condicao: gerenciador_assinado
      - para: nav_orq_c6
        condicao: chrome_essencial
    raia_chamada: nav_stk
  - id: nav_orq_c3
    raia: nav_orq
    tipo: chamada
    rotulo: Configurar, revisar e documentar o navegador
    proximo:
      - para: nav_orq_e1
        condicao: pronta
    raia_chamada: nav_ent
  - id: nav_orq_c4
    raia: nav_orq
    tipo: chamada
    rotulo: Configurar, revisar e documentar o navegador
    proximo:
      - para: nav_orq_e2
        condicao: pronta
    raia_chamada: nav_ent
  - id: nav_orq_c5
    raia: nav_orq
    tipo: chamada
    rotulo: Configurar, revisar e documentar o navegador
    proximo:
      - para: nav_orq_e3
        condicao: pronta
    raia_chamada: nav_ent
  - id: nav_orq_c6
    raia: nav_orq
    tipo: chamada
    rotulo: Configurar, revisar e documentar o navegador
    proximo:
      - para: nav_orq_e4
        condicao: pronta
    raia_chamada: nav_ent
  - id: nav_orq_e1
    raia: nav_orq
    tipo: fim
    rotulo: Chrome configurado com DevTools e MCP
    proximo: []
    retorno: chrome_devtools
    saida:
      tipo: construir
      justificativa: Quem depura com agentes de código ganha ao conectar as ferramentas de desenvolvedor do Chrome por MCP, que dão ao agente rede, desempenho e console da mesma página.
      eixos:
        - prazo_entrega
        - time_maturidade
        - lock_in
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
      categoria: "[[extensoes_navegador|Extensões de navegador]]"
      ferramentas:
        - tabela:chrome-devtools-mcp
        - tabela:react-developer-tools
  - id: nav_orq_e2
    raia: nav_orq
    tipo: fim
    rotulo: Firefox configurado com foco em privacidade
    proximo: []
    retorno: firefox_privacidade
    saida:
      tipo: construir
      justificativa: Com privacidade como prioridade, perfis isolados, bloqueio de rastreio e um gerenciador de senhas mantêm os dados sob controle sem custo de licença.
      eixos:
        - compliance_dados
        - orcamento
        - time_maturidade
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
      categoria: "[[extensoes_navegador|Extensões de navegador]]"
      ferramentas:
        - "[[ublock_origin|uBlock Origin]]"
        - "[[bitwarden|Bitwarden]]"
  - id: nav_orq_e3
    raia: nav_orq
    tipo: fim
    rotulo: Gerenciador de senhas do time assinado
    proximo: []
    retorno: gerenciador_assinado
    saida:
      tipo: assinar
      justificativa: Credenciais compartilhadas pedem um gerenciador com cofres por equipe, controle de acesso e auditoria, e a assinatura entrega isso em dias e valida o uso antes de padronizar.
      eixos:
        - lock_in
        - compliance_dados
        - orcamento
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
      categoria: "[[senhas_segredos|Gerenciador de senhas e segredos]]"
      ferramentas:
        - "[[n_1password|1Password]]"
        - "[[bitwarden|Bitwarden]]"
  - id: nav_orq_e4
    raia: nav_orq
    tipo: fim
    rotulo: Chrome com extensões essenciais
    proximo: []
    retorno: chrome_essencial
    saida:
      tipo: construir
      justificativa: Sem exigência especial, o Chrome com poucas extensões de desenvolvimento e produtividade e permissões revisadas entrega o ambiente de trabalho com o menor custo de manutenção.
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
      categoria: "[[extensoes_navegador|Extensões de navegador]]"
      ferramentas:
        - tabela:wappalyzer
        - tabela:vimium
  - id: nav_ctx_s0
    raia: nav_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: nav_ctx_t1
        condicao: ""
  - id: nav_ctx_t1
    raia: nav_ctx
    tipo: tarefa
    rotulo: Mapear tarefas, política e perfis
    proximo:
      - para: nav_ctx_t2
        condicao: ""
    passos:
      - ctx.necessidades_e_restricoes
      - ctx.premissas_nao_funcionais
  - id: nav_ctx_t2
    raia: nav_ctx
    tipo: tarefa
    rotulo: Escolher navegador e extensões
    proximo:
      - para: nav_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_navegador_e_conjunto_minimo
  - id: nav_ctx_e1
    raia: nav_ctx
    tipo: fim
    rotulo: Tarefas e política registradas
    proximo: []
    retorno: tarefas_definidas
  - id: nav_stk_s0
    raia: nav_stk
    tipo: inicio
    rotulo: Início da escolha do navegador
    proximo:
      - para: nav_stk_g1
        condicao: ""
  - id: nav_stk_g1
    raia: nav_stk
    tipo: bifurcacao
    rotulo: Agentes com DevTools por MCP?
    proximo:
      - para: nav_stk_e1
        condicao: sim
      - para: nav_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.desenvolvimento_com_agentes_e_devtools_mcp
  - id: nav_stk_g2
    raia: nav_stk
    tipo: bifurcacao
    rotulo: Privacidade como prioridade?
    proximo:
      - para: nav_stk_e2
        condicao: sim
      - para: nav_stk_g3
        condicao: não
    eixo: compliance_dados
    pergunta: q.privacidade_e_bloqueio_de_rastreio_prioritarios
  - id: nav_stk_g3
    raia: nav_stk
    tipo: bifurcacao
    rotulo: Credenciais compartilhadas na equipe?
    proximo:
      - para: nav_stk_e3
        condicao: sim
      - para: nav_stk_e4
        condicao: não
    eixo: lock_in
    pergunta: q.equipe_com_credenciais_compartilhadas
  - id: nav_stk_e1
    raia: nav_stk
    tipo: fim
    rotulo: Chrome com DevTools e MCP
    proximo: []
    retorno: chrome_devtools
  - id: nav_stk_e2
    raia: nav_stk
    tipo: fim
    rotulo: Firefox com foco em privacidade
    proximo: []
    retorno: firefox_privacidade
  - id: nav_stk_e3
    raia: nav_stk
    tipo: fim
    rotulo: Navegador com gerenciador de senhas assinado
    proximo: []
    retorno: gerenciador_assinado
  - id: nav_stk_e4
    raia: nav_stk
    tipo: fim
    rotulo: Chrome com extensões essenciais
    proximo: []
    retorno: chrome_essencial
  - id: nav_ent_s0
    raia: nav_ent
    tipo: inicio
    rotulo: Início da configuração
    proximo:
      - para: nav_ent_t1
        condicao: ""
  - id: nav_ent_t1
    raia: nav_ent
    tipo: tarefa
    rotulo: Configurar o navegador
    proximo:
      - para: nav_ent_t2
        condicao: ""
    passos:
      - exec.abrir_devtools_e_atalhos
      - exec.instalar_extensoes_com_criterio
      - exec.separar_perfis_e_ajustar_privacidade
  - id: nav_ent_t2
    raia: nav_ent
    tipo: tarefa
    rotulo: Revisar permissões
    proximo:
      - para: nav_ent_t3
        condicao: ""
    passos:
      - val.revisar_permissoes_das_extensoes
  - id: nav_ent_t3
    raia: nav_ent
    tipo: tarefa
    rotulo: Documentar e manter
    proximo:
      - para: nav_ent_e1
        condicao: ""
    passos:
      - ent.documentar_o_conjunto_minimo
      - ops.revisar_extensoes_a_cada_trimestre
  - id: nav_ent_e1
    raia: nav_ent
    tipo: fim
    rotulo: Navegador configurado, revisado e documentado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.desenvolvimento_com_agentes_e_devtools_mcp
    pergunta: O trabalho inclui depurar com agentes de código e conectar as ferramentas de desenvolvedor do navegador por MCP?
    eixo: contexto
  - id: q.privacidade_e_bloqueio_de_rastreio_prioritarios
    pergunta: Privacidade e bloqueio de rastreio são prioridade, com perfis isolados?
    eixo: compliance_dados
  - id: q.equipe_com_credenciais_compartilhadas
    pergunta: A equipe compartilha credenciais e precisa de um gerenciador de senhas com controle de acesso?
    eixo: lock_in
objetivo: Ter um navegador com perfis separados, privacidade ajustada, ferramentas de desenvolvedor dominadas e um conjunto mínimo de extensões com permissões revisadas e documentadas.
preRequisitos:
  - "A lista de tarefas de navegador do dia a dia: depurar, pesquisar, revisar, usar ferramentas de IA."
  - A política da organização para extensões e para sincronização de dados.
  - Acesso ao gerenciador de senhas do time, quando existir.
  - Um site de teste ou projeto local para validar as ferramentas de desenvolvedor.
passos:
  - id: ctx.necessidades_e_restricoes
    titulo: Definir necessidades e restrições de o navegador
    descricao: Registrar o que a pessoa ou o time precisa fazer, os sistemas envolvidos, as regras de segurança e de dados da organização e o orçamento disponível.
    verificacao: A lista de necessidades, restrições e orçamento está escrita e foi aceita por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.necessidades_e_restricoes
  - id: prep.escolher_navegador_e_conjunto_minimo
    titulo: Escolher o navegador e o conjunto mínimo de extensões
    descricao: "Percorrer o diagrama de decisão e registrar o navegador, os perfis e a lista mínima de extensões por categoria: desenvolvimento, segurança, produtividade, IA e acessibilidade."
    verificacao: O navegador, os perfis e a lista mínima de extensões estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.abrir_devtools_e_atalhos
    titulo: Abrir as ferramentas de desenvolvedor e aprender os atalhos
    descricao: Abrir as ferramentas de desenvolvedor, percorrer os painéis de elementos, console, rede, desempenho e acessibilidade e anotar os atalhos usados no dia a dia.
    verificacao: Uma página de teste é inspecionada nos painéis de elementos, rede e console com os atalhos anotados.
    depende:
      - prep.escolher_navegador_e_conjunto_minimo
  - id: exec.instalar_extensoes_com_criterio
    titulo: Instalar as extensões do conjunto mínimo
    descricao: Instalar uma extensão por vez a partir da loja oficial, conferir a organização que a publica e conceder o menor acesso a sites possível.
    verificacao: Cada extensão instalada consta no conjunto mínimo e tem o acesso a sites restrito ao necessário.
    depende:
      - exec.abrir_devtools_e_atalhos
  - id: exec.separar_perfis_e_ajustar_privacidade
    titulo: Separar perfis e ajustar a privacidade
    descricao: Criar perfis por contexto (trabalho e pessoal), ajustar bloqueio de rastreio, cookies de terceiros e sincronização conforme a política.
    verificacao: Cada contexto tem um perfil próprio e as opções de privacidade seguem a política registrada.
    depende:
      - exec.instalar_extensoes_com_criterio
  - id: val.revisar_permissoes_das_extensoes
    titulo: Revisar as permissões das extensões
    descricao: Abrir a página de extensões, conferir o acesso a dados de sites de cada uma e remover o que excede a necessidade.
    verificacao: Nenhuma extensão tem acesso a todos os sites sem justificativa registrada.
    depende:
      - exec.separar_perfis_e_ajustar_privacidade
  - id: ent.documentar_o_conjunto_minimo
    titulo: Documentar o conjunto mínimo para o time
    descricao: Registrar no guia do time o navegador, os perfis, as extensões e o motivo de cada uma, sem dados pessoais.
    verificacao: Uma pessoa nova reproduz o conjunto seguindo apenas o guia do time.
    depende:
      - val.revisar_permissoes_das_extensoes
  - id: ops.revisar_extensoes_a_cada_trimestre
    titulo: Revisar as extensões a cada trimestre
    descricao: Agendar a revisão das extensões, removendo as sem uso e verificando mudanças de dono, de permissões e de política.
    verificacao: Existe uma revisão trimestral agendada com responsável e uma lista atual de extensões aprovadas.
    depende:
      - ent.documentar_o_conjunto_minimo
comoFazerHoje:
  - passo: exec.abrir_devtools_e_atalhos
    variante: chrome
    comandos:
      - Abrir o menu More, Extensions e Manage extensions para listar as extensões
      - Abrir as ferramentas de desenvolvedor pelo menu do Chrome e percorrer Elements, Console, Network e Performance
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://developer.chrome.com/docs/devtools
  - passo: exec.abrir_devtools_e_atalhos
    variante: firefox
    comandos:
      - F12 ou Ctrl+Shift+I (Windows e Linux) ou Cmd+Opt+I (macOS)
      - Percorrer Page Inspector, Web Console, Network Monitor, Performance e Accessibility inspector
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://firefox-source-docs.mozilla.org/devtools-user/
  - passo: exec.instalar_extensoes_com_criterio
    variante: chrome
    comandos:
      - Abrir a Chrome Web Store e selecionar a extensão
      - Selecionar Add to Chrome e aprovar apenas as permissões necessárias
      - More, Extensions, Manage extensions, Details, ajustar Site access para On specific sites
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://support.google.com/chrome_webstore/answer/2664769
  - passo: exec.separar_perfis_e_ajustar_privacidade
    variante: firefox
    comandos:
      - Abrir about:addons para revisar as extensões
      - Abrir about:debugging para conferir os complementos em execução
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://firefox-source-docs.mozilla.org/devtools-user/
checklistRefs:
  exec.instalar_extensoes_com_criterio: seg.menor_privilegio
  val.revisar_permissoes_das_extensoes: seg.menor_privilegio
armadilhas:
  - Instalar extensões de publicadores desconhecidos com acesso a todos os sites, o que expõe sessões, senhas e dados de trabalho.
  - Misturar contexto pessoal e de trabalho no mesmo perfil, o que mistura sincronização, histórico e credenciais.
  - Manter extensões sem uso, o que amplia a superfície de risco e a lentidão do navegador.
  - Conectar o navegador a agentes sem revisar o que a sessão expõe, o que pode vazar dados de páginas autenticadas.
validacao:
  - Cada contexto de trabalho tem um perfil próprio com as opções de privacidade registradas.
  - Cada extensão instalada consta no conjunto mínimo e tem o acesso a sites restrito ao necessário.
  - Uma página de teste foi inspecionada nos painéis de elementos, rede e console.
  - Nenhuma extensão tem acesso a todos os sites sem justificativa registrada.
  - Uma pessoa nova reproduz o conjunto seguindo o guia do time.
padroes:
  - "[[guardrails_llm|Guardrails]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
categorias:
  - "[[extensoes_navegador|Extensões de navegador]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[mcp_navegador_testes|MCP de navegador e testes]]"
  - "[[agentes_computador_navegador|Agentes que usam computador e navegador]]"
  - "[[testes_qa|Testes e QA]]"
aliases:
  - Configurar o navegador para desenvolvimento
  - Extensões úteis para engenheiros
grupo: Configurar o ambiente
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - tabela:chrome-devtools-mcp
  - tabela:react-developer-tools
  - "[[ublock_origin|uBlock Origin]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[n_1password|1Password]]"
  - tabela:wappalyzer
  - tabela:vimium
casosDeUso:
  - "[[privacidade_e_seguranca_digital_pessoa_fisica|Privacidade e segurança digital (pessoa física)]]"
  - "[[trabalho_remoto_pessoa_fisica|Trabalho remoto (pessoa física)]]"
variacoes:
  - priv-navegador-celular
  - priv-contas-senhas
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar o navegador com plugins úteis
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
