const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')

// 发布文章
router.post('/', articleController.createArticle)
// 分页获取文章列表
router.get('/', articleController.getArticle)
// 根据id查看文章
router.get('/:id', articleController.getArticleById)
// 根据id删除文章
router.delete('/:id', articleController.deleteArticle)
// 根据id编辑文章
router.patch('/:id', articleController.updateArticle)


module.exports = router