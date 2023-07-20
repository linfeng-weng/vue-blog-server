const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const authenticateToken = require('../middleware/authMiddleware')

// 获取分类
router.get('/', categoryController.getCategory)
// 新建分类
router.post('/', authenticateToken, categoryController.createCategory)
// 根据id删除分类
router.delete('/:id', authenticateToken, categoryController.deleteCategory)
// 根据分类获取对应文章列表
router.get('/:name', categoryController.getArticleByCname)

module.exports = router