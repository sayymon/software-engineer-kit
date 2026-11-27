---
id: gpl_2_0
tipo: licenca
nome: GNU General Public License v2.0
aliases:
- GPLv2
- GPL-2.0
descricao: "Copyleft forte da FSF da era 1991: quem distribui o programa ou obras derivadas deve oferecer o código-fonte completo sob os mesmos termos, sem concessão explícita de patentes."
spdx: GPL-2.0-only
tipoLicenca: copyleft forte
permissoes:
- Uso comercial
- Modificação
- Distribuição
- Uso privado
- Cobrar pelo ato de transferir cópias (seção 1)
condicoes:
- Distribuir obras derivadas como um todo, sem custo, sob a GPL-2.0 (seção 2b)
- Manter avisos de mudança nos arquivos modificados (seção 2a)
- Acompanhar executáveis com o código-fonte ou oferta escrita de fonte (seção 3)
- Não impor restrições adicionais aos receptores (seção 6)
- Incluir aviso de copyright e cópia da licença em cada cópia (seção 1)
limitacoes:
- Sem garantia (seção 11)
- Sem responsabilidade por danos (seção 12)
- Distribuição fora dos termos é nula e termina os direitos (seção 4)
- Condições contraditórias, inclusive de patente, impedem a distribuição (seção 7)
clausulaPatentes: 'Não: sem concessão explícita de patentes; a seção 7 apenas impede a distribuição quando condições de patente contradizem a licença.'
compatibilidade:
- Obras derivadas e combinadas saem sob GPL-2.0 (seção 2b)
- A seção 10 admite exceções negociadas com o autor para combinações com outros programas livres
- O identificador SPDX atual diferencia GPL-2.0-only e GPL-2.0-or-later; o aviso de cada arquivo declara a variante (seção 9)
- A Classpath Exception anexada pelo OpenJDK/OpenJFX permite ligar módulos independentes de licença arbitrária ao código GPL-2.0 (lida no arquivo LICENSE do repositório OpenJFX em 2026-11-27)
quandoUsar:
- Aplicações finais e ferramentas de linha de comando que exigem que toda distribuição volte como fonte
- Projetos da era GPL 2 que precisam de continuidade de licenciamento, como o JavaFX (OpenJFX) do kit
quandoEvitar:
- Bibliotecas que querem adoção ampla em produtos fechados (prefira LGPL-2.1, LGPL-3.0, MPL-2.0 ou licenças permissivas)
- Projetos que precisam de concessão explícita de patentes e terminação defensiva, resolvida pela GPL-3.0
aprovacaoOSI: true
aprovacaoFSF: true
urlOficial: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
fonte_ids:
- spdx_gpl_2_0_only
- osi_gpl_2_0
fontes:
- id: spdx_gpl_2_0_only
  tipo: artigo
  titulo: 'SPDX License List: GPL-2.0-only'
  link: https://spdx.org/licenses/GPL-2.0-only.html
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
- id: osi_gpl_2_0
  tipo: artigo
  titulo: 'Open Source Initiative: GPL-2.0'
  link: https://opensource.org/license/gpl-2.0
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
status: rascunho
publico: false
dataVerificacao: '2026-11-27'
tags:
- licenca
- fundamentos
- copyleft-forte
---
# GNU General Public License v2.0
## Em resumo
A GPL-2.0 é o copyleft forte da era pré-patentes: quem distribui deve oferecer o código-fonte completo sob os mesmos termos, e nenhuma concessão explícita de patentes é feita — o texto completo foi lido na lista SPDX em 2026-11-27.

## Como aplicar
Copie o texto oficial para `LICENSE`, preencha o titular e registre `GPL-2.0-only` (ou `GPL-2.0-or-later` quando o aviso declarar any later version) nos metadados; o aviso de cada arquivo deve citar a FSF e a versão 2.

## Relacionamentos
- **Guia:** [[guia_de_escolha_de_licenca|Guia de escolha de licença]]
