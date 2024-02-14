const TelegramBotAPI = require('node-telegram-bot-api')

const tokenBot = '6541714551:AAHQv4Q0FMovqNH1czoz1C4rts0M7f2YdjY'
const bot = new TelegramBotAPI(tokenBot, {polling: true})
const chatID = '2024448556'

bot.on('message', msg => {
    const text = msg.text
    const textArr = text.split(' ')
    if (textArr[0] == '/getAdmin' && textArr.length === 2) {
        fetch(`http://localhost:3000/api/user/${textArr[1]}`)
            .then(res => {
                if (res.status === 500) {
                    bot.sendMessage(chatID, 'Такого юзера нет')
                }else if (res.status === 200) {
                    res.json()
                    .then(user => {
                        if (user[0].rol == 'admin') {
                            bot.sendMessage(chatID, 'Этот пользователь уже имеет права админа')
                        }else if (user[0].rol == 'user') {
                            fetch(`http://localhost:3000/api/user/getAdmin/${textArr[1]}`)
                                .then(() => {
                                    bot.sendMessage(chatID, 'Права пользователя получены')
                                })
                        }
                    })
                }
            })
            // .then(res => {
            //     console.log(res)
            // })
    }else if (textArr[0] == '/deleteAdmin' && textArr.length === 2) {
        fetch(`http://localhost:3000/api/user/${textArr[1]}`)
            .then(res => {
                if (res.status === 500) {
                    bot.sendMessage(chatID, 'Такого юзера нет')
                }else if (res.status === 200) {
                    res.json()
                    .then(user => {
                        if (user[0].rol == 'user') {
                            bot.sendMessage(chatID, 'Этот пользователь уже имеет права юзера')
                        }else if (user[0].rol == 'admin') {
                            fetch(`http://localhost:3000/api/user/deleteAdmin/${textArr[1]}`)
                                .then(() => {
                                    bot.sendMessage(chatID, 'Изменено на юзер')
                                })
                        }
                    })
                }
            })
    }

})

module.exports = {bot, chatID}