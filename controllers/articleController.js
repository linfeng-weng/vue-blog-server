const BLOG = require('../blog_config')
const Article = require('../models/Article')
const fs = require('fs')
const path = require('path')
 
// 发布文章
const createArticle = async (req, res) => {
    try {
        const newArticle = await Article.create({
            ...req.body
        })
        res.status(201).json({ newArticle, message: '发布文章成功' })
    } catch (error) {
        res.status(500).json({message: '发布文章失败', error: error.message})
    }
}

// 获取文章总数
const totalArticle = async (req, res) => {
    try {
        const total = await Article.countDocuments() // 获取文章数量
    
        res.status(200).json({ total, limit: BLOG.articleLimit, message: '获取文章总数成功' })

    } catch (error) {
        res.status(500).json({ message: '获取文章数量失败', error: error.message })
    }
}

// 获取文章列表
const getAllArticle = async (req, res) => {
    try {
        const article = await Article.find({},{content: 0})
        res.status(200).json({ article, message: '获取文章成功' })

    } catch (error) {
        res.status(500).json({ message: '获取文章列表失败', error: error.message })
    }
}

// 分页获取文章列表
const getArticle = async (req, res) => {
    try {
        // 获取分页参数
        const limit = BLOG.articleLimit
        const skip = Number(req.query.page) * limit || 0

        const article = await Article.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
        
        res.status(200).json({ article, message: '获取文章成功' })

    } catch (error) {
        res.status(500).json({message: '获取文章失败', error: error.message})
    }
}

// 根据id查找文章
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params
        
        const article = await Article.findById(id)
        
        if (article) {
            res.status(200).json({ article, message: '查找文章成功' })
        } else {
            res.status(404).json({ message: '文章不存在' })
        }

    } catch (error) {
        res.status(500).json({message: '查找文章失败', error: error.message})
    }
}

// 根据id删除文章
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params
        
        const result = await Article.findByIdAndDelete(id)
        
        if (result) {

            // 删除存储在项目文件夹的文章封面图片
            const imagePath = path.join(__dirname, '..', 'uploads', result.cover)
            fs.unlinkSync(imagePath)

            res.status(200).json({message: '删除文章成功'})
        } else {
            res.status(404).json({ message: '文章不存在' })
        }

    } catch (error) {
        res.status(500).json({message: '删除文章失败', error: error.message})
    }
}

// 根据id编辑文章
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params

        const oldArticle = await Article.findById(id)
        const article = await Article.findByIdAndUpdate(id, {
            ...req.body,
            updated_at: Date.now()
        }, { new: true })   //new: true 返回更新后的文档
    
        if (article) {
            // 如果上传了新的封面图片就删除原来存储在本地的图片
            if(article.cover != oldArticle.cover) {
                const imagePath = path.join(__dirname, '..', 'uploads', oldArticle.cover)
                fs.unlinkSync(imagePath)
            }

            res.status(201).json({ article, message: '编辑文章成功' })
        } else {
            res.status(404).json({ message: '文章不存在' })
        }

    } catch (error) {
        res.status(500).json({message: '编辑文章失败', error: error.message})
    }
    
}

module.exports = { createArticle, totalArticle, getAllArticle, getArticle, getArticleById, deleteArticle, updateArticle }