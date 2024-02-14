const express = require('express')
const { uploudImgСhallenge, Main, getEvent, Reg, register, login, Log, addEventToUser, Profile, exitUser } = require('../conrollers/user-con')

const router = express.Router()


router.post('/mysor-img/upload/', uploudImgСhallenge)

router.get('/', Main)

router.get('/event/:id', getEvent)

router.get('/reg', Reg)

router.post('/reg', register)

router.get('/login', Log)

router.post('/login', login)

router.get('/addEventToUser', addEventToUser)

router.get('/profile', Profile)

router.get('/exit-user', exitUser)


module.exports = router