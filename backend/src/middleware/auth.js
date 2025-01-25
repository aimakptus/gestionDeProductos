const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('token recibido', token); //borrar
    if (!token) {return res.status(401).json({message: 'Acceso denegado'})};

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token no válido'});
    }
};

module.exports = auth;