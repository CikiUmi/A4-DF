/* Rutas de objeto 'Alimento' */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {
  createAlimento,
  getAlimento,
  getAllAlimentos,
  updateAlimento,
  deleteAlimento
} = require('../controllers/alimentoController');

router.post('/', auth, createAlimento);   /* Crear Alimento */
router.get('/:id', auth, getAlimento);      /* Leer uno */
router.get('/', auth, getAllAlimentos);      /* Leer todos */
router.put('/:id', auth, updateAlimento);     /* para editar el Alimento */
router.delete('/:id', auth, deleteAlimento);      /* Eliminar uno */

module.exports = router;