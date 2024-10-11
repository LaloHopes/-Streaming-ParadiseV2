const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Video = sequelize.define('Video', {
    idvideo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorId: {  // Nuevo campo para el creador del video
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {  // Nuevo campo para la descripción del video
        type: DataTypes.STRING,
        allowNull: true
    },
    genero: {  // Nuevo campo para el género del video
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'videos'
});

module.exports = Video;
