
// Llama al modelo de producto
const Producto = require('../models/modelProducto.js');
const Categoria = require('../models/modelCategoria.js');

// Validacion de id (entero mayor a 0)
const idValid = id => Number.isInteger(Number(id)) && Number(id) > 0;
//Validacion de datos (ahora tambien categoria_id)
const datosValidados = d => d.nombre && Number(d.precio) > 0
    && Number(d.stock) >= 0 && idValid(d.categoria_id);

const idValido = id => Number.isInteger(id) && id > 0;

async function listarProducto(req, res) {
  res.status(200).json(await Producto.listarProducto());
}

async function obtenerProductoPorId(req, res) {
  const id = Number(req.params.id);

  if (!idValido(id))
    return res.status(400).json({ mensaje: 'Id inválido' });

  const producto = await Producto.obtenerProductoPorId(id);

  if (!producto)
    return res.status(404).json({ mensaje: 'Producto no encontrado' });

  res.status(200).json(producto);
}

async function crearProducto(req, res) {
    const { nombre, precio, stock, categoria_id } = req.body ?? {};
    if (!datosValidados({ nombre, precio, stock, categoria_id })) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    // ¿Existe la categoria? Se pregunta antes de guardar
    const categoria = await Categoria.obtenerCategoriaPorId(categoria_id);
    if (!categoria) {
        return res.status(400).json({ error: 'La categoría no existe' });
    }
    const nuevo = await Producto.crearProducto(
        { nombre, precio, stock, categoria_id });
    res.status(201).json(nuevo);
}

async function actualizarProducto(req, res) {
    const id = Number(req.params.id);
    const { nombre, precio, stock, categoria_id } = req.body ?? {};
    if (!idValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    if (!datosValidados({ nombre, precio, stock, categoria_id })) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    const categoria = await Categoria.obtenerCategoriaPorId(categoria_id);
    if (!categoria) {
        return res.status(400).json({ error: 'La categoría no existe' });
    }
    const actualizado = await Producto.actualizarProducto(
        id, { nombre, precio, stock, categoria_id });
    if (!actualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(actualizado);
}

async function eliminarProducto(req, res) {
  const id = Number(req.params.id);

  if (!idValido(id))
    return res.status(400).json({ mensaje: 'Id inválido' });

  const borrado = await Producto.eliminarProducto(id);

  if (!borrado)
    return res.status(404).json({ mensaje: 'Producto no encontrado' });

  res.status(204).send();
}

module.exports = {
  listarProducto,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
