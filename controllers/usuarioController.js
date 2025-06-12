/** Controlador encargado del login
 *  las funciones de este ocntrolador se utilizan en las rutas, dandole
 *  una respuesta al usuraio cuando ejecute el endpoint
 */

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        //Se le pasan parametros (solo con template engine )
        pagina: 'Iniciar sesión'
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
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
    formularioOlvidePassword
}