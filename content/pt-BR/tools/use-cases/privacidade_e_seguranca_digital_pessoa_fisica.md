---
id: privacidade_e_seguranca_digital_pessoa_fisica
tipo: caso-de-uso
nome: Privacidade e segurança digital (pessoa física)
aliases:
  - privacidade-e-seguranca-digital-pessoa-fisica
descricao: Proteger contas, autenticação em dois fatores e navegação com ferramentas abertas e confiáveis em todos os dispositivos.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
  - "[[extensoes_navegador|Extensões de navegador]]"
  - "[[ios_utilitarios|iOS utilitários]]"
  - "[[android_utilitarios|Android utilitários]]"
ferramentasRecomendadas:
  - "[[bitwarden|Bitwarden]]"
  - "[[n_1password|1Password]]"
  - "[[ublock_origin|uBlock Origin]]"
  - "[[ente_auth|Ente Auth]]"
  - "[[f_droid|F-Droid]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: privacidade-de-dados
porte:
  - pessoa-fisica
segmentos:
  - geral
nicho: proteção de contas e dados pessoais
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
faixasPadrao:
  maisBarata:
    - "[[bitwarden|Bitwarden]]"
    - tabela:keepassxc
    - tabela:infisical
  custoBeneficio:
    - "[[n_1password|1Password]]"
    - tabela:proton-pass
    - tabela:doppler
  qualidadeMaxima:
    - "[[hashicorp_vault|HashiCorp Vault]]"
    - tabela:cyberark
    - "[[aws_secrets_manager|AWS Secrets Manager]]"
variacoes:
  - id: priv-contas-senhas
    nome: Contas e senhas
    descricao: Gerenciador de senhas e segundo fator.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e direitos do titular de dados
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de contas e senhas
        fonte: editorial
  - id: priv-navegador-celular
    nome: Navegador e celular
    descricao: Bloqueio de rastreadores e lojas de aplicativos confiáveis.
    funcionalidades:
      - "[[saida_estruturada|Saída estruturada]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[ublock_origin|uBlock Origin]]"
      - tabela:adguard
      - "[[f_droid|F-Droid]]"
    custoBeneficio:
      - "[[bitwarden|Bitwarden]]"
      - tabela:protonvpn
      - tabela:signal
    qualidadeMaxima:
      - "[[n_1password|1Password]]"
      - tabela:mullvad-vpn
      - "[[ente_auth|Ente Auth]]"
    justificativaFerramentas: "Muda Volume típico para dezenas de extensões e aplicativos: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Pessoa física
        fonte: editorial
      - chave: Regulação aplicável
        valor: LGPD e direitos do titular de dados
        fonte: não verificado
      - chave: Volume típico
        valor: Dezenas de extensões e aplicativos
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Privacidade e segurança digital (pessoa física)
## 📝 Descrição
Proteger contas, autenticação em dois fatores e navegação com ferramentas abertas e confiáveis em todos os dispositivos.
## ⏰ Quando aplicar
- Reduzir risco de invasão de contas
- Bloquear rastreadores e anúncios maliciosos
## 🧱 Pilha por categoria
- [[senhas_segredos|Gerenciador de senhas e segredos]] - senhas únicas e fortes
- [[extensoes_navegador|Extensões de navegador]] - bloqueio de rastreadores
- [[ios_utilitarios|iOS utilitários]] - segurança no iPhone
- [[android_utilitarios|Android utilitários]] - segurança e lojas alternativas no Android
## ✅ Recomendações
- [[bitwarden|Bitwarden]] - cofre open source com plano gratuito
- [[n_1password|1Password]] - cofre com boa experiência de uso
- [[ublock_origin|uBlock Origin]] - bloqueador de anúncios e rastreadores
- [[ente_auth|Ente Auth]] - autenticador de dois fatores com backup criptografado
- [[f_droid|F-Droid]] - loja de aplicativos de código aberto para Android
## 🧬 Variações
- **Contas e senhas** (`priv-contas-senhas`): Gerenciador de senhas e segundo fator. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa física; Regulação aplicável: LGPD e direitos do titular de dados (não verificado); Volume típico: Dezenas de contas e senhas.
- **Navegador e celular** (`priv-navegador-celular`): Bloqueio de rastreadores e lojas de aplicativos confiáveis. Funcionalidades: [[saida_estruturada|Saída estruturada]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[ublock_origin|uBlock Origin]], AdGuard, [[f_droid|F-Droid]]. Custo-benefício: [[bitwarden|Bitwarden]], Proton VPN, Signal. Qualidade máxima: [[n_1password|1Password]], Mullvad VPN, [[ente_auth|Ente Auth]]. Por que difere do caso: Muda Volume típico para dezenas de extensões e aplicativos: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Pessoa física; Regulação aplicável: LGPD e direitos do titular de dados (não verificado); Volume típico: Dezenas de extensões e aplicativos.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[bitwarden|Bitwarden]], KeePassXC, Infisical
- **Custo-benefício:** [[n_1password|1Password]], Proton Pass, Doppler
- **Qualidade máxima:** [[hashicorp_vault|HashiCorp Vault]], CyberArk Secrets Manager, [[aws_secrets_manager|AWS Secrets Manager]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** privacidade-de-dados. O objetivo do caso é proteger dados, então o critério de privacidade conduz todas as escolhas.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
