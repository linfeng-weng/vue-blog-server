const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// 登录
router.post('/login', userController.login)

module.exports = router