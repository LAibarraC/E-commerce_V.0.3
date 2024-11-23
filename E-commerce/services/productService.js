const ProductRepository = require('../repository/productRepository');

class ProductService {
    async createProduct(productData) {
        return await ProductRepository.createProduct(productData);
    }

    async getAllProducts() {
        return await ProductRepository.findAllProducts();
    }

    async getProduct(id) {
        return await ProductRepository.findById(id);
    }

    async updateProduct(id, productData) {
        return await ProductRepository.updateProduct({ id, ...productData });
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }

    async searchProducts(query) {
        return await ProductRepository.searchProducts(query);
    }

    async getProductsByCategory(categoryId) {
        if (!categoryId) {
            throw new Error('Se debe proporcionar un id de categoría');
        }

        const products = await ProductRepository.findProductsByCategory(categoryId);

        if (products.length === 0) {
            throw new Error('No se encontraron productos para esta categoría');
        }

        return products;
    }
    async getFeaturedProducts() {
        return await ProductRepository.findFeaturedProducts();
    }
}

module.exports = new ProductService();
