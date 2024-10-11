const express = require('express');
const router = express.Router();
const Role = require('../models/Role'); // Importa el modelo Role

// Crear un nuevo rol
router.post('/create', async (req, res) => {
  try {
    const { nomrol } = req.body; // Extraer el nombre del rol del cuerpo de la solicitud

    // Verificar si el nombre del rol ya existe
    const existingRole = await Role.findOne({ where: { nomrol } });
    if (existingRole) {
      return res.status(400).json({ message: 'El rol ya existe' });
    }

    // Crear el nuevo rol
    const newRole = await Role.create({
      nomrol
    });

    res.status(201).json(newRole); // Responder con el rol recién creado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
