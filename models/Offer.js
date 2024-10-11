const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Offer = sequelize.define('Offer', {
    idoffer: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porcentaje: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'offers'
});

module.exports = Offer;
