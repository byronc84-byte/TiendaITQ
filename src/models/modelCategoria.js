
const pool = require('../configdb/db');
 
 
//Funciones de Listar
async function listarCategorias(){
    const r = await pool.query('SELECT * FROM categorias');
    return r.rows;
}
//Funciones de Obtener por ID
async function obtenerCategoriaPorId(id){
    const r = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
    return r.rows[0];
}
 
//Funciones de Crear
async function crearCategoria(nombre){
    const r = await pool.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING *', [nombre]);
    return r.rows[0];
}
//Funciones de Actualizar
async function actualizarCategoria(id, nombre){
    const r = await pool.query('UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    return r.rows[0];
}
//Funcion de Eliminar
async function eliminarCategoria(id){
    const r = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
    return r.rows[0];
}
 
//Exportar las funciones
module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}