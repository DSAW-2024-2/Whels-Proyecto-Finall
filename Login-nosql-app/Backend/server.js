require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

const app = express();
const port = 3000;

// Configurar middleware de sesión
app.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true
}));

// Middleware para manejar peticiones POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Rutas para los archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para la pantalla de carga
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../loading screen/index1.html'));
});

// Incluir rutas para autenticación y manejo de coches
app.use('/auth', authRoutes); // Rutas para login
app.use('/car', carRoutes);   // Rutas para coches

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
