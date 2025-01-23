const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: [true, 'El nombre completo es obligatorio.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio.'],
        unique: true, // Medida de seguridad adicional
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);