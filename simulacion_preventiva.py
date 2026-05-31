"""Simulacion preventiva DEMO para riesgos SST sinteticos."""
from __future__ import annotations

import csv
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
INPUT_FILE = BASE_DIR / "iperc_demo.csv"
OUTPUT_FILE = BASE_DIR / "simulacion_resultados_demo.csv"


def money(value: Decimal) -> str:
    return str(value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def simulate(row: dict[str, str]) -> dict[str, str]:
    exposed = Decimal(row["exposed_people_demo"])
    rate = Decimal(row["incident_rate_demo"])
    effectiveness = Decimal(row["control_effectiveness_demo"])
    incident_cost = Decimal(row["reference_incident_cost_pen_demo"])
    control_cost = Decimal(row["control_cost_pen_demo"])
    expected = exposed * rate
    avoided = expected * effectiveness
    savings = avoided * incident_cost - control_cost
    return {
        "risk_id": row["risk_id"],
        "risk_demo": row["risk_demo"],
        "priority_demo": row["priority_demo"],
        "risk_score_demo": row["risk_score_demo"],
        "expected_incidents_demo": money(expected),
        "avoided_incidents_demo": money(avoided),
        "reference_savings_pen_demo": money(savings),
        "data_type": "INFERENCIA_DEMO",
        "source_url": "",
        "consulted_at": row["consulted_at"],
    }


def main() -> None:
    with INPUT_FILE.open(encoding="utf-8-sig", newline="") as source:
        rows = list(csv.DictReader(source))
    results = [simulate(row) for row in rows]
    results.sort(key=lambda row: (-int(row["risk_score_demo"]), -Decimal(row["avoided_incidents_demo"])))
    with OUTPUT_FILE.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=list(results[0]))
        writer.writeheader()
        writer.writerows(results)
    total_avoided = sum(Decimal(row["avoided_incidents_demo"]) for row in results)
    total_savings = sum(Decimal(row["reference_savings_pen_demo"]) for row in results)
    print(f"Generado: {OUTPUT_FILE.name}")
    print(f"Incidentes evitados DEMO: {money(total_avoided)}")
    print(f"Ahorro referencial DEMO (PEN): {money(total_savings)}")


if __name__ == "__main__":
    main()

