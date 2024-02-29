const mongoose = require('../config/database')

const visitSchema = mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  visits: { type: Number, default: 1 }
})

const Visit = mongoose.model('Visit', visitSchema)

module.exports = Visit
