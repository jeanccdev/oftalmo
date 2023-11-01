import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Usuario = sequelize.define('Usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: DataTypes.STRING
})

Usuario.sync()

export default Usuario