const express = require('express');
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Ruta para crear un nuevo producto
router.post('/products', authMiddleware, createProduct);

// Ruta para obtener productos (todos o por nombre)
router.get('/products', authMiddleware, getProduct);

// Ruta para actualizar un producto por ID
router.put('/products/:id', authMiddleware, updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/products/:id', authMiddleware, deleteProduct);

module.exports = router;