"""Carregamento e serialização estável do YAML_Fonte."""

from __future__ import annotations

import datetime
import re
from pathlib import Path
from typing import Any

import yaml


class YamlLoadError(Exception):
    """Falha ao ler ou interpretar o YAML. A CLI mapeia para código de saída 2.

    `line` e `column` são 1-based; ficam `None` quando o erro não tem posição
    (arquivo ausente, topo que não é mapeamento).
    """

    def __init__(
        self,
        path: Path,
        message: str,
        line: int | None = None,
        column: int | None = None,
    ) -> None:
        self.path = Path(path)
        self.message = message
        self.line = line
        self.column = column
        super().__init__(str(self))

    def __str__(self) -> str:
        pos = ""
        if self.line is not None:
            pos = f":{self.line}" + (f":{self.column}" if self.column is not None else "")
        return f"{self.path}{pos}: {self.message}"


_DATA_RE = re.compile(r"(?<![\w\"'-])(\d{4})-(\d{2})-(\d{2})(?![\w\"'-])")


def _achar_data_invalida(text: str) -> tuple[int | None, int | None, str | None]:
    """Localiza, de forma aproximada, a primeira data AAAA-MM-DD sem aspas que não existe."""
    for n, linha in enumerate(text.splitlines(), start=1):
        codigo = linha.split("#", 1)[0]
        for m in _DATA_RE.finditer(codigo):
            try:
                datetime.date(int(m[1]), int(m[2]), int(m[3]))
            except ValueError:
                return n, m.start() + 1, m[0]
    return None, None, None


ARQUIVO_COMUM = "comum.yaml"
ARQUIVO_RAIAS_COMUNS = "raias-comuns.yaml"
ARQUIVO_RITOS = "ritos.yaml"
PASTA_DEMANDAS = "demandas"
CHAVE_ORDEM = "ordem_das_demandas"


def arquivos_do_guia(pasta: Path) -> list[Path]:
    """Arquivos do guia na ordem de junção: comum, raias comuns (se houver) e demandas na ordem declarada.

    `comum.yaml` declara `ordem_das_demandas` (ids); cada demanda vive em `demandas/<id>.yaml`. Arquivos de demanda
    fora da lista entram no fim, em ordem alfabética, para nada ficar de fora.
    """
    pasta = Path(pasta)
    comum = pasta / ARQUIVO_COMUM
    if not comum.is_file():
        raise YamlLoadError(comum, "o guia em pasta precisa de comum.yaml")
    ordem = _ler_um(comum).get(CHAVE_ORDEM) or []
    arquivos = [comum]
    for extra in (ARQUIVO_RAIAS_COMUNS, ARQUIVO_RITOS):  # opcionais, juntados logo depois do comum
        if (pasta / extra).is_file():
            arquivos.append(pasta / extra)
    dem = pasta / PASTA_DEMANDAS
    presentes = {p.stem: p for p in sorted(dem.glob("*.yaml"))} if dem.is_dir() else {}
    for did in ordem:
        if did not in presentes:
            raise YamlLoadError(comum, f"ordem_das_demandas cita '{did}', mas não existe demandas/{did}.yaml")
        arquivos.append(presentes.pop(did))
    arquivos.extend(presentes[k] for k in sorted(presentes))
    return arquivos


def texto_do_guia(path: Path) -> str:
    """Texto do guia (um arquivo ou a pasta inteira, concatenada na ordem de junção), para varreduras de texto."""
    path = Path(path)
    if path.is_dir():
        return "\n".join(p.read_text(encoding="utf-8") for p in arquivos_do_guia(path))
    return path.read_text(encoding="utf-8")


def _juntar(pasta: Path) -> dict[str, Any]:
    """Junta os arquivos do guia num único documento: listas concatenadas na ordem; mapas e escalares uma vez só."""
    doc: dict[str, Any] = {}
    origem: dict[str, Path] = {}
    for arq in arquivos_do_guia(pasta):
        parte = _ler_um(arq)
        for chave, valor in parte.items():
            if chave == CHAVE_ORDEM:
                continue
            if isinstance(valor, list):
                doc.setdefault(chave, [])
                if not isinstance(doc[chave], list):
                    raise YamlLoadError(arq, f"'{chave}' é lista aqui e não é em {origem[chave].name}")
                doc[chave].extend(valor)
                origem.setdefault(chave, arq)
            elif chave in doc:
                raise YamlLoadError(arq, f"'{chave}' já foi definido em {origem[chave].name}; mapas e escalares ficam num arquivo só")
            else:
                doc[chave] = valor
                origem[chave] = arq
    return doc


def load_yaml(path: Path) -> dict[str, Any]:
    """Lê o guia: um arquivo YAML ou uma pasta (comum.yaml, raias-comuns.yaml e demandas/*.yaml) juntada num documento.

    Levanta `YamlLoadError` com arquivo, linha e coluna quando o YAML é malformado.
    """
    path = Path(path)
    if path.is_dir():
        return _juntar(path)
    return _ler_um(path)


def _ler_um(path: Path) -> dict[str, Any]:
    path = Path(path)
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as exc:
        raise YamlLoadError(path, f"não foi possível ler o arquivo: {exc}") from exc
    try:
        data = yaml.safe_load(text)
    except yaml.MarkedYAMLError as exc:
        mark = exc.problem_mark or exc.context_mark
        line = mark.line + 1 if mark is not None else None
        column = mark.column + 1 if mark is not None else None
        problem = exc.problem or exc.context or "YAML inválido"
        raise YamlLoadError(path, str(problem), line, column) from exc
    except yaml.YAMLError as exc:
        raise YamlLoadError(path, f"YAML inválido: {exc}") from exc
    except ValueError as exc:
        # Data sem aspas e inexistente (ex.: 2026-02-30): o PyYAML não informa a posição.
        line, column, token = _achar_data_invalida(text)
        detail = f"data inválida{f' {token!r}' if token else ''}: {exc}"
        raise YamlLoadError(path, detail, line, column) from exc
    if not isinstance(data, dict):
        raise YamlLoadError(path, "o topo do documento deve ser um mapeamento", 1, 1)
    return data


class _NoAliasDumper(yaml.SafeDumper):
    def ignore_aliases(self, data: Any) -> bool:  # noqa: ARG002
        return True


def dump_yaml(doc: dict[str, Any]) -> str:
    """Serializa `doc` de forma estável: ordem de chaves preservada, unicode, sem aliases."""
    return yaml.dump(
        doc,
        Dumper=_NoAliasDumper,
        sort_keys=False,
        allow_unicode=True,
        default_flow_style=False,
        width=1_000_000,
    )
