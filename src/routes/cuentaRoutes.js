/* Rutas de objeto 'Cuenta' */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createCuenta,
  updateCuenta,
  getCuenta,
  deleteCuenta
} = require('../controllers/cuentaController');

router.post('/', auth, createCuenta);   /* Crear Cuenta */
router.get('/:id', auth, getCuenta);      /* Leer uno */
router.put('/:id', auth, updateCuenta);     /* para editar el Cuenta */
router.delete('/:id', auth, deleteCuenta);      /* Eliminar uno */

module.exports = router;