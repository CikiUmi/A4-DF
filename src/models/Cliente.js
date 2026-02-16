  /* Estructura del objeto 'Cliente' */

  const mongoose = require('mongoose');

  const clienteSchema = new mongoose.Schema({

    cuenta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cuenta',               // id de cuenta
      required: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    membresia: {
      type: String,
      required: true,
      enum: ['Sin Membresía', 'Básica', 'Café Fan'],
      default: 'Sin Membresía'
    },
    lastPedido: {
      type: Date
    }


  });
  module.exports = mongoose.model('Cliente', clienteSchema);
