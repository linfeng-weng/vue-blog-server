const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')
const authenticateToken = require('../middleware/authMiddleware')

// 获取标签
router.get('/', tagController.getTag)
// 获取标签总数
router.get('/total', tagController.totalTag)
// 新建标签
router.post('/', authenticateToken, tagController.createTag)
// 根据id删除标签
router.delete('/:id', authenticateToken, tagController.deleteTag)
// 根据标签获取对应的文章列表
router.get('/:name', tagController.getArticleByT_name)

module.exports = router