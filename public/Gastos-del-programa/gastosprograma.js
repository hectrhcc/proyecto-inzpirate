$(document).ready(function() {
    // Carga los datos por primera vez cuando la página se carga
    $.get('/gastos', function(gastos) {
      actualizarTabla(gastos);
    });
  });

// Función para actualizar la tabla de actividades
function actualizarTabla(gastos) {
    $('#tableBody tbody').empty();
    gastos.forEach(function(gasto) {
      let item = gasto.nombre; // como se llama en la bbdd
      let precio = gasto.precio;  
      let fecha = gasto.fecha;
      const fecha1 = new Date(fecha);
      // Convertir a zona Chile
      fecha1.setTime(fecha1.getTime() + fecha1.getTimezoneOffset()*60*1000);
      // Formatear fecha
      const fechacl= fecha1.toLocaleDateString("es-CL");
      let descripcion = gasto.descripcion;  

      $('#tableBody tbody').append('<tr>')      
      $('#tableBody tbody tr:last').append('<td>'+item+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+precio+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+fechacl+'</td>')     
      $('#tableBody tbody tr:last').append('<td>'+descripcion+'</td>')     
      $('#tableBody tbody tr:last').append('</tr>')  
    });
  }
    
// Función para agregar una nueva actividad
  function agregarGastos() {
    let item = $('#item').val();
    let precio = $('#precio').val();
    let fecha = $('#fecha').val();
    let descripcion = $('#descripcion').val();

    $.post('/agregar-gastos', { item: item, precio:precio, fecha: fecha, descripcion:descripcion}, function() {
        // Actualiza la tabla de actividades después de agregar una nueva actividad
        $.get('/gastos', function(gastos) {
          actualizarTabla(gastos);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'gastos');
    // Descarga el archivo Excel
    XLSX.writeFile(workbook, 'gastos.xlsx');
  }
  
  
  function reloadPage() {
    location.reload();
  }
  
  $(document).ready(function() {
    $("#agregarItem").click(function() {
      reloadPage();
    });
  });
  
  $('form').submit(function(event) {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();
    // Envía el formulario al servidor
    agregarGastos();
    // Recarga la página
    reloadPage();
  });