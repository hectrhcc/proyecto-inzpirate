//Selecciona el elemento select
let selectNombre = document.getElementById("select-nombre");
// Agrega un listener para el evento "change" del select
selectNombre.addEventListener("change", function() {
  // Obtiene el valor seleccionado
  let seleccion = selectNombre.value;
  // Imprime el valor seleccionado en la consola para verificar que se haya capturado correctamente
  console.log("El usuario seleccionó: " + seleccion); //***este dato se envia al server
});
//Muestra la fecha en formato lunes, 17 de jul de 2023
function Fecha() {
  const fechaUTC = new Date();
  const timeZone = "America/Santiago";
  const date = new Date(fechaUTC.toLocaleString("en-US", { timeZone }));
  const formatFullDate = date.toLocaleDateString("es-CL", {
    weekday: "long", // narrow, short
    year: "numeric", // 2-digit
    month: "short", // numeric, 2-digit, narrow, long
    day: "numeric" // 2-digit
    //obtener la fecha que me interesa ingresa en formato de bbdd
});

  // Obtener la hora actual en la zona horaria de Chile
document.getElementById("fechahoy").innerHTML = formatFullDate;
// Establecer el valor de la fecha en el input hidden del formulario
//Obtiene la fecha pero en el formato mas simple: 17-07-2023
}

function obtenerFecha() {
  const fechaUTC = new Date();
  const timeZone = "America/Santiago";
  const date = new Date(fechaUTC.toLocaleString("en-US", { timeZone }));
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const anio = date.getFullYear().toString();
  const fecha = `${anio}-${mes}-${dia}`;
  return fecha;
}

document.getElementById("fecha").value = obtenerFecha();
console.log("fechax:", obtenerFecha());//***este dato me sirve pal formulario

var fechax=obtenerFecha();

//Muestra la hora y luego de la funcion la actualiza cada segundo
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
  document.getElementById("horahora").innerHTML = formatFullTime;
}
// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);


function marcarHora1(event, spanId, btnId,fecha) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();
  // Obtener la zona horaria de Chile
  var timeZone = 'America/Santiago';
  // Crear un objeto Date con la hora actual en la zona horaria de Chile
  var fechaHora = new Date().toLocaleTimeString('es-CL', { timeZone: timeZone });
  // Actualizar el contenido del span correspondiente con la hora actual
  document.getElementById(spanId).textContent = fechaHora; //es la hora
  document.getElementById('fecha').value = fechax;
  document.getElementById("hora").value = fechaHora;  
  
  if(!selectNombre.value){
    alert("Selecciona un nombre por favor 🙀 "); 
    console.log("estoy aqui:"+selectNombre.value);
  }
    // Desactivar el botón correspondiente
  else{
    document.getElementById(btnId).disabled = true;
    agregarHora1();
  }  
}


function marcarHora2(event, spanId, btnId,fecha) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();
  // Obtener la zona horaria de Chile
  var timeZone = 'America/Santiago';
  // Crear un objeto Date con la hora actual en la zona horaria de Chile
  var fechaHora = new Date().toLocaleTimeString('es-CL', { timeZone: timeZone });
  // Actualizar el contenido del span correspondiente con la hora actual
  document.getElementById(spanId).textContent = fechaHora; //es la hora
  document.getElementById('fecha').value = fechax;
  document.getElementById("hora2").value = fechaHora; //seteo la hora pa la bbdd 
  
  if(!selectNombre.value){
    alert("Selecciona un nombre por favor 🙀 "); 
    console.log("estoy aqui:"+selectNombre.value);
  }
    // Desactivar el botón correspondiente
  else{
    document.getElementById(btnId).disabled = true;
    agregarHora2();
  }  
}

function marcarHora3(event, spanId, btnId,fecha) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();
  // Obtener la zona horaria de Chile
  var timeZone = 'America/Santiago';
  // Crear un objeto Date con la hora actual en la zona horaria de Chile
  var fechaHora = new Date().toLocaleTimeString('es-CL', { timeZone: timeZone });
  // Actualizar el contenido del span correspondiente con la hora actual
  document.getElementById(spanId).textContent = fechaHora; //es la hora
  document.getElementById('fecha').value = fechax;
  document.getElementById("hora3").value = fechaHora;  
  
  if(!selectNombre.value){
    alert("Selecciona un nombre por favor 🙀 "); 
    console.log("estoy aqui:"+selectNombre.value);
  }
    // Desactivar el botón correspondiente
  else{
    document.getElementById(btnId).disabled = true;
    agregarHora3();
  }  
}

function marcarHora4(event, spanId, btnId,fecha) {
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();
  // Obtener la zona horaria de Chile
  var timeZone = 'America/Santiago';
  // Crear un objeto Date con la hora actual en la zona horaria de Chile
  var fechaHora = new Date().toLocaleTimeString('es-CL', { timeZone: timeZone });
  // Actualizar el contenido del span correspondiente con la hora actual
  document.getElementById(spanId).textContent = fechaHora; //es la hora
  document.getElementById('fecha').value = fechax;
  document.getElementById("hora4").value = fechaHora;  
  
  if(!selectNombre.value){
    alert("Selecciona un nombre por favor 🙀 "); 
    console.log("estoy aqui:"+selectNombre.value);
  }
    // Desactivar el botón correspondiente
  else{
    document.getElementById(btnId).disabled = true;
    agregarHora4();
  }  
}


// Función para agregar una nueva hora entrada mañana
function agregarHora1() {
  let nombre = $('#select-nombre').val();
  let hora_entrada_manana = $('#hora').val();
  let fecha = $('#fecha').val();
  console.log("nombre:"+nombre);//ok
  console.log("hora:"+hora_entrada_manana); //ok  
  console.log("fecha:"+fecha);//ok    
  $.post('/agregar-hora', { nombre: nombre, hora_entrada_manana:hora_entrada_manana, fecha:fecha}, function() {
    
  });
  }


// Función para agregar una nueva hora salida mañana
function agregarHora2() {
  let nombre = $('#select-nombre').val();
  let hora_salida_manana = $('#hora2').val();
  let fecha = $('#fecha').val();
  console.log("nombre:"+nombre);//ok
  console.log("hora salida mañana:"+hora_salida_manana); //ok  
  console.log("fecha:"+fecha);//ok    
  $.post('/agregar-hora2', { nombre: nombre, hora_salida_manana:hora_salida_manana, fecha:fecha}, function() {
    
  });
  }

// Función para agregar una nueva hora entrada tarde
function agregarHora3() {
  let nombre = $('#select-nombre').val();
  let hora_entrada_tarde = $('#hora3').val();
  let fecha = $('#fecha').val();
  console.log("nombre:"+nombre);//ok
  console.log("hora entrada tarde:"+hora_entrada_tarde); //ok  
  console.log("fecha:"+fecha);//ok    
  $.post('/agregar-hora3', { nombre: nombre, hora_entrada_tarde:hora_entrada_tarde, fecha:fecha}, function() {
    
  });
  }

// Función para agregar una nueva hora salida tarde
function agregarHora4() {
  let nombre = $('#select-nombre').val();
  let hora_salida_tarde = $('#hora4').val();
  let fecha = $('#fecha').val();
  console.log("nombre:"+nombre);//ok
  console.log("hora salida tarde:"+hora_salida_tarde); //ok  
  console.log("fecha:"+fecha);//ok    
  $.post('/agregar-hora4', { nombre: nombre, hora_salida_tarde:hora_salida_tarde, fecha:fecha}, function() {
    
  });
  }


function reloadPage() {
  location.reload();
}

function guardarEnExcel() {
  // Obtener las horas
  let hora1 = document.getElementById("horaentradamanana").textContent;
  let hora2 = document.getElementById("horasalidamanana").textContent;
  let hora3 = document.getElementById("horaentradatarde").textContent;
  let hora4 = document.getElementById("horasalidatarde").textContent;

  // Crear un objeto JSON con las horas
  let horas = [
    { Hora: hora1, Jornada: "Entrada mañana" },
    { Hora: hora2, Jornada: "Salida mañana" },
    { Hora: hora3, Jornada: "Entrada tarde" },
    { Hora: hora4, Jornada: "Salida tarde" }
  ];

  // Crear un archivo Excel
  let workbook = XLSX.utils.book_new();
  let worksheet = XLSX.utils.json_to_sheet(horas);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Horas");

  // Descargar el archivo
  let fecha = new Date().toISOString().slice(0, 10);
  let filename = "horas_" + fecha + ".xlsx";
  let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buffer], { type: "application/octet-stream" }), filename);
}