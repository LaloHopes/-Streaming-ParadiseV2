const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Ruta para recibir los datos de la compra y guardarlos
router.post('/capture', async (req, res) => {
  try {
    const { email_address, name, transaction_id, status, amount, currency, payer_id } = req.body;

    // Crear un nuevo registro en la base de datos
    const newPayment = await Payment.create({
      name,             // Comprador
      email_address,     // Email
      transaction_id,    // ID de la transacción
      status,            // Estado
      amount,            // Monto
      currency,          // Moneda (USD)
      payer_id           // ID del pagador
    });

    res.status(201).json({ message: 'Pago guardado exitosamente', payment: newPayment });
  } catch (error) {
    console.error('Error al guardar el pago:', error);
    res.status(500).json({ message: 'Error al guardar el pago' });
  }
});

module.exports = router;

