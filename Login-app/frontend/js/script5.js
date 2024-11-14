document.getElementById('conductor').addEventListener('click', () => {
    // Guardar el rol de conductor en sessionStorage
    sessionStorage.setItem('role', 'conductor');
    // Redirigir al usuario a la página de registro de conductor
    window.location.href = 'vista_conductor.html';
});

document.getElementById('pasajero').addEventListener('click', () => {
    // Verificar si el pasajero tiene un carro registrado
    if (!isCarRegistered()) {
        alert("No tienes un carro registrado. Por favor registra un vehículo primero.");
        return; // Detener si no hay carro registrado
    }
    // Guardar el rol de pasajero en sessionStorage
    sessionStorage.setItem('role', 'pasajero');
    // Redirigir al usuario a la página de registro de pasajero
    window.location.href = 'vista_pasajero.html';
});

function isCarRegistered() {
    // Verificación simulada en sessionStorage (cambiar a base de datos si es necesario)
    return localStorage.getItem("carRegistered") === "true";
}

// Ejemplo de registro de un carro (llamar esta función cuando se registre un vehículo)
function registerCar() {
    // Registro exitoso del carro
    localStorage.setItem("carRegistered", "true");
}
