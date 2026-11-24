---
id: clinc150
tipo: benchmark
nome: CLINC150
aliases:
  - CLINC150+OOS
descricao: Conjunto de 150 intenções em 10 domínios, com exemplos fora de escopo (OOS).
area: decisao
avalia: Classificação de intenção multi-domínio e capacidade de reconhecer pedidos fora do escopo.
metodo: O modelo escolhe uma das 150 intenções ou marca fora de escopo. A comparação usa o rótulo anotado.
metrica: Macro-F1 (%).
escala: 0 a 100; maior é melhor.
limitacoes: Frases curtas e sintéticas, em inglês. A variante com OOS pune modelos que forçam uma classe.
saturacao: alta
contaminacao: Conjunto público desde 2019 (Larson et al.). Vazamento não verificado.
mantenedor: Larson et al. (Universidade de Michigan)
urlOficial: https://arxiv.org/abs/1909.02027
dataVerificacao: 2026-11-22
funcionalidadesMedidas:
  - "[[decisao_tipada_com_confianca|Decisão tipada com confiança]]"
  - "[[saida_estruturada|Saída estruturada]]"
casosDeUsoRelacionados:
  - "[[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
  - "[[automacao_de_processos|Automação de processos]]"
modelosAvaliados:
  - "[[clef|Clef]]"
  - "[[jev|Jev]]"
  - "[[clef_flash|Clef-flash]]"
  - "[[laya|Laya]]"
resultados:
  - modelo: "[[clef|Clef]]"
    valor: 97.43
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[jev|Jev]]"
    valor: 89.27
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[clef_flash|Clef-flash]]"
    valor: 66.77
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
  - modelo: "[[laya|Laya]]"
    valor: 3.19
    unidade: "% (macro-F1)"
    origem: autodeclarado-fornecedor
    fonte: https://blog.cloudflare.com/clef-decision-models/
    data: 2026-11-22
    nota: Número da tabela da Cloudflare, que também mediu o modelo concorrente; autodeclarado.
tags:
  - benchmark
  - ia
---
# CLINC150
## 📝 Descrição
Conjunto de 150 intenções em 10 domínios, com exemplos fora de escopo (OOS). Mantido por Larson et al. (Universidade de Michigan). Página oficial: https://arxiv.org/abs/1909.02027
## 🎯 O que avalia
Classificação de intenção multi-domínio e capacidade de reconhecer pedidos fora do escopo.
## ⚙ Como funciona (método e métrica)
- **Método:** O modelo escolhe uma das 150 intenções ou marca fora de escopo. A comparação usa o rótulo anotado.
- **Métrica:** Macro-F1 (%).
- **Escala:** 0 a 100; maior é melhor.
## ⚠ Limitações
Frases curtas e sintéticas, em inglês. A variante com OOS pune modelos que forçam uma classe.
## 🌡 Saturação e contaminação
- **Saturação:** alta. Clef marca 97,43 na tabela da Cloudflare.
- **Contaminação:** Conjunto público desde 2019 (Larson et al.). Vazamento não verificado.
## 📊 Resultados
Cada linha vem do campo `resultados` (consulta em 2026-11-22: 4 pontuações lidas, 0 `não verificado`). Origem `autodeclarado-fornecedor` indica número publicado pelo próprio fornecedor ou por quem mede um concorrente. Valores `não verificado` registram consulta sem pontuação oficial legível.

## 🧭 Como usar na escolha de modelo
Os melhores modelos ficam perto do teto, então use o benchmark para descartar modelos fracos e confirme a escolha final em testes com os seus dados. Combine com os benchmarks da mesma área (decisao) e com uma avaliação própria, porque cada fornecedor escolhe quais testes publicar.
## 🔗 Relacionamentos
- **Funcionalidades medidas:** [[decisao_tipada_com_confianca|Decisão tipada com confiança]], [[saida_estruturada|Saída estruturada]]
- **Casos de uso:** [[classificacao_e_extracao_em_alto_volume|Classificação e extração em alto volume]], [[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]], [[automacao_de_processos|Automação de processos]]
- **Modelos avaliados:** [[clef|Clef]], [[jev|Jev]], [[clef_flash|Clef-flash]], [[laya|Laya]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
