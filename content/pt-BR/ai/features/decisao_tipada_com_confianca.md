---
id: decisao_tipada_com_confianca
tipo: funcionalidade
nome: Decisão tipada com confiança
aliases:
  - decisao-tipada
  - classificação calibrada
descricao: Responder perguntas fechadas (escolha, nota, verdadeiro ou falso) com probabilidade e confiança calibradas, prontas para o código ramificar.
tags:
  - funcionalidade
  - ia
---
# Decisão tipada com confiança
## 📝 Descrição
Responder perguntas fechadas (escolha entre opções, nota numa rubrica, probabilidade de uma afirmação ser verdadeira) com probabilidade e confiança calibradas, prontas para o código ramificar. Diferente da [[saida_estruturada|Saída estruturada]] de um LLM, aqui não há texto gerado e depois validado: o tipo da resposta é garantido pelo modelo.
## 🧰 Como aparece nas ferramentas
- Primitivas Choice, Score, Noul e Box do [[jev|Jev]] ([[jev_api|Jev API]])
- Limiares de confiança definidos no código: agir sozinho acima do limiar, pedir revisão humana abaixo
## 🔗 Relacionamentos
- **Relacionada:** [[saida_estruturada|Saída estruturada]], [[human_in_the_loop_funcionalidade|Human in the loop]]
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
