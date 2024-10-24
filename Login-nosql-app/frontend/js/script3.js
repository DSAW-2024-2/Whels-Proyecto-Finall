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
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
        alert('Inicio de sesión exitoso');
        // Aquí puedes redirigir o hacer algo después del inicio de sesión
    } else {
        alert(result.message || 'Error al iniciar sesión');
    }
});
