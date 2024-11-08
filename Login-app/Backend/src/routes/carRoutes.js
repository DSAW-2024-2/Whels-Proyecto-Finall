const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { findUserByUsername } = require('../models/userModel');
const router = express.Router();

router.post('/registerCar', authMiddleware, (req, res) => {
    const { user } = req;
    const { carro } = req.body;

    const usuario = findUserByUsername(user.username);

    // Verifica si el usuario es conductor y si ya tiene un carro registrado
    if (usuario.role !== 'conductor') {
        return res.status(403).json({ error: 'Solo los conductores pueden registrar un carro' });
    }

    if (usuario.carro) {
        return res.status(400).json({ error: 'Ya tienes un carro registrado' });
    }

    // Registra el carro en el perfil del usuario
    usuario.carro = carro;
    res.status(200).json({ message: 'Carro registrado exitosamente', carro: usuario.carro });
});

module.exports = router;
