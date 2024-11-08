const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { addUser, findUserByUsername } = require('../models/userModel');

const register = async (req, res) => {
    const { username, password, role } = req.body;

    if (findUserByUsername(username)) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = addUser(username, hashedPassword, role);
    res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
};

module.exports = { login, register };
