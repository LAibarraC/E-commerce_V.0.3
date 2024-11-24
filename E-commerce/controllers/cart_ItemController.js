const cartItemService = require('../services/cartItemService');
const Joi = require('joi');

class CartItemController {
    static cartItemSchema = Joi.object({
        cartId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().positive().optional(), // Asegura que el precio sea un número positivo
    });

    async addItem(req, res) {
        try {
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            const cartItemId = await cartItemService.addItem(itemData);
            res.status(201).json({ success: true, id: cartItemId, message: 'Item añadido al carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getCartItems(req, res) {
        try {
            const cartId = req.params.cartId;
            const items = await cartItemService.getCartItems(cartId);
            res.json({ success: true, items });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateItem(req, res) {
        try {
            const cartItemId = req.params.id;
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            await cartItemService.updateItem(cartItemId, itemData);
            res.json({ success: true, message: 'Item actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async removeItem(req, res) {
        try {
            const cartItemId = req.params.id;
            await cartItemService.removeItem(cartItemId);
            res.json({ success: true, message: 'Item eliminado del carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

module.exports = new CartItemController();

