import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js'; // Importa la función

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generar token 
    const token = generateToken(newUser.id); // Implementar esta función

    res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }}

  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // 1. Buscar usuario incluyendo solo campos necesarios (seguridad)
      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'password'], // Evita exponer datos sensibles
      });
  
      // 2. Validar credenciales
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas',
          code: 'INVALID_CREDENTIALS' // Código de error estandarizado
        });
      }
  
      // 3. Generar token (usando la misma función que en register)
      const token = generateToken(user.id); // Reutiliza la función de authUtils.js
  
      // 4. Respuesta consistente con register
      res.json({
        user: { 
          id: user.id,
          name: user.name,
          email: user.email,
          // (Opcional) Añadir más campos públicos si es necesario
        },
        token,
        expiresIn: '1h' // Clarifica al frontend la duración del token
      });
  
    } catch (error) {
      // 5. Manejo centralizado de errores
      next({
        status: 500,
        message: 'Error durante el inicio de sesión',
        details: error.message // Solo en desarrollo (no en producción)
      });
    }
};