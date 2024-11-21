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
app.use(express.json())

const cats = []
let currentCatId = 1

app.get('/ping', (req, res) => {
    res.send('pong')
})

// get all cats
app.get('/cats', (req, res) => {
    res.status(200).json(cats)
}) 

// add a cat
app.post('/cats', (req, res) => {
    let newCat = req.body
    newCat.id = currentCatId
    cats.push(newCat)
    currentCatId++
    res.status(201).json(newCat)
})

// get a particular cat
app.get('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const cat = cats.find(e => e.id === id)
    if (cat) {
        res.status(200).json(cat)
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

app.put('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const catIndex = cats.findIndex(e => e.id === id)
    if (catIndex !== -1) {
        cats[catIndex].name = req.body.name
        res.status(202).json(cats[catIndex])
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

app.delete('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const catIndex = cats.findIndex(e => e.id === id)
    if (catIndex !== -1) {
        cats.splice(catIndex, 1)
        res.status(204).json({ message: 'deleted' })
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

app.listen(8080)