---
id: typescript
tipo: ferramenta
nome: TypeScript
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[microsoft|Microsoft]]"
aliases:
  - TypeScript
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
  - web
linguagens:
  - typescript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "tipos existem apenas em compile-time: o runtime não enxerga tipos nem oferece reflection deles"
  - "por padrão, erros de tipagem não impedem a emissão do JavaScript compilado"
  - "camada de configuração (tsconfig) e integração com bundlers exigem maturidade do time"
dataVerificacao: 2026-11-27
fontePreco: https://www.typescriptlang.org/
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - linguagem
  - typescript
---
# TypeScript
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[microsoft|Microsoft]]
- **Website:** https://www.typescriptlang.org
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (site oficial consultado e LICENSE.txt do repositório oficial lidos em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.typescriptlang.org/
## 📝 Descrição
Linguagem que adiciona sintaxe de tipos sobre o JavaScript — o site oficial resume: TypeScript is JavaScript with syntax for types (typescriptlang.org, lido em 2026-11-27). Compila de volta para JavaScript puro e roda em qualquer lugar que JS roda: navegador, Node.js, Deno e Bun. Versão vigente: TypeScript 7.0 estável e 7.1 em beta (anúncio no site oficial, 2026-11-27). Mantida pela [[microsoft|Microsoft]] como projeto open-source.
## ⏰ Quando Utilizar
- Bases médias e grandes de JS onde refatoração segura e contratos de API importam.
- Tooling de editor: autocomplete e checagem de erros em tempo real (o site oficial lista editor checks como diferencial).
- Adoção gradual: @ts-check e JSDoc permitem tipar JavaScript sem migrar o arquivo.
- Times grandes com tipos compartilhados entre front e back como contrato.
### Quando NÃO utilizar
- Scripts curtos e descartáveis: o passo de build não se paga; [[javascript|JavaScript]] puro inicia mais rápido.
- Quando se espera verificação de tipos em runtime: os tipos são apagados na compilação.
- Protótipos em que a velocidade de iteração manda mais que a segurança de refatoração.
- Ambientes que não aceitam dependência de build no fluxo: JS nativo é o mínimo denominador.
## 🧰 Toolchain embutida
O que instalar typescript traz, sem nada mais:
- **Compilador tsc:** watch mode, checagem e emissão de JavaScript limpo.
- **Project references e incremental build** para monorepos.
- **Playground oficial** na web para experimentar sem instalar.
- Os tipos são removidos no build: zero custo de runtime de tipos.
- Fora do embutido: lint e formatação ficam com [[eslint|ESLint]] e [[biome|Biome]] no kit.
## 🔁 Ciclo no kit
- **Testes:** [[vitest|Vitest]] em [[frameworks_testes|Frameworks de testes]].
- **Build, lint e formatação:** [[eslint|ESLint]] e [[biome|Biome]] em [[build_lint_formatacao|Build, lint e formatação]].
- **ORM e acesso a dados:** [[prisma|Prisma]] em [[orm_acesso_dados|ORM e acesso a dados]].
- **Framework de backend:** [[fastify|Fastify]] em [[frameworks_backend|Frameworks de backend]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli (compilador via npm) e web (o JavaScript gerado roda em qualquer runtime JS)
- **Linguagens:** typescript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- tipos existem apenas em compile-time: o runtime não enxerga tipos nem oferece reflection deles
- por padrão, erros de tipagem não impedem a emissão do JavaScript compilado
- camada de configuração (tsconfig) e integração com bundlers exigem maturidade do time
## 🆚 Alternativas
- [[javascript|JavaScript]] - sem build e sem tipos
- [[java|Java]] e [[csharp|C#]] - tipagem estática corporativa com runtime maduro
- [[go|Go]] - tipagem simples com binários estáticos
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (LICENSE.txt do repositório oficial microsoft/TypeScript lido em 2026-11-27)
- **Fonte:** https://www.typescriptlang.org/
## 🔗 Relacionamentos
- **Empresa:** [[microsoft|Microsoft]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Ciclo no kit:** [[vitest|Vitest]], [[eslint|ESLint]], [[biome|Biome]], [[prisma|Prisma]], [[fastify|Fastify]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
