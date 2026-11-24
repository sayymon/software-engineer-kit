---
id: criar_site
tipo: guia-pratico
nome: Como criar um site
sigla: sit
descricao: "Caminho para publicar um site: definir público, conteúdo e metas, escolher entre assinar um construtor, assinar uma loja pronta ou construir sobre uma stack, e entregar com desempenho, acessibilidade e medição."
exemplo: "Uma consultoria precisa de um site institucional com blog: os editores publicam sem depender do time técnico, então assina um CMS com construtor visual e valida desempenho e acessibilidade antes de apontar o domínio."
quando_usar:
  - Uma pessoa, um produto ou uma empresa precisa de presença própria na web, com conteúdo, captação de contatos ou venda.
  - Uma página provisória ou um perfil em rede social deixou de atender à necessidade.
quando_evitar:
  - Quando a necessidade é uma aplicação com regras de negócio e dados por usuário (veja o guia de criação de API).
fonte_ids:
  - mdn_learn_web
  - w3c_wcag
fontes:
  - id: mdn_learn_web
    tipo: artigo
    titulo: Learn web development (MDN)
    link: https://developer.mozilla.org/en-US/docs/Learn_web_development
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: w3c_wcag
    tipo: artigo
    titulo: WCAG 2 Overview (W3C Web Accessibility Initiative)
    link: https://www.w3.org/WAI/standards-guidelines/wcag/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: sit_orq
    nome: Orquestração do site
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: sit_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: sit_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: sit_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: sit_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: sit_orq_s0
    raia: sit_orq
    tipo: inicio
    rotulo: Necessidade de presença própria na web
    proximo:
      - para: sit_orq_c1
        condicao: ""
  - id: sit_orq_c1
    raia: sit_orq
    tipo: chamada
    rotulo: Definir público, objetivo e conteúdo
    proximo:
      - para: sit_orq_c2
        condicao: escopo_definido
    raia_chamada: sit_ctx
  - id: sit_orq_c2
    raia: sit_orq
    tipo: chamada
    rotulo: Escolher a abordagem de entrega
    proximo:
      - para: sit_orq_c8
        condicao: assinar_loja
      - para: sit_orq_c7
        condicao: assinar_construtor
      - para: sit_orq_c3
        condicao: construir
    raia_chamada: sit_abd
  - id: sit_orq_c3
    raia: sit_orq
    tipo: chamada
    rotulo: Escolher a stack por contexto
    proximo:
      - para: sit_orq_c4
        condicao: site_estatico
      - para: sit_orq_c5
        condicao: web_fullstack
      - para: sit_orq_c6
        condicao: monolito_relacional
      - para: sit_orq_c9
        condicao: site_3d_webgl
    raia_chamada: sit_stk
  - id: sit_orq_c4
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e1
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_c5
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e2
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_c6
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e3
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_c7
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e4
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_c8
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e5
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_e1
    raia: sit_orq
    tipo: fim
    rotulo: Site publicado sobre a stack de conteúdo estático
    proximo: []
    retorno: site_estatico
    saida:
      tipo: stack
      justificativa: Conteúdo que muda pouco dispensa servidor e banco, e arquivos estáticos em rede de distribuição têm custo baixo, resposta rápida e pouca superfície de ataque.
      eixos:
        - escala_volume
        - orcamento
        - latencia
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
      stack: "[[site_conteudo_estatico|Site de conteúdo estático]]"
  - id: sit_orq_e2
    raia: sit_orq
    tipo: fim
    rotulo: Site publicado sobre a stack web full-stack em JS e TS
    proximo: []
    retorno: web_fullstack
    saida:
      tipo: stack
      justificativa: Áreas logadas e interação rica pedem renderização no servidor e no navegador, e uma linguagem única reaproveita o conhecimento do time em toda a aplicação.
      eixos:
        - time_maturidade
        - latencia
        - lock_in
      objetivo: diferenciar_produto
      notas:
        construir:
          diferenciacao: 5
          tempo_ate_valor: 3
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
      stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - id: sit_orq_e3
    raia: sit_orq
    tipo: fim
    rotulo: Site publicado sobre a stack de monolito relacional
    proximo: []
    retorno: monolito_relacional
    saida:
      tipo: stack
      justificativa: Um único deploy com banco relacional entrega um site com cadastros e regras próprias mais cedo com um time pequeno, e mantém baixos o risco e a dependência de fornecedor.
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
      stack: "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - id: sit_orq_e4
    raia: sit_orq
    tipo: fim
    rotulo: Site publicado em um construtor ou CMS assinado
    proximo: []
    retorno: assinar_construtor
    saida:
      tipo: assinar
      justificativa: Para validar a presença online, o construtor assinado entrega hospedagem, edição visual e publicação em dias, e os editores atualizam o conteúdo sem depender do time técnico.
      eixos:
        - prazo_entrega
        - orcamento
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
      categoria: "[[cms|CMS]]"
      ferramentas:
        - "[[webflow|Webflow]]"
        - "[[contentful|Contentful]]"
        - tabela:ghost
  - id: sit_orq_e5
    raia: sit_orq
    tipo: fim
    rotulo: Loja publicada em uma plataforma de e-commerce assinada
    proximo: []
    retorno: assinar_loja
    saida:
      tipo: assinar
      justificativa: Catálogo, carrinho, pagamento e impostos já vêm integrados na plataforma de loja, o que encurta o prazo e retira do time a operação de um fluxo de compra seguro.
      eixos:
        - prazo_entrega
        - compliance_dados
        - orcamento
      objetivo: cumprir_prazo
      notas:
        construir:
          diferenciacao: 4
          tempo_ate_valor: 1
          custo_total: 2
          dependencia_fornecedor: 5
          risco: 2
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
          risco: 4
      categoria: "[[ecommerce_lojas|E-commerce e lojas]]"
      ferramentas:
        - "[[shopify|Shopify]]"
        - tabela:nuvemshop
        - tabela:bigcommerce
  - id: sit_orq_c9
    raia: sit_orq
    tipo: chamada
    rotulo: Montar, verificar e publicar o site
    proximo:
      - para: sit_orq_e6
        condicao: pronta
    raia_chamada: sit_ent
  - id: sit_orq_e6
    raia: sit_orq
    tipo: fim
    rotulo: Site 3D imersivo publicado com three.js e WebGL
    proximo: []
    retorno: site_3d_webgl
    saida:
      tipo: stack
      justificativa: Uma experiência imersiva pede renderização 3D no navegador. O site estático com ilhas de JavaScript entrega o conteúdo sem servidor e carrega three.js apenas nas páginas que têm cena, o que preserva o desempenho das demais.
      eixos:
        - latencia
        - time_maturidade
        - orcamento
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
          custo_total: 3
          dependencia_fornecedor: 3
          risco: 3
        assinar:
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[site_conteudo_estatico|Site de conteúdo estático]]"
      categoria: "[[bibliotecas_3d_webgl|Bibliotecas 3D e WebGL]]"
      ferramentas:
        - "[[threejs|three.js]]"
        - "[[three_d_force_graph|3d-force-graph]]"
        - "[[mesh3d_gallery|mesh3d gallery]]"
        - "[[threejsai|Three.js AI]]"
  - id: sit_ctx_s0
    raia: sit_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: sit_ctx_t1
        condicao: ""
  - id: sit_ctx_t1
    raia: sit_ctx
    tipo: tarefa
    rotulo: Mapear público, objetivo e conteúdo
    proximo:
      - para: sit_ctx_e1
        condicao: ""
    passos:
      - ctx.publico_e_objetivo
      - ctx.mapa_de_conteudo
  - id: sit_ctx_e1
    raia: sit_ctx
    tipo: fim
    rotulo: Escopo e conteúdo acordados
    proximo: []
    retorno: escopo_definido
  - id: sit_abd_s0
    raia: sit_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: sit_abd_t1
        condicao: ""
  - id: sit_abd_t1
    raia: sit_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: sit_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: sit_abd_g1
    raia: sit_abd
    tipo: bifurcacao
    rotulo: Foco em venda e prazo curto?
    proximo:
      - para: sit_abd_e1
        condicao: sim
      - para: sit_abd_g2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.loja_online_prazo_curto
  - id: sit_abd_g2
    raia: sit_abd
    tipo: bifurcacao
    rotulo: Editores sem time técnico?
    proximo:
      - para: sit_abd_e2
        condicao: sim
      - para: sit_abd_e3
        condicao: não
    eixo: orcamento
    pergunta: q.editores_sem_time_tecnico
  - id: sit_abd_e1
    raia: sit_abd
    tipo: fim
    rotulo: Plataforma de loja pronta
    proximo: []
    retorno: assinar_loja
  - id: sit_abd_e2
    raia: sit_abd
    tipo: fim
    rotulo: Construtor ou CMS assinado
    proximo: []
    retorno: assinar_construtor
  - id: sit_abd_e3
    raia: sit_abd
    tipo: fim
    rotulo: Construir com stack própria
    proximo: []
    retorno: construir
  - id: sit_stk_s0
    raia: sit_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: sit_stk_g3
        condicao: ""
  - id: sit_stk_g1
    raia: sit_stk
    tipo: bifurcacao
    rotulo: Conteúdo estático sem login?
    proximo:
      - para: sit_stk_e1
        condicao: sim
      - para: sit_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.conteudo_estatico_sem_login
  - id: sit_stk_g2
    raia: sit_stk
    tipo: bifurcacao
    rotulo: Interação rica e time em JS e TS?
    proximo:
      - para: sit_stk_e2
        condicao: sim
      - para: sit_stk_e3
        condicao: não
    eixo: time_maturidade
    pergunta: q.interacao_rica_time_js
  - id: sit_stk_e1
    raia: sit_stk
    tipo: fim
    rotulo: Stack de site estático
    proximo: []
    retorno: site_estatico
  - id: sit_stk_e2
    raia: sit_stk
    tipo: fim
    rotulo: Stack web full-stack em JS e TS
    proximo: []
    retorno: web_fullstack
  - id: sit_stk_e3
    raia: sit_stk
    tipo: fim
    rotulo: Stack de monolito relacional
    proximo: []
    retorno: monolito_relacional
  - id: sit_stk_g3
    raia: sit_stk
    tipo: bifurcacao
    rotulo: Experiência 3D imersiva no navegador?
    proximo:
      - para: sit_stk_e4
        condicao: sim
      - para: sit_stk_g1
        condicao: não
    eixo: latencia
    pergunta: q.experiencia_3d_imersiva
  - id: sit_stk_e4
    raia: sit_stk
    tipo: fim
    rotulo: Stack de site 3D com WebGL e three.js
    proximo: []
    retorno: site_3d_webgl
  - id: sit_ent_s0
    raia: sit_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: sit_ent_t1
        condicao: ""
  - id: sit_ent_t1
    raia: sit_ent
    tipo: tarefa
    rotulo: Projetar e montar o site
    proximo:
      - para: sit_ent_g1
        condicao: ""
    passos:
      - prep.estrutura_e_design
      - exec.construir_paginas
      - exec.formularios_e_integracoes
  - id: sit_ent_g1
    raia: sit_ent
    tipo: bifurcacao
    rotulo: O site tem cena 3D?
    proximo:
      - para: sit_ent_t4
        condicao: sim
      - para: sit_ent_t2
        condicao: não
    eixo: latencia
    pergunta: q.site_com_cena_3d
  - id: sit_ent_t4
    raia: sit_ent
    tipo: tarefa
    rotulo: Construir e verificar a cena 3D
    proximo:
      - para: sit_ent_t2
        condicao: ""
    passos:
      - prep.definir_experiencia_3d
      - exec.construir_cena_3d
      - val.desempenho_cena_3d
  - id: sit_ent_t2
    raia: sit_ent
    tipo: tarefa
    rotulo: Verificar qualidade
    proximo:
      - para: sit_ent_t3
        condicao: ""
    passos:
      - val.desempenho_e_acessibilidade
      - val.busca_e_privacidade
  - id: sit_ent_t3
    raia: sit_ent
    tipo: tarefa
    rotulo: Publicar e operar
    proximo:
      - para: sit_ent_e1
        condicao: ""
    passos:
      - ent.publicar_dominio_https
      - ops.medir_e_manter
  - id: sit_ent_e1
    raia: sit_ent
    tipo: fim
    rotulo: Site publicado e medido
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.loja_online_prazo_curto
    pergunta: O foco é vender produtos online e o prazo é curto?
    eixo: prazo_entrega
  - id: q.editores_sem_time_tecnico
    pergunta: Pessoas sem perfil técnico publicam o conteúdo e o orçamento cobre uma assinatura mensal?
    eixo: orcamento
  - id: q.conteudo_estatico_sem_login
    pergunta: O conteúdo muda pouco e o site dispensa área logada?
    eixo: contexto
  - id: q.interacao_rica_time_js
    pergunta: Há áreas logadas com muita interação e o time domina JavaScript e TypeScript?
    eixo: time_maturidade
  - id: q.experiencia_3d_imersiva
    pergunta: O site precisa de uma experiência 3D imersiva (cena interativa, produto em 3D ou visualização de grafo) como parte central da proposta?
    eixo: latencia
  - id: q.site_com_cena_3d
    pergunta: O site inclui uma cena 3D renderizada com WebGL?
    eixo: latencia
objetivo: Publicar um site rápido, acessível e mensurável, na abordagem (assinar ou construir sobre uma stack) que equilibra prazo, custo e autonomia dos editores.
preRequisitos:
  - Público-alvo, objetivo do site e páginas principais.
  - Conteúdo inicial (textos e imagens) ou um responsável por produzi-lo.
  - Domínio escolhido e acesso ao registro de DNS.
  - Orçamento mensal e prazo de publicação.
passos:
  - id: ctx.publico_e_objetivo
    titulo: Definir público, objetivo e métrica de sucesso
    descricao: Registrar quem visita o site, a ação principal esperada (contato, compra, leitura) e a métrica que mede o resultado.
    verificacao: Cada página prevista tem uma ação principal e a métrica de sucesso tem uma meta numérica registrada.
    depende: []
  - id: ctx.mapa_de_conteudo
    titulo: Montar o mapa de páginas e conteúdos
    descricao: Listar as páginas, o conteúdo de cada uma, o responsável por produzi-lo e a chamada para ação.
    verificacao: Cada página do mapa tem objetivo, responsável pelo conteúdo e chamada para ação.
    depende:
      - ctx.publico_e_objetivo
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.publico_e_objetivo
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.estrutura_e_design
    titulo: Definir estrutura visual e componentes
    descricao: Criar esboços de tela e um conjunto pequeno de componentes reutilizáveis, com tipografia, cores e espaçamentos.
    verificacao: As páginas principais têm protótipo aprovado e os componentes cobrem todos os blocos usados.
    depende:
      - ctx.mapa_de_conteudo
      - prep.pontuar_opcoes_matriz
  - id: exec.construir_paginas
    titulo: Montar as páginas com o conteúdo final
    descricao: Construir cada página do mapa na abordagem escolhida, com imagens otimizadas e textos alternativos.
    verificacao: Todas as páginas do mapa abrem com conteúdo final e os links internos funcionam.
    depende:
      - prep.estrutura_e_design
  - id: exec.formularios_e_integracoes
    titulo: Configurar formulários, e-mail e integrações
    descricao: Ligar o formulário de contato, o e-mail de notificação e, quando houver, pagamento, agenda ou chat.
    verificacao: Um envio de teste de cada formulário chega ao destinatário correto.
    depende:
      - exec.construir_paginas
  - id: val.desempenho_e_acessibilidade
    titulo: Verificar desempenho e acessibilidade
    descricao: Medir as métricas de carregamento em celular com rede lenta e conferir os critérios de acessibilidade das diretrizes WCAG.
    verificacao: As métricas de carregamento ficam dentro da meta registrada e a auditoria de acessibilidade não deixa achados críticos abertos.
    depende:
      - exec.construir_paginas
  - id: val.busca_e_privacidade
    titulo: Verificar busca, metadados e privacidade
    descricao: Conferir títulos, descrições, mapa do site, aviso de cookies e coleta mínima de dados pessoais.
    verificacao: Cada página tem título e descrição únicos e o aviso de privacidade cobre toda coleta de dados.
    depende:
      - exec.formularios_e_integracoes
  - id: ent.publicar_dominio_https
    titulo: Publicar com domínio, conexão segura e redirecionamentos
    descricao: Apontar o domínio, ativar o certificado de conexão segura e redirecionar os endereços antigos.
    verificacao: O endereço oficial responde por conexão segura e o endereço antigo redireciona para o novo.
    depende:
      - val.desempenho_e_acessibilidade
      - val.busca_e_privacidade
  - id: ops.medir_e_manter
    titulo: Medir o uso e manter o conteúdo
    descricao: Ativar a medição de visitas e eventos e definir a rotina de atualização do conteúdo e de cópia de segurança.
    verificacao: O painel mostra a métrica de sucesso e há um responsável e uma data para a primeira revisão do conteúdo.
    depende:
      - ent.publicar_dominio_https
  - id: prep.definir_experiencia_3d
    titulo: Definir a experiência 3D e o orçamento de desempenho
    descricao: Estudar referências de sites 3D (mesh3d gallery, Three.js AI e Lusion), decidir o que a cena precisa comunicar, fixar o orçamento de desempenho (quadros por segundo alvo, peso dos modelos e das texturas) e planejar a alternativa para quem não tem WebGL.
    verificacao: O documento da experiência lista a cena, a interação principal, a meta de quadros por segundo em um dispositivo modesto, o limite de peso dos arquivos 3D e a alternativa sem WebGL.
    depende:
      - ctx.mapa_de_conteudo
  - id: exec.construir_cena_3d
    titulo: Construir a cena 3D com three.js
    descricao: Instalar o three.js, montar cena, câmera e renderizador, carregar os modelos otimizados e carregar a cena como ilha de JavaScript apenas nas páginas que a usam. Para grafos 3D, avaliar o 3d-force-graph.
    verificacao: A cena abre na página prevista, responde à interação principal e as páginas sem cena não carregam o three.js.
    depende:
      - prep.definir_experiencia_3d
      - exec.construir_paginas
  - id: val.desempenho_cena_3d
    titulo: Verificar desempenho e acessibilidade da cena 3D
    descricao: Medir os quadros por segundo e o consumo de memória em um dispositivo modesto, respeitar a preferência por menos movimento, oferecer conteúdo equivalente em texto e testar a alternativa sem WebGL.
    verificacao: A cena cumpre a meta de quadros por segundo registrada, a preferência por menos movimento reduz as animações e a alternativa sem WebGL entrega o conteúdo principal.
    depende:
      - exec.construir_cena_3d
comoFazerHoje:
  - passo: exec.construir_cena_3d
    variante: todas
    comandos:
      - npm install three
    versaoTestada: não verificado
    dataVerificacao: 2026-11-24
    fonteUrl: https://github.com/mrdoob/three.js
checklistRefs: {}
armadilhas:
  - Escolher a ferramenta antes de definir a ação principal de cada página.
  - Publicar imagens sem otimização, o que prolonga o carregamento no celular.
  - Coletar dados pessoais sem aviso de privacidade e sem responsável definido.
  - Deixar o conteúdo sem dono, o que o torna desatualizado em poucos meses.
  - Carregar o three.js e modelos 3D pesados em todas as páginas, o que degrada o desempenho em celulares e no primeiro acesso.
  - Publicar uma cena 3D sem alternativa para quem não tem WebGL ou prefere menos movimento.
validacao:
  - Cada página tem uma ação principal e a métrica de sucesso é medida em um painel.
  - As métricas de carregamento cumprem a meta registrada em celular com rede lenta.
  - A auditoria de acessibilidade não deixa achados críticos abertos.
  - Os formulários entregam mensagens de teste ao destinatário correto.
  - O endereço oficial responde por conexão segura e os endereços antigos redirecionam.
  - Quando há cena 3D, ela cumpre a meta de quadros por segundo em um dispositivo modesto e tem alternativa sem WebGL.
padroes:
  - "[[cache_aside|Cache-aside]]"
  - "[[backend_for_frontend|Backend for Frontend]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
categorias:
  - "[[cms|CMS]]"
  - "[[ecommerce_lojas|E-commerce e lojas]]"
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[objetos_cdn|Armazenamento de objetos e CDN]]"
  - "[[dns_dominios|DNS e domínios]]"
  - "[[analytics_produto_web|Analytics de produto e web]]"
  - "[[bibliotecas_3d_webgl|Bibliotecas 3D e WebGL]]"
  - "[[referencias_sites_3d|Referências de sites 3D e WebGL]]"
aliases:
  - Criar um site
  - Construir um site
grupo: Construir software
stacks:
  - "[[site_conteudo_estatico|Site de conteúdo estático]]"
  - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
ferramentas:
  - "[[webflow|Webflow]]"
  - "[[contentful|Contentful]]"
  - tabela:ghost
  - "[[shopify|Shopify]]"
  - tabela:nuvemshop
  - tabela:bigcommerce
  - "[[threejs|three.js]]"
  - "[[three_d_force_graph|3d-force-graph]]"
  - "[[mesh3d_gallery|mesh3d gallery]]"
  - "[[threejsai|Three.js AI]]"
  - "[[lusion|Lusion]]"
  - "[[hubtown|Hubtown]]"
  - "[[onemorethink|One More Think]]"
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[blog_e_newsletter|Blog e newsletter]]"
variacoes:
  - proto-deploy-rapido
  - publicacao-cms
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um site
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
