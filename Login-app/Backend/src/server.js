const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');  // Importa las rutas de autenticación
const userRoutes = require('./routes/user');  // Importa las rutas de usuario

// Configurar dotenv para manejar las variables de entorno
dotenv.config();

const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public' (si la tienes)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', authRoutes);  // Rutas de autenticación bajo /auth
app.use('/user', userRoutes);  // Rutas de usuario bajo /user

// Ruta para la raíz (/), para que no se produzca el error "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Obtener el puerto desde las variables de entorno, o usar el 3000 para local
const PORT = process.env.PORT || 3000;

// Iniciar el servidor en el puerto correspondiente
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
