$(document).ready(function() {
    // Carga los datos por primera vez cuando la página se carga
    $.get('/agendasemanal', function(agendasemanal) {
      actualizarTabla(agendasemanal);
    });
  });

// Función para actualizar la tabla de actividades
function actualizarTabla(agendasemanal) {
    $('#tableBody tbody').empty();
    agendasemanal.forEach(function(agenda) {
      let persona = agenda.persona;
      let tarea = agenda.tarea;  
      const fechainicio = agenda.fechainicio;  
     // Obtener fecha de la DB 
     const fechafinal = agenda.fechafinal;
     // Crear objeto Date 
     const fecha1 = new Date(fechainicio);
     const fecha2 = new Date(fechafinal);
     // Convertir a zona Chile
     fecha1.setTime(fecha1.getTime() + fecha1.getTimezoneOffset()*60*1000);
     // Formatear fecha
     const fechaini = fecha1.toLocaleDateString("es-CL");
     // Convertir a zona Chile
     fecha2.setTime(fecha2.getTime() + fecha2.getTimezoneOffset()*60*1000);
     // Formatear fecha
     const fechafin = fecha2.toLocaleDateString("es-CL");
  
      $('#tableBody tbody').append('<tr>')      
      $('#tableBody tbody tr:last').append('<td>'+persona+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+tarea+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+fechaini+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+fechafin+'</td>')            
      $('#tableBody tbody tr:last').append('</tr>')  
    });
  }
    
// Función para agregar una nueva actividad
  function agregarSemana() {
    let persona = $('#persona').val();
    let tarea = $('#tarea').val();
    let fechainicio = $('#fechainicio').val();
    let fechafinal = $('#fechafinal').val();

    $.post('/agregar-semana', { persona: persona, tarea:tarea, fechainicio: fechainicio, fechafinal: fechafinal }, function() {
        // Actualiza la tabla de actividades después de agregar una nueva actividad
        $.get('/agendasemanal', function(agendasemanal) {
          actualizarTabla(agendasemanal);
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
    XLSX.writeFile(workbook, 'tareasemanal.xlsx');
  }
  
  
  function reloadPage() {
    location.reload();
  }
  
  $(document).ready(function() {
    $("#tareasemanal").click(function() {
      reloadPage();
    });
  });
  
  $('form').submit(function(event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();
    // Envía el formulario al servidor
    agregarSemana();
    // Recarga la página
    reloadPage();
  });