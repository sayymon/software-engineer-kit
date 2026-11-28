---
id: hub_tools
tipo: hub
nome: Mapa de Ferramentas de Engenharia
tags:
  - conhecimento
  - ferramentas
  - mapa
  - engenharia
camada: tools
ordem: 1
---
# Mapa de Ferramentas de Engenharia

Hub das ferramentas que não são de IA: frameworks, bibliotecas, repositórios, skills, servidores MCP, bancos de dados, nuvem, SaaS, ERP, CRM, aplicativos por dispositivo e sites úteis. Cada ferramenta relevante tem nota atômica (seguindo o Template-Ferramenta) e cada categoria tem 3 faixas: mais barata, melhor custo-benefício e qualidade máxima. As ferramentas de IA continuam em [[hub_ai_tools|Mapa de Ferramentas de IA]]. Ferramentas pessoais avulsas: Ferramentas.

## Layout das notas

- **Catálogo:** notas de ferramenta.
- **Categorias:** notas de categoria, cada uma com 3 faixas (mais barata, melhor custo-benefício e qualidade máxima).
- **Casos de uso:** macros e casos por tarefa ou por porte e segmento (com variações).
- **Empresas:** fabricantes. Empresa que já existe na área de IA é reutilizada por link.
- **Padrões:** padrões de projeto e de arquitetura (distribuído, GoF e IA), hub [[hub_patterns|Mapa de Padrões de Engenharia]]. Cada padrão lista os casos de uso que o demandam e as ferramentas que o implementam; as notas de caso, categoria e ferramenta mostram o inverso na seção `🧩 Padrões`.
- Títulos de nota são únicos em todo o kit (comparação sem acento e sem caixa). Em colisão com nota existente, a nova usa o sufixo `(ferramenta)`.

### Casos de uso por macro
Hierarquia: macro > caso de uso > variação (campo `variacoes` de cada caso). Cada caso aponta a macro pelo campo `macro`.

## Campos controlados do front matter

### Plataformas (`plataformas`)
Onde a ferramenta roda ou como se acessa: `web`, `android`, `ios`, `windows`, `macos`, `linux`, `cli`, `api`, `vscode`, `jetbrains`, `extensao-navegador`, `self-hosted`, `cloud`, `desktop`, `carro`, `casa`, `wearable`.

### Linguagens (`linguagens`)
`python`, `javascript`, `typescript`, `java`, `kotlin`, `go`, `rust`, `csharp`, `php`, `ruby`, `swift`, `dart`, `sql`, `agnostica`.

### Porte (`porte`)
`pessoa-fisica`, `pequena`, `media`, `grande`.

### Segmentos (`segmentos`)
`geral`, `varejo-ecommerce`, `financeiro-fintech`, `saude`, `educacao`, `servicos-profissionais`, `alimentacao`, `industria`, `logistica`, `agro`, `imobiliario-construcao`, `marketing-agencias`, `midia-criadores`, `software-saas`, `setor-publico`, `turismo-hotelaria`, `desenvolvimento-software`, `dados-analytics`, `design-criativo`, `devops-infra`, `seguranca`, `escritorio-produtividade`, `pesquisa-conhecimento`.

### Modelo de contratação (`modeloContratacao`)
`free`, `subscription`, `per-seat`, `api-pay-per-token`, `open-source`, `enterprise`.

### Grupos de categoria (`grupo`)
Desenvolvimento e entrega; Frameworks por camada; Bibliotecas; Repositórios GitHub; Skills; Servidores MCP; Sites úteis; Dados e bancos; Nuvem e PaaS; SaaS e plataformas de negócio; Aplicativos por dispositivo; IA no dia a dia; Criação e mídia; Agentes, automação e integrações; IA aplicada (modelos, RAG, evals); Dispositivos inteligentes.

### Preço e verificação
- `precoUSD`: número em USD por mês (por usuário quando for per-seat) ou `"não verificado"`.
- `fontePreco`: URL https oficial ou `"não verificado"`. `dataVerificacao` em formato ISO.
- Nunca estimar nem converter de outra moeda.

### Uso pessoal (`usoPessoal`)
Placeholder opcional: `usa`, `avaliando`, `evitar` ou vazio. Reservado para a conexão futura com o guia de engenharia.

### Ganchos para o guia de engenharia
Cada categoria traz `slug` (candidato a id de `categorias_ferramenta`) e `guia` (ids do guia, preenchidos na conexão).

## 🔗 Relacionamentos
- **Guias práticos:** [[hub_guides|Mapa de Guias Práticos]]
- **Stacks:** [[hub_stacks|Mapa de Stacks de Engenharia]]
- **Área de IA:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
- **Porta de entrada por linguagem:** [[linguagens_programacao|Linguagens de programação]]
- **Ferramentas pessoais:** Ferramentas
