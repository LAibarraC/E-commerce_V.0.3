// controllers/cartItemController.js
const cartItemService = require('../services/cart_ItemService');
const Joi = require('joi');

class CartItemController {
    static cartItemSchema = Joi.object({
        cartId: Joi.number().required(),
        productId: Joi.number().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().required()
    });

    async addItem(req, res) {
        try {
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            const cartItemId = await cartItemService.addItem(itemData);
            res.status(201).json({ success: true, id: cartItemId, message: 'Ítem agregado al carrito exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getItems(req, res) {
        try {
            const cartId = req.params.cartId;
            const items = await cartItemService.getItems(cartId);
            if (!items || items.length === 0) {
                return res.status(404).json({ success: false, message: 'No se encontraron ítems en el carrito' });
            }
            res.json({ success: true, items });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async updateItem(req, res) {
        try {
            const itemId = req.params.itemId;
            const itemData = await CartItemController.cartItemSchema.validateAsync(req.body);
            await cartItemService.updateItem(itemId, itemData);
            res.json({ success: true, message: 'Ítem actualizado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async removeItem(req, res) {
        try {
            const itemId = req.params.itemId;
            await cartItemService.removeItem(itemId);
            res.json({ success: true, message: 'Ítem eliminado exitosamente' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

module.exports = new CartItemController();
