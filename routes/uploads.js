const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const authenticateToken = require('../middleware/authMiddleware')

// 上传文件
router.post('/', authenticateToken, uploadMiddleware, uploadController.uploadFile)

module.exports = router
