import express from 'express'
import Doutor from '../models/Doutor.js'
import AgendaDoutores from '../models/AgendaDoutores.js'
import Agendamento from '../models/Agendamento.js'
import Paciente from '../models/Paciente.js'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/', async (req, res) => {
    console.clear()
    const doutores = await Doutor.findAll()
    res.render('agenda/agendaALL', {
        doutores: doutores,
        linkAgendas: true
    })
})

router.get('/:idDoutor/:dia', async (req, res) => {
    console.clear()
    const { idDoutor, dia } = req.params
    const date = new Date(dia)
    console.log(date.getDay())
    const agendaAtualizada = []

    // Busca os dados do Doutor
    const doutor = await Doutor.findOne({ where: { idDoutor: idDoutor } })

    // Busca os dados das configurações da agenda do Doutor encontrado
    const agendaDoutor = await AgendaDoutores.findAll({
        where: {
            idDoutor: idDoutor,
            diaSemana: date.getDay()
        }
    })

    // Busca os agendamentos na agenda do Doutor encontrado e no dia selecionado
    const agendamentos = await Agendamento.findAll({
        where: {
            idDoutor: idDoutor,
            timestamp: {
                [Op.between]: [date, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, date.getHours())]
            }
        }
    })

    for (const agenda of agendaDoutor) {
        date.setUTCHours(agenda.inicio.split(':')[0])
        date.setUTCMinutes(agenda.inicio.split(':')[1])
        const fim = new Date(date)
        fim.setUTCHours(agenda.fim.split(':')[0])
        fim.setUTCMinutes(agenda.fim.split(':')[1])
        for (let i = date.getTime(); i <= fim.getTime(); i = i + (agenda.intervalo * 60000)) {
            const horario = new Date(i)
            const existeAgendamento = agendamentos.find((elemento, index) => elemento.dataValues.timestamp.getTime() >= horario.getTime() && elemento.dataValues.timestamp.getTime() <= horario.getTime() + (agenda.intervalo * 59999))

            const agendamento = {
                horario: `${String(horario.getUTCHours()).padStart(2, '0')}:${String(horario.getUTCMinutes()).padStart(2, '0')}`,
                paciente: '',
                primeira: '',
                retorno: '',
                planoSaude: '',
                status: '',
                local: ''
            }

            if (existeAgendamento) {
                console.log()
                const paciente = await Paciente.findOne({ where: { idPaciente: existeAgendamento.dataValues.idPaciente } })
                agendamento.paciente = paciente.dataValues.nome
                agendamento.primeira = existeAgendamento.dataValues.primeira
                agendamento.retorno = existeAgendamento.dataValues.retorno
                agendamento.planoSaude = existeAgendamento.dataValues.planoSaude
                agendamento.status = existeAgendamento.dataValues.status
                agendamento.local = existeAgendamento.dataValues.local
            }
            agendaAtualizada.push(agendamento)
        }
    }

    res.render('atendimento', {
        doutor: doutor.dataValues,
        agendaAtualizada,
        linkAgendas: true
    })
})

export default router