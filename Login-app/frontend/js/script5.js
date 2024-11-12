document.getElementById('conductor').addEventListener('click', () => {
    // Guardar el rol de conductor en sessionStorage
    sessionStorage.setItem('role', 'conductor');
    // Redirigir al usuario a la página de registro
    window.location.href = 'index2.html';
});

document.getElementById('pasajero').addEventListener('click', () => {
    // Guardar el rol de pasajero en sessionStorage
    sessionStorage.setItem('role', 'pasajero');
    // Redirigir al usuario a la página de registro
    window.location.href = 'index2.html';
});
