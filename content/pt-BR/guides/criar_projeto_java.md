---
id: criar_projeto_java
tipo: guia-pratico
nome: Como criar um projeto Java
sigla: jav
descricao: "Caminho para começar um serviço Java novo: fixar requisitos, escolher entre Spring Boot, Quarkus e Micronaut e entre Maven e Gradle, instalar o JDK, gerar o projeto base com o inicializador oficial do framework, rodar a aplicação e os testes e deixar o build reproduzível para o time."
exemplo: "Um time com experiência em Spring precisa de uma API de negócio com banco relacional: escolhe Spring Boot com Maven, gera o projeto no inicializador, roda a aplicação e os testes e versiona o wrapper do build junto com o código."
quando_usar:
  - Um serviço Java novo vai nascer e o time precisa decidir framework e ferramenta de build com critérios claros.
  - Um serviço existente será recriado em outro framework e o projeto base precisa seguir o mesmo caminho verificável.
quando_evitar:
  - "Quando o projeto já existe e só falta adicionar uma dependência ou um módulo: edite o arquivo de build existente."
fonte_ids:
  - spring_quickstart
  - spring_initializr_reference
  - quarkus_getting_started
  - quarkus_maven_tooling
  - micronaut_starter_guide
  - maven_five_minutes
  - gradle_init_tutorial
fontes:
  - id: spring_quickstart
    tipo: artigo
    titulo: Spring Quickstart Guide (Spring)
    link: https://spring.io/quickstart
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: spring_initializr_reference
    tipo: artigo
    titulo: Spring Initializr Reference Guide
    link: https://docs.spring.io/initializr/docs/current/reference/html/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: quarkus_getting_started
    tipo: artigo
    titulo: Creating your first application (Quarkus Guides)
    link: https://quarkus.io/guides/getting-started
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: quarkus_maven_tooling
    tipo: artigo
    titulo: Building Quarkus apps with Maven (Quarkus Guides)
    link: https://quarkus.io/guides/maven-tooling
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: micronaut_starter_guide
    tipo: artigo
    titulo: Micronaut Starter CLI Guide (comandos mn)
    link: https://micronaut-projects.github.io/micronaut-starter/latest/guide/
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: maven_five_minutes
    tipo: artigo
    titulo: Maven in 5 Minutes (Apache Maven)
    link: https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: gradle_init_tutorial
    tipo: artigo
    titulo: "Part 1: Initializing the Project (Gradle User Manual)"
    link: https://docs.gradle.org/current/userguide/part1_gradle_init.html
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: jav_orq
    nome: Orquestração do projeto Java
    responsabilidade: Encadear contexto, escolha de framework e build e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: jav_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: jav_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: jav_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: jav_orq_s0
    raia: jav_orq
    tipo: inicio
    rotulo: Necessidade de um serviço Java novo
    proximo:
      - para: jav_orq_c1
        condicao: ""
  - id: jav_orq_c1
    raia: jav_orq
    tipo: chamada
    rotulo: Definir requisitos e experiência do time
    proximo:
      - para: jav_orq_c2
        condicao: requisitos_definidos
    raia_chamada: jav_ctx
  - id: jav_orq_c2
    raia: jav_orq
    tipo: chamada
    rotulo: Escolher framework e ferramenta de build
    proximo:
      - para: jav_orq_c3
        condicao: quarkus_maven
      - para: jav_orq_c4
        condicao: quarkus_gradle
      - para: jav_orq_c5
        condicao: micronaut_maven
      - para: jav_orq_c6
        condicao: micronaut_gradle
      - para: jav_orq_c7
        condicao: spring_gradle
      - para: jav_orq_c8
        condicao: spring_maven
    raia_chamada: jav_stk
  - id: jav_orq_c3
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e1
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_c4
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e2
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_c5
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e3
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_c6
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e4
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_c7
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e5
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_c8
    raia: jav_orq
    tipo: chamada
    rotulo: Instalar, gerar, rodar e entregar o projeto base
    proximo:
      - para: jav_orq_e6
        condicao: pronta
    raia_chamada: jav_ent
  - id: jav_orq_e1
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Quarkus com Maven criado
    proximo: []
    retorno: quarkus_maven
    saida:
      tipo: construir
      justificativa: Arranque rápido, modo de desenvolvimento com recarga e caminho para imagem nativa pedem Quarkus, e o Maven é a escolha do time para o build.
      eixos:
        - latencia
        - escala_volume
        - time_maturidade
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
      categoria: "[[frameworks_backend|Frameworks de backend]]"
      ferramentas:
        - "[[quarkus|Quarkus]]"
        - tabela:apache-maven
  - id: jav_orq_e2
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Quarkus com Gradle criado
    proximo: []
    retorno: quarkus_gradle
    saida:
      tipo: construir
      justificativa: O mesmo ganho de arranque e de imagem nativa do Quarkus, com Gradle como ferramenta de build por preferência e por builds incrementais do time.
      eixos:
        - latencia
        - escala_volume
        - time_maturidade
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
      categoria: "[[frameworks_backend|Frameworks de backend]]"
      ferramentas:
        - "[[quarkus|Quarkus]]"
        - "[[gradle|Gradle]]"
  - id: jav_orq_e3
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Micronaut com Maven criado
    proximo: []
    retorno: micronaut_maven
    saida:
      tipo: construir
      justificativa: Serverless e contêineres pequenos se beneficiam do Micronaut, que resolve injeção em tempo de compilação e mantém memória baixa, com Maven no build.
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
      categoria: "[[frameworks_backend|Frameworks de backend]]"
      ferramentas:
        - "[[micronaut|Micronaut]]"
        - tabela:apache-maven
  - id: jav_orq_e4
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Micronaut com Gradle criado
    proximo: []
    retorno: micronaut_gradle
    saida:
      tipo: construir
      justificativa: Para serverless e memória mínima, o Micronaut com Gradle une injeção em tempo de compilação a um build incremental e configurável.
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
      categoria: "[[frameworks_backend|Frameworks de backend]]"
      ferramentas:
        - "[[micronaut|Micronaut]]"
        - "[[gradle|Gradle]]"
  - id: jav_orq_e5
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Spring Boot com Gradle criado
    proximo: []
    retorno: spring_gradle
    saida:
      tipo: construir
      justificativa: O ecossistema Spring cobre a maior parte das integrações e da contratação, e o Gradle atende a preferência do time por scripts de build e builds incrementais.
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
      categoria: "[[frameworks_backend|Frameworks de backend]]"
      ferramentas:
        - "[[spring_boot|Spring Boot]]"
        - "[[gradle|Gradle]]"
  - id: jav_orq_e6
    raia: jav_orq
    tipo: fim
    rotulo: Projeto Spring Boot com Maven criado sobre o monolito relacional
    proximo: []
    retorno: spring_maven
    saida:
      tipo: stack
      justificativa: Sem restrição de arranque ou de memória, Spring Boot com Maven é o caminho de menor risco para o time, com o arquétipo de monolito relacional como ponto de partida.
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
  - id: jav_ctx_s0
    raia: jav_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: jav_ctx_t1
        condicao: ""
  - id: jav_ctx_t1
    raia: jav_ctx
    tipo: tarefa
    rotulo: Mapear requisitos e experiência do time
    proximo:
      - para: jav_ctx_t2
        condicao: ""
    passos:
      - ctx.requisitos_do_servico
      - ctx.premissas_nao_funcionais
  - id: jav_ctx_t2
    raia: jav_ctx
    tipo: tarefa
    rotulo: Escolher framework e build
    proximo:
      - para: jav_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_framework_e_build
  - id: jav_ctx_e1
    raia: jav_ctx
    tipo: fim
    rotulo: Requisitos e experiência registrados
    proximo: []
    retorno: requisitos_definidos
  - id: jav_stk_s0
    raia: jav_stk
    tipo: inicio
    rotulo: Início da escolha de framework e build
    proximo:
      - para: jav_stk_g1
        condicao: ""
  - id: jav_stk_g1
    raia: jav_stk
    tipo: bifurcacao
    rotulo: Arranque rápido e nativo com Maven?
    proximo:
      - para: jav_stk_e1
        condicao: sim
      - para: jav_stk_g2
        condicao: não
    eixo: latencia
    pergunta: q.arranque_rapido_e_imagem_nativa_com_maven
  - id: jav_stk_g2
    raia: jav_stk
    tipo: bifurcacao
    rotulo: Arranque rápido e nativo com Gradle?
    proximo:
      - para: jav_stk_e2
        condicao: sim
      - para: jav_stk_g3
        condicao: não
    eixo: latencia
    pergunta: q.arranque_rapido_e_imagem_nativa_com_gradle
  - id: jav_stk_g3
    raia: jav_stk
    tipo: bifurcacao
    rotulo: Serverless e memória mínima com Maven?
    proximo:
      - para: jav_stk_e3
        condicao: sim
      - para: jav_stk_g4
        condicao: não
    eixo: escala_volume
    pergunta: q.serverless_e_memoria_minima_com_maven
  - id: jav_stk_g4
    raia: jav_stk
    tipo: bifurcacao
    rotulo: Serverless e memória mínima com Gradle?
    proximo:
      - para: jav_stk_e4
        condicao: sim
      - para: jav_stk_g5
        condicao: não
    eixo: escala_volume
    pergunta: q.serverless_e_memoria_minima_com_gradle
  - id: jav_stk_g5
    raia: jav_stk
    tipo: bifurcacao
    rotulo: Ecossistema Spring com Gradle?
    proximo:
      - para: jav_stk_e5
        condicao: sim
      - para: jav_stk_e6
        condicao: não
    eixo: time_maturidade
    pergunta: q.time_no_ecossistema_spring_com_gradle
  - id: jav_stk_e1
    raia: jav_stk
    tipo: fim
    rotulo: Quarkus com Maven
    proximo: []
    retorno: quarkus_maven
  - id: jav_stk_e2
    raia: jav_stk
    tipo: fim
    rotulo: Quarkus com Gradle
    proximo: []
    retorno: quarkus_gradle
  - id: jav_stk_e3
    raia: jav_stk
    tipo: fim
    rotulo: Micronaut com Maven
    proximo: []
    retorno: micronaut_maven
  - id: jav_stk_e4
    raia: jav_stk
    tipo: fim
    rotulo: Micronaut com Gradle
    proximo: []
    retorno: micronaut_gradle
  - id: jav_stk_e5
    raia: jav_stk
    tipo: fim
    rotulo: Spring Boot com Gradle
    proximo: []
    retorno: spring_gradle
  - id: jav_stk_e6
    raia: jav_stk
    tipo: fim
    rotulo: Spring Boot com Maven
    proximo: []
    retorno: spring_maven
  - id: jav_ent_s0
    raia: jav_ent
    tipo: inicio
    rotulo: Início da geração do projeto
    proximo:
      - para: jav_ent_t1
        condicao: ""
  - id: jav_ent_t1
    raia: jav_ent
    tipo: tarefa
    rotulo: Preparar o ambiente e gerar o projeto
    proximo:
      - para: jav_ent_t2
        condicao: ""
    passos:
      - exec.instalar_jdk_e_build
      - exec.gerar_projeto_base
      - exec.rodar_e_testar
  - id: jav_ent_t2
    raia: jav_ent
    tipo: tarefa
    rotulo: Conferir a reprodutibilidade
    proximo:
      - para: jav_ent_t3
        condicao: ""
    passos:
      - val.conferir_build_e_testes_em_clone_limpo
  - id: jav_ent_t3
    raia: jav_ent
    tipo: tarefa
    rotulo: Preparar a entrega e a manutenção
    proximo:
      - para: jav_ent_e1
        condicao: ""
    passos:
      - ent.preparar_pipeline_do_projeto
      - ops.manter_dependencias_e_jdk
  - id: jav_ent_e1
    raia: jav_ent
    tipo: fim
    rotulo: Projeto base criado, rodando e testado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.arranque_rapido_e_imagem_nativa_com_maven
    pergunta: Arranque rápido e imagem nativa são prioridade e o time prefere Maven?
    eixo: latencia
  - id: q.arranque_rapido_e_imagem_nativa_com_gradle
    pergunta: Arranque rápido e imagem nativa são prioridade e o time prefere Gradle?
    eixo: latencia
  - id: q.serverless_e_memoria_minima_com_maven
    pergunta: O alvo é serverless ou contêiner pequeno, com consumo mínimo de memória, e o time prefere Maven?
    eixo: escala_volume
  - id: q.serverless_e_memoria_minima_com_gradle
    pergunta: O alvo é serverless ou contêiner pequeno, com consumo mínimo de memória, e o time prefere Gradle?
    eixo: escala_volume
  - id: q.time_no_ecossistema_spring_com_gradle
    pergunta: O time já domina o ecossistema Spring (bibliotecas, contratação, legado) e prefere Gradle?
    eixo: time_maturidade
objetivo: Ter um projeto Java base criado, com framework e ferramenta de build escolhidos por critério, rodando e testando localmente com o build reproduzível por qualquer pessoa do time.
preRequisitos:
  - "Requisitos do serviço: tipo de carga, banco de dados, integrações e metas de arranque e memória."
  - Experiência atual do time com Spring, Quarkus ou Micronaut e com Maven ou Gradle.
  - Versão do JDK permitida pela organização e acesso à rede para baixar dependências.
  - Um repositório vazio para receber o projeto.
passos:
  - id: ctx.requisitos_do_servico
    titulo: Definir requisitos e experiência do time
    descricao: Registrar o tipo de carga, o banco de dados, as integrações, as metas de arranque e memória e a experiência do time com frameworks e ferramentas de build.
    verificacao: Os requisitos e a experiência do time estão escritos e foram aceitos por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.requisitos_do_servico
  - id: prep.escolher_framework_e_build
    titulo: Escolher framework e ferramenta de build
    descricao: Percorrer o diagrama de decisão e registrar o framework e a ferramenta de build, com a justificativa ligada aos requisitos.
    verificacao: O framework, a ferramenta de build e a justificativa estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.instalar_jdk_e_build
    titulo: Instalar o JDK e a ferramenta de build
    descricao: Instalar o JDK permitido pela organização, configurar a variável de ambiente do JDK e instalar a ferramenta de build escolhida.
    verificacao: O terminal informa a versão do JDK e a versão da ferramenta de build, e ambas usam o mesmo JDK.
    depende:
      - prep.escolher_framework_e_build
  - id: exec.gerar_projeto_base
    titulo: Gerar o projeto base pelo inicializador oficial
    descricao: Criar o projeto com o inicializador do framework escolhido, informando a ferramenta de build, a linguagem e as dependências mínimas.
    verificacao: O projeto gerado abre na IDE, compila e traz o wrapper do build e uma classe de teste.
    depende:
      - exec.instalar_jdk_e_build
  - id: exec.rodar_e_testar
    titulo: Rodar a aplicação e os testes
    descricao: Subir a aplicação localmente, chamar o endpoint de exemplo e executar a suíte de testes gerada.
    verificacao: O endpoint de exemplo responde e a suíte de testes termina sem falhas.
    depende:
      - exec.gerar_projeto_base
  - id: val.conferir_build_e_testes_em_clone_limpo
    titulo: Conferir build e testes em um clone limpo
    descricao: Clonar o repositório em uma pasta nova e executar build e testes apenas com o que está versionado.
    verificacao: Uma pessoa nova no projeto consegue compilar e testar a partir de um clone limpo seguindo o README.
    depende:
      - exec.rodar_e_testar
  - id: ent.preparar_pipeline_do_projeto
    titulo: Preparar o pipeline do projeto
    descricao: Versionar o wrapper do build, registrar a versão do JDK e criar a primeira execução de build e testes em integração contínua.
    verificacao: O pipeline executa build e testes em cada pull request com o mesmo JDK do ambiente local.
    depende:
      - val.conferir_build_e_testes_em_clone_limpo
  - id: ops.manter_dependencias_e_jdk
    titulo: Manter dependências e JDK atualizados
    descricao: Definir a cadência de atualização do framework, das dependências e do JDK e quem aprova cada atualização.
    verificacao: Existe uma rotina agendada de atualização com responsável e critério de aceite.
    depende:
      - ent.preparar_pipeline_do_projeto
comoFazerHoje:
  - passo: exec.instalar_jdk_e_build
    variante: maven
    comandos:
      - java -version
      - mvn --version
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html
  - passo: exec.instalar_jdk_e_build
    variante: gradle
    comandos:
      - java -version
      - gradle
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.gradle.org/current/userguide/part1_gradle_init.html
  - passo: exec.gerar_projeto_base
    variante: spring-maven
    comandos:
      - curl -G https://start.spring.io/starter.zip -d type=maven-project -d dependencies=web -d name=demo -o demo.zip
      - unzip demo.zip -d demo
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.spring.io/initializr/docs/current/reference/html/
  - passo: exec.gerar_projeto_base
    variante: spring-gradle
    comandos:
      - curl -G https://start.spring.io/starter.zip -d type=gradle-project -d dependencies=web -d name=demo -o demo.zip
      - unzip demo.zip -d demo
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.spring.io/initializr/docs/current/reference/html/
  - passo: exec.gerar_projeto_base
    variante: quarkus-maven
    comandos:
      - quarkus create app org.acme:getting-started
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://quarkus.io/guides/getting-started
  - passo: exec.gerar_projeto_base
    variante: quarkus-gradle
    comandos:
      - quarkus create app org.acme:getting-started --gradle
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://quarkus.io/guides/getting-started
  - passo: exec.gerar_projeto_base
    variante: micronaut-maven
    comandos:
      - mn create-app demo --build=maven --lang=java
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://micronaut-projects.github.io/micronaut-starter/latest/guide/
  - passo: exec.gerar_projeto_base
    variante: micronaut-gradle
    comandos:
      - mn create-app demo --build=gradle --lang=java
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://micronaut-projects.github.io/micronaut-starter/latest/guide/
  - passo: exec.rodar_e_testar
    variante: spring-maven
    comandos:
      - ./mvnw spring-boot:run
      - curl http://localhost:8080/hello
      - ./mvnw test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://spring.io/quickstart
  - passo: exec.rodar_e_testar
    variante: spring-gradle
    comandos:
      - ./gradlew bootRun
      - curl http://localhost:8080/hello
      - ./gradlew test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://spring.io/quickstart
  - passo: exec.rodar_e_testar
    variante: quarkus-maven
    comandos:
      - ./mvnw quarkus:dev
      - curl -w "\n" http://localhost:8080/hello
      - ./mvnw test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://quarkus.io/guides/getting-started
  - passo: exec.rodar_e_testar
    variante: quarkus-gradle
    comandos:
      - ./gradlew --console=plain quarkusDev
      - curl -w "\n" http://localhost:8080/hello
      - ./gradlew test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://quarkus.io/guides/getting-started
  - passo: exec.rodar_e_testar
    variante: micronaut-maven
    comandos:
      - ./mvnw test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://micronaut-projects.github.io/micronaut-starter/latest/guide/
  - passo: exec.rodar_e_testar
    variante: micronaut-gradle
    comandos:
      - ./gradlew test
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://micronaut-projects.github.io/micronaut-starter/latest/guide/
checklistRefs:
  exec.instalar_jdk_e_build: amb.ambiente_reproduzivel
  exec.gerar_projeto_base: amb.dependencias_travadas
  val.conferir_build_e_testes_em_clone_limpo: amb.ambiente_reproduzivel
  ent.preparar_pipeline_do_projeto: cicd.pipeline_ci
  ops.manter_dependencias_e_jdk: seg.varredura_dependencias
armadilhas:
  - Escolher o framework pelo desempenho de arranque sem medir o requisito real, o que troca a produtividade do time por um ganho que o serviço não usa.
  - Misturar versões de JDK entre a máquina local, o pipeline e o contêiner, o que gera falhas que só aparecem fora do ambiente do autor.
  - Gerar o projeto sem versionar o wrapper do build, o que obriga cada pessoa a instalar a mesma versão da ferramenta manualmente.
  - Adicionar dependências no inicializador por impulso, o que aumenta a superfície de manutenção desde o primeiro dia.
validacao:
  - O JDK e a ferramenta de build informam versões compatíveis com a decisão registrada.
  - O projeto gerado compila, sobe localmente e responde no endpoint de exemplo.
  - A suíte de testes gerada termina sem falhas em um clone limpo do repositório.
  - O wrapper do build e a versão do JDK estão versionados com o código.
  - O pipeline executa build e testes em cada pull request.
padroes:
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[monolito_modular|Monolito Modular]]"
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[build_lint_formatacao|Build, lint e formatação]]"
  - "[[pacotes_ambientes_execucao|Pacotes e ambientes de execução]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
  - "[[frameworks_testes|Frameworks de testes]]"
aliases:
  - Criar um projeto Java com Spring, Quarkus ou Micronaut
  - Novo projeto Java com Maven ou Gradle
grupo: Configurar o ambiente
stacks:
  - "[[monolito_web_relacional|Monolito web com banco relacional]]"
  - "[[api_serverless_edge|API serverless e edge]]"
ferramentas:
  - "[[quarkus|Quarkus]]"
  - tabela:apache-maven
  - "[[gradle|Gradle]]"
  - "[[micronaut|Micronaut]]"
  - "[[spring_boot|Spring Boot]]"
casosDeUso:
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
variacoes:
  - cicd-pipeline-build
  - migra-atualizacao-versao
certificacoes: []
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como criar um projeto Java
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
