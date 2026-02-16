/* Rutas de objeto 'Carrito' */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createCarrito,
  getCarrito,
  updateCarrito,
  updateAlimentosCarrito,
  deleteCarrito
} = require('../controllers/carritoController');

router.post('/:clienteID', auth, createCarrito);   /* Crear Carrito */
router.get('/:id', auth, getCarrito);      /* Leer uno */
router.put('/:id', auth, updateCarrito);     /* para editar el Carrito */
router.put('/:id/:alimentoID', auth, updateAlimentosCarrito);     /* Añadir producto al carrito */
router.delete('/:id', auth, deleteCarrito);      /* Eliminar uno */


module.exports = router;