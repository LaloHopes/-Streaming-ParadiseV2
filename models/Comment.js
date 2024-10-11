const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Video = require('./Video');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  idcoment: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idvideo: {
    type: DataTypes.INTEGER,
    references: {
      model: Video,
      key: 'idvideo',  // Referencia correcta a "idvideo" en la tabla Video
    },
    allowNull: false,  // No permitir nulo, ya que una reseña debe estar asociada a un video
  },
  iduser: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',  // Referencia correcta al campo "id" del modelo User
    },
    allowNull: false,  // No permitir nulo, ya que una reseña debe estar asociada a un usuario
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: false,  // El comentario es obligatorio
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Fecha predeterminada es la fecha actual
  },
}, {
  timestamps: false,
  tableName: 'reseña'  // Nombre personalizado de la tabla
});

// Definir las relaciones especificando las claves foráneas manualmente
Comment.belongsTo(Video, { foreignKey: 'idvideo', targetKey: 'idvideo' });  // Especifica el nombre de la clave foránea
Comment.belongsTo(User, { foreignKey: 'iduser', targetKey: 'id' });  // Especifica el nombre de la clave foránea

module.exports = Comment;
