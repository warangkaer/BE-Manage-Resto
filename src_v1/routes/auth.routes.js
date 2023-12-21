const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/signIn', authController.signIn)
router.post('/signUp', authController.signUp)

module.exports = router