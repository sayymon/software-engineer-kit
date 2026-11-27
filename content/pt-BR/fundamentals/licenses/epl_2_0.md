---
id: epl_2_0
tipo: licenca
nome: Eclipse Public License 2.0
aliases:
- EPL-2.0
- Eclipse Public License v2.0
descricao: "Licença copyleft fraca da Eclipse Foundation: exige que modificações distribuídas venham com código-fonte, concede licença de patentes e permite declarar licenças secundárias (como a GPL) para facilitar combinações."
spdx: EPL-2.0
tipoLicenca: copyleft fraco
permissoes:
- Uso comercial
- Modificação
- Distribuição
- Uso privado
- Concessão explícita de patentes (seção 2b)
condicoes:
- Distribuir Modified Works com o código-fonte disponível (seção 3.1)
- Incluir cópia da licença em cada distribuição (seção 3.2b)
- Não remover avisos de copyright, patente, marca e garantia (seção 3.3)
limitacoes:
- Sem garantia (seção 5)
- Sem responsabilidade por danos (seção 6)
- Direitos de patente terminam se o receptor acionar judicialmente por infração de patente do Programa (seção 7)
- Distribuidor comercial indeniza os demais contribuidores por claims trazidos por terceiros (seção 4)
clausulaPatentes: 'Sim: concessão explícita e mundial de patentes (seção 2b), com terminação defensiva em caso de litígio de patente (seção 7).'
compatibilidade:
- Combina com licenças permissivas (MIT, Apache-2.0) em obras derivadas
- Permite GPL 2.0 ou posterior como Secondary License quando o aviso do Exhibit A é anexado pelo contribuidor inicial (seção 3.2)
- A combinação exige o aviso formal do Exhibit A; só incluir o texto da licença não basta
quandoUsar:
- Plataformas e ferramentas de ecossistema (JUnit 5, Eclipse Vert.x, Jetty) que querem copyleft suave com patentes explícitas
- Projetos que precisam interoperar com GPL via licenças secundárias
quandoEvitar:
- Projetos que exigem máxima permissividade sem obrigação de fonte (MIT, Apache-2.0)
- Projetos que não querem concessão de patentes nem terminação defensiva
aprovacaoOSI: true
aprovacaoFSF: true
urlOficial: https://www.eclipse.org/legal/epl-2.0/
fonte_ids:
- spdx_epl_2_0
- eclipse_epl_2_0
- osi_epl_2_0
fontes:
- id: spdx_epl_2_0
  tipo: artigo
  titulo: 'SPDX License List: EPL-2.0'
  link: https://spdx.org/licenses/EPL-2.0.html
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
- id: eclipse_epl_2_0
  tipo: artigo
  titulo: 'Eclipse Foundation: Eclipse Public License 2.0'
  link: https://www.eclipse.org/legal/epl-2.0/
  status_revisao: revisada
  proxima_revisao: '2027-11-27'
- id: osi_epl_2_0
  tipo: artigo
  titulo: 'Open Source Initiative: EPL-2.0'
  link: https://opensource.org/license/EPL-2.0
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
# Eclipse Public License 2.0
## Em resumo
A EPL-2.0 é o copyleft fraco do ecossistema Eclipse e da JVM: modificações distribuídas voltam como fonte, patentes são concedidas explicitamente e a GPL pode entrar como licença secundária declarada no Exhibit A — o texto completo foi lido na lista SPDX em 2026-11-27.

## Como aplicar
Copie o texto oficial para `LICENSE`, preencha o titular e registre `EPL-2.0` nos metadados. Para permitir combinação com GPL, anexe o aviso do Exhibit A nomeando a licença secundária.

## Relacionamentos
- **Guia:** [[guia_de_escolha_de_licenca|Guia de escolha de licença]]
