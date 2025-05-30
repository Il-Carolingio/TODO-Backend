import express from 'express';
import morgan from 'morgan';
import cors from'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(helmet()); // Seguridad básica (protege contra XSS, etc.)
app.use(morgan('dev')); // Logs de peticiones HTTP
app.use(express.json()); // Parsea el body de las peticiones a JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware de errores (siempre al final)
app.use(errorMiddleware);

export default app;