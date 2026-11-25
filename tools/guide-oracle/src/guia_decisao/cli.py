"""CLI `engenharia`: orquestra os comandos e converte erros em códigos de saída.

Códigos de saída:
    0  sucesso
    1  falha de validação (há Issues)
    2  erro de entrada ou arquivo (YamlLoadError, KitDataError, arquivo ausente)
    3  dependência ausente (reservado, ex.: mermaid-cli)

Para adicionar um subcomando, escreva `_registrar_<nome>(sub)` que cria o parser
e chama `set_defaults(func=_cmd_<nome>)`, e inclua-o em `_REGISTRADORES`.
"""

from __future__ import annotations

import argparse
import json
import sys
from collections.abc import Callable, Sequence
from pathlib import Path
from typing import Any

from guia_decisao.loader import YamlLoadError, load_yaml
from guia_decisao.html_gen import MermaidAusenteError, gerar_html
from guia_decisao.mermaid_gen import GeracaoError, gerar_todos
from guia_decisao.paths import GUIA_DIR, GUIA_SCHEMA, PathGuardError, ensure_inside, find_worktree_root, safe_write_text
from guia_decisao.validator import validate
from guia_decisao.decisor import DecisorError, decidir

EXIT_OK = 0
EXIT_VALIDACAO = 1
EXIT_ENTRADA = 2
EXIT_DEPENDENCIA = 3

_PASTA_PACOTE = Path("tools") / "guide-oracle"


class InputError(Exception):
    """Entrada inválida ou arquivo ausente. Mapeia para código 2."""


# ----------------------------------------------------------- caminhos padrão


def _raiz() -> Path:
    try:
        return find_worktree_root()
    except PathGuardError as exc:
        raise InputError(str(exc)) from exc


def _caminho(opcao: Path | None, padrao: Path) -> Path:
    if opcao is not None:
        return opcao
    return padrao if padrao.is_absolute() else _raiz() / padrao


def _exigir_arquivo(path: Path, rotulo: str) -> Path:
    # o guia pode ser uma pasta (comum.yaml e demandas/*.yaml) ou um único arquivo
    if not (path.is_file() or (path.is_dir() and (path / "comum.yaml").is_file())):
        raise InputError(f"{rotulo} não encontrado: {path}")
    return path


def _opcao_yaml(p: argparse.ArgumentParser) -> None:
    p.add_argument("--yaml", type=Path, help="guia: pasta com comum.yaml e demandas/*.yaml, ou um único YAML (padrão: content/guide do kit, ou a variável GUIA_DIR)")


def _opcao_schema(p: argparse.ArgumentParser) -> None:
    p.add_argument(
        "--schema",
        type=Path,
        help="JSON Schema (padrão: schema/flows.schema.json do kit, ou a variável GUIA_SCHEMA)",
    )


def _yaml_padrao() -> Path:
    return GUIA_DIR


def _schema_padrao() -> Path:
    return GUIA_SCHEMA


# ------------------------------------------------------------------- validar


def _registrar_validar(sub: Any) -> None:
    p = sub.add_parser("validar", help="valida o YAML_Fonte contra o Schema e as regras de integridade")
    _opcao_yaml(p)
    _opcao_schema(p)
    grupo = p.add_mutually_exclusive_group()
    grupo.add_argument("--estrito", action="store_true", help="avisos também fazem a validação falhar (código 1)")
    grupo.add_argument("--sem-avisos", dest="sem_avisos", action="store_true", help="não calcula nem imprime avisos")
    p.add_argument("--parcial", action="store_true",
                   help="documento parcial (trecho de fluxo): não checa a completude (LACUNA_DE_DADOS, COMUNICACAO_SEM_DESTINATARIO)")
    p.set_defaults(func=_cmd_validar)


def _cmd_validar(args: argparse.Namespace) -> int:
    """Erros falham (código 1). Avisos só orientam, salvo com `--estrito`. `--sem-avisos` os omite."""
    yaml_path = _exigir_arquivo(_caminho(args.yaml, _yaml_padrao()), "YAML_Fonte")
    schema_path = _exigir_arquivo(_caminho(args.schema, _schema_padrao()), "Schema")
    doc = load_yaml(yaml_path)
    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError) as exc:
        raise InputError(f"{schema_path}: não foi possível ler o Schema: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise InputError(f"{schema_path}:{exc.lineno}:{exc.colno}: JSON inválido: {exc.msg}") from exc
    issues = validate(doc, schema, avisos=not args.sem_avisos, completude=not args.parcial)
    erros = [i for i in issues if i.nivel == "erro"]
    avisos = [i for i in issues if i.nivel != "erro"]
    for i in erros + avisos:
        prefixo = "aviso " if i.nivel != "erro" else ""
        print(f"{yaml_path}: {prefixo}{i.code} {i.path} id={i.item_id or '-'}: {i.message}")
    if erros or avisos:
        print(f"{len(erros)} erro(s) e {len(avisos)} aviso(s) encontrado(s).", file=sys.stderr)
    if erros or (avisos and args.estrito):
        return EXIT_VALIDACAO
    print(f"{yaml_path}: válido." if not avisos else f"{yaml_path}: válido, com {len(avisos)} aviso(s).")
    return EXIT_OK


# --------------------------------------------------------- gerar e prévia

_SAIDA_PADRAO = _PASTA_PACOTE / "saida"
_NOME_HTML = "guia.html"


def _opcao_saida(p: argparse.ArgumentParser) -> None:
    p.add_argument("--saida", type=Path, help="pasta de saída dentro da worktree (padrão: tools/guide-oracle/saida)")


def _carregar_validado(args: argparse.Namespace) -> dict[str, Any] | None:
    """Carrega e valida o YAML. Imprime os Issues e devolve None se o documento for inválido."""
    yaml_path = _exigir_arquivo(_caminho(args.yaml, _yaml_padrao()), "YAML_Fonte")
    schema_path = _exigir_arquivo(_caminho(args.schema, _schema_padrao()), "Schema")
    doc = load_yaml(yaml_path)
    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError) as exc:
        raise InputError(f"{schema_path}: não foi possível ler o Schema: {exc}") from exc
    except json.JSONDecodeError as exc:
        raise InputError(f"{schema_path}:{exc.lineno}:{exc.colno}: JSON inválido: {exc.msg}") from exc
    issues = validate(doc, schema)
    for i in issues:
        print(f"{yaml_path}: {i.code} {i.path} id={i.item_id or '-'}: {i.message}")
    if issues:
        print(f"{len(issues)} problema(s) encontrado(s); nada foi gerado.", file=sys.stderr)
        return None
    return doc


def _pasta_saida(opcao: Path | None) -> tuple[Path, Path]:
    """Devolve (raiz, pasta de saída já criada), recusando caminhos fora da worktree."""
    raiz = _raiz()
    try:
        pasta = ensure_inside(_caminho(opcao, _SAIDA_PADRAO), raiz)
        pasta.mkdir(parents=True, exist_ok=True)
    except PathGuardError as exc:
        raise InputError(str(exc)) from exc
    return raiz, pasta


def _gravar(pasta: Path, nome: str, texto: str, raiz: Path) -> Path:
    try:
        return safe_write_text(pasta / nome, texto, raiz)
    except PathGuardError as exc:
        raise InputError(str(exc)) from exc


def _registrar_gerar(sub: Any) -> None:
    p = sub.add_parser("gerar", help="gera artefatos a partir do YAML_Fonte validado")
    ger = p.add_subparsers(dest="alvo", required=True, metavar="alvo")

    pm = ger.add_parser("mermaid", help="gera os diagramas .mmd (visao, completo e uma por raia) de cada demanda")
    _opcao_yaml(pm)
    _opcao_schema(pm)
    _opcao_saida(pm)
    pm.add_argument("--demanda", help="gera só esta demanda (id)")
    pm.set_defaults(func=_cmd_gerar_mermaid)

    ph = ger.add_parser("html", help="gera a prévia HTML offline (saida/guia.html)")
    _opcao_yaml(ph)
    _opcao_schema(ph)
    _opcao_saida(ph)
    ph.set_defaults(func=_cmd_gerar_html, abrir=False)


def _cmd_gerar_mermaid(args: argparse.Namespace) -> int:
    doc = _carregar_validado(args)
    if doc is None:
        return EXIT_VALIDACAO
    diagramas = gerar_todos(doc)
    if args.demanda:
        diagramas = {n: d for n, d in diagramas.items() if n.startswith(f"{args.demanda}.")}
        if not diagramas:
            raise InputError(f"nenhum diagrama para a demanda: {args.demanda}")
    raiz, pasta = _pasta_saida(args.saida)
    for nome, diagrama in diagramas.items():
        print(_gravar(pasta, nome, diagrama.texto, raiz))
    print(f"{len(diagramas)} diagrama(s) gerado(s) em {pasta}")
    return EXIT_OK


def _cmd_gerar_html(args: argparse.Namespace) -> int:
    doc = _carregar_validado(args)
    if doc is None:
        return EXIT_VALIDACAO
    html = gerar_html(doc)
    raiz, pasta = _pasta_saida(args.saida)
    destino = _gravar(pasta, _NOME_HTML, html, raiz)
    print(f"Prévia gravada em {destino}")
    if args.abrir:
        import webbrowser

        webbrowser.open(destino.as_uri())
    return EXIT_OK


def _registrar_previa(sub: Any) -> None:
    p = sub.add_parser("previa", help="gera a prévia HTML offline e abre no navegador")
    _opcao_yaml(p)
    _opcao_schema(p)
    _opcao_saida(p)
    p.add_argument("--nao-abrir", dest="abrir", action="store_false", help="só gera o arquivo, sem abrir o navegador")
    p.set_defaults(func=_cmd_gerar_html, abrir=True)


# ------------------------------------------------------------------ decidir

def _registrar_decidir(sub: Any) -> None:
    p = sub.add_parser("decidir", help="decisor construir, comprar ou assinar: recomendação e justificativa auditável")
    _opcao_yaml(p)
    _opcao_schema(p)
    p.add_argument("--objetivo", required=True, help="objetivo do demandante (ex.: cumprir_prazo, diferenciar_produto, reduzir_custo, validar_hipotese)")
    p.add_argument("--notas", type=Path, required=True,
                   help="YAML com `notas: {opcao: {criterio: nota}}` e, opcional, `contexto` (custos por prazo, roi, custo_de_nao_fazer, orcamento)")
    p.set_defaults(func=_cmd_decidir)


def _cmd_decidir(args: argparse.Namespace) -> int:
    import yaml

    doc = _carregar_validado(args)
    if doc is None:
        return EXIT_VALIDACAO
    caminho = _exigir_arquivo(args.notas, "arquivo de notas")
    try:
        dados = yaml.safe_load(caminho.read_text(encoding="utf-8")) or {}
    except yaml.YAMLError as exc:
        raise InputError(f"{caminho}: YAML inválido: {exc}") from exc
    if not isinstance(dados, dict) or not isinstance(dados.get("notas"), dict):
        raise InputError(f"{caminho}: esperado um mapa com `notas: {{opcao: {{criterio: nota}}}}`")
    try:
        r = decidir(doc["decisor_construir_comprar_assinar"], args.objetivo, dados["notas"], dados.get("contexto"))
    except DecisorError as exc:
        raise InputError(str(exc)) from exc
    print(r.justificativa)
    return EXIT_OK


# ------------------------------------------------------------------ registro

_REGISTRADORES: tuple[Callable[[Any], None], ...] = (
    _registrar_validar,
    _registrar_gerar,
    _registrar_previa,
    _registrar_decidir,
)


def _construir_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="engenharia", description="Guia de Decisão de Engenharia")
    sub = parser.add_subparsers(dest="comando", required=True, metavar="comando")
    for registrar in _REGISTRADORES:
        registrar(sub)
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    """Ponto de entrada. Devolve o código de saída; `argparse` sai com 2 em uso incorreto."""
    parser = _construir_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except MermaidAusenteError as exc:
        print(f"erro: {exc}", file=sys.stderr)
        return EXIT_DEPENDENCIA
    except (YamlLoadError, InputError, GeracaoError) as exc:
        print(f"erro: {exc}", file=sys.stderr)
        return EXIT_ENTRADA


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
