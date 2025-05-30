//Funcion para crear el token
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config(); // Carga variables de entorno

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload (datos del usuario)
    process.env.JWT_SECRET, // Clave secreta desde .env
    { expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '7d' } // Tiempo de expiración
  );
};