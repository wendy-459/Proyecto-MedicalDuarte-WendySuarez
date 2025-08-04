document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const edadInput = document.getElementById('edad');
  const edad = parseInt(edadInput.value); // Convertir la edad a número entero

  // Validar que la edad no sea mayor a 12 años
  if (edad > 12) {
    alert("¡Error! La edad no puede ser mayor de 12 años.");
    edadInput.focus(); 
    return; 
  }

  const usuario = {
    nombre: document.getElementById('nombre').value,
    edad: edad, 
    habitacion: document.getElementById('habitacion').value,
    servicio: document.getElementById('servicio').value,
    fecha: new Date().toISOString()
  };

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  window.location.href = "guia.html";
});