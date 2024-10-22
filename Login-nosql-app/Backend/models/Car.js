const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    placa: { type: String, required: true },
    foto: { type: String, required: true },
    capacidad: { type: Number, required: true },
    soat: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Relación con el usuario
});

module.exports = mongoose.model('Car', carSchema);
