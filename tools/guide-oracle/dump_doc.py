"""Imprime o documento carregado do guia como JSON canônico (chaves ordenadas, UTF-8).

Uso:
    python dump_doc.py <pasta-do-guia>              documento completo
    python dump_doc.py <pasta-do-guia> --mermaid    {"padrao": {arquivo: texto}, "subtarefas": {arquivo: texto}}
    python dump_doc.py <pasta-do-guia> --fixture    só as colecoes que o gerador Mermaid lê
    cat documento.json | python dump_doc.py --issues [--avisos] [--completude]  lista de Issue da validação em JSON

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
from guia_decisao.validator import validate  # noqa: E402

COLECOES_MERMAID = ("demandas", "raias", "decisoes", "papeis")


def canonico(valor: object) -> str:
    return json.dumps(valor, ensure_ascii=False, sort_keys=True, separators=(",", ":"), default=str)


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
