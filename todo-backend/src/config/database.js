const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = require('../config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, // Desactiva los logs de SQL en producción
});

module.exports = sequelize;