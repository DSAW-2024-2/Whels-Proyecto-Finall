// Evento click para el botón de "Conductor"
document.getElementById('btn-conductor').addEventListener('click', () => {
    // Verificar si el conductor tiene un carro registrado
    if (!isCarRegistered()) {
        alert("No tienes un carro registrado. Por favor registra un vehículo primero.");
        return; // Detener si no hay carro registrado
    }
    // Guardar el rol de conductor en sessionStorage
    sessionStorage.setItem('role', 'conductor');
    // Redirigir al usuario a la página de vista de conductor
    window.location.href = '/frontend/html/index7.html';
});

// Evento click para el botón de "Pasajero"
document.getElementById('btn-pasajero').addEventListener('click', () => {
    // Guardar el rol de pasajero en sessionStorage
    sessionStorage.setItem('role', 'pasajero');
    // Redirigir al usuario a la página de vista de pasajero
    window.location.href = '/Login-app/frontend/html/index6.html';
});

// Función para verificar si un carro está registrado
function isCarRegistered() {
    // Verificación simulada en localStorage (cambiar a base de datos si es necesario)
    return localStorage.getItem("carRegistered") === "true";
}

// Ejemplo de registro de un carro (llamar esta función cuando se registre un vehículo)
function registerCar() {
    // Registro exitoso del carro
    localStorage.setItem("carRegistered", "true");
}
