"""Imprime o documento carregado do guia como JSON canônico (chaves ordenadas, UTF-8).

Uso:
    python dump_doc.py <pasta-do-guia>              documento completo
    python dump_doc.py <pasta-do-guia> --mermaid    {"padrao": {arquivo: texto}, "subtarefas": {arquivo: texto}}
    python dump_doc.py <pasta-do-guia> --fixture    só as colecoes que o gerador Mermaid lê
    cat documento.json | python dump_doc.py --issues [--avisos] [--completude]  lista de Issue da validação em JSON
    cat documento.json | python dump_doc.py --rastreio   rastreio de dados (rastrear, usos, lacunas, descrições) em JSON

Serve de referência para o teste diferencial tests/guide/oracle-parity.test.ts.
"""
from __future__ import annotations

import json
import sys
from dataclasses import asdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

from guia_decisao.loader import load_yaml  # noqa: E402
from guia_decisao.mermaid_gen import gerar_todos  # noqa: E402
from guia_decisao.paths import GUIA_SCHEMA  # noqa: E402
from guia_decisao.rastreio import descrever_condicao, lacunas_de_dados, rastrear_dados, usos_em_condicoes  # noqa: E402
from guia_decisao.validator import validate  # noqa: E402

COLECOES_MERMAID = ("demandas", "raias", "decisoes", "papeis")


def canonico(valor: object) -> str:
    return json.dumps(valor, ensure_ascii=False, sort_keys=True, separators=(",", ":"), default=str)


def _condicoes(no: object) -> list[object]:
    """Todo valor de uma chave `quando` do documento, em ordem de aparição (para testar `descrever_condicao`)."""
    achadas: list[object] = []
    if isinstance(no, dict):
        for chave, valor in no.items():
            if chave == "quando":
                achadas.append(valor)
            achadas.extend(_condicoes(valor))
    elif isinstance(no, list):
        for valor in no:
            achadas.extend(_condicoes(valor))
    return achadas


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__, file=sys.stderr)
        return 2
    if argv[0] == "--issues":
        try:
            doc = json.load(sys.stdin)
        except json.JSONDecodeError as exc:
            print(f"JSON inválido na entrada: linha {exc.lineno}, coluna {exc.colno}: {exc.msg}", file=sys.stderr)
            return 2
        schema = json.loads(GUIA_SCHEMA.read_text(encoding="utf-8"))
        issues = validate(doc, schema, avisos="--avisos" in argv[1:], completude="--completude" in argv[1:])
        sys.stdout.write(canonico([asdict(issue) for issue in issues]))
        return 0

    if argv[0] == "--rastreio":
        try:
            doc = json.load(sys.stdin)
        except json.JSONDecodeError as exc:
            print(f"JSON inválido na entrada: linha {exc.lineno}, coluna {exc.colno}: {exc.msg}", file=sys.stderr)
            return 2
        rastro = rastrear_dados(doc)
        usos = usos_em_condicoes(doc)
        lacunas = lacunas_de_dados(doc)
        sys.stdout.write(
            canonico(
                {
                    "rastrear": rastro,
                    "rastrear_ordem": list(rastro),
                    "usos": usos,
                    "usos_ordem": list(usos),
                    "lacunas": lacunas,
                    "lacunas_ordem": list(lacunas),
                    "condicoes": [[c, descrever_condicao(c)] for c in _condicoes(doc)],
                }
            )
        )
        return 0

    doc = load_yaml(Path(argv[0]))
    modo = argv[1] if len(argv) > 1 else ""
    if modo == "--mermaid":
        saida = {
            "padrao": {n: d.texto for n, d in gerar_todos(doc).items()},
            "subtarefas": {n: d.texto for n, d in gerar_todos(doc, subtarefas=True).items()},
        }
        sys.stdout.write(canonico(saida))
    elif modo == "--fixture":
        sys.stdout.write(canonico({k: doc.get(k, []) for k in COLECOES_MERMAID}))
    else:
        sys.stdout.write(canonico(doc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
