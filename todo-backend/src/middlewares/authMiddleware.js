// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No autorizado - Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'No autorizado - Usuario no existe' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'No autorizado - Token inválido',
      error: error.message
    });
  }
};