import { db } from './firebaseConfig.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Importa addDoc y collection

// Función para registrar un nuevo carro
export async function registrarCarro(id_usuario, placa, marca, modelo, año, capacidad, soat) {
    try {
        await addDoc(collection(db, "carros"), {
            id_usuario: id_usuario,
            placa: placa,
            marca: marca,
            modelo: modelo,
            año: año,
            capacidad: capacidad,
            soat: soat
        });
        return { status: 'success', message: 'Carro registrado con éxito en Firebase' };
    } catch (e) {
        console.error("Error al registrar el carro: ", e);
        return { status: 'error', message: 'Error al registrar el carro en Firebase' };
    }
}
