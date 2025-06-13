// const express = require('express'); // commonjs
import express from 'express'; //ESmodules
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//** app.use es un middleware que se manda en todas las diferentes peticiones */

//Crear la app
const app = express();

//Habilitar lectura de datos de forumlarios
app.use( express.urlencoded({extended: true}) );

//Habilitar cookie parser
//Esta línea habilita el middleware cookie-parser, que permite a tu servidor leer las cookies que el cliente (navegador) envía en cada petición.
app.use( cookieParser() )

//Habilitar CSRF
//Este middleware habilita protección contra ataques CSRF (Cross-Site Request Forgery), usando un token que se guarda en una cookie.
app.use( csrf({cookie: true}) )

//Conexión a la base de datos
try{
    await db.authenticate();
    db.sync(); // => Esto es un CREATE IF NOT EXIST
    console.log('Conexión correcta a la base de datos');
} catch(error){
    console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta pública (esto especifica en donde estarán los archvos públicos)
app.use( express.static('public') )

//Routing
app.use('/auth', usuarioRoutes); //  'use' Muestra todas las rutas que inician con '/' ||=> a esto se le conoce como middleware

//Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor està funcionando en el puerto ${port}`)
});