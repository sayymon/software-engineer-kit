---
id: php
tipo: ferramenta
nome: PHP
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[php_foundation|PHP Foundation]]"
aliases:
  - PHP
  - "PHP: Hypertext Preprocessor"
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
  - php
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
fontePreco: https://www.php.net/license/
precoMedio: 0
licenca:
  - BSD-3-Clause
tags:
  - ferramenta
  - linguagem
---
# PHP
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[php_foundation|PHP Foundation]]
- **Website:** https://www.php.net
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença BSD-3-Clause (página de licença oficial consultada em 2026-11-27)
- **Licença:** desde o PHP 8.6, a PHP License v4, idêntica à Modified BSD License, com SPDX BSD-3-Clause declarado pelo php.net; versões anteriores seguem sob a legada PHP License 3.01
- Nota da licença: [[bsd_3_clause|BSD-3-Clause]]
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.php.net/license/
## 📝 Descrição
Linguagem de script server-side que roda grande parte da web, do WordPress aos frameworks [[laravel|Laravel]] e [[symfony|Symfony]]. Versão estável atual: PHP 8.6.0, lançada em 2026-11-19 (php.net). O desenvolvimento é conduzido pela comunidade PHP e a [[php_foundation|PHP Foundation]] financia desenvolvedores core (php.net, 2026-11-27).
## ⏰ Quando Utilizar
- Outra opção em [[linguagens_programacao|Linguagens de programação]]; filtre pela linguagem do projeto no kit.
- **Web hosting amplo:** praticamente todo provedor compartilhado roda PHP; implantar é simples, sem build step complexo.
- **WordPress e CMSs:** a linguagem por trás do WordPress, do Drupal e de boa parte dos plugins e temas da web.
- **Monólitos e APIs web:** ecossistema maduro ([[laravel|Laravel]], [[symfony|Symfony]]) com ORM, filas, cache e testes resolvidos.
- **Deploy simples:** PHP-FPM com Nginx/Apache e iteração rápida com ferramental enxuto.
### Quando NÃO utilizar
- **CPU-bound e processos de longa duração:** o modelo clássico do PHP é request/response; para trabalho contínuo e alto paralelismo, linguagens compiladas (Go, Rust, Java) tendem a render melhor.
- **Real-time persistente:** websockets de sessão longa exigem camadas adicionais (Swoole, RoadRunner), fora do modelo padrão.
- **Mobile nativo e desktop:** fora do alvo da linguagem.
- **Equipe já dominando outra stack** sem requisito de hosting amplo ou CMS que justifique a troca.
## 🧰 Toolchain embutida
- **php CLI:** interpretador e servidor web embutido (`php -S`) para desenvolvimento local.
- **Composer:** gestor de dependências e autoloader padrão do ecossistema, distribuindo pacotes via Packagist; frameworks e ferramentas se instalam por Composer.
- **PHPUnit via Composer:** framework de testes convencional do PHP; nota no kit: [[phpunit|PHPUnit]].
- **Guzzle:** cliente HTTP convencional do ecossistema, instalado via Composer.
- **ORM:** sem ORM nativo; a camada fica coberta pelo Eloquent dentro de [[laravel|Laravel]].
## 🔄 Ciclo no kit
- **Testes:** [[phpunit|PHPUnit]]
- **Backend:** [[laravel|Laravel]], [[symfony|Symfony]]
- **ORM, build e cliente HTTP:** cobertos pela toolchain acima (Eloquent via [[laravel|Laravel]]; Composer; Guzzle).
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** php
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🆚 Alternativas
- [[ruby|Ruby]]
- [[kotlin|Kotlin]]
- Python
- Node.js
- Java
- Go
## 💰 Custo e Contratação
- Gratuito, licença BSD-3-Clause (página de licença oficial consultada em 2026-11-27)
- Nota da licença: [[bsd_3_clause|BSD-3-Clause]]
- **Fonte:** https://www.php.net/license/
## 🔗 Relacionamentos
- **Empresa:** [[php_foundation|PHP Foundation]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
