---
id: criar_extensao
tipo: guia-pratico
nome: Como criar uma extensão (navegador ou editor)
sigla: ext
descricao: "Caminho para entregar uma extensão de navegador ou de editor: confirmar que nenhuma extensão pronta atende, declarar o mínimo de permissões, separar componentes, testar em perfil limpo e publicar na loja oficial."
exemplo: "Um time quer destacar problemas de acessibilidade ao navegar nas páginas internas: nenhuma extensão pronta cobre as regras do time, então constrói uma extensão com permissão mínima, testa em perfil limpo e publica na loja de forma privada."
quando_usar:
  - Uma tarefa repetida acontece dentro do navegador ou do editor e precisa de uma função integrada à interface.
  - Uma extensão pronta não cobre as regras do time ou lê dados que exigem revisão própria.
quando_evitar:
  - Quando uma extensão mantida e confiável já atende à necessidade (o desfecho de adoção deste guia cobre esse caminho).
fonte_ids:
  - chrome_extensions_docs
  - mdn_webextensions
  - vscode_extension_api
fontes:
  - id: chrome_extensions_docs
    tipo: artigo
    titulo: Chrome Extensions (Chrome for Developers)
    link: https://developer.chrome.com/docs/extensions
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: mdn_webextensions
    tipo: artigo
    titulo: Browser extensions (MDN)
    link: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: vscode_extension_api
    tipo: artigo
    titulo: Extension API (Visual Studio Code)
    link: https://code.visualstudio.com/api
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: ext_orq
    nome: Orquestração da extensão
    responsabilidade: Encadear contexto, abordagem e entrega até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: ext_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: ext_abd
    nome: Abordagem de entrega
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: ext_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: ext_orq_s0
    raia: ext_orq
    tipo: inicio
    rotulo: Necessidade de uma função integrada ao navegador ou ao editor
    proximo:
      - para: ext_orq_c1
        condicao: ""
  - id: ext_orq_c1
    raia: ext_orq
    tipo: chamada
    rotulo: Definir o problema e a superfície de atuação
    proximo:
      - para: ext_orq_c2
        condicao: problema_definido
    raia_chamada: ext_ctx
  - id: ext_orq_c2
    raia: ext_orq
    tipo: chamada
    rotulo: Escolher entre adotar, ajustar ou construir
    proximo:
      - para: ext_orq_c3
        condicao: construir_extensao
      - para: ext_orq_c4
        condicao: adotar_pronta
      - para: ext_orq_c5
        condicao: script_de_usuario
    raia_chamada: ext_abd
  - id: ext_orq_c3
    raia: ext_orq
    tipo: chamada
    rotulo: Construir, verificar e publicar a extensão
    proximo:
      - para: ext_orq_e1
        condicao: pronta
    raia_chamada: ext_ent
  - id: ext_orq_c4
    raia: ext_orq
    tipo: chamada
    rotulo: Construir, verificar e publicar a extensão
    proximo:
      - para: ext_orq_e2
        condicao: pronta
    raia_chamada: ext_ent
  - id: ext_orq_c5
    raia: ext_orq
    tipo: chamada
    rotulo: Construir, verificar e publicar a extensão
    proximo:
      - para: ext_orq_e3
        condicao: pronta
    raia_chamada: ext_ent
  - id: ext_orq_e1
    raia: ext_orq
    tipo: fim
    rotulo: Extensão entregue sobre a stack web full-stack em JS e TS
    proximo: []
    retorno: construir_extensao
    saida:
      tipo: stack
      justificativa: Extensões usam tecnologias da web, e a stack em JavaScript e TypeScript dá ao time uma linguagem única para interface, lógica e testes, com controle total das permissões.
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
          diferenciacao: 2
          tempo_ate_valor: 4
          custo_total: 3
          dependencia_fornecedor: 2
          risco: 3
      stack: "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
  - id: ext_orq_e2
    raia: ext_orq
    tipo: fim
    rotulo: Extensão pronta adotada
    proximo: []
    retorno: adotar_pronta
    saida:
      tipo: comprar
      justificativa: Uma extensão mantida cobre a necessidade sem esforço de construção, e o time só precisa revisar as permissões e o fornecedor antes de distribuir para as pessoas.
      eixos:
        - prazo_entrega
        - compliance_dados
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
      categoria: "[[extensoes_navegador|Extensões de navegador]]"
      ferramentas:
        - "[[grammarly|Grammarly]]"
        - tabela:wappalyzer
        - tabela:vimium
  - id: ext_orq_e3
    raia: ext_orq
    tipo: fim
    rotulo: Ajuste entregue como script de usuário
    proximo: []
    retorno: script_de_usuario
    saida:
      tipo: construir
      justificativa: Um ajuste pontual em poucas páginas, sem distribuição a terceiros, cabe em um script de usuário que custa pouco e dispensa o processo de revisão da loja.
      eixos:
        - escala_volume
        - orcamento
        - prazo_entrega
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
      categoria: "[[extensoes_navegador|Extensões de navegador]]"
      ferramentas:
        - tabela:tampermonkey
  - id: ext_ctx_s0
    raia: ext_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: ext_ctx_t1
        condicao: ""
  - id: ext_ctx_t1
    raia: ext_ctx
    tipo: tarefa
    rotulo: Definir o problema e a superfície de atuação
    proximo:
      - para: ext_ctx_e1
        condicao: ""
    passos:
      - ctx.problema_e_superficie
  - id: ext_ctx_e1
    raia: ext_ctx
    tipo: fim
    rotulo: Problema e superfície acordados
    proximo: []
    retorno: problema_definido
  - id: ext_abd_s0
    raia: ext_abd
    tipo: inicio
    rotulo: Início da escolha
    proximo:
      - para: ext_abd_t1
        condicao: ""
  - id: ext_abd_t1
    raia: ext_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: ext_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: ext_abd_g1
    raia: ext_abd
    tipo: bifurcacao
    rotulo: Dados sensíveis e revisão própria?
    proximo:
      - para: ext_abd_e1
        condicao: sim
      - para: ext_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_sensiveis_do_ambiente
  - id: ext_abd_g2
    raia: ext_abd
    tipo: bifurcacao
    rotulo: Extensão pronta cobre?
    proximo:
      - para: ext_abd_e2
        condicao: sim
      - para: ext_abd_g3
        condicao: não
    eixo: prazo_entrega
    pergunta: q.extensao_pronta_cobre
  - id: ext_abd_g3
    raia: ext_abd
    tipo: bifurcacao
    rotulo: Ajuste pontual sem distribuição?
    proximo:
      - para: ext_abd_e3
        condicao: sim
      - para: ext_abd_e1
        condicao: não
    eixo: escala_volume
    pergunta: q.ajuste_pontual_sem_distribuicao
  - id: ext_abd_e1
    raia: ext_abd
    tipo: fim
    rotulo: Construir a extensão
    proximo: []
    retorno: construir_extensao
  - id: ext_abd_e2
    raia: ext_abd
    tipo: fim
    rotulo: Adotar extensão pronta
    proximo: []
    retorno: adotar_pronta
  - id: ext_abd_e3
    raia: ext_abd
    tipo: fim
    rotulo: Script de usuário
    proximo: []
    retorno: script_de_usuario
  - id: ext_ent_s0
    raia: ext_ent
    tipo: inicio
    rotulo: Início da entrega
    proximo:
      - para: ext_ent_t1
        condicao: ""
  - id: ext_ent_t1
    raia: ext_ent
    tipo: tarefa
    rotulo: Declarar permissões e construir
    proximo:
      - para: ext_ent_t2
        condicao: ""
    passos:
      - prep.manifesto_e_permissoes
      - prep.componentes_e_mensagens
      - exec.implementar_funcao_principal
      - exec.estado_e_configuracoes
  - id: ext_ent_t2
    raia: ext_ent
    tipo: tarefa
    rotulo: Testar e revisar
    proximo:
      - para: ext_ent_t3
        condicao: ""
    passos:
      - val.testes_em_perfil_limpo
      - val.seguranca_e_privacidade
  - id: ext_ent_t3
    raia: ext_ent
    tipo: tarefa
    rotulo: Publicar e acompanhar
    proximo:
      - para: ext_ent_e1
        condicao: ""
    passos:
      - ent.publicar_na_loja
      - ops.atualizar_e_acompanhar
  - id: ext_ent_e1
    raia: ext_ent
    tipo: fim
    rotulo: Extensão entregue ou adotada
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_sensiveis_do_ambiente
    pergunta: A extensão lê dados sensíveis do navegador ou do editor e exige revisão própria de permissões?
    eixo: compliance_dados
  - id: q.extensao_pronta_cobre
    pergunta: Existe uma extensão mantida e confiável que cobre a necessidade?
    eixo: prazo_entrega
  - id: q.ajuste_pontual_sem_distribuicao
    pergunta: A necessidade é um ajuste pontual em páginas específicas, sem distribuição a terceiros?
    eixo: escala_volume
objetivo: Entregar uma extensão com permissões mínimas, componentes separados e dados protegidos, ou adotar uma extensão pronta quando ela atender, no caminho que equilibra prazo, controle e segurança.
preRequisitos:
  - Descrição do problema e do ambiente (navegador ou editor) onde a função vive.
  - Lista das páginas, dados e ações que a extensão precisa tocar.
  - Conta de publicação na loja oficial do ambiente.
  - Premissas de dados sensíveis, prazo e orçamento.
passos:
  - id: ctx.problema_e_superficie
    titulo: Definir o problema e onde a extensão atua
    descricao: Descrever o problema, o ambiente (navegador ou editor), as páginas ou arquivos tocados e os dados lidos ou gravados.
    verificacao: O problema cabe em uma frase e a lista de páginas, dados e ações tocados está registrada.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.problema_e_superficie
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.manifesto_e_permissoes
    titulo: Declarar o manifesto com o mínimo de permissões
    descricao: Escrever o manifesto com nome, ícones e somente as permissões necessárias, restringindo os endereços alcançados.
    verificacao: Cada permissão pedida tem uma justificativa de uma frase ligada a uma função.
    depende:
      - prep.pontuar_opcoes_matriz
  - id: prep.componentes_e_mensagens
    titulo: Separar componentes e definir mensagens
    descricao: Dividir a lógica entre o processo de fundo, a interface e o código injetado nas páginas, com mensagens tipadas entre eles.
    verificacao: Cada mensagem entre componentes tem formato documentado e um teste.
    depende:
      - prep.manifesto_e_permissoes
  - id: exec.implementar_funcao_principal
    titulo: Implementar a função principal
    descricao: Construir a função de maior valor ponta a ponta, da interface ao efeito na página ou no editor.
    verificacao: A função principal funciona nas páginas ou arquivos alvo a partir de uma instalação local de desenvolvimento.
    depende:
      - prep.componentes_e_mensagens
  - id: exec.estado_e_configuracoes
    titulo: Guardar estado e configurações da pessoa
    descricao: Salvar preferências e estado no armazenamento da extensão, com migração entre versões do formato.
    verificacao: As configurações persistem após reiniciar o ambiente e uma versão nova lê o formato anterior.
    depende:
      - exec.implementar_funcao_principal
  - id: val.testes_em_perfil_limpo
    titulo: Testar em perfil limpo do ambiente
    descricao: Instalar, atualizar e remover a extensão em um perfil limpo e rodar os testes automatizados da função principal.
    verificacao: A extensão instala, atualiza e remove sem deixar dados residuais em um perfil limpo.
    depende:
      - exec.estado_e_configuracoes
  - id: val.seguranca_e_privacidade
    titulo: Revisar segurança e privacidade
    descricao: Revisar permissões, política de segurança de conteúdo, tratamento de dados da pessoa e dependências externas.
    verificacao: Nenhum dado sai do aparelho sem declaração na política de privacidade e nenhum código remoto é carregado em tempo de execução.
    depende:
      - exec.implementar_funcao_principal
  - id: ent.publicar_na_loja
    titulo: Empacotar e publicar na loja oficial
    descricao: Gerar o pacote, preparar descrição, imagens e política de privacidade e escolher a visibilidade pública ou privada.
    verificacao: A extensão passa na revisão da loja com descrição, imagens e política de privacidade.
    depende:
      - val.testes_em_perfil_limpo
      - val.seguranca_e_privacidade
  - id: ops.atualizar_e_acompanhar
    titulo: Acompanhar avaliações e publicar atualizações
    descricao: Responder avaliações, acompanhar falhas reportadas e definir a cadência de atualizações e a política de remoção de funções.
    verificacao: Há um canal de feedback visível na página da loja e uma data para a primeira atualização planejada.
    depende:
      - ent.publicar_na_loja
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Pedir permissões amplas por conveniência, o que amplia o risco e atrasa a revisão da loja.
  - Carregar código remoto em tempo de execução, o que as lojas recusam e abre brechas de segurança.
  - Misturar lógica de página, interface e processo de fundo sem mensagens definidas, o que dificulta testes.
  - Publicar sem política de privacidade quando a extensão toca dados da pessoa.
validacao:
  - Cada permissão do manifesto tem justificativa ligada a uma função.
  - A extensão instala, atualiza e remove sem resíduos em um perfil limpo.
  - Nenhum dado sai do aparelho sem declaração na política de privacidade.
  - A função principal passa nos testes automatizados nas páginas ou arquivos alvo.
  - A extensão passa na revisão da loja oficial.
padroes:
  - "[[observer|Observer (GoF)]]"
  - "[[mediator|Mediator (GoF)]]"
  - "[[adapter|Adapter (GoF)]]"
  - "[[facade|Facade (GoF)]]"
categorias:
  - "[[extensoes_navegador|Extensões de navegador]]"
  - "[[frameworks_frontend_web|Frameworks de frontend web]]"
  - "[[testes_qa|Testes e QA]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
aliases:
  - Criar uma extensão
  - Criar uma extensão de navegador
  - Criar uma extensão de editor
grupo: Construir software
stacks:
  - "[[web_fullstack_js_ts|Aplicação web full-stack em JavaScript e TypeScript]]"
ferramentas:
  - "[[grammarly|Grammarly]]"
  - tabela:wappalyzer
  - tabela:vimium
  - tabela:tampermonkey
casosDeUso:
  - "[[prototipacao_de_front_end|Prototipação de front-end]]"
  - "[[automacao_de_navegador_e_rpa|Automação de navegador e RPA]]"
variacoes:
  - proto-componentes
  - rpa-script-navegador
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar uma extensão (navegador ou editor)
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
