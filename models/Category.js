const mongoose = require('../config/database')

const categorySchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
