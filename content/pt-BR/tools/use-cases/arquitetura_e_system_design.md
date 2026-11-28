---
id: arquitetura_e_system_design
tipo: caso-de-uso
nome: Arquitetura e system design
aliases: []
descricao: Desenhar sistemas escaláveis, escolher componentes e registrar trade-offs.
funcionalidadesNecessarias:
  - "[[raciocinio|Raciocínio]]"
  - "[[busca_na_web|Busca na web]]"
  - "[[contexto_longo|Contexto longo]]"
  - "[[geracao_de_infografico|Geração de infográfico]]"
  - "[[geracao_de_texto|Geração de texto]]"
categoriasRelacionadas:
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[documentacao_diagramas|Documentação e diagramas]]"
  - "[[banco_relacional|Banco relacional]]"
  - "[[mensageria_streaming|Mensageria e streaming]]"
  - "[[precos_custos_nuvem_ia|Preços e custos de nuvem e IA]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[orquestracao_workflows_sagas|Orquestração de workflows e sagas]]"
  - "[[captura_mudancas_event_store|Captura de mudanças e event store]]"
ferramentasRecomendadas:
  - "[[architecture_decision_record|Architecture Decision Record]]"
  - "[[obsidian|Obsidian (ferramenta)]]"
  - "[[excalidraw|Excalidraw (ferramenta)]]"
  - "[[neon|Neon]]"
  - "[[amazon_sqs|Amazon SQS]]"
modelosRecomendados: []
criteriosDesempate:
  - custo
  - privacidade-de-dados
  - lock-in
criterioPadrao: lock-in
porte:
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
  - software-saas
nicho: ""
nivel: caso
eixo: tarefa
macro: "[[desenvolvimento_de_software|Desenvolvimento de software]]"
faixasPadrao:
  maisBarata:
    - "[[system_design_primer|System Design Primer]]"
    - tabela:system-design-101
    - tabela:awesome-scalability
  custoBeneficio:
    - "[[architecture_decision_record|Architecture Decision Record]]"
    - tabela:awesome-software-architecture
    - tabela:awesome-design-patterns
  qualidadeMaxima:
    - "[[awesome_system_design_resources|Awesome System Design Resources]]"
    - tabela:tech-interview-handbook
    - tabela:c4-plantuml
variacoes:
  - id: arq-estudo-referencia
    nome: Estudo de referência
    descricao: Padrões e casos reais de sistemas parecidos.
    funcionalidades:
      - "[[busca_na_web|Busca na web]]"
      - "[[raciocinio|Raciocínio]]"
    herdaFerramentas: true
    parametros:
      - chave: Etapa do desenho
        valor: Pesquisa de referências
        fonte: editorial
      - chave: Escala típica
        valor: Sistema de médio a grande porte
        fonte: editorial
      - chave: Entregável
        valor: Lista de padrões e casos reais
        fonte: editorial
  - id: arq-diagrama-c4
    nome: Diagramas de contexto e contêiner
    descricao: Modelo C4 e visão de componentes.
    funcionalidades:
      - "[[geracao_de_infografico|Geração de infográfico]]"
      - "[[geracao_de_texto|Geração de texto]]"
    herdaFerramentas: false
    maisBarata:
      - "[[mermaid|Mermaid]]"
      - tabela:docusaurus
      - tabela:mkdocs
    custoBeneficio:
      - "[[obsidian|Obsidian (ferramenta)]]"
      - "[[excalidraw|Excalidraw (ferramenta)]]"
      - tabela:drawio
    qualidadeMaxima:
      - "[[lucidchart|Lucidchart]]"
      - tabela:miro
      - tabela:whimsical
    justificativaFerramentas: "Muda Entregável para diagramas de contexto, contêiner e componente: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Etapa do desenho
        valor: Documentação da arquitetura
        fonte: editorial
      - chave: Escala típica
        valor: Um sistema com vários contêineres
        fonte: editorial
      - chave: Entregável
        valor: Diagramas de contexto, contêiner e componente
        fonte: editorial
  - id: arq-escolha-dados
    nome: Escolha de banco e armazenamento
    descricao: Relacional, documento, cache ou analítico por carga.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[postgresql|PostgreSQL]]"
      - tabela:mariadb
      - tabela:sqlite
    custoBeneficio:
      - "[[neon|Neon]]"
      - tabela:planetscale
      - tabela:cockroachdb
    qualidadeMaxima:
      - "[[amazon_aurora|Amazon Aurora (ferramenta)]]"
      - tabela:google-cloud-spanner
      - tabela:azure-sql-database
    justificativaFerramentas: "Muda Entregável para banco escolhido com registro da decisão: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Etapa do desenho
        valor: Decisão de armazenamento
        fonte: editorial
      - chave: Escala típica
        valor: Carga estimada de leitura e escrita
        fonte: editorial
      - chave: Entregável
        valor: Banco escolhido com registro da decisão
        fonte: editorial
  - id: arq-mensageria
    nome: Mensageria e eventos
    descricao: Filas, tópicos e consistência eventual.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[contexto_longo|Contexto longo]]"
    herdaFerramentas: false
    maisBarata:
      - "[[rabbitmq|RabbitMQ]]"
      - "[[nats|NATS]]"
      - "[[apache_kafka|Apache Kafka]]"
    custoBeneficio:
      - "[[amazon_sqs|Amazon SQS]]"
      - tabela:google-pubsub
      - tabela:redpanda
    qualidadeMaxima:
      - "[[confluent_cloud|Confluent Cloud]]"
      - "[[amazon_msk|Amazon MSK (ferramenta)]]"
      - tabela:azure-event-hubs
    justificativaFerramentas: "Muda Entregável para filas, tópicos e consistência eventual: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Etapa do desenho
        valor: Decisão de integração
        fonte: editorial
      - chave: Escala típica
        valor: Eventos entre vários serviços
        fonte: editorial
      - chave: Entregável
        valor: Filas, tópicos e consistência eventual
        fonte: editorial
  - id: arq-custos-nuvem
    nome: Custo e capacidade
    descricao: Estimar custo mensal e limites por provedor.
    funcionalidades:
      - "[[raciocinio|Raciocínio]]"
      - "[[busca_na_web|Busca na web]]"
    herdaFerramentas: false
    maisBarata:
      - "[[models_dev|models.dev]]"
      - tabela:openrouter-models
      - tabela:pricepertoken
    custoBeneficio:
      - "[[instances_vantage|Instances (Vantage)]]"
      - tabela:infracost
      - tabela:opencost
    qualidadeMaxima:
      - "[[aws_pricing_calculator|AWS Pricing Calculator]]"
      - tabela:azure-pricing-calculator
      - tabela:gcp-pricing-calculator
    justificativaFerramentas: "Muda Entregável para planilha de custo e capacidade: as ferramentas acompanham esse contexto e diferem do padrão do caso."
    excecao: ""
    parametros:
      - chave: Etapa do desenho
        valor: Estimativa de custo
        fonte: editorial
      - chave: Escala típica
        valor: Custo mensal por provedor
        fonte: editorial
      - chave: Entregável
        valor: Planilha de custo e capacidade
        fonte: editorial
tags:
  - caso-de-uso
  - ferramenta
---
# Arquitetura e system design
## 📝 Descrição
Desenhar sistemas escaláveis, escolher componentes e registrar trade-offs.
## ⏰ Quando aplicar
- Novo serviço ou plataforma
- Evolução de sistema legado
## 🧩 Funcionalidades necessárias
- [[raciocinio|Raciocínio]] - Resolução de problemas em várias etapas, com planejamento, lógica e matemática.
- [[busca_na_web|Busca na web]] - Consulta à web em tempo real, com resposta fundamentada em fontes.
- [[contexto_longo|Contexto longo]] - Janela de contexto grande o bastante para ler bases de código, contratos e longos históricos de uma vez.
- [[geracao_de_infografico|Geração de infográfico]] - Criação de infográficos e diagramas a partir de texto ou notas.
- [[geracao_de_texto|Geração de texto]] - Produção de texto livre ou orientado por instruções, de rascunhos a respostas longas.
## ✅ Recomendações
- [[architecture_decision_record|Architecture Decision Record]] - Faixa custo-benefício em [[system_design_arquitetura|System design e arquitetura]].
- [[obsidian|Obsidian (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[excalidraw|Excalidraw (ferramenta)]] - Faixa custo-benefício em [[documentacao_diagramas|Documentação e diagramas]].
- [[neon|Neon]] - Faixa custo-benefício em [[banco_relacional|Banco relacional]].
- [[amazon_sqs|Amazon SQS]] - Faixa custo-benefício em [[mensageria_streaming|Mensageria e streaming]].
## 🧬 Variações
- **Estudo de referência** (`arq-estudo-referencia`): Padrões e casos reais de sistemas parecidos. Funcionalidades: [[busca_na_web|Busca na web]], [[raciocinio|Raciocínio]]. Ferramentas: herda do caso (ver Faixas padrão do caso). Parâmetros: Etapa do desenho: Pesquisa de referências; Escala típica: Sistema de médio a grande porte; Entregável: Lista de padrões e casos reais.
- **Diagramas de contexto e contêiner** (`arq-diagrama-c4`): Modelo C4 e visão de componentes. Funcionalidades: [[geracao_de_infografico|Geração de infográfico]], [[geracao_de_texto|Geração de texto]]. Mais barata: [[mermaid|Mermaid]], Docusaurus, MkDocs. Custo-benefício: [[obsidian|Obsidian (ferramenta)]], [[excalidraw|Excalidraw (ferramenta)]], draw.io. Qualidade máxima: [[lucidchart|Lucidchart]], Miro, Whimsical. Por que difere do caso: Muda Entregável para diagramas de contexto, contêiner e componente: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Etapa do desenho: Documentação da arquitetura; Escala típica: Um sistema com vários contêineres; Entregável: Diagramas de contexto, contêiner e componente.
- **Escolha de banco e armazenamento** (`arq-escolha-dados`): Relacional, documento, cache ou analítico por carga. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[postgresql|PostgreSQL]], MariaDB, SQLite. Custo-benefício: [[neon|Neon]], PlanetScale, CockroachDB. Qualidade máxima: [[amazon_aurora|Amazon Aurora (ferramenta)]], Google Cloud Spanner, Azure SQL Database. Por que difere do caso: Muda Entregável para banco escolhido com registro da decisão: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Etapa do desenho: Decisão de armazenamento; Escala típica: Carga estimada de leitura e escrita; Entregável: Banco escolhido com registro da decisão.
- **Mensageria e eventos** (`arq-mensageria`): Filas, tópicos e consistência eventual. Funcionalidades: [[raciocinio|Raciocínio]], [[contexto_longo|Contexto longo]]. Mais barata: [[rabbitmq|RabbitMQ]], NATS, Apache Kafka. Custo-benefício: [[amazon_sqs|Amazon SQS]], Google Pub/Sub, Redpanda. Qualidade máxima: [[confluent_cloud|Confluent Cloud]], [[amazon_msk|Amazon MSK (ferramenta)]], Azure Event Hubs. Por que difere do caso: Muda Entregável para filas, tópicos e consistência eventual: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Etapa do desenho: Decisão de integração; Escala típica: Eventos entre vários serviços; Entregável: Filas, tópicos e consistência eventual.
- **Custo e capacidade** (`arq-custos-nuvem`): Estimar custo mensal e limites por provedor. Funcionalidades: [[raciocinio|Raciocínio]], [[busca_na_web|Busca na web]]. Mais barata: [[models_dev|models.dev]], OpenRouter Models, Price Per Token. Custo-benefício: [[instances_vantage|Instances (Vantage)]], Infracost, OpenCost. Qualidade máxima: [[aws_pricing_calculator|AWS Pricing Calculator]], Azure Pricing Calculator, Google Cloud Pricing Calculator. Por que difere do caso: Muda Entregável para planilha de custo e capacidade: as ferramentas acompanham esse contexto e diferem do padrão do caso. Parâmetros: Etapa do desenho: Estimativa de custo; Escala típica: Custo mensal por provedor; Entregável: Planilha de custo e capacidade.
## 🧰 Faixas padrão do caso
Ferramentas herdadas pelas variações com `herdaFerramentas: true`.
- **Mais barata:** [[system_design_primer|System Design Primer]], System Design 101, Awesome Scalability
- **Custo-benefício:** [[architecture_decision_record|Architecture Decision Record]], Awesome Software Architecture, Awesome Design Patterns
- **Qualidade máxima:** [[awesome_system_design_resources|Awesome System Design Resources]], Tech Interview Handbook, C4-PlantUML
## ⚖ Critérios de desempate
- **custo:** menor gasto total (assinatura, tokens, tempo)
- **privacidade-de-dados:** onde os dados são processados e se treinam o modelo
- **lock-in:** facilidade de trocar de fornecedor depois
- **Critério padrão deste caso:** lock-in. Decisão de arquitetura é cara de reverter e a dependência de fornecedor pesa.
## 🔗 Relacionamentos
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
- **Macro:** [[desenvolvimento_de_software|Desenvolvimento de software]]
