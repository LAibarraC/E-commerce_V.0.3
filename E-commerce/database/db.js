const { Sequelize } = require('sequelize');

// URL de conexión proporcionada por Render
const DB_URL = 'postgresql://ecommerce_mi2i_user:04psqq3FVA2gsH4VjqsDqHAEUJZDXk3O@dpg-csul2fqj1k6c738gbqo0-a.oregon-postgres.render.com/ecommerce_mi2i';

// Configuración de Sequelize para PostgreSQL usando la URL de conexión
const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,    // Requiere SSL
      rejectUnauthorized: false  // Acepta el certificado auto-firmado (por si es necesario)
    }
  },
  logging: false, // Opcional: Deshabilitar logs SQL
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
