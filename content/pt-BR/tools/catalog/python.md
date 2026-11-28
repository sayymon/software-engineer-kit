---
id: python
tipo: ferramenta
nome: Python
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[python_software_foundation|Python Software Foundation]]"
aliases:
  - Python
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
  - android
  - ios
  - cli
linguagens:
  - python
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "GIL na build padrão limita paralelismo real de CPU entre threads; a build free-threaded experimental remove o GIL com custo de compatibilidade"
  - "runtime interpretado: em cenários CPU-bound o custo de computação por requisição tende a superar o de linguagens compiladas"
  - "distribuição de aplicações como binário standalone continua sendo atrito (ambientes, dependências e empacotamento)"
dataVerificacao: 2026-11-27
fontePreco: https://www.python.org/
precoMedio: 0
licenca:
  - Python-2.0
tags:
  - ferramenta
  - linguagem
  - python
---
# Python
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[python_software_foundation|Python Software Foundation]]
- **Website:** https://www.python.org
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, implementação de referência CPython sob a PSF License Version 2 (página oficial de licença lida em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://www.python.org/
## 📝 Descrição
Linguagem de propósito geral, interpretada e multiparadigma, criada por Guido van Rossum no início dos anos 1990 e mantida pela [[python_software_foundation|Python Software Foundation]], fundação sem fins lucrativos formada em 2001 para deter a propriedade intelectual relacionada a Python. O site oficial resume a proposta: trabalhar rápido e integrar sistemas com mais eficácia. Versão estável vigente: 3.15.2 (downloads oficiais, 2026-11-27); a página oficial de história e licença registra que todas as releases são open-source.
## ⏰ Quando Utilizar
- Produtividade e legibilidade em primeiro lugar: scripts, automação, CLIs e protótipos que viram produção.
- Dados, ciência e IA: o site oficial lista PyTorch, TensorFlow, scikit-learn e Pandas como usos de referência.
- APIs e backends maduros com [[django|Django]] ou [[fastapi|FastAPI]].
- Ensino e onboarding: curva de entrada baixa é ativo de formação e contratação.
### Quando NÃO utilizar
- CPU-bound com paralelismo de threads: o GIL da build padrão limita paralelismo real de CPU; prefira multiprocessamento, extensões nativas ou linguagens compiladas como [[go|Go]] e [[rust|Rust]].
- Mobile nativo de primeira classe: builds oficiais para Android e iOS existem, mas o ecossistema roda atrás de [[kotlin|Kotlin]] e [[swift|Swift]].
- Binário único e startup instantânea: empacotamento e latência de inicialização pesam; CLIs e funções frias rendem melhor em [[go|Go]].
## 🧰 Toolchain embutida
O que o interpretador oficial (CPython) dá sem instalar nada:
- **Ambientes e pacotes:** venv para ambientes virtuais e pip para instalar de PyPI.
- **Testes:** unittest (framework xUnit da biblioteca padrão) e doctest.
- **Debug e perfil:** pdb, timeit e profile.
- **Biblioteca padrão ampla:** sqlite3, json, argparse, logging, http.server e asyncio.
- **Build free-threaded experimental** para experimentar paralelismo real de threads.
- Fora do embutido: lint e formatação ficam com [[ruff|ruff]] no kit.
## 🔁 Ciclo no kit
- **Testes:** [[pytest|pytest]] em [[frameworks_testes|Frameworks de testes]].
- **Build, lint e formatação:** [[ruff|ruff]] em [[build_lint_formatacao|Build, lint e formatação]].
- **ORM e acesso a dados:** [[sqlalchemy|SQLAlchemy]] em [[orm_acesso_dados|ORM e acesso a dados]].
- **Frameworks de backend:** [[django|Django]] e [[fastapi|FastAPI]] em [[frameworks_backend|Frameworks de backend]].
- **Cliente HTTP:** [[httpx|HTTPX]] em [[clientes_http_api|Clientes HTTP e API]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, android, ios, cli (builds para Android e iOS listadas no menu de downloads oficial em 2026-11-27; ecossistema mobile ainda discreto)
- **Linguagens:** python
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- GIL na build padrão limita paralelismo real de CPU entre threads; a build free-threaded experimental remove o GIL com custo de compatibilidade
- runtime interpretado: em cenários CPU-bound o custo de computação por requisição tende a superar o de linguagens compiladas
- distribuição de aplicações como binário standalone continua sendo atrito (ambientes, dependências e empacotamento)
## 🆚 Alternativas
- [[javascript|JavaScript]] - ubiquidade de navegador e fullstack JS
- [[java|Java]] - ecossistema corporativo e concorrência madura
- [[go|Go]] - simplicidade compilada e paralelismo de CPU
- [[rust|Rust]] - desempenho máximo e segurança de memória
- [[typescript|TypeScript]] - tipagem estática sobre a ubiquidade do JS
## 💰 Custo e Contratação
- Gratuito; CPython sob a PSF License Version 2 (SPDX: PSF-2.0; sem nota atômica de licença no kit)
- **Fonte:** https://www.python.org/ e https://docs.python.org/3/license.html (lidas em 2026-11-27)
## 🔗 Relacionamentos
- **Empresa:** [[python_software_foundation|Python Software Foundation]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Ciclo no kit:** [[pytest|pytest]], [[ruff|ruff]], [[sqlalchemy|SQLAlchemy]], [[django|Django]], [[fastapi|FastAPI]], [[httpx|HTTPX]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
