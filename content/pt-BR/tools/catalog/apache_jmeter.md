---
id: apache_jmeter
tipo: ferramenta
nome: Apache JMeter
tipos:
  - SOFTWARE
empresa: "[[apache_software_foundation|Apache Software Foundation]]"
aliases:
  - Apache JMeter
  - JMeter
categorias:
  - "[[testes_carga_desempenho|Testes de carga e desempenho]]"
funcionalidades: []
casosDeUso:
  - "[[testes_de_software_e_qa|Testes de software e QA]]"
  - "[[pipelines_de_ci_e_cd|Pipelines de CI e CD]]"
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
  - desktop
linguagens:
  - java
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - desenvolvimento-software
restricoes:
  - interface gráfica pesada; para grandes cargas use o modo CLI e geradores distribuídos
  - scripts em XML (.jmx) são difíceis de revisar em pull requests
dataVerificacao: 2026-11-23
fontePreco: https://github.com/apache/jmeter
precoMedio: 0
tags:
  - ferramenta
  - testes-carga
---
# Apache JMeter
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[apache_software_foundation|Apache Software Foundation]]
- **Website:** https://jmeter.apache.org/
- **Categorias:** [[testes_carga_desempenho|Testes de carga e desempenho]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Data de verificação:** 2026-11-23
- **Fonte do preço:** https://github.com/apache/jmeter
## 📝 Descrição
Ferramenta Java de teste de carga e desempenho para HTTP, bancos de dados, filas e outros protocolos, com interface gráfica para montar planos e modo CLI para CI.
## ⏰ Quando Utilizar
- Testes de carga com muitos protocolos além de HTTP.
- Equipes que já têm planos .jmx e plugins do ecossistema JMeter.
### Quando NÃO utilizar
- Quando cenários como código e revisão em pull request importam: [[gatling|Gatling]] ou Grafana k6 se encaixam melhor.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli, desktop
- **Linguagens:** java
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** desenvolvimento-software
## 🔒 Restrições e Especificações
- interface gráfica pesada; para grandes cargas use o modo CLI e geradores distribuídos
- scripts em XML (.jmx) são difíceis de revisar em pull requests
## 🆚 Alternativas
- [[gatling|Gatling]]
- Grafana k6
- Locust
- Artillery
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Fonte:** https://github.com/apache/jmeter
## 📚 Documentação
- https://jmeter.apache.org/usermanual/
## 🔗 Relacionamentos
- **Empresa:** [[apache_software_foundation|Apache Software Foundation]]
- **Categorias:** [[testes_carga_desempenho|Testes de carga e desempenho]]
- **Casos de uso:** [[testes_de_software_e_qa|Testes de software e QA]], [[pipelines_de_ci_e_cd|Pipelines de CI e CD]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
