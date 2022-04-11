const express = require('express')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000
const fs = require('fs')
let jsonData = require('./pokedex.json')
const bodyParser = require('body-parser')
const Fight = require('./models/fightSchema');

mongoose.connect(process.env.MONGO_URL)


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

/*Pokemon Data*/
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


/*Fight Data*/
app.get('/game/leaderboard', (req, res) => {
    Fight.find()
    .then((fights) => res.send(fights))
})

app.post('/game/save', (req, res) => {
    Fight.create({user: req.body.user, games_played: req.body.games_played, games_won: req.body.games_won})
    .then((fight) => res.send(fight))
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

