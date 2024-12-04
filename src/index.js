import express from 'express';
import employesRoutes from './routes/employes.routes.js';
import indexRoutes from './routes/index.routes.js';
import { connectToDatabase } from '../database/connectionBDD.js';
import { PORT } from './config.js';

const app = express();
app.use(express.json());

// Rutas para gestionar la base de datos
app.post("/limpiar-base-datos", (req, res) => {
  connectToDatabase(null); // Elimina la conexión a la base de datos
  res.send("Conexión eliminada. No hay base de datos configurada.");
});

app.post("/configurar-base-datos", (req, res) => {
  const { dbName } = req.body;
  if (!dbName) {
    return res.status(400).send("El nombre de la base de datos es obligatorio.");
  }

  connectToDatabase(dbName); // Establece la conexión con el nombre de la base de datos
  res.send("Conexión a la base de datos establecida con éxito.");
});

// Rutas de empleados
app.use(employesRoutes);
app.use(indexRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not found' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
