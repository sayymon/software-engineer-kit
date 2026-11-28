---
id: go
tipo: ferramenta
nome: Go
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[google|Google]]"
aliases:
  - Go
  - Golang
categorias:
  - "[[linguagens_programacao|Linguagens de programação]]"
funcionalidades: []
casosDeUso: []
modelos: []
modeloContratacao:
  - open-source
  - free
precoUSD: 0
plataformas:
  - linux
  - macos
  - windows
  - cli
linguagens:
  - go
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - sem restrições relevantes registradas
dataVerificacao: 2026-11-27
fontePreco: https://go.dev/
precoMedio: 0
licenca:
  - BSD-3-Clause
tags:
  - ferramenta
  - linguagem
  - backend-go
---
# Go
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://go.dev
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença BSD-3-Clause (texto da licença em https://go.dev/LICENSE lido em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://go.dev
## 📝 Descrição
Linguagem compilada de código aberto apoiada pelo Google e mantida pelo Go team, descrita pelo site oficial para construir sistemas simples, seguros e escaláveis. Traz concorrência nativa (goroutines e channels), coleta de lixo embutida e biblioteca padrão robusta com servidor e cliente HTTP; compila para um binário estático único, o que simplifica contêineres e deploy.
## ⏰ Quando Utilizar
- Serviços de rede e APIs com muitas conexões simultâneas: goroutines e channels tornam a concorrência barata e legível, sem callbacks nem threads manuais.
- Times que valorizam operação simples: binário estático único, compilação rápida e toolchain embutida reduzem a cerimônia de build, formatação e deploy.
- CLIs e ferramentas de DevOps e SRE: o site oficial lista CLI e DevOps/SRE entre os usos principais da linguagem.
- Onboarding rápido: a linguagem é pequena, o estilo é padronizado pelo gofmt e o ciclo code-test-debug é curto.
### Quando NÃO utilizar
- Quando o controle fino de memória e a performance máxima sem coletor de lixo forem o requisito central: prefira [[rust|Rust]].
- Quando o domínio pede o ecossistema corporativo JVM ou .NET com ORM maduro, vendor e suporte enterprise: [[kotlin|Kotlin]] e [[csharp|C#]] carregam esse legado.
- Quando a velocidade de prototipagem manda mais que a robustez de tipos estáticos: linguagens dinâmicas encurtam o primeiro ciclo.
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** go
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🛠 Toolchain embutida
- **go test:** testes, benchmarks e cobertura embutidos no comando go, sem framework externo.
- **gofmt:** formatador oficial; o estilo canônico da linguagem não vira discussão de time.
- **net/http:** servidor e cliente HTTP da biblioteca padrão, base dos roteadores do ecossistema.
## 🔄 Ciclo no kit
- **Testes:** [[testify|Testify]] como camada de assertions e mocks sobre o go test embutido.
- **ORM e acesso a dados:** [[gorm|GORM]].
- **Backend:** [[chi|chi]] e [[fiber|Fiber]] sobre o net/http embutido.
- **Logs estruturados:** [[zap|zap]].
- **CLIs:** [[cobra|Cobra]].
## 🆚 Alternativas
- [[rust|Rust]]
- [[kotlin|Kotlin]]
- [[csharp|C#]]
- Java
- Python
## 💰 Custo e Contratação
- Gratuito, licença BSD-3-Clause (texto da licença em https://go.dev/LICENSE lido em 2026-11-27)
- **Fonte:** https://go.dev
## 🔗 Relacionamentos
- **Empresa:** [[google|Google]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
