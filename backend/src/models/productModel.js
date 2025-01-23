const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario.'],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción es necesaria.'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'El precio es necesario.'],
        min: [1, 'El precio del producto debe ser mayor a 0']
    },
    category: {
        type: String,
        required: [true, 'La categoría es necesaria.'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'El stock es necesario.'],
        min: [0, 'El stock debe ser igual o mayor a 0'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);