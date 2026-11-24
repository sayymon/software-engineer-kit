---
id: monolito_modular
tipo: padrao
nome: Monolito Modular
aliases:
  - Modular Monolith
descricao: Uma única unidade de deploy dividida em módulos com fronteiras explícitas e baixo acoplamento, cada um com sua API interna e, idealmente, seus próprios dados.
fonte_ids:
  - fowler_monolith_first
  - book_richardson
  - fowler_microservices
exemplo: Um aplicativo Spring Boot com módulos pedidos, estoque e cobrança que só se comunicam por interfaces e eventos internos.
quando_usar:
  - Produtos novos ou em evolução rápida com um time pequeno ou médio
  - Ponto de partida antes de extrair microsserviços
  - Organizações sem estrutura para operar muitos serviços
quando_evitar:
  - Times grandes que precisam de deploy e escala independentes por módulo
  - Módulos com requisitos de runtime radicalmente diferentes
status: revisado
publico: false
fontes:
  - id: fowler_monolith_first
    tipo: artigo
    titulo: MonolithFirst (Martin Fowler)
    link: https://martinfowler.com/bliki/MonolithFirst.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_richardson
    tipo: livro
    titulo: Microservices Patterns (Chris Richardson)
    link: https://microservices.io/book
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_microservices
    tipo: artigo
    titulo: Microservices (Martin Fowler e James Lewis)
    link: https://martinfowler.com/articles/microservices.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[frameworks_testes|Frameworks de testes]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Monolitos sem fronteiras viram uma bola de lama, e microsserviços cedo demais trazem complexidade distribuída antes de o domínio estar entendido.
tradeoffs:
  - "Ganha: simplicidade operacional e refatoração barata; paga: disciplina para manter as fronteiras sem a ajuda da rede"
  - "Ganha: caminho natural para extrair serviços depois; paga: deploy e escala continuam atrelados ao conjunto"
consequencias:
  - Regras de dependência entre módulos precisam de testes automatizados
  - Evite compartilhar tabelas entre módulos
padroesRelacionados:
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[clean_architecture|Clean Architecture]]"
  - "[[microservices|Microservices]]"
  - "[[strangler_fig|Strangler Fig]]"
casosDeUso:
  - "[[startup_saas_inicial_pequena_empresa|Startup SaaS inicial (pequena empresa)]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
variacoes: []
ferramentas:
  - tabela:spring-modulith
  - tabela:archunit
  - "[[spring_boot|Spring Boot]]"
  - tabela:nestjs
  - "[[django|Django]]"
  - "[[laravel|Laravel]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Monolito Modular
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
