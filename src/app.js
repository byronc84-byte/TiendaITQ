const express = require('express');
const routesProductos = require('./routes/routesProductos.js');

const app = express();
app.use(express.json());

app.use('/productos', routesProductos);   // un módulo, una línea

// Si algo falla en la base, responde 500 sin mostrar el error SQL
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});
//sirve para export la aplicacion
module.exports = app;