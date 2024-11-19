import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCoCyh3VoVptjJaGwslhqFYoI9yvikPxLM",
    authDomain: "whelsapp.firebaseapp.com",
    projectId: "whelsapp",
    storageBucket: "whelsapp.appspot.com",
    messagingSenderId: "75156650165",
    appId: "1:75156650165:web:6104370bb47ed4bf6f26fc",
    measurementId: "G-0M5KV57G9G"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
