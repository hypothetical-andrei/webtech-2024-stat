import express from 'express'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
})

const Cat = sequelize.define('cat', {
    name: Sequelize.STRING(15),
    weight: Sequelize.INTEGER
})

try {
    await sequelize.sync({ alter: true })
} catch (err) {
    console.error(err)
}

const app = express()
app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
    console.log('middleware called')
    next()
})

app.get('/ping', (req, res) => {
    res.send('pong')
})

// get all cats
app.get('/cats', async (req, res, next) => {
    try {
        const cats = await Cat.findAll()
        res.status(200).json(cats)
    } catch (error) {
       next(error)
    }
}) 

// add a cat
app.post('/cats', async (req, res, next) => {
    try {
        const cat = await Cat.create(req.body)
        res.status(201).json(cat)
    } catch (error) {
        next(error)
    }
})

// get a particular cat
app.get('/cats/:id', async (req, res, next) => {
    try {
        const cat = await Cat.findByPk(req.params.id)
        if (cat) {
            res.status(200).json(cat)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.put('/cats/:id', async (req, res, next) => {
    try {
        const cat = await Cat.findByPk(req.params.id)
        if (cat) {
            cat.name = req.body.name
            cat.weight = req.body.weight
            await cat.save()
            res.status(202).json(cat)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.delete('/cats/:id', async (req, res, next) => {
    try {
        const cat = await Cat.findByPk(req.params.id)
        if (cat) {
            await cat.destroy()
            res.status(204).json({})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'error' })
})

app.listen(8080)