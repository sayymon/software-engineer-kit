---
id: laya_router
tipo: ferramenta
nome: Laya Router
tipos:
  - BIBLIOTECA
  - FRAMEWORK
empresa: "[[laya_comunidade|Laya (comunidade)]]"
aliases:
  - laya
  - pip laya
categorias:
  - "[[modelo_decisao|Modelo de decisão]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
  - "[[human_in_the_loop_funcionalidade|Human in the loop]]"
  - "[[execucao_local|Execução local]]"
casosDeUso:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
modelos:
  - "[[laya|Laya]]"
modeloContratacao:
  - open-source
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - self-hosted
linguagens:
  - python
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - Apache 2.0, sem custo de licença
  - contexto de 512 a 1.024 tokens
  - só texto
  - qualidade baixa em tarefas de agente
dataVerificacao: 2026-11-21
fontePreco: https://laya-ai.com/
precoMedio: 0
tags:
  - ferramenta
  - ia
  - classificacao
---
# Laya Router
## 📋 Informações Básicas
- **Tipos:** Biblioteca open source para rodar o modelo Laya localmente
- **Empresa/Fabricante:** [[laya_comunidade|Laya (comunidade)]]
- **Website:** https://laya-ai.com
- **Categorias:** Modelo de decisão, Inferência local
- **Modelo de contratação:** open source (Apache 2.0)
- **Preço (USD):** US$ 0 (custo só de infraestrutura)
- **Data de verificação:** 2026-11-21
- **Fonte do preço:** https://laya-ai.com/
## 📝 Descrição
Pacote Python (`pip install laya`) com um Router que escolhe o checkpoint do [[laya|Laya]] conforme idioma e tipo de saída. Há portes para Node.js e TypeScript via ONNX Runtime, Rust e Windows (DirectML), e um plugin para Claude Code.
## 🎯 Para Que Serve
Decisões tipadas sem enviar dados para fora e sem custo por chamada.
### Casos de Uso
1. Triagem de tickets por departamento e urgência
2. Guardrails e gates de segurança simples
3. Classificação de intenção multilíngue
## ⏰ Quando Utilizar
- Privacidade total dos dados
- Volume alto com orçamento zero
- Testar o padrão no seu notebook
### Quando NÃO utilizar
- Agentes que escolhem ferramentas: [[cloudflare_workers_ai|Cloudflare Workers AI]] com Clef-flash ou [[jev_api|Jev API]]
- Textos longos ou multimodais
## 🧩 Categorias e Funcionalidades
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[execucao_local|Execução local]]
- **Casos de uso mapeados:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[inferencia_privada_local|Inferência privada local]], [[analise_de_sentimento|Análise de sentimento]]
- **Modelos:** [[laya|Laya]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** python, javascript, linux, macos, windows, self-hosted
- **Integra com:** ONNX Runtime, Claude Code (plugin da comunidade)
- **Requisitos:** Python 3; CPU basta, GPU acelera
## 🔒 Restrições e Especificações
- **Limites:** 512 a 1.024 tokens de contexto
- **Residência de dados / privacidade:** total, roda na sua máquina
- **Offline:** sim
- **Outras:** projeto de comunidade com evolução rápida; confira a API no repositório
## 🆚 Alternativas
- [[cloudflare_workers_ai|Cloudflare Workers AI]] - Clef com pesos abertos e qualidade maior
- [[ollama|Ollama]] - LLMs locais com saída estruturada
### Vantagens sobre alternativas
- Custo zero por chamada
- Dados não saem do ambiente
- Leve e rápido em CPU
### Desvantagens
- Qualidade muito abaixo dos concorrentes em benchmarks de agente
- Contexto curto
## 💰 Custo e Contratação
### Planos (USD)
- **Open source:** US$ 0, Apache 2.0
- **Fonte:** https://laya-ai.com/ (verificado em 2026-11-21)
## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[laya_comunidade|Laya (comunidade)]]
- **Alternativas:** [[cloudflare_workers_ai|Cloudflare Workers AI]], [[ollama|Ollama]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
