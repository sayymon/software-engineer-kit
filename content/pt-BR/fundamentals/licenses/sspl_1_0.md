---
id: sspl_1_0
tipo: licenca
nome: Server Side Public License v1
aliases:
- SSPL
- Server Side Public License
descricao: Licença derivada da GPL-3.0 que exige, para quem oferece o programa como serviço a terceiros, a abertura do código de todo o software usado para operar esse serviço. Não é aprovada pela OSI.
spdx: SSPL-1.0
tipoLicenca: source-available
permissoes:
- Uso, modificação e distribuição
- Uso de patentes dos contribuidores
- Uso privado e interno
condicoes:
- Disponibilizar o código-fonte completo ao distribuir
- Ao oferecer o programa como serviço, disponibilizar sob a mesma licença o Service Source Code, inclusive software de gerenciamento, monitoramento, backup e hospedagem
- Manter avisos de copyright e licença
limitacoes:
- Condição de serviço (seção 13) torna a oferta como serviço gerenciado inviável sem abrir toda a pilha
- Sem garantia
- Não é licença de código aberto pela OSI
clausulaPatentes: 'Concessão explícita herdada da estrutura da GPL-3.0: cada contribuidor concede licença sobre as patentes essenciais de sua versão (seção 11 do texto oficial).'
compatibilidade:
- Mesma estrutura da GPL-3.0 com a seção 13 ampliada
- A lista SPDX registra a SSPL-1.0 como não aprovada pela OSI
quandoUsar:
- Empresas que querem impedir provedores de nuvem de vender o produto como serviço sem retorno
- Uso interno e produtos que consomem o software sem oferecê-lo como serviço
quandoEvitar:
- Projetos que desejam estatuto de código aberto
- Adotantes que operam o software como serviço para terceiros e não podem abrir a pilha
aprovacaoOSI: false
aprovacaoFSF: não verificado
urlOficial: https://www.mongodb.com/legal/licensing/server-side-public-license
fonte_ids:
- spdx_sspl_1_0
- mongodb_sspl
fontes:
- id: spdx_sspl_1_0
  tipo: artigo
  titulo: 'SPDX License List: SSPL-1.0'
  link: https://spdx.org/licenses/SSPL-1.0.html
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
- id: mongodb_sspl
  tipo: artigo
  titulo: 'MongoDB: Server Side Public License (texto oficial)'
  link: https://www.mongodb.com/legal/licensing/server-side-public-license
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
status: rascunho
publico: false
dataVerificacao: '2026-11-24'
tags:
- licenca
- fundamentos
- source-available
---
# Server Side Public License v1
## Em resumo
A SSPL leva a ideia da [[agpl_3_0|AGPL-3.0]] mais longe: o código a abrir inclui toda a infraestrutura que opera o serviço. A OSI não a aprova como licença aberta.

## Relacionamentos
- **Guia:** [[guia_de_escolha_de_licenca|Guia de escolha de licença]]
- **Mapa:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]]
- **Aviso:** esta nota é educativa e não é aconselhamento jurídico.
