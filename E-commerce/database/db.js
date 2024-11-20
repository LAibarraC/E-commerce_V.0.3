const { Sequelize } = require('sequelize');

// Obtener las credenciales de las variables de entorno
const DB_NAME = process.env.DATABASE_NAME || 'ecommerce';
const DB_USER = process.env.DATABASE_USER || 'root';
const DB_PASSWORD = process.env.DATABASE_PASSWORD || '23luis99';
const DB_HOST = process.env.DATABASE_HOST || 'localhost';

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, // Opcional: Deshabilitar logs SQL
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
