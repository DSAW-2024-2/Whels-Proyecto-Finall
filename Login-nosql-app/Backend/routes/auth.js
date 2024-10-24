const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            lastname: req.body.lastname,  // Asegúrate de incluir estos campos
            studentId: req.body.studentId,
            phone: req.body.phone,
            password: hashedPassword
        });
        await newUser.save();
        res.send('Usuario registrado exitosamente');
    } catch (error) {
        res.status(400).send('Error al registrar usuario');
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('Usuario no encontrado');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Contraseña incorrecta');

        req.session.userId = user._id;  // Guardamos el userId en la sesión
        res.send('Inicio de sesión exitoso');
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
