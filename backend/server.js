// Dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Dotenv para acceder a las variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Instancia de EXpress
const app = express();

// Middleware
app.use(cors()); // Habilitacion del CORS
app.use(express.json()); // Analisis de curpos JSON

// Conexión a mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.error('Error de conexión', err));

// Rutas
app.get('/', (req, res) =>{
    res.send('Servidor en funcionamiento.');
});

// Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});