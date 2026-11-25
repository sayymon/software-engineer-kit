"""Prova de paridade do guia: imprime um JSON que deve ser idêntico para duas cópias do mesmo guia.

Uso: python parity.py <pasta-do-guia> <schema.json>

Campos: código de saída e saída completa de `validar --estrito` (caminhos normalizados),
sha256 do JSON canônico do documento carregado e sha256 de cada diagrama Mermaid
(padrão e com subtarefas expandidas).
"""
from __future__ import annotations

import contextlib
import hashlib
import io
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

from guia_decisao import cli  # noqa: E402
from guia_decisao.loader import load_yaml  # noqa: E402
from guia_decisao.mermaid_gen import gerar_todos  # noqa: E402


def sha(texto: str) -> str:
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__, file=sys.stderr)
        return 2
    guia, schema = Path(argv[0]).resolve(), Path(argv[1]).resolve()
    out, err = io.StringIO(), io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
        codigo = cli.main(["validar", "--estrito", "--yaml", str(guia), "--schema", str(schema)])
    normalizar = lambda s: s.replace(str(guia), "<GUIA>").replace(str(schema), "<SCHEMA>")
    doc = load_yaml(guia)
    canonico = json.dumps(doc, ensure_ascii=False, sort_keys=True, separators=(",", ":"), default=str)
    resultado = {
        "validar_estrito": {
            "codigo": codigo,
            "stdout": normalizar(out.getvalue()).splitlines(),
            "stderr": normalizar(err.getvalue()).splitlines(),
        },
        "documento_sha256": sha(canonico),
        "mermaid_sha256": {n: sha(d.texto) for n, d in gerar_todos(doc).items()},
        "mermaid_subtarefas_sha256": {n: sha(d.texto) for n, d in gerar_todos(doc, subtarefas=True).items()},
    }
    print(json.dumps(resultado, ensure_ascii=False, sort_keys=True, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
