---
id: stable_diffusion
tipo: ferramenta
nome: Stable Diffusion
tipos:
  - SOFTWARE
  - BIBLIOTECA
empresa: "[[stability_ai|Stability AI]]"
aliases:
  - Stable Diffusion
  - SDXL
  - SD
categorias:
  - "[[geracao_imagem|Ferramentas de geração de imagem]]"
funcionalidades:
  - "[[geracao_de_imagem|Geração de imagem]]"
casosDeUso:
  - "[[criacao_de_imagens|Criação de imagens]]"
  - "[[geracao_de_conteudo|Geração de conteúdo]]"
  - "[[ilustracao_e_arte_conceitual|Ilustração e arte conceitual]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - api-pay-per-token
  - enterprise
precoUSD: 0
plataformas:
  - windows
  - macos
  - linux
  - api
  - self-hosted
  - cloud
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
  - pesos abertos, uso comercial livre sob a Community License para receita anual abaixo de $1M
  - acima de $1M exige licenca enterprise
  - rodar local exige GPU
  - API cobra por credito (1 credito = $0.01)
  - responsabilidade sobre o conteudo gerado regida pelo ToS
dataVerificacao: 2026-11-20
fontePreco: https://stability.ai/license
precoMedio: 0
tags:
  - ferramenta
  - ia
  - geracao-imagem
  - stable-diffusion
  - open-source
---
# Stable Diffusion

## 📋 Informações Básicas
- **Tipos:** Modelo de geração de imagem com pesos abertos
- **Empresa/Fabricante:** [[stability_ai|Stability AI]]
- **Website:** https://stability.ai
- **Categorias:** Geração de imagem
- **Modelo de contratação:** open-source (pesos abertos), free local, API paga por crédito, licença enterprise
- **Preço (USD):** Pesos gratuitos; API por crédito (1 crédito = $0.01); Stable Image Core cerca de $0.03/imagem, Ultra cerca de $0.08/imagem
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://stability.ai/license e https://platform.stability.ai/pricing

## 📝 Descrição
Família de modelos de geração de imagem com pesos abertos. Os pesos podem ser baixados e executados localmente ou acessados pela API da Stability AI. Interfaces populares da comunidade (AUTOMATIC1111, ComfyUI) facilitam o uso local, com controle fino via LoRAs, ControlNet e fine-tuning.

## 🎯 Para Que Serve
Gerar imagens a partir de texto com total controle do pipeline, rodando local ou via API, com liberdade para customizar e fazer fine-tuning.

### Casos de Uso
1. Geração de imagem local e privada
2. Pipelines customizados com ControlNet e LoRAs
3. Fine-tuning para estilos ou marcas específicas
4. Integração da geração de imagem em produtos próprios

## ⏰ Quando Utilizar
- Quando quer rodar geração de imagem local e offline
- Quando precisa de controle fino do pipeline (ControlNet, LoRA, inpainting)
- Quando quer uso comercial sem custo de assinatura (abaixo de $1M de receita)
- Quando quer fine-tuning próprio

### Quando NÃO utilizar
- Quando não tem GPU e não quer pagar API
- Quando quer a melhor estética sem montar pipeline: avalie [[midjourney|Midjourney]]
- Quando a empresa tem receita acima de $1M e não quer licença enterprise
- Quando precisa de resultado rápido sem curva técnica

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[geracao_imagem|Ferramentas de geração de imagem]]
- **Funcionalidades:** [[geracao_de_imagem|Geração de imagem]]
- **Casos de uso mapeados:** [[criacao_de_imagens|Criação de imagens]], [[geracao_de_conteudo|Geração de conteúdo]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** windows, macos, linux, python, api, self-hosted, cloud
- **Integra com:** [[hugging_face|Hugging Face]] (pesos e difusores), interfaces da comunidade (AUTOMATIC1111, ComfyUI)
- **Requisitos:** GPU com VRAM adequada para rodar local; ou chave de API da Stability AI

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limites práticos de VRAM local ou de créditos na API.
- **Residência de dados / privacidade:** total quando roda local; na nuvem depende do provider.
- **Offline:** sim (execução local).
- **ToS / licença:** Stability AI Community License, uso comercial livre para receita anual abaixo de $1M; acima disso, licença enterprise.
- **Outras restrições:** responsabilidade sobre o conteúdo gerado regida pelo ToS.

## 🔧 Como Utilizar

### Uso Básico (Python, difusores)
```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16)
pipe = pipe.to("cuda")
image = pipe("uma cidade futurista ao entardecer").images[0]
image.save("saida.png")
```

## 🆚 Alternativas
- [[midjourney|Midjourney]] - melhor estética pronta, sem rodar local
- [[runway|Runway]] - foco em vídeo, também gera imagem
- [[gemini|Gemini]] e [[chatgpt|ChatGPT]] - geração de imagem integrada ao chat

### Vantagens sobre alternativas
- Pesos abertos: roda local e offline
- Uso comercial livre abaixo de $1M de receita
- Controle fino e fine-tuning próprios
- Grande ecossistema de ferramentas da comunidade

### Desvantagens
- Exige GPU e curva técnica para rodar bem
- Estética padrão abaixo de [[midjourney|Midjourney]] sem ajustes
- Qualidade depende de modelo, prompt e configuração

## 💰 Custo e Contratação

### Planos (USD)
- **Pesos abertos:** gratuitos para baixar e rodar local
- **Community License:** uso comercial livre para receita anual abaixo de $1M
- **Enterprise License:** acima de $1M de receita, sob consulta
- **API (pay-per-use):** por crédito (1 crédito = $0.01); Core cerca de $0.03/imagem, Ultra cerca de $0.08/imagem
- **Fonte:** https://stability.ai/license e https://platform.stability.ai/pricing (verificado em 2026-11-20)

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Empresa:** [[stability_ai|Stability AI]]
- **Usado em:** Geração local, pipelines customizados, fine-tuning
- **Alternativas:** [[midjourney|Midjourney]], [[runway|Runway]], [[gemini|Gemini]], [[chatgpt|ChatGPT]]
- **Integra com:** [[hugging_face|Hugging Face]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
