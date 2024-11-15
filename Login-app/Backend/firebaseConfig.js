import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCoCyh3VoVptjJaGwslhqFYoI9yvikPxLM",
    authDomain: "whelsapp.firebaseapp.com",
    projectId: "whelsapp",
    storageBucket: "whelsapp.appspot.com",  // Asegúrate de que esté corregido aquí
    messagingSenderId: "75156650165",
    appId: "1:75156650165:web:6104370bb47ed4bf6f26fc",
    measurementId: "G-0M5KV57G9G"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firestore y exportarlo como `db`
const db = getFirestore(app);
export { db };
