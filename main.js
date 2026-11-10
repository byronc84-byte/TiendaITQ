//llamar a dotenv para variables de entorno
require('dotenv').config();
//llamar ala aplicacion de express
const app=require('./src/app.js');

//encriptar el servidor 

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Servidor listo en el puerto 3000');
});