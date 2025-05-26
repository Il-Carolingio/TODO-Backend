const taskService = require('../services/taskService');//Importamos el seervicio
const { Task, User } = require('../models'); // Importa los modelos Task y User
const { Op } = require('sequelize'); // Operadores de Sequelize para consultas

// Obtener todas las tareas (con filtros opcionales)
const getAllTasks = async (req, res, next) => {
  try {
    const { completed, search } = req.query;
    const whereClause = {};

    // Filtro por estado "completed"
    if (completed === 'true' || completed === 'false') {
      whereClause.completed = completed === 'true';
    }

    // Búsqueda por título o descripción (usando LIKE de SQL)
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ['id', 'name'] }], // Incluye datos del usuario asociado
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error); // Pasa el error al middleware de errores
  }
};

// Crear una nueva tarea (asociada al usuario logueado)
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // Asume que authMiddleware añade el usuario a req.user

    const newTask = await Task.create({
      title,
      description,
      completed: false, // Valor por defecto
      userId, // Asigna la tarea al usuario
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Obtener una tarea específica por ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name'] }],
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Opcional: Validar que la tarea pertenezca al usuario (si es necesario)
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Actualizar una tarea
const updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validar propiedad de la tarea
    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Actualiza solo los campos proporcionados
    const updatedTask = await task.update({
      title: title || task.title,
      description: description || task.description,
      completed: completed !== undefined ? completed : task.completed,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Eliminar una tarea
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await task.destroy();
    res.status(204).end(); // 204 = No Content (éxito sin respuesta body)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};