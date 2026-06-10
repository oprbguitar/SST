// SST Perú Demo - Lógica de Negocio y Presentación Ejecutiva

// Datos de riesgos de la matriz IPERC (sintéticos)
const risks = [
  ["Caída de materiales", "Almacén DEMO", "CRITICO", 16, "Rediseñar estiba y checklist diario", 4200, "Supervisor SST DEMO", 18, 0.18, 0.62, 6500],
  ["Atrapamiento", "Taller DEMO", "CRITICO", 15, "Instalar resguardos y bloqueo etiquetado", 7800, "Responsable Mantenimiento DEMO", 10, 0.12, 0.70, 18000],
  ["Caída al mismo nivel", "Oficina DEMO", "MEDIO", 6, "Canaletas y ronda de orden", 650, "Administración DEMO", 24, 0.10, 0.55, 1500],
  ["Hipoacusia ocupacional", "Operaciones DEMO", "ALTO", 12, "Medición ocupacional y protección auditiva", 3600, "Supervisor SST DEMO", 14, 0.08, 0.48, 9000],
  ["Sobreesfuerzo musculoesquelético", "Carga DEMO", "ALTO", 12, "Ayuda mecánica y capacitación ergonómica", 5200, "Jefatura Operaciones DEMO", 22, 0.16, 0.50, 3200],
  ["Contacto con sustancia", "Limpieza DEMO", "MEDIO", 6, "SDS visible, kit derrames y guantes adecuados", 1800, "Supervisor SST DEMO", 6, 0.08, 0.58, 2800],
  ["Caída a distinto nivel", "Mantenimiento DEMO", "CRITICO", 15, "Permiso de trabajo, línea de vida y supervisión", 9500, "Responsable Mantenimiento DEMO", 5, 0.10, 0.76, 25000],
  ["Atropello o colisión", "Patio DEMO", "CRITICO", 15, "Segregar rutas y colocar señalización", 11200, "Jefatura Operaciones DEMO", 16, 0.09, 0.64, 22000]
];

// Datos del boletín SAT-MTPE 2025 (hechos documentados)
const sat = [
  ["Accidentes no mortales", 43750],
  ["Accidentes mortales", 228],
  ["Incidentes peligrosos", 494],
  ["Enfermedades ocupacionales", 130]
];

// Fuentes de información consultadas
const sources = [
  ["Ley N° 29783", "Congreso / Estado peruano", "https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/462576-29783"],
  ["D.S. N° 005-2012-TR", "MTPE", "https://www.gob.pe/institucion/mtpe/normas-legales/462577-005-2012-tr"],
  ["R.M. N° 050-2013-TR", "MTPE", "https://www.gob.pe/institucion/mtpe/normas-legales/288031-050-2013-tr"],
  ["Normas nacionales SST", "MTPE", "https://www.gob.pe/institucion/mtpe/informes-publicaciones/470749-normas-nacionales-de-seguridad-y-salud-en-el-trabajo"],
  ["Normatividad relacionada a SST", "SERVIR", "https://www.gob.pe/institucion/servir/informes-publicaciones/3572362-normatividad-relacionada-a-la-seguridad-y-salud-en-el-trabajo-sst"],
  ["Compendio normativo de inspección", "SUNAFIL", "https://www.gob.pe/institucion/sunafil/colecciones/9354-compendio-normativo-sobre-la-inspeccion-del-trabajo"],
  ["Boletín SAT-MTPE 2025", "MTPE", "https://www.gob.pe/institucion/mtpe/informes-publicaciones/7764293-notificaciones-de-accidentes-de-trabajo-incidentes-peligrosos-y-enfermedades-ocupacionales-diciembre-2025"]
];

// Archivos del proyecto disponibles para descarga local
const files = [
  "README.md",
  "marco_normativo_sst_peru.md",
  "metodologia_simulacion.md",
  "data_dictionary.md",
  "iperc_demo.csv",
  "epp_control_demo.csv",
  "sat_mtpe_resumen.csv",
  "fuentes_publicas.csv",
  "simulacion_preventiva.py",
  "validacion_fuentes.py"
];

// Formateador de moneda (Soles PEN)
const money = n => new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  maximumFractionDigits: 0
}).format(n);

// 1. Navegación de Pestañas (Multitabs)
function switchTab(tabId) {
  // Ocultar todos los paneles
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Mostrar panel seleccionado
  const targetPanel = document.getElementById(`panel-${tabId}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
    // Scroll al inicio del panel
    targetPanel.scrollTop = 0;
  }

  // Actualizar clase activa en menú superior
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Si cambiamos de pestaña, actualizar la cabecera del preview en Resumen
  document.querySelectorAll('.mini-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

// Configurar los manejadores de eventos para los botones de pestañas
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.getAttribute('data-tab'));
  });
});

// Manejador del botón de retorno en el encabezado
function handleBackAction() {
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) {
    const activeTab = activeBtn.getAttribute('data-tab');
    if (activeTab !== 'resumen') {
      switchTab('resumen');
    } else {
      // Si ya está en resumen, actúa como botón Atrás tradicional
      window.history.back();
    }
  } else {
    switchTab('resumen');
  }
}

// 2. Modo Claro / Oscuro (Theme Toggle)
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('sst-theme') || 'light';
  
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('sst-theme', newTheme);
  });
}

// 3. Renderizado de Matriz IPERC Completa
function renderRisks() {
  const filterVal = document.querySelector("#priority-filter").value;
  const searchVal = document.querySelector("#risk-search").value.toLowerCase();
  const tableBody = document.querySelector("#iperc-body");

  if (!tableBody) return;

  const filtered = risks.filter(r => {
    const matchesPriority = (filterVal === "TODOS" || r[2] === filterVal);
    const matchesSearch = (r[0] + " " + r[1] + " " + r[4] + " " + r[6]).toLowerCase().includes(searchVal);
    return matchesPriority && matchesSearch;
  });

  tableBody.innerHTML = filtered.map(r => `
    <tr>
      <td><b>${r[0]}</b><br><small class="text-muted">SINTÉTICO DEMO</small></td>
      <td>${r[1]}</td>
      <td><span class="level-badge ${r[2]}">${r[2]}</span></td>
      <td><b>${r[3]}</b></td>
      <td>${r[4]}</td>
      <td>${money(r[5])}</td>
      <td>${r[6]}</td>
    </tr>
  `).join("");
}

// Escuchadores de eventos para filtros IPERC
document.querySelector("#priority-filter").addEventListener("change", renderRisks);
document.querySelector("#risk-search").addEventListener("input", renderRisks);

// 4. Renderizado del IPERC Reducido (Vista Previa en Resumen)
function renderIPERCPreview() {
  const previewBody = document.querySelector("#iperc-preview-body");
  if (!previewBody) return;

  // Mostramos solo los primeros 5 riesgos de la lista
  previewBody.innerHTML = risks.slice(0, 5).map(r => `
    <tr>
      <td><strong>${r[0]}</strong></td>
      <td>${r[1]}</td>
      <td><span class="level-badge ${r[2]}">${r[2]}</span></td>
      <td><strong>${r[3]}</strong></td>
      <td>${r[4]}</td>
    </tr>
  `).join("");
}

// 5. Renderizado Gráfico de Prioridad Dinámico (Barras Horizontales)
function renderPriorityChart() {
  const chartContainer = document.querySelector("#hero-chart");
  if (!chartContainer) return;

  // Contar los riesgos por categoría
  const counts = { "CRITICO": 0, "ALTO": 0, "MEDIO": 0, "BAJO": 0 };
  risks.forEach(r => {
    const lvl = r[2];
    if (counts[lvl] !== undefined) counts[lvl]++;
  });

  const maxVal = Math.max(...Object.values(counts), 1);

  chartContainer.innerHTML = `
    <div class="bar-row-item">
      <span class="bar-row-label">Crítica</span>
      <div class="bar-outer">
        <div class="bar-inner bg-red" style="width: ${(counts["CRITICO"] / maxVal) * 100}%"></div>
      </div>
      <span class="bar-row-value">${counts["CRITICO"]}</span>
    </div>
    <div class="bar-row-item">
      <span class="bar-row-label">Alta</span>
      <div class="bar-outer">
        <div class="bar-inner bg-orange" style="width: ${(counts["ALTO"] / maxVal) * 100}%"></div>
      </div>
      <span class="bar-row-value">${counts["ALTO"]}</span>
    </div>
    <div class="bar-row-item">
      <span class="bar-row-label">Media</span>
      <div class="bar-outer">
        <div class="bar-inner bg-yellow" style="width: ${(counts["MEDIO"] / maxVal) * 100}%"></div>
      </div>
      <span class="bar-row-value">${counts["MEDIO"]}</span>
    </div>
    <div class="bar-row-item">
      <span class="bar-row-label">Baja</span>
      <div class="bar-outer">
        <div class="bar-inner bg-green" style="width: ${(counts["BAJO"] / maxVal) * 100}%"></div>
      </div>
      <span class="bar-row-value">${counts["BAJO"]}</span>
    </div>
  `;
}

// 6. Cálculos de Simulación Preventiva Dinámica (Slider e Indicadores)
function totals() {
  const effectivenessInput = document.querySelector("#effectiveness");
  if (!effectivenessInput) return;

  const factor = Number(effectivenessInput.value) / 100;
  let avoided = 0;
  let savings = 0;

  // Cálculo en base a supuestos
  risks.forEach(r => {
    // r[7]: exposición, r[8]: tasa base, r[9]: eficacia control
    const a = r[7] * r[8] * r[9] * factor;
    avoided += a;
    // r[10]: costo por incidente, r[5]: costo del control
    savings += (a * r[10]) - r[5];
  });

  // Actualizar etiquetas de porcentaje
  document.querySelector("#effectiveness-label").textContent = `${Math.round(factor * 100)}%`;

  // Actualizar KPIs superiores en pestaña Resumen
  document.querySelector("#hero-avoided").textContent = avoided.toFixed(2);
  document.querySelector("#hero-savings").textContent = money(savings);

  // Actualizar gráfico de dona dinámico
  // El índice base es 8.05 al 100% de eficacia, escalamos en relación al factor
  const indexValue = Math.min(Math.max(factor * 8.05, 0), 10);
  document.querySelector("#donut-index-label").textContent = indexValue.toFixed(2);

  // El círculo SVG tiene un perímetro aproximado de 100, por lo que la proporción mapea directamente a stroke-dasharray
  // Mapeamos el índice 0-10 a un porcentaje 0-100%
  const percentFill = Math.round(indexValue * 10);
  const percentRest = 100 - percentFill;
  
  const donutSegment = document.querySelector("#donut-dynamic-fill");
  if (donutSegment) {
    donutSegment.setAttribute("stroke-dasharray", `${percentFill} ${percentRest}`);
    // Opcionalmente cambiar el color según el nivel de índice
    if (indexValue >= 8) {
      donutSegment.setAttribute("stroke", "var(--green)");
    } else if (indexValue >= 5) {
      donutSegment.setAttribute("stroke", "var(--primary-blue)");
    } else {
      donutSegment.setAttribute("stroke", "var(--orange)");
    }
  }

  // Actualizar los porcentajes indicativos en la leyenda de la dona (con fines de demo interactiva)
  document.querySelector("#pct-critico").textContent = `${Math.round(35 * factor)}%`;
  document.querySelector("#pct-alto").textContent = `${Math.round(30 * factor)}%`;
  document.querySelector("#pct-medio").textContent = `${Math.round(25 * factor)}%`;
  document.querySelector("#pct-bajo").textContent = `${Math.round(10 * factor)}%`;
}

// Escuchador de eventos para el slider
document.querySelector("#effectiveness").addEventListener("input", totals);

// 7. Inicializar y Rellenar Listas Auxiliares (SAT, Fuentes y Descargas)
function initStaticLists() {
  // Estadísticas SAT-MTPE 2025 (Pestaña Completa)
  const satGrid = document.querySelector("#sat-grid");
  if (satGrid) {
    satGrid.innerHTML = sat.map(x => `
      <div class="sat-card">
        <small>HECHO DOCUMENTADO · 2025</small>
        <strong>${x[1].toLocaleString("es-PE")}</strong>
        <span>${x[0]}</span>
      </div>
    `).join("");
  }

  // Actualizar números SAT en pestaña Resumen
  document.querySelector("#sat-no-mortales").textContent = sat[0][1].toLocaleString("es-PE");
  document.querySelector("#sat-mortales").textContent = sat[1][1].toLocaleString("es-PE");
  document.querySelector("#sat-peligrosos").textContent = sat[2][1].toLocaleString("es-PE");
  document.querySelector("#sat-enfermedades").textContent = sat[3][1].toLocaleString("es-PE");

  // Lista de fuentes oficiales (Pestaña Completa)
  const sourceList = document.querySelector("#source-list");
  if (sourceList) {
    sourceList.innerHTML = sources.map(s => `
      <div class="source-detail-item">
        <span class="src-date">Consultada<br>2026-05-31</span>
        <div class="src-info">
          <h4>${s[0]}</h4>
          <span>${s[1]} · HECHO DOCUMENTADO</span>
        </div>
        <a class="src-action-btn" href="${s[2]}" target="_blank" rel="noreferrer">Abrir fuente oficial</a>
      </div>
    `).join("");
  }

  // Lista de Descargas (Pestaña Completa)
  const downloadsGrid = document.querySelector("#downloads");
  if (downloadsGrid) {
    downloadsGrid.innerHTML = files.map(f => {
      // Determinamos si es código Python (.py) o base de datos (.csv) o documentación (.md)
      let typeLabel = "Documento MD";
      if (f.endsWith(".csv")) typeLabel = "Base de datos CSV";
      if (f.endsWith(".py")) typeLabel = "Script Python";
      if (f.endsWith(".bat")) typeLabel = "Script por lotes";
      
      return `
        <div class="download-card">
          <div class="dl-info">
            <strong>${f}</strong>
            <span>${typeLabel}</span>
          </div>
          <a class="dl-icon-btn" href="${f}" download title="Descargar archivo ${f}">
            ▼
          </a>
        </div>
      `;
    }).join("");
  }
}

// 8. Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStaticLists();
  renderRisks();
  renderIPERCPreview();
  renderPriorityChart();
  totals();
});
