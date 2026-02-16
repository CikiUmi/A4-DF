/* Config y app, rutas, coneexión a db. etx */
const dotenv = require('dotenv'); /* variables entorno */
const express = require('express'); /* server */
const cors = require('cors'); 
const { connectDB } = require('../src/config/db'); /* función de db.js */
const path = require('path'); /* Ruta relativa del archivo */


dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas de API
app.use('/api/auth', require('../src/routes/authRoutes'));
app.use('/api/cuenta', require('../src/routes/cuentaRoutes'));
app.use('/api/carrito', require('../src/routes/carritoRoutes'));
app.use('/api/alimento', require('./routes/alimentoRoutes'));
app.use('/api/pedido', require('../src/routes/pedidoRoutes'));
app.use('/api/cliente', require('../src/routes/clienteRoutes'));

// Servir archivos estáticos de public/
app.use(express.static(path.join(__dirname, '../public')));

// Ruta raíz -> página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;
