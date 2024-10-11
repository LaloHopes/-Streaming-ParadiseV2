const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config');
const Role = require('./Role'); // Importar el modelo de roles

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  favoriteGenre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  genero: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  idrol: {
    type: DataTypes.INTEGER,
    allowNull: false, // El campo no puede ser nulo
    references: {
      model: 'rol', // Nombre exacto de la tabla de roles en la base de datos
      key: 'idrol'
    },
    defaultValue: 34 // Asigna el rol "User" (idrol: 34) por defecto
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);  // Genera un salt
        user.password = await bcrypt.hash(user.password, salt);  // Encripta la contraseña
      }
    },
    beforeUpdate: async (user) => {
      if (user.password && user.changed('password')) { // Si se cambió la contraseña
        const salt = await bcrypt.genSalt(10);  // Genera un salt
        user.password = await bcrypt.hash(user.password, salt);  // Encripta la contraseña
      }
    }
  },
  timestamps: true,
});

// Definir la relación con la tabla Role
User.belongsTo(Role, { foreignKey: 'idrol' });

module.exports = User;
