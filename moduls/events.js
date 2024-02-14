const mongoose = require('mongoose')
// const Schema = new mongoose.Schema

const eventsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creater: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    about: {
        type: String,
        required: true,
    }
})

const Events = mongoose.model('Events', eventsSchema)
module.exports = Events