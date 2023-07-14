$(document).ready(function() {
    // Carga los datos por primera vez cuando la página se carga
    $.get('/agendames', function(agendames) {
      actualizarTabla(agendames);
    });
  });

// Función para actualizar la tabla de actividades
function actualizarTabla(agendames) {
    $('#tableBody tbody').empty();
    agendames.forEach(function(agenda) {
      let persona = agenda.persona;
      let tarea = agenda.tarea;  
      let mes = agenda.mes;  
     
      $('#tableBody tbody').append('<tr>')      
      $('#tableBody tbody tr:last').append('<td>'+persona+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+tarea+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+mes+'</td>')     
      $('#tableBody tbody tr:last').append('</tr>')  
    });
  }
    
// Función para agregar una nueva actividad
  function agregarMes() {
    let persona = $('#persona').val();
    let tarea = $('#tarea').val();
    let mes = $('#mes').val();

    $.post('/agregar-mes', { persona: persona, tarea:tarea, mes: mes}, function() {
        // Actualiza la tabla de actividades después de agregar una nueva actividad
        $.get('/agendames', function(agendames) {
          actualizarTabla(agendames);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendasemanal');
  
    // Descarga el archivo Excel
    XLSX.writeFile(workbook, 'tareamensual.xlsx');
  }
  
  
  function reloadPage() {
    location.reload();
  }
  
  $(document).ready(function() {
    $("#tareamensual").click(function() {
      reloadPage();
    });
  });
  
  $('form').submit(function(event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();
    // Envía el formulario al servidor
    agregarMes();
    // Recarga la página
    reloadPage();
  });