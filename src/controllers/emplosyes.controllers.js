import { getPool } from "../../database/connectionBDD.js";

export const getUsuarios = async (req, res) => {
  try {
    const pool = getPool(); // Obten la conexion actual
    const response = await pool.query("SELECT * FROM asistencia");
    res.json(response.rows);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).send("Error al obtener los usuarios: No hay conexion a la base de datos.");
  }
};
export const postUsuario = async (req, res) => {
  try {
    const pool = getPool(); // Obt�n la conexi�n actual
    const { id_persona } = req.body;

    // Inserta un registro en la tabla 'asistencia'
    const query = `
      INSERT INTO asistencia (fe_asistencia, id_persona) 
      VALUES (CURRENT_TIMESTAMP, $1)
      RETURNING *;
    `;

    // Ejecuta la consulta con el valor de id_persona
    const result = await pool.query(query, [id_persona || null]);

    // Responde con el registro creado
    res.status(201).json({
      message: "Registro creado exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({
      message: "Error al crear el registro",
      error: error.message,
    });
  }
};


