const express = require('express');
const { Subscription, User } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

// Crear una nueva suscripción (POST)
router.post('/nuevasub', async (req, res) => {
  try {
    const { iduser, startDate, endDate, nombre, precio, descripcion, descuento, p_final } = req.body;

    const existingSubscription = await Subscription.findOne({
      where: {
        iduser, // Asegúrate de que esto coincida con el modelo
        endDate: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (existingSubscription) {
      return res.status(400).json({ message: 'El usuario ya tiene una suscripción activa.' });
    }

    const subscription = await Subscription.create({
      iduser, // Asegúrate de que esto coincida con el modelo
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      nombre,
      precio,
      descripcion,
      descuento,
      p_final,
      isActive: true,
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las suscripciones (GET) - Ruta con nombre
router.get('/all', async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [User],
    });

    res.json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancelar una suscripción (DELETE)
router.delete('/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const result = await Subscription.destroy({
      where: { idsub: subscriptionId }, // Asegúrate de que el nombre del campo sea 'idsub'
    });

    if (result) {
      res.json({ message: 'Suscripción eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Suscripción no encontrada.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener la suscripción actual de un usuario (GET)
router.get('/user/:iduser', async (req, res) => {
  try {
    const { iduser } = req.params;

    const subscription = await Subscription.findOne({
      where: {
        iduser, // Asegúrate de que esto coincida con el modelo
        endDate: {
          [Op.gt]: new Date(),
        },
      },
      include: [User],
    });

    if (!subscription) {
      return res.status(404).json({ message: 'No se encontró una suscripción activa para este usuario.' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
