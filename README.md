# SST Peru Demo

Repositorio demostrativo para documentar y simular un sistema basico de Seguridad y Salud en el Trabajo (SST) en el Peru. Combina fuentes publicas oficiales, datos sinteticos y una simulacion preventiva reproducible sin usar informacion confidencial de empresas.

> **Advertencia:** este proyecto es educativo y demostrativo. No reemplaza una auditoria legal, una inspeccion de SUNAFIL, la asesoria profesional ni la implementacion formal del SGSST exigible a cada empleador.

## Propuesta de valor

La web permite explorar en un solo lugar:

- **Hechos documentados:** normativa SST peruana y resumen anual SAT-MTPE 2025.
- **Datos DEMO o SINTETICOS:** matriz IPERC, control de EPP, responsables, costos estimados e indicadores.
- **Inferencias metodologicas:** estimacion preventiva editable de incidentes evitados y ahorro referencial.
- **Descargas:** archivos Markdown, CSV y scripts Python reproducibles.

## Abrir la web

```powershell
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Archivos principales

| Archivo | Contenido |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Web estatica dinamica y descargable |
| `marco_normativo_sst_peru.md` | Marco normativo con fuentes y fechas de consulta |
| `metodologia_simulacion.md` | Supuestos, formula, limitaciones y advertencias |
| `data_dictionary.md` | Diccionario de datos |
| `iperc_demo.csv` | Matriz IPERC SINTETICA |
| `epp_control_demo.csv` | Control EPP SINTETICO |
| `sat_mtpe_resumen.csv` | Resumen publico anual SAT-MTPE 2025 |
| `fuentes_publicas.csv` | Catalogo de fuentes publicas consultadas |
| `simulacion_preventiva.py` | Simulador reproducible |
| `validacion_fuentes.py` | Validacion de trazabilidad y marcado DEMO |

## Reproducibilidad

```powershell
python validacion_fuentes.py
python simulacion_preventiva.py
```

La simulacion genera `simulacion_resultados_demo.csv`. Todos los resultados generados se marcan como `INFERENCIA_DEMO`.

## Enlace informativo IPERC

Consulta el material complementario en [NotebookLM: informacion sobre IPERC](https://notebooklm.google.com/notebook/68be3994-d058-4753-97fc-60ade6c56778?authuser=1).

## Publicacion

La web es compatible con GitHub Pages. Para publicarla, habilita Pages desde la rama `main` y la carpeta raiz.

