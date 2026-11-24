---
id: arquitetura_em_camadas
tipo: padrao
nome: Arquitetura em Camadas
aliases:
  - Layered Architecture
  - N-Tier
descricao: Divide o sistema em camadas horizontais (apresentação, domínio, dados), em que cada camada depende apenas da inferior. É o estilo de partida da maioria dos sistemas corporativos.
fonte_ids:
  - fowler_layering
  - martin_clean
  - azure_patterns_index
exemplo: Controller chama Service, que chama Repository, e nenhuma camada acessa a de cima.
quando_usar:
  - Aplicações corporativas e CRUDs com regras moderadas
  - Equipes iniciantes ou times pequenos que precisam de uma estrutura conhecida
  - Sistemas em que a simplicidade pesa mais que a flexibilidade
quando_evitar:
  - Domínios ricos com muitas regras, em que Hexagonal ou Clean separam melhor o núcleo
  - Casos em que as camadas viram apenas repasse de chamadas
status: revisado
publico: false
fontes:
  - id: fowler_layering
    tipo: artigo
    titulo: PresentationDomainDataLayering (Martin Fowler)
    link: https://martinfowler.com/bliki/PresentationDomainDataLayering.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: martin_clean
    tipo: artigo
    titulo: The Clean Architecture (Robert C. Martin)
    link: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Sem separação de responsabilidades, UI, regras e acesso a dados se misturam e todo ajuste atinge o sistema inteiro.
tradeoffs:
  - "Ganha: simplicidade e familiaridade; paga: acoplamento ao banco e alterações que atravessam todas as camadas"
  - "Ganha: divisão clara de responsabilidades; paga: risco de lógica de negócio escorregar para o serviço ou o controller"
consequencias:
  - A regra de dependência para baixo precisa ser verificada
  - Camadas anêmicas indicam que o padrão deixou de ajudar
padroesRelacionados:
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[clean_architecture|Clean Architecture]]"
  - "[[facade|Facade (GoF)]]"
  - "[[microservices|Microservices]]"
  - "[[monolito_modular|Monolito Modular]]"
casosDeUso:
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[django|Django]]"
  - "[[laravel|Laravel]]"
  - "[[asp_net_core|ASP.NET Core]]"
  - tabela:nestjs
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Arquitetura em Camadas
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
