const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// Obtener todas las ofertas
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ofertas' });
    }
});

// Crear una nueva oferta
router.post('/', async (req, res) => {
    const { descripcion, porcentaje, startDate, endDate } = req.body;
    try {
        const newOffer = await Offer.create({
            descripcion,
            porcentaje,
            startDate,
            endDate
        });
        res.json(newOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la oferta' });
    }
});

// Actualizar una oferta por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOffer = await Offer.update(req.body, { where: { idoffer: id } });
        res.json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la oferta' });
    }
});

// Eliminar una oferta por su ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Offer.destroy({ where: { idoffer: id } });
        res.json({ message: 'Oferta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la oferta' });
    }
});

module.exports = router;
