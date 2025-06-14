import express from 'express';
import { formularioLogin, formularioOlvidePassword, formularioRegistro, registrar, confirmar } from '../controllers/usuarioController.js';

const router = express.Router();

//---------------Sin agrupar---------------
// router.get('/', function(req, res){
//     res.json({msg: 'Hola Mundo en express'})
// });

// router.post('/', function(req,res){
//     res.json({msg: 'Respuesta de tipo Post'})
// });

//---------------Agrupado por ruta y según su método---------------
// router.route('/')
//     .get(function(req, res){
//         res.json({msg: 'Hola Mundo en express'})
//     })
//     .post(function(req,res){
//         res.json({msg: 'Respuesta de tipo Post'})
//     })

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

//Utilizando routing dinamico:::
router.get('/confirmar/:token', confirmar)
router.get('/olvide-password', formularioOlvidePassword);

export default router;