/* Rutas para autenticación */
const express = require('express');
const router = express.Router();

const {
  registro,
  login
} = require('../controllers/authController');

router.post('/register', registro);   /* Registrar cuenta */
router.post('/login', login);      /* Iniciar sesión */

module.exports = router;