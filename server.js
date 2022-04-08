const express = require('express')
const app = express()
const port = 8000
let jsonData = require('./pokedex.json')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => res.send('Hello World!'))

app.get('/pokemon', (req, res) => {
    fs.readFile('./pokedex.json', 'utf8', (err, data) => {
        res.send(JSON.parse(data));
    })
})

app.get('/pokemon/:id', (req, res) => {
    fs.readFile('./pokedex.json', 'utf8', (err, data) => {
        console.log(req.params.id)
        const result = jsonData.find(pokemon => pokemon.id == req.params.id);
        console.log(result)
        res.send(result)
        
    })
})

app.get('/pokemon/:id/:info', (req, res) => {
    fs.readFile('./pokedex.json', 'utf8', (err, data) => {
        let attribute = req.params.info;
        const result = jsonData.find(pokemon => pokemon.id == req.params.id);
        console.log(result[attribute])
        res.send(result[attribute])
        
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

