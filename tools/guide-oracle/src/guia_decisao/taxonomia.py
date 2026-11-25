"""Taxonomia dos artefatos: tipo (categoria) e subtipo (lista fechada por categoria), com os rótulos de exibição.

O guia real usa só os tipos de `TIPOS`. Os tipos de `TIPOS_LEGADOS` continuam aceitos pelo schema para documentos antigos;
a checagem de completude (`engenharia validar`, sem `--parcial`) avisa quando aparecem ou quando o subtipo falta ou foge
da lista.
"""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

# tipo -> {subtipo: rótulo}. Tipo sem entrada aqui não tem subtipo.
SUBTIPOS: dict[str, dict[str, str]] = {
    "documento": {
        "especificacao": "especificação", "plano": "plano", "analise": "análise ou mapeamento", "relatorio": "relatório",
        "checklist": "checklist", "registro": "registro", "guia": "guia ou documentação de uso",
    },
    "diagrama": {
        "arquitetura": "arquitetura", "sequencia": "sequência", "der": "entidade e relacionamento (DER)", "dominio": "domínio",
        "contextos": "contextos", "wbs": "WBS/EAP", "gantt": "Gantt", "roadmap": "roadmap", "ishikawa": "Ishikawa",
        "pareto": "Pareto", "mapa_de_impacto": "mapa de impacto", "quadro": "quadro do programa",
    },
    "teste": {
        "unidade": "unidade", "integracao": "integração", "contrato": "contrato", "ponta_a_ponta": "ponta a ponta",
        "performance": "performance", "seguranca": "segurança", "regressao": "regressão", "caracterizacao": "caracterização",
        "aceitacao": "aceitação", "evals": "evals",
    },
    "ambiente": {
        "local": "local", "desenvolvimento": "desenvolvimento", "sandbox": "sandbox", "efemero": "efêmero (preview por PR)",
        "qa": "QA ou teste", "staging": "staging", "homologacao": "homologação (UAT)", "pre_producao": "pré-produção",
        "producao": "produção", "dr": "recuperação de desastre (DR)", "carga": "carga e performance",
    },
    "acao": {
        "comunicacao": "comunicação", "configuracao": "configuração", "implantacao": "implantação", "reversao": "reversão",
        "aprovacao": "aprovação", "contencao": "contenção", "liberacao": "liberação", "delegacao": "delegação",
        "ajuste": "ajuste de artefato", "card": "abertura ou atualização de card",
    },
    "evidencia": {
        "log": "log ou rastro", "registro_visual": "registro visual", "estado_dos_dados": "estado dos dados",
        "verificacao": "verificação", "contexto": "contexto do problema",
    },
    "sinal": {"alerta": "alerta"},
    "dashboard": {"tecnico": "técnico", "negocio": "negócio"},
    "codigo": {
        "aplicacao": "aplicação", "contrato_de_api": "contrato de API", "query": "query", "pipeline": "pipeline de CI/CD",
        "iac": "infraestrutura como código (IaC)", "branch": "branch",
    },
}
TIPOS = ("documento", "diagrama", "teste", "ambiente", "acao", "evidencia", "sinal", "dashboard", "codigo", "commit",
         "pull_request", "adr", "biblioteca", "agente", "skill", "script")
TIPOS_LEGADOS = ("dado", "decisao", "card", "comunicacao", "configuracao")


def rotulo_subtipo(tipo: Any, subtipo: Any) -> str:
    """Rótulo de exibição do subtipo; texto livre (documentos antigos) sai como está."""
    s = str(subtipo or "")
    return SUBTIPOS.get(str(tipo or ""), {}).get(s, s)


def e_comunicacao(artefato: Mapping[str, Any]) -> bool:
    """Comunicação é a ação de subtipo `comunicacao` (ou o tipo legado `comunicacao`)."""
    tipo = artefato.get("tipo")
    return tipo == "comunicacao" or (tipo == "acao" and artefato.get("subtipo") == "comunicacao")
