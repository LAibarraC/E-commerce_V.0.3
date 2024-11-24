const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllercart');

// Rutas para el carrito
router.post('/carts', cartController.createCart); // Crear un carrito
router.get('/carts/:id', cartController.getCart); // Obtener un carrito por ID
router.put('/carts/:id', cartController.updateCart); // Actualizar un carrito
router.delete('/carts/:id', cartController.deleteCart); // Eliminar un carrito

module.exports = router;
