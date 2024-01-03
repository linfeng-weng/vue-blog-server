const mongoose = require('../config/database')

const baiduAccessTokenSchema = new mongoose.Schema({
  name: { type: String, default: 'access_token' },
  expiredTime: { type: Number, default: 0 },
  value: String
})

const BaiduAccessToken = mongoose.model('BaiduAccessToken', baiduAccessTokenSchema)

module.exports = BaiduAccessToken
