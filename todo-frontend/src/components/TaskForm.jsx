import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  // Si hay datos iniciales (edición), cargarlos
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        completed: initialData.completed,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      // Resetear solo si es nueva tarea
      setFormData({ title: '', description: '', completed: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          Completada
        </label>
      </div>
      <button type="submit">
        {initialData ? 'Actualizar Tarea' : 'Crear Tarea'}
      </button>
      {initialData && (
        <button type="button" onClick={() => onSubmit(null)}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default TaskForm;