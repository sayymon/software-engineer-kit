---
inclusion: always
---

# Visão de produto: software-engineer-kit

## Missão

Ser o guia de trabalho de quem constrói software na era da IA. O kit ajuda a decidir, executar, descobrir e aprender: de ferramentas a fundamentos, de stacks a skills, do fluxo de uma demanda até a certificação que comprova uma competência.

O kit é mais que um catálogo. Cada página responde a uma pergunta prática ("o que uso para isto?", "como faço isto?", "por que este caminho?") e leva ao próximo conceito relacionado.

## Para quem

Persona e papel são conceitos diferentes. A persona é quem usa o kit. O papel (PM, QA, tech lead e os demais, definidos em `content/guide/comum.yaml`) é a função exercida em uma demanda, e a mesma pessoa exerce vários. O problema, o objetivo e as métricas estão em `docs/prd.md`.

1. **Primeiro usuário: o mantenedor.** O kit é o guia que ele consulta para trabalhar e continuar relevante como engenheiro de software e de IA. Toda decisão de produto passa primeiro por esta pergunta: isso torna o kit mais útil no trabalho real do mantenedor?
2. **Engenheiros de software e de IA** em qualquer nível (persona primária), que querem uma referência aberta, comparável e atualizada. Como personas secundárias entram QA, PM, gerentes de engenharia e tech leads.
3. **Contribuidores**, que ampliam o conteúdo e as traduções por Pull Request.

## O que o kit cobre

- **Fluxos de demanda:** feature, bug, incidente, spike, segurança e as demais. Cada uma tem raias, tarefas, subtarefas, gateways, papéis (RACI), ritos e perguntas-chave.
- **Catálogo único:** ferramentas, modelos de IA, técnicas, padrões, estruturas de dados, algoritmos, licenças, stacks, artefatos e categorias, com filtros por tipo, categoria, linguagem, caso de uso e empresa.
- **Guias práticos:** "como fazer", sugeridos dentro das tarefas e subtarefas dos fluxos.
- **Jornadas e competências:** trilhas de aprendizado com as certificações que as comprovam.
- **Decisão:** construir, comprar ou assinar, com o orçamento como portão e uma justificativa auditável.

## Princípios de experiência

1. **Tudo é navegável nos dois sentidos.** Toda menção a um conceito é um link, e a página do conceito mostra de onde ele é citado.
2. **Um conceito, uma nota, um tipo.** Técnicas, ritos, tarefas e categorias existem uma única vez. Fluxos, stacks e guias apontam para a nota e nunca copiam o conteúdo dela.
3. **Decidir antes de catalogar.** A entrada principal é o fluxo de demanda. O catálogo apoia a decisão.
4. **Imersivo sem perder o caminho de trabalho.** O grafo 3D e os diagramas interativos são a porta de descoberta. As páginas de leitura são o caminho para trabalhar. A pessoa alterna entre os dois sem se perder.
5. **Diagramas são interativos.** Nós clicáveis, modal com o playbook, navegação entre raias e o caminho de volta.
6. **Dados com fonte e data.** Preço, benchmark e versão trazem a fonte oficial e a data de verificação. O que não foi confirmado aparece como "não verificado".
7. **Agnóstico onde envelhece, concreto onde ajuda.** Os passos e as checklists são agnósticos. Os comandos concretos ficam em blocos "Como fazer hoje", com versão e data.
8. **Bilíngue e aberto.** O conteúdo nasce em pt-BR e ganha tradução em inglês. Todo o conteúdo funciona offline e sem conta.

## Critérios de sucesso

Primário, que é o que decide prioridades:

- **Utilidade para o mantenedor.** Ele consulta o kit antes de decisões de engenharia e de escolha de ferramenta. Toda vez que o kit não responder a uma pergunta real, a lacuna vira uma issue com o rótulo `lacuna`. A tendência esperada é ter cada vez menos lacunas novas por mês.

Secundários, que mostram alcance:

- Estrelas no GitHub, visitas ao site e forks do repositório.
- Cobertura do catálogo: ferramentas, conceitos e técnicas registrados.
- Qualidade do kit aplicado em projetos emulados (pós-entrega, junto com o agente).
- Posts no LinkedIn e os comentários e reações a eles.
- Contribuições externas: PRs com merge, issues e traduções.

## Fora do escopo por enquanto

- Contas de usuário, progresso salvo e backend. O site é estático até uma necessidade concreta justificar um backend.
- Um agente que executa o guia e emula projetos, features e bugs para medir a qualidade do kit (gera artefatos e aponta lacunas). É uma entrega posterior planejada. O conteúdo deve ser estruturado para que agentes possam consumi-lo, mas o agente não faz parte das entregas atuais.

## Como o trabalho é organizado

- **Visão de produto:** este arquivo. Ele muda raramente e vale para todo o trabalho.
- **Spec por entrega:** `.kiro/specs/<nome>/` com `requirements.md`, `design.md` e `tasks.md`, revisados nessa ordem pelo mantenedor antes de qualquer código.
- **Teste de escopo:** um requisito pertence a uma spec quando a entrega daquela spec não estaria pronta sem ele.
- **Decisões de arquitetura:** ADRs em `docs/adr/`. A arquitetura é descrita com diagramas C4 em `docs/architecture.md`.
