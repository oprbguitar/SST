# Metodologia de simulacion preventiva

## Objetivo

Priorizar riesgos de una matriz IPERC **SINTETICA** y estimar, con fines demostrativos, incidentes evitados y ahorro referencial despues de aplicar controles preventivos.

## Separacion de evidencia

| Tipo | Uso en el proyecto |
| --- | --- |
| HECHO_DOCUMENTADO | Normativa y resumen estadistico SAT-MTPE con URL publica y fecha de consulta |
| SINTETICO_DEMO | IPERC, EPP, responsables, costos y tasas de referencia inventadas para mostrar el flujo |
| INFERENCIA_DEMO | Resultado calculado por el script a partir de datos sinteticos y supuestos editables |

## Formula

Para cada riesgo:

```text
puntaje_riesgo = probabilidad * severidad
incidentes_esperados_demo = exposicion_personas * tasa_base_incidente_demo
incidentes_evitados_demo = incidentes_esperados_demo * eficacia_control_demo
ahorro_referencial_demo = incidentes_evitados_demo * costo_referencial_por_incidente_demo - costo_control_demo
```

La priorizacion ordena los riesgos por `puntaje_riesgo` y luego por `incidentes_evitados_demo`.

## Supuestos

- Las tasas base, eficacias, exposiciones y costos son valores **SINTETICOS**.
- El ahorro es una comparacion referencial, no una promesa financiera.
- La eficacia preventiva real depende de implementacion, supervision, capacitacion y contexto.
- Las estadisticas SAT-MTPE sirven como contexto publico agregado; no calibran automaticamente una empresa.

## Limitaciones

- No se usan datos historicos de una empresa.
- No se modela subregistro, causalidad, distribucion probabilistica ni incertidumbre avanzada.
- No se evalua cumplimiento normativo especifico.
- El IPERC demo no sustituye la identificacion participativa de peligros ni la evaluacion profesional.

## Advertencia obligatoria

Este proyecto **no reemplaza auditoria legal, inspeccion SUNAFIL ni implementacion formal del SGSST**. Sus inferencias son demostrativas y deben revisarse antes de cualquier decision real.

