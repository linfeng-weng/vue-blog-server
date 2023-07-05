const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')
const uploadMiddleware = require('../middleware/uploadMiddleware')

// 登录
router.post('/', uploadMiddleware, uploadController.uploadFile)

module.exports = router