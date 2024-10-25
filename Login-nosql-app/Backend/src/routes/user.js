const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { loginValidation } = require('../utils/validation');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../users.json');

// Función para leer el archivo users.json
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

// Inicio de sesión
router.post('/login', loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Leer usuarios del archivo JSON
    const users = readUsersFromFile();

    // Buscar al usuario por nombre de usuario
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;
