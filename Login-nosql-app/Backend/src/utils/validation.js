const { check } = require('express-validator');

// Validación para el registro
const registerValidation = [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('lastName').not().isEmpty().withMessage('El apellido es requerido'),
    check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('universityId').not().isEmpty().withMessage('El ID universitario es requerido'),
    check('phone').not().isEmpty().withMessage('El número de teléfono es requerido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validación para el inicio de sesión
const loginValidation = [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').not().isEmpty().withMessage('La contraseña es requerida')
];

module.exports = {
    registerValidation,
    loginValidation
};
