---
id: lgpl_2_1
tipo: licenca
nome: GNU Lesser General Public License v2.1
aliases:
- LGPL-2.1
- LGPLv2.1
descricao: "Copyleft fraco da FSF para bibliotecas: modificações da biblioteca distribuídas voltam sob a própria LGPL sem custo, e o programa que apenas a usa por ligação pode ter licença própria."
spdx: LGPL-2.1-only
tipoLicenca: copyleft fraco
permissoes:
- Uso comercial
- Modificação
- Distribuição
- Uso privado
- Distribuir o programa que usa a biblioteca sob termos próprios (seção 6)
condicoes:
- Distribuir a biblioteca e suas modificações com o código-fonte disponível sob a LGPL (seções 1, 2 e 4)
- Licenciar modificações da biblioteca sob a LGPL sem custo para terceiros (seção 2c)
- Ao ligar um programa à biblioteca, permitir modificação e relink pelo usuário final, com aviso e cópia da licença (seção 6)
- Incluir aviso de copyright e cópia da licença em cada cópia (seções 1 e 5)
limitacoes:
- Sem garantia (seção 15)
- Sem responsabilidade por danos (seção 16)
- Direitos terminam em caso de violação da licença (seção 8)
clausulaPatentes: 'Não: sem concessão explícita de patentes; a seção 11 apenas impede a distribuição quando condições de patente contradizem a licença.'
compatibilidade:
- Programas ligados à biblioteca podem ter licença própria, inclusive proprietária, se os termos da seção 6 forem cumpridos
- Uma cópia pode ser convertida irreversivelmente para GPL 2.0 ou superior (seção 3)
- Bibliotecas combinadas devem acompanhar a cópia não combinada da parte LGPL (seção 7)
quandoUsar:
- Bibliotecas que precisam ser ligadas a produtos de licença arbitrária, inclusive fechada
- Projetos da era GPL 2 que exigem continuidade de licenciamento, como o Logback, que mantém a LGPL 2.1 como uma das licenças da dupla
quandoEvitar:
- Projetos novos que querem concessão explícita de patentes e terminação defensiva, que a LGPL-3.0 resolve
- Ambientes em que o usuário final não pode trocar a biblioteca do produto, como firmware travado
- Quando a permissividade total é o objetivo (MIT, Apache-2.0)
aprovacaoOSI: true
aprovacaoFSF: true
urlOficial: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
fonte_ids:
- spdx_lgpl_2_1_only
- gnu_lgpl_2_1
- osi_lgpl_2_1
fontes:
- id: spdx_lgpl_2_1_only
  tipo: artigo
  titulo: 'SPDX License List: LGPL-2.1-only'
  link: https://spdx.org/licenses/LGPL-2.1-only.html
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
- id: gnu_lgpl_2_1
  tipo: artigo
  titulo: 'GNU Lesser General Public License v2.1 (texto oficial)'
  link: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
- id: osi_lgpl_2_1
  tipo: artigo
  titulo: 'Open Source Initiative: LGPL-2.1'
  link: https://opensource.org/license/lgpl-2-1
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
status: rascunho
publico: false
dataVerificacao: '2026-11-27'
tags:
- licenca
- fundamentos
- copyleft-fraco
---
# GNU Lesser General Public License v2.1
## Em resumo
A LGPL-2.1 é o copyleft fraco da era GPL 2: a biblioteca e suas modificações permanecem abertas e o programa que só a usa por ligação pode continuar com licença própria — o texto completo foi lido na lista SPDX em 2026-11-27.

## Como aplicar
Copie o texto oficial para `LICENSE`, preencha o titular e registre `LGPL-2.1-only` (ou `LGPL-2.1-or-later` quando o aviso declarar any later version) nos metadados; o aviso de cada arquivo deve citar a FSF e a versão 2.1.

## Relacionamentos
- **Guia:** [[guia_de_escolha_de_licenca|Guia de escolha de licença]]
