const Events = require("../moduls/events")
const Users = require('../moduls/users')


const getEvent = (req, res) => {
    Events
        .find({ _id: req.params.id })
        .then(events => {
            res.status(200).json(events[0])
        })
}

const editEvent = async (req, res, next) => {
     await Events.updateOne({ _id: req.params.id }, {
        name: req.body.nameEvent,
        about: req.body.aboutEvent
    })
    .then(() => {
        next()
    })
}

const deleteEvent = (req, res, next) => {
    Events.deleteOne({_id: req.params.id})
        .then(() => {
            next()
        })
}

const getUser = (req, res) => {
    const id = req.params.id
    Users
        .find({_id: id})
        .then(user => {
            if (user.length === 0) {
                res.status(500).json({
                    message: 'Not user'
                })
            }else {
                res.status(200).json(user)
            }
        })
        .catch(() => {
            res.status(500).json({
                message: 'Not user'
            })
        })
}

const deleteAdmin = async (req, res, next) => {
    await Users.updateOne({ _id: req.params.id }, {
        rol: 'user'
    })
    .then(() => {
        next()
    })
}

const getAdmin = async (req, res, next) => {
    await Users.updateOne({ _id: req.params.id }, {
        rol: 'admin'
    })
    .then(() => {
        next()
    })
}

module.exports = {
    getEvent, editEvent, deleteEvent, getUser, deleteAdmin, getAdmin
}