const Cuenta = require('../models/Cuenta');
const bcrypt = require('bcryptjs');
const crearCliente = require('../controllers/clienteController');

// ======================
// CREAR
// ======================
exports.createCuenta = async (req, res) => {
  try {
    const { correo, password, rol } = req.body;

    // Validar si ya existe
    const existeCuenta = await Cuenta.findOne({ correo });
    if (existeCuenta) {
      return res.status(400).json({ mensaje: 'La cuenta ya existe' });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevaCuenta = new Cuenta({
      correo,
      password: passwordHash,
      rol
    });

    const cuentaGuardada = await nuevaCuenta.save();

    if (cuentaGuardada.rol == 'usuario') {
      crearCliente(cuentaGuardada.id);
    }
    res.status(201).json(cuentaGuardada);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear cuenta de usuario',
      error
    });
  }



};


// ======================
// READ
// ======================

/* Uno */
exports.getCuenta = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Cuenta.findById(id).select('-password');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener cuenta de usuario',
      error
    });
  }
};


// ======================
// UPDATE
// ======================
exports.updateCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    // Si se actualiza password, volver a hashear
    if (datos.password) {
      const salt = await bcrypt.genSalt(10);
      datos.password = await bcrypt.hash(datos.password, salt);
    }

    const cuentaActualizada = await Cuenta.findByIdAndUpdate(
      id,
      datos,
      { new: true }
    ).select('-password');

    if (!cuentaActualizada) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(cuentaActualizada);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar cuenta de usuario',
      error
    });
  }
};


// ======================
// DELETE
// ======================
exports.deleteCuenta = async (req, res) => {
  try {
    const { id } = req.params;

    const cuentaEliminada = await Cuenta.findByIdAndDelete(id);
    if (!cuentaEliminada) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar cuenta de usuario',
      error
    });
  }
};


