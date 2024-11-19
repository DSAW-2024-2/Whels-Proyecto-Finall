import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { db } from "./firebaseConfig.js"; // Asegúrate de que firebaseConfig.js esté en la misma carpeta

export async function saveTripToDatabase(tripData) {
    console.log("Intentando guardar en Firestore con los datos:", tripData);

    try {
        const docRef = await addDoc(collection(db, "trips"), tripData);
        console.log("Documento guardado exitosamente con ID:", docRef.id);
        return { status: "success", id: docRef.id };
    } catch (error) {
        console.error("Error al guardar el documento en Firestore:");
        console.error("Código de error:", error.code);
        console.error("Mensaje de error:", error.message);
        throw error;
    }
}
