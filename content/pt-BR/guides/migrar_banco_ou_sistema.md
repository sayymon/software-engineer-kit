---
id: migrar_banco_ou_sistema
tipo: guia-pratico
nome: Como migrar um banco ou sistema legado
sigla: mgr
descricao: "Caminho para migrar um banco ou sistema legado com segurança: inventariar dependências, planejar etapas reversíveis, aplicar mudanças compatíveis em expansão e contração, copiar e sincronizar dados, rotear o tráfego aos poucos e desligar o legado só após comparar resultados."
exemplo: "Um time substitui um banco legado: cria o esquema novo ao lado do antigo, sincroniza os dados continuamente, passa leituras e depois escritas ao novo em etapas, compara resultados e desliga o antigo após um período de observação."
quando_usar:
  - Um banco, uma plataforma ou um sistema chegou ao fim do suporte ou limita a evolução do negócio.
  - Uma mudança de esquema ou de tecnologia precisa ocorrer sem parar o serviço.
quando_evitar:
  - Quando o legado atende bem e o custo de migrar supera o benefício em um horizonte razoável.
fonte_ids:
  - fowler_strangler_fig
  - fowler_evodb
fontes:
  - id: fowler_strangler_fig
    tipo: artigo
    titulo: Strangler Fig (Martin Fowler)
    link: https://martinfowler.com/bliki/StranglerFigApplication.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: fowler_evodb
    tipo: artigo
    titulo: Evolutionary Database Design (Martin Fowler)
    link: https://martinfowler.com/articles/evodb.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: mgr_orq
    nome: Orquestração da migração
    responsabilidade: Encadear contexto, ferramental e execução até o desligamento seguro do legado.
    cor: "#607D8B"
    orquestradora: true
  - id: mgr_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: mgr_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: mgr_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: mgr_orq_s0
    raia: mgr_orq
    tipo: inicio
    rotulo: Legado a substituir ou mudança de esquema em vista
    proximo:
      - para: mgr_orq_c1
        condicao: ""
  - id: mgr_orq_c1
    raia: mgr_orq
    tipo: chamada
    rotulo: Inventariar dependências e fixar metas
    proximo:
      - para: mgr_orq_c2
        condicao: inventario_pronto
    raia_chamada: mgr_ctx
  - id: mgr_orq_c2
    raia: mgr_orq
    tipo: chamada
    rotulo: Escolher o ferramental de migração
    proximo:
      - para: mgr_orq_c3
        condicao: construir
      - para: mgr_orq_c4
        condicao: assinar
    raia_chamada: mgr_abd
  - id: mgr_orq_c3
    raia: mgr_orq
    tipo: chamada
    rotulo: Migrar em etapas, comparar e desligar o legado
    proximo:
      - para: mgr_orq_e1
        condicao: pronta
    raia_chamada: mgr_ent
  - id: mgr_orq_c4
    raia: mgr_orq
    tipo: chamada
    rotulo: Migrar em etapas, comparar e desligar o legado
    proximo:
      - para: mgr_orq_e2
        condicao: pronta
    raia_chamada: mgr_ent
  - id: mgr_orq_e1
    raia: mgr_orq
    tipo: fim
    rotulo: Migração com versionamento de esquema e sincronização próprias
    proximo: []
    retorno: construir
    saida:
      tipo: construir
      justificativa: Mudanças de esquema versionadas e scripts de sincronização revisáveis dão controle sobre cada etapa, reversão planejada e trilha de auditoria, o que atende a dados com restrições e a migrações sem parada.
      eixos:
        - compliance_dados
        - escala_volume
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
      categoria: "[[migracao_administracao_banco|Migração e administração de banco]]"
      ferramentas:
        - "[[liquibase|Liquibase (ferramenta)]]"
        - tabela:flyway
        - "[[dbeaver_community|DBeaver Community]]"
  - id: mgr_orq_e2
    raia: mgr_orq
    tipo: fim
    rotulo: Migração com ferramenta de administração assinada
    proximo: []
    retorno: assinar
    saida:
      tipo: assinar
      justificativa: Para um esquema simples e uma janela curta, uma ferramenta de administração com comparação e exportação guiadas conclui a migração em dias, sem montar uma automação própria.
      eixos:
        - prazo_entrega
        - time_maturidade
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
      categoria: "[[migracao_administracao_banco|Migração e administração de banco]]"
      ferramentas:
        - "[[tableplus|TablePlus]]"
        - tabela:datagrip
        - tabela:beekeeper-studio
  - id: mgr_ctx_s0
    raia: mgr_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: mgr_ctx_t1
        condicao: ""
  - id: mgr_ctx_t1
    raia: mgr_ctx
    tipo: tarefa
    rotulo: Inventariar dependências e fixar metas
    proximo:
      - para: mgr_ctx_e1
        condicao: ""
    passos:
      - ctx.inventario_e_dependencias
  - id: mgr_ctx_e1
    raia: mgr_ctx
    tipo: fim
    rotulo: Inventário e metas fixados
    proximo: []
    retorno: inventario_pronto
  - id: mgr_abd_s0
    raia: mgr_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: mgr_abd_t1
        condicao: ""
  - id: mgr_abd_t1
    raia: mgr_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: mgr_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: mgr_abd_g1
    raia: mgr_abd
    tipo: bifurcacao
    rotulo: Dados com restrição de acesso?
    proximo:
      - para: mgr_abd_e1
        condicao: sim
      - para: mgr_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_com_restricao_de_local_e_acesso
  - id: mgr_abd_g2
    raia: mgr_abd
    tipo: bifurcacao
    rotulo: Migração sem parada?
    proximo:
      - para: mgr_abd_e1
        condicao: sim
      - para: mgr_abd_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.migracao_sem_janela_de_parada
  - id: mgr_abd_g3
    raia: mgr_abd
    tipo: bifurcacao
    rotulo: Esquema simples e janela curta?
    proximo:
      - para: mgr_abd_e2
        condicao: sim
      - para: mgr_abd_e1
        condicao: não
    eixo: prazo_entrega
    pergunta: q.esquema_simples_e_janela_curta
  - id: mgr_abd_e1
    raia: mgr_abd
    tipo: fim
    rotulo: Migrar com versionamento de esquema e sincronização própria
    proximo: []
    retorno: construir
  - id: mgr_abd_e2
    raia: mgr_abd
    tipo: fim
    rotulo: Migrar com ferramenta de administração assinada
    proximo: []
    retorno: assinar
  - id: mgr_ent_s0
    raia: mgr_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: mgr_ent_t1
        condicao: ""
  - id: mgr_ent_t1
    raia: mgr_ent
    tipo: tarefa
    rotulo: Planejar e preparar
    proximo:
      - para: mgr_ent_t2
        condicao: ""
    passos:
      - prep.plano_em_etapas_reversiveis
      - exec.mudancas_em_expansao_e_contracao
  - id: mgr_ent_t2
    raia: mgr_ent
    tipo: tarefa
    rotulo: Copiar e rotear
    proximo:
      - para: mgr_ent_t3
        condicao: ""
    passos:
      - exec.copiar_e_sincronizar_dados
      - exec.rotear_trafego_gradualmente
  - id: mgr_ent_t3
    raia: mgr_ent
    tipo: tarefa
    rotulo: Comparar, cortar e desligar
    proximo:
      - para: mgr_ent_e1
        condicao: ""
    passos:
      - val.comparar_origem_e_destino
      - ent.corte_com_reversao_pronta
      - ops.desligar_o_legado_e_registrar
  - id: mgr_ent_e1
    raia: mgr_ent
    tipo: fim
    rotulo: Legado desligado com segurança
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_com_restricao_de_local_e_acesso
    pergunta: Os dados têm restrições de local e acesso que exigem controle da equipe sobre cada etapa?
    eixo: compliance_dados
  - id: q.migracao_sem_janela_de_parada
    pergunta: O volume exige migrar sem janela de parada, com sincronização contínua entre origem e destino?
    eixo: escala_volume
  - id: q.esquema_simples_e_janela_curta
    pergunta: A mudança é de um esquema simples, com janela curta e ferramenta gráfica de administração?
    eixo: prazo_entrega
objetivo: Mover dados e funções para a nova plataforma em etapas reversíveis, com comparação de resultados em cada etapa, e desligar o legado apenas quando a evidência confirmar equivalência, no ferramental (assinar ou construir) que atende ao controle e ao prazo.
preRequisitos:
  - Inventário de sistemas, consumidores e dependências do legado.
  - Cópia de segurança restaurável testada.
  - Ambiente de homologação com dados representativos e anonimizados.
  - Premissas de volume, janela de parada tolerada, restrições de dados e orçamento.
passos:
  - id: ctx.inventario_e_dependencias
    titulo: Inventariar o legado e seus consumidores
    descricao: Listar dados, funções, integrações e quem consome cada uma, além do volume e das janelas de uso.
    verificacao: O inventário lista consumidores, dependências e volume, e cada item tem um responsável.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.inventario_e_dependencias
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.plano_em_etapas_reversiveis
    titulo: Planejar a migração em etapas reversíveis
    descricao: Dividir o trabalho em etapas pequenas, cada uma com critério de sucesso, ponto de verificação e caminho de volta.
    verificacao: Cada etapa tem critério de sucesso, verificação e reversão descritos e a ordem foi aceita pelos responsáveis.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: exec.mudancas_em_expansao_e_contracao
    titulo: Aplicar mudanças compatíveis em expansão e contração
    descricao: Adicionar as estruturas novas ao lado das antigas, migrar o uso e só então remover o antigo, mantendo as duas versões funcionando.
    verificacao: A aplicação funciona com o esquema antigo e com o novo durante toda a transição.
    depende:
      - prep.plano_em_etapas_reversiveis
  - id: exec.copiar_e_sincronizar_dados
    titulo: Copiar e sincronizar os dados
    descricao: Fazer a carga inicial e manter a sincronização contínua até o corte, tratando conflitos e ordem de eventos.
    verificacao: A origem e o destino convergem e o atraso de sincronização está dentro do limite acordado.
    depende:
      - exec.mudancas_em_expansao_e_contracao
  - id: exec.rotear_trafego_gradualmente
    titulo: Rotear o tráfego aos poucos para o destino
    descricao: Direcionar primeiro leituras e depois escritas ao destino por fatias, ampliando conforme os indicadores.
    verificacao: Cada fatia de tráfego migrada tem indicadores saudáveis antes da próxima.
    depende:
      - exec.copiar_e_sincronizar_dados
  - id: val.comparar_origem_e_destino
    titulo: Comparar resultados entre origem e destino
    descricao: Executar consultas e operações equivalentes nos dois lados, comparando contagens, somas de verificação e respostas da aplicação.
    verificacao: As comparações mostram equivalência nos dados e nos resultados da aplicação, e as diferenças têm explicação registrada.
    depende:
      - exec.rotear_trafego_gradualmente
  - id: ent.corte_com_reversao_pronta
    titulo: Realizar o corte com a reversão pronta
    descricao: Executar o corte em uma janela combinada, com o caminho de volta ensaiado e a comunicação aos consumidores feita.
    verificacao: O corte ocorreu na janela combinada e a reversão foi ensaiada antes.
    depende:
      - val.comparar_origem_e_destino
  - id: ops.desligar_o_legado_e_registrar
    titulo: Desligar o legado após o período de observação
    descricao: Manter o legado somente leitura por um período, arquivar os dados conforme as regras e então desligar, registrando o que foi aprendido.
    verificacao: O legado foi desligado depois do período de observação, com dados arquivados e aprendizados registrados.
    depende:
      - ent.corte_com_reversao_pronta
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Migrar tudo em um único corte, o que concentra o risco e dificulta a reversão.
  - Aplicar mudanças de esquema que quebram a versão anterior, o que obriga uma janela de parada.
  - Desligar o legado logo após o corte, o que remove a rede de segurança antes de a equivalência estar provada.
  - Ignorar consumidores desconhecidos do legado, o que gera falhas após o corte.
validacao:
  - O inventário de consumidores e dependências está completo e com responsáveis.
  - Cada etapa tem critério de sucesso, verificação e reversão testada.
  - A comparação de dados e resultados entre origem e destino confirma a equivalência.
  - O corte ocorreu com a reversão ensaiada e o legado passou por período de observação antes do desligamento.
  - Os aprendizados da migração estão registrados.
padroes:
  - "[[strangler_fig|Strangler Fig]]"
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[change_data_capture|Change Data Capture]]"
  - "[[database_per_service|Database per Service]]"
categorias:
  - "[[migracao_administracao_banco|Migração e administração de banco]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[infraestrutura_como_codigo|Infraestrutura como código]]"
  - "[[agente_codigo|Agente de código]]"
aliases:
  - Migrar um banco de dados
  - Modernizar um sistema legado
grupo: Qualidade entrega e operação
stacks:
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - "[[api_transacional_eventos|API transacional com eventos]]"
ferramentas:
  - "[[liquibase|Liquibase (ferramenta)]]"
  - tabela:flyway
  - "[[dbeaver_community|DBeaver Community]]"
  - "[[tableplus|TablePlus]]"
  - tabela:datagrip
  - tabela:beekeeper-studio
casosDeUso:
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
variacoes:
  - migra-banco-schema
  - migra-monolito-servicos
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como migrar um banco ou sistema legado
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
