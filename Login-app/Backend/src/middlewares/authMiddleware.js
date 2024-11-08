const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = decoded;  // Incluye el rol y el nombre de usuario
        next();
    });
};

module.exports = authMiddleware;
