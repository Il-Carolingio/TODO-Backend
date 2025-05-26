const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No hay tareas registradas.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <small>
                    Estado: {task.completed ? 'Completada' : 'Pendiente'}
                  </small>
                </div>
                <div className="task-actions">
                  <button onClick={() => onEdit(task)}>Editar</button>
                  <button onClick={() => onDelete(task.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TaskList;