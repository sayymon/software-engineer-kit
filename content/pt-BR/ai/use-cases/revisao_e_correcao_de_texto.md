---
id: revisao_e_correcao_de_texto
tipo: caso-de-uso
nome: Revisão e correção de texto
aliases: []
descricao: Revisar gramática, estilo, clareza e consistência de textos em vários idiomas.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
categoriasRelacionadas:
  - "[[escrita_documentos|Escrita e documentos]]"
  - "[[traducao_idiomas|Tradução e idiomas]]"
ferramentasRecomendadas:
  - "[[grammarly|Grammarly]]"
  - "[[notion|Notion]]"
  - "[[deepl|DeepL]]"
  - "[[claude|Claude AI]]"
  - "[[chatgpt|ChatGPT]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - escritorio-produtividade
  - educacao
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[escrita_e_documentos_macro|Escrita e documentos (macro)]]"
faixasPadrao:
  maisBarata:
    - "[[libreoffice|LibreOffice]]"
    - tabela:google-docs
    - tabela:languagetool
  custoBeneficio:
    - "[[grammarly|Grammarly]]"
    - "[[notion|Notion]]"
    - tabela:microsoft-word
  qualidadeMaxima:
    - "[[claude|Claude AI]]"
    - "[[chatgpt|ChatGPT]]"
    - tabela:microsoft-365-copilot
variacoes:
  - id: revisao-gramatical
    nome: Correção gramatical
    descricao: Ortografia, concordância e pontuação.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: true
    parametros:
      - chave: Porte
        valor: Pessoa ou pequena equipe
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de textos por semana
        fonte: editorial
      - chave: Tipo de documento
        valor: Mensagens e documentos curtos
        fonte: editorial
  - id: revisao-estilo-tom
    nome: Estilo e tom
    descricao: Clareza, concisão e adequação ao público.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:languagetool
      - "[[libreoffice|LibreOffice]]"
      - tabela:google-docs
    custoBeneficio:
      - "[[grammarly|Grammarly]]"
      - "[[notion|Notion]]"
      - "[[claude|Claude AI]]"
    qualidadeMaxima:
      - "[[chatgpt|ChatGPT]]"
      - tabela:microsoft-365-copilot
      - "[[gemini|Gemini]]"
    justificativaFerramentas: "Muda Tipo de documento para textos para público definido: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Time de comunicação
        fonte: editorial
      - chave: Volume típico
        valor: Textos de campanha e marca
        fonte: editorial
      - chave: Tipo de documento
        valor: Textos para público definido
        fonte: editorial
  - id: revisao-idioma-estrangeiro
    nome: Texto em outro idioma
    descricao: Revisão de inglês e espanhol com explicação das mudanças.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[saida_estruturada|Saída estruturada]]"
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
    justificativaFerramentas: "Muda Tipo de documento para e-mails e documentos em outro idioma: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Profissional que escreve em inglês ou espanhol
        fonte: editorial
      - chave: Volume típico
        valor: Textos de trabalho diários
        fonte: editorial
      - chave: Tipo de documento
        valor: E-mails e documentos em outro idioma
        fonte: editorial
  - id: revisao-consistencia-termos
    nome: Consistência de termos
    descricao: Glossário e padronização em documentos longos.
    funcionalidades:
      - "[[contexto_longo|Contexto longo]]"
      - "[[saida_estruturada|Saída estruturada]]"
    herdaFerramentas: false
    maisBarata:
      - "[[libreoffice|LibreOffice]]"
      - tabela:languagetool
      - "[[obsidian|Obsidian (ferramenta)]]"
    custoBeneficio:
      - tabela:google-docs
      - "[[notion|Notion]]"
      - "[[grammarly|Grammarly]]"
    qualidadeMaxima:
      - tabela:microsoft-word
      - "[[claude|Claude AI]]"
      - tabela:microsoft-365-copilot
    justificativaFerramentas: "Muda Tipo de documento para documentos longos com glossário: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Equipe de documentação
        fonte: editorial
      - chave: Volume típico
        valor: Centenas de páginas por manual
        fonte: editorial
      - chave: Tipo de documento
        valor: Documentos longos com glossário
        fonte: editorial
  - id: revisao-colaborativa
    nome: Revisão colaborativa
    descricao: Comentários e sugestões rastreadas em equipe.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
    herdaFerramentas: false
    maisBarata:
      - tabela:google-docs
      - "[[libreoffice|LibreOffice]]"
      - "[[obsidian|Obsidian (ferramenta)]]"
    custoBeneficio:
      - "[[notion|Notion]]"
      - tabela:microsoft-word
      - tabela:languagetool
    qualidadeMaxima:
      - tabela:microsoft-365-copilot
      - "[[confluence|Confluence (ferramenta)]]"
      - tabela:google-workspace
    justificativaFerramentas: "Muda Tipo de documento para documentos com comentários rastreados: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Porte
        valor: Equipe com várias pessoas revisoras
        fonte: editorial
      - chave: Volume típico
        valor: Dezenas de revisões por mês
        fonte: editorial
      - chave: Tipo de documento
        valor: Documentos com comentários rastreados
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Revisão e correção de texto
## 📝 Descrição
Revisar gramática, estilo, clareza e consistência de textos em vários idiomas.
## ⏰ Quando aplicar
- Texto profissional ou acadêmico
- Documentação técnica
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[saida_estruturada|Saída estruturada]] - Respostas que seguem um esquema, como JSON validado, para uso direto por programas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[human_in_the_loop_funcionalidade|Human in the loop]] - Pontos de aprovação ou correção humana dentro de um fluxo automatizado.
## ✅ Recomendações
- [[grammarly|Grammarly]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[notion|Notion]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[deepl|DeepL]] - Faixa custo-benefício em [[traducao_idiomas|Tradução e idiomas]].
- [[claude|Claude AI]] - Faixa qualidade máxima em [[escrita_documentos|Escrita e documentos]].
- [[chatgpt|ChatGPT]] - Faixa qualidade máxima em [[escrita_documentos|Escrita e documentos]].
## 🧬 Variações
- **Correção gramatical** (`revisao-gramatical`): Ortografia, concordância e pontuação. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Porte: Pessoa ou pequena equipe; Volume típico: Dezenas de textos por semana; Tipo de documento: Mensagens e documentos curtos.
- **Estilo e tom** (`revisao-estilo-tom`): Clareza, concisão e adequação ao público. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Mais barata: LanguageTool, [[libreoffice|LibreOffice]], Google Docs. Custo-benefício: [[grammarly|Grammarly]], [[notion|Notion]], [[claude|Claude AI]]. Qualidade máxima: [[chatgpt|ChatGPT]], Microsoft 365 Copilot, [[gemini|Gemini]]. Por que difere do caso: Muda Tipo de documento para textos para público definido: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Time de comunicação; Volume típico: Textos de campanha e marca; Tipo de documento: Textos para público definido.
- **Texto em outro idioma** (`revisao-idioma-estrangeiro`): Revisão de inglês e espanhol com explicação das mudanças. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[libretranslate|LibreTranslate]], Google Tradutor, Argos Translate. Custo-benefício: [[deepl|DeepL]], Duolingo, Speak. Qualidade máxima: [[chatgpt|ChatGPT]], [[claude|Claude AI]], Lokalise. Por que difere do caso: Muda Tipo de documento para e-mails e documentos em outro idioma: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Profissional que escreve em inglês ou espanhol; Volume típico: Textos de trabalho diários; Tipo de documento: E-mails e documentos em outro idioma.
- **Consistência de termos** (`revisao-consistencia-termos`): Glossário e padronização em documentos longos. Funcionalidades: [[contexto_longo|Contexto longo]], [[saida_estruturada|Saída estruturada]]. Mais barata: [[libreoffice|LibreOffice]], LanguageTool, [[obsidian|Obsidian (ferramenta)]]. Custo-benefício: Google Docs, [[notion|Notion]], [[grammarly|Grammarly]]. Qualidade máxima: Microsoft Word, [[claude|Claude AI]], Microsoft 365 Copilot. Por que difere do caso: Muda Tipo de documento para documentos longos com glossário: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Equipe de documentação; Volume típico: Centenas de páginas por manual; Tipo de documento: Documentos longos com glossário.
- **Revisão colaborativa** (`revisao-colaborativa`): Comentários e sugestões rastreadas em equipe. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[human_in_the_loop_funcionalidade|Human in the loop]]. Mais barata: Google Docs, [[libreoffice|LibreOffice]], [[obsidian|Obsidian (ferramenta)]]. Custo-benefício: [[notion|Notion]], Microsoft Word, LanguageTool. Qualidade máxima: Microsoft 365 Copilot, [[confluence|Confluence (ferramenta)]], Google Workspace. Por que difere do caso: Muda Tipo de documento para documentos com comentários rastreados: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Porte: Equipe com várias pessoas revisoras; Volume típico: Dezenas de revisões por mês; Tipo de documento: Documentos com comentários rastreados.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[libreoffice|LibreOffice]], Google Docs, LanguageTool
- **Custo-benefício:** [[grammarly|Grammarly]], [[notion|Notion]], Microsoft Word
- **Qualidade máxima:** [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft 365 Copilot
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Revisão acontece o tempo todo e o custo por texto revisado decide.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[escrita_e_documentos_macro|Escrita e documentos (macro)]]
