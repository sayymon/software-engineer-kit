---
id: cache_aside
tipo: padrao
nome: Cache-aside
aliases:
  - Lazy Loading
  - Cache-Aside
descricao: A aplicação consulta o cache primeiro. No miss, lê da fonte, grava no cache com TTL e devolve. Nas escritas, atualiza a fonte e invalida a entrada do cache.
fonte_ids:
  - azure_cache_aside
  - azure_patterns_index
  - aws_reliability
exemplo: A API busca o produto no Redis, e em caso de miss lê do PostgreSQL e grava no Redis por 10 minutos.
quando_usar:
  - Leituras frequentes de dados que mudam pouco
  - Reduzir carga e custo no banco principal
  - Dados em que uma pequena defasagem é aceitável
quando_evitar:
  - Dados que exigem leitura sempre fresca, como saldos em tempo real
  - Cargas de escrita pesada, em que a invalidação constante anula o ganho
status: revisado
publico: false
fontes:
  - id: azure_cache_aside
    tipo: artigo
    titulo: Cache-Aside pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_patterns_index
    tipo: artigo
    titulo: Cloud design patterns (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[chave_valor_cache|Chave-valor e cache]]"
  - "[[banco_relacional|Banco relacional]]"
familia: distribuido-arquitetura
subfamilia: Escalabilidade
problema: Leituras repetidas sobrecarregam o banco e elevam a latência, mas o cache não pode ficar permanentemente desatualizado.
tradeoffs:
  - "Ganha: latência baixa e menos carga no banco; paga: risco de dados obsoletos e de invalidação incorreta"
  - "Ganha: o cache guarda só o que é usado; paga: o primeiro acesso após o miss é mais lento (cold start)"
consequencias:
  - Cache stampede exige locks ou expiração com jitter
  - TTL e política de invalidação são decisões de negócio
padroesRelacionados:
  - "[[backpressure|Backpressure]]"
  - "[[database_per_service|Database per Service]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[semantic_caching|Semantic Caching]]"
  - "[[sharding|Sharding]]"
casosDeUso:
  - "[[arquitetura_e_system_design|Arquitetura e system design]]"
  - "[[operacao_de_loja_virtual|Operação de loja virtual]]"
  - "[[varejo_de_grande_escala_grande_empresa|Varejo de grande escala (grande empresa)]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
variacoes:
  - arq-escolha-dados
ferramentas:
  - "[[redis|Redis (ferramenta)]]"
  - tabela:memcached
  - "[[amazon_dynamodb|Amazon DynamoDB (ferramenta)]]"
  - "[[postgresql|PostgreSQL]]"
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Cache-aside
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
