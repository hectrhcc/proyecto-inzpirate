function Fecha() {
  const fechaUTC = new Date();
  const timeZone = "America/Santiago";
  const date = new Date(fechaUTC.toLocaleString("en-US", { timeZone }));
  const formatFullDate = date.toLocaleDateString("es-CL", {
    weekday: "long", // narrow, short
    year: "numeric", // 2-digit
    month: "short", // numeric, 2-digit, narrow, long
    day: "numeric" // 2-digit
});

  // Obtener la hora actual en la zona horaria de Chile
document.getElementById("fechahoy").innerHTML = formatFullDate;
// Establecer el valor de la fecha en el input hidden del formulario
document.getElementById("fecha-input").value = formatFullDate;
console.log(formatFullDate);
}


function actualizarHora() {
  // Obtener la hora actual en la zona horaria de Chile
  const fechaUTC = new Date();
  const timeZone = "America/Santiago";
  const date = new Date(fechaUTC.toLocaleString("en-US", { timeZone }));
  // Formatear la hora actual en formato hh:mm:ss AM/PM
  const formatFullTime = date.toLocaleTimeString("es-CL", {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
  // Actualizar el contenido del elemento HTML con la hora actual
  document.getElementById("hora").innerHTML = formatFullTime;
}

// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);

/*
$(document).ready(function() {
  // Carga los datos de las horas que se han ingresado si es que se han ingresado
  $.get('/asistencia', function(asistencia) {
    actualizar(asistencia);
  });
}); no es la idea que me muestre la hora del dia anterior, solo del dia actual
*/
function marcarHora(event, spanId, btnId) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();
  // Obtener la zona horaria de Chile
  var timeZone = 'America/Santiago';
  // Crear un objeto Date con la hora actual en la zona horaria de Chile
  var fechaHora = new Date().toLocaleTimeString('es-CL', { timeZone: timeZone });
  // Actualizar el contenido del span correspondiente con la hora actual
  document.getElementById(spanId).textContent = fechaHora;
  // Desactivar el botón correspondiente
  document.getElementById(btnId).disabled = true;
  // Enviar el formulario mediante una petición AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'ruta/al/servidor');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  // Comprobar la respuesta del servidor
  if (xhr.status === 200) {
    console.log('Formulario enviado correctamente');
  } else {
    console.log('Error al enviar el formulario');
  }
  };
  xhr.send(JSON.stringify({ hora: fechaHora }));
}
/*
// Función para actualizar la tabla de actividades
function actualizarAsistencia(asistencia) {
  $('#horaentradamanana span').empty();
  asistencia.forEach(function(asis) {
    let hora1 = asis.hora_entrada_manana;
   
    $('#horaentradamanana span').append(hora1)     
    });
}
  
// Función para agregar una hora entrada de la mañana
function agregarHora1() {
  let hora_entrada_manana= $('#hora_entrada_manana').val();


  $.post('/agregar-hora', { nombre: nombre, hora_entrada_manana:hora_entrada_manana, fecha:fecha}, function() {
      // Actualiza el span de la hora después de apretar el boton
      $.get('/asistencia', function(asistencia) {
        actualizarHora(asistencia);
      });
    });
  }


// Función para guardar los datos de asistencia en un archivo excel
function guardarEnExcel(){
  // Obtiene los datos de los spans
 alert("funcionalidad aun no implementada");
  var data = [];
  
  

  // Crea un libro de Excel y agrega una hoja con los datos de la tabla
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'asistencia');

  // Descarga el archivo Excel
  XLSX.writeFile(workbook, 'asistencia.xlsx');
}


function reloadPage() {
  location.reload();
}

$(document).ready(function() {
  $("#hora_entrada_manana").click(function() {
    reloadPage();
  });


});

$('form').submit(function(event) {
  // Evita que el formulario se envíe de forma predeterminada
  event.preventDefault();
  // Envía el formulario al servidor
  agregarHora1();
  // Recarga la página
  reloadPage();
});*/