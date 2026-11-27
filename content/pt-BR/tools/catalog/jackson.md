---
id: jackson
tipo: ferramenta
nome: Jackson
tipos:
  - BIBLIOTECA
empresa: "[[fasterxml_empresa|FasterXML (empresa)]]"
aliases:
  - Jackson
categorias:
  - "[[validacao_schemas|Validação e schemas]]"
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
  - java
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - desserialização polimórfica (default typing) permite instanciar classes arbitrárias do classpath, vetor de ataque de gadgets; restringir com whitelist de subtipos (validador de tipos polimórficos) e manter o databind atualizado
dataVerificacao: 2026-11-26
fontePreco: https://github.com/FasterXML/jackson
precoMedio: 0
licenca:
  - Apache-2.0
tags:
  - ferramenta
  - validacao-schemas
---
# Jackson
## 📋 Informações Básicas
- **Tipos:** BIBLIOTECA
- **Empresa/Fabricante:** [[fasterxml_empresa|FasterXML (empresa)]]
- **Website:** https://github.com/FasterXML/jackson
- **Categorias:** [[validacao_schemas|Validação e schemas]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-26)
- **Data de verificação:** 2026-11-26
- **Fonte do preço:** https://github.com/FasterXML/jackson
## 📝 Descrição
Databind JSON onipresente na JVM: streaming, data binding de POJOs e módulos para XML, YAML, CSV, CBOR e outros formatos.
## ⏰ Quando Utilizar
- Opção da faixa melhor custo-benefício em [[validacao_schemas|Validação e schemas]].
- Escolha para o melhor equilíbrio entre custo, capacidade e esforço de adoção.
- Databind JSON onipresente na JVM: o repositório oficial o apresenta como "the Java JSON library", com streaming, data binding de POJOs e módulos para XML, YAML, CSV, CBOR e outros formatos.
- Presença nas stacks JVM: [[spring_boot|Spring Boot]] usa Jackson 3 como biblioteca de JSON preferida e padrão, o que reduz fricção de adoção em projetos Java.
- Enquadramento defensivo: a desserialização polimórfica (default typing) é vetor clássico de ataques de gadgets — entrada não confiável pode instanciar classes arbitrárias do classpath. Mitigue com whitelist de subtipos (validador de tipos polimórficos) e mantendo o databind atualizado.
### Quando NÃO utilizar
- Quando o orçamento precisa ser zero ou o requisito é o máximo de recursos corporativos.
- Quando a entrada é não confiável e a desserialização polimórfica não puder ser restrita por whitelist de subtipos.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** java
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- Desserialização polimórfica (default typing) permite instanciar classes arbitrárias do classpath, vetor de ataque de gadgets; restringir com whitelist de subtipos (validador de tipos polimórficos) e manter o databind atualizado.
## 🆚 Alternativas
- [[zod|zod]]
- [[pydantic|pydantic]]
- [[typebox|TypeBox]]
- Gson
- Moshi
- Jakarta JSON Binding (JSON-B)
- Jackson jr
## 💰 Custo e Contratação
- Gratuito, licença Apache-2.0 (arquivo de licença do repositório lido em 2026-11-26)
- **Fonte:** https://github.com/FasterXML/jackson
## 🔗 Relacionamentos
- **Empresa:** [[fasterxml_empresa|FasterXML (empresa)]]
- **Categorias:** [[validacao_schemas|Validação e schemas]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
