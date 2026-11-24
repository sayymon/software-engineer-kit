---
id: criar_api
tipo: guia-pratico
nome: Como criar uma API
sigla: api
descricao: "Caminho para expor capacidades por uma API: fixar o contrato com os consumidores, escolher entre assinar um backend, comprar um gateway ou construir sobre uma stack, e entregar com testes, documentação e observabilidade."
exemplo: "Uma equipe precisa expor pedidos e pagamentos para um aplicativo e para parceiros: define o contrato, escolhe a stack transacional com eventos e publica a API com limites por consumidor."
quando_usar:
  - Uma aplicação própria, um parceiro ou uma automação precisa consumir capacidades por HTTP.
  - É preciso trocar acoplamento direto ao banco ou a arquivos por um contrato versionado.
quando_evitar:
  - Quando a necessidade é só uma integração pontual entre dois sistemas já suportados por uma plataforma de automação (veja o guia de integração com API de terceiros).
fonte_ids:
  - openapi_spec
  - rfc_9457_problem_details
fontes:
  - id: openapi_spec
    tipo: artigo
    titulo: OpenAPI Specification (OpenAPI Initiative)
    link: https://spec.openapis.org/oas/latest.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: rfc_9457_problem_details
    tipo: artigo
    titulo: "RFC 9457: Problem Details for HTTP APIs (IETF)"
    link: https://www.rfc-editor.org/rfc/rfc9457.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: api_orq
    nome: Orquestração da API
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: api_ctx
    nome: Contexto e contrato
    responsabilidade: Entender os consumidores e fixar o contrato antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: api_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: api_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack quando a abordagem é construir.
    cor: "#009E73"
    orquestradora: false
  - id: api_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar a API na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: api_orq_s0
    raia: api_orq
    tipo: inicio
    rotulo: Necessidade de expor capacidades por uma API
    proximo:
      - para: api_orq_c1
        condicao: ""
  - id: api_orq_c1
    raia: api_orq
    tipo: chamada
    rotulo: Definir consumidores e contrato
    proximo:
      - para: api_orq_c2
        condicao: contrato_definido
    raia_chamada: api_ctx
  - id: api_orq_c2
    raia: api_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: api_orq_c7
        condicao: assinar_baas
      - para: api_orq_c8
        condicao: comprar_gateway
      - para: api_orq_c3
        condicao: construir
    raia_chamada: api_abd
  - id: api_orq_c3
    raia: api_orq
    tipo: chamada
    rotulo: Escolher a stack por contexto
    proximo:
      - para: api_orq_c4
        condicao: serverless_edge
      - para: api_orq_c5
        condicao: transacional_eventos
      - para: api_orq_c6
        condicao: monolito_relacional
    raia_chamada: api_stk
  - id: api_orq_c4
    raia: api_orq
    tipo: chamada
    rotulo: Implementar e entregar a API
    proximo:
      - para: api_orq_e1
        condicao: pronta
    raia_chamada: api_ent
  - id: api_orq_c5
    raia: api_orq
    tipo: chamada
    rotulo: Implementar e entregar a API
    proximo:
      - para: api_orq_e2
        condicao: pronta
    raia_chamada: api_ent
  - id: api_orq_c6
    raia: api_orq
    tipo: chamada
    rotulo: Implementar e entregar a API
    proximo:
      - para: api_orq_e3
        condicao: pronta
    raia_chamada: api_ent
  - id: api_orq_c7
    raia: api_orq
    tipo: chamada
    rotulo: Implementar e entregar a API
    proximo:
      - para: api_orq_e4
        condicao: pronta
    raia_chamada: api_ent
  - id: api_orq_c8
    raia: api_orq
    tipo: chamada
    rotulo: Implementar e entregar a API
    proximo:
      - para: api_orq_e5
        condicao: pronta
    raia_chamada: api_ent
  - id: api_orq_e1
    raia: api_orq
    tipo: fim
    rotulo: API em produção sobre a stack de API serverless e edge
    proximo: []
    retorno: api_serverless_edge
    saida:
      tipo: stack
      justificativa: Tráfego irregular paga por uso e a resposta perto do usuário reduz a latência, o que pesa mais do que o controle de servidores ligados o tempo todo.
      eixos:
        - escala_volume
        - latencia
        - orcamento
      objetivo: reduzir_custo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 3
          custo_total: 4
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
      stack: "[[api_serverless_edge|API serverless e edge]]"
  - id: api_orq_e2
    raia: api_orq
    tipo: fim
    rotulo: API em produção sobre a stack de API transacional com eventos
    proximo: []
    retorno: api_transacional_eventos
    saida:
      tipo: stack
      justificativa: Regras próprias de negócio e consistência entre serviços diferenciam o produto, e o time maduro opera mensageria sem depender de um fornecedor único.
      eixos:
        - time_maturidade
        - lock_in
        - escala_volume
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
          risco: 4
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[api_transacional_eventos|API transacional com eventos]]"
  - id: api_orq_e3
    raia: api_orq
    tipo: fim
    rotulo: API em produção sobre a stack de monolito web com banco relacional
    proximo: []
    retorno: api_monolito_relacional
    saida:
      tipo: stack
      justificativa: Um único deploy com banco relacional entrega valor mais cedo com um time pequeno e mantém baixos o risco e a dependência de fornecedor.
      eixos:
        - time_maturidade
        - prazo_entrega
        - orcamento
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
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - id: api_orq_e4
    raia: api_orq
    tipo: fim
    rotulo: API em produção sobre um backend gerenciado assinado
    proximo: []
    retorno: assinar_baas
    saida:
      tipo: assinar
      justificativa: Para validar a hipótese, o backend gerenciado entrega autenticação, banco e API prontos em dias, e o domínio simples não exige regra própria que o plano gerenciado limite.
      eixos:
        - prazo_entrega
        - lock_in
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
      categoria: "[[baas_backend_pronto|BaaS e backend pronto]]"
      ferramentas:
        - "[[pocketbase|PocketBase]]"
        - "[[firebase|Firebase]]"
        - "[[aws_amplify|AWS Amplify]]"
  - id: api_orq_e5
    raia: api_orq
    tipo: fim
    rotulo: API em produção atrás de um gateway comercial
    proximo: []
    retorno: comprar_gateway
    saida:
      tipo: comprar
      justificativa: Governança central de várias APIs com requisitos de dados exige operar o gateway no próprio ambiente, e o produto comercial entrega suporte e políticas prontas sem a dependência de um serviço hospedado.
      eixos:
        - compliance_dados
        - prazo_entrega
        - lock_in
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 3
          tempo_ate_valor: 2
          custo_total: 3
          dependencia_fornecedor: 5
          risco: 2
        comprar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 4
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 5
          custo_total: 2
          dependencia_fornecedor: 2
          risco: 2
      categoria: "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
      ferramentas:
        - "[[kong_gateway|Kong Gateway]]"
        - tabela:tyk
        - tabela:amazon-api-gateway
  - id: api_ctx_s0
    raia: api_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: api_ctx_t1
        condicao: ""
  - id: api_ctx_t1
    raia: api_ctx
    tipo: tarefa
    rotulo: Mapear consumidores e casos de uso
    proximo:
      - para: api_ctx_t2
        condicao: ""
    passos:
      - ctx.consumidores_e_casos
  - id: api_ctx_t2
    raia: api_ctx
    tipo: tarefa
    rotulo: Desenhar recursos, erros e limites
    proximo:
      - para: api_ctx_e1
        condicao: ""
    passos:
      - prep.contrato_recursos
      - prep.modelo_erros_e_limites
  - id: api_ctx_e1
    raia: api_ctx
    tipo: fim
    rotulo: Contrato acordado com os consumidores
    proximo: []
    retorno: contrato_definido
  - id: api_abd_s0
    raia: api_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: api_abd_t1
        condicao: ""
  - id: api_abd_t1
    raia: api_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: api_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: api_abd_g1
    raia: api_abd
    tipo: bifurcacao
    rotulo: Domínio simples e prazo curto?
    proximo:
      - para: api_abd_e1
        condicao: sim
      - para: api_abd_g2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.dominio_simples_prazo_curto
  - id: api_abd_g2
    raia: api_abd
    tipo: bifurcacao
    rotulo: Governança central de várias APIs?
    proximo:
      - para: api_abd_e2
        condicao: sim
      - para: api_abd_e3
        condicao: não
    eixo: compliance_dados
    pergunta: q.governanca_central_apis
  - id: api_abd_e1
    raia: api_abd
    tipo: fim
    rotulo: Backend gerenciado cobre o domínio
    proximo: []
    retorno: assinar_baas
  - id: api_abd_e2
    raia: api_abd
    tipo: fim
    rotulo: Gateway comercial centraliza a governança
    proximo: []
    retorno: comprar_gateway
  - id: api_abd_e3
    raia: api_abd
    tipo: fim
    rotulo: Construir com stack própria
    proximo: []
    retorno: construir
  - id: api_stk_s0
    raia: api_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: api_stk_g1
        condicao: ""
  - id: api_stk_g1
    raia: api_stk
    tipo: bifurcacao
    rotulo: Tráfego irregular ou resposta na borda?
    proximo:
      - para: api_stk_e1
        condicao: sim
      - para: api_stk_g2
        condicao: não
    eixo: escala_volume
    pergunta: q.trafego_irregular_borda
  - id: api_stk_g2
    raia: api_stk
    tipo: bifurcacao
    rotulo: Time opera eventos e consistência eventual?
    proximo:
      - para: api_stk_e2
        condicao: sim
      - para: api_stk_e3
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_opera_eventos
  - id: api_stk_e1
    raia: api_stk
    tipo: fim
    rotulo: Stack serverless e edge
    proximo: []
    retorno: serverless_edge
  - id: api_stk_e2
    raia: api_stk
    tipo: fim
    rotulo: Stack transacional com eventos
    proximo: []
    retorno: transacional_eventos
  - id: api_stk_e3
    raia: api_stk
    tipo: fim
    rotulo: Stack de monolito relacional
    proximo: []
    retorno: monolito_relacional
  - id: api_ent_s0
    raia: api_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: api_ent_t1
        condicao: ""
  - id: api_ent_t1
    raia: api_ent
    tipo: tarefa
    rotulo: Implementar e proteger a API
    proximo:
      - para: api_ent_t2
        condicao: ""
    passos:
      - exec.implementar_recursos
      - exec.autenticar_e_limitar
  - id: api_ent_t2
    raia: api_ent
    tipo: tarefa
    rotulo: Validar contrato, carga e segurança
    proximo:
      - para: api_ent_t3
        condicao: ""
    passos:
      - val.testes_de_contrato
      - val.verificar_carga_e_seguranca
  - id: api_ent_t3
    raia: api_ent
    tipo: tarefa
    rotulo: Publicar e operar
    proximo:
      - para: api_ent_e1
        condicao: ""
    passos:
      - ent.publicar_docs_e_versionar
      - ops.observar_e_alertar
  - id: api_ent_e1
    raia: api_ent
    tipo: fim
    rotulo: API entregue e operada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dominio_simples_prazo_curto
    pergunta: O domínio é simples e o prazo é curto o bastante para usar um backend gerenciado sem regra própria relevante?
    eixo: prazo_entrega
  - id: q.governanca_central_apis
    pergunta: Várias APIs de times ou parceiros exigem governança, autenticação e limites centralizados?
    eixo: compliance_dados
  - id: q.trafego_irregular_borda
    pergunta: O tráfego é irregular ou a resposta precisa sair perto do usuário?
    eixo: escala_volume
  - id: q.time_opera_eventos
    pergunta: O time tem maturidade para operar mensageria e consistência eventual?
    eixo: time_maturidade
objetivo: Entregar uma API com contrato versionado, protegida e observável, na abordagem (assinar, comprar ou construir) que melhor atende ao prazo, ao custo e ao controle exigidos.
preRequisitos:
  - Lista dos consumidores previstos e do que cada um precisa fazer.
  - Premissas de volume, latência, dados sensíveis, prazo e orçamento.
  - Acesso a um repositório e a um pipeline de integração contínua.
passos:
  - id: ctx.consumidores_e_casos
    titulo: Mapear consumidores e casos de uso
    descricao: Listar quem chama a API (aplicação própria, parceiros, automações) e o que cada consumidor precisa fazer.
    verificacao: Cada consumidor tem ao menos um caso de uso descrito em uma frase e um responsável por aceitar o contrato.
    depende: []
  - id: prep.contrato_recursos
    titulo: Desenhar recursos e operações
    descricao: Descrever recursos, operações, formatos de entrada e saída e regras de paginação em uma descrição de interface legível por máquina.
    verificacao: A descrição passa por um validador de formato e um consumidor gera um cliente a partir dela.
    depende:
      - ctx.consumidores_e_casos
  - id: prep.modelo_erros_e_limites
    titulo: Definir erros, limites e versionamento
    descricao: Padronizar o formato de erro, os códigos de status, os limites de uso e a política de versão do contrato.
    verificacao: Todo erro previsto tem formato único documentado e a política de versão está escrita na descrição da interface.
    depende:
      - prep.contrato_recursos
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.consumidores_e_casos
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.implementar_recursos
    titulo: Implementar os recursos do contrato
    descricao: Construir ou configurar cada operação do contrato na abordagem escolhida, começando pelo fluxo de maior valor.
    verificacao: Cada operação do contrato responde no formato descrito, comprovado por testes automatizados.
    depende:
      - prep.pontuar_opcoes_matriz
      - prep.modelo_erros_e_limites
  - id: exec.autenticar_e_limitar
    titulo: Proteger com autenticação e limites
    descricao: Aplicar autenticação, autorização por recurso e limite de uso por consumidor.
    verificacao: Uma chamada sem credencial, uma com permissão insuficiente e uma acima do limite recebem respostas distintas e documentadas.
    depende:
      - exec.implementar_recursos
  - id: val.testes_de_contrato
    titulo: Validar o contrato com testes
    descricao: Rodar testes de contrato entre a descrição da interface e a implementação, incluindo os casos de erro.
    verificacao: Os testes de contrato passam no pipeline de integração contínua e falham quando o contrato diverge da implementação.
    depende:
      - exec.implementar_recursos
  - id: val.verificar_carga_e_seguranca
    titulo: Verificar carga e segurança
    descricao: Executar um teste de carga com o volume esperado e uma varredura das vulnerabilidades comuns de APIs.
    verificacao: A latência no volume esperado cumpre a premissa registrada e a varredura deixa zero achados críticos abertos.
    depende:
      - exec.autenticar_e_limitar
      - val.testes_de_contrato
  - id: ent.publicar_docs_e_versionar
    titulo: Publicar a documentação e a versão
    descricao: Publicar a descrição da interface, exemplos de uso e o aviso de política de versão para os consumidores.
    verificacao: Um consumidor novo faz a primeira chamada com sucesso usando apenas a documentação publicada.
    depende:
      - val.testes_de_contrato
  - id: ops.observar_e_alertar
    titulo: Instrumentar e alertar
    descricao: Emitir métricas, logs e rastros por operação e criar alertas para erro e latência.
    verificacao: Uma falha induzida em ambiente de teste gera alerta em minutos e aparece em rastro ligado à requisição.
    depende:
      - exec.implementar_recursos
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Escolher a tecnologia antes de fixar o contrato com os consumidores.
  - Publicar sem política de versão, o que quebra consumidores a cada mudança.
  - Responder erros em formatos diferentes por operação, o que obriga cada consumidor a tratar casos especiais.
  - Deixar autenticação e limites de uso para depois da primeira versão.
validacao:
  - Todas as operações do contrato respondem conforme a descrição da interface, comprovado por testes de contrato no pipeline.
  - Autenticação, autorização e limite de uso respondem de forma distinta e documentada.
  - A latência no volume esperado cumpre a premissa registrada.
  - Um consumidor novo faz a primeira chamada usando só a documentação publicada.
  - Os alertas de erro e latência disparam em uma falha induzida.
padroes:
  - "[[api_gateway|API Gateway (padrão)]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[circuit_breaker|Circuit Breaker]]"
  - "[[transactional_outbox|Transactional Outbox]]"
categorias:
  - "[[baas_backend_pronto|BaaS e backend pronto]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
  - "[[testes_documentacao_apis|Testes e documentação de APIs]]"
  - "[[documentacao_referencia|Documentação e referência de APIs]]"
aliases:
  - Criar uma API
  - Construir uma API
grupo: Construir software
stacks:
  - "[[api_serverless_edge|API serverless e edge]]"
  - "[[api_transacional_eventos|API transacional com eventos]]"
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
ferramentas:
  - "[[pocketbase|PocketBase]]"
  - "[[firebase|Firebase]]"
  - "[[aws_amplify|AWS Amplify]]"
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:tyk
  - tabela:amazon-api-gateway
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
variacoes:
  - api-gateway-seguranca
  - api-teste-contrato
certificacoes:
  - "[[aws_certified_developer_associate_dva_c02|AWS Certified Developer Associate (DVA-C02)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar uma API
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
