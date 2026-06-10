# SST Perú Demo - Guía Rápida del Proyecto

---

### ⚠️ NOTA PARA PERSONAS SIN CONOCIMIENTOS DE PROGRAMACIÓN
¡Hola! No necesitas saber programar para ver y usar este proyecto. Aquí tienes las respuestas a las preguntas más comunes para que lo uses sin complicaciones:

#### 1. ¿Qué es este proyecto?
Es una maqueta o simulador interactivo (tipo panel de control o *dashboard*) sobre la **Seguridad y Salud en el Trabajo (SST) en el Perú**. Sirve para mostrar cómo se organizan las leyes de prevención de riesgos y calcular teóricamente el dinero que una empresa se ahorraría al aplicar medidas de control para evitar accidentes.

#### 2. ¿Qué muestra la página?
* **Resumen:** Un panel visual con tarjetas de colores que indican el número de riesgos detectados, estimaciones de incidentes evitados y el ahorro de dinero anual proyectado. También tiene un control deslizante (*slider*) para ver cómo cambia el impacto según la eficacia de los controles.
* **IPERC:** La matriz detallada de peligros, áreas, puntajes y las personas responsables de cada control.
* **SAT-MTPE:** Estadísticas reales del Ministerio de Trabajo del año 2025 sobre accidentes laborales en el Perú.
* **Metodología y Fuentes:** Las fórmulas matemáticas utilizadas para la simulación y los enlaces oficiales del gobierno peruano (como la Ley N° 29783).
* **Descargas:** Botones para descargar las bases de datos en formato Excel/CSV o la documentación de soporte.

#### 3. ¿Cómo abrir la página localmente?
No necesitas internet. Sigue estos pasos:
1. Ve a la carpeta donde guardaste este proyecto.
2. Busca el archivo llamado **`abrir_proyecto.bat`** (tiene el ícono de dos engranajes en Windows).
3. Haz **doble clic** sobre él.
4. Se abrirá automáticamente tu navegador web con la página lista para usar.

#### 4. ¿Cómo instalar dependencias?
**No necesitas instalar nada.** Este proyecto funciona de forma estática y offline en tu navegador directamente. Si tienes Python instalado en tu computadora, el script `abrir_proyecto.bat` levantará un servidor local automáticamente para darte una experiencia más fluida, pero si no lo tienes, la página se abrirá igual.

#### 5. ¿Cómo publicarlo en GitHub Pages?
Si quieres que otras personas vean esta página en internet de forma gratuita:
1. Sube este proyecto a un repositorio en tu cuenta de GitHub.
2. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio.
3. En la barra lateral izquierda, haz clic en **Pages**.
4. En la sección "Build and deployment", selecciona la rama **`main`** y la carpeta raíz **`/ (root)`**, luego haz clic en **Save**.
5. Espera 1 minuto y GitHub te dará un enlace público (ejemplo: `https://tuusuario.github.io/tuproyecto`).

#### 6. ¿Qué archivos puedo modificar?
* **`app.js`**: Si quieres cambiar los nombres de los riesgos, los costos simulados, las áreas de trabajo o agregar nuevos datos.
* **`styles.css`**: Si deseas modificar los colores de fondo, los tipos de letra o el tamaño de las tarjetas.
* **`index.html`**: Si quieres cambiar los textos del encabezado o pie de página.

#### 7. ¿Qué hacer si no carga la página?
* Cierra el navegador y vuelve a hacer doble clic en **`abrir_proyecto.bat`**.
* Si la ventana de comandos negra que se abre muestra algún mensaje de error, ciérrala y haz doble clic directamente sobre el archivo **`index.html`** para abrir la página sin servidor local.

#### 8. ¿Qué hacer si los botones de descarga no funcionan?
* Asegúrate de que los archivos como `iperc_demo.csv` o `sat_mtpe_resumen.csv` se encuentran en la misma carpeta que `index.html`. Si los borraste o los moviste a otra carpeta, los botones de descarga no funcionarán.
* Si los abres como archivo local y el navegador bloquea las descargas por seguridad, ejecuta el proyecto haciendo doble clic en **`abrir_proyecto.bat`** (esto inicia un servidor seguro que evita los bloqueos de descarga).

---

## Información Técnica del Proyecto

Para desarrolladores o usuarios que deseen ejecutar los scripts complementarios en Python:

### Archivos Principales del Proyecto

| Archivo | Contenido |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | Archivos de interfaz web estática, estilos CSS y lógica interactiva en JS. |
| `marco_normativo_sst_peru.md` | Detalle del marco legal nacional indexado por fecha. |
| `metodologia_simulacion.md` | Documento de supuestos y límites del simulador. |
| `data_dictionary.md` | Explicación de cada campo y estructura de datos. |
| `iperc_demo.csv` | Matriz IPERC simulada en formato CSV. |
| `epp_control_demo.csv` | Listado de control de equipos de protección en CSV. |
| `sat_mtpe_resumen.csv` | Estadísticas oficiales del MTPE 2025. |
| `fuentes_publicas.csv` | Catálogo de fuentes gubernamentales. |
| `simulacion_preventiva.py` | Script Python que ejecuta los cálculos de impacto offline. |
| `validacion_fuentes.py` | Script Python que valida que los datos se marquen debidamente como DEMO. |

### Ejecución de Scripts Complementarios

Si deseas recrear la simulación o validar la procedencia de los datos en tu terminal de comandos, ejecuta:

```powershell
# Para validar la integridad y marcado de fuentes
python validacion_fuentes.py

# Para correr el simulador y generar un nuevo reporte consolidado
python simulacion_preventiva.py
```
La ejecución de `simulacion_preventiva.py` creará el archivo local `simulacion_resultados_demo.csv`.

### Material Complementario en NotebookLM
Si deseas explorar información extendida sobre la matriz de riesgos IPERC, puedes visitar el cuaderno oficial del portal en [NotebookLM: Información IPERC](https://notebooklm.google.com/notebook/68be3994-d058-4753-97fc-60ade6c56778?authuser=1).
