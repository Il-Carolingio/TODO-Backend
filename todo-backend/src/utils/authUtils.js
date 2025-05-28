//Funcion para crear el token
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carga variables de entorno

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload (datos del usuario)
    process.env.JWT_SECRET, // Clave secreta desde .env
    { expiresIn: '1h' } // Tiempo de expiración
  );
};