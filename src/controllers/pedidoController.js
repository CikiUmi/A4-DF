const Pedido = require('../models/Pedido');
const Carrito = require('../models/Carrito')
// CREAR
//sacar el total, borrar el carrito
exports.createPedido = async (req, res) => {
  try {
    const { carritoID } = req.params;

    // 1. Buscar carrito
    const carrito = await Carrito.findById(carritoID);

    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    // 2. Crear pedido
    const nuevoPedido = new Pedido({
      cliente: carrito.cliente,
      alimentos: carrito.alimentos,
      precioTotal: carrito.precioTotal,
      metodoPago: "débito"
    });

    // 3. Guardar pedido
    const pedidoGuardado = await nuevoPedido.save();

    // 4. Borrar carrito
    await Carrito.findByIdAndDelete(carritoID);

    res.status(201).json(pedidoGuardado);

  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al guardar pedido', error });
  }
};
// READ
/* Todos */
exports.getAllPedidos = async (req, res) => {
  try {
    const allPedidos = await Pedido.find();
    res.status(200).json(allPedidos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener pedidos: ', error });
  }
};

/* Unooooo */
exports.getPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener pedido',
      error
    });
  }
};

// UPDATE
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizar = await Pedido.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!pedidoActualizar) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json(pedidoActualizar);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar pedido',
      error
    });
  }
};

// DELETE
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoEliminado = await Pedido.findByIdAndDelete(id);
    if (!pedidoEliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar pedido',
      error
    });
  }
};


