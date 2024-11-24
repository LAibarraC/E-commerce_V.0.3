const CartRepository = require('../repository/cartRepository');

class CartService {
    async createCart(userId) {
        if (!userId) {
            throw new Error('Se debe proporcionar un id de usuario');
        }
        return await CartRepository.createCart(userId);
    }

    async getCartByUserId(userId) {
        if (!userId) {
            throw new Error('Se debe proporcionar un id de usuario');
        }

        const cart = await CartRepository.findByUserId(userId);

        if (!cart) {
            throw new Error('Carrito no encontrado para este usuario');
        }

        return cart;
    }

    async addItemToCart(cartId, cartItemData) {
        if (!cartId || !cartItemData) {
            throw new Error('Se deben proporcionar el id del carrito y los datos del ítem');
        }

        return await CartRepository.addItemToCart(cartId, cartItemData);
    }

    async removeItemFromCart(cartId, productId) {
        if (!cartId || !productId) {
            throw new Error('Se deben proporcionar el id del carrito y el id del producto');
        }

        await CartRepository.removeItemFromCart(cartId, productId);
    }

    async clearCart(cartId) {
        if (!cartId) {
            throw new Error('Se debe proporcionar un id de carrito');
        }

        await CartRepository.clearCart(cartId);
    }

    async updateCartItemQuantity(cartId, productId, quantity) {
        if (!cartId || !productId || quantity === undefined) {
            throw new Error('Se deben proporcionar el id del carrito, el id del producto y la cantidad');
        }

        await CartRepository.updateCartItemQuantity(cartId, productId, quantity);
    }

    async calculateCartTotal(cartId) {
        if (!cartId) {
            throw new Error('Se debe proporcionar un id de carrito');
        }

        return await CartRepository.calculateCartTotal(cartId);
    }
}

module.exports = new CartService();
