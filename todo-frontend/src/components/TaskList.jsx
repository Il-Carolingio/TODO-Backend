import styles from './TaskList.module.css'; // Archivo CSS Modules que crearemos

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
            alt="No hay tareas" 
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>No hay tareas registradas</p>
        </div>
      ) : (
        <ul className={styles.taskItems}>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
            >
              <div className={styles.taskContent}>
                <div className={styles.taskStatus}>
                  <span className={`${styles.statusIndicator} ${task.completed ? styles.completedIndicator : ''}`}></span>
                </div>
                <div className={styles.taskInfo}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  {task.description && (
                    <p className={styles.taskDescription}>{task.description}</p>
                  )}
                  <div className={styles.taskMeta}>
                    <span className={`${styles.taskStatusBadge} ${task.completed ? styles.completedBadge : styles.pendingBadge}`}>
                      {task.completed ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.taskActions}>
                <button 
                  onClick={() => onEdit(task)} 
                  className={styles.editButton}
                >
                  <svg className={styles.icon} viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => onDelete(task.id)} 
                  className={styles.deleteButton}
                >
                  <svg className={styles.icon} viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;