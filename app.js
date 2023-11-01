import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars'
import AtendimentoController from './controllers/AtendimentoController.js'

console.clear()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('./public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => res.send(`Servidor rodando na URL http://localhost:${port}`))
app.use('/dashboard/atendimento', AtendimentoController)

const port = process.env.PORT
app.listen(port, () => console.log(`Servidor rodando na URL http://localhost:${port}`))