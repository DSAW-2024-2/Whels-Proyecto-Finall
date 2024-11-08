document.getElementById('car-register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const placa = document.getElementById('placa').value;
    const foto = document.getElementById('foto').files[0];
    const capacidad = document.getElementById('capacidad').value;
    const soat = document.getElementById('soat').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;

    // Validación de la placa (solo letras y números)
    const placaPattern = /^[A-Za-z0-9]+$/;
    if (!placaPattern.test(placa)) {
        alert("La placa del vehículo solo debe contener letras y números");
        return;
    }

    // Validación de la capacidad (solo números)
    if (isNaN(capacidad) || capacidad <= 0) {
        alert("La capacidad del vehículo debe ser un número válido mayor que 0");
        return;
    }

    // Validación del número de SOAT (solo letras y números)
    const soatPattern = /^[A-Za-z0-9]+$/;
    if (!soatPattern.test(soat)) {
        alert("El número de SOAT solo debe contener letras y números");
        return;
    }

    // Validación de la marca y el modelo (solo letras)
    const marcaModeloPattern = /^[A-Za-z]+$/;
    if (!marcaModeloPattern.test(marca)) {
        alert("La marca solo debe contener letras");
        return;
    }
    if (!marcaModeloPattern.test(modelo)) {
        alert("El modelo solo debe contener letras");
        return;
    }

    // Crear el objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append('username', username);
    formData.append('placa', placa);
    formData.append('foto', foto);
    formData.append('capacidad', capacidad);
    formData.append('soat', soat);
    formData.append('marca', marca);
    formData.append('modelo', modelo);

// Obtener el token del almacenamiento local
const token = localStorage.getItem('token');

try {
    // Enviar los datos al servidor
    const response = await fetch('http://localhost:3000/car/registerCar', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (response.ok) {
        const result = await response.text();
        alert("¡Carro registrado exitosamente!");
        console.log(result);
    } else {
        const error = await response.json();
        console.error("Error:", error);
        alert(`Error al registrar el carro: ${error.message}`);
    }
} catch (error) {
    console.error("Error de conexión:", error);
    alert("Hubo un problema al conectar con el servidor.");
}
});
