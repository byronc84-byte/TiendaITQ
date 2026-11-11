//Llamar al Router de express (con llaves: solo traemos Router)
const { Router } = require('express');
 
//Llamamos al controlador de productos
const control = require('../Controllers/ControllerCategoria.js');
 
const routesCategoria = Router();
 
//Rutas de productos
routesCategoria.get('/', control.listarCategorias);
routesCategoria.get('/:id', control.obtenerCategoriaPorId);
routesCategoria.post('/', control.crearCategoria);
routesCategoria.put('/:id', control.actualizarCategoria);
routesCategoria.delete('/:id', control.eliminarCategoria);
 
module.exports = routesCategoria;
