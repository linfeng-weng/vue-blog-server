const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authMiddleware')

// 登录
router.post('/login', userController.login)

// 判断token是否过期
router.get('/', authenticateToken, userController.judgeToken)


module.exports = router