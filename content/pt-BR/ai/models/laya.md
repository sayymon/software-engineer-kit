---
id: laya
tipo: modelo
nome: Laya
aliases:
  - laya-multilingual
  - laya-typed-decisions
familia: Laya
empresa: "[[laya_comunidade|Laya (comunidade)]]"
lancamento: 2026-09
status: ativo
idModeloApi: laya
contextoTokens: 1024
saidaMaxTokens: não verificado
modalidadesEntrada:
  - texto
modalidadesSaida:
  - decisão tipada
precoEntradaUSD: 0
precoSaidaUSD: 0
precoCacheUSD: 0
licenca: Apache-2.0
disponibilidade:
  - pesos-abertos
ferramentas:
  - "[[laya_router|Laya Router]]"
  - "[[hugging_face|Hugging Face]]"
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
benchmarks:
  - "[[when2call|When2Call]]"
  - "[[bfcl|BFCL]]"
  - "[[banking77|BANKING77]]"
  - "[[clinc150|CLINC150]]"
  - "[[api_bank|API-Bank]]"
dataVerificacao: 2026-11-21
fontePreco: https://laya-ai.com/
tags:
  - modelo
  - ia
  - classificacao
---
# Laya
## 📋 Informações Básicas
- **Família:** Laya
- **Empresa:** [[laya_comunidade|Laya (comunidade)]]
- **Lançamento:** setembro de 2026
- **Status:** ativo
- **ID na API:** laya
- **Disponibilidade:** pesos-abertos
## 📝 Descrição
Modelo de decisão open source e self-hosted, compatível com o formato do Jev (choice, score, noul). É um encoder pequeno (ModernBERT-large de 421M ou mmBERT-base de 322M parâmetros) que responde numa passada em milissegundos, em mais de 100 idiomas na versão multilíngue. Tem portes para Node.js (ONNX Runtime), Rust e Windows (DirectML), e plugin para Claude Code.
## ⚙ Especificações
- **Janela de contexto:** 512 tokens (laya) e 1.024 tokens (laya-multilingual, laya-typed-decisions)
- **Saída máxima:** não se aplica (a saída é a decisão tipada)
- **Modalidades de entrada:** texto
- **Modalidades de saída:** decisão tipada (escolha, nota, probabilidade)
- **Licença:** Apache-2.0
## 💰 Preço (USD por 1M tokens)
- **Entrada:** US$ 0
- **Saída:** US$ 0 (sem cobrança de saída)
- **Cache:** US$ 0
- **Fonte:** https://laya-ai.com/ (verificado em 2026-11-21)
- **Observação:** sem preço de API; o custo é a infraestrutura onde você roda (CPU, GPU ou VPS).
## ⏰ Quando Utilizar
- Dados que não podem sair da sua infraestrutura
- Triagem simples de intenção ou urgência com custo zero por chamada
- Prototipar o padrão de modelo de decisão localmente antes de contratar uma API
### Quando NÃO utilizar
- Escolha de ferramentas e tarefas difíceis: no benchmark da Cloudflare marcou 38% em BFCL e 12% em When2Call, contra 95% e 81% do Jev
- Entradas longas: o contexto é de 512 a 1.024 tokens
- Imagem, áudio ou vídeo
## 🧩 Casos de uso e funcionalidades
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[inferencia_privada_local|Inferência privada local]], [[analise_de_sentimento|Análise de sentimento]]
- **Funcionalidades:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]], [[execucao_local|Execução local]]
- **Categorias:** [[modelo_decisao|Modelo de decisão]], [[inferencia_local|Inferência local]]
## 🆚 Alternativas
- [[clef_flash|Clef-flash]] - pesos abertos com qualidade muito maior, mas modelo bem maior (9B)
- [[jev|Jev]] - hospedado e mais preciso
## 🔗 Relacionamentos
- **Empresa:** [[laya_comunidade|Laya (comunidade)]]
- **Ferramentas:** [[laya_router|Laya Router]], [[hugging_face|Hugging Face]]
- **Comparação:** [[modelo_decisao|Modelo de decisão]] (tabela comparativa)
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Índice:** Modelos de IA
## 📎 Fontes
- Site e checkpoints: https://laya-ai.com/
- Benchmark comparativo: https://blog.cloudflare.com/clef-decision-models/
