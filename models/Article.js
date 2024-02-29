const mongoose = require('../config/database')

const articleSchema = new mongoose.Schema({
  cover: String,
  title: { type: String, index: true },
  content: String,
  abstract: String,
  contentImg: [String],
  aiAbstract: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  status: { type: Number, enum: [0, 1], default: 0 }, // 0:代表已发布的文章， 1:代表草稿文章
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
