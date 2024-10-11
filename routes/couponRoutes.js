// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Obtener todos los cupones
router.get('/', async (req, res) => {
    const cupones = await Coupon.findAll();
    res.json(cupones);
});

// Crear un nuevo cupón
router.post('/', async (req, res) => {
    const { porcentaje, codigo, fecha_expiracion, usos_maximos } = req.body;
    const newCoupon = await Coupon.create({
        porcentaje,
        codigo,
        fecha_expiracion,
        usos_maximos
    });
    res.json(newCoupon);
});

// Actualizar un cupón por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCoupon = await Coupon.update(req.body, { where: { idcupon: id } });
    res.json(updatedCoupon);
});

// Eliminar un cupón
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Coupon.destroy({ where: { idcupon: id } });
    res.json({ message: 'Cupón eliminado' });
});

module.exports = router;
