/** Controlador encargado del login
 *  las funciones de este ocntrolador se utilizan en las rutas, dandole
 *  una respuesta al usuraio cuando ejecute el endpoint
 */
import { check, validationResult } from "express-validator";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";
import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        //Se le pasan parametros (solo con template engine )
        pagina: 'Iniciar sesión'
    });
}

const formularioRegistro = (req, res) => {
    //Se puede acceder a esta función por el middleware inyectado desde index.js
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        //Este token publico se genera
        csrfToken: req.csrfToken()
    });
}

const registrar = async (req, res) => {
    //Validación, check es de exprees-validator, y funciona para comprimir el codigo para
    //validar los datos
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({ min: 6}).withMessage('El password debe ser de al menos 6 caracteres').run(req);
    await check('repetir_password').custom((value, { req }) => value === req.body.password).withMessage('Los passwords no son iguales').run(req);

    let resultado = validationResult(req);

    //Para obtener los datos es con req.body
    //Extraer los datos
    const { nombre, email, password } = req.body;

    //Verificar que el resultado esté vacío
    if(!resultado.isEmpty()){
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            //object literal enhancement
            usuario: {
                nombre,
                email
            },
            csrfToken: req.csrfToken()
        });
    }


    //Verificar que el usuario no esté duplicado
    const existeUsuario = await Usuario.findOne ( { where : {  email } } ) // email : req.body.email es igual a email (por el object literal enhancement)
    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El usuario ya está registrado'}],
            //object literal enhancement
            usuario: {
                nombre,
                email
            },
            csrfToken: req.csrfToken()
        })
    }

    //object literal enhancement y almacenamiento de usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    //Envía email de confirmación
    emailRegistro({
        nombre,
        email,
        token: usuario.token
    });

    //Mostrar mensaje de confirmación
    res.render('templates/mensajes', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace.'
    })
}

//Función que comprueba una cuenta
const confirmar = async (req, res) => {

    //Con get se obtienen los datos con req.params
    const { token } = req.params;

    //Verificar si el token es válido
    const usuario = await Usuario.findOne({where: {token}});

    if(!usuario){
        res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }

    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    //Utilizando ORM de sequelize
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente',
        error: false
    });
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a bienes raices'
    });
}

//Con este export solo se exporta un unico default, además se puede nombrar como se desee
// export default formularioLogin

//Con este export se pueden agregar multiples funciones, se debe utilizar el mismo nombre de la función
export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
}