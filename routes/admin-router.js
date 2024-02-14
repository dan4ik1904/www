const express = require('express')
const { getEvents, sendEventForUser, getEventForUser, addEvent, addUserCoins, admin } = require('../conrollers/admin-con')
const router = express.Router()


router.get('/admin', admin)

router.get('/admin/sendEvent', sendEventForUser)

router.get('/admin/events/', getEvents)

router.use('/admin/event/:id', getEventForUser)
   
router.post('/admin/', addEvent)

router.get('/admin/event/addUserCoins', addUserCoins)

module.exports = router