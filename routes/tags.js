const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')
const authenticateToken = require('../middleware/authMiddleware')

// 获取标签
router.get('/', tagController.getTag)
// 新建标签
router.post('/', authenticateToken, tagController.createTag)
// 根据id删除标签
router.delete('/:id', authenticateToken, tagController.deleteTag)
// 根据id编辑标签
router.patch('/:id', authenticateToken, tagController.editTag)
// 根据标签获取对应的文章列表
router.get('/:id', tagController.getArticleByT_name)

module.exports = router
