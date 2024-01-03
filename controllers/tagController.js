const BLOG = require('../blog_config')
const Tag = require('../models/Tag')
const Article = require('../models/Article')

// 获取标签
const getTag = async (req, res) => {
  try {
    // const tags = await Tag.find()
    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: 'articles', // 文章模型的集合名称，假设为'articles'
          localField: 'name', // 修正为正确的字段名
          foreignField: 'tags',
          as: 'articles'
        }
      },
      {
        $unwind: {
          path: '$articles',
          preserveNullAndEmptyArrays: true // 保留空数组和未匹配的文档
        }
      },
      {
        $group: {
          _id: '$name', // 使用标签的name字段作为分组依据
          doc: { $first: '$$ROOT' }, // 保留整个文档
          num: { $sum: { $cond: [{ $ifNull: ['$articles', false] }, 1, 0] } } // 计算每个标签对应的文章数量
        }
      },
      {
        $project: {
          _id: '$doc._id', // 显示标签的原本_id字段
          name: '$_id', // 显示标签名，将_id重命名为name
          num: 1 // 显示文章数量
        }
      }
    ])

    res.status(200).json({
      tags,
      message: '获取标签成功'
    })
  } catch (error) {
    res.status(500).json({ message: '获取标签失败', error: error.message })
  }
}

// 获取标签总数
const totalTag = async (req, res) => {
  try {
    const total = await Tag.countDocuments() // 获取标签数量

    res.status(200).json({ total, message: '获取标签总数成功' })
  } catch (error) {
    res.status(500).json({ message: '获取标签总数失败', error: error.message })
  }
}

// 新建标签
const createTag = async (req, res) => {
  try {
    const { name } = req.body

    const isExist = await Tag.find({ name })
    if (isExist.length !== 0) {
      return res.status(200).json({
        message: '标签已经存在'
      })
    }
    const newTag = await Tag.create({ name })

    res.status(201).json({
      newTag,
      message: '新建标签成功'
    })
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
      res.status(200).json({ message: '删除标签成功', result })
    } else {
      res.status(404).json({ message: '标签不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '删除标签失败', error: error.message })
  }
}

// 根据标签获取对应文章列表
const getArticleByT_name = async (req, res) => {
  try {
    const { name } = req.params

    const tag = await Tag.find({ name })
    if (tag.length === 0) return res.status(404).json({ message: '标签不存在' })

    // 设置分页参数
    const limit = BLOG.articleLimit
    const skip = Number(req.query.page) * limit || 0

    const articles = await Article.find({ tags: { $in: [name] } })
      .populate('category')
      .populate('tags')
      .skip(skip)
      .limit(limit)

    res.status(200).json({ tag, articles, message: '根据标签获取文章成功' })
  } catch (error) {
    res.status(500).json({ message: '根据标签获取文章失败', error: error.message })
  }
}

module.exports = { getTag, totalTag, createTag, deleteTag, getArticleByT_name }
