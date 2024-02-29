const Category = require('../models/Category')
const Article = require('../models/Article')

// 获取分类
const getCategory = async (req, res) => {
  try {
    const total = await Category.countDocuments()

    // 使用聚合管道，多表关联查询，数据统计
    const category = await Category.aggregate([
      {
        $lookup: { from: 'articles', localField: '_id', foreignField: 'category', as: 'articles' }
      },
      {
        $project: { name: 1, created_at: 1, num: { $size: '$articles' } }
      }
    ])
    res.status(200).json({ code: 0, total, data: category, message: '获取分类成功' })
  } catch (error) {
    res.status(500).json({ message: '获取分类失败', error: error.message })
  }
}

// 新建分类
const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    const isExist = await Category.find({ name })
    if (isExist.length !== 0) return res.status(200).json({ message: '分类已经存在' })

    const newCategory = await Category.create({ name })

    res.status(201).json({ code: 0, newCategory, message: '新建分类成功' })
  } catch (error) {
    res.status(500).json({ message: '新建分类失败', error: error.message })
  }
}
// 根据id删除分类
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    const result = await Category.findByIdAndDelete(id)

    if (result) {
      res.status(200).json({ code: 0, message: '删除分类成功', result })
    } else {
      res.status(404).json({ message: '分类不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '删除分类失败', error: error.message })
  }
}

// 根据id编辑分类
const editCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body)
    if (category) res.status(201).json({ code: 0, message: '编辑分类成功' })
  } catch (error) {
    res.status(500).json({ message: '编辑分类失败', error: error.message })
  }
}

// 根据分类id获取对应文章列表
const getArticleByCid = async (req, res) => {
  try {
    const { id } = req.params
    const { page, limit } = req.query
    const category = await Category.find({ _id: id }, { name: 1 })
    if (category.length === 0) return res.status(404).json({ message: '分类不存在' })

    const skip = page * limit || 0
    const articles = await Article.find({ category: id }, { content: 0 })
      .populate('category')
      .populate('tags')
      .skip(skip)
      .limit(limit)

    res.status(200).json({ code: 0, category, articles, message: '根据分类获取文章成功' })
  } catch (error) {
    res.status(500).json({ message: '根据分类获取文章失败', error: error.message })
  }
}

module.exports = { getCategory, createCategory, deleteCategory, editCategory, getArticleByCid }
