const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Role = require('./Role');
const Permission = require('./Permission');

// Definición de la tabla intermedia RolePermission
const RolePermission = sequelize.define('RolePermission', {
    idrol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Role,
            key: 'idrol'
        }
    },
    idpermiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Permission,
            key: 'idpermiso'
        }
    }
}, {
    timestamps: false,
    tableName: 'rolxpermiso'
});

// Asociaciones para la relación muchos a muchos
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'idrol', as: 'permissions' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'idpermiso', as: 'roles' });

module.exports = RolePermission;
