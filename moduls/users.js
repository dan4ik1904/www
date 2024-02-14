const mongoose = require('mongoose')
// const Schema = new mongoose.Schema

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    }
})

const Users = mongoose.model('Users', usersSchema)
module.exports = Users