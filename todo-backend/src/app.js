const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

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

module.exports = app;