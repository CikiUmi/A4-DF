/* Rutas de objeto 'Cliente' */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createCliente,
  getCliente,
  getAllClientes,
  updateCliente,
  deleteCliente
} = require('../controllers/clienteController');

router.post('/:userID', auth, createCliente);   /* Crear Cliente */
router.get('/:id', auth, getCliente);      /* Leer uno */
router.get('/', auth, getAllClientes);      /* Leer todos */
router.put('/:id', auth, updateCliente);     /* para editar el Cliente */
router.delete('/:id', auth, deleteCliente);      /* Eliminar uno */

module.exports = router;