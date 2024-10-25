const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidation, loginValidation } = require('../utils/validation');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../users.json');

// Función para leer el archivo users.json
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Función para escribir en el archivo users.json
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Ruta para registrar un nuevo usuario
router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, lastName, email, universityId, phone, password, isAdmin } = req.body;

    const users = readUsersFromFile();

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        username,
        lastName,
        email,
        universityId,
        phone,
        password: hashedPassword, // Guardar la contraseña encriptada
        isAdmin
    };

    users.push(newUser);

    writeUsersToFile(users);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Ruta para iniciar sesión
router.post('/login', loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const users = readUsersFromFile();

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    if (user.isAdmin) {
        const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(302).redirect('/index5.html');
    }
});

module.exports = router;
