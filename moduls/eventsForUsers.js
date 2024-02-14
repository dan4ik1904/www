const mongoose = require('mongoose')
// const Schema = new mongoose.Schema

const eventsForUsersSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
    },
    idEvent: {
        type: String,
        required: true,
    },
    isCon: {
        type: String,
        required: true,
    }
})

const EventsForUsers = mongoose.model('eventForUsers', eventsForUsersSchema)
module.exports = EventsForUsers