---
id: javascript
tipo: ferramenta
nome: JavaScript
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[javascript_comunidade|JavaScript (comunidade)]]"
aliases:
  - JavaScript
  - ECMAScript
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
  - web
  - linux
  - macos
  - windows
  - cli
linguagens:
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "tipagem dinâmica com coerções históricas que exigem disciplina e lint; sem verificação de tipos em tempo de compilação"
  - "event loop single-threaded por runtime: CPU-bound bloqueia a thread principal e exige worker threads ou processos"
  - "sem runtime único oficial: Node.js, Deno e Bun divergem em APIs, recursos e ciclos de release"
dataVerificacao: 2026-11-27
fontePreco: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
precoMedio: 0
licenca: []
tags:
  - ferramenta
  - linguagem
  - javascript
---
# JavaScript
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[javascript_comunidade|JavaScript (comunidade)]]
- **Website:** https://tc39.es/ecma262/
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, padrão aberto da Ecma sem licença de software única (página oficial do padrão lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
## 📝 Descrição
Linguagem multiplataforma de alto nível com tipagem dinâmica, definida pelo padrão aberto ECMA-262 — vigente: ECMAScript 2026, 17ª edição, junho de 2026, sob a política de patentes RF da Ecma e evoluída pelo comitê TC39 (página oficial da Ecma lida em 2026-11-27). É a única linguagem que os navegadores executam nativamente e roda também em runtimes de servidor como Node.js, Deno e Bun.
## ⏰ Quando Utilizar
- Web frontend: é a única linguagem nativa do navegador; qualquer UI na web passa por ela (direta ou transpilada).
- Fullstack com um único idioma no time: Node.js, Deno e Bun levam o mesmo código ao servidor.
- Ferramentas de desenvolvimento e build: o ecossistema npm domina o tooling de front.
- Scripts e protótipos multiplataforma com entrega instantânea no navegador.
### Quando NÃO utilizar
- Tipagem estática como requisito de contrato e refatoração segura: prefira [[typescript|TypeScript]].
- Backend CPU-bound com paralelismo: o event loop é single-threaded; compare com [[go|Go]] e [[java|Java]].
- Cálculo pesado com latência previsível: o modelo dinâmico cobra imposto de runtime; [[rust|Rust]] e [[go|Go]] rendem mais.
- Mobile nativo de primeira classe: prefira [[kotlin|Kotlin]] e [[swift|Swift]].
## 🧰 Toolchain embutida
O que o runtime dá sem instalar nada:
- **Node.js inclui:** npm (gerenciador de pacotes), REPL, fetch global embutido e o runner de testes node:test.
- **npm scripts:** automação de tarefas declarada no package.json.
- **No navegador:** DevTools completos e módulos ES nativos.
- Fora do embutido: lint e formatação ficam com [[eslint|ESLint]] e [[prettier|Prettier]] no kit.
## 🔁 Ciclo no kit
- **Testes:** [[vitest|Vitest]] em [[frameworks_testes|Frameworks de testes]].
- **Build, lint e formatação:** [[eslint|ESLint]] e [[prettier|Prettier]] em [[build_lint_formatacao|Build, lint e formatação]].
- **Framework de backend:** [[express|Express]] em [[frameworks_backend|Frameworks de backend]].
- **Cliente HTTP:** [[axios|Axios]] em [[clientes_http_api|Clientes HTTP e API]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** web (navegadores), linux, macos, windows, cli (Node.js, Deno, Bun)
- **Linguagens:** javascript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- tipagem dinâmica com coerções históricas que exigem disciplina e lint; sem verificação de tipos em tempo de compilação
- event loop single-threaded por runtime: CPU-bound bloqueia a thread principal e exige worker threads ou processos
- sem runtime único oficial: Node.js, Deno e Bun divergem em APIs, recursos e ciclos de release
## 🆚 Alternativas
- [[typescript|TypeScript]] - tipagem estática sobre o mesmo ecossistema
- [[python|Python]] - produtividade e ecossistema de dados
- [[go|Go]] - paralelismo simples e binários estáticos
- [[java|Java]] - ecossistema corporativo maduro
- [[rust|Rust]] - desempenho máximo e segurança de memória
## 💰 Custo e Contratação
- Gratuito; a linguagem é um padrão aberto da Ecma (ECMA-262), sem licença de software única: cada runtime define a própria (Node.js sob MIT, V8 sob BSD-3-Clause, ambas com nota atômica no kit)
- **Fonte:** https://www.ecma-international.org/publications-and-standards/standards/ecma-262/ (lida em 2026-11-27)
## 🔗 Relacionamentos
- **Empresa:** [[javascript_comunidade|JavaScript (comunidade)]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Ciclo no kit:** [[vitest|Vitest]], [[eslint|ESLint]], [[prettier|Prettier]], [[express|Express]], [[axios|Axios]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
