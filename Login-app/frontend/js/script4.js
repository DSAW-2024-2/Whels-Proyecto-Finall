import { registrarCarro } from './backend/carros.js';

document.getElementById("car-register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const id_usuario = sessionStorage.getItem("user_id"); // ID del usuario almacenado en sesión
    const username = document.getElementById("username").value;
    const placa = document.getElementById("placa").value;
    const foto = document.getElementById("foto").files[0];
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

    // Enviar datos a Firebase usando registrarCarro si estamos usando Firestore
    const result = await registrarCarro(id_usuario, placa, marca, modelo, año);
    if (result.status === 'success') {
        alert(result.message);
    } else {
        alert(result.message);
    }

    // Enviar datos a un servidor externo si es necesario
    // (solo si tienes un servidor adicional en localhost)
    const token = localStorage.getItem('token');
    if (token && foto) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('placa', placa);
        formData.append('foto', foto);
        formData.append('capacidad', capacidad);
        formData.append('soat', soat);
        formData.append('marca', marca);
        formData.append('modelo', modelo);

        try {
            const response = await fetch('http://localhost:3000/car/registerCar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert("¡Carro registrado exitosamente en el servidor externo!");
            } else {
                const error = await response.json();
                alert(`Error al registrar el carro en el servidor: ${error.message}`);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Hubo un problema al conectar con el servidor externo.");
        }
    }
});
