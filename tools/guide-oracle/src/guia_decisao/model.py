"""Modelos em memória: `Doc` imutável com índices por id."""

from __future__ import annotations

import copy
from collections.abc import Mapping
from dataclasses import dataclass, field
from types import MappingProxyType
from typing import Any


def build_indexes(data: Mapping[str, Any]) -> Mapping[str, Mapping[str, Any]]:
    """Cria `by_id[colecao][id]` para toda coleção de topo que seja lista de dicts com `id`."""
    out: dict[str, Mapping[str, Any]] = {}
    for colecao, valor in data.items():
        if isinstance(valor, list) and valor and all(isinstance(x, dict) and "id" in x for x in valor):
            out[colecao] = MappingProxyType({x["id"]: x for x in valor})
    return MappingProxyType(out)


@dataclass(frozen=True)
class Doc:
    """Dicionário validado, tratado como imutável, com índices por id construídos uma vez."""

    data: Mapping[str, Any]
    by_id: Mapping[str, Mapping[str, Any]] = field(init=False, repr=False, compare=False)

    def __post_init__(self) -> None:
        frozen = MappingProxyType(copy.deepcopy(dict(self.data)))
        object.__setattr__(self, "data", frozen)
        object.__setattr__(self, "by_id", build_indexes(frozen))

    def get(self, colecao: str, id_: str) -> Mapping[str, Any] | None:
        return self.by_id.get(colecao, {}).get(id_)
