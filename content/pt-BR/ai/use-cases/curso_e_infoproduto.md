---
id: curso_e_infoproduto
tipo: caso-de-uso
nome: Curso e infoproduto
aliases: []
descricao: Criar, gravar, vender e entregar cursos online e infoprodutos.
funcionalidadesNecessarias:
  - "[[geracao_de_texto|Geração de texto]]"
  - "[[raciocinio|Raciocínio]]"
  - "[[geracao_de_video|Geração de vídeo]]"
  - "[[transcricao_de_audio|Transcrição de áudio]]"
  - "[[geracao_de_imagem|Geração de imagem]]"
categoriasRelacionadas:
  - "[[escrita_documentos|Escrita e documentos]]"
  - "[[edicao_video|Edição de vídeo]]"
  - "[[apresentacoes_slides|Apresentações e slides]]"
  - "[[pagamentos|Pagamentos]]"
  - "[[rag_categoria|Ferramentas de RAG]]"
ferramentasRecomendadas:
  - "[[grammarly|Grammarly]]"
  - "[[notion|Notion]]"
  - "[[capcut|CapCut]]"
  - "[[canva|Canva]]"
  - "[[stripe|Stripe]]"
modelosRecomendados:
  - "[[gemini_embedding_2|Gemini Embedding 2]]"
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: custo
porte:
  - pessoa-fisica
  - pequena
  - media
segmentos:
  - educacao
  - midia-criadores
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[criacao_de_conteudo|Criação de conteúdo]]"
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
  - id: curso-roteiro-aulas
    nome: Roteiro e estrutura de aulas
    descricao: Trilha de módulos, objetivos de aprendizagem e roteiro por aula.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Etapa do curso
        valor: Desenho pedagógico
        fonte: editorial
      - chave: Entregável
        valor: Trilha de módulos, objetivos e roteiro por aula
        fonte: editorial
  - id: curso-gravacao-edicao
    nome: Gravação e edição de aulas
    descricao: Cortes, legendas e áudio limpo para aulas em vídeo.
    funcionalidades:
      - "[[geracao_de_video|Geração de vídeo]]"
      - "[[transcricao_de_audio|Transcrição de áudio]]"
    herdaFerramentas: false
    maisBarata:
      - "[[davinci_resolve|DaVinci Resolve]]"
      - tabela:kdenlive
      - tabela:shotcut
    custoBeneficio:
      - "[[capcut|CapCut]]"
      - tabela:descript
      - tabela:veed
    qualidadeMaxima:
      - "[[adobe_premiere_pro|Adobe Premiere Pro]]"
      - "[[runway|Runway]]"
      - tabela:final-cut-pro
    justificativaFerramentas: "Muda a Etapa do curso para produção em vídeo: exige editor com cortes, legendas e limpeza de áudio."
    excecao: ""
    parametros:
      - chave: Etapa do curso
        valor: Produção das aulas
        fonte: editorial
      - chave: Entregável
        valor: Aulas editadas com cortes, legendas e áudio limpo
        fonte: editorial
      - chave: Formato de aula
        valor: Vídeo gravado de tela e câmera
        fonte: editorial
  - id: curso-materiais
    nome: Materiais didáticos
    descricao: Slides, apostilas e exercícios gerados a partir do roteiro.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[geracao_de_imagem|Geração de imagem]]"
    herdaFerramentas: false
    maisBarata:
      - "[[google_slides|Google Slides]]"
      - tabela:marp
      - tabela:slidev
    custoBeneficio:
      - "[[canva|Canva]]"
      - tabela:gamma
      - tabela:beautiful-ai
    qualidadeMaxima:
      - "[[microsoft_powerpoint|Microsoft PowerPoint]]"
      - tabela:pitch
      - tabela:adobe-express
    justificativaFerramentas: "Muda o Entregável para slides, apostilas e exercícios: o fluxo usa ferramentas de apresentação e design."
    excecao: ""
    parametros:
      - chave: Etapa do curso
        valor: Material de apoio
        fonte: editorial
      - chave: Entregável
        valor: Slides, apostila e exercícios
        fonte: editorial
  - id: curso-checkout
    nome: Checkout e venda
    descricao: Página de venda, pagamento recorrente e liberação de acesso.
    funcionalidades:
      - "[[integracao_de_apis|Integração de APIs]]"
      - "[[automacao_de_workflow|Automação de workflow]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mercado_pago|Mercado Pago]]"
      - tabela:pagbank
      - tabela:asaas
    custoBeneficio:
      - "[[stripe|Stripe]]"
      - tabela:paypal
      - tabela:paddle
    qualidadeMaxima:
      - "[[adyen|Adyen]]"
      - tabela:braintree
      - tabela:checkout-com
    justificativaFerramentas: "Muda a Etapa do curso para venda: a escolha vem de meios de pagamento, recorrência e liberação de acesso."
    excecao: ""
    parametros:
      - chave: Etapa do curso
        valor: Venda e acesso
        fonte: editorial
      - chave: Entregável
        valor: Página de venda, pagamento recorrente e liberação de acesso
        fonte: editorial
      - chave: Plataforma de distribuição
        valor: Plataforma de cursos ou checkout próprio
        fonte: editorial
  - id: curso-tutor-ia
    nome: Tutor de IA para alunos
    descricao: Assistente que responde dúvidas com base no conteúdo do curso.
    funcionalidades:
      - "[[geracao_de_texto|Geração de texto]]"
      - "[[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]"
    herdaFerramentas: false
    maisBarata:
      - "[[pgvector|pgvector]]"
      - "[[chromadb|ChromaDB]]"
      - tabela:qdrant
    custoBeneficio:
      - "[[llamaindex|LlamaIndex]]"
      - "[[langchain|LangChain]]"
      - tabela:weaviate
    qualidadeMaxima:
      - "[[pinecone|Pinecone]]"
      - "[[gemini_embedding_2|Gemini Embedding 2]]"
      - tabela:cohere-rerank
    justificativaFerramentas: "Muda a Etapa do curso para suporte ao aluno com RAG: pede banco vetorial e framework de recuperação."
    excecao: ""
    parametros:
      - chave: Etapa do curso
        valor: Suporte ao aluno
        fonte: editorial
      - chave: Entregável
        valor: Assistente que responde com base no conteúdo do curso
        fonte: editorial
      - chave: Técnica principal
        valor: RAG sobre as transcrições das aulas
        fonte: editorial
tags:
  - caso-de-uso
  - ia
---
# Curso e infoproduto
## 📝 Descrição
Criar, gravar, vender e entregar cursos online e infoprodutos.
## ⏰ Quando aplicar
- Curso gravado ou mentoria
- Ebook e material rico
## 🧩 Funcionalidades necessárias
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[geracao_de_video|Geração de vídeo]] - Criação e edição de vídeo a partir de texto, imagem ou clipes.
- [[transcricao_de_audio|Transcrição de áudio]] - Conversão de fala em texto, com tempo e identificação de falantes quando disponível.
- [[geracao_de_imagem|Geração de imagem]] - Criação e edição de imagens a partir de prompts e referências.
## ✅ Recomendações
- [[grammarly|Grammarly]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[notion|Notion]] - Faixa custo-benefício em [[escrita_documentos|Escrita e documentos]].
- [[capcut|CapCut]] - Faixa custo-benefício em [[edicao_video|Edição de vídeo]].
- [[canva|Canva]] - Faixa custo-benefício em [[apresentacoes_slides|Apresentações e slides]].
- [[stripe|Stripe]] - Faixa custo-benefício em [[pagamentos|Pagamentos]].
- [[gemini_embedding_2|Gemini Embedding 2]] - Modelo da faixa qualidade máxima em [[rag_categoria|Ferramentas de RAG]].
## 🧬 Variações
- **Roteiro e estrutura de aulas** (`curso-roteiro-aulas`): Trilha de módulos, objetivos de aprendizagem e roteiro por aula. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Etapa do curso: Desenho pedagógico; Entregável: Trilha de módulos, objetivos e roteiro por aula.
- **Gravação e edição de aulas** (`curso-gravacao-edicao`): Cortes, legendas e áudio limpo para aulas em vídeo. Funcionalidades: [[geracao_de_video|Geração de vídeo]], [[transcricao_de_audio|Transcrição de áudio]]. Mais barata: [[davinci_resolve|DaVinci Resolve]], Kdenlive, Shotcut. Custo-benefício: [[capcut|CapCut]], Descript, VEED. Qualidade máxima: [[adobe_premiere_pro|Adobe Premiere Pro]], [[runway|Runway]], Final Cut Pro. Por que difere do caso: Muda a Etapa do curso para produção em vídeo: exige editor com cortes, legendas e limpeza de áudio. Parâmetros: Etapa do curso: Produção das aulas; Entregável: Aulas editadas com cortes, legendas e áudio limpo; Formato de aula: Vídeo gravado de tela e câmera.
- **Materiais didáticos** (`curso-materiais`): Slides, apostilas e exercícios gerados a partir do roteiro. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[geracao_de_imagem|Geração de imagem]]. Mais barata: [[google_slides|Google Slides]], Marp, Slidev. Custo-benefício: [[canva|Canva]], Gamma, Beautiful.ai. Qualidade máxima: [[microsoft_powerpoint|Microsoft PowerPoint]], Pitch, Adobe Express. Por que difere do caso: Muda o Entregável para slides, apostilas e exercícios: o fluxo usa ferramentas de apresentação e design. Parâmetros: Etapa do curso: Material de apoio; Entregável: Slides, apostila e exercícios.
- **Checkout e venda** (`curso-checkout`): Página de venda, pagamento recorrente e liberação de acesso. Funcionalidades: [[integracao_de_apis|Integração de APIs]], [[automacao_de_workflow|Automação de workflow]]. Mais barata: [[mercado_pago|Mercado Pago]], PagBank PagSeguro, Asaas. Custo-benefício: [[stripe|Stripe]], PayPal, Paddle. Qualidade máxima: [[adyen|Adyen]], Braintree, Checkout.com. Por que difere do caso: Muda a Etapa do curso para venda: a escolha vem de meios de pagamento, recorrência e liberação de acesso. Parâmetros: Etapa do curso: Venda e acesso; Entregável: Página de venda, pagamento recorrente e liberação de acesso; Plataforma de distribuição: Plataforma de cursos ou checkout próprio.
- **Tutor de IA para alunos** (`curso-tutor-ia`): Assistente que responde dúvidas com base no conteúdo do curso. Funcionalidades: [[geracao_de_texto|Geração de texto]], [[recuperacao_aumentada_rag|Recuperação aumentada (RAG)]]. Mais barata: [[pgvector|pgvector]], [[chromadb|ChromaDB]], Qdrant. Custo-benefício: [[llamaindex|LlamaIndex]], [[langchain|LangChain]], Weaviate. Qualidade máxima: [[pinecone|Pinecone]], [[gemini_embedding_2|Gemini Embedding 2]], Cohere Rerank. Por que difere do caso: Muda a Etapa do curso para suporte ao aluno com RAG: pede banco vetorial e framework de recuperação. Parâmetros: Etapa do curso: Suporte ao aluno; Entregável: Assistente que responde com base no conteúdo do curso; Técnica principal: RAG sobre as transcrições das aulas.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[libreoffice|LibreOffice]], Google Docs, LanguageTool
- **Custo-benefício:** [[grammarly|Grammarly]], [[notion|Notion]], Microsoft Word
- **Qualidade máxima:** [[claude|Claude AI]], [[chatgpt|ChatGPT]], Microsoft 365 Copilot
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** custo. Infoproduto começa com orçamento baixo e o custo fixo mensal pesa na margem.
## 🔗 Relacionamentos
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Casos de Uso de IA
- **Macro:** [[criacao_de_conteudo|Criação de conteúdo]]
