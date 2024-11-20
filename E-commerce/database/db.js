const { Sequelize } = require('sequelize');

// Obtener las credenciales de las variables de entorno
const DB_NAME = process.env.DATABASE_NAME || 'ecommerce';
const DB_USER = process.env.DATABASE_USER || 'username';  // Nombre de usuario de la base de datos en Render
const DB_PASSWORD = process.env.DATABASE_PASSWORD || 'password';  // Contraseña de la base de datos en Render
const DB_HOST = process.env.DATABASE_HOST || 'host_de_render';  // URL del host de la base de datos de Render
const DB_PORT = process.env.DATABASE_PORT || 3306;  // Puerto de la base de datos

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,  // Usar el puerto correcto
  dialect: 'mysql',
  logging: false,  // Opcional: Deshabilitar logs SQL
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
