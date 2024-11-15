import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCoCyh3VoVptjJaGwslhqFYoI9yvikPxLM",
    authDomain: "whelsapp.firebaseapp.com",
    projectId: "whelsapp",
    storageBucket: "whelsapp.firebasestorage.app",
    messagingSenderId: "75156650165",
    appId: "1:75156650165:web:6104370bb47ed4bf6f26fc",
    measurementId: "G-0M5KV57G9G"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('username').value;  // Cambiado a "email"
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
        window.location.href = '/Login-app/frontend/html/Index5.html'; // Ruta completa desde la raíz del servidor
    } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
    }
        
    /*
    // Bloque de código para el inicio de sesión en el backend de Vercel (comentado)
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
    */
});
