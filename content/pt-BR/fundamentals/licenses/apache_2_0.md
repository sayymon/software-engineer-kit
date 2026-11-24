---
id: apache_2_0
tipo: licenca
nome: Apache License 2.0
aliases:
- Apache 2
- ALv2
descricao: Licença permissiva com concessão explícita de patentes pelos contribuidores e cláusula de término da licença de patentes em caso de litígio.
spdx: Apache-2.0
tipoLicenca: permissiva
permissoes:
- Uso comercial
- Modificação
- Distribuição
- Uso de patentes dos contribuidores
- Uso privado
condicoes:
- Incluir o aviso de copyright e a licença
- Documentar as mudanças feitas nos arquivos
limitacoes:
- Sem uso das marcas registradas do titular
- Sem garantia
- Sem responsabilidade por danos
clausulaPatentes: 'Concessão explícita: cada contribuidor licencia as patentes que seu código usa, e a licença de patentes termina para quem abrir um processo de patente contra o projeto.'
compatibilidade:
- 'Pode ser combinada em obras sob GPL-3.0 (afirmação da FSF, página não relida nesta verificação: não verificado)'
- A FSF considera a combinação com GPL-2.0 incompatível (não verificado nesta leitura)
- Combina com MIT e BSD sem atrito
quandoUsar:
- Projetos que querem alcance e proteção de patentes para usuários e contribuidores
- Frameworks e bibliotecas com contribuição de empresas
- Quando o time jurídico das empresas adotantes exige cláusula de patentes
quandoEvitar:
- Quando o menor texto possível importa mais que a proteção de patentes (MIT)
- Quando a obra derivada precisa permanecer aberta (licença copyleft)
aprovacaoOSI: true
aprovacaoFSF: true
urlOficial: https://www.apache.org/licenses/LICENSE-2.0
fonte_ids:
- spdx_apache_2_0
- choosealicense_apache
- apache_texto_oficial
fontes:
- id: spdx_apache_2_0
  tipo: artigo
  titulo: 'SPDX License List: Apache-2.0'
  link: https://spdx.org/licenses/Apache-2.0.html
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
- id: choosealicense_apache
  tipo: artigo
  titulo: 'choosealicense.com: apache-2.0'
  link: https://choosealicense.com/licenses/apache-2.0/
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
- id: apache_texto_oficial
  tipo: artigo
  titulo: Apache License, Version 2.0 (texto oficial)
  link: https://www.apache.org/licenses/LICENSE-2.0
  status_revisao: revisada
  proxima_revisao: '2027-11-24'
status: rascunho
publico: false
dataVerificacao: '2026-11-24'
tags:
- licenca
- fundamentos
- permissiva
---
# Apache License 2.0
## Em resumo
A Apache-2.0 mantém a liberdade da MIT e acrescenta duas proteções: a concessão de patentes e a exigência de registrar as mudanças. Por isso aparece em projetos de infraestrutura e de empresas.

## Como aplicar
1. Copie o texto oficial para `LICENSE` e adicione, quando houver, um arquivo `NOTICE`.
2. A Apache Software Foundation recomenda o aviso padrão no cabeçalho de cada arquivo (apêndice do texto da licença).
3. Registre o identificador `Apache-2.0` nos metadados do pacote.

Compare com [[mit|MIT]] e com [[bsd_3_clause|BSD-3-Clause]].

## Relacionamentos
- **Guia:** [[guia_de_escolha_de_licenca|Guia de escolha de licença]]
- **Mapa:** [[hub_fundamentals|Mapa de Fundamentos de Engenharia]]
- **Aviso:** esta nota é educativa e não é aconselhamento jurídico.
