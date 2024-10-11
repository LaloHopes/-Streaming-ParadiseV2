const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission'); // Importa el modelo Permission

// Crear un nuevo permiso
router.post('/create', async (req, res) => {
  try {
    const { nompermiso, clave } = req.body; // Extraer los datos del cuerpo de la solicitud

    // Verificar si el permiso ya existe
    const existingPermission = await Permission.findOne({ where: { clave } });
    if (existingPermission) {
      return res.status(400).json({ message: 'El permiso ya existe' });
    }

    // Crear el nuevo permiso
    const newPermission = await Permission.create({
      nompermiso,
      clave
    });

    res.status(201).json(newPermission); // Responder con el permiso recién creado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los permisos
router.get('/', async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un permiso por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nompermiso, clave } = req.body;

    // Buscar el permiso por ID y actualizarlo
    const updatedPermission = await Permission.update({ nompermiso, clave }, {
      where: { idpermiso: id }
    });

    if (updatedPermission[0] === 0) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }

    res.json({ message: 'Permiso actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un permiso por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el permiso por ID y eliminarlo
    const deletedPermission = await Permission.destroy({ where: { idpermiso: id } });

    if (!deletedPermission) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }

    res.json({ message: 'Permiso eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
