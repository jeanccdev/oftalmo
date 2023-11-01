import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Paciente = sequelize.define('Pacientes', {
    idPaciente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nome: DataTypes.STRING,
    nascimento: DataTypes.STRING,
    cpf: DataTypes.STRING,
    rg: DataTypes.STRING,
    planoSaude: DataTypes.STRING,
    matricula: DataTypes.STRING,
    validade: DataTypes.STRING,
    telefones: DataTypes.STRING,
    cep: DataTypes.STRING,
    uf: DataTypes.STRING,
    cidade: DataTypes.STRING,
    bairro: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numCasa: DataTypes.STRING,
    complemento: DataTypes.STRING,
    profissao: DataTypes.STRING,
    estadoCivil: DataTypes.STRING,
    sexo: DataTypes.STRING,
    email: DataTypes.STRING
})

Paciente.sync()

export default Paciente