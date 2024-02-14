const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const {bot, chatID} = require('./config/bot')
const adminRouter = require('./routes/admin-router')
const apiRouter = require('./routes/api-router')
const userRouter = require('./routes/user-router')

const dbURL = 'mongodb+srv://daniyaldobro:QhbNph6YrISgAquC@cluster0.qpgugby.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')

mongoose
    .connect(dbURL)
    .then(res => console.log('Conected to DB'))
    .catch(error => console.log(error))

app.use(fileUpload({}));


bot.on('callback_query', call => {
    console.log(call.data)
    const type = call.data.split('/')[0]
    const status = call.data.split('/')[1]
    const id = call.data.split('/')[3]
    if (type === 'chall') {
        if(status == 'OK'){
            pass
        }else {
            pass
        }
    }else if (status === 'NO') {
        bot.sendMessage(chatID, 'Отклоняно')
    }
})


app.listen(PORT, (error) => {
    try {
        console.log(`Server started on PORT ${PORT}`)
    } catch (error) {
        console.log(error);
    }
})

app.use(express.urlencoded({ extended: false}))

app.use(express.static('styles'))
app.use(express.static('imges'))
app.use(express.static('scripts'))

app.use(adminRouter)
app.use(apiRouter)
app.use(userRouter)

