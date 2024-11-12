// Datos de ejemplo de los pasajeros
const passengers = [
    { parada: "Calle 153", nombre: "Pasajero A", telefono: "3000000001" },
    { parada: "Calle 152", nombre: "Pasajero B", telefono: "3000000002" },
    { parada: "Calle 151", nombre: "Pasajero C", telefono: "3000000003" }
];

// Función para renderizar la lista de pasajeros en el contenedor
function renderPassengerList() {
    const container = document.getElementById('passenger-list-container');

    passengers.forEach(passenger => {
        // Crear la tarjeta de cada pasajero
        const passengerCard = document.createElement('div');
        passengerCard.classList.add('passenger-card');

        // Ícono del pasajero
        const icon = document.createElement('span');
        icon.classList.add('passenger-icon');
        icon.innerHTML = "&#128100;"; // Icono de pasajero

        // Detalles del pasajero
        const details = document.createElement('div');
        details.classList.add('passenger-details');
        details.innerHTML = `
            <p><strong>Parada:</strong> ${passenger.parada}</p>
            <p><strong>Nombre:</strong> ${passenger.nombre}</p>
            <p><strong>Teléfono:</strong> ${passenger.telefono}</p>
        `;

        // Agregar el ícono y los detalles a la tarjeta de pasajero
        passengerCard.appendChild(icon);
        passengerCard.appendChild(details);

        // Agregar la tarjeta de pasajero al contenedor
        container.appendChild(passengerCard);
    });
}

// Llamar a la función para renderizar la lista de pasajeros cuando se carga la página
renderPassengerList();

// Función para mostrar el modal de confirmación de cancelación
function showCancelConfirmation() {
    document.getElementById("cancel-confirmation").classList.remove("hidden");
    document.getElementById("cancel-confirmation").classList.add("visible");
}

// Confirmar la cancelación del viaje
function confirmCancellation() {
    closeModal();

    // Ocultar la tarjeta principal de viaje y la lista de pasajeros
    document.querySelector(".trip-card").style.display = "none";
    document.getElementById("passenger-list-container").style.display = "none";

    // Mostrar mensaje de éxito
    document.getElementById("cancel-success").classList.remove("hidden");
    document.getElementById("cancel-success").classList.add("visible");

    // Ocultar el mensaje de éxito después de 2 segundos
    setTimeout(() => {
        document.getElementById("cancel-success").classList.remove("visible");
        document.getElementById("cancel-success").classList.add("hidden");
    }, 2000);
}

// Cerrar el modal activo
function closeModal() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("visible");
        modal.classList.add("hidden");
    });
}
