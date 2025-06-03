README - Sistema de Gestión de Tareas (FullStack)
Descripción

Aplicación completa para gestión de tareas con:

    Backend: Node.js + Express + MySQL (Docker)

    Frontend: React + Vite

    Autenticación JWT

    CRUD completo de tareas

Requisitos previos
    Docker (instalación)

    Node.js v18+ (descarga)

    npm v9+ (viene con Node.js)

🚀 Configuración inicial
1. Base de datos MySQL con Docker

Ejecuta este comando para crear el contenedor:

    docker run --name todo-mysql \
    -e MYSQL_DATABASE=todo_db \
    -e MYSQL_USER=todouser \
    -e MYSQL_PASSWORD=todopassword \
    -e MYSQL_ROOT_PASSWORD=rootpassword \
    -p 3306:3306 \
    -v todo-mysql-data:/var/lib/mysql \
    -d mysql:8.0 \
    --default-authentication-plugin=mysql_native_password

2. Configuración del backend

Crea el archivo .env en todo-backend/:
    
    # JWT
    JWT_SECRET=521Vida&GerCop
    JWT_EXPIRES_IN=7h
    
    # Database
    DB_NAME=todo_db
    DB_USER=todouser
    DB_PASSWORD=todopassword
    DB_HOST=localhost
    DB_PORT=3306
    DB_DIALECT=mysql
    
    # Server
    PORT=3000
    NODE_ENV=development
    
    # CORS
    CORS_ORIGIN=*
    CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
    CORS_CREDENTIALS=true

💻 Ejecución local

  Backend
    
    cd todo-backend
    npm install
    npx sequelize-cli db:migrate
    npm run dev

  Frontend
    
    cd todo-frontend
    npm install
    npm run dev

🔍 Verificación 
   Backend: http://localhost:3000/api/tasks (debería responder)
   Frontend: http://localhost:5173

🚨 Solución de problemas
  Error de conexión a MySQL
  bash
    # Verificar que el contenedor esté corriendo
    docker ps
    # Si necesitas resetear la contraseña
    docker exec -it todo-mysql mysql -u root -p
 sql
  ALTER USER 'todouser' IDENTIFIED WITH mysql_native_password BY 'todopassword';
  FLUSH PRIVILEGES;

🌐 Despliegue en producción
Backend
  Crear imagen Docker:
    bash
    
    cd todo-backend
    docker build -t todo-backend .

  Ejecutar contenedor:
    bash

    docker run --name todo-backend \
      -p 3000:3000 \
      --env-file .env.production \
      -d todo-backend

Frontend
  Crear build de producción:
  bash

    cd todo-frontend
    npm run build

  Servir con NGINX o similar.

📊 Estructura de la base de datos

Las tablas se crean automáticamente con estos modelos:
javascript

    // Models/User.js
    module.exports = (sequelize, DataTypes) => ({
      username: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING
    });
    
    // Models/Task.js
    module.exports = (sequelize, DataTypes) => ({
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
      userId: DataTypes.INTEGER
    });

📝 Endpoints principales
Método	Endpoint	Descripción
  POST	/api/auth/register	Registro de usuario
  POST	/api/auth/login	Inicio de sesión
  GET	/api/tasks	Obtener todas las tareas
  POST	/api/tasks	Crear nueva tarea
  PUT	/api/tasks/:id	Actualizar tarea
  DELETE	/api/tasks/:id	Eliminar tarea

📌 Notas importantes

  El frontend espera el backend en http://localhost:3000

  Para producción, actualiza CORS_ORIGIN con tu dominio

  Los datos persisten gracias al volumen Docker todo-mysql-data


    
