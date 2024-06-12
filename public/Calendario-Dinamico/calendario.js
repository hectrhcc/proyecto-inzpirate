document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("#tableBody tbody");

  // Cargar datos del localStorage al cargar la página
  cargarDatos();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const actividad = document.getElementById("actividad").value;
    const lugar = document.getElementById("lugar").value;
    const comuna = document.getElementById("comuna").value;
    const fecha = document.getElementById("fecha").value;

    if (actividad && lugar && comuna && fecha) {
      agregarActividad(actividad, lugar, comuna, fecha);
      form.reset();
    } else {
      alert("Por favor complete todos los campos.");
    }
  });

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("eliminar")) {
      const row = e.target.parentElement.parentElement;
      const actividad = row.children[0].textContent;
      eliminarActividad(actividad);
    }
  });

  function agregarActividad(actividad, lugar, comuna, fecha) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${actividad}</td>
      <td>${lugar}</td>
      <td>${comuna}</td>
      <td>${fecha}</td>
      <td><button class="eliminar">Eliminar</button></td>
    `;
    tableBody.appendChild(newRow);

    guardarDatos();
  }

  function eliminarActividad(actividad) {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(function (row) {
      if (row.firstElementChild.textContent === actividad) {
        row.remove();
      }
    });

    guardarDatos();
  }

  function guardarDatos() {
    const rows = tableBody.querySelectorAll("tr");
    const datos = [];

    rows.forEach(function (row) {
      const actividad = row.children[0].textContent;
      const lugar = row.children[1].textContent;
      const comuna = row.children[2].textContent;
      const fecha = row.children[3].textContent;

      datos.push({ actividad, lugar, comuna, fecha });
    });

    localStorage.setItem("calendario_actividades", JSON.stringify(datos));
  }

  function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem("calendario_actividades"));

    if (datos) {
      datos.forEach(function (dato) {
        agregarActividad(dato.actividad, dato.lugar, dato.comuna, dato.fecha);
      });
    }
  }
});
