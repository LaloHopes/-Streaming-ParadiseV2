const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('content_platform', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // O el dialecto que estés utilizando
});

module.exports = sequelize;
