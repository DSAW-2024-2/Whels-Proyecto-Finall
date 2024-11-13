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



function showTrips(routeName) {
    document.getElementById('route-selection').classList.remove('active');
    document.getElementById('trip-available').classList.add('active');
    console.log(`Showing trips for: ${routeName}`);
}

function showTripDetails() {
    document.getElementById('trip-available').classList.remove('active');
    document.getElementById('trip-details').classList.add('active');
}

function confirmReservation() {
    document.getElementById('trip-details').classList.remove('active');
    document.getElementById('confirm-reservation').classList.add('active');
}

function makeReservation(confirm) {
    document.getElementById('confirm-reservation').classList.remove('active');
    document.getElementById('reservation-result').classList.add('active');
    document.getElementById('reservation-message').textContent = confirm ? 
        "Tu reserva fue hecha correctamente" : "Lo sentimos, hubo un error con tu reserva";
}

function goBack() {
    document.getElementById('trip-available').classList.remove('active');
    document.getElementById('route-selection').classList.add('active');
}

function goBackToTrips() {
    document.getElementById('trip-details').classList.remove('active');
    document.getElementById('trip-available').classList.add('active');
}

function goToHome() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById('route-selection').classList.add('active');
}

function confirmCancellation() {
    document.getElementById('my-reservations').classList.remove('active');
    document.getElementById('confirm-cancellation').classList.add('active');
}

function cancelReservation(confirm) {
    document.getElementById('confirm-cancellation').classList.remove('active');
    document.getElementById('cancellation-result').classList.add('active');
    document.getElementById('cancellation-message').textContent = confirm ? 
        "Reserva cancelada con éxito" : "No se pudo cancelar la reserva";
}

function goBackToHome() {
    document.getElementById('my-reservations').classList.remove('active');
    document.getElementById('route-selection').classList.add('active');
}
