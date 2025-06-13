//Los helpers son funciones reutilizables para no cargar tanto un controlador

//Función para generar tokens sin dependencias
const generarId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

export {
    generarId
}