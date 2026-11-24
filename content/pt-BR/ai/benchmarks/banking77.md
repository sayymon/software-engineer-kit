---
id: banking77
tipo: benchmark
nome: BANKING77
aliases:
  - BANKING77 intent
descricao: Conjunto de 77 intenções de atendimento bancário para classificação de texto.
area: decisao
avalia: Detecção de intenção em mensagens de clientes de banco, com 77 classes de granularidade fina.
metodo: Cada mensagem recebe uma das 77 intenções. O modelo de decisão escolhe a classe sem retreino, e o resultado é comparado ao rótulo.
metrica: Macro-F1 (%).
escala: 0 a 100; maior é melhor.
limitacoes: Domínio único (bancário) e em inglês. Intenções parecidas confundem até anotadores humanos.
saturacao: media
contaminacao: Conjunto público desde 2020 (artigo de Casanueva et al.). Vazamento não verificado.
mantenedor: PolyAI (Casanueva et al.)
urlOficial: https://arxiv.org/abs/2003.04807
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
casosDeUsoRelacionados:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[analise_de_sentimento|Análise de sentimento]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelosAvaliados:
  - "[[clef|Clef]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[jev|Jev]]"
  - "[[laya|Laya]]"
resultados:
  - modelo: "[[clef|Clef]]"
    valor: 94.2
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef_flash|Clef-flash]]"
    valor: 90.93
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 79.74
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[laya|Laya]]"
    valor: 14.29
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
tags:
  - benchmark
  - ia
---
# BANKING77
## 📝 Descrição
Conjunto de 77 intenções de atendimento bancário para classificação de texto. Mantido por PolyAI (Casanueva et al.). Página oficial: https://arxiv.org/abs/2003.04807
## 🎯 O que avalia
Detecção de intenção em mensagens de clientes de banco, com 77 classes de granularidade fina.
## ⚙ Como funciona (método e métrica)
- **Método:** Cada mensagem recebe uma das 77 intenções. O modelo de decisão escolhe a classe sem retreino, e o resultado é comparado ao rótulo.
- **Métrica:** Macro-F1 (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Domínio único (bancário) e em inglês. Intenções parecidas confundem até anotadores humanos.
## 🌡 Saturação e contaminação
- **Saturação:** media. Clef marca 94,20 e Jev 79,74 na tabela da Cloudflare.
- **Contaminação:** Conjunto público desde 2020 (artigo de Casanueva et al.). Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Ainda há margem entre os modelos, então a pontuação ajuda a ordenar candidatos. Confirme com uma amostra do seu caso de uso. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]]
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[analise_de_sentimento|Análise de sentimento]], [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]
- **Modelos avaliados:** [[clef|Clef]], [[clef_flash|Clef-flash]], [[jev|Jev]], [[laya|Laya]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
