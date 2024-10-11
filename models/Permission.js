const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Permission = sequelize.define('Permission', {
    idpermiso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nompermiso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'permiso'
});

module.exports = Permission;