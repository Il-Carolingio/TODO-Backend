const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100], // Mínimo 3 caracteres, máximo 100
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: { // Clave foránea que referencia al usuario
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nombre de la tabla (no del modelo)
      key: 'id',
    },
  },
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
  paranoid: true, // Habilita borrado lógico (añade deletedAt)
});

// Relación con el modelo User (asumiendo que existe)
Task.associate = (models) => {
  Task.belongsTo(models.User, { 
    foreignKey: 'userId',
    as: 'user', // Alias para la asociación (opcional)
  });
};

module.exports = Task;