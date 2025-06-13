import Sequelize  from "sequelize";
import dotenv from 'dotenv';
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS ?? '', {
    host: process.env.BD_HOST,
    port: 3307,
    dialect: 'mysql',
    define: {
        //Esto agrega dos columnas extras a la tabla de usuarios, una tiene cuando fue creado y otra cuando fue actualizado
        timestamps: true
    },
    //El pool configura el comportamiento para conexiones nuevas o existentes, mantiene o reutiliza las conexiones para evitar
    //multples instancias
    pool: {
        max: 5, //Maximo de conexiones
        min: 0, //Minimo de conexiones
        acquire: 30000, //Tiempo antes de marcar un error
        idle: 10000 //Tiempo para finalizar la base de datos o liberar memoria
    },
    operatorAliases: false
});

export default db;