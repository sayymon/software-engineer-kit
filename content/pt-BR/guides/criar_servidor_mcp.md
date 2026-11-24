---
id: criar_servidor_mcp
tipo: guia-pratico
nome: Como criar um servidor MCP
sigla: mcp
descricao: "Caminho para disponibilizar ferramentas e dados a agentes pelo protocolo MCP: verificar se já existe um servidor mantido, decidir entre usar um pronto, passar por um gateway ou construir, escolher a stack de hospedagem e publicar com autenticação, descrições claras e testes."
exemplo: "Uma empresa quer que seus agentes consultem o catálogo de produtos: confere o registro de servidores, não encontra um que cubra o sistema interno, constrói um servidor com três ferramentas de leitura e o publica com autenticação."
quando_usar:
  - Agentes e aplicações diferentes precisam usar as mesmas ferramentas ou fontes de dados por um contrato único.
  - Um sistema interno precisa ser exposto a assistentes com autenticação, limites e registro de uso.
quando_evitar:
  - Quando apenas um agente usa a ferramenta, e uma função local dentro dele resolve com menos peças.
fonte_ids:
  - mcp_spec
  - owasp_llm_top10
fontes:
  - id: mcp_spec
    tipo: artigo
    titulo: Model Context Protocol Specification
    link: https://modelcontextprotocol.io/specification/2025-06-18
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: owasp_llm_top10
    tipo: artigo
    titulo: OWASP Top 10 for Large Language Model Applications
    link: https://owasp.org/www-project-top-10-for-large-language-model-applications/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: mcp_orq
    nome: Orquestração do servidor MCP
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: mcp_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: mcp_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: mcp_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: mcp_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: mcp_orq_s0
    raia: mcp_orq
    tipo: inicio
    rotulo: Necessidade de expor ferramentas a agentes por MCP
    proximo:
      - para: mcp_orq_c1
        condicao: ""
  - id: mcp_orq_c1
    raia: mcp_orq
    tipo: chamada
    rotulo: Levantar capacidades, consumidores e riscos
    proximo:
      - para: mcp_orq_c2
        condicao: capacidades_definidas
    raia_chamada: mcp_ctx
  - id: mcp_orq_c2
    raia: mcp_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: mcp_orq_c6
        condicao: assinar_pronto
      - para: mcp_orq_c7
        condicao: comprar_gateway
      - para: mcp_orq_c3
        condicao: construir
    raia_chamada: mcp_abd
  - id: mcp_orq_c3
    raia: mcp_orq
    tipo: chamada
    rotulo: Escolher a stack de hospedagem
    proximo:
      - para: mcp_orq_c5
        condicao: api_serverless
      - para: mcp_orq_c4
        condicao: servidor_mcp
    raia_chamada: mcp_stk
  - id: mcp_orq_c4
    raia: mcp_orq
    tipo: chamada
    rotulo: Implementar, testar e publicar o servidor
    proximo:
      - para: mcp_orq_e1
        condicao: pronta
    raia_chamada: mcp_ent
  - id: mcp_orq_c5
    raia: mcp_orq
    tipo: chamada
    rotulo: Implementar, testar e publicar o servidor
    proximo:
      - para: mcp_orq_e2
        condicao: pronta
    raia_chamada: mcp_ent
  - id: mcp_orq_c6
    raia: mcp_orq
    tipo: chamada
    rotulo: Implementar, testar e publicar o servidor
    proximo:
      - para: mcp_orq_e3
        condicao: pronta
    raia_chamada: mcp_ent
  - id: mcp_orq_c7
    raia: mcp_orq
    tipo: chamada
    rotulo: Implementar, testar e publicar o servidor
    proximo:
      - para: mcp_orq_e4
        condicao: pronta
    raia_chamada: mcp_ent
  - id: mcp_orq_e1
    raia: mcp_orq
    tipo: fim
    rotulo: Servidor publicado sobre a stack de servidor MCP
    proximo: []
    retorno: servidor_mcp
    saida:
      tipo: stack
      justificativa: Um servidor próprio com ferramentas pequenas, entradas validadas e autenticação mantém o controle dos dados e das ações, e a stack reúne o necessário para testar e publicar.
      eixos:
        - compliance_dados
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
      stack: "[[servidor_mcp|Servidor MCP]]"
  - id: mcp_orq_e2
    raia: mcp_orq
    tipo: fim
    rotulo: Servidor remoto publicado sobre a stack de API serverless e edge
    proximo: []
    retorno: api_serverless
    saida:
      tipo: stack
      justificativa: Um servidor remoto com muitos clientes e consumo variável se beneficia de execução por demanda próxima ao usuário, que reduz o custo ocioso e escala sem operação de servidores.
      eixos:
        - escala_volume
        - latencia
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
      stack: "[[api_serverless_edge|API serverless e edge]]"
  - id: mcp_orq_e3
    raia: mcp_orq
    tipo: fim
    rotulo: Servidor existente adotado a partir de um registro
    proximo: []
    retorno: assinar_pronto
    saida:
      tipo: assinar
      justificativa: Quando um servidor mantido cobre o sistema, adotá-lo entrega as ferramentas em horas, e a revisão de origem, permissões e atualizações substitui o desenvolvimento.
      eixos:
        - prazo_entrega
        - orcamento
        - lock_in
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
      categoria: "[[registro_gateway_mcp|Registro e gateway de MCP]]"
      ferramentas:
        - "[[smithery|Smithery]]"
        - "[[mcp_registry|MCP Registry]]"
        - tabela:docker-mcp-catalog
  - id: mcp_orq_e4
    raia: mcp_orq
    tipo: fim
    rotulo: Servidores publicados atrás de um gateway comercial
    proximo: []
    retorno: comprar_gateway
    saida:
      tipo: comprar
      justificativa: Com muitos servidores e equipes, um gateway comercial centraliza autenticação, política e registro de uso, e retira da equipe a construção desses controles transversais.
      eixos:
        - compliance_dados
        - lock_in
        - time_maturidade
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
      categoria: "[[registro_gateway_mcp|Registro e gateway de MCP]]"
      ferramentas:
        - "[[kong_ai_gateway|Kong AI Gateway]]"
        - tabela:agentcore-gateway
        - tabela:portkey
  - id: mcp_ctx_s0
    raia: mcp_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: mcp_ctx_t1
        condicao: ""
  - id: mcp_ctx_t1
    raia: mcp_ctx
    tipo: tarefa
    rotulo: Levantar capacidades e consumidores
    proximo:
      - para: mcp_ctx_t2
        condicao: ""
    passos:
      - ctx.capacidades_e_consumidores
      - ctx.riscos_e_permissoes
  - id: mcp_ctx_t2
    raia: mcp_ctx
    tipo: tarefa
    rotulo: Procurar o que já existe
    proximo:
      - para: mcp_ctx_e1
        condicao: ""
    passos:
      - prep.procurar_servidor_existente
  - id: mcp_ctx_e1
    raia: mcp_ctx
    tipo: fim
    rotulo: Capacidades e consumidores acordados
    proximo: []
    retorno: capacidades_definidas
  - id: mcp_abd_s0
    raia: mcp_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: mcp_abd_t1
        condicao: ""
  - id: mcp_abd_t1
    raia: mcp_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: mcp_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: mcp_abd_g1
    raia: mcp_abd
    tipo: bifurcacao
    rotulo: Servidor mantido cobre o caso?
    proximo:
      - para: mcp_abd_e1
        condicao: sim
      - para: mcp_abd_g2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.servidor_mantido_cobre_o_caso
  - id: mcp_abd_g2
    raia: mcp_abd
    tipo: bifurcacao
    rotulo: Ponto único de política?
    proximo:
      - para: mcp_abd_e2
        condicao: sim
      - para: mcp_abd_e3
        condicao: não
    eixo: compliance_dados
    pergunta: q.muitos_servidores_politica_unica
  - id: mcp_abd_e1
    raia: mcp_abd
    tipo: fim
    rotulo: Servidor existente adotado
    proximo: []
    retorno: assinar_pronto
  - id: mcp_abd_e2
    raia: mcp_abd
    tipo: fim
    rotulo: Servidores publicados atrás de um gateway
    proximo: []
    retorno: comprar_gateway
  - id: mcp_abd_e3
    raia: mcp_abd
    tipo: fim
    rotulo: Construir o servidor
    proximo: []
    retorno: construir
  - id: mcp_stk_s0
    raia: mcp_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: mcp_stk_g1
        condicao: ""
  - id: mcp_stk_g1
    raia: mcp_stk
    tipo: bifurcacao
    rotulo: Remoto com escala por demanda?
    proximo:
      - para: mcp_stk_e1
        condicao: sim
      - para: mcp_stk_e2
        condicao: não
    eixo: latencia
    pergunta: q.remoto_com_escala_por_demanda
  - id: mcp_stk_e1
    raia: mcp_stk
    tipo: fim
    rotulo: Stack de API serverless e edge
    proximo: []
    retorno: api_serverless
  - id: mcp_stk_e2
    raia: mcp_stk
    tipo: fim
    rotulo: Stack de servidor MCP
    proximo: []
    retorno: servidor_mcp
  - id: mcp_ent_s0
    raia: mcp_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: mcp_ent_t1
        condicao: ""
  - id: mcp_ent_t1
    raia: mcp_ent
    tipo: tarefa
    rotulo: Implementar as ferramentas e a autenticação
    proximo:
      - para: mcp_ent_t2
        condicao: ""
    passos:
      - exec.ferramentas_com_contrato
      - exec.autenticacao_e_limites
  - id: mcp_ent_t2
    raia: mcp_ent
    tipo: tarefa
    rotulo: Testar com clientes reais
    proximo:
      - para: mcp_ent_t3
        condicao: ""
    passos:
      - val.testar_com_clientes_e_inspetor
  - id: mcp_ent_t3
    raia: mcp_ent
    tipo: tarefa
    rotulo: Publicar e operar
    proximo:
      - para: mcp_ent_e1
        condicao: ""
    passos:
      - ent.publicar_e_registrar
      - ops.versionar_e_monitorar
  - id: mcp_ent_e1
    raia: mcp_ent
    tipo: fim
    rotulo: Servidor publicado e documentado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.servidor_mantido_cobre_o_caso
    pergunta: Existe um servidor mantido, com fonte confiável, que cobre o sistema e as ações necessárias?
    eixo: prazo_entrega
  - id: q.muitos_servidores_politica_unica
    pergunta: Vários servidores de equipes diferentes precisam de um ponto único de política, autenticação e registro de uso?
    eixo: compliance_dados
  - id: q.remoto_com_escala_por_demanda
    pergunta: O servidor será remoto, com muitos clientes simultâneos e consumo que varia ao longo do dia?
    eixo: latencia
objetivo: Publicar um servidor MCP com ferramentas bem descritas, entradas validadas e autenticação, ou adotar um servidor existente quando ele cobre o caso, na abordagem que equilibra prazo, controle e custo de manutenção.
preRequisitos:
  - Lista das capacidades a expor, separando leitura de escrita.
  - Sistema de origem com API estável e um dono responsável.
  - Forma de autenticação e de autorização por usuário ou por aplicação.
  - Premissas de volume, dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.capacidades_e_consumidores
    titulo: Listar as capacidades e os consumidores do servidor
    descricao: Descrever cada ferramenta ou recurso a expor, quem vai consumi-lo e se a operação é de leitura ou de escrita.
    verificacao: Cada capacidade tem consumidor, tipo de operação e dono do sistema de origem registrados.
    depende: []
  - id: ctx.riscos_e_permissoes
    titulo: Mapear riscos e permissões por capacidade
    descricao: Para cada capacidade, registrar os dados envolvidos, o dano de um uso indevido e a permissão mínima necessária.
    verificacao: Cada capacidade tem nível de risco e permissão mínima, e as de escrita têm regra de aprovação.
    depende:
      - ctx.capacidades_e_consumidores
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.riscos_e_permissoes
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.procurar_servidor_existente
    titulo: Procurar servidores existentes e avaliar a origem
    descricao: Consultar registros e catálogos por servidores que cubram o sistema e avaliar mantenedor, atividade, permissões e licença.
    verificacao: A busca está registrada com os candidatos, e cada um tem a origem avaliada ou o motivo da recusa.
    depende:
      - ctx.riscos_e_permissoes
  - id: exec.ferramentas_com_contrato
    titulo: Implementar ferramentas pequenas com contrato claro
    descricao: Implementar cada ferramenta com nome, descrição para o modelo, esquema de entrada validado e saída enxuta e estruturada.
    verificacao: Cada ferramenta tem descrição, esquema validado e saída estruturada, e entradas inválidas retornam erro claro.
    depende:
      - prep.procurar_servidor_existente
      - prep.pontuar_opcoes_matriz
  - id: exec.autenticacao_e_limites
    titulo: Aplicar autenticação, autorização e limites de uso
    descricao: Autenticar quem chama, autorizar por capacidade, aplicar limites de taxa e registrar cada chamada sem guardar segredos.
    verificacao: Uma chamada sem credencial é recusada, uma chamada sem permissão é negada e os limites são acionados no teste de carga.
    depende:
      - exec.ferramentas_com_contrato
  - id: val.testar_com_clientes_e_inspetor
    titulo: Testar com um inspetor e com clientes reais
    descricao: Exercitar cada ferramenta em um inspetor do protocolo e em ao menos dois clientes de agentes, incluindo entradas inválidas e maliciosas.
    verificacao: Todas as ferramentas respondem corretamente nos clientes testados e entradas maliciosas não executam ações fora do escopo.
    depende:
      - exec.autenticacao_e_limites
  - id: ent.publicar_e_registrar
    titulo: Publicar o servidor e registrar a documentação
    descricao: Publicar o servidor no ambiente escolhido, documentar as ferramentas e o modo de autenticação e, quando fizer sentido, registrá-lo em um catálogo.
    verificacao: A documentação permite que um novo consumidor conecte o servidor sem ajuda e o endereço de produção responde.
    depende:
      - val.testar_com_clientes_e_inspetor
  - id: ops.versionar_e_monitorar
    titulo: Versionar o contrato e monitorar o uso
    descricao: Versionar mudanças de ferramentas com aviso aos consumidores e acompanhar chamadas, erros, latência e uso por cliente.
    verificacao: O painel mostra chamadas, erros e latência por ferramenta, e mudanças incompatíveis seguem um processo de aviso.
    depende:
      - ent.publicar_e_registrar
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Expor muitas ferramentas amplas em um só servidor, o que confunde o modelo na escolha e amplia o dano de um erro.
  - Escrever descrições vagas, o que leva o modelo a chamar a ferramenta errada ou com entradas inadequadas.
  - Confiar em servidores de terceiros sem avaliar a origem, as permissões e o processo de atualização.
  - Guardar segredos em respostas ou em registros, o que expõe credenciais a agentes e a pessoas sem acesso.
validacao:
  - Cada ferramenta tem descrição, esquema de entrada validado e saída estruturada.
  - Chamadas sem credencial são recusadas e chamadas sem permissão são negadas.
  - O servidor funciona em um inspetor do protocolo e em ao menos dois clientes de agentes.
  - Entradas maliciosas do conjunto de testes não executam ações fora do escopo.
  - A documentação permite conectar um novo consumidor sem ajuda e o painel mostra uso, erros e latência.
padroes:
  - "[[tool_use|Tool Use (padrão)]]"
  - "[[guardrails_llm|Guardrails]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
categorias:
  - "[[registro_gateway_mcp|Registro e gateway de MCP]]"
  - "[[mcp_integracoes|MCP e integrações]]"
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[serverless_edge|Serverless e edge]]"
  - "[[autenticacao_autorizacao_libs|Autenticação e autorização]]"
  - "[[guardrails_seguranca_llm|Guardrails e segurança de LLM]]"
aliases:
  - Criar um servidor MCP
  - Expor ferramentas por MCP
grupo: IA aplicada
stacks:
  - "[[servidor_mcp|Servidor MCP]]"
  - "[[api_serverless_edge|API serverless e edge]]"
ferramentas:
  - "[[smithery|Smithery]]"
  - "[[mcp_registry|MCP Registry]]"
  - tabela:docker-mcp-catalog
  - "[[kong_ai_gateway|Kong AI Gateway]]"
  - tabela:agentcore-gateway
  - tabela:portkey
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[construcao_de_agentes|Construção de agentes]]"
variacoes:
  - api-ferramentas-mcp
  - agente-operacoes-internas
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um servidor MCP
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
