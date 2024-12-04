import pg from "pg";
import { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } from "../src/config.js";

// Variable global para manejar la conexión de la base de datos
let pool = null;

// Función para conectar a la base de datos
export const connectToDatabase = (dbName) => {
  // Si ya hay una conexión, la cerramos
  if (pool) {
    pool.end();
  }

  // Si no se pasa un nombre de base de datos, no conectamos
  if (!dbName) {
    pool = null;
    return;
  }

  // Establecer la nueva conexión a la base de datos
  pool = new pg.Pool({
    host: DB_HOST,
    port: DB_PORT,
    database: dbName, // Usa el nombre de la base de datos que se pasa
    user: DB_USER,
    password: DB_PASSWORD,
  });
};

// Función para obtener el pool de la base de datos
export const getPool = () => {
  if (!pool) {
    throw new Error("No hay conexión a la base de datos");
  }
  return pool;
};
