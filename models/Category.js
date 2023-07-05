const mongoose = require('../config/database')

const categorySchema = new mongoose.Schema({
  name: String
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
