"""Camada fina de I/O: guarda de caminho reutilizável por todos os geradores."""

from __future__ import annotations

import os
from pathlib import Path


KIT_RAIZ = Path(__file__).resolve().parents[4]
GUIA_DIR = Path(os.environ.get("GUIA_DIR") or KIT_RAIZ / "content" / "guide")
GUIA_SCHEMA = Path(os.environ.get("GUIA_SCHEMA") or KIT_RAIZ / "schema" / "flows.schema.json")
MERMAID_JS = KIT_RAIZ / "site" / "public" / "vendor" / "mermaid" / "mermaid.min.js"
MERMAID_README = Path(__file__).resolve().parents[2] / "assets" / "README.txt"


class PathGuardError(ValueError):
    """Escrita recusada por estar fora da área permitida."""


def find_worktree_root(start: Path | None = None) -> Path:
    """Sobe a partir de `start` (padrão: diretório atual) até achar `.git`."""
    here = (start or Path.cwd()).resolve()
    for candidate in (here, *here.parents):
        if (candidate / ".git").exists():
            return candidate
    raise PathGuardError(f"worktree não encontrada a partir de {here}")


def ensure_inside(path: Path, root: Path, subdir: Path | None = None) -> Path:
    """Devolve o caminho resolvido se estiver dentro de `root` (e de `root/subdir`, se dado).

    Resolve links simbólicos e `..` antes de comparar. Levanta PathGuardError caso contrário.
    """
    base = root.resolve()
    if subdir is not None:
        base = (base / subdir).resolve()
        if not base.is_relative_to(root.resolve()):
            raise PathGuardError(f"área permitida fora da worktree: {base}")
    target = Path(path)
    target = (target if target.is_absolute() else base / target).resolve()
    if not target.is_relative_to(base):
        raise PathGuardError(f"escrita recusada fora de {base}: {target}")
    return target


def safe_write_text(path: Path, text: str, root: Path, subdir: Path | None = None) -> Path:
    """Grava `text` em `path` somente após a guarda de caminho. Cria diretórios pais já existentes apenas."""
    target = ensure_inside(path, root, subdir)
    if not target.parent.is_dir():
        raise PathGuardError(f"pasta inexistente (não cria subpastas): {target.parent}")
    target.write_text(text, encoding="utf-8")
    return target
