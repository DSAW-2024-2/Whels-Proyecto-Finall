import { db } from '../Backend/firebaseConfig.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Función para registrar un nuevo usuario con contraseña hasheada
export async function registrarUsuario(nombre, apellido, username, password, email, telefono) {
    try {
        // Genera el hash de la contraseña usando bcryptjs (disponible en el contexto del navegador)
        const hashedPassword = bcrypt.hashSync(password, 10); // 10 es el número de "salt rounds" recomendado

        // Guarda el usuario en Firestore con la contraseña hasheada
        await addDoc(collection(db, "usuarios"), {
            nombre: nombre,
            apellido: apellido,
            username: username,
            password: hashedPassword, // Guarda el hash en lugar de la contraseña
            email: email,
            telefono: telefono  // Agrega el campo teléfono
        });
        return { status: 'success', message: 'Usuario registrado con éxito' };
    } catch (e) {
        console.error("Error al registrar usuario: ", e);
        return { status: 'error', message: 'Error al registrar usuario' };
    }
}

// Función para verificar las credenciales de inicio de sesión
export async function iniciarSesion(username, password) {
    try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        let usuarioEncontrado = false;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Compara el hash almacenado con la contraseña ingresada usando bcryptjs
            if (data.username === username && bcrypt.compareSync(password, data.password)) {
                usuarioEncontrado = true;
            }
        });

        if (usuarioEncontrado) {
            return { status: 'success', message: 'Inicio de sesión exitoso' };
        } else {
            return { status: 'error', message: 'Credenciales incorrectas' };
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        return { status: 'error', message: 'Error al verificar las credenciales' };
    }
}
