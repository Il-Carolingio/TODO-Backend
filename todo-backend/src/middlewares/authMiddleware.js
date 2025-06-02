// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No autorizado - Token no proporcionado' });
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    req.user = user;
    console.log(token);

    if (!user) {
      return res.status(401).json({ message: 'No autorizado - Usuario no existe' });
    }
    next();
  } catch (error) {
    console.error('Error en verificación de token:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }

    return res.status(401).json({ error: 'Error de autenticación' });

  }
};