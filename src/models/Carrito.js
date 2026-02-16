/* Estructura del objeto 'Carrito' */

const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({

  
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuenta',               // id de usuario
    required: true
  },
  alimentos: [
    {
      alimento: {
        type: mongoose.Schema.Types.ObjectId, //id
        ref: 'Alimento',
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      },

      subtotal: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],

  precioTotal: {
    type: Number,
    required: true,
    min: 0
  },
  });
  module.exports = mongoose.model('Carrito', carritoSchema);
