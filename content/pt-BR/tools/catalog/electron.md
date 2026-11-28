---
id: electron
tipo: ferramenta
nome: Electron
tipos:
  - FRAMEWORK
empresa: "[[openjs_foundation|OpenJS Foundation]]"
aliases:
  - Electron
categorias:
  - "[[frameworks_desktop|Frameworks de desktop]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - windows
  - macos
  - linux
  - desktop
linguagens:
  - javascript
  - typescript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "app embute Chromium e Node.js: binário e consumo de memória tipicamente maiores que toolkits nativos"
dataVerificacao: 2026-11-27
fontePreco: https://github.com/electron/electron
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - desktop
---
# Electron
## 📋 Informações Básicas
- **Tipos:** FRAMEWORK
- **Empresa/Fabricante:** [[openjs_foundation|OpenJS Foundation]]
- **Website:** https://www.electronjs.org
- **Categorias:** [[frameworks_desktop|Frameworks de desktop]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo LICENSE do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/electron/electron
## 📝 Descrição
Apps desktop multiplataforma com JavaScript, HTML e CSS embutindo Chromium e Node.js; usado por VS Code, Slack e Figma.
## ⏰ Quando Utilizar
- Outra opção na faixa mais barata em [[frameworks_desktop|Frameworks de desktop]]; opção essencial da camada.
- Escolha quando a web é a stack do time: a mesma base de código roda nos três sistemas com os pacotes do npm.
- Ecossistema maduro: auto-update, instaladores e crash reporting embutidos no framework, com Electron Forge para empacotar.
### Quando NÃO utilizar
- Quando binário e memória leves são requisito: [[tauri|Tauri]] renderiza no WebView nativo do sistema.
- Quando suporte dedicado, SLA ou recursos corporativos forem requisito.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** windows, macos, linux, desktop
- **Linguagens:** javascript, typescript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- app embute Chromium e Node.js: binário e consumo de memória tipicamente maiores que toolkits nativos
## 🆚 Alternativas
- [[tauri|Tauri]]
- [[flutter|Flutter]]
- [[javafx|JavaFX (OpenJFX)]]
- [[qt|Qt]]
- [[dotnet_maui|dotNET MAUI]]
- Compose Multiplatform
- Avalonia UI
- wxWidgets
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo LICENSE do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/electron/electron
## 🔗 Relacionamentos
- **Empresa:** [[openjs_foundation|OpenJS Foundation]]
- **Categorias:** [[frameworks_desktop|Frameworks de desktop]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
