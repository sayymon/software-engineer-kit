---
id: proteger_codigo_dependencias_segredos
tipo: guia-pratico
nome: Como proteger código, dependências e segredos
sigla: seg
descricao: "Caminho para proteger o ciclo de desenvolvimento: priorizar ativos e ameaças, inventariar dependências, rodar análise estática e varredura no pipeline, manter segredos fora do código com rotação, aplicar menor privilégio e corrigir por severidade com prazos."
exemplo: Um time mapeia as dependências, habilita análise estática e varredura em cada mudança, move as credenciais para um cofre com rotação e bloqueia a integração quando surge um achado crítico.
quando_usar:
  - Um projeto vai a produção ou recebe código de várias pessoas e precisa de proteções automáticas.
  - Um incidente ou auditoria expôs falhas em dependências, credenciais ou permissões.
quando_evitar:
  - Quando o foco é a segurança de aplicações de IA, que tem riscos próprios (veja o guia de criação de agentes e as listas de riscos de modelos de linguagem).
fonte_ids:
  - owasp_top10
  - owasp_secrets_cheatsheet
  - nist_ssdf
fontes:
  - id: owasp_top10
    tipo: artigo
    titulo: OWASP Top 10 (OWASP Foundation)
    link: https://owasp.org/www-project-top-ten/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: owasp_secrets_cheatsheet
    tipo: artigo
    titulo: Secrets Management Cheat Sheet (OWASP)
    link: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: nist_ssdf
    tipo: artigo
    titulo: Secure Software Development Framework (NIST CSRC)
    link: https://csrc.nist.gov/projects/ssdf
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: seg_orq
    nome: Orquestração da proteção
    responsabilidade: Encadear contexto, ferramental e execução até os controles ativos e acompanhados.
    cor: "#607D8B"
    orquestradora: true
  - id: seg_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: seg_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: seg_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: seg_orq_s0
    raia: seg_orq
    tipo: inicio
    rotulo: Necessidade de proteger o ciclo de desenvolvimento
    proximo:
      - para: seg_orq_c1
        condicao: ""
  - id: seg_orq_c1
    raia: seg_orq
    tipo: chamada
    rotulo: Priorizar ativos e ameaças
    proximo:
      - para: seg_orq_c2
        condicao: ameacas_priorizadas
    raia_chamada: seg_ctx
  - id: seg_orq_c2
    raia: seg_orq
    tipo: chamada
    rotulo: Escolher o ferramental de segurança
    proximo:
      - para: seg_orq_c3
        condicao: construir_aberto
      - para: seg_orq_c5
        condicao: assinar_cofre
      - para: seg_orq_c4
        condicao: assinar_scanner
    raia_chamada: seg_abd
  - id: seg_orq_c3
    raia: seg_orq
    tipo: chamada
    rotulo: Ativar controles, corrigir por severidade e revisar
    proximo:
      - para: seg_orq_e1
        condicao: pronta
    raia_chamada: seg_ent
  - id: seg_orq_c4
    raia: seg_orq
    tipo: chamada
    rotulo: Ativar controles, corrigir por severidade e revisar
    proximo:
      - para: seg_orq_e2
        condicao: pronta
    raia_chamada: seg_ent
  - id: seg_orq_c5
    raia: seg_orq
    tipo: chamada
    rotulo: Ativar controles, corrigir por severidade e revisar
    proximo:
      - para: seg_orq_e3
        condicao: pronta
    raia_chamada: seg_ent
  - id: seg_orq_e1
    raia: seg_orq
    tipo: fim
    rotulo: Controles com análise estática e varredura abertas
    proximo: []
    retorno: construir_aberto
    saida:
      tipo: construir
      justificativa: Ferramentas abertas de análise estática, varredura de dependências e detecção de segredos rodam no pipeline próprio, com custo baixo e o código restrito ao ambiente da empresa.
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
      categoria: "[[seguranca_codigo|Segurança de código]]"
      ferramentas:
        - "[[gitleaks|Gitleaks (ferramenta)]]"
        - "[[trivy|Trivy]]"
        - tabela:semgrep-oss
  - id: seg_orq_e2
    raia: seg_orq
    tipo: fim
    rotulo: Scanner de segurança assinado
    proximo: []
    retorno: assinar_scanner
    saida:
      tipo: assinar
      justificativa: Um scanner assinado cobre código, dependências e contêineres com painel, priorização e sugestão de correção, e coloca os controles em uso em poucos dias.
      eixos:
        - prazo_entrega
        - time_maturidade
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
      categoria: "[[seguranca_codigo|Segurança de código]]"
      ferramentas:
        - "[[github_advanced_security|GitHub Advanced Security]]"
        - "[[snyk|Snyk]]"
        - "[[sonarqube|SonarQube]]"
  - id: seg_orq_e3
    raia: seg_orq
    tipo: fim
    rotulo: Cofre de segredos assinado
    proximo: []
    retorno: assinar_cofre
    saida:
      tipo: assinar
      justificativa: Um cofre assinado centraliza credenciais com controle de acesso, auditoria e rotação, o que tira os segredos do código e dos canais de conversa com configuração simples.
      eixos:
        - time_maturidade
        - compliance_dados
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
      categoria: "[[senhas_segredos|Gerenciador de senhas e segredos]]"
      ferramentas:
        - "[[n_1password|1Password]]"
        - tabela:doppler
        - "[[bitwarden|Bitwarden]]"
  - id: seg_ctx_s0
    raia: seg_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: seg_ctx_t1
        condicao: ""
  - id: seg_ctx_t1
    raia: seg_ctx
    tipo: tarefa
    rotulo: Priorizar ativos e ameaças
    proximo:
      - para: seg_ctx_e1
        condicao: ""
    passos:
      - ctx.ativos_e_ameacas_prioritarias
  - id: seg_ctx_e1
    raia: seg_ctx
    tipo: fim
    rotulo: Ativos e ameaças priorizados
    proximo: []
    retorno: ameacas_priorizadas
  - id: seg_abd_s0
    raia: seg_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: seg_abd_t1
        condicao: ""
  - id: seg_abd_t1
    raia: seg_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: seg_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: seg_abd_g1
    raia: seg_abd
    tipo: bifurcacao
    rotulo: Código restrito ao ambiente próprio?
    proximo:
      - para: seg_abd_e1
        condicao: sim
      - para: seg_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.codigo_restrito_ao_ambiente_proprio
  - id: seg_abd_g2
    raia: seg_abd
    tipo: bifurcacao
    rotulo: Segredos sem rotação?
    proximo:
      - para: seg_abd_e2
        condicao: sim
      - para: seg_abd_g3
        condicao: não
    eixo: time_maturidade
    pergunta: q.segredos_compartilhados_sem_rotacao
  - id: seg_abd_g3
    raia: seg_abd
    tipo: bifurcacao
    rotulo: Cobertura completa em dias?
    proximo:
      - para: seg_abd_e3
        condicao: sim
      - para: seg_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.cobertura_completa_em_dias
  - id: seg_abd_e1
    raia: seg_abd
    tipo: fim
    rotulo: Construir com análise estática e varredura abertas
    proximo: []
    retorno: construir_aberto
  - id: seg_abd_e2
    raia: seg_abd
    tipo: fim
    rotulo: Assinar um cofre de segredos
    proximo: []
    retorno: assinar_cofre
  - id: seg_abd_e3
    raia: seg_abd
    tipo: fim
    rotulo: Assinar um scanner de segurança
    proximo: []
    retorno: assinar_scanner
  - id: seg_ent_s0
    raia: seg_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: seg_ent_t1
        condicao: ""
  - id: seg_ent_t1
    raia: seg_ent
    tipo: tarefa
    rotulo: Mapear e varrer
    proximo:
      - para: seg_ent_t2
        condicao: ""
    passos:
      - prep.inventario_de_dependencias_e_sbom
      - exec.analise_estatica_no_pipeline
      - exec.varredura_de_dependencias_e_conteineres
  - id: seg_ent_t2
    raia: seg_ent
    tipo: tarefa
    rotulo: Proteger segredos e acessos
    proximo:
      - para: seg_ent_t3
        condicao: ""
    passos:
      - exec.segredos_fora_do_codigo_com_rotacao
      - exec.menor_privilegio_nos_acessos
  - id: seg_ent_t3
    raia: seg_ent
    tipo: tarefa
    rotulo: Corrigir e revisar
    proximo:
      - para: seg_ent_e1
        condicao: ""
    passos:
      - val.corrigir_por_severidade_com_prazos
      - ent.bloquear_integracao_com_achados_criticos
      - ops.revisar_e_rotacionar_periodicamente
  - id: seg_ent_e1
    raia: seg_ent
    tipo: fim
    rotulo: Controles ativos e achados sob acompanhamento
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.codigo_restrito_ao_ambiente_proprio
    pergunta: O código e os resultados da análise precisam ficar no ambiente próprio por exigência de sigilo ou conformidade?
    eixo: compliance_dados
  - id: q.segredos_compartilhados_sem_rotacao
    pergunta: As credenciais são compartilhadas por várias pessoas e pipelines, sem rotação nem trilha de acesso?
    eixo: time_maturidade
  - id: q.cobertura_completa_em_dias
    pergunta: O time precisa de cobertura de código, dependências e contêineres, com painel e correção sugerida, em poucos dias?
    eixo: prazo_entrega
objetivo: Reduzir o risco do ciclo de desenvolvimento com controles automáticos de código, dependências e segredos, e com acessos mínimos, escolhendo entre scanner assinado, ferramentas abertas e cofre de segredos conforme o controle de dados e o prazo.
preRequisitos:
  - Inventário dos repositórios, ambientes e das contas com acesso.
  - Um pipeline de integração contínua onde as checagens possam rodar.
  - Um responsável por triar e corrigir os achados.
  - Premissas de sigilo do código, prazo e orçamento.
passos:
  - id: ctx.ativos_e_ameacas_prioritarias
    titulo: Priorizar ativos e ameaças
    descricao: Listar os repositórios, serviços e dados mais valiosos, as ameaças prováveis a cada um e quem responde pelos controles.
    verificacao: A lista de ativos tem ameaças priorizadas e responsáveis nomeados.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.ativos_e_ameacas_prioritarias
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.inventario_de_dependencias_e_sbom
    titulo: Inventariar dependências e gerar uma lista de materiais de software
    descricao: Gerar uma lista de materiais de software com componentes diretos e transitivos, versões e licenças por serviço.
    verificacao: Cada serviço tem uma lista de materiais atualizada a cada versão publicada.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.analise_estatica_no_pipeline
    titulo: Rodar análise estática no pipeline
    descricao: Executar análise estática com regras de segurança em cada mudança e mostrar os achados no pedido de integração.
    verificacao: Cada mudança passa pela análise estática e os achados aparecem junto à revisão.
    depende:
      - prep.inventario_de_dependencias_e_sbom
  - id: exec.varredura_de_dependencias_e_conteineres
    titulo: Varrer dependências e imagens de contêiner
    descricao: Comparar componentes com bases de vulnerabilidades conhecidas e atualizar a varredura continuamente, inclusive para versões já publicadas.
    verificacao: A varredura cobre dependências e imagens e gera alerta para novas vulnerabilidades em versões publicadas.
    depende:
      - exec.analise_estatica_no_pipeline
  - id: exec.segredos_fora_do_codigo_com_rotacao
    titulo: Manter segredos fora do código com rotação
    descricao: Guardar credenciais em um cofre, detectar segredos em commits e definir rotação e revogação imediata em caso de exposição.
    verificacao: Nenhum segredo permanece no repositório e cada credencial tem dono, rotação e procedimento de revogação.
    depende:
      - prep.inventario_de_dependencias_e_sbom
  - id: exec.menor_privilegio_nos_acessos
    titulo: Aplicar o menor privilégio nos acessos
    descricao: Conceder a cada pessoa, pipeline e serviço somente as permissões necessárias, com revisão periódica e autenticação forte.
    verificacao: As permissões foram revisadas e cada acesso amplo tem justificativa e prazo.
    depende:
      - exec.segredos_fora_do_codigo_com_rotacao
  - id: val.corrigir_por_severidade_com_prazos
    titulo: Corrigir os achados por severidade, com prazos
    descricao: Triar os achados, definir prazos por severidade e acompanhar as correções até o fechamento, registrando as exceções.
    verificacao: Cada achado crítico e alto tem dono e prazo, e as exceções estão registradas com data de revisão.
    depende:
      - exec.varredura_de_dependencias_e_conteineres
      - exec.menor_privilegio_nos_acessos
  - id: ent.bloquear_integracao_com_achados_criticos
    titulo: Bloquear a integração com achados críticos
    descricao: Configurar o pipeline para impedir a integração de mudanças com achados críticos novos, com um caminho de exceção aprovado.
    verificacao: Uma mudança com achado crítico novo é bloqueada e o caminho de exceção exige aprovação registrada.
    depende:
      - val.corrigir_por_severidade_com_prazos
  - id: ops.revisar_e_rotacionar_periodicamente
    titulo: Revisar controles e rotacionar credenciais periodicamente
    descricao: Agendar a revisão de regras, acessos e credenciais e acompanhar o tempo médio de correção dos achados.
    verificacao: A revisão periódica está agendada e o tempo de correção dos achados é acompanhado.
    depende:
      - ent.bloquear_integracao_com_achados_criticos
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Habilitar varreduras sem dono para triar os achados, o que acumula alertas ignorados.
  - Guardar credenciais no repositório ou em conversas, o que as expõe a qualquer pessoa com acesso.
  - Conceder permissões amplas por conveniência, o que amplia o dano de uma conta comprometida.
  - Varrer somente no momento do build, o que deixa novas vulnerabilidades de versões já publicadas sem detecção.
validacao:
  - Cada serviço tem uma lista de materiais de software atualizada.
  - Análise estática e varredura de dependências rodam em cada mudança.
  - Nenhum segredo está no repositório e cada credencial tem rotação e dono.
  - Achados críticos bloqueiam a integração e os demais têm prazo por severidade.
  - Permissões e credenciais são revisadas periodicamente.
padroes:
  - "[[guardrails_llm|Guardrails]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
categorias:
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[skills_seguranca|Skills de segurança]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Segurança da cadeia de suprimentos de software
  - Proteger o repositório
grupo: Segurança
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - "[[gitleaks|Gitleaks (ferramenta)]]"
  - "[[trivy|Trivy]]"
  - tabela:semgrep-oss
  - "[[github_advanced_security|GitHub Advanced Security]]"
  - "[[snyk|Snyk]]"
  - "[[sonarqube|SonarQube]]"
  - "[[n_1password|1Password]]"
  - tabela:doppler
  - "[[bitwarden|Bitwarden]]"
casosDeUso:
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
  - "[[gestao_de_segredos_e_credenciais|Gestão de segredos e credenciais]]"
variacoes:
  - sec-analise-estatica
  - sec-dependencias-sbom
  - segredos-cofre-aplicacao
certificacoes:
  - "[[comptia_security_plus|CompTIA Security+]]"
  - "[[certified_kubernetes_security_specialist_cks|Certified Kubernetes Security Specialist (CKS)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como proteger código, dependências e segredos
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
