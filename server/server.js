//Se instalan los paquetes requeridos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contListar = require('./controlador/listarCompetenciasController.js');
const contObtCompPorId = require('./controlador/obtenerCompPorIdController.js');
const contObtOpc = require('./controlador/obtenerOpcionesController.js');
const contGuardarVotos = require('./controlador/guardarVotosController.js');
const contObtRes = require('./controlador/obtenerResultadosController.js');
const contCrearComp = require('./controlador/crearCompController.js');
const contElimVotos = require('./controlador/eliminarVotosController.js');
const contObtGeneros = require('./controlador/obtenerGenerosController.js');
const contObtActores = require('./controlador/obtenerActoresController.js');
const contObtDirectores = require('./controlador/obtenerDirectoresController.js');
const contElimComp = require('./controlador/eliminarCompController.js');
const contEditarComp = require('./controlador/editarCompController.js');

const app =express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Pedidos GET de cada ruta
app.get('/competencias', contListar.listarCompetencias);
app.get('/competencias/:id', contObtCompPorId.obtenerCompetenciaPorId);
app.get('/competencias/:id/peliculas', contObtOpc.obtenerOpciones);
app.get('/competencias/:id/resultados', contObtRes.obtenerResultados);
app.get('/generos', contObtGeneros.obtenerGeneros);
app.get('/actores', contObtActores.obtenerActores);
app.get('/directores', contObtDirectores.obtenerDirectores);

// Pedidos POST de cada ruta
app.post('/competencias/:id/voto', contGuardarVotos.guardarVotos);
app.post('/competencias', contCrearComp.crearCompetencia);


//Pedidos DELETE de cada ruta
app.delete('/competencias/:id/votos', contElimVotos.eliminarVotos);
app.delete('/competencias/:id', contElimComp.eliminarCompetencia);


//Pedidos PUT de cada ruta
app.put('/competencias/:id', contEditarComp.editarCompetencia); 


//Seteamos el puerto para que la app escuche los pedidos
const puerto = '8080';

app.listen(puerto, () => {
    console.log("Escuchando pedidos en el puerto " + puerto);
})
