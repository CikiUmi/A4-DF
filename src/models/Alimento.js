/* Estructura del objeto 'Alimento' */

const mongoose = require('mongoose');

const alimentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  informacion: [
    {
      descripcion: {
        type: String,
        required: true
      },
      ingredientes: {
        type: String,
        required: true
      },
      infoNutrimental: {
        type: String,
        required: true
      }
    }
  ],

  imagen : {
    type: String,
    required: true
  },

  categoria: {
    type: String,
    required: true,
    enum: ['Bebida', 'Alimento', 'Repostería']
  },

  costoUnitario: {
    type: Number,
    required: true,
    min: 1
  },

  existencias: {
    type: Number,
    required: true,
    min: 1
  }
  });
  module.exports = mongoose.model('Alimento', alimentoSchema);
