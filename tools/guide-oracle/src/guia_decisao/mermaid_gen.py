"""Geração de diagramas Mermaid (fluxos por raias) a partir do YAML_Fonte.

Padrão de fluxos com RAIAS (responsabilidade única):

- cada raia é um `subgraph` com a cor da raia (borda) e um fundo claro;
- os nós usam a cor da raia; o nó `chamada` usa a cor da raia CHAMADA e uma
  borda grossa na cor da raia chamadora (cor de intersecção);
- orientação horizontal (`flowchart LR`, `direction LR` em cada subgraph);
- o diagrama standalone (`.mmd`) leva uma subgraph "Legenda" ENXUTA: só as letras e formas
  dos tipos de nó e, nas visões em que as raias chamadas não aparecem como subgraph (`visao` e
  `raia:<id>`), a lista dessas raias, cada uma uma única vez e na sua cor. As raias que aparecem como
  subgraph não se repetem na legenda. Com `legenda=False` (diagramas embutidos no HTML, que traz a
  sua própria legenda única) o diagrama não tem a subgraph.

Visões por demanda: `visao` (só a raia orquestradora), `raia:<id>` (uma raia)
e `completo` (todas as raias, com arestas tracejadas de chamada e retorno).

Subtarefas (opcionais, só em nós `tarefa`): com `subtarefas=False` (padrão) a tarefa que as tem ganha o
indicador "▸ N subtarefas" no rótulo. Com `subtarefas=True` cada uma vira um subgraph aninhado (título =
rótulo da tarefa) com o nó da tarefa como cabeçalho, seguido da cadeia de nós de subtarefa na ordem de execução;
as arestas entram na tarefa e saem da última subtarefa. A subtarefa condicional (com `quando`) leva o prefixo "◆" no
rótulo e borda tracejada (a legenda a explica). O nó `chamada` mostra só o id e o rótulo, sem o nome da raia chamada.
O HTML gera as duas variantes em tempo de build.

A saída é determinística: ids em ordem natural (c2 antes de c10), nós de cada raia na ordem do fluxo
(busca em largura a partir do `inicio`) e raias na ordem em que a orquestradora as chama (ver `ordem.py`), sem travessões, e os rótulos
passam por `escapar_rotulo`. `sanitizar_id` é injetiva.
"""

from __future__ import annotations

import re
from collections.abc import Iterable, Mapping
from dataclasses import dataclass, field
from typing import Any

from guia_decisao.ordem import chave_natural, demandas_biblioteca, ordem_fluxo, ordem_raias, ordenar_natural, raias_do_contexto

VISAO = "visao"
COMPLETO = "completo"
PREFIXO_RAIA = "raia:"

_COR_PADRAO = "#CCCCCC"
_RE_COR = re.compile(r"#[0-9A-Fa-f]{6}\Z")
_RE_NOME_ARQUIVO = re.compile(r"^[A-Za-z0-9_.-]+$")

_RESERVADAS = frozenset(
    {
        "end",
        "graph",
        "flowchart",
        "subgraph",
        "style",
        "class",
        "classdef",
        "click",
        "linkstyle",
        "default",
        "direction",
        "call",
        "href",
        "interpolate",
    }
)
_RE_ID_SEGURO = re.compile(r"[A-Za-z][A-Za-z0-9_]*\Z")

# Letras dos ids por tipo de nó.
LETRA_TIPO = {"inicio": "s", "tarefa": "t", "bifurcacao": "g", "chamada": "c", "fim": "e"}


# Responsável da subtarefa, com um ícone que acompanha o texto (nunca só cor ou ícone).
ROTULO_RESPONSAVEL = {"agente": "🤖 agente", "pessoa": "👤 pessoa", "ambos": "🤝 ambos"}


def subtarefas_do_no(no: Mapping[str, Any]) -> list[Mapping[str, Any]]:
    """Subtarefas de um nó `tarefa`, na ordem de execução (a ordem da lista). Outros tipos não têm."""
    if no.get("tipo") != "tarefa":
        return []
    return [s for s in (no.get("subtarefas") or []) if isinstance(s, Mapping) and s.get("id")]


class GeracaoError(Exception):
    """O documento não permite gerar o diagrama (referência ausente, raia sem fluxo etc.)."""


# ---------------------------------------------------------------- texto e ids


_RE_TRAVESSAO_ESPACADO = re.compile(r"\s+[\u2012-\u2015\u2212]\s+")
_RE_TRAVESSAO = re.compile(r"[\u2012-\u2015\u2212]")
_RE_CONTROLE = re.compile(r"[\x00-\x08\x0b-\x1f\x7f\u2028\u2029\u0085]")


def sem_travessoes(texto: str) -> str:
    """Troca travessões por vírgula (entre espaços) ou hífen (colados). Preserva o resto."""
    texto = _RE_TRAVESSAO_ESPACADO.sub(", ", texto)
    return _RE_TRAVESSAO.sub("-", texto)


def limpar_texto(valor: Any) -> str:
    """Texto simples: sem travessões, sem controles, espaços e quebras de linha colapsados."""
    texto = "" if valor is None else str(valor)
    texto = _RE_CONTROLE.sub(" ", texto.replace("\t", " ").replace("\r", " ").replace("\n", " "))
    texto = sem_travessoes(texto)
    return re.sub(r" {2,}", " ", texto).strip()


_ESCAPES = (
    ("#", "#35;"),
    ('"', "#quot;"),
    ("<", "#lt;"),
    (">", "#gt;"),
    ("&", "#amp;"),
    ("`", "#96;"),
    ("%", "#37;"),
    ("\\", "#92;"),
)


def escapar_rotulo(valor: Any) -> str:
    """Escapa o texto para uso dentro de aspas duplas em Mermaid. Não trunca."""
    texto = limpar_texto(valor)
    for origem, destino in _ESCAPES:
        texto = texto.replace(origem, destino)
    return texto


def sanitizar_id(id_: str) -> str:
    """Id de nó Mermaid. Injetiva: ids distintos nunca colidem.

    Ids seguros (`[A-Za-z][A-Za-z0-9_]*`, fora das palavras reservadas e sem o
    prefixo `x_` ou `z_`) passam sem mudança. Os demais ganham o prefixo `x_` e
    cada caractere fora de `[A-Za-z0-9]` vira `_<hex>_`. O prefixo `z_` é
    reservado aos elementos fixos do gerador (legenda e pontes).
    """
    if _RE_ID_SEGURO.match(id_) and id_.lower() not in _RESERVADAS and not id_.startswith(("x_", "z_")):
        return id_
    partes = [c if (c.isascii() and c.isalnum()) else f"_{ord(c):x}_" for c in id_]
    return "x_" + "".join(partes)


def _id_sg(raia_id: str) -> str:
    """Id do subgraph da raia: espaço reservado `z_SG_`, injetivo porque `sanitizar_id` é."""
    return "z_SG_" + sanitizar_id(raia_id)


def id_subgraph(raia_id: str) -> str:
    """Id público do subgraph da raia (o HTML o usa para ligar o grupo do SVG à raia e mostrar o tooltip)."""
    return _id_sg(raia_id)


# ---------------------------------------------------------------------- cores


def _rgb(cor: str) -> tuple[int, int, int]:
    return int(cor[1:3], 16), int(cor[3:5], 16), int(cor[5:7], 16)


def _hex(r: float, g: float, b: float) -> str:
    return "#{:02X}{:02X}{:02X}".format(*(max(0, min(255, round(v))) for v in (r, g, b)))


def cor_valida(cor: Any) -> str:
    return cor.upper() if isinstance(cor, str) and _RE_COR.match(cor) else _COR_PADRAO


def clarear(cor: str, fracao: float) -> str:
    """Mistura a cor com branco (`fracao` de branco)."""
    r, g, b = _rgb(cor)
    return _hex(r + (255 - r) * fracao, g + (255 - g) * fracao, b + (255 - b) * fracao)


def escurecer(cor: str, fracao: float) -> str:
    r, g, b = _rgb(cor)
    return _hex(r * (1 - fracao), g * (1 - fracao), b * (1 - fracao))


def _luminancia(cor: str) -> float:
    def canal(v: int) -> float:
        c = v / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (canal(v) for v in _rgb(cor))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def cor_texto(fundo: str) -> str:
    """Preto ou branco, o que der mais contraste (WCAG) sobre `fundo`."""
    lum = _luminancia(fundo)
    contraste_preto = (lum + 0.05) / 0.05
    contraste_branco = 1.05 / (lum + 0.05)
    return "#000000" if contraste_preto >= contraste_branco else "#FFFFFF"


# ------------------------------------------------------------- acesso ao modelo


@dataclass(frozen=True)
class Diagrama:
    """Texto Mermaid e o mapa do id sanitizado para o id original do nó."""

    texto: str
    mapa_ids: Mapping[str, str] = field(default_factory=dict)


def _lista(doc: Mapping[str, Any], colecao: str) -> list[Mapping[str, Any]]:
    valor = doc.get(colecao) or []
    return [x for x in valor if isinstance(x, Mapping) and "id" in x]


def _por_id(itens: Iterable[Mapping[str, Any]]) -> dict[str, Mapping[str, Any]]:
    return {str(x["id"]): x for x in itens}


def _sigla(demanda: Mapping[str, Any]) -> str:
    return str(demanda.get("sigla") or str(demanda["id"]).upper())


@dataclass(frozen=True)
class _Contexto:
    demanda: Mapping[str, Any]
    raias: dict[str, Mapping[str, Any]]  # só as raias da demanda, por id
    nos: dict[str, Mapping[str, Any]]  # decisões da demanda, por id
    todas_raias: dict[str, Mapping[str, Any]]
    demandas: dict[str, Mapping[str, Any]]
    ordem_raias: tuple[str, ...] = ()  # orquestradora, raias na ordem de chamada, não alcançadas
    ordem_nos: tuple[str, ...] = ()  # nós por raia (na ordem de ordem_raias), cada raia na ordem do fluxo
    papeis: Mapping[str, str] = field(default_factory=dict)  # id do papel -> nome, para o selo da subtarefa

    def ordenar(self, ids: Iterable[str]) -> list[str]:
        """Os ids na ordem de declaração do diagrama (raias na ordem de chamada, nós na ordem do fluxo)."""
        conjunto = set(ids)
        return [i for i in self.ordem_nos if i in conjunto]

    def cor(self, raia_id: str) -> str:
        return cor_valida(self.todas_raias[raia_id].get("cor"))

    def nome(self, raia_id: str) -> str:
        return str(self.todas_raias[raia_id].get("nome") or raia_id)


def _contexto(doc: Mapping[str, Any], demanda_id: str) -> _Contexto:
    demandas = _por_id(_lista(doc, "demandas"))
    if demanda_id not in demandas:
        raise GeracaoError(f"demanda desconhecida: {demanda_id}")
    todas = _por_id(_lista(doc, "raias"))
    if not todas:
        raise GeracaoError(
            "o documento não tem a coleção `raias`: remodele os fluxos para o padrão de raias antes de gerar"
        )
    if demanda_id in demandas_biblioteca(doc):
        raise GeracaoError(f"a demanda {demanda_id} é uma biblioteca de raias: entra no diagrama de quem a chama")
    # Raias da demanda e as raias de biblioteca que ela chama, na ordem do YAML.
    no_contexto = raias_do_contexto(doc, demanda_id)
    raias = {i: r for i, r in todas.items() if i in no_contexto}
    if not raias:
        raise GeracaoError(f"a demanda {demanda_id} não tem raias")
    nos = {str(d["id"]): d for d in _lista(doc, "decisoes") if str(d.get("raia")) in no_contexto}
    for i, n in sorted(nos.items(), key=lambda kv: chave_natural(kv[0])):
        if n.get("raia") not in todas:
            raise GeracaoError(f"o nó {i} referencia a raia inexistente: {n.get('raia')!r}")
        if n.get("tipo") not in LETRA_TIPO:
            raise GeracaoError(f"o nó {i} tem tipo inválido: {n.get('tipo')!r}")
        if n["tipo"] == "chamada" and n.get("raia_chamada") not in todas:
            raise GeracaoError(f"a chamada {i} referencia a raia inexistente: {n.get('raia_chamada')!r}")
    ordem_r = ordem_raias(raias, nos)
    ordem_n: list[str] = []
    for rid in ordem_r:
        ordem_n.extend(ordem_fluxo(nos, [i for i, n in nos.items() if n["raia"] == rid]))
    # Nós de raias fora da demanda (não deveria ocorrer) ficam no fim, em ordem natural.
    ordem_n.extend(ordenar_natural(set(nos) - set(ordem_n)))
    papeis = {str(p["id"]): str(p.get("nome") or p["id"]) for p in _lista(doc, "papeis")}
    return _Contexto(demandas[demanda_id], raias, nos, todas, demandas, tuple(ordem_r), tuple(ordem_n), papeis)


def _orquestradora(ctx: _Contexto) -> str:
    for i in ctx.ordem_raias:
        if ctx.raias[i].get("orquestradora") is True:
            return i
    raise GeracaoError(f"a demanda {ctx.demanda['id']} não tem raia orquestradora")


def raias_ordenadas(doc: Mapping[str, Any], demanda_id: str) -> list[str]:
    """Ids das raias da demanda: orquestradora, depois na ordem de chamada, depois as não alcançadas."""
    return list(_contexto(doc, demanda_id).ordem_raias)


def visoes_da_demanda(doc: Mapping[str, Any], demanda_id: str) -> list[str]:
    """Nomes das visões disponíveis, em ordem estável: visao, raia:<id>... (ordem das raias), completo."""
    ctx = _contexto(doc, demanda_id)
    return [VISAO, *(PREFIXO_RAIA + i for i in ctx.ordem_raias), COMPLETO]


def nome_arquivo(demanda_id: str, visao: str) -> str:
    """`<demanda>.visao.mmd`, `<demanda>.completo.mmd` ou `<demanda>.<raia>.mmd`."""
    meio = visao[len(PREFIXO_RAIA):] if visao.startswith(PREFIXO_RAIA) else visao
    nome = f"{demanda_id}.{meio}.mmd"
    if not _RE_NOME_ARQUIVO.match(nome):
        raise GeracaoError(f"id não pode virar nome de arquivo: {nome!r}")
    return nome


# ---------------------------------------------------------------------- nós


LIMITE_LINHA_GATEWAY = 20
FONTE_GATEWAY_PX = 11


def quebrar_rotulo(valor: Any, limite: int = LIMITE_LINHA_GATEWAY) -> list[str]:
    """Quebra o texto em linhas de até `limite` caracteres, sem cortar palavras.

    Determinística e sem travessões (usa `limpar_texto`). Uma palavra maior que o limite fica
    inteira na sua linha. Não escapa: quem monta o Mermaid escapa cada linha depois.
    """
    palavras = limpar_texto(valor).split(" ")
    linhas: list[str] = []
    atual = ""
    for palavra in palavras:
        if not palavra:
            continue
        if atual and len(atual) + 1 + len(palavra) > limite:
            linhas.append(atual)
            atual = palavra
        else:
            atual = f"{atual} {palavra}" if atual else palavra
    if atual:
        linhas.append(atual)
    return linhas or [""]


def _rotulo_no(ctx: _Contexto, no: Mapping[str, Any], indicador_subtarefas: bool = False) -> str:
    texto = no.get("rotulo") or no["id"]
    if no["tipo"] == "bifurcacao":
        corpo = "<br/>".join(escapar_rotulo(x) for x in quebrar_rotulo(texto))
    else:
        corpo = escapar_rotulo(texto)
    linhas = [f"<small><b>{escapar_rotulo(no['id'])}</b></small>", corpo]
    n_sub = len(subtarefas_do_no(no)) if indicador_subtarefas else 0
    if n_sub:
        linhas.append(f"<i>▸ {n_sub} subtarefa{'s' if n_sub > 1 else ''}</i>")
    if no["tipo"] == "fim" and no.get("retorno"):
        linhas.append(f"<i>retorno: {escapar_rotulo(no['retorno'])}</i>")
    return "<br/>".join(linhas)


def _declaracao_no(ctx: _Contexto, no: Mapping[str, Any], indicador_subtarefas: bool = False) -> str:
    sid = sanitizar_id(str(no["id"]))
    rot = _rotulo_no(ctx, no, indicador_subtarefas)
    forma = {
        "inicio": '(["{}"])',
        "fim": '(["{}"])',
        "tarefa": '["{}"]',
        "bifurcacao": '{{"{}"}}',
        "chamada": '[["{}"]]',
    }[no["tipo"]]
    return f"{sid}{forma.format(rot)}"


def _declaracao_subtarefa(sub: Mapping[str, Any], papeis: Mapping[str, str] | None = None) -> str:
    resp = str(sub.get("responsavel") or "")
    selo = ROTULO_RESPONSAVEL.get(resp, resp)
    if sub.get("papel"):  # o papel substitui o selo genérico agente, pessoa ou ambos
        selo = (papeis or {}).get(str(sub["papel"]), str(sub["papel"]))
    prefixo = "◆ " if sub.get("quando") else ""  # subtarefa condicional: o prefixo e a borda tracejada a distinguem
    linhas = [f"<small><b>{escapar_rotulo(sub['id'])}</b></small>", prefixo + escapar_rotulo(sub.get("rotulo") or sub["id"])]
    if selo:
        linhas.append(f"<i>{escapar_rotulo(selo)}</i>")
    return f'{sanitizar_id(str(sub["id"]))}("{"<br/>".join(linhas)}")'


def _id_ts(tarefa_id: str) -> str:
    """Id do subgraph que agrupa a tarefa e as suas subtarefas (reservado `z_TS_`, injetivo)."""
    return "z_TS_" + sanitizar_id(tarefa_id)


def _indice(ctx: _Contexto, raia_id: str) -> int:
    return ctx.ordem_raias.index(raia_id)


def _classe_raia(ctx: _Contexto, raia_id: str) -> str:
    return f"z_R_{_indice(ctx, raia_id)}"


def _classe_sub(ctx: _Contexto, raia_id: str) -> str:
    return f"z_S_{_indice(ctx, raia_id)}"


def _classe_sub_cond(ctx: _Contexto, raia_id: str) -> str:
    return f"z_SC_{_indice(ctx, raia_id)}"


def _classe_chamada(ctx: _Contexto, chamadora: str, chamada: str) -> str:
    return f"z_C_{_indice(ctx, chamadora)}_{_indice(ctx, chamada)}"


def _classe_do_no(ctx: _Contexto, no: Mapping[str, Any]) -> str:
    if no["tipo"] == "chamada":
        return _classe_chamada(ctx, no["raia"], no["raia_chamada"])
    return _classe_raia(ctx, no["raia"])


def _def_classe(nome: str, fundo: str, borda: str, largura: int) -> str:
    return f"classDef {nome} fill:{fundo},stroke:{borda},stroke-width:{largura}px,color:{cor_texto(fundo)}"


# ------------------------------------------------------------------- legenda


_LEG = "z_LEG"


def _legenda(ctx: _Contexto, chamadas: list[str], com_sub: bool = False, com_cond: bool = False) -> list[str]:
    """Legenda enxuta: letras e formas dos tipos, mais as raias chamadas sem subgraph (uma vez cada)."""
    chips = [f'{_LEG}_r{i}["<b>{escapar_rotulo(ctx.nome(rid))}</b><br/>raia chamada"]' for i, rid in enumerate(chamadas)]
    elementos = [
        f'{_LEG}_s(["<b>s</b>: início"])',
        f'{_LEG}_t["<b>t</b>: tarefa"]',
        f'{_LEG}_g{{"<b>g</b>: gateway"}}',
        f'{_LEG}_c[["<b>c</b>: chamada de outra raia<br/>cor da raia chamada,<br/>borda da raia que chama"]]',
        f'{_LEG}_e(["<b>e</b>: fim ou retorno"])',
        *([f'{_LEG}_st("<b>st</b>: subtarefa")'] if com_sub else []),
        *([f'{_LEG}_sc("<b>◆ st</b>: subtarefa condicional<br/>borda tracejada")'] if com_cond else []),
        *chips,
    ]
    # Uma única cadeia invisível mantém a legenda em uma linha horizontal.
    return [
        f'subgraph {_LEG}["Legenda"]',
        "  direction LR",
        "  " + " ~~~ ".join(elementos),
        "end",
    ]


def _classes_legenda(ctx: _Contexto, chamadas: list[str], com_sub: bool = False, com_cond: bool = False) -> list[str]:
    linhas = [
        "classDef leg fill:#FFFFFF,stroke:#333333,stroke-width:1px,color:#000000",
        "classDef legc fill:#FFFFFF,stroke:#333333,stroke-width:4px,color:#000000",
        f"class {_LEG}_s,{_LEG}_t,{_LEG}_g,{_LEG}_e leg",
        f"class {_LEG}_c legc",
    ]
    if com_sub:
        linhas.append(f"class {_LEG}_st leg")
    if com_cond:
        linhas.append("classDef legcond fill:#FFFFFF,stroke:#333333,stroke-width:2px,stroke-dasharray:4 3,color:#000000")
        linhas.append(f"class {_LEG}_sc legcond")
    for i, rid in enumerate(chamadas):
        linhas.append(f"class {_LEG}_r{i} {_classe_raia(ctx, rid)}")
    linhas.append(f"style {_LEG} fill:#FAFAFA,stroke:#999999,stroke-width:1px")
    return linhas


# --------------------------------------------------------------------- arestas


@dataclass(frozen=True)
class _Aresta:
    origem: str
    destino: str
    rotulo: str
    tracejada: bool = False

    def chave(self) -> tuple[str, str, str, bool]:
        return (self.origem, self.destino, self.rotulo, self.tracejada)

    def texto(self) -> str:
        seta = "-.->" if self.tracejada else "-->"
        rot = f'|"{escapar_rotulo(self.rotulo)}"|' if limpar_texto(self.rotulo) else ""
        return f"{sanitizar_id(self.origem)} {seta}{rot} {sanitizar_id(self.destino)}"


def _arestas_proximo(ctx: _Contexto, ids: set[str]) -> list[_Aresta]:
    out = []
    for i in ctx.ordenar(ids):
        for p in ctx.nos[i].get("proximo") or []:
            if isinstance(p, Mapping) and p.get("para") in ids:
                out.append(_Aresta(i, str(p["para"]), str(p.get("condicao") or "")))
    return out


def _inicio_da_raia(ctx: _Contexto, raia_id: str) -> str | None:
    for i in ordenar_natural(ctx.nos):
        if ctx.nos[i]["raia"] == raia_id and ctx.nos[i]["tipo"] == "inicio":
            return i
    return None


def _arestas_chamada(ctx: _Contexto, ids: set[str]) -> tuple[list[_Aresta], set[tuple[str, str]]]:
    """Arestas tracejadas de chamada e retorno. Devolve também os pares (chamada, destino) cobertos."""
    chamadas = [i for i in ctx.ordenar(ids) if ctx.nos[i]["tipo"] == "chamada"]
    por_raia: dict[str, int] = {}
    for c in chamadas:
        por_raia[ctx.nos[c]["raia_chamada"]] = por_raia.get(ctx.nos[c]["raia_chamada"], 0) + 1
    out: list[_Aresta] = []
    cobertos: set[tuple[str, str]] = set()
    for c in chamadas:
        alvo = ctx.nos[c]["raia_chamada"]
        ini = _inicio_da_raia(ctx, alvo)
        if ini is not None and ini in ids:
            out.append(_Aresta(c, ini, "chama", True))
        fins = [i for i in ctx.ordenar(ids) if ctx.nos[i]["raia"] == alvo and ctx.nos[i]["tipo"] == "fim"]
        for f in fins:
            ret = str(ctx.nos[f].get("retorno") or "")
            for p in ctx.nos[c].get("proximo") or []:
                if isinstance(p, Mapping) and p.get("para") in ids and str(p.get("condicao") or "") == ret:
                    rot = f"retorno: {ret}" if por_raia[alvo] == 1 else f"retorno: {ret} ({c})"
                    out.append(_Aresta(f, str(p["para"]), rot, True))
                    cobertos.add((c, str(p["para"])))
    return out, cobertos


def _pontes(ctx: _Contexto, ids: set[str]) -> tuple[list[str], list[_Aresta], list[str]]:
    """Nós-ponte das ligações entre demandas. Devolve (declarações, arestas, ids das pontes)."""
    decl: list[str] = []
    arestas: list[_Aresta] = []
    pontes: list[str] = []
    for i in ctx.ordenar(ids):
        for n, lig in enumerate(ctx.nos[i].get("ligacoes") or []):
            if not isinstance(lig, Mapping):
                continue
            pid = f"z_LIG_{sanitizar_id(i)}_{n}"
            dest = ctx.demandas.get(str(lig.get("demanda_destino")))
            nome_dest = (dest or {}).get("nome") or lig.get("demanda_destino") or ""
            partes = [
                f"<b>{escapar_rotulo(lig.get('rotulo') or 'ligação')}</b>",
                f"demanda: {escapar_rotulo(nome_dest)}",
                f"nó: {escapar_rotulo(lig.get('para') or '')}",
            ]
            decl.append(f'{pid}{{{{"{"<br/>".join(partes)}"}}}}')
            pontes.append(pid)
            rot = escapar_rotulo(lig.get("tipo") or "")
            arestas.append(_Aresta(i, pid, rot, True))
    return decl, arestas, pontes


def _aresta_ponte_texto(a: _Aresta) -> str:
    seta = "-.->"
    rot = f'|"{escapar_rotulo(a.rotulo)}"|' if limpar_texto(a.rotulo) else ""
    return f"{sanitizar_id(a.origem)} {seta}{rot} {a.destino}"


# ------------------------------------------------------------------ montagem


def _montar(
    ctx: _Contexto,
    raias_visiveis: list[str],
    ids: set[str],
    completo: bool,
    com_pontes: bool,
    legenda: bool,
    subtarefas: bool = False,
) -> Diagrama:
    chamadas_sem_subgraph = [
        r
        for r in ctx.ordem_raias
        if r in {ctx.nos[i]["raia_chamada"] for i in ids if ctx.nos[i]["tipo"] == "chamada"} - set(raias_visiveis)
    ]
    # Tarefas com subtarefas (na ordem de declaração do diagrama).
    com_sub = [i for i in ctx.ordenar(ids) if subtarefas_do_no(ctx.nos[i])]
    # Em modo expandido a saída da tarefa passa a sair da última subtarefa.
    saida_de = {i: str(subtarefas_do_no(ctx.nos[i])[-1]["id"]) for i in com_sub} if subtarefas else {}
    legenda_sub = legenda and subtarefas and bool(com_sub)
    legenda_cond = legenda_sub and any(s_.get("quando") for i in com_sub for s_ in subtarefas_do_no(ctx.nos[i]))

    linhas = ["flowchart LR"]
    if legenda:
        linhas += ["  " + x for x in _legenda(ctx, chamadas_sem_subgraph, legenda_sub, legenda_cond)]

    cadeia: list[_Aresta] = []
    for rid in raias_visiveis:
        raia = ctx.raias[rid]
        # Só o NOME (curto) no título: um subtítulo de várias linhas era coberto pelos nós. A responsabilidade
        # vai para o tooltip do HTML, o modal do nó e a legenda.
        titulo = f"<b>{escapar_rotulo(raia.get('nome') or rid)}</b>"
        linhas.append(f'  subgraph {_id_sg(rid)}["{titulo}"]')
        linhas.append("    direction LR")
        for i in ctx.ordenar(ids):
            if ctx.nos[i]["raia"] != rid:
                continue
            no = ctx.nos[i]
            if subtarefas and i in saida_de:
                subs = subtarefas_do_no(no)
                rot_tarefa = f"<b>{escapar_rotulo(no.get('rotulo') or i)}</b>"
                linhas.append(f'    subgraph {_id_ts(i)}["{rot_tarefa}"]')
                linhas.append("      direction LR")
                linhas.append("      " + _declaracao_no(ctx, no))
                for sub in subs:
                    linhas.append("      " + _declaracao_subtarefa(sub, ctx.papeis))
                linhas.append("    end")
                anterior = i
                for sub in subs:
                    cadeia.append(_Aresta(anterior, str(sub["id"]), ""))
                    anterior = str(sub["id"])
            else:
                linhas.append("    " + _declaracao_no(ctx, no, indicador_subtarefas=not subtarefas))
        linhas.append("  end")

    arestas = _arestas_proximo(ctx, ids)
    if completo:
        extras, cobertos = _arestas_chamada(ctx, ids)
        arestas = [a for a in arestas if (a.origem, a.destino) not in cobertos or ctx.nos[a.origem]["tipo"] != "chamada"]
        arestas += extras
    arestas = [_Aresta(saida_de.get(a.origem, a.origem), a.destino, a.rotulo, a.tracejada) for a in arestas]
    arestas = list(dict.fromkeys(cadeia + arestas))  # sem repetição, na ordem de geração (fluxo)
    for a in arestas:
        linhas.append("  " + a.texto())

    pontes: list[str] = []
    if com_pontes:
        decl, ligs, pontes = _pontes(ctx, ids)
        linhas += ["  " + d for d in decl]
        linhas += [
            "  " + _aresta_ponte_texto(_Aresta(saida_de.get(a.origem, a.origem), a.destino, a.rotulo, a.tracejada))
            for a in ligs
        ]

    # Estilos: classes por raia, por par chamadora/chamada, legenda e pontes.
    for rid in ctx.ordem_raias:
        cor = ctx.cor(rid)
        linhas.append("  " + _def_classe(_classe_raia(ctx, rid), cor, escurecer(cor, 0.4), 1))
    if subtarefas and com_sub:
        # Subtarefa: a cor da raia mais clara, borda fina, fonte menor.
        for rid in sorted({ctx.nos[i]["raia"] for i in com_sub}, key=lambda r: _indice(ctx, r)):
            cor = ctx.cor(rid)
            linhas.append("  " + _def_classe(_classe_sub(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 1) + ",font-size:12px")
        for rid in sorted({ctx.nos[i]["raia"] for i in com_sub if any(s_.get("quando") for s_ in subtarefas_do_no(ctx.nos[i]))},
                          key=lambda r: _indice(ctx, r)):
            cor = ctx.cor(rid)  # subtarefa condicional: mesma cor, borda tracejada
            linhas.append("  " + _def_classe(_classe_sub_cond(ctx, rid), clarear(cor, 0.55), escurecer(cor, 0.4), 2)
                          + ",font-size:12px,stroke-dasharray:4 3")
    pares = sorted(
        {(ctx.nos[i]["raia"], ctx.nos[i]["raia_chamada"]) for i in ids if ctx.nos[i]["tipo"] == "chamada"},
        key=lambda par: (_indice(ctx, par[0]), _indice(ctx, par[1])),
    )
    for chamadora, chamada in pares:
        linhas.append("  " + _def_classe(_classe_chamada(ctx, chamadora, chamada), ctx.cor(chamada), ctx.cor(chamadora), 4))
    linhas.append(f"  classDef gw font-size:{FONTE_GATEWAY_PX}px")
    linhas.append("  classDef ponte fill:#FFFFFF,stroke:#555555,stroke-width:2px,stroke-dasharray:5 3,color:#000000")
    if legenda:
        linhas += ["  " + x for x in _classes_legenda(ctx, chamadas_sem_subgraph, legenda_sub, legenda_cond)]

    por_classe: dict[str, list[str]] = {}
    for i in ctx.ordenar(ids):
        por_classe.setdefault(_classe_do_no(ctx, ctx.nos[i]), []).append(sanitizar_id(i))
    if subtarefas:
        for i in com_sub:
            for s_ in subtarefas_do_no(ctx.nos[i]):
                classe = (_classe_sub_cond if s_.get("quando") else _classe_sub)(ctx, ctx.nos[i]["raia"])
                por_classe.setdefault(classe, []).append(sanitizar_id(str(s_["id"])))
    for classe in sorted(por_classe, key=chave_natural):
        linhas.append(f"  class {','.join(por_classe[classe])} {classe}")
    gateways = [sanitizar_id(i) for i in ctx.ordenar(ids) if ctx.nos[i]["tipo"] == "bifurcacao"]
    if gateways:
        linhas.append(f"  class {','.join(gateways)} gw")
    if pontes:
        linhas.append(f"  class {','.join(pontes)} ponte")
    for rid in raias_visiveis:
        cor = ctx.cor(rid)
        linhas.append(f"  style {_id_sg(rid)} fill:{clarear(cor, 0.85)},stroke:{cor},stroke-width:3px,color:#000000")
    if subtarefas:
        for i in com_sub:
            cor = ctx.cor(ctx.nos[i]["raia"])
            linhas.append(
                f"  style {_id_ts(i)} fill:{clarear(cor, 0.94)},stroke:{escurecer(cor, 0.3)},"
                "stroke-width:1.5px,stroke-dasharray:5 3,color:#000000"
            )

    mapa = {sanitizar_id(i): i for i in ctx.ordenar(ids)}
    if subtarefas:
        for i in com_sub:
            for s_ in subtarefas_do_no(ctx.nos[i]):
                mapa[sanitizar_id(str(s_["id"]))] = str(s_["id"])
    return Diagrama("\n".join(linhas) + "\n", mapa)


def gerar_diagrama(
    doc: Mapping[str, Any], demanda_id: str, visao: str, legenda: bool = True, subtarefas: bool = False
) -> Diagrama:
    """Gera o diagrama de uma visão: `visao`, `raia:<id>` ou `completo`.

    `legenda=False` omite a subgraph "Legenda" (o HTML tem uma legenda única própria).
    `subtarefas=True` expande as subtarefas de cada tarefa (subgraph aninhado); o padrão as oculta.
    """
    ctx = _contexto(doc, demanda_id)
    if visao == VISAO:
        orq = _orquestradora(ctx)
        ids = {i for i, n in ctx.nos.items() if n["raia"] == orq}
        return _montar(ctx, [orq], ids, completo=False, com_pontes=True, legenda=legenda, subtarefas=subtarefas)
    if visao == COMPLETO:
        ids = set(ctx.nos)
        return _montar(ctx, list(ctx.ordem_raias), ids, completo=True, com_pontes=True, legenda=legenda, subtarefas=subtarefas)
    if visao.startswith(PREFIXO_RAIA):
        rid = visao[len(PREFIXO_RAIA):]
        if rid not in ctx.raias:
            raise GeracaoError(f"raia desconhecida na demanda {demanda_id}: {rid}")
        ids = {i for i, n in ctx.nos.items() if n["raia"] == rid}
        return _montar(ctx, [rid], ids, completo=False, com_pontes=False, legenda=legenda, subtarefas=subtarefas)
    raise GeracaoError(f"visão desconhecida: {visao!r}")


def gerar_todos(doc: Mapping[str, Any], legenda: bool = True, subtarefas: bool = False) -> dict[str, Diagrama]:
    """Todos os diagramas do documento, por nome de arquivo (ordem estável)."""
    saida: dict[str, Diagrama] = {}
    for d in _lista(doc, "demandas"):  # ordem de declaração no YAML, sem ordenar por id
        demanda_id = str(d["id"])
        if d.get("biblioteca") is True:
            continue  # raias comuns entram nos diagramas das demandas que as chamam
        try:
            visoes = visoes_da_demanda(doc, demanda_id)
        except GeracaoError:
            if not _lista(doc, "raias"):
                raise
            if not any(r.get("demanda") == demanda_id for r in _lista(doc, "raias")):
                continue  # demanda ainda sem raias entre outras que já têm
            raise
        for v in visoes:
            saida[nome_arquivo(demanda_id, v)] = gerar_diagrama(doc, demanda_id, v, legenda, subtarefas)
    return saida
