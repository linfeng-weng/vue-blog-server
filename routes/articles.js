const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')
const authenticateToken = require('../middleware/authMiddleware')

// 发布文章
router.post('/', authenticateToken, articleController.createArticle)
// 获取文章总数
router.get('/total', articleController.totalArticle)
// 分页获取文章列表
router.get('/', articleController.getArticle)
// 根据id查看文章
router.get('/:id', articleController.getArticleById)
// 根据id删除文章
router.delete('/:id', authenticateToken, articleController.deleteArticle)
// 根据id编辑文章
router.patch('/:id', authenticateToken, articleController.updateArticle)


module.exports = router