---
id: criar_cli
tipo: guia-pratico
nome: Como criar uma CLI
sigla: cli
descricao: "Caminho para entregar uma ferramenta de linha de comando: desenhar comandos e saídas, escolher entre um script curto, uma CLI distribuível ou uma stack de apoio, e publicar com testes, documentação e versionamento."
exemplo: "Um time de plataforma quer padronizar a criação de ambientes: define comandos e códigos de saída, escolhe uma CLI distribuível com testes de comandos e publica a instalação com documentação e histórico de mudanças."
quando_usar:
  - Uma tarefa repetida por pessoas ou por pipelines pede automação com entradas, saídas e códigos de saída previsíveis.
  - Uma coleção de scripts soltos precisa de um ponto de entrada único, ajuda embutida e versionamento.
quando_evitar:
  - Quando o fluxo é uma integração entre serviços já suportados por uma plataforma de automação (veja o guia de automação no-code).
fonte_ids:
  - clig_dev
  - posix_utility_conventions
fontes:
  - id: clig_dev
    tipo: artigo
    titulo: Command Line Interface Guidelines
    link: https://clig.dev/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: posix_utility_conventions
    tipo: artigo
    titulo: Utility Conventions (The Open Group Base Specifications)
    link: https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: cli_orq
    nome: Orquestração da CLI
    responsabilidade: Encadear contexto, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: cli_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a tarefa e fixar os critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: cli_stk
    nome: Stack por contexto
    responsabilidade: Escolher entre script curto, CLI distribuível e stack de apoio por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: cli_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: cli_orq_s0
    raia: cli_orq
    tipo: inicio
    rotulo: Necessidade de automatizar uma tarefa por linha de comando
    proximo:
      - para: cli_orq_c1
        condicao: ""
  - id: cli_orq_c1
    raia: cli_orq
    tipo: chamada
    rotulo: Definir a tarefa e o público
    proximo:
      - para: cli_orq_c2
        condicao: tarefa_definida
    raia_chamada: cli_ctx
  - id: cli_orq_c2
    raia: cli_orq
    tipo: chamada
    rotulo: Escolher o formato e a stack
    proximo:
      - para: cli_orq_c5
        condicao: script_curto
      - para: cli_orq_c3
        condicao: dados_relacionais
      - para: cli_orq_c4
        condicao: fluxo_assistido
      - para: cli_orq_c6
        condicao: cli_distribuivel
    raia_chamada: cli_stk
  - id: cli_orq_c3
    raia: cli_orq
    tipo: chamada
    rotulo: Implementar, verificar e distribuir a CLI
    proximo:
      - para: cli_orq_e1
        condicao: pronta
    raia_chamada: cli_ent
  - id: cli_orq_c4
    raia: cli_orq
    tipo: chamada
    rotulo: Implementar, verificar e distribuir a CLI
    proximo:
      - para: cli_orq_e2
        condicao: pronta
    raia_chamada: cli_ent
  - id: cli_orq_c5
    raia: cli_orq
    tipo: chamada
    rotulo: Implementar, verificar e distribuir a CLI
    proximo:
      - para: cli_orq_e3
        condicao: pronta
    raia_chamada: cli_ent
  - id: cli_orq_c6
    raia: cli_orq
    tipo: chamada
    rotulo: Implementar, verificar e distribuir a CLI
    proximo:
      - para: cli_orq_e4
        condicao: pronta
    raia_chamada: cli_ent
  - id: cli_orq_e1
    raia: cli_orq
    tipo: fim
    rotulo: CLI entregue sobre a stack de dados relacionais
    proximo: []
    retorno: dados_relacionais
    saida:
      tipo: stack
      justificativa: Dados locais ou de serviço com consultas relacionais reaproveitam práticas de modelagem, migração e teste de banco, o que mantém baixos o risco e a dependência de fornecedor.
      eixos:
        - time_maturidade
        - lock_in
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
      stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - id: cli_orq_e2
    raia: cli_orq
    tipo: fim
    rotulo: CLI entregue sobre o fluxo de desenvolvimento assistido por IA
    proximo: []
    retorno: fluxo_assistido
    saida:
      tipo: stack
      justificativa: Um agente de código com revisão humana acelera a primeira versão e os testes de comandos, e o time mantém a propriedade total do código entregue.
      eixos:
        - time_maturidade
        - prazo_entrega
        - lock_in
      objetivo: validar_hipotese
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 4
          custo_total: 4
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
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - id: cli_orq_e3
    raia: cli_orq
    tipo: fim
    rotulo: Script curto entregue com utilitários de terminal
    proximo: []
    retorno: script_curto
    saida:
      tipo: construir
      justificativa: Uma tarefa interna e curta se resolve com um script e utilitários de terminal, o que custa pouco, entrega no mesmo dia e não cria nada novo para distribuir.
      eixos:
        - prazo_entrega
        - orcamento
        - lock_in
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 5
          custo_total: 5
          dependencia_fornecedor: 5
          risco: 4
        comprar:
          diferenciacao: 1
          tempo_ate_valor: 2
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[terminal_produtividade_local|Terminal e produtividade local]]"
      ferramentas:
        - tabela:jq
        - tabela:fzf
        - tabela:ripgrep
  - id: cli_orq_e4
    raia: cli_orq
    tipo: fim
    rotulo: CLI própria entregue com empacotamento e versionamento
    proximo: []
    retorno: cli_distribuivel
    saida:
      tipo: construir
      justificativa: A tarefa recorrente de muitas pessoas justifica uma CLI própria, e o controle do contrato de comandos, da distribuição e das versões é o que diferencia a ferramenta.
      eixos:
        - escala_volume
        - lock_in
        - time_maturidade
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 5
          risco: 3
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 3
          custo_total: 2
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      categoria: "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
      ferramentas:
        - "[[uv|uv]]"
        - tabela:pnpm
        - tabela:deno
  - id: cli_ctx_s0
    raia: cli_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: cli_ctx_t1
        condicao: ""
  - id: cli_ctx_t1
    raia: cli_ctx
    tipo: tarefa
    rotulo: Descrever a tarefa e desenhar os comandos
    proximo:
      - para: cli_ctx_t2
        condicao: ""
    passos:
      - ctx.tarefa_e_usuarios
      - prep.desenhar_comandos
  - id: cli_ctx_t2
    raia: cli_ctx
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: cli_ctx_e1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: cli_ctx_e1
    raia: cli_ctx
    tipo: fim
    rotulo: Tarefa e comandos acordados
    proximo: []
    retorno: tarefa_definida
  - id: cli_stk_s0
    raia: cli_stk
    tipo: inicio
    rotulo: Início da escolha do formato
    proximo:
      - para: cli_stk_g1
        condicao: ""
  - id: cli_stk_g1
    raia: cli_stk
    tipo: bifurcacao
    rotulo: Script curto e prazo curto?
    proximo:
      - para: cli_stk_e1
        condicao: sim
      - para: cli_stk_g2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.script_curto_uso_interno
  - id: cli_stk_g2
    raia: cli_stk
    tipo: bifurcacao
    rotulo: Dados relacionais?
    proximo:
      - para: cli_stk_e2
        condicao: sim
      - para: cli_stk_g3
        condicao: não
    eixo: contexto
    pergunta: q.dados_relacionais_locais
  - id: cli_stk_g3
    raia: cli_stk
    tipo: bifurcacao
    rotulo: Agente de código com revisão?
    proximo:
      - para: cli_stk_e3
        condicao: sim
      - para: cli_stk_e4
        condicao: não
    eixo: time_maturidade
    pergunta: q.agente_com_revisao_humana
  - id: cli_stk_e1
    raia: cli_stk
    tipo: fim
    rotulo: Script curto
    proximo: []
    retorno: script_curto
  - id: cli_stk_e2
    raia: cli_stk
    tipo: fim
    rotulo: Stack de dados relacionais
    proximo: []
    retorno: dados_relacionais
  - id: cli_stk_e3
    raia: cli_stk
    tipo: fim
    rotulo: Fluxo assistido por IA
    proximo: []
    retorno: fluxo_assistido
  - id: cli_stk_e4
    raia: cli_stk
    tipo: fim
    rotulo: CLI distribuível própria
    proximo: []
    retorno: cli_distribuivel
  - id: cli_ent_s0
    raia: cli_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: cli_ent_t1
        condicao: ""
  - id: cli_ent_t1
    raia: cli_ent
    tipo: tarefa
    rotulo: Implementar os comandos
    proximo:
      - para: cli_ent_t2
        condicao: ""
    passos:
      - exec.implementar_comandos
      - exec.erros_e_mensagens
  - id: cli_ent_t2
    raia: cli_ent
    tipo: tarefa
    rotulo: Validar comandos e ambientes
    proximo:
      - para: cli_ent_t3
        condicao: ""
    passos:
      - val.testes_de_comandos
      - val.ambientes_alvo
  - id: cli_ent_t3
    raia: cli_ent
    tipo: tarefa
    rotulo: Distribuir e acompanhar
    proximo:
      - para: cli_ent_e1
        condicao: ""
    passos:
      - ent.empacotar_e_documentar
      - ops.acompanhar_uso_e_versoes
  - id: cli_ent_e1
    raia: cli_ent
    tipo: fim
    rotulo: CLI entregue e versionada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.script_curto_uso_interno
    pergunta: A tarefa cabe em um script curto de uso interno e o prazo é curto?
    eixo: prazo_entrega
  - id: q.dados_relacionais_locais
    pergunta: A CLI guarda dados locais com consultas relacionais ou sincroniza com um serviço relacional?
    eixo: contexto
  - id: q.agente_com_revisao_humana
    pergunta: O time desenvolve com um agente de código e revisão humana obrigatória?
    eixo: time_maturidade
objetivo: Entregar uma CLI previsível, documentada e testada, no formato (script curto, CLI distribuível ou stack de apoio) que atende à frequência de uso e ao público.
preRequisitos:
  - Descrição da tarefa, de quem a executa e da frequência de uso.
  - Ambientes onde a CLI vai rodar.
  - Local de distribuição (repositório de pacotes, binário ou imagem).
  - Acesso a um repositório e a um pipeline de integração contínua.
passos:
  - id: ctx.tarefa_e_usuarios
    titulo: Descrever a tarefa e quem a executa
    descricao: Escrever a tarefa em uma frase, listar as pessoas ou pipelines que a executam e a frequência de uso.
    verificacao: Há uma frase que descreve a tarefa, a pessoa ou o pipeline que a executa e a frequência de uso.
    depende: []
  - id: prep.desenhar_comandos
    titulo: Desenhar comandos, argumentos e saídas
    descricao: Definir nomes de comandos, opções, formato de saída para pessoas e para máquinas e códigos de saída.
    verificacao: A ajuda de cada comando descreve uso e exemplos, e os códigos de saída estão documentados.
    depende:
      - ctx.tarefa_e_usuarios
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.tarefa_e_usuarios
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.implementar_comandos
    titulo: Implementar os comandos pelo fluxo principal
    descricao: Construir o comando de maior valor primeiro, lendo entrada padrão e arquivos, com saída legível por pessoas e por máquinas.
    verificacao: O fluxo principal roda de ponta a ponta com a saída descrita no desenho dos comandos.
    depende:
      - prep.desenhar_comandos
      - prep.pontuar_opcoes_matriz
  - id: exec.erros_e_mensagens
    titulo: Tratar erros com mensagens acionáveis
    descricao: Detectar entradas inválidas e falhas de ambiente, mostrando a causa e o próximo passo, e encerrar com código de saída adequado.
    verificacao: Cada erro previsto mostra a causa e o próximo passo e termina com código de saída diferente de sucesso.
    depende:
      - exec.implementar_comandos
  - id: val.testes_de_comandos
    titulo: Testar comandos com entradas reais e inválidas
    descricao: Automatizar testes do fluxo principal, dos erros previstos e da leitura por entrada padrão e por arquivos.
    verificacao: Os testes automatizados cobrem o fluxo principal e os erros previstos e passam no pipeline de integração contínua.
    depende:
      - exec.erros_e_mensagens
  - id: val.ambientes_alvo
    titulo: Verificar a execução nos ambientes-alvo
    descricao: Instalar e executar a CLI em cada ambiente-alvo a partir de uma instalação limpa.
    verificacao: A CLI roda em cada ambiente-alvo registrado a partir de uma instalação limpa.
    depende:
      - exec.erros_e_mensagens
  - id: ent.empacotar_e_documentar
    titulo: Empacotar, documentar e versionar
    descricao: Gerar o pacote ou binário, publicar a documentação de uso e o histórico de mudanças e declarar a política de versão.
    verificacao: Uma pessoa nova instala a CLI seguindo apenas a documentação e executa o primeiro comando com sucesso.
    depende:
      - val.testes_de_comandos
      - val.ambientes_alvo
  - id: ops.acompanhar_uso_e_versoes
    titulo: Acompanhar o uso e planejar versões
    descricao: Coletar feedback e relatos de falha pelo canal indicado na ajuda e planejar a cadência de versões.
    verificacao: Há um canal de feedback citado na ajuda e uma data para a primeira revisão do histórico de relatos.
    depende:
      - ent.empacotar_e_documentar
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Misturar mensagens para pessoas e dados para máquinas na mesma saída, o que quebra o uso em pipelines.
  - Encerrar com sucesso quando houve falha, o que esconde erros de quem chama a CLI.
  - Mudar nomes de comandos e opções sem política de versão, o que quebra os scripts de quem já usa.
  - Distribuir sem testar uma instalação limpa, o que revela dependências ocultas só para quem instala.
validacao:
  - A ajuda de cada comando descreve uso e exemplos, e os códigos de saída estão documentados.
  - Os testes automatizados cobrem o fluxo principal e os erros previstos no pipeline.
  - A CLI roda em cada ambiente-alvo a partir de uma instalação limpa.
  - Uma pessoa nova instala e executa o primeiro comando usando só a documentação.
  - O histórico de mudanças e a política de versão estão publicados.
padroes:
  - "[[command|Command (GoF)]]"
  - "[[strategy|Strategy (GoF)]]"
  - "[[template_method|Template Method (GoF)]]"
  - "[[facade|Facade (GoF)]]"
categorias:
  - "[[terminal_produtividade_local|Terminal e produtividade local]]"
  - "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[agente_codigo|Agente de código]]"
aliases:
  - Criar uma CLI
  - Criar uma ferramenta de linha de comando
grupo: Construir software
stacks:
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - tabela:jq
  - tabela:fzf
  - tabela:ripgrep
  - "[[uv|uv]]"
  - tabela:pnpm
  - tabela:deno
casosDeUso:
  - "[[automacao_de_desenvolvimento|Automação de desenvolvimento]]"
  - "[[programacao_em_par|Programação em par]]"
variacoes:
  - auto-dev-pipeline-ia
  - par-agente-terminal
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar uma CLI
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
