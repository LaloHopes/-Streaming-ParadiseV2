// models/Purchase.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');
const Subscription = require('./Subscription');

const Purchase = sequelize.define('Purchase', {
    idcompra: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'compra'
});

Purchase.belongsTo(User, { foreignKey: 'iduser' });
Purchase.belongsTo(Subscription, { foreignKey: 'idsub' });

module.exports = Purchase;
