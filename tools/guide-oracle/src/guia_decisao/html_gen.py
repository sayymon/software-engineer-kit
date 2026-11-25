"""Prévia HTML offline do Guia: um único arquivo, sem rede em runtime.

O arquivo embute o Mermaid fixado em `site/public/vendor/mermaid/mermaid.min.js` (versão e sha256 em
`assets/README.txt`), os diagramas de todas as demandas e os playbooks como JSON.
O JSON usa `ensure_ascii` e escapa `<`, `>` e `&`, então nada do documento vira
marcação. O texto dos playbooks entra na página por `textContent`.

Interface: seletor de demanda, abas (Visão, uma por Raia, Completo, Catálogo) com a cor de cada
raia (o título é só o nome da raia), botão Voltar, UMA legenda compacta e colapsável (letras
e formas, padrão de id e prefixo da demanda; as raias se explicam pelo título, pela aba e pelo
tooltip), zoom, rolagem horizontal e um modal central com o playbook do nó clicado. A aba "Catálogo"
(artefatos, variáveis, nós e subtarefas, com filtros por raia e categoria) abre o mesmo modal com os detalhes.
Os diagramas embutidos não levam a subgraph de legenda (`legenda=False`). Nos nós
`chamada` e `fim` o modal oferece a navegação entre raias e, nas ligações, entre demandas.
"""

from __future__ import annotations

import html as _html
import json
from collections.abc import Mapping
from pathlib import Path
from typing import Any

from guia_decisao.mermaid_gen import (
    COMPLETO,
    PREFIXO_RAIA,
    VISAO,
    GeracaoError,
    cor_texto,
    cor_valida,
    gerar_diagrama,
    id_subgraph,
    nome_arquivo,
    raias_ordenadas,
    sem_travessoes,
    subtarefas_do_no,
    visoes_da_demanda,
)
from guia_decisao.paths import MERMAID_JS
from guia_decisao.taxonomia import e_comunicacao, rotulo_subtipo
from guia_decisao.ordem import chave_natural, contextos_das_demandas, demandas_biblioteca, ordem_fluxo, ordenar_natural
from guia_decisao.rastreio import descrever_condicao, rastrear_dados, usos_em_condicoes, lacunas_de_dados

CAMINHO_MERMAID = MERMAID_JS

_COLECOES_REFERENCIA = ("tecnicas", "abordagens", "padroes", "estrategias", "categorias_ferramenta")
_ROTULO_REFERENCIA = {
    "tecnicas": "Técnica",
    "abordagens": "Abordagem",
    "padroes": "Padrão",
    "estrategias": "Estratégia",
    "categorias_ferramenta": "Categoria de ferramenta",
}
_ROTULO_GRUPO = {
    "abordagens": "Abordagens",
    "tecnicas": "Técnicas",
    "padroes": "Padrões",
    "estrategias": "Estratégias",
    "categorias_ferramenta": "Categorias de ferramenta",
}
# Ordem de exibição: do mais abstrato ao mais concreto.
_ORDEM_REFERENCIAS = ("abordagens", "tecnicas", "padroes", "estrategias", "categorias_ferramenta")
_CHAVES_SEM_LIMPEZA = frozenset(
    {
        "id", "ids", "mapa", "raia", "demanda", "playbook", "tipo", "cor", "texto_cor", "mmd", "arquivo",
        "aba", "inicio", "para", "raia_chamada", "colecao", "demanda_destino", "chamadas", "chamadores",
        "mmd_sub", "mapa_sub", "tecnica", "tarefa", "anterior", "proxima", "entradas", "saidas", "subtarefas",
        "uso", "responsavel", "classe", "tipo_item", "tarefa_da_subtarefa", "produzido_por", "consumido_por",
        "lacunas", "demandas", "origem", "condicional",
        "categoria", "pai",
    }
)


# ------------------------------------------------------------------- dados


def _limpa(valor: Any, chave: str = "") -> Any:
    """Remove travessões dos textos (menos ids e campos técnicos)."""
    if isinstance(valor, str):
        return valor if chave in _CHAVES_SEM_LIMPEZA else sem_travessoes(valor)
    if isinstance(valor, Mapping):
        return {str(k): _limpa(v, str(k)) for k, v in valor.items()}
    if isinstance(valor, (list, tuple)):
        return [_limpa(v, chave) for v in valor]
    return valor


def _lista(doc: Mapping[str, Any], colecao: str) -> list[Mapping[str, Any]]:
    return [x for x in (doc.get(colecao) or []) if isinstance(x, Mapping) and "id" in x]


# Relação do papel com o item -> letra do RACI (apoio também executa: R).
LETRA_RACI = {"responsavel": "R", "apoio": "R", "aprova": "A", "consultado": "C", "informado": "I"}

_TITULOS_RESERVADOS = frozenset({"Visão", "Completo", "Catálogo"})
CATALOGO = "catalogo"  # id da aba com artefatos, variáveis, nós e subtarefas


def _titulo_visao(visao: str, nome_raia: str | None, desambiguar: bool = False) -> str:
    """Título da aba: "Visão", "Completo" ou só o nome da raia (com o id se houver conflito)."""
    if visao == VISAO:
        return "Visão"
    if visao == COMPLETO:
        return "Completo"
    nome = str(nome_raia)
    return f"{nome} ({visao[len(PREFIXO_RAIA):]})" if desambiguar else nome


def montar_dados(doc: Mapping[str, Any]) -> dict[str, Any]:
    """Estrutura embutida no HTML (JSON). Determinística."""
    raias_por_id = {str(r["id"]): r for r in _lista(doc, "raias")}
    if not raias_por_id:
        raise GeracaoError(
            "o documento não tem a coleção `raias`: remodele os fluxos para o padrão de raias antes de gerar o HTML"
        )

    libs = demandas_biblioteca(doc)
    contextos = contextos_das_demandas(doc)  # demanda -> raias próprias e as de biblioteca que ela chama

    def dems_da_raia(rid: str) -> list[str]:
        """Demandas em cujo diagrama a raia aparece (a dona, ou quem chama a raia de biblioteca)."""
        return [did_ for did_, ids_ in contextos.items() if rid in ids_]

    demandas = []
    for d in _lista(doc, "demandas"):  # ordem de declaração no YAML, sem ordenar por id
        did = str(d["id"])
        if did in libs or not any(r.get("demanda") == did for r in raias_por_id.values()):
            continue
        # Orquestradora primeiro, depois na ordem em que é chamada, depois as não alcançadas.
        raias = [raias_por_id[rid] for rid in raias_ordenadas(doc, did)]
        visoes = []
        nomes_raia = [str(r.get("nome") or r["id"]) for r in raias]
        for v in visoes_da_demanda(doc, did):
            diag = gerar_diagrama(doc, did, v, legenda=False)
            diag_sub = gerar_diagrama(doc, did, v, legenda=False, subtarefas=True)
            tem_sub = diag_sub.texto != diag.texto  # só há variante expandida se a aba tem subtarefas
            nome_raia = None
            dica = ""
            conflito = False
            if v.startswith(PREFIXO_RAIA):
                raia_v = raias_por_id[v[len(PREFIXO_RAIA):]]
                nome_raia = str(raia_v.get("nome") or raia_v["id"])
                conflito = nome_raia in _TITULOS_RESERVADOS or nomes_raia.count(nome_raia) > 1
                dica = nome_raia + (": " + str(raia_v["responsabilidade"]) if raia_v.get("responsabilidade") else "")
            visoes.append(
                {
                    "id": v,
                    "titulo": _titulo_visao(v, nome_raia, conflito),
                    "dica": dica,
                    "arquivo": nome_arquivo(did, v),
                    "mmd": diag.texto,
                    "mapa": dict(diag.mapa_ids),
                    "mmd_sub": diag_sub.texto if tem_sub else "",
                    "mapa_sub": dict(diag_sub.mapa_ids) if tem_sub else {},
                }
            )
        demandas.append(
            {
                "id": did,
                "nome": str(d.get("nome") or did),
                "sigla": str(d.get("sigla") or did.upper()),
                "raias": [
                    {
                        "id": str(r["id"]),
                        "nome": str(r.get("nome") or r["id"]),
                        "responsabilidade": str(r.get("responsabilidade") or ""),
                        "cor": cor_valida(r.get("cor")),
                        "texto_cor": cor_texto(cor_valida(r.get("cor"))),
                        "orquestradora": r.get("orquestradora") is True,
                    }
                    for r in raias
                ],
                "subgraphs": {id_subgraph(str(r["id"])): str(r["id"]) for r in raias},
                # bibliotecas de raias comuns que a demanda chama (para a legenda explicar o prefixo delas)
                "bibliotecas": [
                    {"sigla": str(b.get("sigla") or b["id"]), "nome": str(b.get("nome") or b["id"])}
                    for b in _lista(doc, "demandas")
                    if str(b["id"]) in libs and any(r.get("demanda") == b["id"] for r in raias)
                ],
                "visoes": visoes,
            }
        )
    if not demandas:
        raise GeracaoError("nenhuma demanda tem raias: nada a gerar")

    catalogo: dict[str, dict[str, str]] = {}
    todos_ids: set[str] = set()
    for colecao, valor in doc.items():
        if isinstance(valor, list):
            itens = [x for x in valor if isinstance(x, Mapping) and "id" in x]
            if itens:
                todos_ids.update(str(x["id"]) for x in itens)
                if colecao in _COLECOES_REFERENCIA:
                    catalogo[colecao] = {str(x["id"]): str(x.get("nome") or x["id"]) for x in itens}

    rotulos = {str(n["id"]): str(n.get("rotulo") or n["id"]) for n in _lista(doc, "decisoes")}
    # Nó de raia de biblioteca não tem demanda única: `demanda` fica vazia e `demandas` lista quem o mostra.
    demanda_de = {
        str(n["id"]): str(n.get("demanda") or raias_por_id.get(str(n.get("raia")), {}).get("demanda") or "")
        for n in _lista(doc, "decisoes")
    }
    demanda_de = {k: ("" if v in libs else v) for k, v in demanda_de.items()}
    nomes_demanda = {str(d["id"]): str(d.get("nome") or d["id"]) for d in _lista(doc, "demandas")}
    nomes_tecnica = catalogo.get("tecnicas", {})

    nome_do_papel = {str(p["id"]): str(p.get("nome") or p["id"]) for p in _lista(doc, "papeis")}
    # Catálogo de artefatos e variáveis (chips do modal e aba Catálogo). O artefato prevalece em id repetido.
    dados_cat: dict[str, dict[str, Any]] = {}
    for colecao, classe in (("variaveis", "variavel"), ("artefatos", "artefato")):
        for it in _lista(doc, colecao):
            dados_cat[str(it["id"])] = {
                "id": str(it["id"]),
                "classe": classe,
                "tipo": str(it.get("tipo") or ""),
                "subtipo": rotulo_subtipo(it.get("tipo"), it.get("subtipo")),
                "variantes": [
                    {
                        "nome": str(v.get("nome") or ""),
                        "descricao": str(v.get("descricao") or ""),
                        "quando": descrever_condicao(v.get("quando")),
                        "exemplo": str(v.get("exemplo") or ""),
                    }
                    for v in it.get("variantes") or []
                    if isinstance(v, Mapping)
                ],
                "nome": str(it.get("nome") or it["id"]),
                "descricao": str(it.get("descricao") or ""),
                "exemplo": str(it.get("exemplo") or ""),
                "valores": [str(v) for v in it.get("valores") or []],
                "inicial": it.get("inicial"),
                "destinatarios": [nome_do_papel.get(str(x), str(x)) for x in it.get("destinatarios") or []],
            }

    def ids_lista(valor: Any) -> list[str]:
        return [str(x) for x in valor or [] if isinstance(x, (str, int))]

    def usos(valor: Any) -> list[dict[str, str]]:
        return [
            {
                "tecnica": str(u.get("tecnica") or ""),
                "nome": nomes_tecnica.get(str(u.get("tecnica")), str(u.get("tecnica") or "")),
                "uso": str(u.get("uso") or ""),
                "quando": descrever_condicao(u.get("quando")),
                "porque": str(u.get("porque") or ""),
            }
            for u in valor or []
            if isinstance(u, Mapping)
        ]

    def aba_do_no(n: Mapping[str, Any]) -> str:
        raia = raias_por_id.get(str(n.get("raia")), {})
        return VISAO if raia.get("orquestradora") is True else PREFIXO_RAIA + str(n.get("raia") or "")

    nome_papel = {str(p["id"]): str(p.get("nome") or p["id"]) for p in _lista(doc, "papeis")}

    destinatarios_de = {str(a["id"]): [str(x) for x in a.get("destinatarios") or []]
                        for a in _lista(doc, "artefatos") if e_comunicacao(a)}

    def papeis_de(item: Mapping[str, Any]) -> list[dict[str, str]]:
        """RACI do nó ou da subtarefa, sem repetir papel: responsável e apoio (R), aprova (A), consultado (C) e
        informado (I). O informado inclui os destinatários dos comunicados que o item produz (`via`)."""
        out: list[dict[str, str]] = []
        vistos: set[str] = set()

        def add(pid: Any, rel: str, via: str = "") -> None:
            if pid and str(pid) not in vistos:
                vistos.add(str(pid))
                out.append({"id": str(pid), "relacao": rel, "via": via})

        add(item.get("papel"), "responsavel")
        add(item.get("aprova"), "aprova")  # A vem antes do apoio: um papel que aprova não aparece como R
        for x in item.get("apoio") or []:
            add(x, "apoio")
        for x in item.get("consultado") or []:
            add(x, "consultado")
        for x in item.get("informado") or []:
            add(x, "informado")
        # só tarefas e subtarefas comunicam; fins e chamadas apenas repassam as saídas
        for art in (item.get("saidas") or []) if item.get("tipo") in (None, "tarefa") else []:
            for x in destinatarios_de.get(str(art), []):
                add(x, "informado", str(art))
        return out

    exemplo_de = {str(p["id"]): str(p.get("exemplo") or "") for p in _lista(doc, "playbooks")}
    nos = {}
    subs: dict[str, dict[str, Any]] = {}
    for n in sorted(_lista(doc, "decisoes"), key=lambda x: chave_natural(x["id"])):
        lista_sub = subtarefas_do_no(n)
        for k, sub in enumerate(lista_sub):
            subs[str(sub["id"])] = {
                "id": str(sub["id"]),
                "tarefa": str(n["id"]),
                "indice": k + 1,
                "total": len(lista_sub),
                "rotulo": str(sub.get("rotulo") or sub["id"]),
                "descricao": str(sub.get("descricao") or ""),
                "exemplo": str(sub.get("exemplo") or ""),
                "condicional": bool(sub.get("quando")),
                "quando": descrever_condicao(sub.get("quando")),
                "porque": str(sub.get("porque") or ""),
                "responsavel": str(sub.get("responsavel") or ""),
                "papel": nome_papel.get(str(sub.get("papel") or ""), str(sub.get("papel") or "")),
                "papeis": papeis_de(sub),
                "apoio": [nome_papel.get(str(x), str(x)) for x in (sub.get("apoio") or [])],
                "entradas": ids_lista(sub.get("entradas")),
                "saidas": ids_lista(sub.get("saidas")),
                "tecnicas": usos(sub.get("tecnicas")),
                "raia": str(n.get("raia") or ""),
                "demanda": demanda_de[str(n["id"])],
                "demandas": dems_da_raia(str(n.get("raia") or "")),
                "aba": aba_do_no(n),
                "anterior": str(lista_sub[k - 1]["id"]) if k > 0 else "",
                "proxima": str(lista_sub[k + 1]["id"]) if k + 1 < len(lista_sub) else "",
            }
        nos[str(n["id"])] = {
            "id": str(n["id"]),
            "rotulo": rotulos[str(n["id"])],
            "tipo": str(n.get("tipo") or ""),
            "raia": str(n.get("raia") or ""),
            "demanda": demanda_de[str(n["id"])],
            "demandas": dems_da_raia(str(n.get("raia") or "")),
            "aba": aba_do_no(n),
            "playbook": str(n["playbook"]) if n.get("playbook") else "",
            "exemplo": exemplo_de.get(str(n.get("playbook") or ""), ""),
            "retorno": str(n.get("retorno") or ""),
            "raia_chamada": str(n.get("raia_chamada") or ""),
            "entradas": ids_lista(n.get("entradas")),
            "saidas": ids_lista(n.get("saidas")),
            "tecnicas": usos(n.get("tecnicas")),
            "subtarefas": [str(x["id"]) for x in lista_sub],
            "papeis": papeis_de(n),
            "papeis_subtarefas": sorted({p["id"] for x in lista_sub for p in papeis_de(x)}),
            "letras_subtarefas": sorted({p["id"] + ":" + LETRA_RACI[p["relacao"]] for x in lista_sub for p in papeis_de(x)}),
            "transicoes": [
                {
                    "condicao": str(p.get("condicao") or ""),
                    "para": str(p.get("para") or ""),
                    "rotulo_destino": rotulos.get(str(p.get("para")), str(p.get("para") or "")),
                }
                for p in n.get("proximo") or []
                if isinstance(p, Mapping)
            ],
            "ligacoes": [
                {
                    "rotulo": str(lg.get("rotulo") or ""),
                    "tipo": str(lg.get("tipo") or ""),
                    "condicao": str(lg.get("condicao") or ""),
                    "demanda_destino": str(lg.get("demanda_destino") or ""),
                    "demanda_nome": nomes_demanda.get(str(lg.get("demanda_destino")), str(lg.get("demanda_destino") or "")),
                    "para": str(lg.get("para") or ""),
                    "para_rotulo": rotulos.get(str(lg.get("para")), str(lg.get("para") or "")),
                }
                for lg in n.get("ligacoes") or []
                if isinstance(lg, Mapping)
            ],
        }

    # Navegação por chamada: chamada -> raia chamada e id do início; raia -> nós chamadores.
    inicio_da_raia: dict[str, str] = {}
    for nid in ordenar_natural(nos):
        if nos[nid]["tipo"] == "inicio":
            inicio_da_raia.setdefault(nos[nid]["raia"], nid)
    for dem in demandas:
        chamadas: dict[str, dict[str, str]] = {}
        chamadores: dict[str, list[str]] = {}
        for nid in ordenar_natural(nos):
            n = nos[nid]
            if dem["id"] not in n["demandas"] or n["tipo"] != "chamada" or not n["raia_chamada"]:
                continue
            alvo = n["raia_chamada"]
            ini = inicio_da_raia.get(alvo, "")
            chamadas[nid] = {
                "raia_chamada": alvo,
                "inicio": ini,
                "aba": nos[ini]["aba"] if ini else PREFIXO_RAIA + alvo,
            }
            chamadores.setdefault(alvo, []).append(nid)
        dem["navegacao"] = {
            "chamadas": chamadas,
            "chamadores": chamadores,
            # tarefa -> subtarefas na ordem de execução, e subtarefa -> tarefa (ida e volta da navegação)
            "subtarefas": {nid: n["subtarefas"] for nid, n in nos.items() if dem["id"] in n["demandas"] and n["subtarefas"]},
            "tarefa_da_subtarefa": {sid: x["tarefa"] for sid, x in subs.items() if dem["id"] in x["demandas"]},
        }

    # Aba "Catálogo": artefatos, variáveis, nós e subtarefas da demanda, com quem produz e quem consome.
    def ref_de(rid: str) -> dict[str, Any] | None:
        if rid in subs:
            x = subs[rid]
            raia = raias_por_id.get(x["raia"], {})
            return {"id": rid, "tipo": "subtarefa", "rotulo": x["rotulo"], "raia": x["raia"], "demanda": x["demanda"],
                    "demandas": x["demandas"], "aba": x["aba"], "raia_nome": str(raia.get("nome") or x["raia"]), "sub": True}
        if rid in nos:
            x = nos[rid]
            raia = raias_por_id.get(x["raia"], {})
            return {"id": rid, "tipo": x["tipo"], "rotulo": x["rotulo"], "raia": x["raia"], "demanda": x["demanda"],
                    "demandas": x["demandas"], "aba": x["aba"], "raia_nome": str(raia.get("nome") or x["raia"]), "sub": False}
        if rid in raias_por_id:
            raia = raias_por_id[rid]
            return {"id": rid, "tipo": "raia", "rotulo": str(raia.get("nome") or rid), "raia": rid,
                    "demanda": "" if str(raia.get("demanda")) in libs else str(raia.get("demanda") or ""),
                    "demandas": dems_da_raia(rid), "aba": VISAO if raia.get("orquestradora") is True else PREFIXO_RAIA + rid,
                    "raia_nome": str(raia.get("nome") or rid), "sub": False}
        return None

    condicoes = usos_em_condicoes(doc)
    rastro = rastrear_dados(doc)
    lacunas_regra = lacunas_de_dados(doc)
    # Demandas que usam cada item: produtores e consumidores, chaves `estado` dos nós e condições `quando` de técnicas e
    # subtarefas. Uma variável citada na condição de uma variante pertence às demandas em que o artefato dono é usado.
    estado_de: dict[str, set[str]] = {}
    for n in _lista(doc, "decisoes"):
        if isinstance(n.get("estado"), Mapping):
            for chave in n["estado"]:
                estado_de.setdefault(str(chave), set()).update(dems_da_raia(str(n.get("raia") or "")))

    def refs_de(ids: list[str]) -> list[dict[str, Any]]:
        return [r for r in (ref_de(x) for x in ids) if r]

    base_demandas: dict[str, set[str]] = {}
    for did_, info in rastro.items():
        base = {d for r in refs_de(info["produzido_por"]) + refs_de(info["consumido_por"]) for d in r["demandas"]}
        base_demandas[did_] = base | estado_de.get(did_, set())

    def conds_do_item(did_: str) -> list[dict[str, Any]]:
        out: list[dict[str, Any]] = []
        for c in condicoes.get(did_, []):
            base = {
                "origem": c["origem"],
                "tecnica": c["tecnica"],
                "nome_tecnica": nomes_tecnica.get(c["tecnica"], c["tecnica"]),
                "uso": c["uso"],
                "variante": c["variante"],
                "quando": c["quando"],
            }
            if c["origem"] == "variante":
                art = dados_cat.get(c["dono"], {})
                dono = {"id": c["dono"], "tipo": "artefato", "rotulo": art.get("nome", c["dono"]), "raia": "",
                        "demanda": "", "demandas": [], "aba": "", "raia_nome": "", "sub": False}
                demandas_c = sorted(base_demandas.get(c["dono"], set()) - {""})
            else:
                dono = ref_de(c["dono"])
                if not dono:
                    continue
                demandas_c = list(dono["demandas"])
            out.append({**base, "dono": dono, "demandas": demandas_c})
        return out

    # Itens usados pelos ritos pertencem às demandas em que o rito acontece (entradas, saídas e condição `quando`).
    pelos_ritos: dict[str, set[str]] = {}
    for r in _lista(doc, "ritos"):
        dems_r = {d_ for n_ in r.get("acontece_em") or [] for d_ in (nos.get(str(n_)) or subs.get(str(n_)) or {}).get("demandas", [])}
        cond_r = r.get("quando") or {}
        itens_r = list(r.get("entradas") or []) + list(r.get("saidas") or []) + [
            tm.get("var") for tm in (cond_r.get("todos") or []) + (cond_r.get("algum") or []) if isinstance(tm, Mapping)]
        for it in itens_r:
            pelos_ritos.setdefault(str(it), set()).update(dems_r)

    linhas_dados: dict[str, dict[str, Any]] = {}
    for did_, info in rastro.items():
        cat = dados_cat.get(did_, {})
        prod = refs_de(info["produzido_por"])
        cons = refs_de(info["consumido_por"])
        conds = conds_do_item(did_)
        lacunas = lacunas_regra.get(did_, [])
        usada_em = sorted(
            ({d for r in prod + cons for d in r["demandas"]} | {d for c in conds for d in c["demandas"]}
             | estado_de.get(did_, set()) | pelos_ritos.get(did_, set()))
            - {""}
        )
        if did_ in dados_cat:
            dados_cat[did_].update(
                {
                    "produzido_por": prod,
                    "consumido_por": cons,
                    "lacunas": lacunas,
                    "condicoes": conds,
                    "demandas": usada_em,
                    "por_demanda": {
                        dm: {
                            "produzido_por": [r for r in prod if dm in r["demandas"]],
                            "consumido_por": [r for r in cons if dm in r["demandas"]],
                            "condicoes": [c for c in conds if dm in c["demandas"]],
                        }
                        for dm in usada_em
                    },
                }
            )
        linhas_dados[did_] = {
            "id": did_,
            "categoria": info["tipo"],
            "nome": str(info.get("nome") or did_),
            "raia": "",
            "tipo": cat.get("tipo", ""),
            "subtipo": cat.get("subtipo", ""),
            "descricao": cat.get("descricao", ""),
            "exemplo": cat.get("exemplo", ""),
            "lacunas": lacunas,
            "demandas": usada_em,
        }

    raw_nos = {str(n["id"]): n for n in _lista(doc, "decisoes")}
    resumo_de = {str(p["id"]): str(p.get("resumo") or "") for p in _lista(doc, "playbooks")}
    for dem in demandas:
        linhas: list[dict[str, Any]] = []
        ids_dem = [nid for nid in raw_nos if dem["id"] in nos[nid]["demandas"]]
        for r in dem["raias"]:
            ids_raia = [nid for nid in ids_dem if nos[nid]["raia"] == r["id"]]
            for nid in ordem_fluxo(raw_nos, ids_raia):
                n = nos[nid]
                descricao = resumo_de.get(n["playbook"], "") if n["playbook"] else ""
                if not descricao and n["tipo"] == "chamada" and n["raia_chamada"]:
                    destino = raias_por_id.get(n["raia_chamada"], {})
                    descricao = "Chama a raia " + str(destino.get("nome") or n["raia_chamada"])
                if not descricao and n["tipo"] == "fim" and n["retorno"]:
                    descricao = "Retorno: " + n["retorno"]
                linhas.append(
                    {
                        "id": nid,
                        "categoria": "gateway" if n["tipo"] == "bifurcacao" else n["tipo"],
                        "nome": n["rotulo"],
                        "raia": r["id"],
                        "descricao": descricao,
                        "exemplo": n["exemplo"],
                        "lacunas": [],
                        "papeis": sorted({p["id"] for p in n["papeis"]} | set(n["papeis_subtarefas"])),
                        "letras": sorted({p["id"] + ":" + LETRA_RACI[p["relacao"]] for p in n["papeis"]} | set(n["letras_subtarefas"])),
                    }
                )
                for sid in n["subtarefas"]:
                    st = subs[sid]
                    linhas.append(
                        {
                            "id": sid,
                            "categoria": "subtarefa",
                            "nome": st["rotulo"],
                            "raia": r["id"],
                            "descricao": st["descricao"],
                            "exemplo": st["exemplo"],
                            "quando": st["quando"],
                            "condicional": st["condicional"],
                            "pai": nid,
                            "pai_rotulo": n["rotulo"],
                            "lacunas": [],
                            "papeis": [p["id"] for p in st["papeis"]],
                            "letras": [p["id"] + ":" + LETRA_RACI[p["relacao"]] for p in st["papeis"]],
                        }
                    )
        # Artefatos e variáveis são globais (sem raia), mas a demanda mostra só os que ela usa (entradas, saídas,
        # estado ou condições). Item sem nenhum uso não aparece em demanda nenhuma (o validador avisa ITEM_SEM_USO).
        globais = [li for li in linhas_dados.values() if dem["id"] in li["demandas"]]
        for categoria in ("artefato", "variavel"):
            for li in globais:
                if li["categoria"] == categoria:
                    linhas.append({k: v for k, v in li.items() if k != "demandas"})
        if linhas:
            dem["catalogo"] = linhas
            dem["visoes"].append(
                {"id": CATALOGO, "titulo": "Catálogo",
                 "dica": "Artefatos, variáveis, técnicas, nós e subtarefas da demanda, com filtros por raia e categoria",
                 "arquivo": "", "mmd": "", "mapa": {}, "mmd_sub": "", "mapa_sub": {}}
            )

    texto_pergunta = {str(q["id"]): str(q.get("texto") or q["id"]) for q in _lista(doc, "perguntas")}
    playbooks = {}
    for p in sorted(_lista(doc, "playbooks"), key=lambda x: chave_natural(x["id"])):
        refs = []
        for col in _ORDEM_REFERENCIAS:
            for rid in p.get(col) or []:
                refs.append(
                    {
                        "colecao": col,
                        "tipo_rotulo": _ROTULO_REFERENCIA[col],
                        "grupo_rotulo": _ROTULO_GRUPO[col],
                        "id": str(rid),
                        "nome": catalogo.get(col, {}).get(str(rid), str(rid)),
                    }
                )
        playbooks[str(p["id"])] = {
            "id": str(p["id"]),
            "resumo": str(p.get("resumo") or ""),
            "exemplo": str(p.get("exemplo") or ""),
            "perguntas_chave": [texto_pergunta.get(str(x), str(x)) for x in p.get("perguntas_chave") or []],
            "perguntas_ids": [str(x) for x in p.get("perguntas_chave") or []],
            "fazer": [str(x) for x in p.get("fazer") or []],
            "evitar": [str(x) for x in p.get("evitar") or []],
            "referencias": refs,
        }

    for n in nos.values():
        todos_ids.add(n["id"])
    todos_ids.update(subs)

    # Catálogo de técnicas para o modal da técnica: descrição, quando usar e evitar, campos extras e onde é usada.
    campos_base = {"id", "nome", "descricao", "quando_usar", "quando_evitar", "exemplo", "status", "publico", "fonte_ids"}
    usada: dict[str, list[dict[str, Any]]] = {}

    def registrar(tec: str, ref: dict[str, Any] | None, uso_: str) -> None:
        if ref:
            usada.setdefault(tec, []).append({**ref, "uso": uso_})

    no_do_playbook = {str(n.get("playbook")): str(n["id"]) for n in _lista(doc, "decisoes") if n.get("playbook")}
    ordem_dem = {str(d["id"]): k for k, d in enumerate(_lista(doc, "demandas"))}
    for n in sorted(_lista(doc, "decisoes"), key=lambda x: chave_natural(x["id"])):
        for u in n.get("tecnicas") or []:
            if isinstance(u, Mapping):
                registrar(str(u.get("tecnica")), ref_de(str(n["id"])), str(u.get("uso") or ""))
        for sub in subtarefas_do_no(n):
            for u in sub.get("tecnicas") or []:
                if isinstance(u, Mapping):
                    registrar(str(u.get("tecnica")), ref_de(str(sub["id"])), str(u.get("uso") or ""))
    for p in _lista(doc, "playbooks"):
        dono = no_do_playbook.get(str(p["id"]))
        for tec in p.get("tecnicas") or []:
            if dono and not any(r["id"] == dono for r in usada.get(str(tec), [])):
                registrar(str(tec), ref_de(dono), "playbook")
    tecnicas_cat = {
        str(tc["id"]): {
            "id": str(tc["id"]),
            "nome": str(tc.get("nome") or tc["id"]),
            "descricao": str(tc.get("descricao") or ""),
            "exemplo": str(tc.get("exemplo") or ""),
            "quando_usar": [str(x) for x in tc.get("quando_usar") or []],
            "quando_evitar": [str(x) for x in tc.get("quando_evitar") or []],
            "extras": _pares({k: v for k, v in tc.items() if k not in campos_base}),
            "usada_em": sorted(usada.get(str(tc["id"]), []),
                               key=lambda r: (min([ordem_dem.get(x, len(ordem_dem)) for x in r["demandas"]] or [len(ordem_dem)]),
                                              chave_natural(r["id"]))),
        }
        for tc in _lista(doc, "tecnicas")
    }
    # Papéis: descrição, responsabilidades e onde atuam (tarefas, gateways e subtarefas), como responsável ou apoio.
    atua: dict[str, list[dict[str, Any]]] = {}
    for nid in ordenar_natural(nos):
        x = nos[nid]
        for p in x["papeis"]:
            ref = ref_de(nid)
            if ref:
                atua.setdefault(p["id"], []).append({**ref, "relacao": p["relacao"], "via": p["via"]})
        for sid in x["subtarefas"]:
            for p in subs[sid]["papeis"]:
                ref = ref_de(sid)
                if ref:
                    atua.setdefault(p["id"], []).append({**ref, "relacao": p["relacao"], "via": p["via"]})
    papeis_cat = {
        str(p["id"]): {
            "id": str(p["id"]),
            "nome": str(p.get("nome") or p["id"]),
            "descricao": str(p.get("descricao") or ""),
            "responsabilidades": [str(r) for r in p.get("responsabilidades") or []],
            "atuacao_de_agente": str(p.get("atuacao_de_agente") or ""),
            "atua_em": atua.get(str(p["id"]), []),
        }
        for p in _lista(doc, "papeis")
    }
    for dem in demandas:
        if "catalogo" not in dem:
            continue
        for pid, pc in papeis_cat.items():
            refs = [r for r in pc["atua_em"] if dem["id"] in r["demandas"]]
            if not refs:
                continue
            raias_uso: list[str] = []
            for r in refs:
                if r["raia"] and r["raia"] not in raias_uso:
                    raias_uso.append(r["raia"])
            dem["catalogo"].append({
                "id": pid, "categoria": "papel", "nome": pc["nome"], "raia": "", "raias": raias_uso,
                "descricao": pc["descricao"], "exemplo": "; ".join(pc["responsabilidades"]), "lacunas": [],
                "usos": len(refs), "papeis": [pid],
                "letras": sorted({pid + ":" + LETRA_RACI[r["relacao"]] for r in refs}),
            })

    ritos_do_no: dict[str, list[str]] = {}
    for r in _lista(doc, "ritos"):
        for n_ in r.get("acontece_em") or []:
            ritos_do_no.setdefault(str(n_), []).append(str(r["id"]))
    for nid_, x in nos.items():
        x["ritos"] = ritos_do_no.get(nid_, [])

    # Ritos e perguntas-chave: RACI, onde acontecem, quem responde e quando se aplicam (tailoring).
    ritos_raw = sorted(_lista(doc, "ritos"), key=lambda r: ({"time": 0, "programa": 1, "operacao": 2}.get(str(r.get("nivel")), 3),
                                                            int(r.get("ordem") or 99), chave_natural(r["id"])))
    rito_por_id = {str(r["id"]): r for r in ritos_raw}
    cita_pergunta: dict[str, dict[str, list[str]]] = {}
    for p in _lista(doc, "playbooks"):
        dono = no_do_playbook.get(str(p["id"]))
        for q in p.get("perguntas_chave") or []:
            if dono:
                cita_pergunta.setdefault(str(q), {"nos": [], "ritos": []})["nos"].append(dono)
    for r in ritos_raw:
        for q in r.get("perguntas") or []:
            cita_pergunta.setdefault(str(q), {"nos": [], "ritos": []})["ritos"].append(str(r["id"]))
    nome_tec = {str(t["id"]): str(t.get("nome") or t["id"]) for t in _lista(doc, "tecnicas")}
    raia_inicio = {}
    for nid_ in ordenar_natural(nos):
        if nos[nid_]["tipo"] == "inicio":
            raia_inicio.setdefault(nos[nid_]["raia"], nid_)

    def ref_item(x: str) -> dict[str, Any] | None:
        r = ref_de(x)
        if r:
            return r
        if x in nome_tec:
            return {"id": x, "tipo": "tecnica", "rotulo": nome_tec[x], "raia": "", "demanda": "", "demandas": [], "aba": "",
                    "raia_nome": "", "sub": False}
        if x in rito_por_id:
            return {"id": x, "tipo": "rito", "rotulo": str(rito_por_id[x].get("nome") or x), "raia": "", "demanda": "",
                    "demandas": sorted({d_ for n_ in rito_por_id[x].get("acontece_em") or [] for d_ in (ref_de(str(n_)) or {}).get("demandas", [])}),
                    "aba": "", "raia_nome": "", "sub": False}
        return None

    def raci_lista(item: Mapping[str, Any]) -> list[dict[str, str]]:
        return [{**p, "via": ""} for p in papeis_de({k: v for k, v in item.items() if k != "saidas"})]

    ritos_cat: dict[str, Any] = {}
    for r in ritos_raw:
        rid = str(r["id"])
        onde = [x for x in (ref_de(str(n_)) for n_ in r.get("acontece_em") or []) if x]
        ritos_cat[rid] = {
            "id": rid, "nome": str(r.get("nome") or rid), "nivel": str(r.get("nivel") or ""), "ordem": int(r.get("ordem") or 0),
            "seguinte": str(r.get("seguinte") or ""), "objetivo": str(r.get("objetivo") or ""),
            "cadencia": str(r.get("cadencia") or ""), "duracao": str(r.get("duracao") or ""),
            "quando": descrever_condicao(r.get("quando")) if r.get("quando") else "",
            "papeis": raci_lista(r), "premissas": [str(x) for x in r.get("premissas") or []],
            "comportamentos_esperados": [str(x) for x in r.get("comportamentos_esperados") or []],
            "evitar": [str(x) for x in r.get("evitar") or []],
            "entradas": ids_lista(r.get("entradas")), "saidas": ids_lista(r.get("saidas")),
            "tecnicas": [{"id": str(t), "nome": nome_tec.get(str(t), str(t))} for t in r.get("tecnicas") or []],
            "perguntas": ids_lista(r.get("perguntas")), "acontece_em": onde,
            "demandas": sorted({d_ for x in onde for d_ in x["demandas"]}), "exemplo": str(r.get("exemplo") or ""),
        }
    # Papéis também atuam nos ritos: o RACI do rito entra em "onde atua" e na linha do papel no Catálogo.
    for rid, rc in ritos_cat.items():
        for p_ in rc["papeis"]:
            if p_["id"] in papeis_cat:
                papeis_cat[p_["id"]]["atua_em"].append({"id": rid, "tipo": "rito", "rotulo": rc["nome"], "raia": "", "demanda": "",
                                                        "demandas": rc["demandas"], "aba": "", "raia_nome": "", "sub": False,
                                                        "relacao": p_["relacao"], "via": ""})
    for dem in demandas:
        if "catalogo" not in dem:
            continue
        linha_de = {li["id"]: li for li in dem["catalogo"] if li["categoria"] == "papel"}
        for pid, pc in papeis_cat.items():
            refs = [r for r in pc["atua_em"] if dem["id"] in r["demandas"]]
            if not refs:
                continue
            letras = sorted({pid + ":" + LETRA_RACI[r["relacao"]] for r in refs})
            if pid in linha_de:
                linha_de[pid].update({"usos": len(refs), "letras": letras})
            else:
                dem["catalogo"].append({
                    "id": pid, "categoria": "papel", "nome": pc["nome"], "raia": "", "raias": [],
                    "descricao": pc["descricao"], "exemplo": "; ".join(pc["responsabilidades"]), "lacunas": [],
                    "usos": len(refs), "papeis": [pid], "letras": letras,
                })
    anterior_de = {v["seguinte"]: k for k, v in ritos_cat.items() if v["seguinte"]}
    for k, v in ritos_cat.items():
        v["anterior"] = anterior_de.get(k, "")

    perguntas_cat: dict[str, Any] = {}
    for q in _lista(doc, "perguntas"):
        qid = str(q["id"])
        deps = [x for x in (ref_item(str(a)) for a in q.get("depende_de") or []) if x]
        proprio = raci_lista(q)
        herdado: list[dict[str, str]] = []
        if not proprio:  # RACI herdado do primeiro item que responde e tem papéis
            for a in q.get("depende_de") or []:
                a = str(a)
                fonte = nos.get(a) or subs.get(a) or ritos_cat.get(a)
                if fonte and fonte.get("papeis"):
                    herdado = [{**p, "via": ""} for p in fonte["papeis"]]
                    break
        cit = cita_pergunta.get(qid, {"nos": [], "ritos": []})
        # A pergunta aparece onde é feita (playbooks e ritos que a citam); sem citação, onde está quem a responde.
        demandas_q = sorted({d_ for n_ in cit["nos"] for d_ in (ref_de(n_) or {}).get("demandas", [])}
                            | {d_ for r_ in cit["ritos"] for d_ in ritos_cat.get(r_, {}).get("demandas", [])}) or sorted(
            {d_ for x in deps for d_ in x.get("demandas", [])})
        # Tailoring herdado: sem `quando` próprio, vale a condição do primeiro item que responde (rito ou subtarefa).
        quando_q = descrever_condicao(q.get("quando")) if q.get("quando") else ""
        quando_origem = ""
        if not quando_q:
            for a in q.get("depende_de") or []:
                a = str(a)
                if a in ritos_cat and ritos_cat[a]["quando"]:
                    quando_q, quando_origem = ritos_cat[a]["quando"], ritos_cat[a]["nome"]
                    break
                if a in subs and subs[a]["quando"]:
                    quando_q, quando_origem = subs[a]["quando"], subs[a]["rotulo"]
                    break
        perguntas_cat[qid] = {
            "id": qid, "texto": str(q.get("texto") or qid), "depende_de": deps,
            "quando": quando_q, "quando_origem": quando_origem,
            "papeis": proprio or herdado, "raci_herdado": not proprio and bool(herdado),
            "citada_nos": [x for x in (ref_de(n_) for n_ in cit["nos"]) if x], "citada_ritos": cit["ritos"],
            "demandas": demandas_q,
        }
    for dem in demandas:
        if "catalogo" not in dem:
            continue
        for rid, rc in ritos_cat.items():
            if dem["id"] not in rc["demandas"]:
                continue
            raias_r = []
            for x in rc["acontece_em"]:
                if x["raia"] and x["raia"] not in raias_r and dem["id"] in x["demandas"]:
                    raias_r.append(x["raia"])
            dem["catalogo"].append({
                "id": rid, "categoria": "rito", "nome": rc["nome"], "raia": "", "raias": raias_r,
                "descricao": rc["objetivo"], "exemplo": rc["exemplo"], "lacunas": [], "usos": len(rc["acontece_em"]),
                "papeis": [p["id"] for p in rc["papeis"]], "letras": [p["id"] + ":" + LETRA_RACI[p["relacao"]] for p in rc["papeis"]],
                "quando": rc["quando"], "condicional": bool(rc["quando"]), "nivel": rc["nivel"],
            })
        for qid, qc in perguntas_cat.items():
            if dem["id"] not in qc["demandas"]:
                continue
            raias_q = []
            for x in qc["depende_de"] + qc["citada_nos"]:
                if x.get("raia") and x["raia"] not in raias_q and dem["id"] in x.get("demandas", []):
                    raias_q.append(x["raia"])
            dem["catalogo"].append({
                "id": qid, "categoria": "pergunta", "nome": qc["texto"], "raia": "", "raias": raias_q,
                "descricao": "Respondida por: " + ", ".join(f"{x['rotulo']} ({x['id']})" for x in qc["depende_de"]) if qc["depende_de"] else "",
                "exemplo": "", "lacunas": [], "usos": len(qc["depende_de"]),
                "papeis": [p["id"] for p in qc["papeis"]], "letras": [p["id"] + ":" + LETRA_RACI[p["relacao"]] for p in qc["papeis"]],
                "quando": qc["quando"], "condicional": bool(qc["quando"]),
            })

    # Técnicas no Catálogo: só as usadas na demanda (nós, subtarefas ou playbooks), com as raias onde aparecem.
    for dem in demandas:
        if "catalogo" not in dem:
            continue
        for tid, tc in tecnicas_cat.items():
            refs = [r for r in tc["usada_em"] if dem["id"] in r["demandas"]]
            if not refs:
                continue
            raias_uso = []
            for r in refs:
                if r["raia"] and r["raia"] not in raias_uso:
                    raias_uso.append(r["raia"])
            dem["catalogo"].append({
                "id": tid, "categoria": "tecnica", "nome": tc["nome"], "raia": "", "raias": raias_uso,
                "descricao": tc["descricao"], "exemplo": tc["exemplo"], "lacunas": [], "usos": len(refs),
            })
    return {
        "versao_dados": 2,
        "demandas": _limpa(demandas),
        "nos": _limpa(nos),
        "papeis": _limpa(papeis_cat),
        "ritos": _limpa(ritos_cat),
        "perguntas": _limpa(perguntas_cat),
        "subtarefas": _limpa(subs),
        "dados": _limpa(dados_cat),
        "tecnicas": _limpa(tecnicas_cat),
        "playbooks": _limpa(playbooks),
        "ids": ordenar_natural(todos_ids),
    }


def _pares(v: Any) -> Any:
    """Dicionário vira {"__pares": [[chave, valor], ...]} para a ordem do autor sobreviver ao JSON com chaves ordenadas."""
    if isinstance(v, Mapping):
        return {"__pares": [[str(k), _pares(x)] for k, x in v.items()]}
    if isinstance(v, list):
        return [_pares(x) for x in v]
    return v


def json_seguro(dados: Any) -> str:
    """JSON para `<script type="application/json">`: ASCII puro e sem `<`, `>` e `&` literais."""
    texto = json.dumps(dados, ensure_ascii=True, sort_keys=True, separators=(",", ":"), default=str)
    return texto.replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")


class MermaidAusenteError(GeracaoError):
    """O arquivo do Mermaid fixado não existe (a CLI mapeia para o código 3)."""


def ler_mermaid(caminho: Path | None = None) -> str:
    """Lê o Mermaid fixado. Levanta GeracaoError se o arquivo não existir."""
    alvo = caminho or CAMINHO_MERMAID
    try:
        return alvo.read_text(encoding="utf-8")
    except OSError as exc:
        raise MermaidAusenteError(f"Mermaid não encontrado em {alvo}: veja tools/guide-oracle/assets/README.txt") from exc


def _js_embutivel(js: str) -> str:
    """Impede que o conteúdo do script feche a tag ou abra um comentário HTML."""
    return js.replace("</script", "<\\/script").replace("<!--", "\\x3c!--")


# ----------------------------------------------------------------- template

_CSS = """
:root{--borda:#c9ced6;--fundo:#f5f6f8;--texto:#1d2330;--suave:#59627a}
*{box-sizing:border-box}
body{margin:0;font:14px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--texto);background:var(--fundo);display:flex;flex-direction:column;height:100vh}
header{display:flex;gap:12px;align-items:center;padding:8px 14px;background:#fff;border-bottom:1px solid var(--borda)}
header h1{font-size:16px;margin:0 8px 0 0}
select,button{font:inherit;padding:4px 8px;border:1px solid var(--borda);border-radius:6px;background:#fff;cursor:pointer}
button:hover{background:#eef1f6}
button:disabled{opacity:.45;cursor:default}
button:focus-visible,summary:focus-visible{outline:3px solid #1a73e8;outline-offset:1px}
#barra-abas{display:flex;gap:8px;align-items:flex-start;padding:6px 14px 0;background:#fff}
#recolher-abas{flex:1;font-size:13px}
#voltar{margin-left:auto;align-self:flex-start}
#recolher-abas summary{cursor:pointer;font-weight:600;font-size:12px;padding:2px 0 4px}
#recolher-abas[open] summary{margin-bottom:2px}
#btn-catalogo{font-weight:600}
.zoom{display:inline-flex;gap:6px;align-items:center}
body.modo-catalogo #recolher-abas,body.modo-catalogo #legenda,body.modo-catalogo .zoom{display:none}
#btn-catalogo.ativa{background:var(--texto);color:#fff;border-color:var(--texto)}
#abas{display:flex;gap:4px;flex-wrap:wrap;align-items:flex-end}
#abas .rotulo-grupo{font-weight:600;font-size:12px;color:var(--suave);text-transform:uppercase;letter-spacing:.04em;align-self:center;margin:0 4px 0 10px}
#abas button,#voltar{border-bottom:none;border-radius:6px 6px 0 0}
#abas button.ativa{background:var(--texto);color:#fff;border-color:var(--texto)}
#abas button[data-raia]{border-top:5px solid var(--cor)}
#abas button[data-raia].ativa{background:var(--cor);color:var(--cor-texto);border-color:var(--cor)}
#legenda{background:#fff;border-top:1px solid var(--borda);padding:4px 14px;font-size:12px;max-height:30vh;overflow:auto}
#legenda summary{cursor:pointer;font-weight:600}
#legenda .corpo{display:flex;flex-wrap:wrap;gap:6px 24px;align-items:flex-start;padding:4px 0 6px}
#legenda .bloco{display:flex;flex-direction:column;gap:3px}
#legenda .titulo{font-weight:600}
#legenda .leg-dem{display:flex;flex-wrap:wrap;gap:6px 24px;align-items:flex-start;flex:1 1 60%}
#legenda .leg-dem[hidden]{display:none}
#legenda code,.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.forma{display:inline-flex;align-items:center;gap:4px;margin-right:8px}
.forma i{display:inline-block;width:26px;height:16px;border:2px solid #333;background:#fff}
.forma i.estadio{border-radius:9px}
.forma i.losango{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);border:none;background:#333}
.forma i.arred{border-radius:5px;width:20px;height:12px;background:#e3e3e3}
.forma i.arred.cond{border-style:dashed}
.forma i.sub{box-shadow:inset 3px 0 0 #fff,inset 5px 0 0 #333,inset -3px 0 0 #fff,inset -5px 0 0 #333}
.chip{display:inline-block;padding:2px 8px;border-radius:10px;border:2px solid rgba(0,0,0,.35)}
#area{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}
#barra{display:flex;gap:6px;align-items:center;padding:6px 14px;background:#fff;border-bottom:1px solid var(--borda)}
#barra .sep{width:1px;align-self:stretch;background:var(--borda);margin:0 6px}
#alt-sub[hidden]{display:none}
#alt-sub[hidden]+.sep{display:none}
#alt-sub[aria-pressed=true]{background:var(--texto);color:#fff;border-color:var(--texto)}
#rolagem{flex:1;overflow:auto;padding:10px;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
#rolagem:focus-visible{outline:3px solid #1a73e8;outline-offset:-3px}
#rolagem.arrastando,#rolagem.arrastando *{cursor:grabbing !important}
.visao{display:none}
.visao.ativa{display:block}
.visao svg{max-width:none;display:block}
.visao g.node{cursor:pointer}
.visao g.node.gw .nodeLabel,.visao g.node.gw .nodeLabel *{font-size:11px;line-height:1.2}
.visao g.node.gw .nodeLabel small{font-size:9px}
.visao g.node.destaque rect,.visao g.node.destaque polygon,.visao g.node.destaque path,.visao g.node.destaque circle{stroke:#d00 !important;stroke-width:6px !important}
.visao g.node.destaque{filter:drop-shadow(0 0 8px #d00)}
#modal{position:fixed;inset:0;background:rgba(15,20,30,.6);display:flex;align-items:center;justify-content:center;padding:16px;z-index:50}
#modal[hidden]{display:none}
#caixa{background:#fff;border-radius:10px;width:min(720px,100%);max-height:calc(100vh - 32px);display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.4);overflow:hidden}
#m-cab{display:flex;align-items:center;gap:12px;padding:10px 16px;background:#e6e9ef;color:var(--texto)}
#m-titulo{font-size:16px;margin:0;flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere}
#m-fechar{font-size:18px;line-height:1;padding:2px 9px}
#m-voltar{font-size:16px;line-height:1;padding:2px 9px;margin-right:8px}
#m-corpo button.item-link{background:none;border:none;padding:0;font:inherit;color:#1a4fa0;text-decoration:underline;cursor:pointer;text-align:left}
#m-corpo button.item-link:hover,#m-corpo button.item-link:focus-visible{color:#0b2f6b;outline:2px solid #1a73e8;outline-offset:2px}
#m-corpo .item-link-meta{color:#555;margin-right:4px}
#m-corpo{padding:12px 16px 16px;overflow:auto}
#m-corpo h3{font-size:13px;margin:12px 0 2px;text-transform:uppercase;letter-spacing:.04em;color:var(--suave)}
#m-corpo ul{margin:2px 0 0;padding-left:18px}
#m-corpo p{margin:4px 0}
#m-corpo .rotulo{font-size:16px;font-weight:600}
#m-corpo .meta{color:var(--suave)}
#m-corpo .acoes,#m-corpo .acoes-diagrama{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
#m-corpo .acoes button,#m-corpo .acoes-diagrama button{font-weight:600;padding:6px 12px;border-width:2px}
#m-corpo .acoes button.destacado{box-shadow:0 0 0 3px #1a73e8;font-size:15px;padding:8px 14px}
#m-corpo h3 .contagem{font-weight:400;text-transform:none;letter-spacing:0}
.chips{display:flex;flex-wrap:wrap;gap:4px 6px;margin:2px 0 4px}
.chip-dado{display:inline-flex;align-items:center;gap:5px;padding:1px 9px;border-radius:10px;border:1px solid #8a93a6;background:#f1f3f7;font-size:13px;cursor:help}
button.chip-dado{font:inherit;font-size:13px;color:inherit;cursor:pointer}
button.chip-dado:hover,button.chip-dado:focus-visible{background:#e2e8f3;outline:2px solid #1a73e8;outline-offset:1px}
.cat-selo.tecnica{background:#fff3c4;color:#5c3d00}
.cat-selo.papel{background:#ede7f6;color:#311b92;border-color:#5e35b1}
.cat-selo.rito{background:#fce4ec;color:#880e4f;border-color:#c2185b}
.cat-selo.pergunta{background:#e8f5e9;color:#1b5e20;border-color:#388e3c}
.catalogo-topo button.filtro-subtipo[aria-pressed=true]{background:#14532d;color:#fff;border-color:#14532d}
.catalogo-topo button.filtro-papel[aria-pressed=true],.catalogo-topo button.filtro-letra[aria-pressed=true]{background:#311b92;color:#fff;border-color:#311b92}
.resp.papel.raci-A{background:#fff3c4;color:#5c3d00;border-color:#8a5a00}
.resp.papel.raci-C{background:#e0f2f1;color:#004d40;border-color:#00796b}
.resp.papel.raci-I{background:#eceff1;color:#263238;border-color:#546e7a}
.papeis-item{display:inline-flex;flex-wrap:wrap;gap:4px}
.resp.papel{background:#ede7f6;color:#311b92;border-color:#5e35b1}
button.link-papel{cursor:pointer;font:inherit;font-size:12px}
button.link-papel:hover{text-decoration:underline}
.chip-dado code{font-size:11px;color:var(--suave)}
.chip-dado.artefato{border-left:5px solid #1f6f43}
.chip-dado.variavel{border-left:5px solid #7b3fb0}
.chip-dado.desconhecido{border-style:dashed}
.fluxo-dados{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin:4px 0}
.fluxo-dados .seta{font-weight:700;color:var(--suave)}
.selo{display:inline-block;padding:0 8px;border-radius:4px;font-size:12px;font-weight:700;border:1px solid;white-space:nowrap}
.selo.obrigatoria{background:#8c1d18;color:#fff;border-color:#8c1d18}
.selo.recomendada{background:#0b4f9e;color:#fff;border-color:#0b4f9e}
.selo.opcional{background:#fff;color:#333;border:1px dashed #333}
.selo.condicional{background:#fff3c4;color:#5c3d00;border-color:#8a5a00}
.selo.sub-cond{background:#fff3c4;color:#5c3d00;border:1px dashed #8a5a00}
.executar-quando{margin:4px 0;padding:4px 10px;border-left:4px dashed #8a5a00;background:#fffbe6}
ol.subs>li.condicional{border-style:dashed}
.variantes{list-style:none;padding-left:0}
.variantes li{margin:6px 0;padding:6px 10px;border:1px solid var(--borda);border-radius:6px;background:#fafbfc}
.catalogo-topo button.filtro-tipo-artefato[aria-pressed=true]{background:#14532d;color:#fff;border-color:#14532d}
.resp{display:inline-block;padding:0 8px;border-radius:10px;font-size:12px;font-weight:600;border:1px solid}
.resp.agente{background:#e3f2fd;color:#0d3c78;border-color:#1565c0}
.resp.pessoa{background:#fff0e0;color:#7a3a00;border-color:#a04a00}
.resp.ambos{background:#f1e6fb;color:#4a2270;border-color:#5b2a86}
ul.tecnicas{list-style:none;padding-left:0}
ul.tecnicas li{margin:5px 0}
ul.tecnicas .meta{margin-left:2px}
ol.subs{padding-left:22px;margin:4px 0}
ol.subs>li{margin:8px 0;padding:6px 10px;border:1px solid var(--borda);border-radius:6px;background:#fafbfc}
ol.subs .acoes{margin:6px 0 0}
#m-corpo ol.subs ul.tecnicas{padding-left:0}
.visao.catalogo{padding:0;cursor:auto;user-select:text;-webkit-user-select:text}
.visao.catalogo *{user-select:text;-webkit-user-select:text}
.visao.catalogo button{cursor:pointer;user-select:none}
.catalogo-topo{display:flex;flex-direction:column;gap:6px;margin:0 0 8px}
.catalogo-topo .linha{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
.catalogo-topo input[type=search]{font:inherit;padding:4px 8px;border:1px solid var(--borda);border-radius:6px;min-width:260px}
.catalogo-topo .rotulo-grupo{font-weight:600;font-size:12px;color:var(--suave);text-transform:uppercase;letter-spacing:.04em}
.catalogo-topo .grupo{display:flex;flex-wrap:wrap;gap:4px;align-items:center}
.catalogo-topo button[aria-pressed]{border-radius:12px;padding:1px 10px;font-size:12px;border:2px solid var(--borda);background:#fff}
.catalogo-topo button[aria-pressed=true]{outline:3px solid #1a73e8;outline-offset:1px;font-weight:700}
.catalogo-topo button.filtro-tipo[aria-pressed=true]{background:var(--texto);color:#fff;border-color:var(--texto)}
.catalogo table{border-collapse:collapse;width:100%;background:#fff;font-size:13px}
.catalogo th,.catalogo td{border:1px solid var(--borda);padding:6px 8px;vertical-align:top;text-align:left}
.catalogo th{background:#e6e9ef;position:sticky;top:0}
.catalogo tbody tr{cursor:pointer}
.catalogo tbody tr:hover{background:#f3f6fb}
.catalogo td.desc{max-width:420px}
.catalogo td.desc .clamp{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.tambem-usado{font-size:12px}
.tambem-usado .btn-demanda{border:1px solid var(--borda);border-radius:12px;background:#fff;padding:1px 10px;font-size:12px;cursor:pointer}
.catalogo td.exemplo{max-width:320px;color:var(--suave)}
.catalogo .abrir{border:none;background:none;padding:0;font-weight:700;text-align:left;color:var(--texto);text-decoration:underline dotted}
.catalogo .abrir:hover{background:none;text-decoration:underline}
.catalogo tr[hidden]{display:none}
.cat-selo{display:inline-block;padding:0 8px;border-radius:4px;font-size:12px;font-weight:700;white-space:nowrap;border:1px solid}
.cat-selo.artefato{background:#e3f4ea;color:#14532d;border-color:#1f6f43}
.cat-selo.variavel{background:#f1e6fb;color:#4a2270;border-color:#7b3fb0}
.cat-selo.inicio{background:#e0f2f1;color:#004d40;border-color:#00796b}
.cat-selo.tarefa{background:#e3f2fd;color:#0d3c78;border-color:#1565c0}
.cat-selo.gateway{background:#fff3c4;color:#5c3d00;border-color:#8a5a00}
.cat-selo.chamada{background:#fde7ef;color:#7a1237;border-color:#ad1457}
.cat-selo.fim{background:#eceff1;color:#263238;border-color:#546e7a}
.cat-selo.subtarefa{background:#fff;color:#333;border:1px dashed #333}
.sem-resultados{padding:12px;color:var(--suave)}
.lacuna-msg{color:#8c1d18;font-weight:700}
.exemplo-bloco{margin:4px 0;padding:6px 10px;border-left:4px solid #8a93a6;background:#f6f7f9}
.ref-lista{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin:2px 0 4px}
.ref-lista .btn-ref{padding:2px 8px;font-size:12px;text-align:left}
.aviso{padding:10px;border:1px dashed var(--borda);border-radius:6px;background:#fffbe6}
.erro{color:#a00}
"""

_JS = r"""
(function () {
  "use strict";
  var DADOS = JSON.parse(document.getElementById("dados").textContent);
  var NOS = DADOS.nos;
  var PB = DADOS.playbooks;
  var SUBS = DADOS.subtarefas || {};
  var CAT = DADOS.dados || {};
  var TEC = DADOS.tecnicas || {};
  var ROTULO_TIPO = { inicio: "início", tarefa: "tarefa", bifurcacao: "gateway", chamada: "chamada", fim: "fim" };
  var ROTULO_USO = { obrigatoria: "\u25cf obrigatória", recomendada: "\u2605 recomendada", opcional: "\u25cb opcional", condicional: "\u25c6 condicional" };
  var ROTULO_TIPO_ART = {
    documento: "documento", diagrama: "diagrama", teste: "teste", ambiente: "ambiente", acao: "ação", evidencia: "evidência",
    sinal: "sinal", dashboard: "dashboard", codigo: "código", commit: "commit", pull_request: "pull request", adr: "ADR",
    biblioteca: "biblioteca", agente: "agente", skill: "skill", script: "script",
    dado: "dado", decisao: "decisão", card: "card", comunicacao: "comunicação", configuracao: "configuração"
  };
  var ORDEM_TIPO_ART = ["documento", "diagrama", "teste", "ambiente", "acao", "evidencia", "sinal", "dashboard", "codigo", "commit",
    "pull_request", "adr", "biblioteca", "agente", "skill", "script", "dado", "decisao", "card", "comunicacao", "configuracao"];
  function rotuloTipoArt(t) { return t ? (ROTULO_TIPO_ART[t] || t) : "sem tipo"; }
  function semPrefixoQuando(q) { return String(q || "").replace(/^quando /, ""); }
  var ROTULO_RESP = { agente: "\ud83e\udd16 agente", pessoa: "\ud83d\udc64 pessoa", ambos: "\ud83e\udd1d ambos" };
  var estado = { demanda: null, visao: null, sub: false, raias: false, destaque: null };
  var historico = [];
  var vistas = {};
  var modoSub = {};
  var modoRaias = {};  // Visão completa: só a orquestradora (padrão) ou com as raias visíveis
  var foco = null;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (txt !== undefined) { e.textContent = txt; }
    return e;
  }
  function limpar(no) { while (no.firstChild) { no.removeChild(no.firstChild); } }
  function porId(id) { return document.getElementById(id); }
  /* Demanda de um nó ou referência: a dona; em raia de biblioteca, a atual se ela mostra o item, senão a primeira. */
  function demandaDoItem(x) {
    if (!x) { return demanda(estado.demanda); }
    var d = demanda(x.demanda);
    if (d) { return d; }
    var lista = x.demandas || [];
    if (lista.indexOf(estado.demanda) >= 0 || !lista.length) { return demanda(estado.demanda); }
    return demanda(lista[0]);
  }
  function pertence(x, id) { return x.demanda === id || (x.demandas || []).indexOf(id) >= 0; }

  function demanda(id) {
    for (var i = 0; i < DADOS.demandas.length; i++) {
      if (DADOS.demandas[i].id === id) { return DADOS.demandas[i]; }
    }
    return null;
  }
  function raiaDe(dem, id) {
    var r = null;
    if (dem) { dem.raias.forEach(function (x) { if (x.id === id) { r = x; } }); }
    return r;
  }
  function pintar(e, raia) {
    if (raia) { e.style.background = raia.cor; e.style.color = raia.texto_cor; e.style.borderColor = raia.cor; }
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    maxTextSize: 5000000,
    maxEdges: 20000,
    flowchart: { useMaxWidth: false, htmlLabels: true, curve: "basis", padding: 8, nodeSpacing: 30, rankSpacing: 40,
      subGraphTitleMargin: { top: 4, bottom: 12 } }
  });

  /* ------------------------------------------------------------- modal */
  function focaveis() {
    var itens = porId("caixa").querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])");
    return Array.prototype.filter.call(itens, function (x) { return !x.disabled; });
  }
  var modalAtual = null;
  var pilhaModal = [];
  function atualizarVoltarModal() {
    var b = porId("m-voltar");
    b.hidden = !pilhaModal.length;
    if (pilhaModal.length) {
      var ant = pilhaModal[pilhaModal.length - 1];
      b.title = "Voltar para " + ant.id;
    }
  }
  /* Abre outro item no mesmo modal e guarda o atual para o botão Voltar do modal. */
  /* Abre outro item no modal guardando o atual para o Voltar do modal. f: mostrarNo, mostrarSub, mostrarDado ou mostrarTecnica. */
  function irPara(f, id) {
    var aberto = !porId("modal").hidden;
    var anterior = aberto ? modalAtual : null;
    f(id);
    if (anterior && !(anterior.f === modalAtual.f && anterior.id === modalAtual.id)) { pilhaModal.push(anterior); }
    atualizarVoltarModal();
  }
  function irNoModal(id) { irPara(SUBS[id] ? mostrarSub : mostrarNo, id); }
  function voltarNoModal() {
    var ant = pilhaModal.pop();
    if (!ant) { return; }
    ant.f(ant.id);
    atualizarVoltarModal();
  }
  /* Lista cujos itens abrem outro item no modal: [{alvo, texto, prefixo}] */
  function listaLinks(titulo, itens, pai) {
    if (!itens || !itens.length) { return; }
    pai.appendChild(el("h3", null, titulo));
    var ul = el("ul", "lista-links");
    itens.forEach(function (it) {
      var li = el("li");
      if (it.prefixo) { li.appendChild(el("span", "item-link-meta", it.prefixo)); }
      var f = it.f || ((it.alvo && (NOS[it.alvo] || SUBS[it.alvo])) ? (SUBS[it.alvo] ? mostrarSub : mostrarNo) : null);
      if (f) {
        var b = el("button", "item-link", it.texto);
        b.type = "button";
        b.setAttribute("data-alvo", it.alvo);
        b.title = "Abrir " + it.alvo;
        b.addEventListener("click", function () { irPara(f, it.alvo); });
        li.appendChild(b);
      } else {
        li.appendChild(document.createTextNode(it.texto));
      }
      ul.appendChild(li);
    });
    pai.appendChild(ul);
  }
  function abrirModal() {
    if (porId("modal").hidden) { foco = document.activeElement; pilhaModal = []; }
    atualizarVoltarModal();
    porId("modal").hidden = false;
    porId("m-corpo").scrollTop = 0;
    porId("m-fechar").focus();
  }
  function fecharModal() {
    if (porId("modal").hidden) { return; }
    porId("modal").hidden = true;
    pilhaModal = [];
    modalAtual = null;
    if (foco && foco.focus) { foco.focus(); }
    foco = null;
  }

  function lista(titulo, itens, pai) {
    if (!itens || !itens.length) { return; }
    pai.appendChild(el("h3", null, titulo));
    var ul = el("ul");
    itens.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    pai.appendChild(ul);
  }

  function botao(texto, raia, fn) {
    var b = el("button", null, texto);
    b.type = "button";
    pintar(b, raia);
    b.addEventListener("click", fn);
    return b;
  }

  /* Chip de artefato ou variável: nome visível, descrição no tooltip, id em monoespaçada. */
  function chipDado(id) {
    var d = CAT[id];
    var c = el(d ? "button" : "span", "chip-dado " + (d ? d.classe : "desconhecido"));
    if (d) {
      c.type = "button";
      c.setAttribute("data-dado", id);
      c.addEventListener("click", function (e) { e.stopPropagation(); irPara(mostrarDado, id); });
    }
    c.title = d ? ((d.descricao || d.nome) + " (" + d.classe + (d.tipo ? ", " + d.tipo : "") + ")") : id;
    c.appendChild(document.createTextNode((d ? d.nome : id) + " "));
    c.appendChild(el("code", "mono", id));
    return c;
  }
  function chips(ids, pai) {
    var w = el("div", "chips");
    ids.forEach(function (id) { w.appendChild(chipDado(id)); });
    pai.appendChild(w);
  }
  function blocoDados(titulo, ids, pai) {
    if (!ids || !ids.length) { return; }
    pai.appendChild(el("h3", null, titulo));
    chips(ids, pai);
  }
  function seloUso(uso) { return el("span", "selo " + uso, ROTULO_USO[uso] || uso); }
  function chipResp(resp) { return el("span", "resp " + resp, ROTULO_RESP[resp] || resp); }
  function chipPapel(st) {
    if (!st.papel && !(st.papeis || []).length) { return chipResp(st.responsavel); }
    var w = el("span", "papeis-item");
    (st.papeis || []).forEach(function (p) { w.appendChild(linkPapel(p.id, p.relacao)); });
    return w;
  }
  var LETRA = { responsavel: "R", apoio: "R", aprova: "A", consultado: "C", informado: "I" };
  var ROTULO_REL = { responsavel: "Responsável", apoio: "Apoio", aprova: "Aprova", consultado: "Consultado", informado: "Informado" };
  var RACI = [["R", "Responsável (R)"], ["A", "Aprova (A)"], ["C", "Consultado (C)"], ["I", "Informado (I)"]];
  /* Botão do papel: abre o modal do papel (descrição, responsabilidades e onde atua). */
  function linkPapel(id, relacao) {
    var pa = (DADOS.papeis || {})[id];
    var nome = pa ? pa.nome : id;
    var b = el("button", "resp papel link-papel raci-" + (LETRA[relacao] || "R"), (ROTULO_REL[relacao] || "Papel") + ": " + nome);
    b.type = "button";
    b.setAttribute("data-papel", id);
    b.title = pa ? pa.descricao : "";
    b.addEventListener("click", function (e) { e.stopPropagation(); irPara(mostrarPapel, id); });
    return b;
  }
  function mostrarPapel(id) {
    modalAtual = { f: mostrarPapel, id: id };
    var corpo = porId("m-corpo");
    limpar(corpo);
    var pa = (DADOS.papeis || {})[id];
    var cab = porId("m-cab");
    cab.style.background = "";
    cab.style.color = "";
    porId("m-titulo").textContent = pa ? pa.nome : id;
    if (!pa) { corpo.appendChild(el("p", null, "Papel não encontrado.")); abrirModal(); return; }
    var meta = el("p", "meta");
    meta.appendChild(el("span", "cat-selo papel", "Papel"));
    meta.appendChild(document.createTextNode(" Id: "));
    meta.appendChild(el("code", "mono", id));
    corpo.appendChild(meta);
    if (pa.descricao) { corpo.appendChild(el("h3", null, "Descrição")); corpo.appendChild(el("p", null, pa.descricao)); }
    lista("Responsabilidades", pa.responsabilidades, corpo);
    var AG = { nao: "Só pessoas exercem este papel.", apoio: "Um agente pode apoiar, a decisão é de uma pessoa.",
               execucao: "Um agente do papel pode executar, com revisão de uma pessoa." };
    if (pa.atuacao_de_agente) { corpo.appendChild(el("h3", null, "Atuação de agente")); corpo.appendChild(el("p", null, AG[pa.atuacao_de_agente] || pa.atuacao_de_agente)); }
    var dem = demanda(estado.demanda);
    var refs = (pa.atua_em || []).filter(function (r) { return !dem || pertence(r, dem.id); });
    var TIPO = { tarefa: "tarefa", bifurcacao: "gateway", subtarefa: "subtarefa", rito: "rito" };
    corpo.appendChild(el("h3", null, "Onde atua nesta demanda, pelo RACI (" + refs.length + ")"));
    if (!refs.length) { corpo.appendChild(el("p", "meta", "Não atua nesta demanda.")); }
    RACI.forEach(function (g) {
      var daLetra = refs.filter(function (r) { return LETRA[r.relacao] === g[0]; });
      listaLinks(g[1] + ": " + daLetra.length, daLetra.map(function (r) {
        var como = r.relacao === "apoio" ? "apoio" : r.relacao === "responsavel" && r.tipo === "bifurcacao" ? "decide" : (ROTULO_REL[r.relacao] || "").toLowerCase();
        return { alvo: r.id, f: r.tipo === "rito" ? mostrarRito : undefined,
                 prefixo: (TIPO[r.tipo] || r.tipo) + ", " + como + (r.via ? " pelo comunicado " + r.via : "") + " \u2192",
                 texto: r.rotulo + " (" + r.id + ")" + (r.raia_nome ? ", " + r.raia_nome : "") };
      }), corpo);
    });
    var outras = {};
    (pa.atua_em || []).forEach(function (r) { (r.demandas || []).forEach(function (x) { if (!dem || x !== dem.id) { outras[x] = (outras[x] || 0) + 1; } }); });
    var nomes = Object.keys(outras).filter(function (x) { return demanda(x); }).map(function (x) { return demanda(x).nome + " (" + outras[x] + ")"; });
    if (nomes.length) { corpo.appendChild(el("h3", null, "Também atua em")); corpo.appendChild(el("p", "meta", nomes.join(", "))); }
    abrirModal();
  }
  function linkTecnica(id, nome) {
    if (!TEC[id]) { return document.createTextNode(nome || id); }
    var b = el("button", "item-link", nome || TEC[id].nome);
    b.type = "button";
    b.setAttribute("data-tecnica", id);
    b.title = "Abrir a técnica " + id;
    b.addEventListener("click", function () { irPara(mostrarTecnica, id); });
    return b;
  }
  function usosDeTecnica(usos, pai) {
    var ul = el("ul", "tecnicas");
    usos.forEach(function (u) {
      var li = el("li");
      li.appendChild(seloUso(u.uso));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(linkTecnica(u.tecnica, u.nome));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(el("code", "mono", u.tecnica));
      if (u.quando) { li.appendChild(el("div", "meta quando", u.quando)); }
      if (u.porque) { li.appendChild(el("div", "meta porque", "Porque: " + u.porque)); }
      ul.appendChild(li);
    });
    pai.appendChild(ul);
  }
  function blocoTecnicas(usos, pai) {
    if (!usos || !usos.length) { return; }
    pai.appendChild(el("h3", null, "Técnicas"));
    usosDeTecnica(usos, pai);
  }
  /* Entradas e saídas em uma linha: entradas, seta, saídas. */
  function fluxoDados(item, pai) {
    var f = el("div", "fluxo-dados");
    if (item.entradas.length) { chips(item.entradas, f); } else { f.appendChild(el("span", "meta", "sem entradas")); }
    f.appendChild(el("span", "seta", "\u2192"));
    if (item.saidas.length) { chips(item.saidas, f); } else { f.appendChild(el("span", "meta", "sem saídas")); }
    pai.appendChild(f);
  }

  function blocoSubtarefas(no, dem, raia, corpo) {
    var ids = no.subtarefas || [];
    if (!ids.length) { return; }
    var h = el("h3", null, "Subtarefas ");
    h.appendChild(el("span", "contagem", "(" + ids.length + ", na ordem de execução)"));
    corpo.appendChild(h);
    var ol = el("ol", "subs");
    ids.forEach(function (sid) {
      var st = SUBS[sid];
      if (!st) { return; }
      var li = el("li");
      li.setAttribute("data-sub", sid);
      li.appendChild(el("strong", null, st.rotulo));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(el("code", "mono", sid));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(chipPapel(st));
      if (st.condicional) {
        li.classList.add("condicional");
        li.appendChild(document.createTextNode(" "));
        li.appendChild(el("span", "selo sub-cond", "\u25c6 condicional"));
        li.appendChild(el("div", "meta quando-sub", "Executar " + st.quando));
      }
      if (st.descricao) { li.appendChild(el("p", "meta", st.descricao)); }
      fluxoDados(st, li);
      if (st.tecnicas.length) { usosDeTecnica(st.tecnicas, li); }
      var acoes = el("div", "acoes");
      var irSub = botao("Ir para a subtarefa", raia, function () {
        fecharModal();
        navegar(dem.id, st.aba, sid, { sub: true });
      });
      irSub.setAttribute("data-acao", "ir-subtarefa");
      acoes.appendChild(irSub);
      li.appendChild(acoes);
      ol.appendChild(li);
    });
    corpo.appendChild(ol);
  }

  function botaoVerNoDiagrama(id, aba, dem, raia, sub) {
    var b = botao("Ver no diagrama", raia, function () {
      fecharModal();
      navegar(dem.id, aba, id, sub ? { sub: true } : {});
    });
    b.setAttribute("data-acao", "ver-diagrama");
    return b;
  }

  function acoesDoNo(no, dem, corpo) {
    var acoes = el("div", "acoes");
    var nav = dem && dem.navegacao;
    if (no.tipo === "chamada" && nav && nav.chamadas[no.id]) {
      var ch = nav.chamadas[no.id];
      var alvo = raiaDe(dem, ch.raia_chamada);
      acoes.appendChild(botao("Ir para a raia: " + (alvo ? alvo.nome : ch.raia_chamada), alvo, function () {
        fecharModal();
        navegar(dem.id, ch.aba, ch.inicio);
      }));
    }
    if (no.tipo === "fim" && nav && nav.chamadores[no.raia]) {
      var rotulo = el("p", "meta", "Chamada por:");
      corpo.appendChild(rotulo);
      nav.chamadores[no.raia].forEach(function (cid) {
        var c = NOS[cid];
        if (!c) { return; }
        var raiaCh = raiaDe(dem, c.raia);
        acoes.appendChild(botao("Voltar para " + cid + " (" + (raiaCh ? raiaCh.nome : c.raia) + ")", raiaCh, function () {
          fecharModal();
          navegar(dem.id, c.aba, cid);
        }));
      });
    }
    (no.ligacoes || []).forEach(function (lg) {
      var destino = demanda(lg.demanda_destino);
      var alvoNo = NOS[lg.para];
      if (!destino || !alvoNo) { return; }
      acoes.appendChild(botao("Ir para a demanda: " + destino.nome, raiaDe(destino, alvoNo.raia), function () {
        fecharModal();
        navegar(destino.id, alvoNo.aba, lg.para);
      }));
    });
    if (acoes.childNodes.length) { corpo.appendChild(acoes); }
    var extra = el("div", "acoes-diagrama");
    extra.appendChild(botaoVerNoDiagrama(no.id, no.aba, dem, raiaDe(dem, no.raia), false));
    corpo.appendChild(extra);
  }

  var ROTULO_NIVEL = { time: "Nível de time", programa: "Nível de programa", operacao: "Operação" };
  function blocoPerguntas(titulo, ids, corpo) {
    var P = DADOS.perguntas || {};
    listaLinks(titulo, (ids || []).map(function (q) {
      var x = P[q];
      return x ? { alvo: q, f: mostrarPergunta, texto: x.texto + (x.quando ? " \u25c6" : "") } : { texto: q };
    }), corpo);
  }
  function chipsRaci(papeis, corpo, titulo) {
    if (!(papeis || []).length) { return; }
    corpo.appendChild(el("h3", null, titulo));
    var w = el("div", "papeis-item");
    papeis.forEach(function (p) { w.appendChild(linkPapel(p.id, p.relacao)); });
    corpo.appendChild(w);
  }
  function linksRefs(titulo, refs, corpo) {
    listaLinks(titulo, (refs || []).map(function (r) {
      if (r.tipo === "tecnica") { return { alvo: r.id, f: mostrarTecnica, prefixo: "técnica \u2192", texto: r.rotulo + " (" + r.id + ")" }; }
      if (r.tipo === "rito") { return { alvo: r.id, f: mostrarRito, prefixo: "rito \u2192", texto: r.rotulo + " (" + r.id + ")" }; }
      return { alvo: r.id, prefixo: (ROTULO_TIPO[r.tipo] || r.tipo).toLowerCase() + " \u2192", texto: r.rotulo + " (" + r.id + ")" + (r.raia_nome ? ", " + r.raia_nome : "") };
    }), corpo);
  }
  function mostrarPergunta(id) {
    modalAtual = { f: mostrarPergunta, id: id };
    var corpo = porId("m-corpo");
    limpar(corpo);
    var q = (DADOS.perguntas || {})[id];
    var cab = porId("m-cab");
    cab.style.background = ""; cab.style.color = "";
    porId("m-titulo").textContent = "Pergunta-chave";
    if (!q) { corpo.appendChild(el("p", null, "Pergunta não encontrada: " + id)); abrirModal(); return; }
    corpo.appendChild(el("p", "rotulo", q.texto));
    var meta = el("p", "meta");
    meta.appendChild(el("span", "cat-selo pergunta", "Pergunta"));
    meta.appendChild(document.createTextNode(" Id: "));
    meta.appendChild(el("code", "mono", id));
    corpo.appendChild(meta);
    corpo.appendChild(el("h3", null, "Tailoring: quando se aplica"));
    corpo.appendChild(el("p", q.quando ? "cond-linha" : "meta", q.quando ? "\u25c6 " + q.quando + (q.quando_origem ? " (herdado de " + q.quando_origem + ")" : "") : "Sempre se aplica."));
    linksRefs("Respondida por", q.depende_de, corpo);
    chipsRaci(q.papeis, corpo, q.raci_herdado ? "RACI (herdado de quem responde)" : "RACI");
    linksRefs("Citada nos playbooks de", q.citada_nos, corpo);
    listaLinks("Citada nos ritos", (q.citada_ritos || []).map(function (r) {
      var x = (DADOS.ritos || {})[r];
      return { alvo: r, f: mostrarRito, texto: (x ? x.nome : r) + " (" + r + ")" };
    }), corpo);
    abrirModal();
  }
  function mostrarRito(id) {
    modalAtual = { f: mostrarRito, id: id };
    var corpo = porId("m-corpo");
    limpar(corpo);
    var r = (DADOS.ritos || {})[id];
    var cab = porId("m-cab");
    cab.style.background = ""; cab.style.color = "";
    porId("m-titulo").textContent = r ? r.nome : id;
    if (!r) { corpo.appendChild(el("p", null, "Rito não encontrado: " + id)); abrirModal(); return; }
    var meta = el("p", "meta");
    meta.appendChild(el("span", "cat-selo rito", "Rito"));
    meta.appendChild(document.createTextNode(" " + (ROTULO_NIVEL[r.nivel] || r.nivel) + (r.ordem ? ", passo " + r.ordem : "") + ". Id: "));
    meta.appendChild(el("code", "mono", id));
    corpo.appendChild(meta);
    if (r.objetivo) { corpo.appendChild(el("h3", null, "Objetivo")); corpo.appendChild(el("p", null, r.objetivo)); }
    var cad = [r.cadencia ? "Cadência: " + r.cadencia : "", r.duracao ? "Duração: " + r.duracao : ""].filter(Boolean).join(". ");
    if (cad) { corpo.appendChild(el("p", "meta", cad)); }
    corpo.appendChild(el("h3", null, "Tailoring: quando se aplica"));
    corpo.appendChild(el("p", r.quando ? "cond-linha" : "meta", r.quando ? "\u25c6 " + r.quando : "Sempre se aplica."));
    chipsRaci(r.papeis, corpo, "RACI");
    lista("Premissas", r.premissas, corpo);
    lista("Comportamentos esperados", r.comportamentos_esperados, corpo);
    lista("Evitar", r.evitar, corpo);
    blocoDados("Entradas", r.entradas, corpo);
    blocoDados("Saídas", r.saidas, corpo);
    listaLinks("Técnicas", (r.tecnicas || []).map(function (t) { return TEC[t.id] ? { alvo: t.id, f: mostrarTecnica, texto: t.nome + " (" + t.id + ")" } : { texto: t.nome }; }), corpo);
    blocoPerguntas("Perguntas-chave", r.perguntas, corpo);
    linksRefs("Acontece em", r.acontece_em, corpo);
    if (r.exemplo) { corpo.appendChild(el("h3", null, "Exemplo")); corpo.appendChild(el("p", "exemplo-bloco", r.exemplo)); }
    var seq = [["Rito anterior", r.anterior], ["Próximo rito", r.seguinte]].filter(function (x) { return x[1]; });
    listaLinks("Sequência", seq.map(function (x) {
      var o = (DADOS.ritos || {})[x[1]];
      return { alvo: x[1], f: mostrarRito, prefixo: x[0] + " \u2192", texto: (o ? o.nome : x[1]) };
    }), corpo);
    abrirModal();
  }
  function blocoPapeisNo(no, corpo) {
    if (!(no.papeis || []).length) { return; }
    corpo.appendChild(el("h3", null, no.tipo === "bifurcacao" ? "Quem decide (RACI)" : "Papéis (RACI)"));
    var w = el("div", "papeis-item");
    no.papeis.forEach(function (p) { w.appendChild(linkPapel(p.id, p.relacao)); });
    corpo.appendChild(w);
  }
  function mostrarNo(id) {
    modalAtual = { f: mostrarNo, id: id };
    var corpo = porId("m-corpo");
    limpar(corpo);
    var no = NOS[id];
    var dem = demandaDoItem(no);
    var raia = no ? raiaDe(dem, no.raia) : null;
    var cab = porId("m-cab");
    cab.style.background = raia ? raia.cor : "";
    cab.style.color = raia ? raia.texto_cor : "";
    porId("m-titulo").textContent = id;
    if (!no) {
      corpo.appendChild(el("p", "aviso", "Playbook ainda não escrito: " + id));
      abrirModal();
      return;
    }
    corpo.appendChild(el("p", "rotulo", no.rotulo));
    var meta = el("p", "meta");
    meta.appendChild(document.createTextNode("Tipo: " + (ROTULO_TIPO[no.tipo] || no.tipo) + ". Raia: "));
    var chip = el("span", "chip", raia ? raia.nome : no.raia);
    pintar(chip, raia);
    meta.appendChild(chip);
    if (raia && raia.responsabilidade) { meta.appendChild(document.createTextNode(". Responsabilidade da raia: " + raia.responsabilidade)); }
    if (no.retorno) { meta.appendChild(document.createTextNode(". Retorno: " + no.retorno)); }
    corpo.appendChild(meta);
    blocoPapeisNo(no, corpo);
    listaLinks("Ritos que acontecem aqui", (no.ritos || []).map(function (r) {
      var x = (DADOS.ritos || {})[r];
      return { alvo: r, f: mostrarRito, texto: (x ? x.nome : r) + " (" + r + ")" };
    }), corpo);
    acoesDoNo(no, dem, corpo);
    blocoDados("Entradas", no.entradas, corpo);
    blocoDados(no.tipo === "fim" ? "O retorno entrega" : "Saídas", no.saidas, corpo);
    blocoSubtarefas(no, dem, raia, corpo);
    blocoTecnicas(no.tecnicas, corpo);

    var pb = no.playbook ? PB[no.playbook] : null;
    if (!pb) {
      corpo.appendChild(el("p", "aviso", "Playbook ainda não escrito: " + id));
    } else {
      corpo.appendChild(el("h3", null, "Resumo"));
      corpo.appendChild(el("p", null, pb.resumo));
      if (pb.exemplo) { corpo.appendChild(el("h3", null, "Exemplo")); corpo.appendChild(el("p", "exemplo-bloco", pb.exemplo)); }
      blocoPerguntas("Perguntas-chave", pb.perguntas_ids, corpo);
      lista("Fazer", pb.fazer, corpo);
      lista("Evitar", pb.evitar, corpo);
      var grupos = [];
      pb.referencias.forEach(function (r) {
        var g = grupos.length ? grupos[grupos.length - 1] : null;
        if (!g || g.colecao !== r.colecao) { g = { colecao: r.colecao, titulo: r.grupo_rotulo, itens: [] }; grupos.push(g); }
        g.itens.push(r.colecao === "tecnicas" && TEC[r.id] ? { alvo: r.id, f: mostrarTecnica, texto: r.nome + " (" + r.id + ")" }
                                                           : { texto: r.nome + " (" + r.id + ")" });
      });
      grupos.forEach(function (g) { listaLinks(g.titulo, g.itens, corpo); });
    }
    listaLinks("Próximos passos", (no.transicoes || []).map(function (s) {
      return { alvo: s.para, prefixo: (s.condicao ? s.condicao : "segue") + " \u2192", texto: s.rotulo_destino + " (" + s.para + ")" };
    }), corpo);
    listaLinks("Ligações entre demandas", (no.ligacoes || []).map(function (lg) {
      var d = demanda(lg.demanda_destino);
      return { alvo: lg.para, prefixo: lg.tipo + ": " + lg.rotulo + " \u2192 " + (d ? d.nome : lg.demanda_destino) + ",",
               texto: lg.para_rotulo + " (" + lg.para + ")" + (lg.condicao ? ". Quando: " + lg.condicao : "") };
    }), corpo);
    abrirModal();
  }

  function mostrarSub(id) {
    modalAtual = { f: mostrarSub, id: id };
    var st = SUBS[id];
    var corpo = porId("m-corpo");
    limpar(corpo);
    if (!st) { return; }
    var tarefa = NOS[st.tarefa];
    var dem = demandaDoItem(st);
    var raia = raiaDe(dem, st.raia);
    var cab = porId("m-cab");
    cab.style.background = raia ? raia.cor : "";
    cab.style.color = raia ? raia.texto_cor : "";
    porId("m-titulo").textContent = id;
    corpo.appendChild(el("p", "rotulo", st.rotulo));
    var meta = el("p", "meta");
    meta.appendChild(document.createTextNode("Subtarefa " + st.indice + " de " + st.total + " de "));
    meta.appendChild(el("code", "mono", st.tarefa));
    meta.appendChild(document.createTextNode(". Raia: "));
    var chip = el("span", "chip", raia ? raia.nome : st.raia);
    pintar(chip, raia);
    meta.appendChild(chip);
    meta.appendChild(document.createTextNode(". Responsável: "));
    meta.appendChild(chipPapel(st));
    corpo.appendChild(meta);
    if (st.descricao) { corpo.appendChild(el("p", null, st.descricao)); }
    if (st.condicional) {
      var eq = el("p", "executar-quando");
      eq.appendChild(el("span", "selo sub-cond", "\u25c6 condicional"));
      eq.appendChild(document.createTextNode(" Executar quando: " + semPrefixoQuando(st.quando)));
      corpo.appendChild(eq);
      if (st.porque) { corpo.appendChild(el("p", "meta porque", "Porque: " + st.porque)); }
    } else if (st.porque) {
      corpo.appendChild(el("p", "meta porque", "Porque: " + st.porque));
    }
    if (st.exemplo) { corpo.appendChild(el("h3", null, "Exemplo")); corpo.appendChild(el("p", "exemplo-bloco", st.exemplo)); }
    var acoes = el("div", "acoes");
    var bt = botao("Ir para a tarefa: " + (tarefa ? tarefa.rotulo : st.tarefa), raia, function () {
      fecharModal();
      navegar(dem.id, st.aba, st.tarefa, { sub: true });
    });
    bt.classList.add("destacado");
    acoes.appendChild(bt);
    [["Anterior", st.anterior], ["Próxima", st.proxima]].forEach(function (par) {
      var alvo = par[1] ? SUBS[par[1]] : null;
      if (!alvo) { return; }
      var b = botao(par[0], null, function () { mostrarSub(alvo.id); });
      b.title = alvo.rotulo + " (" + alvo.id + ")";
      b.setAttribute("data-alvo", alvo.id);
      acoes.appendChild(b);
    });
    corpo.appendChild(acoes);
    var extra = el("div", "acoes-diagrama");
    extra.appendChild(botaoVerNoDiagrama(id, st.aba, dem, raia, true));
    corpo.appendChild(extra);
    blocoDados("Entradas", st.entradas, corpo);
    blocoDados("Saídas", st.saidas, corpo);
    blocoTecnicas(st.tecnicas, corpo);
    abrirModal();
  }
  function abrirItem(id) {
    if (SUBS[id]) { mostrarSub(id); } else { mostrarNo(id); }
  }

  /* ----------------------------------------------------------- diagramas */
  function aplicarZoom(v) {
    if (!v.svg) { return; }
    v.svg.setAttribute("width", String(Math.round(v.largura * v.zoom)));
    v.svg.setAttribute("height", String(Math.round(v.altura * v.zoom)));
    v.svg.style.width = Math.round(v.largura * v.zoom) + "px";
    v.svg.style.height = Math.round(v.altura * v.zoom) + "px";
  }

  function ligarNos(v, mapa) {
    var nos = v.svg.querySelectorAll("g.node");
    Array.prototype.forEach.call(nos, function (g) {
      var m = /flowchart-(.+)-\d+$/.exec(g.id || "");
      if (!m) { return; }
      var original = mapa[m[1]];
      if (original === undefined) { return; }
      g.setAttribute("data-id", original);
      v.nos[original] = g;
      g.addEventListener("click", function () { abrirItem(original); });
    });
  }

  /* A responsabilidade da raia fica no tooltip do grupo do subgraph (o título leva só o nome). */
  function rotularRaias(v, dem) {
    var grupos = v.svg.querySelectorAll("g.cluster");
    Array.prototype.forEach.call(grupos, function (g) {
      var id = g.id || "";
      var raiaId = null;
      Object.keys(dem.subgraphs || {}).forEach(function (sg) {
        if (id.length >= sg.length && id.slice(id.length - sg.length) === sg) { raiaId = dem.subgraphs[sg]; }
      });
      var raia = raiaId ? raiaDe(dem, raiaId) : null;
      if (!raia) { return; }
      var texto = raia.nome + (raia.responsabilidade ? ": " + raia.responsabilidade : "");
      g.setAttribute("title", texto);
      g.setAttribute("data-raia", raia.id);
      var t = document.createElementNS(g.namespaceURI, "title");
      t.textContent = texto;
      g.insertBefore(t, g.firstChild);
    });
  }

  function chaveVista(demId, visaoId, sub, raias) { return demId + "|" + visaoId + "|" + (sub ? "s" : "o") + (raias ? "|r" : ""); }
  /* Visão completa: a aba "visao" desenha só a orquestradora ou, com raias visíveis, o diagrama completo. */
  function visaoCompleto(dem) { return dem.visoes.filter(function (x) { return x.id === "completo"; })[0] || null; }
  function fonteDiagrama(dem, visao, raias) {
    var c = visao.id === "visao" && raias ? visaoCompleto(dem) : null;
    return c || visao;
  }

  function renderizar(dem, visao, sub, raias) {
    var chave = chaveVista(dem.id, visao.id, sub, raias);
    if (vistas[chave]) { return vistas[chave].pronta; }
    var box = el("div", "visao");
    porId("rolagem").appendChild(box);
    var v = { box: box, svg: null, zoom: 1, largura: 0, altura: 0, nos: {}, pronta: null };
    vistas[chave] = v;
    if (visao.id === "catalogo") {
      montarCatalogo(dem, v);
      box.classList.add("ativa");
      v.pronta = Promise.resolve(v);
      return v.pronta;
    }
    var fonte = fonteDiagrama(dem, visao, raias);
    var pre = el("pre", "mermaid", sub ? fonte.mmd_sub : fonte.mmd);
    box.appendChild(pre);
    box.classList.add("ativa");
    v.pronta = mermaid.run({ nodes: [pre] }).then(function () {
      var svg = pre.querySelector("svg");
      if (!svg) { throw new Error("o Mermaid não produziu o diagrama"); }
      var vb = (svg.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
      v.svg = svg;
      v.largura = vb[2] || svg.getBoundingClientRect().width;
      v.altura = vb[3] || svg.getBoundingClientRect().height;
      aplicarZoom(v);
      ligarNos(v, sub ? fonte.mapa_sub : fonte.mapa);
      rotularRaias(v, dem);
      return v;
    }).catch(function (e) {
      limpar(box);
      box.appendChild(el("p", "erro", "Falha ao desenhar " + visao.arquivo + ": " + (e && e.message ? e.message : e)));
      return v;
    });
    return v.pronta;
  }

  /* ----------------------------------------------------------- aba Catálogo */
  var CATEG = [
    ["artefato", "Artefato"], ["variavel", "Variável"], ["inicio", "Início"], ["tarefa", "Tarefa"],
    ["gateway", "Gateway"], ["chamada", "Chamada"], ["fim", "Fim"], ["subtarefa", "Subtarefa"], ["tecnica", "Técnica"], ["papel", "Papel"], ["rito", "Rito"], ["pergunta", "Pergunta"]
  ];
  var ROTULO_CATEG = {};
  CATEG.forEach(function (c) { ROTULO_CATEG[c[0]] = c[1]; });

  function botaoRef(ref, dem) {
    var alvoDem = demandaDoItem(ref) || dem;
    var texto = ref.id + ": " + ref.rotulo + (alvoDem.id !== dem.id ? " (" + alvoDem.nome + ")" : "");
    var b = botao(texto, raiaDe(alvoDem, ref.raia), function () {
      fecharModal();
      navegar(alvoDem.id, ref.aba, ref.tipo === "raia" ? null : ref.id, ref.sub ? { sub: true } : {});
    });
    b.className = "btn-ref";
    b.setAttribute("data-ref", ref.id);
    b.title = (ref.tipo === "raia" ? "Raia" : ref.tipo === "subtarefa" ? "Subtarefa" : "Nó " + (ROTULO_TIPO[ref.tipo] || ref.tipo)) + ", raia " + ref.raia_nome;
    return b;
  }

  function abrirLinha(li) {
    if (li.categoria === "artefato" || li.categoria === "variavel") { mostrarDado(li.id); }
    else if (li.categoria === "tecnica") { mostrarTecnica(li.id); }
    else if (li.categoria === "papel") { mostrarPapel(li.id); }
    else if (li.categoria === "rito") { mostrarRito(li.id); }
    else if (li.categoria === "pergunta") { mostrarPergunta(li.id); }
    else { abrirItem(li.id); }
  }

  /* `fora`: o item tem produtores ou consumidores, mas só em outra demanda (não é lacuna). */
  function blocoRefs(titulo, refs, vazio, dem, pai, fora) {
    var h = el("h3", null, titulo + " ");
    h.appendChild(el("span", "contagem", "(" + refs.length + ")"));
    pai.appendChild(h);
    if (!refs.length && fora) { pai.appendChild(el("p", "meta", "Nenhum nesta demanda (veja \u201cTambém usado em\u201d).")); return; }
    if (!refs.length) { pai.appendChild(el("p", "lacuna-msg", "\u26a0 " + vazio)); return; }
    var w = el("div", "ref-lista");
    refs.forEach(function (r) { w.appendChild(botaoRef(r, dem)); });
    pai.appendChild(w);
  }

  var ROTULO_EXTRA = {
    boas_praticas: "Boas práticas", formato_de_comentario: "Formato do comentário", perspectivas: "Perspectivas",
    antes_do_diff: "Antes de olhar o diff", produto: "Produto", arquitetura: "Arquitetura", correcao: "Correção",
    seguranca: "Segurança", performance: "Performance", testes: "Testes", legibilidade: "Legibilidade", operacao: "Operação",
    niveis: "Níveis", classificacao_de_comentarios: "Classificação dos comentários",
    como_aplicar: "Como aplicar", resultado_esperado: "Resultado esperado"
  };
  function rotuloExtra(chave) {
    if (ROTULO_EXTRA[chave]) { return ROTULO_EXTRA[chave]; }
    var t = chave.replace(/_/g, " ");
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function valorExtra(v, pai) {
    if (Array.isArray(v)) {
      var ul = el("ul");
      v.forEach(function (x) {
        if (x && x.__pares) {
          ul.appendChild(el("li", null, x.__pares.map(function (p) { return p[1]; }).join(". ")));
        } else { ul.appendChild(el("li", null, String(x))); }
      });
      pai.appendChild(ul);
    } else if (v && v.__pares) {
      v.__pares.forEach(function (p) {
        pai.appendChild(el("h4", null, rotuloExtra(p[0])));
        valorExtra(p[1], pai);
      });
    } else if (v !== null && v !== undefined && v !== "") {
      pai.appendChild(el("p", null, String(v)));
    }
  }
  /* Modal de técnica: descrição, exemplo, quando usar e evitar, campos extras e onde é usada (links). */
  function mostrarTecnica(id) {
    modalAtual = { f: mostrarTecnica, id: id };
    var tc = TEC[id];
    var corpo = porId("m-corpo");
    limpar(corpo);
    var cab = porId("m-cab");
    cab.style.background = "";
    cab.style.color = "";
    porId("m-titulo").textContent = id;
    if (!tc) { corpo.appendChild(el("p", "aviso", "Técnica não encontrada: " + id)); abrirModal(); return; }
    corpo.appendChild(el("p", "rotulo", tc.nome));
    var meta = el("p", "meta");
    meta.appendChild(el("span", "cat-selo tecnica", "Técnica"));
    meta.appendChild(document.createTextNode(" Id: "));
    meta.appendChild(el("code", "mono", id));
    corpo.appendChild(meta);
    if (tc.descricao) { corpo.appendChild(el("h3", null, "Descrição")); corpo.appendChild(el("p", null, tc.descricao)); }
    if (tc.exemplo) { corpo.appendChild(el("h3", null, "Exemplo")); corpo.appendChild(el("p", "exemplo-bloco", tc.exemplo)); }
    lista("Quando usar", tc.quando_usar, corpo);
    lista("Quando evitar", tc.quando_evitar, corpo);
    ((tc.extras && tc.extras.__pares) || []).forEach(function (p) {
      corpo.appendChild(el("h3", null, rotuloExtra(p[0])));
      valorExtra(p[1], corpo);
    });
    var dem = demanda(estado.demanda);
    var usos = tc.usada_em || [];
    var daqui = usos.filter(function (r) { return !dem || pertence(r, dem.id); });
    var fora = usos.filter(function (r) { return dem && !pertence(r, dem.id); });
    function itensDe(refs) {
      return refs.map(function (r) {
        var d = demandaDoItem(r);
        return { alvo: r.id, prefixo: (r.uso === "playbook" ? "citada no playbook" : (ROTULO_USO[r.uso] || r.uso)) + " \u2192",
                 texto: r.rotulo + " (" + r.id + ")" + (dem && !pertence(r, dem.id) && d ? ", " + d.nome : "") };
      });
    }
    listaLinks("Usada nesta demanda (" + daqui.length + ")", itensDe(daqui), corpo);
    listaLinks("Usada em outras demandas (" + fora.length + ")", itensDe(fora), corpo);
    if (!usos.length) { corpo.appendChild(el("p", "meta", "Ainda não usada em nenhum nó ou subtarefa.")); }
    abrirModal();
  }

  /* Modal de artefato ou variável: descrição, exemplo, valores, quem produz e consome, condições. */
  function mostrarDado(id) {
    modalAtual = { f: mostrarDado, id: id };
    var d = CAT[id];
    var dem = demanda(estado.demanda);
    var corpo = porId("m-corpo");
    limpar(corpo);
    var cab = porId("m-cab");
    cab.style.background = "";
    cab.style.color = "";
    porId("m-titulo").textContent = id;
    if (!d) { corpo.appendChild(el("p", "aviso", "Item não encontrado: " + id)); abrirModal(); return; }
    corpo.appendChild(el("p", "rotulo", d.nome));
    var meta = el("p", "meta");
    meta.appendChild(el("span", "cat-selo " + d.classe, ROTULO_CATEG[d.classe]));
    meta.appendChild(document.createTextNode(" Tipo: " + (d.classe === "artefato" ? rotuloTipoArt(d.tipo) : (d.tipo || "sem tipo"))
      + (d.subtipo ? ". Subtipo: " + d.subtipo : "") + ". Id: "));
    meta.appendChild(el("code", "mono", id));
    corpo.appendChild(meta);
    if (d.descricao) { corpo.appendChild(el("h3", null, "Descrição")); corpo.appendChild(el("p", null, d.descricao)); }
    if (d.exemplo) { corpo.appendChild(el("h3", null, "Exemplo")); corpo.appendChild(el("p", "exemplo-bloco", d.exemplo)); }
    if (d.variantes && d.variantes.length) {
      var hv = el("h3", null, "Variantes ");
      hv.appendChild(el("span", "contagem", "(" + d.variantes.length + ", conforme o contexto)"));
      corpo.appendChild(hv);
      var ulv = el("ul", "variantes");
      d.variantes.forEach(function (v) {
        var liv = el("li");
        liv.setAttribute("data-variante", v.nome);
        liv.appendChild(el("strong", null, v.nome));
        if (v.quando) { liv.appendChild(el("div", "meta quando", "Vale " + v.quando)); }
        if (v.descricao) { liv.appendChild(el("p", null, v.descricao)); }
        if (v.exemplo) { liv.appendChild(el("p", "exemplo-bloco", v.exemplo)); }
        ulv.appendChild(liv);
      });
      corpo.appendChild(ulv);
    }
    if (d.classe === "variavel") {
      var valores = d.valores && d.valores.length ? d.valores : (d.tipo === "booleano" ? ["sim", "nao"] : []);
      if (valores.length) {
        corpo.appendChild(el("h3", null, "Valores permitidos"));
        var w = el("div", "chips");
        valores.forEach(function (x) { w.appendChild(el("span", "chip-dado variavel", x)); });
        corpo.appendChild(w);
      }
      if (d.inicial !== null && d.inicial !== undefined && d.inicial !== "") {
        corpo.appendChild(el("h3", null, "Valor inicial"));
        corpo.appendChild(el("p", null, String(d.inicial)));
      }
    }
    var loc = (d.por_demanda && d.por_demanda[dem.id]) || { produzido_por: [], consumido_por: [], condicoes: [] };
    if (!loc.produzido_por.length && d.lacunas.indexOf("produtor") < 0 && !(d.produzido_por || []).length) {
      var hp = el("h3", null, "Produzido por ");
      hp.appendChild(el("span", "contagem", "(0)"));
      corpo.appendChild(hp);
      corpo.appendChild(el("p", "meta", "Começa com o valor inicial da variável."));
    } else {
      blocoRefs("Produzido por", loc.produzido_por, "sem produtor", dem, corpo, (d.produzido_por || []).length > 0);
    }
    if (d.destinatarios && d.destinatarios.length) {
      corpo.appendChild(el("h3", null, "Destinatários"));
      var wd = el("div", "chips");
      d.destinatarios.forEach(function (x) { wd.appendChild(el("span", "resp papel", x)); });
      corpo.appendChild(wd);
    }
    if (!loc.consumido_por.length && d.lacunas.indexOf("consumidor") < 0 && !(d.consumido_por || []).length) {
      if (!(d.destinatarios && d.destinatarios.length)) {
        var hc = el("h3", null, "Consumido por ");
        hc.appendChild(el("span", "contagem", "(0)"));
        corpo.appendChild(hc);
        corpo.appendChild(el("p", "meta", "Lida nas condições de técnicas ou subtarefas (veja abaixo)."));
      }
    } else {
      blocoRefs("Consumido por", loc.consumido_por, "sem consumidor", dem, corpo, (d.consumido_por || []).length > 0);
    }
    if (loc.condicoes.length) {
      var h = el("h3", null, "Usada em condições ");
      h.appendChild(el("span", "contagem", "(" + loc.condicoes.length + ")"));
      corpo.appendChild(h);
      var ul = el("ul", "tecnicas");
      loc.condicoes.forEach(function (c) {
        var li = el("li");
        li.setAttribute("data-origem", c.origem);
        var w2 = el("div", "ref-lista");
        if (c.origem === "tecnica") {
          li.appendChild(seloUso(c.uso));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(linkTecnica(c.tecnica, c.nome_tecnica));
          li.appendChild(document.createTextNode(" "));
          li.appendChild(el("code", "mono", c.tecnica));
        } else if (c.origem === "subtarefa") {
          li.appendChild(el("span", "selo sub-cond", "\u25c6 executa a subtarefa"));
        } else {
          li.appendChild(el("span", "selo sub-cond", "variante \u201c" + c.variante + "\u201d"));
        }
        li.appendChild(el("div", "meta quando", c.quando));
        if (c.origem === "variante") {
          var bv = botao("Abrir o artefato: " + c.dono.rotulo, null, function () { irPara(mostrarDado, c.dono.id); });
          bv.className = "btn-ref";
          w2.appendChild(bv);
        } else {
          w2.appendChild(botaoRef(c.dono, dem));
        }
        li.appendChild(w2);
        ul.appendChild(li);
      });
      corpo.appendChild(ul);
    }
    var outras = (d.demandas || []).filter(function (x) { return x !== dem.id && demanda(x); });
    if (outras.length) {
      var tambem = el("p", "meta tambem-usado", "Também usado em: ");
      outras.forEach(function (x) {
        var alvo = demanda(x);
        var bt = el("button", "btn-demanda", alvo.nome);
        bt.type = "button";
        bt.setAttribute("data-demanda", x);
        bt.title = "Abrir " + id + " no Catálogo de " + alvo.nome;
        bt.addEventListener("click", function () {
          fecharModal();
          navegar(x, "catalogo").then(function () { mostrarDado(id); });
        });
        tambem.appendChild(bt);
        tambem.appendChild(document.createTextNode(" "));
      });
      corpo.appendChild(tambem);
    }
    abrirModal();
  }

  function montarCatalogo(dem, v) {
    var box = v.box;
    box.classList.add("catalogo");
    var linhas = dem.catalogo || [];
    var filtros = { raia: "", tipos: {}, tiposArt: {}, subtipos: {}, papel: "", letra: "" };
    var topo = el("div", "catalogo-topo");

    var l1 = el("div", "linha");
    var lf = el("label", null, "Filtrar ");
    lf.setAttribute("for", "filtro-catalogo-" + dem.id);
    var inp = el("input");
    inp.type = "search";
    inp.id = "filtro-catalogo-" + dem.id;  // um Catálogo por demanda no DOM: ids únicos
    inp.placeholder = "id, nome, descrição ou exemplo";
    var limpa = el("button", null, "Limpar filtros");
    limpa.type = "button";
    limpa.id = "limpar-filtros-" + dem.id;
    var cont = el("span", "meta");
    cont.id = "contador-catalogo-" + dem.id;
    cont.setAttribute("aria-live", "polite");
    [lf, inp, limpa, cont].forEach(function (x) { l1.appendChild(x); });
    topo.appendChild(l1);

    var l2 = el("div", "linha");
    l2.appendChild(el("span", "rotulo-grupo", "Raia"));
    var gRaia = el("div", "grupo");
    gRaia.setAttribute("role", "group");
    gRaia.setAttribute("aria-label", "Filtrar por raia");
    var opcoes = [{ id: "", nome: "Todas", raia: null }]
      .concat(dem.raias.map(function (r) { return { id: r.id, nome: r.nome, raia: r }; }))
      .concat([{ id: "-", nome: "Sem raia", raia: null }]);
    var btsRaia = opcoes.map(function (o) {
      var b = el("button", "filtro-raia", o.nome);
      b.type = "button";
      b.setAttribute("data-raia", o.id);
      b.setAttribute("aria-pressed", "false");
      pintar(b, o.raia);
      b.addEventListener("click", function () { filtros.raia = o.id; filtrar(); });
      gRaia.appendChild(b);
      return b;
    });
    l2.appendChild(gRaia);
    topo.appendChild(l2);

    var l3 = el("div", "linha");
    l3.appendChild(el("span", "rotulo-grupo", "Categoria"));
    var gTipo = el("div", "grupo");
    gTipo.setAttribute("role", "group");
    gTipo.setAttribute("aria-label", "Filtrar por categoria");
    var btsTipo = CATEG.map(function (c) {
      var b = el("button", "filtro-tipo", c[1]);
      b.type = "button";
      b.setAttribute("data-tipo", c[0]);
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { filtros.tipos[c[0]] = !filtros.tipos[c[0]]; filtrar(); });
      gTipo.appendChild(b);
      return b;
    });
    l3.appendChild(gTipo);
    topo.appendChild(l3);

    // Filtro por TIPO de artefato: só os tipos presentes na demanda, na ordem estável do enum do schema.
    var presentes = {};
    linhas.forEach(function (li) { if (li.categoria === "artefato") { presentes[li.tipo || "-"] = true; } });
    var tiposArtLista = ORDEM_TIPO_ART.filter(function (t) { return presentes[t]; });
    Object.keys(presentes).sort().forEach(function (t) { if (t !== "-" && tiposArtLista.indexOf(t) < 0) { tiposArtLista.push(t); } });
    if (presentes["-"]) { tiposArtLista.push("-"); }
    var btsTipoArt = [];
    if (tiposArtLista.length) {
      var l4 = el("div", "linha");
      l4.appendChild(el("span", "rotulo-grupo", "Tipo de artefato"));
      var gTA = el("div", "grupo");
      gTA.setAttribute("role", "group");
      gTA.setAttribute("aria-label", "Filtrar por tipo de artefato");
      btsTipoArt = tiposArtLista.map(function (t) {
        var b = el("button", "filtro-tipo-artefato", rotuloTipoArt(t === "-" ? "" : t));
        b.type = "button";
        b.setAttribute("data-tipo-artefato", t);
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { filtros.tiposArt[t] = !filtros.tiposArt[t]; filtrar(); });
        gTA.appendChild(b);
        return b;
      });
      l4.appendChild(gTA);
      topo.appendChild(l4);
    }
    var l7 = el("div", "linha");
    l7.hidden = true;
    l7.appendChild(el("span", "rotulo-grupo", "Subtipo"));
    var gST = el("div", "grupo");
    gST.setAttribute("role", "group");
    gST.setAttribute("aria-label", "Filtrar por subtipo de artefato");
    l7.appendChild(gST);
    topo.appendChild(l7);
    var btsSubtipo = [];
    var chaveSubtipos = "";
    /* Recria os botões de subtipo para os tipos escolhidos; some quando nenhum tipo escolhido tem subtipo. */
    function montarSubtipos(tiposAtivos) {
      var lista = [];
      linhas.forEach(function (li) {
        if (li.categoria === "artefato" && tiposAtivos.indexOf(li.tipo || "-") >= 0 && li.subtipo && lista.indexOf(li.subtipo) < 0) { lista.push(li.subtipo); }
      });
      lista.sort(function (a, b) { return a.localeCompare(b, "pt", { sensitivity: "base" }); });
      var chave = lista.join("|");
      if (chave === chaveSubtipos) { return; }
      chaveSubtipos = chave;
      Object.keys(filtros.subtipos).forEach(function (s) { if (lista.indexOf(s) < 0) { delete filtros.subtipos[s]; } });
      limpar(gST);
      btsSubtipo = lista.map(function (s) {
        var b = el("button", "filtro-subtipo", s);
        b.type = "button";
        b.setAttribute("data-subtipo", s);
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { filtros.subtipos[s] = !filtros.subtipos[s]; filtrar(); });
        gST.appendChild(b);
        return b;
      });
      l7.hidden = !lista.length;
    }
    // Filtro por PAPEL: os papéis que atuam na demanda; mostra as tarefas, os gateways e as subtarefas de cada um.
    var papeisLista = linhas.filter(function (li) { return li.categoria === "papel"; });
    var btsPapel = [];
    var btsLetra = [];
    if (papeisLista.length) {
      var l5 = el("div", "linha");
      l5.appendChild(el("span", "rotulo-grupo", "Papel"));
      var gP = el("div", "grupo");
      gP.setAttribute("role", "group");
      gP.setAttribute("aria-label", "Filtrar por papel");
      btsPapel = [{ id: "", nome: "Todos" }].concat(papeisLista.map(function (li) { return { id: li.id, nome: li.nome }; })).map(function (o) {
        var b = el("button", "filtro-papel", o.nome);
        b.type = "button";
        b.setAttribute("data-papel", o.id);
        b.setAttribute("aria-pressed", "false");
        var pa = (DADOS.papeis || {})[o.id];
        if (pa) { b.title = pa.descricao; }
        b.addEventListener("click", function () { filtros.papel = o.id; filtrar(); });
        gP.appendChild(b);
        return b;
      });
      l5.appendChild(gP);
      topo.appendChild(l5);
      var l6 = el("div", "linha");
      l6.appendChild(el("span", "rotulo-grupo", "RACI"));
      var gL = el("div", "grupo");
      gL.setAttribute("role", "group");
      gL.setAttribute("aria-label", "Filtrar pela letra do RACI");
      btsLetra = [["", "Todas"]].concat(RACI).map(function (o) {
        var b = el("button", "filtro-letra", o[1]);
        b.type = "button";
        b.setAttribute("data-letra", o[0]);
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { filtros.letra = o[0]; filtrar(); });
        gL.appendChild(b);
        return b;
      });
      l6.appendChild(gL);
      topo.appendChild(l6);
    }
    box.appendChild(topo);

    var tabela = el("table");
    var cab = el("tr");
    ["Item", "Categoria", "Raia", "Descrição", "Exemplo"].forEach(function (t) {
      var th = el("th", null, t);
      th.scope = "col";
      cab.appendChild(th);
    });
    var thead = el("thead");
    thead.appendChild(cab);
    tabela.appendChild(thead);
    var tbody = el("tbody");
    var trs = [];
    linhas.forEach(function (li) {
      var raia = li.raia ? raiaDe(dem, li.raia) : null;
      var tr = el("tr");
      tr.setAttribute("data-item", li.id);
      tr.setAttribute("data-categoria", li.categoria);
      tr.setAttribute("data-raia", li.raia || "-");
      if (li.categoria === "artefato") { tr.setAttribute("data-tipo-artefato", li.tipo || "-"); tr.setAttribute("data-subtipo", li.subtipo || ""); }
      var c1 = el("td");
      var nome = el("button", "abrir", li.nome);
      nome.type = "button";
      nome.setAttribute("aria-haspopup", "dialog");
      c1.appendChild(nome);
      c1.appendChild(document.createTextNode(" "));
      c1.appendChild(el("code", "mono", li.id));
      if (li.pai) { c1.appendChild(el("div", "meta", "na tarefa " + li.pai_rotulo + " (" + li.pai + ")")); }
      if (li.condicional) { c1.appendChild(el("div", "meta cond-linha", "\u25c6 condicional: " + li.quando)); }
      if (li.categoria === "artefato") {
        c1.appendChild(el("div", "meta tipo-linha", rotuloTipoArt(li.tipo) + (li.subtipo ? " \u00b7 " + li.subtipo : "")));
      }
      var c2 = el("td");
      c2.appendChild(el("span", "cat-selo " + li.categoria, ROTULO_CATEG[li.categoria] || li.categoria));
      var c3 = el("td");
      if (raia) { var chip = el("span", "chip", raia.nome); pintar(chip, raia); c3.appendChild(chip); }
      else if (li.categoria === "tecnica" || li.categoria === "papel" || li.categoria === "rito" || li.categoria === "pergunta") {
        var nr = (li.raias || []).length;
        var mr = el("span", "meta", "em " + nr + (nr === 1 ? " raia" : " raias") + ", " + li.usos + (li.usos === 1 ? " uso" : " usos"));
        mr.title = (li.raias || []).map(function (rid) { var x = raiaDe(dem, rid); return x ? x.nome : rid; }).join(", ");
        c3.appendChild(mr);
      }
      else { c3.appendChild(el("span", "meta", "global")); }
      var c4 = el("td", "desc");
      if (li.descricao) { var cl = el("div", "clamp", li.descricao); cl.title = li.descricao; c4.appendChild(cl); }
      var c5 = el("td", "exemplo", li.exemplo || "");
      [c1, c2, c3, c4, c5].forEach(function (c) { tr.appendChild(c); });
      tr.addEventListener("click", function () { abrirLinha(li); });
      var busca = [li.id, li.nome, li.descricao, li.exemplo, ROTULO_CATEG[li.categoria], raia ? raia.nome : "global", li.pai_rotulo || "",
        (li.raias || []).map(function (rid) { var x = raiaDe(dem, rid); return x ? x.nome : rid; }).join(" "),
        li.categoria === "artefato" ? rotuloTipoArt(li.tipo) + " " + (li.tipo || "") : "", li.subtipo || "", li.quando || ""];
      tr.setAttribute("data-busca", busca.join(" ").toLowerCase());
      tbody.appendChild(tr);
      trs.push({ tr: tr, li: li });
    });
    tabela.appendChild(tbody);
    box.appendChild(tabela);
    var vazio = el("p", "sem-resultados", "Nenhum item combina com os filtros.");
    vazio.hidden = true;
    box.appendChild(vazio);

    function filtrar() {
      var q = inp.value.trim().toLowerCase();
      var tiposAtivos = CATEG.filter(function (c) { return filtros.tipos[c[0]]; }).map(function (c) { return c[0]; });
      var tiposArtAtivos = tiposArtLista.filter(function (t) { return filtros.tiposArt[t]; });
      montarSubtipos(tiposArtAtivos);
      var subAtivos = Object.keys(filtros.subtipos).filter(function (s) { return filtros.subtipos[s]; });
      var n = 0;
      trs.forEach(function (x) {
        var ok = (!q || x.tr.getAttribute("data-busca").indexOf(q) >= 0)
          && (filtros.raia === "" || (x.li.raia || "-") === filtros.raia || (x.li.raias || []).indexOf(filtros.raia) >= 0)
          && (!tiposAtivos.length || tiposAtivos.indexOf(x.li.categoria) >= 0)
          && (!tiposArtAtivos.length || (x.li.categoria === "artefato" && tiposArtAtivos.indexOf(x.li.tipo || "-") >= 0))
          && (!subAtivos.length || (x.li.categoria === "artefato" && subAtivos.indexOf(x.li.subtipo || "") >= 0))
          && (!filtros.papel || (x.li.papeis || []).indexOf(filtros.papel) >= 0)
          && (!filtros.letra || (x.li.letras || []).some(function (pl) {
                return pl.slice(-2) === ":" + filtros.letra && (!filtros.papel || pl === filtros.papel + ":" + filtros.letra); }));
        x.tr.hidden = !ok;
        if (ok) { n += 1; }
      });
      btsRaia.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-raia") === filtros.raia)); });
      btsTipo.forEach(function (b) { b.setAttribute("aria-pressed", String(!!filtros.tipos[b.getAttribute("data-tipo")])); });
      btsTipoArt.forEach(function (b) { b.setAttribute("aria-pressed", String(!!filtros.tiposArt[b.getAttribute("data-tipo-artefato")])); });
      btsPapel.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-papel") === filtros.papel)); });
      btsSubtipo.forEach(function (b) { b.setAttribute("aria-pressed", String(!!filtros.subtipos[b.getAttribute("data-subtipo")])); });
      btsLetra.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-letra") === filtros.letra)); });
      vazio.hidden = n > 0;
      cont.textContent = n + " de " + trs.length + " itens";
    }
    inp.addEventListener("input", filtrar);
    limpa.addEventListener("click", function () {
      inp.value = "";
      filtros.raia = "";
      filtros.tipos = {};
      filtros.tiposArt = {};
      filtros.subtipos = {};
      filtros.papel = "";
      filtros.letra = "";
      filtrar();
    });
    filtrar();
  }

  /* ---------------------------------------------------------- navegação */
  function desenharAbas(dem) {
    var abas = porId("abas");
    limpar(abas);
    // "Completo" virou o modo raias visíveis da Visão completa; o Catálogo fica ao lado do seletor de demanda.
    porId("btn-catalogo").hidden = !dem.visoes.some(function (v) { return v.id === "catalogo"; });
    dem.visoes.filter(function (v) { return v.id !== "completo" && v.id !== "catalogo"; }).forEach(function (v) {
      var b = el("button", null, v.id === "visao" ? "Visão completa" : v.titulo);
      if (v.id === "visao") { v.dica = "Orquestradora com as raias, que podem ser ocultadas, e as subtarefas"; }
      b.type = "button";
      if (v.dica) { b.title = v.dica; }
      b.dataset.visao = v.id;
      var raia = v.id.indexOf("raia:") === 0 ? raiaDe(dem, v.id.slice(5)) : null;
      if (raia) {
        b.dataset.raia = raia.id;
        b.style.setProperty("--cor", raia.cor);
        b.style.setProperty("--cor-texto", raia.texto_cor);
      }
      b.addEventListener("click", function () { navegar(dem.id, v.id); });
      if (raia && !abas.querySelector(".rotulo-grupo")) { abas.appendChild(el("span", "rotulo-grupo", "Raias")); }
      abas.appendChild(b);
    });
  }

  function mostrarLegenda(demandaId) {
    Array.prototype.forEach.call(document.querySelectorAll("#legenda .leg-dem"), function (b) {
      b.hidden = b.getAttribute("data-demanda") !== demandaId;
    });
  }

  function destacar(v, id) {
    var g = id ? v.nos[id] : null;
    if (!g) { return; }
    if (g.scrollIntoView) { g.scrollIntoView({ block: "center", inline: "center" }); }
    g.classList.add("destaque");
    setTimeout(function () { g.classList.remove("destaque"); }, 2000);
  }

  function atualizarVoltar() { porId("voltar").disabled = historico.length === 0; }

  function vistaAtual() { return vistas[chaveVista(estado.demanda, estado.visao, estado.sub, estado.raias)]; }

  function atualizarAlternador(visao, dem) {
    var br = porId("alt-raias");
    var naVisao = !!(visao && visao.id === "visao" && dem && visaoCompleto(dem));
    br.hidden = !naVisao;
    br.setAttribute("aria-pressed", naVisao && estado.raias ? "true" : "false");
    br.textContent = "Raias: " + (naVisao && estado.raias ? "visíveis" : "ocultas");
    var fonte = dem && visao ? fonteDiagrama(dem, visao, estado.raias) : visao;
    var b = porId("alt-sub");
    var tem = !!(fonte && fonte.mmd_sub);
    b.hidden = !tem;
    b.setAttribute("aria-pressed", tem && estado.sub ? "true" : "false");
    b.textContent = "Subtarefas: " + (tem && estado.sub ? "expandidas" : "ocultas");
  }

  /* opcoes.sub: true expande as subtarefas, false oculta; sem valor mantém o modo da aba.
     opcoes.semHistorico: não empilha o estado atual no Voltar. */
  function navegar(demandaId, visaoId, destaque, opcoes) {
    opcoes = opcoes || {};
    var dem = demanda(demandaId);
    if (!dem) { return Promise.resolve(); }
    if (visaoId === "completo") { visaoId = "visao"; opcoes.raias = true; }
    var visao = dem.visoes.filter(function (x) { return x.id === visaoId; })[0] || dem.visoes[0];
    var chaveAba = dem.id + "|" + visao.id;
    var raias = false;
    if (visao.id === "visao" && visaoCompleto(dem)) {
      raias = opcoes.raias === undefined ? !!modoRaias[dem.id] : !!opcoes.raias;  // padrão: raias ocultas
    }
    var fonte = fonteDiagrama(dem, visao, raias);
    var sub = opcoes.sub === undefined ? !!modoSub[chaveAba] : !!opcoes.sub;
    if (!fonte.mmd_sub) { sub = false; }
    var mudou = estado.demanda !== dem.id || estado.visao !== visao.id || estado.sub !== sub || estado.raias !== raias;
    if (!opcoes.semHistorico && estado.demanda && (mudou || (destaque && destaque !== estado.destaque))) {
      historico.push({ demanda: estado.demanda, visao: estado.visao, sub: estado.sub, raias: estado.raias, destaque: estado.destaque });
    }
    if (estado.demanda !== dem.id) {
      porId("demanda").value = dem.id;
      desenharAbas(dem);
      mostrarLegenda(dem.id);
    }
    estado.demanda = dem.id;
    estado.visao = visao.id;
    estado.sub = sub;
    estado.raias = raias;
    estado.destaque = destaque || null;
    modoSub[chaveAba] = sub;
    if (visao.id === "visao") { modoRaias[dem.id] = raias; }
    atualizarVoltar();
    atualizarAlternador(visao, dem);
    Array.prototype.forEach.call(porId("abas").children, function (b) {
      b.classList.toggle("ativa", b.dataset.visao === visao.id);
    });
    porId("btn-catalogo").classList.toggle("ativa", visao.id === "catalogo");
    document.body.classList.toggle("modo-catalogo", visao.id === "catalogo");
    // Desativa já a vista anterior: com raias visíveis, a Visão completa repete os nós das raias, e o destaque
    // não pode cair no diagrama que está saindo.
    var alvo = chaveVista(dem.id, visao.id, sub, raias);
    Object.keys(vistas).forEach(function (k) { if (k !== alvo) { vistas[k].box.classList.remove("ativa"); } });
    return renderizar(dem, visao, sub, raias).then(function (v) {
      Object.keys(vistas).forEach(function (k) { vistas[k].box.classList.remove("ativa"); });
      v.box.classList.add("ativa");
      destacar(v, destaque);
    });
  }

  function voltar() {
    var anterior = historico.pop();
    if (anterior) { navegar(anterior.demanda, anterior.visao, anterior.destaque, { semHistorico: true, sub: anterior.sub, raias: anterior.raias }); }
    atualizarVoltar();
  }

  function zoom(fator, cx, cy) {
    var v = vistaAtual();
    if (!v || !v.svg) { return; }
    var area = porId("rolagem");
    var antes = v.zoom;
    v.zoom = fator === 0 ? 1 : Math.min(4, Math.max(0.2, v.zoom * fator));
    aplicarZoom(v);
    if (cx !== undefined && antes > 0) {
      // Mantém o ponto sob o cursor no mesmo lugar da tela.
      var r = area.getBoundingClientRect();
      var ox = cx - r.left;
      var oy = cy - r.top;
      var k = v.zoom / antes;
      area.scrollLeft = (area.scrollLeft + ox) * k - ox;
      area.scrollTop = (area.scrollTop + oy) * k - oy;
    }
  }

  /* Arrastar (pan): rola o contêiner #rolagem, o mesmo mecanismo da barra e do zoom (que muda width/height do SVG). */
  var LIMIAR_ARRASTE = 4;
  var PASSO_TECLA = 60;
  function ligarArraste() {
    var area = porId("rolagem");
    var a = null;
    var suprimir = false;
    function terminar(e) {
      if (!a || (e && e.pointerId !== a.id)) { return; }
      var arrastou = a.ativo;
      if (arrastou) {
        area.classList.remove("arrastando");
        try { area.releasePointerCapture(a.id); } catch (x) { /* captura já liberada */ }
        suprimir = true;
        setTimeout(function () { suprimir = false; }, 100);
      }
      a = null;
    }
    area.addEventListener("pointerdown", function (e) {
      if (a || (e.pointerType === "mouse" && e.button !== 0)) { return; }
      if (e.target.closest && e.target.closest(".visao.catalogo")) { return; }  // tabela: selecionar e filtrar, sem arrastar
      suprimir = false;
      a = { id: e.pointerId, x: e.clientX, y: e.clientY, sl: area.scrollLeft, st: area.scrollTop, ativo: false };
    });
    area.addEventListener("pointermove", function (e) {
      if (!a || e.pointerId !== a.id) { return; }
      var dx = e.clientX - a.x;
      var dy = e.clientY - a.y;
      if (!a.ativo) {
        if (Math.sqrt(dx * dx + dy * dy) <= LIMIAR_ARRASTE) { return; }
        a.ativo = true;
        area.classList.add("arrastando");
        // A captura só começa no arraste: um clique simples continua chegando ao nó.
        try { area.setPointerCapture(a.id); } catch (x) { /* ponteiro sintético ou já liberado */ }
      }
      e.preventDefault();
      area.scrollLeft = a.sl - dx;
      area.scrollTop = a.st - dy;
    });
    area.addEventListener("pointerup", terminar);
    area.addEventListener("pointercancel", terminar);
    area.addEventListener("lostpointercapture", terminar);
    area.addEventListener("click", function (e) {
      if (suprimir) { e.stopPropagation(); e.preventDefault(); suprimir = false; }
    }, true);
    area.addEventListener("wheel", function (e) {
      if (!(e.ctrlKey || e.metaKey)) { return; }  // a roda comum rola a página
      e.preventDefault();
      zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX, e.clientY);
    }, { passive: false });
    area.addEventListener("keydown", function (e) {
      if (e.target !== area || e.ctrlKey || e.metaKey || e.altKey) { return; }
      var passos = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (!passos) { return; }
      e.preventDefault();
      area.scrollLeft += passos[0] * PASSO_TECLA;
      area.scrollTop += passos[1] * PASSO_TECLA;
    });
  }

  function iniciar() {
    var sel = porId("demanda");
    DADOS.demandas.forEach(function (d) {
      var o = el("option", null, d.nome + " (" + d.sigla + ")");
      o.value = d.id;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { navegar(sel.value, "visao"); });
    porId("zmais").addEventListener("click", function () { zoom(1.25); });
    porId("zmenos").addEventListener("click", function () { zoom(0.8); });
    porId("zreset").addEventListener("click", function () { zoom(0); });
    porId("voltar").addEventListener("click", voltar);
    porId("alt-sub").addEventListener("click", function () {
      navegar(estado.demanda, estado.visao, null, { sub: !estado.sub, raias: estado.raias, semHistorico: true });
    });
    porId("alt-raias").addEventListener("click", function () {
      navegar(estado.demanda, estado.visao, null, { raias: !estado.raias, sub: estado.sub, semHistorico: true });
    });
    porId("btn-catalogo").addEventListener("click", function () { navegar(estado.demanda, "catalogo"); });
    ligarArraste();
    porId("m-fechar").addEventListener("click", fecharModal);
    porId("m-voltar").addEventListener("click", voltarNoModal);
    porId("modal").addEventListener("click", function (e) { if (e.target === porId("modal")) { fecharModal(); } });
    document.addEventListener("keydown", function (e) {
      if (porId("modal").hidden) { return; }
      if (e.key === "Escape") { e.preventDefault(); fecharModal(); return; }
      if (e.key === "Tab") {
        var f = focaveis();
        if (!f.length) { return; }
        var primeiro = f[0];
        var ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
        else if (!porId("caixa").contains(document.activeElement)) { e.preventDefault(); primeiro.focus(); }
      }
    });
    navegar(DADOS.demandas[0].id, "visao", null, { semHistorico: true });
  }
  iniciar();
})();
"""

_BODY_ABERTURA = """<header>
<h1>Guia de Engenharia de Software &amp; AI</h1>
<label for="demanda">Demanda</label>
<select id="demanda"></select>
<button id="btn-catalogo" type="button" data-visao="catalogo" title="Artefatos, variáveis, técnicas, nós e subtarefas da demanda">Catálogo</button>
</header>
<div id="barra-abas">
<details id="recolher-abas" open><summary>Abas</summary><div id="abas" role="tablist"></div></details>
<button id="voltar" type="button" disabled>Voltar</button>
</div>
"""

_BODY_FECHAMENTO = """<div id="area">
<div id="barra">
<button id="alt-raias" type="button" hidden aria-pressed="false">Raias: ocultas</button>
<button id="alt-sub" type="button" hidden aria-pressed="false">Subtarefas: ocultas</button>
<span class="zoom"><span class="sep"></span>
<span>Zoom</span>
<button id="zmenos" type="button">-</button>
<button id="zreset" type="button">100%</button>
<button id="zmais" type="button">+</button></span>
</div>
<div id="rolagem" tabindex="0" role="region" aria-label="Diagrama: arraste para mover, setas rolam, Ctrl ou Cmd com a roda dá zoom"></div>
</div>
<div id="modal" hidden>
<div id="caixa" role="dialog" aria-modal="true" aria-labelledby="m-titulo" tabindex="-1">
<div id="m-cab"><button id="m-voltar" type="button" hidden aria-label="Voltar ao item anterior" title="Voltar ao item anterior">&larr;</button><h2 id="m-titulo"></h2><button id="m-fechar" type="button" aria-label="Fechar">&times;</button></div>
<div id="m-corpo"></div>
</div>
</div>
"""


def _e(valor: Any) -> str:
    """Texto estático escapado, sem travessões."""
    return _html.escape(sem_travessoes(str(valor)), quote=True)


_FORMAS_LEGENDA = (
    ("estadio", "s", "início"),
    ("", "t", "tarefa"),
    ("losango", "g", "gateway"),
    ("sub", "c", "chamada de outra raia"),
    ("estadio", "e", "fim ou retorno"),
    ("arred", "st", "subtarefa"),
    ("arred cond", "\u25c6 st", "subtarefa condicional (borda tracejada)"),
)


def legenda_html(dados: Mapping[str, Any]) -> str:
    """Legenda ÚNICA e compacta (colapsável, aberta por padrão), estática e escapada.

    Traz as letras e formas e o padrão de id com o prefixo da demanda. As raias não entram aqui:
    cada uma se explica pelo título colorido, pela aba e pelo tooltip. Há um bloco por demanda e a interface mostra só o da atual.
    """
    formas = "".join(
        f'<span class="forma"><i class="{classe}"></i><span><b>{letra}</b>: {_e(texto)}</span></span>'
        for classe, letra, texto in _FORMAS_LEGENDA
    )
    blocos = []
    for dem in dados["demandas"]:
        blocos.append(
            f'<div class="leg-dem" data-demanda="{_e(dem["id"])}" hidden>'
            '<div class="bloco"><span class="titulo">Padrão do id</span>'
            f'<span><code>&lt;raia&gt;_&lt;s|t|g|c|e&gt;&lt;n&gt;</code>, prefixo da demanda <code>{_e(dem["sigla"])}</code></span>'
            + "".join(
                f'<span>Prefixo <code>{_e(b["sigla"])}</code>: {_e(b["nome"])}, raias reutilizáveis chamadas por várias demandas</span>'
                for b in dem.get("bibliotecas") or []
            )
            + "<span>Subtarefa: <code>&lt;nó&gt;_st&lt;n&gt;</code></span></div>"
            "</div>"
        )
    return (
        '<details id="legenda" open><summary>Legenda</summary><div class="corpo">'
        f'<div class="bloco"><span class="titulo">Tipos de nó</span><span>{formas}</span>'
        "<span>A chamada usa a cor da raia chamada e a borda grossa da raia que chama; o nó mostra só o rótulo, "
        "e o modal traz a raia chamada e o botão para ir até ela.</span>"
        "<span>\u25c6 marca a subtarefa condicional (borda tracejada): só executa quando o contexto pede; "
        "o modal mostra \u201cExecutar quando\u201d.</span>"
        "<span>A aba Catálogo lista artefatos, variáveis, nós e subtarefas; clique numa linha para ver os detalhes.</span>"
        "<span>A tarefa com subtarefas mostra \u25b8 N subtarefas; o botão Subtarefas da barra as expande.</span></div>"
        f'{"".join(blocos)}</div></details>\n'
    )


def gerar_html(doc: Mapping[str, Any], mermaid_js: str | None = None) -> str:
    """HTML único e autocontido do Guia. `mermaid_js` permite injetar outro conteúdo (testes)."""
    dados = montar_dados(doc)
    js = _js_embutivel(ler_mermaid() if mermaid_js is None else mermaid_js)
    return (
        '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        "<title>Guia de Engenharia de Software &amp; AI</title>\n"
        f"<style>{_CSS}</style>\n</head>\n<body>\n{_BODY_ABERTURA}{_BODY_FECHAMENTO}{legenda_html(dados)}"
        f"<script>{js}</script>\n"
        f'<script type="application/json" id="dados">{json_seguro(dados)}</script>\n'
        f"<script>{_JS}</script>\n</body>\n</html>\n"
    )
