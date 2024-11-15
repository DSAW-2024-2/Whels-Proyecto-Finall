const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());  // Permitir solicitudes desde otros dominios (útil en desarrollo)
app.use(express.json());  // Para analizar cuerpos JSON

// Rutas
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
