const mongoose = require('mongoose');
const { Schema } = mongoose;

const fightSchema = new Schema({
    user: String,
    games_played: Number,
    games_won: Number,
    games_lost: Number
});

module.exports = mongoose.model('Fight', fightSchema);