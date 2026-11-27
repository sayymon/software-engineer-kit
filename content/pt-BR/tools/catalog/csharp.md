---
id: csharp
tipo: ferramenta
nome: C#
tipos:
  - LINGUAGEM
  - SOFTWARE
empresa: "[[microsoft|Microsoft]]"
aliases:
  - C#
  - C Sharp
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
  - csharp
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
fontePreco: https://dotnet.microsoft.com/en-us/languages/csharp
precoMedio: 0
licenca:
  - MIT
tags:
  - ferramenta
  - linguagem
  - backend-dotnet
---
# C#
## 📋 Informações Básicas
- **Tipos:** LINGUAGEM, SOFTWARE
- **Empresa/Fabricante:** [[microsoft|Microsoft]]
- **Website:** https://dotnet.microsoft.com/en-us/languages/csharp
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Modelo de contratação:** open-source, free
- **Preço (USD):** Gratuito, licença MIT (repositórios oficiais dotnet/runtime e dotnet/roslyn lidos em 2026-11-27)
- **Data de verificação:** 2026-11-27
- **Fonte do preço:** https://dotnet.microsoft.com/en-us/languages/csharp
## 📝 Descrição
Linguagem moderna, open-source e multiplataforma da plataforma .NET, orientada a objetos com recursos funcionais como generics, pattern matching, async/await e records. Segundo a página oficial, é a linguagem mais popular para desenvolvimento .NET e uma das cinco mais usadas em projetos do GitHub; o compilador Roslyn e o runtime são desenvolvidos em repositórios abertos da Microsoft.
## ⏰ Quando Utilizar
- Sistemas corporativos e de linha de negócio: ASP.NET Core, Entity Framework e o tooling Visual Studio formam o ecossistema .NET suportado pela Microsoft, com caminho maduro para APIs, serviços e aplicações internas.
- Times que já operam em Microsoft e Azure: identidade, telemetria e integração de nuvem são de primeira classe na plataforma.
- Backend multiplataforma com performance competitiva: .NET roda em Linux, macOS e contêineres, e a página oficial destaca o desempenho da plataforma em benchmarks públicos (TechEmpower Round 23).
- Produtividade com segurança de tipos: tipos fortes e ferramentas maduras sustentam bases grandes com código preciso e manutenível.
### Quando NÃO utilizar
- Quando o domínio não pede o .NET e o time prefere binário nativo e pegada mínima: [[go|Go]] e [[rust|Rust]] compilam artefatos mais enxutos, sem runtime gerenciado.
- Quando a distância do ecossistema Microsoft (runtime, IDE e vendor) é requisito do time: linguagens com ferramental totalmente comunitário pesam menos nessa conta.
- Prototipagem rápida e ciência de dados: Python tem ecossistema mais direto para iteração dinâmica e notebooks.
- Alvos embarcados ou de controle manual de memória: prefira [[rust|Rust]].
## 🖥 Compatibilidade e Plataformas
- **Plataformas:** linux, macos, windows, cli
- **Linguagens:** csharp
- **Porte:** pessoa-fisica, pequena, media, grande
- **Segmentos:** geral
## 🔒 Restrições e Especificações
- sem restrições relevantes registradas
## 🛠 Toolchain embutida
- **dotnet CLI:** build, testes, restauração de pacotes e templates de projeto (dotnet new, build, test, publish) num único comando.
- **dotnet format:** formatação de código seguindo o .editorconfig do projeto.
- **HttpClient:** cliente HTTP da biblioteca padrão (System.Net.Http) para consumir APIs.
## 🔄 Ciclo no kit
- **Testes:** [[xunit_net|xUnit.net]].
- **ORM:** [[entity_framework_core|Entity Framework Core]].
- **Backend:** [[asp_net_core|ASP.NET Core]] e [[fastendpoints|FastEndpoints]].
- **Logs estruturados:** [[serilog|Serilog]].
- **Frontend web:** [[blazor|Blazor]].
## 🆚 Alternativas
- [[go|Go]]
- [[rust|Rust]]
- [[kotlin|Kotlin]]
- Java
- F#
## 💰 Custo e Contratação
- Gratuito, licença MIT (repositórios oficiais dotnet/runtime e dotnet/roslyn lidos em 2026-11-27)
- **Fonte:** https://dotnet.microsoft.com/en-us/languages/csharp
## 🔗 Relacionamentos
- **Empresa:** [[microsoft|Microsoft]]
- **Categorias:** [[linguagens_programacao|Linguagens de programação]]
- **Mapa:** [[hub_tools|Mapa de Ferramentas de Engenharia]]
