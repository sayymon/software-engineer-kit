---
id: inferencia_privada_local
tipo: caso-de-uso
nome: Inferência privada local
aliases:
  - inferencia-privada-local
descricao: Executar modelos na própria máquina ou infraestrutura, sem enviar dados a terceiros.
funcionalidadesNecessarias:
  - "[[execucao_local|Execução local]]"
  - "[[quantizacao_de_modelos|Quantização de modelos]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[inferencia_local|Inferência local]]"
  - "[[repositorio_modelos|Repositório de modelos]]"
ferramentasRecomendadas:
  - "[[ollama|Ollama]]"
  - "[[lm_studio|LM Studio]]"
  - "[[hugging_face|Hugging Face]]"
modelosRecomendados:
  - "[[gemma_4|Gemma 4]]"
  - "[[gpt_oss_120b|gpt-oss-120b]]"
criteriosDesempate:
  - privacidade-de-dados
  - custo
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[ia_aplicada_e_agentes|IA aplicada e agentes]]"
faixasPadrao:
  maisBarata:
    - "[[ollama|Ollama]]"
    - "[[lm_studio|LM Studio]]"
    - tabela:llama-cpp
  custoBeneficio:
    - tabela:jan
    - tabela:gpt4all
    - tabela:open-webui
  qualidadeMaxima:
    - tabela:vllm
    - tabela:sglang
    - tabela:nvidia-tensorrt-llm
variacoes:
  - id: local-notebook-pessoal
    nome: Notebook pessoal
    descricao: Modelo quantizado rodando em máquina comum sem internet.
    funcionalidades:
      - "[[execucao_local|Execução local]]"
      - "[[quantizacao_de_modelos|Quantização de modelos]]"
    herdaFerramentas: true
    parametros:
      - chave: Ambiente de execução
        valor: Notebook sem internet
        fonte: editorial
      - chave: Escala típica
        valor: Uma pessoa
        fonte: editorial
      - chave: Requisito de privacidade
        valor: Dados nunca saem da máquina
        fonte: editorial
  - id: local-servidor-equipe
    nome: Servidor da equipe
    descricao: Modelo aberto em servidor interno com API compatível.
    funcionalidades:
      - "[[execucao_local|Execução local]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:llama-cpp
      - "[[ollama|Ollama]]"
      - "[[lm_studio|LM Studio]]"
    custoBeneficio:
      - tabela:vllm
      - tabela:open-webui
      - tabela:jan
    qualidadeMaxima:
      - tabela:sglang
      - tabela:nvidia-tensorrt-llm
      - "[[kubernetes|Kubernetes (ferramenta)]]"
    justificativaFerramentas: "Muda Requisito de privacidade para dados dentro da rede da equipe: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Servidor interno com API compatível com OpenAI em /v1/chat/completions, como no Ollama
        fonte: https://docs.ollama.com/api/openai-compatibility
      - chave: Escala típica
        valor: Dezenas de pessoas simultâneas
        fonte: editorial
      - chave: Requisito de privacidade
        valor: Dados dentro da rede da equipe
        fonte: editorial
    verificadoEm: 2026-11-22
  - id: local-dados-sensiveis
    nome: Dados sensíveis e regulados
    descricao: Processamento sem sair da rede da empresa.
    funcionalidades:
      - "[[execucao_local|Execução local]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ollama|Ollama]]"
      - tabela:gpt4all
      - tabela:jan
    custoBeneficio:
      - tabela:vllm
      - tabela:open-webui
      - "[[hashicorp_vault|HashiCorp Vault]]"
    qualidadeMaxima:
      - tabela:sglang
      - tabela:nvidia-tensorrt-llm
      - "[[hugging_face|Hugging Face]]"
    justificativaFerramentas: "Muda Requisito de privacidade para auditoria e isolamento total da rede: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Ambiente de execução
        valor: Servidor na rede da empresa
        fonte: editorial
      - chave: Escala típica
        valor: Cargas reguladas contínuas
        fonte: editorial
      - chave: Requisito de privacidade
        valor: Auditoria e isolamento total da rede
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Inferência privada local
## 📝 Descrição
Executar modelos na própria máquina ou infraestrutura, sem enviar dados a terceiros.
## ⏰ Quando aplicar
- Dados confidenciais
- Uso offline ou com custo fixo
## 🧩 Funcionalidades necessárias
- [[execucao_local|Execução local]] - Execução de modelos na própria máquina ou servidor, sem enviar dados a terceiros.
- [[quantizacao_de_modelos|Quantização de modelos]] - Redução da precisão dos pesos para rodar modelos maiores em hardware menor.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[ollama|Ollama]] - Execução local simples com API compatível
- [[lm_studio|LM Studio]] - Interface desktop para baixar e testar modelos
- [[hugging_face|Hugging Face]] - Catálogo de pesos abertos e licenças
- [[gemma_4|Gemma 4]] - Modelo aberto eficiente para hardware modesto
- [[gpt_oss_120b|gpt-oss-120b]] - Pesos abertos de alto desempenho para servidores
## 🧬 Variações
- **Notebook pessoal** (`local-notebook-pessoal`): Modelo quantizado rodando em máquina comum sem internet. Funcionalidades: [[execucao_local|Execução local]], [[quantizacao_de_modelos|Quantização de modelos]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Ambiente de execução: Notebook sem internet; Escala típica: Uma pessoa; Requisito de privacidade: Dados nunca saem da máquina.
- **Servidor da equipe** (`local-servidor-equipe`): Modelo aberto em servidor interno com API compatível. Funcionalidades: [[execucao_local|Execução local]], [[geracao_de_texto|Geração de texto]]. Mais barata: llama.cpp, [[ollama|Ollama]], [[lm_studio|LM Studio]]. Custo-benefício: vLLM, Open WebUI, Jan. Qualidade máxima: SGLang, TensorRT-LLM, [[kubernetes|Kubernetes (ferramenta)]]. Por que difere do caso: Muda Requisito de privacidade para dados dentro da rede da equipe: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Servidor interno com API compatível com OpenAI em /v1/chat/completions, como no Ollama; Escala típica: Dezenas de pessoas simultâneas; Requisito de privacidade: Dados dentro da rede da equipe.
- **Dados sensíveis e regulados** (`local-dados-sensiveis`): Processamento sem sair da rede da empresa. Funcionalidades: [[execucao_local|Execução local]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[ollama|Ollama]], GPT4All, Jan. Custo-benefício: vLLM, Open WebUI, [[hashicorp_vault|HashiCorp Vault]]. Qualidade máxima: SGLang, TensorRT-LLM, [[hugging_face|Hugging Face]]. Por que difere do caso: Muda Requisito de privacidade para auditoria e isolamento total da rede: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Ambiente de execução: Servidor na rede da empresa; Escala típica: Cargas reguladas contínuas; Requisito de privacidade: Auditoria e isolamento total da rede.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[ollama|Ollama]], [[lm_studio|LM Studio]], llama.cpp
- **Custo-benefício:** Jan, GPT4All, Open WebUI
- **Qualidade máxima:** vLLM, SGLang, TensorRT-LLM
## ⚖️ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. O motivo principal de rodar local é manter os dados sob controle, então esse critério vem primeiro.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[ia_aplicada_e_agentes|IA aplicada e agentes]]
