---
id: casa_e_familia_pessoa_fisica
tipo: caso-de-uso
nome: Casa e família (pessoa física)
aliases:
  - casa-e-familia-pessoa-fisica
descricao: Automatizar a casa, guardar fotos e documentos da família e proteger as contas de todos com ferramentas de uso doméstico.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[casa_inteligente|Casa inteligente]]"
  - "[[carro|Carro conectado]]"
  - "[[aplicativos_self_hosted|Aplicativos self-hosted]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
ferramentasRecomendadas:
  - "[[home_assistant|Home Assistant]]"
  - "[[google_home|Google Home]]"
  - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
  - "[[immich|Immich]]"
  - "[[bitwarden|Bitwarden]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pessoa-fisica
segmentos:
  - geral
nicho: casa conectada e arquivo da família
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
faixasPadrao:
  maisBarata:
    - "[[home_assistant|Home Assistant]]"
    - tabela:openhab
    - tabela:homebridge
  custoBeneficio:
    - "[[google_home|Google Home]]"
    - tabela:amazon-alexa
    - tabela:tuya-smart
  qualidadeMaxima:
    - "[[apple_casa_homekit|Apple Casa (HomeKit)]]"
    - tabela:smartthings
    - tabela:control4
variacoes:
  - id: familia-casa-automatizada
    nome: Casa automatizada
    descricao: Luzes, sensores e rotinas sem depender de nuvem.
    funcionalidades:
      - "[[automacao_de_workflow|Automação de workflow]]"
      - "[[integracao_de_apis|Integração de APIs]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Família ou pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de dispositivos conectados
        fonte: editorial
  - id: familia-arquivo-fotos-senhas
    nome: Arquivo da família e senhas
    descricao: Fotos e documentos hospedados em casa e senhas compartilhadas com segurança.
    funcionalidades:
      - "[[busca_semantica|Busca semântica]]"
      - "[[geracao_de_embeddings|Geração de embeddings]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:vaultwarden
      - "[[immich|Immich]]"
      - tabela:portainer
    custoBeneficio:
      - tabela:nextcloud
      - tabela:paperless-ngx
      - "[[bitwarden|Bitwarden]]"
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:proton-pass
      - tabela:tailscale
    justificativaFerramentas: "Muda Volume típico para milhares de fotos e documentos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Família ou pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD para dados pessoais da família
        fonte: não verificado
      - chave: Volume típico
        valor: Milhares de fotos e documentos
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Casa e família (pessoa física)
## 📝 Descrição
Automatizar a casa, guardar fotos e documentos da família e proteger as contas de todos com ferramentas de uso doméstico.
## ⏰ Quando aplicar
- Montar a casa inteligente
- Guardar fotos da família fora de serviços fechados
## 🧱 Pilha por categoria
- [[casa_inteligente|Casa inteligente]] - automação dos ambientes
- [[carro|Carro conectado]] - integração do carro com o celular
- [[aplicativos_self_hosted|Aplicativos self-hosted]] - fotos e serviços próprios
- [[senhas_segredos|Gerenciador de senhas e segredos]] - contas compartilhadas da família
## ✅ Recomendações
- [[home_assistant|Home Assistant]] - central de automação local e aberta
- [[google_home|Google Home]] - caminho simples com o ecossistema Google
- [[apple_casa_homekit|Apple Casa (HomeKit)]] - caminho simples com o ecossistema Apple
- [[immich|Immich]] - biblioteca de fotos self-hosted
- [[bitwarden|Bitwarden]] - cofre com compartilhamento familiar
## 🧬 Variações
- **Casa automatizada** (`familia-casa-automatizada`): Luzes, sensores e rotinas sem depender de nuvem. Funcionalidades: [[automacao_de_workflow|Automação de workflow]], [[integracao_de_apis|Integração de APIs]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Família ou pessoa física; Regulação aplicável: Nenhuma específica; Volume típico: Dezenas de dispositivos conectados.
- **Arquivo da família e senhas** (`familia-arquivo-fotos-senhas`): Fotos e documentos hospedados em casa e senhas compartilhadas com segurança. Funcionalidades: [[busca_semantica|Busca semântica]], [[geracao_de_embeddings|Geração de embeddings]]. Mais barata: Vaultwarden, [[immich|Immich]], Portainer. Custo-benefício: Nextcloud, Paperless-ngx, [[bitwarden|Bitwarden]]. Qualidade máxima: [[n_1password|1Password]], Proton Pass, Tailscale. Por que difere do caso: Muda Volume típico para milhares de fotos e documentos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Família ou pessoa física; Regulação aplicável: LGPD para dados pessoais da família (não verificado); Volume típico: Milhares de fotos e documentos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[home_assistant|Home Assistant]], openHAB, Homebridge
- **Custo-benefício:** [[google_home|Google Home]], Amazon Alexa, Tuya Smart
- **Qualidade máxima:** [[apple_casa_homekit|Apple Casa (HomeKit)]], SmartThings, Control4
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. A casa dura anos, e trocar de ecossistema sem refazer tudo evita retrabalho futuro.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
