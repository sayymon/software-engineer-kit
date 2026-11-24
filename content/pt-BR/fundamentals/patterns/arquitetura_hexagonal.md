---
id: arquitetura_hexagonal
tipo: padrao
nome: Arquitetura Hexagonal
aliases:
  - Ports and Adapters
  - Portas e Adaptadores
descricao: Isola o núcleo de negócio de detalhes externos por meio de portas (interfaces) e adaptadores (implementações de banco, HTTP, filas). As dependências apontam para o domínio.
fonte_ids:
  - cockburn_hexagonal
  - martin_clean
  - azure_patterns_index
exemplo: O caso de uso CriarPedido depende da porta PedidoRepository, implementada por um adaptador JPA em produção e por um fake em memória nos testes.
quando_usar:
  - Domínios ricos que precisam de testes rápidos sem infraestrutura
  - Serviços com várias entradas (HTTP, fila, CLI) para o mesmo núcleo
  - Sistemas de vida longa com troca provável de tecnologias
quando_evitar:
  - CRUDs simples e protótipos descartáveis
  - Equipes pequenas em que a indireção de portas e adaptadores supera o benefício
status: revisado
publico: false
fontes:
  - id: cockburn_hexagonal
    tipo: artigo
    titulo: Hexagonal architecture (Alistair Cockburn)
    link: https://alistair.cockburn.us/hexagonal-architecture
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
  - "[[frameworks_testes|Frameworks de testes]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Regras de negócio misturadas a framework, banco e transporte ficam difíceis de testar e de trocar, e cada mudança de infraestrutura atinge o domínio.
tradeoffs:
  - "Ganha: testabilidade e independência de tecnologia; paga: mais interfaces e mapeamentos"
  - "Ganha: o domínio evolui sem arrastar frameworks; paga: curva de aprendizado e risco de excesso de abstração"
consequencias:
  - Regras de dependência devem ser verificadas automaticamente (ArchUnit)
  - Mapear objetos entre camadas é custo recorrente
padroesRelacionados:
  - "[[adapter|Adapter (GoF)]]"
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[clean_architecture|Clean Architecture]]"
  - "[[monolito_modular|Monolito Modular]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[software_b2b_media_empresa|Software B2B (média empresa)]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:archunit
  - tabela:nestjs
  - "[[quarkus|Quarkus]]"
  - "[[micronaut|Micronaut]]"
  - "[[asp_net_core|ASP.NET Core]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Arquitetura Hexagonal
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
