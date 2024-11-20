const { Sequelize } = require('sequelize');

// Configuración de conexión usando tus credenciales locales
const DB_NAME = 'ecommerce';
const DB_USER = 'root';
const DB_PASSWORD = '23luis99';
const DB_HOST = '127.0.0.1';  // Asegúrate de usar la IP local de tu máquina

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: 3306, // Puerto MySQL
  logging: false, // Opcional: Deshabilitar logs SQL
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;

