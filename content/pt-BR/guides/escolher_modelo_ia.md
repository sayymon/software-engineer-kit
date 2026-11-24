---
id: escolher_modelo_ia
tipo: guia-pratico
nome: Como escolher o melhor modelo de IA para a minha demanda
sigla: mdl
descricao: "Caminho para escolher o modelo de IA de uma demanda: definir a tarefa e o critério de sucesso, filtrar por restrições duras (dados sensíveis, orçamento, contexto, modalidades e latência), cruzar preço, contexto, licença e benchmarks registrados no kit, medir os finalistas em evals próprios e revisar a escolha a cada lançamento. Cada desfecho traz até três modelos nas faixas mais barato, custo-benefício e qualidade máxima, com as evidências lidas das notas de modelos e de benchmarks."
exemplo: "Um time precisa extrair campos de contratos com dados sensíveis: o filtro de dados sensíveis exige pesos abertos para inferência local, o orçamento baixo mantém só os modelos abertos viáveis, e os finalistas passam por um conjunto de teste próprio antes da decisão."
quando_usar:
  - Uma demanda nova precisa de um modelo e o time quer decidir por evidência, em vez de escolher o modelo mais conhecido.
  - Um modelo em uso será revisto por mudança de preço, de requisito ou de lançamento no mercado.
quando_evitar:
  - "Quando a demanda já tem um modelo aprovado com evals recentes e custo dentro da meta: mantenha a escolha até a próxima revisão."
fonte_ids:
  - anthropic_choosing_model
  - anthropic_define_success_evals
  - anthropic_prompt_caching
fontes:
  - id: anthropic_choosing_model
    tipo: artigo
    titulo: Choosing the right model (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_define_success_evals
    tipo: artigo
    titulo: Define success criteria and build evaluations (Claude Platform Docs)
    link: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
    status_revisao: revisada
    proxima_revisao: 2027-11-23
  - id: anthropic_prompt_caching
    tipo: artigo
    titulo: Prompt caching (Claude Platform Docs)
    link: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
    status_revisao: revisada
    proxima_revisao: 2027-11-23
status: rascunho
publico: false
raias:
  - id: mdl_orq
    nome: Orquestração da escolha de modelo
    responsabilidade: Encadear contexto, restrições duras e tipo de tarefa até o desfecho.
    cor: "#607D8B"
    orquestradora: true
  - id: mdl_ctx
    nome: Contexto e requisitos
    responsabilidade: Entender a necessidade e fixar escopo e critérios antes de escolher tecnologia.
    cor: "#0072B2"
    orquestradora: false
  - id: mdl_abd
    nome: Restrições duras e abordagem
    responsabilidade: Decidir entre assinar, comprar ou construir a partir das premissas.
    cor: "#E69F00"
    orquestradora: false
  - id: mdl_stk
    nome: Escolha pelo tipo de tarefa
    responsabilidade: Escolher o arquétipo de stack ou o caminho de construção por contexto.
    cor: "#009E73"
    orquestradora: false
  - id: mdl_ent
    nome: Implementação e entrega
    responsabilidade: Implementar, validar, publicar e operar na abordagem escolhida.
    cor: "#56B4E9"
    orquestradora: false
nos:
  - id: mdl_orq_s0
    raia: mdl_orq
    tipo: inicio
    rotulo: Necessidade de escolher um modelo de IA para uma demanda
    proximo:
      - para: mdl_orq_c1
        condicao: ""
  - id: mdl_orq_c1
    raia: mdl_orq
    tipo: chamada
    rotulo: Definir a tarefa, o critério e o conjunto de teste
    proximo:
      - para: mdl_orq_c2
        condicao: tarefa_definida
    raia_chamada: mdl_ctx
  - id: mdl_orq_c2
    raia: mdl_orq
    tipo: chamada
    rotulo: Aplicar as restrições duras
    proximo:
      - para: mdl_orq_c4
        condicao: modelo_aberto_local
      - para: mdl_orq_c9
        condicao: cascata_com_modelo_de_decisao
      - para: mdl_orq_c3
        condicao: construir
    raia_chamada: mdl_abd
  - id: mdl_orq_c3
    raia: mdl_orq
    tipo: chamada
    rotulo: Escolher pelo tipo de tarefa
    proximo:
      - para: mdl_orq_c6
        condicao: codigo_agentico
      - para: mdl_orq_c8
        condicao: multimodal_contexto_longo
      - para: mdl_orq_c7
        condicao: modelo_pequeno_baixa_latencia
      - para: mdl_orq_c5
        condicao: api_de_topo
    raia_chamada: mdl_stk
  - id: mdl_orq_c4
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e1
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_c5
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e2
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_c6
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e3
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_c7
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e4
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_c8
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e5
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_c9
    raia: mdl_orq
    tipo: chamada
    rotulo: Filtrar, comparar custo, medir e decidir
    proximo:
      - para: mdl_orq_e6
        condicao: pronta
    raia_chamada: mdl_ent
  - id: mdl_orq_e1
    raia: mdl_orq
    tipo: fim
    rotulo: Modelo aberto em inferência local
    proximo: []
    retorno: modelo_aberto_local
    saida:
      tipo: construir
      justificativa: Dados sensíveis ou orçamento baixo pedem modelos com disponibilidade pesos-abertos e licença registrada, e a inferência local mantém os dados no ambiente, com custo de infraestrutura no lugar de preço por token.
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
      categoria: "[[inferencia_local|Inferência local]]"
      ferramentas:
        - "[[gemma_4|Gemma 4]]"
        - "[[llama_4_maverick|Llama 4 Maverick]]"
        - "[[llama_4_scout|Llama 4 Scout]]"
      perfil:
        dados_sensiveis: true
        orcamento: baixo
        contexto_min: 0
        latencia: normal
        funcao: raciocinio
        acesso: pesos-abertos
      evidencias:
        - "criterio: 12 de 60 modelos do kit atendem ao perfil (funcao raciocinio, orcamento baixo, dados sensiveis sim, contexto minimo 0, latencia normal); benchmark principal: não verificado"
        - "[[gemma_4|Gemma 4]] (mais barato): precoEntradaUSD=0; precoSaidaUSD=0; contextoTokens=não verificado; licenca=não verificado; disponibilidade=pesos-abertos+api; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "[[llama_4_maverick|Llama 4 Maverick]] (custo-beneficio): precoEntradaUSD=não verificado; precoSaidaUSD=não verificado; contextoTokens=1000000; licenca=Llama 4 Community License; disponibilidade=pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); fontePreco=https://www.llama.com/; dataVerificacao=2026-11-20"
        - "[[llama_4_scout|Llama 4 Scout]] (qualidade maxima): precoEntradaUSD=não verificado; precoSaidaUSD=não verificado; contextoTokens=10000000; licenca=Llama 4 Community License; disponibilidade=pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); fontePreco=https://www.llama.com/; dataVerificacao=2026-11-20"
        - "lacuna: nenhum candidato tem pontuacao verificada em Humanity's Last Exam, GPQA Diamond, ARC-AGI-2, FrontierMath, AIME 2025; a faixa qualidade maxima usa contexto e numero de funcionalidades como proxy"
        - "lacuna: [[llama_4_maverick|Llama 4 Maverick]]: precoSaidaUSD não verificado"
        - "lacuna: [[llama_4_scout|Llama 4 Scout]]: precoSaidaUSD não verificado"
  - id: mdl_orq_e2
    raia: mdl_orq
    tipo: fim
    rotulo: Modelo de topo contratado por API
    proximo: []
    retorno: api_de_topo
    saida:
      tipo: comprar
      justificativa: Para raciocínio com dados não sensíveis e qualidade máxima, a API paga por token dá acesso ao modelo com melhor pontuação verificada nos benchmarks de raciocínio, e os campos precoSaidaUSD e contextoTokens mostram o custo por tarefa.
      eixos:
        - prazo_entrega
        - lock_in
        - orcamento
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
      categoria: "[[modelo_fundacional|Modelo fundacional]]"
      ferramentas:
        - "[[glm_5_3_flash|GLM-5.3-Flash]]"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
        - "[[claude_opus_5_5|Claude Opus 5.5]]"
      perfil:
        dados_sensiveis: false
        orcamento: alto
        contexto_min: 0
        latencia: normal
        funcao: raciocinio
        acesso: api
      evidencias:
        - "criterio: 16 de 60 modelos do kit atendem ao perfil (funcao raciocinio, orcamento alto, dados sensiveis nao, contexto minimo 0, latencia normal); benchmark principal: Humanity's Last Exam"
        - "[[glm_5_3_flash|GLM-5.3-Flash]] (mais barato): precoEntradaUSD=0.15; precoSaidaUSD=0.5; contextoTokens=1000000; licenca=não verificado; disponibilidade=api+pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=não verificado; fontePreco=https://docs.z.ai/guides/overview/pricing; dataVerificacao=2026-11-20"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]] (custo-beneficio): precoEntradaUSD=2; precoSaidaUSD=12; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=51.4 % (com busca e código) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark GPQA Diamond=94.3 % (sem ferramentas) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark ARC-AGI-2=77.1 % (ARC Prize Verified) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark FrontierMath=36.9 % (Tier 1 a 3) (fonte https://openai.com/index/introducing-gpt-5-5/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "[[claude_opus_5_5|Claude Opus 5.5]] (qualidade maxima): precoEntradaUSD=4; precoSaidaUSD=20; contextoTokens=1000000; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=67.7 % (com ferramentas) (fonte https://www.anthropic.com/news/claude-opus-5-5, 2026-11-22); fontePreco=https://platform.claude.com/docs/en/about-claude/pricing; dataVerificacao=2026-11-20"
        - "lacuna: [[glm_5_3_flash|GLM-5.3-Flash]]: benchmark Humanity's Last Exam não verificado"
  - id: mdl_orq_e3
    raia: mdl_orq
    tipo: fim
    rotulo: Modelo de código por assinatura com melhor resultado em benchmark
    proximo: []
    retorno: codigo_agentico
    saida:
      tipo: assinar
      justificativa: Em programação agêntica a escolha segue o melhor resultado verificado em benchmarks de código, como Terminal-Bench 2.0, entre modelos com disponibilidade assinatura, e a assinatura entrega valor no mesmo dia.
      eixos:
        - prazo_entrega
        - orcamento
        - time_maturidade
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
      categoria: "[[modelo_fundacional|Modelo fundacional]]"
      ferramentas:
        - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
        - "[[gemini_4_hydrogen|Gemini 4 Hydrogen]]"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
      perfil:
        dados_sensiveis: false
        orcamento: alto
        contexto_min: 0
        latencia: normal
        funcao: codigo
        acesso: assinatura
        exige_benchmark: true
      evidencias:
        - "criterio: 11 de 60 modelos do kit atendem ao perfil (funcao codigo, orcamento alto, dados sensiveis nao, contexto minimo 0, latencia normal); benchmark principal: Terminal-Bench 2.0"
        - "[[gemini_3_8_flash|Gemini 3.8 Flash]] (mais barato): precoEntradaUSD=0.75; precoSaidaUSD=3.75; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Geração de código (presente); benchmark Terminal-Bench 2.0=não verificado; fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "[[gemini_4_hydrogen|Gemini 4 Hydrogen]] (custo-beneficio): precoEntradaUSD=1.5; precoSaidaUSD=7.5; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Geração de código (presente); benchmark Terminal-Bench 2.0=57 % (versão 4.1, ajustada contra trapaça) (fonte https://deepmind.google/models/model-cards/gemini-4-hydrogen/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]] (qualidade maxima): precoEntradaUSD=2; precoSaidaUSD=12; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Geração de código (presente); benchmark Terminal-Bench 2.0=68.5 % (versão 2.0, Terminus-2) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark SWE-bench Verified=80.6 % (tentativa única) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "lacuna: [[gemini_3_8_flash|Gemini 3.8 Flash]]: benchmark Terminal-Bench 2.0 não verificado"
  - id: mdl_orq_e4
    raia: mdl_orq
    tipo: fim
    rotulo: Modelo pequeno ou flash por API para alto volume
    proximo: []
    retorno: modelo_pequeno_baixa_latencia
    saida:
      tipo: comprar
      justificativa: Alto volume com latência baixa pede preços de saída baixos em precoSaidaUSD, a funcionalidade Tool use registrada e janela de contexto suficiente, e a decisão final sai da medição nos evals da própria tarefa.
      eixos:
        - latencia
        - escala_volume
        - orcamento
      objetivo: reduzir_custo
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
      categoria: "[[modelo_fundacional|Modelo fundacional]]"
      ferramentas:
        - "[[qwen3_8_flash|Qwen3.8-Flash]]"
        - "[[glm_5_3_flash|GLM-5.3-Flash]]"
        - "[[gpt_6_luna|GPT-6 Luna]]"
      perfil:
        dados_sensiveis: false
        orcamento: baixo
        contexto_min: 0
        latencia: baixa
        funcao: tool_use
        acesso: api
      evidencias:
        - "criterio: 4 de 60 modelos do kit atendem ao perfil (funcao tool_use, orcamento baixo, dados sensiveis nao, contexto minimo 0, latencia baixa); benchmark principal: não verificado"
        - "[[qwen3_8_flash|Qwen3.8-Flash]] (mais barato): precoEntradaUSD=0.15; precoSaidaUSD=0.47; contextoTokens=1000000; licenca=Proprietária; disponibilidade=api; modalidadesEntrada=texto+imagem; funcionalidade exigida=Tool use (presente); fontePreco=https://www.alibabacloud.com/help/en/model-studio/model-pricing; dataVerificacao=2026-11-20"
        - "[[glm_5_3_flash|GLM-5.3-Flash]] (custo-beneficio): precoEntradaUSD=0.15; precoSaidaUSD=0.5; contextoTokens=1000000; licenca=não verificado; disponibilidade=api+pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Tool use (presente); fontePreco=https://docs.z.ai/guides/overview/pricing; dataVerificacao=2026-11-20"
        - "[[gpt_6_luna|GPT-6 Luna]] (qualidade maxima): precoEntradaUSD=0.1; precoSaidaUSD=0.5; contextoTokens=1050000; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem; funcionalidade exigida=Tool use (presente); fontePreco=https://developers.openai.com/api/docs/pricing; dataVerificacao=2026-11-20"
        - "lacuna: nenhum candidato tem pontuacao verificada em tau2-bench, BFCL, API-Bank; a faixa qualidade maxima usa contexto e numero de funcionalidades como proxy"
  - id: mdl_orq_e5
    raia: mdl_orq
    tipo: fim
    rotulo: Modelo multimodal com contexto longo por API
    proximo: []
    retorno: multimodal_contexto_longo
    saida:
      tipo: comprar
      justificativa: A tarefa pede modalidadesEntrada com imagem, áudio ou vídeo e contextoTokens de pelo menos um milhão, e o filtro mantém só os modelos que registram esses campos, com benchmarks multimodais quando verificados.
      eixos:
        - escala_volume
        - prazo_entrega
        - orcamento
      objetivo: cumprir_prazo
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
      categoria: "[[modelo_fundacional|Modelo fundacional]]"
      ferramentas:
        - "[[qwen3_8_flash|Qwen3.8-Flash]]"
        - "[[qwen4_max|Qwen4-Max]]"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
      perfil:
        dados_sensiveis: false
        orcamento: medio
        contexto_min: 1000000
        latencia: normal
        funcao: multimodal
        acesso: api
      evidencias:
        - "criterio: 16 de 60 modelos do kit atendem ao perfil (funcao multimodal, orcamento medio, dados sensiveis nao, contexto minimo 1000000, latencia normal); benchmark principal: MMMU"
        - "[[qwen3_8_flash|Qwen3.8-Flash]] (mais barato): precoEntradaUSD=0.15; precoSaidaUSD=0.47; contextoTokens=1000000; licenca=Proprietária; disponibilidade=api; modalidadesEntrada=texto+imagem; funcionalidade exigida=Multimodal (presente); benchmark MMMU=não verificado; fontePreco=https://www.alibabacloud.com/help/en/model-studio/model-pricing; dataVerificacao=2026-11-20"
        - "[[qwen4_max|Qwen4-Max]] (custo-beneficio): precoEntradaUSD=1.5; precoSaidaUSD=4.5; contextoTokens=1000000; licenca=Proprietária; disponibilidade=api; modalidadesEntrada=texto+imagem+video; funcionalidade exigida=Multimodal (presente); benchmark MMMU=não verificado; fontePreco=https://www.alibabacloud.com/help/en/model-studio/model-pricing; dataVerificacao=2026-11-20"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]] (qualidade maxima): precoEntradaUSD=2; precoSaidaUSD=12; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Multimodal (presente); benchmark MMMU=80.5 % (MMMU-Pro, sem ferramentas) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "lacuna: [[qwen3_8_flash|Qwen3.8-Flash]]: benchmark MMMU não verificado"
        - "lacuna: [[qwen4_max|Qwen4-Max]]: benchmark MMMU não verificado"
  - id: mdl_orq_e6
    raia: mdl_orq
    tipo: fim
    rotulo: Cascata com portão de decisão e escalonamento por confiança
    proximo: []
    retorno: cascata_com_modelo_de_decisao
    saida:
      tipo: construir
      justificativa: Com demanda incerta, um modelo de decisão barato separa os pedidos fáceis e escala os difíceis para um modelo mais forte, e as faixas de precoSaidaUSD e de benchmark mostram quanto o escalonamento custa em cada nível.
      eixos:
        - orcamento
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
      categoria: "[[modelo_decisao|Modelo de decisão]]"
      ferramentas:
        - "[[clef_flash|Clef-flash]]"
        - "[[glm_5_3_flash|GLM-5.3-Flash]]"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
      perfil:
        dados_sensiveis: false
        orcamento: medio
        contexto_min: 0
        latencia: normal
        funcao: raciocinio
        acesso: api
        gate: true
      evidencias:
        - "criterio: 12 de 60 modelos do kit atendem ao perfil (funcao raciocinio, orcamento medio, dados sensiveis nao, contexto minimo 0, latencia normal); benchmark principal: Humanity's Last Exam"
        - "[[clef_flash|Clef-flash]] (portao de decisao): precoEntradaUSD=0.038; contextoTokens=64000; licenca=Apache-2.0; categoria=Modelo de decisão; fontePreco=https://developers.cloudflare.com/changelog/post/2026-10-09-clef-omni-workers-ai/"
        - "[[glm_5_3_flash|GLM-5.3-Flash]] (mais barato): precoEntradaUSD=0.15; precoSaidaUSD=0.5; contextoTokens=1000000; licenca=não verificado; disponibilidade=api+pesos-abertos; modalidadesEntrada=texto+imagem; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=não verificado; fontePreco=https://docs.z.ai/guides/overview/pricing; dataVerificacao=2026-11-20"
        - "[[gemini_3_1_pro|Gemini 3.1 Pro]] (qualidade maxima): precoEntradaUSD=2; precoSaidaUSD=12; contextoTokens=1048576; licenca=Proprietária; disponibilidade=api+assinatura; modalidadesEntrada=texto+imagem+audio+video+pdf; funcionalidade exigida=Raciocínio (presente); benchmark Humanity's Last Exam=51.4 % (com busca e código) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark GPQA Diamond=94.3 % (sem ferramentas) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark ARC-AGI-2=77.1 % (ARC Prize Verified) (fonte https://deepmind.google/models/model-cards/gemini-3-1-pro/, 2026-11-22); benchmark FrontierMath=36.9 % (Tier 1 a 3) (fonte https://openai.com/index/introducing-gpt-5-5/, 2026-11-22); fontePreco=https://ai.google.dev/gemini-api/docs/pricing; dataVerificacao=2026-11-20"
        - "lacuna: [[glm_5_3_flash|GLM-5.3-Flash]]: benchmark Humanity's Last Exam não verificado"
  - id: mdl_ctx_s0
    raia: mdl_ctx
    tipo: inicio
    rotulo: Início do levantamento
    proximo:
      - para: mdl_ctx_t1
        condicao: ""
  - id: mdl_ctx_t1
    raia: mdl_ctx
    tipo: tarefa
    rotulo: Definir a tarefa e o critério de sucesso
    proximo:
      - para: mdl_ctx_t2
        condicao: ""
    passos:
      - ctx.tarefa_e_criterio_de_sucesso
  - id: mdl_ctx_t2
    raia: mdl_ctx
    tipo: tarefa
    rotulo: Montar o conjunto de teste
    proximo:
      - para: mdl_ctx_e1
        condicao: ""
    passos:
      - prep.conjunto_de_teste_da_tarefa
  - id: mdl_ctx_e1
    raia: mdl_ctx
    tipo: fim
    rotulo: Tarefa e critério acordados
    proximo: []
    retorno: tarefa_definida
  - id: mdl_abd_s0
    raia: mdl_abd
    tipo: inicio
    rotulo: Início das restrições duras
    proximo:
      - para: mdl_abd_t1
        condicao: ""
  - id: mdl_abd_t1
    raia: mdl_abd
    tipo: tarefa
    rotulo: Registrar premissas e pontuar as opções
    proximo:
      - para: mdl_abd_g1
        condicao: ""
    passos:
      - ctx.premissas_nao_funcionais
      - prep.pontuar_opcoes_matriz
  - id: mdl_abd_g1
    raia: mdl_abd
    tipo: bifurcacao
    rotulo: Dados sensíveis só em ambiente próprio?
    proximo:
      - para: mdl_abd_e1
        condicao: sim
      - para: mdl_abd_g2
        condicao: não
    eixo: compliance_dados
    pergunta: q.dados_sensiveis_exigem_inferencia_local
  - id: mdl_abd_g2
    raia: mdl_abd
    tipo: bifurcacao
    rotulo: Orçamento baixo e modelo aberto atende?
    proximo:
      - para: mdl_abd_e1
        condicao: sim
      - para: mdl_abd_g3
        condicao: não
    eixo: orcamento
    pergunta: q.orcamento_baixo_e_modelo_aberto_atende
  - id: mdl_abd_g3
    raia: mdl_abd
    tipo: bifurcacao
    rotulo: Mistura de fácil e difícil?
    proximo:
      - para: mdl_abd_e2
        condicao: sim
      - para: mdl_abd_e3
        condicao: não
    eixo: objetivo
    pergunta: q.demanda_incerta_com_mistura_de_dificuldades
  - id: mdl_abd_e1
    raia: mdl_abd
    tipo: fim
    rotulo: Modelo aberto em inferência local
    proximo: []
    retorno: modelo_aberto_local
  - id: mdl_abd_e2
    raia: mdl_abd
    tipo: fim
    rotulo: Cascata com portão de decisão
    proximo: []
    retorno: cascata_com_modelo_de_decisao
  - id: mdl_abd_e3
    raia: mdl_abd
    tipo: fim
    rotulo: Escolher pelo tipo de tarefa
    proximo: []
    retorno: construir
  - id: mdl_stk_s0
    raia: mdl_stk
    tipo: inicio
    rotulo: Início da escolha pelo tipo de tarefa
    proximo:
      - para: mdl_stk_g1
        condicao: ""
  - id: mdl_stk_g1
    raia: mdl_stk
    tipo: bifurcacao
    rotulo: Código agêntico em repositório?
    proximo:
      - para: mdl_stk_e1
        condicao: sim
      - para: mdl_stk_g2
        condicao: não
    eixo: contexto
    pergunta: q.codigo_agentico_em_repositorio
  - id: mdl_stk_g2
    raia: mdl_stk
    tipo: bifurcacao
    rotulo: Multimodal com contexto longo?
    proximo:
      - para: mdl_stk_e2
        condicao: sim
      - para: mdl_stk_g3
        condicao: não
    eixo: escala_volume
    pergunta: q.multimodal_com_contexto_muito_longo
  - id: mdl_stk_g3
    raia: mdl_stk
    tipo: bifurcacao
    rotulo: Alto volume e latência baixa?
    proximo:
      - para: mdl_stk_e3
        condicao: sim
      - para: mdl_stk_e4
        condicao: não
    eixo: latencia
    pergunta: q.alto_volume_com_latencia_baixa
  - id: mdl_stk_e1
    raia: mdl_stk
    tipo: fim
    rotulo: Modelo de código com melhor resultado em benchmark
    proximo: []
    retorno: codigo_agentico
  - id: mdl_stk_e2
    raia: mdl_stk
    tipo: fim
    rotulo: Modelo multimodal com contexto longo
    proximo: []
    retorno: multimodal_contexto_longo
  - id: mdl_stk_e3
    raia: mdl_stk
    tipo: fim
    rotulo: Modelo pequeno ou flash
    proximo: []
    retorno: modelo_pequeno_baixa_latencia
  - id: mdl_stk_e4
    raia: mdl_stk
    tipo: fim
    rotulo: Modelo de topo por API
    proximo: []
    retorno: api_de_topo
  - id: mdl_ent_s0
    raia: mdl_ent
    tipo: inicio
    rotulo: Início da comparação
    proximo:
      - para: mdl_ent_t1
        condicao: ""
  - id: mdl_ent_t1
    raia: mdl_ent
    tipo: tarefa
    rotulo: Filtrar e comparar custo
    proximo:
      - para: mdl_ent_t2
        condicao: ""
    passos:
      - prep.filtrar_por_restricoes_duras
      - exec.comparar_custo_por_tarefa
  - id: mdl_ent_t2
    raia: mdl_ent
    tipo: tarefa
    rotulo: Medir os finalistas
    proximo:
      - para: mdl_ent_t3
        condicao: ""
    passos:
      - val.medir_finalistas_nos_evals
  - id: mdl_ent_t3
    raia: mdl_ent
    tipo: tarefa
    rotulo: Decidir e revisar
    proximo:
      - para: mdl_ent_e1
        condicao: ""
    passos:
      - ent.decidir_e_registrar_o_modelo
      - ops.revisar_a_cada_lancamento
  - id: mdl_ent_e1
    raia: mdl_ent
    tipo: fim
    rotulo: Modelo escolhido e registrado
    proximo: []
    retorno: pronta
perguntasDecisao:
  - id: q.dados_sensiveis_exigem_inferencia_local
    pergunta: Os dados sensíveis não podem sair do ambiente da organização, o que exige um modelo de pesos abertos em inferência local?
    eixo: compliance_dados
  - id: q.orcamento_baixo_e_modelo_aberto_atende
    pergunta: O orçamento é baixo e um modelo de pesos abertos atende ao critério de sucesso em teste?
    eixo: orcamento
  - id: q.demanda_incerta_com_mistura_de_dificuldades
    pergunta: A demanda é incerta, com mistura de pedidos fáceis e difíceis, e uma etapa barata consegue separar os fáceis com confiança?
    eixo: objetivo
  - id: q.codigo_agentico_em_repositorio
    pergunta: A tarefa é programar de forma agêntica sobre um repositório, com leitura, edição e execução de testes?
    eixo: contexto
  - id: q.multimodal_com_contexto_muito_longo
    pergunta: A tarefa exige imagens, áudio ou vídeo junto de documentos longos, com janela de contexto de pelo menos um milhão de tokens?
    eixo: escala_volume
  - id: q.alto_volume_com_latencia_baixa
    pergunta: O volume é alto e a resposta precisa chegar rápido, com tarefas de extração, classificação ou chamada de ferramenta?
    eixo: latencia
objetivo: Chegar a até três modelos candidatos com evidências auditáveis de preço, contexto, licença e benchmark, medir os finalistas em evals da própria tarefa e registrar a decisão com a data de revisão.
preRequisitos:
  - Uma tarefa concreta com entrada, saída esperada e critério de sucesso.
  - "Regras de dados da organização: o que pode ou não sair do ambiente."
  - Premissas de volume, latência, contexto necessário, modalidades e orçamento.
  - Exemplos reais anonimizados para o conjunto de teste.
passos:
  - id: ctx.tarefa_e_criterio_de_sucesso
    titulo: Definir a tarefa e o critério de sucesso
    descricao: Escrever a tarefa em uma frase, as entradas e saídas, a meta de qualidade, o custo máximo por tarefa e o tempo máximo de resposta.
    verificacao: A tarefa, a meta de qualidade, o custo e o tempo máximos estão escritos e foram aceitos pelo dono da demanda.
    depende: []
  - id: prep.conjunto_de_teste_da_tarefa
    titulo: Montar o conjunto de teste da tarefa
    descricao: Reunir exemplos reais anonimizados com resposta esperada, incluindo casos difíceis, e separar uma parte para a decisão final.
    verificacao: O conjunto tem ao menos trinta casos com resposta esperada e uma parte reservada que não foi usada para ajustar prompts.
    depende:
      - ctx.tarefa_e_criterio_de_sucesso
  - id: ctx.premissas_nao_funcionais
    titulo: Registrar premissas não funcionais
    descricao: Anotar volume esperado, latência aceitável, dados sensíveis, prazo e orçamento, que alimentam as perguntas de decisão.
    verificacao: Cada um dos 7 eixos de adoção tem uma resposta escrita ou a nota de que não se aplica.
    depende:
      - ctx.tarefa_e_criterio_de_sucesso
  - id: prep.pontuar_opcoes_matriz
    titulo: Pontuar construir, comprar e assinar
    descricao: Dar nota de 1 a 5 às três opções nos cinco critérios da matriz e registrar o objetivo que pesa mais.
    verificacao: A matriz tem as 15 notas preenchidas e a opção vencedora tem a justificativa registrada.
    depende:
      - ctx.premissas_nao_funcionais
  - id: prep.filtrar_por_restricoes_duras
    titulo: Filtrar os modelos por restrições duras
    descricao: Eliminar os modelos que não cumprem dados sensíveis, licença, modalidades de entrada, janela de contexto mínima, disponibilidade e orçamento, usando os campos das notas de modelos do kit.
    verificacao: A lista de finalistas tem até cinco modelos e cada exclusão tem o campo e o valor que a motivou.
    depende:
      - prep.pontuar_opcoes_matriz
      - prep.conjunto_de_teste_da_tarefa
  - id: exec.comparar_custo_por_tarefa
    titulo: Comparar o custo por tarefa, não por token
    descricao: Estimar tokens de entrada e de saída por tarefa a partir do conjunto de teste, aplicar os preços de entrada e de saída de cada finalista e considerar o uso de cache de prompt quando houver.
    verificacao: Cada finalista tem custo estimado por tarefa e por mês, com a data do preço consultado.
    depende:
      - prep.filtrar_por_restricoes_duras
  - id: val.medir_finalistas_nos_evals
    titulo: Medir os finalistas nos evals da tarefa
    descricao: Rodar o conjunto de teste em cada finalista com o mesmo prompt e a mesma configuração, medir acerto, custo e tempo, e tratar benchmarks públicos como ponto de partida e não como veredito.
    verificacao: Cada finalista tem acerto, custo e tempo medidos no mesmo conjunto, e a lacuna de benchmarks não verificados está declarada.
    depende:
      - exec.comparar_custo_por_tarefa
  - id: ent.decidir_e_registrar_o_modelo
    titulo: Decidir e registrar o modelo escolhido
    descricao: Escolher o modelo que cumpre a meta de qualidade com o menor custo por tarefa, registrar a decisão, as evidências e um plano de troca para o segundo colocado.
    verificacao: A decisão está registrada com os números dos evals, a data e o responsável, e existe um segundo modelo pronto para substituição.
    depende:
      - val.medir_finalistas_nos_evals
  - id: ops.revisar_a_cada_lancamento
    titulo: Revisar a escolha a cada lançamento ou mudança de preço
    descricao: Repetir os evals quando surgir um modelo novo, mudar um preço ou mudar o requisito, e atualizar o registro da decisão.
    verificacao: A revisão tem data marcada, e cada modelo novo relevante passa pelo mesmo conjunto de teste.
    depende:
      - ent.decidir_e_registrar_o_modelo
comoFazerHoje: []
checklistRefs: {}
armadilhas:
  - Escolher o modelo pela fama ou pelo ranking geral, o que ignora o custo por tarefa e as restrições da própria demanda.
  - Tratar a pontuação de benchmark autodeclarada como garantia, o que esconde diferenças de método, de contaminação e de contexto de uso.
  - Comparar preços por token sem medir tokens por tarefa, o que inverte a ordem de custo quando um modelo gasta mais tokens para o mesmo resultado.
  - Decidir uma vez e nunca revisar, o que mantém modelos caros ou ultrapassados quando surgem opções melhores.
  - Misturar prompts diferentes entre os candidatos, o que impede saber se a diferença vem do modelo ou do texto.
validacao:
  - Cada exclusão da lista de finalistas cita o campo e o valor que a motivou.
  - Os finalistas foram medidos no mesmo conjunto de teste, com o mesmo prompt e a mesma configuração.
  - Cada evidência de benchmark traz valor, unidade e fonte, e os resultados não verificados aparecem como lacuna.
  - O custo por tarefa de cada finalista está estimado com a data do preço consultado.
  - A decisão está registrada com responsável, data de revisão e um modelo de reserva.
padroes:
  - "[[model_cascade|Model Cascade]]"
  - "[[routing_llm|Routing]]"
  - "[[llm_as_judge|LLM-as-Judge]]"
  - "[[structured_output|Structured Output]]"
categorias:
  - "[[modelo_fundacional|Modelo fundacional]]"
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[inferencia_local|Inferência local]]"
  - "[[ranking_modelos_ia|Ranking e comparação de modelos de IA]]"
  - "[[evals_observabilidade|Evals e observabilidade]]"
aliases:
  - Escolher um modelo de IA
  - Qual modelo de IA usar
  - Seleção de modelo de IA
grupo: IA aplicada
stacks:
  - "[[inferencia_llm_autohospedada|Inferência de LLM auto-hospedada]]"
  - "[[fluxo_dev_assistido_ia|Fluxo de desenvolvimento assistido por IA]]"
ferramentas:
  - "[[gemma_4|Gemma 4]]"
  - "[[llama_4_maverick|Llama 4 Maverick]]"
  - "[[llama_4_scout|Llama 4 Scout]]"
  - "[[glm_5_3_flash|GLM-5.3-Flash]]"
  - "[[gemini_3_1_pro|Gemini 3.1 Pro]]"
  - "[[claude_opus_5_5|Claude Opus 5.5]]"
  - "[[gemini_3_8_flash|Gemini 3.8 Flash]]"
  - "[[gemini_4_hydrogen|Gemini 4 Hydrogen]]"
  - "[[qwen3_8_flash|Qwen3.8-Flash]]"
  - "[[gpt_6_luna|GPT-6 Luna]]"
  - "[[qwen4_max|Qwen4-Max]]"
  - "[[clef_flash|Clef-flash]]"
casosDeUso:
  - "[[avaliacao_de_prompts|Avaliação de prompts]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
variacoes:
  - eval-comparar-modelos
  - local-dados-sensiveis
  - classif-extracao-documentos
certificacoes:
  - "[[google_generative_ai_leader|Google Generative AI Leader]]"
  - "[[nvidia_generative_ai_llm_associate_nca_genl|NVIDIA Generative AI LLM Associate (NCA-GENL)]]"
dataVerificacao: 2026-11-23
tags:
  - guia-pratico
---
# Como escolher o melhor modelo de IA para a minha demanda
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
