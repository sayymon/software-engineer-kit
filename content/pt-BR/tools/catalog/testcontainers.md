---
id: testcontainers
tipo: ferramenta
nome: Testcontainers
tipos:
  - BIBLIOTECA
empresa: "[[atomicjar|AtomicJar]]"
aliases:
  - Testcontainers
categorias:
  - "[[testes_qa|Testes e QA]]"
funcionalidades: []
casosDeUso:
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
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
  - java
  - python
  - go
  - csharp
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - "exige um runtime de containers (ex.: Docker) em execução na máquina que roda os testes"
dataVerificacao: 2026-11-27
fontePreco: https://github.com/testcontainers/testcontainers-java
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - testes-qa
---
# Testcontainers
## 📋 Informações Básicas
- **Tipos:** BIBLIOTECA
- **Empresa/Fabricante:** [[atomicjar|AtomicJar]]
- **Website:** https://testcontainers.com
- **Categorias:** [[testes_qa|Testes e QA]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://github.com/testcontainers/testcontainers-java
## 📝 Descrição
Biblioteca de testes de integração que sobe bancos, filas e outros serviços reais em containers descartáveis, gerenciados pela própria biblioteca durante o teste. Essencial em [[testes_qa|Testes e QA]].
## ⏰ Quando Utilizar
- Testes de integração contra o serviço real (banco, fila, cache) em vez de mocks que imitam o comportamento.
- Ambientes de teste reproduzíveis por teste, sem estado compartilhado entre execuções.
### Quando NÃO utilizar
- Sem runtime de containers disponível na máquina de desenvolvimento ou no CI que executa os testes.
- Quando mocks e stubs do framework de teste já dão a confiança necessária.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** java, python, go, csharp, javascript
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- exige um runtime de containers (ex.: Docker) em execução na máquina que roda os testes
## 🆚 Alternativas
- Docker Compose manual para dependências de teste
- Bancos embutidos em processo (H2, SQLite)
- Mocks e stubs do framework de teste
## 💰 Custo e Contratação
- Gratuito, licença MIT (arquivo de licença do repositório lido em 2026-11-27)
- **Fonte:** https://github.com/testcontainers/testcontainers-java
## 🔗 Relacionamentos
- **Empresa:** [[atomicjar|AtomicJar]]
- **Categorias:** [[testes_qa|Testes e QA]]
- **Casos de uso:** [[testes_de_software_e_qa|Testes de software e QA]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
