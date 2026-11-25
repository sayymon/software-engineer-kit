"""Estratégias Hypothesis compartilhadas pelos testes de propriedade.

API pública:
- `valid_docs()`: documentos YAML_Fonte que passam em `validate` sem Issues.
- `note_texts(marker_lines=())`: texto para o gerador de notas (unicode, CRLF, marcadores opcionais).
- `blocklists()`: listas de termos bloqueados.
- `hostile_text()`: texto hostil (HTML/JS, markdown, travessões, unicode estranho).
- Mutações puras de invalidação: `remove_required_field`, `redirect_transition`,
  `duplicate_id`, `MUTATIONS` e a estratégia `invalid_docs()`.

O modelo de fluxos usa RAIAS com responsabilidade única: `valid_docs()` gera raias com cores
distintas por demanda, uma orquestradora por demanda, nós com ids `<raia>_<s|t|g|c|e><n>`,
chamadas com saídas iguais aos retornos da raia chamada e grafo de chamadas acíclico.

Os textos dos documentos válidos não contêm travessões (\u2014 e \u2013), nem hífen.
`hostile_text()` usa travessões de propósito.
"""

from __future__ import annotations

import copy
import datetime as dt
from collections.abc import Callable, Sequence
from typing import Any

from hypothesis import strategies as st

# ---------------------------------------------------------------- blocos básicos

_ID_RE = r"[a-z][a-z0-9]{0,5}(_[a-z0-9]{1,5}){0,2}"
snake_ids = st.from_regex(_ID_RE, fullmatch=True)

# Categorias Unicode aceitas em texto válido: letras, números, pontuação (sem
# traços Pd), símbolos e espaço comum. Sem controle, sem separador de linha.
_VALID_CATEGORIES = ("Lu", "Ll", "Lt", "Lo", "Nd", "Po", "Ps", "Pe", "Sm", "Sc", "Zs")

_texto_base = st.text(
    alphabet=st.characters(
        whitelist_categories=_VALID_CATEGORIES,
        blacklist_characters="\u2028\u2029\u0085\u00a0\ufeff#&<>\"'`\\*_|{}[]:%@!,",
    ),
    min_size=1,
    max_size=30,
)


def doc_text() -> st.SearchStrategy[str]:
    """Texto curto não vazio, sem travessões, sem espaços nas pontas (seguro para YAML)."""
    return _texto_base.map(lambda s: s.strip()).filter(
        lambda s: bool(s) and "\u2014" not in s and "\u2013" not in s and "-" not in s
    )


_ISO_DATES = st.dates(min_value=dt.date(2020, 1, 1), max_value=dt.date(2040, 12, 31)).map(
    lambda d: d.isoformat()
)

CRITERIOS = ["diferenciacao", "tempo_ate_valor", "custo_total", "dependencia_fornecedor", "risco"]
OPCOES = ["construir", "comprar", "assinar"]
_NIVEL = st.sampled_from(["baixo", "medio", "alto"])
_COLECOES_CONCEITUAIS = ("abordagens", "tecnicas", "padroes", "estrategias")
_STATUS = st.sampled_from(["rascunho", "revisado", "publicado"])


@st.composite
def _pesos_normalizados(draw: st.DrawFn) -> dict[str, float]:
    """Cinco pesos em [0,1] que somam 1 (múltiplos de 0.01)."""
    cortes = sorted(draw(st.lists(st.integers(0, 100), min_size=4, max_size=4)))
    bordas = [0, *cortes, 100]
    return {c: (bordas[i + 1] - bordas[i]) / 100 for i, c in enumerate(CRITERIOS)}


def _subset(draw: st.DrawFn, pool: Sequence[str], max_size: int = 3) -> list[str]:
    if not pool:
        return []
    return draw(st.lists(st.sampled_from(list(pool)), max_size=max_size, unique=True))


def _opt(draw: st.DrawFn, campos: dict[str, Any], chave: str, strat: st.SearchStrategy[Any]) -> None:
    if draw(st.booleans()):
        campos[chave] = draw(strat)


def _gerar_raia(
    draw: st.DrawFn,
    raia: dict[str, Any],
    demanda: str,
    chamados: list[tuple[str, list[str]]],
) -> tuple[list[dict[str, Any]], list[str]]:
    """Nós de uma raia: 1 início (índice 0), ao menos 1 fim, uma `chamada` por raia chamada em `chamados`.

    `chamados` traz (id da raia chamada, retornos dela). Devolve (nós, retornos desta raia).
    """
    rid = raia["id"]
    n = 2 + len(chamados) + draw(st.integers(0, 4))
    # Posições das chamadas: nunca o início (0) nem o último (sempre um fim).
    posicoes = draw(st.permutations(list(range(1, n - 1))))[: len(chamados)]
    chamada_em = dict(zip(sorted(posicoes), chamados, strict=True))
    arestas: list[list[tuple[int, str | None]]] = [[] for _ in range(n)]  # (destino, condicao fixa ou None)
    for i in range(1, n):
        pais = [j for j in range(i) if j not in chamada_em]
        arestas[draw(st.sampled_from(pais))].append((i, None))
    for i, (_, rets) in chamada_em.items():
        arestas[i] = [(draw(st.integers(1, n - 1)), r) for r in rets]
    for i in range(n - 1):
        if i not in chamada_em:
            for _ in range(draw(st.integers(0, 2))):
                arestas[i].append((draw(st.integers(0, n - 1)), None))
    n_fins = sum(1 for i in range(n) if not arestas[i])
    retornos = draw(st.lists(doc_text(), min_size=n_fins, max_size=n_fins, unique=True))
    nos: list[dict[str, Any]] = []
    for i, alvos in enumerate(arestas):
        extra: dict[str, Any] = {}
        if i == 0:
            tipo, letra = "inicio", "s"
        elif i in chamada_em:
            tipo, letra = "chamada", "c"
            extra["raia_chamada"] = chamada_em[i][0]
        elif not alvos:
            tipo, letra = "fim", "e"
            extra["retorno"] = retornos.pop()
        elif len(alvos) == 1:
            tipo, letra = "tarefa", "t"
        else:
            tipo, letra = draw(st.sampled_from([("tarefa", "t"), ("bifurcacao", "g")]))
        d: dict[str, Any] = {
            "id": f"{rid}_{letra}{i}",
            "raia": rid,
            "tipo": tipo,
            "condicao": draw(st.one_of(st.just(""), doc_text())),
            "proximo": [
                {"para": a, "condicao": c if c is not None else draw(st.one_of(st.just(""), doc_text()))}
                for a, c in alvos
            ],
            "estado": draw(st.dictionaries(snake_ids, st.one_of(st.integers(0, 9), st.booleans(), doc_text()), max_size=3)),
            **extra,
        }
        _opt(draw, d, "rotulo", doc_text())
        _opt(draw, d, "status", _STATUS)
        if draw(st.booleans()):
            d["demanda"] = demanda
        if draw(st.booleans()):
            d["layout"] = {"coluna": draw(st.integers(0, 20))}
        _opt(draw, d, "publico", st.booleans())
        nos.append(d)
    # Troca o índice do destino pelo id real, agora que todos os ids da raia são conhecidos.
    ids_da_raia = [d["id"] for d in nos]
    for d in nos:
        for t in d["proximo"]:
            t["para"] = ids_da_raia[t["para"]]
    fins = [d["retorno"] for d in nos if d["tipo"] == "fim"]
    return nos, fins


# ---------------------------------------------------------------- dados, subtarefas e técnicas

_OPS_NUMERICOS = ["maior_que", "maior_ou_igual", "menor_que", "menor_ou_igual"]


def _gerar_termo(draw: st.DrawFn, v: dict[str, Any]) -> dict[str, Any]:
    """Termo válido para a variável `v`: um operador, valor do tipo e do domínio dela."""
    termo: dict[str, Any] = {"var": v["id"]}
    if v["tipo"] == "inteiro":
        op = draw(st.sampled_from(["igual", "diferente", "em", *_OPS_NUMERICOS]))
        valor = st.integers(-5, 50)
    else:
        op = draw(st.sampled_from(["igual", "diferente", "em"]))
        if v["tipo"] == "booleano":
            valor = st.sampled_from(["sim", "nao"])
        elif v["tipo"] == "enum":
            valor = st.sampled_from(v["valores"])
        else:
            valor = doc_text()
    termo[op] = draw(st.lists(valor, min_size=1, max_size=3)) if op == "em" else draw(valor)
    return termo


def gerar_condicao(draw: st.DrawFn, variaveis: Sequence[dict[str, Any]]) -> dict[str, Any]:
    """Condicao válida (todos ou algum, de 1 a 3 termos) sobre as `variaveis` dadas (não vazia)."""
    termos = [_gerar_termo(draw, draw(st.sampled_from(list(variaveis)))) for _ in range(draw(st.integers(1, 3)))]
    return {draw(st.sampled_from(["todos", "algum"])): termos}


def _gerar_usos(draw: st.DrawFn, tecnicas: Sequence[str], variaveis: Sequence[dict[str, Any]]) -> list[dict[str, Any]]:
    if not tecnicas:
        return []
    usos: list[dict[str, Any]] = []
    for tid in draw(st.lists(st.sampled_from(list(tecnicas)), max_size=3, unique=True)):
        opcoes = ["obrigatoria", "recomendada", "opcional", *(["condicional"] if variaveis else [])]
        uso: dict[str, Any] = {"tecnica": tid, "uso": draw(st.sampled_from(opcoes))}
        if variaveis and (uso["uso"] == "condicional" or draw(st.booleans())):
            uso["quando"] = gerar_condicao(draw, variaveis)
        _opt(draw, uso, "porque", doc_text())
        usos.append(uso)
    return usos


def _gerar_variaveis(draw: st.DrawFn, ids: Sequence[str]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for vid in ids:
        tipo = draw(st.sampled_from(["booleano", "enum", "inteiro", "texto"]))
        v: dict[str, Any] = {"id": vid, "nome": draw(doc_text()), "tipo": tipo}
        if tipo == "enum":
            v["valores"] = draw(st.lists(doc_text(), min_size=1, max_size=3, unique=True))
        _opt(draw, v, "descricao", doc_text())
        if draw(st.booleans()):
            v["inicial"] = v["valores"][0] if tipo == "enum" else {"booleano": "sim", "inteiro": 0, "texto": "x"}[tipo]
        _opt(draw, v, "status", _STATUS)
        _opt(draw, v, "publico", st.booleans())
        out.append(v)
    return out


TIPOS_ARTEFATO = [
    "documento", "dado", "decisao", "sinal", "codigo", "commit", "pull_request", "adr", "teste", "biblioteca", "agente",
    "skill", "script", "diagrama", "card", "comunicacao", "acao", "configuracao",
]


def _gerar_artefatos(draw: st.DrawFn, ids: Sequence[str]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for aid in ids:
        a: dict[str, Any] = {"id": aid, "nome": draw(doc_text())}
        _opt(draw, a, "descricao", doc_text())
        _opt(draw, a, "tipo", st.sampled_from(TIPOS_ARTEFATO))
        _opt(draw, a, "subtipo", doc_text())
        _opt(draw, a, "exemplo", doc_text())
        _opt(draw, a, "status", _STATUS)
        _opt(draw, a, "publico", st.booleans())
        out.append(a)
    return out


def _anotar_dados(
    draw: st.DrawFn,
    decisoes: list[dict[str, Any]],
    raias: list[dict[str, Any]],
    variaveis: list[dict[str, Any]],
    dados: list[str],
    tecnicas: list[str],
    artefatos: list[dict[str, Any]] | None = None,
) -> None:
    """Acrescenta aos nós e raias entradas, saídas, subtarefas e usos de técnica coerentes (sem avisos).

    Regras que mantêm o documento sem avisos: toda entrada de nó vem das `entradas` da raia ou das `saidas` de um nó
    antecessor (numa `chamada`, dos retornos da raia chamada); toda entrada de subtarefa vem das entradas da tarefa
    ou das saídas de subtarefas anteriores; as saídas de uma tarefa com subtarefas saem do conjunto das subtarefas;
    toda chave de `estado` existe em `variaveis` (quando houver).
    """
    por_raia: dict[str, list[dict[str, Any]]] = {}
    for d in decisoes:
        por_raia.setdefault(d["raia"], []).append(d)
    por_id = {d["id"]: d for d in decisoes}
    var_ids = [v["id"] for v in variaveis]

    for r in raias:
        if draw(st.booleans()):
            r["entradas"] = _subset(draw, dados)

    for d in decisoes:
        if var_ids:
            d["estado"] = {
                k: draw(st.one_of(st.integers(0, 9), st.booleans(), doc_text())) for k in _subset(draw, var_ids)
            }
        if d["tipo"] == "tarefa" and draw(st.booleans()):
            subs = []
            for n in range(1, draw(st.integers(1, 3)) + 1):
                sub: dict[str, Any] = {"id": f"{d['id']}_st{n}", "rotulo": draw(doc_text())}
                _opt(draw, sub, "descricao", doc_text())
                _opt(draw, sub, "exemplo", doc_text())
                _opt(draw, sub, "responsavel", st.sampled_from(["agente", "pessoa", "ambos"]))
                _opt(draw, sub, "status", _STATUS)
                if variaveis and draw(st.booleans()):  # subtarefa condicional: `quando` e, às vezes, `porque`
                    sub["quando"] = gerar_condicao(draw, variaveis)
                    _opt(draw, sub, "porque", doc_text())
                saidas = _subset(draw, dados)
                if saidas or draw(st.booleans()):
                    sub["saidas"] = saidas
                subs.append(sub)
            d["subtarefas"] = subs
            entregues = sorted({x for sub in subs for x in sub.get("saidas", [])})
            saidas = _subset(draw, entregues)
            if saidas:
                d["saidas"] = saidas
        else:
            saidas = _subset(draw, dados)
            if saidas or draw(st.booleans()):
                d["saidas"] = saidas

    def producao(no: dict[str, Any]) -> set[str]:
        saida = set(no.get("saidas", []))
        if no["tipo"] == "chamada":
            saida |= {x for f in por_raia[no["raia_chamada"]] if f["tipo"] == "fim" for x in f.get("saidas", [])}
        return saida

    for r_id, nos in por_raia.items():
        reverso: dict[str, set[str]] = {n["id"]: set() for n in nos}
        for n in nos:
            for t in n["proximo"]:
                reverso[t["para"]].add(n["id"])
        raia = next(r for r in raias if r["id"] == r_id)
        for n in nos:
            antecessores: set[str] = set()
            fila = list(reverso[n["id"]])
            while fila:
                a = fila.pop()
                if a not in antecessores:
                    antecessores.add(a)
                    fila.extend(reverso[a])
            antecessores.discard(n["id"])
            disponivel = set(raia.get("entradas", []))
            for a in antecessores:
                disponivel |= producao(por_id[a])
            entradas = _subset(draw, sorted(disponivel))
            if entradas or draw(st.booleans()):
                n["entradas"] = entradas
            for k, sub in enumerate(n.get("subtarefas", [])):
                livre = set(entradas)
                for anterior in n["subtarefas"][:k]:
                    livre |= set(anterior.get("saidas", []))
                ent = _subset(draw, sorted(livre))
                if ent or draw(st.booleans()):
                    sub["entradas"] = ent

    for d in decisoes:
        for dono in (d, *d.get("subtarefas", [])):
            usos = _gerar_usos(draw, tecnicas, variaveis)
            if usos or draw(st.booleans()):
                dono["tecnicas"] = usos

    # Variantes de artefato: nomes únicos por artefato e condições sobre variáveis declaradas.
    for art in artefatos or []:
        if variaveis and draw(st.booleans()):
            nomes = draw(st.lists(doc_text(), min_size=1, max_size=2, unique=True))
            art["variantes"] = []
            for k, nome in enumerate(nomes):
                var: dict[str, Any] = {"nome": f"v{k} {nome}", "quando": gerar_condicao(draw, variaveis)}
                _opt(draw, var, "descricao", doc_text())
                _opt(draw, var, "exemplo", doc_text())
                art["variantes"].append(var)

    # Sem avisos ITEM_SEM_USO: todo item do catálogo que nada referencia entra nas `entradas` da primeira raia.
    usados: set[str] = set()
    for r in raias:
        usados |= set(r.get("entradas", []))
    for d in decisoes:
        usados |= set(d.get("entradas", [])) | set(d.get("saidas", [])) | set(d.get("estado", {}))
        for dono in (d, *d.get("subtarefas", [])):
            usados |= set(dono.get("entradas", [])) | set(dono.get("saidas", []))
            for uso in dono.get("tecnicas", []):
                for termo in (uso.get("quando") or {}).get("todos", []) + (uso.get("quando") or {}).get("algum", []):
                    usados.add(termo["var"])
        for termo in (dono.get("quando") or {}).get("todos", []) + (dono.get("quando") or {}).get("algum", []):
            usados.add(termo["var"])
    for art in artefatos or []:
        for var in art.get("variantes", []):
            for termo in var["quando"].get("todos", []) + var["quando"].get("algum", []):
                usados.add(termo["var"])
    sobra = [i for i in dados if i not in usados]
    if sobra and raias:
        raias[0]["entradas"] = [*raias[0].get("entradas", []), *sobra]

    # Sem avisos de entregável: nas raias em adoção, toda tarefa e subtarefa entrega ao menos um artefato.
    art_ids = [a["id"] for a in artefatos or []]
    if art_ids:
        em_adocao = {r["id"] for r in raias if any(c in r for c in ("entradas", "saidas", "subtarefas"))}
        em_adocao |= {d["raia"] for d in decisoes if any(c in d for c in ("entradas", "saidas", "subtarefas"))}
        for d in decisoes:
            if d["tipo"] != "tarefa" or d["raia"] not in em_adocao:
                continue
            subs = d.get("subtarefas", [])
            for sub in subs:
                if not set(sub.get("saidas", [])) & set(art_ids):
                    sub["saidas"] = [*sub.get("saidas", []), draw(st.sampled_from(art_ids))]
            if not subs and not set(d.get("saidas", [])) & set(art_ids):
                d["saidas"] = [*d.get("saidas", []), draw(st.sampled_from(art_ids))]


# ---------------------------------------------------------------- valid_docs


@st.composite
def _valid_docs(draw: st.DrawFn) -> dict[str, Any]:
    n_dem = draw(st.integers(1, 3))
    n_req = draw(st.integers(1, 3))
    n_raia_por_dem = [draw(st.integers(1, 3)) for _ in range(n_dem)]
    n_raia = sum(n_raia_por_dem)
    n_pb = draw(st.integers(0, 3))
    n_conc = {c: draw(st.integers(0, 2)) for c in _COLECOES_CONCEITUAIS}
    n_cat = draw(st.integers(0, 3))
    n_fon = draw(st.integers(0, 3))
    n_obj = draw(st.integers(1, 3))
    usar_dados = draw(st.booleans())
    n_art, n_var = (draw(st.integers(1, 3)), draw(st.integers(0, 3))) if usar_dados else (0, 0)
    total = n_dem + n_req + n_raia + n_pb + sum(n_conc.values()) + n_cat + n_fon + n_obj + n_art + n_var
    pool = draw(st.lists(snake_ids, min_size=total, max_size=total, unique=True))
    it = iter(pool)

    def take(n: int) -> list[str]:
        return [next(it) for _ in range(n)]

    dem_ids, req_ids, raia_bases, pb_ids = take(n_dem), take(n_req), take(n_raia), take(n_pb)
    conc_ids = {c: take(n) for c, n in n_conc.items()}
    cat_ids, fon_ids, obj_ids = take(n_cat), take(n_fon), take(n_obj)
    art_ids, var_ids = take(n_art), take(n_var)

    def eixo(id_: str) -> dict[str, Any]:
        e: dict[str, Any] = {"id": id_, "nome": draw(doc_text())}
        if id_ in siglas:
            e["sigla"] = siglas[id_]
        _opt(draw, e, "publico", st.booleans())
        return e

    def conceitual(id_: str, estrategia: bool = False) -> dict[str, Any]:
        e: dict[str, Any] = {"id": id_, "nome": draw(doc_text())}
        _opt(draw, e, "descricao", doc_text())
        _opt(draw, e, "exemplo", doc_text())
        _opt(draw, e, "quando_usar", st.lists(doc_text(), max_size=3))
        _opt(draw, e, "quando_evitar", st.lists(doc_text(), max_size=3))
        _opt(draw, e, "status", _STATUS)
        fontes_sub = _subset(draw, fon_ids)
        if fontes_sub:
            e["fonte_ids"] = fontes_sub
        if estrategia:
            for campo in ("custo", "beneficio", "dependencia_fornecedor"):
                _opt(draw, e, campo, _NIVEL)
        _opt(draw, e, "publico", st.booleans())
        return e

    # Siglas opcionais por demanda (únicas) e raias de cada demanda.
    siglas: dict[str, str] = {}
    for dem in dem_ids:
        if draw(st.booleans()):
            siglas[dem] = "s" + dem  # prefixo "s" garante unicidade entre as siglas e forma de Id válida
    bases = iter(raia_bases)
    raias_por_dem: dict[str, list[dict[str, Any]]] = {}
    for dem, n in zip(dem_ids, n_raia_por_dem, strict=True):
        cores = draw(st.lists(st.integers(0, 0xFFFFFF), min_size=n, max_size=n, unique=True))
        lista = []
        for k in range(n):
            base = next(bases)
            raia: dict[str, Any] = {
                "id": f"{siglas[dem]}_{base}" if dem in siglas else base,
                "nome": draw(doc_text()),
                "demanda": dem,
                "responsabilidade": draw(doc_text()),
                "cor": draw(st.sampled_from(["#{:06x}", "#{:06X}"])).format(cores[k]),
            }
            if k == 0:  # a primeira da lista é a orquestradora (chama as demais, direta ou indiretamente)
                raia["orquestradora"] = True
            elif draw(st.booleans()):
                raia["orquestradora"] = False
            _opt(draw, raia, "status", _STATUS)
            _opt(draw, raia, "publico", st.booleans())
            lista.append(raia)
        raias_por_dem[dem] = lista

    # Chamadas planejadas: toda raia k>0 é chamada por alguma anterior (sem ciclos); chamadas extras só para frente.
    decisoes: list[dict[str, Any]] = []
    for dem in dem_ids:
        lista = raias_por_dem[dem]
        planos: list[list[int]] = [[] for _ in lista]
        for k in range(1, len(lista)):
            planos[draw(st.integers(0, k - 1))].append(k)
        for i in range(len(lista) - 1):
            if draw(st.booleans()):
                planos[i].append(draw(st.integers(i + 1, len(lista) - 1)))
        retornos: dict[int, list[str]] = {}
        for i in reversed(range(len(lista))):  # os chamados são gerados antes de quem os chama
            nos, rets = _gerar_raia(draw, lista[i], dem, [(lista[k]["id"], retornos[k]) for k in planos[i]])
            retornos[i] = rets
            decisoes += nos

    artefatos = _gerar_artefatos(draw, art_ids)
    variaveis = _gerar_variaveis(draw, var_ids)
    if usar_dados:
        _anotar_dados(draw, decisoes, [r for rs in raias_por_dem.values() for r in rs], variaveis,
                      [*art_ids, *var_ids], conc_ids["tecnicas"], artefatos)

    demanda_da_raia = {r["id"]: dem for dem, rs in raias_por_dem.items() for r in rs}
    # Ligações opcionais entre demandas: destino em outra demanda e decisão de destino compatível.
    if len(dem_ids) >= 2:
        for d in decisoes:
            if not draw(st.booleans()):
                continue
            destinos = [x for x in dem_ids if x != demanda_da_raia[d["raia"]]]
            destino = draw(st.sampled_from(destinos))
            alvos_lig = [x["id"] for x in decisoes if demanda_da_raia[x["raia"]] == destino]
            if not alvos_lig:
                continue
            lig: dict[str, Any] = {
                "demanda_destino": destino,
                "para": draw(st.sampled_from(alvos_lig)),
                "condicao": draw(st.one_of(st.just(""), doc_text())),
            }
            _opt(draw, lig, "tipo", st.sampled_from(["aciona", "alimenta"]))
            _opt(draw, lig, "rotulo", doc_text())
            d["ligacoes"] = [lig]
    decisoes = draw(st.permutations(decisoes))

    def refs(d: dict[str, Any]) -> None:
        for campo, ids_ in (*conc_ids.items(), ("categorias_ferramenta", cat_ids)):
            sub = _subset(draw, ids_)
            if sub:
                d[campo] = sub

    celulas: list[dict[str, Any]] = []
    pares = draw(st.lists(st.tuples(st.sampled_from(dem_ids), st.sampled_from(req_ids)), max_size=4, unique=True))
    for dem, req in pares:
        c: dict[str, Any] = {"demanda": dem, "requisito": req}
        _opt(draw, c, "perguntas_chave", st.lists(doc_text(), max_size=3))
        _opt(draw, c, "status", _STATUS)
        refs(c)
        _opt(draw, c, "publico", st.booleans())
        celulas.append(c)

    playbooks: list[dict[str, Any]] = []
    for pid in pb_ids:
        p: dict[str, Any] = {"id": pid, "resumo": draw(st.one_of(st.just(""), doc_text()))}
        for campo in ("fazer", "evitar"):  # perguntas_chave cita ids da coleção `perguntas`; o gerador não usa
            _opt(draw, p, campo, st.lists(doc_text(), max_size=3))
        _opt(draw, p, "exemplo", doc_text())
        refs(p)
        _opt(draw, p, "status", _STATUS)
        _opt(draw, p, "publico", st.booleans())
        playbooks.append(p)

    categorias: list[dict[str, Any]] = []
    for cid in cat_ids:
        cat: dict[str, Any] = {
            "id": cid,
            "nome": draw(doc_text()),
            "custo": draw(_NIVEL),
            "beneficio": draw(_NIVEL),
            "dependencia_fornecedor": draw(_NIVEL),
        }
        _opt(draw, cat, "descricao", doc_text())
        _opt(draw, cat, "status", _STATUS)
        _opt(draw, cat, "publico", st.booleans())
        categorias.append(cat)

    citaveis = [*dem_ids, *req_ids, *(d["id"] for d in decisoes), *pb_ids, *(i for v in conc_ids.values() for i in v), *cat_ids]
    fontes: list[dict[str, Any]] = []
    for fid in fon_ids:
        f: dict[str, Any] = {
            "id": fid,
            "tipo": draw(st.sampled_from(["curso", "artigo", "livro"])),
            "titulo": draw(doc_text()),
            "link": "https://exemplo.com/" + draw(st.from_regex(r"[a-z0-9]{1,8}", fullmatch=True)),
            "status_revisao": draw(st.sampled_from(["pendente", "em_revisao", "revisada"])),
            "proxima_revisao": draw(_ISO_DATES),
        }
        itens = _subset(draw, citaveis)
        if itens:
            f["itens"] = itens
        _opt(draw, f, "publico", st.booleans())
        fontes.append(f)

    ordem = draw(st.permutations(OPCOES))
    decisor = {
        "criterios": list(CRITERIOS),
        "escala": {"min": 1, "max": 5},
        "opcoes": list(OPCOES),
        "ordem_desempate": list(ordem),
        "pesos": {obj: draw(_pesos_normalizados()) for obj in obj_ids},
    }

    doc: dict[str, Any] = {
        "versao": draw(st.integers(1, 5)),
        "demandas": [eixo(i) for i in dem_ids],
        "raias": draw(st.permutations([r for rs in raias_por_dem.values() for r in rs])),
        "requisitos": [eixo(i) for i in req_ids],
        "decisoes": decisoes,
        "celulas": celulas,
        "playbooks": playbooks,
        "abordagens": [conceitual(i) for i in conc_ids["abordagens"]],
        "tecnicas": [conceitual(i) for i in conc_ids["tecnicas"]],
        "padroes": [conceitual(i) for i in conc_ids["padroes"]],
        "estrategias": [conceitual(i, True) for i in conc_ids["estrategias"]],
        "categorias_ferramenta": categorias,
        "fontes": fontes,
        "decisor_construir_comprar_assinar": decisor,
    }
    if usar_dados:
        doc["artefatos"] = artefatos
        doc["variaveis"] = variaveis
    return doc


def valid_docs() -> st.SearchStrategy[dict[str, Any]]:
    """Documentos que passam em `validate(doc, schema) == []`.

    Ids snake_case únicos (globalmente), grafo com um `inicio`, todos os nós
    alcançáveis, bifurcações com 2 ou mais saídas, pesos somando 1, referências
    consistentes e datas ISO válidas (strings). Texto sem travessões.

    Em parte dos documentos entram também `artefatos`, `variaveis`, `entradas`/`saidas` de raias e nós,
    `subtarefas` (ids `<nó>_st<n>`) e `tecnicas` com usos e condições válidos. Esses documentos não geram
    nem avisos: `validate(doc, schema, avisos=True) == []`.
    """
    return _valid_docs()


# ---------------------------------------------------------------- texto


def note_texts(marker_lines: Sequence[str] = ()) -> st.SearchStrategy[str]:
    """Texto de nota: unicode, quebras LF/CRLF, linhas vazias, sem travessões.

    `marker_lines`: linhas de marcador (ex.: delimitadores de bloco gerado) que
    podem ser intercaladas no texto. Com a tupla vazia, o texto não tem marcadores.
    """
    linha = st.text(
        alphabet=st.characters(
            whitelist_categories=("Lu", "Ll", "Lo", "Nd", "Po", "Ps", "Pe", "Sm", "Sc", "Zs", "So"),
            blacklist_characters="\u2028\u2029\u0085\ufeff",
        ),
        max_size=40,
    ).filter(lambda s: "\u2014" not in s and "\u2013" not in s)
    if marker_lines:
        linha = st.one_of(linha, linha, st.sampled_from(list(marker_lines)))
    return st.builds(
        lambda linhas, sep, final: sep.join(linhas) + (sep if final else ""),
        st.lists(linha, max_size=8),
        st.sampled_from(["\n", "\r\n"]),
        st.booleans(),
    )


def blocklists() -> st.SearchStrategy[list[str]]:
    """Listas de 1 a 5 termos bloqueados distintos (letras e dígitos, 3 a 12 caracteres)."""
    termo = st.text(
        alphabet=st.characters(whitelist_categories=("Ll", "Nd"), max_codepoint=0x24F),
        min_size=3,
        max_size=12,
    )
    return st.lists(termo, min_size=1, max_size=5, unique_by=str.lower)


_HOSTILE_FRAGMENTS = [
    "</script>", "<script>alert(1)</script>", "<img src=x onerror=alert(1)>", "<!--", "-->",
    "\"", "'", "&", "&amp;", "&lt;", "<", ">", "`", "${x}", "{{ x }}", "javascript:alert(1)",
    "[x](javascript:alert(1))", "**negrito**", "_it_", "# titulo", "---", "```", "| a | b |",
    "\\", "\u2014", "\u2013", "\u202e", "\u200b", "\u0000", "\r\n", "\n", "\t", "\U0001f9ea",
    "ação", "Ünï", "\u0301", "]]", "[[link]]", "<style>", "</style>", "%s", "%(x)s",
]


def hostile_text() -> st.SearchStrategy[str]:
    """Texto com HTML/JS, markdown, aspas, `&`, travessões e unicode hostil (inclui NUL e RTL)."""
    pedaco = st.one_of(st.sampled_from(_HOSTILE_FRAGMENTS), st.text(max_size=8))
    return st.lists(pedaco, min_size=1, max_size=8).map("".join).filter(bool)


# ---------------------------------------------------------------- mutações

_CAMPOS_OBRIGATORIOS = {
    "demandas": ["id", "nome"],
    "requisitos": ["id", "nome"],
    "decisoes": ["id", "raia", "tipo", "condicao", "proximo", "estado"],
    "raias": ["id", "nome", "demanda", "responsabilidade", "cor"],
    "celulas": ["demanda", "requisito"],
    "playbooks": ["id", "resumo"],
    "abordagens": ["id", "nome"],
    "tecnicas": ["id", "nome"],
    "padroes": ["id", "nome"],
    "estrategias": ["id", "nome"],
    "categorias_ferramenta": ["id", "nome", "custo", "beneficio", "dependencia_fornecedor"],
    "fontes": ["id", "tipo", "titulo", "link", "status_revisao", "proxima_revisao"],
}
_TOPO_OBRIGATORIOS = [
    "versao", "demandas", "raias", "requisitos", "decisoes", "celulas", "playbooks", "abordagens", "tecnicas",
    "padroes", "estrategias", "categorias_ferramenta", "fontes", "decisor_construir_comprar_assinar",
]
_DECISOR_OBRIGATORIOS = ["criterios", "escala", "opcoes", "ordem_desempate", "pesos"]

Mutation = Callable[[dict[str, Any], int], tuple[dict[str, Any], str]]


def remove_required_field(doc: dict[str, Any], pick: int = 0) -> tuple[dict[str, Any], str]:
    """Remove um campo obrigatório (topo, item de coleção ou decisor). Pura.

    `pick` escolhe o alvo (módulo do número de candidatos). Devolve (cópia mutada, descrição).
    """
    candidatos: list[tuple[Any, ...]] = [(k,) for k in _TOPO_OBRIGATORIOS if k in doc]
    for colecao, campos in _CAMPOS_OBRIGATORIOS.items():
        for i, item in enumerate(doc.get(colecao, [])):
            candidatos += [(colecao, i, c) for c in campos if c in item]
    candidatos += [("decisor_construir_comprar_assinar", c) for c in _DECISOR_OBRIGATORIOS
                   if c in doc.get("decisor_construir_comprar_assinar", {})]
    alvo = candidatos[pick % len(candidatos)]
    novo = copy.deepcopy(doc)
    pai: Any = novo
    for parte in alvo[:-1]:
        pai = pai[parte]
    del pai[alvo[-1]]
    caminho = "".join(f"[{p}]" if isinstance(p, int) else f".{p}" for p in alvo).lstrip(".")
    return novo, f"campo obrigatório removido: {caminho}"


def redirect_transition(doc: dict[str, Any], pick: int = 0) -> tuple[dict[str, Any], str]:
    """Troca o destino de uma Transicao por um id inexistente. Pura. Exige ao menos uma transição."""
    candidatos = [(i, j) for i, d in enumerate(doc["decisoes"]) for j in range(len(d["proximo"]))]
    i, j = candidatos[pick % len(candidatos)]
    existentes = {x["id"] for c in doc.values() if isinstance(c, list) for x in c if isinstance(x, dict) and "id" in x}
    falso, n = "id_inexistente", 0
    while falso in existentes:
        n += 1
        falso = f"id_inexistente_{n}"
    novo = copy.deepcopy(doc)
    antigo = novo["decisoes"][i]["proximo"][j]["para"]
    novo["decisoes"][i]["proximo"][j]["para"] = falso
    return novo, f"decisoes[{i}].proximo[{j}].para: '{antigo}' trocado por '{falso}'"


def duplicate_id(doc: dict[str, Any], pick: int = 0) -> tuple[dict[str, Any], str]:
    """Anexa a uma coleção uma cópia de um item existente (id repetido). Pura."""
    candidatos = [(c, i) for c in _CAMPOS_OBRIGATORIOS if c != "celulas" for i in range(len(doc.get(c, [])))]
    colecao, i = candidatos[pick % len(candidatos)]
    novo = copy.deepcopy(doc)
    novo[colecao].append(copy.deepcopy(novo[colecao][i]))
    return novo, f"id '{doc[colecao][i]['id']}' duplicado em {colecao} (cópia de {colecao}[{i}])"


MUTATIONS: tuple[Mutation, ...] = (remove_required_field, redirect_transition, duplicate_id)


@st.composite
def invalid_docs(draw: st.DrawFn, docs: st.SearchStrategy[dict[str, Any]] | None = None
                 ) -> tuple[dict[str, Any], dict[str, Any], str]:
    """Devolve (original, mutado, descrição): um doc válido e uma mutação de invalidação dele."""
    original = draw(docs if docs is not None else valid_docs())
    mutacao = draw(st.sampled_from(MUTATIONS))
    mutado, descricao = mutacao(original, draw(st.integers(0, 10_000)))
    return original, mutado, descricao
