const BLOG = require('../blog_config')
const Category = require('../models/Category')
const Article = require('../models/Article')

// 获取分类
const getCategory = async (req, res) => {
    try {
        const category = await Category.find()

        res.status(200).json({
            category,
            message: '获取分类成功'
        })

    } catch (error) {
        res.status(500).json({message: '获取分类失败', error: error.message})
    }
}
// 新建分类
const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create({ ...req.body })

        res.status(201).json({
            newCategory,
            message: '新建分类成功'
        })

    } catch (error) {
        res.status(500).json({message: '新建分类失败', error: error.message})
    }
}
// 根据id删除分类
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Category.findByIdAndDelete(id)

        if(result) {
            res.status(200).json({ message: '删除分类成功', result })
        }else {
            res.status(404).json({ message: '分类不存在' })
        }

    } catch (error) {
        res.status(500).json({message: '删除分类失败', error: error.message})
    }
}
// 根据分类获取对应文章列表
const getArticleByCid = async (req, res) => {
    try {
        const { id } = req.params
        
        const category = await Category.findById(id)
        if(!category) return res.status(404).json({ message: '分类不存在' })

        // 设置分页参数
        const limit = BLOG.articleLimit
        const skip = Number(req.query.page) * limit || 0

        const articles = await Article.find({ category: id })
            .populate('category')
            .populate('tags')
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            articles,
            message: '根据分类获取文章成功'
        }) 

    } catch (error) {
        res.status(500).json({message: '根据分类获取文章失败', error: error.message})
    }
}

module.exports = { getCategory, createCategory, deleteCategory, getArticleByCid }