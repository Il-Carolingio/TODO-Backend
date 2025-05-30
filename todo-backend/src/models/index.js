import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool
  }
);

const modelDefiners = [
  import('./Users.js'),
  import('./Task.js')
];

const models = {};
for (const modelDefiner of modelDefiners) {
  const model = (await modelDefiner).default(sequelize);
  models[model.name] = model;
}

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export const User = models.User;
export const Task = models.Task;