// Usamos 'DOMContentLoaded' para asegurarnos de que todo el HTML ha sido cargado
// antes de que nuestro JavaScript intente manipularlo. Es una buena práctica.
document.addEventListener('DOMContentLoaded', function() {

  // --- SIMULACIÓN DE BASE DE DATOS ---
  const usuarioValido = {
    usuario: 'sebas',
    contrasena: '12345'
  };

  // --- SELECCIÓN DE ELEMENTOS DEL DOM (LOGIN) ---
  const loginForm = document.querySelector('.login-container form');
  const loginUsuarioInput = document.getElementById('login-usuario');
  const loginContrasenaInput = document.getElementById('login-contrasena');

  // --- SELECCIÓN DE ELEMENTOS DEL DOM (REGISTRO) ---
  const registerForm = document.querySelector('.register-container form');
  const registerUsuarioInput = document.getElementById('register-usuario');
  const registerEmailInput = document.getElementById('register-email');
  const registerContrasenaInput = document.getElementById('register-contrasena');
  const registerRepetirContrasenaInput = document.getElementById('register-repetir-contrasena');

  // --- FUNCIONES DE VALIDACIÓN ---
  // Valida que el correo tenga formato correcto
  function esCorreoValido(correo) {
    // Expresión regular básica para validar correo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  }

  // Valida que la contraseña tenga al menos 5 caracteres, una letra y un número
  function esContrasenaSegura(contrasena) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(contrasena);
  }

  // --- LÓGICA PARA EL FORMULARIO DE LOGIN ---
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioIngresado = loginUsuarioInput.value.trim();
    const contrasenaIngresada = loginContrasenaInput.value.trim();

    // Validación: campos vacíos
    if (usuarioIngresado === '' || contrasenaIngresada === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Validación: usuario y contraseña mínimo 4 caracteres
    if (usuarioIngresado.length < 4) {
      alert('El usuario debe tener al menos 4 caracteres.');
      return;
    }
    if (contrasenaIngresada.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Validación: usuario y contraseña correctos
    if (usuarioIngresado === usuarioValido.usuario && contrasenaIngresada === usuarioValido.contrasena) {
      alert('¡Inicio de sesión exitoso! Bienvenido, ' + usuarioValido.usuario + '.');
      // Aquí podrías redirigir a otra página si lo deseas
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });

  // --- LÓGICA PARA EL FORMULARIO DE REGISTRO ---
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = registerUsuarioInput.value.trim();
    const email = registerEmailInput.value.trim();
    const contrasena = registerContrasenaInput.value.trim();
    const repetirContrasena = registerRepetirContrasenaInput.value.trim();

    // Validación: campos vacíos
    if (usuario === '' || email === '' || contrasena === '' || repetirContrasena === '') {
      alert('Por favor, completa todos los campos del registro.');
      return;
    }

    // Validación: usuario mínimo 4 caracteres
    if (usuario.length < 4) {
      alert('El usuario debe tener al menos 4 caracteres.');
      return;
    }

    // Validación: correo con formato correcto
    if (!esCorreoValido(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Validación: contraseña segura
    if (!esContrasenaSegura(contrasena)) {
      alert('La contraseña debe tener al menos 5 caracteres, incluir una letra y un número.');
      return;
    }

    // Validación: contraseñas iguales
    if (contrasena !== repetirContrasena) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    // Validación: usuario ya registrado (simulación)
    if (usuario === usuarioValido.usuario) {
      alert('Ese usuario ya está registrado. Por favor, elige otro nombre de usuario.');
      return;
    }

    alert('¡Registro exitoso para el usuario: ' + usuario + '! Ahora puedes iniciar sesión con tus datos.');
    registerForm.reset();
  });

});