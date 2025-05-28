const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = require('./index');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: process.env.NODE_ENV === 'development', // Logs solo en desarrollo
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test de conexión (opcional)
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a DB establecida'))
  .catch(err => console.error('❌ Error de conexión a DB:', err));

module.exports = sequelize;