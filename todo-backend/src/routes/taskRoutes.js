const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/', authMiddleware, taskController.getAllTasks);
router.post('/', authMiddleware, taskController.createTask);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;