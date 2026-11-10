// src/routes/productos.routes.js · solo las rutas
const { Router } = require('express');
const control = require('../Controller/ControllerProducto.js');

const router = Router();
//rutas de productos
router.get('/', control.listarProducto);
router.get('/:id', control.obtenerProductoPorId);
router.post('/', control.crearProducto);
router.put('/:id', control.actualizarProducto);
router.delete('/:id', control.eliminarProducto);

module.exports = router;