const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registro de usuario
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Verificación de usuario en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        // Contraseña hasehada y salteada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creación del nuevo usuario
        const newUser = await User.create({ fullName, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado con éxito.', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error });
    }
};

// Inicio de sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }

        // Verificación la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Creación del token con JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error });
    }
};

// Obtención de datos
const getUser = async (req, res) => {
    try {
        // Obtener el token de autorización de los encabezados de la solicitud
        const token = req.headers.authorization?.split(' ')[1]; // Se espera un token tipo "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verificar el token y decodificarlo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Buscar al usuario en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Devolver la información del usuario (en este caso solo el nombre)
        res.json({ fullName: user.fullName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user data', error });
    }
};

module.exports = { registerUser, loginUser, getUser };