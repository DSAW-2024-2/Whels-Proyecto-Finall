import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { db } from "../../Backend/firebaseConfig.js";

let currentTripId = null; // Variable global para almacenar el ID del viaje seleccionado

// Función para cargar y mostrar la lista de viajes desde Firestore
async function loadTrips() {
    try {
        const tripCollection = collection(db, "trips");
        const tripSnapshot = await getDocs(tripCollection);

        const container = document.getElementById('passenger-list-container');
        container.innerHTML = ''; // Limpiar contenedor antes de renderizar

        tripSnapshot.forEach(docSnapshot => {
            const trip = docSnapshot.data();
            const tripId = docSnapshot.id; // ID del documento Firestore

            // Crear una tarjeta para cada viaje
            const tripCard = document.createElement('div');
            tripCard.classList.add('trip-card');
            tripCard.setAttribute('data-id', tripId);

            tripCard.innerHTML = `
                <div class="trip-info">
                    <p><strong>Ruta:</strong> ${trip.pickup} ➔ ${trip.destination}</p>
                    <p><strong>Cupos:</strong> ${trip.seats}</p>
                    <p><strong>Conductor:</strong> ${trip.driverId}</p>
                    <p><strong>Fecha:</strong> ${new Date(trip.timestamp).toLocaleString()}</p>
                </div>
            `;

            // Añadir evento para mostrar modal al hacer clic
            tripCard.addEventListener('click', () => {
                console.log(`Clic detectado en el viaje con ID: ${tripId}`);
                confirmCancellation(tripId); // Llamar al modal
            });

            // Agregar la tarjeta al contenedor
            container.appendChild(tripCard);
        });

        if (tripSnapshot.empty) {
            container.innerHTML = '<p>No hay viajes creados.</p>';
        }
    } catch (error) {
        console.error("Error al cargar los viajes:", error);
        alert("Error al cargar los viajes. Consulta la consola para más detalles.");
    }
}

// Función para mostrar el modal de confirmación
function confirmCancellation(tripId) {
    currentTripId = tripId; // Guardar el ID del viaje seleccionado
    const modal = document.getElementById('cancel-confirmation');
    modal.classList.remove('hidden'); // Mostrar el modal
    console.log(`Modal mostrado para el viaje con ID: ${tripId}`);
}

// Función para eliminar un viaje de Firestore
async function deleteTrip() {
    try {
        console.log(`Eliminando viaje con ID: ${currentTripId}`);
        await deleteDoc(doc(db, "trips", currentTripId));
        closeModal(); // Cerrar modal después de eliminar
        alert("El viaje ha sido eliminado con éxito.");
        loadTrips(); // Recargar los viajes
    } catch (error) {
        console.error("Error al eliminar el viaje:", error);
        alert("Error al eliminar el viaje. Consulta la consola para más detalles.");
    }
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById("cancel-confirmation");
    modal.classList.add("hidden"); // Oculta el modal
}

// Evento al cargar la página para configurar botones y cargar los viajes
document.addEventListener("DOMContentLoaded", () => {
    // Carga los viajes al iniciar la página
    loadTrips();

    // Asigna la función de cerrar modal al botón de "No"
    document.querySelector(".deny-btn").addEventListener("click", closeModal);
});

// Función para alternar la visibilidad de un menú (hamburguesa)
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle("active");
}

// Evento para cerrar los menús al hacer clic fuera de ellos
document.addEventListener("click", function (event) {
    const navMenu = document.getElementById("navMenu");
    const userMenu = document.getElementById("userMenu");
    const isClickInsideNavMenu = navMenu.contains(event.target);
    const isClickInsideUserMenu = userMenu.contains(event.target);
    const isClickOnMenuIcon = event.target.classList.contains("menu-icon");
    const isClickOnUserIcon = event.target.classList.contains("user-icon");

    if (!isClickInsideNavMenu && !isClickOnMenuIcon) {
        navMenu.classList.remove("active");
    }

    if (!isClickInsideUserMenu && !isClickOnUserIcon) {
        userMenu.classList.remove("active");
    }
});
