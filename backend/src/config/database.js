require('dotenv').config();
const mongoose = require('mongoose');

// Conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB conectado');
    } catch(error) {
        console.err('Error conectando mongoDB: ', error)
        process.exit(1); // Detiene la aplicación
    }
};

module.exports = connectDB