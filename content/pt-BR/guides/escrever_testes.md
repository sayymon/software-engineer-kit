---
id: escrever_testes
tipo: guia-pratico
nome: Como escrever testes
sigla: tst
descricao: "Caminho para construir uma suíte de testes útil: listar comportamentos críticos e riscos, distribuir testes em camadas, cobrir regras com testes de unidade, integrações com dependências reais descartáveis e fluxos críticos de ponta a ponta, e manter a suíte estável na integração contínua."
exemplo: Um serviço de cobrança ganha testes de unidade para as regras de cálculo, testes de integração com um banco descartável e poucos testes de ponta a ponta para o fluxo de pagamento, todos rodando a cada mudança.
quando_usar:
  - Uma funcionalidade nova ou um módulo legado precisa de proteção contra regressões.
  - A suíte atual é lenta, instável ou deixa passar defeitos.
quando_evitar:
  - Quando o código é descartável e vive poucos dias, e a verificação manual basta.
fonte_ids:
  - swe_google_testing
fontes:
  - id: swe_google_testing
    tipo: artigo
    titulo: Software Engineering at Google, Testing Overview (Abseil)
    link: https://abseil.io/resources/swe-book/html/ch11.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: tst_orq
    nome: Orquestração dos testes
    responsabilidade: Encadear contexto, ferramental e execução até uma suíte estável na integração contínua.
    cor: "#607D8B"
    orquestradora: true
  - id: tst_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: tst_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: tst_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: tst_orq_s0
    raia: tst_orq
    tipo: inicio
    rotulo: Necessidade de proteger comportamentos com testes
    proximo:
      - para: tst_orq_c1
        condicao: ""
  - id: tst_orq_c1
    raia: tst_orq
    tipo: chamada
    rotulo: Mapear comportamentos críticos e riscos
    proximo:
      - para: tst_orq_c2
        condicao: riscos_mapeados
    raia_chamada: tst_ctx
  - id: tst_orq_c2
    raia: tst_orq
    tipo: chamada
    rotulo: Escolher o ferramental de testes ponta a ponta
    proximo:
      - para: tst_orq_c3
        condicao: construir
      - para: tst_orq_c4
        condicao: assinar
    raia_chamada: tst_abd
  - id: tst_orq_c3
    raia: tst_orq
    tipo: chamada
    rotulo: Escrever, estabilizar e automatizar a suíte
    proximo:
      - para: tst_orq_e1
        condicao: pronta
    raia_chamada: tst_ent
  - id: tst_orq_c4
    raia: tst_orq
    tipo: chamada
    rotulo: Escrever, estabilizar e automatizar a suíte
    proximo:
      - para: tst_orq_e2
        condicao: pronta
    raia_chamada: tst_ent
  - id: tst_orq_e1
    raia: tst_orq
    tipo: fim
    rotulo: Suíte construída com ferramentas abertas
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Frameworks e ferramentas abertas cobrem unidade, integração e ponta a ponta com custo baixo e execução no ambiente próprio, o que serve a times que dominam a infraestrutura de testes.
      eixos:
        - compliance_dados
        - orcamento
        - lock_in
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
      categoria: "[[testes_qa|Testes e QA]]"
      ferramentas:
        - "[[playwright|Playwright]]"
        - "[[testcontainers|Testcontainers]]"
        - tabela:selenium
  - id: tst_orq_e2
    raia: tst_orq
    tipo: fim
    rotulo: Plataforma de testes gerenciada
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Uma plataforma gerenciada oferece laboratório de navegadores e dispositivos, comparação visual e relatórios prontos, o que valida a cobertura em semanas sem manter infraestrutura.
      eixos:
        - escala_volume
        - prazo_entrega
        - time_maturidade
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
      categoria: "[[testes_qa|Testes e QA]]"
      ferramentas:
        - "[[browserstack|BrowserStack]]"
        - tabela:applitools
        - tabela:mabl
  - id: tst_ctx_s0
    raia: tst_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: tst_ctx_t1
        condicao: ""
  - id: tst_ctx_t1
    raia: tst_ctx
    tipo: tarefa
    rotulo: Mapear comportamentos críticos e riscos
    proximo:
      - para: tst_ctx_e1
        condicao: ""
    passos:
      - ctx.comportamentos_criticos_e_riscos
  - id: tst_ctx_e1
    raia: tst_ctx
    tipo: fim
    rotulo: Comportamentos e riscos mapeados
    proximo: []
    retorno: riscos_mapeados
  - id: tst_abd_s0
    raia: tst_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: tst_abd_t1
        condicao: ""
  - id: tst_abd_t1
    raia: tst_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: tst_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: tst_abd_g1
    raia: tst_abd
    tipo: bifurcacao
    rotulo: Testes na infraestrutura própria?
    proximo:
      - para: tst_abd_e1
        condicao: sim
      - para: tst_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_de_teste_sensiveis
  - id: tst_abd_g2
    raia: tst_abd
    tipo: bifurcacao
    rotulo: Cobertura ampla de navegadores?
    proximo:
      - para: tst_abd_e2
        condicao: sim
      - para: tst_abd_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.cobertura_ampla_de_navegadores
  - id: tst_abd_g3
    raia: tst_abd
    tipo: bifurcacao
    rotulo: E2E em poucas semanas?
    proximo:
      - para: tst_abd_e2
        condicao: sim
      - para: tst_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.e2e_visual_em_semanas
  - id: tst_abd_e1
    raia: tst_abd
    tipo: fim
    rotulo: Construir a suíte com ferramentas abertas
    proximo: []
    retorno: construir
  - id: tst_abd_e2
    raia: tst_abd
    tipo: fim
    rotulo: Assinar uma plataforma de testes gerenciada
    proximo: []
    retorno: assinar
  - id: tst_ent_s0
    raia: tst_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: tst_ent_t1
        condicao: ""
  - id: tst_ent_t1
    raia: tst_ent
    tipo: tarefa
    rotulo: Definir a estratégia em camadas
    proximo:
      - para: tst_ent_t2
        condicao: ""
    passos:
      - prep.estrategia_em_camadas
  - id: tst_ent_t2
    raia: tst_ent
    tipo: tarefa
    rotulo: Escrever os testes
    proximo:
      - para: tst_ent_t3
        condicao: ""
    passos:
      - exec.testes_de_unidade_das_regras
      - exec.testes_de_integracao_com_dependencias_reais
      - exec.testes_ponta_a_ponta_dos_fluxos_criticos
  - id: tst_ent_t3
    raia: tst_ent
    tipo: tarefa
    rotulo: Estabilizar e automatizar
    proximo:
      - para: tst_ent_e1
        condicao: ""
    passos:
      - val.eliminar_testes_instaveis
      - ent.rodar_na_integracao_continua
      - ops.acompanhar_falhas_e_tempo_da_suite
  - id: tst_ent_e1
    raia: tst_ent
    tipo: fim
    rotulo: Suíte estável rodando na integração contínua
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_de_teste_sensiveis
    pergunta: Os dados e fluxos de teste são sensíveis e a execução precisa ocorrer na infraestrutura própria?
    eixo: compliance_dados
  - id: q.cobertura_ampla_de_navegadores
    pergunta: Os testes de ponta a ponta precisam cobrir muitos navegadores e dispositivos, acima do que o time mantém?
    eixo: escala_volume
  - id: q.e2e_visual_em_semanas
    pergunta: O time precisa de testes visuais e de ponta a ponta em poucas semanas, sem montar a infraestrutura?
    eixo: prazo_entrega
objetivo: Proteger os comportamentos críticos com testes rápidos, estáveis e distribuídos em camadas, com o ferramental (assinar ou construir) que atende ao controle de dados e à necessidade de cobertura de navegadores e dispositivos.
preRequisitos:
  - Lista dos comportamentos críticos e dos riscos conhecidos.
  - Um ambiente de integração contínua que roda a suíte em cada mudança.
  - Dados de teste anonimizados ou sintéticos.
  - Premissas de dados sensíveis, necessidade de navegadores e dispositivos e orçamento.
passos:
  - id: ctx.comportamentos_criticos_e_riscos
    titulo: Listar os comportamentos críticos e os riscos
    descricao: Enumerar as funções cujo defeito causa maior dano, as regras de negócio sensíveis e os pontos que já falharam antes.
    verificacao: A lista está ordenada por risco e cada item tem um dono.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.comportamentos_criticos_e_riscos
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.estrategia_em_camadas
    titulo: Definir a estratégia em camadas
    descricao: Distribuir muitos testes rápidos de unidade, uma camada média de integração e poucos testes de ponta a ponta para fluxos críticos.
    verificacao: Cada comportamento crítico tem a camada de teste escolhida e o motivo registrado.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.testes_de_unidade_das_regras
    titulo: Escrever testes de unidade para as regras
    descricao: Cobrir regras de negócio e casos de borda com testes rápidos, determinísticos e independentes entre si.
    verificacao: Os testes de unidade rodam em segundos e descrevem o comportamento esperado em seus nomes.
    depende:
      - prep.estrategia_em_camadas
  - id: exec.testes_de_integracao_com_dependencias_reais
    titulo: Escrever testes de integração com dependências reais descartáveis
    descricao: Verificar banco, filas e serviços externos usando instâncias efêmeras ou simuladores fiéis, e dados criados a cada execução.
    verificacao: Os testes de integração criam e descartam o próprio ambiente e podem rodar em paralelo.
    depende:
      - exec.testes_de_unidade_das_regras
  - id: exec.testes_ponta_a_ponta_dos_fluxos_criticos
    titulo: Escrever testes de ponta a ponta para os fluxos críticos
    descricao: Automatizar poucos fluxos completos da perspectiva de quem usa, com esperas explícitas e seletores estáveis.
    verificacao: Os fluxos críticos têm um teste de ponta a ponta cada e usam seletores estáveis.
    depende:
      - exec.testes_de_integracao_com_dependencias_reais
  - id: val.eliminar_testes_instaveis
    titulo: Eliminar testes instáveis
    descricao: Executar a suíte repetidas vezes, isolar falhas intermitentes, corrigir a causa ou retirar o teste da suíte principal até o conserto.
    verificacao: A suíte passa em dez execuções seguidas sem falhas intermitentes.
    depende:
      - exec.testes_ponta_a_ponta_dos_fluxos_criticos
  - id: ent.rodar_na_integracao_continua
    titulo: Rodar a suíte na integração contínua
    descricao: Executar a suíte em cada mudança, em paralelo quando possível, e bloquear a integração quando houver falha.
    verificacao: Toda mudança executa a suíte e o resultado aparece no pedido de integração.
    depende:
      - val.eliminar_testes_instaveis
  - id: ops.acompanhar_falhas_e_tempo_da_suite
    titulo: Acompanhar falhas, cobertura dos riscos e tempo da suíte
    descricao: Medir o tempo total, a taxa de falhas intermitentes e quais riscos listados têm teste, e priorizar as lacunas.
    verificacao: Um painel mostra tempo, instabilidade e cobertura dos riscos listados e é revisado a cada ciclo.
    depende:
      - ent.rodar_na_integracao_continua
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Concentrar a suíte em testes de ponta a ponta, o que a torna lenta, frágil e cara de manter.
  - Medir apenas a porcentagem de cobertura, o que esconde comportamentos críticos sem verificação real.
  - Conviver com testes intermitentes, o que ensina o time a ignorar falhas legítimas.
  - Acoplar os testes à implementação interna, o que os quebra em refatorações sem defeito.
validacao:
  - Cada comportamento crítico listado tem um teste na camada escolhida.
  - A suíte roda a cada mudança e bloqueia a integração quando falha.
  - A suíte passa em execuções repetidas sem falhas intermitentes.
  - Os testes de unidade rodam em segundos e os de integração criam e descartam o próprio ambiente.
  - O tempo da suíte e a instabilidade são acompanhados em painel.
padroes:
  - "[[adapter|Adapter (GoF)]]"
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
categorias:
  - "[[testes_qa|Testes e QA]]"
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[mcp_navegador_testes|MCP de navegador e testes]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Criar testes automatizados
  - Estratégia de testes
grupo: Qualidade entrega e operação
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
ferramentas:
  - "[[playwright|Playwright]]"
  - "[[testcontainers|Testcontainers]]"
  - tabela:selenium
  - "[[browserstack|BrowserStack]]"
  - tabela:applitools
  - tabela:mabl
casosDeUso:
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes:
  - teste-unitario
  - teste-integracao
  - teste-e2e-navegador
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como escrever testes
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
