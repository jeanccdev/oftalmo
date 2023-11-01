import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Doutor = sequelize.define('Doutores', {
    idDoutor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nome: DataTypes.STRING,
    apelido: {
        type: DataTypes.STRING,
        unique: true
    },
    especialidade: DataTypes.STRING
})

Doutor.sync()

export default Doutor