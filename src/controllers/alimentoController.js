const Alimento = require('../models/Alimento');

// CREAR
exports.createAlimento = async (req, res) => {
  try {
    const nuevoAlimento = new Alimento(req.body);
    const AlimentoGuardado = await nuevoAlimento.save();
    res.status(201).json(AlimentoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al añadir Alimento al catálogo: ', error });
  }
};

// READ
/* Todos */
exports.getAllAlimentos = async (req, res) => {
  try {
    const AlimentoAlimentos = await Alimento.find();
    res.status(200).json(AlimentoAlimentos);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener catálogo: ', error });
  }
};

/* Uno */
exports.getAlimento = async (req, res) => {
  try {
    const { id } = req.params;
    const Alimento = await Alimento.findById(id);
        if (!Alimento) {
      return res.status(404).json({ mensaje: 'Alimento no encontrado' });
    }

    res.status(200).json(Alimento);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener Alimento',
      error
    });
  }
};


// UPDATE
exports.updateAlimento = async (req, res) => {
  try {
    const { id } = req.params;
    const AlimentoActualizar = await Alimento.findByIdAndUpdate(id, req.body, {new:true, runValidators: true });
        if (!AlimentoActualizar) {
      return res.status(404).json({ mensaje: 'Alimento no encontrado' });
    }

    res.status(200).json(AlimentoActualizar);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al obtener Alimento',
      error
    });
  }
};

// DELETE
exports.deleteAlimento = async (req, res) => {
  try {
    const { id } = req.params;

    const AlimentoEliminado = await Alimento.findByIdAndDelete(id);
    if (!AlimentoEliminado) {
      return res.status(404).json({ mensaje: 'Alimento no encontrado' });
    }

    res.status(200).json({ mensaje: 'Alimento eliminado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar Alimento',
      error
    });
  }
};
