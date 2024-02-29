const express = require('express')
const router = express.Router()
const baiduAIController = require('../controllers/baiduAIController')
const authenticateToken = require('../middleware/authMiddleware')

router.post('/sd_xl', authenticateToken, baiduAIController.generatePainting_SD_XL)

router.post('/qcl_2_7b', authenticateToken, baiduAIController.generateResult_QCL_2_7B)

router.post('/qcl_2_13b', authenticateToken, baiduAIController.generateResult_QCL_2_13B)

module.exports = router
