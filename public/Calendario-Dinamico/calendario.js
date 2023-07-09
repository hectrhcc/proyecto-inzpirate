$(document).ready(function() {
  // Carga los datos por primera vez cuando la página se carga
  $.get('/actividades', function(actividades) {
    actualizarTabla(actividades);
  });
});

// Función para actualizar la tabla de actividades
function actualizarTabla(actividades) {
  $('#tableBody tbody').empty();
  actividades.forEach(function(actividad) {
    let nombre = actividad.actividad;
    let direccion = actividad.direccion;  
    let comuna = actividad.comuna;  
    let fecha = new Date(actividad.fecha);
    // Formatea la fecha
    let fechaFormateada = fecha.toLocaleDateString('es-CL');
 
    $('#tableBody tbody').append('<tr>')      
    $('#tableBody tbody tr:last').append('<td>'+nombre+'</td>')     
    $('#tableBody tbody tr:last').append('<td>'+direccion+'</td>')     
    $('#tableBody tbody tr:last').append('<td>'+comuna+'</td>')     
    $('#tableBody tbody tr:last').append('<td>'+fechaFormateada+'</td>')            
    $('#tableBody tbody tr:last').append('</tr>')  
  });
}

// Función para agregar una nueva actividad
function agregarActividad() {
  var actividad = $('#actividad').val();
  var direccion = $('#lugar').val();
  var comuna = $('#comuna').val();
  var fecha = $('#fecha').val();
  
  $.post('/agregar-actividad', { actividad: actividad, direccion: direccion, comuna: comuna, fecha: fecha }, function() {
    // Actualiza la tabla de actividades después de agregar una nueva actividad
    $.get('/actividades', function(actividades) {
      actualizarTabla(actividades);
    });
  });
}
/*
// Función para borrar una actividad existente
function borrarActividad(id) {
  $.post('/borrar-actividad', { id: id }, function() {
    // Actualiza la tabla de actividades después de borrar una actividad
    $.get('/actividades', function(actividades) {
      actualizarTabla(actividades);
    });
  });
}*/
function descargarExcel() {
  // Obtiene los datos de la tabla
  var data = [];
  $('#tableBody tbody tr').each(function(i, row) {
    var rowData = [];
    $(row).find('td').each(function(j, cell) {
      rowData.push($(cell).text());
    });
    data.push(rowData);
  });

  // Crea un libro de Excel y agrega una hoja con los datos de la tabla
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Actividades');

  // Descarga el archivo Excel
  XLSX.writeFile(workbook, 'actividades.xlsx');
}