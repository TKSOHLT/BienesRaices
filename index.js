// const express = require('express'); // commonjs
import express from 'express'; //ESmodules
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app
const app = express();

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta pública (esto especifica en donde estarán los archvos públicos)
app.use( express.static('public') )

//Routing
app.use('/auth', usuarioRoutes); //  'use' Muestra todas las rutas que inician con '/' ||=> a esto se le conoce como middleware

//Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor està funcionando en el puerto ${port}`)
});