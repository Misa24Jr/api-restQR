import express from 'express';
import indexRoutes from './routes/index.routes.js';
import { connectToDatabase } from '../database/connectionBDD.js';
import { PORT } from './config.js';

const app = express();
app.use(express.json());

// Diccionario con claves y valores de bases de datos
const dbMapping = {
  verde: "cristorey",
  azul: "petion",
};

app.post("/configurar-base-datos", (req, res) => {
  const { dbName } = req.body;

  // Verificar si el nombre enviado existe en el diccionario
  const actualDbName = dbMapping[dbName];
  if (!actualDbName) {
    return res.status(400).send("Nombre de base de datos no válido.");
  }

  try {
    connectToDatabase(actualDbName); // Conectar a la base de datos correspondiente
    res.send(`Conexión a la base de datos '${actualDbName}' establecida con éxito.`);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    res.status(500).send("Error al conectar a la base de datos.");
  }
});

app.post("/limpiar-base-datos", (req, res) => {
  connectToDatabase(null); // Elimina la conexión a la base de datos
  res.send("Conexión eliminada. No hay base de datos configurada.");
});

// Rutas de empleados
app.use(indexRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not found' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
