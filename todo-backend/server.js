const app = require('./src/app');
const { PORT } = require('./src/config');

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});