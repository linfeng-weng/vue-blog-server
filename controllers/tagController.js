const Tag = require('../models/Tag')
const Article = require('../models/Article')

// 获取标签
const getTag = async (req, res) => {
  try {
    const total = await Tag.countDocuments()
    const tags = await Tag.aggregate([
      { $lookup: { from: 'articles', localField: '_id', foreignField: 'tags', as: 'articles' } },
      {
        $project: { name: 1, created_at: 1, num: { $size: '$articles' } }
      }
    ])

    res.status(200).json({ code: 0, total, data: tags, message: '获取标签成功' })
  } catch (error) {
    res.status(500).json({ message: '获取标签失败', error: error.message })
  }
}

// 新建标签
const createTag = async (req, res) => {
  try {
    const { name } = req.body

    const isExist = await Tag.find({ name })
    if (isExist.length !== 0) {
      return res.status(200).json({ message: '标签已经存在' })
    }
    const newTag = await Tag.create({ name })

    res.status(201).json({ code: 0, newTag, message: '新建标签成功' })
  } catch (error) {
    res.status(500).json({ message: '新建标签失败', error: error.message })
  }
}

// 根据id删除标签
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params

    const result = await Tag.findByIdAndDelete(id)

    if (result) {
      res.status(200).json({ code: 0, message: '删除标签成功', result })
    } else {
      res.status(404).json({ message: '标签不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '删除标签失败', error: error.message })
  }
}

// 根据id编辑标签
const editTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body)
    if (tag) res.status(201).json({ code: 0, message: '编辑标签成功' })
  } catch (error) {
    res.status(500).json({ message: '编辑标签失败', error: error.message })
  }
}

// 根据标签获取对应文章列表
const getArticleByT_name = async (req, res) => {
  try {
    const { id } = req.params
    const { page, limit } = req.query

    const tag = await Tag.find({ _id: id }, { name: 1 })
    if (tag.length === 0) return res.status(404).json({ message: '标签不存在' })

    const skip = page * limit || 0

    const articles = await Article.find(
      { tags: { $in: [id] } },
      { title: 1, cover: 1, abstract: 1, views: 6 }
    )
      .skip(skip)
      .limit(limit)

    res.status(200).json({ code: 0, tag, articles, message: '根据标签获取文章成功' })
  } catch (error) {
    res.status(500).json({ message: '根据标签获取文章失败', error: error.message })
  }
}

module.exports = { getTag, createTag, deleteTag, editTag, getArticleByT_name }
