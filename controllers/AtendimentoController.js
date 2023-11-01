import express from 'express'
import Atendimento from '../models/Atendimento.js'
import Paciente from '../models/Paciente.js'
import Doutor from '../models/Doutor.js'
import { Op } from 'sequelize'

const router = express.Router()

// READ ALL
router.get('/', async (req, res) => {
    console.clear()
    const atendimentos = await Atendimento.findAll()
    res.json(atendimentos)
})

// READ ONE
router.get('/:idAtendimento', async (req, res) => {
    console.clear()
    const { idAtendimento } = req.params
    const atendimento = await Atendimento.findByPk(Number(idAtendimento))
    if (!atendimento) {
        res.status(404).json({ message: "Atendimento não encontrado" })
    } else {
        const atendimentosPaciente = await Atendimento.findAll({
            attributes: ['dia'],
            where: {
                idPaciente: atendimento.idPaciente,
                idAtendimento: { [Op.ne]: atendimento.idAtendimento }
            }
        })
        const doutor = await Doutor.findByPk(atendimento.dataValues.idDoutor)
        const paciente = await Paciente.findByPk(atendimento.dataValues.idPaciente)
        res.render('atendimento/atendimentoPK', {
            atendimento: atendimento.dataValues,
            doutor: doutor.dataValues,
            paciente: paciente.dataValues,
            layout: 'atendimento'
        })
    }
})

// CREATE
router.post('/', async (req, res) => {
    console.clear()
    const data = req.body
    const atendimentoCriado = await Atendimento.create(data)
    if (!atendimentoCriado) {
        res.status(404).json({ message: "Atendimento não foi criado" })
    } else {
        res.status(200).json(atendimentoCriado)
    }
})

// UPDATE
router.post('/update/:idAtendimento', async (req, res) => {
    console.clear()
    const { idAtendimento } = req.params
    const data = req.body
    const atendimento = await Atendimento.findByPk(idAtendimento)
    if (!atendimento) {
        res.status(404).json({ message: 'Atendimento não encontrado' })
    } else {
        atendimento.dados_atendimento = data

        await atendimento.save().reload()
        res.redirect(`http://localhost:3000/dashboard/atendimento/${atendimento.idAtendimento}`)
    }
})

// DELETE
router.delete('/:idAtendimento', async (req, res) => {
    console.clear()
    const { idAtendimento } = req.params
    const atendimento = await Atendimento.destroy({ where: { idAtendimento: idAtendimento } })
    if (!atendimento) {
        res.status(404).json({ message: "Atendimento não foi deletado" })
    } else {
        res.status(200).json(atendimento)
    }
})

export default router