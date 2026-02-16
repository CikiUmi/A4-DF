/* Estructura del objeto 'Cuenta' */

const mongoose = require('mongoose');

const cuentaSchema = new mongoose.Schema({
  rol: {
    type: String,
    required: true,
    enum: ['usuario', 'empleado', 'admin'],
    default: 'usuario'
  },
  correo: {
    type: String,
    /* Regex para revisar que sea un correo  */
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor utiliza una dirección de correo válida.'],
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 100
  },
  password: {
    type: String,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, 'La contraseña no cumple los requisitos.'],
    /* 1 minus, 1 mayus, 1 num, 1 símbolo */
    required: true,
    minlength: 8,
    select: false, /* Para que no se pueda leer */
    maxlength: 100
  },
  lastLogin: {
    type: Date,
    default: null
  },

  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  }


});
module.exports = mongoose.model('Cuenta', cuentaSchema);
