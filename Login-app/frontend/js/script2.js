import { registrarUsuario } from '../../backend/usuarios.js';

document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const lastname = document.getElementById("lastname").value;
    const studentId = document.getElementById("universityId").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    // Validaciones
    const emailPattern = /^[a-zA-Z0-9._%+-]+@unisabana\.edu\.co$/;
    if (!emailPattern.test(email)) {
        alert("El correo electrónico debe terminar en @unisabana.edu.co");
        return;
    }

    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(username)) {
        alert("El nombre solo debe contener letras");
        return;
    }
    if (!namePattern.test(lastname)) {
        alert("El apellido solo debe contener letras");
        return;
    }

    const idPattern = /^[0-9]+$/;
    if (!idPattern.test(studentId)) {
        alert("El ID Universitario debe contener solo números");
        return;
    }

    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
        alert("El número de teléfono solo debe contener números");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    // Obtén el rol desde sessionStorage
    const role = sessionStorage.getItem('role');

    // Registro en Firebase usando registrarUsuario (incluyendo el campo `phone`)
    const result = await registrarUsuario(username, lastname, studentId, password, email, phone);
    if (result.status === 'success') {
        alert(result.message);

        // Redirigir según el rol
        if (role === 'pasajero') {
            window.location.href = '/home/pasajero'; // Página principal del pasajero
        } else if (role === 'conductor') {
            window.location.href = '/home/conductor'; // Página principal del conductor
        } else {
            alert('Error: Rol no seleccionado. Vuelve a seleccionar el rol.');
            window.location.href = '/login'; // Redirigir a selección de rol si no está definido
        }

    } else {
        alert(result.message);
    }

    // Opción para registro en servidor externo (si es necesario)
    /*
    try {
        const response = await fetch('https://tu-backend-en-vercel.vercel.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                lastName: lastname,
                email,
                universityId: studentId,
                phone,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registro completado exitosamente");
        } else {
            console.error('Error al registrar usuario:', data);
            alert('Error al registrar usuario. Intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema con la solicitud. Intenta más tarde.');
    }
    */
});
