# Diccionario de datos

## Convenciones

- `data_type`: `HECHO_DOCUMENTADO`, `SINTETICO_DEMO` o `INFERENCIA_DEMO`.
- `source_url`: obligatorio para toda fila basada en fuente publica. En filas sinteticas se conserva la columna vacia.
- `consulted_at`: fecha ISO de consulta de la fuente publica o fecha de preparacion del demo.

## `iperc_demo.csv`

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| `risk_id` | texto | Identificador DEMO |
| `area_demo` | texto | Area ficticia |
| `hazard_demo` | texto | Peligro sintetico |
| `risk_demo` | texto | Riesgo sintetico |
| `probability_demo` | entero | Escala DEMO 1 a 5 |
| `severity_demo` | entero | Escala DEMO 1 a 5 |
| `risk_score_demo` | entero | Producto probabilidad x severidad |
| `priority_demo` | texto | Nivel DEMO |
| `control_demo` | texto | Control preventivo sugerido |
| `owner_demo` | texto | Rol responsable ficticio |
| `due_date_demo` | fecha | Fecha objetivo ficticia |
| `control_cost_pen_demo` | decimal | Costo estimado sintetico en PEN |
| `exposed_people_demo` | entero | Exposicion sintetica |
| `incident_rate_demo` | decimal | Tasa base sintetica |
| `control_effectiveness_demo` | decimal | Eficacia supuesta entre 0 y 1 |
| `reference_incident_cost_pen_demo` | decimal | Costo sintetico por incidente |
| `data_type` | texto | Siempre `SINTETICO_DEMO` |
| `source_url` | URL | Vacio porque no representa fuente publica |
| `consulted_at` | fecha | Fecha de preparacion |

## `epp_control_demo.csv`

Registra entrega, vigencia e inspeccion de EPP con valores ficticios y marcado `SINTETICO_DEMO`.

## `sat_mtpe_resumen.csv`

Resume cifras publicas anuales del boletin SAT-MTPE 2025: accidentes no mortales, accidentes mortales, incidentes peligrosos y enfermedades ocupacionales.

