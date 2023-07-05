const mongoose = require('../config/database')

const tagSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag

