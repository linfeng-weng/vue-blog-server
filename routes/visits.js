const express = require('express')
const router = express.Router()
const visitController = require('../controllers/visitController')

// 新增访问量
router.post('/', visitController.recordVisit)

// 获取访问量
router.get('/', visitController.getVisit)

module.exports = router
