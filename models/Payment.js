const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Payment = sequelize.define('Payment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Comprador' // El campo "Comprador"
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Email' // El campo "Email"
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'ID de la transacción' // El campo "ID de la transacción"
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Estado' // El campo "Estado"
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Monto' // El campo "Monto"
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USD', // Moneda
    comment: 'Moneda (USD)'
  },
  payer_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID del pagador'
  }
}, {
  tableName: 'payments',
  timestamps: true
});

module.exports = Payment;
