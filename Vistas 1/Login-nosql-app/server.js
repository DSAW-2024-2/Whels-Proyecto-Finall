const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar body-parser para leer datos JSON en el cuerpo de las solicitudes
app.use(bodyParser.json());

// Conectar a MongoDB (local o MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/local/usuarios', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir el esquema del usuario en MongoDB
const userSchema = new mongoose.Schema({
    nombre_usuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', userSchema);

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ nombre_usuario: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El usuario ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con la contraseña encriptada
        const newUser = new Usuario({
            nombre_usuario: username,
            contrasena: hashedPassword
        });

        await newUser.save();
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por nombre de usuario
        const user = await Usuario.findOne({ nombre_usuario: username });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const validPassword = await bcrypt.compare(password, user.contrasena);

        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        res.json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
