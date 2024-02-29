const Article = require('../models/Article')
const { updateRssFeed } = require('./rssController')
const fs = require('fs')
const path = require('path')

// 发布文章
const createArticle = async (req, res) => {
  try {
    const { deleteImg, ...data } = req.body

    const newArticle = await Article.create({
      ...data
    })

    if (deleteImg) {
      deleteImg.forEach((item) => {
        if (item) {
          const Path = path.join(__dirname, '..', 'uploads', item)
          if (fs.existsSync(Path)) fs.unlinkSync(Path)
        }
      })
    }

    // 更新rss
    updateRssFeed()

    res.status(201).json({ code: 0, newArticle, message: 'success' })
  } catch (error) {
    res.status(500).json({ message: 'fail', error: error.message })
  }
}

// 获取文章列表
const getArticle = async (req, res) => {
  try {
    // 获取分页参数 limt: 一页显示的数量，page: 当前的页码, year: 查询的年份
    const { limit, page, year } = req.query
    const status = req.query.status || 0
    const skip = (page - 1) * limit || 0

    let query = { status }
    // 如果year存在，根据年份筛选article
    if (year) {
      const startDate = new Date(year, 0, 1)
      const endDate = new Date(parseInt(year) + 1, 0, 1)
      query.created_at = { $gte: startDate, $lt: endDate }
    }

    const total = await Article.countDocuments({ status: 0 })
    const draftTotal = await Article.countDocuments({ status: 1 })
    const article = await Article.find(query)
      .populate('category')
      .populate('tags')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)

    res.status(200).json({ code: 0, total, draftTotal, data: article, message: '获取文章成功' })
  } catch (error) {
    res.status(500).json({ message: '获取文章失败', error: error.message })
  }
}

// 根据id查看文章
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params

    const article = await Article.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .populate('category')
      .populate('tags')

    if (article) {
      res.status(200).json({ code: 0, data: article, message: '查找文章成功' })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '查找文章失败', error: error.message })
  }
}

// 根据id删除文章
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params

    const result = await Article.findByIdAndDelete(id)

    if (result) {
      // 删除存储在项目文件夹的文章封面图片
      if (result.cover) {
        const imagePath = path.join(__dirname, '..', 'uploads', result.cover)
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
      }
      // 删除文章内容的图片
      if (result.contentImg.length > 0) {
        result.contentImg.forEach((item) => {
          if (item) {
            const Path = path.join(__dirname, '..', 'uploads', item)
            if (fs.existsSync(Path)) fs.unlinkSync(Path)
          }
        })
      }
      res.status(200).json({ code: 0, message: '删除文章成功' })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '删除文章失败', error: error.message })
  }
}

// 根据id编辑文章
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params
    const { deleteImg, ...data } = req.body

    const oldArticle = await Article.findById(id)
    const article = await Article.findByIdAndUpdate(
      id,
      {
        ...data,
        updated_at: Date.now()
      },
      { new: true }
    ) //new: true 返回更新后的文档

    if (deleteImg) {
      deleteImg.forEach((item) => {
        if (item) {
          const Path = path.join(__dirname, '..', 'uploads', item)
          if (fs.existsSync(Path)) fs.unlinkSync(Path)
        }
      })
    }

    if (article) {
      // 如果上传了新的封面图片就删除原来存储在本地的图片
      if (oldArticle.cover && article.cover !== oldArticle.cover) {
        const imagePath = path.join(__dirname, '..', 'uploads', oldArticle.cover)
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
      }
      // 更新rss
      updateRssFeed()

      res.status(201).json({ code: 0, article, message: '编辑文章成功' })
    } else {
      res.status(404).json({ message: '文章不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '编辑文章失败', error: error.message })
  }
}

// 搜索文章-模糊匹配
const searchArticle = async (req, res) => {
  try {
    const { limit, page } = req.query
    const skip = (page - 1) * limit || 0
    const search = req.params.s

    const articles = await Article.find({ title: { $regex: new RegExp(search, 'i') } })
      .populate('category')
      .populate('tags')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)

    res
      .status(200)
      .json({ code: 0, total: articles.length, data: articles, message: '搜索文章成功' })
  } catch (error) {
    res.status(500).json({ message: '搜索文章失败', error: error.message })
  }
}

// 获取近一年热门文章
const getHotArticle = async (req, res) => {
  try {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1) //获取一年前的日期
    const result = await Article.aggregate([
      {
        $match: {
          created_at: { $gte: oneYearAgo }, //匹配最近一年的文章
          status: 0
        }
      },
      {
        $sort: { views: -1 } // 按浏览量降序
      },
      {
        $limit: 8 //获取前8篇文章
      },
      {
        $project: {
          title: 1, // 返回标题字段
          views: 1
        }
      }
    ])
    res.status(200).json({ code: 0, result, message: 'success' })
  } catch (error) {
    res.status(500).json({ message: 'fail', error: error.message })
  }
}

module.exports = {
  createArticle,
  getArticle,
  getArticleById,
  deleteArticle,
  updateArticle,
  searchArticle,
  getHotArticle
}
