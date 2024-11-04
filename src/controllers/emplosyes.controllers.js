import { pool } from "../../database/connectionBDD.js";

export const getUsuarios = async (req, res) => {
  const response = await pool.query("SELECT * FROM asistencia_diaria");
  res.json(response.rows);
};

export const getUsuarioById = async (req, res) => {
  const { id } = req.params; // Extrae el id de los parámetros de la URL

  try {
    const response = await pool.query("SELECT * FROM asistencia_diaria WHERE id_persona = $1;", [id]);

    if (response.rows.length > 0) {
      res.json(response.rows[0]); // Devuelve el registro encontrado
    } else {
      res.status(404).send("Registro no encontrado"); // Maneja el caso donde no hay registro
    }
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    res.status(500).send("Error al obtener el registro");
  }
};

export const postUsuario = async (req, res) => {
  try {
    // Espera a que se complete la consulta antes de continuar
    await pool.query("INSERT INTO asistencia_diaria (fe_fecha) VALUES (CURRENT_TIMESTAMP);");
    
    console.log(req.body);
    res.send("Creando un registro");
  } catch (error) {
    // Captura y muestra el error si algo falla en la consulta
    console.error("Error al crear el registro:", error);
    res.status(500).send("Error al crear el registro");
  }
};

export const putUsuario = (req, res) => {
  res.send("actualizando un registro");
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params; // Extrae el id de los parámetros de la URL

  try {
    const response = await pool.query(
      "DELETE FROM asistencia_diaria WHERE id_persona = $1",
      [id]
    );

    if (response.rowCount > 0) {
      res.send("Registro eliminado correctamente");
    } else {
      res.status(404).send("Registro no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    res.status(500).send("Error al eliminar el registro");
  }
};

