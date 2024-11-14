import { registrarCarro } from '../../backend/carros.js';

// Manejo del envío del formulario
document.getElementById("car-register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const id_usuario = sessionStorage.getItem("user_id"); // ID del usuario autenticado
    const placa = document.getElementById("placa").value;
    const capacidad = document.getElementById("capacidad").value;
    const soat = document.getElementById("soat").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const año = document.getElementById("año").value;

    // Validaciones
    const placaPattern = /^[A-Za-z0-9]+$/;
    if (!placaPattern.test(placa)) {
        alert("La placa del vehículo solo debe contener letras y números");
        return;
    }

    if (isNaN(capacidad) || capacidad <= 0) {
        alert("La capacidad del vehículo debe ser un número válido mayor que 0");
        return;
    }

    const soatPattern = /^[A-Za-z0-9]+$/;
    if (!soatPattern.test(soat)) {
        alert("El número de SOAT solo debe contener letras y números");
        return;
    }

    const marcaModeloPattern = /^[A-Za-z]+$/;
    if (!marcaModeloPattern.test(marca)) {
        alert("La marca solo debe contener letras");
        return;
    }
    if (!marcaModeloPattern.test(modelo)) {
        alert("El modelo solo debe contener letras");
        return;
    }

    // Llamar a registrarCarro sin el campo de imagen
    const result = await registrarCarro(id_usuario, placa, marca, modelo, año, capacidad, soat);
    if (result.status === 'success') {
        alert(result.message);

        // Redirigir al menú de conductor
        window.location.href = "index7.html"; // Cambia "menu_conductor.html" a la URL correcta del menú de conductor
    } else {
        alert(result.message);
    }
});
