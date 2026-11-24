---
id: clean_architecture
tipo: padrao
nome: Clean Architecture
aliases:
  - Arquitetura Limpa
descricao: "Organiza o código em círculos concêntricos (entidades, casos de uso, adaptadores, frameworks) com a regra de dependência: o código interno nunca conhece o externo."
fonte_ids:
  - martin_clean
  - cockburn_hexagonal
  - fowler_layering
exemplo: Os casos de uso ficam em um módulo sem dependência de Spring, e o framework só aparece na camada externa.
quando_usar:
  - Sistemas de longa vida com regras de negócio complexas
  - Equipes que querem independência de framework, banco e UI
  - Aplicações com múltiplas interfaces de entrega
quando_evitar:
  - Aplicações pequenas ou de curta vida
  - Quando a equipe ainda não domina a separação de camadas e a cerimônia atrasa a entrega
status: revisado
publico: false
fontes:
  - id: martin_clean
    tipo: artigo
    titulo: The Clean Architecture (Robert C. Martin)
    link: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: cockburn_hexagonal
    tipo: artigo
    titulo: Hexagonal architecture (Alistair Cockburn)
    link: https://alistair.cockburn.us/hexagonal-architecture
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: fowler_layering
    tipo: artigo
    titulo: PresentationDomainDataLayering (Martin Fowler)
    link: https://martinfowler.com/bliki/PresentationDomainDataLayering.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[system_design_arquitetura|System design e arquitetura]]"
  - "[[frameworks_testes|Frameworks de testes]]"
familia: distribuido-arquitetura
subfamilia: Estilo arquitetural
problema: Dependências do domínio em frameworks, bancos e UI tornam o sistema frágil e caro de evoluir ou testar.
tradeoffs:
  - "Ganha: domínio independente e testável; paga: mais classes, fronteiras e mapeamentos"
  - "Ganha: troca de frameworks sem reescrever regras; paga: risco de excesso de engenharia em problemas simples"
consequencias:
  - Os DTOs de fronteira entre círculos adicionam código de conversão
  - O limite entre caso de uso e adaptador precisa de disciplina da equipe
padroesRelacionados:
  - "[[arquitetura_em_camadas|Arquitetura em Camadas]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[monolito_modular|Monolito Modular]]"
casosDeUso:
  - "[[refatoracao_de_codigo|Refatoração de código]]"
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - tabela:archunit
  - tabela:nestjs
  - "[[asp_net_core|ASP.NET Core]]"
  - "[[fastapi|FastAPI]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Clean Architecture
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
