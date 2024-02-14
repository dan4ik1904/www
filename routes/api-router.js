const express = require('express')
const {getEvent, editEvent, deleteEvent, getUser, deleteAdmin, getAdmin} = require('../conrollers/api-con')

const router = express.Router()

router.get('/api/event/:id', getEvent)
router.post('/api/edit/event/:id', editEvent)
router.get('/api/delete/event/:id', deleteEvent)
router.get('/api/user/:id', getUser)
router.get('/api/user/deleteAdmin/:id', deleteAdmin)
router.get('/api/user/getAdmin/:id', getAdmin)

module.exports = router