---
id: load_shedding
tipo: padrao
nome: Load Shedding
aliases:
  - Descarte de carga
descricao: Sob sobrecarga, o serviço rejeita deliberadamente parte das requisições (as menos importantes primeiro) para manter latência e disponibilidade para o restante.
fonte_ids:
  - aws_load_shedding
  - aws_reliability
  - azure_rate_limiting
exemplo: Acima de 80% de CPU, o serviço rejeita requisições de relatórios e mantém as de checkout.
quando_usar:
  - Picos acima da capacidade provisionada
  - Serviços com tráfego priorizável (crítico x opcional)
  - Proteção de dependências compartilhadas
quando_evitar:
  - Sistemas sem priorização possível, em que o descarte aleatório prejudica clientes de forma injusta
  - Cargas previsíveis atendidas por autoscaling a tempo
status: revisado
publico: false
fontes:
  - id: aws_load_shedding
    tipo: artigo
    titulo: Using load shedding to avoid overload (Amazon Builders' Library)
    link: https://builder.aws.com/content/3Eun1EEyX6p2e3VYNyRLSJzLuMV/using-load-shedding-to-avoid-overload
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: aws_reliability
    tipo: artigo
    titulo: Reliability pillar (AWS Well-Architected Framework)
    link: https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html
    status_revisao: revisada
    proxima_revisao: 2027-11-22
  - id: azure_rate_limiting
    tipo: artigo
    titulo: Rate Limiting pattern (Azure Architecture Center)
    link: https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern
    status_revisao: revisada
    proxima_revisao: 2027-11-22
categorias:
  - "[[gateway_api_service_mesh|Gateway de API e service mesh]]"
  - "[[observabilidade_apm|Observabilidade e APM]]"
familia: distribuido-arquitetura
subfamilia: Resiliência
problema: Quando a demanda excede a capacidade, aceitar tudo faz todas as requisições falharem por lentidão. Rejeitar uma parte preserva as demais.
tradeoffs:
  - "Ganha: o serviço continua respondendo ao tráfego prioritário; paga: algumas requisições legítimas são recusadas"
  - "Ganha: recuperação mais rápida; paga: exige classificar prioridade e detectar sobrecarga com precisão"
consequencias:
  - Os clientes precisam tratar 503 e 429 com retry com jitter
  - Métricas de descarte entram nos SLOs
padroesRelacionados:
  - "[[backpressure|Backpressure]]"
  - "[[bulkhead|Bulkhead]]"
  - "[[rate_limiting|Rate Limiting (padrão)]]"
  - "[[timeout|Timeout]]"
casosDeUso:
  - "[[resposta_a_incidentes|Resposta a incidentes]]"
  - "[[observabilidade_em_producao|Observabilidade em produção]]"
  - "[[varejo_de_grande_escala_grande_empresa|Varejo de grande escala (grande empresa)]]"
  - "[[marketplace_e_plataformas_grande_empresa|Marketplace e plataformas (grande empresa)]]"
variacoes: []
ferramentas:
  - tabela:envoy
  - tabela:nginx
  - tabela:istio
  - "[[kong_gateway|Kong Gateway]]"
  - tabela:amazon-api-gateway
notaCompleta: []
dataVerificacao: 2026-11-22
tags:
  - padrao
---
# Load Shedding
<!-- padrao:gen -->
## 📋 Resumo
`= this.descricao`

Exemplo: `= this.exemplo`
## ❓ Problema
`= this.problema`
## 🔗 Relacionamentos
- **Hub:** [[hub_patterns|Mapa de Padrões de Engenharia]] e [[hub_tools|Mapa de Ferramentas de Engenharia]]
