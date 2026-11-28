---
id: proxy
tipo: padrao
nome: Proxy
aliases:
  - Proxy
descricao: Fornece um substituto ou representante de outro objeto que controla o acesso a ele (lazy loading, cache, controle de acesso, chamada remota).
fonte_ids:
  - gof_proxy
  - book_gof
exemplo: O Spring cria um proxy em volta do bean para abrir a transação antes do método @Transactional e confirmá-la depois.
quando_usar:
  - Lazy loading de objetos caros
  - Controle de acesso, cache e logging transparentes
  - Representante local de um serviço remoto
quando_evitar:
  - Quando o acesso direto é suficiente
  - Quando a indireção esconde custos de rede que o cliente deveria enxergar
status: revisado
publico: false
fontes:
  - id: gof_proxy
    tipo: artigo
    titulo: Proxy (refactoring.guru)
    link: https://refactoring.guru/design-patterns/proxy
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[frameworks_backend|Frameworks de backend]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
familia: gof
subfamilia: Estrutural
problema: É preciso controlar ou adiar o acesso a um objeto (caro, remoto ou protegido) sem que o cliente perceba a diferença.
tradeoffs:
  - "Ganha: acesso controlado sem alterar o objeto real; paga: latência e complexidade adicionais"
  - "Ganha: o cliente ignora detalhes do acesso; paga: depuração mais difícil por camadas dinâmicas"
consequencias:
  - Frameworks geram proxies dinâmicos para transações, segurança e cache
  - Proxies remotos mostram a ligação com Service Mesh e Sidecar
padroesRelacionados:
  - "[[adapter|Adapter (GoF)]]"
  - "[[decorator|Decorator (GoF)]]"
  - "[[service_mesh|Service Mesh]]"
  - "[[sidecar|Sidecar]]"
casosDeUso:
  - "[[revisao_de_codigo|Revisão de código]]"
  - "[[depuracao_e_correcao_de_bugs|Depuração e correção de bugs]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes: []
ferramentas:
  - "[[spring_boot|Spring Boot]]"
  - "[[spring_security|Spring Security]]"
  - tabela:retrofit
  - "[[nginx|NGINX]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Proxy
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
