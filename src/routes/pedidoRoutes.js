/* Rutas de objeto 'Pedido' */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createPedido,
  getPedido,
  getAllPedidos,
  updatePedido,
  deletePedido
} = require('../controllers/pedidoController');

router.post('/:carritoID', auth, createPedido);   /* Crear pedido */
router.get('/:id', auth, getPedido);      /* Leer uno */
router.get('/', auth, getAllPedidos);      /* Leer todos */
router.put('/:id', auth, updatePedido);     /* para editar el pedido */
router.delete('/:id', auth, deletePedido);      /* Eliminar uno */

module.exports = router;