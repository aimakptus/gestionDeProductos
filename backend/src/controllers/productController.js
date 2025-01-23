const Product = require('../models/productModel');

// Creación de productos
const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        // Verificación del producto en la base de datos
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'El producto ya existe en la base de datos.' });
        }

        // Creación del producto
        const newProduct = await Product.create({ name, description, price, category, stock });

        res.status(201).json({ message: 'Producto añadido con éxito.', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir el producto.', error });
    }
};

// Obtención de productos completos o por nombre
const getProduct = async (req, res) => {
    const { name } = req.query;

    try {
        // Si no hay producto que coincida con la busqueda, error 404
        if (name) {
            const products = await Product.find({
                name: { $regex: name, $options: 'i' }, // Búsqueda sin importar mayúsculas o minúsculas
            });
            if (products.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos.' });
            }
            return res.status(200).json(products);
        }

        // Si no hay búsqueda por nombre, devuelve todos los productos
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener productos', error });
    }
};

// Actualización del producto
const updateProduct = async (req, res) => {
    const { id } = req.params;  // ID del producto a actualizar
    const { name, description, price, category, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, stock },
            { new: true }  // Retorna el producto actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.status(200).json({ message: 'Producto actualizado.', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto.', error });
    }
};

// Eliminación del producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;  // ID del producto a borrar

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.status(200).json({ message: 'Producto eliminado.', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto.', error });
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
};