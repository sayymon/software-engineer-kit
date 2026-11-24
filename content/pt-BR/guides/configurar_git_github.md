---
id: configurar_git_github
tipo: guia-pratico
nome: Como configurar Git com GitHub
sigla: git
descricao: "Caminho para deixar o Git e o GitHub prontos para o trabalho diário: definir identidade, escolher a forma de autenticação (HTTPS com GitHub CLI, SSH, várias identidades ou uma organização com políticas), conectar o primeiro repositório, proteger a branch principal e revisar chaves e acessos periodicamente."
exemplo: Uma pessoa que trabalha em dois contextos define uma chave SSH por identidade, configura o e-mail de commit correto por pasta de projeto, conecta o repositório e confirma com um commit de teste que o autor aparece certo no GitHub.
quando_usar:
  - Uma máquina nova ou uma pessoa nova no time precisa trabalhar com repositórios no GitHub com segurança.
  - A forma de autenticação atual falha, expira com frequência ou mistura identidades pessoais e profissionais.
quando_evitar:
  - "Quando o Git já está configurado e só falta uma regra no repositório: ajuste a proteção de branch ou o arquivo de configuração do projeto."
fonte_ids:
  - github_set_up_git
  - github_ssh_key
  - github_cli_auth_login
fontes:
  - id: github_set_up_git
    tipo: artigo
    titulo: Set up Git (GitHub Docs)
    link: https://docs.github.com/en/get-started/getting-started-with-git/set-up-git
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: github_ssh_key
    tipo: artigo
    titulo: Generating a new SSH key and adding it to the ssh-agent (GitHub Docs)
    link: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: github_cli_auth_login
    tipo: artigo
    titulo: gh auth login (GitHub CLI manual)
    link: https://cli.github.com/manual/gh_auth_login
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: git_orq
    nome: Orquestração do Git com GitHub
    responsabilidade: Encadear contexto, escolha da autenticação e configuração até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: git_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: git_stk
    nome: Stack por contexto
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#E69F00"
    orquestradora: false
  - id: git_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#009E73"
    orquestradora: false
nos:
  - id: git_orq_s0
    raia: git_orq
    tipo: inicio
    rotulo: Necessidade de trabalhar com repositórios no GitHub
    proximo:
      - para: git_orq_c1
        condicao: ""
  - id: git_orq_c1
    raia: git_orq
    tipo: chamada
    rotulo: Definir contas, políticas e identidades
    proximo:
      - para: git_orq_c2
        condicao: contas_definidas
    raia_chamada: git_ctx
  - id: git_orq_c2
    raia: git_orq
    tipo: chamada
    rotulo: Escolher a forma de autenticação e de identidade
    proximo:
      - para: git_orq_c3
        condicao: ssh_varias_identidades
      - para: git_orq_c4
        condicao: ssh_com_assinatura
      - para: git_orq_c5
        condicao: github_enterprise
      - para: git_orq_c6
        condicao: https_com_github_cli
      - para: git_orq_c7
        condicao: ssh_identidades_por_remoto
    raia_chamada: git_stk
  - id: git_orq_c3
    raia: git_orq
    tipo: chamada
    rotulo: Instalar, autenticar, conectar e proteger
    proximo:
      - para: git_orq_e1
        condicao: pronta
    raia_chamada: git_ent
  - id: git_orq_c4
    raia: git_orq
    tipo: chamada
    rotulo: Instalar, autenticar, conectar e proteger
    proximo:
      - para: git_orq_e2
        condicao: pronta
    raia_chamada: git_ent
  - id: git_orq_c5
    raia: git_orq
    tipo: chamada
    rotulo: Instalar, autenticar, conectar e proteger
    proximo:
      - para: git_orq_e3
        condicao: pronta
    raia_chamada: git_ent
  - id: git_orq_c6
    raia: git_orq
    tipo: chamada
    rotulo: Instalar, autenticar, conectar e proteger
    proximo:
      - para: git_orq_e4
        condicao: pronta
    raia_chamada: git_ent
  - id: git_orq_e1
    raia: git_orq
    tipo: fim
    rotulo: SSH configurado com uma chave por identidade
    proximo: []
    retorno: ssh_varias_identidades
    saida:
      tipo: construir
      justificativa: Com mais de uma conta na mesma máquina, uma chave SSH por identidade e a configuração de autor por pasta evitam commits com o e-mail errado e acessos cruzados.
      eixos:
        - time_maturidade
        - compliance_dados
        - prazo_entrega
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
      categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
      ferramentas:
        - tabela:git
        - "[[github|GitHub (ferramenta)]]"
  - id: git_orq_e2
    raia: git_orq
    tipo: fim
    rotulo: SSH com commits assinados configurado
    proximo: []
    retorno: ssh_com_assinatura
    saida:
      tipo: construir
      justificativa: Quando a política exige chaves SSH e commits assinados, a chave gerada com passphrase no agente de chaves cumpre a regra e deixa a autoria verificável no GitHub.
      eixos:
        - compliance_dados
        - time_maturidade
        - prazo_entrega
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
      categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
      ferramentas:
        - tabela:git
        - "[[github|GitHub (ferramenta)]]"
  - id: git_orq_e3
    raia: git_orq
    tipo: fim
    rotulo: GitHub com SSO e políticas centrais contratado
    proximo: []
    retorno: github_enterprise
    saida:
      tipo: comprar
      justificativa: SSO, auditoria e políticas centralizadas pedem o plano de organização do GitHub, que entrega controle de acesso e trilha de auditoria sem montar infraestrutura própria.
      eixos:
        - orcamento
        - compliance_dados
        - lock_in
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
      categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
      ferramentas:
        - "[[github_enterprise|GitHub Enterprise]]"
  - id: git_orq_e4
    raia: git_orq
    tipo: fim
    rotulo: HTTPS com GitHub CLI configurado
    proximo: []
    retorno: https_com_github_cli
    saida:
      tipo: assinar
      justificativa: Para uma conta única, o login pelo navegador com o GitHub CLI guarda o token no repositório de credenciais do sistema e entrega o acesso em minutos, sem gerenciar chaves.
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
      categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
      ferramentas:
        - "[[github|GitHub (ferramenta)]]"
        - tabela:git
  - id: git_orq_c7
    raia: git_orq
    tipo: chamada
    rotulo: Instalar, autenticar, conectar e proteger
    proximo:
      - para: git_orq_e5
        condicao: pronta
    raia_chamada: git_ent
  - id: git_orq_e5
    raia: git_orq
    tipo: fim
    rotulo: Identidades selecionadas pela URL do remoto configuradas
    proximo: []
    retorno: ssh_identidades_por_remoto
    saida:
      tipo: construir
      justificativa: Com mais de uma conta, selecionar a identidade pela URL do remoto faz o Git escolher nome, e-mail e chave corretos em qualquer pasta, sem depender do local onde o repositório foi clonado.
      eixos:
        - time_maturidade
        - compliance_dados
        - prazo_entrega
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
      categoria: "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
      ferramentas:
        - tabela:git
        - "[[github|GitHub (ferramenta)]]"
  - id: git_ctx_s0
    raia: git_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: git_ctx_t1
        condicao: ""
  - id: git_ctx_t1
    raia: git_ctx
    tipo: tarefa
    rotulo: Mapear contas, políticas e identidades
    proximo:
      - para: git_ctx_t2
        condicao: ""
    passos:
      - ctx.necessidades_e_restricoes
      - ctx.premissas_nao_funcionais
  - id: git_ctx_t2
    raia: git_ctx
    tipo: tarefa
    rotulo: Escolher autenticação e identidade
    proximo:
      - para: git_ctx_e1
        condicao: ""
    passos:
      - prep.escolher_autenticacao_e_identidade
  - id: git_ctx_e1
    raia: git_ctx
    tipo: fim
    rotulo: Contas e políticas registradas
    proximo: []
    retorno: contas_definidas
  - id: git_stk_s0
    raia: git_stk
    tipo: inicio
    rotulo: Início da escolha da autenticação
    proximo:
      - para: git_stk_g1
        condicao: ""
  - id: git_stk_g1
    raia: git_stk
    tipo: bifurcacao
    rotulo: Mais de uma conta na máquina?
    proximo:
      - para: git_stk_g4
        condicao: sim
      - para: git_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.mais_de_uma_conta_na_mesma_maquina
  - id: git_stk_g2
    raia: git_stk
    tipo: bifurcacao
    rotulo: Chaves SSH e commits assinados exigidos?
    proximo:
      - para: git_stk_e2
        condicao: sim
      - para: git_stk_g3
        condicao: não
    eixo: compliance_dados
    pergunta: q.exige_commits_assinados_e_chaves_ssh
  - id: git_stk_g3
    raia: git_stk
    tipo: bifurcacao
    rotulo: SSO e políticas centrais?
    proximo:
      - para: git_stk_e3
        condicao: sim
      - para: git_stk_e4
        condicao: não
    eixo: orcamento
    pergunta: q.organizacao_com_sso_e_politicas_centrais
  - id: git_stk_e1
    raia: git_stk
    tipo: fim
    rotulo: SSH com várias identidades
    proximo: []
    retorno: ssh_varias_identidades
  - id: git_stk_e2
    raia: git_stk
    tipo: fim
    rotulo: SSH com commits assinados
    proximo: []
    retorno: ssh_com_assinatura
  - id: git_stk_e3
    raia: git_stk
    tipo: fim
    rotulo: GitHub com SSO e políticas centrais
    proximo: []
    retorno: github_enterprise
  - id: git_stk_e4
    raia: git_stk
    tipo: fim
    rotulo: HTTPS com GitHub CLI
    proximo: []
    retorno: https_com_github_cli
  - id: git_stk_g4
    raia: git_stk
    tipo: bifurcacao
    rotulo: Git 2.36 ou superior e identidade pela URL do remoto?
    proximo:
      - para: git_stk_e5
        condicao: sim
      - para: git_stk_e1
        condicao: não
    eixo: time_maturidade
    pergunta: q.identidade_por_url_do_remoto
  - id: git_stk_e5
    raia: git_stk
    tipo: fim
    rotulo: SSH com identidades selecionadas pela URL do remoto
    proximo: []
    retorno: ssh_identidades_por_remoto
  - id: git_ent_s0
    raia: git_ent
    tipo: inicio
    rotulo: Início da configuração
    proximo:
      - para: git_ent_t1
        condicao: ""
  - id: git_ent_t1
    raia: git_ent
    tipo: tarefa
    rotulo: Instalar, autenticar e conectar
    proximo:
      - para: git_ent_g1
        condicao: ""
    passos:
      - exec.instalar_e_definir_identidade
      - exec.autenticar_no_github
      - exec.conectar_repositorio_e_publicar
  - id: git_ent_g1
    raia: git_ent
    tipo: bifurcacao
    rotulo: Identidade escolhida pela URL do remoto?
    proximo:
      - para: git_ent_t4
        condicao: sim
      - para: git_ent_t2
        condicao: não
    eixo: contexto
    pergunta: q.identidade_escolhida_pela_url_do_remoto
  - id: git_ent_t4
    raia: git_ent
    tipo: tarefa
    rotulo: Configurar e verificar identidades por URL do remoto
    proximo:
      - para: git_ent_t2
        condicao: ""
    passos:
      - exec.configurar_identidades_por_remoto
      - val.verificar_identidade_por_remoto
  - id: git_ent_t2
    raia: git_ent
    tipo: tarefa
    rotulo: Validar identidade e acesso
    proximo:
      - para: git_ent_t3
        condicao: ""
    passos:
      - val.verificar_acesso_e_autoria
  - id: git_ent_t3
    raia: git_ent
    tipo: tarefa
    rotulo: Proteger e revisar
    proximo:
      - para: git_ent_e1
        condicao: ""
    passos:
      - ent.proteger_branch_principal
      - ops.revisar_chaves_e_acessos
  - id: git_ent_e1
    raia: git_ent
    tipo: fim
    rotulo: Git configurado, conectado e protegido
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.mais_de_uma_conta_na_mesma_maquina
    pergunta: Uma pessoa usa mais de uma conta ou identidade (por exemplo pessoal e de trabalho) na mesma máquina?
    eixo: contexto
  - id: q.exige_commits_assinados_e_chaves_ssh
    pergunta: A política exige chaves SSH e commits assinados?
    eixo: compliance_dados
  - id: q.organizacao_com_sso_e_politicas_centrais
    pergunta: A organização precisa de SSO, auditoria e políticas centralizadas no GitHub?
    eixo: orcamento
  - id: q.identidade_por_url_do_remoto
    pergunta: O Git instalado é a versão 2.36 ou superior e a identidade deve ser escolhida pela URL do remoto, em vez de pela pasta do projeto?
    eixo: time_maturidade
  - id: q.identidade_escolhida_pela_url_do_remoto
    pergunta: As identidades foram separadas por URL do remoto, com um arquivo de configuração por perfil?
    eixo: contexto
objetivo: Ter Git instalado com identidade correta, autenticação segura no GitHub, o primeiro repositório conectado e a branch principal protegida, com acessos revisáveis.
preRequisitos:
  - Uma conta no GitHub com autenticação em dois fatores ativa.
  - Permissão para instalar software na máquina.
  - A política da organização para chaves, commits assinados e SSO, quando existir.
  - Um repositório de teste para validar a configuração.
passos:
  - id: ctx.necessidades_e_restricoes
    titulo: Definir necessidades e restrições de Git com GitHub
    descricao: Registrar o que a pessoa ou o time precisa fazer, os sistemas envolvidos, as regras de segurança e de dados da organização e o orçamento disponível.
    verificacao: A lista de necessidades, restrições e orçamento está escrita e foi aceita por quem decide.
    depende: []
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.necessidades_e_restricoes
  - id: prep.escolher_autenticacao_e_identidade
    titulo: Escolher a autenticação e a identidade
    descricao: Percorrer o diagrama de decisão e registrar o protocolo (HTTPS ou SSH), o número de identidades e a exigência de commits assinados.
    verificacao: O protocolo, as identidades e a política de assinatura estão registrados.
    depende:
      - ctx.premissas_nao_funcionais
  - id: exec.instalar_e_definir_identidade
    titulo: Instalar o Git e definir a identidade
    descricao: Instalar o Git pelo método oficial e definir o nome e o e-mail de commit que correspondem à conta do GitHub.
    verificacao: O Git informa a versão instalada e o nome e o e-mail configurados correspondem à conta.
    depende:
      - prep.escolher_autenticacao_e_identidade
  - id: exec.autenticar_no_github
    titulo: Autenticar no GitHub
    descricao: Autenticar pelo método escolhido (login pelo navegador com o GitHub CLI ou chave SSH com passphrase no agente de chaves) e registrar a chave pública na conta.
    verificacao: O comando de status da autenticação mostra a conta correta e nenhuma credencial está em arquivo versionado.
    depende:
      - exec.instalar_e_definir_identidade
  - id: exec.conectar_repositorio_e_publicar
    titulo: Conectar o repositório e publicar a primeira branch
    descricao: Clonar ou conectar o repositório de teste, criar uma branch, fazer um commit e publicá-la no GitHub.
    verificacao: A branch aparece no GitHub com o autor correto no commit.
    depende:
      - exec.autenticar_no_github
  - id: val.verificar_acesso_e_autoria
    titulo: Verificar acesso e autoria
    descricao: Conferir no GitHub que o commit mostra a identidade esperada e que uma pessoa sem permissão não consegue publicar no repositório.
    verificacao: Autor, permissões e (quando exigido) a marca de commit verificado estão corretos.
    depende:
      - exec.conectar_repositorio_e_publicar
  - id: ent.proteger_branch_principal
    titulo: Proteger a branch principal
    descricao: Exigir pull request com revisão e verificações antes de qualquer merge na branch principal.
    verificacao: Um push direto na branch principal é recusado e o merge exige revisão e verificações verdes.
    depende:
      - val.verificar_acesso_e_autoria
  - id: ops.revisar_chaves_e_acessos
    titulo: Revisar chaves e acessos periodicamente
    descricao: Agendar a revisão das chaves SSH, dos tokens e dos acessos de pessoas e aplicativos, removendo o que não tem uso.
    verificacao: Existe uma revisão agendada com responsável e uma lista de chaves e tokens ativos.
    depende:
      - ent.proteger_branch_principal
  - id: exec.configurar_identidades_por_remoto
    titulo: Configurar identidades por URL do remoto
    descricao: Criar um arquivo de configuração por perfil (nome, e-mail, chave SSH) e, no arquivo global do Git, incluir cada um com includeIf hasconfig:remote.*.url apontando para o alias de host SSH da conta (Git 2.36 ou superior). Criar um alias de host por conta em ~/.ssh/config, cada um com sua chave e IdentitiesOnly, e usar o alias na URL do remoto. Opcionalmente, criar aliases do GitHub CLI para alternar a conta ativa com gh auth switch.
    verificacao: Em um repositório de cada conta, git config --show-origin user.email mostra o arquivo do perfil correto, e ssh -T com o alias de cada conta responde com o usuário esperado.
    depende:
      - exec.autenticar_no_github
  - id: val.verificar_identidade_por_remoto
    titulo: Verificar a identidade por repositório e os casos de borda
    descricao: Conferir o autor em repositórios de cada conta e em um repositório sem remoto, que usa a identidade padrão do arquivo global. Lembrar que a configuração local do repositório vence a global e que um arquivo incluído com erro de sintaxe interrompe todos os comandos do Git.
    verificacao: Cada repositório mostra o autor do seu perfil, o repositório sem remoto mostra a identidade padrão e o git config --list roda sem erro.
    depende:
      - exec.configurar_identidades_por_remoto
comoFazerHoje:
  - passo: exec.instalar_e_definir_identidade
    variante: todas
    comandos:
      - git --version
      - git config --global user.name "<SEU_NOME>"
      - git config --global user.email "<SEU_EMAIL>"
      - git config --global --list
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.github.com/en/get-started/getting-started-with-git/set-up-git
  - passo: exec.autenticar_no_github
    variante: https-com-github-cli
    comandos:
      - gh auth login --web --git-protocol https
      - gh auth status
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://cli.github.com/manual/gh_auth_login
  - passo: exec.autenticar_no_github
    variante: ssh
    comandos:
      - ssh-keygen -t ed25519 -C "<SEU_EMAIL>"
      - eval "$(ssh-agent -s)"
      - ssh-add ~/.ssh/id_ed25519
      - gh auth login --web --git-protocol ssh
      - gh auth status
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
  - passo: exec.autenticar_no_github
    variante: ssh-varias-identidades
    comandos:
      - ssh-keygen -t ed25519 -C "<EMAIL_DA_IDENTIDADE>" -f ~/.ssh/id_ed25519_<IDENTIDADE>
      - ssh-add ~/.ssh/id_ed25519_<IDENTIDADE>
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
  - passo: exec.conectar_repositorio_e_publicar
    variante: todas
    comandos:
      - git clone <URL_DO_REPOSITORIO>
      - git switch -c teste/configuracao-do-ambiente
      - 'git commit --allow-empty -m "chore: valida configuracao do ambiente"'
      - git push -u origin teste/configuracao-do-ambiente
    versaoTestada: não verificado
    dataVerificacao: 2026-11-23
    fonteUrl: https://docs.github.com/en/get-started/getting-started-with-git/set-up-git
  - passo: exec.configurar_identidades_por_remoto
    variante: ssh-identidades-por-url-do-remoto
    comandos:
      - "# 1. um alias de host por conta em ~/.ssh/config (placeholders: account-a, account-b)"
      - "# Host github-account-a / HostName github.com / User git / IdentityFile ~/.ssh/id_ed25519_account-a / IdentitiesOnly yes"
      - "# Host github-account-b / HostName github.com / User git / IdentityFile ~/.ssh/id_ed25519_account-b / IdentitiesOnly yes"
      - "# 2. um arquivo de configuração por perfil: ~/.gitconfig-account-a e ~/.gitconfig-account-b, cada um com [user] name e email"
      - "git config --global --add 'includeIf.hasconfig:remote.*.url:git@github-account-a:**.path' ~/.gitconfig-account-a"
      - "git config --global --add 'includeIf.hasconfig:remote.*.url:git@github-account-b:**.path' ~/.gitconfig-account-b"
      - git clone git@github-account-a:<ORGANIZACAO_OU_USUARIO>/<REPOSITORIO>.git
      - git -C <REPOSITORIO> config --show-origin user.email
      - ssh -T git@github-account-a
      - gh auth login --web --git-protocol ssh
      - gh auth switch --user account-a
      - gh alias set swa 'auth switch --user account-a'
      - gh alias set swb 'auth switch --user account-b'
      - gh auth status
    versaoTestada: não verificado
    dataVerificacao: 2026-11-24
    fonteUrl: https://git-scm.com/docs/git-config
checklistRefs:
  exec.instalar_e_definir_identidade: amb.ambiente_reproduzivel
  exec.autenticar_no_github: seg.segredos_fora_do_codigo
  ent.proteger_branch_principal: repo.protecao_branch_principal
  ops.revisar_chaves_e_acessos: seg.menor_privilegio
armadilhas:
  - Usar um token pessoal com escopo amplo e sem expiração, o que transforma um vazamento em acesso a todos os repositórios da conta.
  - Gerar a chave SSH sem passphrase e sem agente de chaves, o que deixa a chave privada utilizável por qualquer pessoa que acesse o arquivo.
  - Manter a mesma configuração de autor para contas diferentes, o que mistura identidades e expõe o e-mail errado no histórico.
  - Deixar a branch principal sem proteção, o que permite alterações sem revisão e sem verificações.
  - "Esperar que a identidade por URL do remoto valha em um repositório sem remoto: ele usa a identidade padrão do arquivo global até o remoto ser adicionado."
  - Esquecer que a configuração local do repositório (git config sem --global) vence a identidade incluída pelo arquivo global.
  - "Errar a sintaxe de um arquivo incluído: um arquivo de perfil malformado quebra todos os comandos do Git, então teste com git config --list depois de cada edição."
  - Colocar uma URL de remoto dentro de um arquivo de perfil incluído, o que a documentação do Git não permite.
validacao:
  - O Git informa a versão instalada e a identidade de commit corresponde à conta do GitHub.
  - O status de autenticação mostra a conta correta e nenhuma credencial está em arquivo versionado.
  - A primeira branch publicada aparece no GitHub com o autor esperado.
  - A branch principal exige pull request, revisão e verificações para o merge.
  - As chaves e os tokens ativos estão listados e têm revisão agendada.
  - Com várias identidades, cada repositório mostra o autor do seu perfil e o repositório sem remoto mostra a identidade padrão.
padroes:
  - "[[human_in_the_loop|Human-in-the-Loop]]"
  - "[[guardrails_llm|Guardrails]]"
categorias:
  - "[[controle_versao_colaboracao|Controle de versão e colaboração]]"
  - "[[ci_cd_deploy|CI-CD e deploy]]"
  - "[[revisao_codigo_pr|Revisão de código e PR]]"
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
aliases:
  - Configurar o ambiente Git e GitHub
  - Autenticar no GitHub com HTTPS ou SSH
grupo: Configurar o ambiente
stacks:
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - tabela:git
  - "[[github|GitHub (ferramenta)]]"
  - "[[github_enterprise|GitHub Enterprise]]"
casosDeUso:
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
variacoes:
  - revisao-pull-request
  - cicd-revisao-pr
certificacoes:
  - "[[github_foundations_gh_900|GitHub Foundations (GH-900)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como configurar Git com GitHub
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
