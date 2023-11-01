import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const AgendaDoutores = sequelize.define('agenda_agendadoutores', {
    idAgenda : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    idDoutor: {
        type: DataTypes.INTEGER
    },
    diaSemana: DataTypes.INTEGER,
    inicio: DataTypes.STRING,
    fim: DataTypes.STRING,
    intervalo: DataTypes.INTEGER,
    local: DataTypes.STRING
})

AgendaDoutores.sync()

export default AgendaDoutores