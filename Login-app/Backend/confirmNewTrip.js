async function confirmNewTrip() {
    const pickup = document.getElementById("pickup").value; // Punto de partida
    const destination = document.getElementById("destination").value; // Punto de llegada
    const seats = document.getElementById("seats").value; // Cupos disponibles

    if (!pickup || !destination || !seats) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Validación: el punto de partida y llegada no pueden ser iguales
    if (pickup === destination) {
        alert("El punto de partida y llegada no pueden ser iguales.");
        return;
    }

    try {
        // Guardar el viaje en Firebase
        const tripData = {
            pickup,
            destination,
            seats: parseInt(seats),
            driverId: sessionStorage.getItem("userId"), // ID del conductor desde la sesión
            timestamp: new Date().toISOString(), // Fecha y hora del viaje
        };

        const response = await saveTripToDatabase(tripData);

        if (response.status === "success") {
            alert("Viaje creado exitosamente.");
            window.location.href = "/home/conductor"; // Redirigir al inicio del conductor
        } else {
            alert("Hubo un error al guardar el viaje. Por favor intenta nuevamente.");
        }
    } catch (error) {
        console.error("Error al guardar el viaje:", error);
        alert("Hubo un problema al guardar el viaje. Por favor, intenta más tarde.");
    }
}
