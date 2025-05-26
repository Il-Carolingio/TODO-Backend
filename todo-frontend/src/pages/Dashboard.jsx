import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Obtener tareas al cargar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Manejar creación/actualización
  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      fetchTasks(); // Refrescar lista
      setEditingTask(null); // Resetear formulario
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Manejar edición
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Manejar eliminación
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.name}</h1>
      <div className="dashboard-content">
        <div className="task-form-container">
          <h2>{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <TaskForm 
            onSubmit={handleSubmit} 
            initialData={editingTask} 
          />
        </div>
        <div className="task-list-container">
          <h2>Mis Tareas</h2>
          <TaskList 
            tasks={tasks} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;