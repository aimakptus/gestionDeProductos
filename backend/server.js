// Dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');

// Dotenv para acceder a las variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Instancia de Express
const app = express();

// Middleware
app.use(cors()); // Habilitacion del CORS
app.use(express.json()); // Análisis de curpos JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento.');
});

// Rutas de usuario
app.use('/api/users', userRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});