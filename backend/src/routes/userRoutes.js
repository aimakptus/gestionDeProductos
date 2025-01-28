const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const router = express.Router();

// Ruta de registro de usuarios
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario (requiere autenticación)
router.get('/user', getUser);

module.exports = router;