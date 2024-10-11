const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Permission = require('./Permission');

const Role = sequelize.define('Role', {
    idrol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomrol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'rol'
});

// Método estático para obtener roles con permisos
Role.getRolesWithPermissions = async function() {
    try {
        const roles = await Role.findAll({
            include: [{
                model: Permission,
                as: 'permissions',
                through: { attributes: [] } // Omitimos la tabla intermedia en el resultado
            }]
        });
        return roles;
    } catch (error) {
        console.error('Error al obtener roles con permisos:', error);
        throw error;
    }
};

module.exports = Role;
