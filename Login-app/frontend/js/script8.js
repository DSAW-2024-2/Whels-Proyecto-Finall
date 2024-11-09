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
