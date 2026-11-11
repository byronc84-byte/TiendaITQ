//Llamar a express
const express = require('express');
//Llamar a las rutas de productos
const routesProductos = require('./routes/routesProductos.js');
//Llamar a la ruta de Categoria
const routesCategoria = require('./routes/routesCategoria.js')
 
//Crear una aplicacion de express
const app = express();
app.use(express.json());
 
//Rutas de productos
app.use('/productos', routesProductos);
 
//Rutas de Categoria
app.use('/categorias',routesCategoria);
 
//Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
 
//Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});
 
// Sirve para exportar o empaquetar la aplicacion
module.exports = app;