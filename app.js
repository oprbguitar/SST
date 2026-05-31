const risks=[
["Caida de materiales","Almacen DEMO","CRITICO",16,"Redisenar estiba y checklist diario",4200,"Supervisor SST DEMO",18,.18,.62,6500],
["Atrapamiento","Taller DEMO","CRITICO",15,"Instalar resguardos y bloqueo etiquetado",7800,"Responsable Mantenimiento DEMO",10,.12,.70,18000],
["Caida al mismo nivel","Oficina DEMO","MEDIO",6,"Canaletas y ronda de orden",650,"Administracion DEMO",24,.10,.55,1500],
["Hipoacusia ocupacional","Operaciones DEMO","ALTO",12,"Medicion ocupacional y proteccion auditiva",3600,"Supervisor SST DEMO",14,.08,.48,9000],
["Sobreesfuerzo musculoesqueletico","Carga DEMO","ALTO",12,"Ayuda mecanica y capacitacion ergonomica",5200,"Jefatura Operaciones DEMO",22,.16,.50,3200],
["Contacto con sustancia","Limpieza DEMO","MEDIO",6,"SDS visible kit derrames y guantes adecuados",1800,"Supervisor SST DEMO",6,.08,.58,2800],
["Caida a distinto nivel","Mantenimiento DEMO","CRITICO",15,"Permiso de trabajo linea de vida y supervision",9500,"Responsable Mantenimiento DEMO",5,.10,.76,25000],
["Atropello o colision","Patio DEMO","CRITICO",15,"Segregar rutas y colocar senalizacion",11200,"Jefatura Operaciones DEMO",16,.09,.64,22000]
];
const sat=[["Accidentes no mortales",43750],["Accidentes mortales",228],["Incidentes peligrosos",494],["Enfermedades ocupacionales",130]];
const sources=[
["Ley N. 29783","Congreso / Estado peruano","https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/462576-29783"],
["D.S. N. 005-2012-TR","MTPE","https://www.gob.pe/institucion/mtpe/normas-legales/462577-005-2012-tr"],
["R.M. N. 050-2013-TR","MTPE","https://www.gob.pe/institucion/mtpe/normas-legales/288031-050-2013-tr"],
["Normas nacionales SST","MTPE","https://www.gob.pe/institucion/mtpe/informes-publicaciones/470749-normas-nacionales-de-seguridad-y-salud-en-el-trabajo"],
["Normatividad relacionada a SST","SERVIR","https://www.gob.pe/institucion/servir/informes-publicaciones/3572362-normatividad-relacionada-a-la-seguridad-y-salud-en-el-trabajo-sst"],
["Compendio normativo de inspeccion","SUNAFIL","https://www.gob.pe/institucion/sunafil/colecciones/9354-compendio-normativo-sobre-la-inspeccion-del-trabajo"],
["Boletin SAT-MTPE 2025","MTPE","https://www.gob.pe/institucion/mtpe/informes-publicaciones/7764293-notificaciones-de-accidentes-de-trabajo-incidentes-peligrosos-y-enfermedades-ocupacionales-diciembre-2025"]
];
const files=["README.md","marco_normativo_sst_peru.md","metodologia_simulacion.md","data_dictionary.md","iperc_demo.csv","epp_control_demo.csv","sat_mtpe_resumen.csv","fuentes_publicas.csv","simulacion_preventiva.py","validacion_fuentes.py"];
const money=n=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN",maximumFractionDigits:0}).format(n);
function renderRisks(){const level=document.querySelector("#priority-filter").value,q=document.querySelector("#risk-search").value.toLowerCase();document.querySelector("#iperc-body").innerHTML=risks.filter(r=>(level==="TODOS"||r[2]===level)&&(r[0]+" "+r[1]).toLowerCase().includes(q)).map(r=>`<tr><td><b>${r[0]}</b><br><small>SINTETICO DEMO</small></td><td>${r[1]}</td><td><span class="risk-level ${r[2]}">${r[2]}</span></td><td><b>${r[3]}</b></td><td>${r[4]}</td><td>${money(r[5])}</td><td>${r[6]}</td></tr>`).join("")}
function totals(){const factor=Number(document.querySelector("#effectiveness").value)/100;let avoided=0,savings=0;risks.forEach(r=>{const a=r[7]*r[8]*r[9]*factor;avoided+=a;savings+=a*r[10]-r[5]});document.querySelector("#effectiveness-label").textContent=`${Math.round(factor*100)}%`;document.querySelector("#avoided-total").textContent=avoided.toFixed(2);document.querySelector("#savings-total").textContent=money(savings);document.querySelector("#hero-avoided").textContent=avoided.toFixed(2);document.querySelector("#hero-savings").textContent=money(savings)}
document.querySelector("#hero-risk-count").textContent=risks.length;document.querySelector("#hero-critical-count").textContent=risks.filter(r=>r[2]==="CRITICO").length;
document.querySelector("#hero-chart").innerHTML=risks.slice().sort((a,b)=>b[3]-a[3]).slice(0,5).map(r=>`<div class="bar-row"><span>${r[0].slice(0,14)}</span><i style="width:${r[3]*5}px"></i><b>${r[3]}</b></div>`).join("");
document.querySelector("#sat-grid").innerHTML=sat.map(x=>`<article class="sat-card"><small>HECHO DOCUMENTADO · 2025</small><strong>${x[1].toLocaleString("es-PE")}</strong><span>${x[0]}</span></article>`).join("");
document.querySelector("#source-list").innerHTML=sources.map(s=>`<article class="source-item"><small>Consultada<br>2026-05-31</small><div><b>${s[0]}</b><br><small>${s[1]} · HECHO DOCUMENTADO</small></div><a href="${s[2]}" target="_blank" rel="noreferrer">Abrir fuente oficial</a></article>`).join("");
document.querySelector("#downloads").innerHTML=files.map(f=>`<a class="file-link" href="${f}" download><b>${f}</b><small>Descargar archivo</small></a>`).join("");
document.querySelector("#priority-filter").addEventListener("change",renderRisks);document.querySelector("#risk-search").addEventListener("input",renderRisks);document.querySelector("#effectiveness").addEventListener("input",totals);renderRisks();totals();
