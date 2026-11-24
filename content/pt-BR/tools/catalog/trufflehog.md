---
id: trufflehog
tipo: ferramenta
nome: TruffleHog
tipos:
  - SOFTWARE
empresa: "[[truffle_security|Truffle Security]]"
aliases:
  - TruffleHog
categorias:
  - "[[seguranca_codigo|Segurança de código]]"
  - "[[senhas_segredos|Gerenciador de senhas e segredos]]"
funcionalidades: []
casosDeUso:
  - "[[gestao_de_segredos_e_credenciais|Gestão de segredos e credenciais]]"
  - "[[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]]"
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
modelos: []
modeloContratacao:
  - open-source
  - free
  - enterprise
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - cli
linguagens:
  - agnostica
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - seguranca
restricoes:
  - a edição enterprise tem preço sob consulta (não verificado)
dataVerificacao: 2026-11-23
fontePreco: https://github.com/trufflesecurity/trufflehog
precoMedio: 0
tags:
  - ferramenta
  - seguranca
  - segredos
---
# TruffleHog
## 📋 Informações Básicas
- **Tipos:** SOFTWARE
- **Empresa/Fabricante:** [[truffle_security|Truffle Security]]
- **Website:** https://trufflesecurity.com/trufflehog
- **Categorias:** [[seguranca_codigo|Segurança de código]], [[senhas_segredos|Gerenciador de senhas e segredos]]
- **Modelo de contratação:** open-source, free, enterprise
- **Preço (USD):** Gratuito, licença AGPL-3.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Data de verificação:** 2026-11-23
- **Fonte do preço:** https://github.com/trufflesecurity/trufflehog
## 📝 Descrição
Varre repositórios Git, históricos, buckets e outras fontes em busca de segredos e verifica se cada credencial encontrada continua válida.
## ⏰ Quando Utilizar
- Auditoria de histórico Git e varredura em CI para achar segredos vazados.
- Priorizar credenciais ativas em vez de ruído de falsos positivos.
### Quando NÃO utilizar
- Quando a equipe precisa de painel de gestão e fluxos de remediação prontos: considere [[gitguardian|GitGuardian]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** agnostica
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** seguranca
## 🔒 Restrições e Especificações
- a edição enterprise tem preço sob consulta (não verificado)
## 🆚 Alternativas
- [[gitguardian|GitGuardian]]
- Gitleaks
- detect-secrets
## 💰 Custo e Contratação
- Gratuito, licença AGPL-3.0 (campo license da API do GitHub, lido em 2026-11-23)
- **Fonte:** https://github.com/trufflesecurity/trufflehog
## 📚 Documentação
- https://github.com/trufflesecurity/trufflehog
## 🔗 Relacionamentos
- **Empresa:** [[truffle_security|Truffle Security]]
- **Categorias:** [[seguranca_codigo|Segurança de código]], [[senhas_segredos|Gerenciador de senhas e segredos]]
- **Casos de uso:** [[gestao_de_segredos_e_credenciais|Gestão de segredos e credenciais]], [[seguranca_de_codigo_e_dependencias|Segurança de código e dependências]], [[resposta_a_incidentes|Resposta a incidentes]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
