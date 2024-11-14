// Mostrar la confirmación de cancelación
function showCancelConfirmation() {
    document.getElementById("cancel-confirmation").classList.remove("hidden");
    document.getElementById("cancel-confirmation").classList.add("visible");
}

// Confirmar la cancelación y mostrar el mensaje de éxito
function confirmCancellation() {
    closeModal();
    document.getElementById("cancel-success").classList.remove("hidden");
    document.getElementById("cancel-success").classList.add("visible");

    // Ocultar el mensaje de éxito después de 2 segundos
    setTimeout(() => {
        document.getElementById("cancel-success").classList.remove("visible");
        document.getElementById("cancel-success").classList.add("hidden");
    }, 2000);
}

// Cerrar cualquier modal activo
function closeModal() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    });
}
// Función para alternar la visibilidad de un menú
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('active');
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
        navMenu.classList.remove('active');
    }

    // Cierra el menú de usuario si el clic es fuera de él y no en el icono
    if (!isClickInsideUserMenu && !isClickOnUserIcon) {
        userMenu.classList.remove('active');
    }
});
