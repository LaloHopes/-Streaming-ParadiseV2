const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User');
const Offer = require('./Offer'); // Importa correctamente el modelo

const Subscription = sequelize.define('Subscription', {
    idsub: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iduser: {  // Asegúrate de usar iduser
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descuento: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    p_final: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idoffer: {  // Asegúrate de usar idoffer
        type: DataTypes.INTEGER,
        references: {
            model: Offer,
            key: 'idoffer'
        }
    }
}, {
    timestamps: false,
    tableName: 'subscriptions'
});

// Relación con User y Offer usando claves foráneas específicas
Subscription.belongsTo(User, { foreignKey: 'iduser' });
Subscription.belongsTo(Offer, { foreignKey: 'idoffer' });

module.exports = Subscription;
