//Se instalan los paquetes requeridos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contListar = require('./controlador/listarCompetenciasController.js');


const app =express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Pedidos GET de cada ruta
app.get('/competencias', contListar.listarCompetencias);


// Pedidos POST de cada ruta



//Pedidos DELETE de cada ruta



//Pedidos PUT de cada ruta



//Seteamos el puerto para que la app escuche los pedidos
const puerto = '8000';

app.listen(puerto, () => {
    console.log("Escuchando pedidos en el puerto " + puerto);
})
