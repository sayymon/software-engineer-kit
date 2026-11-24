---
id: criar_video
tipo: guia-pratico
nome: Como criar um vídeo
sigla: vid
descricao: "Caminho para produzir um vídeo: definir objetivo, formato e plataforma de destino, escolher entre assinar um editor ou gerador com IA ou construir um fluxo automatizado, montar roteiro, imagem, áudio e legendas e publicar com direitos e acessibilidade."
exemplo: "Uma pequena empresa quer vídeos curtos semanais: grava o roteiro, usa um editor com IA para cortes, legendas e trilha, e publica em formatos verticais e horizontais com legendas revisadas."
quando_usar:
  - Uma pessoa ou equipe precisa produzir vídeos com regularidade para explicar, vender, ensinar ou divulgar.
  - O custo ou o tempo da edição tradicional impede o ritmo de publicação desejado.
quando_evitar:
  - Quando o conteúdo é uma única imagem ou um texto que comunica melhor e mais rápido que um vídeo.
fonte_ids:
  - w3c_wcag
  - c2pa_spec
fontes:
  - id: w3c_wcag
    tipo: artigo
    titulo: WCAG 2 Overview (W3C Web Accessibility Initiative)
    link: https://www.w3.org/WAI/standards-guidelines/wcag/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: c2pa_spec
    tipo: artigo
    titulo: C2PA Technical Specification (Content Credentials)
    link: https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: vid_orq
    nome: Orquestração do vídeo
    responsabilidade: Encadear contexto, abordagem, stack e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: vid_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: vid_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: vid_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: vid_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: vid_orq_s0
    raia: vid_orq
    tipo: inicio
    rotulo: Necessidade de produzir um vídeo
    proximo:
      - para: vid_orq_c1
        condicao: ""
  - id: vid_orq_c1
    raia: vid_orq
    tipo: chamada
    rotulo: Definir objetivo, formato e roteiro
    proximo:
      - para: vid_orq_c2
        condicao: roteiro_definido
    raia_chamada: vid_ctx
  - id: vid_orq_c2
    raia: vid_orq
    tipo: chamada
    rotulo: Escolher a abordagem de produção
    proximo:
      - para: vid_orq_c7
        condicao: assinar_gerador
      - para: vid_orq_c3
        condicao: construir
      - para: vid_orq_c6
        condicao: assinar_editor
    raia_chamada: vid_abd
  - id: vid_orq_c3
    raia: vid_orq
    tipo: chamada
    rotulo: Escolher a stack de automação
    proximo:
      - para: vid_orq_c4
        condicao: automacao
      - para: vid_orq_c5
        condicao: pipeline_em_codigo
    raia_chamada: vid_stk
  - id: vid_orq_c4
    raia: vid_orq
    tipo: chamada
    rotulo: Produzir, revisar e publicar o vídeo
    proximo:
      - para: vid_orq_e1
        condicao: pronta
    raia_chamada: vid_ent
  - id: vid_orq_c5
    raia: vid_orq
    tipo: chamada
    rotulo: Produzir, revisar e publicar o vídeo
    proximo:
      - para: vid_orq_e2
        condicao: pronta
    raia_chamada: vid_ent
  - id: vid_orq_c6
    raia: vid_orq
    tipo: chamada
    rotulo: Produzir, revisar e publicar o vídeo
    proximo:
      - para: vid_orq_e3
        condicao: pronta
    raia_chamada: vid_ent
  - id: vid_orq_c7
    raia: vid_orq
    tipo: chamada
    rotulo: Produzir, revisar e publicar o vídeo
    proximo:
      - para: vid_orq_e4
        condicao: pronta
    raia_chamada: vid_ent
  - id: vid_orq_e1
    raia: vid_orq
    tipo: fim
    rotulo: Vídeos em série sobre a stack de automação e integrações
    proximo: []
    retorno: automacao
    saida:
      tipo: stack
      justificativa: Para vídeos em série, a automação com gatilhos, filas e integrações encadeia roteiro, geração, edição e publicação com repetição segura e revisão humana nos pontos de risco.
      eixos:
        - escala_volume
        - prazo_entrega
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
      stack: "[[automacao_integracoes|Automação e integrações orquestradas]]"
  - id: vid_orq_e2
    raia: vid_orq
    tipo: fim
    rotulo: Vídeo produzido por um pipeline em código
    proximo: []
    retorno: pipeline_em_codigo
    saida:
      tipo: construir
      justificativa: Quando o formato é próprio e exige controle de cada quadro, um pipeline em código com ferramentas abertas de edição e composição dá repetibilidade, versionamento e liberdade de estilo.
      eixos:
        - time_maturidade
        - lock_in
        - compliance_dados
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
      categoria: "[[edicao_video|Edição de vídeo]]"
      ferramentas:
        - tabela:ffmpeg
        - "[[davinci_resolve|DaVinci Resolve]]"
        - tabela:blender
  - id: vid_orq_e3
    raia: vid_orq
    tipo: fim
    rotulo: Vídeo produzido em um editor com IA assinado
    proximo: []
    retorno: assinar_editor
    saida:
      tipo: assinar
      justificativa: Para vídeos pontuais, o editor assinado entrega cortes, legendas, trilha e exportação por plataforma em horas, sem montar fluxo próprio.
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
      categoria: "[[edicao_video|Edição de vídeo]]"
      ferramentas:
        - "[[capcut|CapCut]]"
        - tabela:descript
        - tabela:veed
  - id: vid_orq_e4
    raia: vid_orq
    tipo: fim
    rotulo: Cenas geradas em um serviço de vídeo por IA assinado
    proximo: []
    retorno: assinar_gerador
    saida:
      tipo: assinar
      justificativa: Quando não há gravação, o serviço de geração por IA transforma texto e imagem em cenas em minutos, e a equipe revisa direitos, consistência e identificação de origem antes de publicar.
      eixos:
        - prazo_entrega
        - orcamento
        - compliance_dados
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
      categoria: "[[geracao_video|Ferramentas de geração de vídeo]]"
      ferramentas:
        - "[[runway|Runway]]"
        - tabela:kling
        - tabela:luma-dream-machine
  - id: vid_ctx_s0
    raia: vid_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: vid_ctx_t1
        condicao: ""
  - id: vid_ctx_t1
    raia: vid_ctx
    tipo: tarefa
    rotulo: Definir objetivo, formato e roteiro
    proximo:
      - para: vid_ctx_e1
        condicao: ""
    passos:
      - ctx.objetivo_e_formato
      - ctx.roteiro_e_direitos
  - id: vid_ctx_e1
    raia: vid_ctx
    tipo: fim
    rotulo: Objetivo, formato e roteiro acordados
    proximo: []
    retorno: roteiro_definido
  - id: vid_abd_s0
    raia: vid_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: vid_abd_t1
        condicao: ""
  - id: vid_abd_t1
    raia: vid_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: vid_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: vid_abd_g1
    raia: vid_abd
    tipo: bifurcacao
    rotulo: Cenas geradas por IA?
    proximo:
      - para: vid_abd_e1
        condicao: sim
      - para: vid_abd_g2
        condicao: não
    eixo: contexto
    pergunta: q.gerar_cenas_por_ia
  - id: vid_abd_g2
    raia: vid_abd
    tipo: bifurcacao
    rotulo: Controle próprio de imagem e voz?
    proximo:
      - para: vid_abd_e2
        condicao: sim
      - para: vid_abd_g3
        condicao: não
    eixo: compliance_dados
    pergunta: q.direitos_e_dados_sob_controle
  - id: vid_abd_g3
    raia: vid_abd
    tipo: bifurcacao
    rotulo: Vídeo pontual com editor pronto?
    proximo:
      - para: vid_abd_e3
        condicao: sim
      - para: vid_abd_e2
        condicao: não
    eixo: prazo_entrega
    pergunta: q.video_pontual_editor_com_ia
  - id: vid_abd_e1
    raia: vid_abd
    tipo: fim
    rotulo: Gerador de vídeo por IA assinado
    proximo: []
    retorno: assinar_gerador
  - id: vid_abd_e2
    raia: vid_abd
    tipo: fim
    rotulo: Construir o fluxo de produção
    proximo: []
    retorno: construir
  - id: vid_abd_e3
    raia: vid_abd
    tipo: fim
    rotulo: Editor de vídeo com IA assinado
    proximo: []
    retorno: assinar_editor
  - id: vid_stk_s0
    raia: vid_stk
    tipo: inicio
    rotulo: Início da escolha da stack
    proximo:
      - para: vid_stk_g1
        condicao: ""
  - id: vid_stk_g1
    raia: vid_stk
    tipo: bifurcacao
    rotulo: Série recorrente com gatilhos?
    proximo:
      - para: vid_stk_e1
        condicao: sim
      - para: vid_stk_e2
        condicao: não
    eixo: escala_volume
    pergunta: q.serie_recorrente_com_gatilhos
  - id: vid_stk_e1
    raia: vid_stk
    tipo: fim
    rotulo: Stack de automação e integrações
    proximo: []
    retorno: automacao
  - id: vid_stk_e2
    raia: vid_stk
    tipo: fim
    rotulo: Pipeline de vídeo em código
    proximo: []
    retorno: pipeline_em_codigo
  - id: vid_ent_s0
    raia: vid_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: vid_ent_t1
        condicao: ""
  - id: vid_ent_t1
    raia: vid_ent
    tipo: tarefa
    rotulo: Produzir imagem, áudio e legendas
    proximo:
      - para: vid_ent_t2
        condicao: ""
    passos:
      - exec.captar_ou_gerar_imagem
      - exec.audio_e_narracao
      - exec.edicao_e_legendas
  - id: vid_ent_t2
    raia: vid_ent
    tipo: tarefa
    rotulo: Revisar qualidade e direitos
    proximo:
      - para: vid_ent_t3
        condicao: ""
    passos:
      - val.revisao_tecnica_e_acessibilidade
      - val.direitos_e_identificacao_de_origem
  - id: vid_ent_t3
    raia: vid_ent
    tipo: tarefa
    rotulo: Publicar e medir
    proximo:
      - para: vid_ent_e1
        condicao: ""
    passos:
      - ent.exportar_por_plataforma
      - ops.medir_e_reaproveitar
  - id: vid_ent_e1
    raia: vid_ent
    tipo: fim
    rotulo: Vídeo publicado e medido
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.gerar_cenas_por_ia
    pergunta: As cenas serão geradas por IA a partir de texto ou imagem, sem gravação própria?
    eixo: contexto
  - id: q.direitos_e_dados_sob_controle
    pergunta: O vídeo usa imagem, voz ou dados de pessoas que exigem controle próprio de armazenamento e uso?
    eixo: compliance_dados
  - id: q.video_pontual_editor_com_ia
    pergunta: O vídeo é pontual ou de baixo volume, e um editor com recursos de IA entrega no prazo?
    eixo: prazo_entrega
  - id: q.serie_recorrente_com_gatilhos
    pergunta: Os vídeos saem em série, com entradas e publicações disparadas por gatilhos e integrações?
    eixo: escala_volume
objetivo: Publicar vídeos no formato da plataforma de destino, com roteiro, áudio e legendas revisados, direitos conferidos e identificação de conteúdo gerado, na abordagem (assinar ou construir) que atende ao prazo, ao volume e ao controle.
preRequisitos:
  - Objetivo do vídeo, público e plataforma de destino.
  - Material de origem (gravações, imagens, textos) com direito de uso confirmado.
  - Identidade visual e de voz definida, quando houver.
  - Premissas de volume, prazo e orçamento.
passos:
  - id: ctx.objetivo_e_formato
    titulo: Definir objetivo, público e formato por plataforma
    descricao: Registrar o objetivo do vídeo, o público, a plataforma de destino, a duração e a proporção de tela, e a ação esperada do espectador.
    verificacao: O objetivo, a plataforma, a duração e a proporção de tela estão escritos, com a ação esperada do público.
    depende: []
  - id: ctx.roteiro_e_direitos
    titulo: Escrever o roteiro e conferir os direitos do material
    descricao: Escrever o roteiro com gancho, desenvolvimento e chamada para ação, e listar o material usado com a origem e o direito de uso.
    verificacao: O roteiro foi revisado por uma pessoa e cada item de material tem origem e direito de uso confirmados.
    depende:
      - ctx.objetivo_e_formato
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.roteiro_e_direitos
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.captar_ou_gerar_imagem
    titulo: Captar ou gerar as imagens
    descricao: Gravar as cenas ou gerar as imagens e cenas por IA, guardando as instruções usadas e mantendo a consistência de personagens e estilo.
    verificacao: As cenas cobrem o roteiro, mantêm estilo consistente e as instruções de geração estão guardadas.
    depende:
      - ctx.roteiro_e_direitos
      - prep.pontuar_opcoes_matriz
  - id: exec.audio_e_narracao
    titulo: Preparar narração, trilha e limpeza de áudio
    descricao: Gravar ou sintetizar a narração com voz autorizada, limpar ruídos, escolher trilha com licença e equilibrar os volumes.
    verificacao: A narração é inteligível em ambiente de ruído comum e a voz e a trilha têm autorização e licença registradas.
    depende:
      - exec.captar_ou_gerar_imagem
  - id: exec.edicao_e_legendas
    titulo: Editar, legendar e revisar a legenda
    descricao: Montar os cortes no ritmo da plataforma, gerar a legenda automática e revisar palavra por palavra, incluindo nomes e termos técnicos.
    verificacao: A legenda foi revisada por uma pessoa e sincronizada, e o ritmo dos cortes respeita a duração prevista.
    depende:
      - exec.audio_e_narracao
  - id: val.revisao_tecnica_e_acessibilidade
    titulo: Revisar qualidade técnica e acessibilidade
    descricao: Conferir resolução, áudio, proporção, contraste das legendas e conteúdo sem efeitos que causem desconforto, em dois aparelhos.
    verificacao: O vídeo foi assistido em dois aparelhos sem falhas e as legendas têm contraste e leitura adequados.
    depende:
      - exec.edicao_e_legendas
  - id: val.direitos_e_identificacao_de_origem
    titulo: Conferir direitos e identificar conteúdo gerado
    descricao: Rever os direitos de imagem, voz e música, e indicar o uso de IA de acordo com as regras da plataforma e com a identificação de origem do conteúdo.
    verificacao: Todos os direitos foram conferidos e a indicação de conteúdo gerado por IA está aplicada onde a regra pede.
    depende:
      - val.revisao_tecnica_e_acessibilidade
  - id: ent.exportar_por_plataforma
    titulo: Exportar e publicar por plataforma
    descricao: Exportar nos formatos de cada plataforma, preparar título, descrição e miniatura e publicar no horário escolhido.
    verificacao: Cada plataforma recebeu o formato certo com título, descrição e miniatura revisados.
    depende:
      - val.direitos_e_identificacao_de_origem
  - id: ops.medir_e_reaproveitar
    titulo: Medir o resultado e reaproveitar o material
    descricao: Acompanhar retenção, alcance e a ação esperada, e transformar os melhores trechos em novos cortes e formatos.
    verificacao: O resultado de cada vídeo está registrado e os trechos de melhor retenção viram novos cortes.
    depende:
      - ent.exportar_por_plataforma
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Publicar com a legenda automática sem revisão, o que mantém erros de nomes e termos e prejudica a acessibilidade.
  - Usar imagem, voz ou música sem confirmar o direito de uso, o que expõe a conta a remoções e a disputas.
  - Gerar cenas por IA sem manter estilo e personagens consistentes, o que quebra a identidade do vídeo.
  - Produzir um formato único para todas as plataformas, o que perde retenção por proporção e duração inadequadas.
validacao:
  - O vídeo foi assistido em dois aparelhos sem falhas de imagem ou de áudio.
  - A legenda foi revisada por uma pessoa e tem contraste e leitura adequados.
  - Imagem, voz e música têm direito de uso confirmado e a indicação de conteúdo gerado por IA está aplicada.
  - Cada plataforma recebeu o formato, o título e a miniatura adequados.
  - O resultado de cada vídeo está registrado e orienta os próximos.
padroes:
  - "[[prompt_chaining|Prompt Chaining]]"
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[parallelization_llm|Parallelization]]"
  - "[[inbox_idempotent_consumer|Idempotência]]"
  - "[[retry_backoff_exponencial|Retry]]"
categorias:
  - "[[edicao_video|Edição de vídeo]]"
  - "[[geracao_video|Ferramentas de geração de vídeo]]"
  - "[[geracao_audio|Ferramentas de áudio e voz]]"
  - "[[automacao_nocode|Automação e no-code]]"
  - "[[musica_audio|Música e áudio]]"
  - "[[reunioes_transcricao|Reuniões e transcrição]]"
aliases:
  - Produzir um vídeo
  - Criar um vídeo com IA
grupo: IA aplicada
stacks:
  - "[[automacao_integracoes|Automação e integrações orquestradas]]"
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - tabela:ffmpeg
  - "[[davinci_resolve|DaVinci Resolve]]"
  - tabela:blender
  - "[[capcut|CapCut]]"
  - tabela:descript
  - tabela:veed
  - "[[runway|Runway]]"
  - tabela:kling
  - tabela:luma-dream-machine
casosDeUso:
  - "[[producao_de_video|Produção de vídeo]]"
  - "[[criacao_de_conteudo_pessoa_fisica|Criação de conteúdo (pessoa física)]]"
variacoes:
  - video-curto-vertical
  - video-youtube
  - video-apresentacao
  - criador-video-redes
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um vídeo
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
