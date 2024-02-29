const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authMiddleware')

// 登录
router.post('/login', userController.login)

// 修改密码
router.post('/change_pwd', authenticateToken, userController.changePassword)

// 判断token是否过期
router.get('/', authenticateToken, userController.judgeToken)

// 修改个人信息
router.post('/userinfo', authenticateToken, userController.changeUserInfo)

// 获取个人信息
router.get('/userinfo', userController.getUserInfo)

module.exports = router
