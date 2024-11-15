// script7.js

// Función para alternar la visibilidad de un menú
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('show');
}

// Evento para cerrar los menús cuando se hace clic fuera de ellos
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const userMenu = document.getElementById('userMenu');
    const isClickInsideNavMenu = navMenu.contains(event.target);
    const isClickInsideUserMenu = userMenu.contains(event.target);
    const isClickOnMenuIcon = event.target.classList.contains('menu-icon');
    const isClickOnUserIcon = event.target.classList.contains('user-icon');

    // Cierra el menú de navegación si el clic es fuera de él y no en el icono
    if (!isClickInsideNavMenu && !isClickOnMenuIcon) {
        navMenu.classList.remove('show');
    }

    // Cierra el menú de usuario si el clic es fuera de él y no en el icono
    if (!isClickInsideUserMenu && !isClickOnUserIcon) {
        userMenu.classList.remove('show');
    }
});

// Función para el botón de "Editar Datos"
function editarDatos() {
    window.location.href = 'index2.html'; // Redirige a index2.html
}

// Función para el botón de "Cerrar Sesión"
function cerrarSesion() {
    window.location.href = 'index3.html'; // Redirige a index3.html
}

// Function to handle "Reservar Carro" action by redirecting to index8.html
function nuevoviaje() {
    window.location.href = 'index9.html'; // Redirect to the car reservation page
}

// Function to handle "Mis Reservas" action (placeholder)
function misViajes() {
    window.location.href = 'index11.html'; // Redirect to the car reservation page
}

// Asignación de eventos a los botones de acción
document.addEventListener('DOMContentLoaded', function() {
    const editarBtn = document.querySelector('.actions button:first-child');
    const cerrarSesionBtn = document.querySelector('.actions button:last-child');
    const nuevoviajeAction = document.querySelector('.actions .action:nth-child(1)');
    const misViajesAction = document.querySelector('.actions .action:nth-child(2)');
    
    if (editarBtn) {
        editarBtn.addEventListener('click', editarDatos);
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', cerrarSesion);
    }

    if (nuevoviajeAction) {
        nuevoviajeAction.addEventListener('click', nuevoviaje); // Cambiado a `nuevoviaje`
    }
    
    if (misViajesAction) {
        misViajesAction.addEventListener('click', misViajes);
    }
});
