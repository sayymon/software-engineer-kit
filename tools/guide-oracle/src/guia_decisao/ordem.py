"""Ordem única dos ids, dos nós e das raias (natural e de fluxo), usada por todos os geradores.

- `chave_natural`: números dentro do id valem pelo valor (`c2` antes de `c10`).
- `ordem_fluxo`: nós de uma raia na ordem do fluxo (busca em largura a partir do `inicio`).
- `ordem_raias`: orquestradora primeiro, depois as raias na ordem em que são chamadas (busca em
  largura no grafo de chamadas) e por fim as raias não alcançadas.

Tudo é determinístico: a mesma entrada produz sempre a mesma saída.
"""

from __future__ import annotations

import re
from collections import deque
from collections.abc import Iterable, Mapping
from typing import Any

_RE_NUMERO = re.compile(r"([0-9]+)")


def chave_natural(valor: Any) -> tuple[tuple[Any, ...], str]:
    """Chave de ordenação natural: `c2 < c10`. Total e estável (desempata pelo texto original).

    O texto é separado em pedaços alternados (texto, número, texto, ...), então tuplas de ids
    diferentes sempre comparam tipos iguais na mesma posição. O texto original entra como segundo
    elemento da chave, para `c01` e `c1` (mesmo valor) terem ordem fixa.
    """
    texto = str(valor)
    partes: list[Any] = [int(p) if i % 2 else p for i, p in enumerate(_RE_NUMERO.split(texto))]
    return (tuple(partes), texto)


def ordenar_natural(ids: Iterable[Any]) -> list[Any]:
    """Os ids em ordem natural."""
    return sorted(ids, key=chave_natural)


def _destinos(no: Mapping[str, Any]) -> list[tuple[int, str]]:
    return [
        (n, str(p["para"]))
        for n, p in enumerate(no.get("proximo") or [])
        if isinstance(p, Mapping) and p.get("para") is not None
    ]


def ordem_fluxo(nos: Mapping[str, Mapping[str, Any]], ids: Iterable[str]) -> list[str]:
    """Ids em ordem de fluxo: busca em largura a partir do `inicio`, depois os inalcançáveis.

    Os sucessores de cada nó entram na fila pela ordem natural do id e, em empate, pela ordem do
    campo `proximo`. Só conta quem está em `ids` (ligações para fora são ignoradas). Se houver mais
    de um `inicio`, cada um (em ordem natural) abre uma nova busca. Os nós que nenhuma busca alcança
    saem no fim, em ordem natural.
    """
    conjunto = set(ids)
    visto: set[str] = set()
    saida: list[str] = []
    inicios = ordenar_natural(i for i in conjunto if nos[i].get("tipo") == "inicio")
    for inicio in inicios:
        if inicio in visto:
            continue
        visto.add(inicio)
        fila = deque([inicio])
        while fila:
            atual = fila.popleft()
            saida.append(atual)
            cand = sorted(
                ((chave_natural(d), n, d) for n, d in _destinos(nos[atual]) if d in conjunto and d not in visto),
                key=lambda t: (t[0], t[1]),
            )
            for _, _, d in cand:
                if d not in visto:
                    visto.add(d)
                    fila.append(d)
    saida.extend(ordenar_natural(conjunto - visto))
    return saida


def ordem_raias(
    raias: Mapping[str, Mapping[str, Any]],
    nos: Mapping[str, Mapping[str, Any]],
) -> list[str]:
    """Raias de uma demanda: orquestradora, depois na ordem de chamada, depois as não alcançadas.

    `raias` está na ordem do campo `raias` do YAML e `nos` são os nós da demanda. A busca em largura
    percorre o grafo de chamadas: de cada raia, as raias chamadas saem na ordem do fluxo dos nós
    `chamada` dela (que segue c1, c2, c3...). As raias não alcançadas saem em ordem natural do id e,
    em empate, pela posição no YAML.
    """
    posicao = {rid: n for n, rid in enumerate(raias)}
    por_raia: dict[str, set[str]] = {rid: set() for rid in raias}
    for nid, no in nos.items():
        if no.get("raia") in por_raia:
            por_raia[str(no["raia"])].add(nid)
    chamadas: dict[str, list[str]] = {}
    for rid, ids in por_raia.items():
        fluxo = ordem_fluxo(nos, ids)
        chamadas[rid] = [
            str(nos[i]["raia_chamada"])
            for i in fluxo
            if nos[i].get("tipo") == "chamada" and nos[i].get("raia_chamada") in raias
        ]

    def chave(rid: str) -> tuple[Any, int]:
        return (chave_natural(rid), posicao[rid])

    orqs = sorted((r for r in raias if raias[r].get("orquestradora") is True), key=chave)
    saida: list[str] = []
    visto: set[str] = set()
    for orq in orqs[:1]:
        visto.add(orq)
        fila = deque([orq])
        while fila:
            atual = fila.popleft()
            saida.append(atual)
            for alvo in chamadas[atual]:
                if alvo not in visto:
                    visto.add(alvo)
                    fila.append(alvo)
    saida.extend(sorted((r for r in raias if r not in visto), key=chave))
    return saida

def demandas_biblioteca(doc: Mapping[str, Any]) -> set[str]:
    """Ids das demandas marcadas `biblioteca: true` (raias comuns, chamadas por outras demandas)."""
    return {str(d["id"]) for d in doc.get("demandas") or [] if isinstance(d, Mapping) and d.get("biblioteca") is True}


def raias_do_contexto(doc: Mapping[str, Any], demanda_id: str) -> set[str]:
    """Raias da demanda mais as raias de biblioteca que ela alcança por `chamada` (fecho transitivo)."""
    raias = {str(r["id"]): r for r in doc.get("raias") or [] if isinstance(r, Mapping) and "id" in r}
    libs = demandas_biblioteca(doc)
    chama: dict[str, set[str]] = {}
    for n in doc.get("decisoes") or []:
        if isinstance(n, Mapping) and n.get("tipo") == "chamada" and n.get("raia_chamada"):
            chama.setdefault(str(n.get("raia")), set()).add(str(n["raia_chamada"]))
    contexto = {rid for rid, r in raias.items() if r.get("demanda") == demanda_id}
    pilha = list(contexto)
    while pilha:
        for alvo in chama.get(pilha.pop(), ()):
            if alvo not in contexto and str(raias.get(alvo, {}).get("demanda")) in libs:
                contexto.add(alvo)
                pilha.append(alvo)
    return contexto


def contextos_das_demandas(doc: Mapping[str, Any]) -> dict[str, set[str]]:
    """Demanda (fora as bibliotecas) -> raias do contexto, na ordem de declaração das demandas."""
    libs = demandas_biblioteca(doc)
    return {
        str(d["id"]): raias_do_contexto(doc, str(d["id"]))
        for d in doc.get("demandas") or []
        if isinstance(d, Mapping) and str(d.get("id")) not in libs
    }
