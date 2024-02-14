const Events = require('../moduls/events')
const EventForUsers = require('../moduls/eventsForUsers')
const Users = require('../moduls/users')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localStorage');
const {bot, chatID} = require('../config/bot')
const craetePage = require('../config/createPage')


const Main = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    Events
        .find()
        .then(events => {
            if (user) {
               Users
                .find({name: user.name, password: user.password})
                .then(userDB => {
                    res.render(craetePage('index'), {events, userDB})
                }) 
            }else {
                res.render(craetePage('index'), {events, userDB: []})
            }
            
        })
}

const uploudImgСhallenge = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const numRandom = Math.random() * (100000 - 1) + 1
    const uploadedFile = req.files.file; 
    const ras = uploadedFile.name.split('.')
    const filePath = './imges/mysor/' + user.id + '-' + `${numRandom}.` + ras[1]
    const adminSeq = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Принять', callback_data: 'OK/'+user.id}, {text: 'Отклонить', callback_data: 'NO/'+user.id}]
            ]
        })
    }
    uploadedFile.mv(filePath).then(() => {
        console.log(filePath)
        bot.sendPhoto(chatID, filePath).then(() => {
            bot.sendMessage(chatID, 'Одобрение на фото', adminSeq).then(() => {
                res.redirect('/')
            })
        })
        
    })
}

const getEvent = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    Events
        .find({ _id: req.params.id })
        .then(event => {
            if (user !== null) {
                Users
                    .find({name: user.name, password: user.password})
                    .then(userDB => {
                        res.render(craetePage('event'), {event: event[0], userDB})
                    }) 
            }else {
                res.render(craetePage('event'), {event: event[0], userDB: []})
            }
            
        })
}

const Reg = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        res.render(craetePage('reg'))
    }else {
        res.redirect('/')
    }
    
}

const register = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        const users = new Users({ name: req.body.name, password: req.body.password, rol: 'user', coins: 0})
        users
            .save()
            .then(() => {
                Users  
                    .find({name: req.body.name, password: req.body.password})
                    .then(user => {
                        localStorage.setItem('user', JSON.stringify({name: user[0].name, password: user[0].password, id: user[0]._id}))
                    })
                    .then(() => {
                        res.redirect('/')
                    })
                
            })
            .catch(error => {
                console.log(error)
                res.redirect('/')
            })
    }else {
        res.redirect('/')
    }
    
}

const Log = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user) {
        res.render(craetePage('login'))
    }else {
        res.redirect('/')
    }
}

const login = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
        Users
            .find({name: req.body.name, password: req.body.password})
            .then(user => {
                localStorage.setItem('user', JSON.stringify({name: user[0].name, password: user[0].password, id: user[0]._id}))
                res.redirect('/')
            })
            .catch(error => {
                console.log(error)
                res.redirect('/')
            })
    }else {
        res.redirect('/')
    }
    
}

const addEventToUser = (req, res) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const eventForUsers = new EventForUsers({idUser: req.query.userId, idEvent: req.query.eventCreaterId, isCon: 'Con', UserName: user.name})
    eventForUsers
        .save()
        .then(() => {
            console.log(11)
            res.redirect('/')
        })
}

const Profile = (req, res) => {
    user = JSON.parse(localStorage.getItem('user'))
    EventForUsers
        .find({idUser: user.id})
        .then(events => {
            let eventsConId = []
            let eventsConntId = []
            events.forEach(event => {
                if (event.isCon == 'Con') {
                    eventsConId.push(event.idEvent)
                }else {
                    eventsConntId.push(event.idEvent)
                }
                
            });
            Events
                .find({_id: eventsConntId})
                .then(eventsNotCon => {
                    Events
                        .find({_id: eventsConId})
                        .then(eventsCon => {
                            Users
                                .find({name: user.name, password: user.password})
                                .then(user => {
                                    res.render(craetePage('profile'), {eventsCon, eventsNotCon, user: user[0]})
                                })
                            
                        })
                })
        })
}

const exitUser = (req, res) => {
    localStorage.removeItem('user');
    res.redirect('/')
}



module.exports = {
    uploudImgСhallenge, Main, getEvent, Reg, register, Log, login, addEventToUser, Profile, exitUser
}