# Requirements Document

## Introduction

Esta spec define o **Ecossistema 3D**: um grafo único, imersivo e navegável em 3D que representa o catálogo do kit como um ecossistema. Cada entidade é um nó e cada relação é uma aresta. O Ecossistema é um **modo de visualização do Catálogo**, ao lado da lista filtrável, e usa a Perspectiva `3d` já prevista na spec `experiencia-fluxos-catalogo` (Decisões 5 e 9, Requirement 17 e 19).

A referência de experiência é o `3d-force-graph` (https://github.com/vasturiano/3d-force-graph). A pessoa vê o ecossistema completo. Ao clicar em um nó, o nó se expande e os demais nós ligados a ele ficam em destaque, enquanto o resto recua. Uma barra lateral mostra os detalhes e a descrição do nó. O Ecossistema é a porta de descoberta do kit: a pessoa chega por ele a uma página canônica e volta dela sem se perder (princípio 4 de `product.md`).

### Dados de partida (medidos em `site/dist/pt-BR/api/graph.json`)

| Medida | Valor |
|---|---|
| Nós | 2.182 |
| Arestas (dirigidas) | 23.164 |
| Pares de nós únicos (sem direção) | 13.242 |
| Tamanho do arquivo | 1,9 MB bruto, 180 kB gzip |
| Maior grau | `hub_tools` com 944 ligações, `hub_ai_tools` com 331, `hub_patterns` com 201 |

Tipos de nó por quantidade: ferramenta 429, empresa 301, artefato 201, categoria 151, tarefa 151, caso-de-uso 130, técnica 124, variável 83, padrão 80, raia 71, decisão (gateway) 70, modelo 60, algoritmo 47, certificação 45 e os demais. Subtarefas, playbooks, perguntas, nós de início, fim e chamada **não são nós** do `graph.json`: são âncoras sem página própria.

### Decisões do dono

1. **Visão completa e expansão por clique.** O grafo mostra todos os nós permitidos pelas Camadas de granularidade. Clicar em um nó o expande e filtra os demais nós ligados a ele.
2. **Modo de visualização do Catálogo.** O Ecossistema não é uma quarta Area. O menu mantém as três áreas (Requirement 1 da spec `experiencia-fluxos-catalogo`).
3. **Granularidade por filtro de camadas.** Os níveis de baixa granularidade (gateway, início, fim, subtarefa, pergunta) não são carregados por padrão. O pedido de reduzir o volume vem do dono.
4. **Barra lateral com detalhes e descrição.** Todo nó selecionado mostra seus detalhes em uma barra lateral.
5. **Imersivo.** A experiência usa WebGL e Three.js, com navegação 3D, e continua funcionando como modo do Catálogo.

### Fora de escopo

- Identidade visual fina (paleta final, tipografia): spec de identidade visual.
- Realidade virtual e aumentada.
- Contas de usuário, progresso salvo e backend (ver `product.md`).
- Edição do conteúdo pelo grafo.
- Novos tipos de relação além das já existentes em `graph.json` (a modelagem de relações pertence ao contrato de conteúdo).

## Glossary

- **Ecossistema**: o grafo 3D único que representa o Catalogo, entregue como um modo de visualização dele.
- **Catalogo**: Area do Site que reúne as Entidades. Definida na spec `experiencia-fluxos-catalogo`.
- **Modo_de_Visualizacao**: forma de ver o Catalogo. Valores: `lista` e `ecossistema`.
- **Grafo_de_Dados**: o arquivo estático `api/graph.json` (nós e arestas das Entidades), fonte de dados do Ecossistema.
- **No_do_Grafo**: elemento do Ecossistema que representa uma Entidade.
- **Aresta**: ligação entre dois Nos_do_Grafo, com o campo `kind` do Grafo_de_Dados.
- **Vizinhanca**: o conjunto de Nos_do_Grafo ligados diretamente a um No_do_Grafo por uma Aresta, em qualquer direção.
- **Foco**: estado do Ecossistema em que um No_do_Grafo está expandido e a Vizinhanca em destaque.
- **No_Focado**: o No_do_Grafo expandido no Foco.
- **Camada_de_Granularidade**: grupo de Entidades de mesmo nível de detalhe que pode ser carregado ou omitido. Valores: `nucleo`, `fluxo` e `detalhe`.
- **Barra_Lateral**: painel lateral que mostra detalhes e descrição do No_Focado ou do No_do_Grafo sob o ponteiro.
- **Hub_de_Navegacao**: Entidade do tipo `hub` (por exemplo `hub_tools`), com grau muito alto e função apenas de índice.
- **Filtro**: critério que restringe quais Nos_do_Grafo aparecem. Filtros diferentes combinam por E, valores do mesmo Filtro por OU.
- **Faceta**: dimensão filtrável do Catalogo (tipo, categoria, linguagem, caso de uso, empresa, domínio, licença, subtipo).
- **Fragmento_de_Estado**: o hash da URL (`location.hash`) que carrega o estado da página.
- **Pagina_Canonica**: a única página de uma Entidade.
- **Renderizador_3D**: componente que desenha o Grafo_de_Dados em 3D com WebGL.
- **Alternativa_sem_WebGL**: a lista do Catalogo, que oferece o mesmo conteúdo sem WebGL ou sem JavaScript.
- **Orcamento_de_Desempenho**: limites mensuráveis de tamanho e tempo do Ecossistema (Requirement 9).
- **Teste_de_Navegador**: teste Playwright em `tests/browser/*.spec.ts` contra `site/dist` servido por HTTP local.

## Requirements

### Requirement 1: Ecossistema como modo de visualização do Catálogo

**User Story:** Como engenheiro, quero alternar entre a lista e o Ecossistema dentro do Catálogo, para que eu explore o kit pelo grafo ou pela tabela conforme a minha tarefa.

#### Acceptance Criteria

1. THE Catalogo SHALL oferecer um seletor de Modo_de_Visualizacao com os valores `lista` e `ecossistema`.
2. WHEN o usuário escolhe `ecossistema`, THE Site SHALL exibir o Ecossistema na página do Catalogo sem recarregar a página.
3. WHEN o usuário alterna o Modo_de_Visualizacao, THE Catalogo SHALL manter os Filtros ativos.
4. THE Site SHALL manter o menu principal com exatamente as três entradas de Area, sem entrada própria para o Ecossistema.
5. THE Fragmento_de_Estado SHALL carregar o Modo_de_Visualizacao, de modo que abrir a URL reabra o mesmo modo.
6. IF o navegador não executa JavaScript ou não oferece WebGL, THEN THE Catalogo SHALL exibir o modo `lista` e uma mensagem informando que o Ecossistema exige WebGL.
7. THE Pagina_Canonica de uma Entidade SHALL oferecer o link "Ver no ecossistema", que abre o Catalogo no modo `ecossistema` com a Entidade em Foco.

### Requirement 2: Visão completa do ecossistema

**User Story:** Como engenheiro, quero ver todos os nós do catálogo de uma vez, para que eu perceba a forma do ecossistema e como as áreas se conectam.

#### Acceptance Criteria

1. WHEN o Ecossistema abre, THE Renderizador_3D SHALL exibir todos os Nos_do_Grafo das Camadas_de_Granularidade ativas, ligados pelas Arestas do Grafo_de_Dados.
2. THE Renderizador_3D SHALL colorir cada No_do_Grafo pelo tipo da Entidade, usando uma paleta que distingue os tipos para pessoas com daltonismo (como a paleta Okabe-Ito do gerador Mermaid).
3. THE Renderizador_3D SHALL agrupar visualmente os Nos_do_Grafo por Area (Fluxos de demandas, Jornadas e competências, Catálogo).
4. THE Ecossistema SHALL exibir uma legenda com a cor de cada tipo e a contagem de nós visíveis.
5. WHEN o ponteiro passa sobre um No_do_Grafo, THE Ecossistema SHALL exibir o nome e o tipo da Entidade.
6. THE Ecossistema SHALL permitir girar, aproximar, afastar e deslocar a câmera com mouse, toque e teclado.
7. THE Ecossistema SHALL oferecer o botão "Recentralizar", que enquadra o grafo inteiro.
8. THE Ecossistema SHALL ocultar por padrão os Hubs_de_Navegacao, que distorcem o layout, e oferecer um Filtro para exibi-los.
9. THE Ecossistema SHALL exibir o número de nós e de Arestas visíveis.

### Requirement 3: Camadas de granularidade

**User Story:** Como engenheiro, quero carregar só o nível de detalhe de que preciso, para que o grafo continue legível e rápido.

#### Acceptance Criteria

1. THE Ecossistema SHALL classificar cada tipo de Entidade em exatamente uma Camada_de_Granularidade.
2. THE Camada_de_Granularidade `nucleo` SHALL conter os tipos de conceito e catálogo: ferramenta, categoria, modelo, empresa, caso-de-uso, funcionalidade, benchmark, técnica, padrão, algoritmo, estrutura-de-dados, licença, stack, guia-pratico, jornada, competência, certificação, demanda, papel, rito, requisito, abordagem, estratégia e hub.
3. THE Camada_de_Granularidade `fluxo` SHALL conter raia, tarefa, artefato, tipo-de-artefato e variável.
4. THE Camada_de_Granularidade `detalhe` SHALL conter gateway (`decisao`), subtarefa, pergunta, nó de início, nó de fim, nó de chamada, célula e playbook.
5. WHEN o Ecossistema abre, THE Ecossistema SHALL ativar as Camadas `nucleo` e `fluxo` e deixar a Camada `detalhe` inativa.
6. WHEN o usuário ativa ou desativa uma Camada_de_Granularidade, THE Ecossistema SHALL atualizar os nós e as Arestas visíveis sem recarregar a página.
7. THE Ecossistema SHALL omitir uma Aresta quando um dos extremos pertence a uma Camada inativa.
8. IF a Camada `detalhe` está inativa, THEN THE Ecossistema SHALL NOT baixar os dados dos nós dessa Camada.
9. WHEN o usuário foca um No_do_Grafo, THE Ecossistema SHALL oferecer a ação "Mostrar detalhes deste nó", que carrega apenas os itens de `detalhe` ligados a esse nó.
10. WHEN o tipo da Entidade é novo no modelo, THE Build_Estatico SHALL falhar com o nome do tipo, até que o tipo seja atribuído a uma Camada_de_Granularidade.

### Requirement 4: Foco por clique e expansão da vizinhança

**User Story:** Como engenheiro, quero clicar em um nó e ver só o que está ligado a ele, para que eu entenda o contexto de uma ferramenta, técnica ou tarefa sem me perder no grafo.

#### Acceptance Criteria

1. WHEN o usuário clica em um No_do_Grafo, THE Ecossistema SHALL entrar em Foco com esse nó como No_Focado.
2. WHILE o Ecossistema está em Foco, THE Renderizador_3D SHALL destacar o No_Focado e a Vizinhanca e atenuar os demais nós e Arestas.
3. WHILE o Ecossistema está em Foco, THE Renderizador_3D SHALL expandir o No_Focado (aumentar o nó e aproximar a Vizinhanca) para tornar legíveis os nomes dos vizinhos.
4. WHEN o usuário clica em um nó da Vizinhanca, THE Ecossistema SHALL mover o Foco para esse nó e manter o histórico de Foco.
5. WHEN o Foco muda, THE Renderizador_3D SHALL animar a câmera até o novo No_Focado em até 1 segundo.
6. THE Ecossistema SHALL oferecer o botão "Voltar", que restaura o Foco anterior, e o botão "Sair do foco", que restaura a visão completa.
7. WHEN o usuário pressiona Esc, THE Ecossistema SHALL sair do Foco.
8. WHEN o usuário clica no fundo do grafo, THE Ecossistema SHALL sair do Foco.
9. THE Ecossistema SHALL oferecer a profundidade do Foco com os valores 1 (vizinhos diretos) e 2 (vizinhos dos vizinhos), com valor padrão 1.
10. WHERE o No_Focado tem mais de 150 vizinhos, THE Ecossistema SHALL agrupar a Vizinhanca por tipo e permitir expandir um grupo por vez.
11. THE Ecossistema SHALL atualizar o Fragmento_de_Estado com o id do No_Focado, de modo que abrir a URL reabra o mesmo Foco.
12. IF o id do Fragmento_de_Estado não existe no Grafo_de_Dados, THEN THE Ecossistema SHALL abrir a visão completa e exibir a mensagem "entidade não encontrada".

### Requirement 5: Barra lateral de detalhes

**User Story:** Como engenheiro, quero ler os detalhes e a descrição do nó selecionado sem sair do grafo, para que eu decida se abro a página completa.

#### Acceptance Criteria

1. WHEN o Ecossistema entra em Foco, THE Barra_Lateral SHALL abrir com o nome, o tipo, a Area e a descrição da Entidade.
2. THE Barra_Lateral SHALL listar a Vizinhanca do No_Focado agrupada por tipo, com a contagem de cada grupo.
3. WHEN o usuário clica em um vizinho da Barra_Lateral, THE Ecossistema SHALL mover o Foco para esse vizinho.
4. THE Barra_Lateral SHALL exibir um link "Abrir página" para a Pagina_Canonica da Entidade.
5. WHERE a Entidade é uma ferramenta, THE Barra_Lateral SHALL exibir categoria, empresa, licença e preço, cada um com Fonte_e_Data ou o texto `não verificado`.
6. WHERE a Entidade é uma demanda ou uma raia, THE Barra_Lateral SHALL exibir o link "Abrir fluxo", que abre a Pagina_de_Demanda na View correspondente.
7. WHERE a Entidade é uma tarefa, THE Barra_Lateral SHALL exibir a Raia, a Demanda e o papel responsável, com link para a View e o Nó no Diagrama.
8. THE Barra_Lateral SHALL obter a descrição e os detalhes de `api/index.json` e das páginas estáticas, sem duplicar o texto das Entidades no Grafo_de_Dados.
9. THE Barra_Lateral SHALL usar o idioma da página, com o fallback pt-BR e o marcador de fallback quando a tradução não existe.
10. WHEN o usuário pressiona Esc ou aciona "Fechar", THE Barra_Lateral SHALL fechar e THE Ecossistema SHALL sair do Foco.
11. THE Barra_Lateral SHALL ser acessível por teclado, com foco gerenciado e rótulos para leitores de tela.
12. WHILE a largura da janela é menor que 768 px, THE Barra_Lateral SHALL aparecer como painel inferior em vez de painel lateral.

### Requirement 6: Filtros e busca no Ecossistema

**User Story:** Como engenheiro, quero filtrar o grafo pelas mesmas facetas do catálogo, para que eu veja só ferramentas de uma categoria, linguagem ou licença, por exemplo.

#### Acceptance Criteria

1. THE Ecossistema SHALL oferecer busca por texto e as mesmas Facetas do Catalogo, geradas do mesmo modelo de Entidade.
2. WHEN o usuário aplica um Filtro, THE Ecossistema SHALL manter visíveis somente os Nos_do_Grafo que atendem aos Filtros, mais as Arestas entre eles.
3. WHEN o usuário aplica Filtros em Facetas diferentes, THE Ecossistema SHALL combinar por E, e WHEN aplica vários valores na mesma Faceta, THE Ecossistema SHALL combinar por OU.
4. THE Ecossistema SHALL exibir o contador "N de M" de nós visíveis.
5. WHEN o usuário escolhe um resultado da busca por texto, THE Ecossistema SHALL colocar esse nó em Foco.
6. THE Fragmento_de_Estado SHALL carregar os Filtros e as Camadas_de_Granularidade ativas.
7. FOR ALL combinações de Filtros, THE conjunto de Entidades do modo `ecossistema` SHALL ser igual ao do modo `lista` para os mesmos Filtros.
8. THE Ecossistema SHALL oferecer o botão "Limpar filtros".
9. IF nenhum nó atende aos Filtros, THEN THE Ecossistema SHALL exibir a mensagem "nenhum item" e o botão "Limpar filtros".

### Requirement 7: Dados do grafo

**User Story:** Como mantenedor, quero que o Ecossistema leia dados estáticos gerados no build, para que o site continue estático e sem backend.

#### Acceptance Criteria

1. THE Ecossistema SHALL ler os Nos_do_Grafo e as Arestas de arquivos JSON estáticos do Build_Estatico, sem chamada a servidor.
2. THE Build_Estatico SHALL publicar o Grafo_de_Dados de cada idioma, com os campos `id`, `tipo`, `layer` e `nome` por nó e `source`, `target` e `kind` por Aresta.
3. THE Build_Estatico SHALL publicar um índice de Camada_de_Granularidade por tipo, para o cliente decidir o que baixar.
4. THE Build_Estatico SHALL publicar os dados da Camada `detalhe` em arquivos separados do Grafo_de_Dados principal.
5. THE Grafo_de_Dados SHALL ter schema JSON versionado e validado no build, e IF o grafo viola o schema, THEN THE Build_Estatico SHALL falhar com o id do nó ou da Aresta inválida.
6. FOR ALL Arestas, THE Grafo_de_Dados SHALL referenciar nós existentes (sem aresta órfã).
7. FOR ALL pares de nós ligados, THE Vizinhanca de A SHALL conter B se e somente se a Vizinhanca de B contiver A (simetria).
8. THE Ecossistema SHALL derivar a Vizinhanca de uma única estrutura de adjacência construída uma vez no carregamento.
9. THE Grafo_de_Dados SHALL ser o mesmo dado do Requirement 13.6 da spec `experiencia-fluxos-catalogo` (simetria entre `graph.json` e Referencias_de_Entrada).

### Requirement 8: Física, layout e interação do grafo

**User Story:** Como engenheiro, quero um layout estável e agradável, para que a forma do grafo ajude a entender o ecossistema em vez de atrapalhar.

#### Acceptance Criteria

1. THE Renderizador_3D SHALL usar um layout de forças em 3D.
2. THE Renderizador_3D SHALL estabilizar o layout em até 5 segundos após a abertura do Ecossistema em hardware de referência.
3. WHEN o layout está estabilizado, THE Renderizador_3D SHALL pausar a simulação de forças para economizar CPU, e SHALL retomá-la quando os nós visíveis mudam.
4. WHERE a pessoa configura a preferência `prefers-reduced-motion`, THE Ecossistema SHALL desativar animações de câmera e transições e SHALL apresentar o layout já estabilizado.
5. THE Ecossistema SHALL fixar posições deterministicamente, a partir de uma semente fixa, de modo que a mesma entrada produza o mesmo layout inicial.
6. WHEN o usuário arrasta um nó, THE Renderizador_3D SHALL mover o nó e SHALL NOT tratar o gesto como clique.
7. WHEN o ponteiro se move até 3 px entre pressionar e soltar sobre um nó, THE Ecossistema SHALL tratar o gesto como clique.
8. THE Ecossistema SHALL ocultar rótulos de nós distantes ou densos e SHALL exibir os rótulos da Vizinhanca do No_Focado.
9. THE Ecossistema SHALL manter a legibilidade de rótulos sem sobreposição na Vizinhanca do No_Focado.

### Requirement 9: Orçamento de desempenho e offline

**User Story:** Como engenheiro, quero que o Ecossistema abra rápido e funcione sem rede, para que ele valha a pena em qualquer máquina.

#### Acceptance Criteria

1. THE Ecossistema SHALL funcionar offline a partir de `site/dist`, com as bibliotecas servidas localmente (sem CDN).
2. THE Site SHALL carregar o código do Renderizador_3D e do Three.js somente quando o Modo_de_Visualizacao `ecossistema` é aberto, e SHALL NOT carregá-lo nas demais páginas.
3. THE Orcamento_de_Desempenho SHALL limitar o JavaScript do Ecossistema (Renderizador_3D, Three.js e código do site) a um valor medido e aprovado no design, e THE design SHALL registrar a linha de base medida.
4. THE Grafo_de_Dados principal das Camadas `nucleo` e `fluxo` SHALL pesar no máximo 200 kB gzip por idioma.
5. THE Ecossistema SHALL exibir o primeiro quadro interativo em até 3,0 s (p95) em CPU 4 vezes mais lenta, com as Camadas `nucleo` e `fluxo` ativas.
6. THE Ecossistema SHALL manter ao menos 30 quadros por segundo durante a rotação da câmera com as Camadas `nucleo` e `fluxo` ativas em hardware de referência registrado no design.
7. THE Ecossistema SHALL entrar em Foco em até 200 ms após o clique, sem contar a animação da câmera.
8. THE Ecossistema SHALL exibir um indicador de progresso enquanto carrega dados e SHALL NOT bloquear o resto da página.
9. THE Ecossistema SHALL liberar os recursos do WebGL (geometrias, texturas e laço de animação) ao sair do modo `ecossistema`.
10. THE crescimento de `site/dist` SHALL entrar no limite de 25% da linha de base da spec `experiencia-fluxos-catalogo`, somando as duas specs.

### Requirement 10: Acessibilidade, teclado e alternativa

**User Story:** Como pessoa que não usa mouse ou WebGL, quero ter o mesmo conteúdo em outro formato, para que o Ecossistema não exclua ninguém.

#### Acceptance Criteria

1. THE Alternativa_sem_WebGL SHALL ser a lista do Catalogo com os mesmos Filtros e o mesmo conteúdo.
2. THE Ecossistema SHALL oferecer navegação por teclado entre os nós da Vizinhanca do No_Focado (setas e Enter) e entrada de busca por teclado.
3. THE Ecossistema SHALL anunciar, para leitores de tela, o nome e o tipo do No_Focado e a quantidade de vizinhos, por região `aria-live`.
4. THE Barra_Lateral SHALL funcionar sozinha como forma textual de navegar a Vizinhanca, sem depender do canvas.
5. THE Ecossistema SHALL exibir contraste mínimo de 4,5:1 para textos e rótulos.
6. THE Ecossistema SHALL NOT depender apenas da cor para distinguir tipos de nó (forma, ícone ou legenda complementam a cor).

### Requirement 11: Integração com os Fluxos de demandas

**User Story:** Como engenheiro, quero ir do fluxo de uma demanda ao grafo e voltar, para que eu descubra ferramentas e conceitos relacionados sem perder a tarefa em que estou.

#### Acceptance Criteria

1. WHEN o usuário aciona "Ver no ecossistema" na Pagina_de_Demanda, THE Site SHALL abrir o Catalogo no modo `ecossistema` com a Demanda em Foco.
2. WHEN o usuário aciona "Ver no ecossistema" em uma tarefa do Modal_de_Playbook, THE Site SHALL abrir o Ecossistema com a tarefa em Foco e a Camada `fluxo` ativa.
3. WHEN o usuário aciona "Abrir fluxo" na Barra_Lateral de uma raia, THE Site SHALL abrir a Pagina_de_Demanda na View `raia:<id>`.
4. WHEN o usuário volta da Pagina_Canonica ao Ecossistema pelo botão do navegador, THE Ecossistema SHALL restaurar o Foco, os Filtros e a posição da câmera anteriores.
5. WHEN o usuário abre uma Demanda em Foco, THE Ecossistema SHALL oferecer o atalho "Mostrar só esta demanda", que filtra o grafo para as raias, tarefas, papéis, artefatos e técnicas da Demanda.

### Requirement 12: Verificação

**User Story:** Como mantenedor, quero testes que provem o comportamento do Ecossistema, para que as próximas mudanças não quebrem a experiência.

#### Acceptance Criteria

1. THE Teste_de_Navegador SHALL provar que o Ecossistema abre, exibe o número esperado de nós por Camada e entra em Foco ao clique.
2. THE Teste_de_Navegador SHALL provar que, em Foco, a Vizinhanca exibida é igual à calculada a partir do Grafo_de_Dados.
3. THE Teste_de_Navegador SHALL provar que o estado (Modo_de_Visualizacao, Foco, Filtros e Camadas) é restaurado ao abrir a URL com o Fragmento_de_Estado.
4. THE Teste_de_Navegador SHALL provar o fallback para a lista quando o WebGL está indisponível.
5. THE Teste_de_Navegador SHALL provar que nenhuma exceção não tratada aparece no console durante abrir, focar, filtrar e sair do Foco.
6. THE suíte de testes SHALL incluir testes de propriedade da Vizinhanca (simetria, ausência de aresta órfã e independência da ordem dos Filtros) sobre o Grafo_de_Dados.
7. THE suíte de testes SHALL falhar quando um tipo de Entidade não tem Camada_de_Granularidade.
8. THE verificação SHALL medir o Orcamento_de_Desempenho (tamanho de JavaScript e de dados, tempo do primeiro quadro interativo) e SHALL falhar quando um limite é excedido.

## Questões em aberto

1. **Biblioteca.** O `3d-force-graph` usa Three.js e d3-force-3d. Ele é adequado a milhares de nós, mas nenhuma das duas bibliotecas está instalada hoje. O design confirma a biblioteca, a versão, a licença (compatível com MIT) e a linha de base de tamanho em gzip.
2. **Orçamento de JavaScript.** O limite de 300 kB gzip por página da spec `experiencia-fluxos-catalogo` provavelmente não cabe com Three.js. O design propõe um limite próprio para o modo `ecossistema`, carregado sob demanda (Requirement 9.2 e 9.3). O dono aprova o valor.
3. **Hubs de navegação.** `hub_tools` tem 944 ligações e distorce o layout. Ocultar por padrão (Requirement 2.8) é a proposta. O dono pode preferir remover os hubs do grafo por definição.
4. **Relação `body`.** 8.762 das 23.164 arestas vêm de wikilinks no corpo do texto (`kind: body`). O design decide se todas as relações têm o mesmo peso visual ou se `body` fica atenuado.
5. **Camadas de `detalhe`.** Gateways, subtarefas, perguntas, playbooks e nós não estão no `graph.json`. O Requirement 3.8 e 3.9 assumem que o build passa a publicá-los em arquivos separados. O design confirma o formato e o custo.
6. **Foco com profundidade 2.** Em hubs, a vizinhança de profundidade 2 pode cobrir quase o grafo. O design define o teto de nós exibidos.
