const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Cart = require('./cart');  // Asegúrate de importar el modelo de Cart
const Product = require('./product');  // Asegúrate de tener el modelo de Product

class CartItem extends Model {}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart, // Relación con el modelo Cart
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Relación con el modelo Product
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize, 
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: false
});

module.exports = CartItem;
