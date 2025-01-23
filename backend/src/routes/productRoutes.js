const express = require('express');
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Ruta para crear un nuevo producto
router.post('/products', createProduct);

// Ruta para obtener productos (todos o por nombre)
router.get('/products', getProduct);

// Ruta para actualizar un producto por ID
router.put('/products/:id', updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/products/:id', deleteProduct);

module.exports = router;