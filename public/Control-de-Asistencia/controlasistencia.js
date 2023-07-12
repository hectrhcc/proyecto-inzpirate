// Obtener elementos HTML
const personaEl = document.getElementById('persona');
const horaIngresoMananaEl = document.getElementById('horaIngresoManana');
const horaSalidaMananaEl = document.getElementById('horaSalidaManana');
const horaIngresoTardeEl = document.getElementById('horaIngresoTarde');
const horaSalidaTardeEl = document.getElementById('horaSalidaTarde');
const fechaEl = document.getElementById('fecha');
const nombreEl = document.getElementById('nombre');
const agregarAsistenciaBtn = document.getElementById('agregarAsistencia');
const guardarEnPdfBtn = document.getElementById('guardarEnPdf');
const verRegistrosBtn = document.getElementById('verRegistros');

// Función para obtener la hora actual
function obtenerHoraActual() {
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  const horaTexto = `${hora < 10 ? '0' : ''}${hora}`;
  const minutosTexto = `${minutos < 10 ? '0' : ''}${minutos}`;
  const segundosTexto = `${segundos < 10 ? '0' : ''}${segundos}`;

  const fechaTexto = `${horaTexto}:${minutosTexto}:${segundosTexto}`;

  return fechaTexto;
}

// Función para mostrar los datos de asistencia en la página
function mostrarAsistencia(asistencia) {
  horaIngresoMananaEl.textContent = asistencia.horaIngresoManana || '-';
  horaSalidaMananaEl.textContent =asistencia.horaSalidaManana || '-';
  horaIngresoTardeEl.textContent = asistencia.horaIngresoTarde || '-';
  horaSalidaTardeEl.textContent = asistencia.horaSalidaTarde || '-';
  fechaEl.textContent = asistencia.fecha;
  nombreEl.textContent = asistencia.nombre;
}

// Función para marcar la asistencia
function marcarAsistencia() {
  const nombre = personaEl.value;
  const fechaActual = new Date();
  const horaActual = obtenerHoraActual();
  const fechaTexto = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

  const asistencia = {
    nombre,
    fecha: fechaTexto,
    horaIngresoManana: horaIngresoMananaEl.textContent === '-' ? horaActual : horaIngresoMananaEl.textContent,
    horaSalidaManana: horaSalidaMananaEl.textContent === '-' ? null : horaActual,
    horaIngresoTarde: horaIngresoTardeEl.textContent === '-' ? null : horaActual,
    horaSalidaTarde: horaSalidaTardeEl.textContent === '-' ? null : horaActual
  };

  // Guardar asistencia en localStorage
  const asistencias = JSON.parse(localStorage.getItem('asistencias') || '{}');
  asistencias[nombre] = asistencia;
  localStorage.setItem('asistencias', JSON.stringify(asistencias));

  // Mostrar asistencia en la página
  mostrarAsistencia(asistencia);
}

// Función para guardar los datos de asistencia en un archivo PDF
function guardarEnPdf() {
  // Implementar código para guardar en PDF
  alert('Funcionalidad no implementada');
}

// Función para ver los registros de asistencia
function verRegistros() {
  // Implementar código para ver registros
  alert('Funcionalidad no implementada');
}

// Obtener datos de asistencia del localStorage si existen
const asistencias = JSON.parse(localStorage.getItem('asistencias') || '{}');
const nombre = Object.keys(asistencias)[0];
if (nombre) {
  mostrarAsistencia(asistencias[nombre]);
}

// Agregar eventos de click a los botones
agregarAsistenciaBtn.addEventListener('click', marcarAsistencia);
guardarEnPdfBtn.addEventListener('click', guardarEnPdf);
verRegistrosBtn.addEventListener('click', verRegistros);