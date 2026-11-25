"""Decisor construir, comprar ou assinar: lógica pura, sem relógio, rede, arquivos nem estado global.

`decidir(config, objetivo, notas, contexto)` pontua cada opção nos critérios do YAML (`decisor_construir_comprar_assinar`),
com os pesos do objetivo do demandante, e devolve a opção recomendada com uma justificativa auditável: nota, peso e
contribuição de cada critério, o total de cada opção e o desempate, quando houver.

O `contexto` (custos de curto, médio e longo prazo, ROI e custo de não fazer) entra na justificativa, mas não muda a
pontuação: ele é a evidência que embasa as notas, principalmente a de `custo_total`.
"""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any

ROTULO_CRITERIO = {
    "diferenciacao": "diferenciação", "tempo_ate_valor": "tempo até o valor", "custo_total": "custo total",
    "dependencia_fornecedor": "dependência de fornecedor", "risco": "risco",
}
ROTULO_PRAZO = {"curto": "curto prazo", "medio": "médio prazo", "longo": "longo prazo"}
_EPS = 1e-9


class DecisorError(ValueError):
    """Entrada inválida para o Decisor (objetivo, opção, critério ou nota)."""


@dataclass(frozen=True)
class LinhaCriterio:
    criterio: str
    nota: float
    peso: float
    contribuicao: float


@dataclass(frozen=True)
class Avaliacao:
    opcao: str
    linhas: tuple[LinhaCriterio, ...]
    total: float


@dataclass(frozen=True)
class Resultado:
    objetivo: str
    recomendada: str
    avaliacoes: tuple[Avaliacao, ...]
    empate: tuple[str, ...]  # opções empatadas no maior total (vazio sem empate)
    justificativa: str


def _num(v: float) -> str:
    """Número em formato brasileiro, sem zeros desnecessários: 0,4 / 1,6 / 3."""
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return s.replace(".", ",")


def decidir(config: Mapping[str, Any], objetivo: str, notas: Mapping[str, Mapping[str, Any]],
            contexto: Mapping[str, Any] | None = None) -> Resultado:
    """Recomenda construir, comprar ou assinar. Determinística: a mesma entrada dá o mesmo resultado."""
    criterios = list(config["criterios"])
    opcoes = list(config["opcoes"])
    pesos_por_objetivo = config["pesos"]
    lo, hi = float(config["escala"]["min"]), float(config["escala"]["max"])
    if objetivo not in pesos_por_objetivo:
        raise DecisorError(f"objetivo desconhecido: '{objetivo}'; objetivos válidos: {', '.join(pesos_por_objetivo)}")
    pesos = pesos_por_objetivo[objetivo]
    faltam_opcoes = [o for o in opcoes if o not in notas]
    if faltam_opcoes:
        raise DecisorError(f"faltam as notas das opções: {', '.join(faltam_opcoes)}")
    sobram = [o for o in notas if o not in opcoes]
    if sobram:
        raise DecisorError(f"opções desconhecidas: {', '.join(sobram)}; opções válidas: {', '.join(opcoes)}")

    avaliacoes: list[Avaliacao] = []
    for opcao in opcoes:
        linhas = []
        for c in criterios:
            if c not in notas[opcao]:
                raise DecisorError(f"falta a nota do critério '{c}' na opção '{opcao}'")
            nota = notas[opcao][c]
            if isinstance(nota, bool) or not isinstance(nota, (int, float)):
                raise DecisorError(f"a nota do critério '{c}' na opção '{opcao}' não é um número: {nota!r}")
            if not lo <= float(nota) <= hi:
                raise DecisorError(f"a nota {nota} do critério '{c}' na opção '{opcao}' está fora da escala {_num(lo)} a {_num(hi)}")
            peso = float(pesos[c])
            linhas.append(LinhaCriterio(c, float(nota), peso, round(float(nota) * peso, 6)))
        avaliacoes.append(Avaliacao(opcao, tuple(linhas), round(sum(x.contribuicao for x in linhas), 6)))

    maior = max(a.total for a in avaliacoes)
    empatadas = [a.opcao for a in avaliacoes if abs(a.total - maior) < _EPS]
    if len(empatadas) > 1:
        ordem = list(config["ordem_desempate"])
        recomendada = min(empatadas, key=lambda o: ordem.index(o) if o in ordem else len(ordem))
        empate: tuple[str, ...] = tuple(empatadas)
    else:
        recomendada, empate = empatadas[0], ()

    partes = [f"Objetivo: {objetivo}. Recomendação: {recomendada} (total {_num(maior)})."]
    for a in avaliacoes:
        detalhe = "; ".join(f"{ROTULO_CRITERIO.get(x.criterio, x.criterio)} {_num(x.nota)} x {_num(x.peso)} = {_num(x.contribuicao)}" for x in a.linhas)
        partes.append(f"{a.opcao}: {detalhe}; total {_num(a.total)}.")
    if empate:
        partes.append(f"Empate entre {', '.join(empate)}: venceu {recomendada} pela ordem de desempate "
                      f"({', '.join(config['ordem_desempate'])}).")
    if contexto:
        partes.append(_contexto(contexto, opcoes))
    return Resultado(objetivo, recomendada, tuple(avaliacoes), empate, "\n".join(partes))


def _contexto(ctx: Mapping[str, Any], opcoes: list[str]) -> str:
    """Evidência financeira que embasa as notas: custos por prazo, ROI e custo de não fazer."""
    trechos = []
    custos = ctx.get("custos") or {}
    for opcao in opcoes:
        por_prazo = custos.get(opcao) or {}
        valores = [f"{ROTULO_PRAZO[p]} {por_prazo[p]}" for p in ("curto", "medio", "longo") if p in por_prazo]
        if valores:
            trechos.append(f"custo de {opcao}: {', '.join(valores)}")
    if ctx.get("custo_de_nao_fazer") is not None:
        trechos.append(f"custo de não fazer: {ctx['custo_de_nao_fazer']}")
    if ctx.get("roi") is not None:
        trechos.append(f"ROI esperado: {ctx['roi']}")
    if ctx.get("orcamento") is not None:
        trechos.append(f"orçamento previsto: {ctx['orcamento']}")
    return ("Contexto: " + "; ".join(trechos) + ".") if trechos else ""
