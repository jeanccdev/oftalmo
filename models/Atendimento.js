import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Atendimento = sequelize.define('atendimento', {
    idAtendimento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    idDoutor: DataTypes.INTEGER,
    idPaciente: DataTypes.INTEGER,
    dia: DataTypes.DATE,
    dados_atendimento: DataTypes.JSON
})

Atendimento.sync()

export default Atendimento