document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("#tableBody tbody");

  // Cargar datos del localStorage al cargar la página
  cargarDatos();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const persona = document.getElementById("persona").value;
    const tarea = document.getElementById("tarea").value;
    const mes = document.getElementById("mes").value;

    if (persona && tarea && mes) {
      agregarTarea(persona, tarea, mes);
      form.reset();
    } else {
      alert("Por favor complete todos los campos.");
    }
  });

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("eliminar")) {
      const row = e.target.parentElement.parentElement;
      const persona = row.children[0].textContent;
      eliminarTarea(persona);
    }
  });

  function agregarTarea(persona, tarea, mes) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${persona}</td>
      <td>${tarea}</td>
      <td>${mes}</td>
      <td><button class="eliminar">Eliminar</button></td>
    `;
    tableBody.appendChild(newRow);

    guardarDatos();
  }

  function eliminarTarea(persona) {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(function (row) {
      if (row.firstElementChild.textContent === persona) {
        row.remove();
      }
    });

    guardarDatos();
  }

  function guardarDatos() {
    const rows = tableBody.querySelectorAll("tr");
    const datos = [];

    rows.forEach(function (row) {
      const persona = row.children[0].textContent;
      const tarea = row.children[1].textContent;
      const mes = row.children[2].textContent;

      datos.push({ persona, tarea, mes });
    });

    localStorage.setItem("agenda", JSON.stringify(datos));
  }

  function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem("agenda"));

    if (datos) {
      datos.forEach(function (dato) {
        agregarTarea(dato.persona, dato.tarea, dato.mes);
      });
    }
  }
});
