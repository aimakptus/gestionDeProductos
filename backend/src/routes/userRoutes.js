const express = require('express');
const {registerUser, loginUser} = require('../controllers/userController');
const router = express.Router();

// Ruta de registro de usuarios
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router