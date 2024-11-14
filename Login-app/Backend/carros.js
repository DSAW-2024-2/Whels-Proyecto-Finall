import { db } from './firebaseConfig.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Función para registrar un carro
export async function registrarCarro(id_usuario, placa, marca, modelo, año) {
    try {
        await addDoc(collection(db, "carros"), {
            id_usuario: id_usuario,
            placa: placa,
            marca: marca,
            modelo: modelo,
            año: año
        });
        return { status: 'success', message: 'Carro registrado con éxito' };
    } catch (e) {
        console.error("Error al registrar carro: ", e);
        return { status: 'error', message: 'Error al registrar carro' };
    }
}
