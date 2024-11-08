const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
app.use('/car', carRoutes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;
