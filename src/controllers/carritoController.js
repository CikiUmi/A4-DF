const Carrito = require('../models/Carrito');
const Alimento = require('../models/Alimento');

// ======================
// CREAR
// ======================
exports.createCarrito = async (req, res) => {
  try {
    const { clienteID  } = req.params;

    // Evitar carritos duplicados
    const existeCarrito = await Carrito.findOne({ cliente: clienteID  });
    if (existeCarrito) {
      return res.status(400).json({ mensaje: 'El cliente ya tiene un carrito' });
    }

    const nuevoCarrito = new Carrito({
      cliente: clienteID,
      alimentos: [],
      precioTotal: 0
    });

    const carritoGuardado = await nuevoCarrito.save();
    res.status(201).json(carritoGuardado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear carrito',
      error
    });
  }
};


// ======================
// AÑADIR alimento
// ======================
exports.updateAlimentosCarrito = async (req, res) => {
  try {
    const { id, alimentoID } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad <= 0 ) {
      return res.status(400).json({ mensaje: 'La cantidad no es válida' });
    }

    const carrito = await Carrito.findById(id);
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    const alimentoDB = await Alimento.findById(alimentoID);
    if (!alimentoDB) {
      return res.status(404).json({ mensaje: 'El alimento no existe en catálogo' });
    }

    const costoUnitario = alimentoDB.costoUnitario;
    const subtotal = cantidad * costoUnitario;


    // Ver si el alimento ya existe
    const alimentoExistente = carrito.alimentos.find(
      p => p.alimento.toString() === alimentoID
    );

    if (alimentoExistente) {
      alimentoExistente.cantidad += cantidad;
      alimentoExistente.subtotal = alimentoExistente.cantidad * costoUnitario;  
    } else {
      carrito.alimentos.push({
        alimento: alimentoID,
        cantidad,
        subtotal
      });
    }

    // Recalcular total
    carrito.precioTotal = carrito.alimentos.reduce(
      (acc, p) => acc + p.subtotal,
      0
    );

    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al añadir alimento al carrito',
      error
    });
  }
};

// ======================
// READ
// ======================
exports.getCarrito = async (req, res) => {
  try {
    const { id } = req.params;

    const carrito = await Carrito.findById(id).populate('alimentos.alimento');

    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener carrito',
      error
    });
  }
};


// ======================
// UPDATE (reemplazar alimentos)
// ======================
exports.updateCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { alimentos } = req.body;
    
    const precioTotal = alimentos.reduce(
      (acc, p) => acc + p.subtotal,
      0
    );

    const carritoActualizado = await Carrito.findByIdAndUpdate(
      id,
      { alimentos, precioTotal },
      { new: true, runValidators: true }
    );

    if (!carritoActualizado) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json(carritoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar carrito',
      error
    });
  }
};


// ======================
// DELETE
// ======================
exports.deleteCarrito = async (req, res) => {
  try {
    const { id } = req.params;

    const carritoEliminado = await Carrito.findByIdAndDelete(id);
    if (!carritoEliminado) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(200).json({ mensaje: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar carrito',
      error
    });
  }
};
