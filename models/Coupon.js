// models/Coupon.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Coupon = sequelize.define('Coupon', {
    idcupon: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_expiracion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usos_maximos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usos_actuales: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'cupones'
});

module.exports = Coupon;
