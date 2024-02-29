const mongoose = require('../config/database')

const baiduAccessTokenSchema = new mongoose.Schema({
  name: { type: String, default: 'access_token' },
  expiredTime: { type: Number, default: 0 },
  value: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

const BaiduAccessToken = mongoose.model(
  'BaiduAccessToken',
  baiduAccessTokenSchema,
  'baidu_access_token'
)

module.exports = BaiduAccessToken
