const express = require('express');
const {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
    searchCategories
} = require('../controllers/categoryController');

const upload = require('../config/multercategoria'); // Asegúrate de que multer esté bien configurado

const router = express.Router();

// Rutas para categorías
router.get('/categories', getAllCategories); // Obtener todas las categorías

router.post('/categorias', upload, createCategory); // Crear una nueva categoría con imagen


router.put('/categories/:id', upload, editCategory); // Editar categoría existente con imagen

router.delete('/categories/:id', deleteCategory); // Eliminar categoría

router.get('/categories/:id', getCategory); // Obtener una categoría por ID

router.get('/categories/search', searchCategories); // Buscar categorías

module.exports = router;


