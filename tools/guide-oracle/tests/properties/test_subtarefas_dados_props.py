"""Propriedades de subtarefas, dados e técnicas condicionais (Properties 39 a 42).

- Property 39: condição válida é sempre aceita e `descrever_condicao` é determinística.
- Property 40: referência quebrada em entradas, saídas, técnica ou variável é sempre reportada, com path e item_id.
- Property 41: `rastrear_dados` bate com as listas `entradas` e `saidas` do documento.
- Property 42: documento gerado com os campos novos não produz erros nem avisos.
- Property 43: `quando` de subtarefa e de variante com variável inexistente é sempre reportado; nome de variante repetido idem.
- Property 44: tarefa sem artefato entregue em raia em adoção sempre gera TAREFA_SEM_ENTREGAVEL.
- Property 45: o gerador cobre os campos novos (subtarefa condicional, variantes, tipos novos, subtipo).
"""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

from hypothesis import HealthCheck, Phase, assume, find, given, settings
from hypothesis import strategies as st

from guia_decisao.ordem import chave_natural
from guia_decisao.rastreio import descrever_condicao, rastrear_dados
from guia_decisao.validator import validate
from tests.properties import strategies as S
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))

CFG = settings(max_examples=100, deadline=None, suppress_health_check=list(HealthCheck))

# Os ids do gerador têm no máximo 6 caracteres no primeiro grupo e 5 nos demais, logo estes nunca colidem.
FAKE = "zz_inexistente"
TECNICA_PROP = "tecnica_propriedade"
VARS_PROP = ("variavel_prop_a", "variavel_prop_b", "variavel_prop_c")


def _donos(doc: dict[str, Any]) -> list[tuple[str, dict[str, Any], bool]]:
    """(caminho, item, aceita saidas) de raias, nós e subtarefas."""
    out: list[tuple[str, dict[str, Any], bool]] = [(f"raias[{i}]", r, False) for i, r in enumerate(doc["raias"])]
    for i, d in enumerate(doc["decisoes"]):
        out.append((f"decisoes[{i}]", d, True))
        out += [(f"decisoes[{i}].subtarefas[{k}]", s, True) for k, s in enumerate(d.get("subtarefas", []))]
    return out


@st.composite
def _doc_com_condicao(draw: st.DrawFn) -> tuple[dict[str, Any], dict[str, Any]]:
    """Documento válido com variáveis geradas e um uso condicional válido em algum nó. Devolve (doc, condição)."""
    doc = copy.deepcopy(draw(S.valid_docs()))
    if not doc.get("variaveis"):
        for d in doc["decisoes"]:  # sem catálogo prévio, as chaves de estado soltas passariam a gerar aviso
            d["estado"] = {}
    variaveis = S._gerar_variaveis(draw, list(VARS_PROP))
    doc["variaveis"] = [*doc.get("variaveis", []), *variaveis]
    doc.setdefault("artefatos", [])
    doc["tecnicas"] = [*doc["tecnicas"], {"id": TECNICA_PROP, "nome": "Técnica de propriedade"}]
    condicao = S.gerar_condicao(draw, variaveis)
    uso = {"tecnica": TECNICA_PROP, "uso": "condicional", "quando": condicao}
    donos = [(c, i) for c, i, _ in _donos(doc) if not c.startswith("raias")]
    _, alvo = donos[draw(st.integers(0, len(donos) - 1))]
    alvo.setdefault("tecnicas", []).append(uso)
    citadas = {t["var"] for t in condicao.get("todos", []) + condicao.get("algum", [])}
    for v in variaveis:  # variável sem uso geraria ITEM_SEM_USO: o estado de um nó conta como uso e não abre adoção
        if v["id"] not in citadas:
            doc["decisoes"][0].setdefault("estado", {})[v["id"]] = "x"
    return doc, condicao


# ------------------------------------------------------------------ Property 39


# Feature: guia-decisao-engenharia, Property 39: Condição válida é sempre aceita e a descrição é determinística
@CFG
@given(_doc_com_condicao())
def test_condicao_valida_e_sempre_aceita(par: tuple[dict[str, Any], dict[str, Any]]) -> None:
    doc, condicao = par
    assert validate(doc, SCHEMA, avisos=True) == []
    texto = descrever_condicao(condicao)
    assert texto == descrever_condicao(copy.deepcopy(condicao))
    assert texto.startswith("quando ")
    assert "\u2014" not in texto and "\u2013" not in texto
    chave = "todos" if "todos" in condicao else "algum"
    juncao = " e " if chave == "todos" else " ou "
    assert texto.count(juncao) >= len(condicao[chave]) - 1
    for termo in condicao[chave]:
        assert termo["var"] in texto


# Feature: guia-decisao-engenharia, Property 39: Condição válida é sempre aceita e a descrição é determinística
@CFG
@given(_doc_com_condicao(), st.integers(0, 10_000))
def test_condicional_sem_quando_e_sempre_rejeitado(par: tuple[dict[str, Any], dict[str, Any]], pick: int) -> None:
    doc, _ = par
    usos = [(c, u) for c, i, _ in _donos(doc) for u in i.get("tecnicas", []) if u["uso"] == "condicional"]
    caminho, uso = usos[pick % len(usos)]
    del uso["quando"]
    issues = validate(doc, SCHEMA)
    assert any(i.code == "CONDICAO_AUSENTE" and i.nivel == "erro" for i in issues), caminho


# ------------------------------------------------------------------ Property 40


# Feature: guia-decisao-engenharia, Property 40: Referência quebrada de dados é sempre reportada
@CFG
@given(S.valid_docs(), st.integers(0, 10_000), st.sampled_from(["entradas", "saidas"]))
def test_ref_quebrada_em_entradas_e_saidas_e_sempre_reportada(doc: dict[str, Any], pick: int, campo: str) -> None:
    doc = copy.deepcopy(doc)
    candidatos = [(c, i) for c, i, aceita_saidas in _donos(doc) if campo == "entradas" or aceita_saidas]
    caminho, item = candidatos[pick % len(candidatos)]
    item.setdefault(campo, []).append(FAKE)
    esperado = f"{caminho}.{campo}[{len(item[campo]) - 1}]"
    achados = [i for i in validate(doc, SCHEMA) if i.code == "REF_QUEBRADA" and i.path == esperado]
    assert len(achados) == 1
    assert achados[0].item_id == item["id"]
    assert achados[0].nivel == "erro"


# Feature: guia-decisao-engenharia, Property 40: Referência quebrada de dados é sempre reportada
@CFG
@given(S.valid_docs(), st.integers(0, 10_000))
def test_ref_quebrada_de_tecnica_e_sempre_reportada(doc: dict[str, Any], pick: int) -> None:
    doc = copy.deepcopy(doc)
    candidatos = [(c, i) for c, i, _ in _donos(doc) if not c.startswith("raias")]
    caminho, item = candidatos[pick % len(candidatos)]
    item.setdefault("tecnicas", []).append({"tecnica": FAKE, "uso": "opcional"})
    esperado = f"{caminho}.tecnicas[{len(item['tecnicas']) - 1}].tecnica"
    achados = [i for i in validate(doc, SCHEMA) if i.code == "REF_QUEBRADA" and i.path == esperado]
    assert [(i.item_id, i.nivel) for i in achados] == [(item["id"], "erro")]


# Feature: guia-decisao-engenharia, Property 40: Referência quebrada de dados é sempre reportada
@CFG
@given(S.valid_docs(), st.integers(0, 10_000))
def test_ref_quebrada_de_variavel_da_condicao_e_sempre_reportada(doc: dict[str, Any], pick: int) -> None:
    doc = copy.deepcopy(doc)
    doc["tecnicas"] = [*doc["tecnicas"], {"id": TECNICA_PROP, "nome": "T"}]
    candidatos = [(c, i) for c, i, _ in _donos(doc) if not c.startswith("raias")]
    caminho, item = candidatos[pick % len(candidatos)]
    uso = {"tecnica": TECNICA_PROP, "uso": "condicional", "quando": {"todos": [{"var": FAKE, "igual": "x"}]}}
    item.setdefault("tecnicas", []).append(uso)
    esperado = f"{caminho}.tecnicas[{len(item['tecnicas']) - 1}].quando.todos[0].var"
    issues = validate(doc, SCHEMA)
    achados = [i for i in issues if i.code == "REF_QUEBRADA" and i.path == esperado]
    assert [(i.item_id, i.nivel) for i in achados] == [(item["id"], "erro")]


# ------------------------------------------------------------------ Property 41


# Feature: guia-decisao-engenharia, Property 41: O rastreio de dados é consistente com o documento
@CFG
@given(S.valid_docs())
def test_rastrear_dados_e_consistente_com_o_documento(doc: dict[str, Any]) -> None:
    rastro = rastrear_dados(doc)
    catalogo = {x["id"]: (x, "artefato") for x in doc.get("artefatos", [])}
    catalogo |= {x["id"]: (x, "variavel") for x in doc.get("variaveis", [])}
    assert set(rastro) == set(catalogo)
    assert list(rastro) == sorted(rastro, key=chave_natural)
    donos = _donos(doc)
    for id_, info in rastro.items():
        item, tipo = catalogo[id_]
        assert info["tipo"] == tipo
        assert info["nome"] == item["nome"]
        produtores = {i["id"] for _, i, _ in donos if id_ in i.get("saidas", [])}
        consumidores = {i["id"] for _, i, _ in donos if id_ in i.get("entradas", [])}
        assert info["produzido_por"] == sorted(produtores, key=chave_natural)
        assert info["consumido_por"] == sorted(consumidores, key=chave_natural)
        assert len(set(info["produzido_por"])) == len(info["produzido_por"])


# Feature: guia-decisao-engenharia, Property 41: O rastreio de dados é consistente com o documento
@CFG
@given(S.valid_docs())
def test_rastrear_dados_e_deterministico_e_nao_altera_o_documento(doc: dict[str, Any]) -> None:
    antes = copy.deepcopy(doc)
    primeiro = rastrear_dados(doc)
    assert rastrear_dados(copy.deepcopy(doc)) == primeiro
    assert json.dumps(primeiro) == json.dumps(rastrear_dados(doc))
    assert doc == antes


# ------------------------------------------------------------------ Property 42


# Feature: guia-decisao-engenharia, Property 42: Documento válido com dados não gera erros nem avisos
@CFG
@given(S.valid_docs())
def test_documento_valido_nao_gera_erros_nem_avisos(doc: dict[str, Any]) -> None:
    assert validate(doc, SCHEMA, avisos=True) == []


# ------------------------------------------------------------------ Property 43


# Feature: guia-decisao-engenharia, Property 43: Condições de subtarefa e de variante são validadas como as demais
@CFG
@given(S.valid_docs(), st.integers(0, 10_000))
def test_quando_de_subtarefa_com_variavel_inexistente_e_sempre_reportado(doc: dict[str, Any], pick: int) -> None:
    doc = copy.deepcopy(doc)
    subs = [(i, k, s) for i, d in enumerate(doc["decisoes"]) for k, s in enumerate(d.get("subtarefas", []))]
    assume(subs)
    i, k, sub = subs[pick % len(subs)]
    sub["quando"] = {"todos": [{"var": FAKE, "igual": "x"}]}
    esperado = f"decisoes[{i}].subtarefas[{k}].quando.todos[0].var"
    achados = [x for x in validate(doc, SCHEMA) if x.code == "REF_QUEBRADA" and x.path == esperado]
    assert [(x.item_id, x.nivel) for x in achados] == [(sub["id"], "erro")]


# Feature: guia-decisao-engenharia, Property 43: Condições de subtarefa e de variante são validadas como as demais
@CFG
@given(S.valid_docs(), st.integers(0, 10_000))
def test_quando_de_variante_com_variavel_inexistente_e_sempre_reportado(doc: dict[str, Any], pick: int) -> None:
    doc = copy.deepcopy(doc)
    assume(doc.get("artefatos"))
    k = pick % len(doc["artefatos"])
    art = doc["artefatos"][k]
    art["variantes"] = [{"nome": "v", "quando": {"todos": [{"var": FAKE, "igual": "x"}]}}]
    esperado = f"artefatos[{k}].variantes[0].quando.todos[0].var"
    achados = [x for x in validate(doc, SCHEMA) if x.code == "REF_QUEBRADA" and x.path == esperado]
    assert [(x.item_id, x.nivel) for x in achados] == [(art["id"], "erro")]


# Feature: guia-decisao-engenharia, Property 43: Condições de subtarefa e de variante são validadas como as demais
@CFG
@given(_doc_com_condicao(), st.integers(0, 10_000))
def test_nome_de_variante_repetido_e_sempre_reportado(par: tuple[dict[str, Any], dict[str, Any]], pick: int) -> None:
    doc, condicao = par
    k = pick % len(doc["artefatos"]) if doc.get("artefatos") else None
    assume(k is not None)
    art = doc["artefatos"][k]
    art["variantes"] = [{"nome": "mesmo", "quando": copy.deepcopy(condicao)}, {"nome": "mesmo", "quando": copy.deepcopy(condicao)}]
    achados = [x for x in validate(doc, SCHEMA) if x.code == "VARIANTE_DUPLICADA"]
    assert [(x.path, x.item_id, x.nivel) for x in achados] == [(f"artefatos[{k}].variantes[1].nome", art["id"], "erro")]


# ------------------------------------------------------------------ Property 44


# Feature: guia-decisao-engenharia, Property 44: Tarefa sem artefato entregue em raia em adoção sempre avisa
@CFG
@given(S.valid_docs(), st.integers(0, 10_000))
def test_tarefa_sem_artefato_entregue_em_raia_em_adocao_sempre_avisa(doc: dict[str, Any], pick: int) -> None:
    doc = copy.deepcopy(doc)
    artefatos = {a["id"] for a in doc.get("artefatos", [])}
    em_adocao = {r["id"] for r in doc["raias"] if any(c in r for c in ("entradas", "saidas", "subtarefas"))}
    em_adocao |= {d["raia"] for d in doc["decisoes"] if any(c in d for c in ("entradas", "saidas", "subtarefas"))}
    tarefas = [(i, d) for i, d in enumerate(doc["decisoes"]) if d["tipo"] == "tarefa" and d["raia"] in em_adocao]
    assume(tarefas)
    i, alvo = tarefas[pick % len(tarefas)]
    alvo["saidas"] = [x for x in alvo.get("saidas", []) if x not in artefatos]
    for sub in alvo.get("subtarefas", []):
        sub["saidas"] = [x for x in sub.get("saidas", []) if x not in artefatos]
    achados = [x for x in validate(doc, SCHEMA, avisos=True) if x.code == "TAREFA_SEM_ENTREGAVEL" and x.item_id == alvo["id"]]
    assert [(x.path, x.nivel) for x in achados] == [(f"decisoes[{i}]", "aviso")]


# ------------------------------------------------------------------ Property 45


# Feature: guia-decisao-engenharia, Property 45: O gerador cobre os campos novos
def test_gerador_cobre_subtarefa_condicional_variantes_tipos_novos_e_subtipo() -> None:
    subs = lambda d: [s for n in d["decisoes"] for s in n.get("subtarefas", [])]  # noqa: E731
    novos = set(S.TIPOS_ARTEFATO) - {"documento", "dado", "decisao", "sinal"}
    # `find` só precisa PROVAR que o gerador alcança cada campo. Sem a fase de redução (shrink), que minimizava um
    # documento enorme por minutos, e sem banco de exemplos (que mascarava o custo a frio), o limite de 2000 continua
    # sendo o teto de tentativas e a busca para no primeiro exemplo que satisfaz o predicado.
    cfg = dict(settings=settings(max_examples=2000, deadline=None, suppress_health_check=list(HealthCheck),
                                 phases=[Phase.generate], database=None))
    find(S.valid_docs(), lambda d: any("quando" in s for s in subs(d)), **cfg)
    find(S.valid_docs(), lambda d: any("porque" in s and "quando" in s for s in subs(d)), **cfg)
    find(S.valid_docs(), lambda d: any(a.get("variantes") for a in d.get("artefatos", [])), **cfg)
    find(S.valid_docs(), lambda d: any(a.get("tipo") in novos for a in d.get("artefatos", [])), **cfg)
    find(S.valid_docs(), lambda d: any("subtipo" in a for a in d.get("artefatos", [])), **cfg)
