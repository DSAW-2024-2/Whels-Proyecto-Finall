const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  lastname: { type: String, required: true }, // Agregado
  studentId: { type: String, required: true, unique: true }, // Agregado
  phone: { type: String, required: true }, // Agregado
  password: { type: String, required: true },
  // Lista de coches asociados al usuario
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

// Hashing de contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
