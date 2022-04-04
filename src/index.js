const express = require ('express');
const app = express();
const path = require('path'); //para buscar carpetas...
// const bodyParser = require('body-parser');

//importando las variables del entorno
require('dotenv').config();

//Le estamos diciendo a Express que entienda los datos que llegan de un Formulario
// [Object: null prototype] {
//     name: 'IDEATECH',
//     email: 'julioa@laideatech.net',
//     phone: '04145278657',
//     message: 'Esto es un mensaje...'
//   }
app.use(express.urlencoded({extended: false}));

//esto es para recibir los datos json desde react o angular...
app.use(express.json());

//importando las rutas
app.use(require('./routes/index'));


//le estamos diciendo a express que esta carpeta se puede usar desde cualquier parte
//__dirname nos da la ruta completa de la carpeta public del servidor.
app.use(express.static(path.join(__dirname, 'public')));



//servidor escuchando en el puerto 3000
// app.listen(3000, () => {
const MS_PORT = process.env['PORT']
app.listen(MS_PORT || 4000, () => {
    // app.listen(3000, () => {
    console.log('Server running on port:', MS_PORT);
    // console.log('Server running on port:', 3000);
});



