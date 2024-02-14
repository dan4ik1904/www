const Events = require('../moduls/events')
const EventForUsers = require('../moduls/eventsForUsers')
const Users = require('../moduls/users')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const craetePage = require('../config/createPage')



const admin = (req, res) => {
    res.render(craetePage('admin'))
}

const getEvents = (req, res) => {
    userId = JSON.parse(localStorage.getItem('user')).id
    Events
        .find()
        .then(events => {
            console.log(events)
            res.render(craetePage('admin-events'), {events})
        })
}

const sendEventForUser = async (req, res) => {
    await EventForUsers.updateOne({ _id: req.query.id }, {
        isCon: 'Connt'
     });
   Users
       .find({_id: req.query.idUser})
       .then(async (userDB) => {
           const coinsUser = userDB[0].coins + 1
           console.log(coinsUser)
           await Users.updateOne({ _id: req.query.idUser }, {
               coins: coinsUser
             });
           res.redirect('/admin')
       })
}

const getEventForUser = (req, res, next) => {
    EventForUsers
        .find({isCon: 'Con', idEvent: req.params.id})
        .then(events => {
            console.log(1)
            res.render(craetePage('admin-event'), {events})
            next()
        })
}

const addEvent = (req, res) => {
    userId = JSON.parse(localStorage.getItem('user')).id
    const name = req.body.name
    const about = req.body.about
    if (!req.body || name.length === 0 || about.length === 0 || !req.files) {
        console.log(req.files)
        res.redirect('/admin')
    }else {
        const ras = req.files.photo.mimetype.split('/')
        const events = new Events({name, creater: userId, img: ras[1], about, price: req.body.price})
        events
            .save()
            .then(() => {
                Events
                    .find({name: req.body.name, creater: userId,  about: req.body.about})
                    .then((event => {
                        console.log(event)
                        req.files.photo.mv('imges/events/' + event[0]._id + '.' + ras[1]);
                        res.redirect('/')
                    }))
            })
    }
}

const addUserCoins = async (req, res) => {
    await EventForUsers.updateOne({ _id: req.query.id }, {
        isCon: 'Connt'
     })
    EventForUsers
     .find({ _id: req.query.id})
     .then(EventUsers => {
        console.log(EventUsers)
        Events
            .find({_id: req.query.idEvent})
            .then(events => {
                Users
                    .find({_id: req.query.idUser})
                    .then(async (userDB) => {
                        console.log(events)
                        const coinsUser = userDB[0].coins + events[0].price
                        console.log(coinsUser)
                        await Users.updateOne({ _id: req.query.idUser }, {
                            coins: coinsUser
                        })
                    })
            })
     })
    
}


module.exports = {
    getEvents, sendEventForUser, getEventForUser, addEvent, addUserCoins, admin
}