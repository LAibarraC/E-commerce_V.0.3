const { Sequelize } = require('sequelize');
const sqlite3 = require('better-sqlite3');  // Utiliza better-sqlite3 como driver

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './ecommerce.db',  // Ruta a tu base de datos SQLite
    dialectOptions: {
        sqlite: {
            driver: sqlite3  // Establece better-sqlite3 como el driver
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente con SQLite.');
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

module.exports = sequelize;

