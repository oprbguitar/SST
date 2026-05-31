"""Valida trazabilidad publica y marcado explicito de datos DEMO."""
from __future__ import annotations

import csv
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_FILES = ["fuentes_publicas.csv", "sat_mtpe_resumen.csv"]
DEMO_FILES = ["iperc_demo.csv", "epp_control_demo.csv"]


def load_rows(filename: str) -> list[dict[str, str]]:
    with (BASE_DIR / filename).open(encoding="utf-8-sig", newline="") as source:
        return list(csv.DictReader(source))


def valid_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def main() -> None:
    errors: list[str] = []
    for filename in PUBLIC_FILES:
        for index, row in enumerate(load_rows(filename), start=2):
            if row.get("data_type") != "HECHO_DOCUMENTADO":
                errors.append(f"{filename}:{index} debe ser HECHO_DOCUMENTADO")
            if not valid_url(row.get("source_url", "")):
                errors.append(f"{filename}:{index} requiere source_url publica")
            if not row.get("consulted_at"):
                errors.append(f"{filename}:{index} requiere consulted_at")
    for filename in DEMO_FILES:
        for index, row in enumerate(load_rows(filename), start=2):
            if row.get("data_type") != "SINTETICO_DEMO":
                errors.append(f"{filename}:{index} debe marcar SINTETICO_DEMO")
            if "source_url" not in row:
                errors.append(f"{filename}:{index} requiere columna source_url")
    if errors:
        print("\n".join(errors))
        raise SystemExit(1)
    print("Validacion correcta: fuentes publicas trazables y datos sinteticos marcados.")


if __name__ == "__main__":
    main()

