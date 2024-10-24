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
router.post('/register', upload.single('carImage'), async (req, res) => { // Corregido el campo para la imagen
    try {
        const user = await User.findById(req.session.userId); // Encontrar el usuario en la sesión
        if (!user) return res.status(400).send('Usuario no encontrado');
        
        const newCar = new Car({
            licensePlate: req.body.licensePlate,
            carImage: req.file.path, // Ruta de la foto
            capacity: req.body.capacity,
            soatNumber: req.body.soatNumber,
            brand: req.body.brand,
            model: req.body.model,
            owner: user._id
        });
        await newCar.save();
        res.send('Coche registrado exitosamente');
    } catch (error) {
        res.status(400).send('Error al registrar coche');
    }
});

module.exports = router;
