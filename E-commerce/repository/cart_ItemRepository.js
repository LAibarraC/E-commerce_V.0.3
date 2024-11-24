const CartItem = require('../models/cart_item');

class CartItemRepository {
    static async findById(id) {
        return await CartItem.findByPk(id);
    }

    static async createCartItem(cartItem) {
        const newCartItem = await CartItem.create(cartItem);
        return newCartItem.id;
    }

    static async updateCartItem(cartItem) {
        await CartItem.update(
            { quantity: cartItem.quantity },
            {
                where: {
                    id: cartItem.id,
                },
            }
        );
    }

    static async deleteCartItem(id) {
        await CartItem.destroy({ where: { id } });
    }

    static async calculateSubtotal(cartItemId) {
        const cartItem = await CartItem.findByPk(cartItemId, {
            include: ['product'], // Asegúrate de definir la relación con `Product` en el modelo.
        });

        if (!cartItem) {
            throw new Error('CartItem no encontrado.');
        }

        return cartItem.quantity * cartItem.product.price;
    }
}

module.exports = CartItemRepository;
