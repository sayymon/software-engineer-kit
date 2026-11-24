---
id: celular_android_e_ios
tipo: caso-de-uso
nome: Celular (Android e iOS)
aliases: []
descricao: Montar o conjunto de aplicativos de IA, produtividade e segurança do celular.
funcionalidadesNecessarias:
  - "[[memoria_persistente|Memória persistente]]"
  - "[[busca_semantica|Busca semântica]]"
  - "[[automacao_de_workflow|Automação de workflow]]"
  - "[[integracao_de_apis|Integração de APIs]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[apps_ia_celular|Apps de IA no celular]]"
  - "[[android_utilitarios|Android utilitários]]"
  - "[[ios_utilitarios|iOS utilitários]]"
  - "[[android_dev_produtividade|Android para dev e produtividade]]"
  - "[[ios_dev_produtividade|iOS para dev e produtividade]]"
ferramentasRecomendadas:
  - "[[chatgpt|ChatGPT]]"
  - "[[perplexity|Perplexity]]"
  - "[[bitwarden|Bitwarden]]"
  - "[[obsidian|Obsidian (ferramenta)]]"
  - "[[claude|Claude AI]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
  - pequena
segmentos:
  - geral
  - escritorio-produtividade
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dispositivos_e_ambientes|Dispositivos e ambientes]]"
faixasPadrao:
  maisBarata:
    - "[[gemini|Gemini]]"
    - "[[deepseek|DeepSeek]]"
    - tabela:pocketpal-ai
  custoBeneficio:
    - "[[chatgpt|ChatGPT]]"
    - "[[perplexity|Perplexity]]"
    - tabela:microsoft-copilot
  qualidadeMaxima:
    - "[[claude|Claude AI]]"
    - "[[grok|Grok]]"
    - "[[mistral|Mistral]]"
variacoes:
  - id: celular-ia-assistente
    nome: Assistentes de IA
    descricao: Chat, voz e câmera no bolso.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[multimodal|Multimodal]]"
      - "[[voz_em_tempo_real|Voz em tempo real]]"
    herdaFerramentas: true
    parametros:
      - chave: Plataforma do celular
        valor: Android e iOS
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativo ou navegador
        fonte: editorial
      - chave: Foco de uso
        valor: Chat, voz e câmera no uso diário
        fonte: editorial
  - id: celular-android-utilitarios
    nome: Utilitários Android
    descricao: Cofre, VPN, arquivos e sincronização.
    funcionalidades:
      - "[[memoria_persistente|Memória persistente]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: false
    maisBarata:
      - "[[f_droid|F-Droid]]"
      - tabela:aegis-authenticator
      - tabela:syncthing
    custoBeneficio:
      - "[[bitwarden|Bitwarden]]"
      - tabela:tailscale
      - tabela:adguard
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:protonvpn
      - tabela:solid-explorer
    justificativaFerramentas: "Muda Foco de uso para cofre, VPN, arquivos e sincronização: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do celular
        valor: Android
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativos da Play Store e do F-Droid
        fonte: editorial
      - chave: Foco de uso
        valor: Cofre, VPN, arquivos e sincronização
        fonte: editorial
  - id: celular-ios-utilitarios
    nome: Utilitários iOS
    descricao: Senhas, VPN e documentos.
    funcionalidades:
      - "[[memoria_persistente|Memória persistente]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ente_auth|Ente Auth]]"
      - tabela:signal
      - tabela:tailscale
    custoBeneficio:
      - "[[bitwarden|Bitwarden]]"
      - tabela:adguard
      - tabela:pdf-expert
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:protonvpn
      - tabela:goodnotes
    justificativaFerramentas: "Muda Foco de uso para senhas, VPN e documentos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do celular
        valor: iOS e iPadOS
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativos da App Store
        fonte: editorial
      - chave: Foco de uso
        valor: Senhas, VPN e documentos
        fonte: editorial
  - id: celular-android-produtividade
    nome: Produtividade no Android
    descricao: Notas, tarefas e terminal.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[termux|Termux]]"
      - tabela:joplin
      - tabela:github-mobile
    custoBeneficio:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - tabela:todoist
      - tabela:tasker
    qualidadeMaxima:
      - "[[termius|Termius]]"
      - "[[notion|Notion]]"
      - "[[n_1password|1Password]]"
    justificativaFerramentas: "Muda Foco de uso para notas, tarefas e terminal: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do celular
        valor: Android
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativos com terminal e automação
        fonte: editorial
      - chave: Foco de uso
        valor: Notas, tarefas e terminal
        fonte: editorial
  - id: celular-ios-produtividade
    nome: Produtividade no iOS
    descricao: Notas, tarefas e atalhos.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: false
    maisBarata:
      - "[[atalhos_shortcuts|Atalhos (Shortcuts)]]"
      - tabela:a-shell
      - tabela:joplin
    custoBeneficio:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - tabela:todoist
      - tabela:working-copy
    qualidadeMaxima:
      - "[[things|Things]]"
      - "[[termius|Termius]]"
      - "[[notion|Notion]]"
    justificativaFerramentas: "Muda Foco de uso para notas, tarefas e atalhos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Plataforma do celular
        valor: iOS e iPadOS
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativos com Atalhos
        fonte: editorial
      - chave: Foco de uso
        valor: Notas, tarefas e atalhos
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Celular (Android e iOS)
## 📝 Descrição
Montar o conjunto de aplicativos de IA, produtividade e segurança do celular.
## ⏰ Quando aplicar
- Android ou iPhone de uso diário
- Celular de trabalho
## 🧩 Funcionalidades necessárias
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
- [[automacao_de_workflow|Automação de workflow]] - Execução automática de processos entre sistemas, com gatilhos e ações.
- [[integracao_de_apis|Integração de APIs]] - Conexão de modelos e agentes a APIs e serviços de terceiros.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[chatgpt|ChatGPT]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[perplexity|Perplexity]] - Faixa custo-benefício em [[apps_ia_celular|Apps de IA no celular]].
- [[bitwarden|Bitwarden]] - Faixa custo-benefício em [[android_utilitarios|Android utilitários]].
- [[obsidian|Obsidian (ferramenta)]] - Faixa custo-benefício em [[android_dev_produtividade|Android para dev e produtividade]].
- [[claude|Claude AI]] - Faixa qualidade máxima em [[apps_ia_celular|Apps de IA no celular]].
## 🧬 Variações
- **Assistentes de IA** (`celular-ia-assistente`): Chat, voz e câmera no bolso. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[multimodal|Multimodal]], [[voz_em_tempo_real|Voz em tempo real]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Plataforma do celular: Android e iOS; Ambiente de execução: Aplicativo ou navegador; Foco de uso: Chat, voz e câmera no uso diário.
- **Utilitários Android** (`celular-android-utilitarios`): Cofre, VPN, arquivos e sincronização. Funcionalidades: [[memoria_persistente|Memória persistente]], [[busca_semantica|Busca semântica]]. Mais barata: [[f_droid|F-Droid]], Aegis Authenticator, Syncthing. Custo-benefício: [[bitwarden|Bitwarden]], Tailscale, AdGuard. Qualidade máxima: [[n_1password|1Password]], Proton VPN, Solid Explorer. Por que difere do caso: Muda Foco de uso para cofre, VPN, arquivos e sincronização: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do celular: Android; Ambiente de execução: Aplicativos da Play Store e do F-Droid; Foco de uso: Cofre, VPN, arquivos e sincronização.
- **Utilitários iOS** (`celular-ios-utilitarios`): Senhas, VPN e documentos. Funcionalidades: [[memoria_persistente|Memória persistente]], [[busca_semantica|Busca semântica]]. Mais barata: [[ente_auth|Ente Auth]], Signal, Tailscale. Custo-benefício: [[bitwarden|Bitwarden]], AdGuard, PDF Expert. Qualidade máxima: [[n_1password|1Password]], Proton VPN, Goodnotes. Por que difere do caso: Muda Foco de uso para senhas, VPN e documentos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do celular: iOS e iPadOS; Ambiente de execução: Aplicativos da App Store; Foco de uso: Senhas, VPN e documentos.
- **Produtividade no Android** (`celular-android-produtividade`): Notas, tarefas e terminal. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[termux|Termux]], Joplin, GitHub Mobile. Custo-benefício: [[obsidian|Obsidian (ferramenta)]], Todoist, Tasker. Qualidade máxima: [[termius|Termius]], [[notion|Notion]], [[n_1password|1Password]]. Por que difere do caso: Muda Foco de uso para notas, tarefas e terminal: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do celular: Android; Ambiente de execução: Aplicativos com terminal e automação; Foco de uso: Notas, tarefas e terminal.
- **Produtividade no iOS** (`celular-ios-produtividade`): Notas, tarefas e atalhos. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Mais barata: [[atalhos_shortcuts|Atalhos (Shortcuts)]], a-Shell, Joplin. Custo-benefício: [[obsidian|Obsidian (ferramenta)]], Todoist, Working Copy. Qualidade máxima: [[things|Things]], [[termius|Termius]], [[notion|Notion]]. Por que difere do caso: Muda Foco de uso para notas, tarefas e atalhos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Plataforma do celular: iOS e iPadOS; Ambiente de execução: Aplicativos com Atalhos; Foco de uso: Notas, tarefas e atalhos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI
- **Custo-benefício:** [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot
- **Qualidade máxima:** [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. O celular reúne dados pessoais e a política de cada aplicativo decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[dispositivos_e_ambientes|Dispositivos e ambientes]]
