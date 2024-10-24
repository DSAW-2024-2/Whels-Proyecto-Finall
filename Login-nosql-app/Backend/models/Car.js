const mongoose = require('mongoose');

// Definir el esquema del coche
const carSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true },
  carImage: { type: String }, // Podría ser una URL o el nombre del archivo
  capacity: { type: Number, required: true },
  soatNumber: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Car', carSchema);
