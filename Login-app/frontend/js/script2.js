document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Evitar el envío del formulario hasta que todas las validaciones pasen

    // Obtener los valores de los campos del formulario
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const lastname = document.getElementById("lastname").value;
    const studentId = document.getElementById("student-id").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    // Validación del correo electrónico (debe terminar en @unisabana.edu.co)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@unisabana\.edu\.co$/;
    if (!emailPattern.test(email)) {
        alert("El correo electrónico debe terminar en @unisabana.edu.co");
        return;
    }

    // Validación del nombre y apellido (solo letras)
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(username)) {
        alert("El nombre solo debe contener letras");
        return;
    }
    if (!namePattern.test(lastname)) {
        alert("El apellido solo debe contener letras");
        return;
    }

    // Validación del ID Universitario (solo números)
    const idPattern = /^[0-9]+$/;
    if (!idPattern.test(studentId)) {
        alert("El ID Universitario debe contener solo números");
        return;
    }

    // Validación del teléfono (solo números)
    const phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
        alert("El número de teléfono solo debe contener números");
        return;
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    // Si todas las validaciones pasan, enviar los datos al backend
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
            console.log('Usuario registrado exitosamente:', data);
            window.location.href = "/Login-app/frontend/html/index5.html";
        } else {
            console.error('Error al registrar usuario:', data);
            alert('Error al registrar usuario. Intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema con la solicitud. Intenta más tarde.');
    }
});
