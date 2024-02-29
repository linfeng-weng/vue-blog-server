const mongoose = require('../config/database')

const tagSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
