import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Función para registrar un nuevo usuario
export async function registrarUsuario(nombre, apellido, username, password, email) {
    try {
        await addDoc(collection(db, "usuarios"), {
            nombre: nombre,
            apellido: apellido,
            username: username,
            password: password, // Asegúrate de encriptar la contraseña antes de almacenar
            email: email
        });
        return { status: 'success', message: 'Usuario registrado con éxito' };
    } catch (e) {
        console.error("Error al registrar usuario: ", e);
        return { status: 'error', message: 'Error al registrar usuario' };
    }
}

// Función para verificar las credenciales de inicio de sesión
export async function iniciarSesion(username, password) {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    let usuarioEncontrado = false;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username === username && data.password === password) {
            usuarioEncontrado = true;
        }
    });

    if (usuarioEncontrado) {
        return { status: 'success', message: 'Inicio de sesión exitoso' };
    } else {
        return { status: 'error', message: 'Credenciales incorrectas' };
    }
}
