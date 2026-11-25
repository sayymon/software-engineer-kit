"""Configuração do pytest: marcador `integration` e pulo opcional."""

import pytest
from hypothesis import settings

settings.register_profile("oracle", derandomize=True, database=None)
settings.load_profile("oracle")


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption("--integration", action="store_true", default=False, help="roda testes marcados com integration")


def pytest_configure(config: pytest.Config) -> None:
    config.addinivalue_line("markers", "integration: testes que dependem de infraestrutura externa (ex.: mermaid-cli)")


def pytest_collection_modifyitems(config: pytest.Config, items: list[pytest.Item]) -> None:
    if config.getoption("--integration"):
        return
    skip = pytest.mark.skip(reason="use --integration para rodar")
    for item in items:
        if "integration" in item.keywords:
            item.add_marker(skip)
