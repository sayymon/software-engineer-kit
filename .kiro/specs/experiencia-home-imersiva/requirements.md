# Requirements Document

## Introduction

Esta spec define a **página inicial imersiva** do kit: uma sequência de quatro cenas em tela cheia, desenhadas em WebGL sobre uma rolagem normal, que apresenta o kit, os fluxos por demanda, o catálogo e as jornadas e competências. A referência de experiência é o site do Hubtown (https://hubtown.co.in/), que combina seções fixas, uma cena 3D que reage ao scroll e textos que entram em sequência. A análise do código do Hubtown indica Nuxt, GSAP com ScrollTrigger, Lenis e Three.js. O kit mantém o Astro e usa o Three.js que já existe no projeto.

A home atual (título em WebGL com água e ímã, atalho para o ecossistema e cards das camadas) é o ponto de partida. Esta spec a transforma em uma narrativa de rolagem, sem perder o caminho de trabalho: o engenheiro chega às páginas de leitura em um clique, de qualquer cena.

### Decisões do dono

1. **Cenas fixas e rolagem normal.** Cada cena fica fixa na tela enquanto a pessoa rola e o progresso da rolagem conduz a animação. O navegador controla a rolagem (nenhuma biblioteca de rolagem suavizada, nenhum sequestro de scroll). Biblioteca de rolagem suavizada e timelines ficam para uma melhoria posterior.
2. **Atalhos discretos no topo.** Os atalhos para as camadas do kit ficam em uma barra fina no topo da home, sempre visível. Os cards grandes das camadas deixam de ser o centro da página.
3. **Sem dependência nova de animação.** A base usa CSS `position: sticky`, um calculador de progresso por cena, o Three.js já instalado e CSS para os detalhes simples. GSAP e Lenis não entram nesta entrega.
4. **Ordem das cenas:** (1) Apresentando o kit, (2) Fluxos por demanda, (3) Catálogo, (4) Jornadas e competências.
5. **Conteúdo e visual vêm dos dados.** As cenas leem os dados do kit (fluxos, catálogo, jornadas) e nunca copiam texto de entidades.

### Fora de escopo

- Rolagem guiada ou sequestro do scroll, e biblioteca de rolagem suavizada (decisão 1).
- Modelos 3D feitos à mão. As cenas usam formas e partículas geradas por código.
- Identidade visual final (tipografia, paleta definitiva).
- Mudanças nas páginas internas, no ecossistema 3D e no catálogo em lista.
- Contas de usuário, progresso salvo e backend (ver `product.md`).

## Glossary

- **Home**: a página inicial de cada idioma (`/pt-BR/` e `/en/`).
- **Cena**: uma seção da Home em tela cheia, com conteúdo HTML e uma visualização WebGL.
- **Termo**: nome de uma entidade do catálogo exibido como link flutuante na Home.
- **Cena_Fixa**: Cena que fica presa à tela (`position: sticky`) enquanto a pessoa rola por uma faixa de altura própria.
- **Progresso_da_Cena**: número de 0 a 1 que indica quanto da faixa de rolagem da Cena já foi percorrido.
- **Palco**: o canvas WebGL único e fixo atrás das Cenas, compartilhado por todas elas.
- **Barra_de_Atalhos**: barra fina e fixa no topo da Home com os atalhos para as camadas do kit, a busca e o idioma.
- **Camada_do_Kit**: uma das áreas do site (ferramentas, inteligência artificial, fundamentos, stacks, guias práticos, certificações, fluxos de demanda, jornadas e competências).
- **Demanda**: tipo de trabalho com fluxo próprio (feature, bug, incidente e demais).
- **Fonte_de_Dados**: os JSON estáticos do Build_Estatico: `api/flows/<id>.json`, `api/ecossistema/index.json`, `api/index.json` e os dados de jornadas e certificações.
- **Fallback_Estatico**: a versão da Home sem WebGL e sem animação, com o mesmo conteúdo em blocos de HTML.
- **Build_Estatico**: a saída `site/dist` gerada por `npm run build`.
- **Teste_de_Navegador**: teste Playwright em `tests/browser/*.spec.ts`.
- **Orcamento_de_Desempenho**: limites mensuráveis de tamanho e tempo da Home (Requirement 7).

## Requirements

### Requirement 1: Estrutura da Home em quatro Cenas

**User Story:** Como engenheiro, quero uma página inicial que me apresente o kit e me leve pelas suas áreas em uma sequência clara, para que eu entenda o que o kit oferece antes de escolher onde entrar.

#### Acceptance Criteria

1. THE Home SHALL exibir, em ordem de rolagem, quatro Cenas: Apresentando o kit, Fluxos por demanda, Catálogo e Jornadas e competências.
2. THE Home SHALL oferecer, ao final da quarta Cena, os atalhos para todas as Camadas_do_Kit e a busca.
3. WHEN a pessoa rola a página, THE Home SHALL manter a rolagem controlada pelo navegador, sem interceptar a roda do mouse, o toque ou o teclado.
4. THE Home SHALL exibir um indicador de progresso que mostra a Cena atual entre as quatro.
5. WHEN a pessoa aciona um item do indicador de progresso, THE Home SHALL levar a rolagem ao início da Cena escolhida.
6. THE Home SHALL oferecer, em toda Cena, ao menos um link direto para a página de leitura do assunto da Cena.
7. THE Home SHALL ter uma única Cena_Fixa visível por vez.

### Requirement 2: Atalhos sem menu no topo (revisado)

**User Story:** Como engenheiro que já conhece o kit, quero chegar à camada que preciso sem percorrer a narrativa, para que a Home não atrapalhe o meu trabalho.

#### Acceptance Criteria

1. THE Home SHALL NOT exibir barra ou menu fixo no topo.
2. THE Home SHALL exibir a troca de idioma em um controle pequeno no canto superior direito.
3. THE Home SHALL exibir o link "Ir direto às camadas", visível e discreto, que leva aos cards das oito Camadas_do_Kit no fim da página.
4. THE cards das Camadas_do_Kit SHALL ter texto com contraste mínimo de 4,5:1 sobre o fundo.
5. THE Home SHALL oferecer a busca e o atalho "Explorar o Kit em 3D" na primeira Cena.
6. THE controles da Home SHALL permitir navegação por teclado, com indicador de foco visível.

### Requirement 3: Cena Apresentando o kit

**User Story:** Como visitante, quero entender em poucos segundos o que é o kit e a quem ele serve, para decidir se continuo.

#### Acceptance Criteria

1. THE Cena Apresentando o kit SHALL exibir o título "Software Engineer Kit" com um efeito elétrico que reage ao ponteiro: fatias em glitch, separação de cor, contorno das letras que estala em ciano e azul e raios que saltam do cursor, sem halo branco em repouso.
2. THE Cena SHALL exibir a frase "O Kit com um catálogo curado para consultar e decidir, de ferramentas a fundamentos, para usar nos seus fluxos por demanda e nas jornadas de aprendizado em engenharia de software e IA" e o atalho "Explorar o Kit em 3D" ao lado da busca.
3. WHEN o Progresso_da_Cena avança, THE Cena SHALL animar a transição do título para a Cena seguinte.
4. THE Cena SHALL manter o `<h1>` real da página no DOM, legível por leitores de tela e selecionável.
5. THE Cena SHALL caber em uma tela de 1440 por 900 px sem rolagem interna.

### Requirement 4: Cena Fluxos por demanda

**User Story:** Como engenheiro, quero ver como o trabalho flui em cada tipo de demanda, para entender o caminho antes de abrir o detalhe.

#### Acceptance Criteria

1. THE Cena Fluxos por demanda SHALL desenhar, com partículas, um ícone animado da Demanda escolhida (revisado: o desenho das raias e nós foi trocado por ícones porque ficava poluído).
2. THE Cena SHALL oferecer um seletor com as 12 Demandas, cada uma com seu ícone, na ordem definida em `ordem_das_demandas`.
3. WHEN a pessoa escolhe outra Demanda, THE Cena SHALL animar a troca do desenho sem recarregar a página.
4. WHEN o Progresso_da_Cena avança, THE Cena SHALL revelar as raias e os nós em sequência, na ordem do fluxo.
5. WHEN a pessoa passa o ponteiro sobre uma raia ou nó, THE Cena SHALL exibir o nome e o papel responsável.
6. WHEN a pessoa escolhe uma Demanda, THE Cena SHALL exibir uma legenda curta ao lado do ícone e, abaixo da descrição da Cena, o link "Abrir os fluxos" para a página da Demanda escolhida. Antes da escolha, o link SHALL ficar oculto.
7. THE Cena SHALL obter nomes e papéis dos dados do kit, sem texto próprio duplicado.

### Requirement 5: Cena Catálogo (revisado)
**User Story:** Como engenheiro, quero ter noção da forma do catálogo e escolher uma área para vê-la em destaque, para saber que o kit cobre ferramentas de software e IA, fundamentos e stacks.

#### Acceptance Criteria
1. THE Cena Catálogo SHALL desenhar as entidades do catálogo a partir da Fonte_de_Dados `api/ecossistema/index.json`.
2. THE Cena SHALL oferecer um botão por grupo visual (Fluxos, Artefatos e variáveis, Catálogo, Fundamentos, Aprendizado), sem exibir contagens.
3. WHEN a pessoa aciona o botão de um grupo, THE Cena SHALL acender as entidades do grupo e esmaecer as demais, com transição suave, e WHEN aciona o mesmo botão de novo, THE Cena SHALL voltar à visão completa.
4. THE Cena SHALL usar as mesmas cores por tipo do Ecossistema 3D.
5. THE Cena SHALL oferecer as ações "Ver em lista" e "Ver em 3D", e WHEN um grupo está escolhido, THE ações SHALL apontar para a lista da camada do grupo e para o Ecossistema 3D filtrado pelo grupo.
6. WHERE JavaScript não está disponível, THE botões de grupo SHALL funcionar como links para a página da camada do grupo.

### Requirement 6: Cena Jornadas e competências (revisado)
**User Story:** Como engenheiro, quero ver como as trilhas de estudo, as competências e as certificações se organizam, para planejar o que estudar.

#### Acceptance Criteria
1. THE Cena Jornadas e competências SHALL desenhar um cérebro de perfil com circuitos (certificações em nós nos lobos: técnica no frontal, soft skills no temporal, IA no parietal e occipital), três livros digitais com redes neurais (um por área), quatro bots (as competências) e as jornadas em órbita, a partir do `api/home/jornadas.json`.
2. THE Cena SHALL posicionar a entidade que não tem relação declarada por área e nível da certificação ou por ordem da jornada.
3. THE Cena SHALL oferecer um botão para Jornadas, um para Competências e um para Certificações, sem exibir contagens.
4. WHEN a pessoa aciona um desses botões, THE Cena SHALL acender a parte correspondente da imagem e esmaecer as outras, com transição suave, e WHEN aciona o mesmo botão de novo, THE Cena SHALL voltar à visão completa.
5. THE Cena SHALL oferecer as ações "Ver em lista" e "Ver em 3D", apontando para a página de jornadas ou de certificações e para o Ecossistema 3D filtrado pelo tipo escolhido.
6. WHEN uma certificação não tem Fonte_e_Data para custo ou validade, THE dado do `jornadas.json` SHALL ter `não verificado` no lugar do valor.

### Requirement 7: Desempenho e carregamento

**User Story:** Como engenheiro, quero que a Home abra rápido e funcione sem rede, para que a experiência imersiva não custe tempo de trabalho.

#### Acceptance Criteria

1. THE Home SHALL exibir o conteúdo da primeira Cena, em HTML e CSS, antes do carregamento do código WebGL.
2. THE Home SHALL carregar o Three.js e o código das Cenas depois da primeira renderização e somente na Home.
3. THE Orcamento_de_Desempenho SHALL limitar o JavaScript inicial da Home a 60 kB gzip e o JavaScript adiado das Cenas a 450 kB gzip, e THE design SHALL registrar a linha de base medida.
4. THE Home SHALL carregar os dados de cada Cena somente quando a Cena se aproxima da tela.
5. THE Palco SHALL usar um único contexto WebGL para toda a Home.
6. WHILE nenhuma Cena está visível ou a aba está oculta, THE Palco SHALL pausar o laço de animação.
7. THE Home SHALL manter ao menos 30 quadros por segundo durante a rolagem em hardware de referência registrado no design.
8. THE Home SHALL funcionar offline a partir de `site/dist`, com as bibliotecas servidas localmente.
9. WHERE o dispositivo é de baixa capacidade, THE Palco SHALL reduzir a densidade de partículas e a resolução de renderização.

### Requirement 8: Acessibilidade e Fallback_Estatico

**User Story:** Como pessoa que não usa WebGL, que prefere menos movimento ou que usa leitor de tela, quero o mesmo conteúdo em um formato estável, para que a Home não exclua ninguém.

#### Acceptance Criteria

1. IF o navegador não oferece WebGL ou não executa JavaScript, THEN THE Home SHALL exibir o Fallback_Estatico com as quatro seções e os mesmos links.
2. WHERE a pessoa configura `prefers-reduced-motion`, THE Home SHALL exibir o Fallback_Estatico sem animações de rolagem e sem o efeito de ondas no título.
3. THE Home SHALL manter a ordem de leitura e de foco igual à ordem visual das Cenas.
4. THE Home SHALL oferecer um link "Pular a apresentação" que leva ao fim da quarta Cena.
5. THE Home SHALL manter contraste mínimo de 4,5:1 em todos os textos sobre o Palco.
6. THE Home SHALL NOT depender apenas da cor para distinguir grupos e tipos.
7. THE canvas do Palco SHALL ser decorativo (`aria-hidden`), e toda informação da Cena SHALL existir também em HTML.

### Requirement 9: Dados, conteúdo e idiomas

**User Story:** Como mantenedor, quero que a Home leia os dados do kit, para que ela nunca fique desatualizada nem duplique conteúdo.

#### Acceptance Criteria

1. THE Home SHALL derivar nomes, contagens, relações e links das Fontes_de_Dados, sem copiar o texto de entidades.
2. THE Home SHALL oferecer todos os textos próprios em `pt-BR` e `en`, em `site/src/i18n`.
3. WHERE o conteúdo de uma entidade não tem tradução em `en`, THE Home SHALL exibir o texto em pt-BR com o marcador de fallback.
4. IF uma Fonte_de_Dados falha ao carregar, THEN THE Cena correspondente SHALL exibir o Fallback_Estatico da Cena e a mensagem de erro, sem afetar as outras Cenas.
5. THE Build_Estatico SHALL falhar quando uma Cena referencia uma entidade ou Demanda inexistente.

### Requirement 10: Verificação

**User Story:** Como mantenedor, quero testes que provem o comportamento da Home, para que as mudanças futuras não quebrem a experiência.

#### Acceptance Criteria

1. THE Teste_de_Navegador SHALL provar que a Home exibe quatro Cenas em ordem e que o indicador de progresso acompanha a rolagem.
2. THE Teste_de_Navegador SHALL provar que a Home não tem menu no topo, que tem a troca de idioma, o link "Ir direto às camadas" e os cards das oito camadas no fim, e que o texto da apresentação e o botão "Explorar o Kit em 3D" estão corretos.
3. THE Teste_de_Navegador SHALL provar que a escolha de uma Demanda na Cena de fluxos mostra a legenda e o link "Abrir os fluxos" sem recarregar a página, e que o link está oculto antes da escolha.
4. THE Teste_de_Navegador SHALL provar o Fallback_Estatico com WebGL desativado e com `prefers-reduced-motion`.
5. THE Teste_de_Navegador SHALL provar que nenhuma exceção não tratada aparece no console durante a rolagem completa.
6. THE suíte de testes SHALL incluir testes unitários do calculador de Progresso_da_Cena (limites 0 e 1, monotonia e independência do tamanho da janela).
7. THE verificação SHALL medir o Orcamento_de_Desempenho (JavaScript inicial e adiado, tempo até o primeiro quadro interativo) e SHALL falhar quando um limite é excedido.

### Requirement 11: Termos do catálogo flutuantes

**User Story:** Como engenheiro, quero ver termos reais do catálogo flutuando na página inicial e poder clicar neles, para descobrir conteúdo que eu não procuraria.

#### Acceptance Criteria

1. THE Home SHALL exibir, na primeira Cena, termos sorteados do catálogo (técnicas, ferramentas, papéis, padrões, algoritmos, estruturas de dados, stacks, modelos, ritos, certificações, guias, artefatos, categorias, casos de uso, abordagens e estratégias), com no mínimo 4 tipos diferentes.
2. THE Home SHALL sortear um conjunto novo a cada visita e SHALL renovar um termo por vez enquanto a página está aberta.
3. THE Home SHALL exibir cada termo como link para a página da entidade, colorido pelo tipo, com o nome do tipo ao passar o ponteiro.
4. THE termos SHALL ficar em duas faixas, acima e abaixo do texto da Cena ativa, e SHALL NOT passar atrás do título, do texto nem da busca.
5. WHEN a faixa livre tem menos de 44 px de altura, THE Home SHALL ocultar os termos dessa faixa.
6. WHILE a Cena ativa não é a primeira, THE Home SHALL manter cerca de 40% dos termos visíveis, nas mesmas faixas.
7. THE termos SHALL ser decorativos para tecnologias assistivas (`aria-hidden` e fora da ordem de tabulação), porque as mesmas páginas existem nas listas e na busca.
8. THE termos SHALL vir de `api/index.json`, carregado depois da primeira renderização, sem texto próprio duplicado.

## Questões em aberto

0. **Lacuna de dados (verificada em `api/ecossistema/index.json`).** Hoje as 6 jornadas e as 4 competências não têm nenhuma ligação com outras entidades no grafo, e as 45 certificações ligam só a categorias e ferramentas. Os campos `competencias` e `certificacoes` das jornadas e `certificacoes` das competências estão vazios. A Cena 4 funciona só com o agrupamento por área e nível (Requirement 6.1). Preencher essas relações é trabalho de conteúdo, com fonte e data, e entra como tarefa própria. O dono decide se vem antes ou depois da Cena.

1. **Palco único ou canvas por Cena.** O design propõe um canvas único para respeitar o limite de contextos WebGL. A alternativa é um canvas por Cena, mais simples e mais pesado.
2. **Título em WebGL.** O título atual usa um canvas próprio. O design decide se ele passa a ser parte do Palco ou continua independente na primeira Cena.
3. **Orçamento de JavaScript.** Os valores do Requirement 7.3 são propostas. O dono aprova depois da medição.
4. **Lenis e GSAP.** Ficam para uma melhoria posterior (decisão 3). Reavaliar se a rolagem parecer áspera em outros dispositivos.
5. **Qualidade em celulares.** O design define os níveis de qualidade e o hardware de referência para o Requirement 7.9.
