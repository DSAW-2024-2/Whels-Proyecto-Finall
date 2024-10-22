require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Agrega este console.log para verificar si MONGO_URI está definida
console.log('Mongo URI:', process.env.MONGO_URI);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Rutas
app.use('/auth', authRoutes);
app.use('/car', carRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
