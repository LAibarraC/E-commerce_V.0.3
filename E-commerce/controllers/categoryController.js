const Category = require('../models/category');
const categoryService = require('../services/categoryService');

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const imageFile = req.files && req.files.image ? req.files.image[0] : null;

            if (imageFile) {
                categoryData.image = imageFile.filename;
            }

            const categoryId = await categoryService.createCategory(categoryData);
            res.json({ message: 'Categoría creada exitosamente', categoryId });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    async editCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const categoryData = req.body;
            const imageFile = req.files && req.files.image ? req.files.image[0] : null;

            await categoryService.editCategory(categoryId, categoryData, imageFile);
            res.json({ message: 'Categoría actualizada exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id;
            await categoryService.deleteCategory(categoryId);
            res.json({ message: 'Categoría eliminada exitosamente' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getCategory(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await categoryService.getCategory(categoryId);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ message: 'Categoría no encontrada' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async searchCategories(req, res) {
        try {

            const { name, description } = req.query;
            const criteria = {};

            if (name) criteria.name = name;
            if (description) criteria.description = description;

            const categories = await categoryService.searchCategories(criteria);
            if (categories.length > 0) {
                res.json(categories);
            } else {
                res.status(404).json({ message: 'Categoría no encontrada' });
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new CategoryController();

