document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación del nombre de usuario (solo letras)
    const usernamePattern = /^[A-Za-z]+$/;
    if (!usernamePattern.test(username)) {
        alert("El nombre de usuario solo debe contener letras");
        return;
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    // Si las validaciones son correctas, hacer el login
    try {
        const response = await fetch('https://tu-backend-en-vercel.vercel.app/auth/login', {  // Cambia la URL al backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            // Guardar el token si el backend lo devuelve (en caso de administradores)
            if (result.token) {
                localStorage.setItem('token', result.token);
            }
            // Redirigir o hacer algo después del inicio de sesión
            window.location.href = "/Login-app/frontend/html/Index5.html";  // Redirige a otra página tras el login
        } else {
            alert(result.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
        alert('Hubo un problema con la solicitud. Intenta más tarde.');
    }
});
