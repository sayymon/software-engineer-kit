---
id: ruby
tipo: ferramenta
nome: Ruby
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[ruby_lang_comunidade|Ruby lang (comunidade)]]"
aliases:
  - Ruby
categorias:
  - "[[linguagens_programacao|Linguagens de programação]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - cli
linguagens:
  - ruby
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://www.ruby-lang.org/en/about/license.txt
precoMedio: 0
licenca:
  - BSD-2-Clause
tags:
  - ferramenta
  - linguagem
---
# Ruby
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[ruby_lang_comunidade|Ruby lang (comunidade)]]
- **Website:** https://www.ruby-lang.org
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença dual Ruby License ou BSD-2-Clause (arquivo de licença oficial lido em 2026-11-27)
- **Licença:** dual; o valor registrado segue a opção BSD-2-Clause, que tem nota no kit; a Ruby License, alternativa do dual, não tem nota no kit
- Nota da licença: [[bsd_2_clause|BSD-2-Clause]]
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.ruby-lang.org/en/about/license.txt
## 📝 Descrição
Linguagem dinâmica criada por Yukihiro "Matz" Matsumoto em 1995, desenhada para produtividade e legibilidade ("A Programmer's Best Friend", site oficial). Versão estável atual: Ruby 4.0.10, lançada em 2026-11-18, com os ramos 3.4 e 3.3 em manutenção (ruby-lang.org, 2026-11-27). O ecossistema reúne mais de 200 mil gems e ferramentas como Rails, RSpec e Bundler (ruby-lang.org, 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção em [[linguagens_programacao|Linguagens de programação]]; filtre pela linguagem do projeto no kit.
- **Produtividade com [[ruby_on_rails|Ruby on Rails]]:** convenção sobre configuração, scaffolding e ORM incluído levam de ideia a MVP rápido.
- **Legibilidade como valor:** sintaxe próxima da linguagem natural reduz boilerplate e custo de manutenção.
- **DSLs e metaprogramação:** base de ferramentas como RSpec e do próprio Rails.
- **Scripts, automação e DevOps:** CLI madura e gems para quase tudo.
### Quando NÃO utilizar
- **Performance CPU-bound crítica:** para throughput e concorrência agressivos, linguagens compiladas (Go, Rust) tendem a render melhor.
- **Tipagem estática rigorosa como requisito central:** Ruby é dinâmica por natureza; RBS ajuda na documentação de tipos, mas não transforma a linguagem.
- **Mobile nativo e frontend web:** fora do foco da linguagem.
- **Equipe já dominando outra stack** sem ganho real de produtividade em troca.
## 🧰 Toolchain embutida
- **gem (RubyGems) e Bundler:** gestão de pacotes e travamento de dependências (Gemfile, `bundle install`).
- **RSpec como framework de testes convencional:** nota no kit: [[rspec|RSpec]].
- **RuboCop como linter convencional:** style guide, lint e autocorreção; não há linter embutido, RuboCop é o padrão de facto do ecossistema.
- **ActiveRecord via Rails:** ORM convencional, incluído em [[ruby_on_rails|Ruby on Rails]].
- **net/http:** cliente HTTP embutido na biblioteca padrão.
## 🔄 Ciclo no kit
- **Testes:** [[rspec|RSpec]]
- **Backend:** [[ruby_on_rails|Ruby on Rails]], [[sinatra|Sinatra]]
- **ORM, build/lint e cliente HTTP:** cobertos pela toolchain acima (ActiveRecord via [[ruby_on_rails|Ruby on Rails]]; RubyGems/Bundler e RuboCop; net/http).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** ruby
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[php|PHP]]
- [[kotlin|Kotlin]]
- Python
- Node.js
- Go
## 💰 Custo e Contratação
- Gratuito, licença dual Ruby License ou BSD-2-Clause (arquivo de licença oficial lido em 2026-11-27)
- Nota da licença: [[bsd_2_clause|BSD-2-Clause]]
- **Fonte:** https://www.ruby-lang.org/en/about/license.txt
## 🔗 Relacionamentos
- **Empresa:** [[ruby_lang_comunidade|Ruby lang (comunidade)]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
