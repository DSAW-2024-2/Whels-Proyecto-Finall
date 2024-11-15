const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);    // Emite el token JWT
router.post('/register', register); // Registro de usuario

module.exports = router;
