---
id: guia_de_escolha_de_licenca
tipo: abordagem
nome: Guia de escolha de licença
aliases:
- Como escolher uma licença
- Código versus conteúdo
descricao: Roteiro curto para escolher a licença de um projeto separando código e conteúdo, pesando alcance contra controle e conferindo a compatibilidade com as dependências.
exemplo: Um repositório de guias com scripts de apoio usa MIT para os scripts e CC BY 4.0 para os textos, registra os dois em arquivos separados e declara o identificador SPDX em cada arquivo de código.
quando_usar:
- Antes de publicar um repositório, um pacote ou um conjunto de textos pela primeira vez.
- Ao adotar uma dependência cuja licença pode restringir o seu produto.
quando_evitar:
- "Quando a decisão envolve contrato, empresa ou litígio: busque apoio jurídico qualificado."
status: rascunho
publico: false
fonte_ids:
- choosealicense_guia
- spdx_lista
- creativecommons_escolha
fontes:
- id: choosealicense_guia
  tipo: artigo
  titulo: Choose a License (GitHub)
  link: https://choosealicense.com/
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
- id: spdx_lista
  tipo: artigo
  titulo: SPDX License List
  link: https://spdx.org/licenses/
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
- id: creativecommons_escolha
  tipo: artigo
  titulo: Creative Commons licenses
  link: https://creativecommons.org/share-your-work/cclicenses/
  status_revisao: pendente
  proxima_revisao: '2027-11-24'
dataVerificacao: '2026-11-24'
tags:
- licenca
- fundamentos
- decisao
---
# Guia de escolha de licença
> **Não é aconselhamento jurídico.** Este guia é educativo. Confirme os termos oficiais de cada licença e consulte um profissional antes de decidir em contextos com contrato, empresa ou risco legal.

Veja o conjunto de licenças no Mapa de Licenças (menu Fundamentos) e use as notas de cada licença como referência.

## 1. Código ou conteúdo?
Código e conteúdo pedem licenças diferentes e podem conviver no mesmo repositório, cada um com seu arquivo de licença.

| Material | Licenças comuns | Observação |
| --- | --- | --- |
| Código | [[mit|MIT]], [[apache_2_0|Apache-2.0]], [[gpl_3_0|GPL-3.0]], [[mpl_2_0|MPL-2.0]] | Licenças de software tratam de código-fonte, distribuição e, em alguns casos, patentes. |
| Texto, imagem, diagrama | [[cc_by_4_0|CC BY 4.0]], [[cc_by_sa_4_0|CC BY-SA 4.0]], [[cc0_1_0|CC0-1.0]] | Licenças Creative Commons tratam de crédito e de reuso da obra. |
| Dados | [[cc0_1_0|CC0-1.0]], [[cc_by_4_0|CC BY 4.0]] | Confirme se os dados de origem permitem a redistribuição. |

## 2. Alcance ou controle?
Cada licença escolhe um ponto entre dois polos. Responda quem deve poder usar a obra e o que acontece com as melhorias.

| Objetivo principal | Direção | Exemplos |
| --- | --- | --- |
| Máximo alcance e adoção | Licença permissiva | [[mit|MIT]], [[apache_2_0|Apache-2.0]], [[bsd_3_clause|BSD-3-Clause]] |
| Melhorias voltam para a comunidade | Copyleft | [[gpl_3_0|GPL-3.0]], [[lgpl_3_0|LGPL-3.0]], [[mpl_2_0|MPL-2.0]] |
| Melhorias voltam também em serviços de rede | Copyleft de rede | [[agpl_3_0|AGPL-3.0]] |
| Proteger a receita por um período | Source-available | [[busl_1_1|BUSL-1.1]], [[fsl_1_1_mit|FSL-1.1-MIT]], [[elastic_2_0|Elastic-2.0]], [[sspl_1_0|SSPL-1.0]] |
| Sem exigência nenhuma | Domínio público | [[unlicense|Unlicense]], [[cc0_1_0|CC0-1.0]] |

Licenças source-available permitem ler o código e restringem usos. A OSI não as aprova como código aberto, e o termo "código aberto" fica reservado às licenças aprovadas.

## 3. Compatibilidade
A licença do seu projeto precisa conviver com as licenças das dependências.

1. Liste as dependências diretas e as licenças de cada uma (o identificador SPDX ajuda).
2. Licenças permissivas entram em quase qualquer projeto. Copyleft forte exige que a obra combinada saia sob a mesma licença quando houver distribuição.
3. [[agpl_3_0|AGPL-3.0]] e [[sspl_1_0|SSPL-1.0]] podem pesar em serviços de rede, e muitas organizações têm políticas internas sobre elas.
4. Em dúvida sobre uma combinação, registre a dúvida e busque apoio jurídico.

## 4. Roteiro de decisão
1. A obra é código ou conteúdo? Escolha entre as famílias da seção 1.
2. Você aceita que terceiros fechem derivados? Se sim, use licença permissiva. Se não, use copyleft.
3. Patentes importam para você ou para seus usuários? Prefira [[apache_2_0|Apache-2.0]] entre as permissivas.
4. Você precisa que melhorias em serviços de rede voltem? Considere [[agpl_3_0|AGPL-3.0]].
5. Você quer proteger a receita por um tempo e abrir depois? Considere [[fsl_1_1_mit|FSL-1.1-MIT]] ou [[busl_1_1|BUSL-1.1]] e leia a nota sobre o estatuto de código aberto.
6. Registre o resultado: arquivo `LICENSE`, cabeçalho com `SPDX-License-Identifier` nos arquivos de código e, quando o repositório mistura licenças, um arquivo que mapeie pastas e licenças.

## Neste kit
- O **código** usa [[mit|MIT]]: alcance máximo e texto curto.
- O **conteúdo** usa [[cc_by_4_0|CC BY 4.0]]: reuso livre, com crédito, o que também permite traduções e adaptações.
- Cada tipo de material tem seu arquivo de licença na raiz do repositório.

## Relacionamentos
- **Mapa:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]]
- **Licenças:** [[mit|MIT]], [[cc_by_4_0|CC BY 4.0]]
