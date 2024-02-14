const mongoose = require('mongoose')
const Events = require('./moduls/events')
const EventForUsers = require('./moduls/eventsForUsers')
const Users = require('./moduls/users')

function getUser(name, password) {
    Users
        .find({name: name, password: password})
        .then(user => {return user})
}


module.exports = {getUser}