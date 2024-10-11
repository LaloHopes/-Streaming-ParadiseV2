const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Coupon = require('../models/Coupon');
const Subscription = require('../models/Subscription');
const Offer = require('../models/Offer');
const User = require('../models/User');

// Ruta para realizar una compra con cupón y oferta
router.post('/', async (req, res) => {  // Cambié '/purchase' a '/'
    const { total, iduser, idsub, codigo_cupon } = req.body;

    try {
        // Buscar la suscripción
        const subscription = await Subscription.findByPk(idsub, {
            include: Offer // Incluir la oferta relacionada
        });

        if (!subscription) {
            return res.status(404).json({ error: 'Suscripción no encontrada.' });
        }

        // Buscar el usuario
        const user = await User.findByPk(iduser);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Aplicar descuento de oferta, si la suscripción tiene una oferta activa
        let discount = 0;
        let offerDiscount = 0;

        if (subscription.Offer && subscription.Offer.activo) {
            const now = new Date();
            if (subscription.Offer.startDate <= now && subscription.Offer.endDate >= now) {
                offerDiscount = (total * subscription.Offer.porcentaje) / 100;
                discount += offerDiscount; // Acumular el descuento de la oferta
            }
        }

        // Aplicar cupón, si existe
        let couponDiscount = 0;

        if (codigo_cupon) {
            const coupon = await Coupon.findOne({
                where: { codigo: codigo_cupon, activo: true }
            });

            // Validar el cupón
            if (!coupon) {
                return res.status(400).json({ error: 'Cupón inválido o no existe.' });
            }

            const now = new Date();
            if (coupon.fecha_expiracion < now) {
                return res.status(400).json({ error: 'Cupón expirado.' });
            }

            if (coupon.usos_actuales >= coupon.usos_maximos) {
                return res.status(400).json({ error: 'El cupón ha alcanzado su límite de usos.' });
            }

            // Aplicar el descuento del cupón
            couponDiscount = (total * coupon.porcentaje) / 100;
            discount += couponDiscount; // Acumular el descuento del cupón

            // Actualizar los usos del cupón
            coupon.usos_actuales += 1;
            await coupon.save();
        }

        // Calcular el precio final
        const finalPrice = total - discount;

        // Registrar la compra
        const purchase = await Purchase.create({
            total: finalPrice,
            iduser: user.id,
            idsub: subscription.idsub,
            fecha: new Date(),
        });

        // Responder con los detalles de la compra
        res.json({
            message: 'Compra realizada exitosamente.',
            compra: purchase,
            descuento: discount,
            oferta: offerDiscount,
            cupon: couponDiscount,
            precio_final: finalPrice,
        });
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ error: 'Error al procesar la compra.' });
    }
});

module.exports = router;
