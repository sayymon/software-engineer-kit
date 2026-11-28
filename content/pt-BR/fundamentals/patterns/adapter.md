---
id: adapter
tipo: padrao
nome: Adapter
aliases:
  - Adapter
descricao: Converte a interface de uma classe na interface que o cliente espera, permitindo que classes incompatíveis trabalhem juntas.
fonte_ids:
  - gof_adapter
  - book_gof
exemplo: Um PagamentoAdapter converte a chamada pagar(valor) do domínio na chamada específica do SDK do provedor.
quando_usar:
  - Integrar bibliotecas ou APIs de terceiros
  - Isolar o domínio de detalhes de um provedor
  - Reaproveitar código legado com nova interface
quando_evitar:
  - Quando é possível alterar a interface original
  - Quando o adaptador só repassa chamadas sem traduzir nada
status: revisado
publico: false
fontes:
  - id: gof_adapter
    tipo: artigo
    titulo: Adapter (refactoring.guru)
    link: https://refactoring.guru/design-patterns/adapter
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: book_gof
    tipo: livro
    titulo: "Design Patterns: Elements of Reusable Object-Oriented Software (Gamma, Helm, Johnson, Vlissides)"
    link: https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[clientes_http_api|Clientes HTTP e API]]"
  - "[[orm_acesso_dados|ORM e acesso a dados]]"
familia: gof
subfamilia: Estrutural
problema: Uma biblioteca ou sistema existente tem uma interface diferente da que o código cliente usa, e alterar qualquer um dos dois é inviável.
tradeoffs:
  - "Ganha: reuso sem alterar o código existente; paga: uma camada extra de indireção"
  - "Ganha: troca de fornecedor em um ponto; paga: o adaptador precisa acompanhar mudanças da API adaptada"
consequencias:
  - É a base dos adaptadores da Arquitetura Hexagonal
  - O adaptador isola o domínio do provedor, o que facilita testes com fakes
padroesRelacionados:
  - "[[anti_corruption_layer|Anti-Corruption Layer]]"
  - "[[arquitetura_hexagonal|Arquitetura Hexagonal]]"
  - "[[bridge|Bridge (GoF)]]"
  - "[[facade|Facade (GoF)]]"
  - "[[proxy|Proxy (GoF)]]"
casosDeUso:
  - "[[integracao_de_apis_e_webhooks|Integração de APIs e webhooks]]"
  - "[[migracao_e_modernizacao_de_codigo|Migração e modernização de código]]"
  - "[[refatoracao_de_codigo|Refatoração de código]]"
variacoes: []
ferramentas:
  - tabela:retrofit
  - "[[okhttp|OkHttp]]"
  - "[[spring_boot|Spring Boot]]"
  - "[[sqlalchemy|SQLAlchemy]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Adapter
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
