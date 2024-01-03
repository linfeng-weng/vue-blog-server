const express = require('express')
const router = express.Router()
const baiduAIController = require('../controllers/baiduAIController')

router.post('/sd_xl', baiduAIController.generatePainting_SD_XL)

router.post('/qcl_2_7b', baiduAIController.generateResult_QCL_2_7B)

router.post('/qcl_2_13b', baiduAIController.generateResult_QCL_2_13B)

module.exports = router
