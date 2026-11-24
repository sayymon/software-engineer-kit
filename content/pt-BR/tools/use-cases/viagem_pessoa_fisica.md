---
id: viagem_pessoa_fisica
tipo: caso-de-uso
nome: Viagem (pessoa física)
aliases:
  - viagem-pessoa-fisica
descricao: Planejar roteiros, traduzir idiomas, navegar de carro e manter documentos seguros durante viagens.
funcionalidadesNecessarias: []
categoriasRelacionadas:
  - "[[apps_ia_celular|Apps de IA no celular]]"
  - "[[traducao_idiomas|Tradução e idiomas]]"
  - "[[android_utilitarios|Android utilitários]]"
  - "[[ios_utilitarios|iOS utilitários]]"
  - "[[carro|Carro conectado]]"
ferramentasRecomendadas:
  - "[[perplexity|Perplexity]]"
  - "[[deepl|DeepL]]"
  - "[[libretranslate|LibreTranslate]]"
  - "[[android_auto|Android Auto]]"
  - "[[bitwarden|Bitwarden]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
segmentos:
  - turismo-hotelaria
nicho: planejamento e deslocamento
nivel: caso
eixo: cenario
macro: "[[vida_pessoal|Vida pessoal]]"
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
  - id: viagem-planejamento-roteiro
    nome: Planejamento de roteiro
    descricao: Pesquisa, comparação e itinerário com busca na web.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Viajante individual ou família
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Um roteiro por viagem
        fonte: editorial
  - id: viagem-idiomas-deslocamento
    nome: Idiomas e deslocamento
    descricao: Tradução offline e navegação no carro.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[voz_em_tempo_real|Voz em tempo real]]"
    herdaFerramentas: false
    maisBarata:
      - "[[libretranslate|LibreTranslate]]"
      - tabela:google-translate
      - tabela:argos-translate
    custoBeneficio:
      - "[[deepl|DeepL]]"
      - tabela:duolingo
      - tabela:speak
    qualidadeMaxima:
      - "[[chatgpt|ChatGPT]]"
      - "[[claude|Claude AI]]"
      - tabela:lokalise
    justificativaFerramentas: "Muda Volume típico para conversas diárias em outro idioma durante a viagem: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Viajante individual ou família
        fonte: editorial
      - chave: Regulação aplicável
        valor: Nenhuma específica
        fonte: editorial
      - chave: Volume típico
        valor: Conversas diárias em outro idioma durante a viagem
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Viagem (pessoa física)
## 📝 Descrição
Planejar roteiros, traduzir idiomas, navegar de carro e manter documentos seguros durante viagens.
## ⏰ Quando aplicar
- Planejar roteiro e reservas
- Viajar para país com outro idioma
## 🧱 Pilha por categoria
- [[apps_ia_celular|Apps de IA no celular]] - pesquisa e roteiros
- [[traducao_idiomas|Tradução e idiomas]] - conversa e leitura em outro idioma
- [[android_utilitarios|Android utilitários]] - mapas offline e utilidades no Android
- [[ios_utilitarios|iOS utilitários]] - utilidades no iPhone
- [[carro|Carro conectado]] - navegação e música no carro
## ✅ Recomendações
- [[perplexity|Perplexity]] - pesquisa com fontes para roteiros
- [[deepl|DeepL]] - tradução de qualidade para textos
- [[libretranslate|LibreTranslate]] - tradução open source, inclusive offline
- [[android_auto|Android Auto]] - navegação no painel do carro
- [[bitwarden|Bitwarden]] - documentos e senhas acessíveis em qualquer lugar
## 🧬 Variações
- **Planejamento de roteiro** (`viagem-planejamento-roteiro`): Pesquisa, comparação e itinerário com busca na web. Funcionalidades: [[busca_na_web|Busca na web]], [[geracao_de_texto|Geração de texto]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Viajante individual ou família; Regulação aplicável: Nenhuma específica; Volume típico: Um roteiro por viagem.
- **Idiomas e deslocamento** (`viagem-idiomas-deslocamento`): Tradução offline e navegação no carro. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[voz_em_tempo_real|Voz em tempo real]]. Mais barata: [[libretranslate|LibreTranslate]], Google Tradutor, Argos Translate. Custo-benefício: [[deepl|DeepL]], Duolingo, Speak. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], Lokalise. Por que difere do caso: Muda Volume típico para conversas diárias em outro idioma durante a viagem: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Viajante individual ou família; Regulação aplicável: Nenhuma específica; Volume típico: Conversas diárias em outro idioma durante a viagem.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[gemini|Gemini]], [[deepseek|DeepSeek]], PocketPal AI
- **Custo-benefício:** [[chatgpt|ChatGPT]], [[perplexity|Perplexity]], Microsoft Copilot
- **Qualidade máxima:** [[claude|Claude AI]], [[grok|Grok]], [[mistral|Mistral]]
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Em viagem os custos de roaming e assinaturas pesam, então vale a opção gratuita ou offline.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Porte:** pessoa física
- **Macro:** [[vida_pessoal|Vida pessoal]]
