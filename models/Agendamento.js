import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Agendamento = sequelize.define('agenda_agendamento', {
    idAgendamento : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    idDoutor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    primeira: DataTypes.STRING,
    retorno: DataTypes.STRING,
    status: DataTypes.STRING,
    planoSaude: DataTypes.STRING,
    local: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Agendamento.sync()

export default Agendamento