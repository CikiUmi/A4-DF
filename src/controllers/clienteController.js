const Cliente = require('../models/Cliente');
const Cuenta = require('../models/Cuenta');

// CREAR
exports.createCliente = async (req, res) => {
  try {
    const { userID } = req.params;
    const { nombreCliente } = req.body;

    const nuevaCuenta = await Cuenta.findById(userID);

    if (!nuevaCuenta) {
      return res.status(404).json({ mensaje: 'La cuenta no existe, no se puede crear un cliente.' });
    }

    const nuevoCliente = new Cliente(
      {
        cuenta: userID,
        nombre: nombreCliente
      }
    );

    const clienteGuardado = await nuevoCliente.save();

    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear cliente desde cuenta: ', error });
  }
};







// READ
/* Todos */
exports.getAllClientes = async (req, res) => {
  try {
    const listaClientes = await Cliente.find();
    res.status(200).json(listaClientes);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener catálogo: ', error });
  }
};

/* Uno */
exports.getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteBuscado = await Cliente.findById(id);
    if (!clienteBuscado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(clienteBuscado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener Cliente',
      error
    });
  }
};


// UPDATE
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const ClienteActualizar = await Cliente.findByIdAndUpdate(
      id,
      { nombre },
      { new: true, runValidators: true }
    );
    if (!ClienteActualizar) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(ClienteActualizar);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener Cliente',
      error
    });
  }
};

// DELETE
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const ClienteEliminado = await Cliente.findByIdAndDelete(id);
    
    if (!ClienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const CuentaEliminada = await Cuenta.findByIdAndDelete(ClienteEliminado.cuenta);
    if (!CuentaEliminada){
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }


    res.status(200).json({ mensaje: 'Cliente y cuenta eliminados correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar Cliente',
      error
    });
  }
};
