// Usamos 'DOMContentLoaded' para asegurarnos de que todo el HTML ha sido cargado
// antes de que nuestro JavaScript intente manipularlo. Es una buena práctica.
document.addEventListener('DOMContentLoaded', function() {

  // --- SIMULACIÓN DE BASE DE DATOS ---
  // En un proyecto real, esta información vendría de un servidor.
  // Aquí, creamos un usuario válido para poder probar el login.
  const usuarioValido = {
    usuario: 'sebas',
    contrasena: '12345'
  };

  // --- SELECCIÓN DE ELEMENTOS DEL DOM (LOGIN) ---
  // Guardamos en variables los elementos del formulario de login que vamos a necesitar.
  const loginForm = document.getElementById('login-form');
  const loginUsuarioInput = document.getElementById('login-usuario');
  const loginContrasenaInput = document.getElementById('login-contrasena');

  // --- SELECCIÓN DE ELEMENTOS DEL DOM (REGISTRO) ---
  const registerForm = document.getElementById('register-form');
  const registerUsuarioInput = document.getElementById('register-usuario');
  const registerEmailInput = document.getElementById('register-email');
  const registerContrasenaInput = document.getElementById('register-contrasena');
  const registerRepetirContrasenaInput = document.getElementById('register-repetir-contrasena');

  // --- LÓGICA PARA EL FORMULARIO DE LOGIN ---
  // Añadimos un "oyente de eventos" que se activará cuando se intente enviar el formulario.
  loginForm.addEventListener('submit', function(event) {
    // event.preventDefault() es CRUCIAL. Evita que el formulario se envíe de la forma tradicional
    // (recargando la página), permitiéndonos manejarlo con JavaScript.
    event.preventDefault();

    // Obtenemos los valores que el usuario escribió en los campos de texto.
    // .trim() elimina espacios en blanco al principio y al final.
    const usuarioIngresado = loginUsuarioInput.value.trim();
    const contrasenaIngresada = loginContrasenaInput.value.trim();

    // --- Validación de campos ---
    if (usuarioIngresado === '' || contrasenaIngresada === '') {
      // Si algún campo está vacío, mostramos una alerta.
      alert('Por favor, completa todos los campos.');
      return; // Detenemos la ejecución de la función aquí.
    }

    // --- Verificación de credenciales ---
    if (usuarioIngresado === usuarioValido.usuario && contrasenaIngresada === usuarioValido.contrasena) {
      // Si el usuario y la contraseña coinciden con nuestro usuario válido...
      alert('¡Inicio de sesión exitoso! Bienvenido, ' + usuarioValido.usuario + '.');
      // En un caso real, aquí redirigiríamos al usuario a su página de perfil.
      // Por ejemplo: window.location.href = 'perfil.html';
    } else {
      // Si los datos no coinciden...
      alert('Usuario o contraseña incorrectos.');
    }
  }); // hasta aquí llega el oyente del formulario de login.


  // --- LÓGICA PARA EL FORMULARIO DE REGISTRO ---
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitamos que la página se recargue.

    // Obtenemos todos los valores del formulario de registro.
    const usuario = registerUsuarioInput.value.trim();
    const email = registerEmailInput.value.trim();
    const contrasena = registerContrasenaInput.value.trim();
    const repetirContrasena = registerRepetirContrasenaInput.value.trim();

    // --- Validaciones ---
    if (usuario === '' || email === '' || contrasena === '' || repetirContrasena === '') {
      alert('Por favor, completa todos los campos del registro.');
      return;
    }

    if (contrasena !== repetirContrasena) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
    
    // Aquí podrías añadir más validaciones, como la fortaleza de la contraseña.

    // Si todas las validaciones pasan...
    alert('¡Registro exitoso para el usuario: ' + usuario + '! Ahora puedes iniciar sesión con tus datos.');
    registerForm.reset(); // Limpia los campos del formulario de registro.
  });

});