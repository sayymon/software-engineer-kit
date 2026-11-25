# Rascunho do post sobre o guia

## Contexto

As Fases 6.1 a 6.3 da spec (verificador de termos e exportador da versão pública) foram aposentadas porque o kit já é público e valida termos no CI (check `terms` com `config/public-terms.txt`). Sobram as tarefas 6.4 a 6.6: o rascunho do post com a opinião do autor, o trade-off explícito e uma pergunta ao leitor.

## Escopo

1. Escolher um conjunto pequeno de itens do guia aprovados para divulgação (por exemplo, uma demanda e duas técnicas), usando as páginas públicas do kit como referência.
2. O autor escreve, com a própria voz, a opinião, o trade-off e a pergunta ao leitor. O agente só organiza notas em rascunho.
3. Gerar as imagens (diagrama da demanda) a partir do site publicado ou dos diagramas Mermaid do kit.
4. Registrar o texto final em um lugar escolhido pelo autor (post externo ou arquivo em `docs/`).

## Critérios de aceite

- O rascunho tem os três elementos: opinião própria, trade-off explícito e uma pergunta ao leitor (linha terminada em `?`).
- O texto passa por `npm run validate` (check `terms`) sem ocorrências, sem travessões e sem termos internos.
- O autor aprovou o texto e a escolha dos itens.
- Nenhum código novo de exportação é necessário: o kit já publica o conteúdo, então este item é de conteúdo, não de ferramenta.

## Origem

Spec do guia, `.kiro/specs/guia-decisao-engenharia/tasks.md`, tarefas 6.4 a 6.6, requisitos 11.6, 11.7, 11.9 e 12.7. As tarefas 6.1 a 6.3 estão aposentadas no ADR [0001](../adr/0001-yaml-como-fonte-unica.md).
