const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {
  signInRules
} = require("../validations/user/auth.validation.js");

router.post('/signIn', signInRules, authController.signIn)
router.post('/signUp', authController.signUp)

module.exports = router