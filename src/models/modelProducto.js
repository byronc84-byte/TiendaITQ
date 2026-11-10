//importar la conexion ala base de datos
const pool = require('../configdb/db');

async function listarProducto() {
  const r = await pool.query('SELECT * FROM productos ORDER BY id');
  return r.rows;
}

async function obtenerProductoPorId(id) {
  const r = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
  return r.rows[0];                       // undefined si no existe
}

async function crearProducto({ nombre, precio, stock }) {
  const r = await pool.query(
    `INSERT INTO productos (nombre, precio, stock)
     VALUES ($1, $2, $3) RETURNING *`,
    [nombre, precio, stock || 0]
  );
  return r.rows[0];
}
async function actualizarProducto(id, { nombre, precio, stock }) {
  const r = await pool.query(
    `UPDATE productos SET nombre = $1, precio = $2, stock = $3
     WHERE id = $4 RETURNING *`,
    [nombre, precio, stock || 0, id]
  );
  return r.rows[0];                       // undefined si no existe
}

async function eliminarProducto(id) {
  const r = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
  return r.rowCount > 0;                  // true si borró algo
}

module.exports = { listarProducto,
     obtenerProductoPorId,
      crearProducto,
       actualizarProducto,
        eliminarProducto
     };