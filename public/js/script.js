const apiUrlLibros = 'http://localhost:3000/libros';
const apiUrlMiembros = 'http://localhost:3000/miembros';

// Función para cargar todos los libros
async function loadLibros() {
  const response = await fetch(apiUrlLibros);
  const libros = await response.json();
  
  const itemTableBody = document.getElementById('tabla-libros').querySelector('tbody');
  itemTableBody.innerHTML = ''; // Limpia la tabla

  libros.forEach(libro => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.genero}</td>
      <td>${libro.anio}</td>
      <td>${libro.disponible ? 'Disponible' : 'No Disponible'}</td>
      <td>
        <button onclick="editarLibro(${libro.id})">Editar</button>
        <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
      </td>
    `;
    itemTableBody.appendChild(row);
  });
}

// Función para cargar todos los miembros
async function loadMiembros() {
  const response = await fetch(apiUrlMiembros);
  const miembros = await response.json();
  
  const itemTableBody = document.getElementById('tabla-miembros').querySelector('tbody');
  itemTableBody.innerHTML = ''; // Limpia la tabla

  miembros.forEach(miembro => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${miembro.nombre}</td>
      <td>${miembro.id}</td>
      <td>
        <button onclick="editarMiembro(${miembro.id})">Editar</button>
        <button onclick="eliminarMiembro(${miembro.id})">Eliminar</button>
      </td>
    `;
    itemTableBody.appendChild(row);
  });
}

// Función para guardar un libro
async function guardarLibro(event) {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const genero = document.getElementById('genero').value;
  const anio = document.getElementById('anio').value;

  const data = { titulo, autor, genero, anio };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  await fetch(apiUrlLibros, options);
  loadLibros();
}

// Función para guardar un miembro
async function guardarMiembro(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre-miembro').value;
  const id = document.getElementById('id-miembro').value;

  const data = { nombre, id };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  await fetch(apiUrlMiembros, options);
  loadMiembros();
}

// Inicializa el evento de envío del formulario
document.getElementById('form-libros').addEventListener('submit', guardarLibro);
document.getElementById('form-miembros').addEventListener('submit', guardarMiembro);
document.addEventListener("DOMContentLoaded", () => {
  loadLibros();
  loadMiembros();
});