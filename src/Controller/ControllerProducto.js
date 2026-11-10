
// Llama al modelo de producto
const Producto = require('../models/modelProducto.js');

// Validaciones
const datosValidos = d =>
  typeof d.nombre === 'string' &&
  d.nombre.trim() !== '' &&
  Number.isFinite(Number(d.precio)) &&
  Number(d.precio) > 0 &&
  Number.isInteger(Number(d.stock)) &&
  Number(d.stock) >= 0;

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
  const { nombre, precio, stock } = req.body || {};

  if (!datosValidos({ nombre, precio, stock }))
    return res.status(400).json({ mensaje: 'Datos inválidos' });

  const producto = await Producto.crearProducto({
    nombre: nombre.trim(),
    precio: Number(precio),
    stock: Number(stock)
  });

  res.status(201).json(producto);
}

async function actualizarProducto(req, res) {
  const id = Number(req.params.id);
  const { nombre, precio, stock } = req.body || {};

  if (!idValido(id))
    return res.status(400).json({ mensaje: 'Id inválido' });

  if (!datosValidos({ nombre, precio, stock }))
    return res.status(400).json({ mensaje: 'Datos inválidos' });

  const producto = await Producto.actualizarProducto(id, {
    nombre: nombre.trim(),
    precio: Number(precio),
    stock: Number(stock)
  });

  if (!producto)
    return res.status(404).json({ mensaje: 'Producto no encontrado' });

  res.status(200).json(producto);
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
