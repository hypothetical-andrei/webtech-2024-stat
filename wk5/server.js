import express from 'express'
import { Sequelize } from 'sequelize'

const conn = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
})

const TemperatureRecord = conn.define('temperatureRecord', {
    station: Sequelize.STRING,
    level: Sequelize.INTEGER
})

try {
    await conn.sync({ alter: true })
} catch (error) {
    console.warn(error)
}

const app = express()
app.use(express.static('public'))
app.use(express.json())

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
})

app.get('/temperature-records', async (req, res, next) => {
    try {
        const records = await TemperatureRecord.findAll()
        res.status(200).json(records)
    } catch (error) {
        next(error)
    }
})

app.post('/temperature-records', async (req, res, next) => {
    try {
        let newTemperatureRecord = req.body
        const record = await TemperatureRecord.create(newTemperatureRecord)
        res.status(201).json(record)
    } catch (error) {
        next(error)
    }
})

app.get('/temperature-records/:id', async (req, res, next) => {
    try {
        const record = await TemperatureRecord.findByPk(req.params.id)
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.put('/temperature-records/:id', async (req, res, next) => {
    try {
        const record = await TemperatureRecord.findByPk(req.params.id)
        if (record) {
            record.level = req.body.level
            record.station = req.body.station
            await record.save()
            res.status(202).json(record)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.delete('/temperature-records/:id', async (req, res, next) => {
    try {
        const record = await TemperatureRecord.findByPk(req.params.id)
        if (record) {
            await record.destroy()
            res.status(204).json({})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.warn(error)
    res.status(500).json({ message: 'server error' })
})

app.listen(8080)