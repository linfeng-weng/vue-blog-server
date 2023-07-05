const mongoose = require('../config/database')

const articleSchema = new mongoose.Schema({
    cover: String,
    title: String,
    content: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
