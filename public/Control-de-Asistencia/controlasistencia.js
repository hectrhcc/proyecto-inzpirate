// Obtener la fecha actual en UTC
var fechaUTC = new Date();
// Ajustar la fecha a la zona horaria de Chile (UTC-3)
fechaUTC.setHours(fechaUTC.getHours() - 3);
// Obtener la fecha en formato de cadena de texto
var fechaChile = fechaUTC.toLocaleDateString();
// Mostrar la fecha en el elemento span
document.getElementById("fechahoy").innerHTML = fechaChile;
// Establecer el valor de la fecha en el input hidden del formulario
document.getElementById("fecha-input").value = fechaChile;

//console.log(fechaChile);
//console.log("fecha-input"+fecha-input);



$(document).ready(function() {
  // Carga los datos por primera vez cuando la página se carga
  $.get('/asistencia', function(asistencia) {
    actualizarTabla(asistencia);
  });
});

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


  $.post('/agregar-hora', { persona: persona, hora_entrada_manana:hora_entrada_manana}, function() {
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

/*
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