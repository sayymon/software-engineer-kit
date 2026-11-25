"""Rastreio de dados do fluxo: quem produz e quem consome cada artefato e cada variável.

API pública (estável, usada pelos geradores):

- `rastrear_dados(doc) -> dict[str, dict]`
- `descrever_condicao(cond) -> str`
- `usos_em_condicoes(doc) -> dict[str, list[dict]]`

Funções puras e determinísticas: não fazem I/O e não alteram os argumentos. Toda lista de ids sai em
ordem natural (`guia_decisao.ordem.chave_natural`, então `t2` vem antes de `t10`), sem repetição.
"""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

from guia_decisao.ordem import chave_natural, ordenar_natural
from guia_decisao.taxonomia import e_comunicacao

# Ordem fixa dos operadores de um Termo (descrição e validação).
OPERADORES = ("igual", "diferente", "em", "maior_que", "maior_ou_igual", "menor_que", "menor_ou_igual")
_SIMBOLO = {
    "igual": "=",
    "diferente": "!=",
    "maior_que": ">",
    "maior_ou_igual": ">=",
    "menor_que": "<",
    "menor_ou_igual": "<=",
}


def _dados(doc: Any) -> Mapping[str, Any]:
    """Aceita um `Doc` (com `.data`) ou o mapeamento cru do YAML."""
    data = getattr(doc, "data", doc)
    return data if isinstance(data, Mapping) else {}


def _lista(valor: Any) -> list[Any]:
    return list(valor) if isinstance(valor, (list, tuple)) else []


def rastrear_dados(doc: Any) -> dict[str, dict[str, Any]]:
    """Para cada artefato e variável do catálogo: quem produz e quem consome.

    Devolve `{id: {"tipo": "artefato" | "variavel", "nome": str, "produzido_por": [...], "consumido_por": [...]}}`.

    - `produzido_por`: ids dos nós (inclusive nós `fim`, que são os retornos da raia) e das subtarefas
      que listam o id em `saidas`.
    - `consumido_por`: ids dos nós e das subtarefas que listam o id em `entradas`, mais o id da raia
      que o lista em `entradas` (o que a raia recebe de quem a chama).
    - As duas listas ficam vazias quando ninguém produz ou consome. Ids citados que não estão no
      catálogo são ignorados (a validação os reporta como REF_QUEBRADA).
    - Quando um id existe nas duas coleções, o artefato prevalece (a validação reporta ID_DUPLICADO).
    - As chaves do resultado seguem a ordem natural dos ids.
    """
    data = _dados(doc)
    catalogo: dict[str, dict[str, Any]] = {}
    for colecao, tipo in (("variaveis", "variavel"), ("artefatos", "artefato")):
        for item in _lista(data.get(colecao)):
            if isinstance(item, Mapping) and isinstance(item.get("id"), str):
                catalogo[item["id"]] = {
                    "tipo": tipo,
                    "nome": item.get("nome", ""),
                    "produzido_por": set(),
                    "consumido_por": set(),
                }

    def registrar(dono: Any, campo: str, destino: str) -> None:
        if not isinstance(dono, Mapping) or not isinstance(dono.get("id"), str):
            return
        for alvo in _lista(dono.get(campo)):
            if isinstance(alvo, str) and alvo in catalogo:
                catalogo[alvo][destino].add(dono["id"])

    for raia in _lista(data.get("raias")):
        registrar(raia, "entradas", "consumido_por")
    for rito in _lista(data.get("ritos")):
        registrar(rito, "entradas", "consumido_por")
        registrar(rito, "saidas", "produzido_por")
    for no in _lista(data.get("decisoes")):
        registrar(no, "entradas", "consumido_por")
        registrar(no, "saidas", "produzido_por")
        for sub in _lista(no.get("subtarefas")) if isinstance(no, Mapping) else []:
            registrar(sub, "entradas", "consumido_por")
            registrar(sub, "saidas", "produzido_por")

    return {
        id_: {
            "tipo": info["tipo"],
            "nome": info["nome"],
            "produzido_por": ordenar_natural(info["produzido_por"]),
            "consumido_por": ordenar_natural(info["consumido_por"]),
        }
        for id_, info in sorted(catalogo.items(), key=lambda kv: chave_natural(kv[0]))
    }


def _valor(v: Any) -> str:
    if isinstance(v, bool):
        return "verdadeiro" if v else "falso"
    return str(v)


def _termo(termo: Any) -> str:
    if not isinstance(termo, Mapping):
        return str(termo)
    var = str(termo.get("var", "?"))
    partes: list[str] = []
    for op in OPERADORES:
        if op not in termo:
            continue
        if op == "em":
            lista = ", ".join(_valor(v) for v in _lista(termo[op]))
            partes.append(f"{var} em [{lista}]")
        else:
            partes.append(f"{var} {_SIMBOLO[op]} {_valor(termo[op])}")
    return " e ".join(partes) if partes else var


def descrever_condicao(cond: Any) -> str:
    """Texto legível em português para uma Condicao, determinístico e sem travessões.

    Exemplo: `{"todos": [{"var": "tem_slo", "igual": "sim"}, {"var": "severidade", "em": ["sev1", "sev2"]}]}`
    vira `"quando tem_slo = sim e severidade em [sev1, sev2]"`. Com `algum`, os termos se unem por " ou ".
    Uma condição vazia ou sem termos vira `""`. A ordem dos termos e dos valores é a do documento.
    """
    if not isinstance(cond, Mapping):
        return ""
    if "todos" in cond:
        junta, termos = " e ", _lista(cond["todos"])
    elif "algum" in cond:
        junta, termos = " ou ", _lista(cond["algum"])
    else:
        return ""
    if not termos:
        return ""
    return "quando " + junta.join(_termo(t) for t in termos)


def usos_em_condicoes(doc: Any) -> dict[str, list[dict[str, str]]]:
    """Onde cada variável aparece em condições `quando`: técnicas de nós e subtarefas, a própria subtarefa e variantes de artefato.

    Devolve `{var_id: [{"origem", "dono", "tecnica", "uso", "variante", "quando"}]}` com `origem` em
    `"tecnica"` (uso de técnica de um nó ou subtarefa), `"subtarefa"` (o `quando` da subtarefa, que diz quando executá-la)
    ou `"variante"` (variante de artefato; o `dono` é o id do artefato e `variante` o nome da variante).
    `tecnica` e `uso` ficam vazios fora da origem `tecnica`; `variante` fica vazio fora da origem `variante`.
    Só entram variáveis citadas por algum Termo. Os donos saem em ordem natural (o nó antes das suas subtarefas, em
    caso de empate pela ordem do documento), sem repetir o mesmo item por variável.
    Função pura: sem I/O e sem alterar o documento.
    """
    data = _dados(doc)
    achados: dict[str, list[tuple[int, dict[str, str]]]] = {}
    ordem = 0

    def registrar(dono_id: str, cond: Any, origem: str, tecnica: str = "", uso: str = "", variante: str = "") -> None:
        nonlocal ordem
        if not isinstance(cond, Mapping):
            return
        termos = _lista(cond.get("todos")) + _lista(cond.get("algum"))
        vistos: set[str] = set()
        for t in termos:
            var = t.get("var") if isinstance(t, Mapping) else None
            if isinstance(var, str) and var not in vistos:
                vistos.add(var)
                ordem += 1
                achados.setdefault(var, []).append(
                    (
                        ordem,
                        {
                            "origem": origem,
                            "dono": dono_id,
                            "tecnica": tecnica,
                            "uso": uso,
                            "variante": variante,
                            "quando": descrever_condicao(cond),
                        },
                    )
                )

    def varrer(dono: Any, subtarefa: bool = False) -> None:
        if not isinstance(dono, Mapping) or not isinstance(dono.get("id"), str):
            return
        for uso in _lista(dono.get("tecnicas")):
            if isinstance(uso, Mapping):
                registrar(dono["id"], uso.get("quando"), "tecnica", str(uso.get("tecnica", "")), str(uso.get("uso", "")))
        if subtarefa:
            registrar(dono["id"], dono.get("quando"), "subtarefa")

    for no in _lista(data.get("decisoes")):
        varrer(no)
        for sub in _lista(no.get("subtarefas")) if isinstance(no, Mapping) else []:
            varrer(sub, subtarefa=True)
    for colecao, origem in (("ritos", "rito"), ("perguntas", "pergunta")):
        for item in _lista(data.get(colecao)):
            if isinstance(item, Mapping) and isinstance(item.get("id"), str):
                registrar(item["id"], item.get("quando"), origem)
    for art in _lista(data.get("artefatos")):
        if isinstance(art, Mapping) and isinstance(art.get("id"), str):
            for var in _lista(art.get("variantes")):
                if isinstance(var, Mapping):
                    registrar(art["id"], var.get("quando"), "variante", variante=str(var.get("nome", "")))
    return {
        var: [x for _, x in sorted(itens, key=lambda p: (chave_natural(p[1]["dono"]), p[0]))]
        for var, itens in sorted(achados.items(), key=lambda kv: chave_natural(kv[0]))
    }


def lacunas_de_dados(doc: Any) -> dict[str, list[str]]:
    """Lacunas de cada artefato ou variável: `["produtor"]`, `["consumidor"]`, os dois ou nenhuma.

    Tem produtor quem aparece em `saidas` de nó, subtarefa ou fim; variável com `inicial` também conta como produzida.
    Tem consumidor quem aparece em `entradas` de nó, subtarefa ou raia, quem é citado numa condição `quando`
    (de técnica, de subtarefa ou de variante, porque a condição lê a variável) e o artefato do tipo `comunicacao`
    com `destinatarios` (quem consome é uma pessoa ou um time, registrado como papel). Função pura.
    """
    data = _dados(doc)
    rastro = rastrear_dados(doc)
    em_condicao = set(usos_em_condicoes(doc))
    com_destino = {a["id"] for a in _lista(data.get("artefatos")) if isinstance(a, Mapping)
                   and e_comunicacao(a) and _lista(a.get("destinatarios"))}
    com_inicial = {v["id"] for v in _lista(data.get("variaveis")) if isinstance(v, Mapping) and v.get("inicial") not in (None, "")}
    out: dict[str, list[str]] = {}
    for item_id, info in rastro.items():
        lac = []
        if not info["produzido_por"] and item_id not in com_inicial:
            lac.append("produtor")
        if not info["consumido_por"] and item_id not in em_condicao and item_id not in com_destino:
            lac.append("consumidor")
        out[item_id] = lac
    return out
