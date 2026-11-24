---
id: pc_windows_macos_e_linux
tipo: caso-de-uso
nome: PC (Windows, macOS e Linux)
aliases: []
descricao: Montar o ambiente de trabalho do computador com utilitários, terminal, IA e segurança.
funcionalidadesNecessarias:
  - "[[geracao_de_codigo|Geração de código]]"
  - "[[edicao_de_codebase|Edição de codebase]]"
  - "[[memoria_persistente|Memória persistente]]"
  - "[[busca_semantica|Busca semântica]]"
categoriasRelacionadas:
  - "[[windows_dev_produtividade|Windows para dev e produtividade]]"
  - "[[macos_dev_produtividade|macOS para dev e produtividade]]"
  - "[[linux_dev_produtividade|Linux para dev e produtividade]]"
  - "[[windows_utilitarios|Windows utilitários]]"
  - "[[terminal_produtividade_local|Terminal e produtividade local]]"
ferramentasRecomendadas:
  - "[[visual_studio_code|Visual Studio Code]]"
  - "[[docker_desktop|Docker Desktop]]"
  - "[[obsidian|Obsidian (ferramenta)]]"
  - "[[ghostty|Ghostty]]"
  - "[[mise|mise]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pessoa-fisica
  - pequena
  - media
segmentos:
  - desenvolvimento-software
  - escritorio-produtividade
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[dispositivos_e_ambientes|Dispositivos e ambientes]]"
faixasPadrao:
  maisBarata:
    - "[[microsoft_powertoys|Microsoft PowerToys]]"
    - tabela:windows-terminal
    - tabela:wsl
  custoBeneficio:
    - "[[visual_studio_code|Visual Studio Code]]"
    - "[[docker_desktop|Docker Desktop]]"
    - "[[obsidian|Obsidian (ferramenta)]]"
  qualidadeMaxima:
    - "[[visual_studio|Visual Studio]]"
    - "[[jetbrains_all_products_pack|JetBrains All Products Pack]]"
    - "[[warp|Warp]]"
variacoes:
  - id: pc-windows-dev
    nome: Windows para desenvolvimento
    descricao: WSL, terminal e utilitários.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: true
    parametros:
      - chave: Sistema operacional
        valor: Windows com WSL
        fonte: editorial
      - chave: Ambiente de execução
        valor: Terminal e subsistema Linux
        fonte: editorial
      - chave: Escala típica
        valor: Uma estação de desenvolvimento
        fonte: editorial
  - id: pc-macos-dev
    nome: macOS para desenvolvimento
    descricao: Gerenciador de pacotes, janelas e lançador.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[homebrew|Homebrew]]"
      - tabela:rectangle
      - "[[ghostty|Ghostty]]"
    custoBeneficio:
      - tabela:raycast
      - tabela:orbstack
      - tabela:xcode
    qualidadeMaxima:
      - "[[tower|Tower]]"
      - "[[jetbrains_all_products_pack|JetBrains All Products Pack]]"
      - "[[warp|Warp]]"
    justificativaFerramentas: "Muda Escala típica para uma estação de desenvolvimento com janelas e lançador: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Sistema operacional
        valor: macOS
        fonte: editorial
      - chave: Ambiente de execução
        valor: Terminal, Homebrew e contêineres
        fonte: editorial
      - chave: Escala típica
        valor: Uma estação de desenvolvimento com janelas e lançador
        fonte: editorial
  - id: pc-linux-dev
    nome: Linux para desenvolvimento
    descricao: Editor, contêineres e gerenciador de versões.
    funcionalidades:
      - "[[geracao_de_codigo|Geração de código]]"
      - "[[edicao_de_codebase|Edição de codebase]]"
    herdaFerramentas: false
    maisBarata:
      - "[[neovim|Neovim]]"
      - tabela:lazygit
      - tabela:distrobox
    custoBeneficio:
      - "[[visual_studio_code|Visual Studio Code]]"
      - "[[ghostty|Ghostty]]"
      - "[[mise|mise]]"
    qualidadeMaxima:
      - "[[jetbrains_all_products_pack|JetBrains All Products Pack]]"
      - "[[warp|Warp]]"
      - "[[claude_code|Claude-Code]]"
    justificativaFerramentas: "Muda Escala típica para uma estação com versões de runtime por projeto: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Sistema operacional
        valor: Linux
        fonte: editorial
      - chave: Ambiente de execução
        valor: Shell, editor e contêineres de desenvolvimento
        fonte: editorial
      - chave: Escala típica
        valor: Uma estação com versões de runtime por projeto
        fonte: editorial
  - id: pc-utilitarios-seguranca
    nome: Utilitários e segurança
    descricao: Senhas, VPN e arquivos em cada sistema.
    funcionalidades:
      - "[[memoria_persistente|Memória persistente]]"
      - "[[busca_semantica|Busca semântica]]"
    herdaFerramentas: false
    maisBarata:
      - "[[sharex|ShareX]]"
      - tabela:7zip
      - tabela:sumatrapdf
    custoBeneficio:
      - "[[everything|Everything]]"
      - "[[bitwarden|Bitwarden]]"
      - tabela:tailscale
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:protonvpn
      - tabela:adobe-acrobat
    justificativaFerramentas: "Muda Escala típica para senhas, VPN e arquivos nos três sistemas: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Sistema operacional
        valor: Windows, macOS e Linux
        fonte: editorial
      - chave: Ambiente de execução
        valor: Aplicativos instalados em cada sistema
        fonte: editorial
      - chave: Escala típica
        valor: Senhas, VPN e arquivos nos três sistemas
        fonte: editorial
  - id: pc-terminal-ia
    nome: Terminal com IA
    descricao: Agente de código na linha de comando.
    funcionalidades:
      - "[[edicao_de_codebase|Edição de codebase]]"
      - "[[geracao_de_codigo|Geração de código]]"
    herdaFerramentas: false
    maisBarata:
      - "[[tmux|tmux]]"
      - tabela:ripgrep
      - tabela:fzf
    custoBeneficio:
      - "[[ghostty|Ghostty]]"
      - tabela:iterm2
      - tabela:wezterm
    qualidadeMaxima:
      - "[[warp|Warp]]"
      - tabela:raycast
      - "[[claude_code|Claude-Code]]"
    justificativaFerramentas: "Muda Escala típica para sessões longas na linha de comando: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Sistema operacional
        valor: Windows, macOS e Linux
        fonte: editorial
      - chave: Ambiente de execução
        valor: Terminal com agente de código
        fonte: editorial
      - chave: Escala típica
        valor: Sessões longas na linha de comando
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# PC (Windows, macOS e Linux)
## 📝 Descrição
Montar o ambiente de trabalho do computador com utilitários, terminal, IA e segurança.
## ⏰ Quando aplicar
- Máquina de desenvolvimento
- Computador de uso geral
## 🧩 Funcionalidades necessárias
- [[geracao_de_codigo|Geração de código]] - Criação de código novo a partir de descrições, exemplos ou testes.
- [[edicao_de_codebase|Edição de codebase]] - Alteração coordenada de vários arquivos de um repositório, com leitura de contexto e execução de comandos.
- [[memoria_persistente|Memória persistente]] - Retenção de informações entre sessões para manter contexto de longo prazo.
- [[busca_semantica|Busca semântica]] - Recuperação de itens por similaridade de significado, em vez de palavras exatas.
## ✅ Recomendações
- [[visual_studio_code|Visual Studio Code]] - Faixa custo-benefício em [[windows_dev_produtividade|Windows para dev e produtividade]].
- [[docker_desktop|Docker Desktop]] - Faixa custo-benefício em [[windows_dev_produtividade|Windows para dev e produtividade]].
- [[obsidian|Obsidian (ferramenta)]] - Faixa custo-benefício em [[windows_dev_produtividade|Windows para dev e produtividade]].
- [[ghostty|Ghostty]] - Faixa custo-benefício em [[linux_dev_produtividade|Linux para dev e produtividade]].
- [[mise|mise]] - Faixa custo-benefício em [[linux_dev_produtividade|Linux para dev e produtividade]].
## 🧬 Variações
- **Windows para desenvolvimento** (`pc-windows-dev`): WSL, terminal e utilitários. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Sistema operacional: Windows com WSL; Ambiente de execução: Terminal e subsistema Linux; Escala típica: Uma estação de desenvolvimento.
- **macOS para desenvolvimento** (`pc-macos-dev`): Gerenciador de pacotes, janelas e lançador. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[homebrew|Homebrew]], Rectangle, [[ghostty|Ghostty]]. Custo-benefício: Raycast, OrbStack, Xcode. Qualidade máxima: [[tower|Tower]], [[jetbrains_all_products_pack|JetBrains All Products Pack]], [[warp|Warp]]. Por que difere do caso: Muda Escala típica para uma estação de desenvolvimento com janelas e lançador: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Sistema operacional: macOS; Ambiente de execução: Terminal, Homebrew e contêineres; Escala típica: Uma estação de desenvolvimento com janelas e lançador.
- **Linux para desenvolvimento** (`pc-linux-dev`): Editor, contêineres e gerenciador de versões. Funcionalidades: [[geracao_de_codigo|Geração de código]], [[edicao_de_codebase|Edição de codebase]]. Mais barata: [[neovim|Neovim]], lazygit, Distrobox. Custo-benefício: [[visual_studio_code|Visual Studio Code]], [[ghostty|Ghostty]], [[mise|mise]]. Qualidade máxima: [[jetbrains_all_products_pack|JetBrains All Products Pack]], [[warp|Warp]], [[claude_code|Claude-Code]]. Por que difere do caso: Muda Escala típica para uma estação com versões de runtime por projeto: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Sistema operacional: Linux; Ambiente de execução: Shell, editor e contêineres de desenvolvimento; Escala típica: Uma estação com versões de runtime por projeto.
- **Utilitários e segurança** (`pc-utilitarios-seguranca`): Senhas, VPN e arquivos em cada sistema. Funcionalidades: [[memoria_persistente|Memória persistente]], [[busca_semantica|Busca semântica]]. Mais barata: [[sharex|ShareX]], 7-Zip, SumatraPDF. Custo-benefício: [[everything|Everything]], [[bitwarden|Bitwarden]], Tailscale. Qualidade máxima: [[n_1password|1Password]], Proton VPN, Adobe Acrobat. Por que difere do caso: Muda Escala típica para senhas, VPN e arquivos nos três sistemas: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Sistema operacional: Windows, macOS e Linux; Ambiente de execução: Aplicativos instalados em cada sistema; Escala típica: Senhas, VPN e arquivos nos três sistemas.
- **Terminal com IA** (`pc-terminal-ia`): Agente de código na linha de comando. Funcionalidades: [[edicao_de_codebase|Edição de codebase]], [[geracao_de_codigo|Geração de código]]. Mais barata: [[tmux|tmux]], ripgrep, fzf. Custo-benefício: [[ghostty|Ghostty]], iTerm2, WezTerm. Qualidade máxima: [[warp|Warp]], Raycast, [[claude_code|Claude-Code]]. Por que difere do caso: Muda Escala típica para sessões longas na linha de comando: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Sistema operacional: Windows, macOS e Linux; Ambiente de execução: Terminal com agente de código; Escala típica: Sessões longas na linha de comando.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[microsoft_powertoys|Microsoft PowerToys]], Windows Terminal, WSL (Windows Subsystem for Linux)
- **Custo-benefício:** [[visual_studio_code|Visual Studio Code]], [[docker_desktop|Docker Desktop]], [[obsidian|Obsidian (ferramenta)]]
- **Qualidade máxima:** [[visual_studio|Visual Studio]], [[jetbrains_all_products_pack|JetBrains All Products Pack]], [[warp|Warp]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. O ambiente de trabalho dura anos e formatos e atalhos abertos facilitam a troca de sistema.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[dispositivos_e_ambientes|Dispositivos e ambientes]]
