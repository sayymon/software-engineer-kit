"""Testes do Decisor construir, comprar ou assinar (Requisito 7 e 14.6) contra a configuração real de comum.yaml."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import pytest
from hypothesis import given, settings
from hypothesis import strategies as st

from guia_decisao.decisor import DecisorError, decidir
from guia_decisao.loader import load_yaml
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

YAML_REAL = GUIA_DIR
NOTAS = {
    "construir": {"diferenciacao": 5, "tempo_ate_valor": 2, "custo_total": 2, "dependencia_fornecedor": 5, "risco": 3},
    "comprar": {"diferenciacao": 2, "tempo_ate_valor": 4, "custo_total": 3, "dependencia_fornecedor": 2, "risco": 3},
    "assinar": {"diferenciacao": 2, "tempo_ate_valor": 5, "custo_total": 4, "dependencia_fornecedor": 2, "risco": 4},
}


@pytest.fixture(scope="module")
def cfg() -> dict[str, Any]:
    return load_yaml(YAML_REAL)["decisor_construir_comprar_assinar"]


def test_pesos_somam_um_e_cobrem_todos_os_criterios(cfg: dict[str, Any]) -> None:
    for objetivo, pesos in cfg["pesos"].items():
        assert set(pesos) == set(cfg["criterios"]), objetivo
        assert sum(pesos.values()) == pytest.approx(1.0), objetivo


def test_cada_objetivo_prioriza_o_criterio_esperado(cfg: dict[str, Any]) -> None:
    def mais_pesado(objetivo: str) -> str:
        pesos = cfg["pesos"][objetivo]
        return max(pesos, key=pesos.get)

    assert mais_pesado("cumprir_prazo") == "tempo_ate_valor"
    assert mais_pesado("diferenciar_produto") == "diferenciacao"
    assert mais_pesado("reduzir_custo") == "custo_total"
    assert mais_pesado("validar_hipotese") == "tempo_ate_valor"


def test_recomendacao_muda_com_o_objetivo(cfg: dict[str, Any]) -> None:
    assert decidir(cfg, "cumprir_prazo", NOTAS).recomendada == "assinar"
    r = decidir(cfg, "diferenciar_produto", NOTAS)
    assert r.recomendada == "construir"
    assert {a.opcao: a.total for a in r.avaliacoes}["construir"] == pytest.approx(3.8)


def test_justificativa_mostra_a_conta_de_cada_opcao(cfg: dict[str, Any]) -> None:
    r = decidir(cfg, "cumprir_prazo", NOTAS)
    linhas = r.justificativa.split("\n")
    assert linhas[0] == "Objetivo: cumprir_prazo. Recomendação: assinar (total 4)."
    assert [ln.split(":")[0] for ln in linhas[1:4]] == cfg["opcoes"]
    assert "tempo até o valor 5 x 0,4 = 2" in linhas[3]
    for a in r.avaliacoes:
        assert a.total == pytest.approx(sum(x.nota * x.peso for x in a.linhas))


def test_contexto_entra_na_justificativa_sem_mudar_a_pontuacao(cfg: dict[str, Any]) -> None:
    contexto = {
        "custos": {"construir": {"curto": "R$ 180 mil", "medio": "R$ 60 mil por ano", "longo": "R$ 300 mil em 5 anos"}},
        "custo_de_nao_fazer": "R$ 40 mil por mês", "roi": "3,2 vezes em 2 anos", "orcamento": "R$ 250 mil",
    }
    sem, com = decidir(cfg, "reduzir_custo", NOTAS), decidir(cfg, "reduzir_custo", NOTAS, contexto)
    assert sem.avaliacoes == com.avaliacoes and sem.recomendada == com.recomendada
    ultima = com.justificativa.split("\n")[-1]
    assert ultima.startswith("Contexto: custo de construir: curto prazo R$ 180 mil, médio prazo")
    assert "custo de não fazer: R$ 40 mil por mês" in ultima and "ROI esperado: 3,2 vezes" in ultima


def test_empate_resolvido_pela_ordem_de_desempate(cfg: dict[str, Any]) -> None:
    iguais = {o: dict.fromkeys(cfg["criterios"], 3) for o in cfg["opcoes"]}
    r = decidir(cfg, "validar_hipotese", iguais)
    assert r.recomendada == cfg["ordem_desempate"][0] == "assinar"
    assert set(r.empate) == set(cfg["opcoes"])
    assert "Empate entre" in r.justificativa
    assert decidir(cfg, "cumprir_prazo", NOTAS).empate == ()


@pytest.mark.parametrize(("objetivo", "notas", "trecho"), [
    ("ganhar_mercado", NOTAS, "objetivo desconhecido"),
    ("cumprir_prazo", {**NOTAS, "assinar": {**NOTAS["assinar"], "risco": 6}}, "fora da escala"),
    ("cumprir_prazo", {**NOTAS, "assinar": {**NOTAS["assinar"], "risco": "alto"}}, "não é um número"),
    ("cumprir_prazo", {k: v for k, v in NOTAS.items() if k != "comprar"}, "faltam as notas"),
    ("cumprir_prazo", {**NOTAS, "alugar": NOTAS["assinar"]}, "opções desconhecidas"),
    ("cumprir_prazo", {**NOTAS, "comprar": {"risco": 3}}, "falta a nota do critério"),
])
def test_entrada_invalida_explica_o_erro(cfg: dict[str, Any], objetivo: str, notas: dict, trecho: str) -> None:
    with pytest.raises(DecisorError, match=trecho):
        decidir(cfg, objetivo, notas)


_nota = st.integers(min_value=1, max_value=5)


@settings(max_examples=60, deadline=None)
@given(st.data())
def test_deterministico_e_recomenda_o_maior_total(cfg: dict[str, Any], data: st.DataObject) -> None:
    objetivo = data.draw(st.sampled_from(sorted(cfg["pesos"])))
    notas = {o: {c: data.draw(_nota) for c in cfg["criterios"]} for o in cfg["opcoes"]}
    a, b = decidir(cfg, objetivo, notas), decidir(cfg, objetivo, notas)
    assert a == b
    maior = max(x.total for x in a.avaliacoes)
    assert {x.opcao: x.total for x in a.avaliacoes}[a.recomendada] == pytest.approx(maior)


def test_decidir_nao_le_relogio_rede_nem_arquivos(cfg: dict[str, Any], monkeypatch: pytest.MonkeyPatch) -> None:
    import builtins
    import socket
    import time

    def proibido(*_a: Any, **_k: Any) -> None:
        raise AssertionError("o Decisor deve ser puro")

    for alvo, nome in ((time, "time"), (time, "monotonic"), (socket, "socket"), (builtins, "open")):
        monkeypatch.setattr(alvo, nome, proibido)
    contexto = {"custos": {"assinar": {"curto": "R$ 20 mil"}}, "roi": "2 vezes"}
    assert decidir(cfg, "cumprir_prazo", NOTAS, contexto).recomendada == "assinar"
