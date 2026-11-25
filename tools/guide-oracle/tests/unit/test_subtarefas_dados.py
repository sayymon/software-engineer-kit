"""Subtarefas, artefatos, variáveis, entradas e saídas, e técnicas condicionais.

Cada código novo tem um exemplo válido (o documento-base sem issues) e um inválido. Erros têm `nivel == "erro"`;
avisos (`validate(..., avisos=True)`) têm `nivel == "aviso"` e só aparecem onde o autor declarou os campos.
"""

from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

import pytest

from guia_decisao.cli import main
from guia_decisao.loader import dump_yaml, load_yaml
from guia_decisao.rastreio import descrever_condicao, rastrear_dados
from guia_decisao.validator import Issue, validate
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA

PACOTE = Path(__file__).resolve().parents[2]
SCHEMA_PATH = GUIA_SCHEMA
SCHEMA = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
YAML_REAL = GUIA_DIR

T1 = "inc_cls_t1"
ST1 = "inc_cls_t1_st1"
ST2 = "inc_cls_t1_st2"


def _decisor() -> dict[str, Any]:
    return {
        "criterios": ["diferenciacao", "tempo_ate_valor", "custo_total", "dependencia_fornecedor", "risco"],
        "escala": {"min": 1, "max": 5},
        "opcoes": ["construir", "comprar", "assinar"],
        "ordem_desempate": ["assinar", "comprar", "construir"],
        "pesos": {"o": {c: 0.2 for c in ["diferenciacao", "tempo_ate_valor", "custo_total", "dependencia_fornecedor", "risco"]}},
    }


def _base() -> dict[str, Any]:
    """Uma raia `inc_cls` com a tarefa `inc_cls_t1` do exemplo do design (sem nenhum erro ou aviso)."""
    return {
        "versao": 1,
        "demandas": [{"id": "inc", "nome": "Incidente"}],
        "raias": [{
            "id": "inc_cls", "nome": "Classificar", "demanda": "inc", "responsabilidade": "classificar a severidade",
            "cor": "#1f77b4", "orquestradora": True, "entradas": ["alerta_triado", "impacto_confirmado", "janela_critica"],
        }],
        "requisitos": [{"id": "r1", "nome": "R"}],
        "decisoes": [
            {"id": "inc_cls_s0", "raia": "inc_cls", "tipo": "inicio", "condicao": "",
             "proximo": [{"para": T1, "condicao": ""}],
             "estado": {"severidade": "sev3", "tentativas": 0, "dono": "ana"}},
            {"id": T1, "raia": "inc_cls", "tipo": "tarefa", "rotulo": "Classificar a severidade", "condicao": "",
             "proximo": [{"para": "inc_cls_e2", "condicao": ""}], "estado": {"tem_slo": "sim"},
             "entradas": ["alerta_triado", "impacto_confirmado", "janela_critica"],
             "saidas": ["severidade_atual"],
             "subtarefas": [
                 {"id": ST1, "rotulo": "Estimar o raio de impacto", "responsavel": "pessoa",
                  "entradas": ["alerta_triado"], "saidas": ["raio_de_impacto"],
                  "tecnicas": [
                      {"tecnica": "tec_blast_radius", "uso": "obrigatoria"},
                      {"tecnica": "tec_error_budget", "uso": "condicional",
                       "quando": {"todos": [{"var": "tem_slo", "igual": "sim"}]},
                       "porque": "só faz sentido quando o serviço tem SLO definido"},
                  ]},
                 {"id": ST2, "rotulo": "Aplicar a matriz de severidade",
                  "entradas": ["raio_de_impacto", "janela_critica"], "saidas": ["severidade_atual"]},
             ]},
            {"id": "inc_cls_e2", "raia": "inc_cls", "tipo": "fim", "retorno": "ok", "condicao": "", "proximo": [],
             "estado": {}, "entradas": ["severidade_atual"], "saidas": ["severidade_atual"]},
        ],
        "celulas": [{"demanda": "inc", "requisito": "r1"}],
        "playbooks": [{"id": "pb", "resumo": "x"}],
        "abordagens": [{"id": "ab", "nome": "A"}],
        "tecnicas": [{"id": "tec_blast_radius", "nome": "Blast radius"}, {"id": "tec_error_budget", "nome": "Error budget"}],
        "padroes": [{"id": "pa", "nome": "P"}],
        "estrategias": [{"id": "es", "nome": "E"}],
        "categorias_ferramenta": [
            {"id": "cf", "nome": "C", "custo": "baixo", "beneficio": "alto", "dependencia_fornecedor": "medio"}
        ],
        "fontes": [{"id": "f1", "tipo": "livro", "titulo": "L", "link": "https://x.com", "status_revisao": "pendente",
                    "proxima_revisao": "2026-07-01"}],
        "decisor_construir_comprar_assinar": _decisor(),
        "artefatos": [
            {"id": "alerta_triado", "nome": "Alerta triado", "tipo": "sinal"},
            {"id": "impacto_confirmado", "nome": "Impacto confirmado", "tipo": "dado"},
            {"id": "raio_de_impacto", "nome": "Raio de impacto", "tipo": "dado"},
            {"id": "janela_critica", "nome": "Janela crítica", "tipo": "dado"},
            {"id": "severidade_atual", "nome": "Severidade atual", "tipo": "decisao"},
        ],
        "variaveis": [
            {"id": "tem_slo", "nome": "Tem SLO", "tipo": "booleano", "inicial": "nao"},
            {"id": "severidade", "nome": "Severidade", "tipo": "enum", "valores": ["sev1", "sev2", "sev3"]},
            {"id": "tentativas", "nome": "Tentativas", "tipo": "inteiro", "inicial": 0},
            {"id": "dono", "nome": "Dono", "tipo": "texto"},
        ],
    }


def _no(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(d for d in doc["decisoes"] if d["id"] == id_)


def _sub(doc: dict[str, Any], id_: str) -> dict[str, Any]:
    return next(s for d in doc["decisoes"] for s in d.get("subtarefas", []) if s["id"] == id_)


def _uso_condicional(doc: dict[str, Any]) -> dict[str, Any]:
    return _sub(doc, ST1)["tecnicas"][1]


def _termo(doc: dict[str, Any]) -> dict[str, Any]:
    return _uso_condicional(doc)["quando"]["todos"][0]


def _erros(doc: dict[str, Any]) -> list[Issue]:
    return validate(doc, SCHEMA)


def _todos(doc: dict[str, Any]) -> list[Issue]:
    return validate(doc, SCHEMA, avisos=True)


def _codigos(issues: list[Issue], nivel: str | None = None) -> list[str]:
    return [i.code for i in issues if nivel is None or i.nivel == nivel]


# ------------------------------------------------------------------ base e Issue


def test_base_sem_erros_nem_avisos() -> None:
    assert _todos(_base()) == []


def test_issue_tem_nivel_erro_por_padrao() -> None:
    assert Issue("X", "p", "m").nivel == "erro"


def test_colecoes_novas_sao_opcionais_e_aceitas_vazias() -> None:
    doc = _base()
    for no in doc["decisoes"]:
        for campo in ("entradas", "saidas", "subtarefas"):
            no.pop(campo, None)
    doc["raias"][0].pop("entradas")
    sem = {k: v for k, v in doc.items() if k not in ("artefatos", "variaveis")}
    vazias = {**sem, "artefatos": [], "variaveis": []}
    assert _todos(sem) == []
    assert _todos(vazias) == []


# Avisos novos que o YAML real ainda pode ter enquanto o conteúdo é preenchido. A frente de conteúdo esvazia este conjunto.
AVISOS_EM_ADOCAO: set[str] = set()  # guia real sem avisos: nenhum código tolerado


def test_yaml_real_continua_valido_sem_avisos() -> None:
    issues = validate(load_yaml(YAML_REAL), SCHEMA, avisos=True, completude=True)
    assert [i for i in issues if i.code not in AVISOS_EM_ADOCAO] == []


def test_avisos_so_aparecem_quando_pedidos() -> None:
    doc = _base()
    _sub(doc, ST2)["entradas"].append("severidade_atual")  # ainda não produzida por uma subtarefa anterior
    assert _erros(doc) == []
    assert _codigos(_todos(doc), "aviso") == ["ENTRADA_SEM_PRODUTOR"]


def test_exemplo_do_design_sem_janela_na_tarefa_avisa_na_subtarefa() -> None:
    doc = _base()
    _no(doc, T1)["entradas"] = ["alerta_triado", "impacto_confirmado"]
    issues = _todos(doc)
    assert _erros(doc) == []
    assert [(i.code, i.nivel, i.item_id, i.path) for i in issues] == [
        ("ENTRADA_SEM_PRODUTOR", "aviso", ST2, "decisoes[1].subtarefas[1].entradas[1]")
    ]


# ------------------------------------------------------------------ schema


def test_condicao_com_todos_e_algum_juntos_e_erro_de_schema() -> None:
    doc = _base()
    _uso_condicional(doc)["quando"]["algum"] = [{"var": "tem_slo", "igual": "sim"}]
    assert "SCHEMA" in _codigos(_erros(doc))


def test_condicao_sem_chave_e_erro_de_schema() -> None:
    doc = _base()
    _uso_condicional(doc)["quando"] = {}
    assert "SCHEMA" in _codigos(_erros(doc))


def test_uso_fora_do_enum_e_erro_de_schema() -> None:
    doc = _base()
    _uso_condicional(doc)["uso"] = "talvez"
    assert "SCHEMA" in _codigos(_erros(doc))


def test_campos_desconhecidos_sao_rejeitados() -> None:
    doc = _base()
    _sub(doc, ST1)["extra"] = 1
    doc["artefatos"][0]["extra"] = 1
    doc["variaveis"][0]["extra"] = 1
    assert _codigos(_erros(doc)).count("SCHEMA") >= 3


def test_responsavel_aceita_agente_pessoa_ambos() -> None:
    for valor in ("agente", "pessoa", "ambos"):
        doc = _base()
        _sub(doc, ST1)["responsavel"] = valor
        assert _todos(doc) == []
    doc = _base()
    _sub(doc, ST1)["responsavel"] = "robo"
    assert "SCHEMA" in _codigos(_erros(doc))


def test_artefato_tipo_e_variavel_tipo_sao_enums() -> None:
    doc = _base()
    doc["artefatos"][0]["tipo"] = "coisa"
    doc["variaveis"][0]["tipo"] = "decimal"
    assert _codigos(_erros(doc)).count("SCHEMA") >= 2


# ------------------------------------------------------------------ REF_QUEBRADA


def _raia_entradas(d: dict[str, Any]) -> list[str]:
    return d["raias"][0]["entradas"]


@pytest.mark.parametrize(
    ("alvo", "path", "item_id"),
    [
        (lambda d: _raia_entradas(d), "raias[0].entradas[3]", "inc_cls"),
        (lambda d: _no(d, T1)["entradas"], "decisoes[1].entradas[3]", T1),
        (lambda d: _no(d, T1)["saidas"], "decisoes[1].saidas[1]", T1),
        (lambda d: _no(d, "inc_cls_e2")["saidas"], "decisoes[2].saidas[1]", "inc_cls_e2"),
        (lambda d: _sub(d, ST1)["entradas"], "decisoes[1].subtarefas[0].entradas[1]", ST1),
        (lambda d: _sub(d, ST2)["saidas"], "decisoes[1].subtarefas[1].saidas[1]", ST2),
    ],
)
def test_ref_quebrada_em_entradas_e_saidas(alvo: Any, path: str, item_id: str) -> None:
    doc = _base()
    alvo(doc).append("nao_existe")
    achados = [i for i in _erros(doc) if i.code == "REF_QUEBRADA"]
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [(path, item_id, "erro")]


def test_ref_quebrada_em_entrada_pode_ser_artefato_ou_variavel() -> None:
    doc = _base()
    _sub(doc, ST1)["entradas"] += ["tem_slo"]
    assert _erros(doc) == []


def test_ref_quebrada_da_tecnica_do_uso() -> None:
    doc = _base()
    _sub(doc, ST1)["tecnicas"][0]["tecnica"] = "tec_fantasma"
    achados = [i for i in _erros(doc) if i.code == "REF_QUEBRADA"]
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1].subtarefas[0].tecnicas[0].tecnica", ST1)]


def test_ref_quebrada_da_tecnica_no_no() -> None:
    doc = _base()
    _no(doc, T1)["tecnicas"] = [{"tecnica": "tec_fantasma", "uso": "opcional"}]
    achados = [i for i in _erros(doc) if i.code == "REF_QUEBRADA"]
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1].tecnicas[0].tecnica", T1)]


def test_ref_quebrada_da_variavel_da_condicao() -> None:
    doc = _base()
    _termo(doc)["var"] = "var_fantasma"
    achados = [i for i in _erros(doc) if i.code == "REF_QUEBRADA"]
    assert [(i.path, i.item_id) for i in achados] == [
        ("decisoes[1].subtarefas[0].tecnicas[1].quando.todos[0].var", ST1)
    ]
    assert "CONDICAO_INVALIDA" not in _codigos(_erros(doc))


def test_entrada_sem_catalogo_declarado_e_ref_quebrada() -> None:
    doc = _base()
    del doc["artefatos"], doc["variaveis"]
    assert "REF_QUEBRADA" in _codigos(_erros(doc))


# ------------------------------------------------------------------ ID_DUPLICADO


def test_id_duplicado_em_artefatos() -> None:
    doc = _base()
    doc["artefatos"].append(copy.deepcopy(doc["artefatos"][0]))
    achados = [i for i in _erros(doc) if i.code == "ID_DUPLICADO"]
    assert [i.path for i in achados] == ["artefatos[5].id"]


def test_id_duplicado_em_variaveis() -> None:
    doc = _base()
    doc["variaveis"].append(copy.deepcopy(doc["variaveis"][0]))
    assert [i.path for i in _erros(doc) if i.code == "ID_DUPLICADO"] == ["variaveis[4].id"]


def test_id_duplicado_entre_artefato_e_variavel() -> None:
    doc = _base()
    doc["variaveis"][0]["id"] = "alerta_triado"
    assert [i.path for i in _erros(doc) if i.code == "ID_DUPLICADO"] == ["variaveis[0].id"]


def test_id_duplicado_em_subtarefas() -> None:
    doc = _base()
    _sub(doc, ST2)["id"] = ST1
    achados = [i for i in _erros(doc) if i.code == "ID_DUPLICADO"]
    assert [i.path for i in achados] == ["decisoes[1].subtarefas[1].id"]


def test_id_de_subtarefa_repetido_em_outra_tarefa_e_duplicado_global() -> None:
    doc = _base()
    outra = copy.deepcopy(_no(doc, T1))
    outra["id"] = "inc_cls_t3"
    outra["proximo"] = [{"para": "inc_cls_e2", "condicao": ""}]
    doc["decisoes"].append(outra)
    assert "ID_DUPLICADO" in _codigos(_erros(doc))


def test_id_de_subtarefa_igual_ao_de_no_e_duplicado() -> None:
    doc = _base()
    _sub(doc, ST2)["id"] = "inc_cls_e2"
    assert "ID_DUPLICADO" in _codigos(_erros(doc))


# ------------------------------------------------------------------ subtarefas


@pytest.mark.parametrize("novo", ["inc_cls_t1_s1", "inc_cls_t1_st0", "inc_cls_t1_st", "outro_st1", "inc_cls_t1_st01", "inc_cls_t1_st1_x"])
def test_subtarefa_id_padrao_invalido(novo: str) -> None:
    doc = _base()
    _sub(doc, ST2)["id"] = novo
    achados = [i for i in _erros(doc) if i.code == "SUBTAREFA_ID_PADRAO"]
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[1].subtarefas[1].id", novo)]


@pytest.mark.parametrize("n", [2, 9, 10, 123])
def test_subtarefa_id_padrao_valido(n: int) -> None:
    doc = _base()
    _sub(doc, ST2)["id"] = f"{T1}_st{n}"
    assert _erros(doc) == []


def test_subtarefa_em_no_que_nao_e_tarefa() -> None:
    doc = _base()
    fim = _no(doc, "inc_cls_e2")
    fim["subtarefas"] = [{"id": "inc_cls_e2_st1", "rotulo": "x"}]
    achados = [i for i in _erros(doc) if i.code == "SUBTAREFA_EM_NAO_TAREFA"]
    assert [(i.path, i.item_id) for i in achados] == [("decisoes[2].subtarefas", "inc_cls_e2")]


def test_ordem_das_subtarefas_e_a_da_lista() -> None:
    doc = _base()
    assert [s["id"] for s in _no(doc, T1)["subtarefas"]] == [ST1, ST2]


# ------------------------------------------------------------------ técnica condicional


def test_condicional_exige_quando() -> None:
    doc = _base()
    del _uso_condicional(doc)["quando"]
    achados = [i for i in _erros(doc) if i.code == "CONDICAO_AUSENTE"]
    assert [(i.path, i.item_id, i.nivel) for i in achados] == [("decisoes[1].subtarefas[0].tecnicas[1]", ST1, "erro")]


@pytest.mark.parametrize("uso", ["obrigatoria", "recomendada", "opcional"])
def test_outros_usos_aceitam_quando_opcional(uso: str) -> None:
    doc = _base()
    _uso_condicional(doc)["uso"] = uso
    assert _todos(doc) == []
    del _uso_condicional(doc)["quando"]
    assert _todos(doc) == []


def test_algum_e_aceito() -> None:
    doc = _base()
    _uso_condicional(doc)["quando"] = {"algum": [{"var": "tem_slo", "igual": "sim"}, {"var": "tentativas", "maior_que": 2}]}
    assert _todos(doc) == []


# ------------------------------------------------------------------ CONDICAO_INVALIDA


def _termo_com(var: str, **ops: Any) -> dict[str, Any]:
    return {"var": var, **ops}


@pytest.mark.parametrize(
    "termo",
    [
        _termo_com("tem_slo"),
        _termo_com("tem_slo", igual="sim", diferente="nao"),
        _termo_com("tem_slo", igual="talvez"),
        _termo_com("tem_slo", em=["sim", "talvez"]),
        _termo_com("tem_slo", igual=True),
        _termo_com("tem_slo", maior_que=1),
        _termo_com("severidade", igual="sev9"),
        _termo_com("severidade", diferente="sev0"),
        _termo_com("severidade", em=["sev1", "sev9"]),
        _termo_com("severidade", menor_que=2),
        _termo_com("tentativas", igual="muitas"),
        _termo_com("tentativas", igual=True),
        _termo_com("tentativas", maior_que="3"),
        _termo_com("tentativas", em=[1, "2"]),
        _termo_com("dono", igual=3),
        _termo_com("dono", maior_ou_igual=1),
        _termo_com("dono", em=[]),
    ],
)
def test_condicao_invalida(termo: dict[str, Any]) -> None:
    doc = _base()
    _uso_condicional(doc)["quando"] = {"todos": [termo]}
    achados = [i for i in _erros(doc) if i.code == "CONDICAO_INVALIDA"]
    assert achados, termo
    assert all(i.item_id == ST1 and i.nivel == "erro" for i in achados)
    assert all(i.path.startswith("decisoes[1].subtarefas[0].tecnicas[1].quando.todos[0]") for i in achados)


@pytest.mark.parametrize(
    "termo",
    [
        _termo_com("tem_slo", igual="nao"),
        _termo_com("tem_slo", diferente="sim"),
        _termo_com("tem_slo", em=["sim", "nao"]),
        _termo_com("severidade", igual="sev2"),
        _termo_com("severidade", em=["sev1", "sev3"]),
        _termo_com("tentativas", maior_que=3),
        _termo_com("tentativas", maior_ou_igual=0),
        _termo_com("tentativas", menor_que=10),
        _termo_com("tentativas", menor_ou_igual=10),
        _termo_com("tentativas", igual=0),
        _termo_com("tentativas", em=[1, 2, 3]),
        _termo_com("dono", igual="qualquer coisa"),
        _termo_com("dono", em=["a", "b"]),
    ],
)
def test_condicao_valida(termo: dict[str, Any]) -> None:
    doc = _base()
    _uso_condicional(doc)["quando"] = {"todos": [termo]}
    assert _todos(doc) == [], termo


def test_condicao_valida_dentro_de_uso_nao_condicional_tambem_e_checada() -> None:
    doc = _base()
    _no(doc, T1)["tecnicas"] = [
        {"tecnica": "tec_blast_radius", "uso": "recomendada", "quando": {"todos": [_termo_com("severidade", igual="sev9")]}}
    ]
    achados = [i for i in _erros(doc) if i.code == "CONDICAO_INVALIDA"]
    assert [i.path for i in achados] == ["decisoes[1].tecnicas[0].quando.todos[0].igual"]


def test_variavel_enum_sem_valores() -> None:
    doc = _base()
    del doc["variaveis"][1]["valores"]
    achados = [i for i in _erros(doc) if i.code == "VARIAVEL_ENUM_SEM_VALORES"]
    assert [(i.path, i.item_id) for i in achados] == [("variaveis[1].valores", "severidade")]
    doc["variaveis"][1]["valores"] = []
    assert "VARIAVEL_ENUM_SEM_VALORES" in _codigos(_erros(doc))


# ------------------------------------------------------------------ avisos


def test_var_nao_declarada() -> None:
    doc = _base()
    _no(doc, T1)["estado"]["variavel_solta"] = 1
    issues = _todos(doc)
    assert _erros(doc) == []
    assert [(i.code, i.nivel, i.path, i.item_id) for i in issues] == [
        ("VAR_NAO_DECLARADA", "aviso", "decisoes[1].estado.variavel_solta", T1)
    ]


@pytest.mark.parametrize("estado_do_catalogo", ["ausente", "vazio"])
def test_var_nao_declarada_e_ignorada_sem_catalogo(estado_do_catalogo: str) -> None:
    doc = _base()
    for no in doc["decisoes"]:
        no.pop("entradas", None)
        no.pop("saidas", None)
        no.pop("subtarefas", None)
    doc["raias"][0].pop("entradas")
    _no(doc, T1)["estado"]["variavel_solta"] = 1
    doc["artefatos"] = []  # sem referências, os artefatos soltos avisariam ITEM_SEM_USO
    if estado_do_catalogo == "ausente":
        del doc["variaveis"]
    else:
        doc["variaveis"] = []
    assert _todos(doc) == []


def test_entrada_sem_produtor_no_no() -> None:
    doc = _base()
    _no(doc, "inc_cls_e2")["entradas"] = ["severidade_atual", "raio_de_impacto"]
    issues = [i for i in _todos(doc) if i.nivel == "aviso"]
    assert [(i.code, i.path, i.item_id) for i in issues] == [
        ("ENTRADA_SEM_PRODUTOR", "decisoes[2].entradas[1]", "inc_cls_e2")
    ]


def test_entrada_vinda_de_no_que_nao_antecede_gera_aviso() -> None:
    doc = _base()
    _no(doc, T1)["entradas"] = ["alerta_triado", "severidade_atual"]  # produzida só por e2, que vem depois
    codigos = [(i.code, i.path) for i in _todos(doc) if i.nivel == "aviso"]
    assert ("ENTRADA_SEM_PRODUTOR", "decisoes[1].entradas[1]") in codigos


def test_entrada_produzida_por_no_anterior_nao_avisa() -> None:
    doc = _base()
    # o `inicio` produz `impacto_confirmado` e `t1` o consome; a raia já não o recebe de fora.
    doc["decisoes"][0]["saidas"] = ["impacto_confirmado"]
    _no(doc, T1)["entradas"] = ["impacto_confirmado"]
    doc["raias"][0]["entradas"] = ["alerta_triado", "janela_critica"]
    assert [i for i in _todos(doc) if i.code == "ENTRADA_SEM_PRODUTOR" and i.item_id == T1] == []


def _doc_com_chamada(saidas_do_retorno: list[str]) -> dict[str, Any]:
    """Orquestradora `inc_orq` chama `inc_cls` e consome o que o retorno `ok` entrega."""
    doc = _base()
    doc["raias"][0]["orquestradora"] = False
    doc["raias"].append({"id": "inc_orq", "nome": "Orquestrar", "demanda": "inc", "responsabilidade": "orquestrar",
                         "cor": "#ff7f0e", "orquestradora": True})
    _no(doc, "inc_cls_e2")["saidas"] = saidas_do_retorno
    doc["decisoes"] += [
        {"id": "inc_orq_s0", "raia": "inc_orq", "tipo": "inicio", "condicao": "",
         "proximo": [{"para": "inc_orq_c1", "condicao": ""}], "estado": {}},
        {"id": "inc_orq_c1", "raia": "inc_orq", "tipo": "chamada", "raia_chamada": "inc_cls", "condicao": "",
         "proximo": [{"para": "inc_orq_t2", "condicao": "ok"}], "estado": {}},
        {"id": "inc_orq_t2", "raia": "inc_orq", "tipo": "tarefa", "condicao": "",
         "proximo": [{"para": "inc_orq_e3", "condicao": ""}], "estado": {}, "entradas": ["severidade_atual"],
         "saidas": ["severidade_atual"]},
        {"id": "inc_orq_e3", "raia": "inc_orq", "tipo": "fim", "retorno": "pronto", "condicao": "", "proximo": [], "estado": {}},
    ]
    return doc


def test_retorno_da_raia_chamada_e_produtor_da_chamada() -> None:
    doc = _doc_com_chamada(["severidade_atual"])
    assert _todos(doc) == []


def test_sem_saida_no_retorno_a_entrada_apos_a_chamada_avisa() -> None:
    doc = _doc_com_chamada([])
    avisos = [(i.code, i.path, i.item_id) for i in _todos(doc) if i.nivel == "aviso"]
    assert avisos == [("ENTRADA_SEM_PRODUTOR", "decisoes[5].entradas[0]", "inc_orq_t2")]


def test_entrada_da_subtarefa_sem_produtor() -> None:
    doc = _base()
    _sub(doc, ST1)["entradas"] = ["alerta_triado", "raio_de_impacto"]  # raio vem só de ST1 (ela mesma) e ST2 vem depois
    avisos = [(i.code, i.path, i.item_id) for i in _todos(doc) if i.nivel == "aviso"]
    assert avisos == [("ENTRADA_SEM_PRODUTOR", "decisoes[1].subtarefas[0].entradas[1]", ST1)]


def test_subtarefa_consome_saida_de_subtarefa_anterior_sem_aviso() -> None:
    assert [i for i in _todos(_base()) if i.item_id == ST2] == []


def test_saida_nao_entregue() -> None:
    doc = _base()
    _no(doc, T1)["saidas"] = ["severidade_atual", "raio_de_impacto", "impacto_confirmado"]
    avisos = [(i.code, i.path, i.item_id) for i in _todos(doc) if i.nivel == "aviso"]
    assert avisos == [("SAIDA_NAO_ENTREGUE", "decisoes[1].saidas[2]", T1)]


def test_tarefa_sem_subtarefas_nao_gera_saida_nao_entregue() -> None:
    doc = _base()
    del _no(doc, T1)["subtarefas"]
    assert [i for i in _todos(doc) if i.code == "SAIDA_NAO_ENTREGUE"] == []


# ------------------------------------------------------------ ITEM_SEM_USO


def test_item_sem_uso_avisa_artefato_e_variavel_soltos() -> None:
    doc = _base()
    doc["artefatos"].append({"id": "art_solto", "nome": "Solto", "tipo": "documento"})
    doc["variaveis"].append({"id": "var_solta", "nome": "Solta", "tipo": "texto"})
    avisos = [(i.code, i.path, i.item_id, i.nivel) for i in _todos(doc) if i.code == "ITEM_SEM_USO"]
    assert avisos == [
        ("ITEM_SEM_USO", f"artefatos[{len(doc['artefatos']) - 1}]", "art_solto", "aviso"),
        ("ITEM_SEM_USO", f"variaveis[{len(doc['variaveis']) - 1}]", "var_solta", "aviso"),
    ]
    assert _erros(doc) == []  # é só aviso


@pytest.mark.parametrize("onde", ["entrada_de_no", "saida_de_subtarefa", "entrada_de_raia", "estado", "condicao"])
def test_item_usado_em_qualquer_lugar_nao_gera_item_sem_uso(onde: str) -> None:
    doc = _base()
    doc["artefatos"].append({"id": "art_novo", "nome": "Novo", "tipo": "documento"})
    doc["variaveis"].append({"id": "var_nova", "nome": "Nova", "tipo": "booleano"})
    if onde == "entrada_de_no":
        _no(doc, "inc_cls_e2")["entradas"] = ["severidade_atual"]
        _no(doc, "inc_cls_s0")["entradas"] = ["art_novo", "var_nova"]
        doc["raias"][0]["entradas"] += ["art_novo", "var_nova"]
    elif onde == "saida_de_subtarefa":
        _sub(doc, ST2)["saidas"] += ["art_novo", "var_nova"]
    elif onde == "entrada_de_raia":
        doc["raias"][0]["entradas"] += ["art_novo", "var_nova"]
    elif onde == "estado":
        _no(doc, "inc_cls_e2")["estado"] = {"var_nova": "sim"}
        doc["raias"][0]["entradas"].append("art_novo")
    else:
        _uso_condicional(doc)["quando"] = {"algum": [{"var": "var_nova", "igual": "sim"}]}
        doc["raias"][0]["entradas"].append("art_novo")
    assert [i for i in _todos(doc) if i.code == "ITEM_SEM_USO"] == []


def test_yaml_real_sem_item_sem_uso() -> None:
    real = load_yaml(YAML_REAL)
    assert [i for i in validate(real, SCHEMA, avisos=True) if i.code == "ITEM_SEM_USO"] == []


# ------------------------------------------------------------------ rastreio


def test_rastrear_dados_do_exemplo() -> None:
    r = rastrear_dados(_base())
    assert list(r) == ["alerta_triado", "dono", "impacto_confirmado", "janela_critica", "raio_de_impacto",
                       "severidade", "severidade_atual", "tem_slo", "tentativas"]
    assert r["raio_de_impacto"] == {"tipo": "artefato", "nome": "Raio de impacto", "produzido_por": [ST1],
                                    "consumido_por": [ST2]}
    assert r["severidade_atual"]["produzido_por"] == ["inc_cls_e2", T1, ST2]
    assert r["severidade_atual"]["consumido_por"] == ["inc_cls_e2"]
    assert r["alerta_triado"]["consumido_por"] == ["inc_cls", T1, ST1]
    assert r["tem_slo"] == {"tipo": "variavel", "nome": "Tem SLO", "produzido_por": [], "consumido_por": []}


def test_rastrear_dados_sem_catalogo_e_vazio() -> None:
    doc = _base()
    del doc["artefatos"], doc["variaveis"]
    assert rastrear_dados(doc) == {}


def test_rastrear_dados_nao_altera_o_documento() -> None:
    doc = _base()
    antes = copy.deepcopy(doc)
    rastrear_dados(doc)
    assert doc == antes


def test_descrever_condicao_exemplo() -> None:
    cond = {"todos": [{"var": "tem_slo", "igual": "sim"}, {"var": "severidade", "em": ["sev1", "sev2"]}]}
    assert descrever_condicao(cond) == "quando tem_slo = sim e severidade em [sev1, sev2]"


def test_descrever_condicao_algum_e_operadores() -> None:
    cond = {"algum": [{"var": "a", "diferente": "x"}, {"var": "n", "maior_que": 3}, {"var": "n", "maior_ou_igual": 1},
                      {"var": "m", "menor_que": 2}, {"var": "m", "menor_ou_igual": 0}]}
    assert descrever_condicao(cond) == "quando a != x ou n > 3 ou n >= 1 ou m < 2 ou m <= 0"


def test_descrever_condicao_sem_travessoes_e_deterministica() -> None:
    cond = _uso_condicional(_base())["quando"]
    texto = descrever_condicao(cond)
    assert texto == descrever_condicao(copy.deepcopy(cond)) == "quando tem_slo = sim"
    assert "\u2014" not in texto and "\u2013" not in texto and "-" not in texto


# ------------------------------------------------------------------ CLI


def _gravar(tmp_path: Path, doc: dict[str, Any]) -> Path:
    p = tmp_path / "guia.yaml"
    p.write_text(dump_yaml(doc), encoding="utf-8")
    return p


def _validar(p: Path, *extra: str) -> int:
    # documentos mínimos de teste são trechos de fluxo: a completude do guia não se aplica a eles
    return main(["validar", "--yaml", str(p), "--schema", str(SCHEMA_PATH), "--parcial", *extra])


def _doc_so_com_aviso() -> dict[str, Any]:
    doc = _base()
    _no(doc, T1)["estado"]["variavel_solta"] = 1
    return doc


def test_cli_documento_limpo_sai_com_0(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    assert _validar(_gravar(tmp_path, _base()), "--estrito") == 0
    assert "válido" in capsys.readouterr().out


def test_cli_so_aviso_sai_com_0_e_mostra_o_aviso(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    assert _validar(_gravar(tmp_path, _doc_so_com_aviso())) == 0
    captura = capsys.readouterr()
    assert "aviso VAR_NAO_DECLARADA" in captura.out
    assert "0 erro(s) e 1 aviso(s)" in captura.err


def test_cli_estrito_transforma_aviso_em_falha(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    assert _validar(_gravar(tmp_path, _doc_so_com_aviso()), "--estrito") == 1
    assert "aviso VAR_NAO_DECLARADA" in capsys.readouterr().out


def test_cli_sem_avisos_oculta_e_sai_com_0(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    assert _validar(_gravar(tmp_path, _doc_so_com_aviso()), "--sem-avisos") == 0
    captura = capsys.readouterr()
    assert "VAR_NAO_DECLARADA" not in captura.out + captura.err


def test_cli_erro_sai_com_1_com_ou_sem_estrito(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    doc = _doc_so_com_aviso()
    _sub(doc, ST1)["saidas"].append("nao_existe")
    p = _gravar(tmp_path, doc)
    assert _validar(p) == 1
    captura = capsys.readouterr()
    assert "REF_QUEBRADA" in captura.out
    assert "1 erro(s) e 1 aviso(s)" in captura.err
    assert _validar(p, "--estrito") == 1
    capsys.readouterr()
    assert _validar(p, "--sem-avisos") == 1
    captura = capsys.readouterr()
    assert "REF_QUEBRADA" in captura.out
    assert "VAR_NAO_DECLARADA" not in captura.out


def test_cli_yaml_real_sai_com_0_sem_avisos(capsys: pytest.CaptureFixture[str]) -> None:
    codigo = main(["validar", "--estrito"])
    saida = capsys.readouterr()
    avisos = [linha for linha in saida.out.splitlines() if ": aviso " in linha]
    assert all(any(f"aviso {c} " in linha for c in AVISOS_EM_ADOCAO) for linha in avisos)
    assert codigo == (1 if avisos else 0)
    assert main(["validar"]) == 0
