document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const tableBody = document.querySelector("#tableBody tbody");

  // Cargar datos del localStorage al cargar la página
  cargarDatos();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const item = document.getElementById("item").value;
    const precio = document.getElementById("precio").value;
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value;

    if (item && precio && fecha && descripcion) {
      agregarItem(item, precio, fecha, descripcion);
      form.reset();
    } else {
      alert("Por favor complete todos los campos.");
    }
  });

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("eliminar")) {
      const row = e.target.parentElement.parentElement;
      const item = row.firstElementChild.textContent;
      eliminarItem(item);
    }
  });

  function agregarItem(item, precio, fecha, descripcion) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${item}</td>
      <td>${precio}</td>
      <td>${fecha}</td>
      <td>${descripcion}</td>
      <td><button class="eliminar">Eliminar</button></td>
    `;
    tableBody.appendChild(newRow);

    guardarDatos();
  }

  function eliminarItem(item) {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(function (row) {
      if (row.firstElementChild.textContent === item) {
        row.remove();
      }
    });

    guardarDatos();
  }

  function guardarDatos() {
    const rows = tableBody.querySelectorAll("tr");
    const datos = [];

    rows.forEach(function (row) {
      const item = row.children[0].textContent;
      const precio = row.children[1].textContent;
      const fecha = row.children[2].textContent;
      const descripcion = row.children[3].textContent;

      datos.push({ item, precio, fecha, descripcion });
    });

    localStorage.setItem("gastos", JSON.stringify(datos));
  }

  function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem("gastos"));

    if (datos) {
      datos.forEach(function (dato) {
        agregarItem(dato.item, dato.precio, dato.fecha, dato.descripcion);
      });
    }
  }
});
