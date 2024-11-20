const { Sequelize } = require('sequelize');

// URL de conexión proporcionada por Render (copiada directamente)
const DB_URL = process.env.DATABASE_URL || 'postgresql://ecommerce_mi2i_user:04psqq3FVA2gsH4VjqsDqHAEUJZDXk3O@dpg-csul2fqj1k6c738gbqo0-a.oregon-postgres.render.com/ecommerce_mi2i';

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: false, // Deshabilitar logs SQL si es necesario
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;

