const express = require('express');
const multer = require('multer');
const Car = require('../models/Car');
const User = require('../models/User');
const router = express.Router();

// Configuración para cargar imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardan las fotos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Registro de coche
router.post('/register', upload.single('foto'), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }); // Usuario al que se asociará el coche
        if (!user) return res.status(400).send('Usuario no encontrado');
        
        const newCar = new Car({
            placa: req.body.placa,
            foto: req.file.path, // Ruta de la foto
            capacidad: req.body.capacidad,
            soat: req.body.soat,
            marca: req.body.marca,
            modelo: req.body.modelo,
            usuario: user._id
        });
        await newCar.save();
        res.send('Coche registrado exitosamente');
    } catch (error) {
        res.status(400).send('Error al registrar coche');
    }
});

module.exports = router;
