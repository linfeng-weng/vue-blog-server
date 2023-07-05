const BLOG = require('../blog_config')
const Tag = require('../models/Tag')
const Article = require('../models/Article')

// 获取标签
const getTag = async (req, res) => {
    try {
        const tags = await Tag.find()
        
        res.status(200).json({
            tags,
            message: '获取标签成功'
        })
    } catch (error) {
        res.status(500).json({message: '获取标签失败', error: error.message})
    }
}

// 新建标签
const createTag = async (req, res) => {
    try {
        const newTag = await Tag.create({ ...req.body })

        res.status(201).json({
            newTag,
            message: '新建标签成功'
        })

    } catch (error) {
        res.status(500).json({message: '新建标签失败', error: error.message})
    }
}

// 根据id删除标签
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Tag.findByIdAndDelete(id)

        if(result) {
            res.status(200).json({ message: '删除标签成功', result})
        }else {
            res.status(404).json({ message: '标签不存在' })
        }

    } catch (error) {
        res.status(500).json({message: '删除标签失败', error: error.message})
    }
}

// 根据标签获取对应文章列表
const getArticleByTid = async (req, res) => {
    try {
        const { id } = req.params
        
        const tag = await Tag.findById(id)
        if(!tag) return res.status(404).json({ message: '标签不存在' })

        // 设置分页参数
        const limit = BLOG.articleLimit
        const skip = Number(req.query.page) * limit || 0

        const articles = await Article.find({ tags: { $in: [id] } })
            .populate('category')
            .populate('tags')
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            tag,
            articles,
            message: '根据标签获取文章成功'
        })

    } catch (error) {
        res.status(500).json({message: '根据标签获取文章失败', error: error.message})
    }
}

module.exports = { getTag, createTag, deleteTag, getArticleByTid }