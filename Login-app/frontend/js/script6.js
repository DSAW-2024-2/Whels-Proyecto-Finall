// script6.js

// Function to toggle the visibility of a menu, closing the other if open
function toggleMenu(menuId) {
    const navMenu = document.getElementById('navMenu');
    const userMenu = document.getElementById('userMenu');
    const menu = document.getElementById(menuId);

    // Close the other menu if it's open
    if (menuId === 'navMenu') userMenu.classList.remove('show');
    if (menuId === 'userMenu') navMenu.classList.remove('show');

    // Toggle the selected menu
    menu.classList.toggle('show');
}

// Event to close menus when clicking outside of them
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const userMenu = document.getElementById('userMenu');
    const isClickInsideNavMenu = navMenu.contains(event.target);
    const isClickInsideUserMenu = userMenu.contains(event.target);
    const isClickOnMenuIcon = event.target.classList.contains('menu-icon');
    const isClickOnUserIcon = event.target.classList.contains('user-icon');

    // Close the navigation menu if clicked outside and not on the menu icon
    if (!isClickInsideNavMenu && !isClickOnMenuIcon) {
        navMenu.classList.remove('show');
    }

    // Close the user menu if clicked outside and not on the user icon
    if (!isClickInsideUserMenu && !isClickOnUserIcon) {
        userMenu.classList.remove('show');
    }
});

// Function for the "Editar Datos" button
function editarDatos() {
    window.location.href = 'index2.html'; // Redirect to edit data page
}

// Function for the "Cerrar Sesión" button
function cerrarSesion() {
    window.location.href = 'index3.html'; // Redirect to logout page
}

// Function to handle "Reservar Carro" action by redirecting to index8.html
function reservarCarro() {
    window.location.href = 'index8.html'; // Redirect to the car reservation page
}

// Function to handle "Mis Reservas" action (placeholder)
function verReservas() {
    alert("Funcionalidad para ver reservas próximamente");
}

// Assign event listeners to action buttons
document.addEventListener('DOMContentLoaded', function() {
    const editarBtn = document.querySelector('.actions button:first-child');
    const cerrarSesionBtn = document.querySelector('.actions button:last-child');
    const reservarCarroAction = document.querySelector('.actions .action:nth-child(1)');
    const verReservasAction = document.querySelector('.actions .action:nth-child(2)');

    if (editarBtn) {
        editarBtn.addEventListener('click', editarDatos);
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', cerrarSesion);
    }

    if (reservarCarroAction) {
        reservarCarroAction.addEventListener('click', reservarCarro);
    }

    if (verReservasAction) {
        verReservasAction.addEventListener('click', verReservas);
    }
});
