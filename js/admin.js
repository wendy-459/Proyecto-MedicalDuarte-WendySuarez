function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const meses = {};

  usuarios.forEach(u => {
    const fecha = new Date(u.fecha);
    const mes = fecha.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!meses[mes]) meses[mes] = [];
    meses[mes].push(u);
  });

  const select = document.getElementById('mes');
  for (const mes in meses) {
    const option = document.createElement('option');
    option.value = mes;
    option.textContent = mes;
    select.appendChild(option);
  }

  select.addEventListener('change', () => mostrarUsuarios(meses[select.value]));
  if (select.options.length > 0) {
    select.selectedIndex = 0;
    mostrarUsuarios(meses[select.value]);
  }
}

function mostrarUsuarios(lista) {
  const tbody = document.querySelector('#tabla-usuarios tbody');
  tbody.innerHTML = "";
  lista.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.edad}</td>
      <td>${usuario.habitacion}</td>
      <td>${usuario.servicio}</td>
      <td>${new Date(usuario.fecha).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.onload = cargarUsuarios;
