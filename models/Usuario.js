//El ORM crea todo como objetos, por lo que se requiere poner en mayúsculas las clases (convicción)

import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js'

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
}, {
    hooks: {
        //Define un "hook" que corre antes de que Sequelize cree (inserte) un nuevo registro en la tabla usuario.
        beforeCreate: async function(usuario) {
            //Genera una "sal" criptográfica. El número 10 indica la complejidad del proceso (más alto = más seguro pero más lento).
            const salt = await bcrypt.genSalt(10);
            //Hashea (encripta) la contraseña del usuario usando bcrypt y la sal generada, y sobrescribe la contraseña original en texto plano por la encriptada.
            usuario.password = await bcrypt.hash( usuario.password, salt);
        }
    }
});

export default Usuario;