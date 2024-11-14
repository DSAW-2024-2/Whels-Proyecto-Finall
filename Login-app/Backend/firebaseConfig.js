// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCoCyh3VoVtpjJaGwslhqFYtoIyyikPxLM",
    authDomain: "whelsapp.firebaseapp.com",
    projectId: "whelsapp",
    storageBucket: "whelsapp.appspot.com",
    messagingSenderId: "75156650165",
    appId: "1:75156650165:web:6104370bb47ed4bf6f26fc",
    measurementId: "G-M5KV5769GG"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
