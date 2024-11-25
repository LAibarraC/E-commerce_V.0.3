const { Op } = require('sequelize');
const CategoryRepository = require('../repository/categoryRepository');

class CategoryService {
    async getAllCategories() {
        return await CategoryRepository.findAll();
    }

    async createCategory(req, res) {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: 'Error al subir la imagen: ' + err.message });
            }
    
            const categoryData = {
                name: req.body.name,
                description: req.body.description,
                image: req.files.image ? req.files.image[0].filename : null // Asegúrate de que la imagen es correctamente asignada
            };
    
            try {
                const categoryId = await CategoryService.createCategory(categoryData);
                return res.status(201).json({ id: categoryId, message: 'Categoría creada con éxito' });
            } catch (error) {
                return res.status(500).json({ error: 'Error al crear la categoría: ' + error.message });
            }
        });
    }
    

    async editCategory(id, categoryData, imageFile) {
        const category = {
            id: id,
            name: categoryData.name,
            description: categoryData.description,
            image: imageFile ? imageFile.filename : categoryData.image, 
            updateAt: new Date().toISOString()
        };
        return await CategoryRepository.updateCategory(category);
    }

    async deleteCategory(id) {
        return await CategoryRepository.deleteCategory(id);
    }

    async getCategory(id) {
        return await CategoryRepository.findById(id);
    }

    async searchCategories(criteria) {
        try {
            const query = {};

            if (criteria.name) {
                query.name = { [Op.like]: `%${criteria.name}%` };
            }
            if (criteria.description) {
                query.description = { [Op.like]: `%${criteria.description}%` };
            }

            const categories = await CategoryRepository.findAll({ where: query });
            return categories;
        } catch (err) {
            throw new Error('Error al buscar categorías: ' + err.message);
        }
    }
}

module.exports = new CategoryService();
