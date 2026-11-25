"""Validação do YAML_Fonte: schema, ids, transições e referências.

`validate` é pura: não faz I/O e não altera os argumentos.

Decisão sobre datas: `yaml.safe_load` converte `proxima_revisao: 2026-07-01`
(sem aspas) em `datetime.date`, mas o Schema espera string com `format: date`.
Antes de aplicar o jsonschema, `validate` cria uma cópia profunda do documento
em que todo `datetime.date` vira `isoformat()` (um `datetime.datetime`, que
inclui hora, também vira texto ISO e é rejeitado pelo padrão AAAA-MM-DD).
O original permanece intacto. O Draft202012Validator usa `FormatChecker`, de
modo que strings como "2026-02-30" são rejeitadas pelo formato `date`.
"""

from __future__ import annotations

import datetime as _dt
import re
from collections import deque
from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker

from guia_decisao.ordem import contextos_das_demandas, demandas_biblioteca

TOLERANCIA_PESOS = 1e-9

COLECOES_COM_ID = (
    "demandas",
    "raias",
    "requisitos",
    "decisoes",
    "playbooks",
    "abordagens",
    "tecnicas",
    "padroes",
    "estrategias",
    "categorias_ferramenta",
    "fontes",
)

# Campo de lista de ids -> coleção alvo (usado em células e playbooks).
_CAMPOS_REF_LISTA = {
    "tecnicas": "tecnicas",
    "abordagens": "abordagens",
    "padroes": "padroes",
    "estrategias": "estrategias",
    "categorias_ferramenta": "categorias_ferramenta",
}

# Coleções que uma Fonte_Estudo pode citar em `itens`.
_COLECOES_CITAVEIS = (
    "demandas",
    "requisitos",
    "decisoes",
    "playbooks",
    "abordagens",
    "tecnicas",
    "padroes",
    "estrategias",
    "categorias_ferramenta",
)


# Coleções cujos itens aceitam `fonte_ids` (referência à coleção `fontes`).
_COLECOES_COM_FONTE_IDS = ("abordagens", "tecnicas", "padroes", "estrategias")


@dataclass(frozen=True)
class Issue:
    # SCHEMA, ID_DUPLICADO, TRANSICAO_INVALIDA, BIFURCACAO_SAIDAS, ORFA, PESOS, REF_QUEBRADA, LIGACAO_INCONSISTENTE,
    # e as regras de raias: RAIA_SEM_INICIO, RAIA_INICIO_MULTIPLO, RAIA_SEM_FIM, TRANSICAO_ENTRE_RAIAS,
    # CHAMADA_INVALIDA, CHAMADA_CICLO, RETORNOS_INCOMPATIVEIS, ORQUESTRADORA, RAIA_ORFA,
    # DEMANDA_INCONSISTENTE, COR_DUPLICADA, ID_PADRAO
    # Dados e subtarefas (erros): SUBTAREFA_ID_PADRAO, SUBTAREFA_EM_NAO_TAREFA, CONDICAO_AUSENTE, CONDICAO_INVALIDA,
    # VARIAVEL_ENUM_SEM_VALORES (além de REF_QUEBRADA e ID_DUPLICADO estendidos).
    # Avisos (nivel="aviso"): VAR_NAO_DECLARADA, ENTRADA_SEM_PRODUTOR, SAIDA_NAO_ENTREGUE, ITEM_SEM_USO,
    # TAREFA_SEM_ENTREGAVEL, SUBTAREFA_SEM_ENTREGAVEL. Erro novo: VARIANTE_DUPLICADA.
    code: str
    path: str  # ex.: decisoes[3].proximo[0].para
    message: str
    item_id: str | None = None
    nivel: str = "erro"  # "erro" falha a validação; "aviso" só orienta (adoção progressiva dos campos de dados)


def _normalizar_datas(valor: Any) -> Any:
    """Cópia profunda em que `date`/`datetime` viram texto ISO. Não muta a entrada."""
    if isinstance(valor, _dt.date):  # datetime é subclasse de date
        return valor.isoformat()
    if isinstance(valor, Mapping):
        return {k: _normalizar_datas(v) for k, v in valor.items()}
    if isinstance(valor, (list, tuple)):
        return [_normalizar_datas(v) for v in valor]
    return valor


def _caminho(partes: Iterable[Any]) -> str:
    out = ""
    for p in partes:
        if isinstance(p, int):
            out += f"[{p}]"
        else:
            out += f".{p}" if out else str(p)
    return out


def _item_id_do_caminho(doc: Mapping[str, Any], partes: list[Any]) -> str | None:
    """Id do item de topo (coleção[i]) a que o erro pertence, quando existir."""
    if len(partes) >= 2 and isinstance(partes[1], int):
        colecao = doc.get(partes[0])
        if isinstance(colecao, list) and 0 <= partes[1] < len(colecao):
            item = colecao[partes[1]]
            if isinstance(item, Mapping) and isinstance(item.get("id"), str):
                return item["id"]
    return None


def _checar_schema(doc: Mapping[str, Any], schema: Mapping[str, Any]) -> list[Issue]:
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    erros = sorted(validator.iter_errors(doc), key=lambda e: (_caminho(e.absolute_path), e.message))
    issues: list[Issue] = []
    for erro in erros:
        partes = list(erro.absolute_path)
        path = _caminho(partes)
        # Campo obrigatório ausente: aponta para o item alterado (o caminho já é o do item).
        issues.append(Issue("SCHEMA", path, erro.message, _item_id_do_caminho(doc, partes)))
    return issues


def _checar_ids_unicos(doc: Mapping[str, Any]) -> list[Issue]:
    issues: list[Issue] = []
    for colecao in COLECOES_COM_ID:
        vistos: dict[str, int] = {}
        for i, item in enumerate(doc.get(colecao, [])):
            id_ = item["id"]
            if id_ in vistos:
                primeiro = vistos[id_]
                issues.append(
                    Issue(
                        "ID_DUPLICADO",
                        f"{colecao}[{i}].id",
                        f"id '{id_}' duplicado em {colecao}: itens {colecao}[{primeiro}] e {colecao}[{i}]",
                        id_,
                    )
                )
            else:
                vistos[id_] = i
    return issues


def _checar_ids_dados(doc: Mapping[str, Any]) -> list[Issue]:
    """ID_DUPLICADO de artefatos, variáveis (os dois catálogos dividem o mesmo espaço de ids) e subtarefas.

    Os ids de subtarefa são globalmente únicos entre si e em relação aos ids dos nós.
    """
    issues: list[Issue] = []
    vistos: dict[str, str] = {}
    for colecao in ("artefatos", "variaveis"):
        for i, item in enumerate(doc.get(colecao, [])):
            id_ = item["id"]
            if id_ in vistos:
                issues.append(Issue(
                    "ID_DUPLICADO", f"{colecao}[{i}].id",
                    f"id '{id_}' duplicado: já existe em {vistos[id_]}; artefatos e variáveis dividem o mesmo espaço de ids",
                    id_))
            else:
                vistos[id_] = f"{colecao}[{i}]"
    por_id: dict[str, str] = {d["id"]: f"decisoes[{i}]" for i, d in reversed(list(enumerate(doc["decisoes"])))}
    for i, d in enumerate(doc["decisoes"]):
        for k, sub in enumerate(d.get("subtarefas", [])):
            id_ = sub["id"]
            if id_ in por_id:
                issues.append(Issue(
                    "ID_DUPLICADO", f"decisoes[{i}].subtarefas[{k}].id",
                    f"id de subtarefa '{id_}' duplicado: já existe em {por_id[id_]}; os ids de subtarefas e de nós são globalmente únicos",
                    id_))
            else:
                por_id[id_] = f"decisoes[{i}].subtarefas[{k}]"
    return issues


def _checar_transicoes(doc: Mapping[str, Any]) -> list[Issue]:
    ids = {d["id"] for d in doc["decisoes"]}
    issues: list[Issue] = []
    for i, d in enumerate(doc["decisoes"]):
        for j, t in enumerate(d["proximo"]):
            if t["para"] not in ids:
                issues.append(
                    Issue(
                        "TRANSICAO_INVALIDA",
                        f"decisoes[{i}].proximo[{j}].para",
                        f"transição de '{d['id']}' aponta para id inexistente '{t['para']}'",
                        d["id"],
                    )
                )
    return issues


def _checar_bifurcacoes(doc: Mapping[str, Any]) -> list[Issue]:
    issues: list[Issue] = []
    for i, d in enumerate(doc["decisoes"]):
        if d["tipo"] == "bifurcacao" and len(d["proximo"]) < 2:
            issues.append(
                Issue(
                    "BIFURCACAO_SAIDAS",
                    f"decisoes[{i}].proximo",
                    f"bifurcação '{d['id']}' tem {len(d['proximo'])} saída(s); o mínimo é 2",
                    d["id"],
                )
            )
    return issues


def _checar_alcancabilidade(doc: Mapping[str, Any]) -> list[Issue]:
    """ORFA por raia: alcançável a partir do(s) `inicio` da própria raia, seguindo `proximo` dentro da raia.

    Raia sem `inicio` não alcança nada (todos os seus nós são órfãos; a falta já é RAIA_SEM_INICIO).
    Nós cuja raia não existe não são avaliados (o problema é REF_QUEBRADA).
    """
    por_id: dict[str, Mapping[str, Any]] = {}
    for d in doc["decisoes"]:
        por_id.setdefault(d["id"], d)
    raias = {r["id"] for r in doc["raias"]}
    inicios: dict[str, list[str]] = {}
    for d in doc["decisoes"]:
        if d["tipo"] == "inicio" and d["raia"] in raias:
            inicios.setdefault(d["raia"], []).append(d["id"])
    vistos: set[str] = set()
    for raia, lista in inicios.items():
        fila = deque(sorted(set(lista)))
        vistos.update(fila)
        while fila:
            atual = fila.popleft()
            for t in por_id[atual]["proximo"]:
                alvo = t["para"]
                destino = por_id.get(alvo)
                if destino is not None and destino["raia"] == raia and alvo not in vistos:
                    vistos.add(alvo)
                    fila.append(alvo)
    return [
        Issue(
            "ORFA",
            f"decisoes[{i}]",
            f"decisão '{d['id']}' não é alcançável a partir do nó 'inicio' da raia '{d['raia']}'",
            d["id"],
        )
        for i, d in enumerate(doc["decisoes"])
        if d["raia"] in raias and d["id"] not in vistos
    ]


_LETRA_POR_TIPO = {"inicio": "s", "tarefa": "t", "bifurcacao": "g", "chamada": "c", "fim": "e"}
_COR_RE = re.compile(r"^#[0-9a-fA-F]{6}$")


def _checar_raias(doc: Mapping[str, Any]) -> list[Issue]:
    """Regras do modelo de raias (SRP): estrutura de cada raia, chamadas, retornos, orquestradora, cores e ids."""
    issues: list[Issue] = []
    raias = doc["raias"]
    decisoes = doc["decisoes"]
    raia_por_id: dict[str, Mapping[str, Any]] = {}
    for r in raias:
        raia_por_id.setdefault(r["id"], r)
    demandas = {e["id"]: e for e in doc["demandas"]}
    libs = demandas_biblioteca(doc)
    por_id: dict[str, Mapping[str, Any]] = {}
    for d in decisoes:
        por_id.setdefault(d["id"], d)
    nos_da_raia: dict[str, list[tuple[int, Mapping[str, Any]]]] = {r: [] for r in raia_por_id}
    for i, d in enumerate(decisoes):
        if d["raia"] in nos_da_raia:
            nos_da_raia[d["raia"]].append((i, d))

    # DEMANDA_INCONSISTENTE
    for i, d in enumerate(decisoes):
        r = raia_por_id.get(d["raia"])
        if r is not None and "demanda" in d and d["demanda"] != r["demanda"]:
            issues.append(Issue(
                "DEMANDA_INCONSISTENTE", f"decisoes[{i}].demanda",
                f"'{d['id']}' declara a demanda '{d['demanda']}', mas a raia '{r['id']}' pertence à demanda '{r['demanda']}'",
                d["id"]))

    # início e fim por raia
    for ri, r in enumerate(raias):
        if raia_por_id[r["id"]] is not r:
            continue  # raia duplicada: já é ID_DUPLICADO
        nos = nos_da_raia[r["id"]]
        inicios = [d["id"] for _, d in nos if d["tipo"] == "inicio"]
        if not inicios:
            issues.append(Issue("RAIA_SEM_INICIO", f"raias[{ri}]",
                                f"a raia '{r['id']}' não tem nó 'inicio'; o esperado é exatamente 1", r["id"]))
        elif len(inicios) > 1:
            issues.append(Issue("RAIA_INICIO_MULTIPLO", f"raias[{ri}]",
                                f"a raia '{r['id']}' tem {len(inicios)} nós 'inicio' ({', '.join(inicios)}); o esperado é exatamente 1",
                                r["id"]))
        fins = [(i, d) for i, d in nos if d["tipo"] == "fim"]
        if not fins:
            issues.append(Issue("RAIA_SEM_FIM", f"raias[{ri}]",
                                f"a raia '{r['id']}' não tem nó 'fim'; cada fim é um retorno nomeado da raia", r["id"]))
        vistos_retorno: dict[str, str] = {}
        for i, d in fins:
            ret = d.get("retorno")
            if not ret:
                issues.append(Issue("RAIA_SEM_FIM", f"decisoes[{i}].retorno",
                                    f"o fim '{d['id']}' da raia '{r['id']}' não declara `retorno`", d["id"]))
            elif ret in vistos_retorno:
                issues.append(Issue("RAIA_SEM_FIM", f"decisoes[{i}].retorno",
                                    f"o retorno '{ret}' do fim '{d['id']}' repete o de '{vistos_retorno[ret]}' na raia '{r['id']}'; "
                                    "os retornos de uma raia são únicos", d["id"]))
            else:
                vistos_retorno[ret] = d["id"]

    # TRANSICAO_ENTRE_RAIAS
    for i, d in enumerate(decisoes):
        if d["raia"] not in raia_por_id:
            continue
        for j, t in enumerate(d["proximo"]):
            alvo = por_id.get(t["para"])
            if alvo is not None and alvo["raia"] in raia_por_id and alvo["raia"] != d["raia"]:
                issues.append(Issue(
                    "TRANSICAO_ENTRE_RAIAS", f"decisoes[{i}].proximo[{j}].para",
                    f"'{d['id']}' (raia '{d['raia']}') aponta para '{alvo['id']}' (raia '{alvo['raia']}'); "
                    "uma raia só aciona outra por um nó 'chamada'", d["id"]))

    # chamadas
    chamadas_validas: dict[str, set[str]] = {r: set() for r in raia_por_id}
    chamadas_de: set[str] = set()
    for i, d in enumerate(decisoes):
        origem = raia_por_id.get(d["raia"])
        alvo_id = d.get("raia_chamada")
        if d["tipo"] != "chamada":
            if alvo_id is not None:
                issues.append(Issue("CHAMADA_INVALIDA", f"decisoes[{i}].raia_chamada",
                                    f"'{d['id']}' não é do tipo 'chamada' mas declara `raia_chamada`", d["id"]))
            continue
        if alvo_id is None:
            issues.append(Issue("CHAMADA_INVALIDA", f"decisoes[{i}]",
                                f"o nó 'chamada' '{d['id']}' não declara `raia_chamada`", d["id"]))
            continue
        alvo = raia_por_id.get(alvo_id)
        if alvo is None or origem is None:
            continue  # REF_QUEBRADA já cobre
        chamadas_de.add(alvo_id)
        if alvo_id == d["raia"]:
            issues.append(Issue("CHAMADA_INVALIDA", f"decisoes[{i}].raia_chamada",
                                f"'{d['id']}' chama a própria raia '{alvo_id}'", d["id"]))
        elif alvo["demanda"] != origem["demanda"] and alvo["demanda"] not in libs:
            issues.append(Issue("CHAMADA_INVALIDA", f"decisoes[{i}].raia_chamada",
                                f"'{d['id']}' chama a raia '{alvo_id}' da demanda '{alvo['demanda']}'; "
                                f"`chamada` só liga raias da mesma demanda ('{origem['demanda']}') ou de uma biblioteca; "
                                "entre demandas use `ligacoes`",
                                d["id"]))
        else:
            chamadas_validas[d["raia"]].add(alvo_id)
            retornos = {x["retorno"] for _, x in nos_da_raia[alvo_id] if x["tipo"] == "fim" and x.get("retorno")}
            conds = [t["condicao"] for t in d["proximo"]]
            faltam = sorted(retornos - set(conds))
            sobram = sorted(set(conds) - retornos)
            repetidas = sorted({c for c in conds if conds.count(c) > 1})
            if faltam or sobram or repetidas:
                partes = []
                if faltam:
                    partes.append(f"faltam {faltam}")
                if sobram:
                    partes.append(f"sobram {sobram}")
                if repetidas:
                    partes.append(f"repetidas {repetidas}")
                issues.append(Issue(
                    "RETORNOS_INCOMPATIVEIS", f"decisoes[{i}].proximo",
                    f"as saídas de '{d['id']}' não casam com os retornos da raia '{alvo_id}': " + "; ".join(partes),
                    d["id"]))

    # CHAMADA_CICLO: raia que alcança a si mesma pelo grafo raia -> raia_chamada
    def alcanca(origem: str) -> set[str]:
        visto: set[str] = set()
        pilha = list(chamadas_validas[origem])
        while pilha:
            atual = pilha.pop()
            if atual not in visto:
                visto.add(atual)
                pilha.extend(chamadas_validas[atual])
        return visto

    for ri, r in enumerate(raias):
        if raia_por_id[r["id"]] is r and r["id"] in alcanca(r["id"]):
            issues.append(Issue("CHAMADA_CICLO", f"raias[{ri}]",
                                f"a raia '{r['id']}' participa de um ciclo de chamadas; o grafo raia -> raia_chamada deve ser acíclico",
                                r["id"]))

    # ORQUESTRADORA e RAIA_ORFA por demanda
    por_demanda: dict[str, list[int]] = {}
    for ri, r in enumerate(raias):
        por_demanda.setdefault(r["demanda"], []).append(ri)
    for dem, indices in por_demanda.items():
        orqs = [ri for ri in indices if raias[ri].get("orquestradora", False)]
        if dem in libs:
            # Biblioteca de raias comuns: nenhuma orquestradora; cada raia é chamada por alguma demanda.
            for ri in orqs:
                issues.append(Issue("ORQUESTRADORA", f"raias[{ri}].orquestradora",
                                    f"a raia '{raias[ri]['id']}' é de uma biblioteca ('{dem}') e não pode ser orquestradora",
                                    raias[ri]["id"]))
            orqs = [None]
        if not orqs:
            issues.append(Issue("ORQUESTRADORA", f"raias[{indices[0]}]",
                                f"a demanda '{dem}' tem raias, mas nenhuma é `orquestradora`; o esperado é exatamente 1", dem))
        elif len(orqs) > 1:
            for ri in orqs[1:]:
                issues.append(Issue("ORQUESTRADORA", f"raias[{ri}].orquestradora",
                                    f"a demanda '{dem}' tem {len(orqs)} raias orquestradoras; o esperado é exatamente 1",
                                    raias[ri]["id"]))
        for ri in indices:
            r = raias[ri]
            if (dem in libs or not r.get("orquestradora", False)) and r["id"] not in chamadas_de:
                issues.append(Issue("RAIA_ORFA", f"raias[{ri}]",
                                    f"a raia '{r['id']}' não é orquestradora e nenhuma raia a chama", r["id"]))

    # COR_DUPLICADA: por demanda, contando as raias de biblioteca que ela chama (aparecem no mesmo diagrama)
    contextos = contextos_das_demandas(doc)
    for lib in sorted(libs):
        contextos[lib] = {r["id"] for r in raias if r["demanda"] == lib}
    ja_avisadas: set[str] = set()
    for dem, ctx_ids in contextos.items():
        cores: dict[str, str] = {}
        for ri, r in enumerate(raias):
            if r["id"] not in ctx_ids or raia_por_id.get(r["id"]) is not r:
                continue
            cor = r["cor"].lower()
            if cor in cores:
                if r["id"] not in ja_avisadas:
                    ja_avisadas.add(r["id"])
                    issues.append(Issue("COR_DUPLICADA", f"raias[{ri}].cor",
                                        f"a raia '{r['id']}' repete a cor {r['cor']} da raia '{cores[cor]}' na demanda '{dem}'",
                                        r["id"]))
            else:
                cores[cor] = r["id"]

    # ID_PADRAO
    for ri, r in enumerate(raias):
        dem = demandas.get(r["demanda"])
        sigla = dem.get("sigla") if dem is not None else None
        if isinstance(sigla, str) and not r["id"].startswith(f"{sigla}_"):
            issues.append(Issue("ID_PADRAO", f"raias[{ri}].id",
                                f"o id da raia '{r['id']}' deve começar com '{sigla}_' (sigla da demanda '{r['demanda']}')", r["id"]))
    for i, d in enumerate(decisoes):
        if d["raia"] not in raia_por_id:
            continue
        letra = _LETRA_POR_TIPO[d["tipo"]]
        if not re.fullmatch(rf"{re.escape(d['raia'])}_{letra}\d+", d["id"]):
            issues.append(Issue("ID_PADRAO", f"decisoes[{i}].id",
                                f"o id '{d['id']}' deve ter a forma '{d['raia']}_{letra}<n>' (tipo '{d['tipo']}', raia '{d['raia']}')",
                                d["id"]))
    return issues


def _checar_pesos(doc: Mapping[str, Any]) -> list[Issue]:
    issues: list[Issue] = []
    base = "decisor_construir_comprar_assinar.pesos"
    for objetivo, pesos in doc["decisor_construir_comprar_assinar"]["pesos"].items():
        soma = sum(pesos.values())
        if abs(soma - 1.0) > TOLERANCIA_PESOS:
            issues.append(
                Issue(
                    "PESOS",
                    f"{base}.{objetivo}",
                    f"pesos do objetivo '{objetivo}' somam {soma!r}; o esperado é 1 (tolerância {TOLERANCIA_PESOS:g})",
                    objetivo,
                )
            )
    return issues


def _checar_referencias(doc: Mapping[str, Any]) -> list[Issue]:
    ids: dict[str, set[str]] = {c: {x["id"] for x in doc[c]} for c in COLECOES_COM_ID}
    issues: list[Issue] = []

    def quebrada(path: str, alvo: str, colecao: str, origem: str) -> None:
        issues.append(
            Issue(
                "REF_QUEBRADA",
                path,
                f"'{origem}' referencia id inexistente '{alvo}' (esperado em {colecao})",
                origem,
            )
        )

    for i, r in enumerate(doc["raias"]):
        if r["demanda"] not in ids["demandas"]:
            quebrada(f"raias[{i}].demanda", r["demanda"], "demandas", r["id"])

    for i, d in enumerate(doc["decisoes"]):
        if d["raia"] not in ids["raias"]:
            quebrada(f"decisoes[{i}].raia", d["raia"], "raias", d["id"])
        if "raia_chamada" in d and d["raia_chamada"] not in ids["raias"]:
            quebrada(f"decisoes[{i}].raia_chamada", d["raia_chamada"], "raias", d["id"])
        if "demanda" in d and d["demanda"] not in ids["demandas"]:
            quebrada(f"decisoes[{i}].demanda", d["demanda"], "demandas", d["id"])
        if "playbook" in d and d["playbook"] not in ids["playbooks"]:
            quebrada(f"decisoes[{i}].playbook", d["playbook"], "playbooks", d["id"])

    for i, c in enumerate(doc["celulas"]):
        origem = f"{c['demanda']}:{c['requisito']}"
        if c["demanda"] not in ids["demandas"]:
            quebrada(f"celulas[{i}].demanda", c["demanda"], "demandas", origem)
        if c["requisito"] not in ids["requisitos"]:
            quebrada(f"celulas[{i}].requisito", c["requisito"], "requisitos", origem)
        for campo, colecao in _CAMPOS_REF_LISTA.items():
            for j, alvo in enumerate(c.get(campo, [])):
                if alvo not in ids[colecao]:
                    quebrada(f"celulas[{i}].{campo}[{j}]", alvo, colecao, origem)

    for i, p in enumerate(doc["playbooks"]):
        for campo, colecao in _CAMPOS_REF_LISTA.items():
            for j, alvo in enumerate(p.get(campo, [])):
                if alvo not in ids[colecao]:
                    quebrada(f"playbooks[{i}].{campo}[{j}]", alvo, colecao, p["id"])

    citaveis: set[str] = set().union(*(ids[c] for c in _COLECOES_CITAVEIS))
    for i, f in enumerate(doc["fontes"]):
        for j, alvo in enumerate(f.get("itens", [])):
            if alvo not in citaveis:
                quebrada(f"fontes[{i}].itens[{j}]", alvo, "itens do guia", f["id"])

    # fonte_ids de itens conceituais devem existir em `fontes`.
    for colecao in _COLECOES_COM_FONTE_IDS:
        for i, item in enumerate(doc[colecao]):
            for j, alvo in enumerate(item.get("fonte_ids", [])):
                if alvo not in ids["fontes"]:
                    quebrada(f"{colecao}[{i}].fonte_ids[{j}]", alvo, "fontes", item["id"])

    issues += _checar_ligacoes(doc, ids)
    return issues


def _checar_ligacoes(doc: Mapping[str, Any], ids: Mapping[str, set[str]]) -> list[Issue]:
    """Ligações entre demandas: ids existentes e coerência de demanda. Não entram na alcançabilidade."""
    por_id: dict[str, Mapping[str, Any]] = {}
    for d in doc["decisoes"]:
        por_id.setdefault(d["id"], d)
    demanda_da_raia = {r["id"]: r["demanda"] for r in doc["raias"]}

    def demanda_de(dec: Mapping[str, Any]) -> str | None:
        """Demanda efetiva: a da raia (fonte de verdade) ou, na falta dela, o campo `demanda` do nó."""
        return demanda_da_raia.get(dec["raia"], dec.get("demanda"))

    issues: list[Issue] = []
    for i, d in enumerate(doc["decisoes"]):
        for j, lig in enumerate(d.get("ligacoes", [])):
            base = f"decisoes[{i}].ligacoes[{j}]"
            destino = lig["demanda_destino"]
            alvo = lig["para"]
            demanda_ok = destino in ids["demandas"]
            if not demanda_ok:
                issues.append(
                    Issue(
                        "REF_QUEBRADA",
                        f"{base}.demanda_destino",
                        f"'{d['id']}' referencia id inexistente '{destino}' (esperado em demandas)",
                        d["id"],
                    )
                )
            alvo_decisao = por_id.get(alvo)
            if alvo_decisao is None:
                issues.append(
                    Issue(
                        "REF_QUEBRADA",
                        f"{base}.para",
                        f"'{d['id']}' referencia id inexistente '{alvo}' (esperado em decisoes)",
                        d["id"],
                    )
                )
            if demanda_ok and demanda_de(d) == destino:
                issues.append(
                    Issue(
                        "LIGACAO_INCONSISTENTE",
                        f"{base}.demanda_destino",
                        f"ligação de '{d['id']}' aponta para a própria demanda '{destino}'; use `proximo` para o fluxo interno",
                        d["id"],
                    )
                )
            if (
                demanda_ok
                and alvo_decisao is not None
                and demanda_de(alvo_decisao) is not None
                and demanda_de(alvo_decisao) != destino
            ):
                issues.append(
                    Issue(
                        "LIGACAO_INCONSISTENTE",
                        f"{base}.para",
                        f"ligação de '{d['id']}': '{alvo}' pertence à demanda '{demanda_de(alvo_decisao)}', não a '{destino}'",
                        d["id"],
                    )
                )
    return issues


# ----------------------------------------------------- dados, subtarefas e técnicas

_OPERADORES = ("igual", "diferente", "em", "maior_que", "maior_ou_igual", "menor_que", "menor_ou_igual")
_OPERADORES_NUMERICOS = ("maior_que", "maior_ou_igual", "menor_que", "menor_ou_igual")
_DOMINIO_BOOLEANO = ("sim", "nao")


def _donos(doc: Mapping[str, Any]) -> Iterable[tuple[str, Mapping[str, Any], str]]:
    """Nós e subtarefas, na ordem do documento: (caminho, item, id)."""
    for i, d in enumerate(doc["decisoes"]):
        yield f"decisoes[{i}]", d, d["id"]
        for k, sub in enumerate(d.get("subtarefas", [])):
            yield f"decisoes[{i}].subtarefas[{k}]", sub, sub["id"]


def _checar_termo(termo: Mapping[str, Any], variavel: Mapping[str, Any], path: str, item_id: str) -> list[Issue]:
    """CONDICAO_INVALIDA de um Termo cuja variável existe."""
    issues: list[Issue] = []
    var_id = variavel["id"]

    def invalido(caminho: str, texto: str) -> None:
        issues.append(Issue("CONDICAO_INVALIDA", caminho, f"condição de '{item_id}': {texto}", item_id))

    ops = [op for op in _OPERADORES if op in termo]
    if len(ops) != 1:
        quais = f" (encontrados: {', '.join(ops)})" if ops else ""
        invalido(path, f"o termo sobre '{var_id}' deve ter exatamente um operador entre {', '.join(_OPERADORES)}{quais}")
        return issues
    op = ops[0]
    tipo = variavel["tipo"]
    caminho = f"{path}.{op}"
    if op in _OPERADORES_NUMERICOS and tipo != "inteiro":
        invalido(caminho, f"o operador '{op}' só vale para variável inteira; '{var_id}' é {tipo}")
        return issues
    valor = termo[op]
    if op == "em":
        if not isinstance(valor, list) or not valor:
            invalido(caminho, f"'em' exige uma lista com ao menos um valor para '{var_id}'")
            return issues
        pares = [(f"{caminho}[{n}]", v) for n, v in enumerate(valor)]
    else:
        pares = [(caminho, valor)]
    dominio: list[str] | None = None
    if tipo == "booleano":
        dominio = list(_DOMINIO_BOOLEANO)
    elif tipo == "enum" and variavel.get("valores"):
        dominio = list(variavel["valores"])
    for caminho_v, v in pares:
        if tipo == "inteiro":
            compativel = isinstance(v, int) and not isinstance(v, bool)
        else:
            compativel = isinstance(v, str)
        if not compativel:
            invalido(caminho_v, f"o valor {v!r} é incompatível com o tipo {tipo} de '{var_id}'")
        elif dominio is not None and v not in dominio:
            detalhe = "valor de 'em' fora do domínio" if op == "em" else "valor fora do domínio"
            invalido(caminho_v, f"{detalhe}: {v!r} não está em {dominio} (variável '{var_id}')")
    return issues


def _checar_dados(doc: Mapping[str, Any]) -> list[Issue]:
    """Erros de subtarefas, artefatos, variáveis, entradas/saídas e usos de técnica."""
    issues: list[Issue] = []
    variaveis = {}
    for v in reversed(doc.get("variaveis", [])):
        variaveis[v["id"]] = v
    dados = set(variaveis) | {a["id"] for a in doc.get("artefatos", [])}
    tecnicas = {t["id"] for t in doc["tecnicas"]}

    for i, v in enumerate(doc.get("variaveis", [])):
        if v["tipo"] == "enum" and not v.get("valores"):
            issues.append(Issue("VARIAVEL_ENUM_SEM_VALORES", f"variaveis[{i}].valores",
                                f"a variável enum '{v['id']}' deve declarar `valores` com ao menos um item", v["id"]))

    def quebrada(path: str, alvo: str, onde: str, origem: str) -> None:
        issues.append(Issue("REF_QUEBRADA", path, f"'{origem}' referencia id inexistente '{alvo}' (esperado em {onde})", origem))

    papeis: set[str] = set()
    for i, pa in enumerate(doc.get("papeis", [])):
        if pa["id"] in papeis:
            issues.append(Issue("ID_DUPLICADO", f"papeis[{i}].id", f"id de papel '{pa['id']}' duplicado", pa["id"]))
        papeis.add(pa["id"])

    papeis_dest = {pa["id"] for pa in doc.get("papeis", [])}
    for i, art in enumerate(doc.get("artefatos", [])):
        for j, alvo in enumerate(art.get("destinatarios", [])):
            if alvo not in papeis_dest:
                quebrada(f"artefatos[{i}].destinatarios[{j}]", alvo, "papeis", art["id"])

    for i, r in enumerate(doc["raias"]):
        for j, alvo in enumerate(r.get("entradas", [])):
            if alvo not in dados:
                quebrada(f"raias[{i}].entradas[{j}]", alvo, "artefatos ou variaveis", r["id"])

    for i, d in enumerate(doc["decisoes"]):
        for campo in ("papel", "aprova"):
            if campo in d and d[campo] not in papeis:
                quebrada(f"decisoes[{i}].{campo}", d[campo], "papeis", d["id"])
        for campo in ("apoio", "consultado", "informado"):
            for j, alvo in enumerate(d.get(campo, [])):
                if alvo not in papeis:
                    quebrada(f"decisoes[{i}].{campo}[{j}]", alvo, "papeis", d["id"])
        subs = d.get("subtarefas")
        if subs is not None and d["tipo"] != "tarefa":
            issues.append(Issue("SUBTAREFA_EM_NAO_TAREFA", f"decisoes[{i}].subtarefas",
                                f"'{d['id']}' é do tipo '{d['tipo']}' mas declara `subtarefas`; só nós 'tarefa' têm subtarefas",
                                d["id"]))
        for k, sub in enumerate(subs or []):
            if "papel" in sub and sub["papel"] not in papeis:
                quebrada(f"decisoes[{i}].subtarefas[{k}].papel", sub["papel"], "papeis", sub["id"])
            for campo in ("apoio", "consultado", "informado"):
                for j, alvo in enumerate(sub.get(campo, [])):
                    if alvo not in papeis:
                        quebrada(f"decisoes[{i}].subtarefas[{k}].{campo}[{j}]", alvo, "papeis", sub["id"])
            if not re.fullmatch(rf"{re.escape(d['id'])}_st[1-9][0-9]*", sub["id"]):
                issues.append(Issue("SUBTAREFA_ID_PADRAO", f"decisoes[{i}].subtarefas[{k}].id",
                                    f"o id da subtarefa '{sub['id']}' deve ter a forma '{d['id']}_st<n>' (n inteiro a partir de 1)",
                                    sub["id"]))

    def condicao(quando: Mapping[str, Any], caminho: str, dono_id: str) -> None:
        chave = "todos" if "todos" in quando else "algum"
        for m, termo in enumerate(quando[chave]):
            caminho_t = f"{caminho}.{chave}[{m}]"
            variavel = variaveis.get(termo["var"])
            if variavel is None:
                quebrada(f"{caminho_t}.var", termo["var"], "variaveis", dono_id)
            else:
                issues.extend(_checar_termo(termo, variavel, caminho_t, dono_id))

    for base, dono, dono_id in _donos(doc):
        for campo in ("entradas", "saidas"):
            for j, alvo in enumerate(dono.get(campo, [])):
                if alvo not in dados:
                    quebrada(f"{base}.{campo}[{j}]", alvo, "artefatos ou variaveis", dono_id)
        for k, uso in enumerate(dono.get("tecnicas", [])):
            caminho = f"{base}.tecnicas[{k}]"
            if uso["tecnica"] not in tecnicas:
                quebrada(f"{caminho}.tecnica", uso["tecnica"], "tecnicas", dono_id)
            quando = uso.get("quando")
            if uso["uso"] == "condicional" and quando is None:
                issues.append(Issue("CONDICAO_AUSENTE", caminho,
                                    f"o uso condicional da técnica '{uso['tecnica']}' em '{dono_id}' exige `quando`", dono_id))
            if quando is not None:
                condicao(quando, f"{caminho}.quando", dono_id)
        # `quando` da subtarefa diz QUANDO executá-la (sem `quando`, sempre executa).
        if "quando" in dono and base.endswith("]") and ".subtarefas[" in base:
            condicao(dono["quando"], f"{base}.quando", dono_id)

    # Perguntas e ritos: ids únicos, referências e condições de tailoring.
    perguntas = {}
    for colecao in ("perguntas", "ritos"):
        vistos_ids: set[str] = set()
        for i, item in enumerate(doc.get(colecao, [])):
            if item["id"] in vistos_ids:
                issues.append(Issue("ID_DUPLICADO", f"{colecao}[{i}].id", f"id '{item['id']}' duplicado em {colecao}", item["id"]))
            vistos_ids.add(item["id"])
        if colecao == "perguntas":
            perguntas = vistos_ids
        else:
            ritos_ids = vistos_ids
    nos_e_subs = {d_["id"] for d_ in doc["decisoes"]} | {s_["id"] for d_ in doc["decisoes"] for s_ in d_.get("subtarefas", [])}
    for i, pb in enumerate(doc.get("playbooks", [])):
        for j, alvo in enumerate(pb.get("perguntas_chave", [])):
            if alvo not in perguntas:
                quebrada(f"playbooks[{i}].perguntas_chave[{j}]", alvo, "perguntas", pb["id"])

    def raci_refs(item: Mapping[str, Any], base: str) -> None:
        for campo in ("papel", "aprova"):
            if item.get(campo) and item[campo] not in papeis:
                quebrada(f"{base}.{campo}", item[campo], "papeis", item["id"])
        for campo in ("apoio", "consultado", "informado"):
            for j, alvo in enumerate(item.get(campo, [])):
                if alvo not in papeis:
                    quebrada(f"{base}.{campo}[{j}]", alvo, "papeis", item["id"])

    for i, pq in enumerate(doc.get("perguntas", [])):
        base = f"perguntas[{i}]"
        for j, alvo in enumerate(pq.get("depende_de", [])):
            if alvo not in nos_e_subs and alvo not in tecnicas and alvo not in ritos_ids:
                quebrada(f"{base}.depende_de[{j}]", alvo, "decisoes, subtarefas, tecnicas ou ritos", pq["id"])
        raci_refs(pq, base)
        if pq.get("quando"):
            condicao(pq["quando"], f"{base}.quando", pq["id"])
    for i, rt in enumerate(doc.get("ritos", [])):
        base = f"ritos[{i}]"
        for campo, alvos, onde in (("acontece_em", nos_e_subs, "decisoes"), ("perguntas", perguntas, "perguntas"),
                                   ("tecnicas", tecnicas, "tecnicas"), ("entradas", dados, "artefatos ou variaveis"),
                                   ("saidas", dados, "artefatos ou variaveis")):
            for j, alvo in enumerate(rt.get(campo, [])):
                if alvo not in alvos:
                    quebrada(f"{base}.{campo}[{j}]", alvo, onde, rt["id"])
        if rt.get("seguinte") and rt["seguinte"] not in ritos_ids:
            quebrada(f"{base}.seguinte", rt["seguinte"], "ritos", rt["id"])
        raci_refs(rt, base)
        if rt.get("quando"):
            condicao(rt["quando"], f"{base}.quando", rt["id"])

    # Variantes de artefato: nomes únicos por artefato e condições válidas.
    for i, art in enumerate(doc.get("artefatos", [])):
        vistos: set[str] = set()
        for k, var in enumerate(art.get("variantes", [])):
            if var["nome"] in vistos:
                issues.append(Issue("VARIANTE_DUPLICADA", f"artefatos[{i}].variantes[{k}].nome",
                                    f"o artefato '{art['id']}' repete o nome de variante '{var['nome']}'", art["id"]))
            vistos.add(var["nome"])
            condicao(var["quando"], f"artefatos[{i}].variantes[{k}].quando", art["id"])
    return issues


def _checar_avisos(doc: Mapping[str, Any]) -> list[Issue]:
    """Avisos de fluxo de dados. Só olham onde o autor declarou os campos (adoção progressiva).

    Documento sem `variaveis`, `entradas` e `saidas` não produz nenhum aviso.
    """
    avisos: list[Issue] = []

    def aviso(code: str, path: str, texto: str, item_id: str) -> None:
        avisos.append(Issue(code, path, texto, item_id, "aviso"))

    # VAR_NAO_DECLARADA: só quando a coleção `variaveis` existe e não está vazia.
    declaradas = {v["id"] for v in doc.get("variaveis", [])}
    if declaradas:
        for i, d in enumerate(doc["decisoes"]):
            for chave in d.get("estado", {}):
                if chave not in declaradas:
                    aviso("VAR_NAO_DECLARADA", f"decisoes[{i}].estado.{chave}",
                          f"a chave de estado '{chave}' de '{d['id']}' não existe em `variaveis`", d["id"])

    catalogo = declaradas | {a["id"] for a in doc.get("artefatos", [])}
    por_id: dict[str, Mapping[str, Any]] = {}
    for d in reversed(doc["decisoes"]):
        por_id[d["id"]] = d
    raia_por_id = {r["id"]: r for r in reversed(doc["raias"])}
    nos_da_raia: dict[str, list[Mapping[str, Any]]] = {}
    for d in doc["decisoes"]:
        nos_da_raia.setdefault(d["raia"], []).append(d)

    def producao(no: Mapping[str, Any]) -> set[str]:
        """O que o nó entrega ao fluxo: suas `saidas` e, numa `chamada`, os retornos da raia chamada."""
        saida = set(no.get("saidas", []))
        if no["tipo"] == "chamada":
            for x in nos_da_raia.get(no.get("raia_chamada", ""), []):
                if x["tipo"] == "fim":
                    saida |= set(x.get("saidas", []))
        return saida

    # Antecessores por alcançabilidade dentro da raia (arestas `proximo` entre nós da mesma raia).
    antecessores: dict[str, set[str]] = {}
    for raia, nos in nos_da_raia.items():
        ids = {n["id"] for n in nos}
        reverso: dict[str, set[str]] = {n["id"]: set() for n in nos}
        for n in nos:
            for t in n["proximo"]:
                if t["para"] in ids:
                    reverso[t["para"]].add(n["id"])
        for n in nos:
            visto: set[str] = set()
            fila = deque(reverso[n["id"]])
            while fila:
                atual = fila.popleft()
                if atual in visto:
                    continue
                visto.add(atual)
                fila.extend(reverso[atual])
            visto.discard(n["id"])
            antecessores[n["id"]] = visto

    for i, d in enumerate(doc["decisoes"]):
        raia = raia_por_id.get(d["raia"])
        entradas = d.get("entradas", [])
        if entradas and raia is not None:
            disponivel = set(raia.get("entradas", []))
            for a in antecessores.get(d["id"], ()):
                disponivel |= producao(por_id[a])
            for j, alvo in enumerate(entradas):
                if alvo in catalogo and alvo not in disponivel:
                    aviso("ENTRADA_SEM_PRODUTOR", f"decisoes[{i}].entradas[{j}]",
                          f"a entrada '{alvo}' de '{d['id']}' não está nas `entradas` da raia '{d['raia']}' "
                          "nem nas `saidas` de um nó que a antecede na raia", d["id"])
        subs = d.get("subtarefas", [])
        if d["tipo"] == "tarefa" and subs:
            disponivel = set(entradas)
            for k, sub in enumerate(subs):
                for j, alvo in enumerate(sub.get("entradas", [])):
                    if alvo in catalogo and alvo not in disponivel:
                        aviso("ENTRADA_SEM_PRODUTOR", f"decisoes[{i}].subtarefas[{k}].entradas[{j}]",
                              f"a entrada '{alvo}' de '{sub['id']}' não está nas `entradas` da tarefa '{d['id']}' "
                              "nem nas `saidas` de uma subtarefa anterior", sub["id"])
                disponivel |= set(sub.get("saidas", []))
            entregue = set().union(*(set(sub.get("saidas", [])) for sub in subs))
            for j, alvo in enumerate(d.get("saidas", [])):
                if alvo not in entregue:
                    aviso("SAIDA_NAO_ENTREGUE", f"decisoes[{i}].saidas[{j}]",
                          f"a saída '{alvo}' da tarefa '{d['id']}' não é produzida por nenhuma de suas subtarefas", d["id"])

    # ITEM_SEM_USO: artefato ou variável que nada referencia (entradas, saidas, estado ou condição `quando`).
    usados: set[str] = set()
    for r in doc["raias"]:
        usados |= set(r.get("entradas", []))
    for _, dono, _ in _donos(doc):
        usados |= set(dono.get("entradas", [])) | set(dono.get("saidas", []))
        for uso in dono.get("tecnicas", []):
            quando = uso.get("quando") or {}
            for termo in quando.get("todos", []) + quando.get("algum", []):
                usados.add(termo["var"])
        quando = dono.get("quando") or {}  # `quando` da subtarefa
        for termo in quando.get("todos", []) + quando.get("algum", []):
            usados.add(termo["var"])
    for art in doc.get("artefatos", []):
        for var in art.get("variantes", []):
            quando = var.get("quando") or {}
            for termo in quando.get("todos", []) + quando.get("algum", []):
                usados.add(termo["var"])
    for d in doc["decisoes"]:
        usados |= set(d.get("estado", {}))
    for item in doc.get("ritos", []) + doc.get("perguntas", []):
        usados |= set(item.get("entradas", [])) | set(item.get("saidas", []))
        quando = item.get("quando") or {}
        for termo in quando.get("todos", []) + quando.get("algum", []):
            usados.add(termo["var"])
    for colecao in ("artefatos", "variaveis"):
        for i, item in enumerate(doc.get(colecao, [])):
            if item["id"] not in usados:
                aviso("ITEM_SEM_USO", f"{colecao}[{i}]",
                      f"'{item['id']}' não é referenciado por nenhum nó, subtarefa, raia, estado ou condição "
                      "(some da aba Catálogo)", item["id"])


    # Entregável obrigatório: toda tarefa e toda subtarefa entrega ao menos um ARTEFATO (variável não conta).
    # Adoção progressiva: só vale nas raias em que a raia ou algum nó declarou `entradas`, `saidas` ou `subtarefas`.
    artefatos = {a["id"] for a in doc.get("artefatos", [])}
    em_adocao = {r["id"] for r in doc["raias"] if "entradas" in r or "saidas" in r or "subtarefas" in r}
    for d in doc["decisoes"]:
        if any(c in d for c in ("entradas", "saidas", "subtarefas")):
            em_adocao.add(d["raia"])
    for i, d in enumerate(doc["decisoes"]):
        if d["tipo"] != "tarefa" or d["raia"] not in em_adocao:
            continue
        subs = d.get("subtarefas", [])
        entregues = set(d.get("saidas", [])).union(*(set(sub.get("saidas", [])) for sub in subs))
        if not entregues & artefatos:
            aviso("TAREFA_SEM_ENTREGAVEL", f"decisoes[{i}]",
                  f"a tarefa '{d['id']}' não entrega nenhum artefato em `saidas` (nem nas subtarefas); "
                  "toda tarefa precisa de ao menos um artefato (use tipo `acao` para algo que se faz sem objeto durável)",
                  d["id"])
        for k, sub in enumerate(subs):
            if not set(sub.get("saidas", [])) & artefatos:
                aviso("SUBTAREFA_SEM_ENTREGAVEL", f"decisoes[{i}].subtarefas[{k}]",
                      f"a subtarefa '{sub['id']}' não tem nenhum artefato em `saidas`", sub["id"])

    # SEM_PAPEL: com o catálogo `papeis` declarado, toda tarefa tem papel (no nó ou nas subtarefas), todo gateway tem
    # quem decide e toda subtarefa tem papel.
    if doc.get("papeis"):
        for i, d in enumerate(doc["decisoes"]):
            subs = d.get("subtarefas", [])
            if d["tipo"] == "tarefa" and not d.get("papel") and not any(sub.get("papel") for sub in subs):
                aviso("SEM_PAPEL", f"decisoes[{i}]", f"a tarefa '{d['id']}' não tem `papel` nem subtarefas com papel", d["id"])
            if d["tipo"] == "bifurcacao" and not d.get("papel"):
                aviso("SEM_PAPEL", f"decisoes[{i}]", f"o gateway '{d['id']}' não declara o `papel` que decide", d["id"])
            for k, sub in enumerate(subs):
                if not sub.get("papel"):
                    aviso("SEM_PAPEL", f"decisoes[{i}].subtarefas[{k}]", f"a subtarefa '{sub['id']}' não tem `papel`", sub["id"])

        # RACI: A só em gateway e diferente de quem decide; um papel não é R e C, nem I e outra letra, no mesmo item.
        def raci(item: Mapping[str, Any], path: str, item_id: str) -> None:
            r = ({item.get("papel")} | set(item.get("apoio", []))) - {None}
            c = set(item.get("consultado", []))
            inf = set(item.get("informado", []))
            a = {item["aprova"]} if item.get("aprova") else set()
            for pid in sorted(a & set(item.get("apoio", []))):
                aviso("RACI_CONFLITO", path, f"'{item_id}': o papel '{pid}' aprova e também está no apoio; deixe só em `aprova`", item_id)
            for pid in sorted(r & c):
                aviso("RACI_CONFLITO", path, f"'{item_id}': o papel '{pid}' é responsável e consultado ao mesmo tempo", item_id)
            for pid in sorted(inf & (r | c | a)):
                aviso("RACI_CONFLITO", path, f"'{item_id}': o papel '{pid}' é informado e também tem outra letra no RACI", item_id)

        # Perguntas: cada uma diz o que a responde e é citada por algum playbook ou rito.
        citadas = {x for pb in doc.get("playbooks", []) for x in pb.get("perguntas_chave", [])} | {
            x for rt in doc.get("ritos", []) for x in rt.get("perguntas", [])}
        for i, pq in enumerate(doc.get("perguntas", [])):
            if not pq.get("depende_de"):
                aviso("PERGUNTA_SEM_DEPENDENCIA", f"perguntas[{i}]", f"a pergunta '{pq['id']}' não diz o que a responde (`depende_de`)", pq["id"])
            if pq["id"] not in citadas:
                aviso("PERGUNTA_SEM_USO", f"perguntas[{i}]", f"a pergunta '{pq['id']}' não é citada por nenhum playbook nem rito", pq["id"])
            raci(pq, f"perguntas[{i}]", pq["id"])
        for i, rt in enumerate(doc.get("ritos", [])):
            if not rt.get("papel"):
                aviso("SEM_PAPEL", f"ritos[{i}]", f"o rito '{rt['id']}' não declara quem facilita (`papel`)", rt["id"])
            raci(rt, f"ritos[{i}]", rt["id"])

        for i, d in enumerate(doc["decisoes"]):
            if d.get("aprova"):
                if d["tipo"] != "bifurcacao":
                    aviso("APROVA_FORA_DE_GATEWAY", f"decisoes[{i}].aprova",
                          f"'{d['id']}' declara `aprova`, mas a aprovação só existe nos gateways de qualidade", d["id"])
                elif d["aprova"] == d.get("papel"):
                    aviso("APROVA_REDUNDANTE", f"decisoes[{i}].aprova",
                          f"o gateway '{d['id']}' aprova com o mesmo papel que decide; omita `aprova`", d["id"])
            raci(d, f"decisoes[{i}]", d["id"])
            for k, sub in enumerate(d.get("subtarefas", [])):
                raci(sub, f"decisoes[{i}].subtarefas[{k}]", sub["id"])
    return avisos


def _checar_completude(doc: Mapping[str, Any]) -> list[Issue]:
    """Completude do guia (avisos): LACUNA_DE_DADOS, COMUNICACAO_SEM_DESTINATARIO, PLAYBOOK_SEM_NO e a taxonomia.

    São regras do conteúdo completo, não da estrutura: um documento parcial (um trecho de fluxo, uma fixture) tem
    entradas que vêm de fora e saídas que vão para fora. Por isso só valem com `completude=True`, ligado na CLI.
    """
    from guia_decisao.rastreio import lacunas_de_dados

    issues: list[Issue] = []

    def aviso(code: str, path: str, msg: str, item_id: str) -> None:
        issues.append(Issue(code, path, msg, item_id, nivel="aviso"))

    from guia_decisao.taxonomia import SUBTIPOS, TIPOS, e_comunicacao

    for i, art in enumerate(doc.get("artefatos", [])):
        if e_comunicacao(art) and not art.get("destinatarios"):
            aviso("COMUNICACAO_SEM_DESTINATARIO", f"artefatos[{i}]",
                  f"a comunicação '{art['id']}' não declara `destinatarios` (papéis que a recebem)", art["id"])
        tipo, subtipo = art.get("tipo"), art.get("subtipo")
        if tipo and tipo not in TIPOS:
            aviso("TIPO_LEGADO", f"artefatos[{i}].tipo", f"'{art['id']}' usa o tipo legado '{tipo}'; use a taxonomia nova "
                  "(card, comunicação e configuração são subtipos de ação; dado é documento)", art["id"])
        elif tipo in SUBTIPOS and not subtipo:
            aviso("SUBTIPO_AUSENTE", f"artefatos[{i}]", f"'{art['id']}' é do tipo '{tipo}' e não declara `subtipo` "
                  f"({', '.join(SUBTIPOS[tipo])})", art["id"])
        elif tipo in SUBTIPOS and subtipo not in SUBTIPOS[tipo]:
            aviso("SUBTIPO_INVALIDO", f"artefatos[{i}].subtipo", f"o subtipo '{subtipo}' de '{art['id']}' não existe no tipo "
                  f"'{tipo}' ({', '.join(SUBTIPOS[tipo])})", art["id"])
        elif tipo and tipo not in SUBTIPOS and subtipo:
            aviso("SUBTIPO_INVALIDO", f"artefatos[{i}].subtipo", f"o tipo '{tipo}' de '{art['id']}' não tem subtipos", art["id"])
    # PLAYBOOK_SEM_NO: playbook que nenhum nó usa não aparece no guia; funda o conteúdo no playbook do nó e remova.
    usados_pb = {d_.get("playbook") for d_ in doc.get("decisoes", [])}
    for i, pb in enumerate(doc.get("playbooks", [])):
        if pb["id"] not in usados_pb:
            aviso("PLAYBOOK_SEM_NO", f"playbooks[{i}]", f"o playbook '{pb['id']}' não é usado por nenhum nó; funda o conteúdo "
                  "no playbook do nó correspondente e remova", pb["id"])
    lacunas = lacunas_de_dados(doc)
    for colecao in ("artefatos", "variaveis"):
        for i, item in enumerate(doc.get(colecao, [])):
            falta = lacunas.get(item["id"])
            # item sem nenhum uso já recebe ITEM_SEM_USO; aqui só quem participa do fluxo de dados
            if falta:
                aviso("LACUNA_DE_DADOS", f"{colecao}[{i}]",
                      f"'{item['id']}' está sem {' e sem '.join(falta)}: declare quem produz e quem consome "
                      "(entradas, saídas, condição ou destinatários)", item["id"])
    return issues


def validate(doc: Mapping[str, Any], schema: Mapping[str, Any], *, avisos: bool = False, completude: bool = False) -> list[Issue]:
    """Valida `doc` contra `schema` e as regras de integridade. Função pura.

    Ordem: 1 schema (se houver erro, devolve só esses), 2 unicidade de id,
    3 destinos de Transicao, 4 gateways com ao menos duas saídas,
    5 regras de raias (início/fim, transição entre raias, chamadas, ciclos, retornos, orquestradora, cores, ids),
    5b alcançabilidade por busca em largura, por raia, a partir do `inicio` da própria raia, 6 soma de pesos igual a 1
    (tolerância 1e-9), 7 referências cruzadas (inclui Fonte_Estudo.itens, `fonte_ids` dos itens conceituais
    e `ligacoes` entre demandas, com LIGACAO_INCONSISTENTE para destino fora da `demanda_destino` ou ligação para a própria demanda).
    Ligações e chamadas não entram na busca em largura do passo 5b.
    Passos novos: 1b ids duplicados de artefatos, variáveis e subtarefas, e 7b erros de dados (subtarefas, entradas e
    saídas, usos de técnica e condições). Com `avisos=True`, acrescenta ao fim os avisos (`nivel="aviso"`) de fluxo de
    dados (VAR_NAO_DECLARADA, ENTRADA_SEM_PRODUTOR, SAIDA_NAO_ENTREGUE, ITEM_SEM_USO, TAREFA_SEM_ENTREGAVEL,
    SUBTAREFA_SEM_ENTREGAVEL); por padrão a função devolve só erros, então quem
    trata "lista vazia" como "válido" (geradores) não falha por causa de avisos.
    Datas `datetime.date` são normalizadas para texto ISO numa cópia (ver
    docstring do módulo); `doc` não é alterado.
    """
    normalizado = _normalizar_datas(doc)
    erros_schema = _checar_schema(normalizado, schema)
    if erros_schema:
        return erros_schema

    issues: list[Issue] = []
    issues += _checar_ids_unicos(normalizado)
    issues += _checar_ids_dados(normalizado)
    issues += _checar_transicoes(normalizado)
    issues += _checar_bifurcacoes(normalizado)
    issues += _checar_raias(normalizado)
    issues += _checar_alcancabilidade(normalizado)
    issues += _checar_pesos(normalizado)
    issues += _checar_referencias(normalizado)
    issues += _checar_dados(normalizado)
    if avisos:
        issues += _checar_avisos(normalizado)
    if avisos and completude:
        issues += _checar_completude(normalizado)
    return issues
