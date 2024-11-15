const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { addUser, verificarCredenciales } = require('../models/userModel'); // Suponiendo que tienes estas funciones en userModel.js

// Controlador de Login
const login = (req, res) => {
    const { username, password } = req.body;
    
    // Verificar credenciales (debes definir esta función en userModel)
    const user = verificarCredenciales(username, password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
};

// Controlador de Registro
const register = async (req, res) => {
    const { username, password, role } = req.body;

    // Validación de campos requeridos
    if (!username || !password) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await addUser.findUserByUsername(username); // Verifica si ya existe
    if (existingUser) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    try {
        // Generar hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario y almacenarlo en la base de datos
        const newUser = {
            username: username,
            password: hashedPassword,
            role: role || 'usuario'  // Asigna un rol por defecto si no se proporciona
        };

        await addUser(newUser);  // Guarda el usuario en la base de datos

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

module.exports = { login, register };
